package backend.service.ServiceImpls;

import backend.entity.BikeColor;
import backend.entity.BikeImage;
import backend.entity.Variant;
import backend.entity.VariantColor;
import backend.repository.BikeImageRepository;
import backend.repository.VariantColorRepository;
import backend.service.VariantColorService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class VariantColorServiceImpls implements VariantColorService {

    private VariantColorRepository variantColorRepository;
    private BikeImageRepository bikeImageRepository;

    @Override
    public List<VariantColor> getAll() {
        return variantColorRepository.findAll();
    }

    @Override
    public VariantColor createVariantColor(Variant variant, BikeColor color, List<BikeImage> bikeImages) {
        VariantColor variantColor = VariantColor.builder()
                .variant(variant)
                .color(color)
                .images(bikeImages)
                .build();

        // Thiết lập mối quan hệ ngược cho images
        for (BikeImage image : bikeImages) {
            image.setVariantColor(variantColor);
        }

        return variantColorRepository.save(variantColor);
    }

    @Override
    public Optional<VariantColor> getVariantColorById(Integer id) {
        return variantColorRepository.findById(id);
    }

    @Override
    public VariantColor updateVariantColor(Integer id,Variant variant, BikeColor color, List<BikeImage> bikeImages) {
        VariantColor existingVariantColor = variantColorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("VariantColor not found"));

        existingVariantColor.setVariant(variant);
        existingVariantColor.setColor(color);

        // Cập nhật danh sách ảnh
        existingVariantColor.getImages().clear();
        for (BikeImage image : bikeImages) {
            image.setVariantColor(existingVariantColor);
            existingVariantColor.getImages().add(image);
        }

        return variantColorRepository.save(existingVariantColor);
    }

    @Override
    public void deleteVariantColor(Integer id) {
        VariantColor variantColor = variantColorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("VariantColor not found"));

        // Xóa các ảnh liên quan (nếu cần)
        for (BikeImage image : variantColor.getImages()) {
            bikeImageRepository.delete(image);
        }

        variantColorRepository.delete(variantColor);
    }
}
