package backend.repository;

import backend.entity.EngineAndFrame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EngineAndFrameRepository extends JpaRepository<EngineAndFrame, Integer> {
}