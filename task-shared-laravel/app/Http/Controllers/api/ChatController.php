<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Chat;
use App\Models\UserRoom;
use Illuminate\Support\Facades\DB;
use App\Events\ChatMessageRecieved;
use App\Events\ChatMessageDelete;

class ChatController extends Controller
{
    //
    public function getChatMessage($id, $room_id)
    {
        $message = Chat::where([
            ['room_id', $room_id]
            ])
        ->get();

        return $message;
    }

    public function addMessage(Request $request)
    {
        $chat = new Chat();
        $chat->user_id = $request->user_id;
        $chat->room_id = $request->room_id;
        $chat->message = $request->message;
        $chat->save();

        $user = UserRoom::where([
            ["room_id", $request->room_id],
            ["user_id", "<>", $request->user_id],
        ])
        ->get();

        $data = DB::table('chats')
            ->orderBy('id', 'desc')
            ->take(1)
            ->get();
        
        $user_id = $user[0]->user_id;
        $room_id = $user[0]->room_id;
        // イベント通知用
        // event(new ChatMessageRecieved($user_id, $room_id, $data));
        
        return $data;
    }

    public function deleteMessage($user_id, $room_id, $id)
    {
        DB::table('chats')
        ->where('id', $id)
        ->delete();

        $user = UserRoom::where([
            ["room_id", $room_id],
            ["user_id", "<>", $user_id],
        ])
        ->get();

        $uid = $user[0]->user_id;

        // event(new ChatMessageDelete($uid, $room_id, $id));

        return $id;
    }

    public function getChatUser($gid)
    {
        $users = DB::table("group_member_ships")
            ->select("users.user_id", "users.name")
            ->join("groups", "groups.group_id", "=", "group_member_ships.group_id")
            ->join("users", "users.user_id", "=", "group_member_ships.user_id")
            ->where("group_member_ships.group_id", $gid)
            ->get();

        return $users;
    }
}
