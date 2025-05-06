<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class LocationController extends Controller
{
    public function findPlace(Request $request)
    {
        $query = $request->query('q');

        // Example using OpenStreetMap's Nominatim API
        $url = "https://nominatim.openstreetmap.org/search?q=" . urlencode($query) . "&format=json&addressdetails=1&limit=5";

        $response = Http::get($url);

        if ($response->successful()) {
            return response()->json([
                'predictions' => $response->json() // Send results as predictions
            ]);
        }

        return response()->json([
            'predictions' => [],
        ], 500);
    }
}
