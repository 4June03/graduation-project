package backend.mapper;

import backend.dto.request.AddMotorBikeRequest;
import backend.dto.request.BikeImageDTO;
import backend.dto.request.VariantColorDTO;
import backend.dto.request.VariantDTO;
import backend.dto.response.MotorBikeResponse;
import backend.entity.BikeImage;
import backend.entity.Motorbike;
import backend.entity.Variant;
import backend.entity.VariantColor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {BasicSpecificationMapper.class, EngineAndFrameMapper.class})
public interface MotorBikeMapper {

    public Motorbike addMotorBikeRequestToMotorBike(AddMotorBikeRequest request);

    @Mapping(source = "category.categoryName", target = "categoryName")
    @Mapping(source = "brand.brandName", target = "brandName")
    public MotorBikeResponse motorBikeToMotoBikeResponse(Motorbike motorbike);


    // Mapping từ Variant sang VariantDTO

    VariantDTO toVariantDTO(Variant variant);

    // Mapping từ VariantColor sang VariantColorDTO
    @Mapping(source = "color.colorId",target = "colorId")
    VariantColorDTO toVariantColorDTO(VariantColor variantColor);

    // Mapping từ BikeImage sang BikeImageDTO
    BikeImageDTO toBikeImageDTO(BikeImage bikeImage);
}
