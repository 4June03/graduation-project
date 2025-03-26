package backend.repository;

import backend.entity.BikeColor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BikeColorRepository extends JpaRepository<BikeColor, Integer> {
    public Boolean existsByColorName(String colorName);
}