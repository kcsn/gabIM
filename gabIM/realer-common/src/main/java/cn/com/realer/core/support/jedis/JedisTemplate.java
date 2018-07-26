package cn.com.realer.core.support.jedis;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.ShardedJedis;
import redis.clients.jedis.ShardedJedisPool;

import java.util.Collection;
import java.util.Iterator;
import java.util.ResourceBundle;

/**
 * @author ShenHuaJie
 * @version 2016年5月20日 下午3:19:19
 */
@PropertySource("classpath:config/redis.properties")
public class JedisTemplate {
	private static final Logger logger = LogManager.getLogger();

	private static ShardedJedisPool shardedJedisPool = null;

	private static Integer EXPIRE = Integer
			.valueOf(ResourceBundle.getBundle("config/redis").getString("redis.expiration"));
	private static Integer DB = Integer
			.valueOf(ResourceBundle.getBundle("config/redis").getString("redis.database"));

	// 获取线程
	private static ShardedJedis getJedis() {
		if (shardedJedisPool == null) {
			synchronized (EXPIRE) {
				if (shardedJedisPool == null) {
					WebApplicationContext wac = ContextLoader.getCurrentWebApplicationContext();
					shardedJedisPool = wac.getBean(ShardedJedisPool.class);
				}
			}
		}
		ShardedJedis jds=shardedJedisPool.getResource();
		Collection<Jedis> collection=jds.getAllShards();
		Iterator<Jedis> jedis = collection.iterator();
		while(jedis.hasNext()){
			jedis.next().select(DB);
		}

		return jds;
	}

	public static <K> K run(String key, Executor<K> executor, Integer... expire) {
		ShardedJedis jedis = getJedis();
		if (jedis == null) {
			return null;
		}
		try {
			K result = executor.execute(jedis);
			if (jedis.exists(key)) {
				if (expire == null || expire.length == 0) {
					jedis.expire(key, EXPIRE);
				} else if (expire.length == 1) {
					jedis.expire(key, expire[0]);
				}
			}
			return result;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if (jedis != null) {
				jedis.close();
			}
		}
		return null;
	}
	public static <K> K run(String key, Executor<K> executor) {
		ShardedJedis jedis = getJedis();
		if (jedis == null) {
			return null;
		}
		try {
			K result = executor.execute(jedis);
			return result;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if (jedis != null) {
				jedis.close();
			}
		}
		return null;
	}

	public static <K> K run(byte[] key, Executor<K> executor, Integer... expire) {
		ShardedJedis jedis = getJedis();
		if (jedis == null) {
			return null;
		}
		try {
			K result = executor.execute(jedis);
			if (jedis.exists(key)) {
				if (expire == null || expire.length == 0) {
					jedis.expire(key, EXPIRE);
				} else if (expire.length == 1) {
					jedis.expire(key, expire[0]);
				}
			}
			return result;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		} finally {
			if (jedis != null) {
				jedis.close();
			}
		}
		return null;
	}
}
