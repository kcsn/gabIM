package cn.com.realer.dao.provider.m;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.com.realer.core.generator.base.BaseMapper;
import cn.com.realer.core.support.provider.BaseProviderImpl;
import cn.com.realer.dao.expand.m.GabMBlockStatusExpandMapper;
import cn.com.realer.dao.generator.m.GabMBlockStatusMapper;
import cn.com.realer.model.provider.m.GabMBlockStatusProvider;
import cn.com.realer.pojo.GabFMessage;
import cn.com.realer.pojo.GabMBlockStatus;

import com.github.pagehelper.PageInfo;

@Service
public class GabMBlockStatusProviderImpl extends BaseProviderImpl<GabMBlockStatus> implements GabMBlockStatusProvider{

	@Autowired
	private GabMBlockStatusMapper gabMBlockStatusMapper;
	@Autowired
	private GabMBlockStatusExpandMapper gabMBlockStatusExpandMapper;
	
	@Override
	protected BaseMapper<GabMBlockStatus> getMapper() {
		// TODO Auto-generated method stub
		return gabMBlockStatusMapper;
	}

	@Override
	public PageInfo<GabMBlockStatus> query(Map<String, Object> params) {
		startPage(params);
		return new PageInfo<GabMBlockStatus>(gabMBlockStatusExpandMapper.selectList(params));
	}

	@Override
	public List<GabMBlockStatus> selectList(Map<String,Object> params) {
		// TODO Auto-generated method stub
		return gabMBlockStatusExpandMapper.selectList(params);
	}

	@Override
	public GabMBlockStatus selectOne(Map<String, Object> params) {
		// TODO Auto-generated method stub
		List<GabMBlockStatus> list  = gabMBlockStatusExpandMapper.selectOne(params);
		if(list.size()== 0){
			return null ;
		}
		return  list.get(0);
	}

	@Override
	public void insert(GabMBlockStatus gabMBlockStatus) {
		// TODO Auto-generated method stub
		gabMBlockStatusMapper.insert(gabMBlockStatus);
	}

	


}
