package com.cn.website.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cn.website.user.bean.UserInfo;
import com.cn.website.user.dao.UserInfoDAO;

@Service("userInfoService")
@Transactional
public class UserInfoServiceImpl implements UserInfoService {
	
	@Autowired
	private UserInfoDAO userInfoDAO;
	
	@Override
	public UserInfo checkUser(String username,String password){
		UserInfo userInfo = userInfoDAO.getUser(username, password);
    	return userInfo;
	}
}
