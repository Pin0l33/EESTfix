<?php
require_once __DIR__ . '/../config/database.php';require_admin();$q=db()->query('SELECT u.id,u.nombre,u.apellido,u.email,u.rol,u.activo,u.fecha_creacion,COUNT(r.id) AS cantidad_reportes FROM usuarios u LEFT JOIN reportes r ON r.id_usuario=u.id GROUP BY u.id ORDER BY u.fecha_creacion DESC');json_response(['ok'=>true,'usuarios'=>$q->fetchAll()]);
