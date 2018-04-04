
package simple_weather_server.schemas;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class WeatherContainer {

    @SerializedName("city")
    @Expose
    private City city;
    @SerializedName("cnt")
    @Expose
    private Integer cnt;
    @SerializedName("list")
    @Expose
    private java.util.List<simple_weather_server.schemas.List> list = null;

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Integer getCnt() {
        return cnt;
    }

    public void setCnt(Integer cnt) {
        this.cnt = cnt;
    }

    public java.util.List<simple_weather_server.schemas.List> getList() {
        return list;
    }

    public void setList(java.util.List<simple_weather_server.schemas.List> list) {
        this.list = list;
    }

}
