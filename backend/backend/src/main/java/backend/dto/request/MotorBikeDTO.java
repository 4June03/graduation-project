package backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MotorBikeDTO {

    private Integer bikeId;

    private String bikeName;

    private String description;

    private String videoUrl;

    private Integer categoryId;

    private Integer brandId;

    private BasicSpecificationDTO basicSpecification;

    private EngineAndFrameDTO engineAndFrame;

    private Set<VariantDTO> variants;

}
