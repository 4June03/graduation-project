package backend.dto.response;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalDate;

@Getter
@Setter
public class RegisterUserResponse {
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate created_at;
    private Boolean isActive;

}
