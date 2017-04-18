package com.cn.website.user.dao;

import com.cn.website.common.dao.BaseDaoSupport;
import com.cn.website.user.bean.UserInfo;
/**
 * 获取用户信息对象
 * @author huangjiacheng
 *
 */
public interface UserInfoDAO extends BaseDaoSupport {
	
	public UserInfo getUser(String username,String password);
}
