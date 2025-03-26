package backend.service;

import backend.entity.BikeColor;

import java.util.List;
import java.util.Optional;

public interface BikeColorService {
    public List<BikeColor> findAll();

    public Optional<BikeColor> findById(Integer id);

    public BikeColor save(BikeColor bikeColor);

    public BikeColor update(BikeColor bikeColor);

    public void deleteById(Integer id);
}
