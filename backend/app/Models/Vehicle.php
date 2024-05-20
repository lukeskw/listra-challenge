<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory, HasUuids;

    public $primaryKey = 'id';
    protected $table = 'vehicles';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
       'photoURL',
       'city',
       'brand',
       'model',
       'description',
       'year',
       'mileage',
       'transmission',
       'phone',
       'price',
    ];
    protected $casts = [
        'id' => 'string',
    ];

}
