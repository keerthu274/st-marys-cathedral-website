<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\GroupRequest;
use App\Http\Resources\GroupResource;
use App\Models\Group;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class GroupController extends Controller
{
    public function index(Request $request)
    {
        $groups = Group::with(['users' => function ($query) {
            $query->select('id', 'name', 'email', 'group_id');
        }])->orderBy('name')->get();

        $availableAdmins = User::where('is_main_admin', false)
            ->orderBy('name')
            ->get(['id', 'name', 'email', 'group_id']);

        return response()->json([
            'groups' => GroupResource::collection($groups)->resolve($request),
            'available_admins' => $availableAdmins->map(fn (User $user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'group_id' => $user->group_id,
            ])->values()->all(),
        ]);
    }

    public function store(GroupRequest $request)
    {
        $validated = $request->validated();

        $group = Group::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'] ?? null,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        $this->assignAdminUser($validated['admin_user_id'] ?? null, $group);

        return response()->json([
            'message' => 'Group saved successfully.',
            'group' => GroupResource::make($group->fresh())->resolve($request),
        ], 201);
    }

    public function edit(Request $request, Group $group)
    {
        $adminUser = User::where('group_id', $group->id)
            ->where('is_main_admin', false)
            ->first(['id', 'name', 'email']);

        return response()->json([
            'group' => [
                ...GroupResource::make($group)->resolve($request),
                'admin_user_id' => $adminUser?->id,
                'admin_user' => $adminUser ? [
                    'id' => $adminUser->id,
                    'name' => $adminUser->name,
                    'email' => $adminUser->email,
                ] : null,
            ],
        ]);
    }

    public function update(GroupRequest $request, Group $group)
    {
        $validated = $request->validated();

        $group->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'description' => $validated['description'] ?? null,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        User::where('group_id', $group->id)->where('is_main_admin', false)->update(['group_id' => null]);
        $this->assignAdminUser($validated['admin_user_id'] ?? null, $group);

        return response()->json([
            'message' => 'Group updated successfully.',
            'group' => GroupResource::make($group->fresh())->resolve($request),
        ]);
    }

    public function destroy(Request $request, Group $group)
    {
        User::where('group_id', $group->id)->update(['group_id' => null]);
        $group->delete();

        return response()->json([
            'message' => 'Group deleted successfully.',
        ]);
    }

    private function assignAdminUser(?int $userId, Group $group): void
    {
        if (! $userId) {
            return;
        }

        User::where('id', $userId)
            ->where('is_main_admin', false)
            ->update(['group_id' => $group->id]);
    }
}
