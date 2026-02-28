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
}