package com.cn.website.user.service;

import com.cn.website.user.bean.UserInfo;

public interface UserInfoService {

	UserInfo checkUser(String username, String password);

}
