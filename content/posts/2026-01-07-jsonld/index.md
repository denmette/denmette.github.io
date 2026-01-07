---
title: "JSON+LD is geen SEO-truc, maar een modelleerprobleem"
description: "JSON+LD dwingt je om expliciet na te denken over entiteiten, rollen en context. Geen snelle SEO-winst, wel een correct en toekomstvast model."
summary: "Ik dacht dat JSON+LD draaide om zoekmachines. Het bleek vooral te gaan over verantwoordelijkheid, identiteit en nuance. Deze walkthrough laat zien waarom correcte modellering meer oplevert dan snelle optimalisatie."
author: "Maarten"
date: 2026-01-07
lastmod: 2026-01-07
slug: "202601-jsonld-is-geen-seo-truc"
draft: false
tags: ["json-ld", "schema-org", "webontwikkeling"]
cover:
  image: "cover.webp"
  alt: "Conceptuele illustratie van verbonden entiteiten zoals een persoon, een podcast en een website, weergegeven als losse elementen die via lijnen met elkaar in relatie staan."
  caption: "JSON+LD als modelleerprobleem: niet de pagina staat centraal, maar de relaties tussen entiteiten."
images: ["cover.webp"]
---

Ik begon aan JSON+LD met een fout idee in mijn hoofd.
Ik dacht dat het ging over zichtbaarheid, over zoekmachines helpen, over _"structured data toevoegen"_.
Iets technisch, iets dat je er snel bijneemt.

Wat ik onderschat had, is dat JSON+LD je dwingt om expliciet te zijn over identiteit, rollen en context.
Dingen die in tekst logisch aanvoelen, blijken plots vaag of zelfs fout wanneer je ze moet modelleren.

