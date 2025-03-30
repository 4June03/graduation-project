package backend.service;

import backend.dto.request.AddMotorBikeRequest;
import backend.dto.request.MotorBikeDTO;
import backend.entity.Motorbike;

import java.util.List;
import java.util.Optional;

public interface MotorBikeService {

    public List<Motorbike> findAll();
    public Optional<Motorbike> findById(Integer id);
    public Motorbike createNewMotorBike(MotorBikeDTO request);

    public Motorbike updateMotorBike(Motorbike motorbike);

    public void deleteById(Integer id);
}
