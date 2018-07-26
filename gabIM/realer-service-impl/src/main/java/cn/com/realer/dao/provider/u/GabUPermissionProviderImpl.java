package cn.com.realer.dao.provider.u;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageInfo;

import cn.com.realer.core.generator.base.BaseMapper;
import cn.com.realer.core.support.provider.BaseProviderImpl;
import cn.com.realer.dao.expand.u.GabUPermissionExpandMapper;
import cn.com.realer.dao.generator.u.GabUPermissionMapper;
import cn.com.realer.model.provider.u.GabUPermissionProvider;
import cn.com.realer.pojo.GabUPermission;
@Service
public class GabUPermissionProviderImpl extends BaseProviderImpl<GabUPermission> implements GabUPermissionProvider{

	@Autowired
	private GabUPermissionMapper permissionMapper;
	
	@Autowired
	private GabUPermissionExpandMapper permissionExpandMapper;
	
	@Override
	protected BaseMapper<GabUPermission> getMapper() {
		
		return permissionMapper;
	}

	@Override
	public PageInfo<GabUPermission> query(Map<String, Object> params) {
		startPage(params);
		return new PageInfo<GabUPermission>(permissionExpandMapper.selectList(params));
	}

	@Override
	public List<GabUPermission> selectList(Map<String, Object> params) {
		return permissionExpandMapper.selectList(params);
	}

}
