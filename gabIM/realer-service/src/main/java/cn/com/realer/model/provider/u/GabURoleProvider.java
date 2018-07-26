package cn.com.realer.model.provider.u;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.provider.BaseProvider;
import cn.com.realer.pojo.GabURole;

/**
 * GabURoleMapper Provider
 */
public interface GabURoleProvider extends BaseProvider<GabURole> {
	
	List<GabURole> selectList(Map<String,Object> params);

	void insert(GabURole role);
}