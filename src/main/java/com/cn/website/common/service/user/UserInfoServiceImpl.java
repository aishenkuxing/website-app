package com.cn.website.common.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.cn.website.common.bean.user.Userinfo;
import com.cn.website.common.dao.user.UserInfoDAO;

@Repository("userInfoServiceImpl")
public class UserInfoServiceImpl implements  UserInfoService{
	
	@Autowired
	private UserInfoDAO userInfoDAO;
    public long CheckUser(String username ,String password){
    	Userinfo userInfo = userInfoDAO.getUser(username, password);
    	if(userInfo == null){
    		return 0;
    	}
    	return userInfo.getId();
    }
}
