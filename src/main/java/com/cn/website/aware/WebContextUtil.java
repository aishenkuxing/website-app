package com.cn.website.aware;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.ChildBeanDefinition;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;

import com.cn.website.common.service.impl.HomeServiceImpl2;

/**
 * 获取ApplicationContextAware 上下文织入
 * 
 * @author Administrator
 *
 */
@Component
public class WebContextUtil implements ApplicationContextAware {

	private static AnnotationConfigWebApplicationContext appContext;

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		setAppContext( (AnnotationConfigWebApplicationContext) applicationContext);
	}

	public static AnnotationConfigWebApplicationContext getAppContext() {
		return appContext;
	}

	public static void setAppContext(AnnotationConfigWebApplicationContext appContext) {
		WebContextUtil.appContext = appContext;
	}

	public static Object getBean(String paramString) {
		return appContext.getBean(paramString);
	}

	/**
	 * 1.配置文件的位置固�? 2.配置文件中bean的名字已�?
	 * 
	 * @param configLocationString
	 */

	public void registBean(String beanName, String parentName) {
		DefaultListableBeanFactory fcy = (DefaultListableBeanFactory) appContext
				.getAutowireCapableBeanFactory();
		BeanDefinition beanDefinition = new ChildBeanDefinition(parentName);
		fcy.registerBeanDefinition(beanName, beanDefinition);
	}

}
