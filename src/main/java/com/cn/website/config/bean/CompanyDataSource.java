package com.cn.website.config.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "db_company_datasource")
public class CompanyDataSource {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	/**
	 * 连接串
	 */
	@Column(name = "db_url")
	private String dbUrl;
	/**
	 * 连接驱动
	 */
	@Column(name = "db_driver")
	private String dbDriver;
	/**
	 * 连接用户名
	 */
	@Column(name = "db_username")
	private String dbUsername;
	/**
	 * 连接密码
	 */
	@Column(name = "db_password")
	private String dbPassword;
	/**
	 * 公司Id 标识
	 */
	@Column(name = "db_company_id")
	private String dbCompanyId;

	/**
	 * 连接池名称
	 */
	@Column(name = "db_source_name")
	private String dbSourceName;
	
	@Column(name = "db_ip")
	private String dbIp;
	
	@Column(name = "db_uri")
	private String dbUri;
	
	public String getDbIp() {
		return dbIp;
	}

	public void setDbIp(String dbIp) {
		this.dbIp = dbIp;
	}

	public String getDbUri() {
		return dbUri;
	}

	public void setDbUri(String dbUri) {
		this.dbUri = dbUri;
	}

	public String getDbSport() {
		return dbSport;
	}

	public void setDbSport(String dbSport) {
		this.dbSport = dbSport;
	}

	@Column(name = "db_sport")
	private String dbSport;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDbUrl() {
		return dbUrl;
	}

	public void setDbUrl(String dbUrl) {
		this.dbUrl = dbUrl;
	}

	public String getDbDriver() {
		return dbDriver;
	}

	public void setDbDriver(String dbDriver) {
		this.dbDriver = dbDriver;
	}

	public String getDbUsername() {
		return dbUsername;
	}

	public void setDbUsername(String dbUsername) {
		this.dbUsername = dbUsername;
	}

	public String getDbPassword() {
		return dbPassword;
	}

	public void setDbPassword(String dbPassword) {
		this.dbPassword = dbPassword;
	}

	public String getDbCompanyId() {
		return dbCompanyId;
	}

	public void setDbCompanyId(String dbCompanyId) {
		this.dbCompanyId = dbCompanyId;
	}

	public String getDbSourceName() {
		return dbSourceName;
	}

	public void setDbSourceName(String dbSourceName) {
		this.dbSourceName = dbSourceName;
	}

}
