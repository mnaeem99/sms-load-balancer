package com.server.loadbalancer.dto;

import java.time.LocalDate;

public class NoOfRequestDto {

    private LocalDate date;
    private String appId;
    private Long messageCount;

    public NoOfRequestDto() {
    }

    public NoOfRequestDto(LocalDate date, String appId, Long messageCount) {
        this.date = date;
        this.appId = appId;
        this.messageCount = messageCount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getAppId() {
        return appId;
    }

    public void setAppId(String appId) {
        this.appId = appId;
    }

    public Long getMessageCount() {
        return messageCount;
    }

    public void setMessageCount(Long messageCount) {
        this.messageCount = messageCount;
    }
}
