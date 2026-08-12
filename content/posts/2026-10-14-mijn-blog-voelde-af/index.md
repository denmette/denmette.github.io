---
title: "Mijn blog voelde af, tot ik er op toegankelijkheid naar keek"
description: "Mijn blog leek technisch in orde, tot een gerichte accessibility-pass een reeks kleine maar echte problemen blootlegde, van broken ARIA en verspringende headings tot cookie-focus en dark-mode-details."
summary: "Mijn blog voelde eerlijk gezegd al af. Tot ik er gericht op toegankelijkheid naar keek. Niet alles wat ik vond was ernstig, maar er kwamen wel genoeg concrete problemen uit om mijn templates, afbeeldingen en checklist voor nieuwe posts scherper te maken."
author: "Maarten"
date: 2026-10-14
lastmod: 2026-10-14
slug: "202610-mijn-blog-voelde-af-tot-ik-er-op-toegankelijkheid-naar-keek"
draft: false
tags: [webontwikkeling, reflectie, hugo]
cover:
  image: "cover.webp"
  alt: "Illustratie van een blogscherm met toegankelijkheidsmarkeringen en controle-iconen"
  title: "Toegankelijkheid wordt pas echt wanneer je kijkt"
  caption: "Een kleine accessibility-audit bleek geen formaliteit, maar een manier om scherper te zien waar mijn blog nog frictie had."
images: ["cover.webp"]
---

Vanop afstand leek alles op zijn plaats te zitten.

Ik had aandacht besteed aan semantische HTML, een skip link, dark mode, duidelijke focus states en gestructureerde metadata. Niet perfect, maar wel goed genoeg om te denken dat de grootste fouten er ongeveer uit waren.

Tot ik er gerichter naar begon te kijken.

Eerst met WAVE, daarna ook gewoon door echte pagina's na te lopen en een paar dingen samen met AI uit te pluizen. Dat leverde geen rampenrapport op. Maar wel genoeg kleine en middelgrote signalen waar ik anders makkelijk overheen had gekeken.

Niet alles bleek een echte fout. Sommige meldingen waren vooral een waarschuwing of een kwestie van nuance. Andere dingen zaten dan weer niet in die scan, maar kwamen pas boven toen we keken naar focusgedrag, heading-structuur en embeds. Net dat onderscheid bleef voor mij het meest hangen.

