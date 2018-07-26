package cn.com.realer.model.provider.m;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.provider.BaseProvider;
import cn.com.realer.pojo.GabMTheme;

/**
 * GabMThemeMapper Provider
 */
public interface GabMThemeProvider extends BaseProvider<GabMTheme> {
	
	List<GabMTheme> selectList(Map<String,Object> params);
	
}