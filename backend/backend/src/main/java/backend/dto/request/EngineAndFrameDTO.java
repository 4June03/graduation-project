package backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EngineAndFrameDTO {
    private String frontSuspension;
    private String rearSuspension;
    private String engineType;
    private Double maximumPower;
    private Double displacement;
    private Double bore;
    private Double stroke;
    private Double compressionRatio;
}
