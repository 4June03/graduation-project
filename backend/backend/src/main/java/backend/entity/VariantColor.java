package backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "variant_color")
public class VariantColor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer variantColorId;

    @ManyToOne
    @JoinColumn(name = "variant_id")
    private Variant variant;

    @ManyToOne
    @JoinColumn(name = "color_id")
    private BikeColor color;

    @OneToMany(mappedBy = "variantColor",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BikeImage> images;

}
