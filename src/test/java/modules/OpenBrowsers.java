package modules;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.firefox.FirefoxBinary;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.ie.InternetExplorerDriver;

import static org.openqa.selenium.remote.BrowserType.*;
import static org.openqa.selenium.remote.BrowserType.CHROME;

public class OpenBrowsers {
    protected static WebDriver driver;

    public static void openBrowser(String browserName) {
        if (browserName.equals(IE)) {
            WebDriverManager.iedriver().setup();
            driver = new InternetExplorerDriver();
        } else if (browserName.equals(EDGE)) {
            WebDriverManager.edgedriver().setup();
            driver = new EdgeDriver();
        } else if (browserName.equals(FIREFOX)) {
            WebDriverManager.firefoxdriver().setup();
            driver = new FirefoxDriver();
        } else if (browserName.equals(CHROME)) {
            WebDriverManager.chromedriver().setup();
            driver = new ChromeDriver();
        } else if (browserName.equals("chrome-headless")) {
            ChromeOptions chromeOptions = new ChromeOptions();
            chromeOptions.addArguments("--headless");
            driver = new ChromeDriver(chromeOptions);
        } else if (browserName.equals("firefox-headless")) {
            FirefoxBinary firefoxBinary = new FirefoxBinary();
            firefoxBinary.addCommandLineOptions("--headless");
            FirefoxOptions firefoxOptions = new FirefoxOptions();
            firefoxOptions.setBinary(firefoxBinary);
            driver = new FirefoxDriver(firefoxOptions);
        } else {
            System.err.println("The browser " + browserName + " does not defined");
        }
    }

    public static void main(String[] args) {
        openBrowser(OPERA);

    }
}
