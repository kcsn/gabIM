package cn.com.realer.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageInfo;

import cn.com.realer.core.support.BaseService;
import cn.com.realer.model.provider.u.GabUPoliceThemeProvider;
import cn.com.realer.pojo.GabUPoliceTheme;
import cn.com.realer.pojo.vo.GabUPoliceThemeVo;

@Service
public class GabUPoliceThemeService extends BaseService<GabUPoliceThemeProvider, GabUPoliceTheme>{

	@Autowired
	private GabUPoliceThemeProvider policeThemeProvider;
	
	public List<GabUPoliceTheme> selectList(Map<String,Object> params){
		
		return policeThemeProvider.selectList(params);
	}
	
	public Long selectStatusCount(Map<String,Object> params){
		return this.provider.selectStatusCount(params);
	}

	public List<GabUPoliceThemeVo> selectAll(Map<String,Object> params) {
		// TODO Auto-generated method stub
		return policeThemeProvider.selectAll(params);
	}

	public PageInfo<GabUPoliceThemeVo> queryVo(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return policeThemeProvider.queryVo(params);
	}
}
