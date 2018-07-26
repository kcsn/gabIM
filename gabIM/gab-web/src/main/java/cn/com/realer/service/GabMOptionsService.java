package cn.com.realer.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import cn.com.realer.core.support.BaseService;
import cn.com.realer.model.provider.m.GabMOptionsProvider;
import cn.com.realer.pojo.GabMModel;
import cn.com.realer.pojo.GabMOptions;

@Service
public class GabMOptionsService extends BaseService<GabMOptionsProvider, GabMOptions> {

	
	public List<GabMOptions> selectList(Map<String,Object> params){
		return this.provider.selectList(params);
	}
	
}
