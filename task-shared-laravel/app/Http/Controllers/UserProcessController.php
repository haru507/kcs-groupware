<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserProcessController extends Controller
{
    // ユーザの画像を変更する
    public function imageChange(Request $request)
    {
        $id = $request->user_id;
        $image = $request->image;
        
    }
}
