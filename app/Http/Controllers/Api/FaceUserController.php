<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\AttendanceLogs;
use App\Models\EnrollUser;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FaceUserController extends Controller
{
    public function userList(Request $request)
    {
        return EnrollUser::select('id', 'userName', 'UserID', 'userGender', 'userImage', 'status', 'log', 'institute')->get();
    }

    public function addUser(Request $request)
    {
        DB::beginTransaction();
        try {
            $file = $request->file('image');
            $imagePath = storeImage($file, '/users/');

            EnrollUser::create([
                'userName' => $request->user_name,
                'UserID' => $request->user_id,
                'userGender' => $request->gender,
                'userImage' => $imagePath,
                'institute' => $request->institute
            ]);

            DB::commit();
            return response()->json(['error' => false, 'message' => 'User saved successfully'], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => true,
                'message' => 'Error saving user data',
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    public function userDelete($id) {
        DB::beginTransaction();
        try {
            $user = EnrollUser::find($id);
            $uimg = public_path($user->userImage);
            deleteImage($uimg);
            $user->delete();
            DB::commit();
            return response()->json(['error' => false, 'message' => 'User deleted successfully'], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => true,
                'message' => 'Error deleting user data',
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    // Attendance Methods

    public function attendanceLog(Request $request) {
        return AttendanceLogs::select('id', 'user_id', 'name', 'image', 'sex', 'snap_timestamp')->get();
    }

    public function userAttendance(Request $request)
    {
        try {
            $date = $request->query('date');

            if (!$date) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Date parameter is required.',
                ], 400);
            }

            $date = Carbon::parse($date)->startOfDay();
            $endOfDay = $date->copy()->endOfDay();

            $attendance = Attendance::select('id', 'user_id', 'name', 'in_time', 'exit_time')
                ->whereBetween('created_at', [$date, $endOfDay])
                ->get();

            return response()->json([
                'status' => 'success',
                'data' => $attendance,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while fetching attendance.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
