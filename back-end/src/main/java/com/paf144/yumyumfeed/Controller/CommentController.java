package com.paf144.yumyumfeed.Controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.paf144.yumyumfeed.Entity.Comments;
import com.paf144.yumyumfeed.Service.CommentsService;

@CrossOrigin
@RestController
@RequestMapping("/comments")
public class CommentController {
	
	@Autowired
	CommentsService commentsService;
	
	@PostMapping("")
	private Comments submitComment(@RequestBody Comments comment) {
		return commentsService.submitCommentToDB(comment);
	}
	
	@GetMapping("/{postId}")
	private ArrayList<Comments> getCommentsForPost(@PathVariable("postId") String postId){
		return commentsService.getAllCommentsForDB(postId);
	}

	@DeleteMapping("/{commentId}")
	public String deleteComment(@PathVariable String commentId) {
		commentsService.deleteCommentFromDB(commentId);
		return "Comment with ID " + commentId + " has been deleted successfully.";

	}

}
