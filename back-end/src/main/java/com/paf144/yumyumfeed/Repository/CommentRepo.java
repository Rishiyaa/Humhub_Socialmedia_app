package com.paf144.yumyumfeed.Repository;

import java.util.ArrayList;

import com.paf144.yumyumfeed.Entity.Users;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.paf144.yumyumfeed.Entity.Comments;

@Repository
public interface CommentRepo extends CrudRepository<Comments, Integer> {
	
	Comments save(Comments comment);
	ArrayList<Comments> findAllByPostId(String postId);
	ArrayList<Comments> findAll();
	Comments findByCommentId(String commentId);
}
