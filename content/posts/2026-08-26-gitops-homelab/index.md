---
title: "Mijn GitOps homelab, zonder mijn hele thuisnetwerk op straat te leggen"
description: "Hoe ik mijn homelab organiseer met Git als bron van waarheid, zonder gevoelige details zoals secrets, interne adressen of operationele kwetsbaarheden publiek te maken."
summary: "Een homelab documenteren is nuttig, maar ook delicaat. Ik wil tonen hoe mijn setup werkt, waarom ik voor GitOps koos en welke patronen bruikbaar zijn voor anderen, zonder tegelijk mijn volledige thuisnetwerk prijs te geven."
author: "Maarten"
date: 2026-08-26
lastmod: 2026-08-26
slug: "202609-mijn-gitops-homelab"
draft: false
tags: [homelab, gitops]
cover:
  image: "cover.webp"
  alt: "Schematische illustratie van meerdere servers in een deploymentflow"
  title: "Een homelab dat je in Git kunt begrijpen"
  caption: "Niet alles hoeft publiek te zijn om wel helder gedocumenteerd en reproduceerbaar te blijven."
images: ["cover.webp"]
---

De voorbije maanden ben ik mijn homelab steeds minder gaan behandelen als een verzameling losse containers, en steeds meer als een systeem met duidelijke grenzen. Niet alleen technisch, maar ook operationeel. Als ik iets wijzig, wil ik weten *waar* de bron van waarheid zit, *hoe* die wijziging uitgerold wordt en *wat* ik moet nakijken als er iets misloopt.

Dat is de reden waarom ik het vandaag eerder een **GitOps homelab** noem dan gewoon een self-hosted setup.

Met GitOps bedoel ik hier niet een strak afgelijnde enterprise-aanpak, maar iets veel eenvoudigers: Git als vertrekpunt voor hoe het systeem eruit hoort te zien, en een uitrolpad dat die repository ook echt volgt.

Tegelijk zit daar een spanningsveld in. Over een homelab schrijven is leuk en vaak ook nuttig voor anderen, maar je wilt niet per ongeluk je netwerkopzet, toegangsmodel of geheime saus publiceren. Dus ja, ik wil code tonen. Ik wil ook uitleggen hoe dingen in elkaar zitten. Maar niet elk detail hoort publiek op een blog.

## Git als bron van waarheid, maar niet voor alles

Wat ik vooral uit deze aanpak haal, is rust. Mijn repository beschrijft welke hosts er zijn, welke services daarop draaien, hoe die services gegroepeerd zijn en welke versies ik vastpin. Die repository is dus geen kopie van wat er toevallig draait, maar een beschrijving van hoe het systeem bedoeld is.

De structuur is bewust eenvoudig gehouden: per host één map, en daaronder per dienst een aparte Compose-stack. Daardoor blijft het leesbaar.

