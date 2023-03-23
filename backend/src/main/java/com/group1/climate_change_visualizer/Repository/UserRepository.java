package com.group1.climate_change_visualizer.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group1.climate_change_visualizer.Data.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

}
