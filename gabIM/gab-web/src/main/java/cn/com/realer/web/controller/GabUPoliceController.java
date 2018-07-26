package cn.com.realer.web.controller;

import cn.com.realer.web.utils.HttpServletRequestUtil;
import io.swagger.annotations.ApiOperation;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cn.com.realer.core.support.BaseController;
import cn.com.realer.core.support.HttpCode;
import cn.com.realer.core.util.Request2ModelUtil;
import cn.com.realer.core.util.WebUtil;
import cn.com.realer.enums.Const;
import cn.com.realer.enums.ServerResponse;
import cn.com.realer.pojo.GabUPolice;
import cn.com.realer.service.GabUPoliceService;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("api/police")
public class GabUPoliceController extends BaseController{

	@Autowired
	private GabUPoliceService policeService;
	
	@ApiOperation(value = "添加用户", httpMethod = "POST", notes = "添加用户")
	@RequestMapping("add-police")
	public Object addPolice(ModelMap modelMap,HttpServletRequest request) {
		try {
			GabUPolice police=Request2ModelUtil.covert(GabUPolice.class, request);
			police.setStatus((short)0);
			policeService.add(police);
			return setMap(HttpCode.OK, police);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}

	}


	@ApiOperation(value = "修改用户", httpMethod = "POST", notes = "修改用户")
	@RequestMapping("update-police")
	public Object updatePolice( ModelMap modelMap,HttpServletRequest request) {
		try {
			GabUPolice police=Request2ModelUtil.covert(GabUPolice.class, request);
			policeService.update(police);
			return setMap(HttpCode.OK, police);
		} catch (Exception e) {
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}

	}
	
	@ApiOperation(value = "重置用户密码", httpMethod = "POST", notes = "重置用户密码")
	@RequestMapping("update-police-repassword")
	public Object updateRepassword(@RequestParam(value = "newpassword", required = true)String password,@RequestParam(value = "id", required = true)Integer id, ModelMap modelMap) {
		try {
			//判断传入密码的长度等
			
			GabUPolice police = policeService.queryById(id);
			police.setPassword(password);
			policeService.update(police);
			return setMap(HttpCode.OK, police);
		} catch (Exception e) {
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}
		
	}

	@ApiOperation(value = "删除用户", httpMethod = "DELETE", notes = "删除用户")
	@RequestMapping("delete-police")
	public Object deletePolice(Integer id, ModelMap modelMap) {
		try {
			policeService.delete(id);
			return setMap(HttpCode.OK,null);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}

	}

	@ApiOperation(value = "查询全部用户", httpMethod = "GET", notes = "查询全部用户")
	@RequestMapping("police-list")
	public Object selectAll(ModelMap modelMap) {
		try {
			List<GabUPolice> permissions = policeService.selectList(null);
			return setMap(HttpCode.OK, permissions);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
			}
	}

	@ApiOperation(value = "根据主键查询用户", httpMethod = "GET", notes = "根据主键查询用户")
	@RequestMapping("select-police")
	public Object selectById(Integer id,ModelMap modelMap) {
		try {
			GabUPolice police = policeService.queryById(id);
			return setMap(HttpCode.OK, police);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}
	}
	

