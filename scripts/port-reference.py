"""Port the supplied self-contained Saff HTML into React templates and scoped CSS.
Usage: python3 scripts/port-reference.py /path/to/design.html
No prototype runtime or demo business logic is shipped to the app.
"""
import sys,re,json,gzip,base64,pathlib
from html.parser import HTMLParser
ROOT=pathlib.Path(__file__).resolve().parents[1]
source=pathlib.Path(sys.argv[1]).read_text()
manifest=json.loads(re.search(r'<script type="__bundler/manifest">(.*?)</script>',source,re.S).group(1))
class Node:
 def __init__(self,tag='',attrs=None):self.tag=tag;self.attrs=dict(attrs or []);self.children=[]
class Parser(HTMLParser):
 def __init__(self):super().__init__(convert_charrefs=True);self.root=Node();self.stack=[self.root]
 def handle_starttag(self,tag,attrs):
  n=Node(tag,attrs);self.stack[-1].children.append(n)
  if tag not in ['meta','link','input','br','hr','img']:self.stack.append(n)
 def handle_endtag(self,tag):
  for i in range(len(self.stack)-1,0,-1):
   if self.stack[i].tag==tag:self.stack=self.stack[:i];break
 def handle_data(self,data):self.stack[-1].children.append(data)
def walk(n):
 if isinstance(n,str):return
 yield n
 for c in n.children:yield from walk(c)
def camel(k):return re.sub(r'-([a-z])',lambda m:m[1].upper(),k)
def expr(s,scope):
 s=s.strip()
 if s in ['true','false','null']:return s
 return s if s.split('.')[0] in scope else 'v.'+s
def value(s,scope):
 parts=re.split(r'({{.*?}})',s)
 if len(parts)==3 and not parts[0] and not parts[2]:return expr(parts[1][2:-2],scope)
 return ' + '.join('String('+expr(p[2:-2],scope)+')' if p.startswith('{{') else json.dumps(p,ensure_ascii=False) for p in parts if p) or '""'
def render(n,scope=set(),index=0):
 if isinstance(n,str):
  if not n.strip():return ''
  return '{'+value(n,scope)+'}'
 tag={'radialgradient':'radialGradient','lineargradient':'linearGradient','fegaussianblur':'feGaussianBlur','clippath':'clipPath'}.get(n.tag,n.tag);attrs=n.attrs
 if tag=='sc-for':
  name=attrs['as'];items=value(attrs['list'],scope)
  return '{('+items+' ?? []).map(('+name+': any, index: number) => <Fragment key={index}>'+''.join(render(c,scope|{name}) for c in n.children)+'</Fragment>)}'
 if tag=='sc-if':return '{!!('+value(attrs['value'],scope)+') && <>'+''.join(render(c,scope) for c in n.children)+'</>}'
 if tag in ['helmet','script','style']:return ''
 out=[]
 for k,val in attrs.items():
  if k.startswith('hint-'):continue
  if k=='style':
   pairs=[]
   for rule in val.split(';'):
    if ':' not in rule:continue
    key,vv=rule.split(':',1);key=key.strip();vv=vv.strip();pairs.append(json.dumps(key if key.startswith('--') else camel(key))+': '+value(vv,scope))
   out.append('style={{'+','.join(pairs)+'} as CSSProperties}');continue
  k={'class':'className','sc-camel-view-box':'viewBox','viewbox':'viewBox','sc-camel-on-click':'onClick','tabindex':'tabIndex'}.get(k,k)
  if k.startswith('sc-camel-'):k=camel(k[9:])
  if k.startswith('stroke-') or k.startswith('fill-') or k.startswith('stop-') or k in ['clip-path','clip-rule','transform-origin','color-interpolation-filters']:k=camel(k)
  k={'gradientunits':'gradientUnits','gradienttransform':'gradientTransform','stddeviation':'stdDeviation','maskunits':'maskUnits','clippathunits':'clipPathUnits','preserveaspectratio':'preserveAspectRatio','filterunits':'filterUnits'}.get(k,k)
  out.append(k+'={'+('true' if val is None else val if k in ['aria-level','tabIndex'] and val.lstrip('-').isdigit() else value(val,scope))+'}')
 children=''.join(render(c,scope) for c in n.children)
 return '<'+tag+(' '+' '.join(out) if out else '')+('/>' if not children else '>'+children+'</'+tag+'>')
