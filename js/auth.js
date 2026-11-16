document.addEventListener('DOMContentLoaded', async () => {
  try { await API.init(); } catch (e) {
    const m = document.querySelector('#formMessage'); API.message(m, e.message, true); return;
  }
  const login = document.querySelector('#loginForm');
  if (login) login.addEventListener('submit', async e => {
    e.preventDefault();
    const msg = document.querySelector('#formMessage');
    const fd = new FormData(login);
    try {
      const { data, error } = await API.client.auth.signInWithPassword({
        email: fd.get('email'), password: fd.get('password')
      });
      if (error) throw error;
      API.user = data.user;
      await API.init();
      location.href = 'index.html';
    } catch (err) { API.message(msg, err.message, true); }
  });
  const reg = document.querySelector('#registerForm');
  if (reg) reg.addEventListener('submit', async e => {
    e.preventDefault();
    const msg = document.querySelector('#formMessage');
    const fd = new FormData(reg);
    if (fd.get('password') !== fd.get('password_confirm')) {
      API.message(msg, 'Las contraseñas no coinciden.', true); return;
    }
    try {
      const { data, error } = await API.client.auth.signUp({
        email: fd.get('email'), password: fd.get('password'),
        options: { data: { nombre: fd.get('nombre'), apellido: fd.get('apellido') } }
      });
      if (error) throw error;
      API.message(msg, data.session
        ? 'Cuenta creada correctamente. Ya podés ingresar.'
        : 'Cuenta creada. Revisá tu correo para confirmar la dirección antes de iniciar sesión.');
      reg.reset();
    } catch (err) { API.message(msg, err.message, true); }
  });
  document.querySelectorAll('[data-logout]').forEach(btn => btn.addEventListener('click', async () => {
    const { error } = await API.client.auth.signOut();
    if (error) alert(error.message);
    else location.href = '../login.html';
  }));
});
