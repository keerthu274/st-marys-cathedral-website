<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MassTime extends Model
{
    // Allow mass assignment for these fields 
    protected $fillable = [
        'day',
        'start_time',
        'end_time',
        'location',
        'language',
        'notes',
        'status',
        'sort_order',
    ];
}
