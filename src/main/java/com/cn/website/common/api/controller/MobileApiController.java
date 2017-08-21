package com.cn.website.common.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;

import com.cn.website.common.bean.MobileVersion;
import com.cn.website.common.service.HomeService;
import com.cn.website.mcxs.bean.GoodsInfo;

import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/mobile")
public class MobileApiController {
	
	@Autowired
	private ThreadPoolTaskExecutor  taskExecutor;
	
	@Autowired
	private HomeService homeServiceImpl;
	
	   @RequestMapping("getVersion")
	   @ApiOperation(value = "获取软件版本号信息", httpMethod = "GET",
	   	notes = "获取软件版本号信息息",tags="手机软件")
	   public MobileVersion getVersion(String appkey,String version){
		    MobileVersion mv =new MobileVersion();
		    System.out.println(appkey);
		    System.out.println(version);
			return mv;
		}
	   @RequestMapping("getTest")
	   public int getTest(@RequestParam(value = "id")long id,HttpServletRequest request){
		   taskExecutor.createThread(new Runnable() {  
			    @Override  
			    public void run() {  
			        // TODO Auto-generated method stub  
			        try {  
			        	//RequestContextHolder.setRequestAttributes(attributes);
			        	homeServiceImpl.getUserInfo(id);
			        } catch (Exception e) {  
			            // TODO Auto-generated catch block  
			            e.printStackTrace();  
			        }  
			    }  
			});
		   return 1;
	   }
}
