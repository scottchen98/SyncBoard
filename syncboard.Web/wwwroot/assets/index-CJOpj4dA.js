import{_ as n}from"./index-BUucGf_2.js";async function e(a,o=!0){const{PolygonDrawer:t}=await n(()=>import("./PolygonDrawer-BW1anVDn.js"),__vite__mapDeps([0,1,2,3]));await a.addShape("polygon",new t,o)}async function i(a,o=!0){const{TriangleDrawer:t}=await n(()=>import("./TriangleDrawer-D0u5xClV.js"),__vite__mapDeps([4,1,2,3]));await a.addShape("triangle",new t,o)}async function _(a,o=!0){await e(a,o),await i(a,o)}export{e as loadGenericPolygonShape,_ as loadPolygonShape,i as loadTriangleShape};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/PolygonDrawer-BW1anVDn.js","assets/PolygonDrawerBase-DCDrnVLe.js","assets/index-BUucGf_2.js","assets/index-D_FEGiCG.css","assets/TriangleDrawer-D0u5xClV.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
