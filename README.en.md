<p align="center">
  <img src="logo.svg" alt="Solar Flow Card" width="420"/>
</p>

# ☀️ Solar Flow Card

[🇫🇷 Français](README.md) · **🇬🇧 English**

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)
![Version](https://img.shields.io/badge/version-1.2.1-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

[![Open your Home Assistant instance and add this repository to HACS](https://my.home-assistant.io/badges/hacs_repository.svg)][install]

[install]: https://my.home-assistant.io/redirect/hacs_repository/?owner=zarzak12&repository=custom-solar-flow-card&category=frontend

> A Home Assistant Lovelace card that turns your solar data into a living, animated visualization enriched with real-time savings.
>
> <img width="804" height="2158" alt="image" src="https://github.com/user-attachments/assets/c79feed3-b232-4411-b530-f4b5c26733f3" />


---

## ✨ What it does

Solar Flow Card displays **all your energy flows** in real time on an immersive scene:

- 🌞 **Solar arc** animated, with the sun position computed from your latitude/longitude (or from HA entities)
- ⚡ **Animated flows** between PV production, grid, home, battery and solar routers (GSAP)
- 🔋 **Liquid battery** with elastic GSAP physics, rising charge bubbles and a colored halo
- 🌦️ **Dynamic weather** — blue sky → partly cloudy → overcast → rain → snow → storm, with particle effects
- 🧱 **Thematic block layout** — PV / Consumption-Grid / Battery / Battery health / Routers / Savings / EV: each block reorderable, hideable and titleable; tiles **auto-fit the width** (max 3 per row, the last row stretches: 2 tiles → 50%, 1 → 100%)
- 🏠 **"Expert" consumption tracking** — instant + day/month/year totals + net grid balance + daily cost, with per-tile visibility (no duplicates)
- 👆 **Click for details** — clicking a zone (Grid, Home, Battery, PV, router, EV) opens a panel summarizing **all related entities** (configured on the card). Toggle via `details_on_click` (on by default).
- ⚡ **Up to 4 solar routers** with power + day/month/year/total energy
- 💰 **Savings & ROI** — real-time delta calculation, dated ROI (start → landing), based on cumulative ÷ age
- 🎨 **Two scene modes**: separate view (icons) or immersive scene (photorealistic 1536×1024)
- 🩺 **Battery health (SOH)** with a colored bar and cycle estimation
- 📈 **Self-consumption & self-sufficiency rates** with colored gauges
- 🔎 **Adjustable sizes** via sliders: flow thickness, label size and value size
- 🖥️ **Full-width mode** (fullscreen): the immersive scene fills the whole card width
- 🔃 **Customizable section order**: reorder the blocks under the scene with ▲ / ▼
- 🌈 **Tomorrow's Tempo color** shown as soon as it's known (dedicated badge)
- 🔌 **Battery "strategy" mode**: shows the Zendure strategy (smart matching, forced charge/discharge…)
- 🌙 **Night mode** automatic, with moon, stars and lunar phase
- 🔌 **EDF Tempo tariff** natively supported with a colored HP/HC badge

---

## 📸 Preview

| Single mode (immersive scene) | Separate mode (icons) |
|---|---|
| Realistic scene with flows on the image | Classic view with animated nodes |

---

## 🚀 Installation

### Via HACS (recommended)

1. Open HACS in Home Assistant
2. Go to **Dashboard → ⋮ → Custom repositories**
3. Add the URL `https://github.com/zarzak12/custom-solar-flow-card`, category **Dashboard**
4. Install **Solar Flow Card**
5. Reload the browser cache (Ctrl+Shift+R)

### Manual installation

1. Copy `dist/solar-flow-card.js` into `/config/www/solar-flow-card/`
2. Copy the `img/` folder into `/config/www/solar-flow-card/img/`
3. Add the resource under **Settings → Dashboards → Resources**:

```yaml
url: /local/solar-flow-card/solar-flow-card.js
type: module
```

4. Reload the cache (Ctrl+Shift+R)

> **Expected structure:**
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

## ⚙️ Minimal configuration

> 🖱️ **Everything is configured from the Home Assistant UI — no YAML required.**
>
> 1. Open your dashboard → **Edit dashboard** → **＋ Add card**
> 2. Search for **Solar Flow Card** in the card list
> 3. Fill in your entities directly in the **visual editor** (collapsible sections: General, Images, PV production, Battery, Health, Savings, EV…)
>
> The preview updates live, and saving is done with Home Assistant's native **Save** button.

Prefer YAML? The minimal equivalent:

```yaml
type: custom:solar-flow-card
latitude: 48.85       # Your latitude (sun position calculation)
longitude: 2.35       # Your longitude
pv_power: sensor.pv_power
grid_power: sensor.grid_power
home_power: sensor.home_power
batt_soc: sensor.battery_soc
```

> Every entity is optional — the card adapts and hides anything that isn't configured.

---

## 📋 Full options reference

### General

| Option | Type | Default | Description |
|---|---|---|---|
| `title` | string | `Solar Flow` | Title shown at the top of the card |
| `language` | string | `fr` | Language: `fr` or `en` |
| `latitude` | number | _(HA home)_ | Latitude for the sun position calculation. Empty = Home Assistant home location |
| `longitude` | number | _(HA home)_ | Longitude. Empty = Home Assistant home location |
| `pv_max_watts` | number | `2500` | Peak power of the installation (W) — for the PV progress bar |
| `batt_capacity_kwh` | number | `2.4` | Usable battery capacity (kWh) — for the endurance calculation |
| `pwr_kva` | number | `0` | Subscribed power (kVA) — for the PWR bar calculated mode |
| `pwr_mode` | string | `direct` | PWR bar source: `direct` (`pwr_percent` entity) or `calc` (grid ÷ kVA) |
| `refresh_ms` | number | `5000` | Refresh interval in ms |

### Entities — Solar production

| Option | Unit | Description |
|---|---|---|
| `pv_power` | W | Instantaneous PV power |
| `pv_today` | kWh | Energy produced today |
| `pv_total` | kWh | Total energy produced since installation |
| `pv_month_kwh` | kWh | Energy produced this month (for monthly savings) |
| `pv_year_kwh` | kWh | Energy produced this year (for yearly savings + ROI) |

### Entities — Grid & Consumption

| Option | Unit | Description |
|---|---|---|
| `grid_power` | W | Grid power — **positive = import**, negative = export |
| `home_power` | W | Instantaneous home consumption |
| `pwr_percent` | % | Inverter output power percentage |
| `today_load` | kWh | Home consumption today |
| `grid_export_today` | kWh | Energy exported to the grid today (refines self-consumption + Consumption block) |
| `grid_import_today` | kWh | Energy imported from the grid today (Consumption / Grid block) |
| `grid_import_month` / `grid_import_year` | kWh | Grid import month / year (Consumption block sub-lines) |
| `home_month_kwh` / `home_year_kwh` | kWh | Home consumption month / year (Consumption block sub-lines) |

> The **Consumption / Grid** block (expert tracking) shows: **instant Home & Grid** (± import/export), today's **totals** (Consumption, Import, Export) with **month/year** sub-lines, the **net grid balance** (import − export) and the **daily grid cost** (import × price). Each tile/sub-line appears only if its entity is set.
> 👁️ **Per-tile visibility**: each Consumption tile has its own toggle (`show_conso_home/grid/day/import/export/net/cost`, on by default) → hide duplicates with the scene (e.g. instant Home/Grid already shown at the top).

### Entities — Battery

| Option | Unit | Description |
|---|---|---|
| `batt_soc` | % | State of charge (SOC) |
| `batt_bar_mode` | — | BAT bar source: `soc` (default) or `power` (power ÷ limit) |
| `batt_charge_limit` | W | Charge power limit (entity or number) — `power` mode |
| `batt_discharge_limit` | W | Discharge power limit (entity or number) — `power` mode |
| `batt_voltage` | V | Battery pack voltage |
| `batt_power` | W | Charge/discharge power (**positive = charge**; otherwise enable `batt_power_invert`) |
| `batt_power_invert` | bool | Inverts the sign of `batt_power` if your entity does the opposite (+ = discharge). Fixes the BAT bar (`power` mode) and the displayed ± sign |
| `batt_mode` | — | Battery mode. **0/1 sensor** (`0`/`charge`, `1`/`discharge`) → Charge/Discharge badge. **Strategy select** (e.g. Zendure `select.zendure_manager_operation`) → shows the localized label (smart matching, forced charge/discharge…). Otherwise inferred from `batt_power` or the PV/home balance |
| `batt_temp` | °C | BMS temperature |
| `batt_chg_today` | kWh | Energy charged today |
| `batt_dis_today` | kWh | Energy discharged today |
| `min_cell` | V | Lowest cell voltage |
| `max_cell` | V | Highest cell voltage |
| `remaining` | kWh | Remaining energy (if exposed by the inverter) |
| `endurance_entity` | h/min | Direct remaining time (e.g. Zendure `remaining_time`) — overrides the calculation |
| `endurance_unit` | — | Unit of `endurance_entity`: `h` (default) or `min` |

### Entities — Battery health (SOH)

| Option | Unit | Description |
|---|---|---|
| `batt_soh` | % | Direct State of Health (if the BMS exposes it) — **Method A** |
| `batt_full_kwh` | kWh | Real total capacity (e.g. Zendure "Total Battery Capacity") — **Method B** |
| `batt_cycles` | — | Direct cycle count (if the BMS exposes it) |
| `batt_cycles_energy` | kWh | Cumulative discharged energy → EFC cycle estimation |
| `batt_cycles_base` | number | Initial cycle offset added to the computed EFC |
| `batt_cycles_max` | number | Rated max cycles (e.g. 6000) → shows `↻ N / max` |

> The design capacity used for SOH = `batt_capacity_kwh` (General section).

### Multiple batteries (aggregated view)

The card shows **one battery system**. For a multi-battery pack, aggregate the entities:

| Data | How to aggregate |
|---|---|
| Power, charge/discharge energy, cumulative discharge, remaining energy | **Sum** → several comma-separated entities (e.g. `batt_power: sensor.b1_power, sensor.b2_power`) |
| `batt_capacity_kwh`, `batt_full_kwh` | **Sum** (total pack capacity) — enter the total, or add via a template sensor |
| **SOC** (`batt_soc`) | ⚠️ **NO** comma (would sum %). Use a **weighted-average** sensor (see below) |
| Voltage | a single battery (parallel ≈ same voltage) or average |
| BMS temperature | max or average via template |

Capacity-**weighted average SOC** example:
```yaml
template:
  - sensor:
      - name: "Battery pack SOC"
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
Then `batt_soc: sensor.battery_pack_soc`. (For 2 identical batteries, a plain average is enough.)

### Entities — Weather & Sun

| Option | Description |
|---|---|
| `weather` | HA weather entity (`weather.home`) — condition + dynamic sky background |
| `ext_temp` | Outdoor temperature (`sensor.outdoor_temp`) |
| `sun_elevation` | Sun elevation in degrees (optional — computed if absent) |
| `sun_azimuth` | Sun azimuth in degrees (optional) |
| `sun_rise` | Sunrise time (optional). Otherwise the card **automatically** uses `sun.sun` (`next_rising`) if present, then the internal calculation |
| `sun_set` | Sunset time (optional). Same: `sun.sun` (`next_setting`) as automatic fallback |
| `moon_phase` | Lunar phase (`sensor.moon_phase`) — shows the phase emoji at night |

> 🌅 **Sunrise/sunset** priority: `sun_rise`/`sun_set` entities → **`sun.sun`** attributes (HA *Sun* integration, exact TZ/DST) → internal calculation from coordinates. If you have the Sun integration, times are correct with no configuration.

### Entities — Production forecast

| Option | Description |
|---|---|
| `pv_forecast_today` | Forecast production for today (kWh) — shown top-left of the sky |
| `pv_forecast_tomorrow` | Forecast production for tomorrow (kWh) — optional |

### Entities — Electric Vehicle (EV)

| Option | Description |
|---|---|
| `ev_enabled` | Enable the EV section (true/false) |
| `ev_label` | Vehicle display name |
| `ev_power` | Charge/V2H power (W) — positive = charge, negative = V2H (discharge to home) |
| `ev_soc` | EV battery SOC (%) — optional |
| `ev_max_kwh` | EV battery capacity (kWh) — optional |

---

## 🌤️ Dynamic weather

The card generates a **full visual rendering** based on the received weather condition:

| Condition | Sky | Clouds | Effects |
|---|---|---|---|
| `sunny` | Deep blue | Barely visible | — |
| `partlycloudy` | **Veiled blue** | Clearly visible cumulus | — |
| `cloudy` | Medium gray | Present | — |
| `rainy` | Heavy gray-blue | Present | 🌧️ 40 animated drops (12° tilt) |
| `pouring` | Heavy gray-blue | Present | 🌧️ 70 drops, faster |
| `snowy` | Pearl gray | Present | ❄️ 45 snowflakes with lateral drift |
| `fog` | Milky white-gray | — | — |
| `lightning` / `lightning-rainy` | Dark violet | Present | ⚡ Random light flashes (4–13s) |

The sky also changes with **sun elevation**: orange sunrise, vivid blue zenith, glowing sunset.

---

## 🎬 Scene mode

### `separate` mode (default)

Classic view with separate PNG icons, animated flows and distinct nodes.

### `single` mode — Immersive scene

A large photo (1536×1024) with the SVG flows overlaid directly on the image.

```yaml
img_scene_mode: single
img_scene_variant: esc_ev   # or esc_spa
scene_full_width: false     # true = full-width scene (fullscreen)
```

| Option | Description |
|---|---|
| `img_scene_mode` | `separate` or `single` |
| `scene_full_width` | `false` (default) or `true` — the single scene fills the whole card width (ideal for wall/tablet fullscreen) |
| `img_scene_variant` | `esc_ev` (electric vehicle) or `esc_spa` (spa/jacuzzi) |
| `img_scene_day` | URL of the day image |
| `img_scene_night` | URL of the night image |
| `img_scene_day_ev` | Day image, EV variant |
| `img_scene_night_ev` | Night image, EV variant |
| `img_scene_day_spa` | Day image, Spa variant |
| `img_scene_night_spa` | Night image, Spa variant |

---

## 🔋 Animated battery (GSAP)

The battery uses GSAP animations for a professional look:

| State | Color | Level | Glow | Bubbles |
|---|---|---|---|---|
| **Neutral** | Cyan blue | Rises/falls with elastic physics | — | — |
| **Charging** | Neon green | Rise with elastic rebound | 💚 Pulsing green halo (0.8s) | ✅ Rising green bubbles |
| **Discharging** | Orange | Smooth fall | 🟠 Slow orange halo (1.1s) | — |
| **Critical** (<15%) | Red | — | 🔴 Urgent red flash (0.3s) | — |

> 🌊 In single mode, the liquid surface ripples with **3 animated sine waves** (`gsap.ticker`). The **color follows the charge level** continuously: 🔴 red → 🟠 orange → 🟡 yellow → 🟢 green.

---

## 📈 Self-consumption & self-sufficiency

Two colored gauges computed from already-configured entities (no new entity):

| Indicator | Formula | Meaning |
|---|---|---|
| **Self-consumption** | `(pv_today − grid_export_today) / pv_today` | share of produced solar you use (vs sold) |
| **Self-sufficiency** | `(pv_today − grid_export_today) / today_load` | share of your consumption covered by solar |

> Requires `pv_today` + `grid_export_today` (+ `today_load` for self-sufficiency). Color: 🟢 ≥ 70% · 🟡 40-70% · 🔴 < 40%. Hideable via `show_autoconso`.

---

## 🩺 Battery health (SOH)

Shows the **State of Health** with a colored bar, real vs design capacity, and a cycle estimate.

```
🩺 BATTERY HEALTH
SOH       [████████░░] 95 %
Capacity  5.6 / 5.9 kWh        ↻ 78
```

### SOH — two methods

| Method | Config | Calculation |
|---|---|---|
| **A — direct entity** | `batt_soh` | uses the % returned by the BMS |
| **B — real capacity** | `batt_full_kwh` | `SOH = real_capacity ÷ batt_capacity_kwh × 100` |

> Bar color: 🟢 ≥ 90 % · 🟡 80–90 % · 🔴 < 80 %

### Cycles — three cases (by priority)

1. **Direct sensor**: `batt_cycles`
2. **EFC estimation** (Equivalent Full Cycles): `cycles = batt_cycles_base + cumulative_discharged_energy ÷ batt_capacity_kwh`
3. Nothing configured → row hidden

```yaml
# Zendure example (no direct SOH/cycle sensor)
batt_capacity_kwh:  5.76                                      # nominal capacity (General section)
batt_full_kwh:      sensor.solarflow_2400_ac_battery_capacity # "Total Battery Capacity"
batt_cycles_energy: sensor.solarflow_2400_ac_total_decharges  # cumulative discharged kWh
batt_cycles_base:   0                                          # offset if cycles already done
batt_cycles_max:    6000                                       # rated max cycles → "↻ 78 / 6000"
```

> EFC counts the energy actually discharged relative to capacity (the standard wear method), more accurate than counting each partial charge.

---

## 🔌 Solar routers

Up to **4 routers** to visualize controlled loads (spa, water heater, resistor…).

```yaml
router1_enabled: true
router1_label: Spa
router1_img: /local/solar-flow-card/img/spa.png
router1_mode: power              # 'power' or 'calc'
router1_power: sensor.spa_power  # in 'power' mode
router1_temp: sensor.spa_temp    # optional: water temperature (single mode)

# 'calc' mode for F1ATB routers (opening in %)
# router1_mode: calc
# router1_resistance_w: 3000     # nominal resistor power
# router1_opening: sensor.router_opening  # % opening
```

| Option | Description |
|---|---|
| `router_N_enabled` | Enable router N (true/false) |
| `router_N_label` | Display name |
| `router_N_img` | Image (path or URL) |
| `router_N_mode` | `power` (direct W reading) or `calc` (resistance × opening) |
| `router_N_power` | Power entity in W |
| `router_N_resistance_w` | Nominal resistor power (`calc` mode) |
| `router_N_opening` | Opening entity %, 0-100 (`calc` mode) |
| `router_N_energy` | **Daily** energy entity (kWh) |
| `router_N_energy_month` | **Monthly** energy entity (kWh) — Routers section |
| `router_N_energy_year` | **Yearly** energy entity (kWh) |
| `router_N_energy_total` | **Total** cumulative energy entity (kWh) |
| `router_N_temp` | Water temperature entity (router 1, single mode) |
| `router_N_position` | Position: `left`, `center`, `right` |
| `router_N_color` | Neon flow + value color (default `#FFA040`) |
| `router_scene_mode` | **Separate** scene: `spread` (one node per router, default) or `sum` (single summed node) |

> In **single mode**, router 1 = spa and router 2 = water heater (fixed positions in the image). Routers **3 and 4** don't appear in the single scene but are shown in the **Routers section** (power + energy).

### "Routers" section (energy)

A dedicated section shows **one badge per active router** (responsive width: 1 → one large badge, 2 → two, etc.): **power** large + **day / month / year / total** energy as a sub-line.

> 🔋 **Daily energy without a sensor**: if `router_N_energy` is empty, the card **estimates the daily kWh itself** by integrating power (shown as `Day ~X kWh`). Handy for an F1ATB router in `calc` mode. ⚠️ Browser-side estimate: only counts while the dashboard is open (reset at midnight). For reliable/recorded kWh (and month/year/total), create the sensors in HA.

> ⚡ **F1ATB router (opening %)?** Two possible modes:
> - **`calc`** — the card computes power (`resistance × opening %`) **and estimates the daily kWh**, nothing to create.
> - **`power` + sensors** — for reliable day/month/year/total kWh: see the guide **[Building F1ATB sensors](docs/F1ATB-SENSORS.md)**.

### "Electric vehicle" section

If `ev_enabled`, a dedicated section shows **state** (Charging / V2H / Idle), **power** (±), **SOC** and **battery** (current kWh / capacity).

---

## 💰 Savings & ROI

### Calculation principle

Unlike a simple `kWh × price`, the card accumulates savings **delta by delta**:

```
On every refresh (5s):
  Δ_kWh = pv_today - previous_pv_today
  savings += Δ_kWh × price_at_that_exact_moment
```

So if the Tempo price switches from off-peak to peak at 6:00, each produced kWh is valued at the correct tariff.

### 4 pricing modes (`price_mode`)

Pick **a single mode** in the editor. Depending on the mode, only the relevant fields are shown.

| Mode | `price_mode` | Fields used |
|---|---|---|
| 💶 Fixed price | `fixed` | `electricity_price` |
| 🕐 Peak / Off-peak | `hphc` | `hp_price`, `hc_price`, `hc_start`, `hc_end` |
| 🌈 EDF Tempo | `tempo` | `tempo_color` + 6 prices (Blue/White/Red × HC/HP) |
| 🔗 Dynamic entity | `entity` | `price_entity` |

### Configuration

```yaml
# ── Pricing mode ──
price_mode: hphc          # 'fixed' | 'hphc' | 'tempo' | 'entity'

# 'fixed' mode
electricity_price: 0.23   # €/kWh

# 'hphc' mode (Peak / Off-peak)
hp_price: 0.27            # €/kWh peak hours
hc_price: 0.20            # €/kWh off-peak hours
hc_start: 22             # off-peak start hour (0-23)
hc_end:   6              # off-peak end hour (0-23)

# 'entity' mode (dynamic price)
price_entity: sensor.current_price

# 'tempo' mode (EDF Tempo)
tempo_color: sensor.rte_tempo_color   # entity returning BLUE/WHITE/RED
tempo_color_tomorrow: ''  # (optional) TOMORROW's color — empty = auto-detect via
                          #   the tomorrow/next_color attribute of the entity above
tempo_blue_hc:  0.1296    # Tempo Blue off-peak price (editable each year)
tempo_blue_hp:  0.1609    # Tempo Blue peak price
tempo_white_hc: 0.1470    # Tempo White off-peak price
tempo_white_hp: 0.1894    # Tempo White peak price
tempo_red_hc:   0.1568    # Tempo Red off-peak price
tempo_red_hp:   0.7562    # Tempo Red peak price ← beware the spike!

# ── Production data (common to all modes) ──
grid_export_today: sensor.energy_exported   # refines self-consumption
pv_month_kwh: sensor.pv_energy_month
pv_year_kwh:  sensor.pv_energy_year

# ── Surplus sell-back (remunerated export) ──
export_paid:  true                      # enable sell-back
export_price: 0.10                      # €/kWh surplus buy-back price
grid_export_month: sensor.export_month  # (optional) monthly revenue
grid_export_year:  sensor.export_year   # (optional) yearly revenue + ROI

# ROI (shown if install_cost OR batt_cost > 0, AND pv_year_kwh configured)
install_cost: 8000        # € PV / panels cost
batt_cost:    4000        # € battery cost (added to PV cost → global ROI)
install_date: '2023-04-15'  # commissioning date (ROI start, shows start → landing)

# Dedicated battery savings (arbitrage) — optional
# ⚠️ Only set batt_savings_price if the battery is charged from the grid
#    (off-peak). Otherwise solar energy is already counted on the PV side (double counting).
batt_savings_kwh:   sensor.battery_total_discharge   # cumulative discharged kWh (empty → reuses the health cycles entity)
batt_savings_price: 0.20                             # €/kWh discharge value (empty = no battery savings counted)

# CO₂
co2_factor: 0.4           # kg CO₂/kWh avoided (French grid mix 2024)
```

> The **HP/HC** and **Tempo** modes use the `hc_start`/`hc_end` range (default 10pm→6am, handles midnight wrap) to determine off-peak vs peak.

### What is displayed

- **Today**: savings (self-consumption) **+ sell-back revenue** (if `export_paid`) + kg CO₂ avoided
- **This month**: savings × price + sell-back (if `grid_export_month`)
- **This year**: savings × price + sell-back (if `grid_export_year`) + CO₂
- **🔋 Battery** (if `batt_savings_price` is set): cumulative arbitrage savings = cumulative discharged energy × value €/kWh
- **Global ROI** — cost = `install_cost` (PV) **+** `batt_cost` (battery):
  - If `pv_total` (energy produced since installation) is set → **real payback**: savings already accumulated (PV production × benefit/kWh **+** battery savings) ÷ total cost. The bar progresses with the age of the install and shows the **remaining time**, then "**Paid off ✓ + net gain**" once recouped.
  - Otherwise → **theoretical projection**: total cost ÷ combined annual benefit = "years to break even".
  - **Dates**: a line `📅 start → estimated landing` appears under the ROI. The **start** = `install_date` if set, otherwise **auto-estimated** from `pv_total ÷ annual production` (`~` prefix). Once recouped: `📅 start → paid off ~<date> · +<net gain>` (full bar, "Paid off ✓").
  - **Remaining-time rate**: if `install_date` is set, the annual rate = **cumulative ÷ age** (consistent with the Total, reliable even if your 'this year' sensor is partial/created mid-year). Otherwise → annualized 'this year' sensor.

> 🔗 **Multiple inverters / batteries**: in **any numeric field** (e.g. `pv_total`, `pv_power`, `pv_today`, `batt_power`, `batt_savings_kwh`…), enter **several entities separated by commas** — they are **summed**. Example: `pv_total: sensor.pv1_total, sensor.pv2_total, sensor.pv3_total`. ⚠️ Does not apply to **SOC** (`batt_soc`, a percentage): use a single sensor or an average via a template sensor.

> 💶 **Savings vs revenue**: self-consumption is valued at the price you **avoid paying** (`electricity_price`/Tempo/peak-offpeak), exported surplus at the **sell-back** price (`export_price`). Both are summed in the totals.

> ⏱️ **Daily savings & tariff variation**: the daily savings is accumulated **continuously**, each self-consumed kWh valued at the **current** tariff (off-peak/peak/Tempo) → the day correctly sums off-peak + peak + off-peak. The state is **persisted** (localStorage) to survive page reloads. Limitation: production made **before** the first dashboard load of the day is estimated at the current price (no per-time-slot history); keep the dashboard open or reload early for maximum accuracy.

> 📐 **For reliable, recorded € savings** (day / month / year / total, all tariffs), compute them in Home Assistant: see the guide **[Building your savings sensors](docs/SAVINGS-SENSORS.md)** (fixed price, peak/off-peak, Tempo, dynamic…).

### Savings source (`savings_mode`)

Two modes, selectable in the editor (*Savings & Pricing → Savings source*):

| `savings_mode` | Behaviour |
|---|---|
| `calc` *(default)* | The card computes € from production entities (kWh) × price. No extra sensor required. |
| `entity` | The card **directly displays** € sensors you built in HA (see the [guide](docs/SAVINGS-SENSORS.md)) — most accurate. |

In `entity` mode, set the entities:
```yaml
savings_mode:         entity
savings_day_entity:   sensor.savings_day
savings_month_entity: sensor.savings_month
savings_year_entity:  sensor.savings_year
savings_total_entity: sensor.total_savings   # used for ROI
```
> The pricing mode (fixed price / Tempo…) then only drives the **price/Tempo badge**; amounts come from the sensors.

> **Tempo note**: the HP/HC windows used are the standard EDF hours (off-peak: 10pm–6am, peak: 6am–10pm). Since solar production is 100% diurnal, it almost always falls during peak hours — so the calculation stays very accurate even after a page reload.

> 🌈 **Tomorrow's color**: if `tempo_color_tomorrow` is set (or the `tempo_color` entity exposes a `tomorrow`/`next_color` attribute), a second badge "Tomorrow: 🔵/⚪/🔴" appears next to today's, as soon as the next day's color is known (≈ 11am). It hides automatically when unknown.

---

## 🎨 Customization

### Colors

```yaml
color_solar:   '#FFD700'   # Solar yellow (PV flow)
color_grid:    '#4FC3F7'   # Cyan blue (grid)
color_battery: '#69FF47'   # Neon green (battery)
color_home:    '#FF6B6B'   # Pink-red (home consumption)
color_ev:      '#4FC3F7'   # Electric vehicle (EV) flow
color_bg:      '#060d1a'   # Card background
```

### Custom images

```yaml
img_house:   /local/solar-flow-card/img/my-image.png
img_battery: /local/solar-flow-card/img/my-battery.png
img_grid:    /local/solar-flow-card/img/my-meter.png
```

### Optional overlays (separate mode)

Extra images overlaid on the scene:

```yaml
img_overlay1: /local/solar-flow-card/img/car.png
img_overlay1_label: Car
img_overlay2: /local/solar-flow-card/img/pool.png
img_overlay2_label: Pool
```

### Display sizes (sliders)

Three sliders in the editor (**🔎 Display sizes** section) scale the whole card:

```yaml
scale_flux:  1.0   # energy flow thickness (0.5 → 2.0)
scale_label: 1.0   # label size: GRID, HOME, SOH… (0.6 → 1.8)
scale_value: 1.0   # numeric value size: 547 W, 95 %… (0.6 → 1.8)
```

> These scales apply everywhere: scene (single mode), battery, inverter, savings, health, progress bars.

### Display options

```yaml
show_progress_bars: true   # PV / PWR / BAT bars
show_mode:         true    # Mode tile (Battery block)
show_bms_temp:     true    # BMS temperature tile (Battery block)
show_total_pv:     true    # CO₂ avoided today tile (PV block)
show_cells:        true    # Min/max cell voltages (Battery block)
show_endurance:    true    # Estimated battery endurance (Battery block)
show_autoconso:    true    # Self-consumption / self-sufficiency bars (PV block)
show_health:       true    # Battery health block (SOH + cycles)
show_savings:      true    # Savings & ROI block
show_images:       true    # Images (false = emoji fallback)
details_on_click:  true    # Click a zone → panel summarizing related entities

# Per-tile visibility for the Consumption / Grid block (avoid scene duplicates)
show_conso_home:   true    # Home (instant)
show_conso_grid:   true    # Grid (instant)
show_conso_day:    true    # Consumption today
show_conso_import: true    # Import today
show_conso_export: true    # Export today
show_conso_net:    true    # Net grid balance
show_conso_cost:   true    # Daily grid cost
```

### Section order

Reorder how the blocks under the scene are displayed, from the editor (**🔃 Sections order** section, ▲ / ▼ buttons) or in YAML via `section_order`:

```yaml
section_order:
  - bars        # PV / PWR / BAT bars
  - pv          # PV / Solar (PV today, PV total, CO₂, self-consumption)
  - conso       # Consumption / Grid (today load, export)
  - battery     # Battery (mode, remaining, charge/discharge, cells, endurance)
  - health      # Battery health (SOH, capacity, cycles)
  - routers     # Routers (energy)
  - savings     # Savings & ROI
  - ev          # Electric vehicle
```

> Any omitted key is automatically appended at the end (nothing disappears). A section hidden by its `show_*` toggle stays absent regardless of its rank. The header and scene remain fixed at the top.

### Section titles

Customize the title of **every** section, from the editor (**🏷️ Section titles** section) or in YAML:

```yaml
# "Bars" has no default header → a title only appears if you set one
title_bars:    Power

# The other blocks have a header → empty = default translated label
title_pv:      PV / Solar         # default: "PV / Solar"
title_conso:   Consumption / Grid # default: "Consumption / Grid"
title_battery: Battery            # default: "Battery"
title_health:  Battery health     # default: "Battery health"
title_routers: My routers         # default: "Routers"
title_savings: My savings         # default: "Savings & ROI"
title_ev:      Car                # default: "Electric vehicle"
```

> Only **Bars** has no original header (title shown only if set). For the other blocks, leaving it empty keeps the default label.

---

## 🧮 Endurance calculation

```
Available energy = SOC% × batt_capacity_kwh
Endurance (h)    = Available energy ÷ home_consumption (kW)
End time         = now + endurance
```

> The calculation assumes constant consumption and no future solar recharge. It is shown only when `home_power > 50 W` and `batt_soc > 0`.
>
> 💡 **Better**: if you set `endurance_entity` (e.g. Zendure `sensor.solarflow_2400_ac_remaining_time`), that **real** value replaces the theoretical calculation. Set the unit via `endurance_unit` (`h` or `min`).

---

## 📝 Full example

```yaml
type: custom:solar-flow-card
title: My Solar Home
language: en
latitude: 43.60
longitude: 3.87
pv_max_watts: 6000
batt_capacity_kwh: 10.24
refresh_ms: 5000

# ── Production ──
pv_power:   sensor.pv_power
pv_today:   sensor.pv_energy_today
pv_total:   sensor.pv_energy_total
pv_month_kwh: sensor.pv_energy_month
pv_year_kwh:  sensor.pv_energy_year

# ── Grid & Home (Consumption block) ──
grid_power:        sensor.grid_power
home_power:        sensor.home_consumption
pwr_percent:       sensor.inverter_power_pct
today_load:        sensor.home_load_today
home_month_kwh:    sensor.home_consumption_month
home_year_kwh:     sensor.home_consumption_year
grid_export_today: sensor.energy_exported
grid_import_today: sensor.energy_imported
grid_import_month: sensor.grid_import_month
grid_import_year:  sensor.grid_import_year
# No duplicate: instant Home/Grid already in the scene
show_conso_home: false
show_conso_grid: false

# ── Battery ──
batt_soc:       sensor.battery_soc
batt_voltage:   sensor.battery_voltage
batt_power:     sensor.battery_power
batt_mode:      sensor.battery_mode
batt_temp:      sensor.bms_temp
batt_chg_today: sensor.battery_charge_today
batt_dis_today: sensor.battery_discharge_today
min_cell:       sensor.cell_min
max_cell:       sensor.cell_max

# ── Battery health ──
batt_full_kwh:      sensor.real_total_capacity   # or direct SOH entity via batt_soh
batt_cycles_energy: sensor.cumulative_discharge
batt_cycles_base:   0

# ── Weather ──
weather:    weather.home
ext_temp:   sensor.outdoor_temp
moon_phase: sensor.moon_phase

# ── Scene ──
img_scene_mode:    single
img_scene_variant: esc_ev

# ── EDF Tempo pricing ──
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
install_date:   '2023-04-15'   # ROI: rate = cumulative ÷ age (start → landing)
batt_savings_price: 0.20
co2_factor:     0.4

# ── Router 1: Spa ──
router1_enabled: true
router1_label:   Spa
router1_img:     /local/solar-flow-card/img/spa.png
router1_mode:    power
router1_power:   sensor.spa_power
router1_temp:    sensor.spa_temperature

# ── Router 2: Water heater ──
router2_enabled:      true
router2_label:        Water heater
router2_img:          /local/solar-flow-card/img/water_tank.png
router2_mode:         calc
router2_resistance_w: 2000
router2_opening:      sensor.router_opening

# ── Electric vehicle ──
ev_enabled: true
ev_label:   Car
ev_power:   sensor.ev_power
ev_soc:     sensor.ev_soc

# ── Custom colors ──
color_solar:   '#FFD700'
color_grid:    '#4FC3F7'
color_battery: '#69FF47'
color_home:    '#FF6B6B'
```

---

## ❓ FAQ

**The card doesn't show up?**
→ Make sure the JS file is in `/config/www/` and the Lovelace resource is registered. Clear the cache (Ctrl+Shift+R).

**The sun doesn't move?**
→ Check `latitude` and `longitude`. If you use `sun_elevation`/`sun_azimuth` entities, make sure they return numbers.

**The sky stays gray even in nice weather?**
→ Make sure the `weather` entity is a `weather.*` entity and that its condition returns `sunny` or `partlycloudy`.

**Savings show 0 €?**
→ `pv_today` must be an entity returning kWh (a decimal number). Also check that `electricity_price` is > 0.

**Tempo doesn't show?**
→ The `tempo_color` entity must return `BLUE`, `WHITE` or `RED` (upper or lower case). Check the [RTE France](https://github.com/hekmon/rtetempo) integration.

**Flows don't animate?**
→ GSAP loads from a CDN on first load. The basic CSS animations work in the meantime. Check your internet connection.

**Single mode: the flows don't match my scene?**
→ The SVG overlay is calibrated on a 1536×1024 image. If you use a custom image, the flow paths may not match your visual elements.

---

## 🙏 Credits

- Inspired by [Lumina Energy Card](https://github.com/...)
- Flow animations: [GSAP](https://gsap.com/) + DrawSVGPlugin
- Weather icons: native Unicode / emoji
- Scene images: AI-generated

---

## 📜 License

MIT — free to use, modify and distribute.
