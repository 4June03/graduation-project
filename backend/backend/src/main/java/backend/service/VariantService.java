package backend.service;

import backend.entity.Variant;

import java.util.List;
import java.util.Optional;

public interface VariantService {
    public List<Variant> findAll();
    public Optional<Variant> findById(Integer id);
    public Variant save(Variant version);

    public Variant update(Variant version);

    public void deleteById(Integer id);
}
