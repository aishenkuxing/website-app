package com.cn.website.common.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cn.website.common.service.CompanyService;
import com.cn.website.config.bean.CompanyDataSource;

import io.swagger.annotations.Api;

@RequestMapping("api/common/config")
@RestController
@Api(value = "公司组件")
public class CommonConfigApiController {
	
	@Autowired
	@Qualifier(value ="companyServiceImpl")
	private CompanyService companyServiceImpl;
	
	@RequestMapping(value = "getCompanyDataSource",method = RequestMethod.GET)
	public List<CompanyDataSource> getCompanyDataSource(){
		List<CompanyDataSource> lis = new ArrayList<CompanyDataSource>();
		lis = companyServiceImpl.getCompanyDataSource();
		return lis;
	}
}
