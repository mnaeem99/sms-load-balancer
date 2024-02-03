package com.server.loadbalancer.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.util.concurrent.TimeUnit;

@Entity
public class RefreshToken {
    @Id
    @Column(unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private UserEntity userEntity;

    @Column(unique = true, nullable = false)
    private String token;

    @CreationTimestamp
    private OffsetDateTime createdAt;

    @Column(nullable = false)
    private long validityPeriod = TimeUnit.DAYS.toMillis(1);

    public RefreshToken() {
    }

    public RefreshToken(Long id, UserEntity userEntity, String token, OffsetDateTime createdAt, long validityPeriod) {
        this.id = id;
        this.userEntity = userEntity;
        this.token = token;
        this.createdAt = createdAt;
        this.validityPeriod = validityPeriod;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserEntity getUser() {
        return userEntity;
    }

    public void setUser(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public long getValidityPeriod() {
        return validityPeriod;
    }

    public void setValidityPeriod(long validityPeriod) {
        this.validityPeriod = validityPeriod;
    }
}


