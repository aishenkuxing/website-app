package com.cn.website.config;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.apache.log4j.Logger;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import com.cn.website.common.util.FileUtil;
import com.google.gson.JsonObject;

/***
 * 
 * @author hjc 加载数据库数据源文件
 *
 */
@Configuration
@PropertySources(value = { @PropertySource(value = { "classpath:configs/db/applicationDataSource.properties" }) })
public class DataAppConfig {
	Logger log =Logger.getLogger(DataAppConfig.class);
	
	@Autowired
	private Environment _env;

	private String _url;

	private String _username;

	private String _password;

	private String _driver;

	private JSONArray _dataSourcesJsonArr;

	/**
	 * 配置主连接变量
	 * 
	 * @return
	 */
	@Bean(name = "dataSource")
	public DataSource dataSource() {
		_url = _env.getProperty("datasource.connection.url");

		_username = _env.getProperty("datasource.connection.username");

		_password = _env.getProperty("datasource.connection.password");

		_driver = _env.getProperty("datasource.connection.driver_class");

		DriverManagerDataSource dataSource = new DriverManagerDataSource(_url, _username, _password);

		dataSource.setDriverClassName(_driver);

		return dataSource;
	}

	/***
	 * 测试集群 连接数据库 集合
	 * 
	 * @return
	 */
	protected DataSource dataSourceTest() {
		Properties pro = new Properties();// hibernate 配置属性集合对象
		InputStream inStream = this.getClass().getClassLoader()
				.getResourceAsStream("configs/hibernate/hibernate-test.properties");
		try {
			pro.load(inStream);
		} catch (IOException e) {
			e.printStackTrace();
		}

		_url = pro.getProperty("hibernate.connection.url");

		_username = pro.getProperty("hibernate.connection.username");

		_password = pro.getProperty("hibernate.connection.password");

		_driver = pro.getProperty("hibernate.connection.driver_class");

		DriverManagerDataSource dataSource = new DriverManagerDataSource(_url, _username, _password);

		dataSource.setDriverClassName(_driver);

		return dataSource;
	}

	/**
	 * 配置分库信息录入
	 * @param jo
	 * @return
	 */
	protected DataSource JSONObjectToDataSource(JSONObject jo){
		DriverManagerDataSource dataSource = new DriverManagerDataSource(jo.optString("url", ""),jo.optString("username", "") ,jo.optString("password", "") );
		dataSource.setDriverClassName(jo.optString("driver", ""));
		return dataSource;
		
	}
	
	/**
	 * 注册分库信息
	 */
	protected void registDataSource(Map<Object, Object> dataSources){
		_dataSourcesJsonArr = FileUtil.readJSONArray("configs/db/datasource.json");
		for (int i = 0 ;i<_dataSourcesJsonArr.length() ;i++) {
			try {
				JSONObject jo =   _dataSourcesJsonArr.getJSONObject(i);
				if(jo.get("datasource-name")!=null) {
					DataSource dataSource = JSONObjectToDataSource(jo);
					dataSources.put(jo.get("datasource-name"), dataSource);
				}
				System.out.println(jo);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	/***
	 * 设置动态数据源，动态注入
	 * 
	 * @param dataSource
	 *           主库数据源信息
	 * @return
	 */
	@Bean(name = "dynamicDataSource")
	@Resource
	@Lazy
	public DynamicDataSource dynamicDataSource(DataSource dataSource) {
		log.debug("启动------数据库注入");
		Map<Object, Object> dataSources = new HashMap<Object, Object>();
		dataSources.put("dataSource", dataSource);
		registDataSource(dataSources);
		/***
		 * 添加集合数据源 其他集合
		 */
		{
			dataSources.put("dataSourceTest", dataSourceTest());
		}
		DynamicDataSource dynamicDataSource = new DynamicDataSource();
		dynamicDataSource.setTargetDataSources(dataSources);
		dynamicDataSource.setDefaultTargetDataSource(dataSource);
		return dynamicDataSource;
	}

}
