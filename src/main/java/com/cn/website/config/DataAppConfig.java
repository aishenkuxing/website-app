package com.cn.website.config;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

import javax.annotation.Resource;
import javax.persistence.Entity;
import javax.sql.DataSource;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.boot.Metadata;
import org.hibernate.boot.MetadataSources;
import org.hibernate.boot.registry.StandardServiceRegistry;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import com.cn.website.common.util.ClassScaner;
import com.cn.website.common.util.FileUtil;
import com.cn.website.config.bean.CompanyDataSource;


/***
 * 
 * @author hjc 加载数据库数据源文件
 *
 */
@Configuration
@PropertySources(value = { @PropertySource(value = { "classpath:configs/db/hibernate-center-db.properties" }) })
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
		_url = _env.getProperty("hibernate.connection.url");

		_username = _env.getProperty("hibernate.connection.username");

		_password = _env.getProperty("datasource.connection.password");

		_driver = _env.getProperty("hibernate.connection.driver_class");

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
	 * 添加中心库连接池设置
	 * @param dataSources
	 */
	@SuppressWarnings("unchecked")
	protected void registDataSourceByHibernate(Map<Object, Object> dataSources){
		StandardServiceRegistry registry = new StandardServiceRegistryBuilder()
				.loadProperties("configs/db/hibernate-center-db.properties")
				.build();
		try {
			MetadataSources metadataSources=new MetadataSources( registry );
			
			Set<Class<?>> setClass= ClassScaner.scan("com.cn.website.config.bean", Entity.class);
			for (Class<?> class1 : setClass) {
				metadataSources.addAnnotatedClass(class1);
			}
			Metadata metadata = metadataSources.buildMetadata();
			SessionFactory sessionFactory = metadata.buildSessionFactory();
			Session session = sessionFactory.openSession();
			List<CompanyDataSource> comDataSources =new ArrayList<CompanyDataSource>();
			try {
				Transaction tran=session.getTransaction();
				tran.begin();
				///查询连接池配置信息
				DetachedCriteria query = DetachedCriteria.forClass(CompanyDataSource.class);
				comDataSources = query.getExecutableCriteria(session).list();
				tran.commit();
			} catch (Exception e) {
				e.printStackTrace();
			}finally{
				session.close();
			}
			/**
			 * 连接池信息添加
			 */
			for (CompanyDataSource companyDataSource : comDataSources) {
				String _dbSourceName = StringUtils.trim(companyDataSource.getDbSourceName());
				String _driver = StringUtils.trim(companyDataSource.getDbDriver());
				if(StringUtils.isNoneEmpty(_dbSourceName,_driver)){
					String _url = companyDataSource.getDbUrl();
					String _username = companyDataSource.getDbUsername();
					String _password = companyDataSource.getDbPassword();
					DriverManagerDataSource dataSource = new DriverManagerDataSource(_url,_username ,_password );
					dataSource.setDriverClassName(_driver);
				}
			}
		}
		catch (Exception e) {
			// The registry would be destroyed by the SessionFactory, but we had trouble building the SessionFactory
			// so destroy it manually.
			StandardServiceRegistryBuilder.destroy( registry );
		}
		finally{
			StandardServiceRegistryBuilder.destroy( registry );
		}
	}
	
	/**
	 * 注册分库信息
	 */
	protected void registDataSource(Map<Object, Object> dataSources){
		_dataSourcesJsonArr = FileUtil.readJSONArray("configs/db/datasource.properties");
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
		/**
		 * 连接中心库获取连接配置
		 */
		{
			registDataSourceByHibernate(dataSources);
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
		/***
		 * 添加集合数据源 其他集合
		 */
		{
			///添加注册数据源
			registDataSource(dataSources);
			dataSources.put("dataSourceTest", dataSourceTest());
		}
		DynamicDataSource dynamicDataSource = new DynamicDataSource();
		dynamicDataSource.setTargetDataSources(dataSources);
		dynamicDataSource.setDefaultTargetDataSource(dataSource);
		return dynamicDataSource;
	}
	
	

}
