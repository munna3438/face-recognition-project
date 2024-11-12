<?php

namespace App\Http\Middleware;

use App\Models\Institute;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VerifyInstitute
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->input('token');
        if(Institute::where('token', $token)->exists()) {
            return $next($request);
        } else {
            return response()->json(['error' => true, 'message' => 'Invalid or unknown token', 'errors' => []], 401);
        }
    }
}
