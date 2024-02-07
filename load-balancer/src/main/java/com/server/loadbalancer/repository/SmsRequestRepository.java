package com.server.loadbalancer.repository;

import com.server.loadbalancer.dto.NoOfRequestDto;
import com.server.loadbalancer.model.SmsRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface SmsRequestRepository extends JpaRepository<SmsRequest, Long> {
    @Query(
            "SELECT s FROM SmsRequest s " +
                    "WHERE s.createdAt BETWEEN :startOfDay AND :endOfDay " +
                    "AND ( :keyword IS NULL OR " +
                        "LOWER(s.message) LIKE CONCAT('%', LOWER(cast(:keyword AS text)), '%') OR " +
                        "LOWER(s.phone) LIKE CONCAT('%', LOWER(cast(:keyword AS text)), '%') OR " +
                        "LOWER(s.appId) LIKE CONCAT('%', LOWER(cast(:keyword AS text)), '%') " +
                    ")"
    )
    Page<SmsRequest> findAll(String keyword, LocalDateTime startOfDay, LocalDateTime endOfDay, Pageable pageable);

    @Query("SELECT NEW com.server.loadbalancer.dto.NoOfRequestDto( s.date AS date, s.appId AS appId, COUNT(s.id) AS messageCount ) " +
            "FROM SmsRequest s " +
            "WHERE YEAR(s.date) = :year AND MONTH(s.date) = :month " +
            "GROUP BY s.date, s.appId "
    )
    List<NoOfRequestDto> findNoOfRequest(@Param("month") int month, @Param("year") int year);

    @Query("SELECT COUNT(s.id) FROM SmsRequest s " +
            "WHERE s.appId = :appId " +
            "GROUP BY s.appId "
    )
    Long getNoOfProviderRequests(String appId);
}

