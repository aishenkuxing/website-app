package com.cn.website.common.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Property;
import org.springframework.stereotype.Repository;

import com.cn.website.common.bean.ComUserInfo;
import com.cn.website.common.dao.CompanyDao;
import com.cn.website.config.bean.CompanyDataSource;
import com.cn.website.user.bean.UserInfo;

@Repository("companyDaoImpl")
public class CompanyDaoImpl extends BaseDaoSupportImpl  implements CompanyDao  {

	@Override
	public List<CompanyDataSource> getCompanyDataSource() {	
		Session session =centerHbernateTemplate.getSessionFactory().openSession();
		List<CompanyDataSource> lis =  session.createQuery("from db_company_datasource where 1=1",CompanyDataSource.class).getResultList();
		//DetachedCriteria query = DetachedCriteria.forClass(CompanyDataSource.class);
		//List lis = query.getExecutableCriteria(session).list();
		session.close();
		return lis;
	}

}
