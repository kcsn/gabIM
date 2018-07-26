package cn.com.realer.dao.provider.m;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageInfo;

import cn.com.realer.core.generator.base.BaseMapper;
import cn.com.realer.core.support.provider.BaseProviderImpl;
import cn.com.realer.dao.expand.m.GabMItemExpandMapper;
import cn.com.realer.dao.generator.m.GabMItemMapper;
import cn.com.realer.model.provider.m.GabMItemProvider;
import cn.com.realer.pojo.GabMItem;
@Service
public class GabMItemProviderImpl extends BaseProviderImpl<GabMItem> implements GabMItemProvider{

	@Autowired
	private GabMItemMapper gabMItemMapper;
	@Autowired
	private GabMItemExpandMapper gabMItemExpandMapper;
	
	
	@Override
	protected BaseMapper<GabMItem> getMapper() {
		// TODO Auto-generated method stub
		return gabMItemMapper;
	}

	@Override
	public PageInfo<GabMItem> query(Map<String, Object> params) {
		startPage(params);
		return new PageInfo<GabMItem>(gabMItemExpandMapper.selectList(params));
	}

	@Override
	public List<GabMItem> selectList(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return gabMItemExpandMapper.selectList(params);
	}


	
	
	
	
	
	
}
