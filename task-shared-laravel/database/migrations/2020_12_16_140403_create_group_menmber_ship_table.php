<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGroupMenmberShipTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('group_member_ships', function (Blueprint $table) {

            $table->engine = 'InnoDB';
            $table->integer('user_id');
            $table->unsignedBigInteger('group_id');

            $table->foreign('user_id')
                ->references('user_id')
                ->on('users');

            $table->foreign('group_id')
                ->references('group_id')
                ->on('groups');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('group_member_ships');
    }
}
