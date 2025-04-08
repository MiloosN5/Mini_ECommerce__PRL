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
        Schema::table('carts', function (Blueprint $table) {
            $table->dropColumn('totalQuality');
            $table->integer('totalQuantity');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function table(): void
    {
        Schema::table('carts', function (Blueprint $table) {
            $table->integer('totalQuality');
            $table->dropColumn('totalQuantity');
        });
    }
};
