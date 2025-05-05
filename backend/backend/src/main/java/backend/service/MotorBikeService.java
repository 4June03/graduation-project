package backend.service;

import backend.dto.request.AddMotorBikeRequest;
import backend.dto.request.MotorBikeDTO;
import backend.entity.Motorbike;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface MotorBikeService {

    public Page<Motorbike> findAll(Pageable pageable);
    public Optional<Motorbike> findById(Integer id);
    public Motorbike createNewMotorBike(MotorBikeDTO request);

    public Motorbike updateMotorBike(Motorbike motorbike);

    public void deleteById(Integer id);
}
