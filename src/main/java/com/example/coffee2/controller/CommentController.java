package com.example.coffee2.controller;

import com.example.coffee2.request.CoffeeBeanRequest;
import com.example.coffee2.request.CommentRequest;
import com.example.coffee2.request.EquipmentRequest;
import com.example.coffee2.request.LikePostsRequest;
import com.example.coffee2.response.CommentResponse;
import com.example.coffee2.response.LikePostsResponse;
import com.example.coffee2.response.base.ApiBaseResponse;
import com.example.coffee2.service.comment.CommentService;
import com.example.coffee2.utils.Constants;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Log4j2
//@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "api")
public class CommentController {
    @Autowired
    private CommentService commentService;


    @PostMapping("/authors/comment/searchTotalCommentPost")
    public ApiBaseResponse getTotalLikePost(@RequestBody CommentRequest request) {
        Long count = commentService.getTotalCommentPosts(request);
        log.info("count: " + count);
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        apiBaseResponse.setOptional(count);
        return apiBaseResponse;
    }

    @PostMapping("/authors/comment/search")
    public ApiBaseResponse getListLikePosts(@RequestBody CommentRequest request) {
        List<CommentResponse> listResult = commentService.getListComment(request);
        Long count = commentService.getCountListComment(request);
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        apiBaseResponse.setData(listResult);
        apiBaseResponse.setOptional(count);
        return apiBaseResponse;
    }

//    @PreAuthorize("hasRole('USER')")
    @PostMapping("/authors/comment/create")
    public ApiBaseResponse create(@RequestBody CommentRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();

        boolean rs = commentService.create(request);
        if (!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Thêm mới bình luận không thành công");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        Long count = commentService.getCountListComment(request);
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Thêm mới bình luận thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(count);

        return apiBaseResponse;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/comment/update")
    public ApiBaseResponse update(@RequestBody CommentRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = commentService.update(request);
        if(!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Chỉnh sửa bình luận không thành công");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Chỉnh sửa bình luận thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/comment/delete")
    public ApiBaseResponse delete(@RequestBody CommentRequest request) {
        ApiBaseResponse apiBaseResponse = new ApiBaseResponse();
        boolean rs = commentService.delete(request);
        if(!rs) {
            apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_FAIL);
            apiBaseResponse.setErrorDescription("Xóa bình luận không thành công");
            apiBaseResponse.setData(request);
            apiBaseResponse.setOptional(1L);
            return apiBaseResponse;
        }
        apiBaseResponse.setErrorCode(Constants.CALL_API_CODE_SUCCESS);
        apiBaseResponse.setErrorDescription("Xóa bình luận thành công");
        apiBaseResponse.setData(request);
        apiBaseResponse.setOptional(1L);
        return apiBaseResponse;
    }
}
