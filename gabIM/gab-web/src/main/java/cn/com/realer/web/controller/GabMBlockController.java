package cn.com.realer.web.controller;

import io.swagger.annotations.ApiOperation;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import cn.com.realer.core.support.HttpCode;
import cn.com.realer.pojo.GabMBlock;
import cn.com.realer.pojo.vo.BlockVo;
import cn.com.realer.service.GabMBlockService;
import cn.com.realer.web.WebController;

@RestController
@RequestMapping("api/block")
public class GabMBlockController extends WebController {

	@Autowired
	private GabMBlockService gabMBlockService;
	
	/**
	 * 查询所有block
	 * @param modelMap
	 * @return
	 */
	@ApiOperation(value = "查询所有block", httpMethod = "POST", notes = "查询所有block成功")
	@RequestMapping("select-block")
	@ResponseBody
	public Object selectBlock(ModelMap modelMap) {
		try {
			//List<GabMBlock> blockList = gabMBlockService.selectList(modelMap);
			List<BlockVo> blockVoList = gabMBlockService.selectListBlock(modelMap);
			for (BlockVo blockVo : blockVoList) {
				blockVo.getId();
			}
			return setSuccessModelMap(modelMap, blockVoList);

		} catch (Exception e) {
			return setSuccessModelMap(modelMap, HttpCode.INTERNAL_SERVER_ERROR);
		}
	}
	
	/**
	 * 添加block
	 * @param gabMBlock
	 * @param modelMap
	 * @return
	 */
	@ApiOperation(value = "添加block", httpMethod = "POST", notes = "添加block成功")
	@RequestMapping("add-block")
	@ResponseBody
	public Object addBlock(GabMBlock gabMBlock, ModelMap modelMap) {
		try {
			gabMBlockService.add(gabMBlock);
			return setMap(HttpCode.OK, gabMBlock);

		} catch (Exception e) {
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR, null);
		}
	}
	
	/**
	 * 返回信息填报模块数据
	 */
	@ApiOperation(value = "返回信息填报模块数据", httpMethod = "POST", notes = "返回信息填报模块数据")
	@RequestMapping("select-blockVo-list")
	@ResponseBody
	public Object getBlockVoList(@RequestParam(value = "themeId", required = false)Integer themeId,
			@RequestParam(value = "policeId", required = true)Integer policeId) {
		try {
			List<BlockVo> blockVos = gabMBlockService.getBlockVoList(themeId, policeId);
			return setMap(HttpCode.OK, blockVos);
		} catch (Exception e) {
			e.printStackTrace();
			return setMap(HttpCode.INTERNAL_SERVER_ERROR, null);
		}
	}
}
