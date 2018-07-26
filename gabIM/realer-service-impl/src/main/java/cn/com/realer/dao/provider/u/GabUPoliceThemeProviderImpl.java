package cn.com.realer.dao.provider.u;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.com.realer.core.generator.base.BaseMapper;
import cn.com.realer.core.support.provider.BaseProviderImpl;
import cn.com.realer.dao.expand.u.GabUPoliceThemeExpandMapper;
import cn.com.realer.dao.generator.u.GabUPoliceThemeMapper;
import cn.com.realer.model.provider.u.GabUPoliceThemeProvider;
import cn.com.realer.pojo.GabUPoliceTheme;
import cn.com.realer.pojo.vo.GabUPoliceThemeVo;

import com.github.pagehelper.PageInfo;
@Service
public class GabUPoliceThemeProviderImpl extends BaseProviderImpl<GabUPoliceTheme> implements GabUPoliceThemeProvider{

	@Autowired
	private GabUPoliceThemeMapper policeThemeMapper;
	@Autowired
	private GabUPoliceThemeExpandMapper policeThemeExpandMapper;
	
	@Override
	protected BaseMapper<GabUPoliceTheme> getMapper() {
		return policeThemeMapper;
	}

	@Override
	public PageInfo<GabUPoliceTheme> query(Map<String, Object> params) {
		startPage(params);
		return new PageInfo<GabUPoliceTheme>(policeThemeExpandMapper.selectList(params));
	}

	@Override
	public List<GabUPoliceTheme> selectList(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return policeThemeExpandMapper.selectList(params);
	}

	@Override
	public Long selectStatusCount(Map<String, Object> params) {
		
		return policeThemeExpandMapper.selectStatusCount(params);
	}

	public PageInfo<GabUPoliceThemeVo> queryVo(Map<String, Object> params) {
		startPage(params);
		return new PageInfo<GabUPoliceThemeVo>(policeThemeExpandMapper.selectAll(params));
	}

	@Override
	public List<GabUPoliceThemeVo> selectAll(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return policeThemeExpandMapper.selectAll(params);
	}

}
