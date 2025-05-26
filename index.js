import{a as b,S as L,i}from"./assets/vendor-CrlV4O_2.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function e(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(t){if(t.ep)return;t.ep=!0;const s=e(t);fetch(t.href,s)}})();const w="50493265-0cafa83cbbda07ad22be9b176",v="https://pixabay.com/api/",S=15;async function d(r,o){return(await b.get(v,{params:{key:w,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:S}})).data}const u=document.querySelector(".gallery"),f=document.querySelector(".loader"),p=document.querySelector(".load-more"),q=new L(".gallery a",{captionsData:"alt",captionDelay:250});function m(r){const o=r.map(e=>`
        <div class="photo-card">
          <a class="gallery__item" href="${e.largeImageURL}">
            <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b><span>${e.likes}</span>
            </p>
            <p class="info-item">
              <b>Views</b><span>${e.views}</span>
            </p>
            <p class="info-item">
              <b>Comments</b><span>${e.comments}</span>
            </p>
            <p class="info-item">
              <b>Downloads</b><span>${e.downloads}</span>
            </p>
          </div>
        </div>
      `).join("");u.insertAdjacentHTML("beforeend",o),q.refresh()}function R(){u.innerHTML=""}function h(){f.classList.remove("is-hidden")}function y(){f.classList.add("is-hidden")}function E(){p.classList.remove("is-hidden")}function g(){p.classList.add("is-hidden")}const P=document.querySelector(".form"),B=document.querySelector(".load-more");let n=1,l="";P.addEventListener("submit",async r=>{r.preventDefault();const o=r.target.searchQuery.value.trim();if(o){l=o,n=1,R(),g(),h();try{const{hits:e,totalHits:a}=await d(l,n);if(e.length===0){i.info({title:"No Results",message:"No images found. Try a different query.",position:"topRight"});return}m(e),a>n*15&&E()}catch{i.error({title:"Error",message:"Something went wrong. Please try again.",position:"topRight"})}finally{y()}}});B.addEventListener("click",async()=>{n+=1,h(),document.querySelector(".gallery .photo-card:last-child");try{const{hits:r,totalHits:o}=await d(l,n);m(r);const e=Math.ceil(o/15);n>=e&&(g(),i.info({title:"End of Results",message:"You have reached the end of the search results.",position:"topRight"})),M()}catch{i.error({title:"Error",message:"Failed to load more images.",position:"topRight"})}finally{y()}});function M(){const r=document.querySelectorAll(".gallery .photo-card");if(r.length<16)return;const o=r[0].getBoundingClientRect().height;window.scrollBy({top:o*2+24*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
