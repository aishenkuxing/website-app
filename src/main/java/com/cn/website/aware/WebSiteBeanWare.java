package com.cn.website.aware;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import com.cn.website.common.service.HomeService;
import com.cn.website.common.service.impl.HomeServiceImpl2;

@Component
public class WebSiteBeanWare implements BeanFactoryAware {

	public static DefaultListableBeanFactory beanFactory;
	
	@Override
	public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
/*		HomeService homeServiceImpl2 = (HomeService) getBean("homeServiceImpl");
		System.out.println(homeServiceImpl2.getVersion());*/
		setBeanFactory((DefaultListableBeanFactory) beanFactory);
	}

	public static void setBeanFactory(DefaultListableBeanFactory beanFactory) {
		WebSiteBeanWare.beanFactory = beanFactory;
	}

	public BeanFactory getBeanFactory() {
		return beanFactory;
	}
	
	public static Object getBean(String paramString)
	{
	    return beanFactory.getBean(paramString);
    }
}
