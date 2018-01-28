package boot;

import java.util.HashMap;
import java.util.Map;

public class Locations {

	String 	region,
			district,
			latitude,
			longitude,
			storeId,
			footFalls,
			kRevenue;

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	public String getStoreId() {
		return storeId;
	}

	public void setStoreId(String storeId) {
		this.storeId = storeId;
	}

	public String getFootFalls() {
		return footFalls;
	}

	public void setFootFalls(String footFalls) {
		this.footFalls = footFalls;
	}

	public String getkRevenue() {
		return kRevenue;
	}

	public void setkRevenue(String kRevenue) {
		this.kRevenue = kRevenue;
	}
	
	
}
