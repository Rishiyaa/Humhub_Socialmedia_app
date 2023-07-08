package com.paf144.yumyumfeed.Entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.jetbrains.annotations.NotNull;

@Entity(name="Users")
public class Users {

	@Id
	@GeneratedValue
	private int id;
	
	@NotNull
	private String userId;
	private String userName;
	private String name;

	private String gender;
	private String city;
	private String birthday;
	private String profileImage;
	
	public Users() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Users(int id, String userId, String userName, String name,String gender,String birthday,String city, String profileImage) {
		super();
		this.id = id;
		this.userId = userId;
		this.userName = userName;
		this.name = name;
		this.gender = gender;
		this.birthday = birthday;
		this.city = city;
		this.profileImage = profileImage;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getBirthday() {
		return birthday;
	}
	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getProfileImage() {
		return profileImage;
	}
	public void setProfileImage(String profileImage) {
		this.profileImage = profileImage;
	}
}
