package backend.service;

import backend.entity.Motorbike;

import java.util.List;
import java.util.Optional;

public interface MotorBikeService {

    public List<Motorbike> findAll();
    public Optional<Motorbike> findById(Integer id);
    public Motorbike save(Motorbike motorbike);

    public Motorbike update(Motorbike motorbike);

    public void deleteById(Integer id);
}
