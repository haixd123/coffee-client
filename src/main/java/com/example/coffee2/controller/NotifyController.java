package com.example.coffee2.controller;


import com.example.coffee2.entity.ResponseObject;
import com.example.coffee2.reponsitory.NotifyRepository;
import com.example.coffee2.request.LikePostsRequest;
import com.example.coffee2.request.NotifyRequest;
import com.example.coffee2.response.NotifyResponse;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.service.notify.NotifyService;
import com.example.coffee2.utils.Constants;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Log4j2
//@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "api/authors/notify")
public class NotifyController {
    @Autowired
    private NotifyService notifyService;

    @Autowired
    private NotifyRepository repository;

    @GetMapping("/search-list-from-user")
    public ApiBaseResponse createSqlGetListfromUser() {
        List<NotifyResponse> listResult = notifyService.createSqlGetListfromUser();
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        apiBaseResponse.setData(listResult);
        return apiBaseResponse;
    }

    @GetMapping("/search-list-isComment-post")
    public ApiBaseResponse createSqlGetListIsCommentPost() {
        List<NotifyResponse> listResult = notifyService.createSqlGetListIsCommentPost();
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        apiBaseResponse.setData(listResult);
        return apiBaseResponse;
    }

    @GetMapping("/search-list-isReply-comment")
    public ApiBaseResponse createSqlGetListIsReplyComment() {
        List<NotifyResponse> listResult = notifyService.createSqlGetListIsReplyComment();
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        apiBaseResponse.setData(listResult);
        return apiBaseResponse;
    }

    @PostMapping("/create")
    public ApiBaseResponse create(@RequestBody NotifyRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = notifyService.create(request);
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Tạo thông báo thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }

    @PostMapping("/delete")
    public ApiBaseResponse delete(@RequestBody NotifyRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = notifyService.delete(request);
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Xoá thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }
}
