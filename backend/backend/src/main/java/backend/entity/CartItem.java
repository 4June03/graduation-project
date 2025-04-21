package backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "cart_item")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cartItemId;

    @ManyToOne
    @JoinColumn(name = "cart_cart_id")
    private Cart cart;

    @ManyToOne
    @JoinColumn(name = "motorbike_id", nullable = false)
    private Motorbike motorbike;

    @ManyToOne
    @JoinColumn(name = "variant_id", nullable = false)
    private Variant variant;

    @ManyToOne
    @JoinColumn(name = "variant_color_id", nullable = false)
    private VariantColor variantColor;

}