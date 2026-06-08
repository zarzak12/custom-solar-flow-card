# ⚡ F1ATB routers — building power & energy sensors

[🇫🇷 Français](CAPTEURS-F1ATB.md) · [🇬🇧 English] · [⬅ Back to README](../README.en.md)

An **F1ATB** router (and most triac-based solar routers) exposes a **triac opening %**, not a power or an energy. This guide shows how to derive:

- real-time **power** (W),
- consumed **energy**: **day / month / year / total** (kWh),

to display them in the Solar Flow Card.

> ℹ️ **Two approaches — both supported:**
> - **`calc` mode** (quick, nothing to create): the card computes power itself = `resistance × opening %`. Great just to see power. ❌ But **no kWh energy** (the card doesn't integrate over time).
> - **`power` mode + sensors** (this guide): you create the sensors in Home Assistant → you get **power AND energy day/month/year/total**, recorded.
>
> The **`calc` mode stays available** for routers that only expose an opening and whose energy you don't need, or other router types.

---

## 🧭 The principle

```
opening % ─┐
           ├─(× resistance)→ Power (W) ─(integration)→ Total energy (kWh) ─(utility_meter)→ day / month / year
resistance ┘
```

1. **Power** (W) = `opening % ÷ 100 × resistance`.
2. **Total energy** (kWh) = integration of power over time.
3. **Day / month / year** = splitting the total energy.

> 💡 Adapt the `sensor.xxx` and the resistance (W) to **your** hardware.

---

## Step 1 — Power (W)

Add to `configuration.yaml` (or a package). Example: a **3000 W** resistance.

```yaml
template:
  - sensor:
      - name: "Spa power"
        unique_id: spa_power
        unit_of_measurement: "W"
        device_class: power
        state: >
          {{ (states('sensor.f1atb_spa_opening') | float(0) / 100 * 3000) | round(0) }}
        availability: >
          {{ states('sensor.f1atb_spa_opening') not in ['unknown','unavailable'] }}
```

> 🔧 Replace `sensor.f1atb_spa_opening` with your opening entity and `3000` with **your** resistance rating.

---

## Step 2 — Total energy (kWh)

The [Riemann integration](https://www.home-assistant.io/integrations/integration/) turns W into cumulative kWh (`unit_prefix: k` → kilo).

```yaml
sensor:
  - platform: integration
    source: sensor.spa_power
    name: "Spa total energy"
    unique_id: spa_total_energy
    unit_time: h
    unit_prefix: k        # Wh → kWh
    method: left
    round: 3
```

➡️ `sensor.spa_total_energy` = **cumulative total energy** (the "total" value).

---

## Step 3 — Day / month / year

The [`utility_meter`](https://www.home-assistant.io/integrations/utility_meter/) splits this total into cycles.

```yaml
utility_meter:
  spa_energy_day:   { source: sensor.spa_total_energy, cycle: daily }
  spa_energy_month: { source: sensor.spa_total_energy, cycle: monthly }
  spa_energy_year:  { source: sensor.spa_total_energy, cycle: yearly }
```

➡️ You get:
| Sensor | Content |
|---|---|
| `sensor.spa_energy_day` | today's energy (reset at midnight) |
| `sensor.spa_energy_month` | this month's energy |
| `sensor.spa_energy_year` | this year's energy |
| `sensor.spa_total_energy` | total energy (since the start) |

---

## Step 4 — Wire into the Solar Flow Card

In the editor, **⚡ Solar routers** section → Router 1:

```yaml
router1_enabled: true
router1_label: Spa
router1_mode: power                      # ← use the power sensor we created
router1_power: sensor.spa_power
router1_energy:       sensor.spa_energy_day      # day
router1_energy_month: sensor.spa_energy_month    # month
router1_energy_year:  sensor.spa_energy_year     # year
router1_energy_total: sensor.spa_total_energy    # total
```

➡️ Power shows in the scene, and the **"Routers" section** displays **daily** energy (large) + **month / year / total**.

> 🔁 **Prefer to keep `calc` mode?** Leave `router1_mode: calc` with `router1_resistance_w` + `router1_opening`: the card computes the power, and you can **still** fill the `router1_energy*` fields above for energy. Both mechanisms are independent.

---

## ✅ Summary

```
sensor.f1atb_spa_opening (%)
        ×  resistance (W)
sensor.spa_power          (W)
        ↓ integration
sensor.spa_total_energy   (kWh total)
        ↓ utility_meter
sensor.spa_energy_day / _month / _year
```

---

## 🔁 Multiple routers

Repeat the 4 steps for each router (its own resistance and opening entity), then fill `router2_*`, `router3_*`. The "Routers" section automatically adds one badge per active router (responsive width).

---

## 🛟 Troubleshooting

- **`sensor.spa_total_energy` stays at 0 / `unknown`**: check that `sensor.spa_power` returns a number (Developer Tools → States).
- **Energy not moving at night**: normal if opening is 0 % (power 0).
- **After editing YAML**: *Developer Tools → YAML → Reload Template entities / utility_meter*, or restart Home Assistant.
- **Wrong power**: check the resistance value (W) and that the opening is in **% (0–100)**, not a fraction (0–1).
