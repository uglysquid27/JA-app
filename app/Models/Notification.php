<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Notification extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['user_id', 'message', 'is_read'];

    protected $casts = [
        'is_read' => 'boolean',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }
}


