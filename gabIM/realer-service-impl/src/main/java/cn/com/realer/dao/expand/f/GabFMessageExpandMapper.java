package cn.com.realer.dao.expand.f;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.spring.data.redis.BaseExpandMapper;
import cn.com.realer.pojo.GabFMessage;
import cn.com.realer.pojo.GabMBlock;

/**
 * GabFMessageMapper扩展
 */
public interface GabFMessageExpandMapper extends BaseExpandMapper<GabFMessage> {
	
	List<GabFMessage> selectList(Map<String,Object> params);
}