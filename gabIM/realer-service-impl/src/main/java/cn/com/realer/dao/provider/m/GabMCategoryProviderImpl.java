package cn.com.realer.dao.provider.m;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.com.realer.core.generator.base.BaseMapper;
import cn.com.realer.core.support.provider.BaseProviderImpl;
import cn.com.realer.dao.expand.m.GabMCategoryExpandMapper;
import cn.com.realer.dao.generator.m.GabMCategoryMapper;
import cn.com.realer.model.provider.m.GabMCategoryProvider;
import cn.com.realer.pojo.GabMBlockStatus;
import cn.com.realer.pojo.GabMCategory;

import com.github.pagehelper.PageInfo;
@Service
public class GabMCategoryProviderImpl extends BaseProviderImpl<GabMCategory> implements GabMCategoryProvider{

	@Autowired
	private GabMCategoryMapper gabMCategoryMapper;
	@Autowired
	private GabMCategoryExpandMapper gabMCategoryExpandMapper;
	
	@Override
	protected BaseMapper<GabMCategory> getMapper() {
		// TODO Auto-generated method stub
		return gabMCategoryMapper;
	}

	@Override
	public PageInfo<GabMCategory> query(Map<String, Object> params) {
		startPage(params);
		return new PageInfo<GabMCategory>(gabMCategoryExpandMapper.selectList(params));
	}

	@Override
	public List<GabMCategory> selectList(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return gabMCategoryExpandMapper.selectList(params);
	}

}
