<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\enrollUser;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Str;

Route::get('/', function () {
    return redirect('/login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('/users')->name('users.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Users/Index');
    })->name('index');
    Route::get('/add', function () {
        return Inertia::render('Users/Add');
    })->name('add');
    Route::get('/attendance-list', function () {
        return Inertia::render('Users/AttendanceList');
    })->name('list-attendances');
})->middleware(['auth', 'verified']);


require __DIR__ . '/auth.php';
