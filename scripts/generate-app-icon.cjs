const {Resvg}=require('@resvg/resvg-js');const fs=require('fs');
const out=process.argv[2];
// Glyph: { ? } with orange dot, drawn in a 1024 box, centered, scale s
const glyph=(c1,c2,c3,s=1)=>`<g transform="translate(512 512) scale(${s}) translate(-512 -512)" fill="none" stroke-linecap="round" stroke-linejoin="round">
 <path d="M330 260 C260 260 270 330 270 400 C270 470 250 500 200 512 C250 524 270 554 270 624 C270 694 260 764 330 764" stroke="${c1}" stroke-width="56"/>
 <path d="M694 260 C764 260 754 330 754 400 C754 470 774 500 824 512 C774 524 754 554 754 624 C754 694 764 764 694 764" stroke="${c1}" stroke-width="56"/>
 <path d="M420 410 C420 330 470 290 515 290 C570 290 610 330 610 385 C610 450 512 470 512 560 L512 590" stroke="${c2}" stroke-width="70"/>
 <circle cx="512" cy="690" r="44" fill="${c3}" stroke="none"/>
</g>`;
const bg=`<defs><radialGradient id="g" cx="35%" cy="25%" r="90%"><stop offset="0" stop-color="#145a78"/><stop offset="1" stop-color="#002236"/></radialGradient></defs>`;
const svgs={
 'icon.png':[1024,`${bg}<rect width="1024" height="1024" fill="url(#g)"/>${glyph('#eae2b7','#fcbf49','#f77f00',1.05)}`],
 'android-icon-background.png':[1024,`${bg}<rect width="1024" height="1024" fill="url(#g)"/>`],
 'android-icon-foreground.png':[1024,glyph('#eae2b7','#fcbf49','#f77f00',0.72)],
 'android-icon-monochrome.png':[1024,glyph('#fff','#fff','#fff',0.72)],
 'splash-icon.png':[1024,glyph('#003049','#f77f00','#d62828',0.9)],
 'favicon.png':[48,`${bg}<rect width="1024" height="1024" rx="200" fill="url(#g)"/>${glyph('#eae2b7','#fcbf49','#f77f00',1.1)}`],
};
for(const[n,[w,b]] of Object.entries(svgs)){const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">${b}</svg>`;
 fs.writeFileSync(out+'/'+n,new Resvg(svg,{fitTo:{mode:'width',value:w}}).render().asPng());}
