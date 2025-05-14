<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" :class="darkMode ? 'dark' : ''" x-data="{ darkMode: localStorage.getItem('theme') === 'dark' }" x-init="$watch('darkMode', val => localStorage.setItem('theme', val ? 'dark' : 'light'))">

    <head>
        <script src="//unpkg.com/alpinejs" defer></script>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <script
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAokVOLtX_rwQ9Gpfjg1KGazNs9wotHy1U&libraries=places"
  async
  defer
></script>


        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body lass="bg-[#f0f0f0] min-h-screen flex flex-col">
    {{-- Only show navbar if user is not logged in --}}

        @inertia
    </body>
</html>
