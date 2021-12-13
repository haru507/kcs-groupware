<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaskTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id('task_id');
            $table->integer('user_id');
            $table->unsignedBigInteger('group_id')->nullable();
            $table->string('title', 255);
            $table->string('name');
            $table->string('detail', 1000)->nullable();
            $table->integer('progress');
            $table->date('startDate');
            $table->date('endDate');
            $table->boolean('isDone');
            $table->timestamps();

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
        Schema::dropIfExists('tasks');
    }
}
