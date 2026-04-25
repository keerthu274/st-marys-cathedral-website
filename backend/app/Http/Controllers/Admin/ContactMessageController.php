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
        $user = $request->user();
        $messages = (! $user->is_main_admin && ! $user->group_id)
            ? ContactMessage::whereRaw('1 = 0')->paginate(10)
            : ContactMessage::with('group')
                ->when(! $user->is_main_admin, fn ($query) => $query->where('group_id', $user->group_id))
                ->latest()
                ->paginate(10);

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
        $user = $request->user();

        if (! $user->is_main_admin && (! $user->group_id || $contactMessage->group_id !== $user->group_id)) {
            abort(403, 'You do not have access to this contact message.');
        }

        return response()->json([
            'message' => ContactMessageResource::make($contactMessage->loadMissing('group'))->resolve($request),
        ]);
    }

    public function destroy(ContactMessage $contactMessage)
    {
        $contactMessage->delete();

        return response()->json([
            'message' => 'Contact message deleted successfully.',
        ]);
    }
}
