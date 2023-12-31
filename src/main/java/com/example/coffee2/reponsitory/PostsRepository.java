package com.example.coffee2.reponsitory;

import com.example.coffee2.entity.PostsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface PostsRepository extends JpaRepository<PostsEntity, Long> {
    @Query(
            value = "SELECT * FROM posts",
            nativeQuery = true
    )
    List<PostsEntity> findAllPosts();

    @Query(
            value = "select e.title from posts e where e.title = :title",
            nativeQuery = true
    )
    List<String> findByTitle(@RequestParam String title);

    @Query(
            value = "select DISTINCT category from posts",
            nativeQuery = true
    )
    List<String> getListCategory();

    @Query(
            value = "select e.* from posts e where e.title = :title",
            nativeQuery = true
    )
    PostsEntity getPostsName( String title);


//    List<String> findAllByName(@RequestParam String name);


}
