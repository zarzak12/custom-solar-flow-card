# 💶 Créer ses capteurs d'économies dans Home Assistant

[🇫🇷 Français] · [🇬🇧 English](SAVINGS-SENSORS.md) · [⬅ Retour au README](../README.md)

Ce guide explique comment calculer tes **économies en €** (jour / mois / année / total) **directement dans Home Assistant**, pour tous les types de tarification : prix fixe, Heures Pleines/Creuses, Tempo EDF, tarif dynamique…

> **Pourquoi côté HA plutôt que dans la carte ?**
> La carte fait une *estimation* (kWh × prix du moment) qui peut perdre en précision après un rechargement de page ou pour la production faite avant l'ouverture du dashboard. En calculant côté HA, l'intégration est **continue, persistée et historisée** — c'est la méthode la plus fiable, et elle respecte naturellement la variation HC/HP/Tempo **au moment où l'énergie est consommée**.

---

## 🧭 Le principe en 3 étapes

```
┌─ Étape 1 ─────────────┐   ┌─ Étape 2 ──────────────────┐   ┌─ Étape 3 ─────────────────┐
│ Prix actuel (€/kWh)   │ × │ Puissance économisée (kW)  │ = │ Taux d'économie (€/h)     │
│ selon ton contrat     │   │ = conso couverte par PV/   │   │           │               │
│ (fixe / HP-HC / Tempo │   │   batterie (import évité)  │   │           ▼               │
│  / dynamique)         │   │                            │   │ Intégration → € cumulés   │
└───────────────────────┘   └────────────────────────────┘   │           ▼               │
                                                             │ utility_meter →           │
                                                             │ jour / mois / an / total  │
                                                             └───────────────────────────┘
```

