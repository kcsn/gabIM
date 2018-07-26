//package cn.com.realer.web.utils;
//
//import cn.com.realer.core.util.JedisUtil;
//import cn.com.realer.core.util.RedisUtil;
//
///**
// * Created by huren on 2017/6/23.
// */
//public class RedisExtUtil {
//    //会员卡号序列维护
//    public static final String MEMBER_NUM_MINUS="MEMBER_NUM_MINUS_";
//    //用户token标记前缀
//    public static final String USER_TOKEN_MARK="USER_TOKEN_MARK_";
//    //用户deviceId标记前缀
//    public static final String USER_DEVICEID_MARK="USER_DEVICEID_MARK_";
//
//    /**
//     * 获取hash自增值
//     * @param key
//     * @param field
//     * @return
//     */
//    public static final Long getHashIncrement(String key,String field){
//        if(!JedisUtil.hexists(key,field)){
//            JedisUtil.hset(key,field,"0");
//        }
//        return JedisUtil.hincrBy(key,field,1);
//    }
//
//    /**
//     * 获取自增值
//     * @param key
//     * @return
//     */
//    public static final Long getIncrement(String key,long defaultValue){
//        if(!JedisUtil.exists(key)){
//            if(defaultValue>=0){
//                JedisUtil.set(key,60*60*24*3,defaultValue);
//            }else{
//                return null;
//            }
//        }
//        return JedisUtil.incrBy(key,1l);
//    }
//
//
//    public static String getRedisValue(String key){
//        Object o=RedisUtil.get(key);
//        if(o!=null){
//            return o.toString();
//        }
//        return null;
//    }
//}
