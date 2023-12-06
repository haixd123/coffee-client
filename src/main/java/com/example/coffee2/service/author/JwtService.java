package com.example.coffee2.service.author;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;

import javax.crypto.SecretKey;
import java.util.Date;


@Service
public class JwtService {

    @Value("${jwt.expiration}")
    private long expiration;

//    @Value("${jwt.expiration}")
//    private long expiration;

//    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//
//    private static final String SECRET_KEY = "a123";
//    private static final long ACCESS_TOKEN_EXPIRATION = 90000000; // 15 minutes
//    private static final long REFRESH_TOKEN_EXPIRATION = 2104800000; // 1 week

    SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    String secretString = Encoders.BASE64.encode(key.getEncoded());

    public String generateAccessToken(String username) {
        return Jwts.builder()
                .setSubject((username))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + expiration))
                .signWith(SignatureAlgorithm.HS512, secretString)
                .compact();
    }

    // lấy username từ token
    public String getUsernameFromToken(String token) {
        String userName = Jwts.parser()
                .setSigningKey(secretString)
                .parseClaimsJws(token)
                .getBody().getSubject();
        return userName;
    }

//    public String generateRefreshToken(String username) {
//        return Jwts.builder()
//                .setSubject(username)
//                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION))
////                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
//                .signWith(key)
//                .compact();
//    }
//
//
//    public String generateToken(String username) {
//        return Jwts.builder()
//                .setSubject(username)
//                .signWith(key)
//                .compact();
//    }
//
//
//    public String getUsernameFromToken(String token) {
//        Claims claims = Jwts.parser()
//                .setSigningKey(secret)
////                .build()
//                .parseClaimsJws(token)
//                .getBody();
//
//        return claims.getSubject();
//    }
//
//    public boolean validateToken(String token) {
//        try {
//            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
//            return true;
//        } catch (Exception e) {
//            return false;
//        }
//    }


}
