package com.cn.website.common.dao.user;

import com.cn.website.common.bean.user.Userinfo;
import com.cn.website.common.dao.BaseDaoSupport;
/**
 * 获取用户信息对象
 * @author huangjiacheng
 *
 */
public interface UserInfoDAO extends BaseDaoSupport {
	
	public Userinfo getUser(String username,String password);
}
