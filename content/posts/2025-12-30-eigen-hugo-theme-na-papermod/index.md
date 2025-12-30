---
title: "Waarom ik PaperMod losliet en mijn eigen Hugo theme bouwde"
description: "Waarom een bestaand Hugo theme niet meer volstond en hoe het bouwen van een eigen theme zorgde voor rust, controle en bewuste keuzes."
author: "Maarten"
date: 2025-12-30
lastmod: 2025-12-30
slug: "202512-eigen-hugo-theme-na-papermod"
draft: false
tags: [hugo, refelctie]
cover:
  image: "cover.webp"
  alt: "Minimalistische werkplek met een laptop waarop een zelfgebouwd blog en Hugo templates zichtbaar zijn, als symbool voor controle, rust en bewust bouwen"
  title: "Eigenaarschap boven gemak"
  caption: "Terugkijkend op 2025, waarin het loslaten van een bestaand theme plaatsmaakte voor bewuste keuzes, technische rust en bouwen vanuit begrip."
images: ["cover.webp"]
---

Soms werkt een bestaand theme perfect. Tot het dat niet meer doet. Voor mij was dat het kantelpunt om afscheid te nemen van PaperMod en mijn blog opnieuw op te bouwen met een volledig eigen Hugo theme. Niet omdat PaperMod tekortschoot, maar omdat mijn verwachtingen veranderden.

Wat begon als een paar kleine aanpassingen, groeide uit tot een fundamentele heropbouw. Achteraf bekeken was dat geen rationele beslissing, maar een gevoel dat bleef terugkomen. Ik was meer bezig met het omzeilen van het theme dan met het bouwen van mijn site.

## Wanneer een theme begint tegen te werken

PaperMod is volwassen, rijk aan features en goed doordacht. Voor veel mensen is het een uitstekende keuze. Na verloop van tijd botste ik echter op grenzen die niet technisch waren, maar conceptueel.

Ik wilde meer controle over de HTML-structuur, subtielere aanpassingen aan typografie en lay-out, en explicietere keuzes rond SEO en toegankelijkheid. Telkens opnieuw voelde het alsof ik eerst moest begrijpen hoe het theme dacht, vóór ik iets kleins kon wijzigen. Dat begon te wringen.

Op een bepaald moment werd het duidelijk. Zolang ik bleef verder bouwen op PaperMod, zou elke verbetering meer energie kosten dan nodig. Dat was het signaal om terug naar de basis te gaan.

## Terug naar een lege pagina

De overstap naar een eigen theme begon radicaal. Alles eruit. Geen overgeërfde layouts, geen verborgen logica, geen magie. Enkel Hugo, een leeg theme en een duidelijke intentie.

Ik vertrok vanuit enkele principes die richting gaven aan elke beslissing. Mobile first was geen slogan, maar een harde randvoorwaarde. TailwindCSS werd de basis voor styling, niet omdat het trendy is, maar omdat het expliciet maakt wat anders impliciet blijft. Elke template, partial en layout moest begrijpelijk zijn zonder handleiding.

Die keuze bracht rust, maar ook verantwoordelijkheid. Plots was er niets meer om achter te schuilen.

## Typografie en markdown zijn geen detail

Een van de eerste verrassingen kwam bij het renderen van markdown. Zonder bewuste keuzes ziet content er vlak uit. Te veel ruimte, te grote koppen en geen duidelijke hiërarchie. Dat werd snel duidelijk toen ik TailwindCSS combineerde met markdown-content.

De oplossing zat niet in één class of plugin, maar in het scheiden van verantwoordelijkheden. De H1 in de template bleef leidend en definieerde de pagina. Markdown-koppen moesten daar visueel onder blijven, zonder de semantiek te breken. Met behulp van de typography-plugin en gerichte overrides kreeg de content opnieuw rust en leesbaarheid.

Het was een kleine ingreep, maar met een grote impact.

## Accessibility als constante toets

Toegankelijkheid werd geen aparte fase achteraf, maar een constante vraag tijdens het bouwen. Klopt de heading-structuur nog? Is dit element bereikbaar met het toetsenbord? Is het verschil tussen light en dark mode ook effectief leesbaar?

Niet alles moest perfect zijn, maar niets mocht toevallig aanvoelen. Kleine keuzes, zoals focus states of duidelijke aria-labels, maakten het verschil tussen iets dat werkt en iets dat correct werkt.

Die bewustwording liep door het hele project heen.

## SEO als polish, niet als startpunt

