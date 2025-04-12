package backend.dto.response;

import backend.dto.request.BasicSpecificationDTO;
import backend.dto.request.EngineAndFrameDTO;
import backend.dto.request.VariantDTO;
import backend.entity.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;


@Getter
@Setter
public class MotorBikeResponse {
    private String bikeName;

    private String description;

    private String videoUrl;

    private String categoryName;

    private String brandName;

    private byte rating;

    private BasicSpecificationDTO basicSpecification;

    private EngineAndFrameDTO engineAndFrame;

    private Set<VariantDTO> variants;

}
