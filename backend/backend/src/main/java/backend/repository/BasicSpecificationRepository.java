package backend.repository;

import backend.entity.BasicSpecification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasicSpecificationRepository extends JpaRepository<BasicSpecification, Integer> {
}