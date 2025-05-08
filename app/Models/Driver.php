<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;

    protected $table = 'driver';

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
}
