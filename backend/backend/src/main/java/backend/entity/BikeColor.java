package backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;
import java.util.stream.Collectors;

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

    @OneToMany(mappedBy = "color", cascade = CascadeType.ALL)
    private Set<VariantColor> variantColors;

    // Phương thức tiện ích để lấy danh sách variant (nếu cần)
    public Set<Variant> getVariants() {
        return variantColors.stream()
                .map(VariantColor::getVariant)
                .collect(Collectors.toSet());
    }

}
