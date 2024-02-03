package com.server.loadbalancer.service;

import com.server.loadbalancer.dto.MessagesRequestDto;
import com.server.loadbalancer.dto.SmsRequestDto;
import com.server.loadbalancer.model.SmsRequest;
import com.server.loadbalancer.repository.SmsRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;
@Service
public class SmsService {

    @Autowired
    private LoadBalancerClient loadBalancerClient;

    @Autowired
    private SmsRequestRepository smsRequestRepository;

    public SmsRequest sendSms(SmsRequestDto smsRequestDto, String providerName) {
        // Load balance between SMS provider instances
        ServiceInstance serviceInstance = loadBalancerClient.choose(providerName);
        String smsProviderUrl = serviceInstance.getUri().toString() + "/sendSms";

        // Send SMS request to the chosen SMS provider using RestTemplate
        ResponseEntity<String> responseEntity = new RestTemplate().postForEntity(smsProviderUrl, smsRequestDto, String.class);

        // Create a SMS request entity for storing message in database
        SmsRequest smsRequest = new SmsRequest();
        smsRequest.setMessage(smsRequestDto.getMessage());
        smsRequest.setPhone(smsRequestDto.getPhone());

        // Update the status based on the response from SMS provider
        smsRequest.setStatus(responseEntity.getBody());

        // Store SMS request in the database
        return smsRequestRepository.save(smsRequest);
    }
    public String sendLoadBalanceSms(int numberOfMessages) throws InterruptedException, ExecutionException {
        // Create a thread pool
        ExecutorService executorService = Executors.newFixedThreadPool(numberOfMessages);

        // List to store the results of each SMS request
        List<Future<String>> futures = new ArrayList<>();

        // Create SMS requests and submit them to the thread pool
        for (int i = 0; i < numberOfMessages; i++) {
            Callable<String> smsTask = createSmsTask(i);
            futures.add(executorService.submit(smsTask));
        }

        // Wait for all tasks to complete
        for (Future<String> future : futures) {
            future.get(); // Blocking call to get the result, adjust as needed
            System.out.println(future.get());
        }

        // Shutdown the thread pool
        executorService.shutdown();

        return "SMS requests sent successfully.";
    }

    private Callable<String> createSmsTask(int noOfMessage) {
        return () -> {
            // Load balance between SMS provider instances
            ServiceInstance serviceInstance = loadBalancerClient.choose("sms-service-1");
            String smsProviderUrl = serviceInstance.getUri().toString() + "/sendSms";

            // Create an example SMS request DTO
            SmsRequestDto smsRequestDto = new SmsRequestDto();
            smsRequestDto.setMessage("Test message "+noOfMessage);
            smsRequestDto.setPhone("1234567"+ noOfMessage);

            // Send SMS request to the chosen SMS provider using RestTemplate
            ResponseEntity<String> responseEntity = new RestTemplate().postForEntity(smsProviderUrl, smsRequestDto, String.class);

            // Check the response and retry if unsuccessful
            if (!responseEntity.getStatusCode().is2xxSuccessful()) {
                // Retry with the other SMS provider
                ServiceInstance otherInstance = loadBalancerClient.choose("sms-service-2");
                String otherSmsProviderUrl = otherInstance.getUri().toString() + "/sendSms";
                ResponseEntity<String> otherResponseEntity = new RestTemplate().postForEntity(otherSmsProviderUrl, smsRequestDto, String.class);
                return "Message no "+ noOfMessage +" completed with response: " + otherResponseEntity.getBody();
            }
            return "Message no "+ noOfMessage +" completed with response: " + responseEntity.getBody();
        };
    }
    public List<SmsRequest> sendLoadBalanceSms(MessagesRequestDto messagesRequestDto) throws InterruptedException, ExecutionException {
        // Create a thread pool
        ExecutorService executorService = Executors.newFixedThreadPool(messagesRequestDto.getPhone().size());

        // List to store the results of each SMS request
        List<Future<SmsRequest>> futures = new ArrayList<>();
        List<SmsRequest> smsResponse = new ArrayList<SmsRequest>();

        // Create SMS requests and submit them to the thread pool
        for (String phone: messagesRequestDto.getPhone()) {
            // Create an SMS request DTO
            SmsRequestDto smsRequestDto = new SmsRequestDto();
            smsRequestDto.setMessage(messagesRequestDto.getMessage());
            smsRequestDto.setPhone(phone);
            Callable<SmsRequest> smsTask = createSmsTask(smsRequestDto);
            futures.add(executorService.submit(smsTask));
        }

        // Wait for all tasks to complete
        for (Future<SmsRequest> future : futures) {
            future.get(); // Blocking call to get the result, adjust as needed
            smsResponse.add(future.get());
        }

        // Shutdown the thread pool
        executorService.shutdown();

        return smsResponse;
    }

    private Callable<SmsRequest> createSmsTask(SmsRequestDto smsRequestDto) {
        return () -> {
            // Load balance between SMS provider instances
            ServiceInstance serviceInstance = loadBalancerClient.choose("sms-service-1");
            String smsProviderUrl = serviceInstance.getUri().toString() + "/sendSms";

            // Send SMS request to the chosen SMS provider using RestTemplate
            ResponseEntity<String> responseEntity = new RestTemplate().postForEntity(smsProviderUrl, smsRequestDto, String.class);

            // Check the response and retry if unsuccessful
            if (!responseEntity.getStatusCode().is2xxSuccessful()) {
                // Retry with the other SMS provider
                ServiceInstance otherInstance = loadBalancerClient.choose("sms-service-2");
                String otherSmsProviderUrl = otherInstance.getUri().toString() + "/sendSms";
                ResponseEntity<String> otherResponseEntity = new RestTemplate().postForEntity(otherSmsProviderUrl, smsRequestDto, String.class);

                // Create a SMS request entity for storing message in database
                SmsRequest smsRequest = new SmsRequest();
                smsRequest.setMessage(smsRequestDto.getMessage());
                smsRequest.setPhone(smsRequestDto.getPhone());

                // Update the status based on the response from SMS provider
                smsRequest.setStatus(responseEntity.getBody());

                return smsRequest;
            }

            // Create a SMS request entity for storing message in database
            SmsRequest smsRequest = new SmsRequest();
            smsRequest.setMessage(smsRequestDto.getMessage());
            smsRequest.setPhone(smsRequestDto.getPhone());

            // Update the status based on the response from SMS provider
            smsRequest.setStatus(responseEntity.getBody());

            return smsRequest;
        };
    }
}
