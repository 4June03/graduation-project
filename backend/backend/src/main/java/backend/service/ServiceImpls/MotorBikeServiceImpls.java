package backend.service.ServiceImpls;

import backend.dto.request.AddMotorBikeRequest;
import backend.dto.request.MotorBikeDTO;
import backend.dto.request.VariantColorDTO;
import backend.entity.*;
import backend.mapper.BasicSpecificationMapper;
import backend.mapper.BikeImageMapper;
import backend.mapper.EngineAndFrameMapper;
import backend.mapper.MotorBikeMapper;
import backend.repository.*;
import backend.service.MotorBikeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class MotorBikeServiceImpls implements MotorBikeService {

    private MotorBikeRepository motorBikeRepository;
    private VariantRepository variantRepository;
    private CategoryRepository categoryRepository;
    private MotorBikeMapper motorBikeMapper;
    private BrandRepository brandRepository;
    private BasicSpecificationMapper basicSpecificationMapper;
    private EngineAndFrameMapper engineAndFrameMapper;
    private BikeColorRepository bikeColorRepository;
    private BikeImageMapper bikeImageMapper;

    @Override
    public Page<Motorbike> findAll(Pageable pageable) {
        return motorBikeRepository.findAll(pageable);
    }

    @Override
    public Optional<Motorbike> findById(Integer id) {
        return motorBikeRepository.findById(id);
    }

    @Override
    public Motorbike createNewMotorBike(MotorBikeDTO request) {

        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(()->new RuntimeException("Không tồn tại thương hiệu với Id: "+request.getBrandId()));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(()->new RuntimeException("Không tồn tại danh mục xe với id: "+request.getCategoryId()));


        Motorbike motorbike = new Motorbike();
        BasicSpecification basicSpecification = basicSpecificationMapper.DTOtoBasicSpecification(request.getBasicSpecification());
        EngineAndFrame engineAndFrame = engineAndFrameMapper.DTOtoEngineAndFrame(request.getEngineAndFrame());

        motorbike.setBikeName(request.getBikeName());
        motorbike.setDescription(request.getDescription());
        motorbike.setVideoUrl(request.getVideoUrl());
        motorbike.setBrand(brand);
        motorbike.setCategory(category);
        motorbike.setBasicSpecification(basicSpecification);
        motorbike.setEngineAndFrame(engineAndFrame);


        if(request.getVariants()!=null){

            Set<Variant> variantList = new HashSet<>();

            request.getVariants().forEach(VariantDTO ->{

                Variant variant = new Variant();

                variant.setVariantName(VariantDTO.getVariantName());
                variant.setVariantPrice(VariantDTO.getVariantPrice());
                variant.setVariantStock(VariantDTO.getVariantStock());
                variant.setMotorbikes(motorbike);

                Set<VariantColor> variantColorSet = new HashSet<>();

                VariantDTO.getVariantColors().forEach(variantColorDTO->{
                    VariantColor variantColor = new VariantColor();
                    //lấy ra màu từ id màu của dto
                    BikeColor bikeColor = bikeColorRepository
                            .findById(variantColorDTO.getColorId())
                            .orElseThrow(()->new EntityNotFoundException("Không tìm thấy color với id: "+variantColorDTO.getColorId()));

                    //lấy ra list ảnh từ variantDTO
                    List<BikeImage> listImage = new ArrayList<>();
                    variantColorDTO.getImages().forEach(bikeImageDTO -> {
                        BikeImage image = bikeImageMapper.DTOtoBikeImage(bikeImageDTO);
                        image.setVariantColor(variantColor);
                        listImage.add(image);
                    });
                    //Đặt set cho variantColor
                    variantColor.setColor(bikeColor);
                    variantColor.setImages(listImage);

                    //set VariantColor cho Variant
                    variantColor.setVariant(variant);
                    //thêm vào Set VariantColor
                    variantColorSet.add(variantColor);

                });
                variant.setVariantColors(variantColorSet);

                variantList.add(variant);
            });
            //thêm danh sách variant vào cho motobike
            motorbike.setVariants(variantList);
        }

        return motorBikeRepository.save(motorbike);
    }

    @Override
    public Motorbike updateMotorBike(Motorbike motorbike) {
        return motorBikeRepository.save(motorbike);
    }

    @Override
    public void deleteById(Integer id) {

        Motorbike motorbike = motorBikeRepository.findById(id)
                .orElseThrow(()->new EntityNotFoundException("Không tìm thấy motorbike với id: "+id));

        motorBikeRepository.deleteById(id);
    }

    @Override
    public Page<Motorbike> findByCategoryId(Integer categoryId, Pageable pageable) {
        return motorBikeRepository.findByCategoryCategoryId(categoryId, pageable);
    }
}
