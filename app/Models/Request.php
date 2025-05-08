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
        'time',
        'status',
        'driver_id',
        'assigned_at',
    ];

    /**
     * Get the driver assigned to the request.
     */
    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }
}
