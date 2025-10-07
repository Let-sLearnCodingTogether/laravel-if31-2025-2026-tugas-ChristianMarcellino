<?php

namespace App\Http\Controllers;

use App\Models\Glosarries;
use Illuminate\Http\Request;
use App\Http\Requests\StoreGlossariesRequest;

class GlosarriesController extends Controller
{

    public function index()
    {
        
    }

    public function store(StoreGlossariesRequest $request)
    {
        try{
            $validated = $request->safe()->all();
            $validated[user_id] = $request->user()->id;
            $response = Glossaries::create($validated);
            return response()->json([
                'message' => 'Data added successfully',
                'data' => $response
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Failed to add data',
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Glosarries $glosarries)
    {
        //
    }


    public function update(Request $request, Glosarries $glosarries)
    {
        //
    }

    public function destroy(Glosarries $glosarries)
    {
        //
    }
}
