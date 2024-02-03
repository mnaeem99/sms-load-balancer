package com.server.loadbalancer.service;


import com.server.loadbalancer.dto.LoginDto;
import com.server.loadbalancer.model.UserEntity;
import com.server.loadbalancer.repository.UserRepository;
import com.server.loadbalancer.security.SecurityConstants;
import com.server.loadbalancer.security.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;

@Service
public class UserService {

    private final AuthenticationManager authenticationManager;
    private final SecurityUtils securityUtils;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    public UserService(AuthenticationManager authenticationManager, SecurityUtils securityUtils, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.securityUtils = securityUtils;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public HashMap<String, String> login(LoginDto request) {
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        UserEntity userEntity = (UserEntity) auth.getPrincipal();
        String accessToken = securityUtils.generateAccessToken(userEntity);
        String refToken = securityUtils.generateRefreshToken(userEntity);
        HashMap<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", SecurityConstants.TOKEN_PREFIX + accessToken);
        tokens.put("refreshToken", SecurityConstants.TOKEN_PREFIX + refToken);
        return tokens;
    }


}
