<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\AttendanceLogs;
use App\Models\EnrollUser;
use App\Models\Institute;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Console\Output\ConsoleOutput;

class CameraOperationController extends Controller
{
    public function faceRecognition(Request $request, $token)
    {
        $output = new ConsoleOutput();
        DB::beginTransaction();
        try {

            $institute = Institute::where('token', $token);
            if(!$institute->exists()) {
                throw new Exception('Invalid token');
                return;
            }

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
                'institute_id' => $institute->first()->id,
            ]);

            if ($request->user_id) {
                $today = Carbon::createFromTimestamp($request->timestamp)->format('Y-m-d');
                $foundAttendance = Attendance::where('user_id', $request->user_id)
                    ->where('institute_id', $institute->first()->id)
                    ->where(
                        'created_at',
                        'like',
                        $today . '%'
                    )->first();
                if ($foundAttendance) {
                    $foundAttendance->update([
                        'exit_time' => Carbon::createFromTimestamp($request->timestamp)->format('Y-m-d H:i:s'),
                    ]);
                } else {
                    Attendance::create([
                        'user_id' => $request->user_id,
                        'name' => $request->user_name,
                        'in_time' => Carbon::createFromTimestamp($request->timestamp)->format('Y-m-d H:i:s'),
                        'institute_id' => $institute->first()->id,
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
    }



    public function taskRequest(Request $request, $token)
    {
        $output = new ConsoleOutput();
        try {
            $institute = Institute::where('token', $token);

            if(!$institute->exists()) {
                throw new Exception('Invalid token');
                return;
            }

            $enrollUser = EnrollUser::select('userName', 'UserID', 'userGender', 'userImage', 'status')->where('institute_id', $institute->first()->id)->where('status', 0);

            if ($enrollUser->exists()) {
                $enrollUser = $enrollUser->first();
                $request_id = rand(11111111, 99999999);
                $request_type = "addUser";
                $user_list = [
                    [
                        'user_id' => $enrollUser->UserID,
                        // 'image_type' => 'image',
                        'image_type' => 'URL',
                        // 'image_content' => base64_encode(file_get_contents(asset($enrollUser->userImage))),
                        'image_content' => asset($enrollUser->userImage),
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
    }


    public function taskResult(Request $request, $token)
    {
        $output = new ConsoleOutput();
        try {
            $institute = Institute::where('token', $token);

            if(!$institute->exists()) {
                throw new Exception('Invalid token');
                return;
            }
            $resp_type = $request->resp_type;
            switch ($resp_type) {
                case 'addUser':
                    $user_id = $request->resp_list[0]['user_id'];
                    $code = $request->resp_list[0]['code'];
                    $enrollUser = EnrollUser::where('UserID', $user_id)->where('institute_id', $institute->first()->id);
                    if ($code == 0) {
                        $enrollUser->update([
                            'status' => 1,
                            'log' => ""
                        ]);
                        return response()->json($request->all());
                    } else {
                        $enrollUser->update([
                            'log' => "Code: " . $code . " | Message: " . getErrorMsgFromCode($code)
                        ]);
                    }
                    break;
            }
        } catch (Exception $e) {
            return response()->json([]);
        }
    }
}
