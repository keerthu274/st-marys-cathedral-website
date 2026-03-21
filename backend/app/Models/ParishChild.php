<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ParishChild extends Model
{
    protected $table = 'parish_children';

    protected $fillable = [
        'registration_id',
        'child_name',
        'age'
    ];
}