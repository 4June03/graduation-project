package backend.mapper;

import backend.dto.request.BikeImageDTO;
import backend.entity.BikeImage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BikeImageMapper {
    BikeImage DTOtoBikeImage(BikeImageDTO dto);
}
