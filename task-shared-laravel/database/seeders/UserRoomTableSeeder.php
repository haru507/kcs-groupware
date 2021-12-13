<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\UserRoom;

class UserRoomTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $user = new UserRoom();
        $user->user_id = 20192137;
        $user->room_id = 1;
        $user->room_name = "Ishii Haruki";
        $user->timestamps = false;    // 追記
        $user->save();

        return $user;
    }
}