1. **Prix actuel** (`sensor.prix_electricite`, en €/kWh) — dépend de ton contrat.
2. **Puissance économisée** (`sensor.puissance_autoconsommee`, en W) — la part de ta conso couverte par le solaire + la batterie (= l'import réseau que tu évites).
3. **Taux d'économie** (`sensor.taux_economie`, en €/h) = puissance (kW) × prix → puis **intégration** en € cumulés → puis **utility_meter** pour le découpage jour / mois / année / total.

> 💡 Adapte tous les `sensor.xxx` ci-dessous aux noms réels de **tes** entités.

---

## Étape 1 — Le prix actuel (€/kWh)

À placer dans `configuration.yaml` (ou un package). Choisis **un seul** des blocs suivants selon ton contrat.

### A. Tarif unique (prix fixe)

```yaml
template:
  - sensor:
      - name: "Prix électricité"
        unique_id: prix_electricite
        unit_of_measurement: "EUR/kWh"
        state: "0.2516"
```

### B. Heures Pleines / Heures Creuses

Exemple : HC de **22 h à 6 h**, HP le reste du temps.

```yaml
template:
  - sensor:
      - name: "Prix électricité"
        unique_id: prix_electricite
        unit_of_measurement: "EUR/kWh"
        state: >
          {% set h = now().hour %}
          {% set hc = (h >= 22 or h < 6) %}
          {{ 0.2068 if hc else 0.2700 }}
```

> 🔧 Si ton contrat a des plages HC plus complexes (ex. 12 h-14 h **et** 22 h-6 h), enchaîne les conditions :
> ```jinja
> {% set hc = (h >= 22 or h < 6) or (h >= 12 and h < 14) %}
> ```

### C. Tempo EDF

Nécessite une intégration fournissant la **couleur Tempo du jour** (ex. [RTE Tempo](https://github.com/hekmon/rtetempo) → `sensor.rte_tempo_couleur_actuelle`, ou l'intégration *EDF Tempo*). HP de 6 h à 22 h, HC de 22 h à 6 h.

```yaml
template:
  - sensor:
      - name: "Prix électricité"
        unique_id: prix_electricite
        unit_of_measurement: "EUR/kWh"
        state: >
          {% set h = now().hour %}
          {% set hc = (h >= 22 or h < 6) %}
          {% set couleur = states('sensor.rte_tempo_couleur_actuelle') | lower %}
          {% if 'bleu' in couleur or 'blue' in couleur %}
            {{ 0.1296 if hc else 0.1609 }}
          {% elif 'blanc' in couleur or 'white' in couleur %}
            {{ 0.1470 if hc else 0.1894 }}
          {% elif 'rouge' in couleur or 'red' in couleur %}
            {{ 0.1568 if hc else 0.7562 }}
          {% else %}
            {{ 0.1609 }}
          {% endif %}
```

> ⚠️ Mets à jour les tarifs (grille au 1ᵉʳ février 2024 ci-dessus) selon ton abonnement.

### D. Tarif dynamique (Tibber, Nord Pool, EPEX, aWATTar…)

Si une intégration expose déjà le prix horaire, **pas besoin de template** : utilise directement son entité (ex. `sensor.tibber_prices`, `sensor.nordpool_kwh_xxx`).

Si le prix est dans un attribut ou dans une autre unité (€/MWh), convertis :

```yaml
template:
  - sensor:
      - name: "Prix électricité"
        unique_id: prix_electricite
        unit_of_measurement: "EUR/kWh"
        state: >
          {# Exemple : Nord Pool en EUR/MWh → /1000 #}
          {{ (states('sensor.nordpool_kwh_fr_eur') | float(0)) }}
```

---

## Étape 2 — La puissance économisée (W)

L'économie réelle = l'**import réseau évité** = la part de ta consommation couverte par le solaire **et** la batterie. En la valorisant au prix de l'instant, on obtient automatiquement le bon tarif **au moment où l'énergie est consommée** (ce qui règle proprement le cas batterie : charge en journée, restitution le soir au tarif du soir).

Convention : `sensor.puissance_reseau` en W, **positif = import**, **négatif = export**.

```yaml
template:
  - sensor:
      - name: "Puissance autoconsommée"
        unique_id: puissance_autoconsommee
        unit_of_measurement: "W"
        device_class: power
        state: >
          {% set maison = states('sensor.consommation_maison') | float(0) %}
          {% set reseau = states('sensor.puissance_reseau') | float(0) %}
          {% set import = reseau if reseau > 0 else 0 %}
          {{ [maison - import, 0] | max }}
```

> 🔧 **Si tu as des capteurs d'import/export séparés** (ex. Linky avec deux sensors), remplace :
> ```jinja
> {% set import = states('sensor.reseau_import') | float(0) %}
> {{ [maison - import, 0] | max }}
> ```

> 🔧 **Variante simple sans batterie** (autoconso solaire directe seulement) :
> ```jinja
> {% set pv = states('sensor.production_pv') | float(0) %}
> {% set maison = states('sensor.consommation_maison') | float(0) %}
> {{ [pv, maison] | min }}
> ```

---

## Étape 3 — Taux d'économie, puis cumul jour / mois / an / total

### 3.1 — Taux d'économie (€/h)

```yaml
template:
  - sensor:
      - name: "Taux économie"
        unique_id: taux_economie
        unit_of_measurement: "EUR/h"
        state: >
          {% set kw    = states('sensor.puissance_autoconsommee') | float(0) / 1000 %}
          {% set prix  = states('sensor.prix_electricite') | float(0) %}
          {{ (kw * prix) | round(4) }}
```

> 💰 **Ajouter le revenu de revente du surplus** (optionnel) : crée un second taux et additionne-le.
> ```yaml
>       - name: "Taux revenu revente"
>         unique_id: taux_revenu_revente
>         unit_of_measurement: "EUR/h"
>         state: >
>           {% set reseau = states('sensor.puissance_reseau') | float(0) %}
>           {% set export_kw = (-reseau if reseau < 0 else 0) / 1000 %}
>           {{ (export_kw * 0.10) | round(4) }}   {# 0.10 = prix de revente €/kWh #}
> ```
> Puis crée un `Taux gain total` = `taux_economie + taux_revenu_revente` et intègre celui-ci.

### 3.2 — Intégration → économies cumulées (€ total)

L'[intégration de Riemann](https://www.home-assistant.io/integrations/integration/) transforme le taux (€/h) en € cumulés.

```yaml
sensor:
  - platform: integration
    source: sensor.taux_economie
    name: "Économies totales"
    unique_id: economies_totales
    unit_time: h
    method: left
    round: 2
```

➡️ `sensor.economies_totales` = **économies totales depuis l'installation** (la valeur « total »).

### 3.3 — utility_meter → jour / mois / année

Le [`utility_meter`](https://www.home-assistant.io/integrations/utility_meter/) découpe ce total en cycles.

```yaml
utility_meter:
  economies_jour:
    source: sensor.economies_totales
    cycle: daily
  economies_mois:
    source: sensor.economies_totales
    cycle: monthly
  economies_annee:
    source: sensor.economies_totales
    cycle: yearly
```

➡️ Tu obtiens :
| Capteur | Contenu |
|---|---|
| `sensor.economies_jour` | économies du jour (remise à zéro à minuit) |
| `sensor.economies_mois` | économies du mois |
| `sensor.economies_annee` | économies de l'année |
| `sensor.economies_totales` | économies totales (cumul depuis le début) |

---

## ✅ Récapitulatif

```
sensor.prix_electricite        (€/kWh, selon contrat)
        ×
sensor.puissance_autoconsommee (W → import évité)
        =
sensor.taux_economie           (€/h)
        ↓ integration
sensor.economies_totales       (€ total)
        ↓ utility_meter
sensor.economies_jour / _mois / _annee
```

---

## 🔌 Brancher ces capteurs dans la Solar Flow Card

La carte peut **afficher directement** ces capteurs `€` (plus précis que son calcul interne). Dans l'éditeur, ouvre **Économies & Tarification → Source des économies** et choisis **« 🔗 Capteurs € (calculés dans HA) »**, puis renseigne tes entités :

```yaml
savings_mode:         entity
savings_day_entity:   sensor.economies_jour
savings_month_entity: sensor.economies_mois
savings_year_entity:  sensor.economies_annee
savings_total_entity: sensor.economies_totales   # utilisé pour le ROI
```

- La carte affiche alors les montants **tels quels** (jour / mois / année), et calcule le **ROI** à partir de `savings_total_entity` ÷ coût (PV + batterie).
- Le **mode de tarification** (prix fixe / HP-HC / Tempo…) ne sert plus qu'au **badge prix/Tempo** affiché en haut du bloc — les montants viennent de tes capteurs.
- Mode par défaut = **`calc`** (calcul interne kWh × prix) : si tu ne renseignes rien, rien ne change.

> Ces capteurs s'affichent aussi dans n'importe quelle carte Home Assistant standard (Entities, Statistics, History…).

---

## 🛟 Dépannage

- **`sensor.economies_totales` reste à `unknown`** : vérifie que `sensor.taux_economie` renvoie bien un nombre (Outils de développement → États).
- **Valeurs qui paraissent doublées** : assure-toi de ne pas additionner deux fois l'autoconsommation **et** la décharge batterie — la « puissance économisée » (import évité) les couvre déjà toutes les deux.
- **Après modif YAML** : *Outils de développement → YAML → Redémarrer les capteurs Template / utility_meter*, ou redémarre Home Assistant.
- **Tempo** : si le badge couleur n'apparaît pas, vérifie le nom exact de l'entité couleur et ses valeurs (`bleu`/`blue`…).
