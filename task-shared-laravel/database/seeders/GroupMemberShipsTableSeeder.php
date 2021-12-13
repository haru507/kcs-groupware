<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\GroupMemberShip;

class GroupMemberShipsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $gms0 = new GroupMemberShip();
        $gms0->user_id = 20192132;
        $gms0->group_id = 2;
        $gms0->timestamps = false;
        $gms0->save();
        //
        // $gms1 = new GroupMemberShip();
        // $gms1->user_id = 20192139;
        // $gms1->group_id = 1;
        // $gms1->timestamps = false;
        // $gms1->save();
        //
        $gms2 = new GroupMemberShip();
        $gms2->user_id = 20192137;
        $gms2->group_id = 2;
        $gms2->timestamps = false;
        $gms2->save();
    }
}
