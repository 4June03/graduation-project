package backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BasicSpecificationDTO {
    private Double weight;
    private Double length;
    private Double width;
    private Double height;
    private Double wheelbase;
    private Double seatHeight;
    private Double groundClearance;
    private Double fuelTankCapacity;
    private Double frontTireSize;
    private Double rearTireSize;
}
