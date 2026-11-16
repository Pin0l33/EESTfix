<?php
require_once __DIR__ . '/../config/database.php';
if($_SERVER['REQUEST_METHOD']!=='POST') json_response(['ok'=>false,'message'=>'Método no permitido.'],405);
csrf_check(); $d=request_data(); $email=strtolower(text_input($d,'email',150)); $password=(string)($d['password']??'');
try{$q=db()->prepare('SELECT id,nombre,apellido,email,password,rol,activo FROM usuarios WHERE email=? LIMIT 1');$q->execute([$email]);$u=$q->fetch();
 if(!$u || !password_verify($password,$u['password']) || !(int)$u['activo']) json_response(['ok'=>false,'message'=>'Correo o contraseña incorrectos, o cuenta deshabilitada.'],401);
 session_regenerate_id(true); unset($u['password'],$u['activo']);$u['id']=(int)$u['id'];$_SESSION['user']=$u;csrf_token();json_response(['ok'=>true,'message'=>'Sesión iniciada.','user'=>$u,'csrf'=>$_SESSION['csrf']]);
}catch(Throwable $e){error_log($e->getMessage());json_response(['ok'=>false,'message'=>'No se pudo iniciar sesión. Verificá la base de datos.'],500);}
