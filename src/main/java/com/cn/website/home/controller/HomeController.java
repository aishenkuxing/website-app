package com.cn.website.home.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cn.website.common.service.HomeService;

@Controller
@RequestMapping("home")
public class HomeController {

	@Autowired
	private HomeService homeServiceImpl;
	
	@RequestMapping("index")
	public void index(){
		//System.out.println(111);
	}
	
	@RequestMapping("work")
	public void work(){
		//System.out.println(111);
	}
	
	@RequestMapping("about")
	public void about(){
		//System.out.println(111);
	}
	
	@RequestMapping("blog")
	public void blob(){
		//System.out.println(111);
	}
	
	@RequestMapping("contact")
	public void contact(){
		//System.out.println(111);
	}
	
	@RequestMapping("header")
	public void header(){
		//System.out.println(111);
	}
	
	@RequestMapping("footer")
	public void footer(){
		//System.out.println(111);
	}
	
}
