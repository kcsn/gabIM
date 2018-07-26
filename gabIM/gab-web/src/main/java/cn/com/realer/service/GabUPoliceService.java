package cn.com.realer.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cn.com.realer.core.support.BaseService;
import cn.com.realer.core.util.DateUtil;
import cn.com.realer.enums.ActiveEnum;
import cn.com.realer.enums.Const;
import cn.com.realer.enums.LoginEnum;
import cn.com.realer.enums.RegisterEnum;
import cn.com.realer.enums.ServerResponse;
import cn.com.realer.model.provider.u.GabUPoliceProvider;
import cn.com.realer.pojo.GabUPolice;
import cn.com.realer.web.utils.Md5ToolsUtil;
import cn.com.realer.web.utils.SendEmail;

import com.github.pagehelper.PageInfo;

@Service
public class GabUPoliceService extends BaseService<GabUPoliceProvider, GabUPolice>{

	@Autowired
	private GabUPoliceProvider policeProvider;
	
	public List<GabUPolice> selectList(Map<String,Object> params){
		
		return policeProvider.selectList(params);
	}
	

	public PageInfo<GabUPolice> query(Map<String, Object> params){
		return policeProvider.query(params);
	}

	//根据用户名回显数据
	public GabUPolice queryByName(@Param(value="name") String name){
		
		return policeProvider.queryByName(name);
	}
	
	
	//登录
	public ServerResponse<GabUPolice> Login(String name, String password) {
        int resCount=policeProvider.checkPoliceName(name);
        if(resCount<1){
            return ServerResponse.createByError(LoginEnum.NO_USER.getMsg());
        }
        //md5加密
        String md5Password=Md5ToolsUtil.cell32(password);
        GabUPolice police=policeProvider.Login(name,md5Password);
        if(police == null){
            return ServerResponse.createByError(LoginEnum.ERROR_PASSWORD.getMsg());
        }
        if(police.getActiveStatus()!=1){
        	return ServerResponse.createByError(LoginEnum.NO_ACTIVE.getMsg());
        }
        if(police.getIsdelete()!=0){
        	return ServerResponse.createByError(LoginEnum.STOP_USER.getMsg());
        }
        police.setPassword(StringUtils.EMPTY);
        return ServerResponse.createBySuccess(LoginEnum.LOGIN_SUCCESS.getMsg(),police);
    }

//    //登录
//	public GabUPolice Login(String name, String password) {
//        return policeProvider.Login(name,password);
//    }

	//注册
    public ServerResponse<String> register(GabUPolice police){
//        //先验证用户名是否被占用
//        int resCount=policeProvider.checkPoliceName(police.getName());
//        if(resCount>0){
//            return ServerResponse.createByError(RegisterEnum.USERNAME_EXIST.getMsg());
//        }
//        //判断 邮箱
//        resCount=policeProvider.checkEmail(police.getEmail());
//        if(resCount>0){
//            return ServerResponse.createByError(RegisterEnum.EMAIL_EXIST.getMsg());
//        }

        ServerResponse validReponse=this.checkValid(police.getName(),Const.USERNAME);
        if(!validReponse.isSuccess()){
        	return validReponse;
        }
        validReponse=this.checkValid(police.getEmail(),Const.EMAIL);
        if(!validReponse.isSuccess()){
        	return validReponse;
        }
        //md5加密
        police.setPassword(Md5ToolsUtil.cell32(police.getPassword()));
        police.setActiveCode(Md5ToolsUtil.cell32(police.getEmail())+DateUtil.getDateTime());//设置用户激活码
        police.setIsdelete((short)0);
        police.setCreateTime(new Date());
        int resCount=policeProvider.add(police);
        if(resCount==0){
            return ServerResponse.createByError(RegisterEnum.REGISTER_ERROR.getMsg());
        }
        String emailMsg = "注册成功，请<a href='http://127.0.0.1:8080/gabIM/api/police/activation?activeCode="+police.getActiveCode()+"'>激活</a>后登录";
		SendEmail.sendMail(police.getEmail(), emailMsg);//发送邮件
        return ServerResponse.createBySuccessMessage(RegisterEnum.REGISTER_SUCESS.getMsg());
    }
    
