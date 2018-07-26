package cn.com.realer.listener;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/*
 * 会话监听器
 * 
 * @author ShenHuaJie
 * @version $Id: SessionListener.java, v 0.1 2014年3月28日 上午9:06:12 ShenHuaJie Exp
 */

public class SessionListener implements HttpSessionListener {
	private Logger logger = LogManager.getLogger(SessionListener.class);


	public void sessionCreated(HttpSessionEvent event) {
//		HttpSession session = event.getSession();
//		session.setAttribute(Constants.WEBTHEME, "default");
//		logger.info("创建了一个Session连接:[" + session.getId() + "]");
//		setAllUserNumber(1);
	}



	public void sessionDestroyed(HttpSessionEvent event) {
//		HttpSession session = event.getSession();
//		if (getAllUserNumber() > 0) {
//			try {
//				logger.info("销毁了一个Session连接:[" + session.getId() + "]");
//			}catch (Exception e){}
//		}
//		try {
//			session.removeAttribute(Constants.CURRENT_USER);
//		}catch (Exception e){}
////		sessionService.deleteBySessionId(session.getId());
//		setAllUserNumber(-1);
	}

	private void setAllUserNumber(int n) {
//		Long number = getAllUserNumber() + n;
//		if (number >= 0) {
//			logger.info("用户数：" + number);
////			RedisUtil.set(Constants.ALLUSER_NUMBER, number, 60 * 60 * 24);
//		}
	}



	public static Long getAllUserNumber() {
//		Long v = (Long) RedisUtil.get(Constants.ALLUSER_NUMBER);
//		if (v != null) {
//			return v;
//		}
		return 0L;
	}
}
