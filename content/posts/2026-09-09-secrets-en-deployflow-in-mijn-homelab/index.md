---
title: "Secrets en deployflow in mijn homelab: wel reproduceerbaar, niet roekeloos"
description: "Hoe ik secrets uit Git hou en toch een homelab behoud dat voorspelbaar te deployen en te begrijpen blijft."
summary: "Git als bron van waarheid klinkt mooi, tot je moet beslissen waar wachtwoorden, tokens en runtime configuratie dan wel thuishoren. In mijn homelab zit de rust net in die scheiding: Git voor structuur en versies, een aparte secret store voor gevoelige inhoud, en een deployflow die die twee opnieuw samenbrengt."
author: "Maarten"
date: 2026-09-09
lastmod: 2026-09-09
slug: "202609-secrets-en-deployflow-in-mijn-homelab"
draft: true
tags: [homelab, gitops]
cover:
  image: "cover.webp"
  alt: "Abstracte illustratie van configuratiebestanden, een afgesloten secret store en een gecontroleerde deploymentstroom tussen laptop en homelab"
  title: "Niet alles wat nodig is, hoort in Git"
  caption: "Een werkbare setup ontstaat pas wanneer code, secrets en uitrol elk hun juiste plaats krijgen."
images: ["cover.webp"]
---

In mijn vorige post ging het vooral over de vorm van mijn homelab: waarom ik het niet meer zie als een verzameling losse containers, maar als een systeem met duidelijke grenzen. Dat verhaal blijft nogal theoretisch zolang je het moeilijkste stuk overslaat. Want bijna elke nette repo botst vroeg of laat op dezelfde vraag: wat doe je met secrets?

Dit vervolg gaat dus over het deel waar die aanpak voor mij pas echt praktisch wordt: hoe ik secrets buiten Git hou, zonder terug te vallen op handmatig gepruts op servers.

Daar loopt het vaak mis. Veel setups starten netjes met "alles in code", tot de eerste API-token, databasewachtwoorden of hostspecifieke variabelen opduiken. Dan sluipt er snel een tweede werkelijkheid binnen: de repo toont hoe het systeem zou moeten zijn, maar ergens op een server leeft de echte configuratie verder in half-vergeten `.env`-bestanden.

Dat is precies wat ik wilde vermijden.

## Git is niet de plaats voor runtime secrets

Voor mij is dat ondertussen een vrij harde grens. Mijn repository bevat Compose-bestanden, versiepins, scripts en documentatie. Maar runtime secrets horen daar niet tussen.

Dat betekent concreet:

- geen echte `.env`-bestanden in Git
- geen tokens of wachtwoorden in Compose-files
- geen "tijdelijke" plaintext secrets die dan per ongeluk permanent worden

De reden is eenvoudig: runtime secrets horen niet alleen geheim te blijven, ze volgen ook een ander levensritme dan gewone configuratie. Een image-tag of een Compose-structuur wil ik kunnen reviewen, bespreken en versioneren. Een wachtwoord, token of client secret wil ik vooral gecontroleerd bewaren, gericht beschikbaar maken en zonder twijfel kunnen vervangen.

Dat betekent niet dat ik meteen het ideale model had. Mijn eerste stap was **SOPS**. Niet omdat dat mijn eindbeeld was, maar omdat ik op dat moment nog niet genoeg naar **OpenBao** had gekeken om daar al met vertrouwen op te bouwen. SOPS was voor mij dus vooral een pragmatische tussenstap: beter dan plaintext secrets in Git of op hosts laten rondslingeren, zonder dat ik meteen mijn hele secretverhaal moest herdenken.

