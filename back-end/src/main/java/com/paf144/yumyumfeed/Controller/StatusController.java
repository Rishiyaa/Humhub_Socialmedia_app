package com.paf144.yumyumfeed.Controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.paf144.yumyumfeed.Entity.Status;
import com.paf144.yumyumfeed.Service.StatusService;

@CrossOrigin
@RestController
@RequestMapping("/status")
public class StatusController {

	@Autowired
	StatusService statusService;
	
	@PostMapping("")
	private Status submitStatus(@RequestBody Status status) {
		return statusService.submitDataIntoDB(status);
	}
	
	@GetMapping("")
	private ArrayList<Status> getAllStatus(){
		return statusService.retrieveStatus();
	}

	@DeleteMapping("/{statusId}")
	public String deleteStatus(@PathVariable String statusId) {
		statusService.deleteStatusFromDB(statusId);
		return "Comment with ID " + statusId + " has been deleted successfully.";

	}
}
