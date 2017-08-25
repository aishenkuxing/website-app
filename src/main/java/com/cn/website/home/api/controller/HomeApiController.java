package com.cn.website.home.api.controller;

import java.io.IOException;

import org.apache.http.client.ClientProtocolException;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cn.website.common.entity.MessageNotice;
import com.cn.website.home.pojo.ContactWayPojo;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/home")
public class HomeApiController {
 
	 @RequestMapping(value="saveContactWay" , method = RequestMethod.POST)
	 @ApiOperation(value = "代理接口", httpMethod = "Post", notes = "代理接口",tags="主页接口设计")
	 public MessageNotice saveContactWay(ContactWayPojo contactWay){ 
		 MessageNotice notice = new MessageNotice();
		 
		 
		 return notice;
	 }
	
}
