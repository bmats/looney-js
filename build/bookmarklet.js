javascript:!function(){"use strict";function e(e,t){return e*e+t*t}function t(t,i){function o(t){function o(){var e=!0;n(function t(){var o=l-(window.pageXOffset||document.documentElement.scrollLeft)+a,r=d-(window.pageYOffset||document.documentElement.scrollTop)+u,c=new Date,v=(c-w)/i.duration;v*=v;var p=y*(1-v);1>v?n(t):(p=0,setTimeout(function(){var e;window.Event?e=new MouseEvent("click"):(e=document.createEventObject(),e.eventType="click",e.eventName="click"),document.createEvent?s.dispatchEvent(e):s.fireEvent("on"+e.eventType,e)},i.pause)),m.setAttribute("cx",o),m.setAttribute("cy",r),m.setAttribute("r",p),e&&(f.style.display="inline",e=!1)})}if(!c){c=!0,t.preventDefault(),t.stopImmediatePropagation();var l=t.clientX,d=t.clientY,a=window.pageXOffset||document.documentElement.scrollLeft,u=window.pageYOffset||document.documentElement.scrollTop,s=this;document.body.insertAdjacentHTML("beforeend",'<svg version="1.1" style="position: fixed; left: 0; top: 0; width: 100%; height: 100vh; z-index: 999999999"><mask id="looney-mask"><rect x="0" y="0" width="100%" height="100%" fill="#fff" /><circle id="looney-circle" cx="0" cy="0" r="10000" fill="#000"'+(i.blur>0?' filter="url(#looney-blur)"':"")+' /></mask><defs><filter id="looney-blur"><feGaussianBlur in="SourceGraphic" stdDeviation="'+i.blur+'" /></filter></defs><rect id="looney-rect" x="0" y="0" width="100%" height="100%" fill="'+i.fill+'" mask="url(#looney-mask)" style="display:none" /></svg>');var m=document.getElementById("looney-circle"),f=document.getElementById("looney-rect"),w=new Date,y=e(l,d),v=e(window.innerWidth-l,d);if(v>y&&(y=v),v=e(window.innerWidth-l,window.innerHeight-d),v>y&&(y=v),v=e(l,window.innerHeight-d),v>y&&(y=v),y=Math.sqrt(y),y+=2*i.blur,i.playAudio&&window.Audio){var p=new Audio(i.audioUrl);p.addEventListener("playing",o),p.addEventListener("error",o),p.playbackRate=r.duration/i.duration,p.play()}else o()}}t instanceof HTMLElement||(i=t,t=document.body),i=i||{};var r={selector:"a",fill:"#000",blur:0,playAudio:!1,duration:6900,pause:0,audioUrl:"music.mp3",invert:!1};for(var l in r)i.hasOwnProperty(l)||(i[l]=r[l]);for(var d=t.querySelectorAll(i.selector),a=0;a<d.length;++a){var u=d[a];u.addEventListener("click",o,!1),u.addEventListener("touchend",o,!1)}i.playAudio&&(i.pause+=300);var c=!1}var n=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)};window.looney=t}(),looney({blur:15,playAudio:!0,audioUrl:"https://bmats.github.io/looney-js/music.mp3"});