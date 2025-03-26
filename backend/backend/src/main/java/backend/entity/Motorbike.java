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
public class Motorbike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bikeId;

    private String bikeName;

    private String description;

    private Double price;

    private Integer stock;

    private String videoUrl;

    private byte rating;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "basic_spec_id")
    private BasicSpecification basicSpecification;

}
