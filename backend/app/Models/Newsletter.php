<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Newsletter extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'publication_date',
        'description',
        'file_path',
        'original_filename',
        'file_size',
        'status',
    ];
}
