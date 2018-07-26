package cn.com.realer.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.com.realer.core.support.BaseService;
import cn.com.realer.model.provider.m.GabMBlockProvider;
import cn.com.realer.model.provider.m.GabMBlockStatusProvider;
import cn.com.realer.model.provider.m.GabMItemProvider;
import cn.com.realer.model.provider.m.GabMOptionsProvider;
import cn.com.realer.model.provider.u.GabUValueDescProvider;
import cn.com.realer.pojo.GabMBlock;
import cn.com.realer.pojo.GabMBlockStatus;
import cn.com.realer.pojo.GabMItem;
import cn.com.realer.pojo.GabMOptions;
import cn.com.realer.pojo.GabUValueDesc;
import cn.com.realer.pojo.vo.BlockVo;
import cn.com.realer.pojo.vo.ItemVo;

@Service
public class GabMBlockService  extends BaseService<GabMBlockProvider, GabMBlock>{

	@Autowired
	private GabMBlockProvider gabMBlockProvider;
	@Autowired
	private GabMItemProvider gabMItemProvider;
	@Autowired
	private GabMOptionsProvider gabMOptionsProvider;
	@Autowired
	private GabUValueDescProvider gabUValueDescProvider;
	@Autowired
	private GabMBlockStatusProvider gabMBlockStatusProvider;
		
	public List<GabMBlock> selectList(Map<String,Object> params){
		return this.provider.selectList(params);
	}

	public List<BlockVo> selectListBlock(Map<String,Object> params) {
		// TODO Auto-generated method stub
		return this.provider.selectListBlock(params);
	}
	
	public List<BlockVo> getBlockVoList(Integer themeId,Integer policeId){
		
		//List<GabMBlock> gabMBlocks = selectList(null);
		//根据modelId查询blockList
		
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("modelId", 1);
		List<GabMBlock> gabMBlocks = gabMBlockProvider.selectList(params);
		
		List<BlockVo> blockVos =new ArrayList<>();
		//遍历block,组装blockVo
		for (GabMBlock gabMBlock : gabMBlocks) {
			//BlockVo blockVo = gabMBlockProvider.getBlockVoByblock(gabMBlock, themeId, policeId);
			BlockVo blockVo = new BlockVo();
			//查询items集合
			  Map<String, Object> map1 = new HashMap<>();
			  map1.put("blockId", gabMBlock.getId());
			  List<GabMItem> items = gabMItemProvider.selectList(map1);
			  List<ItemVo> itemVos =new ArrayList<>();
			  //遍历item,组装itemVo
				for (GabMItem gabMItem : items) {
					ItemVo itemVo = new ItemVo();
					
					//根据item查询options 
					Map<String, Object> map2 = new HashMap<>();
					map2.put("itemCode", gabMItem.getCode());
					try {
						List<GabMOptions> optionsList = gabMOptionsProvider.selectList(map2);
						itemVo.setOptions(optionsList);
					} catch (Exception e1) {
						e1.printStackTrace();
						System.out.println(gabMItem.getName()+"没有options");
					}
					//根据item查询valuedesc
					Map<String, Object> map3 = new HashMap<>();
					map3.put("itemId", gabMItem.getId());
					map3.put("themeId", themeId);
					map3.put("policeId", policeId);
					//List<GabUValueDesc> GabUValueDesc = gabUValueDescProvider.selectList(map3);
					
					try {
						List<GabUValueDesc> valueDescList = gabUValueDescProvider.selectList(map3);
						itemVo.setGabUValueDescs(valueDescList);
					} catch (Exception e) {
						e.printStackTrace();
						System.out.println(gabMItem.getName()+"没有valuedesc");
					}
					//组装itemVo
					itemVo.setId(gabMItem.getId());
					itemVo.setPid(gabMItem.getParentId());
					itemVo.setInputType(gabMItem.getInputType());
					itemVo.setItemType(gabMItem.getItemType());
					itemVo.setIsleaf(gabMItem.getIsleaf());
					itemVo.setName(gabMItem.getName());
					itemVo.setPlacehold(gabMItem.getPlacehold());
					itemVo.setRequired(gabMItem.getRequired());
					//添加到itemVos
					itemVos.add(itemVo);
				}
				//组装blockVo
				blockVo.setItemVos(itemVos);
				blockVo.setId(gabMBlock.getId());
				blockVo.setIcon(gabMBlock.getIcon());
				blockVo.setName(gabMBlock.getName());
				Map<String, Object> map4 = new HashMap<>();
				  map4.put("themeId", themeId);
				  map4.put("policeId", policeId);
				  map4.put("blockId", gabMBlock.getId());
				  try {
					//添加填写状态
					   GabMBlockStatus gabMBlockStatus2 = gabMBlockStatusProvider.selectOne(map4);
					  GabMBlockStatus gabMBlockStatus = new GabMBlockStatus();
					  if (gabMBlockStatus2==null) {
						  //初始化gabMBlockStatus
						  gabMBlockStatus.setBlockId(gabMBlock.getId());
						  gabMBlockStatus.setThemeId(themeId);
						  gabMBlockStatus.setPoliceId(policeId);
						  gabMBlockStatus.setStatus((short)0);
						  gabMBlockStatus.setIsdelete((short)0);
						  gabMBlockStatus.setUpdateTime(new Date());
						  gabMBlockStatus.setCreateTime(new Date());
						  gabMBlockStatusProvider.insert(gabMBlockStatus);
						  System.out.println("1111111");
					}
					blockVo.setStatus(gabMBlockStatusProvider.selectOne(map4).getStatus());
				} catch (Exception e) {
					e.printStackTrace();
					System.out.println("没有填写块状态");
				}  
		    blockVos.add(blockVo);
		}
		return blockVos;
	}
}