font_css='';all_css={}
for name,entry in zip(['names','welcome','today','circle','insights','milestones'],manifest.values()):
 if name=='names':continue
 raw=gzip.decompress(base64.b64decode(entry['data'])).decode();t=json.loads(re.search(r'<script type="__bundler/template">(.*?)</script>',raw,re.S).group(1));assets=json.loads(re.search(r'<script type="__bundler/manifest">(.*?)</script>',raw,re.S).group(1))
 styles=re.findall(r'<style>(.*?)</style>',t,re.S)
 if not font_css:
  font_css=next(s for s in styles if '@font-face' in s)
  for key in set(re.findall(r'url\("([^"]+)"\)',font_css)):
   a=assets[key];data=base64.b64decode(a['data']);data=gzip.decompress(data) if a.get('compressed') else data
   dest='ref-'+key+'.woff2';(ROOT/'public/fonts'/dest).write_bytes(data);font_css=font_css.replace(key,'/fonts/'+dest)
 all_css[name]='\n'.join(s for s in styles if '@font-face' not in s)
 # Replace mock literals with app-provided values; preserve all layout declarations.
 substitutions={
 'today':{'Assalamu alaikum, Yusuf':'Assalamu alaikum, {{name}}','5-day streak of all five prayers':'{{streakLabel}}','>5</span>':'>{{streak}}</span>','Tue · 17 Rabiʿ al-Thani 1448':'{{hijriDate}}','NOW · SINCE {{city.asr}}':'{{currentLabel}}','>Asr</span>':'>{{currentName}}</span>','>العصر</span>':'>{{currentArabic}}</span>','Maghrib in ':'{{nextName}} in ','href="#icoAsr"':'href="{{currentIcon}}"','The Rahman Family':'{{circleName}}','{{circleCount}} of 6 prayed Asr':'{{circleSummary}}'},
 'circle':{'The Rahman Family':'{{circleName}}','6 members · Asr time now':'{{circleSubtitle}}','of 18 kept together':'of {{dueToday}} kept together'},
 'milestones':{'Circle goal · September':'Circle goal · {{goalMonth}}','702 / 750':'{{goalTotal}} / {{goalTarget}}','width: 94%':'width: {{goalPct}}%','The Rahman Family · 48 prayers together to go':'{{goalCaption}}'}
 }.get(name,{})
 for a,b in substitutions.items():t=t.replace(a,b)
 for anim in re.findall(r'@keyframes\s+(\w+)',all_css[name]):t=re.sub(r'(animation:\s*)'+anim+r'\b',lambda m:m[1]+'ref-'+name+'-'+anim,t)
 parser=Parser();parser.feed(t);xdc=next(n for n in walk(parser.root) if n.tag=='x-dc');root=next(n for n in xdc.children if isinstance(n,Node) and n.tag=='div')
 root.attrs['class']='reference-screen reference-'+name
 # Annotate the original sections, preserving mobile layout. CSS adapts only outside 390px.
 for n in walk(root):
  if n.tag=='div' and n.attrs.get('style','').startswith('position: relative; padding: 36px'):
   n.attrs['class']='reference-content'
   children=[c for c in n.children if isinstance(c,Node)]
   for i,c in enumerate(children):c.attrs['data-section']=str(i)
  if n.attrs.get('style','')=='position: absolute; left: 0; top: 0; width: 390px; height: 844px; z-index: 30':n.attrs['class']='reference-location-overlay'
  if n.attrs.get('role')=='dialog':n.attrs['aria-modal']='true';n.attrs['tabindex']='-1'
  if n.tag=='nav':n.attrs['class']='reference-nav';n.attrs['aria-label']='Mobile navigation'
  if n.tag=='a' and '.dc.html' in n.attrs.get('href',''):
   dest={'Main.dc.html':'today','Circle.dc.html':'circles','Insights.dc.html':'insights','Milestones.dc.html':'milestones'}[n.attrs.pop('href')];n.tag='button';n.attrs['data-reference-link']='true';n.attrs['sc-camel-on-click']='{{go'+dest.title()+'}}'
   if name=='welcome':n.attrs['sc-camel-on-click']='{{startCircle}}' if dest=='today' else '{{joinCircle}}'
   # Inside a circle the header arrow returns to the circles list; the tab bar's Today link stays Today.
   if name=='circle' and dest=='today' and 'tab' not in n.attrs.get('class','').split():n.attrs['sc-camel-on-click']='{{goBack}}';n.attrs['aria-label']='Back to your circles'
  # Accessible headings preserve the original span geometry.
  text=''.join(x for x in n.children if isinstance(x,str)).strip()
  if text in ['Insights','Milestones','Assalamu alaikum, {{name}}','{{circleName}}'] and n.attrs.get('class')=='disp':n.attrs['role']='heading';n.attrs['aria-level']='1'
  if name=='today' and n.attrs.get('class')=='chip':n.attrs['sc-camel-on-click']='{{goMilestones}}'
  if name=='circle' and text=='{{circleName}}':n.tag='button';n.attrs['sc-camel-on-click']='{{manageCircles}}';n.attrs['aria-label']='Manage circles';n.attrs['style']+='; text-align: left';n.attrs.pop('role',None);n.attrs.pop('aria-level',None)
  if name=='circle' and text=='{{m.name}}':n.tag='button';n.attrs['sc-camel-on-click']='{{m.inspect}}';n.attrs['aria-label']='View {{m.name}} progress'
  if name=='insights' and n.tag=='svg' and n.attrs.get('class')=='{{ic.cls}}':n.attrs['role']='button';n.attrs['tabindex']='0';n.attrs['sc-camel-on-click']='{{ic.toggle}}';n.attrs['sc-camel-on-key-down']='{{ic.onKeyDown}}'
  # Insights opens on a week: the design's "12-month record" pill becomes the Week / Month switch, and the arrows name the period they move by.
  if name=='insights' and text=='12-month record':
   n.tag='div';n.attrs['class']='period';n.attrs['role']='group';n.attrs['aria-label']='Period'
   option=Node('button',[('sc-camel-on-click','{{p.pick}}'),('aria-pressed','{{p.sel}}')]);option.children=['{{p.label}}'];loop=Node('sc-for',[('list','{{periods}}'),('as','p')]);loop.children=[option];n.children=[loop]
  if name=='insights' and n.attrs.get('aria-label') in ['Previous month','Next month']:n.attrs['aria-label']='{{'+n.attrs['aria-label'].split()[0].lower()+'Label}}'
  # Settings stay accessible via the location sheet without changing its visual composition.
  if name=='today' and text=='Method: {{city.method}}':n.tag='button';n.attrs['sc-camel-on-click']='{{settings}}';n.attrs['aria-label']='Calculation settings'
  if name=='milestones' and text=='{{sel.name}}':n.attrs['role']='heading';n.attrs['aria-level']='2'
 # A live circle strip uses actual member identities rather than the prototype family.
 if name=='today':
  strip=next(n for n in walk(root) if 'strip enter'==n.attrs.get('class'))
  avatar_row=next(n for n in strip.children if isinstance(n,Node) and n.tag=='span')
  original=[n for n in avatar_row.children if isinstance(n,Node)][0]
  original.attrs['class']='{{a.cls}}';original.attrs['style']=original.attrs['style'].replace('background: #F5B942','background: {{a.bg}}').replace('color: #1A1400','color: {{a.fg}}').replace('z-index: 4','z-index: {{a.z}}')+'; margin-left: {{a.margin}}px';original.children=['{{a.initials}}'];loop=Node('sc-for',[('list','{{avatars}}'),('as','a')]);loop.children=[original];avatar_row.children=[loop]
  # Phones have no Settings tab: the person's own character, at the end of the location row, opens Settings.
  header_rows=[c for c in next(n for n in walk(root) if n.attrs.get('data-section')=='0').children if isinstance(c,Node)]
  me=Node('button',[('class','me'),('sc-camel-on-click','{{settings}}'),('aria-label','Your account and settings')]);face=Node('span',[('aria-hidden','true'),('style','background: {{me}}')]);me.children=[face];header_rows[1].children.append(me)
 header='"use client";\n// Faithful React port of the supplied Saff '+name+' screen.\nimport { Fragment, type CSSProperties } from "react";\nimport type { ReferenceValues } from "./types";\n'
 component='export default function '+name.title()+'Reference({v}:{v:ReferenceValues}) { return ('+render(root)+'); }\n'
 (ROOT/'src/components/reference'/(name+'.tsx')).write_text(header+component)
(ROOT/'src/components/reference/fonts.css').write_text(font_css)
(ROOT/'src/components/reference/source-styles.json').write_text(json.dumps(all_css))
