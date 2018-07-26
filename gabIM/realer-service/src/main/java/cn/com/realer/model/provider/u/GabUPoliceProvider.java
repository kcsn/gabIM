package cn.com.realer.model.provider.u;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import cn.com.realer.core.support.provider.BaseProvider;
import cn.com.realer.pojo.GabUPolice;

/**
 * GabUPoliceMapper Provider
 */
public interface GabUPoliceProvider extends BaseProvider<GabUPolice> {

	List<GabUPolice> selectList(Map<String,Object> params);
	
	GabUPolice queryByName(@Param(value="name") String name);
	
	
	GabUPolice queryByActiveCode(@Param(value="activeCode") String activeCode);
	
	//注册
	int add(GabUPolice police);
	//注册  判断 用户名 是否被占用
	int checkPoliceName(@Param(value="name") String name);
	//判断 Email 是否被占用
	int checkEmail(@Param(value="email") String email);
	//判断 用户密码是否正确
	int checkPassword(@Param("password")String password,@Param("id") int id);
	//判断 用户邮箱是否正确
	int checkEmailByPoliceId(@Param("email")String email,@Param("id") int id);

	//登录 认证
	GabUPolice Login(@Param(value="name") String name,@Param(value="password") String password);
	//激活
	GabUPolice selectByActiveCode(@Param(value="activeCode") String activeCode);
	
	//修改密码 
	int updateByPrimaryKey(GabUPolice police);
	
	//忘记密码
	GabUPolice checkEmailByPoliceName(@Param("email")String email,@Param(value="name") String name);

	
}