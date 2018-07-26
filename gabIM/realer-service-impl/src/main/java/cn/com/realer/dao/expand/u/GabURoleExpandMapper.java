package cn.com.realer.dao.expand.u;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.spring.data.redis.BaseExpandMapper;
import cn.com.realer.pojo.GabURole;

/**
 * GabURoleMapper扩展
 */
public interface GabURoleExpandMapper extends BaseExpandMapper<GabURole> {
	
	List<GabURole> selectList(Map<String,Object> params);
}