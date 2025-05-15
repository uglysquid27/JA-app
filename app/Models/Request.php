<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'pickup',
        'destination',
        'request_time',
        'status',
        'driver_id',
        'assigned_at',
        'accepted_at', // Make sure this is included if you're using mass assignment
    ];

    protected $dates = [
        'accepted_at', // So it's automatically cast as a Carbon date
    ];

    /**
     * Get the driver assigned to the request.
     */
    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }
}
