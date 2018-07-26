package cn.com.realer.dao.provider.m;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.com.realer.core.generator.base.BaseMapper;
import cn.com.realer.core.support.provider.BaseProviderImpl;
import cn.com.realer.dao.expand.m.GabMLocationExpandMapper;
import cn.com.realer.dao.generator.m.GabMLocationMapper;
import cn.com.realer.model.provider.m.GabMLocationProvider;
import cn.com.realer.pojo.GabMItem;
import cn.com.realer.pojo.GabMLocation;

import com.github.pagehelper.PageInfo;

@Service
public class GabMLocationProviderImpl extends BaseProviderImpl<GabMLocation> implements GabMLocationProvider{

	@Autowired
	private GabMLocationMapper gabMLocationMapper;
	@Autowired
	private GabMLocationExpandMapper gabMLocationExpandMapper;
	
	@Override
	protected BaseMapper<GabMLocation> getMapper() {
		// TODO Auto-generated method stub
		return gabMLocationMapper;
	}

	@Override
	public PageInfo<GabMLocation> query(Map<String, Object> params) {
		startPage(params);
		return new PageInfo<GabMLocation>(gabMLocationExpandMapper.selectList(params));
	}

	@Override
	public List<GabMLocation> selectList(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return gabMLocationExpandMapper.selectList(params);
	}

}
