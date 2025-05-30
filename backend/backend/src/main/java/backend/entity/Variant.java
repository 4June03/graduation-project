package backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Variant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer variantId;

    private String variantName;

    private Double variantPrice;

    private Integer variantStock;

    //QH many to many với bike
    @ManyToOne
    @JoinColumn(name = "motorbike_id")
    private Motorbike motorbikes;


    @OneToMany(mappedBy = "variant",cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<VariantColor> variantColors;

    // Phương thức tiện ích để lấy danh sách màu (nếu cần giữ tính tiện lợi)
    public Set<BikeColor> getColors() {
        return variantColors.stream()
                .map(VariantColor::getColor)
                .collect(Collectors.toSet());
    }

}
