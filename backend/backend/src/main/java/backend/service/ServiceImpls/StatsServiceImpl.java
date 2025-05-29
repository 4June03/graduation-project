package backend.service.ServiceImpls;

import backend.entity.Variant;
import backend.repository.StatsRepository;
import backend.repository.VariantRepository;
import backend.service.StatsService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class StatsServiceImpl implements StatsService {
    private StatsRepository statsRepo;
    private VariantRepository variantRepo;


    @Override
    public List<Map<String, Object>> getTopSelling(int limit) {
        var raw = statsRepo.findTopSelling();
        List<Map<String,Object>> res = new ArrayList<>();
        for (int i = 0; i < Math.min(limit, raw.size()); i++) {
            Object[] row = raw.get(i);
            res.add(Map.of(
                    "bikeId", row[0],
                    "bikeName", row[1],
                    "revenue",    row[2],
                    "totalSold",  row[3]
            ));
        }
        return res;
    }

    @Override
    public Double getTotalRevenue() {
        return statsRepo.findTotalRevenue();
    }

    @Override
    public List<Map<String, Object>> getRevenueByMonth() {
        var raw = statsRepo.findRevenueByMonth();
        List<Map<String,Object>> res = new ArrayList<>();
        for (Object[] row : raw) {
            res.add(Map.of(
                    "year",  row[0],
                    "month", row[1],
                    "revenue", row[2]
            ));
        }
        return res;
    }

    @Override
    public List<Map<String, Object>> getRevenueByBrand() {
        var raw = statsRepo.findRevenueByBrand();
        List<Map<String,Object>> res = new ArrayList<>();
        for (Object[] row : raw) {
            res.add(Map.of(
                    "brandId",   row[0],
                    "brandName", row[1],
                    "revenue",   row[2]
            ));
        }
        return res;
    }

    @Override
    public Long getTotalBikesSold() {
        return statsRepo.findTotalBikesSold();
    }

    @Override
    public Long getTotalCustomers() {
        return statsRepo.findTotalCustomers();
    }

    @Override
    public List<Map<String, Object>> getInventoryStatus() {
        List<Map<String, Object>> res = new ArrayList<>();
        for (Variant v : variantRepo.findAll()) {
            res.add(Map.of(
                    "variantId",    v.getVariantId(),
                    "variantName",  v.getVariantName(),
                    "stockQuantity", v.getVariantStock()
            ));
        }
        return res;
    }
}
