package com.server.loadbalancer.security;

import java.util.concurrent.TimeUnit;

public class SecurityConstants {
    public static final String SECRET_ACCESS = "SecretKeyToGenACCESS";
    public static final String SECRET_Ref = "SecretKeyToGenREF";
    public static final long ACCESS_TOKEN_EXPIRATION = TimeUnit.MINUTES.toMillis(30);
    public static final long REFRESH_TOKEN_EXPIRATION = TimeUnit.HOURS.toMillis(24);
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
}


