<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Chat;

class ChatTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // 
        $chat = new Chat();
        $chat->user_id = 20192137;
        $chat->room_id = 2;
        $chat->message = "今は、プレゼン資料を作ってます。";
        $chat->save();
        // 
        $chat = new Chat();
        $chat->user_id = 20192132;
        $chat->room_id = 2;
        $chat->message = "了解。";
        $chat->save();
        // 
        $chat = new Chat();
        $chat->user_id = 20192132;
        $chat->room_id = 2;
        $chat->message = "では、引き続きお願いします。";
        $chat->save();
    }
}
