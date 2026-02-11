<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * This allows Laravel to insert/update these fields safely.
     */
    protected $fillable = [
        'title',
        'description',
        'start_date',
        'start_time',
        'end_date',
        'end_time',
        'location',
        'status',
        'category',
        'image_path',
    ];
}