SEO kwam pas echt aan bod toen de structuur stabiel was. Niet als checklist, maar als een reeks verfijningen. Titelstructuren werden consistenter, meta descriptions kregen aandacht en social sharing werd explicieter uitgewerkt.

Ook zaken die vaak vergeten worden, zoals favicons, sitemaps en canonical URLs, kregen hun plaats. Het waren geen spectaculaire wijzigingen, maar samen zorgden ze voor een site die serieuzer aanvoelt, zowel voor bezoekers als voor machines.

## Samenwerken met AI als gesprek

Wat dit traject fundamenteel anders maakte dan eerdere herwerkingen, was de rol van AI. Niet als knop die code genereert, maar als een voortdurende gesprekspartner.

Bijna alles ontstond uit conversaties. Soms lange uitwisselingen over iets banaals, zoals de plaats van tags of share buttons. Hoort dit bij de header van een post, of bij de footer? Waarom voelt dit logisch op desktop, maar fout op mobiel? Die vragen keerden steeds terug.

Het proces deed denken aan specification driven development, maar zonder formele documenten. Elke iteratie begon met proberen te verwoorden wat er precies niet klopte. Vaak was dat moeilijker dan het oplossen zelf.

AI hielp daarbij niet door altijd het juiste antwoord te geven, maar door te dwingen tot precisie. Vage vragen leverden vage antwoorden op. Heldere prompts maakten het probleem scherp.

## Microprompts als werkritme

In plaats van grote, allesomvattende vragen werkte ik met kleine, afgebakende prompts. Eén component tegelijk. Eén probleem tegelijk. Soms zelfs één regel of één interactie.

Dat maakte het proces traag, maar beheersbaar. Elke wijziging bleef lokaal en omkeerbaar. Niets veranderde plots drastisch. De site groeide in kleine stappen, met ruimte om terug te keren op eerdere beslissingen.

Opvallend was hoe vaak we terugkwamen op dingen die al af leken. Een layout die gisteren nog logisch voelde, kon vandaag plots wringen. Dan begon het gesprek opnieuw. Niet omdat AI iets fout had gedaan, maar omdat mijn eigen gevoel scherper werd.

## Flaters horen erbij

Niet alles werkte meteen. Sommige oplossingen waren technisch correct, maar voelden visueel fout. Share buttons die perfect uitgelijnd waren, maar bleven storen. Een mobiele layout die responsive was, maar niet aangenaam om te gebruiken.

Soms draaide het proces in cirkels. Een wijziging loste één probleem op, maar creëerde een nieuw. Dan ging alles weer een stap terug. Dat was frustrerend, maar ook eerlijk. Er was niets verstopt achter een theme of framework. Elke fout was zichtbaar.

Wat hielp, was dat die flaters benoemd konden worden. Dit is het niet. Dit voelt geforceerd. Dit hebben we al eens geprobeerd. Die zinnen werden deel van het proces. AI onthield context, maar geen gevoel. Dat moest ik blijven expliciteren.

## Geen autopilot, wel versnelling

De grootste les kwam pas op het einde. AI nam geen beslissingen weg, maar maakte ze zichtbaarder. Elke keuze moest nog altijd door mij gedragen worden. AI stelde voor, ik koos. Of ik koos bewust niet.

Dat maakte het proces intensiever, maar ook eerlijker. De site is geen verzameling gegenereerde oplossingen, maar een reeks expliciete beslissingen, ontstaan uit dialoog.

Misschien is dat wel de juiste manier om met AI te werken aan dit soort projecten. Niet als autopilot, maar als tweede stem. Iemand die meedenkt, tegenspreekt en soms bevestigt, maar nooit overneemt.

En ja, soms ook gewoon mee vastloopt.

## Wat deze migratie mij vooral leerde

Achteraf bekeken was de migratie van PaperMod naar een eigen theme geen technische oefening, maar een oefening in eigenaarschap. Het kostte meer tijd, maar leverde rust op.

Alles zit nu waar het hoort. Niets is verborgen. Elke volgende wijziging start vanuit begrip, niet vanuit frustratie.

Dat maakt deze blog niet alleen prettiger om te lezen, maar vooral aangenamer om aan te werken.

Deze migratie kwam tot stand dankzij eerlijke en oprechte gesprekken met ChatGPT en Codex. Duidelijke instructies konden rechtstreeks aan Codex gegeven worden. Zelf heb ik uiteindelijk slechts enkele kleine zaken manueel aangepast.
