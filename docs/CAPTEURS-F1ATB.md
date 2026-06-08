# ⚡ Routeurs F1ATB — créer les capteurs de puissance & d'énergie

[🇫🇷 Français] · [🇬🇧 English](F1ATB-SENSORS.md) · [⬅ Retour au README](../README.md)

Un routeur **F1ATB** (et la plupart des routeurs solaires à triac) expose une **ouverture en %** du triac, pas une puissance ni une énergie. Ce guide montre comment en déduire :

- la **puissance** temps réel (W),
- l'**énergie** consommée : **jour / mois / année / total** (kWh),

pour les afficher dans la Solar Flow Card.

> ℹ️ **Deux approches — les deux sont supportées :**
> - **Mode `calc`** (rapide, sans rien créer) : la carte calcule la puissance elle-même = `résistance × ouverture %`. Idéal pour juste voir la puissance. ❌ Mais **pas d'énergie kWh** (la carte n'intègre pas dans le temps).
> - **Mode `power` + capteurs** (ce guide) : tu crées les capteurs côté Home Assistant → tu obtiens **puissance ET énergie jour/mois/année/total**, historisées.
>
> Le **mode `calc` reste disponible** pour les routeurs qui n'exposent qu'une ouverture et dont tu ne veux pas l'énergie, ou les autres types de routeurs.

---

## 🧭 Le principe

```
ouverture % ─┐
             ├─(× résistance)→ Puissance (W) ─(intégration)→ Énergie totale (kWh) ─(utility_meter)→ jour / mois / année
résistance ──┘
```

1. **Puissance** (W) = `ouverture % ÷ 100 × résistance`.
2. **Énergie totale** (kWh) = intégration de la puissance dans le temps.
3. **Jour / mois / année** = découpage de l'énergie totale.

> 💡 Adapte les `sensor.xxx` et la résistance (W) à **ton** matériel.

---

## Étape 1 — La puissance (W)

À placer dans `configuration.yaml` (ou un package). Exemple : résistance de **3000 W**.

```yaml
template:
  - sensor:
      - name: "Spa puissance"
        unique_id: spa_puissance
        unit_of_measurement: "W"
        device_class: power
        state: >
          {{ (states('sensor.f1atb_spa_ouverture') | float(0) / 100 * 3000) | round(0) }}
        availability: >
          {{ states('sensor.f1atb_spa_ouverture') not in ['unknown','unavailable'] }}
```

> 🔧 Remplace `sensor.f1atb_spa_ouverture` par ton entité d'ouverture et `3000` par la puissance nominale de **ta** résistance.

---

## Étape 2 — L'énergie totale (kWh)

L'[intégration de Riemann](https://www.home-assistant.io/integrations/integration/) transforme les W en kWh cumulés (`unit_prefix: k` → kilo).

```yaml
sensor:
  - platform: integration
    source: sensor.spa_puissance
    name: "Spa énergie totale"
    unique_id: spa_energie_totale
    unit_time: h
    unit_prefix: k        # Wh → kWh
    method: left
    round: 3
```

➡️ `sensor.spa_energie_totale` = **énergie totale cumulée** (la valeur « total »).

---

## Étape 3 — Jour / mois / année

Le [`utility_meter`](https://www.home-assistant.io/integrations/utility_meter/) découpe ce total en cycles.

```yaml
utility_meter:
  spa_energie_jour:   { source: sensor.spa_energie_totale, cycle: daily }
  spa_energie_mois:   { source: sensor.spa_energie_totale, cycle: monthly }
  spa_energie_annee:  { source: sensor.spa_energie_totale, cycle: yearly }
```

➡️ Tu obtiens :
| Capteur | Contenu |
|---|---|
| `sensor.spa_energie_jour` | énergie du jour (remise à zéro à minuit) |
| `sensor.spa_energie_mois` | énergie du mois |
| `sensor.spa_energie_annee` | énergie de l'année |
| `sensor.spa_energie_totale` | énergie totale (depuis le début) |

---

## Étape 4 — Brancher dans la Solar Flow Card

Dans l'éditeur, section **⚡ Routeurs solaires** → Routeur 1 :

```yaml
router1_enabled: true
router1_label: Spa
router1_mode: power                       # ← on utilise le capteur de puissance créé
router1_power: sensor.spa_puissance
router1_energy:       sensor.spa_energie_jour    # jour
router1_energy_month: sensor.spa_energie_mois    # mois
router1_energy_year:  sensor.spa_energie_annee   # année
router1_energy_total: sensor.spa_energie_totale  # total
```

➡️ La puissance s'affiche dans la scène, et la **section « Routeurs »** montre l'énergie **jour** (en grand) + **mois / année / total**.

> 🔁 **Tu préfères garder le mode `calc` ?** Laisse `router1_mode: calc` avec `router1_resistance_w` + `router1_opening` : la carte calcule la puissance, et tu peux **quand même** renseigner les `router1_energy*` ci-dessus pour l'énergie. Les deux mécanismes sont indépendants.

---

## ✅ Récapitulatif

```
sensor.f1atb_spa_ouverture (%)
        ×  résistance (W)
sensor.spa_puissance        (W)
        ↓ integration
sensor.spa_energie_totale   (kWh total)
        ↓ utility_meter
sensor.spa_energie_jour / _mois / _annee
```

---

## 🔁 Plusieurs routeurs

Répète les 4 étapes pour chaque routeur (résistance et entité d'ouverture propres), puis renseigne `router2_*`, `router3_*`. La section « Routeurs » ajoute automatiquement un badge par routeur actif (largeur responsive).

---

## 🛟 Dépannage

- **`sensor.spa_energie_totale` reste à 0 / `unknown`** : vérifie que `sensor.spa_puissance` renvoie un nombre (Outils de développement → États).
- **Énergie qui ne bouge pas la nuit** : normal si l'ouverture est à 0 % (puissance 0).
- **Après modif YAML** : *Outils de développement → YAML → Redémarrer les capteurs Template / utility_meter*, ou redémarre Home Assistant.
- **Puissance fausse** : vérifie la valeur de la résistance (W) et que l'ouverture est bien en **% (0–100)** et non en fraction (0–1).
