package cn.com.realer.dao.expand.m;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.spring.data.redis.BaseExpandMapper;
import cn.com.realer.pojo.GabMBlockStatus;
import cn.com.realer.pojo.GabMItem;

/**
 * GabMItemMapper扩展
 */
public interface GabMItemExpandMapper extends BaseExpandMapper<GabMItem> {
	
	List<GabMItem> selectList(Map<String,Object> params);
}