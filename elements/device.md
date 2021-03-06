# The Device Element

::: excerpt device
The DeviceElement allows configuration of the behavior of the device and the features offered by the board class.
:::

![Device Properties and actions](/elements/deviceapi.png)

By specifying the configuration for the `device/0` element the general settings for the device can be controlled.

## Element Configuration

The following properties are available for configuration of the element.

### Basic settings

**name** - The device name is specifying the hostname that is used to register the device on the network.
The device can be accessed by any browser on the same network using the URL `http://<name>`.

**rebootTime** - Specifies the duration after the device is rebooted to fully clean up the memory.

**description** - A line of text that gives a short description of the device used in the web UI.

**room** - The location of the device.

**logLevel** - By specifying a logLevel for the device **all** elements will use this loglevel to output debug messages over the serial interface and into the system log file.
See also [Device Logging](logger.md).

**logFile** - set to 1/true to enable storing lines from the system log to files. default: 0

**onSysStart** - These actions are dispatched when the elements are activated. Element that require a valid local time are not started at this point.  

**onStart** - These actions are dispatched when all elements are active. 

**cache** - This property can be used to replace the default http `cache-control` header for accessing the static files by a custom value.
The default cache header is `"no-cache"` that is good while developing and configuring.
But when have a stable configuration caching can be switched on using a value like `"max-age=120"` 

**sd** - The mDNS based service discovery can be switched off by setting this property to `false`.


### WiFi-Manager and Startup settings

**led** - The GPIO pin of the system LED. Defaults is `no LED`.

**button** - The GPIO pin of the system button. Defaults is 'GPIO0(D3)'

**connectTime** - The available time after a reboot of the device to start network configuration. Default: "6s".

Detailed description for `ConnectTime`, `button` and `led` see [WiFiManager](wifimanager).


### I2C bus

Many connected sensors and displays are connected via the I2C bus. This bus must be initialized according to the onboard wiring by using the right SDA and SCL pins.

Because there is only 1 bus available in the Arduino boards the configuration is done centrally in the device.

**I2C-SDA** - the data line of the i2c bus.

**I2C-SCL** - the clock line of the i2c bus.

The device Element is only defining what pins are used for the I2C bus but does no further initialization.

More hints on the I2C bus implementation see [I2C](/i2c.md)


### Web UI

**homepage** - When the device starts in normal mode this page will be shown when opening the device web UI using the url without specifying the page. This defaults to `/index.htm`

**title** - short title to be displayed in the web UI


### Deep Sleep mode

**sleep** -  To start a deep sleep a `sleep=true` action needs to be send to the device element.
A `sleep=false` action will disable any sleep mode until next restart.


**sleeptime** -  The time a devices sleeps when a sleep action was sent to the device element.



## Control the Device

The following action is implemented:

**reset** - This action wil immediately restart the device like using a reset button. No settings are changed or wiped. 


## Configuration Example

```JSON
{
  "device": {
    "0": {
      "loglevel": 1,
      "name": "wmleaks",
      "title": "Water Leakage",
      "description": "Monitor water leaks at the washing machine",
      "room": "Celler",
      "reboottime": "24h",
      "sleeptime": 600,
      "led": "D0",
      "button": "D3",
      "homepage": "ding-info.htm",
      "logfile": 1,
      "I2C-SDA" : "D4",
      "I2C-SCL" : "D5"
    }
  }
}
```

## See also

* [WiFiManager](/wifimanager)
* [Device Logging](logger.md)
* Cache-control http header : <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control>


## Tags
#element #system-element
