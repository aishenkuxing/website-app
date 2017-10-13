package com.cn.website.test.thread;

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;
/**
 * 读写锁例子 缓存队列  demo 线程保持安全
 * @author Administrator
 *
 */
public class ConditionTest {
	static class BoundedBuffer {
		final Lock lock = new ReentrantLock(); // 锁对象
		final Condition notFull = lock.newCondition(); // 写线程锁
		final Condition notEmpty = lock.newCondition(); // 读线程锁

		final Object[] items = new Object[1];// 缓存队列 一次只写入 1组数据
		int putptr; // 写索引
		int takeptr; // 读索引
		int count; // 队列中数据数目

		// 写
		public void put(Object x) throws InterruptedException {
			lock.lock(); // 锁定
			try {
				// 如果队列满，则阻塞<写线程>
				while (count == items.length) {
					notFull.await();
				}
				// 写入队列，并更新写索引
				items[putptr] = x;
				if (++putptr == items.length)
					putptr = 0;
				++count;

				// 唤醒<读线程>
				notEmpty.signal();
			} finally {
				lock.unlock();// 解除锁定
			}
		}

		// 读
		public Object take() throws InterruptedException {
			lock.lock(); // 锁定
			try {
				// 如果队列空，则阻塞<读线程>
				while (count == 0) {
					notEmpty.await();
				}

				// 读取队列，并更新读索引
				Object x = items[takeptr];
				if (++takeptr == items.length)
					takeptr = 0;
				--count;

				// 唤醒<写线程>
				notFull.signal();
				return x;
			} finally {
				lock.unlock();// 解除锁定
			}
		}
	}

	public static void main(String[] args) {
		BoundedBuffer bb = new BoundedBuffer();
		// 写入
		for (int i = 0; i < 3; i++) {
			Thread t = new Thread(new Runnable() {
				@Override
				public void run() {
					for (int j = 0; j < 5; j++) {
						try {
							System.out.println(Thread.currentThread().getName() + "准备写入数据"+j);
							bb.put(j);
							System.out.println(Thread.currentThread().getName() + "写入"+j);
						} catch (InterruptedException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
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
						try {
							System.out.println(Thread.currentThread().getName() + "准备读取数据");
							System.out.println(Thread.currentThread().getName() + "读取" + bb.take());
						} catch (InterruptedException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
			});
			t.setName("Thread-R" + i);
			t.start();
		}
	}
}
