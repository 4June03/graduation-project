package backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class BikeColor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer colorId;

    private String colorName;

    @ManyToOne
    @JoinColumn(name = "bike_id")
    private Motorbike motorbike;

    @OneToMany(mappedBy = "color", cascade = CascadeType.ALL)
    private List<BikeImage> bikeImageList;
}
