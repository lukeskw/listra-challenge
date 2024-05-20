<?php

namespace App\Http\Services;

use Illuminate\Http\JsonResponse;
use App\Http\Responses\BaseServiceResponse;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection as BaseCollection;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class BaseService
{
    protected $model;

    public function response(array|ResourceCollection|JsonResource|Model|EloquentCollection|BaseCollection|null $data = [], int|null $code = JsonResponse::HTTP_OK, string $message = null): BaseServiceResponse
    {
        return new BaseServiceResponse(
            $code,
            $data,
            $message
        );
    }

    public function withSearch(string $model, string $searchTerm, array $attrs): Builder|null
    {
        $query = null;

        foreach ($attrs as $attr) {
            if (is_null($query)) {
                $query = $model::whereRaw("LOWER($attr) LIKE ?", ['%' . strtolower($searchTerm) . '%']);
            } else {
                $query = $query->orWhereRaw("LOWER($attr) LIKE ?", ['%' . strtolower($searchTerm) . '%']);
            }
        }

        return $query;
    }
}
