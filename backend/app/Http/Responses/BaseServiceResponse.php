<?php

namespace App\Http\Responses;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection as BaseCollection;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;

class BaseServiceResponse
{
    public int $code;
    public array $data = [];

    public function __construct($code, array|ResourceCollection|JsonResource|Model|EloquentCollection|BaseCollection|null $data, $message = null) {
        /**
         * asserting message
         */
        if (is_null($message)) {
            if ($code >= 300)
                $message = __('general.error');
            else
                $message = __('general.success');
        }

        /**
         * paginating all collections
         */
        if ($data instanceof ResourceCollection) {
            $data = $data->resource;
        }

        $this->code = $code;
        $this->data = [
            'data' => $data,
            'message' => $message
        ];
    }
}
