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
use Illuminate\Support\Facades\Validator;

class FaceUserController extends Controller
{
    public function userList(Request $request)
    {
        try {
            $institute = Institute::where('token', $request->input('token'))->first();
            $users = EnrollUser::select('id', 'userName', 'UserID', 'userGender', 'userImage', 'status', 'log', 'institute_id')->where('institute_id', $institute->id)->orderBy('id', 'desc')->get();
            return response()->json(['error' => false, 'message' => 'User list', 'data' => $users], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => true,
                'message' => 'Error fetching user list',
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    public function addUser(Request $request)
    {
        $validate = Validator::make([
            'user_name' => 'required|max:255',
            'user_id' => 'required|unique:enroll_users,UserID',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:50',
            'gender' => 'required|in:0,1',
        ], [
            'user_name.required' => 'User name is required',
            'user_id.required' => 'User ID is required',
            'user_id.unique' => 'User ID already exists',
            'image.required' => 'User image is required',
            'image.image' => 'User image must be an image',
            'image.mimes' => 'User image must be a jpeg, png or jpg file',
            'image.max' => 'User image must be less than 50KB',
            'gender.required' => 'User gender is required',
            'gender.in' => 'User gender must be 0 or 1 (0 for male, 1 for female)',
        ]);

        if ($validate->fails()) {
            return response()->json([
                'error' => true,
                'message' => 'Error validating user data',
                'errors' => $validate->errors()
            ], 422);
        }

        DB::beginTransaction();
        try {
            $file = $request->file('image');
            $imagePath = storeImage($file, '/users/');

            $institute = Institute::where('token', $request->input('token'))->first();

            if(EnrollUser::where('UserID', $request->user_id)->where('institute_id', $institute->id)->first() != null)  {
                return response()->json([
                    'error' => true,
                    'message' => 'User ID already exists',
                    'errors' => []
                ], 400);
            }

            EnrollUser::create([
                'userName' => $request->user_name,
                'UserID' => $request->user_id,
                'userGender' => $request->gender,
                'userImage' => $imagePath,
                'institute_id' => $institute->id
            ]);

            DB::commit();
            return response()->json(['error' => false, 'message' => 'User saved successfully'], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => true,
                'message' => 'Error creating user',
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    public function userDelete($id, Request $request) {
        DB::beginTransaction();
        try {
            $user = EnrollUser::find($id);
            if($user->institute->token != $request->input('token') || $user == null) {
                return response()->json([
                    'error' => true,
                    'message' => 'User not found',
                    'errors' => []
                ], 404);
            }
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
        try {
            $institute = Institute::where('token', $request->input('token'))->first();
            $logs = AttendanceLogs::select('id', 'user_id', 'name', 'image', 'sex', 'snap_timestamp')->where('institute_id', $institute->id)->orderBy('id', 'desc')->get();
            return response()->json(['error' => false, 'message' => 'Attendance logs', 'data' => $logs], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => true,
                'message' => 'Error fetching attendance logs',
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    public function userAttendance(Request $request)
    {
        try {
            $date = $request->query('date');

            if (!$date) {
                return response()->json([
                    'error' => true,
                    'message' => 'Date parameter is required.',
                    'errors' => [],
                ], 400);
            }

            $date = Carbon::parse($date)->startOfDay();
            $endOfDay = $date->copy()->endOfDay();

            $institute = Institute::where('token', $request->input('token'))->first();

            $attendance = Attendance::select('id', 'user_id', 'name', 'in_time', 'exit_time')
                ->where('institute_id', $institute->id)
                ->whereBetween('created_at', [$date, $endOfDay])
                ->orderBy('id', 'desc')
                ->get();

            return response()->json([
                'error' => false,
                'message' => 'Attendance fetched successfully.',
                'data' => $attendance,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => true,
                'message' => 'An error occurred while fetching attendance.',
                'errors' => $e->getMessage(),
            ], 500);
        }
    }
}
