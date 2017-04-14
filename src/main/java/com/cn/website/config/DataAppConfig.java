package com.cn.website.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
/***
 * 
 * @author hjc
 * 加载数据库数据源文件
 *
 */
@Configuration
@PropertySources(value = { @PropertySource(value = { "classpath:configs/db/applicationDataSource.properties" }) })
public class DataAppConfig {
	@Autowired
	private Environment env;
	
	private String url ;
	
	private String username;
	
	private String password;
	
	private String driver;
	
	/**
	 * 配置主连接变量
	 * @return
	 */
	@Bean(name="dataSource")
	public DataSource dataSource(){
		url = env.getProperty("datasource.connection.url");
		
		username = env.getProperty("datasource.connection.username");
		
		password = env.getProperty("datasource.connection.password");
		
		driver =env.getProperty("datasource.connection.driver_class");
		
		DriverManagerDataSource dataSource = new DriverManagerDataSource(url, username, password);
		
		
		dataSource.setDriverClassName(driver);
		
		
//		synchronized (dataSource) {
//			
//		}
		return dataSource;
	}
}
