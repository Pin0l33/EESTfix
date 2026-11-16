<?php
require_once __DIR__ . '/../config/database.php';
$u=require_login();$admin=($u['rol']==='administrador');$where=[];$args=[];
if(!$admin){$where[]='r.id_usuario=?';$args[]=$u['id'];}
if(!empty($_GET['estado'])){$where[]='e.nombre=?';$args[]=trim($_GET['estado']);}
if(!empty($_GET['q'])){$where[]='(r.codigo LIKE ? OR r.titulo LIKE ? OR r.ubicacion LIKE ?)';$v='%'.trim($_GET['q']).'%';array_push($args,$v,$v,$v);}
$sql='SELECT r.id,r.codigo,r.titulo,r.descripcion,r.ubicacion,r.imagen,r.fecha_creacion,r.fecha_actualizacion,e.nombre AS estado,c.nombre AS categoria,u.nombre AS autor,u.apellido AS apellido FROM reportes r JOIN estados e ON e.id=r.id_estado JOIN categorias c ON c.id=r.id_categoria JOIN usuarios u ON u.id=r.id_usuario';if($where)$sql.=' WHERE '.implode(' AND ',$where);$sql.=' ORDER BY r.fecha_creacion DESC';
try{$q=db()->prepare($sql);$q->execute($args);json_response(['ok'=>true,'reportes'=>$q->fetchAll()]);}catch(Throwable $e){error_log($e->getMessage());json_response(['ok'=>false,'message'=>'No se pudieron cargar los reportes.'],500);}
