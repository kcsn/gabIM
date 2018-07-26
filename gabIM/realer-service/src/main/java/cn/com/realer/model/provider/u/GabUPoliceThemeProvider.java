package cn.com.realer.model.provider.u;

import java.util.List;
import java.util.Map;

import com.github.pagehelper.PageInfo;

import cn.com.realer.core.support.provider.BaseProvider;
import cn.com.realer.pojo.GabUPoliceTheme;
import cn.com.realer.pojo.vo.GabUPoliceThemeVo;


/**
 * GabUPoliceThemeMapper Provider
 */
public interface GabUPoliceThemeProvider extends BaseProvider<GabUPoliceTheme> {
	
	List<GabUPoliceTheme> selectList(Map<String,Object> params);

	Long selectStatusCount(Map<String, Object> params);

	List<GabUPoliceThemeVo> selectAll(Map<String, Object> params);
	PageInfo<GabUPoliceThemeVo> queryVo(Map<String, Object> params) ;
}