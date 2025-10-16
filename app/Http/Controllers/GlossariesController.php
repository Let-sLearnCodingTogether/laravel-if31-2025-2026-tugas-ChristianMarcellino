<?php

namespace App\Http\Controllers;

use App\Models\Glossaries;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;
use App\Http\Requests\StoreGlossariesRequest;

class GlossariesController extends Controller
{

    public function index()
    {
        try {
            return response()->json([
                'message' => 'Successfully Showing Data',
                'data' => Glossaries::where('user_id' , Auth::user()->id)->get(),
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to show data',
                'error' => $e->getMessage()
            ],500);
        }
    }

    public function store(StoreGlossariesRequest $request)
    {
        try{
            $validated = $request->safe()->all();
            $validated['user_id'] = $request->user()->id;
            $response = Glossaries::create($validated);
            return response()->json([
                'message' => 'Data added successfully',
                'data' => $response
            ], 201);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Failed to add data',
                'error' => $e->getMessage()
            ],500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Glossaries $glossary)
    {
        try {
            return response()->json([
                'message' => 'Successfully Showing Data',
                'data' => $glossary->where('user_id' , Auth::user()->id)->get(),
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Failed to show data',
                'error' => $e->getMessage()
            ],500);
        }
    }


    public function update(Request $request, Glossaries $glossary)
    {
        
    }

    public function destroy(Glossaries $glossary)
    {
        try{
            $glossary->delete();
            return response()->json([
                'message' => 'Data Successfully Deleted',
                'data' => 'null'
            ]);
        }catch(Exception $e){
            return response()->json([
                'message' => 'Failed to delete data',
                'error'=> $e->getMessage(),
            ]);
        }
    }
}
