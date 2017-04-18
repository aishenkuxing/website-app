package com.cn.website.common.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cn.website.common.bean.MobileVersion;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/mobile")
public class MobileApiController {
	
	   @RequestMapping("getVersion")
	   @ApiOperation(value = "获取软件版本号信息", httpMethod = "GET",
	   	notes = "获取软件版本号信息息",tags="手机软件")
	   public MobileVersion getVersion(String appkey,String version){
		    MobileVersion mv =new MobileVersion();
		    System.out.println(appkey);
		    System.out.println(version);
			return null;
		}
}
