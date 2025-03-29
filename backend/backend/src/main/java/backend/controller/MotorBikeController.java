package backend.controller;


import backend.dto.request.AddMotorBikeRequest;
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
    public Motorbike addNewMotorBike(@RequestBody AddMotorBikeRequest request){
        Motorbike res = motorBikeService.save(request);
        return res;
    }



}
