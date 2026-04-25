<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactMessageResource;
use App\Http\Resources\EventResource;
use App\Http\Resources\GroupMemberResource;
use App\Http\Resources\MassTimeResource;
use App\Http\Resources\ParishRegistrationResource;
use App\Models\ContactMessage;
use App\Models\Event;
use App\Models\GroupMember;
use App\Models\MassTime;
use App\Models\ParishRegistration;
use Carbon\CarbonImmutable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class OverviewController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();
        $overviewPreferences = $this->normalizeOverviewPreferences($user?->hidden_overview_items);
        $baselineAt = $overviewPreferences['baseline_at']
            ? CarbonImmutable::parse($overviewPreferences['baseline_at'])
            : CarbonImmutable::now();

        if (! $overviewPreferences['baseline_at']) {
            $overviewPreferences['baseline_at'] = $baselineAt->toIso8601String();
            $this->saveOverviewPreferences($user, $overviewPreferences);
        }

        $hasGroupScope = $user->is_main_admin || (bool) $user->group_id;

        $events = $hasGroupScope ? Event::with(['group', 'creator'])
            ->when(! $user->is_main_admin, fn ($query) => $query->where('group_id', $user->group_id))
            ->orderBy('start_date', 'desc')
            ->orderBy('start_time', 'desc')
            ->limit(4)
            ->get() : collect();

        $massTimes = $user->is_main_admin ? MassTime::orderByRaw($this->dayOrderSql())
            ->orderBy('start_time')
            ->limit(4)
            ->get() : collect();

        $registrations = $user->is_main_admin ? ParishRegistration::latest()
            ->limit(4)
            ->get() : collect();

        $contactMessages = $hasGroupScope ? ContactMessage::with('group')
            ->when(! $user->is_main_admin, fn ($query) => $query->where('group_id', $user->group_id))
            ->latest()
            ->limit(4)
            ->get() : collect();

        $groupMembers = $hasGroupScope ? GroupMember::with('group')
            ->when(! $user->is_main_admin, fn ($query) => $query->where('group_id', $user->group_id))
            ->latest()
            ->limit(4)
            ->get() : collect();

        return response()->json([
            'scope' => [
                'is_main_admin' => (bool) $user->is_main_admin,
                'group' => $user->group ? [
                    'id' => $user->group->id,
                    'name' => $user->group->name,
                ] : null,
            ],
            'stats' => [
                'events' => [
                    'total' => $hasGroupScope ? Event::when(! $user->is_main_admin, fn ($query) => $query->where('group_id', $user->group_id))->count() : 0,
                    'published' => $hasGroupScope ? Event::when(! $user->is_main_admin, fn ($query) => $query->where('group_id', $user->group_id))->where('status', 'published')->count() : 0,
                ],
                'mass_times' => [
                    'total' => $user->is_main_admin ? MassTime::count() : 0,
                    'published' => $user->is_main_admin ? MassTime::where('status', 'published')->count() : 0,
                ],
                'registrations' => [
                    'total' => $user->is_main_admin ? ParishRegistration::count() : 0,
                ],
                'contact_messages' => [
                    'total' => $hasGroupScope ? ContactMessage::when(! $user->is_main_admin, fn ($query) => $query->where('group_id', $user->group_id))->count() : 0,
                ],
                'group_members' => [
                    'total' => $hasGroupScope ? GroupMember::when(! $user->is_main_admin, fn ($query) => $query->where('group_id', $user->group_id))->count() : 0,
                ],
            ],
            'recent' => [
                'events' => $this->withOverviewKeys(
                    EventResource::collection($events)->resolve($request),
                    'event',
                    $overviewPreferences,
                    $baselineAt
                ),
                'mass_times' => $this->withOverviewKeys(
                    MassTimeResource::collection($massTimes)->resolve($request),
                    'mass_time',
                    $overviewPreferences,
                    $baselineAt
                ),
                'registrations' => $this->withOverviewKeys(
                    ParishRegistrationResource::collection($registrations)->resolve($request),
                    'registration',
                    $overviewPreferences,
                    $baselineAt
                ),
                'contact_messages' => $this->withOverviewKeys(
                    ContactMessageResource::collection($contactMessages)->resolve($request),
                    'contact_message',
                    $overviewPreferences,
                    $baselineAt
                ),
                'group_members' => $this->withOverviewKeys(
                    GroupMemberResource::collection($groupMembers)->resolve($request),
                    'group_member',
                    $overviewPreferences,
                    $baselineAt
                ),
            ],
        ]);
    }

    public function updateItemVisibility(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'item_key' => ['required', 'string'],
            'visibility' => ['required', Rule::in(['pinned', 'dismissed'])],
        ]);

        $user = $request->user();
        $overviewPreferences = $this->normalizeOverviewPreferences($user?->hidden_overview_items);

        $overviewPreferences['pinned'] = array_values(array_filter(
            $overviewPreferences['pinned'],
            fn ($value) => $value !== $validated['item_key']
        ));
        $overviewPreferences['dismissed'] = array_values(array_filter(
            $overviewPreferences['dismissed'],
            fn ($value) => $value !== $validated['item_key']
        ));

        $overviewPreferences[$validated['visibility']][] = $validated['item_key'];
        $overviewPreferences[$validated['visibility']] = array_values(array_unique($overviewPreferences[$validated['visibility']]));

        $this->saveOverviewPreferences($user, $overviewPreferences);

        return response()->json([
            'message' => $validated['visibility'] === 'dismissed'
                ? 'The item has been cleared from the overview.'
                : 'The item will stay on the overview until you clear it.',
            'overview_preferences' => $overviewPreferences,
        ]);
    }

    private function withOverviewKeys(array $items, string $type, array $overviewPreferences, CarbonImmutable $baselineAt): array
    {
        return array_values(array_filter(array_map(function (array $item) use ($type, $overviewPreferences, $baselineAt) {
            $itemKey = "{$type}:{$item['id']}";
            $createdAt = ! empty($item['created_at']) ? CarbonImmutable::parse($item['created_at']) : null;
            $isPinned = in_array($itemKey, $overviewPreferences['pinned'], true);
            $isDismissed = in_array($itemKey, $overviewPreferences['dismissed'], true);
            $isNew = $createdAt ? $createdAt->greaterThan($baselineAt) : false;
            $shouldShow = ($isNew || $isPinned) && ! $isDismissed;

            return [
                ...$item,
                'overview_item_key' => $itemKey,
                'is_new' => $isNew,
                'is_pinned' => $isPinned,
                'should_show_in_overview' => $shouldShow,
            ];
        }, $items), fn (array $item) => $item['should_show_in_overview']));
    }

    private function normalizeOverviewPreferences(mixed $value): array
    {
        if (is_array($value) && array_is_list($value)) {
            return [
                'baseline_at' => null,
                'pinned' => [],
                'dismissed' => array_values(array_filter($value, fn ($item) => is_string($item) && $item !== '')),
            ];
        }

        $data = is_array($value) ? $value : [];

        return [
            'baseline_at' => isset($data['baseline_at']) && is_string($data['baseline_at']) ? $data['baseline_at'] : null,
            'pinned' => array_values(array_filter($data['pinned'] ?? [], fn ($item) => is_string($item) && $item !== '')),
            'dismissed' => array_values(array_filter($data['dismissed'] ?? [], fn ($item) => is_string($item) && $item !== '')),
        ];
    }

    private function saveOverviewPreferences($user, array $preferences): void
    {
        $user->forceFill([
            'hidden_overview_items' => $preferences,
        ])->save();
    }

    private function dayOrderSql(): string
    {
        return "
            CASE day
                WHEN 'Sunday' THEN 1
                WHEN 'Monday' THEN 2
                WHEN 'Tuesday' THEN 3
                WHEN 'Wednesday' THEN 4
                WHEN 'Thursday' THEN 5
                WHEN 'Friday' THEN 6
                WHEN 'Saturday' THEN 7
                ELSE 8
            END
        ";
    }
}
