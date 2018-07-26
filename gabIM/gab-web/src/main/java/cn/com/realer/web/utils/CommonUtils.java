package cn.com.realer.web.utils;


import cn.com.realer.core.em.FrameResponseCode;
import cn.com.realer.core.exception.FrameException;
import cn.com.realer.core.util.DateUtil;
import cn.com.realer.core.util.SecurityUtil;
import cn.com.realer.core.util.WebUtil;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;


/**
 * Created by wanglong on 2017/3/1.
 */
public class CommonUtils {
    public static int TOKEN_ALIVE_SECONDS=60*60*24*30;

    //商户密钥加密key
    private static final String COMM_KEY="SMART_CHAIN_CRAZY(*!1720271!*)";
    private static String licenseKey="MENGYOUJI-2017";
    public static final String PUSH_ALIS_PREFIX="wesales";


//    public static int TOKEN_ALIVE_SECONDS=-1;
    /**
     * 判断用户是否登录
     * @return
     */
    public static Integer isLogin(){
        Integer userId = WebUtil.getCurrentUser();
        if(userId==null){
//            LoginHelper.login("admin", "OyUHgt21gTP2/5uFgbKZtq==");
            throw new FrameException(FrameResponseCode.NEED_LOGIN.getCode(),FrameResponseCode.NEED_LOGIN.getDisplay());
        }
        return userId;
    }

    //二维数组   判断权限是否存在  【&】 【||】
    public static Boolean isPermitted(String[][] permitions){
        if(WebUtil.isPermitted(permitions)){
            return true;
        }
        throw new FrameException(FrameResponseCode.NEED_AUTH.getCode(),FrameResponseCode.NEED_AUTH.getDisplay());
    }



    public static String formatStr(String value,int size){
        if(value==null){
            value="";
        }
        value=value.trim();
        while(value.length()<size){
            value="0"+value;
        }
        return value;
    }







    //license 流程
    //设置license时，由产品方生成序列号；交由使用方，使用方在后台管理页面license管理页面中录入序列号提交即可

    //序列号需要解密，然后根据规则算出许可数量

    //解密需要key     key是加密过的，加密结果放在商户的证书信息字段中

    //解密后的计算规则为：*****

    public static String getLicenseKey(String certificate){
        return SecurityUtil.decryptDes(certificate,COMM_KEY.getBytes());
    }
    public static String createLicenseCertificate(String licenseKey){
        return SecurityUtil.encryptDes(licenseKey,COMM_KEY.getBytes());
    }


    public static String getLicenseInfo(String  seriesNumber,String certificate){
        return SecurityUtil.decryptDes(seriesNumber,getLicenseKey(certificate).getBytes());
    }

    public static Long getLicenseNumber(String  seriesNumber,String certificate){
        try {
            String licenseInfo = null;
            try {
                licenseInfo = getLicenseInfo(seriesNumber, certificate);
            } catch (Exception e) {
                e.printStackTrace();
                throw new Exception("序列号解密失败!");
            }
            return getLicenseNumber_(licenseInfo);
        }catch (Exception ee){
            ee.printStackTrace();
        }
        throw new FrameException("序列号有误!");
    }
    public static Long getLicenseNumber_(String licenseInfo){
        try {
            String licenseInfo_=decode(licenseInfo);
            //校验长度
            String infoLength=licenseInfo_.substring(licenseInfo_.length()-2);
            licenseInfo_=licenseInfo_.substring(0,licenseInfo_.length()-2);
            if(licenseInfo_.length()!=Integer.parseInt(infoLength)){
                throw new Exception("一级长度校验失败!");
            }
            String mills;
            String date;
            String licenseNum;
            try {
                String[] ss=licenseInfo_.split("_");
                mills=ss[0];
                String dateAndLicenseNum=ss[1];
                int licenseNumLength=Integer.parseInt(ss[2]);
                date=dateAndLicenseNum.substring(0,dateAndLicenseNum.length()-licenseNumLength);
                licenseNum=dateAndLicenseNum.substring(dateAndLicenseNum.length()-licenseNumLength);
                //校验特殊规则
                //换算许可号数量
                //返回数量
            }catch (Exception e1){
                throw new Exception("分解数据失败!");
            }
            if(!date.equals(DateUtil.format(new Date(Long.parseLong(mills)),"yyyyMMddHHmmss"))){
                throw new Exception("日期校验失败!");
            }
            return Long.parseLong(licenseNum);
        }catch (Exception e){
            e.printStackTrace();
        }

        throw new FrameException("序列号有误!");
    }


    public static String createLicenseInfo(Long licenseNumber){
        Date date=new Date();
        long mills=date.getTime();
        String licenseNumber_str=licenseNumber+"";
        String dateFormat= DateUtil.format(date,"yyyyMMddHHmmss");
        String licenseInfo=mills+"_"+dateFormat+licenseNumber_str+"_"+licenseNumber_str.length();
        licenseInfo=licenseInfo+licenseInfo.length();
        licenseInfo=encode(licenseInfo);
        return licenseInfo;
    }

    public static String encryptDesLicenseInfo(String key,String licenseInfo){
        return SecurityUtil.encryptDes(licenseInfo,key.getBytes());
    }

