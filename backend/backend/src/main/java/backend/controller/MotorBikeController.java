package backend.controller;


import backend.dto.request.AddMotorBikeRequest;
import backend.dto.request.MotorBikeDTO;
import backend.dto.response.ApiResponse;
import backend.dto.response.MotorBikeResponse;
import backend.entity.Motorbike;
import backend.mapper.MotorBikeMapper;
import backend.service.BikeColorService;
import backend.service.BikeImageService;
import backend.service.MotorBikeService;
import backend.service.VariantService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
@RequestMapping("/motorbikes")
@CrossOrigin(origins = "http://localhost:3000")
public class MotorBikeController {

    private MotorBikeService motorBikeService;
    private VariantService variantService;
    private BikeColorService bikeColorService;
    private BikeImageService bikeImageService;
    private MotorBikeMapper motorBikeMapper;



    @GetMapping
    public ApiResponse<List<MotorBikeResponse>>  getAllMotorBike(){
        List<Motorbike> motorbikes = motorBikeService.findAll();
        return  ApiResponse.success(motorbikes.stream().map(motorBikeMapper::motorBikeToMotoBikeResponse).collect(Collectors.toList()), "Thành công");
//        return motorbikes.stream().map(motorBikeMapper::motorBikeToMotoBikeResponse).toList();
    }

    @GetMapping("/{id}")
    public ApiResponse<MotorBikeResponse> getMotorBikeById(@PathVariable("id") Integer motorBikeId){
        Motorbike motorbike = motorBikeService.findById(motorBikeId).orElseThrow(()->new RuntimeException("Không tìm thấy motorBike với id: "+motorBikeId));

        return ApiResponse.success(motorBikeMapper.motorBikeToMotoBikeResponse(motorbike),"Lấy thông tin motorbike thành công với id thành công");
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
