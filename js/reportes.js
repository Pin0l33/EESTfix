document.addEventListener('DOMContentLoaded', async () => {
  try { await API.init(); } catch (e) {
    const msg = document.querySelector('#formMessage') || document.querySelector('#reportsList');
    if (msg) msg.textContent = e.message; return;
  }
  const form = document.querySelector('#reportForm');
  if (form) {
    if (!API.requireUser()) return;
    // Las categorías se cargan desde la base, manteniendo opción inicial.
    const category = document.querySelector('#categoria');
    if (category) {
      const { data, error } = await API.client.from('categorias').select('id,nombre').order('nombre');
      if (error) API.message(document.querySelector('#formMessage'), error.message, true);
      else category.innerHTML = '<option value="">Seleccioná una categoría</option>' +
        data.map(c => `<option value="${c.id}">${API.escape(c.nombre)}</option>`).join('');
    }
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const msg = document.querySelector('#formMessage');
      try {
        const fd = new FormData(form);
        let imagePath = null;
        const photo = fd.get('foto');
        if (photo && photo.size) {
          if (!['image/jpeg','image/png','image/webp'].includes(photo.type) || photo.size > 5*1024*1024)
            throw new Error('La imagen debe ser JPG, PNG o WEBP y pesar hasta 5 MB.');
          const ext = photo.type === 'image/png' ? 'png' : photo.type === 'image/webp' ? 'webp' : 'jpg';
          imagePath = `${API.user.id}/${crypto.randomUUID()}.${ext}`;
          const { error: uploadError } = await API.client.storage.from('reportes').upload(imagePath, photo, {contentType: photo.type, upsert:false});
          if (uploadError) throw uploadError;
        }
        const { data: status, error: statusError } = await API.client.from('estados').select('id').eq('nombre','Pendiente').single();
        if (statusError) throw statusError;
        const { data, error } = await API.client.from('reportes').insert({
          titulo: fd.get('titulo'), descripcion: fd.get('descripcion'),
          ubicacion: fd.get('ubicacion'), id_categoria: Number(fd.get('categoria')),
          id_estado: status.id, id_usuario: API.user.id, imagen: imagePath
        }).select('codigo').single();
        if (error) throw error;
        API.message(msg, `Reporte creado correctamente. Código: ${data.codigo}`);
        form.reset();
      } catch (err) { API.message(msg, err.message, true); }
    });
  }
  const list = document.querySelector('#reportsList');
  if (list) {
    if (!API.requireUser()) return;
    try {
      const { data, error } = await API.client.from('reportes')
        .select('id,codigo,titulo,descripcion,ubicacion,imagen,fecha_creacion,categorias(nombre),estados(nombre)')
        .eq('id_usuario', API.user.id).order('fecha_creacion', {ascending:false});
      if (error) throw error;
      if (!data.length) { list.textContent = 'Todavía no tenés reportes.'; return; }
      list.innerHTML = data.map(r => `<article class="report-card">
        <div class="report-card-top"><strong>${API.escape(r.codigo)}</strong><span class="status-pill">${API.escape(r.estados?.nombre || '')}</span></div>
        <h3>${API.escape(r.titulo)}</h3><p>${API.escape(r.descripcion)}</p>
        <p><b>Ubicación:</b> ${API.escape(r.ubicacion)} · <b>Categoría:</b> ${API.escape(r.categorias?.nombre || '')}</p>
        ${r.imagen ? `<p>Imagen adjunta</p>` : ''}
        <small>${new Date(r.fecha_creacion).toLocaleString('es-AR')}</small>
        <a class="btn btn-secondary" href="reporte.html?id=${encodeURIComponent(r.id)}">Ver detalle</a>
      </article>`).join('');
    } catch (err) { list.textContent = err.message; }
  }
  const detail = document.querySelector('#reportDetail');
  if (detail) {
    if (!API.requireUser()) return;
    const id = new URLSearchParams(location.search).get('id');
    try {
      const { data: r, error } = await API.client.from('reportes')
        .select('*,categorias(nombre),estados(nombre)').eq('id', id).single();
      if (error) throw error;
      if (r.id_usuario !== API.user.id && API.profile?.rol !== 'administrador')
        throw new Error('No tenés permiso para ver este reporte.');
      let imageUrl = '';
      if (r.imagen) {
        const { data } = API.client.storage.from('reportes').getPublicUrl(r.imagen);
        imageUrl = data.publicUrl;
      }
      const { data: comments, error: ce } = await API.client.from('comentarios')
        .select('comentario,fecha_creacion,perfiles(nombre,apellido)')
        .eq('id_reporte', id).order('fecha_creacion');
      if (ce) throw ce;
      detail.innerHTML = `<h1>${API.escape(r.titulo)}</h1>
        <p><b>${API.escape(r.codigo)}</b> · ${API.escape(r.estados?.nombre || '')}</p>
        <p>${API.escape(r.descripcion)}</p><p>${API.escape(r.ubicacion)} · ${API.escape(r.categorias?.nombre || '')}</p>
        ${imageUrl ? `<img class="report-photo" src="${API.escape(imageUrl)}" alt="Imagen del problema">` : ''}
        <h2>Comentarios</h2><div>${comments.map(c=>`<p><b>${API.escape(c.perfiles?.nombre || 'Usuario')} ${API.escape(c.perfiles?.apellido || '')}:</b> ${API.escape(c.comentario)}</p>`).join('') || 'Sin comentarios.'}</div>
        <form id="commentForm"><textarea name="comentario" required maxlength="2000" placeholder="Agregar información adicional"></textarea><button class="btn btn-primary">Enviar comentario</button></form>`;
      document.querySelector('#commentForm').addEventListener('submit', async e => {
        e.preventDefault();
        try {
          const comentario = new FormData(e.target).get('comentario');
          const { error } = await API.client.from('comentarios').insert({id_reporte:id, id_usuario:API.user.id, comentario});
          if (error) throw error;
          location.reload();
        } catch (err) { alert(err.message); }
      });
    } catch (err) { detail.textContent = err.message; }
  }
});
