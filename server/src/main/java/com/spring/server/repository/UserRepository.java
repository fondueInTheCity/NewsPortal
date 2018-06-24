package com.spring.server.repository;


import com.spring.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);
    User findByActivationCode(String activateCode);
    User findByEmail(String email);
}