{{< note title="WAVE, kort uitgelegd" >}}
[WAVE](https://wave.webaim.org/) is een gratis accessibility-evaluatietool van WebAIM die visueel toont waar op een pagina mogelijke toegankelijkheidsproblemen zitten. Het vervangt geen handmatige test, maar is wel heel bruikbaar om snelle fouten, ARIA-problemen en twijfelgevallen zichtbaar te maken.
{{< /note >}}

{{< figure
  src="images/wave-overview-post.png"
  alt="WAVE-overlay op een blogpost met één error en twee alerts"
  title="Eerste scan"
  caption="De eerste scan gaf geen lange lijst aan fouten, maar wel genoeg signalen om de pagina gerichter te bekijken."
>}}

## Je merkt pas iets als je echt begint te kijken

Het punt van zo'n audit is voor mij niet dat een tool het oordeel in jouw plaats velt. Het helpt vooral om preciezer te kijken.

Zo'n melding betekent niet automatisch dat je site slecht is. Maar het is wel een aanleiding om te checken of een element echt doet wat je denkt dat het doet.

Dat gebeurde hier ook. Een paar dingen bleken in orde. Andere bleken op papier goed bedoeld, maar technisch toch net niet correct. En nog andere problemen kwamen pas naar boven toen ik samen met AI door de templates en interacties ging.

Dat werkte voor mij vooral omdat het over echte pagina's ging, niet over een abstracte checklist. Een blog is geen component library in isolatie. Het is een verzameling templates, markdown, afbeeldingen, externe embeds en kleine uitzonderingen die samen één geheel vormen.

En net daar kruipen de fouten binnen.

## De eerste fout was bijna gênant klein

Ze zat in mijn post-template.

Mijn post-template gebruikte op het `<article>`-element een `aria-labelledby` dat naar `post-title` wees. Alleen: die `id` stond niet op de `h1`.

Dat is geen spectaculaire bug. Je merkt dat niet visueel. De pagina werkt nog steeds. Maar voor mensen die de site met assistieve technologie gebruiken, zoals een screenreader, is het wel relevant, want de relatie tussen de artikelcontainer en de titel klopt dan gewoon niet.

Dat is ook waar zo'n scan helpt. Niet omdat ze alles oplost, maar omdat ze kleine breuken zichtbaar maakt die je op gevoel niet altijd ziet.

{{< figure
  src="images/wave-broken-aria.png"
  alt="WAVE-paneel met een broken ARIA reference melding"
  title="De enige echte fout"
  caption="De melding zelf was generiek, maar bleek te verwijzen naar een ontbrekende koppeling tussen het artikel en de posttitel."
>}}

## Niet elk signaal vraagt dezelfde reactie

Een tweede les was dat je alerts niet allemaal op dezelfde hoop mag gooien.

Ik kreeg bijvoorbeeld meldingen over te lange alt-teksten en redundante links. Dat vraagt een ander soort reactie dan een echte broken ARIA reference.

Bij die alt-teksten merkte ik dat ik te veel uitleg in de alt zelf was beginnen stoppen. Niet alleen wat er op de afbeelding stond, maar ook wat die afbeelding symboliseerde of waarom ik ze gekozen had. Dat leest op papier misschien rijker, maar voor screenreaders is het meestal net minder helder.

De oplossing was eigenlijk eenvoudig:

- de alt-tekst beschrijft wat zichtbaar is
- de caption draagt de interpretatie of extra context

Sindsdien probeer ik dat veel strikter uit elkaar te houden.

De redundante link was nog een ander geval. Op mijn homepagina wijzen zowel mijn logo als de link "Start" naar dezelfde plek.

Dat is technisch gezien iets wat een tool mag signaleren, maar voor mij was het geen reden om het meteen weg te halen. Die twee links hebben namelijk niet exact dezelfde rol in de interface. Het logo werkt als herkenbaar anker linksboven, terwijl "Start" deel uitmaakt van de gewone navigatie. Voor iemand die scant, zijn dat twee verschillende verwachtingen, ook al kom je op dezelfde pagina uit.

Belangrijker: die dubbele bestemming maakt de pagina niet verwarrend, breekt geen keyboardflow en neemt geen cruciale context weg. Dan is de juiste reactie voor mij niet automatisch "wegoptimaliseren", maar eerder bewust beslissen dat de interface hier nog altijd helder genoeg blijft.

{{< figure
  src="images/wave-post-neighbors-comments.png"
  alt="WAVE-overlay op de zone met postnavigatie en reacties onderaan een blogpost"
  title="Waar waarschuwingen nuance vragen"
  caption="In dezelfde zone zag ik tegelijk een echte ARIA-fout en een paar signalen die eerder om interpretatie vroegen dan om een directe fix."
>}}

In dezelfde ronde zat trouwens nog een tweede punt dat niet rechtstreeks uit de scan kwam, maar wel uit hetzelfde nakijken van de echte pagina: de focusflow van mijn cookiebanner en voorkeurendialoog. Daar bleek het mogelijk dat focus op een verborgen of niet bruikbaar element terechtkwam zodra de banner verdween of de modal sloot.

Dat maakte vooral duidelijk dat een accessibility-tool helpt zoeken, maar niet alles zal vinden. Sommige fouten merk je pas wanneer je echt kijkt naar hoe een interface zich gedraagt terwijl iemand erdoor navigeert.

## Headings zijn ook structuur, niet alleen opmaak

Nog zo'n punt dat niet spectaculair oogt, maar wel relevant is: een paar blogposts sprongen van een `h1` meteen naar `h3` of `h4`.

Visueel lijkt dat vaak geen ramp. De tekst staat er nog, de pagina blijft leesbaar, en als auteur denk je snel dat het alleen over typografie gaat. Maar voor screenreaders en voor de structuur van een document is dat toch slordig. Zo'n pagina heeft dan wel koppen, maar geen logische opbouw.

Dat hebben we dus ook rechtgetrokken. Niet omdat een tool zegt dat elke pagina perfect hiërarchisch moet aanvoelen, maar omdat koppen meer doen dan tekst groter zetten. Ze bepalen ook hoe een pagina gelezen en geïnterpreteerd wordt.

## Mijn dark mode was blijkbaar nog niet af

Een ander punt zat in de comments.

De site zelf schakelde correct tussen light en dark mode, maar de `utterances`-embed bleef soms licht terwijl de rest van de pagina al donker was. Dat is geen klassiek contrastprobleem in je eigen CSS, maar het voelt voor gebruikers wél alsof er iets niet af is.

Dat maakte voor mij nog eens duidelijk dat toegankelijkheid niet stopt aan je eigen markup. Zodra je externe stukken embedt, moet je ook daar kijken of ze logisch mee evolueren met de rest van de pagina.

In theorie werkte het thema al. In de praktijk bleek de synchronisatie tussen de DOM-state en de iframe niet betrouwbaar genoeg. Ook dat was zo'n fout die je pas echt opmerkt zodra je de pagina als geheel bekijkt.

## Wat ik nu standaard anders aanpak

De grootste winst van deze oefening zit voor mij niet in de losse fixes, maar in de regels die eruit zijn gekomen.

Voor nieuwe blogposts hanteer ik nu een kleine, praktische checklist:

- cover-alt blijft kort en letterlijk
- captions mogen de betekenis of nuance dragen
- heading-niveaus mogen niet springen
- icon-only knoppen moeten een duidelijke naam hebben
- focus moet altijd op een bruikbare plek terugkomen na banners of modals
- light en dark mode moeten ook bij embeds of comments logisch blijven werken

Dat is geen groot accessibility-programma. Gewoon een paar heldere afspraken die ervoor zorgen dat nieuwe content minder snel dezelfde fouten herhaalt.

## Waarom dit toch de moeite was

Ik ben niet uit deze oefening gekomen met het gevoel dat [casteels.dev](https://casteels.dev) plots "volledig toegankelijk" is. Zo werkt het niet. Toegankelijkheid is geen badge die je één keer haalt en daarna afvinkt.

Maar ik ben er wel uitgekomen met iets bruikbaarders: minder aannames.

Ik weet nu beter welke fouten in mijn blog realistisch zijn. Ik weet ook beter welke meldingen een echte correctie vragen, en welke vooral uitnodigen tot een bewuste afweging.

Misschien is dat voor mij de belangrijkste opbrengst van zo'n audit. Niet dat je site perfect wordt, maar dat je scherper leert kijken.

En dat is uiteindelijk ook gewoon goed vakwerk.
