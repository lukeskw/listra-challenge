<?php

namespace Database\Factories;

use Faker\Provider\FakeCar;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class VehicleFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $this->faker->addProvider(new FakeCar($this->faker));
        // $vehicle = $this->faker->vehicleArray();

        $images = [
            'car1.jpg',
            'car2.jpg',
            'car3.jpg',
            'car4.jpg',
            'car5.jpg',
            'car6.jpg',
            'car7.jpg',
            'car8.jpg',
            'car9.jpg',
            'car10.jpg',
        ];

        return [
            'id' => Str::uuid(),
            'photoURL' => '/storage/' . $this->faker->randomElement($images),
            'city' => $this->faker->city,
            'brand' => $this->faker->vehicleBrand,
            'model' => $this->faker->vehicleModel,
            'description' => "{$this->faker->vehicleModel} {$this->faker->vehicleFuelType} {$this->faker->vehicleType}",
            'year' => $this->faker->biasedNumberBetween(1990, date("Y")),
            'mileage' => $this->faker->numberBetween(5000, 200000),
            'transmission' => $this->faker->randomElement(['Automatico', 'Manual']),
            'phone' => $this->faker->phoneNumber,
            'price' => $this->faker->numberBetween(15000, 50000) * 100,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
