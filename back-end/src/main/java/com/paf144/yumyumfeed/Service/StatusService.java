package com.paf144.yumyumfeed.Service;

import java.util.ArrayList;

import com.paf144.yumyumfeed.Entity.Comments;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paf144.yumyumfeed.Entity.Status;
import com.paf144.yumyumfeed.Repository.StatusRepo;

@Service
public class StatusService {

	@Autowired
	StatusRepo statusRepo;
	
	@Autowired
	UserService userService;
	
	public Status submitDataIntoDB(Status status) {
		return statusRepo.save(status);
	}
	
	public ArrayList<Status> retrieveStatus(){
		
		ArrayList<Status> statusList=statusRepo.findAll();
		
		for(int i=0;i<statusList.size();i++) {
			Status statusItem=statusList.get(i);
			statusItem.setUserName(userService.displayUserMetaData(statusItem.getUserId()).getUserName());
		}
		
		return statusList;
	}

	public ArrayList<Status> deleteStatusFromDB(String statusId) {
		try {
			Status status = statusRepo.findByStatusId(statusId);
			statusRepo.delete(status);
			return null;
		} catch (Exception e) {
			return null;
		}
	}
}
