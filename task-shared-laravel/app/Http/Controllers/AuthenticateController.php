<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Models\User;

class AuthenticateController extends Controller {
    public function getCurrentUser($apitoken = null)
    {
        if(!$apitoken){
            return;
        }
        $user = User::where('remember_token', $apitoken)->get();
        return $user;
    }
}