package com.cn.website.event.test;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.cn.website.test.thread.MyThead;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.Transaction;

public class JeidsTest {
	private final static String mmm="abcdef"; 
	
	 private static Jedis jedis; 
	
	private static String getnum(String a2,String b2){
		return a2 + b2;
	}
	
//	public static void main(String[] args) {
//		 String a1= "abc" + "def";
//		 String a2= "abc" ;
//		 String b2 = "def";
//		 System.out.println(a1 == mmm);
//		 for(int i =1;i<100000;i++){
//			 System.out.println(getnum("abc","def") == mmm);
//		 }
//	}
	
	public static void main(String[] args) {
		jedis = new Jedis("127.0.0.1", 6379);
		System.out.println(jedis.ttl("name"));
		//jedis.auth("admin");  
		jedis.set("name","xinxin");//向key-->name中放入了value-->xinxin  
		
		System.out.println(jedis.get("name"));//执行结果：xinxin 
		
		jedis.append("name", "你好吗");
		
		System.out.println(jedis.get("name"));
		
		Map<String, String> map = new HashMap<String, String>();
		map.put("name", "xinxin");
		map.put("age", "22");
		map.put("qq", "123456");
		jedis.hmset("user",map);
		//设置name的过期时间是 60秒
		jedis.expire("name", 60);
		
	
		System.out.println("name的剩余时间还有" + jedis.ttl("name") +"秒");
		
		System.out.println(jedis.hmget("user", "name"));
		System.out.println(jedis.hlen("user"));
		System.out.println(jedis.hkeys("user"));
		Iterator<String> iter=jedis.hkeys("user").iterator();  
         while (iter.hasNext()){  
              String key = iter.next();  
              System.out.println(key+":"+jedis.hmget("user",key));  
          }  
         System.out.println(jedis.get("runoobkey"));
         
         jedis.watch("user");
         
         Transaction multi = jedis.multi();  
         multi.set("abc", "23432");  
         multi.exec();
         jedis.unwatch();
	//	jedis.
	}
}
