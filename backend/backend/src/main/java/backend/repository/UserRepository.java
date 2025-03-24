package backend.repository;

import backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // Các truy vấn tùy chỉnh nếu cần
    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
}