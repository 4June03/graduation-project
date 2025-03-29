package backend.service.ServiceImpls;

import backend.entity.Variant;
import backend.service.VariantService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VariantServiceImpls implements VariantService {
    @Override
    public List<Variant> findAll() {
        return List.of();
    }

    @Override
    public Optional<Variant> findById(Integer id) {
        return Optional.empty();
    }

    @Override
    public Variant save(Variant version) {
        return null;
    }

    @Override
    public Variant update(Variant version) {
        return null;
    }

    @Override
    public void deleteById(Integer id) {

    }
}
