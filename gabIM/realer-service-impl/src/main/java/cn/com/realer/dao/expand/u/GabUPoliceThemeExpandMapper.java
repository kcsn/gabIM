package cn.com.realer.dao.expand.u;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.spring.data.redis.BaseExpandMapper;
import cn.com.realer.pojo.GabUPoliceTheme;
import cn.com.realer.pojo.vo.GabUPoliceThemeVo;

/**
 * GabUPoliceThemeMapper扩展
 */
public interface GabUPoliceThemeExpandMapper extends BaseExpandMapper<GabUPoliceTheme> {
	
	List<GabUPoliceTheme> selectList(Map<String,Object> params);

	Long selectStatusCount(Map<String, Object> params);

	List<GabUPoliceThemeVo> selectAll(Map<String, Object> params);

}