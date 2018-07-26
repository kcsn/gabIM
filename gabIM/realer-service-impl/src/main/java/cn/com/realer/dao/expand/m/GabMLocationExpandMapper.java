package cn.com.realer.dao.expand.m;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.spring.data.redis.BaseExpandMapper;
import cn.com.realer.pojo.GabMCategory;
import cn.com.realer.pojo.GabMLocation;

/**
 * GabMLocationMapper扩展
 */
public interface GabMLocationExpandMapper extends BaseExpandMapper<GabMLocation> {
	
	List<GabMLocation> selectList(Map<String,Object> params);
}