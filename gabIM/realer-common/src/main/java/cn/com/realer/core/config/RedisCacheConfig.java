/**
 * 
 */
package cn.com.realer.core.config;

import cn.com.realer.core.Constants;
import cn.com.realer.core.support.exception.BusinessException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.cache.annotation.*;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.lang.reflect.Method;

/**
 * Redis缓存配置
 * 
 * @author ShenHuaJie
 * @version 2016年5月20日 下午3:18:41
 */
@Configuration
@EnableCaching
public class RedisCacheConfig extends CachingConfigurerSupport {

	@Bean
	public KeyGenerator keyGenerator() {
		return new KeyGenerator() {
			/** 重写生成key方法 */
			public Object generate(Object o, Method method, Object... objects) {
				StringBuilder sb = new StringBuilder(Constants.CACHE_NAMESPACE);
				CacheConfig cacheConfig = o.getClass().getAnnotation(CacheConfig.class);
				Cacheable cacheable = method.getAnnotation(Cacheable.class);
				CachePut cachePut = method.getAnnotation(CachePut.class);
				CacheEvict cacheEvict = method.getAnnotation(CacheEvict.class);
				if (cacheable != null) {
					String[] cacheNames = cacheable.value();
					if (cacheNames != null && cacheNames.length > 0) {
						sb.append(cacheNames[0]);
					}
				} else if (cachePut != null) {
					String[] cacheNames = cachePut.value();
					if (cacheNames != null && cacheNames.length > 0) {
						sb.append(cacheNames[0]);
					}
				} else if (cacheEvict != null) {
					String[] cacheNames = cacheEvict.value();
					if (cacheNames != null && cacheNames.length > 0) {
						sb.append(cacheNames[0]);
					}
				}
				if (cacheConfig != null && sb.toString().equals(Constants.CACHE_NAMESPACE)) {
					String[] cacheNames = cacheConfig.cacheNames();
					if (cacheNames != null && cacheNames.length > 0) {
						sb.append(cacheNames[0]);
					}
				}
				if (sb.toString().equals(Constants.CACHE_NAMESPACE)) {
					sb.append(o.getClass().getName());
				}
				if (objects != null) {
					sb.append(":");
					if (objects.length == 1) {
						if (objects[0] instanceof Integer || objects[0] instanceof String) {
							sb.append(objects[0]);
						} else {
							try {
								sb.append(objects[0].getClass().getMethod("getId").invoke(objects[0]));
							} catch (Exception e) {
								throw new BusinessException("Not support.");
							}
						}
					} else {
						sb.append(StringUtils.join(objects, ","));
					}
				}
				return sb.toString();
			}
		};
	}
}
