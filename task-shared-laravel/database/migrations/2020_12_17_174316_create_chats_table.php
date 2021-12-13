<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChatsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chats', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id()->unique();
            $table->integer('user_id');
            $table->unsignedBigInteger('room_id');
            $table->string('message', 255);
            $table->timestamps();

            $table->foreign('user_id')
                ->references('user_id')
                ->on('users');

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
        Schema::dropIfExists('chats');
    }
}
