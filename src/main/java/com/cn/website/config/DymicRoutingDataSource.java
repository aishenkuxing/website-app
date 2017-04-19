package com.cn.website.config;

import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.jdbc.datasource.lookup.DataSourceLookup;

@Configuration
@Lazy
public class DymicRoutingDataSource extends AbstractRoutingDataSource {
	
	private Map<Object, Object> _targetDataSources;
	
	public void addDataSource(Object key,Object dataSource){  
	     
        this._targetDataSources.put(key, dataSource);  
          
        setTargetDataSources(this._targetDataSources);  
    }  

	@Override
	protected Object determineCurrentLookupKey() {
        return DataSourceHolder.getDataSource();
	}
	
	@Override
	public void setTargetDataSources(Map<Object, Object> targetDataSources) {
		//targetDataSources.put("dataSource", dataSource());
		super.setTargetDataSources(targetDataSources);  
		super.afterPropertiesSet();  
	}
	
  
    @Override  
    public void setDataSourceLookup(DataSourceLookup dataSourceLookup) {  
        super.setDataSourceLookup(dataSourceLookup);  
    }  
  
    @Override  
    public void setDefaultTargetDataSource(Object defaultTargetDataSource) {  
        super.setDefaultTargetDataSource(defaultTargetDataSource);  
    }  
    
/*    @Bean
	public void DymicDataSources(){
		
	}*/
}
