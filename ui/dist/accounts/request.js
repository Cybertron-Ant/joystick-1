var a=(n="",s={})=>{if(fetch)return new Promise((c,t)=>{let r={signup:"signup",login:"login",logout:"logout",recoverPassword:"recover-password",resetPassword:"reset-password"}[n];return fetch(`${window.location.origin}/api/_accounts/${r}`,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({...s,origin:window?.location?.origin}),credentials:"include"}).then(async e=>{let o=await e.json();return o&&o.errors?(console.log(`%c\u274C accounts.${n} request failed with the following errors:`,'background-color: #ffcc00; padding: 7px; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-size: 11px; line-height: 10px; color: #000;'),o.errors.forEach(i=>{console.log(i.message),i.stack&&console.log(i.stack)}),t(o)):(c(o),o)}).catch(e=>(console.log(`%c\u274C accounts.${n} request failed with the following network error:`,'background-color: #ffcc00; padding: 7px; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-size: 15px; line-height: 15px; color: #000;'),console.log(e),t(e),e))})};export{a as default};
