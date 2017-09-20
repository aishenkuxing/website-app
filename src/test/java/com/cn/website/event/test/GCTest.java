package com.cn.website.event.test;

public class GCTest {
	public static GCTest object;
	
	public int _10M = 10* 1<<20;
	
	public byte[] b =new byte[_10M];
	
  public static void main(String[] args) {
	  GCTest object1 = new GCTest();
	  GCTest object2 = new GCTest();
      
      object1.object= object2;
      object2.object= object1;
      
      System.gc();
      object1 = null;
      object2 = null;
      System.out.println("I'm dead");
      System.gc();
  }
}
