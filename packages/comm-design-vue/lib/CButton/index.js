!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("axios")):"function"==typeof define&&define.amd?define(["axios"],t):"object"==typeof exports?exports.CButton=t(require("axios")):e.CButton=t(e.axios)}(self,(e=>(()=>{"use strict";var t={998:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const a=n(o(300));t.default={name:"CButton",data:()=>({name:"李四2"}),created(){console.log("张三"),console.log({name:"李四",age:2})},methods:{getData(){a.default.get("/api/getData").then((e=>{console.log(e)}))}}}},718:e=>{e.exports="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAxADMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDP3Ume9PwcdF/OjacdFrqPNIixpC3apCvPRTTDn+6n50XAYWNBanYP+x+dIQfRPzouBGX5op2GP8KfmaKLgWfM/wBgfnS7z/zzH50zYfXn3o2c9RUXGOLnrsH50wyN/dWnlD6gUzafUfnS5gsJ5r/3V/OgyP02igIc9qXyzntRcBu9v7v6UU4qc9aKLgOVl7v+lOyucbv0qkjDPenq3J61Iy2du3qfyqPcufvfWoyx29OKizSFcsBh6npUqgE8HvVMN0q7DgjNNaibE2e9FSEDPQ0VXKLmMsfd/GnL/H9f8KKKgokP3T+FQnofpRRQId/y0P1rQt/vUUVURMD1ooorQk//2Q=="},300:t=>{t.exports=e}},o={};function n(e){var a=o[e];if(void 0!==a)return a.exports;var A=o[e]={exports:{}};return t[e].call(A.exports,A,A.exports,n),A.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var a={};return(()=>{n.d(a,{default:()=>t});var e=n(998);const t=function(e,t,o,n,a,A,r,s){var c,i="function"==typeof e?e.options:e;if(t&&(i.render=t,i.staticRenderFns=[],i._compiled=!0),i._scopeId="data-v-b526aa44",c)if(i.functional){i._injectStyles=c;var f=i.render;i.render=function(e,t){return c.call(t),f(e,t)}}else{var d=i.beforeCreate;i.beforeCreate=d?[].concat(d,c):[c]}return{exports:e,options:i}}(n.n(e)(),(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"button"},[o("div",{staticClass:"parent-button"},[e._v("父级按钮1"+e._s(e.name))]),e._v(" "),o("div",{staticClass:"child-button"},[e._v("子级按钮1"+e._s(e.name))]),e._v(" "),o("div",{staticClass:"background"}),e._v(" "),o("img",{attrs:{src:n(718),alt:"22"}})])})).exports})(),a.default})()));