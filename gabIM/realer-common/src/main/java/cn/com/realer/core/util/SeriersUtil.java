package cn.com.realer.core.util;

import java.math.BigInteger;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

/**
 * Created by huren on 2017/2/16.
 */
public class SeriersUtil {
    //按天生成的自增序列，设置有效期1天
    public static final int ONE_DAY=60*60*24;
    //临时许可有效期设置   3天
    public static final long TEMP_LICENSE_EXPIRE_TIME=60*60*24*3;


    //获取前一天
    public static final String getYesterdayOfTheKey1(String key){
        String yesterday=null;
        Date date=DateUtil.stringToDate(key);
        Calendar ca= Calendar.getInstance();
        ca.setTime(date);
        ca.add(Calendar.DAY_OF_MONTH,-1);
        yesterday=DateUtil.format(ca.getTime());
        return yesterday;
    }

    //获取前一天
    public static final String getYesterdayOfTheKey(String key){
        String yesterday=null;
        Date date=DateUtil.stringToDate("20"+key);
        Calendar ca= Calendar.getInstance();
        ca.setTime(date);
        ca.add(Calendar.DAY_OF_MONTH,-1);
        yesterday=DateUtil.format(ca.getTime(),"yyyyMMdd");
        return yesterday.substring(2);
    }


    public static final String formatNumber(long num, int length){
        String str = String.format("%0"+length+"d", num);
        return str;
    }
    private static long terminal_templicence_timestamp=0l;

    /**
     * 生成最新款台序列号
     * 款台临时序列生成机制：当前时间戳(左补零补全15)+4位随机函数
     * @return
     */
//    public static final String createTempLicense(){
//        synchronized (SeriersUtil.class){
//            Date date_=new Date();
//            long terminal_templicence_timestamp_=date_.getTime();
//            if(terminal_templicence_timestamp_==terminal_templicence_timestamp){
//                try {
//                    Thread.currentThread().sleep(1);
//                } catch (InterruptedException e) {
//                    e.printStackTrace();
//                }
//                date_=new Date();
//                terminal_templicence_timestamp_=date_.getTime();
//            }
//            terminal_templicence_timestamp=terminal_templicence_timestamp_;
//            String date_part=date_.getTime()+"";
//            String result=null;
//            do{
//                String randon_part=formatNumber(new Random().nextInt(10000),4);
//                String licence_str=date_part+randon_part;
//                Long licence_value= Long.parseLong(licence_str)*-1;
//                result= Long.toHexString(licence_value);
//            }while(JedisUtil.exists(result));
//            return result;
//        }
//    }


    /**
     * 检查临时许可是否过期
     * @param tempLicense
     * @return
     */
    public static final boolean isExpire_TempLicense(String tempLicense){
        try{
            Long tempLicense_value=new BigInteger(tempLicense,16).longValue()*-1;
            long gap=new Date().getTime()-(tempLicense_value/10000);
            if(gap>=(TEMP_LICENSE_EXPIRE_TIME*1000)){
                return true;
            }
        }catch (Exception e){
            return true;
        }
        return false;
    }


    /**
     * 根据临时许可获取设备信息串
     * @param tempLicense
     * @return
     */
//    public static final String getDviceInfoStrByTL(String tempLicense){
//        //先判断过期
//        if(isExpire_TempLicense(tempLicense)){
//            //过期直接删除
//            JedisUtil.hdel(RedisKeyUtil.TempLicense_Prefix,tempLicense);
//            return null;
//        }
//        //没过期，从redis获取，
//        try{
//            return JedisUtil.hget(RedisKeyUtil.TempLicense_Prefix,tempLicense);
//        }catch (Exception e){
//
//        }
//        return null;
//    }


    /**
     * 获取新的终端许可序列
     * @return
     */
//    public static final Long getTermTempLicencInc(){
//        String date_key=DateUtil.format(new Date());
//        String termTempLicenceKey=RedisKeyUtil.TempLicense_Prefix+date_key;
//        //如果key是新的，表明日期已经变化，到了下一天，昨天的key可以删除
//        if(!JedisUtil.exists(termTempLicenceKey)){
//            JedisUtil.del(RedisKeyUtil.TempLicense_Prefix+getYesterdayOfTheKey(date_key));
//            JedisUtil.setString(termTempLicenceKey,"0");
//            JedisUtil.expire(termTempLicenceKey,ONE_DAY);
//        }
//        return JedisUtil.incrBy(termTempLicenceKey,1);
//    }



    /**
     * 生成新的系统交易流水号
     * @param deviceSysNo 设备系统编号  截去最后5位，得到门店系统编号
     * @return
     */
//    public static String createTradeSeries(String deviceSysNo){
//        try{
//            Date date_=new Date();
//            String date_part=DateUtil.format(date_,"yyyyMMdd");
//            System.out.println(date_part);
//            String storeSysNo=deviceSysNo.substring(0,deviceSysNo.length()-5);
//            String key = RedisKeyUtil.TradeInc_Prefix+date_part;
//            //如果找不到 可能是新的一天 也可能redis数据丢失
//            if(!JedisUtil.exists(key)){
//                String old_key=RedisKeyUtil.TradeInc_Prefix+getYesterdayOfTheKey(date_part);
//                System.out.println(old_key);
//                JedisUtil.del(old_key);
//            }
//            //获取自增序列下一个值
//            Long next_value=getHashIncrement(key,storeSysNo);
//            JedisUtil.expire(key,(int)SeriersUtil.TEMP_LICENSE_EXPIRE_TIME);
//            return deviceSysNo+date_part+formatNumber(next_value,6)+new Random().nextInt(10);
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return null;
//    }



    /**
     * 获取hash自增值
     * @param key
     * @param field
     * @return
     */
//    public static final Long getHashIncrement(String key, String field){
//        if(!JedisUtil.hexists(key,field)){
//            JedisUtil.hset(key,field,"0");
//        }
//        return JedisUtil.hincrBy(key,field,1);
//    }

    /**
     * 获取自增值
     * @param key
     * @return
     */
//    public static final Long getIncrement(String key){
//        if(!JedisUtil.exists(key)){
//            JedisUtil.setString(key,"0");
//            JedisUtil.expire(key,ONE_DAY);
//        }
//        return JedisUtil.incrBy(key,1);
//    }



    public static void main(String[] s){
//        System.out.println(getIncrement("TempInc","License"));
//        System.out.println(DateUtil.stringToDate("3017-12-31 23:59:59").getTime());
//        System.out.println(Long.MAX_VALUE);
//        System.out.println(formatNumber(Long.MAX_VALUE,30));
//        System.out.println(Long.toHexString(Long.MIN_VALUE));
//        System.out.println(Long.toHexString(0));
//        System.out.println(Long.toHexString(Long.MAX_VALUE));
//        String licence=createTempLicense();
//        System.out.println(isExpire_TempLicense(licence));
        System.out.println(getYesterdayOfTheKey("170302"));
    }
}
