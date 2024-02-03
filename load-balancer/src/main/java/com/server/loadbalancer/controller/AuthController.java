package com.server.loadbalancer.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.loadbalancer.dto.LoginDto;
import com.server.loadbalancer.model.UserEntity;
import com.server.loadbalancer.security.SecurityConstants;
import com.server.loadbalancer.security.SecurityUtils;
import com.server.loadbalancer.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
public class AuthController {

    private final UserService userService;
    private final SecurityUtils securityUtils;
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    public AuthController(UserService authenticationService, SecurityUtils securityUtils) {
        this.userService = authenticationService;
        this.securityUtils = securityUtils;
    }

    @PostMapping("/api/login")
    public ResponseEntity<HashMap<String, String>> login(@RequestBody LoginDto request) {
        return ResponseEntity.ok(userService.login(request));
    }

    @GetMapping("/api/access-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String authorizationHeader = request.getHeader(SecurityConstants.HEADER_STRING);
        if (authorizationHeader.startsWith(SecurityConstants.TOKEN_PREFIX)) {
            try {
                UserEntity userEntity = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
                String accessToken = securityUtils.generateAccessToken(userEntity);
                HashMap<String, String> tokens = new HashMap<>();
                tokens.put("accessToken", SecurityConstants.TOKEN_PREFIX + accessToken);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                ObjectMapper objectMapper = new ObjectMapper();
                objectMapper.writeValue(response.getOutputStream(), tokens);
            } catch (Exception e) {
                throw new Exception("Invalid Token", e);
            }
        } else {
            throw new Exception("Missing Token");
        }
    }

}

