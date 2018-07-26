package cn.com.realer.web.controller;

import cn.com.realer.core.support.HttpCode;
import cn.com.realer.core.util.Request2ModelUtil;
import cn.com.realer.pojo.GabMTheme;
import cn.com.realer.service.GabMThemeService;
import cn.com.realer.web.WebController;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("api/theme")
public class GabMThemeController extends WebController {

	@Autowired
	private GabMThemeService themeService;

	@ApiOperation(value = "添加theme主题", httpMethod = "POST", notes = "添加theme主题")
	@RequestMapping("add-theme")
	@ResponseBody
	public Object addTheme(GabMTheme theme,ModelMap modelMap) {
		
		    try {
				themeService.add(theme);	
				return setMap(HttpCode.OK, theme);
			} catch (Exception e) {
				e.printStackTrace();
				return setMap(HttpCode.INTERNAL_SERVER_ERROR, null);
			}
	}


	@ApiOperation(value = "修改theme主题", httpMethod = "POST", notes = "修改theme主题")
	@RequestMapping("update-theme")
	public Object updateTheme(ModelMap modelMap,HttpServletRequest request) {
		try {
			GabMTheme theme= Request2ModelUtil.covert(GabMTheme.class, request);
			themeService.update(theme);	
			return setMap(HttpCode.OK, theme);
		} catch (Exception e) {
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}

	}

	@ApiOperation(value = "删除theme主题", httpMethod = "DELETE", notes = "删除theme主题")
	@RequestMapping("delete-theme")
	public Object deleteTheme(Integer id, ModelMap modelMap) {
		try {
			themeService.delete(id);
			return setMap(HttpCode.OK,null);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}

	}

	@ApiOperation(value = "查询全部theme主题", httpMethod = "GET", notes = "查询全部theme主题")
	@RequestMapping("theme-list")
	public Object selectAll(ModelMap modelMap) {
		try {
			List<GabMTheme> themes = themeService.selectList(null);
			return setMap(HttpCode.OK, themes);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}
	}

	@ApiOperation(value = "根据主键查询theme主题", httpMethod = "GET", notes = "根据主键查询theme主题")
	@RequestMapping("select-theme")
	public Object selectById(Integer id,ModelMap modelMap) {
		try {
			GabMTheme theme = themeService.queryById(id);
			return setMap(HttpCode.OK, theme);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}
	}
	
	
}
