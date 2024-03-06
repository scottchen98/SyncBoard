import{_ as i}from"./index-BUucGf_2.js";async function d(t,a=!0){await t.addParticleUpdater("life",async e=>{const{LifeUpdater:r}=await i(()=>import("./LifeUpdater-BU6vS6Am.js"),__vite__mapDeps([0,1,2,3]));return new r(e)},a)}export{d as loadLifeUpdater};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/LifeUpdater-BU6vS6Am.js","assets/ValueWithRandom-C7juVHZU.js","assets/index-BUucGf_2.js","assets/index-D_FEGiCG.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
