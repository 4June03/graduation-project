package backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class BikeColor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer colorId;

    private String colorName;

    @OneToMany(mappedBy = "color", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<VariantColor> variantColors;



}
