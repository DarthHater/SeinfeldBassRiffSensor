# Seinfeld Bass Riff Motion Sensor

### Setup

Obtain an Intel Edison with Arduino Board, biss0001 PIR sensor, some form of bluetooth speaker

Configure your environment, get the Edison up and humming, connect via terminal

Install sound of your choice to /tmp/ probably like so 
```
wget -O /tmp/seinfeld.wav 'http://www.wavsource.com/snds_2016-04-17_2152604536530364/tv/seinfeld/seinfeld.wav'
```

Pair Edison with Bluetooth Speaker. Run commands below and add ID for bluetooth speaker in deviceid
 
 ```
 rfkill unblock bluetooth
 bluetoothctl
 scan on
 pair <deviceid>
 connect <deviceid>
 exit
 ```
 
 Configure sink on Edison to use bluetooth speaker. Once you run pactl you'll see a list of available sinks, use the one for the bluetooth speaker
 
 ```
 pactl list sinks
 pactl set-default-sink <nameofdevice>
 ```
 
 Hookup biss0001 to Arduino shield on port D2
 
 Run code for fun and profit!