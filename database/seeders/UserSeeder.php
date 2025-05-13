<?php

namespace Database\Seeders;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // General Affair (JA)
        User::create([
            'username' => 'ja_person',
            'email' => 'ga@example.com',
            'role' => 'general_affair',
            'password' => Hash::make('password'),
        ]);

        // Drivers
        for ($i = 1; $i <= 5; $i++) {
            User::create([
                'username' => 'driver' . $i,
                'email' => 'driver' . $i . '@example.com',
                'role' => 'driver',
                'password' => Hash::make('password'),
            ]);
        }

        // Admin
        User::create([
            'username' => 'admin1',
            'email' => 'admin1@example.com',
            'role' => 'admin',
            'password' => Hash::make('password'),
        ]);
    }
}