    public static final String hexString="0123456789ABCDEF";
    public static String encode(String str)
    {
        byte[] bytes=str.getBytes();
        StringBuilder sb=new StringBuilder(bytes.length*2);
//将字节数组中每个字节拆解成2位16进制整数
        for(int i=0;i<bytes.length;i++)
        {
            sb.append(hexString.charAt((bytes[i]&0xf0)>>4));
            sb.append(hexString.charAt((bytes[i]&0x0f)>>0));
        }
        return sb.toString();
    }
    /*
    * 将16进制数字解码成字符串,适用于所有字符（包括中文）
    */
    public static String decode(String bytes)
    {
        ByteArrayOutputStream baos=new ByteArrayOutputStream(bytes.length()/2);
        //将每2位16进制整数组装成一个字节
        for(int i=0;i<bytes.length();i+=2)
            baos.write((hexString.indexOf(bytes.charAt(i))<<4 |hexString.indexOf(bytes.charAt(i+1))));
        return new String(baos.toByteArray());
    }




    public static String formatField(Object o){
        if(o==null){
            return "空";
        }
        if(o instanceof Date){
            return DateUtil.format((Date)o);
        }else if(o instanceof Boolean){
            if((Boolean)o){
               return "是";
            }else{
                return "否";
            }
        }
        return o.toString();
    }

    public static String formatMoneyField(Object o){
        if(o==null){
            return "0元";
        }
        BigDecimal money =new BigDecimal(o.toString());
        money=money.divide(new BigDecimal("100"));
        money.setScale(2);
        return money+"元";
    }

    public static String formatAndTransfField(Object o){
        if(o==null){
            return "0";
        }
        BigDecimal money =new BigDecimal(o.toString());
        money=money.divide(new BigDecimal("100"));
        return money.longValue()+"";
    }

    public static String joinArray(Object[] obs){
        StringBuffer sb=new StringBuffer("");
        if(obs!=null&&obs.length>0){
            sb.append(obs[0].toString());
            for(int i=1;i<obs.length;i++){
                sb.append(","+obs[i].toString());
            }
        }
        return sb.toString();
    }

    // 计算预产期，根据怀孕日期前推280天
    public static Date getDueDateByPregantTime(Date pregantTime) {
        if (pregantTime == null) {
            return null;
        }

        Calendar calendar = Calendar.getInstance();
        calendar.setTime(pregantTime);

        calendar.add(Calendar.DAY_OF_YEAR, 280);

        return calendar.getTime();
    }

    public static Date getBabyNextBirthdayByBabyBirthday(Date babyBirthday, Date today, int configYears) {
        if (babyBirthday == null) {
            return null;
        }

        if (babyBirthday.compareTo(today) >= 0) {
            return babyBirthday;
        } else {

            Calendar calendar = Calendar.getInstance();
            calendar.setTime(today);
            calendar.set(Calendar.HOUR_OF_DAY, 0);
            calendar.set(Calendar.MINUTE, 0);
            calendar.set(Calendar.SECOND, 0);
            calendar.set(Calendar.MILLISECOND, 0);
            calendar.add(Calendar.YEAR, -configYears);

            Date minBabyBirthday = calendar.getTime();

            if (babyBirthday.compareTo(minBabyBirthday) < 0) {
                return babyBirthday;
            }

            String oldBirthdayMD = DateUtil.format(babyBirthday, "MM-dd");
            String todayMD = DateUtil.format(today, "MM-dd");

            String newBirthdayYear;
            if (oldBirthdayMD.compareTo(todayMD) >= 0) {
                newBirthdayYear = DateUtil.format(today, "yyyy");
            } else {
                newBirthdayYear = Integer.valueOf(DateUtil.format(today, "yyyy")) + 1 + "";
            }

            String oldBirthdayStr = DateUtil.format(babyBirthday, "yyyy-MM-dd");
            String newBirthday = oldBirthdayStr.replace(oldBirthdayStr.substring(0, 4), newBirthdayYear);
            return DateUtil.parseStringToDate(newBirthday, "yyyy-MM-dd");
        }
    }

    public static void main(String[] args){

        String certificate=createLicenseCertificate(licenseKey);
        System.err.println(certificate);
        String getLKey=getLicenseKey(certificate);
        System.err.println(getLKey);
        String licenseInfo=createLicenseInfo(10000l);
        System.err.println(licenseInfo);
        licenseInfo=encryptDesLicenseInfo(licenseKey,licenseInfo);
        System.err.println(licenseInfo);
        licenseInfo=getLicenseInfo(licenseInfo,certificate);
        System.err.println(licenseInfo);
        Long licenseNumber=getLicenseNumber_(licenseInfo);
    }



    public static BigDecimal getBigDecimal(Object o,Double defaultValue){
        try {
            return new BigDecimal(o.toString());
        }catch (Exception e){}
        if(defaultValue==null){
            return null;
        }else{
            return BigDecimal.valueOf(defaultValue);
        }
    }


    public static boolean dateChange(Date oldValue,Date newValue){
        if(newValue!=null){
            if(oldValue==null||(oldValue.getTime()!=newValue.getTime())){
                return true;
            }
        }
        return false;
    }
    public static boolean stringChange( String oldValue,String newValue){
        if(newValue!=null){
            if(oldValue==null||(!oldValue.equals(newValue))){
                return true;
            }
        }
        return false;
    }
//    public static boolean numberChange(){
//
//    }

}
