<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
// UUIDライブラリ
use Ramsey\Uuid\Uuid;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $user = new User();
        $user->user_id = 20192137;
        $user->name = 'Kawaguchi Yasunaru';
        $user->email = '20192137@kcska.onmicrosoft.com';
        $user->password = 12345678;
        $user->isSignedIn = 1;
        $user->auth = 1;
        $user->code = Uuid::uuid4();
        $user->save();
        
        $user1 = new User();
        $user1->user_id = 20192134;
        $user1->name = 'Yoshizaki chihiro';
        $user1->email = '20192134@kcska.onmicrosoft.com';
        $user1->password = 12345678;
        $user1->isSignedIn = 1;
        $user1->auth = 1;
        $user1->code = Uuid::uuid4();
        $user1->save();
        
        $user2 = new User();
        $user2->user_id = 20190003;
        $user2->name = 'Test 3';
        $user2->email = '20190003@kcska.onmicrosoft.com';
        $user2->password = 12345678;
        $user2->isSignedIn = 1;
        $user2->auth = 1;
        $user2->code = Uuid::uuid4();
        $user2->save();
        
        $user3 = new User();
        $user3->user_id = 20192103;
        $user3->name = 'Miyaguchi Futoshi';
        $user3->email = '20192103@kcska.onmicrosoft.com';
        $user3->password = 12345678;
        $user3->isSignedIn = 1;
        $user3->auth = 1;
        $user3->code = Uuid::uuid4();
        $user3->save();

        $user4 = new User();
        $user4->user_id = 20192132;
        $user4->name = 'Ishii Haruki';
        $user4->email = '20192132@kcska.onmicrosoft.com';
        $user4->password = 12345678;
        $user4->isSignedIn = 1;
        $user4->auth = 1;
        $user4->code = Uuid::uuid4();
        $user4->save();

        $user5 = new User();
        $user5->user_id = 20192139;
        $user5->name = 'Iiboshi Hirotaka';
        $user5->email = '20192139@kcska.onmicrosoft.com';
        $user5->password = 12345678;
        $user5->isSignedIn = 1;
        $user5->auth = 1;
        $user5->code = Uuid::uuid4();
        $user5->save();

        $user6 = new User();
        $user6->user_id = 20192111;
        $user6->name = 'Hayakawa Naoki';
        $user6->email = '20192111@kcska.onmicrosoft.com';
        $user6->password = 12345678;
        $user6->isSignedIn = 1;
        $user6->auth = 1;
        $user6->code = Uuid::uuid4();
        $user6->save();

        
    }
}
