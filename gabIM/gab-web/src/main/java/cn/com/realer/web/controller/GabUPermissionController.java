package cn.com.realer.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cn.com.realer.core.support.BaseController;
import cn.com.realer.core.support.HttpCode;
import cn.com.realer.pojo.GabUPermission;
import cn.com.realer.service.GabUPermissionService;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/permission")
public class GabUPermissionController extends BaseController{

	@Autowired
	private GabUPermissionService permissionService;

	@ApiOperation(value = "添加权限", httpMethod = "POST", notes = "添加权限")
	@RequestMapping("add-permission")
	public Object addPermission(GabUPermission permission, ModelMap modelMap) {
		try {
			permissionService.add(permission);
			return setMap(HttpCode.OK, permission);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}

	}


	@ApiOperation(value = "修改权限", httpMethod = "POST", notes = "修改权限")
	@RequestMapping("update-permission")
	public Object updatePermission(GabUPermission permission, ModelMap modelMap) {
		try {
			permissionService.update(permission);
			return setMap(HttpCode.OK, permission);
		} catch (Exception e) {
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}

	}

	@ApiOperation(value = "删除权限", httpMethod = "DELETE", notes = "删除权限")
	@RequestMapping("delete-permission")
	public Object deletePermission(Integer id, ModelMap modelMap) {
		try {
			permissionService.delete(id);
			return setMap(HttpCode.OK,null);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}

	}

	@ApiOperation(value = "查询全部权限", httpMethod = "GET", notes = "查询全部权限")
	@RequestMapping("permission-list")
	public Object selectAll(ModelMap modelMap) {
		try {
			List<GabUPermission> permissions = permissionService.selectList(null);
			return setMap(HttpCode.OK, permissions);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
			}
	}

	@ApiOperation(value = "根据主键查询权限", httpMethod = "GET", notes = "根据主键查询权限")
	@RequestMapping("select-permission")
	public Object selectById(Integer id,ModelMap modelMap) {
		try {
			GabUPermission permission = permissionService.queryById(id);
			return setMap(HttpCode.OK, permission);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}
	}
	
	
}
