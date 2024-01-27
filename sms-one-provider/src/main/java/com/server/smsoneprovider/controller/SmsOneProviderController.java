package com.server.smsoneprovider.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SmsOneProviderController {

    @PostMapping("/sendSms")
    public String sendSms(@RequestBody SmsRequest smsRequest) {
        // TODO: Implement SMS sending logic for SMS provider one
        // For simplicity, let's just return a success message
        return "SMS sent by SMS Provider One.";
    }
}
