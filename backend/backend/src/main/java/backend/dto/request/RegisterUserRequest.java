package backend.dto.request;

import backend.entity.Address;
import backend.entity.Role;
import jakarta.persistence.*;
import lombok.Data;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Set;

@Data
public class RegisterUserRequest {
    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String phone;

    private LocalDate dob;



}
