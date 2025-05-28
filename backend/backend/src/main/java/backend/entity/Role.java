package backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
@Entity
@Getter
@Setter
@NoArgsConstructor

public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String name;
    private String description;

    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private Set<User> users = new HashSet<>();


    public Role(String admin, String hehe) {
        this.name = admin;
        this.description = hehe;
    }
}
