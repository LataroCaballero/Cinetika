<?php

class JwtConfig{
    private static $key = "my secret key";
    private static $issuer = "localhost";
    private static $audience = "localhost";
    private static $issueAt=null;
    private static $expirationTime=null;

    public static function getKey() { 
    return self::$key; 
    }
    public static function getIssuer() { 
    return self::$issuer; 
    }
    public static function getAudience() { 
    return self::$audience; 
    }
    public static function getIssueAt() { 
    self::$issueAt=time();
    return self::$issueAt; 
    }
    public static function getExpirationTime() {
    self::$expirationTime=self::$issueAt+3600;
    return self::$expirationTime; 
    }
}