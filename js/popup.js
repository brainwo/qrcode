const isPageActionPopup=!location.search.includes("mode=window"),options=Object.assign({ecl:"M",moduleSize:4,openUrl:"ask",autoclose:!0,whiteIcon:!1,sendUsageStats:!1},JSON.parse(localStorage.getItem("options"))),dpr=window.devicePixelRatio,$qrcode=document.getElementById("qrcode"),$input=document.getElementById("content");function makeCode(e,o){o=o||4;try{const t=qrcode(o,options.ecl);t.addData(e),t.make(),$qrcode.innerHTML=t.createImgTag(options.moduleSize,options.moduleSize),$input.value=e,delete $qrcode.dataset.error}catch(t){o<20?makeCode(e,o+2):$qrcode.dataset.error=t.message}}options.moduleSize*=dpr,$input.oninput=function(){makeCode(this.value)},isPageActionPopup?chrome.tabs.query({currentWindow:!0,active:!0},e=>setTimeout(()=>makeCode(e[0].url),70)):(document.title=chrome.i18n.getMessage("short_name"),options.autoclose&&(window.onblur=function(){chrome.tabs.getCurrent(e=>chrome.tabs.remove(e.id))}),chrome.runtime.onMessage.addListener(e=>{makeCode(e.data,e.tn)}),chrome.runtime.sendMessage({type:"requestData"}));