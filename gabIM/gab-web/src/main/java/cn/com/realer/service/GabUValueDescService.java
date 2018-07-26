package cn.com.realer.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cn.com.realer.core.support.BaseService;
import cn.com.realer.model.provider.m.GabMItemProvider;
import cn.com.realer.model.provider.m.GabMLocationProvider;
import cn.com.realer.model.provider.m.GabMOptionsProvider;
import cn.com.realer.model.provider.u.GabUPoliceProvider;
import cn.com.realer.model.provider.u.GabUValueDescProvider;
import cn.com.realer.pojo.GabMItem;
import cn.com.realer.pojo.GabMLocation;
import cn.com.realer.pojo.GabMOptions;
import cn.com.realer.pojo.GabUPolice;
import cn.com.realer.pojo.GabUValueDesc;

@Service
@Transactional
public class GabUValueDescService extends BaseService<GabUValueDescProvider, GabUValueDesc> {

	@Autowired
	private GabMItemProvider itemProvider;
	@Autowired
	private GabUValueDescProvider valueDescProvider;
	@Autowired
	private GabMOptionsProvider optionsProvider;
	@Autowired
	private GabMLocationProvider gabMLocationProvider;
	@Autowired
	private GabUPoliceProvider gabUPoliceProvider;

	/**
	 * 根据前台传入数据补全表所有信息
	 * @param valueDescs
	 * @return
	 */
	public GabUValueDesc[] addAllMessage(GabUValueDesc[] valueDescs) {	
		for (GabUValueDesc valueDesc : valueDescs) {			
			GabMItem item = itemProvider.queryById(valueDesc.getItemId());
			valueDesc.setName(item.getName());
			if ("number".equals(item.getInputType())) {
				valueDesc.setNumber(Integer.valueOf(valueDesc.getValue()));
				valueDesc.setOptionsId(null);
			}
			if ("radio".equals(item.getInputType())) {
				GabMOptions options = optionsProvider.queryById(valueDesc.getOptionsId());
				valueDesc.setValue(options.getValue());
				valueDesc.setNumber(null);
			}
			add(valueDesc);
		}		
			return valueDescs;
	}
	
	/**
	 * 跟新表数据  先删除该块所有数据 再添加
	 * @param valueDescs
	 * @return
	 */
	public  GabUValueDesc[]  updateAllMessage(GabUValueDesc[] valueDescs) {	
		Map<String, Object> params = new HashMap<>();
		params.put("policeId", valueDescs[0].getPoliceId());
		params.put("themeId", valueDescs[0].getThemeId());
		params.put("blockId", valueDescs[0].getBlockId());
		valueDescProvider.deleteByCondition(params);
		for (GabUValueDesc valueDesc : valueDescs) {			
			GabMItem item = itemProvider.queryById(valueDesc.getItemId());
			valueDesc.setName(item.getName());
			if ("number".equals(item.getInputType())) {
				valueDesc.setNumber(Integer.valueOf(valueDesc.getValue()));
				valueDesc.setOptionsId(null);
			}
			if ("radio".equals(item.getInputType())) {
				GabMOptions options = optionsProvider.queryById(valueDesc.getOptionsId());
				valueDesc.setValue(options.getValue());
				valueDesc.setNumber(null);
			}
			add(valueDesc);
		}		
			return valueDescs;
		
	}
	
	   public Map<String, Object> selectPerSort(Integer themeId) {		    
		   return valueDescProvider.selectPerSort(themeId);
	   }

	public Long selectPoliceCount(Map<String,Object> params) {
		// TODO Auto-generated method stub
		return valueDescProvider.selectPoliceCount(params);
	}

	public List<Map<String, Object>> selectProvincePoliceCount(
			Map<String, Object> params) {
		
		List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
		//查询出parentId为0的GabMLocation,
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("parentId", 0);
		List<GabMLocation> selectList = gabMLocationProvider.selectList(map);
		//遍历selectList,获取省份的id,查询出province为省份的id的的police对象的集合
		for (GabMLocation gabMLocation : selectList) {
			Integer id = gabMLocation.getId();
			Map<String, Object> params1 = new HashMap<String, Object>();
			params1.put("province", id);
			List<GabUPolice> selectList2 = gabUPoliceProvider.selectList(params1);
			long count = 0;//用来接收每个省份的总警人数
			long policeCount=0;
			for (GabUPolice gabUPolice : selectList2) {//某个省份下1,2,3...警局,把每个警局的总警数相加
				Integer id2 = gabUPolice.getId();
				//查询policeId为police.id的所有的value_desc对象
				params.put("policeId", id2);
				policeCount = this.selectPoliceCount(params);
				count=count+policeCount;
			}
			Map<String, Object> policeCountMap = new HashMap<String, Object>();
			String provinceName = gabMLocation.getName();
			policeCountMap.put("provinceName", count);//map存放省份名,总警数;
			list.add(policeCountMap);
		}
		
		
		return list;
	}
	
	  public List<Map<String, Object>> selectProportionByItemId(Map<String, Object> params){		  
		  return valueDescProvider.selectProportionByItemId(params);
	  }

	public List<Map> selectProvincePoliceCount1(
			Map<String, Object> params) {
		
		return valueDescProvider.selectPoliceCount1(params);
	}

	public List<Map> selectJWMSCount() {
		// TODO Auto-generated method stub
		return valueDescProvider.selectJWMSCount();
	}
	public List<Map> selectAllJWMSCount() {
		// TODO Auto-generated method stub
		return valueDescProvider.selectAllJWMSCount();
	}

	public void deleteByParams(Map<String, Object> params) {
		// TODO Auto-generated method stub
		valueDescProvider.deleteByParams(params);
	}
	   
}
