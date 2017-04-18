package com.cn.website.common.service.user;

import java.util.List;

import com.cn.website.common.bean.ComUserInfo;

public interface UserInfoService {
	//获取用户信息
	 public long CheckUser(String username ,String password);
}
