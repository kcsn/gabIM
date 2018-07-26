package cn.com.realer.web;

import cn.com.realer.core.Constants;
import cn.com.realer.core.exception.FrameException;
import cn.com.realer.core.support.BaseController;
import cn.com.realer.core.util.WebUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.Map;


/**
 * Created by zhl on 16-6-15.
 */
public abstract class WebController extends BaseController {

    protected final Logger logger = LogManager.getLogger(this.getClass());

    //新增 检查参数填写（主要针对商户id）
//    public boolean checkParams(Map<String,Object> params,Level level){
//        if(params!=null){
//            System.err.println(JSON.toJSONString(params));
//            if(params.get("merchantId")==null){
//                logger.log(level,"参数填写警告：merchantId未填写");
//                params.put("merchantId", WebUtil.getCurrentMerchantId());
//            }
//            if(params.get("merchantId")==null){
//                throw new FrameException("商户信息不能为空");
//            }else if(MerchantManager.getLicenseCount(Long.parseLong(params.get("merchantId").toString()))==0){
//                throw new FrameException("序列号已过期");
//            }
//            if(params.get("enable")!=null){
//                String enable=params.get("enable").toString();
//                if("0".equals(enable)||"false".equals(enable)){
//                    params.put("enable",0);
//                }else{
//                    params.put("enable",1);
//                }
//            }
//        }
//        return true;
//    }


    private byte[] printException(String httpCode, String msg) {
        ModelMap modelMap = new ModelMap();
        modelMap.put("httpCode", httpCode);
        modelMap.put("msg", msg);
        modelMap.put("timestamp", new Date().getTime());
        return JSON.toJSONBytes(modelMap, SerializerFeature.DisableCircularReferenceDetect);
    }

   /* @ExceptionHandler(PlatformException.class)
    public void exceptionHandler(HttpServletResponse response, PlatformException ex) throws Exception {
        logger.error(Constants.Exception_Head, ex);

        response.setContentType("application/json;charset=UTF-8");
        if(ex.getMsg().equals("405")){
            byte[] bytes = printException(ex.getHttpCode(), "该用户已经注册");
            response.getOutputStream().write(bytes);
        }else{
            byte[] bytes = printException(ex.getHttpCode(), ex.getMsg());
            response.getOutputStream().write(bytes);
        }

    }
*/

    @ExceptionHandler(FrameException.class)
    public void exceptionHandler(HttpServletResponse response, FrameException ex) throws Exception {
        logger.error(Constants.Exception_Head, ex);
        response.setContentType("application/json;charset=UTF-8");
        byte[] bytes = printException(ex.getCode(), ex.getDisplay());
        response.getOutputStream().write(bytes);
    }


}
