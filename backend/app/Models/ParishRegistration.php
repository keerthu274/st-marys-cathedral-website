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
        'partner_name',
        'phone',
        'email',
        'consent_confirmed',
        'signature',
        'signed_date'
    ];

// added: relationship with children
    public function children()
      {
        return $this->hasMany(\App\Models\ParishChild::class, 'registration_id');
      }

// added: relationship with interests
    public function interest()
      {
        return $this->hasOne(\App\Models\ParishInterest::class, 'registration_id');
      }
}