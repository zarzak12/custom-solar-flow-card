# Solar Flow Card

Carte Lovelace personnalisée pour Home Assistant afin de visualiser les flux entre production solaire, réseau, maison, batterie et routeurs solaires.

## Aperçu des fonctions

- Arc solaire avec position du soleil calculée depuis latitude/longitude ou via entités Home Assistant.
- Flux animés réseau, maison, batterie et jusqu'à 3 routeurs solaires.
- Fond météo dynamique avec température extérieure.
- Niveau de batterie visuel, SOC, tension, cellules, température BMS et autonomie estimée.
- Éditeur visuel Lovelace pour configurer les entités, couleurs, images et options d'affichage.
- Mode images ou fallback par icônes/émojis si les images ne chargent pas.

## Installation manuelle

1. Copiez le dossier du projet dans Home Assistant:

```text
/config/www/solar-flow-card/
```

2. Vérifiez que ces fichiers existent:

```text
/config/www/solar-flow-card/solar-flow-card.js
/config/www/solar-flow-card/img/house.png
/config/www/solar-flow-card/img/battery.png
/config/www/solar-flow-card/img/grid.png
```

3. Ajoutez la ressource Lovelace:

```yaml
url: /local/solar-flow-card/solar-flow-card.js
type: module
```

4. Rechargez le cache du navigateur si nécessaire.

## Exemple Lovelace

```yaml
type: custom:solar-flow-card
title: Solar Flow
language: fr
latitude: 44.35
longitude: 2.57
pv_max_watts: 2500
batt_capacity_kwh: 2.4

pv_power: sensor.pv_power
pv_today: sensor.pv_energy_today
pv_total: sensor.pv_energy_total

batt_soc: sensor.battery_soc
batt_voltage: sensor.battery_voltage
batt_mode: sensor.battery_mode
batt_temp: sensor.battery_temperature
batt_chg_today: sensor.battery_charge_today
batt_dis_today: sensor.battery_discharge_today
min_cell: sensor.battery_cell_min
max_cell: sensor.battery_cell_max
remaining: sensor.battery_remaining_energy

grid_power: sensor.grid_power
home_power: sensor.home_power
pwr_percent: sensor.inverter_power_percent
today_load: sensor.home_energy_today

weather: weather.home
ext_temp: sensor.outdoor_temperature
```

## Routeurs solaires

Chaque routeur est optionnel. Exemple pour un spa:

```yaml
router1_enabled: true
router1_label: Spa
router1_img: /local/solar-flow-card/img/spa.png
router1_power: sensor.spa_power
router1_energy: sensor.spa_energy_today
```

Images disponibles dans ce dépôt:

```text
battery.png
grid.png
house.png
routeur.png
spa.png
water_tank.png
```

## Notes

- Les puissances sont attendues en W.
- Les énergies sont attendues en kWh.
- `grid_power` est affiché en import si positif et en export si négatif.
- Si les entités soleil ne sont pas renseignées, la carte calcule la position du soleil depuis `latitude` et `longitude`.
- Les images par défaut pointent vers `/local/solar-flow-card/img/*.png`.
