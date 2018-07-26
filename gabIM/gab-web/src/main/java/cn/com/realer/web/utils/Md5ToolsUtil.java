package cn.com.realer.web.utils;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
public final class Md5ToolsUtil {
	private static final char hexDigits[] = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c',
			'd', 'e', 'f'};
	public static String encode(File file) {
		FileInputStream in = null;
		MessageDigest md5 = null;
		try {
			in = new FileInputStream(file);
			FileChannel ch = in.getChannel();
			MappedByteBuffer byteBuffer = ch.map(FileChannel.MapMode.READ_ONLY, 0, file.length());
			md5 = MessageDigest.getInstance("MD5");
			md5.update(byteBuffer);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				in.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return toHex(md5.digest());
	}
	public static String encode(String arg) {
		if (arg == null) {
			arg = "";
		}
		MessageDigest md5 = null;
		try {
			md5 = MessageDigest.getInstance("MD5");
			md5.update(arg.getBytes("UTF-8"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return toHex(md5.digest());
	}
	private static String toHex(byte[] bytes) {
		StringBuffer str = new StringBuffer(32);
		for (byte b : bytes) {
			str.append(hexDigits[(b & 0xf0) >> 4]);
			str.append(hexDigits[(b & 0x0f)]);
		}
		return str.toString();
	}
	
//    /**
//     * 随机密钥长度
//*/
//    private static final int _KEYTLENGTH = 6;
//
//    /**
//     * 生成随机密钥
//     * 
//     * @param length
//     *            密钥长度
//*/
//    private String getRandomKeyt(int length) throws Exception {
//        if (length < 1)
//            throw new Exception("密钥长度不能小于 1");
//        String _keyt = "";
//        for (int i = 0; i < length; i++) {
//            _keyt += (char) (33 + (int) (Math.random() * (126 - 33 + 1)));
//        }
//        return _keyt;
//    }

    /**
     * 32位标准 MD5 加密
     * 
     * @param plainText
     *            明文
     * @return 密文<br>
     *         返回 Null 值则出现异常
*/
    public static String cell32(String plainText) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(plainText.getBytes());
            byte b[] = md.digest();
            int i;
            StringBuffer buf = new StringBuffer("");
            for (int offset = 0; offset < b.length; offset++) {
                i = b[offset];
                if (i < 0)
                    i += 256;
                if (i < 16)
                    buf.append("0");
                buf.append(Integer.toHexString(i));
            }
            return buf.toString();// 32位的加密

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 32 位 salt 加密
     * 
     * @param plainText
     *            明文
     * @return 索引 0 是密文，索引 1 是二次密钥
*/
    public static String salt32(String plainText, String _salt) throws Exception {
        return salt("32", plainText,_salt);
    }

    /**
     * 16 位标准 MD5 加密
     * 
     * @param plainText
     *            明文
     * @return 密文<br>
     *         返回 Null 值则出现异常
*/
    public static String cell16(String plainText) {
        String result = cell32(plainText);
        if (result == null)
            return null;
        return result.toString().substring(8, 24);// 16位的加密
    }

    /**
     * 16 位 salt 加密
     * 
     * @param plainText
     *            明文
     * @return 索引 0 是密文，索引 1 是二次密钥
*/
    public  static String salt16(String plainText, String _salt) throws Exception {
        return salt("16", plainText,_salt);
    }

    /**
     * 根据调用的方法名称执行不同的方法
     * 
     * @param saltFunctionName
     *            加密的方法名称
*/
    private static String salt(String saltType, String plainText, String _salt)
            throws Exception {
//        String _keyt = "1234";
        if("32".equals(saltType)){
        	return cell32(cell32(plainText) + _salt);
        }else{
        	return cell16(cell16(plainText) + _salt);
        }
    }
	
    /**
     * MD5盐值加密
     * 
     * @param arg	加密字符串
     * @param _salt 盐值
     * @return
     */
    public static String encode(String arg,String _salt) {
    	
    	try {
			return salt32(arg,  _salt);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    	return "";
    	
    }
	
	public static void main(String[] args) {
		//System.out.println(Md5Util.encode("111111"));
		
		try {
			
			System.out.println(Md5ToolsUtil.encode("123456", "dsfdere@#$%^*&*"));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
	}
}