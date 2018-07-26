package cn.com.realer.model.provider.u;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.provider.BaseProvider;
import cn.com.realer.pojo.GabUValueDesc;

/**
 * GabUValueDescMapper Provider
 */
public interface GabUValueDescProvider extends BaseProvider<GabUValueDesc> {
	
	
	List<GabUValueDesc> selectList(Map<String,Object> params);
	
	void deleteByCondition(Map<String, Object> params);
	
	Map<String, Object> selectPerSort(Integer themeId);


	Long selectPoliceCount(Map<String,Object> params);

	
	List<Map<String, Object>> selectProportionByItemId(Map<String, Object> params);

	List<Map> selectPoliceCount1(Map<String, Object> params);

	List<Map> selectJWMSCount();
	List<Map> selectAllJWMSCount();

	void deleteByParams(Map<String, Object> params);

}