package cn.com.realer.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.com.realer.core.support.BaseService;
import cn.com.realer.model.provider.u.GabUPermissionProvider;
import cn.com.realer.pojo.GabUPermission;

@Service
public class GabUPermissionService extends BaseService<GabUPermissionProvider, GabUPermission>{

	@Autowired
	private GabUPermissionProvider permissionProvider;
	
	public List<GabUPermission> selectList(Map<String,Object> params){
		
		return permissionProvider.selectList(params);
	}
	
}
