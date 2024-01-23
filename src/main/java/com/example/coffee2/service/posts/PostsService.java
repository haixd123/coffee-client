package com.example.coffee2.service.posts;

import com.example.coffee2.request.PostsRequest;
import com.example.coffee2.response.PostsResponse;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.List;

public interface PostsService {
    List<PostsResponse> getListPosts(PostsRequest request);
    Long getCountListPosts(PostsRequest request);

    Long getTotalPosts(PostsRequest request);

    boolean create(PostsRequest request);

    boolean update(PostsRequest request);

    boolean delete(PostsRequest request);
}
