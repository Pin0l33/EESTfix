<?php
require_once __DIR__ . '/../config/database.php';
json_response(['ok'=>true,'user'=>$_SESSION['user']??null,'csrf'=>csrf_token()]);
