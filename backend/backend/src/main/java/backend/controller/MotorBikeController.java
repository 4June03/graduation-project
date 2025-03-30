package backend.controller;


import backend.dto.request.AddMotorBikeRequest;
import backend.dto.request.MotorBikeDTO;
import backend.dto.response.ApiResponse;
import backend.entity.Motorbike;
import backend.service.BikeColorService;
import backend.service.BikeImageService;
import backend.service.MotorBikeService;
import backend.service.VariantService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
@RequestMapping("/motorbikes")
public class MotorBikeController {

    private MotorBikeService motorBikeService;
    private VariantService variantService;
    private BikeColorService bikeColorService;
    private BikeImageService bikeImageService;


    @GetMapping
    public List<Motorbike> getAllMotorBike(){
        return motorBikeService.findAll();
    }


    @PostMapping
    public ApiResponse<Motorbike> addNewMotorBike(@RequestBody MotorBikeDTO request){
        Motorbike response = motorBikeService.createNewMotorBike(request);
        return ApiResponse.success(response, "Thêm thành motorbike thành công");
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteMotorBike(@PathVariable("id") Integer bikeId){
        motorBikeService.deleteById(bikeId);

        return ApiResponse.success("", "Xóa motorbike thành công");
    }



}
