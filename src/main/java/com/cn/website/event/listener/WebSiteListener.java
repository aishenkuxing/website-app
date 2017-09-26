package com.cn.website.event.listener;

import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.cn.website.event.WebSiteEvent;

//监听 WebSiteEvent 发布模式
@Component("webSiteListener")
public class WebSiteListener implements ApplicationListener<WebSiteEvent>{
	
	public void onApplicationEvent(WebSiteEvent event) {
        System.out.println("event:" + event.getMessage());
    }
}
