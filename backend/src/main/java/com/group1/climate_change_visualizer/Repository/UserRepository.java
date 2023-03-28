package com.group1.climate_change_visualizer.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.group1.climate_change_visualizer.Data.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    @Query(value = "select * from users",nativeQuery = true)
    List<User> getRepoUsers();
}
