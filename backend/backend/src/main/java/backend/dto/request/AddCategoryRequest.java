package backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddCategoryRequest {
    private String categoryName;
    private String description;
}
