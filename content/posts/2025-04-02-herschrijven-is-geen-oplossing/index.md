---
title: "Herschrijven is geen oplossing, het is een laatste redmiddel"
description: "Een pleidooi tegen de reflex om legacy software te herschrijven, met focus op kleine verbeteringen, samenwerking en het bewust omgaan met technische schuld."
summary: "Zodra iets ‘legacy’ genoemd wordt, duikt het woord rewrite op. Alsof opnieuw beginnen altijd de redding is. In de praktijk levert het vaak nieuwe problemen op. Kleine, doordachte stappen blijken verrassend vaak de betere weg."
author: "Maarten"
date: 2025-04-02
lastmod: 2025-04-02
slug: "202504-herschrijven-is-geen-oplossing"
draft: false
tags: [java, clean-code]
cover:
  image: "cover.webp"
  alt: "Illustratie van een rommelige tuin die geleidelijk verandert in een verzorgde tuin als metafoor voor het stapsgewijs verbeteren van legacy software"
  title: "Van herschrijven naar verzorgen"
  caption: "Legacy software verbetert niet door alles om te gooien, maar door gerichte en doordachte stappen."
images: ["cover.webp"]
---
**Intro**

*“Dat is legacy, daar kunnen we niets meer mee.”*  
Een zin die we allemaal al gehoord hebben. Of misschien zelfs zelf uitgesproken. Wat volgt is meestal een voorstel om alles te herschrijven of een grote refactor op te starten. Maar is dat wel de juiste reflex?

In deze blog deel ik mijn ervaring met legacy projecten. Niet om met de vinger te wijzen, wel om te tonen dat er andere, effectievere manieren zijn om vooruit te raken. Kleine stappen, duidelijke keuzes, en samenwerken als team – daar ligt voor mij de echte waarde.

**Legacy. En nu?**

Hoe vaak hoor je het niet: *“Dat is een legacy systeem, daar kunnen we niets meer mee doen.”* En dus starten we een grote refactor. Of erger nog: we beginnen helemaal opnieuw. En zo creëren we… opnieuw een applicatie die onderhouden moet worden.

Doorheen de jaren heb ik aan veel applicaties mogen meewerken. En ja, het is niet altijd even leuk om een project tegen te komen dat oud en onbetrouwbaar aanvoelt. Maar is dat voldoende reden om het zomaar af te schrijven? Of om alles op pauze te zetten en te starten met een big bang refactor?

Deze post is mijn visie daarop. Wat ik onderweg tegenkwam. Wat wél werkt. En wat niet.

**Van JBoss tot OpenShift**

Als developer bij Ordina / Sopra Steria ben ik in contact gekomen met heel wat verschillende klanten en sectoren. De ene werkte nog met een JBoss-server en EAR- of WAR-files, de andere had alles gecontaineriseerd met Docker Compose. En weer een andere draaide in een OpenShift-omgeving.

Ik heb dus al wat watertjes doorzwommen. En bij elke klant was er ook weer een andere *way of working*. Vaak hoor je dan: *“Daar kunnen we niets aan veranderen.”* Maar eerlijk? Dat is zelden waar.

Je kan veel bereiken door samen te praten. Door te pitchen waarom iets beter kan. Soms lukt het, soms niet, maar wat je niet probeert, is sowieso verloren moeite. En oké, een EJB naar Spring migreren is geen kleine stap. Maar alles begint klein.

**Herschrijven? Alleen als het écht moet.**

Een van de laatste projecten waar ik bij betrokken was, stond onder druk. “We moeten het opnieuw schrijven,” klonk het. Velen waren die mening toegedaan. Maar ik bleef dat ten stelligste afraden. Als het uiteindelijk toch moest gebeuren? Dan stonden we klaar. We hadden blokken uitgetekend, nagedacht over de architectuur en de pijnpunten van de oude applicatie.

Tot het moment kwam waarop je de business moet overtuigen. En dan sta je daar met een ei.

Wat bleek? Door in te zetten op kleine, impactvolle veranderingen kwamen we veel verder. Sneller. Zonder maanden voorbereiding of onzekerheid. Soms leveren net die kleine stappen het meeste op.

**Ook petprojecten verdienen zorg**

Binnen het team werken we ook aan enkele petprojecten die al jaren meegaan. En ook daar duikt het idee soms op: *“Zouden we niet beter een rewrite doen?”*

Maar waarom eigenlijk?

Door terug naar de kern te gaan – wat gebruiken we nog, wat niet – hebben we het project weer op de rails gekregen. We zijn gestart met domeinen te introduceren. En in plaats van meteen over te stappen op Maven modules (een brug te ver), zetten we nu stappen met Spring Modulith.

Kleine, hapbare en verklaarbare veranderingen. Maar ze duwen ons wel in de juiste richting.

**Waarom het me raakt**

Het raakt me telkens als ik hoor: *“Ze hadden dat beter zo gedaan.”* Want vaak kunnen we niet eens uitleggen waarom iets zo is beslist. Daarom geloof ik sterk in het documenteren van beslissingen. Of dat nu via een ADR is of gewoon in een kort document: het helpt ons vooruit.

Het biedt context. Begrip. En het zorgt ervoor dat we als team – met oude rotten én nieuwe collega’s – niet blijven hangen in frustratie, maar samen naar een betere applicatie bouwen.

**Legacy is vaak ons eigen schuld**

Legacy ontstaat omdat we onze code niet onderhouden. Dependencies blijven liggen. Code blijft stinken, ook al benoemen tools ze. We doen code reviews op basis van het aantal gewijzigde bestanden in plaats van op de impact van de verandering.

We moeten kritischer zijn voor onszelf.

“Het werkt, dus laat het liggen” – is dat echt de juiste houding?

**Boy Scout Rule**

Laat ons starten met kleine stappen. Als je code aanraakt, maak ze dan een beetje beter dan hoe je ze vond. Dat is de *boy scout rule*. En weet je het niet goed? Stel een vraag.

Vraag het aan je collega. Tijdens een pairing sessie. Of gewoon door samen in een call te zitten. Je hoeft niet alles te pairen, maar samenwerken helpt altijd.

En ja, we zijn misschien introvert. Maar onder collega’s kan je alles vragen. Echt waar.