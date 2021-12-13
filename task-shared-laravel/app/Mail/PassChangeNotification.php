<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PassChangeNotification extends Mailable
{
    use Queueable, SerializesModels;

    protected $user_id;
    protected $pass;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user_id, $pass)
    {
        $this->user_id = $user_id;
        $this->pass = $pass;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.passChange_mail')
                    ->subject('パスワード再発行のご連絡')
                    ->with([
                        'user_id' => $this->user_id,
                        'pass' => $this->pass
                    ]);
    }
}
