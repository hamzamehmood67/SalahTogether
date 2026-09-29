import fs from 'node:fs';
import postcss from 'postcss';
const styles=JSON.parse(fs.readFileSync('src/components/reference/source-styles.json','utf8'));
let output='/* Original screen rules, scoped to prevent cross-screen animation collisions. */\n';
for(const [screen,css] of Object.entries(styles)){
 const root=postcss.parse(css),names={};
 root.walkAtRules('keyframes',r=>{names[r.params]=`ref-${screen}-${r.params}`;r.params=names[r.params]});
 root.walkDecls(d=>{if(d.prop==='animation'||d.prop==='animation-name')for(const [old,next] of Object.entries(names))d.value=d.value.replace(new RegExp(`\\b${old}\\b`,'g'),next)});
 root.walkRules(r=>{if(r.parent.type==='atrule'&&r.parent.name==='keyframes')return;r.selectors=r.selectors.map(s=>s==='body'?`.reference-${screen}`:`.reference-${screen} ${s}`)});
 output+=root.toString()+'\n';
}
fs.writeFileSync('src/components/reference/original.css',output);
