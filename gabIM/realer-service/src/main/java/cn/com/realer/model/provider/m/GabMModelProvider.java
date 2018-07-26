package cn.com.realer.model.provider.m;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.provider.BaseProvider;
import cn.com.realer.pojo.GabMLocation;
import cn.com.realer.pojo.GabMModel;

/**
 * GabMModelMapper Provider
 */
public interface GabMModelProvider extends BaseProvider<GabMModel> {
	
	List<GabMModel> selectList(Map<String,Object> params);
}