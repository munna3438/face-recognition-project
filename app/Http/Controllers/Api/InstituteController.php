<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\Models\Institute;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class InstituteController extends Controller
{
    public function listInstitute(Request $request)
    {
        try {
            $institutes = Institute::select('id', 'name', 'email', 'cam_ip', 'cam_port', 'token', 'max_user', 'status')->orderBy('id', 'desc')->get();
            return response()->json([
                'error' => false,
                'message' => 'Institute List',
                'data' => $institutes
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => true,
                'message' => 'Something went wrong',
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    public function createInstitute(Request $request)
    {
        $validator = Validator::make([
            'name' => 'required|string',
            'email' => 'required|email',
            'cam_ip' => 'required|string',
            'cam_port' => 'required|string',
            'max_user' => 'required|integer',
        ], [
            'name.required' => 'Name is required',
            'email.required' => 'Email is required',
            'cam_ip.required' => 'Camera IP is required',
            'cam_port.required' => 'Camera Port is required',
            'max_user.required' => 'Maximum User is required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error' => true,
                'message' => 'Validation Error',
                'errors' => $validator->errors()
            ], 422);
        }
        DB::beginTransaction();
        try {
            Institute::create([
                'name' => $request->name,
                'email' => $request->email,
                'cam_ip' => $request->cam_ip,
                'cam_port' => $request->cam_port,
                'max_user' => $request->max_user,
            ]);
            DB::commit();
            return response()->json([
                'error' => false,
                'message' => 'Institute Created Successfully',
            ], 200);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => true,
                'message' => 'Something went wrong',
                'errors' => $e->getMessage()
            ], 500);
        }
    }

    public function deleteInstitute(Request $request, $id)
    {
        try {
            $institute = Institute::find($id);
            if (!$institute) {
                return response()->json([
                    'error' => true,
                    'message' => 'Institute not found',
                ], 404);
            }
            $institute->delete();
            return response()->json([
                'error' => false,
                'message' => 'Institute Deleted Successfully',
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => true,
                'message' => 'Something went wrong',
                'errors' => $e->getMessage()
            ], 500);
        }
    }
}
