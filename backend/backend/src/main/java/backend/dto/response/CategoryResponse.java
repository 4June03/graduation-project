package backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;


@Getter
@Setter
public class CategoryResponse {

    private Integer categoryId;

    private String categoryName;

    private String description;

    private LocalDate createdAt;
}
