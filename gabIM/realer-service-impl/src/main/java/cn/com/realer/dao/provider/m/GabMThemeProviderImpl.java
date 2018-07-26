package cn.com.realer.dao.provider.m;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;

import cn.com.realer.core.generator.base.BaseMapper;
import cn.com.realer.core.support.provider.BaseProviderImpl;
import cn.com.realer.dao.expand.m.GabMThemeExpandMapper;
import cn.com.realer.dao.generator.m.GabMThemeMapper;
import cn.com.realer.model.provider.m.GabMThemeProvider;
import cn.com.realer.pojo.GabMTheme;
@Service
public class GabMThemeProviderImpl extends BaseProviderImpl<GabMTheme> implements GabMThemeProvider{

	@Autowired
	private GabMThemeMapper themeMapper;
	
	@Autowired
	private GabMThemeExpandMapper  themeExpandMapper;
	
	@Override
	protected BaseMapper<GabMTheme> getMapper() {
		return themeMapper;
	}

	@Override
	public PageInfo<GabMTheme> query(Map<String, Object> params) {
		startPage(params);
		return new PageInfo<GabMTheme>(themeExpandMapper.selectList(params));
	}

	@Override
	public List<GabMTheme> selectList(Map<String, Object> params) {
		return themeExpandMapper.selectList(params);
	}

	
	
	
	
}
