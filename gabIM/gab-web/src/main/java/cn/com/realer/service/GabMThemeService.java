package cn.com.realer.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.com.realer.core.support.BaseService;
import cn.com.realer.model.provider.m.GabMThemeProvider;
import cn.com.realer.pojo.GabMTheme;

@Service
public class GabMThemeService extends BaseService<GabMThemeProvider, GabMTheme>{

	@Autowired
	private GabMThemeProvider themeProvider;
	
	public List<GabMTheme> selectList(Map<String,Object> params){
		
		return themeProvider.selectList(params);
	}
	
}
