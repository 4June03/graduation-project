package backend.repository;

import backend.entity.BikeImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BikeImageRepository extends JpaRepository<BikeImage, Integer> {
}