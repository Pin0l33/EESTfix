# EESTfix

Frontend estático de EESTfix preparado para GitHub Pages y Supabase.

## Arquitectura para publicar

- GitHub Pages sirve HTML, CSS y JavaScript.
- Supabase provee autenticación, PostgreSQL y Storage.
- Los archivos PHP de `backend/` son para la versión PHP/MySQL local/hosting tradicional; **GitHub Pages no ejecuta PHP** y esos endpoints no se usan en esta modalidad.

## Configuración de Supabase

1. En `js/supabase-config.js`, reemplazá `PEGAR_URL_DEL_PROYECTO` por Project URL y `PEGAR_CLAVE_PUBLISHABLE_O_ANON` por la clave publishable (o anon legacy) de Supabase. La clave pública es visible en el navegador; nunca uses `service_role` ni la contraseña de la base.
2. En Supabase > SQL Editor ejecutá primero `database` migrado/las tablas y políticas que se prepararon en el asistente.
3. Ejecutá también `supabase-storage.sql` para crear el bucket público `reportes` y sus políticas de carga/lectura.
4. En Authentication > URL Configuration configurá Site URL con `https://TU-USUARIO.github.io/EESTfix/` y agregá esa misma dirección a Redirect URLs.
5. En Authentication > Providers verificá Email. Para pruebas podés mantener confirmación de correo habilitada; el usuario deberá confirmar el email antes de iniciar sesión.

## Publicar en GitHub Pages

1. Subí el contenido de esta carpeta al repositorio público `EESTfix` (los archivos deben quedar en la raíz del repositorio, no dentro de otra carpeta).
2. En GitHub > Settings > Pages seleccioná Deploy from a branch, branch `main` y carpeta `/ (root)`.
3. Guardá y esperá la URL `https://TU-USUARIO.github.io/EESTfix/`.

## Funcionalidad frontend migrada

- Registro e inicio de sesión con Supabase Auth.
- Perfil creado automáticamente por el trigger SQL.
- Creación de reportes con categoría, ubicación, descripción y foto.
- Listado de reportes propios y detalle.
- Comentarios en reportes propios.
- Seguridad de tablas mediante RLS.

## Pendiente de migración

Las pantallas administrativas (`admin/`) todavía contienen llamadas a endpoints PHP/MySQL y no funcionan en GitHub Pages. La administración de estados, usuarios y estadísticas debe migrarse a consultas Supabase y funciones RLS antes de usar el sitio en producción. El alta de administradores debe hacerse manualmente desde SQL Editor, nunca desde el formulario público.

## Seguridad y pruebas

- No publiques claves `service_role`, contraseñas ni secretos.
- La clave publishable/anon sí está diseñada para frontend, siempre con RLS correctamente configurado.
- Probá registro, confirmación de email, login, creación de reporte y comentarios con cuentas de prueba.
- El bucket de imágenes queda público para que las fotos se puedan mostrar mediante URL pública. No subas fotos sensibles.
