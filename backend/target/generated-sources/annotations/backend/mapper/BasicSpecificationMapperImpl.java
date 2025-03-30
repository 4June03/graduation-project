package backend.mapper;

import backend.dto.request.BasicSpecificationDTO;
import backend.entity.BasicSpecification;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-03-30T17:16:33+0700",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.1 (Oracle Corporation)"
)
@Component
public class BasicSpecificationMapperImpl implements BasicSpecificationMapper {

    @Override
    public BasicSpecification DTOtoBasicSpecification(BasicSpecificationDTO dto) {
        if ( dto == null ) {
            return null;
        }

        BasicSpecification.BasicSpecificationBuilder basicSpecification = BasicSpecification.builder();

        basicSpecification.weight( dto.getWeight() );
        basicSpecification.length( dto.getLength() );
        basicSpecification.width( dto.getWidth() );
        basicSpecification.height( dto.getHeight() );
        basicSpecification.wheelbase( dto.getWheelbase() );
        basicSpecification.seatHeight( dto.getSeatHeight() );
        basicSpecification.groundClearance( dto.getGroundClearance() );
        basicSpecification.fuelTankCapacity( dto.getFuelTankCapacity() );
        basicSpecification.frontTireSize( dto.getFrontTireSize() );
        basicSpecification.rearTireSize( dto.getRearTireSize() );

        return basicSpecification.build();
    }
}
