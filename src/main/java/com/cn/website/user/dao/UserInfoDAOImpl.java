package com.cn.website.user.dao;

import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Property;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.cn.website.common.bean.ComUserInfo;
import com.cn.website.common.dao.impl.BaseDaoSupportImpl;
import com.cn.website.user.bean.UserInfo;


@Repository("userInfoDAO")
public class UserInfoDAOImpl extends BaseDaoSupportImpl implements UserInfoDAO {
	
	@Override
	public UserInfo getUser(String username,String password) {
		Session session = currentSession();
/*		UserInfo info = (UserInfo) session.createCriteria(UserInfo.class)
				.add(Property.forName("mobile").eq("13779997332"))
				//.add(Property.forName("password").eq(password))
			    .uniqueResult();
		ComUserInfo cinfo = session.get(ComUserInfo.class, 37l);*/
		DetachedCriteria query = DetachedCriteria.forClass(UserInfo.class)
				.add(Property.forName("username").eq(username))
				.add(Property.forName("password").eq(password));
		UserInfo info = (UserInfo) query.getExecutableCriteria(session).uniqueResult();
		return info;
	}
	
}
