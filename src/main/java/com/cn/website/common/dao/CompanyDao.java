package com.cn.website.common.dao;

import java.util.List;

import com.cn.website.config.bean.CompanyDataSource;

public interface CompanyDao  extends BaseDaoSupport{
	//查询中心库所有链接信息
	public List<CompanyDataSource> getCompanyDataSource();
}
