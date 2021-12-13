<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\GroupMemberShip;
use App\Models\TaskDate;
use Illuminate\Support\Facades\DB;


class TaskController extends Controller
{
    // 個人タスクを登録
    public function createInTask(Request $request)
    {
        $tasks = new Task();
        $tasks->user_id = $request->user_id;
        $tasks->title = $request->title;
        $tasks->name = $request->name;
        $tasks->detail = $request->detail;
        $tasks->progress = $request->progress;
        $tasks->startDate = $request->startDate;
        $tasks->endDate = $request->endDate;
        $tasks->isDone = $request->isDone;
        $tasks->group_id = null;
        $tasks->save();
        return $tasks;
    }
    // グループタスクを登録
    public function createGTask(Request $request)
    {
        $tasks = new Task();
        $tasks->user_id = $request->user_id;
        $tasks->group_id = $request->group_id;
        $tasks->name = $request->name;
        $tasks->title = $request->title;
        $tasks->detail = $request->detail;
        $tasks->progress = $request->progress;
        $tasks->startDate = $request->startDate;
        $tasks->endDate = $request->endDate;
        $tasks->isDone = $request->isDone;

        $tasks->save();
        return $tasks;
    }
    // タスクの日付のインターバル
    public function createDayInterval(Request $request, $t_id)
    {
        $dayInterval = $request->all();
        foreach( $dayInterval as $day ){
            $data = new TaskDate();
            $data->task_id = $t_id;
            $data->date = $day;
            $data->timestamps = false; 
            $data->save();
        }

        $result = DB::table("task_dates")->where("task_id", $t_id)->get();
        return $result;
    }

    // タスク更新
    public function updateTask(Request $request)
    {
        $tasks = Task::find($request->task_id);
        $tasks->title = $request->title;
        $tasks->detail = $request->detail;
        $tasks->progress = $request->progress;
        $tasks->startDate = $request->startDate;
        $tasks->endDate = $request->endDate;
        $tasks->isDone = $request->isDone;
        $tasks->save();

        return $tasks;
    }
    // タスク削除
    public function deleteTask($task_id){
        DB::table("task_dates")
            ->where("task_id", $task_id)
            ->delete();

        $task = Task::find($task_id);
        $task->delete();
        return "成功";
    }
    // タスク読み込み
    public function readTask($user_id){
        $groups_id = DB::table("group_member_ships")
            ->where('user_id', $user_id)
            ->get();

        $tasks = DB::table('tasks')
            ->select('*')
            ->orderBy('startDate', 'ASC')
            ->get();

        // if($tasks->isEmpty()){
        //     return;
        // }

        // print_r($tasks);
        // print_r($groups_id);

        $result = [];
        foreach($tasks as $task){
            if(!$task->group_id && $task->user_id == $user_id){
                array_push($result, $task);
            }
        }
        foreach($groups_id as $group_id){
            foreach($tasks as $task){
                if($task->group_id == $group_id->group_id){
                    // print_r($task);
                    array_push($result, $task);
                }
            }
        }

            // ->where("user_id", $user_id)
            // ->orWhere("group_id", $group)
            // ->orderBy('group_id', 'asc')
            // ->get();
        return $result;
    }
    // グループ読み込み
    public function readGroup($user_id){
        $groups = DB::table("group_member_ships")
            ->select("groups.group_id", "groups.name", "groups.leaderUser_id")
            ->join("groups", "groups.group_id", "=", "group_member_ships.group_id")
            ->join("users", "users.user_id", "=", "group_member_ships.user_id")
            ->where("group_member_ships.user_id", $user_id)
            ->get();

        if($groups->isEmpty()){
            return;
        }
        return $groups;
    }
    // ユーザ読み込み
    public function readUser($group_id){

        $users = DB::table("group_member_ships");
        $users->select("users.*");
        $users->join("groups", "groups.group_id", "=", "group_member_ships.group_id");
        $users->join("users", "users.user_id", "=", "group_member_ships.user_id");
        $users->where("group_member_ships.group_id", $group_id);
        $result = $users->get();
        return $result;
    }

    // マイページ用タスク読み込み
    public function readMyTask($user_id)
    {
        $task = Task::where('user_id', $user_id)->get();

        return $task;
    }

    // 自分のDayIntervalを取得
    public function readTaskDayInterval($user_id)
    {
        // $data = DB::table('task_dates')
        //     ->select("task_dates.*")
        //     ->join("users", "users.user_id", "=", "group_member_ships", "group_member_ships.user_id")
        //     ->join("group_member_ships", "group_member_ships.group_id", "=", "groups", "groups.group_id")
        //     ->join("groups", "groups.group_id", "=", "tasks", "tasks.group_id")
        //     ->join("tasks", "tasks.task_id", "=", "task_dates", "task_dates.task_id")
        //     ->where("group_member_ships", $user_id)
        //     ->get();

        $data = TaskDate::get();

        return $data;
    }
}
