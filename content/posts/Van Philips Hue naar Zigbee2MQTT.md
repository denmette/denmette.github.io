---
title: Van Philips Hue naar Zigbee2MQTT
date: 2025-01-21
draft: "false"
tags:
  - home-assistant
---
**Start van ons slimme huis**  
Ongeveer vijf jaar geleden begon ik mijn avontuur in huisautomatisering met het installeren van slimme lampen, aangestuurd via een **Philips Hue Bridge**. Al snel kwamen er ook slimme stekkers bij om het gebruiksgemak te vergroten. 

Door de bouw van ons huis en de aanwezigheid van een slimme meter zijn we ons energieverbruik via de **P1-poort** gaan monitoren. Dit bracht ons uiteindelijk bij **Home Assistant**, een platform dat alles met elkaar verbindt.

**Waarom overstappen?**  
De lampen van Philips Hue zijn zonder twijfel prachtig, en hun mobiele apps bieden alles wat nodig is. Toch gebruiken we die apps nauwelijks, omdat alles via Home Assistant verloopt. Toen we **Aqara-apparatuur** toevoegden, hadden we een **Zigbee-stick** nodig. Hierdoor zaten we ineens met zowel een Philips Hue Bridge als een Zigbee-stick – twee systemen voor dezelfde functie. Tijd om op te ruimen!

**Eerste poging: Zigbee Home Automation (ZHA)**  
Ik besloot de Philips Hue Bridge te vervangen door de Zigbee-stick en probeerde eerst **Zigbee Home Automation (ZHA)** via Home Assistant. Het toevoegen van apparaten verliep soepel, totdat ik ontdekte dat het niet mogelijk was om de lampen via ZHA te updaten. Dit was een dealbreaker.

**Overstappen naar Zigbee2MQTT**  
De volgende stap was **Zigbee2MQTT**, wat inhield dat ik een **MQTT-broker** moest instellen en de Zigbee2MQTT-add-on moest installeren in Home Assistant. Dit proces verliep zonder noemenswaardige problemen, en de Philips Hue Bridge verdween definitief uit de kast. Alleen de Zigbee-stick bleef over.

**Een onverwachte hobbel: Zigbee2MQTT versie 2**  
Net toen alles soepel leek te lopen, kwam **Zigbee2MQTT versie 2** uit. De update bleek niet compatibel met mijn bestaande Zigbee-stick. Dat betekende dat ik de firmware van de stick moest upgraden. Na heel wat tutorials en pogingen via Linux, macOS en Windows, besloot ik er niet te veel tijd aan te besteden.

Uiteindelijk vond ik een handige oplossing via **een [website](https://darkxst.github.io/silabs-firmware-builder/) in Google Chrome op een Windows-machine**. Met die methode kon ik de stick updaten, en daarna werkte alles weer probleemloos.

**Conclusie**  
De overstap naar Zigbee2MQTT heeft ons een eenvoudigere en efficiëntere setup opgeleverd. Het verwijderen van de Philips Hue Bridge maakte ruimte vrij, en dankzij Home Assistant is alles perfect geïntegreerd. Ondanks de kleine uitdaging met de Zigbee2MQTT-update is het resultaat meer dan de moeite waard.