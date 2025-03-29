package backend.dto.response;

import backend.entity.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MotorBikeResponse {
    private String bikeName;

    private String description;

    private Double price;

    private String videoUrl;

    private Category category;

    private Brand brand;

    private BasicSpecification basicSpecification;

    private EngineAndFrame engineAndFrame;


}
