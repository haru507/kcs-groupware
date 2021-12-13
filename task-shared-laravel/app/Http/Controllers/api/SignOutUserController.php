<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class SignOutUserController extends Controller
{
    // ログアウト処理
    public function SignOut(Request $request){
        $id = $request->id;
        User::where("user_id", $id)
        ->update([
            "isSignedIn" => 0,
            "remember_token" => null,
        ]);
        return;
    }
}
