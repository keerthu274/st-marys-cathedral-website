<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\GroupMemberRequest;
use App\Http\Resources\GroupMemberResource;
use App\Models\Group;
use App\Models\GroupMember;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GroupMemberController extends Controller
{
    public function store(GroupMemberRequest $request, Group $group): JsonResponse
    {
        $this->authorizeGroupAccess($request, $group);

        $member = $group->groupMembers()->create([
            ...$request->validated(),
            'created_by_user_id' => $request->user()->id,
        ]);

        return response()->json([
            'message' => 'Group member saved successfully.',
            'member' => GroupMemberResource::make($member->loadMissing('group'))->resolve($request),
        ], 201);
    }

    public function update(GroupMemberRequest $request, Group $group, GroupMember $groupMember): JsonResponse
    {
        $this->authorizeGroupAccess($request, $group);
        $this->ensureMemberBelongsToGroup($group, $groupMember);

        $groupMember->update($request->validated());

        return response()->json([
            'message' => 'Group member updated successfully.',
            'member' => GroupMemberResource::make($groupMember->fresh()->loadMissing('group'))->resolve($request),
        ]);
    }

    public function destroy(Request $request, Group $group, GroupMember $groupMember): JsonResponse
    {
        $this->authorizeGroupAccess($request, $group);
        $this->ensureMemberBelongsToGroup($group, $groupMember);

        $groupMember->delete();

        return response()->json([
            'message' => 'Group member deleted successfully.',
        ]);
    }

    private function authorizeGroupAccess(Request $request, Group $group): void
    {
        $user = $request->user();

        if (! $user->is_main_admin && (int) $user->group_id !== (int) $group->id) {
            abort(403, 'You do not have access to this group.');
        }
    }

    private function ensureMemberBelongsToGroup(Group $group, GroupMember $groupMember): void
    {
        if ((int) $groupMember->group_id !== (int) $group->id) {
            abort(404);
        }
    }
}
