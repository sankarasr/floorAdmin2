package boot;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.springframework.stereotype.Component;


@Component
public class LoadLocations {

	public List<Locations> locationsList = new ArrayList<Locations>();
	Properties locationProperties = new Properties();

	public List<Locations> LoadLocations(){
		return load();
	}

	public List<Locations> load(){
		InputStream input = null;
		try{
			 input = new FileInputStream("locations.properties");
			 locationProperties.load(input);
			 for (int i=0 ; i < 229 ; i ++){
				 String [] l = locationProperties.getProperty(String.valueOf(i)).split(",");
				 Locations temp = new Locations();
				 temp.setLatitude(l[0].trim());
				 temp.setLongitude(l[1].trim());
				 temp.setRegion(l[1].trim());
				 temp.setDistrict(l[2].trim());
				 locationsList.add(temp);
			 }
			 
			 
		} catch (IOException ex) {
			ex.printStackTrace();
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			return  locationsList;
		}
	}

	
}
