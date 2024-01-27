package com.server.loadbalancer.dto;

public class SmsRequestDto {

    private String message;
    private String phone;

    public SmsRequestDto() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

}
