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
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;

import com.cn.website.common.auth.WebSiteAnnotation;
import com.cn.website.config.DynamicDataSource;


@Configuration
@PropertySources(value = { @PropertySource(value = { "classpath:configs/hibernate/hibernate.properties" }) })
@WebSiteAnnotation.WebEntityScan({
	"com.cn.website.*.bean",
	"com.cn.website.*.bean.*"
	})
public class HibernateConfig {
	
	@Autowired
	private Environment env;
	
	private String url ;
	
	private String username;
	
	private String password;
	
	private String driver;
	
//	/**
//	 * 注解配置事物管理器
//	 * @param dataSource
//	 * @return
//	 */
//	@Bean(name="txManager")
//	@Autowired
//	public DataSourceTransactionManager dataSourceTransactionManager(@Qualifier("dataSource") DataSource dataSource){
//		DataSourceTransactionManager txManager= new  DataSourceTransactionManager();
//		txManager.setDataSource(dataSource);
//		return txManager;
//	}
	
	@Bean(name="hibernateConfigMap")
	public Map<String, String> hibernateConfigMap(){
		Map<String,String> map= new HashMap<String,String>();
		return map;
	}
	
	/**
	 * 配置hibernate 连接池 和SessionFactory
	 * @param dataSource
	 * @return
	 */
	@Bean(name="localSessionFactoryBean")
	@Autowired
	public LocalSessionFactoryBean localSessionFactoryBean( DynamicDataSource dynamicDataSource){
		LocalSessionFactoryBean localSessionFactoryBean=new LocalSessionFactoryBean();
		localSessionFactoryBean.setDataSource(dynamicDataSource);
		
		//扫描注解 并取得 扫描到的加载bean文件路径
		WebSiteAnnotation.WebEntityScan webEntryScan = HibernateConfig.class.getAnnotation(WebSiteAnnotation.WebEntityScan.class);	
		
		Properties pro = new Properties();//hibernate 配置属性集合对象 
		InputStream  inStream=this.getClass().getClassLoader().getResourceAsStream("configs/hibernate/hibernate.properties");
		try {
			pro.load(inStream);
			localSessionFactoryBean.setHibernateProperties(pro);
		} catch (IOException e) {
			e.printStackTrace();
		}
		/**
		 * 扫描Bean路径
		 */
		 if(webEntryScan!=null&&webEntryScan.value()!=null){
			 
			String[] scanEntity = webEntryScan.value();
			
			localSessionFactoryBean.setPackagesToScan(scanEntity);
			
//			for (String str : scanStr) {
//				/***
//				 * 加载hibernate的 bean目录
//				 * 并且带有Entity 注解
//				 */
//				Set<Class<?>> setClass= ClassScaner.scan(str, Entity.class);
//				for (Class<?> class1 : setClass) {
//					//System.out.println(class1.getName());
//					localSessionFactoryBean.setAnnotatedClasses(class1);
//				}
//				
		
//			}
		 } 
		return localSessionFactoryBean;
	}
	
	
	/**
	 * 注解配置Hibernate事物管理器
	 * @param sessionFactory
	 * @return
	 */
	@Bean(name="txManager")
	@Autowired
	public HibernateTransactionManager transactionManager(SessionFactory sessionFactory){
		HibernateTransactionManager hibernateTransactionManager = new HibernateTransactionManager(sessionFactory);
		return hibernateTransactionManager;
	}
}
