package com.cn.website.config.mybatisconfig;

import javax.sql.DataSource;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/***
 * 
 * Mybatis 配置信息
 * @author hjc
 *
 */
@Configuration
public class MyBatisConfig {

	@Bean(name = "myBatisSqlSessionFactory")
	public SqlSessionFactoryBean sqlSessionFactory(DataSource dataSource){
		SqlSessionFactoryBean myBatisSqlSessionFactory = new SqlSessionFactoryBean();
		myBatisSqlSessionFactory.setDataSource(dataSource);
		return myBatisSqlSessionFactory;
	}
	
	
	@Bean(name = "myBatisTest")
	@Autowired
	public String  myBatisTest(SqlSessionFactoryBean myBatisSqlSessionFactory){
		return "";
	}
}