	//激活
	public ServerResponse<String> activePolice(String activeCode){
		
		//根据激活码查找用户
		GabUPolice police = policeProvider.queryByActiveCode(activeCode);
		if(police != null){
			//激活用户
			police.setActiveStatus((short)1);
			policeProvider.update(police);
			return ServerResponse.createBySuccessMessage(ActiveEnum.ACTIVE_SUCCESS.getMsg());
		}
		return ServerResponse.createByError(ActiveEnum.ACTIVE_ERROR.getMsg());
	}
	
	//修改密码
    public ServerResponse<String> resetPassword(String passwordNew, String passwordOld,GabUPolice police) {
        //防止横向越权，要校验用户的旧密码
        int resCount = policeProvider.checkPassword(Md5ToolsUtil.cell32(passwordOld),police.getId());
        if(resCount == 0){
            return ServerResponse.createByError("旧密码错误");
        }
        police.setPassword(Md5ToolsUtil.cell32(passwordNew));
        int updateCount = policeProvider.updateByPrimaryKey(police);
        if(updateCount>0){
            return ServerResponse.createBySuccessMessage("密码更新成功");
        }else{
        	return ServerResponse.createByError("密码更新失败");
        }
    }
    
  //修改用户信息
    public ServerResponse<GabUPolice> updateInformation(GabUPolice police){
        //name是不能被更新的
        //email也要进行一个校验,校验新的email是不是已经存在,并且存在的email如果相同的话,不能是我们当前的这个用户的.
        int resultCount = policeProvider.checkEmailByPoliceId(police.getEmail(),police.getId());
        if(resultCount > 0){
            return ServerResponse.createByError("email已存在,请更换email再尝试更新");
        }
        GabUPolice updatePolice = new GabUPolice();
        updatePolice.setId(police.getId());
        updatePolice.setLocationId(police.getLocationId());
        updatePolice.setAddress(police.getAddress());

        int updateCount = policeProvider.updateByPrimaryKey(updatePolice);
        if(updateCount > 0){
            return ServerResponse.createBySuccess("更新信息成功",updatePolice);
        }
        return ServerResponse.createByError("更新信息失败");
    }

	//用户名 与 邮箱 校验
    public ServerResponse<String> checkValid(String str,String type){
        if(org.apache.commons.lang3.StringUtils.isNotBlank(type)){
            //开始校验
            if(Const.USERNAME.equals(type)){
                int resCount=policeProvider.checkPoliceName(str);
                if(resCount>0){
                    return ServerResponse.createByError(RegisterEnum.USERNAME_EXIST.getMsg());
                }
            }
            if(Const.EMAIL.equals(type)){
                int resCount=policeProvider.checkEmail(str);
                if(resCount>0){
                    return ServerResponse.createByError(RegisterEnum.EMAIL_EXIST.getMsg());
                }
            }
        }else {
            return ServerResponse.createByError(RegisterEnum.PARAMETER_ERROR.getMsg());
        }
        return ServerResponse.createBySuccessMessage("校验成功");
    }
	
    //忘记密码
    public ServerResponse<String> findPassword(String email, String name) {
        GabUPolice police = policeProvider.checkEmailByPoliceName(email, name);
        if(police == null){
        	return ServerResponse.createByError("用户与邮箱不匹配");
        }
        String newPassword = String.valueOf((int)(Math.random()*9+1)*100000);
        String emailMsg = "新密码:"+newPassword+"，请登录修改密码";
		SendEmail.sendMail(email, emailMsg);//发送邮件
        police.setPassword(Md5ToolsUtil.cell32(newPassword));
		return ServerResponse.createBySuccessMessage("密码找回成功");
    }
    
    //重置密码
    public ServerResponse<String> coverPassword(GabUPolice police) {
        String defaultPassword = "123456";
        police.setPassword(Md5ToolsUtil.cell32(defaultPassword));
        int updateCount = policeProvider.updateByPrimaryKey(police);
        if(updateCount>0){
            return ServerResponse.createBySuccessMessage("密码重置成功");
        }else{
        	return ServerResponse.createByError("密码重置失败");
        }
    }
	
	
}
