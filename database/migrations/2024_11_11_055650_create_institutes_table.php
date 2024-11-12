<?php

use App\Models\Institute;
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
        Schema::create('institutes', function (Blueprint $table) {
            $table->id();
            $table->string('slug');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('cam_ip');
            $table->string('cam_port');
            $table->string('token');
            $table->bigInteger('max_user');
            $table->enum('status', Institute::ARR_STATUS)->default(Institute::ARR_STATUS[1]);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('institutes');
    }
};
