package backend.dto.request;

import backend.entity.BasicSpecification;
import backend.entity.EngineAndFrame;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddMotorBikeRequest {
    private String bikeName;

    private String description;

    private Double price;

    private String videoUrl;

    private Integer categoryId;

    private Integer brandId;

    private BasicSpecification basicSpecification;

    private EngineAndFrame engineAndFrame;

}
