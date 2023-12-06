package com.example.coffee2.controller;

import com.example.coffee2.dto.JwtToken;
import com.example.coffee2.dto.TokenRefreshRequest;
import com.example.coffee2.dto.TokenRefreshResponse;
import com.example.coffee2.dto.UserDto;
import com.example.coffee2.entity.RefreshToken;
import com.example.coffee2.entity.UserEntity;
import com.example.coffee2.response.AuthResponse;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.reponsitory.Customer.AuthorCustomer;
import com.example.coffee2.service.RefreshTokenService;
import com.example.coffee2.service.author.JwtService;
import com.example.coffee2.service.user.UserService;
import com.example.coffee2.utils.Constants;
import com.example.coffee2.utils.TokenRefreshException;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = "*")
@Log4j2
@RequestMapping("/api/authors")
public class AuthorController {

    @Autowired
    private AuthorCustomer authorService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    RefreshTokenService refreshTokenService;

//    @PreAuthorize("hasRole('USER')")
    @PostMapping("/register")
    public ApiBaseResponse register(@RequestBody UserDto userDto) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = authorService.registerAuthor(userDto);
        if (!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Tài khoản đã tồn tại");
            apiBaseResponse.setData(userDto);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Tạo tài khoản thành công");
        apiBaseResponse.setData(userDto);
        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }

//    @PreAuthorize("hasRole('USER')")
    @PostMapping("/login")
    public AuthResponse login(@RequestBody UserDto userDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userDto.getUserName(), userDto.getPassWord()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtService.generateAccessToken(userDto.getUserName());
        UserEntity user = userService.findByUserNameAndStatus(userDto.getUserName());
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getId());

        return new AuthResponse(token, refreshToken, user);
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<?> refreshtoken(@RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtService.generateAccessToken(user.getUserName());
                    return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                        "Refresh token is not in database!"));
    }
//    @PreAuthorize("hasRole('USER')")
//    @PostMapping("/authenticate")
//    public ResponseEntity<JwtToken> authenticate(@RequestHeader("Authorization") String token) {
//        if (token != null && token.startsWith("Bearer ")) {
//            String jwtToken = token.substring(8);
//            if (jwtService.validateToken(jwtToken)) {
//                String username = jwtService.getUsernameFromToken(jwtToken);
////                 Do something with the username, e.g., authenticate the user
//                // ...
//
//                // Return a new token (if needed)
//                String newToken = jwtService.generateRefreshToken(username);
//                log.info("newToken" + newToken);
//                JwtToken responseToken = new JwtToken();
//                responseToken.setToken(newToken);
//                return ResponseEntity.ok(responseToken);
//            }
//        }
//
//        return ResponseEntity.badRequest().build();
//    }
}
