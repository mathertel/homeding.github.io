# Sensor Elements

The sensor elements enable reading values from a sensor chip on a specific time interval.
When new values could be retrieved these are emitted to other elements like
[displays](/displays.md) or [logs](/elements/log.md) to be shown or recorded.

On the board of the device in the Web UI the actual sensor values are shown as well.

The HomeDing library supports a collection of common sensor chips:

<div class="short">
  <a href="#page=elements/ds18b20.md"><img src="/i/element.svg"></a>
  <p><strong><a href="#page=elements/ds18b20.md">DS18B20 Element</a></strong><br/>
  The DS18B20Element allows retrieving temperature values from DS18B20 aka. Dallas Temperature sensors
  and creates actions when new values are available.</p>
</div>

<div class="short">
  <a href="#page=elements/dht.md"><img src="/i/dht.svg"></a>
  <p><strong><a href="#page=elements/dht.md">DHT Element</a> *</strong><br/>
  Use DHT11, DHT22 and AM2302 sensors for temperature and humidity and create actions.</p>
</div>

<div class="short">
  <a href="#page=elements/bmp280.md"><img src="/i/bmp280.svg"></a>
  <p><strong><a href="#page=elements/bmp280.md">BMP280 Element</a> *</strong><br/>
  The BMP280 is a combination of a temperature and absolute barometric pressure sensor.</p>
</div>

<div class="short">
  <a href="#page=elements/bme680.md"><img src="/i/bme680.svg"></a>
  <p><strong><a href="#page=elements/bme680.md">BME680 Element</a> *</strong><br/>
  Read BME680 sensor data with temperature, humidity, pressure and gas resistance.</p>
</div>

<div class="short">
  <a href="#page=elements/pms.md"><img src="/i/pms.svg"></a>
  <p><strong><a href="#page=elements/pms.md">PMS Element</a></strong><br/>
  Read sensor values from a PMS5003 sensor by plantdata to count micro particles in the air.</p>
</div>


<div style="clear:both"></div>

## Common Sensor Implementation

To simplify the implementation of sensors  there is a special Element with some common functionality available.
It that can be used as a base class for Elements that implement the data exchange with a special sensor chip.

Only 2 functions need to be implemented instead of the `loop()` function.

The properties that are supported by the base implementation for configuration are:

**readTime** - Time between 2 probes for temperature and humidity being fetched from the sensor. Default value is 1m.

**resendTime** - The current values of the probe are resent after this specified time even when not changing.

**warmupTime** - This time is waited after powering the sensor on the first start or after a reset before the first data is fetched.
The default time is set to 3 seconds.

**restart** - This property can be set to true to enable an automated restart when the sensor was not responding data.


## Common Timing

Using a sensor often requires to get data probes on a regular basis e.g. every minute or every 5 minutes. Waiting for the next timeslot to take a probe is implemented by defining the `readtime` property on any element configuration.


## Get Sensor Data

> bool GetProbe(&values);

When deriving from the SensorElement class the `GetProbe(&values)` function will be called when time has come.

This function will be called similar to the `loop()` function as long as it returns `false` to indicate that retrieving the data has not been completed. This may be required when reading a sensor includes waiting for the sensor being available or data being transmitted to the board.

When returning `true` the data retrieval is assumed to be completed. The data has to be returned by using the passed string parameter.

When returning `true` and an empty string back it is assumed that the sensor cannot be reached and this will end the current data retrieval.


## Sending Actions With Sensor Data.

> void SendValues(&values);

The `SendValues()` function will be called with the latest retrieved data and when actions are defined the sensor specific element will send them out.

The state of the element also needs to be updated.


## Detect non changing values

The data returned by the `GetProbe()` function will be compared against the last retrieved values. If there is no difference no action will be sent immediately.


## Resend values after some time

When data from the sensor has not changed it may be necessary to trigger the actions from time to tome e.g. to inform remote elements about the actual values.

By specifying the `resendtime` property the resent values are sent even when not changed. 


## Elements using the sensor base implementation

* [DS18B20 or Dallas Temperature](/elements/ds18b20.md)  
* [DHT element](/elements/dht.md)
* [DS18B20 Element](/elements/ds18b20.md)
<!-- * [INA219 Element](/elements/_ina219.md) -->
* [PMS element](/elements/pms.md)
* [BME680 element](/elements/bme680.md)

