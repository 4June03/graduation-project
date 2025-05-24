package backend.dto.request;

import backend.entity.Motorbike;
import backend.entity.VariantColor;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.*;

import java.util.Set;



@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class VariantDTO {

    private Integer variantId;

    private String variantName;

    private Double variantPrice;

    private Integer variantStock;

    private Set<VariantColorDTO> variantColors;
}
