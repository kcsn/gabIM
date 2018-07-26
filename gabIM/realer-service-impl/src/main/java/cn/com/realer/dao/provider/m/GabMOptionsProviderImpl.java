package cn.com.realer.dao.provider.m;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.com.realer.core.generator.base.BaseMapper;
import cn.com.realer.core.support.provider.BaseProviderImpl;
import cn.com.realer.dao.expand.m.GabMOptionsExpandMapper;
import cn.com.realer.dao.generator.m.GabMOptionsMapper;
import cn.com.realer.model.provider.m.GabMOptionsProvider;
import cn.com.realer.pojo.GabMModel;
import cn.com.realer.pojo.GabMOptions;

import com.github.pagehelper.PageInfo;

@Service
public class GabMOptionsProviderImpl extends BaseProviderImpl<GabMOptions> implements GabMOptionsProvider{

	
	@Autowired
	private GabMOptionsMapper gabMOptionsMapper;
	@Autowired
	private GabMOptionsExpandMapper gabMOptionsExpandMapper;
	
	@Override
	protected BaseMapper<GabMOptions> getMapper() {
		// TODO Auto-generated method stub
		return gabMOptionsMapper;
	}

	@Override
	public PageInfo<GabMOptions> query(Map<String, Object> params) {
		startPage(params);
		return new PageInfo<GabMOptions>(gabMOptionsExpandMapper.selectList(params));
	}

	@Override
	public List<GabMOptions> selectList(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return gabMOptionsExpandMapper.selectList(params);
	}

}
