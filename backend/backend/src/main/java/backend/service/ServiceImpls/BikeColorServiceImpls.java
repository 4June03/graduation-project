package backend.service.ServiceImpls;

import backend.entity.BikeColor;
import backend.repository.BikeColorRepository;
import backend.service.BikeColorService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class BikeColorServiceImpls implements BikeColorService {

    private BikeColorRepository repository;

    @Override
    public List<BikeColor> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<BikeColor> findById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public BikeColor save(BikeColor bikeColor) {
        Boolean isExits = repository.existsByColorName(bikeColor.getColorName());

        if(isExits) throw new RuntimeException("Màu này đã có trong Database");

        return repository.save(bikeColor);
    }

    @Override
    public BikeColor update(BikeColor bikeColor) {
        return repository.save(bikeColor);
    }

    @Override
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }


}
