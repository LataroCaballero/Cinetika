<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;
use App\Models\User;
use JwtConfig;

class JwtMiddleware
{
    public function handle($request, Closure $next)
    {
        $token = null;
        $jwt_key = env('JWT_SECRET', 'tu_clave_secreta');

        $authHeader = $request->header('Authorization');

        if ($authHeader && preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
            $token = $matches[1];
        }

        if (!$token) {
            return response()->json(['error' => 'Token no proporcionado'], 401);
        }

        try {
            $decoded = JWT::decode($token, new Key(JwtConfig::getKey(), 'HS256'));
            $user = User::where("id_usuario", $decoded->data->id_usuario);

            if (!$user) {
                return response()->json(['error' => 'Usuario no encontrado'], 401);
            }

            $request->auth = $user;
        } catch (Exception $e) {
            return response()->json(['error' => 'Token inválido: ' . $e->getMessage()], 401);
        }

        return $next($request);
    }
}