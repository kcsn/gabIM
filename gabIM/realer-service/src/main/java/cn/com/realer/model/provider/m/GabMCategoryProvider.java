package cn.com.realer.model.provider.m;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.provider.BaseProvider;
import cn.com.realer.pojo.GabMBlockStatus;
import cn.com.realer.pojo.GabMCategory;

/**
 * GabMCategoryMapper Provider
 */
public interface GabMCategoryProvider extends BaseProvider<GabMCategory> {
	
	List<GabMCategory> selectList(Map<String,Object> params);
}