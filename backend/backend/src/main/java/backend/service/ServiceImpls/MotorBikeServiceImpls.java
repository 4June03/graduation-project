package backend.service.ServiceImpls;

import backend.entity.Motorbike;
import backend.repository.MotorBikeRepository;
import backend.service.MotorBikeService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class MotorBikeServiceImpls implements MotorBikeService {

    private MotorBikeRepository repository;

    @Override
    public List<Motorbike> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Motorbike> findById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public Motorbike save(Motorbike motorbike) {
        return repository.save(motorbike);
    }

    @Override
    public Motorbike update(Motorbike motorbike) {
        return repository.save(motorbike);
    }

    @Override
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}
