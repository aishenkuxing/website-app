package com.cn.website.common.dao;

import java.util.List;

import com.cn.website.common.bean.ComUserInfo;

public interface UserCenterDao extends BaseDaoSupport{
	/**
	 * 保存
	 * @param info
	 */
	 public void save(ComUserInfo info);
	 
	 public ComUserInfo get(long id);
	 
	 public List<ComUserInfo> getUserInfoList(ComUserInfo info);
	 
}
