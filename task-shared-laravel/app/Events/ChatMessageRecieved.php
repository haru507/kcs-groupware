<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatMessageRecieved implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    protected $user_id;
    protected $room_id;
    protected $data;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($user_id, $room_id, $data)
    {
        //
        $this->user_id = $user_id;
        $this->room_id = $room_id;
        $this->data = $data;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('chat-'.$this->user_id.'-'.$this->room_id);
    }

    /**
     * ブロードキャストするデータを取得
     *
     * @return array
     */
    public function broadcastWith()
    {
        $data[] = array(
            'id' => $this->data[0]->id,
            'user_id' => $this->data[0]->user_id,
            'room_id' => $this->data[0]->room_id,
            'message' => $this->data[0]->message,
            'created_at' => $this->data[0]->created_at,
            'updated_at' => $this->data[0]->updated_at,
        );
        return $data;
    }

    /**
     * イベントブロードキャスト名
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'chat';
    }

}