package backend.service;

import backend.dto.response.MotorbikeCardResponse;

import java.util.List;
import java.util.Map;

public interface StatsService {
    List<Map<String, Object>> getTopSelling(int limit);
    Double getTotalRevenue();
    List<Map<String, Object>> getRevenueByMonth();
    List<Map<String, Object>> getRevenueByBrand();
    Long getTotalBikesSold();
    Long getTotalCustomers();
    List<Map<String, Object>> getInventoryStatus();

    List<MotorbikeCardResponse> getTopSellingCards(int limit);
}
