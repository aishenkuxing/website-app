package com.cn.website.user.api.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.FormParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cn.website.common.entity.MessageObject;
import com.cn.website.common.util.Endecrypt;
import com.cn.website.user.bean.UserInfo;
import com.cn.website.user.service.UserInfoService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/user")
public class UserController {
	 
	@Autowired
	private UserInfoService userInfoService;
	
	 @RequestMapping("checkUser")
	 @ApiOperation(value = "校验密码登入", httpMethod = "GET",
	   	notes = "校验密码登入",tags="获取用户")
	 
	public MessageObject<Long> checkUser(@RequestParam String username,@RequestParam String password,HttpServletRequest request,HttpServletResponse response){
		 
		 username = Endecrypt.getSiteEncrypt(username);
		 password = Endecrypt.getSiteEncrypt(password);
		 MessageObject<Long> mo =new MessageObject<Long>();
		 UserInfo userInfo = userInfoService.checkUser(username, password);
		 if(userInfo!=null){
			 mo.setCode(1);
			 mo.setData(userInfo.getId());
			 //String cartCookie = JSONObject.fromObject(cart).toString();//Cart转换成对象Json  
		   /*  Cookie cookie = new Cookie("UserBaseInfo",cartCookie);  
		     cookie.setMaxAge(60*60*24*7);//保留7天  
		     response.addCookie(cookie);  */
		 }
		 System.out.println(username);
		 System.out.println(password);
		 return mo;
	};
}
