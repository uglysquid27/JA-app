<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoryLog extends Model
{
    protected $fillable = ['user_id', 'action', 'data'];

    protected $casts = [
        'data' => 'array', // Cast the 'data' attribute as an array
    ];
}
