<?php

use App\Http\Controllers\Api\CameraOperationController;
use App\Http\Controllers\Api\FaceUserController;
use App\Http\Controllers\Api\InstituteController;
// use App\Http\Controllers\Api\InstituteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//

// Institute Based
Route::prefix('/institute')->group(function () {
    Route::get('/list', [InstituteController::class, 'listInstitute']);
    Route::post('/create', [InstituteController::class, 'createInstitute']);
    Route::delete('/delete/{id}', [InstituteController::class, 'deleteInstitute']);
});
// ^^^^^^^^^^^^^^^


Route::middleware(['verify_institute'])->group(function() {
    Route::post('/add_user', [FaceUserController::class, 'addUser']);
    Route::delete('/users/delete/{id}', [FaceUserController::class, 'userDelete']);
    Route::get('/users-list', [FaceUserController::class, 'userList']);
    Route::get('/user-attendance', [FaceUserController::class, 'userAttendance']);
    Route::get('/attendances', [FaceUserController::class, 'attendanceLog']);
});


Route::post('/{token}/faceRecognition', [CameraOperationController::class, 'faceRecognition']);
Route::post('/{token}/taskRequest', [CameraOperationController::class, 'taskRequest']);
Route::post('/{token}/taskResult', [CameraOperationController::class, 'taskResult']);




























// Route::post("/{any}", function (Request $request, $any) {
//     $responseData = [
//         'requested_method' => 'POST',
//         'requested_endpoint' => "/" . $any,
//         'requested_body' => $request->all(),
//     ];

//     $responseJson = json_encode($responseData, JSON_PRETTY_PRINT);

//     $logFilePath = storage_path('logs/endpoint_post_requests.log');

//     if (File::exists($logFilePath)) {
//         File::append($logFilePath, "\n==============================================================================\n\n");
//     } else {
//         File::put($logFilePath, '');
//     }

//     File::append($logFilePath, $responseJson . "\n");

//     return response()->json($responseData, 200);
// })->where('any', '.*');
