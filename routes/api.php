<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get("/{any}", function(Request $request, $any) {
    $responseData = [
        'requested_method' => 'GET',
        'requested_endpoint' => "/" . $any,
        'requested_body' => $request->all(),
    ];

    $responseJson = json_encode($responseData, JSON_PRETTY_PRINT);

    $logFilePath = storage_path('logs/endpoint_get_requests.log');

    if (File::exists($logFilePath)) {
        File::append($logFilePath, "\n==============================================================================\n\n");
    } else {
        File::put($logFilePath, '');
    }

    File::append($logFilePath, $responseJson . "\n");

    return response()->json($responseData, 200);
})->where('any', '.*');

Route::post("/{any}", function(Request $request, $any) {
    $responseData = [
        'requested_method' => 'POST',
        'requested_endpoint' => "/" . $any,
        'requested_body' => $request->all(),
    ];

    $responseJson = json_encode($responseData, JSON_PRETTY_PRINT);

    $logFilePath = storage_path('logs/endpoint_post_requests.log');

    if (File::exists($logFilePath)) {
        File::append($logFilePath, "\n==============================================================================\n\n");
    } else {
        File::put($logFilePath, '');
    }

    File::append($logFilePath, $responseJson . "\n");

    return response()->json($responseData, 200);
})->where('any', '.*');
