package com.cn.website.event.test;

public class FinalizerTest {
	
	public static FinalizerTest object;
	
	public int _10M = 10* 1<<20;
	
	public byte[] b =new byte[_10M];
	
    public void isAlive() {
        System.out.println("I'm alive");
    }

    @Override
    protected void finalize() throws Throwable {
        super.finalize();
        System.out.println("method finalize is running");
        object = this;
    }

    public static void main(String[] args) throws Exception {
    	System.out.println(11010048/1024);
   	
        object = new FinalizerTest();
        // 第一次执行，finalize方法会自救
        object = null;
        System.gc();

        Thread.sleep(500);
        if (object != null) {
            object.isAlive();
        } else {
            System.out.println("I'm dead");
        }

        // 第二次执行，finalize方法已经执行过
        object = null;
        System.gc();

        Thread.sleep(500);
        if (object != null) {
            object.isAlive();
        } else {
            System.out.println("I'm dead");
        }
        System.gc();
        
        
    }

}
