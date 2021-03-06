package cn.com.realer.dao.expand.u;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import cn.com.realer.core.support.spring.data.redis.BaseExpandMapper;
import cn.com.realer.pojo.GabUPolice;

/**
 * GabUPoliceMapper扩展
 */
public interface GabUPoliceExpandMapper extends BaseExpandMapper<GabUPolice> {

	List<GabUPolice> selectList(Map<String,Object> params);
	
	GabUPolice queryByName(@Param(value="name") String name);
	
	GabUPolice queryByActiveCode(@Param(value="activeCode") String activeCode);
	
	//更新
	int updateByPrimaryKey(GabUPolice police);
	
	//注册  判断 用户名 是否被占用
	int checkPoliceName(@Param(value="name") String name);
	//判断 Email 是否被占用
	int checkEmail(@Param(value="email") String email);
	//判断 用户密码是否正确
	int checkPassword(@Param("password")String password,@Param("id") int id);
	//判断 用户密码是否正确
	int checkEmailByPoliceId(@Param("email")String email,@Param("id") int id);
	
	
	//登录 认证
	GabUPolice Login(@Param(value="name") String name,@Param(value="password") String password);
	//修改密码 
	void updatePasswordByPoliceName(@Param(value="name") String name,@Param(value="password") String password);
	//激活
	GabUPolice selectByActiveCode(@Param(value="activeCode") String activeCode);
	//忘记密码
	GabUPolice checkEmailByPoliceName(@Param("email")String email,@Param(value="name") String name);

	
}
