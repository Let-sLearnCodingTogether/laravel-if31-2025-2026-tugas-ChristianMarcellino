<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureOnlyCreatorCanAccessMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $glossary = $request->route('glossary');
        if ($request->user()->id != $glossary->user_id) {
            return response()->json([
                'Message' => "Unauthorized",
            ], 403);
        }
        return $next($request);
    }
}
