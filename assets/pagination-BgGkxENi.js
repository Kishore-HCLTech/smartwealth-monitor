import{c as i,j as e,l as s,a5 as l}from"./index-P07EYYl_.js";/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],p=i("chevron-left",r);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],x=i("chevron-right",u);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]],g=i("ellipsis",d);function f({className:a,...n}){return e.jsx("nav",{role:"navigation","aria-label":"pagination","data-slot":"pagination",className:s("mx-auto flex w-full justify-center",a),...n})}function h({className:a,...n}){return e.jsx("ul",{"data-slot":"pagination-content",className:s("flex flex-row items-center gap-1",a),...n})}function j({...a}){return e.jsx("li",{"data-slot":"pagination-item",...a})}function t({className:a,isActive:n,size:o="icon",...c}){return e.jsx("a",{"aria-current":n?"page":void 0,"data-slot":"pagination-link","data-active":n,className:s(l({variant:n?"outline":"ghost",size:o}),a),...c})}function N({className:a,...n}){return e.jsxs(t,{"aria-label":"Go to previous page",size:"default",className:s("gap-1 px-2.5 sm:pl-2.5",a),...n,children:[e.jsx(p,{}),e.jsx("span",{className:"hidden sm:block",children:"Previous"})]})}function y({className:a,...n}){return e.jsxs(t,{"aria-label":"Go to next page",size:"default",className:s("gap-1 px-2.5 sm:pr-2.5",a),...n,children:[e.jsx("span",{className:"hidden sm:block",children:"Next"}),e.jsx(x,{})]})}function v({className:a,...n}){return e.jsxs("span",{"aria-hidden":!0,"data-slot":"pagination-ellipsis",className:s("flex size-9 items-center justify-center",a),...n,children:[e.jsx(g,{className:"size-4"}),e.jsx("span",{className:"sr-only",children:"More pages"})]})}export{f as P,h as a,j as b,N as c,t as d,v as e,y as f};
