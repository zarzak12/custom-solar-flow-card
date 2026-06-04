# ☀️ Solar Flow Card

**🇫🇷 Français** · [🇬🇧 English](README.en.md)

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)
![Version](https://img.shields.io/badge/version-1.0.76-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

[![Ouvrir dans Home Assistant et ajouter ce dépôt à HACS](https://my.home-assistant.io/badges/hacs_repository.svg)][install]

[install]: https://my.home-assistant.io/redirect/hacs_repository/?owner=zarzak12&repository=custom-solar-flow-card&category=frontend

> Carte Lovelace pour Home Assistant qui transforme vos données solaires en une visualisation vivante, animée et enrichie d'économies en temps réel.
>
> <img width="804" height="2158" alt="image" src="https://github.com/user-attachments/assets/43ded533-957e-4d71-b6fe-82d897793668" />


---

## ✨ Ce que ça fait

Solar Flow Card affiche en temps réel **tous vos flux d'énergie** sur une scène immersive :

- 🌞 **Arc solaire** animé avec position calculée depuis votre latitude/longitude (ou via entités HA)
- ⚡ **Flux animés** entre production PV, réseau, maison, batterie et routeurs solaires (GSAP)
- 🔋 **Batterie liquide** avec physique élastique GSAP, bulles de charge ascendantes et halo coloré
- 🌦️ **Météo dynamique** — ciel bleu → partiellement nuageux → couvert → pluie → neige → orage avec effets de particules
- 💰 **Économies & ROI** — calcul delta en temps réel avec prix au moment exact de la production
- 💶 **4 modes de tarification** : prix fixe, Heures Pleines/Creuses, Tempo EDF, ou entité dynamique
- 🔮 **Prévision de production** affichée en haut du ciel (Solcast / Forecast.Solar)
- 🚗 **Véhicule électrique** avec flux bidirectionnel charge / V2H et SOC
- 🩺 **État de santé batterie (SOH)** avec barre colorée et estimation des cycles
- 🔎 **Tailles ajustables** par curseurs : épaisseur des flux, taille des libellés et des valeurs
- 🎨 **Deux modes de scène** : vue séparée (icônes) ou scène immersive (photo réaliste 1536×1024)
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
| `latitude` | number | `44.35` | Latitude pour le calcul de la position du soleil |
| `longitude` | number | `2.57` | Longitude |
| `pv_max_watts` | number | `2500` | Puissance crête de l'installation (W) — pour la barre de progression PV |
| `batt_capacity_kwh` | number | `2.4` | Capacité utile de la batterie (kWh) — pour le calcul d'autonomie |
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
| `grid_export_today` | kWh | Énergie injectée sur le réseau aujourd'hui (affine le calcul d'autoconsommation) |

### Entités — Batterie

| Option | Unité | Description |
|---|---|---|
| `batt_soc` | % | État de charge (SOC) |
| `batt_voltage` | V | Tension du pack batterie |
| `batt_power` | W | Puissance de charge/décharge (positif = charge) |
| `batt_mode` | — | Mode : `0`/`charge` ou `1`/`discharge` |
| `batt_temp` | °C | Température BMS |
| `batt_chg_today` | kWh | Énergie chargée aujourd'hui |
| `batt_dis_today` | kWh | Énergie déchargée aujourd'hui |
| `min_cell` | V | Tension de la cellule la plus faible |
| `max_cell` | V | Tension de la cellule la plus haute |
| `remaining` | kWh | Énergie restante (si exposée par l'onduleur) |

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

### Entités — Météo & Soleil

| Option | Description |
|---|---|
| `weather` | Entité météo HA (`weather.maison`) — condition + fond de ciel dynamique |
| `ext_temp` | Température extérieure (`sensor.temp_ext`) |
| `sun_elevation` | Élévation du soleil en degrés (optionnel — calculé si absent) |
| `sun_azimuth` | Azimut du soleil en degrés (optionnel) |
| `sun_rise` | Heure de lever (optionnel — calculé si absent) |
| `sun_set` | Heure de coucher (optionnel) |
| `moon_phase` | Phase lunaire (`sensor.moon_phase`) — affiche l'emoji de phase la nuit |

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
```

| Option | Description |
|---|---|
| `img_scene_mode` | `separate` ou `single` |
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

> 🌊 En mode single, la surface du liquide ondule avec de vraies **vagues sinusoïdales animées** (`gsap.ticker`) qui suivent le niveau de charge/décharge.

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

Jusqu'à **3 routeurs** pour visualiser les charges pilotées (spa, chauffe-eau, résistance…).

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
| `router_N_energy` | Entité énergie du jour en kWh |
| `router_N_temp` | Entité température eau (routeur 1, mode single) — ex. spa |
| `router_N_position` | Position : `left`, `center`, `right` |

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

# ROI (visible uniquement si install_cost > 0 ET pv_year_kwh configuré)
install_cost: 8000        # € coût de l'installation

# CO₂
co2_factor: 0.4           # kg CO₂/kWh évités (mix français 2024)
```

> Les modes **HP/HC** et **Tempo** utilisent la plage `hc_start`/`hc_end` (défaut 22h→6h, gère le passage de minuit) pour déterminer HC vs HP.

### Ce qui s'affiche

- **Aujourd'hui** : économies accumulées depuis minuit + kg CO₂ évités
- **Ce mois** : économies × prix actuel (si `pv_month_kwh` configuré)
- **Cette année** : économies × prix actuel + CO₂ en kg ou tonnes (si `pv_year_kwh`)
- **ROI** : barre de progression + années de retour sur investissement

> **Note Tempo** : les plages HC/HP utilisées sont les heures standard EDF (HC : 22h–6h, HP : 6h–22h). La production solaire étant 100% diurne, elle tombe quasi-toujours en HP — le calcul est donc très fidèle même après un rechargement de page.

---

## 🎨 Personnalisation

### Couleurs

```yaml
color_solar:   '#FFD700'   # Jaune solaire (flux PV)
color_grid:    '#4FC3F7'   # Bleu cyan (réseau)
color_battery: '#69FF47'   # Vert néon (batterie)
color_home:    '#FF6B6B'   # Rouge-rose (consommation maison)
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
show_progress_bars: true   # Barres PV / PWR / BAT en bas de scène
show_mode:         true    # Badge mode (Veille / Charge / Décharge)
show_bms_temp:     true    # Température BMS
show_total_pv:     true    # Carte CO₂ évité du jour
show_cells:        true    # Tensions min/max cellules + delta
show_endurance:    true    # Autonomie estimée de la batterie
show_inverter:     true    # Section Onduleur (PV jour, Chg/Dch, Restant, Conso jour)
show_savings:      true    # Section Économies & ROI
show_health:       true    # Section État de santé batterie (SOH + cycles)
show_images:       true    # Images (false = fallback émojis)
```

---

## 🧮 Calcul d'autonomie

```
Énergie disponible = SOC% × batt_capacity_kwh
Autonomie (h)      = Énergie disponible ÷ conso_maison (kW)
Heure de fin       = maintenant + autonomie
```

> Le calcul suppose une consommation constante et aucune recharge solaire future. Il s'affiche uniquement si `home_power > 50 W` et `batt_soc > 0`.

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

# ── Réseau & Maison ──
grid_power:        sensor.puissance_reseau
home_power:        sensor.consommation_maison
pwr_percent:       sensor.onduleur_puissance_pct
today_load:        sensor.conso_maison_jour
grid_export_today: sensor.energie_injectee

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
