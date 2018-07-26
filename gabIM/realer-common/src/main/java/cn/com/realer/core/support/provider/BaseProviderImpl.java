package cn.com.realer.core.support.provider;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.PropertyUtils;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.ContextLoader;

import cn.com.realer.core.Constants;
import cn.com.realer.core.generator.base.BaseMapper;
import cn.com.realer.core.generator.base.BaseModel;
import cn.com.realer.core.util.DataUtil;
import cn.com.realer.core.util.InstanceUtil;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

/**
 * 业务逻辑层基类
 * 
 * @author ShenHuaJie
 * @version 2016年5月20日 下午3:19:19
 */

/**
 * 业务逻辑层基类<br/>
 * 继承基类后必须配置CacheConfig(cacheNames="")
 *
 * @author ShenHuaJie
 * @version 2016年5月20日 下午3:19:19
 */
public abstract class BaseProviderImpl<T extends BaseModel> {

	/** 启动分页查询 */
	protected void startPage(Map<String, Object> params) {
		if (DataUtil.isEmpty(params.get("pageNum"))) {
			params.put("pageNum", 1);
		}
		if (DataUtil.isEmpty(params.get("pageSize"))) {
			params.put("pageSize", 30);
		}
		if (DataUtil.isEmpty(params.get("orderBy"))) {
			params.put("orderBy", "id desc");
		}
		PageHelper.startPage(params);
	}

	@SuppressWarnings("unchecked")
	private BaseProviderImpl<T> getService() {
		return ContextLoader.getCurrentWebApplicationContext().getBean(getClass());
	}

	/** 根据Id查询(默认类型T) */
	public PageInfo<T> getPage(Page<Integer> ids) {
		Page<T> page = new Page<T>(ids.getPageNum(), ids.getPageSize());
		page.setTotal(ids.getTotal());
		if (ids != null) {
			page.clear();
			BaseProviderImpl<T> provider = getService();
			for (Integer id : ids) {
				page.add(provider.queryById(id));
			}
		}
		return new PageInfo<T>(page);
	}

	/** 根据Id查询(cls返回类型Class) */
	public <K> PageInfo<K> getPage(Page<Integer> ids, Class<K> cls) {
		Page<K> page = new Page<K>(ids.getPageNum(), ids.getPageSize());
		page.setTotal(ids.getTotal());
		if (ids != null) {
			page.clear();
			BaseProviderImpl<T> provider = getService();
			for (Integer id : ids) {
				T t = provider.queryById(id);
				K k = null;
				try {
					k = cls.newInstance();
				} catch (Exception e1) {
				}
				if (k != null) {
					try {
						PropertyUtils.copyProperties(k, t);
					} catch (Exception e) {
					}
					page.add(k);
				}
			}
		}
		return new PageInfo<K>(page);
	}

	/** 根据Id查询(默认类型T) */
	public List<T> getList(List<Integer> ids) {
		List<T> list = InstanceUtil.newArrayList();
		if (ids != null) {
			for (Integer id : ids) {
				list.add(getService().queryById(id));
			}
		}
		return list;
	}

	public <K> K getBean(Integer id, Class<K> cls) {
		T t = getService().queryById(id);
		K k = null;
		try {
			 k  = cls.newInstance();
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		}
		if (k != null) {
			try {
				PropertyUtils.copyProperties(k, t);
			} catch (Exception e) {
			}
		}
		return k;
	}

	/** 根据Id查询(cls返回类型Class) */
	public <K> List<K> getList(List<Integer> ids, Class<K> cls) {
		List<K> list = InstanceUtil.newArrayList();
		if (ids != null) {
			for (Integer id : ids) {
				T t = getService().queryById(id);
				K k = null;
				try {
					k = cls.newInstance();
				} catch (Exception e1) {
				}
				if (k != null) {
					try {
						PropertyUtils.copyProperties(k, t);
					} catch (Exception e) {
					}
					list.add(k);
				}
			}
		}
		return list;
	}

	@Transactional
	public void delete(Integer id, Integer userId) {
		try {
			T record = queryById(id);
//			record.setEnable(0);
//			record.setUpdateTime(new Date());
//			record.setUpdateBy(userId);
//			getMapper().updateByPrimaryKey(record);

			getMapper().deleteByPrimaryKey(id);
//			RedisUtil.set(getCacheKey(id), record);
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
	}

	@Transactional
	public T update(T record) {
		try {
//			if(record.getEnable()==null){
//				record.setEnable(true);
//			}
			record.setUpdateTime(new Date());
//			record.setUpdateBy(WebUtil.getCurrentUser());
			if (record.getId() == null) {
				if(record.getCreateTime()==null){
					record.setCreateTime(new Date());
				}
//				record.setCreateBy(WebUtil.getCurrentUser());
				record.setIsdelete((short)0);
				getMapper().insert(record);
			} else {
				if(record.getIsdelete()==null)
				record.setIsdelete((short)0);
				getMapper().updateByPrimaryKey(record);
			}
//			RedisUtil.set(getCacheKey(record.getId()), record);
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
		return record;
	}

	@Transactional
	@SuppressWarnings("unchecked")
	public T queryById(Integer id) {
		try {
			String key = getCacheKey(id);
//			T record = (T) RedisUtil.get(key);
//			if (record == null) {
			T record = getMapper().selectByPrimaryKey(id);
//				RedisUtil.set(key, record);
//			}
			return record;
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage(), e);
		}
	}

	/** 获取缓存键值 */
	private String getCacheKey(Object id) {
		String cacheName = null;
		CacheConfig cacheConfig = getClass().getAnnotation(CacheConfig.class);
		if (cacheConfig == null || cacheConfig.cacheNames() == null || cacheConfig.cacheNames().length < 1) {
			cacheName = getClass().getName();
		} else {
			cacheName = cacheConfig.cacheNames()[0];
		}
		return new StringBuilder(Constants.CACHE_NAMESPACE).append(cacheName).append(":").append(id).toString();
	}

	protected abstract BaseMapper<T> getMapper();
}