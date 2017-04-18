package com.cn.website.common.dao.user;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.cn.website.common.bean.user.Userinfo;
import com.cn.website.common.dao.impl.BaseDaoSupportImpl;


@Repository("userInfoDAOImpl")
public class UserInfoDAOImpl extends BaseDaoSupportImpl implements UserInfoDAO {
	
	@Override
	public Userinfo getUser(String username,String password) {
		Session session = currentSession();
		Userinfo info =  session.createQuery("select * from user_info where username = :username and  password = :password ",Userinfo.class)
				.setParameter( "username", username )
				.setParameter( "password", password ).getSingleResult();
		return info;
	}
	
}
