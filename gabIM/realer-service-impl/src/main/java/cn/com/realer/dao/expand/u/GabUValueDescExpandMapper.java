package cn.com.realer.dao.expand.u;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.spring.data.redis.BaseExpandMapper;
import cn.com.realer.pojo.GabUValueDesc;

/**
 * GabUValueDescMapper扩展
 */
public interface GabUValueDescExpandMapper extends BaseExpandMapper<GabUValueDesc> {
	
	List<GabUValueDesc> selectList(Map<String,Object> params);
	
	void deleteByCondition(Map<String, Object> params);

	Long selectPoliceCount(Map<String,Object> params);
	



	List<Map> selectPoliceCount1(Map<String, Object> params);
	
	List<Map> selectJWMSCount();
	List<Map> selectAllJWMSCount();

	List<Map<String, Object>> selectProportionByItemId(Map<String, Object> params);


}