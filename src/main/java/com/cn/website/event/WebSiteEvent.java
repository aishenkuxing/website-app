package com.cn.website.event;

import org.springframework.context.ApplicationEvent;
/**
 * 站点监听器 发布订阅新号
 * @author Administrator
 *
 */
public class WebSiteEvent extends ApplicationEvent{
	/**
	 * 
	 */
	private static final long serialVersionUID = -7979397144618340964L;
	private String message;
  
	public WebSiteEvent(Object source,String message) {
		super(source);
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
}
