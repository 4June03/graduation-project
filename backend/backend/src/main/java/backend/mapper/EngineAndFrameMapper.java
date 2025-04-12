package backend.mapper;

import backend.dto.request.EngineAndFrameDTO;
import backend.entity.EngineAndFrame;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EngineAndFrameMapper {
    EngineAndFrame DTOtoEngineAndFrame(EngineAndFrameDTO dto);
    EngineAndFrameDTO engineAndFrameToDTO(EngineAndFrame engineAndFrame);
}
