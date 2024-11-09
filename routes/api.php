<?php

use App\Models\Attendance;
use App\Models\enrollUser;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use Symfony\Component\Console\Output\ConsoleOutput;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/attendances', function (Request $request) {
    return Attendance::select('id', 'user_id', 'name', 'image', 'sex', 'snap_timestamp')->get();
});

Route::post('/faceRecognition', function (Request $request) {
    $output = new ConsoleOutput();
    DB::beginTransaction();
    try {

        $imgPath = public_path('image/attendance/' . $request->frpic_name);

        $imgBase64Data = $request->image;

        $data = base64_decode($imgBase64Data);
        $success = file_put_contents($imgPath, $data);
        if (!$success) {
            throw new Exception('Error saving image');
        }

        Attendance::create([
            'name' => $request->user_name ?? null,
            'user_id' => $request->user_id ?? null,
            'sex' => $request->sex ?? null,
            'image' => 'image/attendance/' . $request->frpic_name,
            'user_list' => $request->user_list ?? null,
            'mask' => $request->mask ?? null,
            'access_card' => $request->access_card ?? null,
            'snap_timestamp' => Carbon::createFromTimestamp($request->snap_time)->format('Y-m-d H:i:s'),
        ]);

        $output->writeln("<info>Saved</info>");

        DB::commit();
    } catch (Exception $e) {
        DB::rollBack();
        $output->writeln("<error>Error saving attendance data");
        $output->writeln("<error>" . $e->getMessage() . "</error>");
        return response()->json([
            'message' => 'Error saving attendance data',
            'error' => $e->getMessage(),
        ], 500);
    }
});

Route::post('/taskRequest', function (Request $request) {
    DB::beginTransaction();
    try {
        $enrollUsers = enrollUser::select('userName', 'UserID', 'userGender', 'userImage', 'status')->where('status', 1)->get();
        if($enrollUsers->count() > 0){
            $request_id = rand(11111111, 99999999);
            $request_type = "addUser";
            $user_list = [

            ];

        }
        DB::commit();
    } catch (Exception $e) {
        DB::rollBack();
        return response()->json([
            'message' => 'Error saving attendance data',
            'error' => $e->getMessage(),
        ], 500);
    }
});


// Route::get("/{any}", function (Request $request, $any) {
//     $responseData = [
//         'requested_method' => 'GET',
//         'requested_endpoint' => "/" . $any,
//         'requested_body' => $request->all(),
//     ];

//     $responseJson = json_encode($responseData, JSON_PRETTY_PRINT);

//     $logFilePath = storage_path('logs/endpoint_get_requests.log');

//     if (File::exists($logFilePath)) {
//         File::append($logFilePath, "\n==============================================================================\n\n");
//     } else {
//         File::put($logFilePath, '');
//     }

//     File::append($logFilePath, $responseJson . "\n");

//     return response()->json($responseData, 200);
// })->where('any', '.*');

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
