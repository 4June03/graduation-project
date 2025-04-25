package backend.dto.response;

import backend.entity.Address;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Set;

@Getter
@Setter
public class UserResponse {
    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String avatar;

    private LocalDate dob;

    private LocalDate createdAt;

    private LocalDate updatedAt;

    private Boolean isActive;

    private Set<Address> addresses;
}
