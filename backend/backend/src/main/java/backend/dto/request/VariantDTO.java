package backend.dto.request;

import backend.entity.Motorbike;
import backend.entity.VariantColor;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VariantDTO {
    private String variantName;

    private Double variantPrice;

    private Integer variantStock;

    private Set<VariantColorDTO> variantColors;
}
