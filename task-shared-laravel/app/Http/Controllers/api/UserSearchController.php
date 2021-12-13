<?php

namespace App\Http\Controllers\api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\DB;
// Mailファサード
use Illuminate\Support\Facades\Mail;
use App\Mail\PassChangeNotification;

class UserSearchController extends Controller
{
    // ユーザ情報の取得
    public function getUserSearch($username)
    {
        $user = User::where('name', 'like', "%$username%")->get();
        return $user;
    }

    public function getRoomSearch($user_id, $other_name)
    {
        $data = DB::table('user_rooms')
            ->where([
                ['user_id', $user_id],
                ['room_name', $other_name],
                ])
            ->get();
        
        if($data->isEmpty()){
            return false;
        }

        return $data;
    }

    public function getPassForget($user_id)
    {
        $user = User::where('user_id', $user_id)->get();

        if($user->isEmpty()){
            return;
        }

        $pass = str_random(10);
        $mail = $user_id."@kcska.onmicrosoft.com";

        $data = User::where('user_id', $user_id)
                    ->update([
                        'password' => $pass
                    ]);

        Mail::to($mail)->send( new PassChangeNotification($user_id, $pass) );
    }
}
