<?php

namespace App\Mail;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Models\User;

class ActivationCreated extends Mailable {
    use Queueable, SerializesModels;
    protected $user;
    /**
    * Create a new message instance.
　　　　　　*
　　　　　　* @return void
    */

    public function __construct(User $user) {
        $this->user = $user;
    }

    /**
    * Build the message.
    *
    * @return $this
    */
    public function build()
    {
        $frontendURL = "http://localhost/api";
        return $this->subject('アカウント有効化メール')
        ->markdown('emails.activations.created')
        ->with([
        'link' => $frontendURL."/verify/{$this->user->code}"
        ]);
    }
}