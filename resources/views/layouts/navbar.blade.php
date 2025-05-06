{{-- filepath: d:\Code\BrantaNew\KI-Poltek\resources\views\layouts\navbar.blade.php --}}
<div class="navbar bg-[#ffffff] shadow-sm fixed top-0 w-full z-50">
    <div class="flex justify-between items-center w-full px-10 py-2">
        <!-- Logo -->
        <a href="/" class="flex items-center space-x-2">
            <img src="{{ asset('img/logoArina.png') }}" alt="Logo" class="h-16 w-auto scale-200">
        </a>

        <!-- Center Links -->
        <div class="flex space-x-12">
            <a href="#home" class="text-gray-700 hover:text-black font-bold text-lg" style="font-family: 'Poppins', sans-serif;">Home</a>
            <a href="#about" class="text-gray-700 hover:text-black font-bold text-lg" style="font-family: 'Poppins', sans-serif;">About</a>
            <a href="#why" class="text-gray-700 hover:text-black font-bold text-lg" style="font-family: 'Poppins', sans-serif;">Services</a>
            <a href="#how" class="text-gray-700 hover:text-black font-bold text-lg" style="font-family: 'Poppins', sans-serif;">Contact</a>
        </div>

        <!-- Button -->
        <div class="relative group inline-block">
            <button class="relative z-10 px-6 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-[#85c4f9] to-[#1e73be] shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
                <a href="login">Login</a>
            </button>
            <div class="absolute inset-0 rounded-lg bg-black opacity-0 group-hover:opacity-10 transition duration-300"></div>
        </div>


    </div>
</div>

<script>
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
</script>