package com.server.loadbalancer.service;

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
        String smsProviderUrl = serviceInstance.getUri().toString() + "/"+providerName+"/sendSms";

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
    public String sendParallelSms(String providerName, int numberOfMessages) throws InterruptedException, ExecutionException {
        // Create a thread pool
        ExecutorService executorService = Executors.newFixedThreadPool(numberOfMessages);

        // List to store the results of each SMS request
        List<Future<String>> futures = new ArrayList<>();

        // Create SMS requests and submit them to the thread pool
        for (int i = 0; i < numberOfMessages; i++) {
            Callable<String> smsTask = createSmsTask(providerName);
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

    private Callable<String> createSmsTask(String providerName) {
        return () -> {
            // Load balance between SMS provider instances
            ServiceInstance serviceInstance = loadBalancerClient.choose(providerName);
            String smsProviderUrl = serviceInstance.getUri().toString() + "/"+providerName+"/sendSms";

            // Create an example SMS request DTO
            SmsRequestDto smsRequestDto = new SmsRequestDto();
            smsRequestDto.setMessage("Test message");
            smsRequestDto.setPhone("123456789");

            // Send SMS request to the chosen SMS provider using RestTemplate
            ResponseEntity<String> responseEntity = new RestTemplate().postForEntity(smsProviderUrl, smsRequestDto, String.class);

            return "Parallel SMS request completed with response: " + responseEntity.getBody();
        };
    }
}
