package cn.com.realer.web.controller;

import io.swagger.annotations.ApiOperation;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cn.com.realer.core.support.BaseController;
import cn.com.realer.core.support.HttpCode;
import cn.com.realer.core.util.Request2ModelUtil;
import cn.com.realer.core.util.WebUtil;
import cn.com.realer.pojo.GabUPoliceTheme;
import cn.com.realer.pojo.GabURole;
import cn.com.realer.pojo.vo.GabUPoliceThemeVo;
import cn.com.realer.service.GabUPoliceThemeService;

import com.github.pagehelper.PageInfo;

@RestController
@RequestMapping("api/police-theme")
public class GabUPoliceThemeController extends BaseController{

	@Autowired
	private GabUPoliceThemeService policeThemeService;
	
	@ApiOperation(value = "添加用户主题", httpMethod = "POST", notes = "添加用户主题")
	@RequestMapping("add-police-theme")
	public Object addPoliceTheme(GabUPoliceTheme policeTheme, ModelMap modelMap) {
		try {
			policeThemeService.add(policeTheme);
			return setMap(HttpCode.OK, policeTheme);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}

	}


	@ApiOperation(value = "修改用户主题", httpMethod = "POST", notes = "修改用户主题")
	@RequestMapping("update-police-theme")
	public Object updatePoliceTheme(GabUPoliceTheme policeTheme, ModelMap modelMap) {
		try {
			policeThemeService.update(policeTheme);
			return setMap(HttpCode.OK, policeTheme);
		} catch (Exception e) {
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}

	}
	
	
	@ApiOperation(value = "审核", httpMethod = "POST", notes = "审核")
	@RequestMapping("update-auditing")
	public Object updateAuditing(ModelMap modelMap,HttpServletRequest request,
			@RequestParam(value = "parentId", required = false)Integer id) {
		try {
			GabUPoliceTheme policeTheme1 = Request2ModelUtil.covert(GabUPoliceTheme.class, request);
			GabUPoliceTheme policeTheme = policeThemeService.queryById(policeTheme1.getId());
			policeTheme.setAuditDesc(policeTheme1.getAuditDesc());
			policeTheme.setStatus(policeTheme1.getStatus());
			policeTheme.setAuditTime(new Date());
			policeThemeService.update(policeTheme);
			return setMap(HttpCode.OK, policeTheme);
		} catch (Exception e) {
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}
		
	}

	@ApiOperation(value = "删除用户主题", httpMethod = "DELETE", notes = "删除用户主题")
	@RequestMapping("delete-police-theme")
	public Object deletePoliceTheme(Integer id, ModelMap modelMap) {
		try {
			policeThemeService.delete(id);
			return setMap(HttpCode.OK,null);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}

	}

	@ApiOperation(value = "查询全部用户主题", httpMethod = "GET", notes = "查询全部用户主题")
	@RequestMapping("police-theme-list")
	public Object selectAll(ModelMap modelMap) {
		try {
			List<GabUPoliceTheme> policeThemes = policeThemeService.selectList(null);
			return setMap(HttpCode.OK, policeThemes);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
			}
	}




	@ApiOperation(value = "分页查询用户主题", httpMethod = "GET", notes = "分页查询用户主题")
	@RequestMapping("police-theme-list-page")
	public Object selectPage(ModelMap modelMap, HttpServletRequest request) {
		try {
			Map<String, Object> params = WebUtil.getParameterMap(request);
			try {
				params.put("pageNum", Integer.parseInt(params.get("pageNum").toString()));
				params.put("pageSize", Integer.parseInt(params.get("pageSize").toString()));
			} catch (Exception e) {
				// TODO: handle exception
			}
			PageInfo<GabUPoliceThemeVo> permissions = policeThemeService.queryVo(params);
			return setMap(HttpCode.OK, permissions);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR, null);
		}
	}


	@ApiOperation(value = "根据主键查询用户主题", httpMethod = "GET", notes = "根据主键查询用户主题")
	@RequestMapping("select-police-theme")
	public Object selectById(Integer id,ModelMap modelMap) {
		try {
			GabUPoliceTheme policeTheme = policeThemeService.queryById(id);
			return setMap(HttpCode.OK, policeTheme);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}
	}
	
	
	@ApiOperation(value = "根据报表的状态查询报总数", httpMethod = "GET", notes = "根据报表的状态查询报总数")
	@RequestMapping("select-statusCount")
	public Object selectStatusCount(ModelMap modelMap,
			@RequestParam(value = "policeId", required = false) Integer policeId,
			@RequestParam(value = "themeId", required = false) Integer themeId ) {
		try {
			
			List<Map> list = new ArrayList<Map>();
			Map<String, Object> map1 = new HashMap<String, Object>();
			Map<String, Object> params1 = new HashMap<String, Object>();
			
			params1.put("policeId", policeId);
			params1.put("themeId", themeId);
			params1.put("status", 0);
			Long count0 = policeThemeService.selectStatusCount(params1);
			params1.put("status", 1);
			Long count1 = policeThemeService.selectStatusCount(params1);
			params1.put("status", 2);
			Long count2 = policeThemeService.selectStatusCount(params1);
			map1.put("count0", count0);
			map1.put("count1", count1);
			map1.put("count2", count2);
			list.add(map1);
			
			return setMap(HttpCode.OK, list);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}
	}
	
}
