package com.cn.website.common.dao;

import java.util.List;

import com.cn.website.common.bean.ComUserInfo;
import com.cn.website.user.bean.UserInfo;

public interface UserCenterDao extends BaseDaoSupport{
	/**
	 * 保存
	 * @param info
	 */
	 public void save(ComUserInfo info);
	 
	 public ComUserInfo get(long id);
	 
	 public List<ComUserInfo> getUserInfoList(ComUserInfo info);

	UserInfo getUser(String username, String password);
	 
}
