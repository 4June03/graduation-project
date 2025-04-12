package backend.mapper;

import backend.dto.request.BasicSpecificationDTO;
import backend.entity.BasicSpecification;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BasicSpecificationMapper {

    BasicSpecification DTOtoBasicSpecification(BasicSpecificationDTO dto);

    BasicSpecificationDTO basicSpecificationToDTO(BasicSpecification basicSpecification);
}
