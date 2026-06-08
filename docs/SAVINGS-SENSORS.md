# 💶 Building your savings sensors in Home Assistant

[🇫🇷 Français](CAPTEURS-ECONOMIES.md) · [🇬🇧 English] · [⬅ Back to README](../README.en.md)

This guide explains how to compute your **savings in €** (day / month / year / total) **directly in Home Assistant**, for every pricing scheme: fixed price, Peak/Off-peak, EDF Tempo, dynamic pricing…

> **Why compute it in HA rather than in the card?**
> The card produces an *estimate* (kWh × current price) which can lose accuracy after a page reload, or for production that happened before the dashboard was opened. Computing it in HA makes the integration **continuous, persisted and recorded** — the most reliable method, and it naturally respects off-peak/peak/Tempo variation **at the moment the energy is consumed**.

---

## 🧭 The principle in 3 steps

```
┌─ Step 1 ──────────────┐   ┌─ Step 2 ───────────────────┐   ┌─ Step 3 ──────────────────┐
│ Current price (€/kWh) │ × │ Saved power (kW)           │ = │ Savings rate (€/h)        │
│ per your contract     │   │ = load covered by PV/      │   │           │               │
│ (fixed / peak-offpeak │   │   battery (avoided import) │   │           ▼               │
│  / Tempo / dynamic)   │   │                            │   │ integration → € cumulative│
└───────────────────────┘   └────────────────────────────┘   │           ▼               │
                                                              │ utility_meter →           │
                                                              │ day / month / year / total│
                                                              └───────────────────────────┘
```

1. **Current price** (`sensor.electricity_price`, €/kWh) — depends on your contract.
2. **Saved power** (`sensor.self_consumed_power`, W) — the share of your load covered by solar + battery (= the grid import you avoid).
3. **Savings rate** (`sensor.savings_rate`, €/h) = power (kW) × price → then **integration** into cumulative € → then **utility_meter** for the day / month / year / total breakdown.

> 💡 Adapt every `sensor.xxx` below to **your** real entity names.

---

## Step 1 — Current price (€/kWh)

Add to `configuration.yaml` (or a package). Pick **one** of the blocks below.

### A. Single (fixed) tariff

```yaml
template:
  - sensor:
      - name: "Electricity price"
        unique_id: electricity_price
        unit_of_measurement: "EUR/kWh"
        state: "0.2516"
```

### B. Peak / Off-peak

Example: off-peak from **10 pm to 6 am**, peak otherwise.

```yaml
template:
  - sensor:
      - name: "Electricity price"
        unique_id: electricity_price
        unit_of_measurement: "EUR/kWh"
        state: >
          {% set h = now().hour %}
          {% set offpeak = (h >= 22 or h < 6) %}
          {{ 0.2068 if offpeak else 0.2700 }}
```

> 🔧 For more complex off-peak windows (e.g. 12-2 pm **and** 10 pm-6 am):
> ```jinja
> {% set offpeak = (h >= 22 or h < 6) or (h >= 12 and h < 14) %}
> ```

### C. EDF Tempo

