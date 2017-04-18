package com.cn.website.common.api.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.apache.http.HttpHost;
import org.apache.http.HttpRequest;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpUriRequest;
import org.apache.http.impl.client.DefaultHttpClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cn.website.common.auth.PermissionAuth;
import com.cn.website.common.auth.annotation.PermissionType;
import com.cn.website.common.bean.ComUserInfo;
import com.cn.website.common.entity.MessageNotice;
import com.cn.website.common.entity.MessageObject;
import com.cn.website.common.service.HomeService;
import com.cn.website.common.util.Endecrypt;
import com.cn.website.common.util.IpAddrUtil;
import com.cn.website.user.bean.UserInfo;
import com.cn.website.user.service.UserInfoService;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/common")
public class CommonApiController {
	@Autowired
	private HomeService homeServiceImpl;
	
	
	 @PermissionAuth(role = PermissionType.ADMIN)
	 @RequestMapping("getRequest")
	 @ApiOperation(value = "代理接口", httpMethod = "GET", notes = "代理接口",tags="测试组件")
	 public MessageNotice getRequest(String msg) throws ClientProtocolException, IOException{ 
		 MessageNotice message = new MessageNotice(2,msg);
		 HttpClient httpclient = new DefaultHttpClient(); 
		
		// httpclient.execute(HttpHost.create("http://192.168.245.120:831/api/common/index"));

		 //httpclient.execute(uriRequest);
		 return message;
	 }
	
	
   @Cacheable("message")
   @RequestMapping("index")
   @ApiOperation(value = "首页入口", httpMethod = "GET", notes = "首页入口",tags="测试组件")
   public MessageNotice index(String msg,HttpServletRequest request){ 
	
	   homeServiceImpl.getVersion();
	   MessageNotice message = new MessageNotice(1,msg);
	   String ip = IpAddrUtil.getIpAddr(request);
	   
	   if(ip!=""){
		   String mac = IpAddrUtil.getMACAddress(ip);
		   message.setMessage("ip:"+ip+",mac:" + mac);
	   }
	    
	   return message;
   }
   
   @RequestMapping("getUserInfo")
   @ApiOperation(value = "根据id获取人员信息", httpMethod = "GET",
   	notes = "根据id获取人员信息",tags="测试组件")
   public MessageObject<ComUserInfo> getUserInfo(@RequestParam(value = "id")long id,HttpServletRequest request){
	   MessageObject<ComUserInfo> msg = new MessageObject<ComUserInfo>();
	   msg.setCode(1);
	   msg.setData(homeServiceImpl.getUserInfo(id));
	   return msg;
   }
   
   @RequestMapping("getUserInfoList")
   @ApiOperation(value = "根据信息获取人员信息", httpMethod = "GET",
   	notes = "根据id获取人员信息",tags="测试组件")
   public MessageObject<List<ComUserInfo>> getUserInfoList(@RequestParam(value = "id")long id,HttpServletRequest request){
	   ComUserInfo info = new ComUserInfo();
	   info.setId(id);
	   MessageObject<List<ComUserInfo>> msg = new MessageObject<List<ComUserInfo>>();
	   msg.setCode(1);
	   msg.setData(homeServiceImpl.getUserInfoList(info));
	   return msg;
   }
   
	 @RequestMapping("checkUser")
	 @ApiOperation(value = "校验密码登入", httpMethod = "GET",
	   	notes = "校验密码登入",tags="获取用户")
	 
	public MessageObject<Long> checkUser(@RequestParam String username,@RequestParam String password,HttpServletRequest request,HttpServletResponse response){
		 
		 username = Endecrypt.getSiteEncrypt(username);
		 password = Endecrypt.getSiteEncrypt(password);
		 MessageObject<Long> mo =new MessageObject<Long>();
		 UserInfo userInfo = homeServiceImpl.checkUser(username, password);
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
