package com.example.coffee2.service.savePosts.impl;

import com.example.coffee2.entity.LikePostsEntity;
import com.example.coffee2.entity.SavePostsEntity;
import com.example.coffee2.reponsitory.Customer.SavePostsCustomer;
import com.example.coffee2.reponsitory.SavePostsRepository;
import com.example.coffee2.request.LikePostsRequest;
import com.example.coffee2.request.SavePostsRequest;
import com.example.coffee2.response.SavePostsResponse;
import com.example.coffee2.service.savePosts.SavePostsService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Log4j2
public class SavePostsImpl implements SavePostsService {
    @Autowired
    private SavePostsCustomer savePostsCustomer;

    @Autowired
    private SavePostsRepository savePostsRepository;

    @Override
    public List<SavePostsResponse> getListSavePosts(SavePostsRequest request) {
        return savePostsCustomer.getListSavePosts(request);
    }

    @Override
    public Long getCountListSavePosts(SavePostsRequest request) {
        return savePostsCustomer.getCountListSavePosts(request);
    }

    @Override
    public boolean update(SavePostsRequest request) {
        try {
            List<SavePostsEntity> checkExist = savePostsRepository.findAllByPostIdAndUserId(request.getPostId(), request.getUserId());
            SavePostsEntity obj1 = savePostsRepository.findByPostIdAndUserId(request.getPostId(), request.getUserId());
            if (checkExist.contains(obj1)) {
                savePostsRepository.delete(obj1);
                return true;
            }
            if (obj1 == null) {
                SavePostsEntity obj = new SavePostsEntity();
                obj.setUserId(request.getUserId());
                obj.setPostId(request.getPostId());
                obj.setIsSave(1L);
                savePostsRepository.save(obj);
                return true;
            }
        } catch (Exception e) {
            log.error("not success: " + e.getMessage());
            return false;
        }
        return false;
    }
}
