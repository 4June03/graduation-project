package backend.service.ServiceImpls;

import backend.entity.BikeImage;
import backend.repository.BikeImageRepository;
import backend.service.BikeImageService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class BikeImageImpls implements BikeImageService {

    private BikeImageRepository repository;

    @Override
    public List<BikeImage> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<BikeImage> findById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public BikeImage save(BikeImage bikeImage) {
        return repository.save(bikeImage);
    }

    @Override
    public BikeImage update(BikeImage bikeImage) {
        return repository.save(bikeImage);
    }

    @Override
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}
