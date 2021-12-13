<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// サインイン
Route::post('/signin', 'App\Http\Controllers\api\SignInUserController@SignIn');
// サインアップ
Route::post('/signup', 'App\Http\Controllers\api\SignUpUserController@SignUp');
// サインアウト
Route::post('/signout', 'App\Http\Controllers\api\SignOutUserController@SignOut');
// メール確認用ルーティング
Route::get('/verify/{code}', 'App\Http\Controllers\api\SignUpUserController@activate');
// 認証しているか？
Route::get('/me/{apitoken?}', 'App\Http\Controllers\AuthenticateController@getCurrentUser');
// パスワード変更

// パスワードの再発行
Route::get('/me/{user_id}', 'App\Http\Controllers\api\UserSearchController@getPassForget');

// ユーザ情報取得
Route::get('userSearch/{username}', 'App\Http\Controllers\api\UserSearchController@getUserSearch');
// 該当するユーザのルーム情報取得
Route::get('userSearch/{user_id}/{other_name}', 'App\Http\Controllers\api\UserSearchController@getRoomSearch');

// 個人タスク作成
Route::post('task/create/inTask', 'App\Http\Controllers\api\TaskController@createInTask');
// グループタスク作成
Route::post('task/create/gTask', 'App\Http\Controllers\api\TaskController@createGTask');
// タスク編集
Route::post('task/update', 'App\Http\Controllers\api\TaskController@updateTask');
// タスク削除
Route::get('task/delete/{task_id}', 'App\Http\Controllers\api\TaskController@deleteTask');
// タスク読み込み
Route::get('task/read/{user_id}', 'App\Http\Controllers\api\TaskController@readTask');
// マイタスク
Route::get('task/{user_id}', 'App\Http\Controllers\api\TaskController@readMyTask');
//タスクの日付のインターバル
Route::post('task/dayInterval/{t_id}', 'App\Http\Controllers\api\TaskController@createDayInterval');

// グループ読み込み
Route::get('group/{user_id}', 'App\Http\Controllers\api\TaskController@readGroup');
// 自分が所属しているグループのユーザ読み込み
Route::get('group/user/{group_id}', 'App\Http\Controllers\api\TaskController@readUser');
// 自分のDayIntervalを取得
Route::get('task/readDayInterval/{user_id}', 'App\Http\Controllers\api\TaskController@readTaskDayInterval');

// グループ作成
Route::post('group/create/{user_id}', 'App\Http\Controllers\api\GroupController@createGroup');
// グループ編集
Route::post('group/update/{group_id}', 'App\Http\Controllers\api\GroupController@updateGroup');
// グループ編集
Route::post('group/nameChange/{group_id}', 'App\Http\Controllers\api\GroupController@updateGroupName');
// グループ削除
Route::get('group/delete/{user_id}/{group_id}', 'App\Http\Controllers\api\GroupController@exitGroup');
// グループ読み込み
Route::get('group/read/{user_id}', 'App\Http\Controllers\api\GroupController@readGroup');

// チャットルーム作成
Route::post('/chatroom/create', 'App\Http\Controllers\api\RoomController@createChatRoom');
// チャットルーム取得
Route::get('/chatroom/{id}', 'App\Http\Controllers\api\RoomController@getChatRoom');
// チャットのメッセージを取得
Route::get('/chat/{id}/{room_id}', 'App\Http\Controllers\api\ChatController@getChatMessage');
// チャットにメッセージを追加
Route::post('/chat/add', 'App\Http\Controllers\api\ChatController@addMessage');
// メッセージの削除
Route::delete('/chat/{user_id}/{room_id}/{id}/{gid}', 'App\Http\Controllers\api\ChatController@deleteMessage');
// チャットに所属するユーザの取得
Route::get('/chat1/{gid}', 'App\Http\Controllers\api\ChatController@getChatUser');