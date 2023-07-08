package com.paf144.yumyumfeed.Service;

import java.util.ArrayList;

import com.paf144.yumyumfeed.Entity.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paf144.yumyumfeed.Entity.Comments;
import com.paf144.yumyumfeed.Entity.Status;
import com.paf144.yumyumfeed.Repository.CommentRepo;

@Service
public class CommentsService {
	
	@Autowired
	CommentRepo commentRepo;
	
	@Autowired
	UserService userService;
	
	public Comments submitCommentToDB(Comments comment) {
		return commentRepo.save(comment);
	}
	
	public ArrayList<Comments> getAllCommentsForDB(String postId){
		
		ArrayList<Comments> commentList=commentRepo.findAllByPostId(postId);
		
		for(int i=0;i<commentList.size();i++) {
			Comments commentItem=commentList.get(i);
			commentItem.setUserName(userService.displayUserMetaData(commentItem.getUserId()).getUserName());
		}
		
		return commentList;
		
	}
	public ArrayList<Comments> deleteCommentFromDB(String commentId) {
		try {
			Comments comment = commentRepo.findByCommentId(commentId);
			commentRepo.delete(comment);
			return null;
		} catch (Exception e) {
			return null;
		}
	}
}
