package backend.controller;


import backend.dto.request.AddMotorBikeRequest;
import backend.dto.request.MotorBikeDTO;
import backend.dto.response.ApiResponse;
import backend.dto.response.MotorBikeResponse;
import backend.dto.response.MotorbikeCardResponse;
import backend.entity.BikeColor;
import backend.entity.Brand;
import backend.entity.Motorbike;
import backend.mapper.MotorBikeMapper;
import backend.service.*;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
@RequestMapping("/motorbikes")
@CrossOrigin(origins = "http://localhost:3000")
public class MotorBikeController {

    private MotorBikeService motorBikeService;
    private BikeColorService bikeColorService;
    private MotorBikeMapper motorBikeMapper;
    private BrandService brandService;

    @GetMapping
    public ApiResponse<Page<MotorBikeResponse>> getAllMotorBike(
            @PageableDefault(page = 0, size = 10, sort = "bikeName", direction = Sort.Direction.ASC)
            Pageable pageable) {

        // Lấy Page<Motorbike> từ service
        Page<Motorbike> page = motorBikeService.findAll(pageable);

        // Chuyển thành Page<MotorBikeResponse>
        Page<MotorBikeResponse> dtoPage = page.map(motorBikeMapper::motorBikeToMotoBikeResponse);

        return ApiResponse.success(dtoPage, "Thành công");
    }

    @GetMapping("/category/{categoryId}")
    public ApiResponse<Page<MotorbikeCardResponse>> getByCategory(
            @PathVariable Integer categoryId,
            @PageableDefault(page = 0, size = 10, sort = "bikeName", direction = Sort.Direction.ASC)
            Pageable pageable) {

        Page<Motorbike> page = motorBikeService.findByCategoryId(categoryId, pageable);

        Page<MotorbikeCardResponse> dtoPage = page.map(MotorbikeCardResponse::fromEntity);
        return ApiResponse.success(dtoPage, "Lấy danh sách motorbike theo categoryId thành công");
    }


    @GetMapping("/{id}")
    public ApiResponse<MotorBikeResponse> getMotorBikeById(@PathVariable("id") Integer motorBikeId){
        Motorbike motorbike = motorBikeService.findById(motorBikeId).orElseThrow(()->new RuntimeException("Không tìm thấy motorBike với id: "+motorBikeId));

        return ApiResponse.success(motorBikeMapper.motorBikeToMotoBikeResponse(motorbike),"Lấy thông tin motorbike thành công với id thành công");
    }


    @PostMapping
    public ApiResponse<MotorBikeResponse> addNewMotorBike(@RequestBody MotorBikeDTO request){
        Motorbike motorbike = motorBikeService.createNewMotorBike(request);
        MotorBikeResponse response = motorBikeMapper.motorBikeToMotoBikeResponse(motorbike);
        return ApiResponse.success(response, "Thêm thành motorbike thành công");
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteMotorBike(@PathVariable("id") Integer bikeId){
        motorBikeService.deleteById(bikeId);

        return ApiResponse.success("", "Xóa motorbike thành công");
    }

    @GetMapping("/brands")
    private List<Brand> getAllBrands(){
        return brandService.findAll();
    }

    @GetMapping("/colors")
    private List<BikeColor> getAllBikeColors(){
        return bikeColorService.findAll();
    }

    // API tìm kiếm: /motorbikes/search?name=abc&page=0&size=10
    @GetMapping("/search")
    public ApiResponse<Page<MotorbikeCardResponse>> searchByName(
            @RequestParam("name") String name,
            @PageableDefault(page = 0, size = 10, sort = "bikeName", direction = Sort.Direction.ASC)
            Pageable pageable
    ) {
        Page<Motorbike> page = motorBikeService.searchByName(name, pageable);
        Page<MotorbikeCardResponse> dtoPage = page.map(MotorbikeCardResponse::fromEntity);
        return ApiResponse.success(dtoPage, "Tìm kiếm thành công cho: \"" + name + "\"");
    }

}
