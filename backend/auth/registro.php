<?php
require_once __DIR__ . '/../config/database.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(['ok'=>false,'message'=>'Método no permitido.'],405);
csrf_check();
$d=request_data();
$nombre=text_input($d,'nombre',100); $apellido=text_input($d,'apellido',100);
$email=strtolower(text_input($d,'email',150)); $password=(string)($d['password']??'');
$rol=(string)($d['rol']??'alumno');
if (!filter_var($email,FILTER_VALIDATE_EMAIL)) json_response(['ok'=>false,'message'=>'Ingresá un correo válido.'],422);
if (strlen($password)<8) json_response(['ok'=>false,'message'=>'La contraseña debe tener al menos 8 caracteres.'],422);
if (!in_array($rol,['alumno','docente'],true)) json_response(['ok'=>false,'message'=>'Rol inválido.'],422);
try {
 $pdo=db(); $q=$pdo->prepare('SELECT id FROM usuarios WHERE email=?'); $q->execute([$email]);
 if($q->fetch()) json_response(['ok'=>false,'message'=>'Ese correo ya está registrado.'],409);
 $q=$pdo->prepare('INSERT INTO usuarios(nombre,apellido,email,password,rol) VALUES(?,?,?,?,?)');
 $q->execute([$nombre,$apellido,$email,password_hash($password,PASSWORD_DEFAULT),$rol]);
 session_regenerate_id(true); $_SESSION['user']=['id'=>(int)$pdo->lastInsertId(),'nombre'=>$nombre,'apellido'=>$apellido,'email'=>$email,'rol'=>$rol]; csrf_token();
 json_response(['ok'=>true,'message'=>'Cuenta creada correctamente.','user'=>$_SESSION['user']]);
} catch(Throwable $e){error_log($e->getMessage());json_response(['ok'=>false,'message'=>'No se pudo completar el registro. Revisá la conexión con la base de datos.'],500);}
