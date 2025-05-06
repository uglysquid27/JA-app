@extends('layouts.base')

@section('content')
<section id="hero" class="hero bg-white min-h-screen flex items-center justify-center pt-20"> <!-- Added flex and justify-center -->
    <div class="hero-content flex flex-col lg:flex-row items-center lg:items-center lg:justify-between px-6 lg:px-20 w-full max-w-7xl"> <!-- Centered content with max width -->
        <!-- Text Section -->
        <div class="lg:w-1/2 text-center lg:text-left" style="font-family: 'Poppins', sans-serif;">
            <h1 class="text-5xl lg:text-6xl font-bold mb-4 text-black">
                Corporate
                <span class="relative inline-block">
                    <span class="highlight-blue-sky">Ride</span>.
                </span>
            </h1>
            <h1 class="text-5xl lg:text-6xl font-bold mb-4 text-black">
                Coordination
                <span class="relative inline-block">
                    <span class="highlight-blue">System</span>.
                </span>
            </h1>
            <p class="text-lg text-gray-600 mb-6">
                Effortlessly manage VIP transport requests with real-time tracking, automatic logging, and secure driver assignment—all in one system built for enterprise mobility.
            </p>
            <div class="flex justify-center lg:justify-start space-x-4">
                <div class="relative group">
                    <a href="/screening" class="bg-[#85C4F9] text-black font-bold py-4 px-8 border-2 border-black relative z-10 inline-block text-center">
                        How it works
                    </a>
                    <div class="absolute top-2 left-2 bg-black w-full h-full z-0 transition-all duration-300 group-hover:top-0 group-hover:left-0"></div>
                </div>
            </div>
        </div>

        <!-- Image Section -->
        <div class="lg:w-1/2 flex items-center justify-center mt-10 lg:mt-0">
            <div class="max-w-sm rounded-lg bg-gray-200 flex items-center justify-center" style="height: 300px; width: 300px;">
                <span class="text-gray-500">Image Placeholder</span>
            </div>
        </div>
    </div>
</section>


<section id="service" class="min-h-screen pt-60 px-8">
    <div class="max-w-6xl mx-auto text-center" style="font-family: 'Poppins', sans-serif;">
        <h2 class="text-4xl font-bold text-black mb-12">Our Services</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            <!-- Card 1 -->
            <div class="relative h-full w-full max-w-sm">
                <div class="absolute top-2 left-2 w-full h-full bg-[#85C4F9] rounded-lg z-0"></div>
                <div class="relative bg-white border-2 border-black rounded-lg p-8 z-10 h-full flex flex-col items-center">
                    <div class="mb-6">
                        <img src="{{ asset('img/spread.png') }}" alt="Prevent Spread" class="mx-auto w-14 h-14 scale-160">
                    </div>
                    <h3 class="text-xl font-bold mb-3 text-black">Ride Requests</h3>
                    <p class="text-gray-600 flex-grow text-center">
                        Easily create and manage ride requests.
                    </p>
                </div>
            </div>

            <!-- Card 2 -->
            <div class="relative h-full w-full max-w-sm">
                <div class="absolute top-2 left-2 w-full h-full bg-[#85C4F9] rounded-lg z-0"></div>
                <div class="relative bg-white border-2 border-black rounded-lg p-8 z-10 h-full flex flex-col items-center">
                    <div class="mb-6">
                        <img src="{{ asset('img/treat.png') }}" alt="Early Treatment" class="mx-auto w-14 h-14 scale-150">
                    </div>
                    <h3 class="text-xl font-bold mb-3 text-black">Driver Assignment</h3>
                    <p class="text-gray-600 flex-grow text-center">
                        Assign drivers in real-time with schedule conflict detection.
                    </p>
                </div>
            </div>

            <!-- Card 4 -->
            <div class="relative h-full w-full max-w-sm">
                <div class="absolute top-2 left-2 w-full h-full bg-[#85C4F9] rounded-lg z-0"></div>
                <div class="relative bg-white border-2 border-black rounded-lg p-8 z-10 h-full flex flex-col items-center">
                    <div class="mb-6">
                        <img src="{{ asset('img/protect.png') }}" alt="Protect Loved Ones" class="mx-auto w-14 h-14 scale-160">
                    </div>
                    <h3 class="text-xl font-bold mb-3 text-black">Automatic Logging</h3>
                    <p class="text-gray-600 flex-grow text-center">
                        Capture departure and arrival times automatically—no manual input required.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="how" class="bg-white min-h-screen pt-60 px-8">
    <div class="max-w-6xl mx-auto text-center" style="font-family: 'Poppins', sans-serif;">
        <h2 class="text-4xl font-bold text-black mb-6">How It Works</h2>
        <p class="text-gray-600 text-lg mb-12">
            We've made screening simple, fast, and accessible for everyone.
        </p>
        <div class="flex flex-col md:flex-row items-center justify-center gap-12">
            <!-- Step 1 -->
            <div class="flex flex-col items-center">
                <div class="bg-[#a0f0c5] w-20 h-20 flex items-center justify-center rounded-full text-2xl font-bold border-2 border-black mb-4">
                    1
                </div>
                <h4 class="text-xl font-bold mb-2 text-black">Answer Questions</h4>
                <p class="text-gray-600">
                    Complete a quick questionnaire about your symptoms.
                </p>
            </div>

            <!-- Step 2 -->
            <div class="flex flex-col items-center">
                <div class="bg-[#85C4F9] w-20 h-20 flex items-center justify-center rounded-full text-2xl font-bold border-2 border-black mb-4">
                    2
                </div>
                <h4 class="text-xl font-bold mb-2 text-black">Get Results</h4>
                <p class="text-gray-600">
                    Instantly receive feedback on your risk level.
                </p>
            </div>

            <!-- Step 3 -->
            <div class="flex flex-col items-center">
                <div class="bg-[#a0f0c5] w-20 h-20 flex items-center justify-center rounded-full text-2xl font-bold border-2 border-black mb-4">
                    3
                </div>
                <h4 class="text-xl font-bold mb-2 text-black">Next Steps</h4>
                <p class="text-gray-600">
                    Learn what to do next based on your result.
                </p>
            </div>
        </div>
    </div>
</section>

<style>
    .highlight-blue {
        position: relative;
        z-index: 0;
    }

    .highlight-blue::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        height: 0.6em;
        background-color: #1E73BE;
        /* blue stabilo */
        z-index: -1;
        border-radius: 4px;
    }

    .highlight-blue-sky {
        position: relative;
        z-index: 0;
    }

    .highlight-blue-sky::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        height: 0.6em;
        background-color: #85C4F9;
        /* light blue stabilo */
        z-index: -1;
        border-radius: 4px;
    }
</style>
@endsection