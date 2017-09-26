package com.cn.website.event.pbulish;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import com.cn.website.event.WebSiteEvent;
/**
 * 发布消息模式
 * @author Administrator
 *
 */
@Component("websiteEventPbulish")
public class WebsiteEventPbulish {
	 @Autowired
    ApplicationContext context;
    public void publish(String message) {
        context.publishEvent(new WebSiteEvent(this, message));
    }
}
