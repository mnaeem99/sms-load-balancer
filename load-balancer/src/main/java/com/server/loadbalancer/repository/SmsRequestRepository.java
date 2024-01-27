package com.server.loadbalancer.repository;

import com.server.loadbalancer.model.SmsRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SmsRequestRepository extends JpaRepository<SmsRequest, Long> {
}

