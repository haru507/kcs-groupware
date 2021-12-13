<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaskDateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_dates', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->unsignedBigInteger('task_id');
            $table->date('date');

            $table->foreign('task_id')
                ->references('task_id')
                ->on('tasks');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('task_dates');
    }
}
