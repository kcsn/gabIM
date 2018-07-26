package cn.com.realer.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import cn.com.realer.core.support.BaseService;
import cn.com.realer.model.provider.m.GabMModelProvider;
import cn.com.realer.pojo.GabMLocation;
import cn.com.realer.pojo.GabMModel;

@Service
public class GabMModelService extends BaseService<GabMModelProvider, GabMModel> {

	
	public List<GabMModel> selectList(Map<String,Object> params){
		return this.provider.selectList(params);
	}
}
