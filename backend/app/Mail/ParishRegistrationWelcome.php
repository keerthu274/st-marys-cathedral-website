<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;

class ParishRegistrationWelcome extends Mailable
{
    public $name;

    /**
     * Create a new message instance.
     */
    public function __construct($name)
    {
        // Name of the registered member
        $this->name = $name;
    }

    /**
     * Build the email.
     */
    public function build()
    {
        return $this->subject('Welcome to St Mary\'s Cathedral Parish')
            ->view('emails.parish-registration-welcome');
    }
}