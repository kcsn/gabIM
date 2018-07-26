package cn.com.realer.core.util;

/**
 * Created by huren on 2017/2/17.
 */
public class RedisKeyUtil {
    //记录和管理redis key 前缀
    //临时前缀
    public static final String TEMP="temp";
    //自增序列前缀
    public static final String AUTO_ADD="inc";
    //终端临时许可，渠道，门店，款台
    public static final String TempLicense_Prefix="TLP_";
    public static final String TEMPLICENSE ="TLP_%s";//设备ID
    public static final int TEMPLICENSE_EXPIRE = 24 * 60 * 60 * 3;//3天
    public static final String ORDER_TOKEN = "OT_%s_%s";//支付类型，参数列表签名
    public static final int  ORDER_TOKEN_EXPIRE = 60 * 30 ;//5分钟

    //交易自增序列 前缀
    public static final String TradeInc_Prefix="TDI_";

    //支付交易数据状态_sortset
    public static final String SALE_ORDER_STATE_SS_PREFIX="ODS_SS_";
    //支付交易数据状态_hset
    public static final String SALE_ORDER_STATE_HS_PREFIX="ODS_HS_";
    //退款交易数据状态_sortset
    public static final String RETURN_ORDER_STATE_SS_PREFIX="RDS_SS_";
    //退款交易数据状态_hset
    public static final String RETURN_ORDER_STATE_HS_PREFIX="RDS_HS_";
    //支付交易临时标记_normal key
    public static final String SALE_ORDER_TEMP_STATE_NK_PREFIX="ODTS_NK_";
    //退款交易临时标记_normal key
    public static final String RETURN_ORDER_TEMP_STATE_NK_PREFIX="RDTS_NK_";
    //渠道商户号hset key前缀
    public static final String CHANNEL_MERCHANT_HS_PREFIX= "CHANNEL_MERCHANT_";
    //商户号hset key前缀
    public static final String MERCHANT_HS_PREFIX= "MERCHANT_";
    //交易记录待存队列  hset
    public static final String TRADE_ORDER_TO_SAVE_PREFIX="TOTS_HS_";
    //待存队列中  查询键 交易流水和field的映射
    public static final String TRADE_SERIAL_FIELD_MAP="TSFM_HS_";
    //交易记录存错队列  hset
    public static final String TRADE_ORDER_RESAVE_PREFIX="TORS_HS_";


}
