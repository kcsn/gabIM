package cn.com.realer.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import cn.com.realer.core.support.BaseService;
import cn.com.realer.model.provider.m.GabMItemProvider;
import cn.com.realer.pojo.GabMBlockStatus;
import cn.com.realer.pojo.GabMItem;

@Service
public class GabMItemService extends BaseService<GabMItemProvider, GabMItem>{

	public List<GabMItem> selectList(Map<String,Object> params){
		return this.provider.selectList(params);
	}
}