{{< note title="SOPS, kort uitgelegd" >}}
[SOPS](https://github.com/getsops/sops) is een tool om bestanden zoals YAML-, JSON- of `.env`-bestanden versleuteld te bewaren. Je commit dus niet de plaintext secret, maar een versleutelde versie ervan die alleen met de juiste sleutels opnieuw ontsleuteld kan worden.
{{< /note >}}

Wat ik er handig aan vond, is dat SOPS weinig vraagt om mee te starten. Je kunt je bestaande werkwijze grotendeels behouden, maar de inhoud van die gevoelige bestanden tenminste al versleutelen. Voor een eerste stap is dat heel bruikbaar.

Maar SOPS lost voor mij vooral het opslagprobleem op, minder het distributieprobleem. Het helpt om secrets niet in plaintext in de repo te zetten, maar het blijft nog altijd dicht tegen "bestanden beheren" aanleunen.

Daarom past [OpenBao](https://openbao.org/) beter bij waar deze setup naartoe groeit.

{{< note title="OpenBao, kort uitgelegd" >}}
[OpenBao](https://openbao.org/) is een secrets manager. In plaats van gevoelige waarden als bestand mee te dragen, bewaar je ze centraal en laat je tools of hosts ze gecontroleerd ophalen wanneer ze echt nodig zijn.
{{< /note >}}

Voor mijn homelab is dat verschil belangrijk. Ik wil niet alleen vermijden dat secrets uitlekken in Git. Ik wil ook dat hosts hun runtime-configuratie pas krijgen wanneer ze gedeployed of bijgewerkt worden, via een pad dat ik bewust kan controleren.

Vandaag komt dat voor mij dus neer op een scheiding zoals deze:

```text
Git repo
- compose.yml
- versions.env
- scripts/

Secret store
- host .env
- service-specifieke bestanden

Runtime op host
- /opt/homelab/secrets/<host>/.env
```

Dat model klinkt misschien zwaarder dan gewoon "een `.env` ergens neerzetten", maar in de praktijk maakt het net eenvoudiger. Ik hoef niet meer te onthouden welke machine nog een afwijkende variabele heeft, of welke waarde ooit handmatig aangepast werd na een incident.

SOPS heeft mij eerst geholpen om discipline op te bouwen. OpenBao past beter bij de richting waarin het systeem evolueert. Die volgorde is voor mij ook belangrijk: niet omdat iedereen exact diezelfde stap moet zetten, maar omdat ze toont dat je niet ineens een perfect secretmodel nodig hebt om al veel beter te doen dan losse plaintext bestanden.

## Versies in Git, secrets elders

De nuttigste keuze in deze setup is waarschijnlijk dat ik versies en secrets echt uit elkaar trek. Welke tool daar precies achter zit, is minder belangrijk dan die grens consequent bewaken.

Niet-geheime versiepins mogen perfect in Git staan:

```dotenv
TRAEFIK_VERSION=v3.7
TRAEFIK_DIGEST=sha256:...
OPENBAO_VERSION=2.5.4
OPENBAO_DIGEST=sha256:...
```

Gevoelige waarden niet:

```dotenv
GF_ADMIN_PASSWORD=...
AUTHENTIK_GRAFANA_CLIENT_SECRET=...
ALERTMANAGER_TELEGRAM_BOT_TOKEN=...
```

Dat onderscheid helpt op twee manieren. Eerst en vooral technisch: tools zoals [Renovate](https://docs.mend.io/renovate/latest/) kunnen versie-updates behandelen zonder aan secrets te komen. Maar minstens even belangrijk is het mentale model. Als een waarde in Git staat, moet die reviewbaar en deelbaar zijn. Als dat niet zo is, hoort ze daar niet thuis.

{{< note title="Renovate, kort uitgelegd" >}}
[Renovate](https://docs.mend.io/renovate/latest/) is een tool die automatisch updatevoorstellen maakt voor afhankelijkheden en container-images, meestal in de vorm van pull requests.
{{< /note >}}

Een vereenvoudigd Compose-fragment maakt dat verschil misschien nog concreter:

```yaml
services:
  grafana:
    image: grafana/grafana:${GRAFANA_VERSION:?}@${GRAFANA_DIGEST:?}
    environment:
      GF_SERVER_ROOT_URL: https://${GRAFANA_HOST}
      GF_SECURITY_ADMIN_USER: ${GF_ADMIN_USER:-admin}
      GF_SECURITY_ADMIN_PASSWORD: ${GF_ADMIN_PASSWORD:?required}
      GF_AUTH_GENERIC_OAUTH_CLIENT_ID: ${AUTHENTIK_GRAFANA_CLIENT_ID:?required}
      GF_AUTH_GENERIC_OAUTH_CLIENT_SECRET: ${AUTHENTIK_GRAFANA_CLIENT_SECRET:?required}
    volumes:
      - /opt/homelab/monitoring/grafana:/var/lib/grafana
```

Wat je daarin mooi ziet, is dat niet alles dezelfde status heeft. De image en de versiepin mogen gewoon in Git staan. Een default admin user is ook niet zo spannend. Maar wachtwoorden en client secrets zijn duidelijk runtime-invoer. Die wil ik niet in de repo uitleggen als "later nog wel op te lossen", maar expliciet behandelen als iets dat van buiten Git moet komen.

## Deployen mag geen geheugentest zijn

De tweede helft van het probleem is deployment. Secrets beter organiseren is nog geen oplossing als je daarna alleen nog kunt deployen met een reeks handmatige stappen die toevallig in jouw hoofd zitten.

Daarom heb ik liever een flow die expliciet blijft:

```bash
ssh-add ~/.ssh/homelab
bash scripts/openbao-cli.sh status
make provision home monitoring
make verify home monitoring
```

Wat ik daar goed aan vind, is niet dat het spectaculair is. Integendeel. Het is saai, en dat is precies de bedoeling. Ik wil dat een deploy eruitziet als een herhaalbaar pad:

1. Toegang en prerequisites controleren.
2. Secrets kunnen ophalen.
3. De juiste host of dienst provisionen.
4. Verifiëren dat de wijziging effectief gezond staat te draaien.

Dat vermindert de kans dat een rollout afhankelijk wordt van impliciete kennis zoals "ah ja, op die ene host moet je daarna nog iets manueel aanpassen".

Ook dat sluit weer aan op de eerste post: zodra Git je vertrekpunt is, wil je vermijden dat deployen toch stiekem terug een reeks losse geheugenstappen wordt.

## Een private repo mag nog altijd deelbaar aanvoelen

Mijn doel is niet om deze repo publiek te maken. Ze is vandaag privé, en dat blijft ook zo. Wat ik wél belangrijk vind, is dat ik stukken ervan zonder veel stress kan tonen aan anderen. Een mapstructuur, een Compose-bestand, een deploymentscript, een stuk documentatie: dat moet ik kunnen delen of bespreken zonder eerst een halve veiligheidsaudit te doen.

Dat is voor mij een belangrijk verschil. Ik bouw deze repo niet als open source voorbeeldproject. Ik bouw ze eerst en vooral als mijn werkende homelab. Maar door secrets, omgevingsspecifieke waarden en gevoelige details uit de gewone configuratiestroom te trekken, wordt ze wel veel makkelijker om veilig uit te leggen.

Je kunt dan nog altijd de interessante delen tonen:

- hoe de repo gestructureerd is
- hoe provisioning werkt
- hoe Compose-projecten per host georganiseerd zijn
- hoe documentatie en scripts samen het operationele model dragen

Wat je dan niet per ongeluk mee hoeft te delen, zijn de exacte waarden die jouw eigen omgeving identificeerbaar of kwetsbaar maken.

Ik probeer daarom bewust het verschil te maken tussen:

- het patroon dat nuttig is voor anderen
- de concrete invulling die alleen voor mijn eigen homelab relevant is

Dat verschil zit soms in kleine dingen. Een echte hostnaam, intern adres of specifieke token zegt meestal niets extra over het ontwerp, maar wel iets extra over mijn omgeving. Voor een blogpost is dat geen goede ruil.

## Waarom deze scheiding mij rust geeft

De grootste winst is niet dat dit "veiliger klinkt". De grootste winst is dat mijn homelab consistenter aanvoelt. Als ik iets wil aanpassen, weet ik waar ik moet zijn. Als ik een reviewbare wijziging wil doen, hoort die in Git. Als ik een gevoelige waarde wil wijzigen, hoort die in de secret store. En als iets live moet gaan, loopt dat via een deploypad dat ik bewust kan volgen.

Dat is voor mij uiteindelijk de kern van GitOps in een homelab. Niet dat alles per se hip of geautomatiseerd moet zijn, maar dat de weg van intentie naar runtime helder blijft.

In de derde post wil ik jullie nog meenemen in wat er gebeurt zodra er iets aandacht vraagt.
