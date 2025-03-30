package backend.mapper;

import backend.dto.request.VariantDTO;
import backend.entity.Variant;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface VariantMapper {
    Variant DTOtoVariant(VariantDTO dto);
}
