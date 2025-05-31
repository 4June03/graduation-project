package backend.mapper;

import backend.dto.request.EngineAndFrameDTO;
import backend.entity.EngineAndFrame;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-05-31T22:27:23+0700",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.1 (Oracle Corporation)"
)
@Component
public class EngineAndFrameMapperImpl implements EngineAndFrameMapper {

    @Override
    public EngineAndFrame DTOtoEngineAndFrame(EngineAndFrameDTO dto) {
        if ( dto == null ) {
            return null;
        }

        EngineAndFrame.EngineAndFrameBuilder engineAndFrame = EngineAndFrame.builder();

        engineAndFrame.frontSuspension( dto.getFrontSuspension() );
        engineAndFrame.rearSuspension( dto.getRearSuspension() );
        engineAndFrame.engineType( dto.getEngineType() );
        engineAndFrame.maximumPower( dto.getMaximumPower() );
        engineAndFrame.displacement( dto.getDisplacement() );
        engineAndFrame.bore( dto.getBore() );
        engineAndFrame.stroke( dto.getStroke() );
        engineAndFrame.compressionRatio( dto.getCompressionRatio() );

        return engineAndFrame.build();
    }

    @Override
    public EngineAndFrameDTO engineAndFrameToDTO(EngineAndFrame engineAndFrame) {
        if ( engineAndFrame == null ) {
            return null;
        }

        EngineAndFrameDTO.EngineAndFrameDTOBuilder engineAndFrameDTO = EngineAndFrameDTO.builder();

        engineAndFrameDTO.frontSuspension( engineAndFrame.getFrontSuspension() );
        engineAndFrameDTO.rearSuspension( engineAndFrame.getRearSuspension() );
        engineAndFrameDTO.engineType( engineAndFrame.getEngineType() );
        engineAndFrameDTO.maximumPower( engineAndFrame.getMaximumPower() );
        engineAndFrameDTO.displacement( engineAndFrame.getDisplacement() );
        engineAndFrameDTO.bore( engineAndFrame.getBore() );
        engineAndFrameDTO.stroke( engineAndFrame.getStroke() );
        engineAndFrameDTO.compressionRatio( engineAndFrame.getCompressionRatio() );

        return engineAndFrameDTO.build();
    }
}
