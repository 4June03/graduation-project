package backend.service.ServiceImpls;

import backend.entity.Brand;
import backend.repository.BrandRepository;
import backend.service.BrandService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class BrandServiceImpls implements BrandService {
    private BrandRepository brandRepository;

    @Override
    public List<Brand> findAll() {
        return brandRepository.findAll();
    }

    @Override
    public Optional<Brand> findById(Integer id) {
        return brandRepository.findById(id);
    }

    @Override
    public Brand save(Brand brand) {
        return brandRepository.save(brand);
    }

    @Override
    public Brand update(Brand version) {
        return null;
    }

    @Override
    public void deleteById(Integer id) {
        brandRepository.deleteById(id);
    }
}
