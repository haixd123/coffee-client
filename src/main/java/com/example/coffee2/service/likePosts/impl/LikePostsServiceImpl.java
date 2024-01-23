package com.example.coffee2.service.likePosts.impl;

import com.example.coffee2.entity.LikePostsEntity;
import com.example.coffee2.reponsitory.Customer.LikePostsCustomer;
import com.example.coffee2.reponsitory.LikePostsRepository;
import com.example.coffee2.request.LikePostsRequest;
import com.example.coffee2.response.LikePostsResponse;
import com.example.coffee2.service.likePosts.LikePostsService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
public class LikePostsServiceImpl implements LikePostsService {

    @Autowired
    private LikePostsRepository repository;

    @Autowired
    private LikePostsCustomer likePostsCustomer;

    @Override
    public List<LikePostsResponse> getListLikePosts(LikePostsRequest request) {
        return likePostsCustomer.getListLikePosts(request);
    }

    @Override
    public Long getCountListLikePosts(LikePostsRequest request) {
        return likePostsCustomer.getCountListLikePosts(request);
    }

    @Override
    public Long getTotalLikePosts(LikePostsRequest request) {
        return likePostsCustomer.getTotalLikePosts(request);
    }

    @Override
    public boolean update(LikePostsRequest request) {
        try {
            LikePostsEntity obj1 = repository.findByPostIdAndUserId(request.getPostId(), request.getUserId());
            List<LikePostsEntity> checkExist = repository.findAllByPostIdAndUserId(request.getPostId(), request.getUserId());
            if (checkExist.contains(obj1)) {
                repository.delete(obj1);
                return true;
            }
            if (obj1 == null) {
                LikePostsEntity obj = new LikePostsEntity();
                obj.setUserId(request.getUserId());
                obj.setPostId(request.getPostId());
                obj.setIsLike(1L);
                repository.save(obj);
                return true;
            }
        } catch (Exception e) {
            log.error("not success: " + e.getMessage());
            return false;
        }
        return false;
    }
}
