package simple_weather_server;

import com.google.gson.Gson;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URISyntaxException;
import org.apache.http.HttpResponse;
import org.apache.http.client.fluent.Request;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.util.EntityUtils;
import simple_weather_server.schemas.*;

/**
 *
 * @author Alexandru Cazacu
 */
public class Main {

    public static void main(String[] args) throws URISyntaxException, IOException {

        ServerSocket server = new ServerSocket(4000);
        System.out.println("Listening for connection on port " + server.getLocalPort() + " ....");

        while (true) {
            try (Socket client = server.accept()) {
                InputStreamReader isr = new InputStreamReader(client.getInputStream());
                BufferedReader reader = new BufferedReader(isr);

                // Reads first line (GET + path).
                String line = reader.readLine();
                line = line.substring(5, line.length() - 9);
                System.out.println("Received request for: " + line);

                // Passes request to API.
                URIBuilder builder = new URIBuilder().setScheme("https").setHost(line);
                System.out.println("Passed request to: " + builder.build());

                // Get response from API.
                HttpResponse response = Request.Get(builder.build()).execute().returnResponse();
                int returnCode = response.getStatusLine().getStatusCode();
                String body = EntityUtils.toString(response.getEntity());
                System.out.println("Response code: " + returnCode);

                // Passes response to client.
                String httpResponse = "HTTP/1.1 200 OK\r\n\r\n" + body;
                client.getOutputStream().write(httpResponse.getBytes("UTF-8"));

                // Creates JSON object as WeatherContainer.
                Gson gson = new Gson();

                WeatherContainer json = gson.fromJson(body, WeatherContainer.class);

                if (json.getCity() != null) {
                    System.out.println("--- Returned forecast for " + json.getCity().getName());
                }
            }
        }
    }
}

// La parte sotto non serve
//
//        // Set up URI.
//        //URIBuilder builder = new URIBuilder().setScheme("http").setHost("numbersapi.com").setPath("13");
//        URIBuilder builder = new URIBuilder().setScheme("http")
//                .setHost("api.openweathermap.org/data/2.5/forecast")
//                .addParameter("lat", "45.5")
//                .addParameter("lon", "10.1")
//                .addParameter("APPID", "29cabd959646720b099eb2c2fa6b0518");
//
//        System.out.println(builder.build());
//
//        // Get response from API.
//        HttpResponse response = Request.Get(builder.build()).execute().returnResponse();
//
//        int returnCode = response.getStatusLine().getStatusCode();
//        String body = EntityUtils.toString(response.getEntity());
//        System.out.println("Response code: " + returnCode);
//        System.out.println("Response body: " + body);
