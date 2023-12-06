package com.example.coffee2.response;

import com.example.coffee2.entity.RefreshToken;
import com.example.coffee2.entity.UserEntity;

public class AuthResponse {

    public String token;
    public String accessToken;
    public RefreshToken refreshToken;
    public UserEntity user;

    public AuthResponse(String accessToken, UserEntity user) {
        this.accessToken = accessToken;
        this.user = user;
    }

    public AuthResponse(String accessToken, RefreshToken refreshToken, UserEntity user) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.user = user;
    }

}
