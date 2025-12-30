---
title: "TDD in 2025: Waarom het nog steeds relevant is."
description: "Een persoonlijke en hedendaagse kijk op Test Driven Development, met aandacht voor praktische valkuilen, moderne teststrategieën en waarom TDD ook in 2025 zijn waarde behoudt."
author: "Maarten"
date: 2025-02-10
lastmod: 2025-02-10
slug: "202502-tdd-waarom-is-het-nog-relevant"
draft: false
tags: [java, clean-code]
cover:
  image: "cover.webp"
  alt: "Visualisatie van een moderne teststrategie met lagen voor unit-, integratie- en end-to-end tests"
  title: "TDD in 2025"
  caption: "Van testpiramide naar testtrofee, een evolutie in hoe we testen benaderen."
images: ["cover.webp"]
---

Test Driven Development, ofwel TDD, is al talloze keren besproken in boeken, blogposts, video's, artikelen en interviews. Waarom schrijf ik er dan nog eens over? Simpel: het is mijn passie.

TDD is een ontwikkelmethodologie waarbij je een test schrijft voordat er ook maar één regel functionele code wordt geschreven. De eerste test zal altijd falen, omdat de implementatie nog ontbreekt. Vervolgens schrijf je net genoeg code om de test te laten slagen. Zodra de test werkt, kun je de code refactoren om deze te verbeteren zonder functionaliteit te breken.

Ik ga er vanuit dat je bekend bent met TDD, maar ik wil graag laten zien hoe deze aanpak nog steeds relevant en toepasbaar is in 2025. Daarnaast wil ik ingaan op de valkuilen waar ik zelf tegenaan loop en hoe een moderne teststrategie kan helpen om deze te overwinnen.

## Waarom pas ik het niet altijd toe?

Ondanks mijn enthousiasme voor TDD, betrap ik mezelf er soms op dat ik het niet consequent toepas. Wanneer dat gebeurt, probeer ik te achterhalen waarom. Meestal ligt de oorzaak in een van de volgende twee redenen.

### 1. Gewoon vergeten

Als Tech Lead en Architect voor Java ben ik vaak aan het multitasken. Mijn dagen bestaan uit talloze context-switches: van het ene project naar het andere, gesprekken met collega's, last-minute overlegmomenten met analisten. In die chaos gebeurt het weleens dat ik volledig opga in de business code en vergeet mijn test te schrijven. Je zou denken dat ik ondertussen wel geleerd heb uit mijn fouten, maar dat is niet altijd het geval. Is dat erg? Voor mij persoonlijk wel, maar zoals ik vaak tegen collega's zeg: TDD is een manier van werken, geen religie.

### 2. De codebase is te complex

Soms lijkt een codebase zo complex dat het haast onmogelijk is om tests te schrijven. Maar dat mag nooit een excuus zijn. Een testbare codebase is een teken van een goed gestructureerd systeem. Wanneer testen moeilijk worden, is dat vaak een symptoom van een onderliggende ontwerpuitdaging. In plaats van TDD dan maar te laten vallen, is het vaak zinvoller om de code zodanig te vereenvoudigen dat testbaarheid vanzelf volgt.

## Van de testpiramide naar de testtrofee

Een van de meest gebruikte modellen binnen softwaretesten is de testpiramide. Dit model stelt dat de meeste tests unit tests zijn, gevolgd door integratietests en een klein aantal end-to-end tests. Deze structuur helpt om testefficiëntie te optimaliseren en testcycli kort te houden.

In moderne softwareontwikkeling merk ik echter dat de testpiramide steeds vaker evolueert naar een testtrofee. Waar de piramide een statische hiërarchie suggereert, symboliseert de trofee een flexibele aanpak waarin tests dynamisch worden ingezet op basis van noodzaak en toegevoegde waarde. Het gaat niet langer puur om aantallen, maar om de juiste balans en effectieve teststrategiën.

De basis van de trofee is de statische laag, zoals de compiler en de IDE, die al vroeg mogelijke fouten kan detecteren. Moderne ontwikkelomgevingen geven suggesties om code te verbeteren en helpen problemen sneller te identificeren. Daarbovenop hebben we unit-tests, die specifiek gericht zijn op technische implementaties en helpen om de werking van individuele componenten te verifiëren.

Daarna komen integratietests, die twee vormen kunnen aannemen:
1. Tests die een echte afhankelijkheid zoals een database of een externe API gebruiken.
2. Tests waarbij afhankelijkheden worden gesimuleerd, bijvoorbeeld met tools als Mockito.

Tot slot hebben we de end-to-end tests. Hoewel ze tijdrovend kunnen zijn, blijven ze essentieel voor het valideren van de volledige gebruikersflow. De sleutel tot een goede teststrategie ligt niet in rigide structuren, maar in een pragmatische afweging van testtypen en hun toegevoegde waarde.

## Welke tests zijn belangrijk?

De vraag welke tests we moeten schrijven, heeft geen eenduidig antwoord. Wat wel vaststaat, is dat testen essentieel zijn. De vorm en het aantal tests bepalen we als team. Net zoals code coverage een gezamenlijke verantwoordelijkheid is, tenzij het bedrijf er specifieke eisen aan stelt.

Een vuistregel die ik hanteer: niet alles hoeft een end-to-end (E2E) test te zijn. Die nemen veel tijd en resources in beslag. Dat betekent echter niet dat we ze helemaal moeten vermijden. Moeten we dan alleen unit tests schrijven? Niet per se. Moderne hardware is krachtig genoeg om een echte database op te draaien en integratietests uit te voeren. Externe API’s kunnen we simuleren met relevante testdata. Security? Die kunnen we misschien niet volledig afdekken met tests, maar er zijn genoeg tools om een groot deel van het werk te automatiseren.

## Testcontainers en de moderne testaanpak

Een van de tools die ik tegenwoordig niet meer wil missen is Testcontainers. Toch verbaast het me hoeveel collega's hier nog niet mee bekend zijn. Testcontainers integreert perfect in de meeste softwareprojecten en maakt het mogelijk om betrouwbare integratietests te schrijven met realistische afhankelijkheden.

Met de huidige CI/CD-oplossingen is containerondersteuning standaard. Mocht je pipeline nog geen containers ondersteunen, dan is het tijd om die te herzien. Containers maken het eenvoudiger om robuuste tests op te zetten zonder afhankelijk te zijn van lokale installaties. Testcontainers biedt kant-en-klare oplossingen voor databases, message brokers en andere infrastructuurcomponenten die in softwaretests gebruikt worden.

Er zijn ondertussen al heel wat voorbeelden van Testcontainers op het internet, dus ik ga hier geen extra voorbeeld toevoegen. Tegen de tijd dat dit gepubliceerd is, is het alweer achterhaald. Ik raad aan om de website van Testcontainers te bezoeken of te kijken naar de documentatie van je favoriete frameworks.

## Fouten maken mag, zolang we eruit leren

Als ontwikkelaars denken we vaak dat we onze code volledig begrijpen. Maar we hebben ons allemaal wel eens vergist en onbedoeld bugs geïntroduceerd. Dat is geen probleem, zolang we bereid zijn om uit onze fouten te leren en onze assumpties kritisch te bekijken. TDD helpt ons hierbij.

Het is geen rigide proces, maar een hulpmiddel om onze softwareontwikkeling naar een hoger niveau te tillen. En als we het een keer vergeten? Dan pakken we het de volgende keer gewoon weer op. Laten we blijven leren en verbeteren.

