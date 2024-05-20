<?php

namespace Tests\Feature;

use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class VehicleTest extends TestCase
{
    use RefreshDatabase;

    public function test_index()
    {
        // dd(env("DB_CONNECTION"), env("DB_DATABASE"));
        Vehicle::factory()->count(3)->create();

        $response = $this->getJson('api/vehicles');

        $response->assertStatus(200)
                 ->assertJsonCount(3, 'data');
    }

    public function test_show()
    {
        $vehicle = Vehicle::factory()->create();

        $response = $this->getJson("api/vehicles/{$vehicle->id}");

        $response->assertStatus(200)
                 ->assertJsonPath('data.id', $vehicle->id);
    }

    public function test_store()
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->image('vehicle.jpg');

        $vehicleData = Vehicle::factory()->make()->toArray();
        $vehicleData['photo'] = 'data:image/jpg;base64,' .base64_encode(file_get_contents($file->getPathname()));

        $response = $this->postJson('api/vehicles', $vehicleData);

        $response->assertStatus(201);

        $photoURL = $response->json('data.photoURL');
        $this->assertMatchesRegularExpression('/^\/storage\/\d{2}-\d{2}-\d{4}_[a-zA-Z0-9]+\.jpg$/', $photoURL);

}

    public function test_update()
    {
        Storage::fake('public');

        $vehicle = Vehicle::factory()->create();
        $newFile = UploadedFile::fake()->image('new_vehicle.jpg');

        $updateData = Vehicle::factory()->make()->toArray();
        $updateData['photo'] = 'data:image/jpg;base64,' .base64_encode(file_get_contents($newFile->getPathname()));

        $response = $this->putJson("api/vehicles/{$vehicle->id}", $updateData);

        $response->assertStatus(200);

        $photoURL = $response->json('data.photoURL');
        $this->assertMatchesRegularExpression('/^\/storage\/\d{2}-\d{2}-\d{4}_[a-zA-Z0-9]+\.jpg$/', $photoURL);
    }

    public function test_destroy()
    {
        $vehicle = Vehicle::factory()->create();

        $response = $this->deleteJson("api/vehicles/{$vehicle->id}");

        $response->assertStatus(204);

        $this->assertDatabaseMissing('vehicles', ['id' => $vehicle->id]);
    }

    public function test_simulate()
    {
        $vehicle = Vehicle::factory()->create(['price' => 30000]);

        $response = $this->postJson("api/vehicles/{$vehicle->id}/simulate", [
            'down_payment' => 5000
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'data'=> [
                        'installments' => [
                            '*' => ['installment', 'payment']
                        ]

                     ]
                 ]);
    }
}
