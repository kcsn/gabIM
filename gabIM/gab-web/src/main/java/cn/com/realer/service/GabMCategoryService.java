package cn.com.realer.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import cn.com.realer.core.support.BaseService;
import cn.com.realer.model.provider.m.GabMCategoryProvider;
import cn.com.realer.pojo.GabMBlock;
import cn.com.realer.pojo.GabMCategory;

@Service
public class GabMCategoryService extends BaseService<GabMCategoryProvider, GabMCategory>{

	
	public List<GabMCategory> selectList(Map<String,Object> params){
		return this.provider.selectList(params);
	}
}
