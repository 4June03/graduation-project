package backend.service;

import backend.entity.BikeColor;
import backend.entity.BikeImage;
import backend.entity.Variant;
import backend.entity.VariantColor;

import java.awt.*;
import java.util.List;
import java.util.Optional;

public interface VariantColorService {

    public List<VariantColor> getAll();

    public VariantColor createVariantColor(Variant variant, BikeColor color, List<BikeImage> bikeImages);

    public Optional<VariantColor> getVariantColorById(Integer id);

    public VariantColor updateVariantColor(Integer id, Variant variant, BikeColor color, List<BikeImage> bikeImages);

    public void deleteVariantColor(Integer id);
}
