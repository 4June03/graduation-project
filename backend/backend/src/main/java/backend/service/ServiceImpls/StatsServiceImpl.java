package backend.service.ServiceImpls;

import backend.dto.response.MotorbikeCardResponse;
import backend.entity.Motorbike;
import backend.entity.Variant;
import backend.repository.MotorBikeRepository;
import backend.repository.StatsRepository;
import backend.repository.VariantRepository;
import backend.service.StatsService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;
import java.util.function.Function;


@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true)
public class StatsServiceImpl implements StatsService {
    private StatsRepository statsRepo;
    private VariantRepository variantRepo;
    private MotorBikeRepository motorBikeRepository;

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

    @Override
    public List<MotorbikeCardResponse> getTopSellingCards(int limit) {
        // 1) Lấy raw kết quả [bikeId, bikeName, revenue, totalSold]
        List<Object[]> raw = statsRepo.findTopSelling();

        // 2) Lấy bikeId top N
        List<Integer> topIds = raw.stream()
                .limit(limit)
                .map(row -> (Integer) row[0])
                .collect(Collectors.toList());

        if (topIds.isEmpty()) {
            return Collections.emptyList();
        }

        // 3) Fetch tất cả Motorbike entities theo danh sách ID
        List<Motorbike> bikes = motorBikeRepository.findAllById(topIds);

        // 4) Map theo ID để giữ thứ tự
        Map<Integer, Motorbike> bikeMap = bikes.stream()
                .collect(Collectors.toMap(Motorbike::getBikeId, Function.identity()));

        // 5) Chuyển về DTO giữ nguyên thứ tự topIds
        return topIds.stream()
                .map(bikeMap::get)
                .filter(Objects::nonNull)
                .map(MotorbikeCardResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
