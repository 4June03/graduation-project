package backend.service;

import backend.entity.BikeImage;

import java.util.List;
import java.util.Optional;

public interface BikeImageService {
    public List<BikeImage> findAll();

    public Optional<BikeImage> findById(Integer id);

    public BikeImage save(BikeImage bikeImage);

    public BikeImage update(BikeImage bikeImage) ;

    public void deleteById(Integer id) ;
}
