<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\enrollUser;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
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
    // Route::post('/store', function (Request $request) {
    //     // Validate the form data
    //     $request->validate([
    //         'userName' => 'required',
    //         'UserID' => 'required',
    //         'userGender' => 'required',
    //         'userImage' => 'required|image|mimes:jpeg,png,jpg|max:2048', // Image validation
    //     ]);

    //     // Handle the image upload
    //     $imagePath = $request->file('userImage')->store('user_images', 'public');

    //     // Save to database
    //     enrollUser::create([
    //         'userName' => $request->userName,
    //         'UserID' => $request->UserID,
    //         'userGender' => $request->userGender,
    //         'userImage' => $imagePath, // Store the path in the database
    //     ]);

    //     // return redirect()->route('Users/Index');
    //     return Inertia::render('Users/Index');
    // })->name('store');
});


require __DIR__ . '/auth.php';
