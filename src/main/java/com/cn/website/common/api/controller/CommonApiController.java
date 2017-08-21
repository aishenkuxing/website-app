package com.cn.website.common.api.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.apache.commons.lang3.StringUtils;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.cn.website.common.auth.PermissionAuth;
import com.cn.website.common.auth.annotation.PermissionType;
import com.cn.website.common.bean.ComUserInfo;
import com.cn.website.common.entity.MessageNotice;
import com.cn.website.common.entity.MessageObject;
import com.cn.website.common.service.HomeService;
import com.cn.website.common.util.Endecrypt;
import com.cn.website.common.util.IpAddrUtil;
import com.cn.website.user.bean.UserInfo;
import com.google.gson.JsonObject;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/common")
public class CommonApiController {
	@Autowired
	private HomeService homeServiceImpl;
	
	
	/**
	 * 采用file.Transto 来保存上传的文件
	 * @param file 文件流
	 * @param filepath 文件路径
	 * @param filename 文件名称
	 * @return
	 * @throws IOException
	 */
	@RequestMapping("fileUpload")
	@ApiOperation(value = "文件上传", httpMethod = "POST", notes = "首页入口",tags="上传组件")
	public MessageNotice fileUpload(@RequestParam("file") CommonsMultipartFile file,@RequestBody String filepath,@RequestBody String filename,HttpServletRequest request) throws IOException { 
		MessageNotice message = new MessageNotice();
		//用来检测程序运行时间
	    // long  startTime=System.currentTimeMillis();
	    //System.out.println("fileName："+file.getOriginalFilename());
		//request.
		//String path = this.getClass().getResource("/").getPath();
        try {
        	String localFilepath = "C:/fileupload/"+filepath+"/" + filename + file.getOriginalFilename();
        	
        	File localFile = new File(localFilepath);  
        	
        	file.transferTo(localFile);
         
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
//        long  endTime=System.currentTimeMillis();
//        System.out.println("方法一的运行时间："+String.valueOf(endTime-startTime)+"ms");
        // return "/success"; 
		 
		 return message;
	}
	
	
	 @PermissionAuth(role = PermissionType.ADMIN)
	 @RequestMapping("getRequest")
	 @ApiOperation(value = "代理接口", httpMethod = "GET", notes = "代理接口",tags="测试组件")
	 public MessageNotice getRequest(String msg) throws ClientProtocolException, IOException{ 
		 MessageNotice message = new MessageNotice(2,msg);
		 //HttpClient httpclient = new DefaultHttpClient(); 
		
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
	   if(StringUtils.isNotBlank(ip)){
		   String mac = IpAddrUtil.getMACAddress(ip);
		   message.setMessage("ip:"+ip+",mac:" + mac);
	   }
	    
	   return message;
   }
   
   @RequestMapping("getUserInfo")
   @ApiOperation(value = "根据id获取人员信息", httpMethod = "GET",notes = "根据id获取人员信息",tags="测试组件")
   public MessageObject<ComUserInfo> getUserInfo(@RequestParam(value = "id")long id,HttpServletRequest request){
	   MessageObject<ComUserInfo> msg = new MessageObject<ComUserInfo>();
	   msg.setCode(1);
	   msg.setData(homeServiceImpl.getUserInfo(id));
	   return msg;
   }
   
   @RequestMapping("getUserInfoList")
   @ApiOperation(value = "根据信息获取人员信息", httpMethod = "GET",notes = "根据id获取人员信息",tags="测试组件")
   public MessageObject<List<ComUserInfo>> getUserInfoList(@RequestParam(value = "id")long id,HttpServletRequest request){
	   ComUserInfo info = new ComUserInfo();
	   info.setId(id);
	   MessageObject<List<ComUserInfo>> msg = new MessageObject<List<ComUserInfo>>();
	   msg.setCode(1);
	   msg.setData(homeServiceImpl.getUserInfoList(info));
	   return msg;
   }
   
	 @RequestMapping("checkUser")
	 @ApiOperation(value = "校验密码登入", httpMethod = "GET",notes = "校验密码登入",tags="获取用户")
	public MessageObject<JsonObject> checkUser(@RequestParam String username,@RequestParam String password,HttpServletRequest request,HttpServletResponse response){
		 JsonObject json = new JsonObject();
		 json.addProperty("username", username);
		 json.addProperty("password", password);
		 
		 username = Endecrypt.getSiteEncrypt(username);
		 password = Endecrypt.getSiteEncrypt(password);
		 MessageObject<JsonObject> mo =new MessageObject<JsonObject>();
		 UserInfo userInfo = homeServiceImpl.checkUser(username, password);
		 if(userInfo!=null){
			mo.setCode(1);
			//mo.setData(userInfo.getId());
			
			String cartCookie =json.toString();//Cart转换成对象Json  
		    Cookie cookie = new Cookie("UserBaseInfo",cartCookie);  
		    cookie.setMaxAge(60*60*24*7);//保留7天 
		    System.out.println(cartCookie);
		    response.addCookie(cookie);  
		 }
		 System.out.println(username);
		 System.out.println(password);
		 return mo;
	};
}
