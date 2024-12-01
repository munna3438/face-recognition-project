<?php

use App\Http\Controllers\ProfileController;
use App\Http\Middleware\OnlyTNS;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/login');
});

// Route::get('/sd', function() {
//     return response()->json(['token' => Str::random(64)]);
// });

// Route::get('/et', function() {
//     $csrf_tok = csrf_token();
//     return <<<EOT
// <form method="post" action="/ef">
// <input name="_token" value="{$csrf_tok}">
// <input type="text" name="data">
// <input type="submit" name="post">
// </form>
// EOT;
// });

// Route::match(['get', 'post'], '/ef', function(Request $req) {
//     return response()->json(['val' => $req->input('data')]);
// });

Route::middleware(['auth', 'verified', OnlyTNS::class])->get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->prefix('/users')->name('users.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Users/Index');
    })->name('index');
    Route::get('/add', function () {
        return Inertia::render('Users/Add');
    })->name('add');
    Route::get('/image', function () {
        return Inertia::render('Users/image');
    })->name('image');
    Route::get('/attendance-list', function () {
        return Inertia::render('Users/AttendanceList');
    })->name('list-attendances');
});


Route::middleware(['auth', 'verified'])->prefix('/institute')->name('institute.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Institute/Index');
    })->name('index');
    Route::get('/add', function () {
        return Inertia::render('Institute/Add');
    })->name('add');
});


require __DIR__ . '/auth.php';
