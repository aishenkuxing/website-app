package com.cn.website.common.dao;

import java.io.Serializable;

import org.hibernate.LockMode;
import org.hibernate.LockOptions;
import org.hibernate.Session;

public interface BaseDaoSupport {
	<T> T get(Class<T> entityType, Serializable id);
	
	<T> T get(Class<T> entityType, Serializable id, LockMode lockMode);
	
	<T> T load(Class<T> theClass, Serializable id, LockMode lockMode);

	<T> T load(Class<T> theClass, Serializable id, LockOptions lockOptions);

	Object load(String entityName, Serializable id, LockMode lockMode);
	
	Serializable save(String entityName, Object object);

	void saveOrUpdate(Object object);

	void saveOrUpdate(String entityName, Object object);

	void update(Object object);

	void update(String entityName, Object object);


	Object merge(Object object);


	Object merge(String entityName, Object object);


	void persist(Object object);

	void persist(String entityName, Object object);

	
	void delete(Object object);

	void delete(String entityName, Object object);
}
