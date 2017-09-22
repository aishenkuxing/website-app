package com.cn.website.common.service.impl;

import java.util.List;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.cn.website.common.auth.TransactionAuth;
import com.cn.website.common.auth.annotation.TransactionType;
import com.cn.website.common.bean.ComUserInfo;
import com.cn.website.common.dao.UserCenterDao;
import com.cn.website.common.entity.Student;
import com.cn.website.common.service.HomeService;
import com.cn.website.user.bean.UserInfo;
import com.cn.website.user.dao.UserInfoDAO;

@Service("homeServiceImpl")
@Transactional(value ="txManager")
@Scope(value = "prototype", proxyMode = ScopedProxyMode.DEFAULT)
public class HomeServiceImpl implements HomeService {

	@Autowired(required=true)
	private Student student;
	
	@Autowired
	@Qualifier("userCenterDaoImpl")
	private UserCenterDao userCenterDaoImpl;
	
	@Autowired
	private UserInfoDAO userInfoDAO;
	
//	@Autowired(required=true)
//	@Qualifier("sessionFactory")
//	private SessionFactory sessionFactory;
	
	@PostConstruct
	public void populateMovieCache() {
	 System.out.println("@PostConstruct");
	}
	
	@PreDestroy
	public void clearMovieCache() {
		 System.out.println("@PreDestroy");
	}

	
	@Override
	public void defaultMethod() {
		
	}
	
	@Override
	public String getVersion() {
		ComUserInfo userInfo= new ComUserInfo();
		userInfo.setName("李连杰");
		userInfo.setUserName("lilianjie");
		userInfo.setPassword("12345611");
		userCenterDaoImpl.save(userInfo);
		System.out.println(userInfo.getId());
		return "1.0.1";
	}

	@Override
	public ComUserInfo getUserInfo(long id) {
		return userCenterDaoImpl.get(id);
	}
	
	@Override
	public List<ComUserInfo> getUserInfoList(ComUserInfo info){
		 return userCenterDaoImpl.getUserInfoList(info);
	 }
	
	
	@Override
	public UserInfo checkUser(String username,String password){
		UserInfo userInfo = userInfoDAO.getUser(username, password);
    	return userInfo;
	}
}
