package cn.com.realer.core.util;

import cn.com.realer.core.exception.FrameException;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by huren on 2017/3/10.
 */
public class CommUtils {
    public static boolean printLogFlag=true;
    public static void printLog(Object msg){
        if(printLogFlag){
            System.out.println(msg);
        }
    }

    public static <T> void mergeObject(T origin, T destination) {
        if (origin == null || destination == null)
            return;
        if (!origin.getClass().equals(destination.getClass()))
            return;

        Field[] fields = origin.getClass().getDeclaredFields();
        for (int i = 0; i < fields.length; i++) {
            try {
                fields[i].setAccessible(true);
                Object value = fields[i].get(origin);
                if (null != value) {
                    fields[i].set(destination, value);
                }
                fields[i].setAccessible(false);
            } catch (Exception e) {
            }
        }
    }


    public static Map<String, String> objectToMap(Object obj) throws Exception {
        if(obj == null)
            return null;

        Map<String, String> map = new HashMap<String, String>();

        BeanInfo beanInfo = Introspector.getBeanInfo(obj.getClass());
        PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
        for (PropertyDescriptor property : propertyDescriptors) {
            String key = property.getName();
            if (key.compareToIgnoreCase("class") == 0) {
                continue;
            }
            Method getter = property.getReadMethod();
            Object value = getter!=null ? getter.invoke(obj) : null;
            String value_=value==null?"":value.toString();
            map.put(key, value_);
        }

        return map;
    }


    public static boolean isIgnoreText(String value,Integer[] ignoreNumbers){
        for(Integer ignoreNumber:ignoreNumbers){
            if(value.contains(""+ignoreNumber)){
                return true;
            }
        }
        return false;
    }


    public static Long getLuckyNumber(Integer[] ignoreNumber,Long memberNumberMinus){
        int positionOfNumber=10;
        long number=memberNumberMinus.longValue();
        long last=0l;
        String trueValue="";
        do{
            last=number%positionOfNumber;//十位后的数字
            number=number-last;//十位之前的数字
            while(isIgnoreText(last+"",ignoreNumber)){
                last+=1;
                if(last>100){
                    throw new FrameException("敏感规则不能满足，请重新设置");
                }
            }
            number+=last;
            last=number%positionOfNumber;//十位后的数字
            trueValue=last+trueValue;
            number=number/10;
        }while(number>0);
        return Long.parseLong(trueValue);
    }




    public static Long getTrueNumberOfItem(Integer[] ignoreNumber,long i){
        if(i==0){
            return getLuckyNumber(ignoreNumber,0l);
        }else{
            long luck=getTrueNumberOfItem(ignoreNumber,i-1);
            return getLuckyNumber(ignoreNumber,luck+1);
        }

    }


     public static void main(String[] args){
//        Integer[] a=new Integer[]{4};
//        for(int i=0;i<=100;i++){
//            System.out.println(i+":"+getTrueNumberOfItem(a,i));
//        }
         Date date =new Date(1504826916903l);
         System.out.println(DateUtil.format(date,DateUtil.PATTERN_ALL));
         date=DateUtil.parseStringToDate("2017-09-15 00:17:23",DateUtil.PATTERN_ALL);
         System.out.println(date.getTime());
     }
}
