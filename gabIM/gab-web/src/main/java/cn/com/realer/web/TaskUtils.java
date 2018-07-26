package cn.com.realer.web;

import org.springframework.stereotype.Component;

/**
 * Created by huren on 2017/7/10.
 */

@Component("taskJob")
public class TaskUtils {
    public static boolean startUpdateTimmer=true;
//    @Autowired
//    private SysMerchantHierarchyService sysMerchantHierarchyService;
//    @Autowired
//    private SysConfigService sysConfigService;
//    @Autowired
//    private MemberInfoService memberInfoService;
//
//    public static boolean flag=false;
//    @Scheduled(cron = "0/10 * * * * ? ")
//    public void job1() {
//        try {
//            System.out.println("空闲连接清理。。。");
//            MyDBUtil.cleanIdelConn();
//        }catch (Exception e){
//
//        }
//
//    }
//
//    public static Map<String,Long> lastUpdateTimeMap=new HashMap<>();
//    public static long gap_unit=1000*60;
////    @Scheduled(cron = "0 0/1 * * * ? ")
//    @Scheduled(cron = "0/10 * * * * ? ")
//    public void job2() {
//        if(!startUpdateTimmer){
//            return;
//        }
//        try {
//            Map<String,MerchantInfoVo> map= MerchantManager.getMerchantMap();
//            if(map!=null&&map.keySet()!=null){
//                for(String merchantId_:map.keySet()){
//                    Long merchantId=Long.parseLong(merchantId_);
//                    Map<String,List<String>> map_=sysConfigService.getConfigItemValueByPrefix(merchantId,merchantId, ConfigModelType.MERCHANT,"MERCHANT_");
//                    long gap=1;
//                    try {
//                        gap=Long.parseLong(map_.get("MERCHANT_UPDATE_TIME").get(0));
//                    }catch (Exception e){}
//                    Long lastUpdateTime_=lastUpdateTimeMap.get(merchantId+"");
//                    Date date=new Date();
//                    if(lastUpdateTime_==null||(date.getTime()-lastUpdateTime_>=gap*gap_unit)) {
//                        lastUpdateTimeMap.put(merchantId+"",date.getTime());
//                        System.out.println("商户（"+merchantId_+"）数据定时同步,开始【" + DateUtil.format(date, DateUtil.PATTERN_ALL) + "】");
//                        HttpUtil.httpClientPost(map_.get("MERCHANT_UPDATE_HOST").get(0)+map_.get("MERCHANT_UPDATE_URL").get(0)+"?merchantId="+merchantId);
//                        System.out.println("商户（"+merchantId_+"）数据定时同步,开始【"+ DateUtil.format(date,DateUtil.PATTERN_ALL)+"】,结束【"+ DateUtil.format(new Date(),DateUtil.PATTERN_ALL)+"】");
//                    }else{
//                        //source_type为1  系统添加会员
//                        //且按创建时间倒序；且POS版本为空的会员数据   逐条进行同步
//                    }
//                }
//            }
//        }catch (Exception e){
//
//        }
//
//    }
//
//
//
//    // 每天 00:05 执行
//    @Scheduled(cron = "0 05 00 * * ?")
//    public void job3() {
//        try {
//            System.out.println("提醒计算。。。");
//
//            // 计算宝宝下一次生日
//            // todo 之后需要处理宝宝农历生日
//
//            Calendar calendar = Calendar.getInstance();
//            calendar.setTime(new Date());
//            calendar.set(Calendar.HOUR_OF_DAY, 0);
//            calendar.set(Calendar.MINUTE, 0);
//            calendar.set(Calendar.SECOND, 0);
//            calendar.set(Calendar.MILLISECOND, 0);
//
//            Date today = calendar.getTime();
//            calendar.add(Calendar.YEAR, -sysConfigService.configYearsForBabyBirthday());
//            Date minBabyBirthday = calendar.getTime();
//
//            List<MemberInfo> memberListForBabyBirthday = memberInfoService.queryByBabyBirthday(minBabyBirthday, today);
//            memberInfoService.makeBabyNextBirthday(memberListForBabyBirthday, today, sysConfigService.configYearsForBabyBirthday());
//
//
//            // 计算预产期
//            List<MemberInfo> memberListForPregant = memberInfoService.queryByPregantTimeAndDueDate();
//            memberInfoService.makeDueDate(memberListForPregant);
//
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//    }
//
//
//    //维护许可信息的当前使用时间
//    @Scheduled(cron = "0/5 * * * * ? ")
//    public void updateMerchantTime() {
//        try {
//            MerchantManager.updateMerchantDateOfCenerServer(5000);
//        }catch (Exception e){
//
//        }
//
//    }
//
//    //定时心跳  同步中心服务时间等信息
//    @Scheduled(cron = "0 0 2 * * ? ")
//    public void updateMerchantTimeFromCenterServer() {
//        try {
////            HttpUtil.httpClientPost("");
//        }catch (Exception e){
//
//        }
//
//    }
//
//
//    //商户激活程序
//    @PostConstruct
//    private void testInit(){
//        new Thread(new Runnable() {
//            @Override
//            public void run() {
//                try {
//                    System.err.println("线程睡眠50秒");
//                    Thread.currentThread().sleep(1000*50);
//                } catch (InterruptedException e) {
//                    e.printStackTrace();
//                }
//                //激活
//                MerchantManager.autoSetMerchant(true,sysConfigService);
//                //数据克隆
////                Map<String,MerchantInfoVo> map= MerchantManager.getMerchantMap();
////                if(map!=null&&map.keySet()!=null){
////                    for(String merchantId_:map.keySet()){
////                        Long merchantId=Long.parseLong(merchantId_);
////                        Map<String,List<String>> map_=sysConfigService.getConfigItemValueByPrefix(merchantId,merchantId, ConfigModelType.MERCHANT,"MERCHANT_");
////                        HttpUtil.httpClientPost(map_.get("MERCHANT_UPDATE_HOST").get(0)+map_.get("MERCHANT_UPDATE_URL").get(0)+"?merchantId="+merchantId);
////                    }
////                }
//            }
//        }).start();

//    }
}
