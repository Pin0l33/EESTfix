document.addEventListener('DOMContentLoaded', async()=>{
 await API.init().catch(()=>{});
 const login=document.querySelector('#loginForm');
 if(login)login.addEventListener('submit',async e=>{e.preventDefault();const msg=document.querySelector('#formMessage');try{const d=await API.request('backend/auth/login.php',{method:'POST',body:Object.fromEntries(new FormData(login))});API.user=d.user;location.href=d.user.rol==='administrador'?'admin/index.html':'index.html';}catch(err){API.message(msg,err.message,true);}});
 const reg=document.querySelector('#registerForm');
 if(reg)reg.addEventListener('submit',async e=>{e.preventDefault();const msg=document.querySelector('#formMessage');const data=Object.fromEntries(new FormData(reg));if(data.password!==data.password_confirm){API.message(msg,'Las contraseñas no coinciden.',true);return;}delete data.password_confirm;try{await API.request('backend/auth/registro.php',{method:'POST',body:data});location.href='index.html';}catch(err){API.message(msg,err.message,true);}});
 document.querySelectorAll('[data-logout]').forEach(b=>b.addEventListener('click',async()=>{try{await API.request('backend/auth/logout.php',{method:'POST',body:{}});location.href='../login.html';}catch(e){alert(e.message);}}));
});
