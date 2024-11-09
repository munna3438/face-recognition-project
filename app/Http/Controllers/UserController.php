<?php

namespace App\Http\Controllers;

use App\Models\enrollUser;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    //
    public function add()
    {
        return Inertia::render('Users/Add');
    }
    public function store(Request $request)
    {
        $request->validate([
            'userName' => 'required',
            'UserID' => 'required',
            'userGender' => 'required',
            'userImage' => 'required',

        ]);
        $user = enrollUser::create([
            'userName' => $request->userName,
            'UserID' => $request->UserID,
            'userGender' => $request->userGender,
            'userImage' => $request->userImage,
        ]);
        return redirect()->route('Users/Index');
    }
}
