package com.example.coffee2.service.comment;

import com.example.coffee2.entity.CommentEntity;
import com.example.coffee2.request.CommentRequest;
import com.example.coffee2.request.LikePostsRequest;
import com.example.coffee2.response.CommentResponse;
import com.example.coffee2.response.LikePostsResponse;

import java.util.List;

public interface CommentService {
    List<CommentResponse> getListComment(CommentRequest request);

    Long getCountListComment(CommentRequest request);

    Long getTotalCommentPosts(CommentRequest request);

    boolean create(CommentRequest request);

    boolean update(CommentRequest request);

    boolean delete(CommentRequest request);

    CommentEntity getById(Long commentId);
}
