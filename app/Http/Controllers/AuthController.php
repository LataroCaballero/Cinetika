<?php

require_once "../../../config/database.php";
require_once "../../../config/jwt_config.php";
require_once "../../../vendor/autoload.php";
require_once "../../Models/User.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class authController extends Controller{
    private $user;

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:users',
            'password' => 'required|string'
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $user = $this->user->where('name', $request->name)->first();
        if($request->input('password') == $user->$password){ 
            $token = [
                "iss" => JwtConfig::getIssuer(),
                "aud" => JwtConfig::getAudience(),
                "iat" => JwtConfig::getIssueAt(),
                "exp" => JwtConfig::getExpirationTime(),
                "data" => [
                    "id" => $user->id,
                    "email" => $user->email
                ]
            ];
            $jwt = JWT::encode($token,JwtConfig::getKey(), 'HS256');
            return response()->json(["message" => "Inicio de sesion exitoso", "token"=>$jwt], 201);
        }
    }

}