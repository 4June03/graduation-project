package backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

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

    private String videoUrl;

    private byte rating;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "basic_spec_id")
    private BasicSpecification basicSpecification;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "engine_and_frame_id")
    private EngineAndFrame engineAndFrame;

    @ManyToOne
    @JoinColumn(name = "brand_id")
    private Brand brand;

    //Quan hệ One-to-Many với Variant
    @OneToMany(mappedBy = "motorbikes")
    private Set<Variant> variants;
}
