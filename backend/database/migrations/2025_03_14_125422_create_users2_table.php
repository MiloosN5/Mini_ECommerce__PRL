<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement('ALTER TABLE users2 ALTER COLUMN user_cart TYPE bigint USING user_cart::bigint');

        // Zatim promenimo tip kolone u bigint
        Schema::table('users2', function (Blueprint $table) {
            $table->bigInteger('user_cart')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users2', function (Blueprint $table) {
            $table->string('user_cart')->nullable()->change();
        });
    }
};
