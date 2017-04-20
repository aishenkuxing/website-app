package com.cn.website.common.util;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;
import org.mortbay.log.Log;

public class FileUtil {
	public static String ReadFile(String path) {  
        File file = new File(path);  
        BufferedReader reader = null;  
        String laststr = "";  
        try {  
            reader = new BufferedReader(new FileReader(file));  
            String tempString = null;  
            while ((tempString = reader.readLine()) != null) {  
                laststr = laststr + tempString;  
            }  
            reader.close();  
        } catch (IOException e) {  
            e.printStackTrace();  
        } finally {  
            if (reader != null) {  
                try {  
                    reader.close();  
                } catch (IOException e1) {  
                }  
            }  
        }  
        return laststr;  
    }  
	
	
	public static String inputStreamString(InputStream is) throws IOException  {
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		int i = -1;
		while ((i = is.read()) != -1) {
			baos.write(i);
		}

		return baos.toString();
	}
	
	public static JSONArray readJSONArray(String path) throws Exception  {
		InputStream inStream = FileUtil.class.getClassLoader().getResourceAsStream(path);
		JSONArray jsonArr = null;
		String dataSourcesStr;
		dataSourcesStr = FileUtil.inputStreamString(inStream);
		jsonArr = new JSONArray(dataSourcesStr);
		return jsonArr;
	}
	
}
