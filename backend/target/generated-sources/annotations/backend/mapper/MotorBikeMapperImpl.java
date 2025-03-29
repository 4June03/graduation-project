package backend.mapper;

import backend.dto.request.AddMotorBikeRequest;
import backend.dto.response.MotorBikeResponse;
import backend.entity.Motorbike;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-03-27T23:57:28+0700",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.1 (Oracle Corporation)"
)
@Component
public class MotorBikeMapperImpl implements MotorBikeMapper {

    @Override
    public Motorbike addMotorBikeRequestToMotorBike(AddMotorBikeRequest request) {
        if ( request == null ) {
            return null;
        }

        Motorbike.MotorbikeBuilder motorbike = Motorbike.builder();

        motorbike.bikeName( request.getBikeName() );
        motorbike.description( request.getDescription() );
        motorbike.price( request.getPrice() );
        motorbike.videoUrl( request.getVideoUrl() );
        motorbike.basicSpecification( request.getBasicSpecification() );
        motorbike.engineAndFrame( request.getEngineAndFrame() );

        return motorbike.build();
    }

    @Override
    public MotorBikeResponse motorBikeToMotoBikeResponse(Motorbike motorbike) {
        if ( motorbike == null ) {
            return null;
        }

        MotorBikeResponse motorBikeResponse = new MotorBikeResponse();

        motorBikeResponse.setBikeName( motorbike.getBikeName() );
        motorBikeResponse.setDescription( motorbike.getDescription() );
        motorBikeResponse.setPrice( motorbike.getPrice() );
        motorBikeResponse.setVideoUrl( motorbike.getVideoUrl() );
        motorBikeResponse.setCategory( motorbike.getCategory() );
        motorBikeResponse.setBrand( motorbike.getBrand() );
        motorBikeResponse.setBasicSpecification( motorbike.getBasicSpecification() );
        motorBikeResponse.setEngineAndFrame( motorbike.getEngineAndFrame() );

        return motorBikeResponse;
    }
}
