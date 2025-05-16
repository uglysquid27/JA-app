<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;

    protected $table = 'driver'; // if not renamed to 'drivers'

    protected $fillable = [
        'user_id',
        'name',
        'phone',
        'status',
    ];

    /**
     * Get the user associated with the driver.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all requests assigned to the driver.
     */
    public function requests()
    {
        return $this->hasMany(Request::class);
    }
public function ratings()
{
    return $this->hasMany(Rating::class, 'driver_id');
}

}
