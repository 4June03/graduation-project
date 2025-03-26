package backend.service.ServiceImpls;

import backend.entity.EngineAndFrame;
import backend.repository.EngineAndFrameRepository;
import backend.service.EngineAndFrameService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class EngineAndFrameServiceImpls implements EngineAndFrameService {

    private EngineAndFrameRepository repository;

    @Override
    public List<EngineAndFrame> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<EngineAndFrame> findById(Integer id) {
        return repository.findById(id);
    }

    @Override
    public EngineAndFrame save(EngineAndFrame engineAndFrame) {
        return repository.save(engineAndFrame);
    }

    @Override
    public EngineAndFrame update(EngineAndFrame engineAndFrame) {
        return repository.save(engineAndFrame);
    }

    @Override
    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}
