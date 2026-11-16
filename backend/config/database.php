<?php
declare(strict_types=1);

set_exception_handler(function (Throwable $e): void {
    error_log($e->getMessage());
    if (!headers_sent()) { http_response_code(500); header('Content-Type: application/json; charset=utf-8'); }
    echo json_encode(['ok' => false, 'message' => 'Error interno del servidor. Revisá la configuración y los registros de PHP.'], JSON_UNESCAPED_UNICODE);
    exit;
});

if (session_status() !== PHP_SESSION_ACTIVE) {
    $secure = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
    session_set_cookie_params(['httponly' => true, 'secure' => $secure, 'samesite' => 'Lax']);
    session_start();
}

function db(): PDO {
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;
    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $name = getenv('DB_NAME') ?: 'eestfix';
    $user = getenv('DB_USER') ?: 'root';
    $pass = getenv('DB_PASS') ?: '';
    $pdo = new PDO("mysql:host={$host};dbname={$name};charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    return $pdo;
}

function json_response(array $data, int $status = 200): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}
function request_data(): array {
    $raw = file_get_contents('php://input');
    $json = json_decode($raw ?: '', true);
    return is_array($json) ? $json : $_POST;
}
function require_login(): array {
    if (empty($_SESSION['user'])) json_response(['ok'=>false,'message'=>'Iniciá sesión para continuar.'], 401);
    return $_SESSION['user'];
}
function require_admin(): array {
    $u = require_login();
    if (($u['rol'] ?? '') !== 'administrador') json_response(['ok'=>false,'message'=>'No tenés permisos para realizar esta acción.'], 403);
    return $u;
}
function csrf_check(): void {
    $token = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? ($_POST['csrf_token'] ?? '');
    if (empty($_SESSION['csrf']) || !hash_equals($_SESSION['csrf'], $token)) {
        json_response(['ok'=>false,'message'=>'La sesión del formulario venció. Recargá la página e intentá nuevamente.'], 419);
    }
}
function csrf_token(): string {
    if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
    return $_SESSION['csrf'];
}
function text_input(array $data, string $key, int $max, bool $required = true): string {
    $v = trim((string)($data[$key] ?? ''));
    if ($required && $v === '') json_response(['ok'=>false,'message'=>"El campo {$key} es obligatorio."], 422);
    if (mb_strlen($v) > $max) json_response(['ok'=>false,'message'=>"El campo {$key} supera el máximo de {$max} caracteres."], 422);
    return $v;
}
