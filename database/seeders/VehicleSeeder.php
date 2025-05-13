<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vehicle;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $vehicles = [
            [
                'plate_number' => 'N 1234 AB',
                'brand' => 'Toyota',
                'model' => 'Avanza',
                'year' => 2018,
                'condition' => 'Good',
            ],
            [
                'plate_number' => 'N 5678 CD',
                'brand' => 'Honda',
                'model' => 'Mobilio',
                'year' => 2019,
                'condition' => 'Good',
            ],
            [
                'plate_number' => 'N 4321 EF',
                'brand' => 'Suzuki',
                'model' => 'Ertiga',
                'year' => 2020,
                'condition' => 'Needs Maintenance',
            ],
        ];

        foreach ($vehicles as $vehicle) {
            Vehicle::create($vehicle);
        }
    }
}
