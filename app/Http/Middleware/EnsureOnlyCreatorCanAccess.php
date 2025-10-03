<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureOnlyCreatorCanAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $user_id): Response
    {
        if ($request->user()->id != $user_id) {
            return response()->json([
                'Message' => "Unauthorized",
                'data' => $request->user()->id,
            ], 403);
        }
        return $next($request);
    }
}
