<?php

namespace App\Http\Controllers;

use App\Http\Requests\VehicleRequest;
use App\Http\Requests\VehicleSimulationRequest;
use App\Http\Services\VehicleService;
use Illuminate\Http\JsonResponse;

class VehicleController extends Controller
{
    private VehicleService $service;
    public function __construct()
    {
        $this->service = new VehicleService();
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $response = $this->service->index();

        return response()->json($response->data, $response->code);
    }

    public function simulate(VehicleSimulationRequest $request, string $id): JsonResponse
    {
        $response = $this->service->simulate($request, $id);

        return response()->json($response->data, $response->code);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VehicleRequest $request): JsonResponse
    {
        $response = $this->service->store($request);

        return response()->json($response->data, $response->code);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $response = $this->service->show($id);

        return response()->json($response->data, $response->code);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(VehicleRequest $request, string $id): JsonResponse
    {
        $response = $this->service->update($request, $id);

        return response()->json($response->data, $response->code);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $response = $this->service->destroy($id);

        return response()->json($response->data, $response->code);
    }
}
