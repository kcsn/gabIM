package cn.com.realer.web.test;

import cn.com.realer.web.WebController;
import cn.com.realer.core.util.WebUtil;
import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by long on 2017/4/7.
 */
@Api(value = "服务测试接口",description = "服务测试接口")
@RestController
@RequestMapping("/api/test")
public class TestController extends WebController {
    @ApiOperation(value = "测试服务是否搭建成功",httpMethod = "POST",response = List.class,notes = "测试服务是否搭建成功")
    @RequestMapping("/helloworld")
    @ResponseBody
    public Object findAliReport(ModelMap modelMap, HttpServletRequest request, @RequestParam(required = false)Integer pageNum, @RequestParam(required = false)Integer pageSize){
        Map<String,Object> params = WebUtil.getParameterMap(request);
        return setSuccessModelMap(modelMap,params);
    }



        

//    @ApiOperation(value = "sqlserver测试",httpMethod = "POST",response = List.class,notes = "sqlserver测试")
//    @RequestMapping("/testSqlServer")
//    @ResponseBody
//    public Object testSqlServer(ModelMap modelMap, HttpServletRequest request, @RequestParam(required = false)Integer pageNum, @RequestParam(required = false)Integer pageSize){
//        CommonUtils.isLogin();
//        Map<String,Object> params = WebUtil.getParameterMap(request);
//        String dbURL="jdbc:sqlserver://112.74.161.75:1433;DatabaseName=byposk6";
//        String userName="sa";
//        String password="Kaidianbao123";
//        ConnectionBag bag= MyDBService.getConnect(userName,password,dbURL,"select 1");
//        if(bag==null){
//            throw  new FrameException("连接池满了");
//        }
////        List<Map<String,Object>> rows=new ArrayList<>();
////        Map<String,Object> row=new HashedMap();
//////        row.set("h#"));//INTEGER
////        row.put("nh#","2017800000");//VARCHAR
////        row.put("hr","1");//VARCHAR
////        row.put("z#","1");//VARCHAR
////        row.put("ten","1");//VARCHAR
////        row.put("kl",Short.valueOf("1"));//SMALLINT
////        row.put("ykh",Integer.valueOf(1));//INTEGER
////        row.put("dt","1");//VARCHAR
////        row.put("rq",new Timestamp(new Date().getTime()));//TIMESTAMP
////        row.put("rje",new BigDecimal(1));//NUMERIC
////
////        row.put("zkh",Integer.valueOf(1));//INTEGER
////        row.put("zd",Integer.valueOf(1));//INTEGER
////        row.put("czt",new Timestamp(new Date().getTime()));//TIMESTAMP
////        row.put("xgr",Integer.valueOf(1));//INTEGER
////        row.put("yje",new BigDecimal(1));//NUMERIC
////        row.put("jjfs",Short.valueOf("1"));//SMALLINT
////        row.put("zkl",Short.valueOf("1"));//SMALLINT
////        row.put("pw",Integer.valueOf(1));//INTEGER
////        row.put("end_date",null);//TIMESTAMP
////        row.put("hyjb",Short.valueOf("1"));//SMALLINT
////
////        row.put("hysj",Short.valueOf("1"));//SMALLINT
////        row.put("Birthday",null);//TIMESTAMP
////        row.put("Email","1");//VARCHAR
////        row.put("date_void",Short.valueOf("1"));//SMALLINT
////        row.put("czk_void",Short.valueOf("1"));//SMALLINT
////        row.put("czk_ye",new BigDecimal(1));//NUMERIC
////        row.put("jfnum",new BigDecimal(1));//NUMERIC
////        row.put("bje",new BigDecimal(1));//NUMERIC
////        row.put("other1","1");//VARCHAR
////        row.put("other2","1");//VARCHAR
////
////        row.put("other3","1");//VARCHAR
////        row.put("other4","1");//VARCHAR
////        row.put("dtbirthday_lan",null);//TIMESTAMP
////        row.put("dcMaxQk",new BigDecimal(1));//NUMERIC
////        row.put("dtMaxChanged",null);//TIMESTAMP
////        row.put("iVipJsname",Integer.valueOf(1));//INTEGER
////        row.put("snickname","1");//VARCHAR
////        row.put("bz","1");//VARCHAR
////        row.put("PYJC","1");//VARCHAR
////        row.put("dwmc","1");//VARCHAR
////
////        row.put("phonenumber","1");//VARCHAR
////        row.put("sisqk",null);//CHAR
////        row.put("picture",null);//LONGVARBINARY
////        row.put("sVipMemo",null);//LONGVARCHAR
////        rows.add(row);
////        MyDBService.add(bag,rows,true);
////
////
////        String sql="SELECT [h#],[nh#],[hr],[z#],[ten],[kl],[ykh],[dt],[rq],[rje],[zkh],[zd],[czt],[xgr],[yje],[jjfs],[zkl],[pw],[end_date],[hyjb],[hysj],[Birthday],[Email],[date_void],[czk_void],[czk_ye],[jfnum],[bje],[other1],[other2],[other3],[other4],[picture],[sVipMemo],[dtbirthday_lan],[dtMaxChanged],[iVipJsname],[snickname],[bz],[PYJC],[dwmc],[phonenumber] FROM [byposk6].[dbo].[t_vip_info]";
////        sql="SELECT count(1)  FROM [byposk6].[dbo].[t_vip_info]";
//            ThirdCommonService.apiOfCloneMemberDataFromPos(memberInfoService,appServiceAllLogService,sysDataSyncLogService,sysPropertiesService,1l,bag, "手动",ThirdCommonService.getThirdService(1l,sysConfigService));
//
//        return setSuccessModelMap(modelMap);
//    }



//    @ApiOperation(value = "sqlserverUpdate测试",httpMethod = "POST",response = List.class,notes = "sqlserverUpdate测试")
//    @RequestMapping("/sqlserverUpdate")
//    @ResponseBody
//    public Object sqlserverUpdate(ModelMap modelMap, HttpServletRequest request, @RequestParam(required = false)Integer pageNum, @RequestParam(required = false)Integer pageSize){
//        String dbURL="jdbc:sqlserver://112.74.161.75:1433;DatabaseName=byposk6";
//        String userName="sa";
//        String password="Kaidianbao123";
//        ConnectionBag bag= MyDBService.getConnect(userName,password,dbURL,"select 1");
//        if(bag==null){
//            throw  new FrameException("连接池满了");
//        }
//        ThirdCommonService.updateMemberDataFromPos(memberInfoService,appServiceAllLogService,sysUserService,sysDataSyncLogService,sysPropertiesService,1l,bag, "手动",null,null,ThirdCommonService.getThirdService(1l,sysConfigService),null);
//
//        return setSuccessModelMap(modelMap);
//    }

}
