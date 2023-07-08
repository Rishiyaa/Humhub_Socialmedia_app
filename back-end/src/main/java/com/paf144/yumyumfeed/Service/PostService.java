package com.paf144.yumyumfeed.Service;

import java.util.ArrayList;
import java.util.Collections;

import com.paf144.yumyumfeed.Entity.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paf144.yumyumfeed.Entity.Post;
import com.paf144.yumyumfeed.Entity.Status;
import com.paf144.yumyumfeed.Repository.PostRepo;

@Service
public class PostService {

	@Autowired
	PostRepo postRepo;
	
	@Autowired
	UserService userService;
	
	public Post submitPostToDataBase(Post post) {
		return postRepo.save(post);
	}
	
	public ArrayList<Post> retrivePostFromDB(){

		ArrayList<Post> postList=postRepo.findAll();
		
		for(int i=0;i<postList.size();i++) {
			Post postItem=postList.get(i);
			postItem.setUserName(userService.displayUserMetaData(postItem.getUserId()).getUserName());
		}
		Collections.sort(postList,(a,b)->b.getId()-a.getId());
		return postList;
	}

	public ArrayList<Post> deletePostFromDB(String PostId) {
		try {
			Post post = postRepo.findByPostId(PostId);
			postRepo.delete(post);
			return null;
		} catch (Exception e) {
			return null;
		}
	}

}
