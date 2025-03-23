package backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String addressDetail;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
