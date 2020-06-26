//Microprogramacion - Estación Meteorológica 

//Ciclo I - 2020

//Integrantes:
//Mendoza Meza, Miguel Ángel
//Pastore Baires, Julio Eduardo 
//Saravia Chavarria, Jose Noe
//Vásquez Martínez, Santos Paulino 
//Vigil Ventura, Oscar René





#include<Wire.h> // libreria para poder usar la comunicacion i2c en los puertos A4,A5
#include <dht.h> // Libreria para el sensor de humedad DHT11

 #include <Adafruit_Sensor.h>  //libreria generica para manejar sensores Adafruit
#include "SDL_Weather_80422.h"// libreria con metodos para manejar multiples sensores solo se usa para medir el viento 
#include "Adafruit_BMP085.h" // libreria para el sensor de presion AT.
#include "Adafruit_ADS1015.h" //libreria para manejo de informacion del puerto i2c


#define DHTTYPE DHT11  //variable qu contiene el tipo de sensor DHT que se usa (DHT11)
// defincinicion de pines donde estan conectados los sensores
#define DHTPIN 3      
#define pinAnem    2 
#define pinRain     4
#define intAnem    0 
#define intRain    1 
// definicion de tipo de sensor DHT 
DHT dht(DHTPIN, DHTTYPE);

// dando parametros a la libreria que controla multiples sensores (solo se usa para medir el viento)
SDL_Weather_80422 weatherStation(pinAnem, pinRain, intAnem, intRain, A1, SDL_MODE_INTERNAL_AD);
uint8_t i;
//declaracion de un objeto que sera el sensor de presion ATM.
Adafruit_BMP085 bmp;
//variables para los datos del sensor de viento
float currentWindSpeed;
float currentWindGust;
//no se usa es para el sensor de lluvia y direccion
float totalRain,veleta;

void setup()
{ 
		// inicio del serial a 9600 baudios
		Serial.begin(9600); 
		//inicio del sensor DHT
		dht.begin();
		//inicio de la libreria para el puerto I2c
		Wire.begin();
		//inico del sensor de presion
		bmp.begin();

}

void loop()
{
		// captura de datos del sensor humedad ,temperatura y presion en variables 
		 float h = dht.readHumidity();
		 float t = dht.readTemperature();
		 float p = bmp.readPressure();

		//captura de datos del sensor de viento en variables y se calibran 
		currentWindSpeed = (weatherStation.current_wind_speed()/2.6)*5.0;
		currentWindGust = (weatherStation.get_wind_gust()/2.6)*5.0;
		totalRain = totalRain + weatherStation.get_current_rain_total()/51.4;
		
		//declaracion y captura de datos de sensor de luz en variables 
		  float sensorValue;
		  float sensorVoltage;
		  sensorValue = analogRead(A0);
		// calibracion de los datos para pasarlos a %
		  sensorVoltage = (sensorValue/422)*100;

		// mostrar en puerto serial los datos antes recolectados en forma de tabla 

    		 Serial.print("Humedad: ");
    		 Serial.print(h);
    		 Serial.print(",Temperatura: ");
      		 Serial.print(t);
      		 Serial.print(",Presion: ");
      		 Serial.print(p/1000);
      		 Serial.print(",Luz: ");
      		 Serial.print(sensorVoltage);
      		 Serial.print(",Viento: ");
      		 Serial.print(currentWindGust);
      		 Serial.print("\r");

		
		
		//pausa de aprox. 2 segundo entre envio de mediciones nuevas.
		delay(2000);

//fin comentarios de director
}
