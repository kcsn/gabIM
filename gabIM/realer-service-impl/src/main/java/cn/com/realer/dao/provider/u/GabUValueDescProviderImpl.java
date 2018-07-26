package cn.com.realer.dao.provider.u;


import java.sql.Array;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ResourceBundle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import cn.com.realer.core.generator.base.BaseMapper;
import cn.com.realer.core.support.provider.BaseProviderImpl;
import cn.com.realer.dao.expand.u.GabUValueDescExpandMapper;
import cn.com.realer.dao.generator.u.GabUValueDescMapper;
import cn.com.realer.model.provider.u.GabUValueDescProvider;
import cn.com.realer.pojo.GabUValueDesc;

import com.github.pagehelper.PageInfo;

@Service
@PropertySource("classpath:config/interval.properties")
public class GabUValueDescProviderImpl extends BaseProviderImpl<GabUValueDesc> implements GabUValueDescProvider{

	@Autowired
	private GabUValueDescMapper valueDescMapper;
	@Autowired
	private GabUValueDescExpandMapper valueDescExpandMapper;
	
	@Override
	protected BaseMapper<GabUValueDesc> getMapper() {
		return valueDescMapper;
	}

	@Override
	public PageInfo<GabUValueDesc> query(Map<String, Object> params) {
		startPage(params);
		return new PageInfo<GabUValueDesc>(valueDescExpandMapper.selectList(params));
	}

	@Override
	public List<GabUValueDesc> selectList(Map<String, Object> params) {
		return valueDescExpandMapper.selectList(params);
	}

	@Override
	public void deleteByCondition(Map<String, Object> params) {
		 valueDescExpandMapper.deleteByCondition(params);
	}

	@Override
	public Map<String, Object> selectPerSort(Integer themeId) {
		Map<String, Object> params = new HashMap<>();
		params.put("themeId", themeId);
		//itemId值需要item表确定后才能给出，现暂定为1
		params.put("itemId", 1);
		//查询数据
		List<GabUValueDesc> valueDescs = valueDescExpandMapper.selectList(params);	
		//获取配置
		String NumSplit = ResourceBundle.getBundle("config/interval").getString("NumSplit");
		String[] split = NumSplit.split(",");
		
		return dataClassify(valueDescs, split);
		
	}
	
	// 分析数据
	private Map<String, Object> dataClassify(List<GabUValueDesc> valueDescs, String[] split) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		if (valueDescs != null && split != null && split.length > 0 && valueDescs.size() > 0) {
			// 构造key 例如0-5
			String key = "";
			for (int i = 0; i < split.length-1; i++) {
				int min = Integer.parseInt(split[i]);
				int max = Integer.parseInt(split[i + 1]);
				key = min + "-" + max;
				Integer memberNum = 0;
				for (GabUValueDesc vd : valueDescs) {
					if(vd.getNumber().intValue()>=min&&vd.getNumber().intValue()<max) {
						memberNum += vd.getNumber();
					}
				}
				resultMap.put(key, memberNum);
			}
		}
				return resultMap;
	}


	@Override
	public Long selectPoliceCount(Map<String,Object> params) {
		// TODO Auto-generated method stub
		return valueDescExpandMapper.selectPoliceCount(params);
	}

	/**
	 * 查询警局 itemId为1,2,3 即民警人数  辅警人数 实有人口 数量 并将数据储存在map中  返回一个List<Map>
	 * 表示所有警局相应信息
	 */
	@Override
	public List<Map<String, Object>> selectProportionByItemId(Map<String, Object> params) {
		Integer [] itemIds = new Integer[] {1,2,3};
		params.put("itemIds", itemIds);
		return valueDescExpandMapper.selectProportionByItemId(params);
	}


	/**
	 * 根据传入theme.id 查询指定item项 并返回封装类Proportion集合 ,并给Proportion对象所有属性赋值
	 */
	/*@Override
	public <List<Map<String, Object>>> selectProportionByItemId(Map<String, Object> params) {
        
	List<Proportion> proportions= valueDescExpandMapper.selectProportionByItemId(params);
	 
		for (Proportion proportion : proportions) {
			proportion.setProportion1((double)proportion.getPoliceNum()/(double)proportion.getActualNum());
			proportion.setProportion2((double)proportion.getAuxiliaryPoliceNum()/(double)proportion.getPoliceNum());
		}		
		Collections.sort(proportions, new Comparator<Proportion>() {
			@Override
			public int compare(Proportion o1, Proportion o2) {
				if (o1.getProportion1()<o2.getProportion1()) {
					return 1;
				}else if (o1.getProportion1()>o2.getProportion1()) {
					return 0;
				}else {
					return o1.getPoliceName().compareTo(o2.getPoliceName());
				}			
			}         	
		});
		for(int i=0;i<proportions.size();i++) {
			proportions.get(i).setRank1(i+1);
		}
		Collections.sort(proportions, new Comparator<Proportion>() {
			@Override
			public int compare(Proportion o1, Proportion o2) {
				if (o1.getProportion2()<o2.getProportion2()) {
					return 1;
				}else if (o1.getProportion2()>o2.getProportion2()) {
					return 0;
				}else {
					return o1.getPoliceName().compareTo(o2.getPoliceName());
				}			
			}         	
		});
		for(int i=0;i<proportions.size();i++) {
			proportions.get(i).setRank1(i+1);
		}
		return proportions ;	
	}*/

	@Override
	public List<Map> selectPoliceCount1(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return valueDescExpandMapper.selectPoliceCount1(params);
	}

	@Override
	public List<Map> selectJWMSCount() {
		// TODO Auto-generated method stub
		return valueDescExpandMapper.selectJWMSCount();
	}
	@Override
	public List<Map> selectAllJWMSCount() {
		// TODO Auto-generated method stub
		return valueDescExpandMapper.selectAllJWMSCount();
	}

	@Override
	public void deleteByParams(Map<String, Object> params) {
		// TODO Auto-generated method stub
		valueDescExpandMapper.deleteByCondition(params);
	}

	
	
	

}
