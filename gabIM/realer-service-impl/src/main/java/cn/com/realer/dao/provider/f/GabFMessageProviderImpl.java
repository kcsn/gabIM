package cn.com.realer.dao.provider.f;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.com.realer.core.generator.base.BaseMapper;
import cn.com.realer.core.support.provider.BaseProviderImpl;
import cn.com.realer.dao.expand.f.GabFMessageExpandMapper;
import cn.com.realer.dao.generator.f.GabFMessageMapper;
import cn.com.realer.model.provider.f.GabFMessageProvider;
import cn.com.realer.pojo.GabFMessage;

import com.github.pagehelper.PageInfo;

@Service
public class GabFMessageProviderImpl extends BaseProviderImpl<GabFMessage> implements GabFMessageProvider{

	@Autowired
	private GabFMessageMapper gabFMessageMapper;
	@Autowired
	private GabFMessageExpandMapper gabFMessageExpandMapper;

	@Override
	protected BaseMapper<GabFMessage> getMapper() {
		// TODO Auto-generated method stub
		return gabFMessageMapper;
	}

	@Override
	public PageInfo<GabFMessage> query(Map<String, Object> params) {
		startPage(params);
		return new PageInfo<GabFMessage>(gabFMessageExpandMapper.selectList(params));
	}

	@Override
	public List<GabFMessage> selectList(Map<String, Object> params) {
		// TODO Auto-generated method stub
		return gabFMessageExpandMapper.selectList(params);
	}

   
	
	
	
	
}

