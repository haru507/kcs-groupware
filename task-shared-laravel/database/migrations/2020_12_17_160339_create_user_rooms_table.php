<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_rooms', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->integer('user_id');
            $table->unsignedBigInteger('group_id')->nullable();
            $table->unsignedBigInteger('room_id');
            $table->string('room_name');

            $table->foreign('user_id')
                ->references('user_id')
                ->on('users');

            $table->foreign('group_id')
                ->references('group_id')
                ->on('groups');

            $table->foreign('room_id')
                ->references('room_id')
                ->on('rooms');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_rooms');
    }
}
