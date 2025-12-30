---
title: "Check-ins die blijven plakken: Obsidian met Templater + Tasks"
description: "Een praktische en persoonlijke kijk op hoe Obsidian, met Templater en Tasks, check-ins opnieuw ritme geeft door frictie weg te nemen en opvolging zichtbaar te maken in het dagelijkse werk."
summary: "Mijn check-ins verwaterden niet door gebrek aan intentie, maar door kleine fricties. Te veel keuzes, te weinig ritme. Met een paar gerichte automatisaties werd opvolging weer vanzelfsprekend en kreeg het systeem opnieuw ademruimte."
author: "Maarten"
date: 2025-10-05
lastmod: 2025-10-09
slug: "202510-check-ins-die-blijven-plakken"
draft: false
tags: [obsidian]
cover:
  image: "cover.webp"
  alt: "Abstracte illustratie van digitale check-ins met gesprekken, taken en planning in een rustige paarse interface"
  title: "Check-ins zonder frictie in Obsidian"
  caption: "Met slimme automatisatie worden check-ins geen last, maar een vast en vol te houden ritme."
images: ["cover.webp"]
---
Eerlijk is eerlijk: ik ben Obsidian nooit kwijtgeraakt. Ik bleef het elke dag gebruiken. Wat wél verwaterde, waren mijn **check-ins**: die korte, regelmatige 1-op-1-momenten met een heldere opvolging. De notities kwamen er nog wel, maar het **ritme** zakte weg. En zonder ritme wordt zelfs een goed systeem een verzameling losse flodders.

## Wat er misging (en misschien herken jij dit ook)

- **Keuzestress bij het starten**: elke nieuwe **1-op-1** vroeg om handmatig de juiste persoon te zoeken.
- **Te grote overzichtspagina’s**: mijn MOC groeide mee met mijn afspraken; scrol-moeheid gegarandeerd.
- **Statische templates**: netjes, maar niet slim genoeg—ik bleef dezelfde velden invullen.
- **Check-ins zonder cadence**: de opvolging verhuisde naar “later”, en later is zelden vandaag.

Kleine frictie × veel herhaling = grote drempel. En drempels killen routines.

## De reset

Ik koos voor **snel vastleggen, slim structureren, nul frictie**. Geen grote reorganisatie, wel gerichte ingrepen:

1. **Templater** voor échte automatisering.
2. **Tasks** voor opvolging, en die **zie ik waar ik dagelijks leef: in mijn Daily note**.
3. **DataviewJS** voor **paginering** op mijn MOC, zodat lijsten hapbaar blijven.

## De truc: kies alleen uit mijn teamleden

De grootste winst was verrassend klein: bij het aanmaken van een **1-op-1** laat ik **alleen mijn teamleden** (lees: de collega’s met wie ik regelmatig 1-op-1 doe) zien in de keuze. Die lijst staat in de frontmatter van mijn eigen People-note; Templater leest die property uit en toont precies de juiste namen. Geen gezoek, geen foutje.

In mensentaal: _ik open een nieuwe **1-op-1** → kies één naam uit mijn team → bestandsnaam, datum en inhoud staan klaar → acties krijgen meteen een due-date en het `#check-in`-label_. Klaar om te praten, niet om te prutsen.

> Bonus: de note heet automatisch `YYYY-MM-DD – 1-op-1 – [Naam]`. Consequentie zonder nadenken.

## Taken die niet wegslippen (op mijn Daily note)

Mijn **Daily note** is mijn werkdag-dashboard; dáár wil ik mijn open acties zien en daar stonden ze eigenlijk al. Door **check-in-acties** consequent als Tasks te noteren (met `#check-in` en een due-date), rollen ze automatisch mee mijn Daily note in. Resultaat: check-ins krijgen weer **cadence** omdat de opvolging verschijnt waar ik elke dag kijk.

_(Ik heb dus géén extra actiesectie op mijn Meetings MOC gezet, die houd ik bewust luchtig.)_

## Overzicht zonder overlast: **paginering** op de MOC

Mijn Meetings MOC heeft twee tabellen met **paginering**:

- **Meeting notes** (alles behalve 1-op-1)
- **1-op-1-notities** (de gesprekken met teamleden)

Met DataviewJS blader ik door pagina’s van 10–15 items. De pagina blijft licht, ik verlies de context niet, en ik kijk gericht terug zonder eindeloos scrollen.

## Waarom ik Obsidian wél weer met plezier gebruik

Omdat het me nu geen energie **kost**, maar **geeft**. Mijn setup maakt de volgende stap altijd de makkelijkste stap:

- Nieuwe **1-op-1**? Eén druk, één keuze, schrijven maar.
- **Check-ins**? Taken duiken vanzelf op in mijn Daily note.
- Terugbladeren? Overzicht in hapklare pagina’s dankzij **paginering**.

Het verschil tussen “ik zou dit moeten bijhouden” en “ik **wil** dit bijhouden” zit in **lat omlaag, ritme omhoog**.

## Herkenbaar?

- Je start vol goesting, maar je systeem wordt langzaam zwaarder dan je werk.
- Je vertrouwt op geheugen, terwijl je eigenlijk tooling nodig hebt die _jou_ draagt.
- Je merkt: zonder vaste **check-ins** verdampt impact.

Het hoeft niet perfect. Het hoeft alleen **frictieloos genoeg** te zijn om het vol te houden.

## Wat jij hieraan hebt (ook als jouw setup anders is)

- **Automatiseer het begin**: maak de eerste 10 seconden van een note idiot-proof (titel, datum, persoon).
- **Beperk de keuze**: filter je dropdown op wat nú relevant is (bv. je **teamleden**).
- **Hou lijsten klein**: gebruik **paginering** of toon alleen “deze week”, “te laat”, “zonder due-date”.
- **Laat taken landen waar je kijkt**: label check-in-acties en laat je Daily note het werk doen.

## Slot

Ik ben niet terug naar Obsidian voor de features. Ik ben terug voor de **rust** van een systeem dat me in beweging zet. Kleine automatisaties, grote opluchting. En eerlijk: het voelt goed om na een **1-op-1** een note te sluiten en te weten dat niets wegglipt. Dat is waarom ik gebleven ben.
