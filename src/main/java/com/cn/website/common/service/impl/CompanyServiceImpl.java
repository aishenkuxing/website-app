package com.cn.website.common.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cn.website.common.dao.CompanyDao;
import com.cn.website.common.service.CompanyService;
import com.cn.website.config.bean.CompanyDataSource;

@Service("companyServiceImpl")
@Transactional(value="centerTxManager")
public class CompanyServiceImpl implements CompanyService {
	
	@Autowired
	@Qualifier("companyDaoImpl")
	private CompanyDao companyDaoImpl;
	
	@Override
	public List<CompanyDataSource> getCompanyDataSource() {
		return companyDaoImpl.getCompanyDataSource();
	}

}
