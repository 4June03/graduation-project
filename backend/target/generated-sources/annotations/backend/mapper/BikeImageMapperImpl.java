package backend.mapper;

import backend.dto.request.BikeImageDTO;
import backend.entity.BikeImage;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-23T14:17:54+0700",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.1 (Oracle Corporation)"
)
@Component
public class BikeImageMapperImpl implements BikeImageMapper {

    @Override
    public BikeImage DTOtoBikeImage(BikeImageDTO dto) {
        if ( dto == null ) {
            return null;
        }

        BikeImage.BikeImageBuilder bikeImage = BikeImage.builder();

        bikeImage.imageUrl( dto.getImageUrl() );

        return bikeImage.build();
    }
}
