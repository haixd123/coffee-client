package com.example.coffee2.response;

import lombok.Data;

import java.io.Serializable;

@Data
public class PaymentResponse implements Serializable {

    private String status;
    private String message;
    private String URL;
    private String billId;

}
