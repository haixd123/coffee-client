package com.example.coffee2.entity;

import com.example.coffee2.response.PostsResponse;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "posts", catalog = "cafeg", schema = "dbo")
public class PostsEntity {
    @Id
    @SequenceGenerator(name = "posts_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "posts_seq")
//    @GeneratedValue(strategy = GenerationType.AUTO, generator = "posts_seq")
    private Long id;

    @Column(name = "total_like")
    private Long like1;

    @Column(name = "total_comment")
    private Long comment;

    @Column(name = "title")
    private String title;

    @Column(name = "content_post")
    private String contentPost;

    @Column(name = "content_detail")
    private String contentDetail;

    @Column(name = "status")
    private Long status;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

    @Column(name = "category")
    private String category;


//    @Override
//    public String toString() {
//        return "PostsEntity{" +
//                "id=" + id +
//                ", like1=" + like1 +
//                ", share=" + share +
//                ", comment=" + comment +
//                ", content1='" + content1 + '\'' +
//                ", title='" + title + '\'' +
//                ", status=" + status +
//                '}';
//    }
}
