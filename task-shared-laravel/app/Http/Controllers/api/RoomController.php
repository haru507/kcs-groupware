<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Room;
use App\Models\UserRoom;

class RoomController extends Controller
{
    // チャットルーム取得
    public function getChatRoom($id)
    {
        $data = DB::table('user_rooms')
            ->where('user_id', $id)
            ->get();

        return $data;
    }

    // チャットルーム作成
    public function createChatRoom(Request $request){
        $room = new Room();
        $room->timestamps = false;    // 追記
        $room->save();

        $users1 = new UserRoom();
        $users1->user_id = $request->myUser_id;
        $users1->room_id = $room->room_id;
        $users1->room_name = $request->myRoom_name;
        $users1->timestamps = false; 
        $users1->save();

        $users2 = new UserRoom();
        $users2->user_id = $request->otherUser_id;
        $users2->room_id = $room->room_id;
        $users2->room_name = $request->otherRoom_name;
        $users2->timestamps = false; 
        $users2->save();

        return $users1;
    }
}
