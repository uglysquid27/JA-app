<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('history_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // usually the actor
            $table->string('action');
            
            // Specific structured columns
            $table->unsignedBigInteger('ride_request_id')->nullable();
            $table->string('requester_name')->nullable();
            $table->string('driver_name')->nullable();
            $table->string('pickup')->nullable();
            $table->string('destination')->nullable();
            $table->dateTime('request_time')->nullable();

            // Optional JSON for future-proofing
            $table->json('data')->nullable(); 

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('history_logs');
    }
};
