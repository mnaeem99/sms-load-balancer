package com.server.smstwoprovider.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SmsTwoProviderController {

    @PostMapping("/sendSms")
    public String sendSms(@RequestBody SmsRequest smsRequest) {
        // TODO: Implement SMS sending logic for SMS provider two
        // For simplicity, let's just return a success message
        return "SMS sent by SMS Provider Two.";
    }
}

