package backend.service;

import backend.entity.BasicSpecification;

import java.util.List;
import java.util.Optional;

public interface BasicSpecificationService {
    public List<BasicSpecification> findAll();

    public Optional<BasicSpecification> findById(Integer id);

    public BasicSpecification save(BasicSpecification spec);

    public BasicSpecification update(BasicSpecification spec);

    public void deleteById(Integer id);
}
