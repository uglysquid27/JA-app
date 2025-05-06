<?php

namespace Database\Seeders;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Coordinator
        User::create([
            'username' => 'coordinator1',
            'email' => 'coordinator1@example.com', // Add email
            'role' => 'coordinator',
            'password' => Hash::make('password'),
        ]);

        // Driver
        User::create([
            'username' => 'driver1',
            'email' => 'driver1@example.com', // Add email
            'role' => 'driver',
            'password' => Hash::make('password'),
        ]);
    }
    
        // Add more users as needed
    }   
