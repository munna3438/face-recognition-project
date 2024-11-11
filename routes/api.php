<?php

use App\Http\Controllers\Api\CameraOperationController;
use App\Http\Controllers\Api\FaceUserController;
use App\Models\Attendance;
use App\Models\AttendanceLogs;
use App\Models\EnrollUser;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\Console\Output\ConsoleOutput;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


//

Route::post('/add_user', [FaceUserController::class, 'addUser'])->name('store');
Route::get('/users-list', [FaceUserController::class, 'userList']);
Route::get('/user-attendance', [FaceUserController::class, 'userAttendance']);
Route::get('/attendances', [FaceUserController::class, 'attendanceLog']);



Route::post('/faceRecognition', [CameraOperationController::class, 'faceRecognition']);
Route::post('/taskRequest', [CameraOperationController::class, 'taskRequest']);
Route::post('/taskResult', [CameraOperationController::class, 'taskResult']);

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
