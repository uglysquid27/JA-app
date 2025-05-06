<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TripLocation extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['trip_id', 'latitude', 'longitude', 'recorded_at'];

    public function trip() {
        return $this->belongsTo(Trip::class);
    }
}
