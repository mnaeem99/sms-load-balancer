package com.server.loadbalancer.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.server.loadbalancer.model.UserEntity;
import com.server.loadbalancer.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class JWTDecoder {
    private final UserRepository userRepository;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public JWTDecoder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UsernamePasswordAuthenticationToken getJWTAuthentication(String tokenHeader) {
        if (tokenHeader != null) {
            // parse the token.
            String token = tokenHeader.replace(SecurityConstants.TOKEN_PREFIX, "");
            String userId;
            String role;
            try {
                DecodedJWT jwtDecoder = JWT.require(Algorithm.HMAC512(SecurityConstants.SECRET_ACCESS.getBytes()))
                        .build()
                        .verify(token);
                userId = jwtDecoder.getSubject();
                role = jwtDecoder.getClaims().get("role").asString();
            } catch (Exception e) {
                e.printStackTrace();
                return null;
            }
            Optional<UserEntity> user = userRepository.findById(UUID.fromString(userId));
            if (user.isPresent()) {
                List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList(role);
                return new UsernamePasswordAuthenticationToken(user.get(), null, grantedAuthorities);
            }
        }
        return null;
    }

    public UsernamePasswordAuthenticationToken getRefreshTokenAuthentication(String tokenHeader) {
        if (tokenHeader != null) {
            // parse the token.
            String token = tokenHeader.replace(SecurityConstants.TOKEN_PREFIX, "");
            DecodedJWT jwtDecoder = JWT.require(Algorithm.HMAC512(SecurityConstants.SECRET_Ref.getBytes()))
                    .build()
                    .verify(token);
            String userId = jwtDecoder.getSubject();
            String role = jwtDecoder.getClaims().get("role").asString();
            Optional<UserEntity> user = userRepository.findById(UUID.fromString(userId));
            if (user.isPresent()) {
                List<GrantedAuthority> grantedAuthorities = AuthorityUtils.commaSeparatedStringToAuthorityList(role);
                return new UsernamePasswordAuthenticationToken(user.get(), null, grantedAuthorities);
            }
        }
        return null;
    }
}


