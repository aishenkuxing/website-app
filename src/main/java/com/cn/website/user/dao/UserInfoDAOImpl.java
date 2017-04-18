package com.cn.website.user.dao;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.cn.website.common.dao.impl.BaseDaoSupportImpl;
import com.cn.website.user.bean.UserInfo;


@Repository("userInfoDAO")
public class UserInfoDAOImpl extends BaseDaoSupportImpl implements UserInfoDAO {
	
	@Override
	public UserInfo getUser(String username,String password) {
		Session session = currentSession();
		UserInfo info =  session.createQuery("select * from user_info where username = :username and  password = :password ",UserInfo.class)
				.setParameter( "username", username )
				.setParameter( "password", password ).getSingleResult();
		return info;
	}
	
}
