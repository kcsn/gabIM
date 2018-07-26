package cn.com.realer.model.provider.m;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.provider.BaseProvider;
import cn.com.realer.pojo.GabMCategory;
import cn.com.realer.pojo.GabMOptions;

/**
 * GabMOptionsMapper Provider
 */
public interface GabMOptionsProvider extends BaseProvider<GabMOptions> {
	
	List<GabMOptions> selectList(Map<String,Object> params);
}