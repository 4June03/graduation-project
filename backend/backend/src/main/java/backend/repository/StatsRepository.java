package backend.repository;

import backend.entity.Motorbike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatsRepository extends JpaRepository<Motorbike, Integer> {

    // Top N xe bán chạy nhất (theo số lượng bán)
    @Query("SELECT m.bikeId AS id, m.bikeName AS name, SUM(oi.price) AS totalRevenue, SUM(1) AS totalSold " +
            "FROM OrderItem oi " +
            "JOIN oi.motorbike m " +
            "JOIN oi.order o " +
            "WHERE o.paymentStatus = backend.enums.PaymentStatus.PAID " +
            "GROUP BY m.bikeId, m.bikeName " +
            "ORDER BY totalSold DESC")
    List<Object[]> findTopSelling();

    // Tổng doanh thu
    @Query("SELECT SUM(o.subtotal) FROM Order o " +
            "WHERE o.paymentStatus = backend.enums.PaymentStatus.PAID")
    Double findTotalRevenue();

    // Doanh thu theo tháng
    @Query("SELECT FUNCTION('YEAR', o.orderDate) AS year, FUNCTION('MONTH', o.orderDate) AS month, SUM(o.subtotal) " +
            "FROM Order o " +
            "WHERE o.paymentStatus = backend.enums.PaymentStatus.PAID " +
            "GROUP BY FUNCTION('YEAR', o.orderDate), FUNCTION('MONTH', o.orderDate) " +
            "ORDER BY FUNCTION('YEAR', o.orderDate), FUNCTION('MONTH', o.orderDate)")
    List<Object[]> findRevenueByMonth();

    // Doanh thu theo hãng
    @Query("SELECT b.brandId, b.brandName, SUM(oi.price) " +
            "FROM OrderItem oi " +
            "JOIN oi.motorbike m " +
            "JOIN m.brand b " +
            "JOIN oi.order o " +
            "WHERE o.paymentStatus = backend.enums.PaymentStatus.PAID " +
            "GROUP BY b.brandId, b.brandName " +
            "ORDER BY SUM(oi.price) DESC")
    List<Object[]> findRevenueByBrand();

    // Tổng số xe đã bán
    @Query("SELECT SUM(1) FROM OrderItem oi " +
            "JOIN oi.order o " +
            "WHERE o.paymentStatus = backend.enums.PaymentStatus.PAID")
    Long findTotalBikesSold();

    // Tổng số lượng khách hàng đã mua (distinct user)
    @Query("SELECT COUNT(DISTINCT o.user.userId) FROM Order o " +
            "WHERE o.paymentStatus = backend.enums.PaymentStatus.PAID")
    Long findTotalCustomers();
}
