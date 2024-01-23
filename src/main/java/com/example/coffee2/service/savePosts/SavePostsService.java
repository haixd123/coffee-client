package com.example.coffee2.service.savePosts;

import com.example.coffee2.request.LikePostsRequest;
import com.example.coffee2.request.SavePostsRequest;
import com.example.coffee2.response.LikePostsResponse;
import com.example.coffee2.response.SavePostsResponse;

import java.util.List;

public interface SavePostsService {
    List<SavePostsResponse> getListSavePosts(SavePostsRequest request);

    Long getCountListSavePosts(SavePostsRequest request);

    boolean update(SavePostsRequest request);
}
