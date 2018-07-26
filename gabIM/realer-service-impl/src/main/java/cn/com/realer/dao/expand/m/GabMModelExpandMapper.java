package cn.com.realer.dao.expand.m;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.spring.data.redis.BaseExpandMapper;
import cn.com.realer.pojo.GabMLocation;
import cn.com.realer.pojo.GabMModel;

/**
 * GabMModelMapper扩展
 */
public interface GabMModelExpandMapper extends BaseExpandMapper<GabMModel> {
	
	List<GabMModel> selectList(Map<String,Object> params);
}