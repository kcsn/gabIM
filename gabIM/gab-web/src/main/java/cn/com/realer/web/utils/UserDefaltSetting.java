package cn.com.realer.web.utils;//package cn.com.gab.web.utils;
//
//import cn.com.realer.model.generator.system.SysAuthority;
//import cn.com.realer.model.generator.system.SysRole;
//import cn.com.realer.model.generator.system.SysUser;
//
//import java.util.ArrayList;
//import java.util.List;
//
///**
// * Created by wunai on 2017/7/24.
// */
//public class UserDefaltSetting {
//    public static List<SysUser> getDefaultUsers(Long merchantId){
//        SysUser user=new SysUser();
//        user.setMerchantId(merchantId);
//        user.setStoreId(merchantId);
//        user.setUserName("超级管理员");
//        user.setEnableDataPermissions(false);
//        user.setIsDefault(true);
//        user.setLoginName("admin");
//        user.setId(1l);
//        List<SysUser> users=new ArrayList<>();
//        users.add(user);
//        return users;
//    }
//
//    public static List<SysRole> getDefaultRoles(Long merchantId){
//        return null;
//    }
//
//
//    private static void addModifyDel(List<SysAuthority> auths,Long pid,String keyCode,String keyName,Long merchantId,int start){
//        auths.add(getSysAuth(Long.parseLong(pid+CommonUtils.formatStr(""+(start++),2)),merchantId,keyCode+"_ADD","添加"+keyName,"12",pid));
//        auths.add(getSysAuth(Long.parseLong(pid+CommonUtils.formatStr(""+(start++),2)),merchantId,keyCode+"_UPDATE","修改"+keyName,"12",pid));
//        auths.add(getSysAuth(Long.parseLong(pid+CommonUtils.formatStr(""+(start++),2)),merchantId,keyCode+"_DEL","删除"+keyName,"12",pid));
//    }
//
//
//
//
//    public static List<SysAuthority> getDefaultAuths(Long merchantId){
//        List<SysAuthority> auths=new ArrayList<>();
//        auths.add(getSysAuth(1l,merchantId,"SERVER_AUTH","后台管理权限","1",0l));
//
//        auths.add(getSysAuth(100l,merchantId,"HOME_PAGE","首页","11",1l));
//
//        auths.add(getSysAuth(101l,merchantId,"BASIC_DATA","基础数据","11",1l));
//        auths.add(getSysAuth(10100l,merchantId,"STORE_MANAGE","门店管理","11",101l));//附带查看权限
//        addModifyDel(auths,10100l,"STORE","门店",merchantId,0);
//        auths.add(getSysAuth(10101l,merchantId,"USER_MANAGE","用户管理","11",101l));
//        addModifyDel(auths,10101l,"USER","用户",merchantId,0);
//        auths.add(getSysAuth(10102l,merchantId,"ROLE_MANAGE","角色管理","11",101l));
//        addModifyDel(auths,10102l,"ROLE","角色",merchantId,0);
//        auths.add(getSysAuth(10103l,merchantId,"MEMBER_MANAGE","会员管理","11",101l));
//        addModifyDel(auths,10103l,"MEMBER","会员",merchantId,0);
//        auths.add(getSysAuth(10104l,merchantId,"GOODS_MANAGE","商品管理","11",101l));
//        addModifyDel(auths,10104l,"GOODS","商品",merchantId,0);
//        auths.add(getSysAuth(10105l,merchantId,"GIFT_MANAGE","礼品管理","11",101l));
//        addModifyDel(auths,10105l,"GIFT","礼品",merchantId,0);
//        auths.add(getSysAuth(10106l,merchantId,"SMS_MANAGE","短信模板管理","11",101l));
//        addModifyDel(auths,10106l,"SMS_TYPE","分类",merchantId,0);
//        addModifyDel(auths,10106l,"SMS","短信",merchantId,10);
//        auths.add(getSysAuth(10107l,merchantId,"DATA_SYNC_MANAGE","数据同步管理","11",101l));
//
//        auths.add(getSysAuth(102l,merchantId,"SALE_AND_SERVICE","销售和服务","11",1l));
//        auths.add(getSysAuth(103l,merchantId,"REPORT","报表","11",1l));
//        auths.add(getSysAuth(104l,merchantId,"NOTICE","公告","11",1l));
//        auths.add(getSysAuth(105l,merchantId,"SYS_SETTING","系统配置","11",1l));
//        auths.add(getSysAuth(106l,merchantId,"ABOUT","关于","11",1l));
//
//
//
////        auths.add(getSysAuth(1l,merchantId,"SERVER_AUTH","后台管理权限","1",0l));
////        auths.add(getSysAuth(1l,merchantId,"SERVER_AUTH","后台管理权限","1",0l));
////        auths.add(getSysAuth(1l,merchantId,"SERVER_AUTH","后台管理权限","1",0l));
////        auths.add(getSysAuth(1l,merchantId,"SERVER_AUTH","后台管理权限","1",0l));
////        auths.add(getSysAuth(1l,merchantId,"SERVER_AUTH","后台管理权限","1",0l));
////        auths.add(getSysAuth(1l,merchantId,"SERVER_AUTH","后台管理权限","1",0l));
////        auths.add(getSysAuth(1l,merchantId,"SERVER_AUTH","后台管理权限","1",0l));
////        auths.add(getSysAuth(1l,merchantId,"SERVER_AUTH","后台管理权限","1",0l));
////        auths.add(getSysAuth(1l,merchantId,"SERVER_AUTH","后台管理权限","1",0l));
////        auths.add(getSysAuth(1l,merchantId,"SERVER_AUTH","后台管理权限","1",0l));
////        auths.add(getSysAuth(1l,merchantId,"SERVER_AUTH","后台管理权限","1",0l));
//
//        auths.add(getSysAuth(2l,merchantId,"CLIENT_AUTH","客户端权限","2",0l));
//        return auths;
//    }
//
//    private static SysAuthority getSysAuth(Long id,Long merchantId,String authCode,String authName,String authType,Long pid){
//        SysAuthority auth=new SysAuthority();
//        auth.setMerchantId(merchantId);
//        auth.setId(id);
//        auth.setAuthCode(authCode);
//        auth.setAuthName(authName);
//        auth.setAuthType(Short.valueOf(authType));//11表示服务端菜单  12表示服务端按钮  21表示客户端菜单  22表示客户端按钮
//        auth.setPid(pid);
//        return auth;
//    }
//
//}
