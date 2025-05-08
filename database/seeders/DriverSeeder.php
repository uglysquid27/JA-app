<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Driver;

class DriverSeeder extends Seeder
{
    public function run(): void
    {
        // Get all users with the role 'driver'
        $drivers = User::where('role', 'driver')->get();

        foreach ($drivers as $user) {
            Driver::create([
                'user_id' => $user->id,
                'name' => $user->username, // or set a custom name if needed
                'phone' => '08' . rand(1000000000, 9999999999), // random phone number
                'status' => 'available',
            ]);
        }
    }
}
