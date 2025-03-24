package backend.dto.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;
import java.time.LocalDate;

@Getter
@Setter
@ToString
public class RegisterUserResponse {
    private String firstName;
    private String lastName;
    private String email;
    private LocalDate createdAt;
    private Boolean isActive;

}
