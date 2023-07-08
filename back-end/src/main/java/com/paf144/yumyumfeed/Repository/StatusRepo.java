package com.paf144.yumyumfeed.Repository;

import java.util.ArrayList;

import com.paf144.yumyumfeed.Entity.Comments;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.paf144.yumyumfeed.Entity.Status;

@Repository
public interface StatusRepo extends CrudRepository<Status, Integer>{

	Status save(Status save);
	ArrayList<Status> findAll();
	Status findByStatusId(String statusId);
}
