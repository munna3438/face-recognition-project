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
        Schema::table('enroll_users', function (Blueprint $table) {
            $table->boolean('hidden')->default(false)->after('status');
            $table->boolean('deleted')->default(false)->after('hidden');
            $table->boolean('updated')->default(false)->after('deleted');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('enroll_users', function (Blueprint $table) {
            //
        });
    }
};
