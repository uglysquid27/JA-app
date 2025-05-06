<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trip extends Model
{
    use HasFactory;

    protected $fillable = [
        'driver_id', 'coordinator_id', 'vip_name',
        'pickup_location', 'dropoff_location', 'status',
        'started_at', 'arrived_at', 'completed_at'
    ];

    public function driver() {
        return $this->belongsTo(User::class, 'driver_id');
    }

    public function coordinator() {
        return $this->belongsTo(User::class, 'coordinator_id');
    }

    public function tripLocations() {
        return $this->hasMany(TripLocation::class);
    }
}

