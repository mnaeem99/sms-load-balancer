package com.server.loadbalancer.controller;

import com.server.loadbalancer.dto.SmsRequestDto;
import com.server.loadbalancer.model.SmsRequest;
import com.server.loadbalancer.service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
public class LoadBalancerController {

    @Autowired
    private SmsService smsService;

    @PostMapping("/sendSms/{providerName}")
    public SmsRequest sendSms(@RequestBody SmsRequestDto smsRequest, @PathVariable String providerName) {
        return smsService.sendSms(smsRequest, providerName);
    }

    @PostMapping("/sendMultipleSms/{providerName}")
    public List<SmsRequest> sendMultipleSms(@RequestBody List<SmsRequestDto> smsRequests, @PathVariable String providerName) {
        List<SmsRequest> smsResponse = new ArrayList<SmsRequest>();

        for (SmsRequestDto smsRequest : smsRequests) {
            SmsRequest smsRequest1 = smsService.sendSms(smsRequest, providerName);
            smsResponse.add(smsRequest1);
        }

        return smsResponse;
    }
    @GetMapping("/sendParallelSms/{providerName}")
    public String sendParallelSms(@PathVariable String providerName, @RequestParam String numberOfMessages) throws ExecutionException, InterruptedException {
        return smsService.sendParallelSms(providerName, Integer.parseInt(numberOfMessages));
    }

    @PostMapping("/sendSmsToAll")
    public List<SmsRequest> sendSmsToAllProvider(@RequestBody SmsRequestDto smsRequest) {
        List<SmsRequest> smsResponse = new ArrayList<SmsRequest>();

        SmsRequest smsRequest1 = smsService.sendSms(smsRequest, "sms-one-service");

        SmsRequest smsRequest2 = smsService.sendSms(smsRequest, "sms-two-service");

        smsResponse.add(smsRequest1);
        smsResponse.add(smsRequest2);

        return smsResponse;
    }

}

