package cn.com.realer.dao.provider.u;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageInfo;

import cn.com.realer.core.generator.base.BaseMapper;
import cn.com.realer.core.support.provider.BaseProviderImpl;
import cn.com.realer.dao.expand.u.GabUPoliceExpandMapper;
import cn.com.realer.dao.generator.u.GabUPoliceMapper;
import cn.com.realer.model.provider.u.GabUPoliceProvider;
import cn.com.realer.pojo.GabUPolice;

@Service
public class GabUPoliceProviderImpl extends BaseProviderImpl<GabUPolice> implements GabUPoliceProvider{

	@Autowired
	private GabUPoliceMapper policeMapper;
	@Autowired
	private GabUPoliceExpandMapper policeExpandMapper;
	
	@Override
	protected BaseMapper<GabUPolice> getMapper() {
		return policeMapper;
	}
	
	//添加
	@Override
	public int add(GabUPolice police) {
		return policeMapper.insert(police);
	}
	
//	//更新
//	@Override
//	public int updateByPrimaryKey(GabUPolice police) {
//		return policeExpandMapper.updateByPrimaryKey(police);
//	}
	
	@Override
	public PageInfo<GabUPolice> query(Map<String, Object> params) {
		startPage(params);
		return new PageInfo<GabUPolice>(policeExpandMapper.selectList(params));
	}

	@Override
	public List<GabUPolice> selectList(Map<String, Object> params) {
		return policeExpandMapper.selectList(params);
	}

	@Override
	public GabUPolice queryByName(@Param(value="name") String name) {
		// TODO Auto-generated method stub
		return policeExpandMapper.queryByName(name);
	}

	@Override
	public GabUPolice queryByActiveCode(@Param(value="activeCode") String activeCode) {
		// TODO Auto-generated method stub
		return policeExpandMapper.queryByActiveCode(activeCode);
	}


	//注册  判断 用户名 是否被占用
	@Override
	public int checkPoliceName(String name) {
		// TODO Auto-generated method stub
		return policeExpandMapper.checkPoliceName(name);
	}

	//判断 Email 是否被占用
	@Override
	public int checkEmail(String email) {
		// TODO Auto-generated method stub
		return policeExpandMapper.checkEmail(email);
	}
	
	//判断 用户密码是否正确
	@Override
	public int checkPassword(@Param("password")String password,@Param("id") int id) {
		// TODO Auto-generated method stub
		return policeExpandMapper.checkPassword(password,id);
	}
	
	//判断 用户邮箱是否正确
	@Override
	public int checkEmailByPoliceId(String email, int id) {
		// TODO Auto-generated method stub
		return policeExpandMapper.checkEmailByPoliceId(email, id);
	}
	

	//登录 认证
	@Override
	public GabUPolice Login(@Param(value="name") String name,@Param(value="password") String password) {
		// TODO Auto-generated method stub
		return policeExpandMapper.Login(name, password);
	}

	//激活
	@Override
	public GabUPolice selectByActiveCode(String activeCode) {
		// TODO Auto-generated method stub
		return policeExpandMapper.selectByActiveCode(activeCode);
	}

	//修改密码
	@Override
	public int updateByPrimaryKey(GabUPolice police) {
		// TODO Auto-generated method stub
		return policeExpandMapper.updateByPrimaryKey(police);
	}

	//忘记密码
	@Override
	public GabUPolice checkEmailByPoliceName(String email, String name) {
		// TODO Auto-generated method stub
		return policeExpandMapper.checkEmailByPoliceName(email,name);
	}


}
