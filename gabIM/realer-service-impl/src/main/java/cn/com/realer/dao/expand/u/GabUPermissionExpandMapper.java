package cn.com.realer.dao.expand.u;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.spring.data.redis.BaseExpandMapper;
import cn.com.realer.pojo.GabUPermission;

/**
 * GabUPermissionMapper扩展
 */
public interface GabUPermissionExpandMapper extends BaseExpandMapper<GabUPermission> {
	
	List<GabUPermission> selectList(Map<String,Object> params);
}