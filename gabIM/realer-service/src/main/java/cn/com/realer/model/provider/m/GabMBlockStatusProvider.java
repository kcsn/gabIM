package cn.com.realer.model.provider.m;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.provider.BaseProvider;
import cn.com.realer.pojo.GabMBlockStatus;

/**
 * GabMBlockStatusMapper Provider
 */
public interface GabMBlockStatusProvider extends BaseProvider<GabMBlockStatus> {
	List<GabMBlockStatus> selectList(Map<String,Object> params);

	GabMBlockStatus selectOne(Map<String, Object> map4);

	void insert(GabMBlockStatus gabMBlockStatus);
}