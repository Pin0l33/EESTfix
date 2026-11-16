# EESTfix

Sistema web para reportar, gestionar y realizar el seguimiento de problemas dentro de la E.E.S.T. N.º 1 "Eduardo Ader".

## Tecnologías

- HTML5, CSS3 y JavaScript.
- PHP 8.1 o superior.
- MySQL 5.7+ / MariaDB compatible.
- XAMPP para desarrollo local.

## Instalación en XAMPP

1. Copiá la carpeta `EESTfix-main` dentro de `C:\xampp\htdocs\` (podés renombrarla a `EESTfix`).
2. Iniciá Apache y MySQL desde el panel de XAMPP.
3. Abrí `http://localhost/phpmyadmin`.
4. Importá `database.sql`. Se creará la base `eestfix` y sus tablas y datos iniciales de categorías y estados.
5. Revisá `backend/config/database.php`. La configuración predeterminada de XAMPP es host `127.0.0.1`, base `eestfix`, usuario `root` y contraseña vacía. También admite variables de entorno `DB_HOST`, `DB_NAME`, `DB_USER` y `DB_PASS`.
6. Verificá que `uploads/reportes/` tenga permiso de escritura para Apache.
7. Abrí `http://localhost/EESTfix/`.

**Importante:** no abras los HTML con doble clic ni uses `file://`. PHP necesita ejecutarse desde Apache, por ejemplo mediante `http://localhost/EESTfix/`.

## Crear el primer administrador

Por seguridad, el formulario público de registro solo permite crear cuentas de alumno o docente. Primero registrá tu usuario normalmente desde `registro.html`. Después, desde phpMyAdmin, ejecutá la siguiente consulta reemplazando el correo por el que registraste:

```sql
UPDATE usuarios SET rol = 'administrador' WHERE email = 'tu-correo@ejemplo.com';
```

Cerrá sesión y volvé a ingresar para que se actualice el rol en la sesión.

## Funcionalidades incluidas

- Registro de alumnos y docentes, inicio y cierre de sesión.
- Contraseñas almacenadas con `password_hash()` y verificadas con `password_verify()`.
- Sesiones PHP y token CSRF en operaciones de escritura.
- Creación de reportes con categoría, ubicación, descripción y fotografía opcional (JPG, PNG o WEBP, hasta 5 MB).
- Código de seguimiento automático `REP-0001`.
- Listado de reportes propios, detalle y comentarios.
- Panel de administración con estadísticas, cambio de estado y eliminación de reportes.
- Gestión de usuarios y roles.
- Consultas PDO preparadas y validación de permisos en el servidor.

## Rutas principales

- `index.html`: inicio y sección «Sobre nosotros».
- `registro.html` / `login.html`: crear cuenta e ingresar.
- `reportar.html`: crear un reporte (requiere sesión).
- `reportes.html`: consultar los reportes propios (requiere sesión).
- `admin/index.html`: panel administrativo.
- `admin/reportes.html`: gestión de reportes.
- `admin/usuarios.html`: gestión de usuarios.

## Notas de seguridad y despliegue

- No publiques credenciales reales ni habilites el registro de administradores desde el formulario.
- En producción usá HTTPS, una contraseña de base de datos robusta y configurá `DB_*` en el entorno del servidor.
- Los archivos de `uploads/reportes/` no se versionan; el directorio incluye reglas para impedir la ejecución de scripts subidos.
- La aplicación no incluye todavía recuperación de contraseña, verificación de correo ni notificaciones por email.

## Autores

Lucas Delpino, Maximo Orue, Federico Mattia, Ulises Ferrari y Leonel De Armas.

Proyecto desarrollado para la E.E.S.T. N.º 1 "Eduardo Ader".
