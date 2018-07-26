package cn.com.realer.dao.provider.m;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageInfo;

import cn.com.realer.core.generator.base.BaseMapper;
import cn.com.realer.core.support.provider.BaseProviderImpl;
import cn.com.realer.dao.expand.m.GabMBlockExpandMapper;
import cn.com.realer.dao.expand.m.GabMBlockStatusExpandMapper;
import cn.com.realer.dao.expand.m.GabMItemExpandMapper;
import cn.com.realer.dao.expand.m.GabMOptionsExpandMapper;
import cn.com.realer.dao.expand.u.GabUValueDescExpandMapper;
import cn.com.realer.dao.generator.m.GabMBlockMapper;
import cn.com.realer.model.provider.m.GabMBlockProvider;
import cn.com.realer.pojo.GabMBlock;
import cn.com.realer.pojo.GabMItem;
import cn.com.realer.pojo.vo.BlockVo;
import cn.com.realer.pojo.vo.ItemVo;

@Service
public class GabMBlockProviderImpl extends BaseProviderImpl<GabMBlock> implements GabMBlockProvider{

	@Autowired
	private GabMBlockMapper gabMBlockMapper;
	@Autowired
	private GabMBlockExpandMapper gabMBlockExpandMapper;
	@Autowired
	private GabMItemExpandMapper gabMItemExpandMapper;
	@Autowired
	private GabMBlockStatusExpandMapper gabMBlockStatusExpandMapper;
	@Autowired
	private GabMOptionsExpandMapper gabMOptionsExpandMapper;
	@Autowired
	private GabUValueDescExpandMapper gabUValueDescExpandMapper;
	
	@Override
	protected BaseMapper<GabMBlock> getMapper() {
		// TODO Auto-generated method stub
		return gabMBlockMapper;
	}

	@Override
	public PageInfo<GabMBlock> query(Map<String, Object> params) {
		// TODO Auto-generated method stub
		startPage(params);
		return new PageInfo<GabMBlock>(gabMBlockExpandMapper.selectList(params));
	}

	@Override
	public List<GabMBlock> selectList(Map<String,Object> params) {
		// TODO Auto-generated method stub
		return gabMBlockExpandMapper.selectList(params);
	}

	@Override
	public List<BlockVo> selectListBlock(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return gabMBlockExpandMapper.selectListBlock(params);
	}

	

	public ItemVo getItemVoByItem(GabMItem item) {
		ItemVo itemVo =new ItemVo();
		Map<String, Object> map1 = new HashMap<>();
		map1.put("itemCode", item.getCode());
		gabMOptionsExpandMapper.selectList(map1);
		itemVo.setOptions(gabMOptionsExpandMapper.selectList(map1));
		Map<String, Object> map2 = new HashMap<>();
		map2.put("itemId", item.getId());
		itemVo.setGabUValueDescs(gabUValueDescExpandMapper.selectList(map2));
		itemVo.setId(item.getId());
		itemVo.setPid(item.getParentId());
		itemVo.setInputType(item.getInputType());
		itemVo.setItemType(item.getItemType());
		itemVo.setIsleaf(item.getIsleaf());
		itemVo.setName(item.getName());
		itemVo.setPlacehold(item.getPlacehold());
		itemVo.setRequired(item.getRequired());
		return itemVo;
	}
	

	public BlockVo getBlockVoByblock(GabMBlock block,Integer themeId,Integer policeId){
		
/*	  BlockVo blockVo = new BlockVo();
	  //遍历block查询ItemList
	  Map<String, Object> map1 = new HashMap<>();
	  map1.put("blockId", block.getId());
	  List<GabMItem> items = gabMItemExpandMapper.selectList(map1);
	  
	  List<ItemVo> itemVos =new ArrayList<>();
		for (GabMItem gabMItem : items) {
			ItemVo itemVo = getItemVoByItem(gabMItem);
			itemVos.add(itemVo);
		}
	  blockVo.setItemVos(itemVos);
	  blockVo.setId(block.getId());
	  blockVo.setIcon(block.getIcon());
	  blockVo.setName(block.getName());
	  Map<String, Object> map2 = new HashMap<>();
	  map2.put("themeId", themeId);
	  map2.put("policeId", policeId);
	  map2.put("blockId", block.getId());
	  try {
		  //添加填写状态
		blockVo.setStatus(gabMBlockStatusExpandMapper.selectOne(map2).getStatus());
	} catch (Exception e) {
		e.printStackTrace();
		System.out.println("没有填写块状态");
	}
	  return blockVo;
 */
		return null;
	}
	
	
}
