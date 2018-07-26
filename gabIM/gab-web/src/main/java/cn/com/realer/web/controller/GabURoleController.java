package cn.com.realer.web.controller;

import io.swagger.annotations.ApiOperation;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cn.com.realer.core.support.BaseController;
import cn.com.realer.core.support.HttpCode;
import cn.com.realer.core.util.Request2ModelUtil;
import cn.com.realer.core.util.WebUtil;
import cn.com.realer.pojo.GabURole;
import cn.com.realer.service.GabURoleService;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("api/role")
public class GabURoleController extends BaseController{

	@Autowired
	private GabURoleService roleService;
	
	@ApiOperation(value = "添加角色", httpMethod = "POST", notes = "添加角色")
	@RequestMapping("add-role")
	public Object addRole(GabURole role, ModelMap modelMap) {
		try {
			role.setCreateTime(new Date());
			role.setUpdateTime(role.getCreateTime());
			role.setIsdelete((short)0);
			roleService.insert(role);
			return setMap(HttpCode.OK, role);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}

	}


	@ApiOperation(value = "修改角色", httpMethod = "POST", notes = "修改角色")
	@RequestMapping("update-role")
	public Object updateRole(ModelMap modelMap,HttpServletRequest request) {
		try {
			GabURole role =Request2ModelUtil.covert(GabURole.class, request);
			roleService.update(role);
			return setMap(HttpCode.OK, role);
		} catch (Exception e) {
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}

	}

	@ApiOperation(value = "删除角色", httpMethod = "DELETE", notes = "删除角色")
	@RequestMapping("delete-role")
	public Object deleteRole(Integer id, ModelMap modelMap) {
		try {
			roleService.delete(id);
			return setMap(HttpCode.OK,null);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}

	}

	@ApiOperation(value = "查询全部角色", httpMethod = "GET", notes = "查询全部角色")
	@RequestMapping("role-list")
	public Object selectAll(ModelMap modelMap) {
		try {
			List<GabURole> roles = roleService.selectList(null);
			return setMap(HttpCode.OK, roles);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
			}
	}

	@ApiOperation(value = "根据主键查询用户", httpMethod = "GET", notes = "根据主键查询用户")
	@RequestMapping("select-role")
	public Object selectById(Integer id,ModelMap modelMap) {
		try {
			GabURole role = roleService.queryById(id);
			return setMap(HttpCode.OK, role);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}
	}
	
	@ApiOperation(value = "分页查询角色", httpMethod = "GET", notes = "分页查询角色")
	@RequestMapping("role-list-page")
	public Object selectByPage(ModelMap modelMap,HttpServletRequest request) {
		try {
			Map<String, Object> params = WebUtil.getParameterMap(request);
			try {
				params.put("pageNum", Integer.parseInt(params.get("pageNum").toString()));
				params.put("pageSize", Integer.parseInt(params.get("pageSize").toString()));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			PageInfo<GabURole> roles = roleService.query(params);
			return setMap(HttpCode.OK, roles);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
			}
	}
	
}
