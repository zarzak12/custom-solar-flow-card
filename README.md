<p align="center">
  <img src="logo.svg" alt="Solar Flow Card" width="420"/>
</p>

# ☀️ Solar Flow Card

**🇫🇷 Français** · [🇬🇧 English](README.en.md)

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)
![Version](https://img.shields.io/badge/version-1.2.1-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

[![Ouvrir dans Home Assistant et ajouter ce dépôt à HACS](https://my.home-assistant.io/badges/hacs_repository.svg)][install]

[install]: https://my.home-assistant.io/redirect/hacs_repository/?owner=zarzak12&repository=custom-solar-flow-card&category=frontend

> Carte Lovelace pour Home Assistant qui transforme vos données solaires en une visualisation vivante, animée et enrichie d'économies en temps réel.
>
> <img width="804" height="2158" alt="image" src="https://github.com/user-attachments/assets/43ded533-957e-4d71-b6fe-82d897793668" />
<img width="804" height="3180" alt="image" src="https://github.com/user-attachments/assets/dc059514-0944-4881-a2a5-3c7137986ac6" />


---

## ✨ Ce que ça fait

Solar Flow Card affiche en temps réel **tous vos flux d'énergie** sur une scène immersive :

- 🌞 **Arc solaire** animé avec position calculée depuis votre latitude/longitude (ou via entités HA)
- ⚡ **Flux animés** entre production PV, réseau, maison, batterie et routeurs solaires (GSAP)
- 🔋 **Batterie liquide** avec physique élastique GSAP, bulles de charge ascendantes et halo coloré
- 🌦️ **Météo dynamique** — ciel bleu → partiellement nuageux → couvert → pluie → neige → orage avec effets de particules
- 🧱 **Affichage en blocs thématiques** — PV / Conso-Réseau / Batterie / Santé batterie / Routeurs / Économies / EV : chaque bloc réordonnable, masquable et titrable ; les tuiles **s'ajustent automatiquement à la largeur** (3 par ligne max, la dernière ligne s'étire : 2 tuiles → 50 %, 1 → 100 %)
- 🏠 **Suivi conso « expert »** — instantané + bilan jour/mois/année + bilan net réseau + coût du jour, avec visibilité par tuile (anti-doublon)
- 👆 **Détails au clic** — cliquer une zone (Réseau, Maison, Batterie, PV, routeur, EV) ouvre un panneau récapitulant **toutes les entités liées** (configurées sur la carte). Activable via `details_on_click` (défaut activé).
- ⚡ **Jusqu'à 4 routeurs solaires** avec puissance + énergie jour/mois/année/total
- 💰 **Économies & ROI** — calcul delta en temps réel, ROI daté (départ → atterrissage), basé sur cumul ÷ âge
- 💶 **4 modes de tarification** : prix fixe, Heures Pleines/Creuses, Tempo EDF, ou entité dynamique
- 🔮 **Prévision de production** affichée en haut du ciel (Solcast / Forecast.Solar)
- 🚗 **Véhicule électrique** avec flux bidirectionnel charge / V2H et SOC
- 🩺 **État de santé batterie (SOH)** avec barre colorée et estimation des cycles
- 📈 **Taux d'autoconsommation & autoproduction** avec jauges colorées
- 🔎 **Tailles ajustables** par curseurs : épaisseur des flux, taille des libellés et des valeurs
- 🎨 **Deux modes de scène** : vue séparée (icônes) ou scène immersive (photo réaliste 1536×1024)
- 🖥️ **Mode pleine largeur** (plein écran) : la scène immersive remplit toute la largeur de la carte
- 🔃 **Ordre des sections personnalisable** : réorganisez les blocs sous la scène avec ▲ / ▼
- 🌈 **Couleur Tempo de demain** affichée dès qu'elle est connue (badge dédié)
- 🔌 **Mode batterie « stratégie »** : affiche la stratégie Zendure (couplage intelligent, charge/décharge forcée…)
- 🌙 **Mode nuit** automatique avec lune, étoiles et phase lunaire

---

## 📸 Aperçu

| Mode Single (scène immersive) | Mode Séparé (icônes) |
|---|---|
| Scène réaliste avec flux sur l'image | Vue classique avec nœuds animés |

---

## 🚀 Installation

### Via HACS (recommandé)

1. Ouvrez HACS dans Home Assistant
2. Allez dans **Tableau de bord → ⋮ → Dépôts personnalisés**
3. Ajoutez l'URL `https://github.com/zarzak12/custom-solar-flow-card`, catégorie **Tableau de bord**
4. Installez **Solar Flow Card**
5. Rechargez le cache navigateur (Ctrl+Shift+R)

### Installation manuelle

1. Copiez `dist/solar-flow-card.js` dans `/config/www/solar-flow-card/`
2. Copiez le dossier `img/` dans `/config/www/solar-flow-card/img/`
3. Ajoutez la ressource dans **Paramètres → Tableaux de bord → Ressources** :

```yaml
url: /local/solar-flow-card/solar-flow-card.js
type: module
```

4. Rechargez le cache (Ctrl+Shift+R)

> **Structure attendue :**
> ```
> /config/www/solar-flow-card/
> ├── solar-flow-card.js
> └── img/
>     ├── battery.png
>     ├── grid.png
>     ├── house.png
>     ├── house-grid.png
>     ├── house-night.png
>     ├── house-spa.png
>     ├── house-spa-night.png
>     ├── spa.png
>     ├── water_tank.png
>     └── routeur.png
> ```

---

## ⚙️ Configuration minimale

> 🖱️ **Tout se configure depuis l'interface de Home Assistant — aucun YAML nécessaire.**
>
> 1. Ouvrez votre tableau de bord → **Modifier le tableau de bord** → **＋ Ajouter une carte**
> 2. Cherchez **Solar Flow Card** dans la liste des cartes
> 3. Renseignez vos entités directement dans l'**éditeur visuel** (sections dépliables : Général, Images, Production PV, Batterie, État de santé, Économies, EV…)
>
> L'aperçu se met à jour en direct, et la sauvegarde se fait avec le bouton **Enregistrer** natif de HA.

<img width="1206" height="2284" alt="image" src="https://github.com/user-attachments/assets/821e7388-cbb7-4f52-a7c3-77508afd2a31" />


Vous préférez le YAML ? L'équivalent minimal :

```yaml
type: custom:solar-flow-card
latitude: 48.85       # Votre latitude (calcul position soleil)
longitude: 2.35       # Votre longitude
pv_power: sensor.pv_power
grid_power: sensor.grid_power
home_power: sensor.home_power
batt_soc: sensor.battery_soc
```

> Toutes les entités sont optionnelles — la carte s'adapte et masque ce qui n'est pas configuré.

---

## 📋 Référence complète des options

### Général

| Option | Type | Défaut | Description |
|---|---|---|---|
| `title` | string | `Solar Flow` | Titre affiché en haut de la carte |
| `language` | string | `fr` | Langue : `fr` ou `en` |
| `latitude` | number | _(maison HA)_ | Latitude pour le calcul de la position du soleil. Vide = localisation de la maison Home Assistant |
| `longitude` | number | _(maison HA)_ | Longitude. Vide = localisation de la maison Home Assistant |
| `pv_max_watts` | number | `2500` | Puissance crête de l'installation (W) — pour la barre de progression PV |
| `batt_capacity_kwh` | number | `2.4` | Capacité utile de la batterie (kWh) — pour le calcul d'autonomie |
| `pwr_kva` | number | `0` | Puissance souscrite (kVA) — pour le mode calculé de la barre PWR |
| `pwr_mode` | string | `direct` | Source barre PWR : `direct` (entité `pwr_percent`) ou `calc` (réseau ÷ kVA) |
| `refresh_ms` | number | `5000` | Intervalle de rafraîchissement en ms |

### Entités — Production solaire

| Option | Unité | Description |
|---|---|---|
| `pv_power` | W | Puissance PV instantanée |
| `pv_today` | kWh | Énergie produite aujourd'hui |
| `pv_total` | kWh | Énergie totale produite depuis l'installation |
| `pv_month_kwh` | kWh | Énergie produite ce mois (pour les économies mensuelles) |
| `pv_year_kwh` | kWh | Énergie produite cette année (pour les économies annuelles + ROI) |

### Entités — Réseau & Consommation

| Option | Unité | Description |
|---|---|---|
| `grid_power` | W | Puissance réseau — **positif = import**, négatif = export |
| `home_power` | W | Consommation maison instantanée |
| `pwr_percent` | % | Pourcentage de puissance de sortie de l'onduleur |
| `today_load` | kWh | Consommation maison du jour |
| `grid_export_today` | kWh | Énergie injectée sur le réseau aujourd'hui (affine l'autoconso + bloc Conso) |
| `grid_import_today` | kWh | Énergie soutirée du réseau aujourd'hui (bloc Conso / Réseau) |
| `grid_import_month` / `grid_import_year` | kWh | Import réseau mois / année (sous-lignes du bloc Conso) |
| `home_month_kwh` / `home_year_kwh` | kWh | Conso maison mois / année (sous-lignes du bloc Conso) |

> Le bloc **Conso / Réseau** (suivi expert) affiche : **Maison & Réseau instantanés** (± import/export), le **bilan du jour** (Conso, Import, Injection) avec sous-lignes **mois/année**, le **Bilan net réseau** (import − injection) et le **Coût réseau du jour** (import × prix). Chaque tuile/sous-ligne n'apparaît que si son entité est renseignée.
> 👁️ **Visibilité par tuile** : chaque tuile du bloc Conso a son interrupteur (`show_conso_home/grid/day/import/export/net/cost`, défaut activé) → masque les redondances avec la scène (ex. Maison/Réseau instantanés déjà affichés en haut).

### Entités — Batterie

| Option | Unité | Description |
|---|---|---|
| `batt_soc` | % | État de charge (SOC) |
| `batt_bar_mode` | — | Source barre BAT : `soc` (défaut) ou `power` (puissance ÷ limite) |
| `batt_charge_limit` | W | Limite de puissance en charge (entité ou nombre) — mode `power` |
| `batt_discharge_limit` | W | Limite de puissance en décharge (entité ou nombre) — mode `power` |
| `batt_voltage` | V | Tension du pack batterie |
| `batt_power` | W | Puissance de charge/décharge (**positif = charge** ; sinon active `batt_power_invert`) |
| `batt_power_invert` | bool | Inverse le signe de `batt_power` si ton entité fait l'inverse (+ = décharge). Corrige la barre BAT (mode `power`) et le signe ± affiché |
| `batt_mode` | — | Mode batterie. **Capteur 0/1** (`0`/`charge`, `1`/`discharge`) → badge Charge/Décharge. **Select de stratégie** (ex. Zendure `select.zendure_manager_operation`) → affiche le libellé localisé (couplage intelligent, charge/décharge forcée…). Sinon, déduit de `batt_power` ou du bilan PV/maison |
| `batt_temp` | °C | Température BMS |
| `batt_chg_today` | kWh | Énergie chargée aujourd'hui |
| `batt_dis_today` | kWh | Énergie déchargée aujourd'hui |
| `min_cell` | V | Tension de la cellule la plus faible |
| `max_cell` | V | Tension de la cellule la plus haute |
| `remaining` | kWh | Énergie restante (si exposée par l'onduleur) |
| `endurance_entity` | h/min | Temps restant direct (ex. Zendure `remaining_time`) — prioritaire sur le calcul |
| `endurance_unit` | — | Unité de `endurance_entity` : `h` (défaut) ou `min` |

### Entités — État de santé batterie (SOH)

| Option | Unité | Description |
|---|---|---|
| `batt_soh` | % | État de santé direct (si le BMS l'expose) — **Méthode A** |
| `batt_full_kwh` | kWh | Capacité totale réelle (ex. Zendure « Total Battery Capacity ») — **Méthode B** |
| `batt_cycles` | — | Nombre de cycles direct (si le BMS l'expose) |
| `batt_cycles_energy` | kWh | Énergie déchargée cumulée → estimation EFC des cycles |
| `batt_cycles_base` | nombre | Offset de cycles initial ajouté à l'EFC calculé |
| `batt_cycles_max` | nombre | Cycles max constructeur (ex. 6000) → affiche `↻ N / max` |

> La capacité théorique utilisée pour le SOH = `batt_capacity_kwh` (section Général).

### Plusieurs batteries (vue agrégée)

La carte présente **un seul système batterie**. Pour un parc de plusieurs batteries, agrège les entités :

| Donnée | Comment agréger |
|---|---|
| Puissance, énergie chg/dch, déchargée cumulée, énergie restante | **Somme** → plusieurs entités séparées par des **virgules** (ex. `batt_power: sensor.b1_power, sensor.b2_power`) |
| `batt_capacity_kwh`, `batt_full_kwh` | **Somme** (capacité totale du parc) — mets la valeur totale, ou additionne via un capteur template |
| **SOC** (`batt_soc`) | ⚠️ **PAS** de virgule (sommerait les %). Utilise un capteur **moyenne pondérée** (voir ci-dessous) |
| Tension | une seule batterie (parallèle ≈ même tension) ou moyenne |
| Température BMS | max ou moyenne via template |

Exemple de SOC moyen **pondéré par la capacité** :
```yaml
template:
  - sensor:
      - name: "Parc batterie SOC"
        unit_of_measurement: "%"
        device_class: battery
        state: >
          {% set ns = namespace(num=0, cap=0) %}
          {% set batts = [
            ['sensor.b1_soc', 5.0],
            ['sensor.b2_soc', 5.0],
            ['sensor.b3_soc', 2.4] ] %}
          {% for ent, c in batts %}
            {% set ns.num = ns.num + (states(ent)|float(0) * c) %}
            {% set ns.cap = ns.cap + c %}
          {% endfor %}
          {{ (ns.num / ns.cap) | round(1) if ns.cap > 0 else 0 }}
```
Puis `batt_soc: sensor.parc_batterie_soc`. (Pour 2 batteries identiques, une simple moyenne suffit.)

### Entités — Météo & Soleil

| Option | Description |
|---|---|
| `weather` | Entité météo HA (`weather.maison`) — condition + fond de ciel dynamique |
| `ext_temp` | Température extérieure (`sensor.temp_ext`) |
| `sun_elevation` | Élévation du soleil en degrés (optionnel — calculé si absent) |
| `sun_azimuth` | Azimut du soleil en degrés (optionnel) |
| `sun_rise` | Heure de lever (optionnel). Sinon, la carte utilise **automatiquement** `sun.sun` (`next_rising`) s'il existe, puis le calcul interne |
| `sun_set` | Heure de coucher (optionnel). Idem : `sun.sun` (`next_setting`) en repli automatique |
| `moon_phase` | Phase lunaire (`sensor.moon_phase`) — affiche l'emoji de phase la nuit |

> 🌅 **Lever/coucher** : ordre de priorité = entités `sun_rise`/`sun_set` → attributs de **`sun.sun`** (intégration *Soleil* de HA, exact TZ/DST) → calcul interne depuis les coordonnées. Si tu as l'intégration Soleil, les heures sont donc justes sans rien configurer.

### Entités — Prévision de production

| Option | Description |
|---|---|
| `pv_forecast_today` | Production prévue aujourd'hui (kWh) — affichée en haut à gauche du ciel |
| `pv_forecast_tomorrow` | Production prévue demain (kWh) — optionnel |

### Entités — Véhicule électrique (EV)

| Option | Description |
|---|---|
| `ev_enabled` | Active la section EV (true/false) |
| `ev_label` | Nom affiché du véhicule |
| `ev_power` | Puissance charge/V2H (W) — positif = charge, négatif = V2H (décharge vers maison) |
| `ev_soc` | SOC batterie du véhicule (%) — optionnel |
| `ev_max_kwh` | Capacité batterie du véhicule (kWh) — optionnel |

---

## 🌤️ Météo dynamique

La carte génère un **rendu visuel complet** selon la condition météo reçue :

| Condition | Ciel | Nuages | Effets |
|---|---|---|---|
| `sunny` | Bleu profond | Quasi invisibles | — |
| `partlycloudy` | **Bleu voilé** | Bien visibles (opacité max) | — |
| `cloudy` | Gris moyen | Présents | — |
| `rainy` | Gris-bleu lourd | Présents | 🌧️ 40 gouttes animées (rotate 12°) |
| `pouring` | Gris-bleu lourd | Présents | 🌧️ 70 gouttes, plus rapides |
| `snowy` | Gris perle | Présents | ❄️ 45 flocons avec dérive latérale |
| `fog` | Blanc-gris laiteux | — | — |
| `lightning` / `lightning-rainy` | Violet sombre | Présents | ⚡ Flash lumineux aléatoires (4–13s) |

Le ciel change aussi selon **l'élévation solaire** : lever orangé, zénith bleu vif, coucher rougeoyant.

---

## 🎬 Mode Scène

### Mode `separate` (défaut)

Vue classique avec icônes PNG séparées, flux animés et nœuds distincts.

### Mode `single` — Scène immersive

Une grande photo (1536×1024) avec les flux SVG superposés directement sur l'image.

```yaml
img_scene_mode: single
img_scene_variant: esc_ev   # ou esc_spa
scene_full_width: false     # true = scène pleine largeur (plein écran)
```

| Option | Description |
|---|---|
| `img_scene_mode` | `separate` ou `single` |
| `scene_full_width` | `false` (défaut) ou `true` — la scène single remplit toute la largeur de la carte (idéal mur/tablette plein écran) |
| `img_scene_variant` | `esc_ev` (voiture électrique) ou `esc_spa` (spa/jacuzzi) |
| `img_scene_day` | URL de l'image de jour |
| `img_scene_night` | URL de l'image de nuit |
| `img_scene_day_ev` | Image de jour variante EV |
| `img_scene_night_ev` | Image de nuit variante EV |
| `img_scene_day_spa` | Image de jour variante Spa |
| `img_scene_night_spa` | Image de nuit variante Spa |

---

## 🔋 Batterie animée (GSAP)

La batterie utilise des animations GSAP pour un rendu professionnel :

| État | Couleur | Niveau | Glow | Bulles |
|---|---|---|---|---|
| **Neutre** | Bleu cyan | Monte/descend avec physique élastique | — | — |
| **Charge** | Vert néon | Montée avec rebond élastique | 💚 Halo vert pulsé (0.8s) | ✅ Bulles vertes ascendantes |
| **Décharge** | Orange | Descente fluide | 🟠 Halo orange lent (1.1s) | — |
| **Critique** (<15%) | Rouge | — | 🔴 Flash rouge urgent (0.3s) | — |

> 🌊 En mode single, la surface du liquide ondule avec **3 vagues sinusoïdales animées** (`gsap.ticker`). La **couleur suit le niveau de charge** en continu : 🔴 rouge → 🟠 orange → 🟡 jaune → 🟢 vert.

---

## 📈 Autoconsommation & autoproduction

Deux jauges colorées calculées à partir des entités déjà configurées (aucune nouvelle entité) :

| Indicateur | Formule | Sens |
|---|---|---|
| **Autoconsommation** | `(pv_today − grid_export_today) / pv_today` | part du solaire produit que tu consommes (vs revendu) |
| **Autoproduction** (autosuffisance) | `(pv_today − grid_export_today) / today_load` | part de ta conso couverte par le solaire |

> Nécessite `pv_today` + `grid_export_today` (+ `today_load` pour l'autoproduction). Couleur : 🟢 ≥ 70 % · 🟡 40-70 % · 🔴 < 40 %. Masquable via `show_autoconso`.

---

## 🩺 État de santé batterie (SOH)

Affiche le **State of Health** (santé de la batterie) avec une barre colorée, la capacité réelle vs théorique, et une estimation des cycles.

```
🩺 ÉTAT DE SANTÉ BATTERIE
SOH       [████████░░] 95 %
Capacité  5.6 / 5.9 kWh        ↻ 78
```

### SOH — deux méthodes

| Méthode | Config | Calcul |
|---|---|---|
| **A — entité directe** | `batt_soh` | utilise le % renvoyé par le BMS |
| **B — capacité réelle** | `batt_full_kwh` | `SOH = capacité_réelle ÷ batt_capacity_kwh × 100` |

> Couleur de la barre : 🟢 ≥ 90 % · 🟡 80–90 % · 🔴 < 80 %

### Cycles — trois cas (par priorité)

1. **Capteur direct** : `batt_cycles`
2. **Estimation EFC** (Equivalent Full Cycles) : `cycles = batt_cycles_base + énergie_déchargée_cumulée ÷ batt_capacity_kwh`
3. Rien configuré → ligne masquée

```yaml
# Exemple Zendure (pas de capteur SOH/cycles direct)
batt_capacity_kwh:  5.76                                      # capacité nominale (section Général)
batt_full_kwh:      sensor.solarflow_2400_ac_battery_capacity # "Total Battery Capacity"
batt_cycles_energy: sensor.solarflow_2400_ac_total_decharges  # "Total décharges" (kWh cumulés)
batt_cycles_base:   0                                          # offset si cycles déjà effectués
batt_cycles_max:    6000                                       # cycles max constructeur → "↻ 78 / 6000"
```

> L'EFC compte l'énergie réellement déchargée rapportée à la capacité (méthode standard d'usure), plus juste que compter chaque charge partielle.

---

## 🔌 Routeurs solaires

Jusqu'à **4 routeurs** pour visualiser les charges pilotées (spa, chauffe-eau, résistance…).

```yaml
router1_enabled: true
router1_label: Spa
router1_img: /local/solar-flow-card/img/spa.png
router1_mode: power              # 'power' ou 'calc'
router1_power: sensor.spa_power  # en mode 'power'

# Mode 'calc' pour routeurs F1ATB (ouverture en %)
# router1_mode: calc
# router1_resistance_w: 3000     # puissance nominale de la résistance
# router1_opening: sensor.routeur_ouverture  # % d'ouverture
```

| Option | Description |
|---|---|
| `router_N_enabled` | Active le routeur N (true/false) |
| `router_N_label` | Nom affiché |
| `router_N_img` | Image (chemin ou URL) |
| `router_N_mode` | `power` (lecture directe W) ou `calc` (résistance × ouverture) |
| `router_N_power` | Entité puissance en W |
| `router_N_resistance_w` | Puissance nominale de la résistance (mode `calc`) |
| `router_N_opening` | Entité % ouverture 0-100 (mode `calc`) |
| `router_N_energy` | Entité énergie du **jour** en kWh |
| `router_N_energy_month` | Entité énergie du **mois** (kWh) — section Routeurs |
| `router_N_energy_year` | Entité énergie de l'**année** (kWh) |
| `router_N_energy_total` | Entité énergie **totale** cumulée (kWh) |
| `router_N_temp` | Entité température eau (routeur 1, mode single) — ex. spa |
| `router_N_position` | Position : `left`, `center`, `right` |
| `router_N_color` | Couleur du flux néon + de la valeur (défaut `#FFA040`) |
| `router_scene_mode` | Scène **mode séparé** : `spread` (un nœud par routeur, défaut) ou `sum` (un seul nœud additionné) |

> En **mode single**, le routeur 1 = spa et le routeur 2 = ballon d'eau chaude (positions fixes dans l'image). Les routeurs **3 et 4** n'apparaissent pas dans la scène single mais sont affichés dans la **section Routeurs** (puissance + énergie).

### Section « Routeurs » (énergie)

Une section dédiée affiche un **badge par routeur actif** (largeur responsive : 1 → un grand badge, 2 → deux, etc.) : **puissance** en grand + énergie **jour / mois / année / total** en sous-ligne.

> 🔋 **Énergie du jour sans capteur** : si `router_N_energy` n'est pas renseigné, la carte **estime elle-même les kWh du jour** en intégrant la puissance (affiché `Jour ~X kWh`). Pratique pour un routeur F1ATB en mode `calc`. ⚠️ Estimation côté navigateur : ne compte que pendant que le dashboard est ouvert (remise à zéro à minuit). Pour des kWh fiables/historisés (et mois/année/total), crée les capteurs côté HA.

> ⚡ **Routeur F1ATB (ouverture en %) ?** Deux modes possibles :
> - **`calc`** — la carte calcule la puissance (`résistance × ouverture %`) **et estime les kWh du jour**, sans rien créer.
> - **`power` + capteurs** — pour des kWh fiables jour/mois/année/total : voir le guide **[Créer les capteurs F1ATB](docs/CAPTEURS-F1ATB.md)**.

### Section « Véhicule électrique »

Si `ev_enabled`, une section dédiée affiche **état** (Charge / V2H / Repos), **puissance** (±), **SOC** et **batterie** (kWh actuels / capacité).

---

## 💰 Économies & ROI

### Principe de calcul

Contrairement à un simple `kWh × prix`, la carte accumule les économies **delta par delta** :

```
Chaque rafraîchissement (5s) :
  Δ_kWh = pv_today - pv_today_précédent
  économies += Δ_kWh × prix_au_moment_exact
```

Ainsi, si le prix Tempo passe de HC à HP à 6h00, chaque kWh produit est valorisé au bon tarif.

### 4 modes de tarification (`price_mode`)

Choisissez **un seul mode** dans l'éditeur. Selon le mode, seuls les champs concernés s'affichent.

| Mode | `price_mode` | Champs utilisés |
|---|---|---|
| 💶 Prix fixe | `fixed` | `electricity_price` |
| 🕐 Heures Pleines / Creuses | `hphc` | `hp_price`, `hc_price`, `hc_start`, `hc_end` |
| 🌈 Tempo EDF | `tempo` | `tempo_color` + 6 prix (Bleu/Blanc/Rouge × HC/HP) |
| 🔗 Entité dynamique | `entity` | `price_entity` |

### Configuration

```yaml
# ── Mode de tarification ──
price_mode: hphc          # 'fixed' | 'hphc' | 'tempo' | 'entity'

# Mode 'fixed'
electricity_price: 0.23   # €/kWh

# Mode 'hphc' (Heures Pleines / Creuses)
hp_price: 0.27            # €/kWh heures pleines
hc_price: 0.20            # €/kWh heures creuses
hc_start: 22             # heure de début des HC (0-23)
hc_end:   6              # heure de fin des HC (0-23)

# Mode 'entity' (prix dynamique)
price_entity: sensor.prix_kwh_actuel

# Mode 'tempo' (Tempo EDF)
tempo_color: sensor.rte_tempo_color   # entité retournant BLUE/WHITE/RED
tempo_color_tomorrow: ''  # (optionnel) couleur de DEMAIN — vide = détection auto via
                          #   l'attribut tomorrow/next_color de l'entité ci-dessus
tempo_blue_hc:  0.1296    # Prix Tempo Bleu HC  (modifiables chaque année)
tempo_blue_hp:  0.1609    # Prix Tempo Bleu HP
tempo_white_hc: 0.1470    # Prix Tempo Blanc HC
tempo_white_hp: 0.1894    # Prix Tempo Blanc HP
tempo_red_hc:   0.1568    # Prix Tempo Rouge HC
tempo_red_hp:   0.7562    # Prix Tempo Rouge HP ← attention au choc !

# ── Données de production (communes à tous les modes) ──
grid_export_today: sensor.energie_injectee   # affine l'autoconsommation
pv_month_kwh: sensor.pv_energie_mois
pv_year_kwh:  sensor.pv_energie_annee

# ── Revente du surplus (export rémunéré) ──
export_paid:  true                      # active la revente
export_price: 0.10                      # €/kWh prix de rachat du surplus
grid_export_month: sensor.export_mois   # (optionnel) revenu mensuel
grid_export_year:  sensor.export_annee  # (optionnel) revenu annuel + ROI

# ROI (visible si install_cost OU batt_cost > 0, ET pv_year_kwh configuré)
install_cost: 8000        # € coût PV / panneaux
batt_cost:    4000        # € coût batterie (ajouté au coût PV → ROI global)
install_date: '2023-04-15'  # date de mise en service (départ du ROI, affiche départ → atterrissage)

# Économies batterie dédiées (arbitrage) — facultatif
# ⚠️ Ne renseigner batt_savings_price QUE si la batterie est chargée depuis le réseau
#    (heures creuses). Sinon l'énergie solaire est déjà comptée côté PV (double comptage).
batt_savings_kwh:   sensor.batterie_decharge_totale   # kWh déchargés cumulés (vide → réutilise l'entité cycles de l'état de santé)
batt_savings_price: 0.20                              # €/kWh valorisation de la décharge (vide = pas d'économies batterie comptées)

# CO₂
co2_factor: 0.4           # kg CO₂/kWh évités (mix français 2024)
```

> Les modes **HP/HC** et **Tempo** utilisent la plage `hc_start`/`hc_end` (défaut 22h→6h, gère le passage de minuit) pour déterminer HC vs HP.

### Ce qui s'affiche

- **Aujourd'hui** : économies (autoconsommation) **+ revenu de revente** (si `export_paid`) + kg CO₂ évités
- **Ce mois** : économies × prix + revente (si `grid_export_month`)
- **Cette année** : économies × prix + revente (si `grid_export_year`) + CO₂
- **🔋 Batterie** (si `batt_savings_price` renseigné) : économies cumulées d'arbitrage = énergie déchargée cumulée × valorisation €/kWh
- **ROI global** — coût pris en compte = `install_cost` (PV) **+** `batt_cost` (batterie) :
  - Si `pv_total` (énergie produite depuis l'installation) est renseignée → **amortissement réel** : économies déjà cumulées (production PV × bénéfice/kWh **+** économies batterie) ÷ coût total. La barre progresse avec l'âge de l'installation et affiche le **temps restant**, puis « **Amorti ✓ + gain net** » une fois le coût remboursé.
  - Sinon → **projection théorique** : coût total ÷ bénéfice annuel combiné = « années pour rentabiliser ».
  - **Dates** : une ligne `📅 départ → atterrissage estimé` s'affiche sous le ROI. Le **départ** = `install_date` si renseignée, sinon **estimé automatiquement** depuis `pv_total ÷ production annuelle` (préfixe `~`). Une fois remboursé : `📅 départ → amorti ~<date> · +<bénéfice net>` (barre pleine, « Amorti ✓ »).
  - **Rythme du temps restant** : si `install_date` est renseignée, le rythme annuel = **cumul ÷ âge** (cohérent avec le Total, fiable même si ton capteur « cette année » est partiel/créé en cours d'année). Sinon → capteur « cette année » annualisé.

> 🔗 **Plusieurs onduleurs / batteries** : dans **tout champ numérique** (ex. `pv_total`, `pv_power`, `pv_today`, `batt_power`, `batt_savings_kwh`…), saisis **plusieurs entités séparées par des virgules** — elles sont **additionnées**. Exemple : `pv_total: sensor.pv1_total, sensor.pv2_total, sensor.pv3_total`. ⚠️ Ne s'applique pas au **SOC** (`batt_soc`, un pourcentage) : utilise un seul capteur ou une moyenne via un capteur template.

> 💶 **Économies vs revenu** : l'autoconsommation est valorisée au prix que tu **évites de payer** (`electricity_price`/Tempo/HP-HC), le surplus exporté au prix de **revente** (`export_price`). Les deux sont additionnés dans les totaux.

> ⏱️ **Économie du jour & variation tarifaire** : l'économie du jour est accumulée **en continu**, chaque kWh autoconsommé étant valorisé au tarif **du moment** (HC/HP/Tempo) → la journée somme bien HC + HP + HC. L'état est **persisté** (localStorage) pour survivre aux rechargements de page. Limite : la production faite **avant** le premier chargement du dashboard de la journée est estimée au prix courant (pas d'historique par tranche horaire) ; garde le dashboard ouvert ou recharge tôt pour une précision maximale.

> 📐 **Pour des économies € fiables et historisées** (jour / mois / an / total, tous tarifs), calcule-les côté Home Assistant : voir le guide **[Créer ses capteurs d'économies](docs/CAPTEURS-ECONOMIES.md)** (prix fixe, HP/HC, Tempo, dynamique…).

### Source des économies (`savings_mode`)

Deux modes au choix dans l'éditeur (section *Économies & Tarification → Source des économies*) :

| `savings_mode` | Comportement |
|---|---|
| `calc` *(défaut)* | La carte calcule les € à partir des entités de production (kWh) × prix. Aucun capteur supplémentaire requis. |
| `entity` | La carte **affiche directement** des capteurs € que tu as créés dans HA (voir le [guide](docs/CAPTEURS-ECONOMIES.md)) — le plus précis. |

En mode `entity`, renseigne les entités :
```yaml
savings_mode:         entity
savings_day_entity:   sensor.economies_jour
savings_month_entity: sensor.economies_mois
savings_year_entity:  sensor.economies_annee
savings_total_entity: sensor.economies_totales   # utilisé pour le ROI
```
> Le mode de tarification (prix fixe / Tempo…) ne sert alors qu'au **badge prix/Tempo** ; les montants viennent des capteurs.

> **Note Tempo** : les plages HC/HP utilisées sont les heures standard EDF (HC : 22h–6h, HP : 6h–22h). La production solaire étant 100% diurne, elle tombe quasi-toujours en HP — le calcul est donc très fidèle même après un rechargement de page.

> 🌈 **Couleur de demain** : si `tempo_color_tomorrow` est renseigné (ou si l'entité `tempo_color` expose un attribut `tomorrow`/`next_color`), un second badge « Demain : 🔵/⚪/🔴 » apparaît à côté de celui du jour, dès que la couleur du lendemain est connue (≈ 11h). Il se masque automatiquement si elle est inconnue.

---

## 🎨 Personnalisation

### Couleurs

```yaml
color_solar:   '#FFD700'   # Jaune solaire (flux PV)
color_grid:    '#4FC3F7'   # Bleu cyan (réseau)
color_battery: '#69FF47'   # Vert néon (batterie)
color_home:    '#FF6B6B'   # Rouge-rose (consommation maison)
color_ev:      '#4FC3F7'   # Flux voiture électrique (EV)
color_bg:      '#060d1a'   # Fond de la carte
```

### Images personnalisées

```yaml
img_house:   /local/solar-flow-card/img/mon-image.png
img_battery: /local/solar-flow-card/img/ma-batterie.png
img_grid:    /local/solar-flow-card/img/mon-compteur.png
```

### Overlays optionnels (mode séparé)

Des images supplémentaires superposées à la scène :

```yaml
img_overlay1: /local/solar-flow-card/img/voiture.png
img_overlay1_label: Voiture
img_overlay2: /local/solar-flow-card/img/piscine.png
img_overlay2_label: Piscine
```

### Tailles d'affichage (curseurs)

Trois curseurs dans l'éditeur (section **🔎 Tailles d'affichage**) ajustent l'échelle de toute la carte :

```yaml
scale_flux:  1.0   # épaisseur des flux d'énergie (0.5 → 2.0)
scale_label: 1.0   # taille des libellés : RÉSEAU, MAISON, SOH… (0.6 → 1.8)
scale_value: 1.0   # taille des valeurs chiffrées : 547 W, 95 %… (0.6 → 1.8)
```

> Ces échelles s'appliquent partout : scène (mode single), batterie, onduleur, économies, état de santé, barres de progression.

### Options d'affichage

```yaml
show_progress_bars: true   # Barres PV / PWR / BAT
show_mode:         true    # Tuile Mode (bloc Batterie)
show_bms_temp:     true    # Tuile Température BMS (bloc Batterie)
show_total_pv:     true    # Tuile CO₂ évité du jour (bloc PV)
show_cells:        true    # Tensions min/max cellules (bloc Batterie)
show_endurance:    true    # Autonomie estimée (bloc Batterie)
show_autoconso:    true    # Barres Autoconso / Autoprod (bloc PV)
show_health:       true    # Bloc État de santé batterie (SOH + cycles)
show_savings:      true    # Bloc Économies & ROI
show_images:       true    # Images (false = fallback émojis)
details_on_click:  true    # Clic sur une zone → panneau récap des entités liées

# Visibilité fine des tuiles du bloc Conso / Réseau (anti-doublon avec la scène)
show_conso_home:   true    # Maison instantanée
show_conso_grid:   true    # Réseau instantané
show_conso_day:    true    # Conso du jour
show_conso_import: true    # Import du jour
show_conso_export: true    # Injection du jour
show_conso_net:    true    # Bilan net réseau
show_conso_cost:   true    # Coût réseau du jour
```

### Ordre des sections

Réorganisez l'ordre d'affichage des blocs sous la scène depuis l'éditeur (section **🔃 Ordre des sections**, boutons ▲ / ▼) ou en YAML via `section_order` :

```yaml
section_order:
  - bars        # Barres PV / PWR / BAT
  - pv          # PV / Solaire (PV jour, PV total, CO₂, autoconso/autoprod)
  - conso       # Conso / Réseau (conso jour, injection)
  - battery     # Batterie (mode, restant, charge/décharge, cellules, autonomie)
  - health      # État de santé batterie (SOH, capacité, cycles)
  - routers     # Routeurs (énergie)
  - savings     # Économies & ROI
  - ev          # Véhicule électrique
```

> Toute clé omise est ajoutée automatiquement à la fin (rien ne disparaît). Une section masquée par son toggle `show_*` reste absente quel que soit son rang. L'en-tête et la scène restent fixes en haut.

### Titres des sections

Personnalisez le titre de **chaque** section depuis l'éditeur (section **🏷️ Titres des sections**) ou en YAML :

```yaml
# « Barres » n'a pas d'en-tête par défaut → un titre n'apparaît que si tu le renseignes
title_bars:    Puissances

# Les autres blocs ont un en-tête → vide = libellé par défaut traduit
title_pv:      PV / Solaire        # défaut : « PV / Solaire »
title_conso:   Conso / Réseau      # défaut : « Conso / Réseau »
title_battery: Batterie            # défaut : « Batterie »
title_health:  Santé batterie      # défaut : « État de santé batterie »
title_routers: Mes routeurs        # défaut : « Routeurs »
title_savings: Mes économies       # défaut : « Économies & ROI »
title_ev:      Voiture             # défaut : « Véhicule électrique »
```

> Seul **Barres** est sans en-tête d'origine (titre affiché uniquement si saisi). Pour les autres blocs, laisser vide garde le libellé par défaut.

---

## 🧮 Calcul d'autonomie

```
Énergie disponible = SOC% × batt_capacity_kwh
Autonomie (h)      = Énergie disponible ÷ conso_maison (kW)
Heure de fin       = maintenant + autonomie
```

> Le calcul suppose une consommation constante et aucune recharge solaire future. Il s'affiche uniquement si `home_power > 50 W` et `batt_soc > 0`.
>
> 💡 **Mieux** : si tu renseignes `endurance_entity` (ex. Zendure `sensor.solarflow_2400_ac_remaining_time`), cette valeur **réelle** remplace le calcul théorique. Précise l'unité via `endurance_unit` (`h` ou `min`).

---

## 📝 Exemple complet

```yaml
type: custom:solar-flow-card
title: Ma Maison Solaire
language: fr
latitude: 43.60
longitude: 3.87
pv_max_watts: 6000
batt_capacity_kwh: 10.24
refresh_ms: 5000

# ── Production ──
pv_power:   sensor.pv_puissance
pv_today:   sensor.pv_energie_jour
pv_total:   sensor.pv_energie_totale
pv_month_kwh: sensor.pv_energie_mois
pv_year_kwh:  sensor.pv_energie_annee

# ── Réseau & Maison (bloc Conso) ──
grid_power:        sensor.puissance_reseau
home_power:        sensor.consommation_maison
pwr_percent:       sensor.onduleur_puissance_pct
today_load:        sensor.conso_maison_jour
home_month_kwh:    sensor.conso_maison_mois
home_year_kwh:     sensor.conso_maison_annee
grid_export_today: sensor.energie_injectee
grid_import_today: sensor.energie_soutiree
grid_import_month: sensor.import_reseau_mois
grid_import_year:  sensor.import_reseau_annee
# Anti-doublon : Maison/Réseau instantanés déjà dans la scène
show_conso_home: false
show_conso_grid: false

# ── Batterie ──
batt_soc:       sensor.soc_batterie
batt_voltage:   sensor.tension_batterie
batt_power:     sensor.puissance_batterie
batt_mode:      sensor.mode_batterie
batt_temp:      sensor.temp_bms
batt_chg_today: sensor.charge_batt_jour
batt_dis_today: sensor.decharge_batt_jour
min_cell:       sensor.cellule_min
max_cell:       sensor.cellule_max

# ── État de santé batterie ──
batt_full_kwh:      sensor.capacite_totale_reelle   # ou entité SOH directe via batt_soh
batt_cycles_energy: sensor.decharge_totale_cumulee
batt_cycles_base:   0

# ── Météo ──
weather:    weather.maison
ext_temp:   sensor.temperature_exterieure
moon_phase: sensor.moon_phase

# ── Prévision de production ──
pv_forecast_today:    sensor.solcast_pv_aujourdhui
pv_forecast_tomorrow: sensor.solcast_pv_demain

# ── Scène ──
img_scene_mode:    single
img_scene_variant: esc_ev

# ── Tarification Tempo EDF ──
price_mode:     tempo
tempo_color:    sensor.rte_tempo_color
tempo_blue_hc:  0.1296
tempo_blue_hp:  0.1609
tempo_white_hc: 0.1470
tempo_white_hp:  0.1894
tempo_red_hc:   0.1568
tempo_red_hp:   0.7562
install_cost:   12000
batt_cost:      4000
install_date:   '2023-04-15'   # ROI : rythme = cumul ÷ âge (départ → atterrissage)
batt_savings_price: 0.20
co2_factor:     0.4

# ── Routeur 1 : Spa (avec température eau) ──
router1_enabled: true
router1_label:   Spa
router1_img:     /local/solar-flow-card/img/spa.png
router1_mode:    power
router1_power:   sensor.puissance_spa
router1_temp:    sensor.temperature_spa

# ── Routeur 2 : Chauffe-eau ──
router2_enabled:      true
router2_label:        Chauffe-eau
router2_img:          /local/solar-flow-card/img/water_tank.png
router2_mode:         calc
router2_resistance_w: 2000
router2_opening:      sensor.routeur_ouverture

# ── Véhicule électrique ──
ev_enabled: true
ev_label:   Voiture
ev_power:   sensor.puissance_ev
ev_soc:     sensor.soc_ev

# ── Couleurs personnalisées ──
color_solar:   '#FFD700'
color_grid:    '#4FC3F7'
color_battery: '#69FF47'
color_home:    '#FF6B6B'
```

---

## ❓ FAQ

**La carte ne s'affiche pas ?**
→ Vérifiez que le fichier JS est bien dans `/config/www/` et que la ressource Lovelace est enregistrée. Videz le cache (Ctrl+Shift+R).

**Le soleil ne bouge pas ?**
→ Vérifiez `latitude` et `longitude`. Si vous utilisez des entités `sun_elevation`/`sun_azimuth`, assurez-vous qu'elles retournent des nombres.

**Le ciel reste gris même par beau temps ?**
→ Vérifiez que l'entité `weather` est bien une entité de type `weather.*` et que sa condition retourne `sunny` ou `partlycloudy`.

**Les économies affichent 0 € ?**
→ `pv_today` doit être une entité qui retourne des kWh (nombre décimal). Vérifiez aussi que `electricity_price` est > 0.

**Le Tempo ne s'affiche pas ?**
→ L'entité `tempo_color` doit retourner `BLUE`, `WHITE` ou `RED` (majuscules ou minuscules). Vérifiez avec l'intégration [RTE France](https://github.com/hekmon/rtetempo).

**Les flux ne s'animent pas ?**
→ GSAP se charge depuis CDN au premier chargement. Les animations CSS de base fonctionnent en attendant. Vérifiez votre connexion internet.

**Mode single : les flux ne correspondent pas à ma scène ?**
→ Le SVG overlay est calé sur une image 1536×1024. Si vous utilisez une image personnalisée, les chemins de flux peuvent ne pas correspondre à vos éléments visuels.

---

## 🙏 Crédits

- Inspiré de [Lumina Energy Card](https://github.com/...)
- Animations de flux : [GSAP](https://gsap.com/) + DrawSVGPlugin
- Icônes météo : natifs Unicode / emoji
- Images de scène : générées par IA

---

## 📜 Licence

MIT — libre d'utilisation, de modification et de distribution.
