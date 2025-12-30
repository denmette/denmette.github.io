---
title: "Maak een Sectie Header met Veranderbare Entiteiten in Home Assistant"
description: "Een praktische stap-voor-stap uitleg om in Home Assistant een dynamische sectie header te bouwen die temperatuur, luchtvochtigheid en slimme zichtbaarheid combineert voor een overzichtelijk dashboard."
summary: "Een dashboard kan mooi zijn en toch in de weg zitten. Met een paar slimme keuzes kan één header ineens context tonen, acties sturen en zichzelf aanpassen aan de situatie. Minder knoppen, meer duidelijkheid, precies waar je kijkt."
author: "Maarten"
date: 2025-01-28
lastmod: 2025-01-28
slug: "202501-home-assistant-sectie-header"
draft: false
tags: [home-assistant, tutorial]
cover:
  image: "cover.webp"
  alt: "Dashboardweergave van Home Assistant met een sectie header voor de keuken, inclusief temperatuur en luchtvochtigheid"
  title: "Een slimme sectie header voor je Home Assistant dashboard"
  caption: "Een gepersonaliseerde Home Assistant header die context, metingen en acties samenbrengt in één overzicht."
images: ["cover.webp"]
---

Home Assistant biedt uitgebreide mogelijkheden om je dashboards te personaliseren, met behulp van **views** en **layouts**. In deze blogpost laat ik je zien hoe je een **sectie header** kunt maken met een veranderbare entiteit en hoe je met zichtbaarheid (visibility) extra functionaliteiten kunt toevoegen. 

Het doel is om een sectie header te creëren dat de *locatie*, temperatuur en luchtvochtigheid toont en waarmee je de ventilatie van een ruimte kunt boosten. Als de boost geactiveerd is, willen we de boost-knop verbergen en laten zien hoelang de boost nog actief is.

Het is belangrijk om te weten dat ik in mijn voorbeeld gebruikmaak van de Renson Healthbox 3, dus sommige instellingen gaan voor jullie anders zijn.

![Eind resultaat met Boost kop](images/eind-resultaat.png)

![Eind resultaat met Resterende boost tijd](images/eind-resultaat-in-boost.png)

## 1. Begin met de Edit-modus

Open je dashboard in Home Assistant en ga naar de **edit-modus** van je view. Beweeg met de muis over de **Heading Card** waar je de header wilt aanpassen, en klik op het **potlood-icoon** dat verschijnt. 

![Editeer modus van een view](images/editeer-modus-view.png)

![Potlood icoon wanneer je met de muis over de sectie header staat](images/editeer-modus-hover.png)

## 2. Voeg een Heading en Entiteiten toe

In het bewerkingsscherm kun je de titel en het icoon voor je sectie instellen. In mijn voorbeeld heb ik de heading **"Keuken"** gekozen met een icoon dat lijkt op een keukenwerkblad.

Daarnaast koppel je entiteiten aan de header. In dit voorbeeld heb ik de volgende entiteiten toegevoegd:
- **Temperatuur** 
- **Luchtvochtigheid**
- **Keuken Boost-script** (om de ventilatie te activeren)
- **Resterende boost-tijd**

![Het algmeen editeer scherm dat opent als een popup](images/popup-heading-card.png)

---

## 3. Zichtbaarheid instellen voor de Boost-knop

Klik op het potlood-icoon naast de entiteit **Keuken Boost**. Het scherm veranderd naar
waar je de zichtbaarheid van deze entiteit kunt configureren. Gebruik de volgende logica:
- De Boost-knop is alleen zichtbaar als de status **niet gelijk is aan "Aan"**. Dit is handig als je meerdere statussen hebt, want deze logica zorgt ervoor dat het altijd correct werkt.

![Aanpassingsscherm van de entiteit keuken boost](images/popup-heading-card-visibility-boost.png)

> **Tip**: Vergeet niet om de interactie-instellingen aan te passen. Omdat het een script betreft, kun je dit eenvoudig instellen als een **Toggle**.

---

## 4. Zichtbaarheid instellen voor de Resterende Boost-tijd

Voor de entiteit die de resterende boost-tijd toont, pas je dezelfde logica toe, maar stel je in dat deze alleen zichtbaar is als de status **gelijk is aan "Aan"**. Hierdoor verschijnt de resterende tijd alleen wanneer de boost actief is.

![Aanpassingsscherm van de entiteit resterende boost tijd](images/popup-heading-card-visibility-remaining.png)

## 5. De configuratie in code

```yaml
type: heading
heading: Keuken
heading_style: title
icon: mdi:countertop
badges:
  - type: entity
    entity: sensor.keuken_eetplaats_living_temperature
  - type: entity
    entity: sensor.keuken_eetplaats_living_humidity
  - type: entity
    show_state: true
    show_icon: true
    entity: script.keuken_boost
    name: Boost
    state_content: name
    tap_action:
      action: toggle
    visibility:
      - condition: state
        entity: binary_sensor.keuken_eetplaats_living_boost_status
        state_not: "on"
  - type: entity
    show_state: true
    show_icon: true
    entity: sensor.keuken_eetplaats_living_boost_remaining
    visibility:
      - condition: state
        entity: binary_sensor.keuken_eetplaats_living_boost_status
        state: "on"
```

Met deze stappen kun je een functionele en visueel aantrekkelijke sectie header maken die slim inspeelt op de status van je entiteiten. Dit biedt niet alleen meer gebruiksgemak, maar zorgt er ook voor dat je dashboard overzichtelijk blijft.

Veel succes met je project in Home Assistant!
