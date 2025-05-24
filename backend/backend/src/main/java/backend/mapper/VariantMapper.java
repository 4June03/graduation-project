package backend.mapper;

import backend.dto.request.VariantDTO;
import backend.entity.Variant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")

public interface VariantMapper {

    @Mapping(source = "variantId",target = "variantId")
    Variant DTOtoVariant(VariantDTO dto);
}