{{< note title="Compose-stack, kort uitgelegd" >}}
[Docker Compose](https://docs.docker.com/compose/) is een tool om toepassingen met meerdere containers te definiëren en te draaien vanuit één YAML-configuratie. Met een **Compose-stack** bedoel ik hier zo'n afgebakende configuratie voor één dienst of één logisch geheel.
{{< /note >}}

```text
infra/
  traefik/
  authentik/
  openbao/
home/
  homeassistant/
  monitoring/
media/
  jellyfin/
  immich/
games/
  screeps/
```

Die keuze is misschien minder "slim" dan een grote abstractielaag, maar wel veel duidelijker. Als ik iets zoek, weet ik meestal meteen waar ik moet zijn.

Wat **niet** in Git thuishoort, zijn runtime secrets. Wachtwoorden, tokens, private configuratiebestanden en omgevingsspecifieke waarden horen daar voor mij niet thuis. Git is in deze setup de bron van waarheid voor configuratie en versiebeheer, niet voor gevoelige inhoud.

## Het interessante deel zit in de scheiding

Wat voor mij het verschil maakt, is niet dat alles "as code" staat. Dat doen veel setups. Het nuttige zit in de scheiding tussen drie soorten informatie:

1. Versies en image digests die veilig in Git mogen staan.
2. Runtime secrets die buiten Git beheerd worden.
3. Operationele scripts en documentatie die uitleggen hoe een wijziging van laptop tot host geraakt.

Een klein voorbeeld van dat eerste:

```dotenv
# Non-secret image/version settings
TRAEFIK_VERSION=v3.7
TRAEFIK_DIGEST=sha256:...
OPENBAO_VERSION=2.5.4
OPENBAO_DIGEST=sha256:...
```

Dat lijkt banaal, maar het helpt wel. Ik kan versie-updates reviewen zoals gewone codewijzigingen. En omdat die waarden apart staan van secrets, blijft ook duidelijk wat publiek of deelbaar is en wat niet.

## Hergebruik boven magie

Een tweede keuze waar ik tevreden over ben, is dat terugkerende bouwstenen ook echt terugkerende bouwstenen zijn. Monitoring is daar een goed voorbeeld van. Elke host draait dezelfde basis voor metrics en logs, in plaats van vier bijna-gelijke varianten die langzaam uit elkaar groeien.

{{< note title="Monitoring-agent, kort uitgelegd" >}}
`monitoring-agent` is in deze reeks geen aparte standaardtool, maar mijn naam voor een klein pakket monitoringcomponenten per host. Die laag verzamelt alleen metrics en logs en stuurt ze door, zonder daar al dashboards of alertlogica aan vast te hangen.
{{< /note >}}

```yaml
name: monitoring-agent

services:
  cadvisor:
    extends:
      file: ../../common/monitoring-agent/compose.yml
      service: cadvisor
```

Dat soort hergebruik klinkt klein, maar vermijdt precies het soort verschillen dat je pas merkt wanneer een incident al bezig is.

Hetzelfde geldt voor deployment. Ik probeer wijzigingen niet te behandelen als handwerk op een server, maar als een herhaalbare flow: aanpassen, provisionen, verifiëren. Daardoor wordt het homelab minder afhankelijk van wat ik mij toevallig nog herinner van drie weken geleden.

Die woorden gebruik ik ook vrij letterlijk. *Provisionen* is voor mij het moment waarop een host of dienst opnieuw de juiste configuratie krijgt. *Verifiëren* is daarna controleren of die wijziging ook effectief gezond draait.

## Privacy is ook een architectuurkeuze

Wanneer mensen een homelab delen, zie je vaak twee uitersten. Ofwel is het zo abstract dat je er niets concreets uit leert. Ofwel staat werkelijk alles online, inclusief domeinen, interne adressen en toegangspatronen.

Ik wil daar tussenin blijven.

De code en patronen zijn vaak perfect deelbaar:

- hoe ik services per host organiseer
- hoe ik versies pin
- hoe reverse proxy, identity en secret management samenhangen
- hoe ik monitoring en verificatie aanpak

Maar sommige details publiceer ik liever niet letterlijk:

- interne IP-ranges en hostnamen
- concrete DNS- en routingtabeldetails
- secrets, tokens en wachtwoorden
- operationele uitzonderingen die mijn eigen setup te precies beschrijven

Dat betekent niet dat de uitleg minder eerlijk wordt. Het betekent alleen dat een blogpost geen pentest-voorbereiding hoeft te zijn.

## Waarom dit voor mij werkt

De grootste winst zit niet in technologie om de technologie. Die zit in het feit dat mijn homelab leesbaarder geworden is. Ik kan sneller zien wat waar draait. Ik kan wijzigingen bewuster uitvoeren. En ik kan delen van de setup uitleggen zonder eerst heel mijn hoofd te legen over allerlei impliciete afspraken.

Dat is uiteindelijk ook waarom ik erover wil schrijven. Niet om te tonen hoeveel diensten ik draai, maar om te tonen hoe een homelab rustiger wordt zodra je het behandelt als een systeem met grenzen, versiebeheer en documentatie.

Tot hier gaat het vooral over de vorm van het systeem: hoe ik het opsplits, waarom Git mijn uitgangspunt is, en waarom ik bewust grenzen trek in wat wel en niet in die repo thuishoort.

In de volgende post ga ik naar het deel waar dit model pas echt getest wordt: hoe je die nette structuur ook praktisch werkbaar houdt zodra gevoelige configuratie en uitrol in beeld komen.
