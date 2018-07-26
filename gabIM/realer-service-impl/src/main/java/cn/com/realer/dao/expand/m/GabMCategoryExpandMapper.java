package cn.com.realer.dao.expand.m;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.spring.data.redis.BaseExpandMapper;
import cn.com.realer.pojo.GabMBlockStatus;
import cn.com.realer.pojo.GabMCategory;

/**
 * GabMCategoryMapper扩展
 */
public interface GabMCategoryExpandMapper extends BaseExpandMapper<GabMCategory> {
	
	List<GabMCategory> selectList(Map<String,Object> params);
}