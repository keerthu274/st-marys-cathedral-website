<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MassTime extends Model
{
    // Allow mass assignment for these fields (safe + convenient for CRUD forms)
    protected $fillable = [
        'day',
        'time',
        'location',
        'language',
        'notes',
        'status',
        'sort_order',
    ];
}
