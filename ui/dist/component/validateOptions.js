var o=(e="")=>{throw new Error(`[joystick] ${e}`)};var r={events:["readystatechange","pointerlockchange","pointerlockerror","beforecopy","beforecut","beforepaste","freeze","resume","search","securitypolicyviolation","visibilitychange","fullscreenchange","fullscreenerror","webkitfullscreenchange","webkitfullscreenerror","beforexrselect","abort","blur","cancel","canplay","canplaythrough","change","click","close","contextmenu","cuechange","dblclick","drag","dragend","dragenter","dragleave","dragover","dragstart","drop","durationchange","emptied","ended","error","focus","formdata","input","invalid","keydown","keypress","keyup","load","loadeddata","loadedmetadata","loadstart","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","mousewheel","pause","play","playing","progress","ratechange","reset","resize","scroll","seeked","seeking","select","stalled","submit","suspend","timeupdate","toggle","volumechange","waiting","webkitanimationend","webkitanimationiteration","webkitanimationstart","webkittransitionend","wheel","auxclick","gotpointercapture","lostpointercapture","pointerdown","pointermove","pointerup","pointercancel","pointerover","pointerout","pointerenter","pointerleave","selectstart","selectionchange","animationend","animationiteration","animationstart","transitionrun","transitionstart","transitionend","transitioncancel","copy","cut","paste","pointerrawupdate"],lifecycle:["onBeforeMount","onMount","onBeforeUnmount"],options:["id","name","props","defaultProps","state","lifecycle","methods","events","css","render"]},s={options:["render"]},a={name:e=>{typeof e!="string"&&o("options.name must be a string.")},lifecycle:e=>{e instanceof Object||o("options.lifecycle must be an object.");for(let[t,n]of Object.entries(e))r.lifecycle.includes(t)||o(`options.lifecycle.${t} is not supported.`),typeof n!="function"&&o(`options.lifecycle.${t} must be assigned a function.`)},methods:e=>{e instanceof Object||o("options.methods must be an object.");for(let[t,n]of Object.entries(e))typeof n!="function"&&o(`options.methods.${t} must be assigned a function.`)},events:e=>{e instanceof Object||o("options.events must be an object.");for(let t of Object.keys(e)){let[n]=t.split(" ");r.events.includes(n)||o(`${n} is not a supported JavaScript event type.`)}for(let[t,n]of Object.entries(e))typeof n!="function"&&o(`options.events.${t} must be assigned a function.`)},css:e=>{typeof e!="string"&&typeof e!="function"&&o("options.css must be a string or function returning a string.")},render:e=>{typeof e!="function"&&o("options.render must be a function returning a string.")}},l=(e={})=>{s.options.every(t=>Object.keys(e).includes(t))||o(`component options must include ${s.options.join(",")}.`);for(let[t,n]of Object.entries(e)){r.options.includes(t)||o(`${t} is not supported by joystick.component.`);let i=a[t];i&&typeof i=="function"&&i(n)}};export{l as default};
