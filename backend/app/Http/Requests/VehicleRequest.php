<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'photo' => 'required|string',
            'city' => 'required|string',
            'brand' => 'required|string',
            'model' => 'required|string',
            'description' => 'required|string',
            'year' => 'required|integer|min:1900|max:'.date('Y'),
            'mileage' => 'required|integer|min:0|max:10000000000',
            'transmission' => 'required|string',
            'phone' => 'required|string',
            'price' => 'required|integer|min:0|max:10000000000',
        ];
    }
}
