package cn.com.realer.dao.provider.u;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageInfo;

import cn.com.realer.core.generator.base.BaseMapper;
import cn.com.realer.core.support.provider.BaseProviderImpl;
import cn.com.realer.dao.expand.u.GabURoleExpandMapper;
import cn.com.realer.dao.generator.u.GabURoleMapper;
import cn.com.realer.model.provider.u.GabURoleProvider;
import cn.com.realer.pojo.GabURole;
@Service
public class GabURoleProviderImpl extends BaseProviderImpl<GabURole> implements GabURoleProvider{

	@Autowired
	private GabURoleMapper roleMapper;
	@Autowired
	private GabURoleExpandMapper roleExpandMapper;
	
	@Override
	protected BaseMapper<GabURole> getMapper() {
		return roleMapper;
	}

	@Override
	public PageInfo<GabURole> query(Map<String, Object> params) {
		startPage(params);
		return new PageInfo<GabURole>(roleExpandMapper.selectList(params));
	}

	@Override
	public List<GabURole> selectList(Map<String, Object> params) {
		return roleExpandMapper.selectList(params);
	}

	@Override
	public void insert(GabURole role) {
		// TODO Auto-generated method stub
		roleMapper.insert(role);
	}

}