	@ApiOperation(value = "分页查询用户", httpMethod = "GET", notes = "分页查询用户")
	@RequestMapping("police-list-page")
	public Object selectByPage(ModelMap modelMap, HttpServletRequest request) {
		try {
			Map<String, Object> params = WebUtil.getParameterMap(request);
			try {
				params.put("pageNum", Integer.parseInt(params.get("pageNum").toString()));
				params.put("pageSize", Integer.parseInt(params.get("pageSize").toString()));
			} catch (Exception e) {
				// TODO: handle exception
			}
			PageInfo<GabUPolice> permissions = policeService.query(params);
			return setMap(HttpCode.OK, permissions);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR, null);
		}
	}
			
	//根据公安部名称查询用户，进行显示数据
	@ApiOperation(value = "根据公安部名称查询用户", httpMethod = "GET", notes = "根据公安部名称查询用户")
	@RequestMapping("police-name")
	public Object selectByName(@RequestParam(value = "name", required = false) String name,ModelMap modelMap) {
		try {
			GabUPolice police = policeService.queryByName(name);
			return setMap(HttpCode.OK, police);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
			}
	}
	
	//登录
	@ApiOperation(value = "登录", httpMethod = "GET", notes = "登录")
	@RequestMapping("/login")
	public ServerResponse<GabUPolice> login(String name,String password,HttpServletRequest request){
		HttpSession session = request.getSession();
//		String name = HttpServletRequestUtil.getString(request, "name");
//		String password = HttpServletRequestUtil.getString(request, "password");
        ServerResponse<GabUPolice> response=policeService.Login(name,password);
        if(response.isSuccess()){
            session.setAttribute(Const.CURRENT_USER,response.getData());
        }
        return response;
    }
	
	//注销
	@ApiOperation(value = "注销", httpMethod = "POST", notes = "注销")
	@RequestMapping("/logout")
    public ServerResponse<String> logout(HttpSession session){
        session.removeAttribute(Const.CURRENT_USER);
        return ServerResponse.createBySuccess("注销成功");
    }
	
	//注册
    @ApiOperation(value = "注册", httpMethod = "POST", notes = "注册")
	@RequestMapping("/register")
    public ServerResponse<String> register(GabUPolice police){
    	return policeService.register(police);
    }
	
	//激活
	@ApiOperation(value = "激活", httpMethod = "POST", notes = "激活")
	@RequestMapping("/activation")
	public ServerResponse<String> activation(@RequestParam(value = "activeCode", required = false) String activeCode) {
		return policeService.activePolice(activeCode);
	}
	
	//校验
	@ApiOperation(value = "校验", httpMethod = "POST", notes = "校验")
	@RequestMapping("/checkValid")
	public ServerResponse<String> checkValid(String str,String type){
        return policeService.checkValid(str,type);
    }
	
	//修改密码
	@ApiOperation(value = "修改密码", httpMethod = "POST", notes = "修改密码")
	@RequestMapping("/update-resetPassword")
	public ServerResponse<String> resetPassword(HttpServletRequest request,String passwordNew, String passwordOld){
		HttpSession session = request.getSession();
		GabUPolice police = (GabUPolice) session.getAttribute(Const.USERNAME);
		if(police == null){
            return ServerResponse.createByError("用户未登录");
        }
	    return policeService.resetPassword(passwordNew,passwordOld,police);
	}
	
	//修改用户信息
	@ApiOperation(value = "修改用户信息", httpMethod = "POST", notes = "修改用户信息")
	@RequestMapping("/updateInformation")
	public ServerResponse<GabUPolice> updateInformation(HttpServletRequest request,GabUPolice police){
		HttpSession session = request.getSession();
		GabUPolice currentpolice = (GabUPolice)session.getAttribute(Const.CURRENT_USER);
        if(currentpolice == null){
            return ServerResponse.createByError("用户未登录");
        }
        police.setId(currentpolice.getId());
        police.setName(currentpolice.getName());
        ServerResponse<GabUPolice> response = policeService.updateInformation(police);
        if(response.isSuccess()){
            response.getData().setName(currentpolice.getName());
            session.setAttribute(Const.CURRENT_USER,response.getData());
        }
        return response;
    }
	
	//重置密码
	@ApiOperation(value = "重置密码", httpMethod = "POST", notes = "重置密码")
	@RequestMapping("/coverPassword")
	public ServerResponse<String> coverPassword(GabUPolice police){
	    return policeService.coverPassword(police);
	}
	
	//忘记密码
	@ApiOperation(value = "忘记密码", httpMethod = "POST", notes = "忘记密码")
	@RequestMapping("/findPassword")
	public ServerResponse<String> findPassword(String email, String name){
	    return policeService.findPassword(email,name);
	}
	
}
