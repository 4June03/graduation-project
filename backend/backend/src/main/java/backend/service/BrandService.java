package backend.service;

import backend.entity.Brand;

import java.util.List;
import java.util.Optional;

public interface BrandService {
    public List<Brand> findAll();
    public Optional<Brand> findById(Integer id);
    public Brand save(Brand brand);

    public Brand update(Brand version);

    public void deleteById(Integer id);
}
