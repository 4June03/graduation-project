package backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class EngineAndFrame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer engine_and_spec_id;
    private String frontSuspension;
    private String rearSuspension;
    private String engineType;
    private Double maximumPower;
    private Double displacement;
    private Double bore;
    private Double stroke;
    private Double compressionRatio;

    @OneToOne(mappedBy = "engineAndFrame")
    private Motorbike motorbike;

}
