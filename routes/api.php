<?php

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

Route::post('/add_user', function (Request $request) {
    DB::beginTransaction();
    try {
        $file = $request->file('image');
        $imagePath = storeImage($file, '/users/');

        EnrollUser::create([
            'userName' => $request->user_name,
            'UserID' => $request->user_id,
            'userGender' => $request->gender,
            'userImage' => $imagePath,
        ]);

        DB::commit();
        return response()->json(['error' => false, 'message' => 'User saved successfully'], 200);

    } catch(Exception $e) {
        DB::rollBack();
        return response()->json([
            'error' => true,
            'message' => 'Error saving user data',
            'errors' => $e->getMessage()
        ], 500);
    }
})->name('store');

Route::get('/users-list', function(Request $request) {
    return EnrollUser::select('id', 'userName', 'UserID', 'userGender', 'userImage', 'status')->get();
});

Route::post('/user-attendance', function (Request $request) {
    // $date = Carbon::createFromTimestamp($request->date)->format('Y-m-d');
    // dd($request->date);
    $date = $request->date;
    $attendance = Attendance::select('id', 'user_id', 'name', 'in_time', 'exit_time')->where('created_at', 'like', $date . '%')->get();
    return response()->json($attendance);
});

Route::get('/attendances', function (Request $request) {
    return AttendanceLogs::select('id', 'user_id', 'name', 'image', 'sex', 'snap_timestamp')->get();
});

//


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

        AttendanceLogs::create([
            'name' => $request->user_name ?? null,
            'user_id' => $request->user_id ?? null,
            'sex' => $request->sex ?? null,
            'image' => 'image/attendance/' . $request->frpic_name,
            'user_list' => $request->user_list ?? null,
            'mask' => $request->mask ?? null,
            'access_card' => $request->access_card ?? null,
            'snap_timestamp' => Carbon::createFromTimestamp($request->snap_time)->format('Y-m-d H:i:s'),
        ]);

        if($request->user_id) {
            $today = Carbon::createFromTimestamp($request->timestamp)->format('Y-m-d');
            $foundAttendance = Attendance::where('user_id', $request->user_id)->where(
                'created_at', 'like', $today . '%'
            )->first();
            if($foundAttendance) {
                $foundAttendance->update([
                    'exit_time' => Carbon::createFromTimestamp($request->timestamp)->format('Y-m-d H:i:s'),
                ]);
            } else {
                Attendance::create([
                    'user_id' => $request->user_id,
                    'name' => $request->user_name,
                    'in_time' => Carbon::createFromTimestamp($request->timestamp)->format('Y-m-d H:i:s'),
                ]);
            }
        }

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
    $output = new ConsoleOutput();
    try {
        $enrollUser = EnrollUser::select('userName', 'UserID', 'userGender', 'userImage', 'status')->where('status', 0);
        if ($enrollUser->exists()) {
            $enrollUser = $enrollUser->first();
            $request_id = rand(11111111, 99999999);
            $request_type = "addUser";
            $user_list = [
                [
                    'user_id' => $enrollUser->UserID,
                    'image_type' => 'image',
                    'image_content' => base64_encode(file_get_contents(asset($enrollUser->userImage))),
                    'user_info' => [
                        'name' => $enrollUser->userName,
                        'sex' => $enrollUser->userGender,
                    ]
                ]
            ];
            $res = [
                'request_id' => $request_id,
                'request_type' => $request_type,
                'user_list' => $user_list,
            ];
            $output->writeln("<info>Userdata Sent to camera</info> ");
            return response()->json($res);
        }
    } catch (Exception $e) {
        $output->writeln("<error>Error sanding user data to camera");
        $output->writeln("<error>" . $e->getMessage() . "</error>");
        return response()->json([
            'message' => 'Error sanding user data',
            'error' => $e->getMessage(),
        ], 500);
    }
});


Route::post('/taskResult', function(Request $request) {
    $output = new ConsoleOutput();
    try {
        $user_id = $request->resp_list[0]['user_id'];
        EnrollUser::where('UserID', $user_id)->update(['status' => 1]);
        $output->writeln("<info>User status updated</info> ");
        return response()->json($request->all());
    } catch(Exception $e) {
        return response()->json([]);
    }
});

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
