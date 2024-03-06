import{_ as o}from"./index-BUucGf_2.js";async function i(t,a=!0){await t.addParticleUpdater("rotate",async e=>{const{RotateUpdater:r}=await o(()=>import("./RotateUpdater-CeaNwaNp.js"),__vite__mapDeps([0,1,2,3]));return new r(e)},a)}export{i as loadRotateUpdater};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/RotateUpdater-CeaNwaNp.js","assets/index-BUucGf_2.js","assets/index-D_FEGiCG.css","assets/ValueWithRandom-C7juVHZU.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
