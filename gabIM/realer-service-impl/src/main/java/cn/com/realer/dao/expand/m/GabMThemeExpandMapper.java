package cn.com.realer.dao.expand.m;

import java.util.List;
import java.util.Map;

import cn.com.realer.core.support.spring.data.redis.BaseExpandMapper;
import cn.com.realer.pojo.GabMTheme;


/**
 * GabMThemeMapper扩展
 */
public interface GabMThemeExpandMapper extends BaseExpandMapper<GabMTheme> {
	
	List<GabMTheme> selectList(Map<String,Object> params);

}