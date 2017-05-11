package com.cn.website.common.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cn.website.common.bean.MobileVersion;
import com.cn.website.mcxs.bean.GoodInfo;
import com.cn.website.test.util.HelloClass;

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
			return mv;
		}
	   
	    @RequestMapping("getGoodInfo")
		@ApiOperation(value = "获取商品信息接口", httpMethod = "GET", notes = "获取商品信息接口",tags="0.01版本组件")
		public long getGoodInfo(int goodId){
	    	GoodInfo goodinfo= new GoodInfo(); 
	    	return goodinfo.getId();
	    	//return null;
		}
}
