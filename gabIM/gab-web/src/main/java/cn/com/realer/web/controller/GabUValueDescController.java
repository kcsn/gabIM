package cn.com.realer.web.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import cn.com.realer.core.util.Request2ListUtil;

import com.alibaba.fastjson.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cn.com.realer.core.support.BaseController;
import cn.com.realer.core.support.HttpCode;
import cn.com.realer.core.util.Request2ModelUtil;
import cn.com.realer.core.util.WebUtil;
import cn.com.realer.pojo.GabMTheme;
import cn.com.realer.pojo.GabUValueDesc;
import cn.com.realer.service.GabUValueDescService;
import io.swagger.annotations.ApiOperation;

@RestController
@RequestMapping("api/value-desc")
public class GabUValueDescController extends BaseController{

	@Autowired
	private GabUValueDescService valueDescService;
	
	@ApiOperation(value = "添加选值描述", httpMethod = "POST", notes = "添加选值描述")
	@RequestMapping("add-value-desc")
	public Object addValueDesc(GabUValueDesc [] valueDescs, ModelMap modelMap) {
		try {
			valueDescService.addAllMessage(valueDescs);
			return setMap(HttpCode.OK, valueDescs);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	@ApiOperation(value = "更新选值描述", httpMethod = "POST", notes = "更新选值描述")
	@RequestMapping("update-value-desc")
	public Object updateValueDesc(GabUValueDesc [] valueDescs, ModelMap modelMap) {
		try {
			valueDescService.updateAllMessage(valueDescs);
			return setMap(HttpCode.OK, valueDescs);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR, null);
		}
	}
	

	/**
	 * 查询全国总警人数
	 * @param modelMap
	 * @param itemId
	 * @return
	 */
	@ApiOperation(value = "查询全国总警人数", httpMethod = "GET", notes = "查询全国总警人数")
	@RequestMapping("select-allPoliceCount")
	public Object selectPoliceCount(ModelMap modelMap,
			@RequestParam(value = "itemId", required = false) Integer itemId,
			@RequestParam(value = "themeId", required = false) Integer themeId) {
		try {
			Map<String, Object> params = new HashMap<String, Object>();
			
			params.put("itemId", itemId);
			params.put("themeId", themeId);
			Long policeCount = valueDescService.selectPoliceCount(params);
			return setMap(HttpCode.OK, policeCount);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
			}
	}
	
	
	@ApiOperation(value = "查询每个省内总警人数", httpMethod = "GET", notes = "查询每个省内总警人数")
	@RequestMapping("select-allProvincePoliceCount")
	public Object selectProvincePoliceCount(ModelMap modelMap,
			@RequestParam(value = "itemId", required = false) Integer itemId,
			@RequestParam(value = "themeId", required = false) Integer themeId) {
		try {
			
			Map<String, Object> params = new HashMap<String, Object>();
			
			params.put("itemId", itemId);
			params.put("themeId", themeId);
			//List<Map<String,Object>> provincePoliceCountList = valueDescService.selectProvincePoliceCount(params);
		 List<Map> list = valueDescService.selectProvincePoliceCount1(params);
			
			return setMap(HttpCode.OK, list);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
			}
	}
	
	@ApiOperation(value = "查询每个省内勤务模式", httpMethod = "GET", notes = "查询每个省内勤务模式")
	@RequestMapping("select-JWMSCount")
	public Object selectJWMSCount(ModelMap modelMap) {
		try {
			List<Map> list = valueDescService.selectJWMSCount();
			return setMap(HttpCode.OK, list);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}
	}
	
	@ApiOperation(value = "查询全国内各个勤务模式总数", httpMethod = "GET", notes = "查询全国内各个勤务模式总数")
	@RequestMapping("select-allJWMSCount")
	public Object selectAllJWMSCount(ModelMap modelMap) {
		try {
			List<Map> list = valueDescService.selectAllJWMSCount();
			return setMap(HttpCode.OK, list);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR,null);
		}
	}
	

	@ApiOperation(value = "筛选人员配置分类信息", httpMethod = "GET", notes = "筛选人员配置分类信息")
	@RequestMapping("select-per-sort")
	public Object selectPerSort(Integer themeId, ModelMap modelMap) {
		try {
			Map<String, Object> map = valueDescService.selectPerSort(themeId);
			return setMap(HttpCode.OK, map);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR, null);
		}
	}

	@ApiOperation(value = "筛选占比排名信息", httpMethod = "GET", notes = "筛选占比排名信息")
	@RequestMapping("select-proportion")
	public Object selectProportionByItemId(Integer themeId, ModelMap modelMap) {
		try {
			Map<String, Object> params =new HashMap<>();
			params.put("themeId", themeId);
			List<Map<String, Object>> proportions = valueDescService.selectProportionByItemId(params);
			return setMap(HttpCode.OK, proportions);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	
	@ApiOperation(value = "保存block", httpMethod = "POST", notes = "保存block")
	@RequestMapping("save-block")
	public Object saveBlock(ModelMap modelMap, HttpServletRequest request,@RequestBody GabUValueDesc[] itemvalues) {
		try {
			//System.out.print(itemvalues.length);
			if (itemvalues.length>0) {
				//先清空
				Map<String, Object> params =new HashMap<>();
				params.put("policeId", itemvalues[0].getPoliceId());
				params.put("themeId", itemvalues[0].getThemeId());
				params.put("blockId", itemvalues[0].getBlockId());
				valueDescService.deleteByParams(params);
				//在保存
				for (GabUValueDesc gabUValueDesc : itemvalues) {
					valueDescService.add(gabUValueDesc);
				}
			}
			return setMap(HttpCode.OK, null);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	
}
