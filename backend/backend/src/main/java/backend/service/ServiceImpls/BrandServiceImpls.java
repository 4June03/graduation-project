package backend.service.ServiceImpls;

import backend.entity.Brand;
import backend.service.BrandService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandServiceImpls implements BrandService {
    @Override
    public List<Brand> findAll() {
        return List.of();
    }

    @Override
    public Optional<Brand> findById(Integer id) {
        return Optional.empty();
    }

    @Override
    public Brand save(Brand brand) {
        return null;
    }

    @Override
    public Brand update(Brand version) {
        return null;
    }

    @Override
    public void deleteById(Integer id) {

    }
}
