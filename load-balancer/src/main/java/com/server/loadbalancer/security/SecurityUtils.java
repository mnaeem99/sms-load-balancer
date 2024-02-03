package com.server.loadbalancer.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.server.loadbalancer.model.RefreshToken;
import com.server.loadbalancer.model.UserEntity;
import com.server.loadbalancer.repository.RefreshTokenRepository;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;

@Component
public class SecurityUtils {
    private final RefreshTokenRepository refreshTokenRepository;

    public SecurityUtils(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public String generateAccessToken(UserEntity userEntity) {
        RefreshToken accessToken = new RefreshToken();
        accessToken.setUser(userEntity);
        accessToken.setToken(this.token());
        refreshTokenRepository.save(accessToken);
        return this.jwtAccess(userEntity, accessToken.getToken());
    }

    public String generateRefreshToken(UserEntity userEntity) {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUser(userEntity);
        refreshToken.setToken(this.token());
        refreshTokenRepository.save(refreshToken);
        return this.jwtRefresh(userEntity, refreshToken.getToken());
    }

    private String jwtAccess(UserEntity userEntity, String accessToken) {
        return JWT.create()
                .withSubject(userEntity.getId().toString())
                .withClaim("id", userEntity.getId().toString())
                .withClaim("accessToken", accessToken)
                .withClaim("role", userEntity.getRole().toString())
                .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.ACCESS_TOKEN_EXPIRATION))
                .sign(Algorithm.HMAC512(SecurityConstants.SECRET_ACCESS.getBytes()));
    }

    private String jwtRefresh(UserEntity userEntity, String refreshToken) {
        return JWT.create()
                .withSubject(userEntity.getId().toString())
                .withClaim("id", userEntity.getId().toString())
                .withClaim("refreshToken", refreshToken)
                .withClaim("role", userEntity.getRole().toString())
                .withExpiresAt(new Date(System.currentTimeMillis() + SecurityConstants.REFRESH_TOKEN_EXPIRATION))
                .sign(Algorithm.HMAC512(SecurityConstants.SECRET_Ref.getBytes()));
    }

    private String token() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[128];
        random.nextBytes(bytes);
        Base64.Encoder encoder = Base64.getUrlEncoder().withoutPadding();
        return encoder.encodeToString(bytes);
    }
}


