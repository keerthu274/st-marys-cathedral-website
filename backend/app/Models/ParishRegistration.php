<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ParishRegistration extends Model
{
    // Table name (optional but good practice)
    protected $table = 'parish_registrations';

    // Allow mass assignment
    protected $fillable = [
        'member_id',
        'registration_type',
        'full_name',
        'date_of_birth',
        'gender',
        'address_line1',
        'city',
        'postcode',
        'phone',
        'email',
        'consent_confirmed',
        'signature',
        'signed_date'
    ];
}