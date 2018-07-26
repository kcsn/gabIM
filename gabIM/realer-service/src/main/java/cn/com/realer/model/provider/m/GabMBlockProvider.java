package cn.com.realer.model.provider.m;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.provider.BaseProvider;
import cn.com.realer.pojo.GabMBlock;
import cn.com.realer.pojo.vo.BlockVo;

/**
 * GabMBlockMapper Provider
 */
public interface GabMBlockProvider extends BaseProvider<GabMBlock> {
	
	List<GabMBlock> selectList(Map<String,Object> params);

	List<BlockVo> selectListBlock(Map<String, Object> params);
	
    BlockVo getBlockVoByblock(GabMBlock block,Integer themeId,Integer policeId);

    }