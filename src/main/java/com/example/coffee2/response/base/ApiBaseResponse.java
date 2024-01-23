package com.example.coffee2.response.base;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

import static com.example.coffee2.utils.MessageUtils.getMessage;


@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
public class ApiBaseResponse implements Serializable {
    private static String MESSAGE_SUCCESS = "message.success";
    public static String CODE_SUCCESS = "code.success";
    public static String CODE_BAD_REQUEST = "code.bad_request";
    public static String CODE_UNAUTHORIZE = "code.unauthorize";

    private String errorCode;
    private String errorDescription;
    private Object data;
    private Object optional;

    public static ApiBaseResponse success() {
        return success(getMessage(MESSAGE_SUCCESS), null);
    }

    public static ApiBaseResponse success(Object data) {
        return success(getMessage(MESSAGE_SUCCESS), data);
    }

    public static ApiBaseResponse success(Object data, Object optional) {
        return success(getMessage(MESSAGE_SUCCESS), data, optional);
    }

    public static ApiBaseResponse success(String code, String message) {
        return ApiBaseResponse.builder()
                .errorCode(code)
                .errorDescription(message)
                .build();
    }

    public static ApiBaseResponse success(String message, Object data) {
        return success(message, data, null);
    }

    public static ApiBaseResponse success(String message, Object data, Object optional) {
        return ApiBaseResponse.builder()
                .errorCode(getMessage(CODE_SUCCESS))
                .errorDescription(getMessage(message))
                .data(data)
                .optional(optional)
                .build();
    }

    public static ApiBaseResponse error(String message) {
        return error(getMessage(CODE_BAD_REQUEST), message);
    }

    public static ApiBaseResponse error(String errorCode, String message) {
        return ApiBaseResponse.builder()
                .errorCode(errorCode)
                .errorDescription(getMessage(message))
                .build();
    }
}
