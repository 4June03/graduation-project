package backend.service.ServiceImpls;

import backend.entity.BasicSpecification;
import backend.repository.BasicSpecificationRepository;
import backend.service.BasicSpecificationService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class BasicSpecificationServiceImpls implements BasicSpecificationService {

    private BasicSpecificationRepository basicSpecificationRepository;

    @Override
    public List<BasicSpecification> findAll() {
        return basicSpecificationRepository.findAll();
    }

    @Override
    public Optional<BasicSpecification> findById(Integer id) {
        return basicSpecificationRepository.findById(id);
    }

    @Override
    public BasicSpecification save(BasicSpecification spec) {
        return basicSpecificationRepository.save(spec);
    }

    @Override
    public BasicSpecification update(BasicSpecification spec) {
        return basicSpecificationRepository.save(spec);
    }

    @Override
    public void deleteById(Integer id) {
        basicSpecificationRepository.deleteById(id);
    }
}
