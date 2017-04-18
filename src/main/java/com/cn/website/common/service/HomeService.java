package com.cn.website.common.service;

import java.util.List;

import com.cn.website.common.bean.ComUserInfo;

public interface HomeService {
    public void defaultMethod();
    
    public String getVersion();
    
    public ComUserInfo getUserInfo(long id);
    
    List<ComUserInfo> getUserInfoList(ComUserInfo info);
}
