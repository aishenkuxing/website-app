package com.cn.website.common.service;

import java.util.List;

import com.cn.website.common.bean.ComUserInfo;
import com.cn.website.user.bean.UserInfo;

public interface HomeService {
    public void defaultMethod();
    
    public String getVersion();
    
    public ComUserInfo getUserInfo(long id);
    
    List<ComUserInfo> getUserInfoList(ComUserInfo info);

	UserInfo checkUser(String username, String password);
}
