<?php
require_once __DIR__ . '/../config/database.php';
if($_SERVER['REQUEST_METHOD']!=='POST') json_response(['ok'=>false,'message'=>'Método no permitido.'],405);
csrf_check(); $_SESSION=[]; if(ini_get('session.use_cookies')){$p=session_get_cookie_params();setcookie(session_name(),'',time()-42000,$p['path'],$p['domain'],$p['secure'],$p['httponly']);} session_destroy(); json_response(['ok'=>true,'message'=>'Sesión cerrada.']);
