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
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('pickup');
            $table->string('destination');
            $table->timestamp('request_time')->nullable(); // Make it nullable and let Laravel handle initial insertion
            $table->foreignId('driver_id')->nullable()->nullOnDelete(); // FK to drivers table
            $table->timestamp('assigned_at')->nullable(); // when assigned
            $table->timestamp('accepted_at')->nullable();    // After driver accepts
            $table->timestamp('picked_up_at')->nullable();   // Optional: if you want a separate "picked up" stage
            $table->timestamp('arrived_at')->nullable();     // After ride is completed
            $table->timestamp('done_at')->nullable();        // Optional: for when marked as done (synonymous with arrived_at if only one used)


            $table->string('status')->default('pending');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};