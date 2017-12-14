package simple.weather.server;

/**
 *
 * @author Alexandru Cazacu
 */
public class Main {

    public static void main(String[] args) {
        Thread server = new Thread(new Server());
        server.start();        
    }
}
