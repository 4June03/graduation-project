package backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;


@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BikeImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer imageId;

    @Column(name = "image_url", columnDefinition = "LONGTEXT", nullable = false)
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "variant_color_id")
    private VariantColor variantColor;

}
