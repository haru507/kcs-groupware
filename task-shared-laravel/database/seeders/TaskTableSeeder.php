<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $task1 = new Task();
        $task1->user_id = 20192132;
        $task1->group_id = 1;
        $task1->title = "Laravel1";
        $task1->name = "Ishii Haruki";
        $task1->detail = "";
        $task1->progress = 100;
        $task1->startDate = "2020-12-15";
        $task1->endDate = "2020-12-18";
        $task1->isDone = 1;
        $task1->save();

        // $task2 = new Task();
        // $task2->user_id = 20192132;
        // $task2->group_id = 1;
        // $task2->title = "Laravel実装2";
        // $task2->detail = "";
        // $task2->name = "Ishii Haruki";
        // $task2->progress = 100;
        // $task2->startDate = "2020-12-21";
        // $task2->endDate = "2020-12-25";
        // $task2->isDone = 1;
        // $task2->save();

        // $task3 = new Task();
        // $task3->user_id = 20192132;
        // $task3->group_id = 1;
        // $task3->title = "コード リファクタリング";
        // $task3->name = "Ishii Haruki";
        // $task3->detail = "";
        // $task3->progress = 100;
        // $task3->startDate = "2020-12-26";
        // $task3->endDate = "2020-12-28";
        // $task3->isDone = 1;
        // $task3->save();

        // $task4 = new Task();
        // $task4->user_id = 20192132;
        // $task4->group_id = 1;
        // $task4->title = "タスク処理実装1";
        // $task4->name = "Ishii Haruki";
        // $task4->detail = "";
        // $task4->progress = 100;
        // $task4->startDate = "2021-01-12";
        // $task4->endDate = "2021-01-15";
        // $task4->isDone = 1;
        // $task4->save();

        // $task41 = new Task();
        // $task41->user_id = 20192132;
        // $task41->group_id = 1;
        // $task41->title = "タスク処理実装2";
        // $task41->name = "Ishii Haruki";
        // $task41->detail = "";
        // $task41->progress = 100;
        // $task41->startDate = "2021-01-18";
        // $task41->endDate = "2021-01-22";
        // $task41->isDone = 1;
        // $task41->save();

        // $task42 = new Task();
        // $task42->user_id = 20192132;
        // $task42->group_id = 1;
        // $task42->title = "グループ処理実装";
        // $task42->name = "Ishii Haruki";
        // $task42->detail = "";
        // $task42->progress = 100;
        // $task42->startDate = "2021-01-25";
        // $task42->endDate = "2021-02-01";
        // $task42->isDone = 1;
        // $task42->save();

        // $task43 = new Task();
        // $task43->user_id = 20192132;
        // $task43->group_id = 1;
        // $task43->title = "全体進捗確認";
        // $task43->name = "Ishii Haruki";
        // $task43->detail = "";
        // $task43->progress = 100;
        // $task43->startDate = "2021-01-26";
        // $task43->endDate = "2021-01-27";
        // $task43->isDone = 0;
        // $task43->save();

        // $task5 = new Task();
        // $task5->user_id = 20192137;
        // $task5->group_id = 1;
        // $task5->title = "プレゼン確認";
        // $task5->name = "Ishii Haruki";
        // $task5->detail = "";
        // $task5->progress = 100;
        // $task5->startDate = "2021-01-28";
        // $task5->endDate = "2021-01-29";
        // $task5->isDone = 0;
        // $task5->save();
        
        // $task51 = new Task();
        // $task51->user_id = 20192137;
        // $task51->group_id = 1;
        // $task51->title = "ドキュメント管理";
        // $task51->name = "Kawaguchi Yasunaru";
        // $task51->detail = "日報、週報、月報の作成と管理";
        // $task51->progress = 80;
        // $task51->startDate = "2021-01-12";
        // $task51->endDate = "2021-02-26";
        // $task51->isDone = 0;
        // $task51->save();

        // $task6 = new Task();
        // $task6->user_id = 20192139;
        // $task6->group_id = 1;
        // $task6->title = "プレゼン資料作成";
        // $task6->name = "Iiboshi Hirotaka";
        // $task6->detail = "";
        // $task6->progress = 80;
        // $task6->startDate = "2021-01-12";
        // $task6->endDate = "2021-01-18";
        // $task6->isDone = 0;
        // $task6->save();

        // $task61 = new Task();
        // $task61->user_id = 20192139;
        // $task61->group_id = 1;
        // $task61->title = "プレゼン資料作成";
        // $task61->name = "Iiboshi Hirotaka";
        // $task61->detail = "";
        // $task61->progress = 80;
        // $task61->startDate = "2021-01-18";
        // $task61->endDate = "2021-01-22";
        // $task61->isDone = 0;
        // $task61->save();

        // $task62 = new Task();
        // $task62->user_id = 20192139;
        // $task62->group_id = 1;
        // $task62->title = "プレゼン資料作成";
        // $task62->name = "Iiboshi Hirotaka";
        // $task62->detail = "";
        // $task62->progress = 80;
        // $task62->startDate = "2021-01-25";
        // $task62->endDate = "2021-02-01";
        // $task62->isDone = 0;
        // $task62->save();

        // $task6 = new Task();
        // $task6->user_id = 20192139;
        // $task6->group_id = 1;
        // $task6->title = "プレゼン資料作成";
        // $task6->name = "Iiboshi Hirotaka";
        // $task6->detail = "";
        // $task6->progress = 80;
        // $task6->startDate = "2021-02-02";
        // $task6->endDate = "2021-02-03";
        // $task6->isDone = 0;
        // $task6->save();

        // $task7 = new Task();
        // $task7->user_id = 20192103;
        // $task7->group_id = 1;
        // $task7->title = "ドキュメント管理";
        // $task7->name = "Miyaguchi Futoshi";
        // $task7->detail = "日報、週報、月報の作成と管理";
        // $task7->progress = 80;
        // $task7->startDate = "2021-01-12";
        // $task7->endDate = "2021-02-26";
        // $task7->isDone = 0;
        // $task7->save();

        // $task8 = new Task();
        // $task8->user_id = 20192134;
        // $task8->group_id = 1;
        // $task8->title = "Virtual Box 実行環境作成";
        // $task8->name = "Yoshizaki Chihiro";
        // $task8->detail = "Ubuntu Server PHP Node.js Laravel Apache2";
        // $task8->progress = 40;
        // $task8->startDate = "2021-01-26";
        // $task8->endDate = "2021-02-15";
        // $task8->isDone = 0;
        // $task8->save();

        // $task9 = new Task();
        // $task9->user_id = 20192111;
        // $task9->group_id = 1;
        // $task9->title = "卒業研究感想文作成";
        // $task9->name = "Hayakawa Naoki";
        // $task9->detail = "";
        // $task9->progress = 100;
        // $task9->startDate = "2021-02-02";
        // $task9->endDate = "2021-02-02";
        // $task9->isDone = 0;
        // $task9->save();

        // $task10 = new Task();
        // $task10->user_id = 20192111;
        // $task10->group_id = 1;
        // $task10->title = "プレゼン発表用資料確認";
        // $task10->name = "Hayakawa Naoki";
        // $task10->detail = "原稿の確認";
        // $task10->progress = 100;
        // $task10->startDate = "2021-02-02";
        // $task10->endDate = "2021-02-03";
        // $task10->isDone = 0;
        // $task10->save();

        // $task11 = new Task();
        // $task11->user_id = 20192134;
        // $task11->group_id = 1;
        // $task11->title = "プレゼン資料原稿作成";
        // $task11->name = "Ishii Haruki";
        // $task11->detail = "";
        // $task11->progress = 90;
        // $task11->startDate = "2021-02-01";
        // $task11->endDate = "2021-02-03";
        // $task11->isDone = 0;
        // $task11->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();

        // $task12 = new Task();
        // $task12->user_id = 20192132;
        // $task12->group_id = 1;
        // $task12->title = "プレゼン資料修正";
        // $task12->name = "Ishii Haruki";
        // $task12->detail = "";
        // $task12->progress = 80;
        // $task12->startDate = "2021-02-01";
        // $task12->endDate = "2021-02-03";
        // $task12->isDone = 0;
        // $task12->save();
    }
}
