<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
// UUIDライブラリ
use Ramsey\Uuid\Uuid;
// Mailファサード
use Illuminate\Support\Facades\Mail;
use App\Mail\ActivationCreated;
// JWT
use JWTAuth;

class SignUpUserController extends Controller
{
    //
    public function SignUp(Request $request) {
    $user = new User();
    $user->user_id = $request->user_id;
    $user->name = $request->name;
    $user->email = $request->email;
    $user->password = $request->password;
    $user->isSignedIn = $request->isSignedIn;
    $user->auth = $request->auth;
    $user->code = Uuid::uuid4();
    $user->save();

    // メールを送る
    Mail::to($user->email)->send(new ActivationCreated($user));
    }

    public function activate($code) {
        $bool = true;
        // echo $code;
        $activation = User::where('code',$code)->first();
        if(!$activation){
            return response()->json(
            ['errors' => ['key' => ['認証キーが無効です。']]]
            , 401);
        }
        // if(!$this->checkCode($code)){
        //     return response()->json(
        //     ['errors' => ['key' => ['認証キーが無効です。']]]
        //     , 401);
        // }
        DB::table('users')
            ->where([
                ['user_id', $activation->user_id],
                ['password', $activation->password]
            ])
            ->update([
                'auth' => $bool,
                'email_verified_at' => Carbon::now(),
            ]);

        // Json Web Tokenの発行
        // $token = JWTAuth::fromUser($activation);
        echo '認証が完了しました。ログイン画面からサインインしてください。';
        return;
    }
    /**
      * コードが有効かチェックする
      */

    // private function checkCode($code){
    //     $activation = User::where('code',$code)->first();
    //     if(!$activation){
    //         return false;
    //     }
    //     $id = $activation->id;
    //     $latest = User::where('id',$id)
    //     ->orderBy('created_at', 'desc')
    //     ->first();
    //     $user = User::where('id',$id)->first();
    //     return $code === $latest->code && !$user;
    // }
}
