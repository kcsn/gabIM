package cn.com.realer.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import cn.com.realer.core.support.BaseService;
import cn.com.realer.model.provider.m.GabMLocationProvider;
import cn.com.realer.pojo.GabMItem;
import cn.com.realer.pojo.GabMLocation;

@Service
public class GabMLocationService extends BaseService<GabMLocationProvider, GabMLocation>{

	public List<GabMLocation> selectList(Map<String,Object> params){
		return this.provider.selectList(params);
	}
	
}
