package com.cn.website.config.hibernateconfig;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;

import com.cn.website.common.auth.WebSiteAnnotation;
import com.cn.website.config.DynamicDataSource;

/**
 * 添加自动装配bean 扫描
 * 
 * @author Administrator
 *
 */
@Configuration
// 装载数据库bean的配置
@WebSiteAnnotation.WebEntityScan({ "com.cn.website.*.bean", "com.cn.website.*.bean.*" })
public class HibernateConfig {

	@Bean(name = "hibernateConfigMap")
	public Map<String, String> hibernateConfigMap() {
		Map<String, String> map = new HashMap<String, String>();
		return map;
	}

	/**
	 * 配置hibernate 连接池 和SessionFactory
	 * 装配中心库配置
	 * @param dataSource
	 * @return
	 */
	@Bean(name = "centerSessionFactory")
	@Resource
	public LocalSessionFactoryBean centerSessionFactory(DataSource dataSource) {

		LocalSessionFactoryBean localSessionFactoryBean = new LocalSessionFactoryBean();

		localSessionFactoryBean.setDataSource(dataSource);
		// 扫描注解 并取得 扫描到的加载bean文件路径
		WebSiteAnnotation.WebEntityScan webEntryScan = HibernateConfig.class
				.getAnnotation(WebSiteAnnotation.WebEntityScan.class);
		// hibernate 配置属性集合对象
		Properties pro = new Properties();
		InputStream inStream = this.getClass().getClassLoader().getResourceAsStream("configs/db/hibernate.properties");
		try {
			pro.load(inStream);
			localSessionFactoryBean.setHibernateProperties(pro);
		} catch (IOException e) {
			e.printStackTrace();
		}
		/**
		 * 扫描Bean路径
		 */
		if (webEntryScan != null && webEntryScan.value() != null) {

			String[] scanEntity = webEntryScan.value();

			localSessionFactoryBean.setPackagesToScan(scanEntity);
		}
		return localSessionFactoryBean;
	}

	/**
	 * 配置hibernate 连接池 和SessionFactory
	 * 装配 分库 配置
	 * @param dataSource
	 * @return
	 */
	@Bean(name = "userSessionFactory")
	@Autowired
	public LocalSessionFactoryBean localSessionFactoryBean(DynamicDataSource dynamicDataSource) {

		LocalSessionFactoryBean localSessionFactoryBean = new LocalSessionFactoryBean();

		localSessionFactoryBean.setDataSource(dynamicDataSource);
		// 扫描注解 并取得 扫描到的加载bean文件路径
		WebSiteAnnotation.WebEntityScan webEntryScan = HibernateConfig.class
				.getAnnotation(WebSiteAnnotation.WebEntityScan.class);
		// hibernate 配置属性集合对象
		Properties pro = new Properties();
		
		InputStream inStream = this.getClass().getClassLoader().getResourceAsStream("configs/db/hibernate.properties");
		try {
			pro.load(inStream);
			localSessionFactoryBean.setHibernateProperties(pro);
		} catch (IOException e) {
			e.printStackTrace();
		}
		/**
		 * 扫描Bean路径
		 */
		if (webEntryScan != null && webEntryScan.value() != null) {

			String[] scanEntity = webEntryScan.value();
			//  加载hibernate的 bean目录 并且带有Entity 
			// for (String str : scanStr) {
			// Set<Class<?>> setClass= ClassScaner.scan(str, Entity.class);
			// for (Class<?> class1 : setClass) {
			// 	localSessionFactoryBean.setAnnotatedClasses(class1);
			// }
			//
			// }
			localSessionFactoryBean.setPackagesToScan(scanEntity);
		}
		return localSessionFactoryBean;
	}

	/**
	 * 注解配置Hibernate事物管理器
	 * 此事务 包含分库的事务处理
	 * @param sessionFactory
	 * @return
	 */
	@Bean(name = "txManager")
	@Autowired
	public HibernateTransactionManager transactionManager(
			@Qualifier("userSessionFactory") SessionFactory sessionFactory) {
		HibernateTransactionManager hibernateTransactionManager = new HibernateTransactionManager(sessionFactory);
		return hibernateTransactionManager;
	}

	/**
	 * 注解配置Hibernate事物管理器
	 * 此事务处理中心库 业务需求
	 * @param sessionFactory
	 * @return
	 */
	@Bean(name = "centerTxManager")
	@Autowired
	public HibernateTransactionManager centerTxManager(
			@Qualifier("centerSessionFactory") SessionFactory sessionFactory) {
		HibernateTransactionManager hibernateTransactionManager = new HibernateTransactionManager(sessionFactory);
		return hibernateTransactionManager;
	}
}
