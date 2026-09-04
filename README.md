EESTfix 

Sistema web para reportar, gestionar y realizar el seguimiento de problemas dentro de la institución educativa.

 Descripción

EESTfix es una plataforma desarrollada para facilitar la comunicación de problemas relacionados con la infraestructura y los recursos de la escuela.

Los alumnos y docentes podrán informar problemas como:

-  Luces que no funcionan.
-  Problemas en baños o canillas.
-  Bancos y sillas dañados.
-  Puertas o ventanas rotas.
-  Problemas con computadoras o proyectores.
-  Problemas de calefacción o ventilación.
-  Problemas relacionados con la limpieza.
-  Problemas eléctricos.

Cada reporte tendrá un estado que permitirá realizar un seguimiento de su resolución.

 Objetivos

- Facilitar el reporte de problemas dentro de la institución.
- Centralizar los reportes en un único sistema.
- Permitir consultar el estado de cada problema.
- Mantener un historial de los problemas reportados.
- Facilitar la gestión de los reportes por parte de los administradores.
- Mejorar la comunicación entre la comunidad educativa y el personal encargado.

 Tipos de usuarios

Alumno / Docente

Podrá:

- Crear reportes.
- Adjuntar imágenes.
- Consultar sus reportes.
- Ver el estado de sus reportes.
- Agregar información a un reporte.

Administrador

Podrá:

- Ver todos los reportes.
- Filtrar reportes.
- Cambiar el estado de los reportes.
- Gestionar usuarios.
- Eliminar reportes.
- Consultar estadísticas.

 Estados de un reporte

Un reporte podrá pasar por diferentes estados:

Pendiente
    ↓
En revisión
    ↓
En reparación
    ↓
Solucionado

También podrá marcarse como rechazado si el reporte no es válido.

 Base de datos

El sistema utilizará una base de datos relacional para almacenar la información.

Entre las principales entidades se encuentran:

- Usuarios
- Reportes
- Categorías
- Estados
- Comentarios

Cada reporte tendrá un identificador único, por ejemplo:

REP-0248

Esto permitirá localizar fácilmente un reporte y consultar su estado.

 Tecnologías

El proyecto utiliza:

- HTML5
- CSS3
- JavaScript
- PHP
- MySQL
- XAMPP
- Git
- GitHub

 Estructura

EESTfix/
├── index.html
├── reportar.html
├── reportes.html
├── mis-reportes.html
├── login.html
├── registro.html
├── perfil.html
│
├── admin/
├── css/
├── js/
├── img/
├── backend/
└── database/

 Funcionalidades

- Sistema de usuarios.
- Inicio de sesión y registro.
- Creación de reportes.
- Carga de imágenes.
- Categorías de problemas.
- Estados de reportes.
- Seguimiento mediante código.
- Panel de administración.
- Sistema de comentarios.
- Filtros y búsqueda.
- Animaciones e interacciones mediante JavaScript.

 Instalación

1. Clonar el repositorio

git clone https://github.com/USUARIO/EESTfix.git

2. Colocar el proyecto en XAMPP

Copiar la carpeta del proyecto dentro de:

C:\xampp\htdocs\

3. Iniciar XAMPP

Activar:

Apache
MySQL

4. Crear la base de datos

Ingresar a phpMyAdmin y ejecutar:

database/schema.sql

Luego, si corresponde:

database/datos_iniciales.sql

5. Configurar la conexión

Modificar el archivo:

backend/config/database.php

con los datos correspondientes a la instalación local.

Estado del proyecto

En desarrollo

El proyecto se encuentra en desarrollo y sus funcionalidades se irán implementando progresivamente.

Licencia

Este proyecto se encuentra bajo la licencia MIT.

Consultar el archivo "LICENSE" para más información.

 Autores

Proyecto desarrollado para la E.E.S.T. N.º 1 "Eduardo Ader".
