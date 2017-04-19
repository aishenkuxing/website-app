package com.cn.website.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.jdbc.datasource.lookup.DataSourceLookup;

import com.sun.xml.bind.v2.runtime.output.StAXExStreamWriterOutput;
/***
 * 
 * @author hjc
 * 加载数据库数据源文件
 *
 */
@Configuration
@PropertySources(value = { @PropertySource(value = { "classpath:configs/db/applicationDataSource.properties" }) })
public class DataAppConfig  {
	@Autowired
	private Environment _env;
	
	private String _url ;
	
	private String _username;
	
	private String _password;
	
	private String _driver;
	

	
	/**
	 * 配置主连接变量
	 * @return
	 */
	@Bean(name="dataSource")
	public DataSource dataSource(){
		_url = _env.getProperty("datasource.connection.url");
		
		_username = _env.getProperty("datasource.connection.username");
		
		_password = _env.getProperty("datasource.connection.password");
		
		_driver =_env.getProperty("datasource.connection.driver_class");
		
		DriverManagerDataSource dataSource = new DriverManagerDataSource(_url, _username, _password);
		
		
		dataSource.setDriverClassName(_driver);
		
//		synchronized (dataSource) {
//			
//		}
		return dataSource;
	}
	
	/***
	 * 测试集群 连接数据库 集合
	 * @return
	 */
	public DataSource dataSourceTest(){
		Properties pro = new Properties();//hibernate 配置属性集合对象 
		InputStream  inStream=this.getClass().getClassLoader().getResourceAsStream("configs/hibernate/hibernate-test.properties");
		try {
			pro.load(inStream);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		_url = pro.getProperty("hibernate.connection.url");
		
		_username = pro.getProperty("hibernate.connection.username");
		
		_password = pro.getProperty("hibernate.connection.password");
		
		_driver =pro.getProperty("hibernate.connection.driver_class");
		
		DriverManagerDataSource dataSource = new DriverManagerDataSource(_url, _username, _password);
		
		dataSource.setDriverClassName(_driver);

		return dataSource;
	}
	
	
	/***
	 * 设置动态数据源
	 * @param dataSource 默认入口
	 * @param targetDataSources 入口连接 集合
	 * @return
	 */
	@Bean(name = "dynamicDataSource")
	@Resource
	@Lazy
	public DynamicDataSource dynamicDataSource(DataSource dataSource){
		Map<Object, Object> dataSources= new HashMap<Object, Object>();
		dataSources.put("dataSource", dataSource);
		/***
		 * 添加集合数据源 其他集合
		 */
		{
			dataSources.put("dataSourceTest", dataSourceTest());
		}
		DynamicDataSource dynamicDataSource= new DynamicDataSource();
		dynamicDataSource.setTargetDataSources(dataSources);
		dynamicDataSource.setDefaultTargetDataSource(dataSource);
		return dynamicDataSource;
	}
	
}
