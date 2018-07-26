package cn.com.realer.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageInfo;

import cn.com.realer.core.support.BaseService;
import cn.com.realer.model.provider.u.GabURoleProvider;
import cn.com.realer.pojo.GabURole;

@Service
public class GabURoleService extends BaseService<GabURoleProvider, GabURole>{

	@Autowired
	private GabURoleProvider roleProvider;
	
	public List<GabURole> selectList(Map<String,Object> params){
		
		return roleProvider.selectList(params);
	}
	
	public PageInfo<GabURole> query(Map<String, Object> params) {
		
		return roleProvider.query(params);
	}

	public void insert(GabURole role) {
		// TODO Auto-generated method stub
		roleProvider.insert(role);
	}
	
}
