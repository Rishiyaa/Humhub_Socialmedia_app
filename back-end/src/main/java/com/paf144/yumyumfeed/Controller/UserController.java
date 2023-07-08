package com.paf144.yumyumfeed.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.paf144.yumyumfeed.Entity.Users;
import com.paf144.yumyumfeed.Service.UserService;

@CrossOrigin
@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	UserService userService;

	@PostMapping("")
	private Users submitUser(@RequestBody Users users) {
		return userService.submitMetaDataOfUser(users);
	}
	
	@GetMapping("/{userid}")
	private Users getUserDetails(@PathVariable("userid") String userId) {
		return userService.displayUserMetaData(userId);
	}

	@PutMapping("/{userId}")
	public ResponseEntity<Users> updateUser(@PathVariable("userId") String userId, @RequestBody Users users) {
		Users updatedUser = userService.updateUserMetaData(userId, users);
		if (updatedUser != null) {
			return ResponseEntity.ok(updatedUser);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	// This endpoint is used to delete a user from the server
	@DeleteMapping("/{userId}")
	public String deleteUser(@PathVariable String userId) {
		userService.deleteUserFromDB(userId);
		return "User with ID " + userId + " has been deleted successfully.";

	}
}
