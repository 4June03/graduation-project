package backend.mapper;

import backend.dto.request.BikeImageDTO;
import backend.dto.request.VariantColorDTO;
import backend.dto.request.VariantDTO;
import backend.entity.BikeImage;
import backend.entity.Variant;
import backend.entity.VariantColor;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-25T00:34:39+0700",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.1 (Oracle Corporation)"
)
@Component
public class VariantMapperImpl implements VariantMapper {

    @Override
    public Variant DTOtoVariant(VariantDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Variant.VariantBuilder variant = Variant.builder();

        variant.variantId( dto.getVariantId() );
        variant.variantName( dto.getVariantName() );
        variant.variantPrice( dto.getVariantPrice() );
        variant.variantStock( dto.getVariantStock() );
        variant.variantColors( variantColorDTOSetToVariantColorSet( dto.getVariantColors() ) );

        return variant.build();
    }

    protected BikeImage bikeImageDTOToBikeImage(BikeImageDTO bikeImageDTO) {
        if ( bikeImageDTO == null ) {
            return null;
        }

        BikeImage.BikeImageBuilder bikeImage = BikeImage.builder();

        bikeImage.imageUrl( bikeImageDTO.getImageUrl() );

        return bikeImage.build();
    }

    protected List<BikeImage> bikeImageDTOListToBikeImageList(List<BikeImageDTO> list) {
        if ( list == null ) {
            return null;
        }

        List<BikeImage> list1 = new ArrayList<BikeImage>( list.size() );
        for ( BikeImageDTO bikeImageDTO : list ) {
            list1.add( bikeImageDTOToBikeImage( bikeImageDTO ) );
        }

        return list1;
    }

    protected VariantColor variantColorDTOToVariantColor(VariantColorDTO variantColorDTO) {
        if ( variantColorDTO == null ) {
            return null;
        }

        VariantColor.VariantColorBuilder variantColor = VariantColor.builder();

        variantColor.variantColorId( variantColorDTO.getVariantColorId() );
        variantColor.images( bikeImageDTOListToBikeImageList( variantColorDTO.getImages() ) );

        return variantColor.build();
    }

    protected Set<VariantColor> variantColorDTOSetToVariantColorSet(Set<VariantColorDTO> set) {
        if ( set == null ) {
            return null;
        }

        Set<VariantColor> set1 = new LinkedHashSet<VariantColor>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( VariantColorDTO variantColorDTO : set ) {
            set1.add( variantColorDTOToVariantColor( variantColorDTO ) );
        }

        return set1;
    }
}
