<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ParishChild extends Model
{
    protected $table = 'parish_children';

    protected $fillable = [
        'registration_id',
        'child_name',
        'date_of_birth',
        'age'
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date:Y-m-d',
        ];
    }
}
