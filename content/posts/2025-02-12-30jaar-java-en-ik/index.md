---
title: "30 Jaar Java en Ik: Een Langdurige Relatie Zonder Breaking Changes"
description: "Een persoonlijke terugblik op dertig jaar Java, van de eerste stappen met generics tot moderne innovaties, en waarom de taal dankzij stabiliteit en evolutie relevant blijft."
author: "Maarten"
date: 2025-02-12
lastmod: 2025-02-12
slug: "202502-30jaar-java-en-ik"
draft: false
tags: [java, clean-code]
cover:
  image: "cover.webp"
  alt: "Illustratie van een koffiekop met het Java-logo, omringd door symbolen die de evolutie van de programmeertaal voorstellen"
  title: "30 jaar Java, stabiliteit in evolutie"
  caption: "Java als vertrouwde metgezel, meegroeiend zonder zijn verleden te breken."
images: ["cover.webp"]
---
Met het naderende 30-jarige jubileum van Java leek het me een mooi moment om terug te kijken op wat ik allemaal met deze taal heb gedaan. Mijn eerste stappen zette ik op de hogeschool, waar meneer Possemiers me de kneepjes van het vak leerde.

Ik begon met Java 1.6 en Java 1.7, nadat ik al ervaring had met PHP en VB.Net. Hoewel er gelijkenissen zijn, werken ze toch fundamenteel anders. Java is sterk getypeerd en gecompileerd, terwijl PHP een geïnterpreteerde en zwak getypeerde taal is. Waar PHP ooit als eenvoudige scripttaal voor het web begon en later objectgeoriënteerde concepten toevoegde, is Java van meet af aan objectgeoriënteerd opgebouwd. Ook qua backward compatibility verschillen ze sterk. Java zorgt ervoor dat oudere code blijft werken, terwijl PHP regelmatig breaking changes doorvoert. Een voorbeeld daarvan zag je in PHP 8, waar het typegedrag van bepaalde variabelen strikter werd, waardoor code die in PHP 5 nog prima werkte plots een ander resultaat gaf.

Tijdens mijn stage en eerste projecten werkte ik met Java 1.5, de release die vooral bekendstaat om de introductie van Generics en de diamond operator. Dit verbeterde de typeveiligheid en maakte het programmeren een stuk eleganter. Voordien moest je bijvoorbeeld een `List` vullen met objecten en bij elk gebruik expliciet casten. Dankzij Generics werd het mogelijk om `List<String> names = new ArrayList<>();` te schrijven en meteen de juiste types te krijgen, zonder onnodige conversies.

Java begon ooit onder de vleugels van Sun Microsystems, waarna Oracle het overnam. Ondertussen is het Java-landschap enorm gegroeid, en zijn er talloze distributies beschikbaar. Naast de Oracle JDK en OpenJDK heb je onder andere Amazon Corretto, Adoptium, Liberica, GraalVM en Zulu. Lange tijd gebruikte ik vooral de Oracle JDK en OpenJDK, maar tegenwoordig volg ik vooral de aanbevelingen van JetBrains. Toch betrap ik mezelf erop dat ik vaak naar GraalVM kijk, vooral door de ontwikkelingen rond native images.

Met de opkomst van AI en de groeiende focus op efficiëntie merk ik dat we steeds meer tijd besteden aan optimalisaties. Java speelt daar sterk op in, zonder zomaar backward compatibility te breken. Dat blijft iets wat ik bewonder. Waar PHP regelmatig functies verwijdert of gedrag wijzigt, zorgt Java ervoor dat code van twintig jaar geleden vandaag nog steeds werkt.

De laatste jaren heeft Java enorme sprongen gemaakt. Eén van de recente verbeteringen die ik bijzonder waardeer, is pattern matching binnen `switch`, geïntroduceerd in JEP 441 als onderdeel van Project Amber. Dit maakt code veel leesbaarder en veiliger. Waar we vroeger expliciet `instanceof` moesten checken en casten, kunnen we nu direct een `switch` gebruiken om een objecttype te herkennen en ermee aan de slag te gaan. Dit soort innovaties maakt Java vandaag nog steeds relevant, zelfs na dertig jaar.

Vroeger gebruikte ik Java vooral professioneel, maar vandaag is het mijn standaardtaal voor vrijwel alles. Uitzonderingen zijn deze blog—waar ik bewust voor iets anders koos—en mijn Home Assistant-integraties, waarvoor ik Python gebruik. Buiten die twee is Java altijd mijn eerste keuze.

Ik heb enorm veel respect voor de mensen die blijven bijdragen aan deze prachtige taal. Dankzij hen kunnen we vandaag nog steeds soepel werken met code die jaren geleden is geschreven. Door zelf meer te schrijven en de JEPs in de gaten te houden, hoop ik mijn steentje bij te dragen. Dat ik dit in het Nederlands doe, mag geen barrière zijn. Met de vertalingen en documentatie van vandaag is kennisdeling toegankelijker dan ooit.

Op naar de volgende 30 jaar Java! 🎉