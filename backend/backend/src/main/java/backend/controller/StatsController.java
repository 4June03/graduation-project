package backend.controller;


import backend.dto.response.MotorbikeCardResponse;
import backend.service.StatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class StatsController {
    private final StatsService statsService;


    @GetMapping("/top-selling")
    public List<Map<String, Object>> topSelling(@RequestParam(defaultValue = "5") int limit) {
        return statsService.getTopSelling(limit);
    }

    // API trả về DTO MotorbikeCardResponse
    @GetMapping("/top-selling-cards")
    public List<MotorbikeCardResponse> topSellingCards(
            @RequestParam(defaultValue = "5") int limit) {
        return statsService.getTopSellingCards(limit);
    }

    @GetMapping("/total-revenue")
    public Double totalRevenue() {
        return statsService.getTotalRevenue();
    }

    @GetMapping("/revenue-by-month")
    public List<Map<String, Object>> revenueByMonth() {
        return statsService.getRevenueByMonth();
    }

    @GetMapping("/revenue-by-brand")
    public List<Map<String, Object>> revenueByBrand() {
        return statsService.getRevenueByBrand();
    }

    @GetMapping("/total-bikes-sold")
    public Long totalBikesSold() {
        return statsService.getTotalBikesSold();
    }

    @GetMapping("/total-customers")
    public Long totalCustomers() {
        return statsService.getTotalCustomers();
    }

    @GetMapping("/inventory")
    public List<Map<String, Object>> inventoryStatus() {
        return statsService.getInventoryStatus();
    }

}
