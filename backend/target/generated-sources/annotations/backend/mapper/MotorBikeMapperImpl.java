package backend.mapper;

import backend.dto.request.AddMotorBikeRequest;
import backend.dto.request.BikeImageDTO;
import backend.dto.request.VariantColorDTO;
import backend.dto.request.VariantDTO;
import backend.dto.response.MotorBikeResponse;
import backend.entity.BikeColor;
import backend.entity.BikeImage;
import backend.entity.Brand;
import backend.entity.Category;
import backend.entity.Motorbike;
import backend.entity.Variant;
import backend.entity.VariantColor;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-28T00:15:46+0700",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.1 (Oracle Corporation)"
)
@Component
public class MotorBikeMapperImpl implements MotorBikeMapper {

    @Autowired
    private BasicSpecificationMapper basicSpecificationMapper;
    @Autowired
    private EngineAndFrameMapper engineAndFrameMapper;

    @Override
    public Motorbike addMotorBikeRequestToMotorBike(AddMotorBikeRequest request) {
        if ( request == null ) {
            return null;
        }

        Motorbike.MotorbikeBuilder motorbike = Motorbike.builder();

        motorbike.bikeName( request.getBikeName() );
        motorbike.description( request.getDescription() );
        motorbike.videoUrl( request.getVideoUrl() );
        motorbike.basicSpecification( request.getBasicSpecification() );
        motorbike.engineAndFrame( request.getEngineAndFrame() );

        return motorbike.build();
    }

    @Override
    public MotorBikeResponse motorBikeToMotoBikeResponse(Motorbike motorbike) {
        if ( motorbike == null ) {
            return null;
        }

        MotorBikeResponse motorBikeResponse = new MotorBikeResponse();

        motorBikeResponse.setCategoryName( motorbikeCategoryCategoryName( motorbike ) );
        motorBikeResponse.setBrandName( motorbikeBrandBrandName( motorbike ) );
        motorBikeResponse.setBikeId( motorbike.getBikeId() );
        motorBikeResponse.setBikeName( motorbike.getBikeName() );
        motorBikeResponse.setDescription( motorbike.getDescription() );
        motorBikeResponse.setVideoUrl( motorbike.getVideoUrl() );
        motorBikeResponse.setRating( motorbike.getRating() );
        motorBikeResponse.setBasicSpecification( basicSpecificationMapper.basicSpecificationToDTO( motorbike.getBasicSpecification() ) );
        motorBikeResponse.setEngineAndFrame( engineAndFrameMapper.engineAndFrameToDTO( motorbike.getEngineAndFrame() ) );
        motorBikeResponse.setVariants( variantSetToVariantDTOSet( motorbike.getVariants() ) );

        return motorBikeResponse;
    }

    @Override
    public VariantDTO toVariantDTO(Variant variant) {
        if ( variant == null ) {
            return null;
        }

        VariantDTO.VariantDTOBuilder variantDTO = VariantDTO.builder();

        variantDTO.variantId( variant.getVariantId() );
        variantDTO.variantName( variant.getVariantName() );
        variantDTO.variantPrice( variant.getVariantPrice() );
        variantDTO.variantStock( variant.getVariantStock() );
        variantDTO.variantColors( variantColorSetToVariantColorDTOSet( variant.getVariantColors() ) );

        return variantDTO.build();
    }

    @Override
    public VariantColorDTO toVariantColorDTO(VariantColor variantColor) {
        if ( variantColor == null ) {
            return null;
        }

        VariantColorDTO.VariantColorDTOBuilder variantColorDTO = VariantColorDTO.builder();

        variantColorDTO.colorId( variantColorColorColorId( variantColor ) );
        variantColorDTO.variantColorId( variantColor.getVariantColorId() );
        variantColorDTO.images( bikeImageListToBikeImageDTOList( variantColor.getImages() ) );

        return variantColorDTO.build();
    }

    @Override
    public BikeImageDTO toBikeImageDTO(BikeImage bikeImage) {
        if ( bikeImage == null ) {
            return null;
        }

        BikeImageDTO.BikeImageDTOBuilder bikeImageDTO = BikeImageDTO.builder();

        bikeImageDTO.imageUrl( bikeImage.getImageUrl() );

        return bikeImageDTO.build();
    }

    private String motorbikeCategoryCategoryName(Motorbike motorbike) {
        if ( motorbike == null ) {
            return null;
        }
        Category category = motorbike.getCategory();
        if ( category == null ) {
            return null;
        }
        String categoryName = category.getCategoryName();
        if ( categoryName == null ) {
            return null;
        }
        return categoryName;
    }

    private String motorbikeBrandBrandName(Motorbike motorbike) {
        if ( motorbike == null ) {
            return null;
        }
        Brand brand = motorbike.getBrand();
        if ( brand == null ) {
            return null;
        }
        String brandName = brand.getBrandName();
        if ( brandName == null ) {
            return null;
        }
        return brandName;
    }

    protected Set<VariantDTO> variantSetToVariantDTOSet(Set<Variant> set) {
        if ( set == null ) {
            return null;
        }

        Set<VariantDTO> set1 = new LinkedHashSet<VariantDTO>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( Variant variant : set ) {
            set1.add( toVariantDTO( variant ) );
        }

        return set1;
    }

    protected Set<VariantColorDTO> variantColorSetToVariantColorDTOSet(Set<VariantColor> set) {
        if ( set == null ) {
            return null;
        }

        Set<VariantColorDTO> set1 = new LinkedHashSet<VariantColorDTO>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( VariantColor variantColor : set ) {
            set1.add( toVariantColorDTO( variantColor ) );
        }

        return set1;
    }

    private Integer variantColorColorColorId(VariantColor variantColor) {
        if ( variantColor == null ) {
            return null;
        }
        BikeColor color = variantColor.getColor();
        if ( color == null ) {
            return null;
        }
        Integer colorId = color.getColorId();
        if ( colorId == null ) {
            return null;
        }
        return colorId;
    }

    protected List<BikeImageDTO> bikeImageListToBikeImageDTOList(List<BikeImage> list) {
        if ( list == null ) {
            return null;
        }

        List<BikeImageDTO> list1 = new ArrayList<BikeImageDTO>( list.size() );
        for ( BikeImage bikeImage : list ) {
            list1.add( toBikeImageDTO( bikeImage ) );
        }

        return list1;
    }
}
