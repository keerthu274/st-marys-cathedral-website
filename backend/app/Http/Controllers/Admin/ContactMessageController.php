<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactMessageResource;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactMessageController extends Controller
{
    public function index(Request $request)
    {
        $messages = ContactMessage::latest()->paginate(10);

        return response()->json([
            'messages' => ContactMessageResource::collection(collect($messages->items()))->resolve($request),
            'meta' => [
                'current_page' => $messages->currentPage(),
                'last_page' => $messages->lastPage(),
                'per_page' => $messages->perPage(),
                'total' => $messages->total(),
            ],
        ]);
    }

    public function show(Request $request, ContactMessage $contactMessage)
    {
        return response()->json([
            'message' => ContactMessageResource::make($contactMessage)->resolve($request),
        ]);
    }
}
