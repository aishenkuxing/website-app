package com.cn.website.test.thread;

import java.util.Random;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * 读写锁例子
 * @author Administrator
 *
 */
public class ReentrantLockTest {

	static class syncData {
		private int data;// 共享数据

		private Lock lock = new ReentrantLock();// 锁对象

		private ReadWriteLock rwl = new ReentrantReadWriteLock();

		public synchronized void set(int data) {
			rwl.writeLock().lock(); // 得到锁
			try {
				System.out.println(Thread.currentThread().getName() + "准备写入数据");
				try {
					Thread.sleep(200);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				this.data = data;
				System.out.println(Thread.currentThread().getName() + "写入" + this.data);
			} finally {
				rwl.writeLock().unlock();// 释放锁
			}
		}

		public synchronized void get() {
			rwl.readLock().lock(); // 得到锁
			try {
				System.out.println(Thread.currentThread().getName() + "准备读取数据");
				try {
					Thread.sleep(200);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				System.out.println(Thread.currentThread().getName() + "读取" + this.data);
			} finally {
				rwl.readLock().unlock();// 释放锁
			}
		}
	}

	public static void main(String[] args) {
		final syncData data = new syncData();

		// 写入
		for (int i = 0; i < 3; i++) {
			Thread t = new Thread(new Runnable() {
				@Override
				public void run() {
					for (int j = 0; j < 5; j++) {
						data.set(new Random().nextInt(30));
					}
				}
			});
			t.setName("Thread-W" + i);
			t.start();
		}

		// 读取
		for (int i = 0; i < 3; i++) {
			Thread t = new Thread(new Runnable() {
				@Override
				public void run() {
					for (int j = 0; j < 5; j++) {
						data.get();
						;
					}
				}
			});
			t.setName("Thread-R" + i);
			t.start();
		}

	}
}
