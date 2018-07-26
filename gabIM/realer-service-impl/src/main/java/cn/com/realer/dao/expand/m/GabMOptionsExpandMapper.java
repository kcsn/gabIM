package cn.com.realer.dao.expand.m;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.spring.data.redis.BaseExpandMapper;
import cn.com.realer.pojo.GabMModel;
import cn.com.realer.pojo.GabMOptions;

/**
 * GabMOptionsMapper扩展
 */
public interface GabMOptionsExpandMapper extends BaseExpandMapper<GabMOptions> {

	List<GabMOptions> selectList(Map<String,Object> params);
	
	List<GabMOptions> selectOptions();

}