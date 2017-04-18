package com.cn.website.common.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Property;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.cn.website.common.bean.ComUserInfo;
import com.cn.website.common.dao.UserCenterDao;

@Repository("userCenterDaoImpl")
public class UserCenterDaoImpl extends BaseDaoSupportImpl  implements UserCenterDao  {
	
//	@Autowired
//	private SessionFactory sessionFactory;
	
	
	// Session session = currentSession();
	 
	 @Override
	 public void save(ComUserInfo info){
		Session session = currentSession();
		session.save(info);
	 }

	@Override
	public ComUserInfo get(long id) {
		Session session = currentSession();
		ComUserInfo info = session.get(ComUserInfo.class, id);
		//UserInfo crit = (UserInfo) session.createCriteria(UserInfo.class);
		return info;
	}
	
	@Override
	public List<ComUserInfo> getUserInfoList(ComUserInfo info) {
		DetachedCriteria query = DetachedCriteria.forClass(ComUserInfo.class).add(Property.forName("userName").eq("lilianjie"));
		Session session = currentSession();
		List results = query.getExecutableCriteria(session).setFirstResult(0).setMaxResults(2).list();
		return results;
	}
	
	
	
}
