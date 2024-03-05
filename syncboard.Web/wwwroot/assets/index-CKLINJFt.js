import{_ as e}from"./index-BTeNgC7T.js";async function i(r,o=!0){await r.addParticleUpdater("color",async t=>{const{ColorUpdater:a}=await e(()=>import("./ColorUpdater-tzUj4APg.js"),__vite__mapDeps([0,1,2]));return new a(t)},o)}export{i as loadColorUpdater};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/ColorUpdater-tzUj4APg.js","assets/index-BTeNgC7T.js","assets/index-D_FEGiCG.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
