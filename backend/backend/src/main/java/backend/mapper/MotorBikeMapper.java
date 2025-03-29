package backend.mapper;

import backend.dto.request.AddMotorBikeRequest;
import backend.dto.response.MotorBikeResponse;
import backend.entity.Motorbike;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MotorBikeMapper {

    public Motorbike addMotorBikeRequestToMotorBike(AddMotorBikeRequest request);
    public MotorBikeResponse motorBikeToMotoBikeResponse(Motorbike motorbike);

}
