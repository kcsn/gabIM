package cn.com.realer.model.provider.m;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.provider.BaseProvider;
import cn.com.realer.pojo.GabMCategory;
import cn.com.realer.pojo.GabMLocation;

/**
 * GabMLocationMapper Provider
 */
public interface GabMLocationProvider extends BaseProvider<GabMLocation> {
	
	List<GabMLocation> selectList(Map<String,Object> params);
}