Deze post is geen checklist en geen quick win. Het is een walkthrough van hoe ik JSON+LD heb opgezet voor mijn persoonlijke blog [casteels.dev](https://casteels.dev "Bezoek mijn persoonlijke blog.") en voor de podcastsite [jcast.dev](https://jcast.dev "Bezoek de JCast podcastsite.").
Inclusief de momenten waarop _"het bijna juist"_ bleek, maar toch niet klopte.

## Je beschrijft geen pagina’s, je beschrijft entiteiten

Het eerste inzicht dat alles veranderde, was eenvoudig maar confronterend:
[schema.org](https://schema.org "Open de schema.org documentatie.") gaat niet over webpagina’s. Het gaat over **entiteiten** die los bestaan van waar je ze beschrijft.

* Een persoon bestaat los van zijn website.
* Een podcast bestaat los van haar homepage.
* Een aflevering of blogpost bestaat los van de HTML waarin ze staat.

Zodra je dat accepteert, kan je niet meer _"even wat JSON toevoegen"_. Je moet eerst beslissen wat je eigenlijk aan het beschrijven bent.

## Begin met jezelf, maar wees precies

Voor casteels.dev was dat nog relatief eenvoudig. Die site gaat over mij, dus ik begin met mezelf als `Person`.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://casteels.dev/#maarten-casteels",
  "name": "Maarten Casteels",
  "url": "https://casteels.dev"
}
</script>
```

Die `@id` is geen detail. Dit is mijn vaste identiteit. Alles wat later over mij gaat, moet hiernaar verwijzen.
Niet via naam, niet via tekst, maar via exact deze identifier.

Dit voelt overdreven, tot je meerdere sites begint te koppelen.

## De basisgraph voorkomt losse brokken

Losse entiteiten zijn nuttig, maar zonder basisgraph missen ze context. De combinatie van `Organization`, `WebSite` en `WebPage` zorgt dat alles aan je site hangt, en dat een pagina duidelijk maakt wie of wat er centraal staat.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://casteels.dev/#org",
      "name": "Maarten's Blog",
      "url": "https://casteels.dev/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://casteels.dev/#logo",
        "url": "https://casteels.dev/maarten.webp"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://casteels.dev/#website",
      "name": "Maarten's Blog",
      "url": "https://casteels.dev/",
      "publisher": { "@id": "https://casteels.dev/#org" }
    },
    {
      "@type": "WebPage",
      "@id": "https://casteels.dev/posts/202601-jsonld-is-geen-seo-truc/#webpage",
      "url": "https://casteels.dev/posts/202601-jsonld-is-geen-seo-truc/",
      "name": "JSON+LD is geen SEO-truc, maar een modelleerprobleem",
      "isPartOf": { "@id": "https://casteels.dev/#website" }
    },
    {
      "@type": "BlogPosting",
      "@id": "https://casteels.dev/posts/202601-jsonld-is-geen-seo-truc/#article",
      "headline": "JSON+LD is geen SEO-truc, maar een modelleerprobleem",
      "mainEntityOfPage": { "@id": "https://casteels.dev/posts/202601-jsonld-is-geen-seo-truc/#webpage" },
      "publisher": { "@id": "https://casteels.dev/#org" }
    }
  ]
}
</script>
```

Zo blijft elke entiteit herbruikbaar, maar ook netjes gelinkt aan de juiste pagina.

## sameAs is geen verzamelbak

Mijn eerste reflex was om alles te linken wat _"iets met mij te maken heeft"_. Sociale profielen, projecten, podcasts. Maar `sameAs` betekent iets heel strengs.

Het betekent niet _"gerelateerd aan"_.
Het betekent _"beschrijft exact dezelfde entiteit"_.

Daarom is het belangrijk om `sameAs` alleen te gebruiken voor dingen die ook **zichtbaar en herkenbaar** zijn als jij op je website. 
Profielen waar iemand effectief jou ziet, met jouw naam, jouw identiteit.

Geen projecten waar je aan meewerkt.
Geen sites waar je af en toe verschijnt.
Geen _"handige"_ links om maar iets te linken.

Dat lijkt beperkend, maar het helpt zoekmachines net. Je geeft minder signalen, maar wel correcte.

## Lid zijn is iets anders dan hetzelfde zijn

Ik ben co-host van JCast, maar ik ben JCast niet. Dat onderscheid is cruciaal.

Wat ik wél correct kan zeggen, is dat ik lid ben van de organisatie achter de podcast. Dat modelleer je met `memberOf`, niet met `sameAs`.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://casteels.dev/#maarten-casteels",
  "name": "Maarten Casteels",
  "url": "https://casteels.dev",
  "memberOf": {
    "@id": "https://jcast.dev/#org"
  }
}
</script>
```

Dit hoort thuis op mijn persoonlijke site, omdat ik daar de primaire entiteit ben. Ik beschrijf wie ik ben en waar ik deel van uitmaak.

## Maar een relatie werkt pas als beide kanten ze erkennen

Als je hier stopt, laat je iets onuitgesproken. JCast weet dan alleen wat ik er over zeg, niet wat het over zichzelf zegt.

Op jcast.dev moet de organisatie zichzelf beschrijven, los van mij.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://jcast.dev/#org",
  "name": "JCast",
  "url": "https://jcast.dev/"
}
</script>
```

En pas daarna zegt die organisatie wie erbij hoort.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://jcast.dev/#org",
  "member": {
    "@type": "Person",
    "@id": "https://casteels.dev/#maarten-casteels",
    "name": "Maarten Casteels"
  }
}
</script>
```

Dit voelt als duplicatie, maar dat is het niet. Elke site vertelt haar eigen waarheid, met gedeelde identifiers. Zo hoeven zoekmachines niets te raden.

## Een podcast is meer dan één ding

Tot hier ging het over mensen en organisaties. Maar een podcast zelf is ook een entiteit, en die leeft in lagen.

Op jcast.dev is het centrale concept de podcast als geheel. Dat modelleer je als `PodcastSeries`.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "PodcastSeries",
  "@id": "https://jcast.dev/#podcast",
  "name": "JCast",
  "url": "https://jcast.dev",
  "publisher": {
    "@id": "https://jcast.dev/#org"
  }
}
</script>
```

