package backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class BasicSpecification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer specificationId;

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

    @OneToOne(mappedBy = "basicSpecification")
    @JsonIgnore
    private Motorbike motorbike;

}
