<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class ClashDetectionService
{
    /**
     * Generic overlap detection method.
     */
    public function hasOverlap(
        string $modelClass,
        string $startColumn,
        string $endColumn,
        string $start,
        string $end,
        ?int $ignoreId = null,
        array $filters = []
    ): bool {
        $query = $modelClass::query();

        foreach ($filters as $column => $value) {
            if ($value !== null && $value !== '') {
                $query->where($column, $value);
            }
        }

        if ($ignoreId) {
            $query->where('id', '!=', $ignoreId);
        }

        $query->where($startColumn, '<', $end)
              ->where($endColumn, '>', $start);

        return $query->exists();
    }

    /**
    * Check clashes across multiple scheduling models
    * Used for global conflict prevention (Event vs Mass etc.)
    */
    public function hasGlobalOverlap(
        string $location,
        string $start,
        string $end,
        ?int $ignoreId = null,
        ?string $ignoreModel = null
    ): bool {

    // Check against Events table
    $eventQuery = \App\Models\Event::query()
        ->where('location', $location)
        ->where('start_time', '<', $end)
        ->where('end_time', '>', $start);

    // If editing event, ignore itself
    if ($ignoreModel === 'event' && $ignoreId) {
        $eventQuery->where('id', '!=', $ignoreId);
    }

    if ($eventQuery->exists()) {
        return true;
    }

    // Check against Mass Times table
    $massQuery = \App\Models\MassTime::query()
        ->where('location', $location)
        ->where('start_time', '<', $end)
        ->where('end_time', '>', $start);

    // If editing mass, ignore itself
    if ($ignoreModel === 'mass' && $ignoreId) {
        $massQuery->where('id', '!=', $ignoreId);
    }

    if ($massQuery->exists()) {
        return true;
    }

    // If no clashes found
    return false;
    }
}