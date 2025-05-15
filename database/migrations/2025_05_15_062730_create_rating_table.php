<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('ratings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('request_id');
            $table->unsignedBigInteger('driver_id');
            $table->tinyInteger('rating')->nullable(); // Assuming rating out of 5
            $table->text('comment')->nullable();
            $table->timestamps();
        
            $table->foreign('request_id')->references('id')->on('requests')->onDelete('cascade');
            $table->foreign('driver_id')->references('id')->on('driver')->onDelete('cascade');
        });
        
    }

    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};
