package com.cn.website.common.util;

import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class WebSiteCookies {
	
	
   public static void setCookies(JsonObject json,HttpServletResponse response){
	    Set set = json.entrySet();
	    Iterator<Map.Entry<String, JsonElement>> it = set.iterator();
        while (it.hasNext()) {
        	Map.Entry<String, JsonElement> el = (Map.Entry<String, JsonElement>) it.next();
        	Cookie cookie = new Cookie(el.getKey(),el.getValue().toString());  
        	cookie.setMaxAge(60*60*24*7);//保留7天
        	response.addCookie(cookie); 
        }
	   
   }
}
