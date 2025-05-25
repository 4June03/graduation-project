package backend.repository;

import backend.entity.Motorbike;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MotorBikeRepository extends JpaRepository<Motorbike, Integer> {

    Page<Motorbike> findByCategoryCategoryId(Integer categoryId, Pageable pageable);

    Page<Motorbike> findByBikeNameContainingIgnoreCase(String bikeName, Pageable pageable);
}
