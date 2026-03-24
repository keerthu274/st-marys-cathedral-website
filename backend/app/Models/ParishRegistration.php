<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ParishRegistration extends Model
{
    /**
     * --------------------------------------------------------------------------
     * Table Name
     * --------------------------------------------------------------------------
     */

    protected $table = 'parish_registrations';

    /**
     * --------------------------------------------------------------------------
     * Mass Assignable Fields
     * --------------------------------------------------------------------------
     */

    protected $fillable = [
        'member_id',
        'registration_type',
        'full_name',
        'date_of_birth',
        'gender',
        'nationality',
        'occupation',
        'address_line1',
        'address_line2',
        'city',
        'postcode',
        'partner_name',
        'phone',
        'email',
        'partner_name',
        'contact_by_phone',
        'contact_by_email',
        'consent_confirmed',
        'signature',
        'signed_date'
    ];

    /**
     * --------------------------------------------------------------------------
     * Boot Method
     * --------------------------------------------------------------------------
     * Automatically generate a unique member ID when a new registration is created.
     */

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($registration) {

            // Get latest registration ID
            $lastId = self::max('id') + 1;

            // Generate member ID like SMC0001
            $registration->member_id = 'SMC' . str_pad($lastId, 4, '0', STR_PAD_LEFT);
        });
    }
}
