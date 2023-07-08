package com.paf144.yumyumfeed.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paf144.yumyumfeed.Entity.Users;
import com.paf144.yumyumfeed.Repository.UserRepo;

import java.util.ArrayList;

@Service
public class UserService {

	@Autowired
	UserRepo userRepo;
	
	public Users submitMetaDataOfUser(Users user) {
		return userRepo.save(user);
	}
	
	public Users displayUserMetaData(String userid) {
		return userRepo.findByUserId(userid);
	}


	public Users updateUserMetaData(String userId, Users newUserDetails) {
		Users user = userRepo.findByUserId(userId);
		if (user != null) {
			user.setUserName(newUserDetails.getUserName());
			user.setName(newUserDetails.getName());
			user.setGender(newUserDetails.getGender());
			user.setBirthday(newUserDetails.getBirthday());
			user.setCity(newUserDetails.getCity());
			user.setProfileImage(newUserDetails.getProfileImage());
			return userRepo.save(user);
		}
		return null;
	}

	public ArrayList<Users> deleteUserFromDB(String UserId) {
		try {
			Users user = userRepo.findByUserId(UserId);
			userRepo.delete(user);
			return null;
		} catch (Exception e) {
			return null;
		}
	}
}