Requires an integration providing the **Tempo color of the day** (e.g. [RTE Tempo](https://github.com/hekmon/rtetempo) → `sensor.rte_tempo_couleur_actuelle`). Peak 6 am-10 pm, off-peak 10 pm-6 am.

```yaml
template:
  - sensor:
      - name: "Electricity price"
        unique_id: electricity_price
        unit_of_measurement: "EUR/kWh"
        state: >
          {% set h = now().hour %}
          {% set offpeak = (h >= 22 or h < 6) %}
          {% set color = states('sensor.rte_tempo_couleur_actuelle') | lower %}
          {% if 'blue' in color or 'bleu' in color %}
            {{ 0.1296 if offpeak else 0.1609 }}
          {% elif 'white' in color or 'blanc' in color %}
            {{ 0.1470 if offpeak else 0.1894 }}
          {% elif 'red' in color or 'rouge' in color %}
            {{ 0.1568 if offpeak else 0.7562 }}
          {% else %}
            {{ 0.1609 }}
          {% endif %}
```

> ⚠️ Update the prices (grid as of 1 Feb 2024 above) to match your contract.

### D. Dynamic pricing (Tibber, Nord Pool, EPEX, aWATTar…)

If an integration already exposes the hourly price, **no template needed** — use its entity directly (e.g. `sensor.tibber_prices`, `sensor.nordpool_kwh_xxx`).

If the price is in another unit (€/MWh), convert it:

```yaml
template:
  - sensor:
      - name: "Electricity price"
        unique_id: electricity_price
        unit_of_measurement: "EUR/kWh"
        state: >
          {{ (states('sensor.nordpool_kwh_fr_eur') | float(0)) }}
```

---

## Step 2 — Saved power (W)

The real saving = the **avoided grid import** = the share of your load covered by solar **and** battery. Valuing it at the current price automatically yields the correct tariff **at the moment the energy is consumed** (this cleanly handles the battery case: charge during the day, release in the evening at the evening price).

Convention: `sensor.grid_power` in W, **positive = import**, **negative = export**.

```yaml
template:
  - sensor:
      - name: "Self consumed power"
        unique_id: self_consumed_power
        unit_of_measurement: "W"
        device_class: power
        state: >
          {% set home = states('sensor.home_consumption') | float(0) %}
          {% set grid = states('sensor.grid_power') | float(0) %}
          {% set imported = grid if grid > 0 else 0 %}
          {{ [home - imported, 0] | max }}
```

> 🔧 **With separate import/export sensors:**
> ```jinja
> {% set imported = states('sensor.grid_import') | float(0) %}
> {{ [home - imported, 0] | max }}
> ```

> 🔧 **Simple variant without battery** (direct solar self-consumption only):
> ```jinja
> {% set pv = states('sensor.pv_power') | float(0) %}
> {% set home = states('sensor.home_consumption') | float(0) %}
> {{ [pv, home] | min }}
> ```

---

## Step 3 — Savings rate, then day / month / year / total

### 3.1 — Savings rate (€/h)

```yaml
template:
  - sensor:
      - name: "Savings rate"
        unique_id: savings_rate
        unit_of_measurement: "EUR/h"
        state: >
          {% set kw    = states('sensor.self_consumed_power') | float(0) / 1000 %}
          {% set price = states('sensor.electricity_price') | float(0) %}
          {{ (kw * price) | round(4) }}
```

> 💰 **Add surplus sell-back revenue** (optional): create a second rate and sum it.
> ```yaml
>       - name: "Sell-back revenue rate"
>         unique_id: sellback_revenue_rate
>         unit_of_measurement: "EUR/h"
>         state: >
>           {% set grid = states('sensor.grid_power') | float(0) %}
>           {% set export_kw = (-grid if grid < 0 else 0) / 1000 %}
>           {{ (export_kw * 0.10) | round(4) }}   {# 0.10 = sell price €/kWh #}
> ```
> Then make a `Total gain rate` = `savings_rate + sellback_revenue_rate` and integrate that one.

### 3.2 — Integration → cumulative savings (€ total)

The [Riemann integration](https://www.home-assistant.io/integrations/integration/) turns the rate (€/h) into cumulative €.

```yaml
sensor:
  - platform: integration
    source: sensor.savings_rate
    name: "Total savings"
    unique_id: total_savings
    unit_time: h
    method: left
    round: 2
```

➡️ `sensor.total_savings` = **total savings since installation** (the "total" value).

### 3.3 — utility_meter → day / month / year

The [`utility_meter`](https://www.home-assistant.io/integrations/utility_meter/) splits this total into cycles.

```yaml
utility_meter:
  savings_day:
    source: sensor.total_savings
    cycle: daily
  savings_month:
    source: sensor.total_savings
    cycle: monthly
  savings_year:
    source: sensor.total_savings
    cycle: yearly
```

➡️ You get:
| Sensor | Content |
|---|---|
| `sensor.savings_day` | today's savings (reset at midnight) |
| `sensor.savings_month` | this month's savings |
| `sensor.savings_year` | this year's savings |
| `sensor.total_savings` | total savings (since the start) |

---

## ✅ Summary

```
sensor.electricity_price     (€/kWh, per contract)
        ×
sensor.self_consumed_power   (W → avoided import)
        =
sensor.savings_rate          (€/h)
        ↓ integration
sensor.total_savings         (€ total)
        ↓ utility_meter
sensor.savings_day / _month / _year
```

---

## 🔌 Wiring these sensors into the Solar Flow Card

The card can **display these `€` sensors directly** (more accurate than its internal calc). In the editor, open **Savings & Pricing → Savings source** and pick **"🔗 € sensors (computed in HA)"**, then set your entities:

```yaml
savings_mode:         entity
savings_day_entity:   sensor.savings_day
savings_month_entity: sensor.savings_month
savings_year_entity:  sensor.savings_year
savings_total_entity: sensor.total_savings   # used for ROI
```

- The card then shows the amounts **as-is** (day / month / year), and computes the **ROI** from `savings_total_entity` ÷ cost (PV + battery).
- The **pricing mode** (fixed price / peak-offpeak / Tempo…) then only drives the **price/Tempo badge** at the top of the block — amounts come from your sensors.
- Default mode = **`calc`** (internal kWh × price): if you set nothing, nothing changes.

> These sensors also display in any standard Home Assistant card (Entities, Statistics, History…).

---

## 🛟 Troubleshooting

- **`sensor.total_savings` stays `unknown`**: check that `sensor.savings_rate` returns a number (Developer Tools → States).
- **Values look doubled**: make sure you don't add self-consumption **and** battery discharge twice — the "saved power" (avoided import) already covers both.
- **After editing YAML**: *Developer Tools → YAML → Reload Template entities / utility_meter*, or restart Home Assistant.
- **Tempo**: if the color badge doesn't show, check the exact color entity name and its values (`blue`/`bleu`…).
