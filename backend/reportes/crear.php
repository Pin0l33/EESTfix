<?php
require_once __DIR__ . '/../config/database.php';
if($_SERVER['REQUEST_METHOD']!=='POST') json_response(['ok'=>false,'message'=>'Método no permitido.'],405);
$u=require_login(); csrf_check();
$titulo=text_input($_POST,'titulo',150);$descripcion=text_input($_POST,'descripcion',5000);$ubicacion=text_input($_POST,'ubicacion',150);$cat=trim((string)($_POST['categoria']??''));
$pdo=db();$q=$pdo->prepare('SELECT id FROM categorias WHERE nombre=?');$q->execute([$cat]);$catId=$q->fetchColumn();if(!$catId)json_response(['ok'=>false,'message'=>'Seleccioná una categoría válida.'],422);
$imagen=null;
if(isset($_FILES['foto']) && $_FILES['foto']['error']!==UPLOAD_ERR_NO_FILE){$f=$_FILES['foto'];if($f['error']!==UPLOAD_ERR_OK)json_response(['ok'=>false,'message'=>'No se pudo subir la imagen.'],422);if($f['size']>5*1024*1024)json_response(['ok'=>false,'message'=>'La imagen no puede superar los 5 MB.'],422);
 $mime=(new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name']);$ext=['image/jpeg'=>'jpg','image/png'=>'png','image/webp'=>'webp'][$mime]??null;if(!$ext)json_response(['ok'=>false,'message'=>'Formato no permitido. Usá JPG, PNG o WEBP.'],422);
 $dir=dirname(__DIR__,2).'/uploads/reportes';if(!is_dir($dir)&&!mkdir($dir,0755,true))json_response(['ok'=>false,'message'=>'No se pudo preparar el almacenamiento.'],500);$file=bin2hex(random_bytes(16)).'.'.$ext;if(!move_uploaded_file($f['tmp_name'],$dir.'/'.$file))json_response(['ok'=>false,'message'=>'No se pudo guardar la imagen.'],500);$imagen='uploads/reportes/'.$file;
}
try{$pdo->beginTransaction();$q=$pdo->prepare("SELECT id FROM estados WHERE nombre='Pendiente'");$q->execute();$estado=$q->fetchColumn();if(!$estado)throw new RuntimeException('Falta el estado Pendiente.');
$q=$pdo->prepare('INSERT INTO reportes(codigo,titulo,descripcion,ubicacion,imagen,id_usuario,id_categoria,id_estado) VALUES(?,?,?,?,?,?,?,?)');$q->execute(['TMP-'.bin2hex(random_bytes(5)),$titulo,$descripcion,$ubicacion,$imagen,$u['id'],$catId,$estado]);$id=(int)$pdo->lastInsertId();$codigo='REP-'.str_pad((string)$id,4,'0',STR_PAD_LEFT);$pdo->prepare('UPDATE reportes SET codigo=? WHERE id=?')->execute([$codigo,$id]);$pdo->commit();json_response(['ok'=>true,'message'=>'Reporte creado correctamente.','codigo'=>$codigo],201);
}catch(Throwable $e){if($pdo->inTransaction())$pdo->rollBack();if($imagen&&is_file(dirname(__DIR__,2).'/'.$imagen))@unlink(dirname(__DIR__,2).'/'.$imagen);error_log($e->getMessage());json_response(['ok'=>false,'message'=>'No se pudo guardar el reporte.'],500);}
