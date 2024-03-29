package com.server.loadbalancer.controller;

import com.server.loadbalancer.dto.MessagesRequestDto;
import com.server.loadbalancer.dto.NoOfRequestDto;
import com.server.loadbalancer.dto.SmsRequestDto;
import com.server.loadbalancer.model.SmsRequest;
import com.server.loadbalancer.repository.SmsRequestRepository;
import com.server.loadbalancer.service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
public class SmsRequestController {

    @Autowired
    private SmsService smsService;

    @Autowired
    private LoadBalancerClient loadBalancerClient;

    @Autowired
    private WebClient.Builder webClientBuilder;
    @Autowired
    private SmsRequestRepository smsRequestRepository;

    @PostMapping("/smsTest")
    public String smsTest(@RequestBody SmsRequest smsRequest) {
        // Load balance between SMS provider instances
        ServiceInstance serviceInstance = loadBalancerClient.choose("sms-service");
        String smsProviderUrl = serviceInstance.getUri().toString() + "/sendSms";

        // Send SMS request to the chosen SMS provider using WebClient
        String response = webClientBuilder.build()
                .post()
                .uri(smsProviderUrl)
                .bodyValue(smsRequest)
                .retrieve()
                .bodyToMono(String.class)
                .block();
        // Handle the response as needed
        return "SMS request sent successfully. Response: " + response;
    }

    @PostMapping("/sendParallelSms")
    public List<SmsRequest> sendParallelSms(@RequestBody MessagesRequestDto messagesRequestDto) throws ExecutionException, InterruptedException {
        List<SmsRequest> smsRequests = smsService.sendLoadBalanceSms(messagesRequestDto);
        return smsRequestRepository.saveAll(smsRequests);
    }
    @GetMapping("/sendParallelSms")
    public String sendParallelSms(@RequestParam String numberOfMessages) throws ExecutionException, InterruptedException {
        return smsService.sendLoadBalanceSms(Integer.parseInt(numberOfMessages));
    }
    @GetMapping("/smsRequests")
    public Page<SmsRequest> getSmsRequests(@RequestParam String year, @RequestParam String month, @RequestParam String  keyword, @RequestParam String page, @RequestParam String size, Sort sort) {
        if (page == null) { page = "0"; }
        if (size == null) { size = "0"; }
        Pageable pageable = PageRequest.of(Integer.parseInt(page), Integer.parseInt(size), sort);
        return smsService.getSmsRequests(year,month,keyword,pageable);
    }
    @GetMapping("/noOfRequests")
    public ArrayList<NoOfRequestDto> getNoOfRequests(@RequestParam String year, @RequestParam String month) {
        List<NoOfRequestDto> noOfRequestDtoList = smsService.getNoOfRequests(year,month);
        return new ArrayList<>(noOfRequestDtoList);
    }
    @GetMapping("/noOfProviderRequests")
    public Long getNoOfProviderRequests(@RequestParam String appId) {
        return smsService.getNoOfProviderRequests(appId);
    }
    @PostMapping("/sendSms/{providerName}")
    public SmsRequest sendSms(@RequestBody SmsRequestDto smsRequest, @PathVariable String providerName) {
        return smsService.sendSms(smsRequest, providerName);
    }


    @PostMapping("/sendSmsToAll")
    public List<SmsRequest> sendSmsToAllProvider(@RequestBody SmsRequestDto smsRequest) {
        List<SmsRequest> smsResponse = new ArrayList<SmsRequest>();

        SmsRequest smsRequest1 = smsService.sendSms(smsRequest, "sms-service-1");

        SmsRequest smsRequest2 = smsService.sendSms(smsRequest, "sms-service-2");

        smsResponse.add(smsRequest1);
        smsResponse.add(smsRequest2);

        return smsResponse;
    }


}

