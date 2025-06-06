<?php
namespace App\Http\Controllers;


use JwtConfig;
use \App\Models\User;
use Hash;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Validator;
class AuthController extends Controller{
    private $user;

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'password' => 'required|string'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $user = User::where('name', $request->name)->first();;
        if(Hash::check($request->password, $user->password)){ 
            $token = [
                "iss" => JwtConfig::getIssuer(),
                "aud" => JwtConfig::getAudience(),
                "iat" => JwtConfig::getIssueAt(),
                "exp" => JwtConfig::getExpirationTime(),
                "data" => [
                    "id_usuario" => $user->id,
                    "email" => $user->email
                ]
            ];
            $jwt = JWT::encode($token,JwtConfig::getKey(), 'HS256');
            return response()->json(["message" => "Inicio de sesion exitoso", "token"=>$jwt], 201);
        }
        return response()->json(["message" => "Inicio de sesion fallido, contraseña incorrecta"]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Usuario creado con éxito']);
    }

}