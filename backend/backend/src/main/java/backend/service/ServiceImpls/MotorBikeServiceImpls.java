package backend.service.ServiceImpls;

import backend.dto.request.AddMotorBikeRequest;
import backend.entity.Brand;
import backend.entity.Category;
import backend.entity.Motorbike;
import backend.mapper.MotorBikeMapper;
import backend.repository.BrandRepository;
import backend.repository.CategoryRepository;
import backend.repository.MotorBikeRepository;
import backend.repository.VariantRepository;
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

    private MotorBikeRepository motorBikeRepository;
    private VariantRepository variantRepository;
    private CategoryRepository categoryRepository;
    private MotorBikeMapper motorBikeMapper;
    private BrandRepository brandRepository;

    @Override
    public List<Motorbike> findAll() {
        return motorBikeRepository.findAll();
    }

    @Override
    public Optional<Motorbike> findById(Integer id) {
        return motorBikeRepository.findById(id);
    }

    @Override
    public Motorbike save(AddMotorBikeRequest request) {

        Brand brand = brandRepository.findById(request.getBrandId())
                .orElseThrow(()->new RuntimeException("Không tồn tại thương hiệu này"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(()->new RuntimeException("Không tồn tại phiên bản này"));


        Motorbike motorbike = motorBikeMapper.addMotorBikeRequestToMotorBike(request);



        return motorBikeRepository.save(motorbike);
    }

    @Override
    public Motorbike update(Motorbike motorbike) {
        return motorBikeRepository.save(motorbike);
    }

    @Override
    public void deleteById(Integer id) {
        motorBikeRepository.deleteById(id);
    }
}
