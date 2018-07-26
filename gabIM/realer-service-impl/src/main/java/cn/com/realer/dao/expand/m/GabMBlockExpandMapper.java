package cn.com.realer.dao.expand.m;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.spring.data.redis.BaseExpandMapper;
import cn.com.realer.pojo.GabMBlock;
import cn.com.realer.pojo.vo.BlockVo;

/**
 * GabMBlockMapper扩展
 */
public interface GabMBlockExpandMapper extends BaseExpandMapper<GabMBlock> {
	
	List<GabMBlock> selectList(Map<String,Object> params);
	List<BlockVo> selectListBlock(Map<String,Object> params);
}