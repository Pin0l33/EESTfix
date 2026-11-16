const API = {
  csrf: '', user: null,
  prefix: location.pathname.includes('/admin/') ? '../' : '',
  async init() { const d=await this.request('backend/auth/estado.php');this.csrf=d.csrf||'';this.user=d.user||null;return d; },
  async request(url, options={}) { if(!/^https?:/i.test(url) && !url.startsWith('../') && !url.startsWith('/')) url=this.prefix+url; const headers={...(options.headers||{})}; if(this.csrf) headers['X-CSRF-Token']=this.csrf; if(options.body && !(options.body instanceof FormData) && typeof options.body!=='string'){headers['Content-Type']='application/json';options.body=JSON.stringify(options.body);} const r=await fetch(url,{credentials:'same-origin',...options,headers});let d;try{d=await r.json();}catch{throw new Error('El servidor devolvió una respuesta inválida.');}if(d.csrf)this.csrf=d.csrf;if(!r.ok||d.ok===false)throw new Error(d.message||'Ocurrió un error.');return d; },
  escape(value=''){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));},
  message(el,text,error=false){if(!el)return;el.textContent=text;el.className='form-message '+(error?'error':'success');}
};
document.addEventListener('DOMContentLoaded',()=>API.init().then(()=>{document.querySelectorAll('[data-user-name]').forEach(e=>e.textContent=API.user?`${API.user.nombre} ${API.user.apellido}`:'Invitado');}).catch(()=>{}));
