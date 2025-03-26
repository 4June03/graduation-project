package backend.repository;

import backend.entity.Motorbike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MotorBikeRepository extends JpaRepository<Motorbike, Integer> {
}
