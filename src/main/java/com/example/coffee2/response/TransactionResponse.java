package com.example.coffee2.response;


import lombok.Data;

import java.io.Serializable;

@Data
public class TransactionResponse implements Serializable {

    private String status;
    private String message;
    private String data;

}
