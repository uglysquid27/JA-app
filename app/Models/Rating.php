<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_id',
        'driver_id',
        'rating',
        'comment',
    ];
    

    public function request()
    {
        return $this->belongsTo(Request::class, 'request_id');
    }

    public function driver()
    {
        return $this->belongsTo(Driver::class, 'driver_id');
    }
}
