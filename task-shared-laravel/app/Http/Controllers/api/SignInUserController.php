<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
// JWT関連
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class SignInUserController extends Controller
{
    // ログイン処理
    public function SignIn(Request $request)
    {
        // grab credentials from the request
        $credentials = $request->only('id', 'password');
        $bool = 1;
        
        $user = User::where([
            ['user_id', $request->id],
            ['password', $request->password]
            ])
        ->first();

        if(!$user){
            return response()->json(
                ['errors' => ['key' => ['ユーザが存在しません。']]]
                , 401);
        }

        if($user->auth === 0){
            return response()->json(
                ['errors' => ['key' => ['Authがnullです。認証をしてください。']]]
                , 401);
        }
        // all good so return the token
        $token = str_random(100);

        DB::table('users')
            ->where([
                ['user_id', $request->id],
                ['password', $request->password]
            ])
            ->update([
                'isSignedIn' => $bool,
                'remember_token' => $token,
            ]);

        $users = User::where([
            ['user_id', $request->id],
            ['password', $request->password],
        ])->first();
        return $users;
    }
}
