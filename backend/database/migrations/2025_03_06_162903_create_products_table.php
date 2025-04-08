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
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // automatski kreira auto-increment id
            $table->string('name'); // kolona za naziv proizvoda
            $table->decimal('price', 8, 2); // kolona za cenu (8 cifara, 2 decimalna mesta)
            $table->string('image')->nullable(); // kolona za sliku proizvoda (možeš koristiti 'nullable()' ako nije obavezno)
            $table->timestamps(); // dodaje created_at i updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
