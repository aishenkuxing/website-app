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

@Scope(value = "prototype", proxyMode = ScopedProxyMode.DEFAULT)
@Transactional(value ="txManager")
public class HomeServiceImpl2 implements HomeService {
	
	@Autowired
	@Qualifier("userCenterDaoImpl")
	private UserCenterDao userCenterDaoImpl;
	
//	@Autowired(required=true)
//	@Qualifier("sessionFactory")
//	private SessionFactory sessionFactory;

	
	@Override
	public void defaultMethod() {
		
	}
	
	@Override
	public String getVersion() {
		System.out.println("李赊借");
		return "1.0.1";
	}

	@Override
	public ComUserInfo getUserInfo(long id) {
		System.out.println("李赊借");
		return userCenterDaoImpl.get(id);
	}
	
	@Override
	public List<ComUserInfo> getUserInfoList(ComUserInfo info){
		System.out.println("李赊借");
		 return userCenterDaoImpl.getUserInfoList(info);
	 }

	@Override
	public UserInfo checkUser(String username, String password) {
		// TODO Auto-generated method stub
		return null;
	}

}
