package com.paf144.yumyumfeed.Repository;

import java.util.ArrayList;

import com.paf144.yumyumfeed.Entity.Users;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.paf144.yumyumfeed.Entity.Post;

@Repository
public interface PostRepo extends CrudRepository<Post, Integer> {

	Post save(Post post);
	ArrayList<Post> findAll();
	Post findByPostId(String postId);
	
}
