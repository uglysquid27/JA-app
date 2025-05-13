<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicle_checks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vehicle_id')->constrained()->onDelete('cascade');
            $table->foreignId('driver_id')->nullable()->constrained('users')->onDelete('cascade');  // Nullable driver_id
            $table->foreignId('request_id')->constrained('requests')->onDelete('cascade');
            $table->enum('tire_condition', ['Good', 'Flat', 'Worn'])->default('Good');
            $table->enum('oil_check', ['OK', 'Needs Refill'])->default('OK');
            $table->enum('light_check', ['Working', 'Broken'])->default('Working');
            $table->text('additional_notes')->nullable();
            $table->timestamp('checked_at')->useCurrent();
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicle_checks');
    }
};
