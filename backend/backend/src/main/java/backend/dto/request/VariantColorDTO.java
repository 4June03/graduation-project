package backend.dto.request;

import lombok.*;

import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class VariantColorDTO {

    private Integer variantColorId;

    private Integer colorId;
    // Danh sách ảnh của màu này
    private List<BikeImageDTO> images;
}
