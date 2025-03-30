package backend.mapper;

import backend.dto.request.EngineAndFrameDTO;
import backend.entity.EngineAndFrame;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-03-30T17:16:33+0700",
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
}
