package cn.com.realer.dao.expand.m;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.spring.data.redis.BaseExpandMapper;
import cn.com.realer.pojo.GabMBlockStatus;

/**
 * GabMBlockStatusMapper扩展
 */
public interface GabMBlockStatusExpandMapper extends BaseExpandMapper<GabMBlockStatus> {
	
	List<GabMBlockStatus> selectList(Map<String,Object> params);

	List<GabMBlockStatus> selectOne(Map<String,Object> params);

	void insert(Map<String, Object> map4);
	
	
}