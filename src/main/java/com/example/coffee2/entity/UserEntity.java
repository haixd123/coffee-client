package com.example.coffee2.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "user1")
public class UserEntity {
    @Id
    @SequenceGenerator(name = "user1_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user1_seq")

    private Long id;

    @Column(name = "user_name")
    private String userName;
    @Column(name = "password")
    private String passWord;
    @Column(name = "email")
    private String email;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "address")
    private String address;
    @Column(name = "age")
    private Long age;
    @Column(name = "role")
    private Long role;
    @Column(name = "phone_number")
    private Long phoneNumber;
    @Column(name = "date_of_birth")
    private Date dateOfBirth;
    @Column(name = "sex")
    private Long sex;
    @Column(name = "create_date")
    private Date createDate;
    @Column(name = "status")
    private Long status;




//    @Override
//    public String toString() {
//        return "UserEntity{" +
//                "id=" + id +
//                ", userName='" + userName + '\'' +
//                ", passWord='" + passWord + '\'' +
//                ", email='" + email + '\'' +
//                ", firstName='" + firstName + '\'' +
//                ", lastName='" + lastName + '\'' +
//                ", address='" + address + '\'' +
//                ", age=" + age +
//                ", role=" + role +
//                ", phoneNumber=" + phoneNumber +
//                ", dateOfBirth=" + dateOfBirth +
//                ", sex=" + sex +
//                ", createDate=" + createDate +
//                ", status=" + status +
//                '}';
//    }
}
