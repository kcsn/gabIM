package cn.com.realer.model.provider.u;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.provider.BaseProvider;
import cn.com.realer.pojo.GabUPermission;

/**
 * GabUPermissionMapper Provider
 */
public interface GabUPermissionProvider extends BaseProvider<GabUPermission> {
	
	List<GabUPermission> selectList(Map<String,Object> params);
}