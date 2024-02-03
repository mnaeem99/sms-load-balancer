package com.server.loadbalancer.config;

import com.server.loadbalancer.service.SMSInstanceSupplier;
import org.springframework.cloud.loadbalancer.core.ServiceInstanceListSupplier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class SmsServerInstanceConfiguration {
    @Bean
    ServiceInstanceListSupplier serviceInstanceListSupplier() {
        return new SMSInstanceSupplier("sms-service");
    }
}