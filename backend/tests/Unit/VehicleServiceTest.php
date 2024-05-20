<?php

namespace Tests\Unit;

use App\Http\Requests\VehicleSimulationRequest;
use App\Http\Services\VehicleService;
use App\Models\Vehicle;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;
use Illuminate\Support\Str;

class VehicleServiceTest extends TestCase
{
    use RefreshDatabase;


    /**
     * A basic test example.
     */

    // 1 cenario: dado que eu tenha um veiculo cadastrado, então ao simular o financiamento do mesmo, devo retornar
    // as parcelas de 6, 12 e 48 meses.
    // 2 cenario: dado que eu tenha um veiculo cadastrado, então ao ocorrer um erro de leitura no id do veiculo, devo retornar
    // uma mensagem de erro.
    // 3 cenario: ao passar um valor de entrada maior do que o valor do veiculo, devo retornar um erro ao simular o financiamento

    public function test_that_simulate_returns_three_valid_installments(): void
    {
        // preparação dos dados
        $vehicle = Vehicle::factory()->create([
            'price' => '1000000',
        ]);

        $requestData = [
            'down_payment' => 500000,
        ];

        $request = new VehicleSimulationRequest($requestData);

        $vehicleService = new VehicleService();

        // execução do que deve acontecer
        $response = $vehicleService->simulate($request, $vehicle->id);

        //asserções

        $this->assertEquals(200, $response->code, 'Response code should be 200');

        $this->assertArrayHasKey('data', $response->data, 'Response should contain data');
        $this->assertArrayHasKey('installments', $response->data['data'], 'Response data should contain installments');

        $installments = $response->data['data']['installments'];
        $this->assertCount(3, $installments, 'There should be three installments');

        $this->assertEquals(6, $installments[0]['installment'], 'First installment should be 6 months');
        $this->assertEquals(83333, $installments[0]['payment'], 'First installment payment should be 83333');

        $this->assertEquals(12, $installments[1]['installment'], 'Second installment should be 12 months');
        $this->assertEquals(41666, $installments[1]['payment'], 'Second installment payment should be 41666');

        $this->assertEquals(48, $installments[2]['installment'], 'Third installment should be 48 months');
        $this->assertEquals(10416, $installments[2]['payment'], 'Third installment payment should be 10416');

        $this->assertEquals('Sucesso', $response->data['message'], 'Response message should be "Sucesso"');
    }
    public function test_that_simulate_returns_error_if_down_payment_is_greater_than_vehicle_price(): void
    {
        // preparação dos dados
        $vehicle = Vehicle::factory()->create([
            'price' => '1000000',
        ]);

        $requestData = [
            'down_payment' => 5000000,
        ];

        $request = new VehicleSimulationRequest($requestData);

        $vehicleService = new VehicleService();

        // execução do que deve acontecer
        $response = $vehicleService->simulate($request, $vehicle->id);

        //asserções
        $this->assertEquals(400, $response->code, 'Response code should be 400');

        $this->assertArrayHasKey('data', $response->data, 'Response should contain data');
        $this->assertArrayHasKey('error', $response->data['data'], 'Response data should contain error');

        $error = $response->data['data']['error'];

        $this->assertEquals('A entrada não pode ser maior do que o valor do carro', $error, 'Down payment cant be greater than entrance');

        $this->assertEquals('Erro', $response->data['message'], 'Response message should be "Erro"');
    }
    public function test_that_simulate_returns_error_if_vehicle_is_not_found(): void
    {
        // preparação dos dados
        $vehicle = Vehicle::factory()->create([
            'price' => '1000000',
        ]);

        $requestData = [
            'down_payment' => 5000000,
        ];

        $request = new VehicleSimulationRequest($requestData);

        $vehicleService = new VehicleService();

        $id = Str::uuid();
        // execução do que deve acontecer
        $response = $vehicleService->simulate($request, $id);

        //asserções
        $this->assertEquals(404, $response->code, 'Response code should be 404');

        $this->assertArrayHasKey('data', $response->data, 'Response should contain data');
        $this->assertArrayHasKey('error', $response->data['data'], 'Response data should contain error');

        $error = $response->data['data']['error'];

        $this->assertEquals("No query results for model [App\Models\Vehicle] {$id}", $error, 'Response should show no results');

        $this->assertEquals('Erro', $response->data['message'], 'Response message should be "Erro"');
    }
}
