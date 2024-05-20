<?php

namespace App\Http\Services;

use Illuminate\Support\Carbon;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\VehicleRequest;
use App\Http\Requests\VehicleSimulationRequest;
use App\Http\Resources\VehicleResource;
use App\Http\Responses\BaseServiceResponse;
use App\Models\Vehicle;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class VehicleService extends BaseService
{
    public CONST ONE_HOUR = 60 * 60;

    public function index(): BaseServiceResponse
    {
        $cacheKey = 'vehicles_all';

        $vehicles = Cache::remember($cacheKey, self::ONE_HOUR, function() {
            return Vehicle::all();
        });

        return $this->response(
            VehicleResource::collection($vehicles),
            JsonResponse::HTTP_OK
        );
    }

    public function simulate(VehicleSimulationRequest $request, string $id): BaseServiceResponse
    {
        $data = $request->all();
        $downPayment = $data['down_payment'];
        $cacheKey = "vehicle_{$id}_downpayment_{$downPayment}_simulation";

        try{
            if (Cache::has($cacheKey)) {
                $response = Cache::get($cacheKey);
                return $this->response(
                    $response,
                    JsonResponse::HTTP_OK
                );
            }
            else {
                try{
                    $vehicle = Vehicle::findOrFail($id);
                } catch(\Exception $e){
                    return $this->response(
                        ["error" => $e->getMessage()],
                        JsonResponse::HTTP_NOT_FOUND
                    );
                }
            }

        $price = $vehicle->price;

        if($downPayment >= $price ){
            return $this->response(
                ["error" => 'A entrada não pode ser maior do que o valor do carro'],
                JsonResponse::HTTP_BAD_REQUEST
            );
        }

        $remainingAmount = $price - $downPayment;

        $installmentOptions = [
            6 => 1.1247,
            12 => 1.1556,
            48 => 1.1869,
        ];

        $installments = [];

        foreach ($installmentOptions as $months => $multiplier) {
            $monthlyPayment = $remainingAmount / $months;
            $monthlyPaymentFormatted = intval($monthlyPayment);
            $installments[] = [
                "installment" => $months,
                'payment' => $monthlyPaymentFormatted
            ];
        }

        $response = [
            'installments' => $installments,
        ];

        Cache::put($cacheKey, $response, self::ONE_HOUR);
        } catch( \Exception $e ) {
            return $this->response(
                ["error" => $e->getMessage()],
                JsonResponse::HTTP_INTERNAL_SERVER_ERROR
            );
        }
        return $this->response(
            $response,
            JsonResponse::HTTP_OK
        );
    }



    public function store(VehicleRequest $request): BaseServiceResponse
    {
        try{

            DB::beginTransaction();

            $data = $request->all();

            $fileBase64 = $data['photo'];

            $size_in_bytes = (int) (strlen(rtrim($fileBase64, '=')) * 3 / 4);
                    $size_in_kb    = $size_in_bytes / 1024;
                    $size_in_mb    = $size_in_kb / 1024;

                    if ($size_in_mb > 10) {

                        DB::rollBack();

                        return $this->response(
                            ["error" => 'File cannot be size more than 10mb'],
                            JsonResponse::HTTP_BAD_REQUEST
                        );
                    }
                    $types = ['jpeg', 'jpg', 'png'];

                    $extension = explode('/', explode(':', substr($fileBase64, 0, strpos($fileBase64, ';')))[1])[1];

                    if (in_array($extension, $types) == false || !$extension) {

                        DB::rollBack();

                        return $this->response(
                            ["error" => 'Only PNG or JPEG files can be saved'],
                            JsonResponse::HTTP_BAD_REQUEST
                        );
                    }

                    $fileName = $this->processAndSaveFile($fileBase64, $extension);

                    // dd($fileName);
                    $vehicle = new Vehicle();
                    unset( $data['photo'] );
                    $data['photoURL'] = "/storage/" . $fileName;
                    $vehicle->fill($data);
                    // dd($vehicle);
                    $vehicle->save();

                    DB::commit();

                    // clearing the list of vics from cache
                    Cache::forget('vehicles_all');

        } catch(\Exception $e){
            DB::rollBack();
            return $this->response(
                ["error" => $e->getMessage()],
                JsonResponse::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        return $this->response(
            new VehicleResource($vehicle),
            JsonResponse::HTTP_CREATED
        );
    }

    public function show(string $id): BaseServiceResponse
    {
        $cacheKey = 'vehicle_' . $id;

        try{
            $vehicle = Cache::remember($cacheKey, self::ONE_HOUR, function() use ($id) {
                return Vehicle::findOrFail($id);
            });
        }
        catch(\Exception $e){
            return $this->response(
                ["error" => $e->getMessage()],
                JsonResponse::HTTP_NOT_FOUND
            );
        }
        return $this->response(
            new VehicleResource($vehicle),
            JsonResponse::HTTP_OK
        );
    }

    public function update(VehicleRequest $request, string $id): BaseServiceResponse
    {
        try{
            DB::beginTransaction();

            $vehicle = Vehicle::findOrFail($id);

            $data = $request->all();


            if (isset($data['photo'])) {
                $photoPath = str_replace('/storage/', '', $vehicle->photoURL);

                Storage::disk('public')->delete($photoPath);

                $extension = explode('/', explode(':', substr($data['photo'], 0, strpos($data['photo'], ';')))[1])[1];

                $fileName = $this->processAndSaveFile($data['photo'], $extension);

                unset($data['photo']);
                $data['photoURL'] = "/storage/" . $fileName;
            }
            $vehicle->fill($data);

            $vehicle->save();

            DB::commit();

            // clearing the list of vics from cache
            Cache::forget('vehicle_' . $id);
            Cache::forget('vehicles_all');

        }catch(\Exception $e){
            DB::rollBack();
            return $this->response(
                ["error" => $e->getMessage()],
                JsonResponse::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        return $this->response(
            new VehicleResource($vehicle),
            JsonResponse::HTTP_OK
        );
    }

    public function destroy(string $id): BaseServiceResponse
    {
        try{
            $vehicle = Vehicle::findOrFail($id)->first();

            Storage::disk('public')->delete($vehicle->photoURL);

            $vehicle->delete();

            // clearing the list of vics from cache
            Cache::forget('vehicle_' . $id);
            Cache::forget('vehicles_all');

        } catch(\Exception $e){
            return $this->response(
                ["error" => $e->getMessage()],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        return $this->response(
            null,
            JsonResponse::HTTP_NO_CONTENT
        );
    }
    private function processAndSaveFile($fileBase64, $extension = null){
        $replace = substr($fileBase64, 0, strpos($fileBase64, ',') + 1);

        $file = str_replace($replace, '', $fileBase64);

        $file = str_replace(' ', '+', $file);

        $fileName = Carbon::now()->format('d-m-Y') . '_' . uniqid() . '.' . $extension;

        Storage::disk('public')->put($fileName, base64_decode($file), ['visibility' => 'public', 'directory_visibility' => 'public']);

        return $fileName;
    }
}
