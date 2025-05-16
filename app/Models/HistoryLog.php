<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HistoryLog extends Model
{
    protected $fillable = [
        'user_id',
        'action',
        'ride_request_id',
        'requester_name',
        'driver_name',
        'pickup',
        'destination',
        'request_time',
        'data',
    ];

    protected $casts = [
        'data' => 'array',
        'request_time' => 'datetime',
    ];
}
