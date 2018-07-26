package cn.com.realer.dao.provider.m;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.com.realer.core.generator.base.BaseMapper;
import cn.com.realer.core.support.provider.BaseProviderImpl;
import cn.com.realer.dao.expand.m.GabMModelExpandMapper;
import cn.com.realer.dao.generator.m.GabMModelMapper;
import cn.com.realer.model.provider.m.GabMModelProvider;
import cn.com.realer.pojo.GabMLocation;
import cn.com.realer.pojo.GabMModel;

import com.github.pagehelper.PageInfo;

@Service
public class GabMModelProviderImpl extends BaseProviderImpl<GabMModel> implements GabMModelProvider{

	
	@Autowired
	private GabMModelMapper gabMModelMapper;
	@Autowired
	private GabMModelExpandMapper gabMModelExpandMapper;
	
	@Override
	protected BaseMapper<GabMModel> getMapper() {
		// TODO Auto-generated method stub
		return gabMModelMapper;
	}

	@Override
	public PageInfo<GabMModel> query(Map<String, Object> params) {
		startPage(params);
		return new PageInfo<GabMModel>(gabMModelExpandMapper.selectList(params));
	}

	@Override
	public List<GabMModel> selectList(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return gabMModelExpandMapper.selectList(params);
	}

}
