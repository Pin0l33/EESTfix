EESTfix 🔧

Sistema web para reportar, gestionar y realizar el seguimiento de problemas dentro de la institución educativa.

📌 Descripción

EESTfix es una plataforma web desarrollada para facilitar la comunicación entre los integrantes de la institución y el personal encargado del mantenimiento.

Los alumnos y docentes podrán reportar problemas relacionados con la infraestructura, los espacios y los recursos de la escuela.

Al realizar un reporte, el usuario podrá agregar una descripción, indicar la ubicación del problema y adjuntar una fotografía como evidencia.

Algunos ejemplos de problemas que podrán reportarse:

- 💡 Luces que no funcionan.
- 🚰 Problemas en baños o canillas.
- 🪑 Bancos y sillas dañados.
- 🚪 Puertas o ventanas rotas.
- 💻 Computadoras o proyectores con problemas.
- 🌡️ Problemas de calefacción o ventilación.
- 🧹 Problemas de limpieza.
- ⚡ Problemas eléctricos.

Cada reporte tendrá un estado que permitirá realizar un seguimiento de su resolución.

🎯 Problemática

Actualmente, cuando un alumno o docente encuentra un problema dentro de la institución, puede resultar difícil comunicarlo de manera organizada y realizar un seguimiento de su solución.

Los reportes realizados mediante mensajes, avisos u otros medios pueden perderse y no siempre existe un registro centralizado.

EESTfix busca solucionar este problema mediante una plataforma única donde los problemas puedan ser registrados, consultados y gestionados.

💡 Objetivos

- Facilitar el reporte de problemas dentro de la institución.
- Centralizar todos los reportes en un único sistema.
- Permitir adjuntar fotografías a los reportes.
- Permitir consultar el estado de cada problema.
- Mantener un historial de los problemas reportados.
- Facilitar la gestión de los reportes por parte de los administradores.
- Mejorar la comunicación entre la comunidad educativa y el personal encargado.

👥 Usuarios

Alumno / Docente

Los usuarios podrán:

- Crear reportes.
- Agregar una descripción del problema.
- Seleccionar una categoría.
- Indicar la ubicación.
- Adjuntar fotografías.
- Consultar sus reportes.
- Ver el estado de sus reportes.
- Agregar comentarios o información adicional.

Administrador

Los administradores podrán:

- Ver todos los reportes.
- Buscar y filtrar reportes.
- Consultar la información de cada reporte.
- Ver las fotografías adjuntas.
- Cambiar el estado de los reportes.
- Gestionar usuarios.
- Eliminar reportes.
- Consultar estadísticas.

🔄 Estados de un reporte

Los reportes podrán avanzar por diferentes estados:

Pendiente
    ↓
En revisión
    ↓
En reparación
    ↓
Solucionado

También podrá utilizarse el estado:

Rechazado

cuando un reporte no sea válido.

📸 Fotografías

Los usuarios podrán adjuntar fotografías al momento de crear un reporte.

Las imágenes se almacenarán en el servidor dentro de:

uploads/reportes/

La base de datos no almacenará directamente las imágenes. En su lugar, almacenará la ruta correspondiente al archivo.

Ejemplo:

uploads/reportes/reporte_0248.jpg

Las fotografías subidas por los usuarios no serán almacenadas en el repositorio de GitHub.

🗄️ Base de datos

EESTfix utilizará MySQL como sistema de gestión de base de datos.

Entre las principales entidades se encuentran:

- Usuarios
- Reportes
- Categorías
- Estados
- Comentarios

Un reporte tendrá un identificador único, por ejemplo:

REP-0248

Esto permitirá localizarlo fácilmente y consultar su información y estado.

🔗 Relaciones principales

Usuario
   │
   └──────< Reporte
                │
                ├────── Categoría
                │
                ├────── Estado
                │
                └──────< Comentario

Un usuario puede crear varios reportes.

Cada reporte pertenece a una categoría y tiene un estado determinado.

Un reporte también puede tener varios comentarios.

💻 Tecnologías

El proyecto utiliza:

- HTML5 — estructura de las páginas.
- CSS3 — diseño y estilos.
- JavaScript — funcionalidades, interacciones y animaciones.
- PHP — lógica del servidor y comunicación con MySQL.
- MySQL — almacenamiento y gestión de los datos.
- XAMPP — entorno de desarrollo local.
- Git / GitHub — control de versiones.

✨ Funcionalidades

- Registro de usuarios.
- Inicio y cierre de sesión.
- Creación de reportes.
- Selección de categorías.
- Indicación de ubicación.
- Carga de fotografías.
- Visualización de reportes.
- Seguimiento mediante código.
- Estados de los reportes.
- Sistema de comentarios.
- Búsqueda y filtros.
- Panel de administración.
- Gestión de usuarios.
- Estadísticas.
- Animaciones e interacciones mediante JavaScript.

📁 Estructura del proyecto

EESTfix/
│
├── index.html
├── reportar.html
├── reportes.html
├── mis-reportes.html
├── login.html
├── registro.html
├── perfil.html
│
├── admin/
│   ├── index.html
│   ├── reportes.html
│   └── usuarios.html
│
├── css/
│   ├── style.css
│   ├── auth.css
│   └── admin.css
│
├── js/
│   ├── main.js
│   ├── animaciones.js
│   ├── reportes.js
│   └── auth.js
│
├── img/
│   ├── logo.png
│   └── icons/
│
├── uploads/
│   └── reportes/
│
├── backend/
│   ├── config/
│   │   └── database.php
│   │
│   ├── auth/
│   │   ├── login.php
│   │   ├── registro.php
│   │   └── logout.php
│   │
│   ├── reportes/
│   │   ├── crear.php
│   │   ├── listar.php
│   │   ├── obtener.php
│   │   ├── actualizar.php
│   │   └── eliminar.php
│   │
│   └── usuarios/
│       ├── obtener.php
│       ├── actualizar.php
│       └── eliminar.php
│
├── database.sql
├── .gitignore
├── LICENSE
└── README.md

🚀 Instalación

1. Clonar el repositorio

git clone https://github.com/USUARIO/EESTfix.git

2. Colocar el proyecto en XAMPP

Copiar la carpeta "EESTfix" dentro de:

C:\xampp\htdocs\

3. Iniciar XAMPP

Activar los servicios:

Apache
MySQL

4. Crear la base de datos

Abrir phpMyAdmin y ejecutar el archivo:

database.sql

Este archivo contiene las instrucciones necesarias para crear la base de datos y sus tablas.

5. Configurar la conexión

Editar:

backend/config/database.php

y colocar los datos correspondientes a la instalación local de MySQL.

🧪 Estado del proyecto

🚧 En desarrollo

EESTfix se encuentra actualmente en desarrollo. Las funcionalidades serán implementadas progresivamente.

📄 Licencia

Este proyecto utiliza la licencia MIT.

Consultar el archivo "LICENSE" para obtener más información.

👨‍💻 Autores
Lucas Delpino
Maximo Orue
Federico Mattia
Ulises Ferrari
Leonel De Armas

Proyecto desarrollado para la E.E.S.T. N.º 1 "Eduardo Ader".
