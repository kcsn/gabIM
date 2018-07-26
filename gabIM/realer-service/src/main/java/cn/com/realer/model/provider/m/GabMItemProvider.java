package cn.com.realer.model.provider.m;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.provider.BaseProvider;
import cn.com.realer.pojo.GabMBlockStatus;
import cn.com.realer.pojo.GabMItem;

/**
 * GabMItemMapper Provider
 */
public interface GabMItemProvider extends BaseProvider<GabMItem> {
	
	List<GabMItem> selectList(Map<String,Object> params);
}