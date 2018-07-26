package cn.com.realer.core.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.PropertySource;

import java.util.ResourceBundle;

/**
 * Created by haili on 2017/4/8.
 */
@PropertySource("classpath:config/workId.properties")
public class SerialNumberUtils {

    private static Logger log = LoggerFactory.getLogger(SerialNumberUtils.class);
    private static  Sequence sequence;
    private static Integer workId = Integer
            .valueOf(ResourceBundle.getBundle("config/workId").getString("work.id"));
    static {
        log.info("workId:" + workId);
        sequence = new Sequence(workId,1);
    }


    public static String generateSerialNumber(){
        long nextId = sequence.nextId();
        return String.valueOf(nextId);
    }

    public static String generateRefundNumer(){
        long nextId = sequence.nextId();
        return String.valueOf("Q" + String.valueOf(nextId));
    }

    public static String generatePayNumber(){
        long nextId = sequence.nextId();
        return String.valueOf("P" + String.valueOf(nextId));
    }

    public static void main(String[] args) {

        System.out.printf("");
    }
}
