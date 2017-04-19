package com.cn.website.common.util;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;

import org.codehaus.jettison.json.JSONArray;
import org.codehaus.jettison.json.JSONException;

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
	
	public static JSONArray readJSONArray(String path)  {
		InputStream inStream = FileUtil.class.getClassLoader().getResourceAsStream(path);
		JSONArray jsonArr = null;
		String dataSourcesStr;
		try {
			dataSourcesStr = FileUtil.inputStreamString(inStream);
			jsonArr = new JSONArray(dataSourcesStr);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return jsonArr;
	}
	
}
