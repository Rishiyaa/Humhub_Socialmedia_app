package com.paf144.yumyumfeed.Controller;

import java.util.ArrayList;

import com.paf144.yumyumfeed.Entity.Post;
import com.paf144.yumyumfeed.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("/post")
public class PostController {

	@Autowired
	PostService postService;
	
	@PostMapping("")
	private Post submitUserPost(@RequestBody Post post) {
		return postService.submitPostToDataBase(post);
	}
	
	@GetMapping("")
	private ArrayList<Post> getAllPost(){
		return postService.retrivePostFromDB();
	}

	@DeleteMapping("/{postId}")
	public String deletePost(@PathVariable String postId) {
		postService.deletePostFromDB(postId);
		return "User with ID " + postId + " has been deleted successfully.";

	}
}
