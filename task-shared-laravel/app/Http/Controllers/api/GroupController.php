<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Group;
use App\Models\GroupMemberShip;
use App\Models\Room;
use App\Models\UserRoom;
use App\Models\Chat;
use Illuminate\Support\Facades\DB;

class GroupController extends Controller
{
    //グループ作成
    public function createGroup(Request $request, $user_id)
    {
        $groups = new Group();
        $groups->name = $request->name;
        $groups->leaderUser_id = $request->leader;
        $groups->save();

        $group_id = $groups->group_id;
        $user = $request->userLists;

        // グループのチャットを作成する
        $room = new Room();
        $room->timestamps = false;    // 追記
        $room->save();
        $room_id = $room->room_id;  // ルームID

        collect($user);
        // print_r($user);

        // 他のユーザを追加
        for($i=0; $i<count($user); $i++){
            DB::table("group_member_ships")
                ->insert([
                    "user_id" => $user[$i]["user_id"],
                    "group_id" => $group_id,
                ]);
            
            // user_room作成
            DB::table("user_rooms")
                ->insert([
                    "user_id" => $user[$i]["user_id"],
                    "group_id" => $group_id,
                    "room_id" => $room_id,
                    "room_name" => $groups->name,
                ]);
        }
        return $group_id;
    }
    //グループ更新
    public function updateGroup(Request $request, $group_id)
    {
            // user_room取得
            $room_id = UserRoom::select("room_id")
                ->where('group_id', $group_id)
                ->first();
            
            $room_name = Group::select("name")
                ->where('group_id', $group_id)
                ->first();

            $user = $request->updateList;
            // print_r($user);

            collect($user);
            //他のユーザを追加
            for($i=0; $i<count($user); $i++){
                DB::table("group_member_ships")
                    ->insert([
                        "user_id" => $user[$i]["user_id"],
                        "group_id" => $group_id,
                    ]);
                
                // user_room作成
                DB::table("user_rooms")
                    ->insert([
                        "user_id" => $user[$i]["user_id"],
                        "group_id" => $group_id,
                        "room_id" => $room_id->room_id,
                        "room_name" => $room_name->name,
                    ]);
            }
            return;
    }
    //グループ名更新
    public function updateGroupName(Request $request, $group_id)
    {
            // user_room取得
            $room_id = UserRoom::select("room_id")
                ->where('group_id', $group_id)
                ->first();

            $name = $request->name;
            // echo $name;
            //他のユーザを追加
            DB::table("groups")
                ->where("group_id", $group_id)
                ->update(["name" => $name]);
                
            // user_room作成
            DB::table("user_rooms")
                ->where([
                    ["group_id", $group_id],
                    ["room_id", $room_id->room_id],
                ])
                ->update(["room_name" => $name]);
    }
    //グループから退会
    public function exitGroup($user_id, $group_id)
    {
        $gms = GroupMemberShip::where([
            ["group_id", $group_id],
            ["user_id", $user_id]
        ])->delete();

        $result = GroupMemberShip::where("group_id", $group_id)->get();
        // print_r($result);
        // echo $result;
        if($result->isEmpty()){
            Group::where("group_id",$group_id)
                ->delete();
            
        }

        DB::table("user_rooms")
        ->where([
            ["user_id", $user_id],
            ["group_id", $group_id],
        ])
        ->delete();
        return;
    }
    //グループ読み込み
    public function readGroup($user_id)
    {
        $rt_groups = array();
        $groups_id = GroupMemberShip::select("group_id")->where("user_id", $user_id)->get();
        
        // if($groups_id->isEmpty()){
        //     return ;
        // }
        
        $arrays = collect($groups_id)->map(function ($group_id, $key) {
            return $group_id->toArray();
        });

        foreach($arrays as $array){
            
            $gr = Group::select('group_id','name',"leaderUser_id")->where("group_id", $array["group_id"])->get();
            
            $users = DB::table("group_member_ships");
            $users->select("users.*");
            $users->join("groups", "groups.group_id", "=", "group_member_ships.group_id");
            $users->join("users", "users.user_id", "=", "group_member_ships.user_id");
            $users->where("group_member_ships.group_id", $array["group_id"]);
            $result = $users->get();
            $collection = collect([$gr, $result]);
            array_push($rt_groups, $collection);
        }
        return $rt_groups;
    }
}