Dit object beschrijft wat JCast is, los van afleveringen of seizoenen.

## Seizoenen geven structuur, geen versiering

Je kan afleveringen rechtstreeks aan een serie koppelen, maar zodra seizoenen betekenis hebben, loont het om die expliciet te maken.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "PodcastSeason",
  "@id": "https://jcast.dev/#season-2",
  "seasonNumber": 2,
  "name": "Season 2",
  "partOfSeries": {
    "@id": "https://jcast.dev/#podcast"
  }
}
</script>
```

Een seizoen bestaat alleen binnen de context van een serie. Dat maak je hier expliciet.

## Afleveringen zijn waar alles samenkomt

Een `PodcastEpisode` is inhoud. Dit is wat mensen beluisteren, delen en terugvinden.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "PodcastEpisode",
  "@id": "https://jcast.dev/episodes/clean-code#episode",
  "name": "Clean Code in de praktijk",
  "episodeNumber": 3,
  "partOfSeason": {
    "@id": "https://jcast.dev/#season-2"
  },
  "partOfSeries": {
    "@id": "https://jcast.dev/#podcast"
  }
}
</script>
```

De verwijzing naar zowel seizoen als serie lijkt redundant, maar maakt de aflevering zelfstandig begrijpbaar.

## Personen horen bij context, niet bij alles

Pas op het niveau van de aflevering koppel ik hosts of gasten.

```json
"actor": {
  "@type": "Role",
  "roleName": "Host",
  "actor": {
    "@type": "Person",
    "@id": "https://casteels.dev/#maarten-casteels",
    "name": "Maarten Casteels"
  }
}
```

Ik ben hier geen publisher en geen eigenaar. Ik ben een stem in deze aflevering. Meer niet.

## Tools helpen, maar ze denken niet voor je

Tijdens dit proces heb ik veel gehad aan validatietools. Niet om het model te ontwerpen, wel om fouten te zien.

De [schema.org validator](https://validator.schema.org "Open de schema.org validator.") laat snel zien wat technisch klopt en wat niet.
Browser add-ons zoals [OpenLink Structured Data Sniffer](https://osds.openlinksw.com/ "Open de OpenLink Structured Data Sniffer.") maken zichtbaar wat een pagina effectief uitzendt. Soms wat rommelig gepresenteerd, maar enorm verhelderend.

Wat deze tools niet doen, is beslissen of je model logisch is. Dat blijft jouw verantwoordelijkheid.

## De master setup is krachtig, maar niet magisch

Een gedeelde instruction file of _"master setup"_ kan veel werk versnellen, zeker wanneer je met AI werkt. Maar na de eerste run is menselijke correctie onmisbaar.
Wie wil, kan mijn eigen instructiebestand bekijken of downloaden: [JSON+LD master instructions (raw)](https://raw.githubusercontent.com/denmette/denmette.github.io/refs/heads/main/ai/instructions/jsonld-master-instructions.md "Open het JSON+LD master-instructiebestand als raw bestand.").

Je person data mag oppervlakkig blijven. Dat is prima.
Wat niet oppervlakkig mag zijn, zijn je identifiers en je relaties.

JSON+LD werkt niet omdat het volledig is.
Het werkt omdat het consistent is.


## Wat ik hieruit heb geleerd

JSON+LD loont pas wanneer je het ernstig neemt. Niet als SEO-hack, maar als expliciet model van je domein.

Je moet accepteren dat:

* niet alles gelinkt moet worden
* minder vaak beter is
* context belangrijker is dan volledigheid
* een beetje herhaling geen fout is

Niet sneller.<br>
Wel correct.

En achteraf bekeken was dat exact de investering die nodig was om dit goed te krijgen.
