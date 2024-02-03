package com.server.loadbalancer.dto;

import java.util.List;

public class MessagesRequestDto {

    private String message;
    private List<String> phone;

    public MessagesRequestDto() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<String> getPhone() {
        return phone;
    }

    public void setPhone(List<String> phone) {
        this.phone = phone;
    }
}

