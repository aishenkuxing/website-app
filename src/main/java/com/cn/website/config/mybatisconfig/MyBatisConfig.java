package com.cn.website.config.mybatisconfig;

import javax.sql.DataSource;

import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.jta.TransactionFactory;

import com.cn.website.config.DynamicDataSource;

/***
 * 
 * Mybatis 配置信息
 * @author hjc
 *
 */
@Configuration
public class MyBatisConfig {

//	@Bean(name = "myBatisSqlSessionFactory")
//	public SqlSessionFactoryBean sqlSessionFactory(DynamicDataSource dynamicDataSource){
//		SqlSessionFactoryBean myBatisSqlSessionFactory = new SqlSessionFactoryBean();
//		myBatisSqlSessionFactory.setDataSource((DataSource)dynamicDataSource);
//		return myBatisSqlSessionFactory;
//	}
	
	public static void main(String[] args) {

	}
	
//	@Bean(name = "myBatisTest")
//	@Autowired
//	public String  myBatisTest(SqlSessionFactoryBean myBatisSqlSessionFactory){
//		return "";
//	}
}
