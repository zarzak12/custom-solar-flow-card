/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║          SOLAR FLOW CARD — Home Assistant                ║
 * ║    Custom Lovelace Card · Version 1.0.0                  ║
 * ║    Inspiré de Lumina Energy Card                         ║
 * ║    Arc solaire · Météo · Flux animés · Temps réel        ║
 * ╚══════════════════════════════════════════════════════════╝
 */

// ══════════════════════════════════════════════════════════
//  DEFAULTS
// ══════════════════════════════════════════════════════════
const DEFAULTS = {
  language: 'fr',
  latitude: 44.35,
  // ── Routeurs solaires (jusqu'à 3) ──
  // Chaque routeur a : image, label, entité puissance, entité énergie journalière
  router1_enabled:    false,
  router1_img:        '',
  router1_label:      'Spa',
  router1_power:      '',   // sensor.xxx → watts en cours
  router1_energy:     '',   // sensor.xxx → kWh aujourd'hui
  router1_position:   'right', // 'left' | 'right' | 'center'

  router2_enabled:    false,
  router2_img:        '',
  router2_label:      'Chauffe-eau',
  router2_power:      '',
  router2_energy:     '',
  router2_position:   'left',

  router3_enabled:    false,
  router3_img:        '',
  router3_label:      'Routeur 3',
  router3_power:      '',
  router3_energy:     '',
  router3_position:   'center',

  // Images personnalisées (chemin relatif à /local/ ou URL complète)
  img_house:   '/hacsfiles/solar-flow-card/img/house.png',
  img_battery: '/hacsfiles/solar-flow-card/img/battery.png',
  img_grid:    '/hacsfiles/solar-flow-card/img/grid.png',
  img_scene_mode:    'separate',
  img_scene_variant: 'esc_ev',
  img_scene_day:     'hacsfiles/solar-flow-card/img/house-grid.png',
  img_scene_night:   'hacsfiles/solar-flow-card/img/house-night.png',
  img_scene_day_ev:  '',
  img_scene_night_ev:'',
  img_scene_day_spa: 'hacsfiles/solar-flow-card/img/house-spa.png',
  img_scene_night_spa:'hacsfiles/solar-flow-card/img/house-spa-night.png',
  // Overlays optionnels (laisser vide pour masquer)
  img_overlay1: '',
  img_overlay1_label: '',
  img_overlay2: '',
  img_overlay2_label: '',
  show_images: true,
  longitude: 2.57,
  pv_max_watts: 2500,
  batt_capacity_kwh: 2.4,
  refresh_ms: 5000,
  // Entités (vide = non affiché)
  pv_power: '',
  pv_today: '',
  pv_total: '',
  batt_soc: '',
  batt_voltage: '',
  batt_mode: '',
  batt_temp: '',
  batt_power: '',
  batt_chg_today: '',
  batt_dis_today: '',
  min_cell: '',
  max_cell: '',
  remaining: '',
  grid_power: '',
  home_power: '',
  pwr_percent: '',
  weather: '',
  ext_temp: '',
  sun_elevation: '',
  sun_azimuth: '',
  sun_rise: '',
  sun_set: '',
  moon_phase: '',
  today_load: '',
  // Couleurs
  color_solar: '#FFD700',
  color_grid: '#4FC3F7',
  color_battery: '#69FF47',
  color_home: '#FF6B6B',
  color_bg: '#060d1a',
  // Options
  show_cells: true,
  show_endurance: true,
  show_inverter: true,
  show_progress_bars: true,
  show_bms_temp: true,
  show_total_pv: true,
  show_mode: true,
  title: 'Solar Flow',
};

// ══════════════════════════════════════════════════════════
//  I18N — Traductions FR / EN
// ══════════════════════════════════════════════════════════
const I18N = {
  fr: {
    // Header
    status_idle:       'VEILLE',
    status_producing:  'PRODUCTION',
    status_charging:   'CHARGE',
    status_discharge:  'DÉCHARGE',
    // Flow nodes
    node_grid:    'Réseau',
    node_home:    'Maison',
    node_battery: 'Batterie',
    dir_import:   '↓ Import',
    dir_export:   '↑ Export',
    // Metric cards
    lbl_mode:     'Mode',
    lbl_bms_temp: 'Temp. BMS',
    lbl_total_pv: 'Total PV',
    lbl_min_cell: 'Cell. min',
    lbl_max_cell: 'Cell. max',
    lbl_batt_dis: 'Décharge',
    lbl_endurance:'Autonomie',
    // Mode values
    mode_charge:    'Charge',
    mode_discharge: 'Décharge',
    mode_idle:      'Veille',
    // Section
    section_inverter: 'Onduleur',
    // Inverter cards
    inv_today_pv:   'PV du jour',
    inv_chg_dis:    'Chg / Dch',
    inv_remaining:  'Restant',
    inv_today_load: 'Conso. jour',
    // Sun labels
    sun_rise: '🌅',
    sun_set:  '🌇',
    // Editor
    ed_title:         'Solar Flow Card — Configuration',
    ed_general:       '⚙️ Général',
    ed_pv:            '☀️ Production PV',
    ed_batt:          '🔋 Batterie',
    ed_grid:          '🏗️ Réseau & Maison',
    ed_meteo:         '⛅ Météo & Soleil',
    ed_colors:        '🎨 Couleurs',
    ed_display:       '👁️ Affichage',
    ed_card_title:    'Titre de la carte',
    ed_lat:           'Latitude',
    ed_lon:           'Longitude',
    ed_pv_max:        'PV max (W)',
    ed_pv_max_desc:   'Puissance crête installée',
    ed_batt_cap:      'Capacité batterie (kWh)',
    ed_language:      'Langue',
    ed_pv_power:      'Puissance PV (W)',
    ed_pv_today:      "PV aujourd'hui (kWh)",
    ed_pv_total:      'PV total (kWh)',
    ed_batt_soc:      'SOC (%)',
    ed_batt_voltage:  'Tension (V)',
    ed_batt_mode:     'Mode (0=charge, 1=décharge)',
    ed_batt_temp:     'Température BMS (°C)',
    ed_batt_power:    'Puissance charge / décharge batterie (W)',
    ed_batt_chg:      'Charge auj. (kWh)',
    ed_batt_dis:      'Décharge auj. (kWh)',
    ed_min_cell:      'Tension min cellule (V)',
    ed_max_cell:      'Tension max cellule (V)',
    ed_remaining:     'Énergie restante (kWh)',
    ed_grid_power:    'Puissance réseau (W)',
    ed_home_power:    'Consommation maison (W)',
    ed_pwr_pct:       'Puissance sortie (%)',
    ed_today_load:    'Conso. maison auj. (kWh)',
    ed_weather:       'Entité météo (weather.*)',
    ed_ext_temp:      'Température extérieure',
    ed_sun_elev:      'Élévation solaire',
    ed_sun_az:        'Azimut solaire',
    ed_sun_rise:      'Heure lever',
    ed_sun_set:       'Heure coucher',
    ed_sun_info:      '💡 Les entités soleil sont <strong>optionnelles</strong> — si absentes, la position est calculée depuis les coordonnées GPS.',
    ed_col_solar:     'Couleur solaire',
    ed_col_grid:      'Couleur réseau',
    ed_col_batt:      'Couleur batterie',
    ed_col_home:      'Couleur maison',
    ed_col_bg:        'Couleur fond',
    ed_show_bars:     'Barres de progression',
    ed_show_mode:     'Mode batterie',
    ed_show_bms:      'Température BMS',
    ed_show_total_pv: 'Total PV généré',
    ed_show_cells:    'Tensions cellules',
    ed_show_endurance:'Autonomie batterie',
    ed_show_inverter: 'Section Onduleur',
    ed_apply:         '💾 Appliquer les modifications',
    ed_saved:         '✓ Configuration sauvegardée',
    ed_saved_note:    'Appuyez sur Appliquer après chaque modification.',
    ed_reset:         '↺ Réinitialiser',
    // Images
    ed_images:             '🖼️ Images',
    ed_show_images:        'Affichage avec images',
    ed_images_info:        '📁 Placez vos images dans <strong>/config/www/solar-flow-card/img/</strong>',
    ed_img_house:          'Maison (house.png)',
    ed_img_battery:        'Batterie (battery.png)',
    ed_img_grid:           'Réseau (grid.png)',
    ed_img_scene_mode:      'Mode scène',
    ed_img_scene_mode_separate: 'Séparé (grid / house / battery)',
    ed_img_scene_mode_single: 'Unique (jour/nuit)',
    ed_img_scene_variant:   'Variante scène',
    ed_img_scene_variant_ev:'ESC + EV',
    ed_img_scene_variant_spa:'ESC + SPA',
    ed_img_scene_day:       'Scène jour (générique)',
    ed_img_scene_night:     'Scène nuit (générique)',
    ed_img_scene_day_ev:    'Scène jour ESC + EV',
    ed_img_scene_night_ev:  'Scène nuit ESC + EV',
    ed_img_scene_day_spa:   'Scène jour ESC + SPA',
    ed_img_scene_night_spa: 'Scène nuit ESC + SPA',
    ed_img_overlay1:       'Overlay 1 — chemin image',
    ed_img_overlay1_label: 'Overlay 1 — label',
    ed_img_overlay2:       'Overlay 2 — chemin image',
    ed_img_overlay2_label: 'Overlay 2 — label',
    // Routeurs
    ed_routers:         '⚡ Routeurs solaires',
    ed_routers_info:    '💡 Affichez les équipements pilotés par routeur solaire (spa, chauffe-eau...) avec leur flux temps réel.',
    ed_router:          'Routeur',
    ed_router_enabled:  'Activer',
    ed_router_label:    'Nom affiché',
    ed_router_img:      'Image (chemin)',
    ed_router_power:    'Entité puissance (W)',
    ed_router_energy:   'Entité énergie jour (kWh)',
    ed_router_pos:      'Position dans la scène',
    ed_pos_left:        'Gauche',
    ed_pos_center:      'Centre',
    ed_pos_right:       'Droite',
  },
  en: {
    // Header
    status_idle:       'IDLE',
    status_producing:  'PRODUCING',
    status_charging:   'CHARGING',
    status_discharge:  'DISCHARGE',
    // Flow nodes
    node_grid:    'Grid',
    node_home:    'Home',
    node_battery: 'Battery',
    dir_import:   '↓ Import',
    dir_export:   '↑ Export',
    // Metric cards
    lbl_mode:     'Mode',
    lbl_bms_temp: 'BMS Temp',
    lbl_total_pv: 'Total PV',
    lbl_min_cell: 'Min Cell',
    lbl_max_cell: 'Max Cell',
    lbl_batt_dis: 'Batt Dis.',
    lbl_endurance:'Endurance',
    // Mode values
    mode_charge:    'Charge',
    mode_discharge: 'Discharge',
    mode_idle:      'Idle',
    // Section
    section_inverter: 'Inverter',
    // Inverter cards
    inv_today_pv:   'Today PV',
    inv_chg_dis:    'CHG / DIS',
    inv_remaining:  'Remaining',
    inv_today_load: 'Today Load',
    // Sun labels
    sun_rise: '🌅',
    sun_set:  '🌇',
    // Editor
    ed_title:         'Solar Flow Card — Configuration',
    ed_general:       '⚙️ General',
    ed_pv:            '☀️ PV Production',
    ed_batt:          '🔋 Battery',
    ed_grid:          '🏗️ Grid & Home',
    ed_meteo:         '⛅ Weather & Sun',
    ed_colors:        '🎨 Colors',
    ed_display:       '👁️ Display',
    ed_card_title:    'Card title',
    ed_lat:           'Latitude',
    ed_lon:           'Longitude',
    ed_pv_max:        'PV max (W)',
    ed_pv_max_desc:   'Peak installed power',
    ed_batt_cap:      'Battery capacity (kWh)',
    ed_language:      'Language',
    ed_pv_power:      'PV power (W)',
    ed_pv_today:      'PV today (kWh)',
    ed_pv_total:      'PV total (kWh)',
    ed_batt_soc:      'SOC (%)',
    ed_batt_voltage:  'Voltage (V)',
    ed_batt_mode:     'Mode (0=charge, 1=discharge)',
    ed_batt_temp:     'BMS temperature (°C)',
    ed_batt_power:    'Battery charge / discharge power (W)',
    ed_batt_chg:      'Charge today (kWh)',
    ed_batt_dis:      'Discharge today (kWh)',
    ed_min_cell:      'Min cell voltage (V)',
    ed_max_cell:      'Max cell voltage (V)',
    ed_remaining:     'Remaining energy (kWh)',
    ed_grid_power:    'Grid power (W)',
    ed_home_power:    'Home consumption (W)',
    ed_pwr_pct:       'Output pack power (%)',
    ed_today_load:    'Home load today (kWh)',
    ed_weather:       'Weather entity (weather.*)',
    ed_ext_temp:      'Outside temperature',
    ed_sun_elev:      'Sun elevation',
    ed_sun_az:        'Sun azimuth',
    ed_sun_rise:      'Sunrise time',
    ed_sun_set:       'Sunset time',
    ed_sun_info:      '💡 Sun entities are <strong>optional</strong> — if absent, position is calculated from GPS coordinates.',
    ed_col_solar:     'Solar color',
    ed_col_grid:      'Grid color',
    ed_col_batt:      'Battery color',
    ed_col_home:      'Home color',
    ed_col_bg:        'Background color',
    ed_show_bars:     'Progress bars',
    ed_show_mode:     'Battery mode',
    ed_show_bms:      'BMS temperature',
    ed_show_total_pv: 'Total PV generated',
    ed_show_cells:    'Cell voltages',
    ed_show_endurance:'Battery endurance',
    ed_show_inverter: 'Inverter section',
    ed_apply:         '💾 Apply changes',
    ed_saved:         '✓ Configuration saved',
    ed_saved_note:    'Press Apply after each change.',
    ed_reset:         '↺ Reset',
    // Images
    ed_images:             '🖼️ Images',
    ed_show_images:        'Image display',
    ed_images_info:        '📁 Place your images in <strong>/config/www/solar-flow-card/img/</strong>',
    ed_img_house:          'House (house.png)',
    ed_img_battery:        'Battery (battery.png)',
    ed_img_grid:           'Grid (grid.png)',
    ed_img_scene_mode:      'Scene mode',
    ed_img_scene_mode_separate: 'Separate (grid / house / battery)',
    ed_img_scene_mode_single: 'Single image (day/night)',
    ed_img_scene_variant:   'Scene variant',
    ed_img_scene_variant_ev:'ESC + EV',
    ed_img_scene_variant_spa:'ESC + SPA',
    ed_img_scene_day:       'Scene image - day (generic)',
    ed_img_scene_night:     'Scene image - night (generic)',
    ed_img_scene_day_ev:    'Scene image - day ESC + EV',
    ed_img_scene_night_ev:  'Scene image - night ESC + EV',
    ed_img_scene_day_spa:   'Scene image - day ESC + SPA',
    ed_img_scene_night_spa: 'Scene image - night ESC + SPA',
    ed_img_overlay1:       'Overlay 1 — image path',
    ed_img_overlay1_label: 'Overlay 1 — label',
    ed_img_overlay2:       'Overlay 2 — image path',
    ed_img_overlay2_label: 'Overlay 2 — label',
    // Routers
    ed_routers:         '⚡ Solar routers',
    ed_routers_info:    '💡 Display devices controlled by solar router (spa, water heater...) with real-time flow.',
    ed_router:          'Router',
    ed_router_enabled:  'Enable',
    ed_router_label:    'Display name',
    ed_router_img:      'Image (path)',
    ed_router_power:    'Power entity (W)',
    ed_router_energy:   'Daily energy entity (kWh)',
    ed_router_pos:      'Position in scene',
    ed_pos_left:        'Left',
    ed_pos_center:      'Center',
    ed_pos_right:       'Right',
  },
};

function t(cfg, key) {
  const lang = (cfg && cfg.language) || 'fr';
  const dict = I18N[lang] || I18N['fr'];
  return dict[key] || I18N['fr'][key] || key;
}


// ══════════════════════════════════════════════════════════
//  ASTRONOMY
// ══════════════════════════════════════════════════════════
function deg2rad(d) { return d * Math.PI / 180; }
function rad2deg(r) { return r * 180 / Math.PI; }

function computeSunPosition(date, lat, lon) {
  const JD = date.getTime() / 86400000 + 2440587.5;
  const n = JD - 2451545.0;
  const L = (280.460 + 0.9856474 * n) % 360;
  const g = deg2rad((357.528 + 0.9856003 * n) % 360);
  const λ = deg2rad(L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g));
  const ε = deg2rad(23.439 - 0.0000004 * n);
  const sinDec = Math.sin(ε) * Math.sin(λ);
  const dec = Math.asin(sinDec);
  const UT = date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600;
  const GMST = (6.697375 + 0.0657098242 * n + UT) % 24;
  const LST = (GMST + lon / 15 + 24) % 24;
  const HA = deg2rad((LST - 12) * 15);
  const latR = deg2rad(lat);
  const sinAlt = Math.sin(latR) * sinDec + Math.cos(latR) * Math.cos(dec) * Math.cos(HA);
  const elevation = rad2deg(Math.asin(sinAlt));
  const cosAz = (sinDec - Math.sin(latR) * sinAlt) / (Math.cos(latR) * Math.cos(Math.asin(sinAlt)));
  let azimuth = rad2deg(Math.acos(Math.max(-1, Math.min(1, cosAz))));
  if (Math.sin(HA) > 0) azimuth = 360 - azimuth;
  return { elevation, azimuth };
}

function computeSunriseSunset(date, lat, lon) {
  // Calcule lever/coucher en travaillant UNIQUEMENT en millisecondes UTC.
  // Aucun appel à getHours(), setHours(), getTimezoneOffset() pour éviter
  // tout problème de fuseau horaire côté navigateur/serveur HA.
  //
  // Algorithme NOAA simplifié. Retourne des objets Date (timestamps UTC)
  // représentant le lever et coucher du jour de `date`.

  const latR = deg2rad(lat);

  // Jour julien du midi UTC du jour de `date`
  // On prend minuit UTC du jour en cours, puis +12h
  const msPerDay = 86400000;
  const midnightUTC = date.getTime() - (date.getTime() % msPerDay);
  const JD_noon = midnightUTC / msPerDay + 2440587.5 + 0.5; // midi UTC
  const n = JD_noon - 2451545.0;

  // Anomalie moyenne et longitude écliptique
  const g = deg2rad(((357.528 + 0.9856003 * n) % 360 + 360) % 360);
  const L = ((280.460 + 0.9856474 * n) % 360 + 360) % 360;
  const lambda = deg2rad(L + 1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g));

  // Déclinaison
  const eps  = deg2rad(23.439 - 0.0000004 * n);
  const decl = Math.asin(Math.sin(eps) * Math.sin(lambda));

  // Équation du temps (en jours)
  const RA   = Math.atan2(Math.cos(eps) * Math.sin(lambda), Math.cos(lambda));
  const EoT  = ((L / 360 - RA / (2 * Math.PI) + 0.5) % 1 - 0.5);
  // Correction longitude (en jours) : lon°/360 jours
  const lonCorr = lon / 360;

  // Demi-durée du jour (en jours)
  const cosH = (Math.cos(deg2rad(90.833)) - Math.sin(latR) * Math.sin(decl)) /
               (Math.cos(latR) * Math.cos(decl));
  if (Math.abs(cosH) > 1) return { sunrise: null, sunset: null };
  const H = Math.acos(cosH) / (2 * Math.PI); // en jours

  // Midi solaire vrai (en jours juliens)
  const JD_transit = 2451545.0 + 0.0009 + lonCorr + n - EoT;

  // Lever et coucher (en jours juliens)
  const JD_rise = JD_transit - H;
  const JD_set  = JD_transit + H;

  // Convertir en millisecondes UTC (timestamp JS)
  function jdToMs(jd) {
    return (jd - 2440587.5) * msPerDay;
  }

  return {
    sunrise: new Date(jdToMs(JD_rise)),
    sunset:  new Date(jdToMs(JD_set)),
  };
}
function formatTime(d) {
  if (!d) return '--:--';
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

// ══════════════════════════════════════════════════════════
//  WEATHER
// ══════════════════════════════════════════════════════════
const WEATHER_MAP = {
  // cond : { icon, label, cloudy, rain, snow, fog, storm, cloudCover(0-1), sunVisible }
  sunny:               { icon:'☀️',  label:'Ensoleillé',   cloudy:false, rain:false, snow:false, fog:false, storm:false, cloud:0.0, sun:true  },
  partlycloudy:        { icon:'⛅',  label:'Mi-couvert',   cloudy:true,  rain:false, snow:false, fog:false, storm:false, cloud:0.4, sun:true  },
  cloudy:              { icon:'☁️',  label:'Couvert',      cloudy:true,  rain:false, snow:false, fog:false, storm:false, cloud:0.9, sun:false },
  rainy:               { icon:'🌧️', label:'Pluie',        cloudy:true,  rain:true,  snow:false, fog:false, storm:false, cloud:0.85,sun:false },
  pouring:             { icon:'⛈️', label:'Averse',       cloudy:true,  rain:true,  snow:false, fog:false, storm:false, cloud:1.0, sun:false },
  'lightning-rainy':   { icon:'⛈️', label:'Orage',        cloudy:true,  rain:true,  snow:false, fog:false, storm:true,  cloud:1.0, sun:false },
  lightning:           { icon:'🌩️', label:'Foudre',       cloudy:true,  rain:false, snow:false, fog:false, storm:true,  cloud:1.0, sun:false },
  fog:                 { icon:'🌫️', label:'Brouillard',   cloudy:true,  rain:false, snow:false, fog:true,  storm:false, cloud:1.0, sun:false },
  snowy:               { icon:'❄️',  label:'Neige',        cloudy:true,  rain:false, snow:true,  fog:false, storm:false, cloud:0.95,sun:false },
  'snowy-rainy':       { icon:'🌨️', label:'Grésil',       cloudy:true,  rain:true,  snow:true,  fog:false, storm:false, cloud:1.0, sun:false },
  hail:                { icon:'🌨️', label:'Grêle',        cloudy:true,  rain:true,  snow:false, fog:false, storm:false, cloud:1.0, sun:false },
  windy:               { icon:'💨',  label:'Venteux',      cloudy:false, rain:false, snow:false, fog:false, storm:false, cloud:0.1, sun:true  },
  'windy-variant':     { icon:'🌬️', label:'Vent fort',    cloudy:false, rain:false, snow:false, fog:false, storm:false, cloud:0.2, sun:true  },
  exceptional:         { icon:'⚠️',  label:'Exceptionnel', cloudy:false, rain:false, snow:false, fog:false, storm:false, cloud:0.0, sun:true  },
  'clear-night':       { icon:'🌙',  label:'Nuit claire',  cloudy:false, rain:false, snow:false, fog:false, storm:false, cloud:0.0, sun:false },
  'partly-cloudy-night':{ icon:'🌛', label:'Nuit nuageuse',cloudy:true,  rain:false, snow:false, fog:false, storm:false, cloud:0.4, sun:false },
};
function getWeather(cond) {
  return WEATHER_MAP[cond] || { icon:'🌡️', label:cond||'—', cloudy:false, rain:false, snow:false, fog:false, storm:false, cloud:0, sun:true };
}

// ══════════════════════════════════════════════════════════
//  MOON
// ══════════════════════════════════════════════════════════
const MOON_PHASES = {
  'new_moon':           { icon: '🌑', label: 'Nouvelle lune' },
  'waxing_crescent':    { icon: '🌒', label: 'Croissant croissant' },
  'first_quarter':      { icon: '🌓', label: 'Premier quartier' },
  'waxing_gibbous':     { icon: '🌔', label: 'Gibbeuse croissante' },
  'full_moon':          { icon: '🌕', label: 'Pleine lune' },
  'waning_gibbous':     { icon: '🌖', label: 'Gibbeuse décroissante' },
  'last_quarter':       { icon: '🌗', label: 'Dernier quartier' },
  'waning_crescent':    { icon: '🌘', label: 'Croissant décroissant' },
};


// ══════════════════════════════════════════════════════════
//  SKY GRADIENT
// ══════════════════════════════════════════════════════════
function skyGradient(elev, wi) {
  // wi peut être un objet weather ou un booléen (compat. ancien code)
  const cloudy = (typeof wi === 'boolean') ? wi : (wi && wi.cloudy);
  const rain   = wi && wi.rain;
  const snow   = wi && wi.snow;
  const fog    = wi && wi.fog;
  const storm  = wi && wi.storm;

  // Orage : ciel très sombre, reflets violets/verts
  if (storm) return elev > 0
    ? 'linear-gradient(180deg,#1a1a2e 0%,#2d2060 30%,#1a3040 70%,#0a1020 100%)'
    : 'linear-gradient(180deg,#0d0d1a 0%,#1a1540 100%)';

  // Brouillard : blanc-gris laiteux
  if (fog) return 'linear-gradient(180deg,#b0bec5 0%,#cfd8dc 40%,#90a4ae 100%)';

  // Neige : ciel blanc-gris perle
  if (snow) return elev > 0
    ? 'linear-gradient(180deg,#546e7a 0%,#90a4ae 40%,#b0bec5 100%)'
    : 'linear-gradient(180deg,#37474f 0%,#546e7a 100%)';

  // Pluie : ciel gris-bleu lourd
  if (rain) return elev > 0
    ? 'linear-gradient(180deg,#263238 0%,#37474f 30%,#455a64 60%,#2a3f4f 100%)'
    : 'linear-gradient(180deg,#1c2833 0%,#2c3e50 100%)';

  // Ciel couvert classique
  if (cloudy) {
    if (elev > 20) return 'linear-gradient(180deg,#4a5568 0%,#6b7280 40%,#3d4f60 100%)';
    if (elev > 5)  return 'linear-gradient(180deg,#374151 0%,#4a5568 50%,#2a3547 100%)';
    if (elev > 0)  return 'linear-gradient(180deg,#374151 0%,#8a7060 40%,#111827 100%)';
    return 'linear-gradient(180deg,#1f2937 0%,#111827 100%)';
  }

  // Ciel dégagé selon élévation
  if (elev > 45) return 'linear-gradient(180deg,#003580 0%,#0055bb 30%,#0080e0 60%,#40aaff 80%,#1a3a5c 100%)';
  if (elev > 20) return 'linear-gradient(180deg,#004090 0%,#0066cc 25%,#1a8fe8 55%,#55c0ff 75%,#0c2040 100%)';
  if (elev > 5)  return 'linear-gradient(180deg,#1e3a6f 0%,#e8742a 25%,#f4924c 45%,#90c0e0 65%,#0c2040 100%)';
  if (elev > 0)  return 'linear-gradient(180deg,#1a2a4a 0%,#c05018 20%,#e87030 35%,#f0a060 50%,#406080 70%,#0c1f3a 100%)';
  if (elev > -6) return 'linear-gradient(180deg,#0f172a 0%,#1e2d4a 35%,#3d2060 65%,#1e1b4b 100%)';
  return 'linear-gradient(180deg,#020617 0%,#060d1a 40%,#0d0820 100%)';
}

// ══════════════════════════════════════════════════════════
//  CSS
// ══════════════════════════════════════════════════════════
const CARD_CSS = `
  :host { display: block; }
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .sfc-root {
    font-family: 'Exo 2', 'Roboto', sans-serif;
    background: var(--sfc-bg, #060d1a);
    border-radius: 18px;
    overflow: hidden;
    color: var(--sfc-text, #e8f4fd);
    isolation: isolate;
    position: relative;
    z-index: 0;
    --solar:  var(--sfc-solar,  #FFD700);
    --grid:   var(--sfc-grid,   #4FC3F7);
    --batt:   var(--sfc-batt,   #69FF47);
    --home:   var(--sfc-home,   #FF6B6B);
    --card:   rgba(255,255,255,0.04);
    --border: rgba(255,255,255,0.08);
    --muted:  rgba(232,244,253,0.5);
  }

  /* ── Header ── */
  .sfc-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px;
    background: rgba(255,255,255,0.03);
    border-bottom: 1px solid var(--border);
  }
  .sfc-title-row { display: flex; align-items: center; gap: 8px; }
  .sfc-title { font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
  .sfc-badge {
    font-size: 9px; font-weight: 700; letter-spacing: 1.2px; padding: 2px 8px;
    border-radius: 20px; text-transform: uppercase; transition: all .5s;
  }
  .sfc-badge.idle        { background: rgba(100,100,120,.4); color:#aaa; border:1px solid rgba(180,180,200,.2); }
  .sfc-badge.producing   { background: rgba(255,215,0,.15);  color:var(--solar); border:1px solid rgba(255,215,0,.3); }
  .sfc-badge.charging    { background: rgba(105,255,71,.15); color:var(--batt);  border:1px solid rgba(105,255,71,.3); }
  .sfc-badge.discharging { background: rgba(255,107,107,.15);color:var(--home);  border:1px solid rgba(255,107,107,.3); }
  .sfc-weather { display:flex; align-items:center; gap:6px; font-size:12px; color:var(--muted); }
  .sfc-weather-temp { font-weight:700; color:var(--sfc-text,#e8f4fd); }
  .sfc-live-dot { width:6px;height:6px;border-radius:50%;background:var(--batt);animation:sfc-blink 2s infinite; }
  @keyframes sfc-blink { 0%,100%{opacity:1}50%{opacity:.2} }

  /* ── Sky scene ── */
  .sfc-scene { position:relative; overflow:hidden; isolation:isolate; }
  .sfc-sun-arc-svg { position:absolute;inset:0;width:100%;height:100%; }
  .sfc-sun-orb {
    position:absolute; width:34px;height:34px; border-radius:50%;
    transform:translate(-50%,-50%); transition:left 20s ease,top 20s ease;
    z-index:4; pointer-events:none;
  }
  .sfc-sun-inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: radial-gradient(circle,
      #ffffff 0%,
      #ffe17a 25%,
      #ffc400 50%,
      rgba(255,200,0,0.4) 70%,
      transparent 100%
    );

  box-shadow:
    0 0 30px rgba(255,200,0,0.9),
    0 0 80px rgba(255,180,0,0.6),
    0 0 160px rgba(255,150,0,0.3);

  animation: sfc-sun-pulse 3s ease-in-out infinite;
}
  @keyframes sfc-sun-pulse {
    0%,100%{transform:scale(1);box-shadow:0 0 20px 8px rgba(255,200,0,.6),0 0 60px 20px rgba(255,150,0,.25)}
    50%{transform:scale(1.1);box-shadow:0 0 28px 12px rgba(255,200,0,.75),0 0 80px 30px rgba(255,150,0,.4)}
  }
  .sfc-pv-badge {
    position:absolute;top:10px;left:50%;transform:translateX(-50%);
    background:rgba(0,0,0,.5);border:1px solid rgba(255,215,0,.3);border-radius:20px;
    padding:4px 14px;display:flex;align-items:center;gap:6px;backdrop-filter:blur(8px);z-index:3;
  }
  .sfc-pv-val { font-family:monospace;font-size:15px;font-weight:700;color:var(--solar);text-shadow:0 0 10px rgba(255,215,0,.6); }
  .sfc-sun-time { position:absolute;top:8px;right:10px;font-family:monospace;font-size:10px;font-weight:600;
    color:var(--solar);background:rgba(0,0,0,.4);padding:2px 7px;border-radius:7px;border:1px solid rgba(255,215,0,.2);z-index:3; }
  .sfc-sunrise { position:absolute;bottom:190px;left:10px;font-size:9px;color:var(--muted);font-weight:600;z-index:3; }
  .sfc-sunset  { position:absolute;bottom:190px;right:10px;font-size:9px;color:var(--muted);font-weight:600;z-index:3; }

  /* ── Flow scene ── */
  /* ══════════════════════════════════════════
     SCÈNE UNIFIÉE — version stable
  ══════════════════════════════════════════ */
  .sfc-unified-scene {
    position: relative;
    overflow: hidden;
    isolation: isolate;
  }
  /* Ciel */
  .sfc-sky { position:absolute;inset:0;transition:background 20s linear; z-index: 0;}
  .sfc-stars { position:absolute;inset:0;pointer-events:none;transition:opacity 3s; z-index: 0;}
  .sfc-star { position:absolute;border-radius:50%;background:#fff;animation:sfc-twinkle 2s infinite alternate; }
  @keyframes sfc-twinkle { 0%{opacity:.1}100%{opacity:.95} }
  /* Nuages */
  .sfc-clouds { position:absolute;inset:0;pointer-events:none;overflow:hidden; z-index: 1;}
  .sfc-cloud-shape {
    position:absolute;
    background:rgba(255,255,255,0.55);
    border-radius:999px;
    overflow:hidden;
    background-clip:padding-box;
    filter:blur(10px);
    transform:translateZ(0);
    -webkit-transform:translateZ(0);
    -webkit-backface-visibility:hidden;
    animation:sfc-cloud-move linear infinite;
  }
  @keyframes sfc-cloud-move { 0%{left:-200px} 100%{left:calc(100% + 200px)} }
  /* Arc solaire */
  .sfc-sun-arc-svg { position:absolute;inset:0;width:100%;height:100%; }
  .sfc-sun-arc-svg path { stroke-linecap:round; stroke-linejoin:round; }
  .sfc-sun-arc-svg .sfc-sun-arc-bg { stroke-dasharray:none; opacity:0.7; }
  .sfc-sun-arc-svg .sfc-sun-arc-active { filter:drop-shadow(0 0 10px rgba(255,215,0,0.35)); }
  /* Horizon */
  .sfc-horizon { display:none; }
  /* Sol fondu */
  .sfc-ground {
    position:absolute;
    bottom:0; left:0; right:0;
    height:22%;
    background:linear-gradient(180deg,
      rgba(6,13,26,0) 0%,
      rgba(6,13,26,0.75) 20%,
      rgba(6,13,26,0.97) 60%,
      rgba(6,13,26,1) 100%);
    pointer-events:none;
  }
  /* Plan d'eau */
  .sfc-water {
    position:absolute;
    bottom:0; left:0; right:0;
    height:25%;
    background:linear-gradient(180deg,
      rgba(20,60,120,0.0) 0%,
      rgba(20,60,120,0.5) 35%,
      rgba(8,25,60,0.88) 100%);
    z-index:1;
  }
  .sfc-water::before {
    content:'';
    position:absolute;inset:0;
  }
  @keyframes sfc-ripple { 0%{background-position-x:0} 100%{background-position-x:40px} }
  .sfc-water-line {
    position:absolute;
    bottom:22%; left:0; right:0;
    height:1px;
    background:linear-gradient(90deg,
      transparent 0%,
      rgba(100,180,255,0.35) 15%,
      rgba(160,220,255,0.80) 50%,
      rgba(100,180,255,0.35) 85%,
      transparent 100%);
    z-index:2;
  }
  /* Zone énergie — v1.3.1 style */
  .sfc-energy-row {
    position:absolute;
    bottom:0; left:0; right:0;
    height:44%;
    display:flex;
    align-items:flex-end;
    justify-content:space-between;
    padding:0 8px 10px;
    padding-bottom: 18px;
    z-index:3;
  }
  .sfc-energy-row .sfc-flow-svg {
    position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;top:80px;
  }
  .sfc-scene-image-wrap {
    position: absolute;
    inset: 0;                    /* couvre toute la scène */
    z-index: 2;                  /* au-dessus du ciel z-index:0 */
    pointer-events: none;
    /* PAS de overflow:hidden — laisser le PNG transparent respirer */
  }

  .sfc-scene-image-wrap .sfc-scene-image {
    width: 100%;
    height: 100%;
    object-fit: contain;         /* respecte les proportions du PNG */
    object-position: bottom center;
    display: block;
    /* PAS de mask-image — le PNG transparent fait le travail seul */
  }
  /* Nœuds images */
  .sfc-img-node {
    display:flex; flex-direction:column; align-items:center; gap:4px;
    z-index:2; position:relative; flex:1;
  }
  
  .sfc-img-node img {
    object-fit: contain;
    filter: drop-shadow(0 6px 18px rgba(0,0,0,0.6));
    transition: transform 0.3s, filter 0.3s;
  }
  
  .sfc-img-node.active img {
    transform: translateY(-3px) scale(1.03);
  }
  
  #sfcRouterNode1 {
    transform: translateY(8px);
  }
  
  .sfc-router-node::after {
    content: '';
    width: 60%;
    height: 6px;
    background: radial-gradient(ellipse, rgba(0,0,0,0.4), transparent);
    border-radius: 50%;
    margin-top: 4px;
  }
  .sfc-router-node.active .sfc-router-label {
    color: #FFA040;
  }

  .sfc-router-node.active::before {
    content: '';
    position: absolute;
    inset: -10px;
    border-radius: 12px;
    background: radial-gradient(circle, rgba(255,165,0,0.15), transparent);
    z-index: -1;
  }

  .sfc-img-node.node-grid    img { height:70px; }
  .sfc-img-node.node-home    img { height:100px; margin-bottom:-10px; }
  .sfc-img-node.node-overlay img { height:60px; }
  .sfc-img-node.charging     img { filter:drop-shadow(0 0 14px rgba(105,255,71,0.8)); }
  .sfc-img-node.discharging  img { filter:drop-shadow(0 0 14px rgba(255,107,107,0.8)); }

  /* ══ BATTERIE LIQUIDE — version stable ══ */
  .sfc-img-node.node-battery img { height:70px; }
  .sfc-batt-wrapper {
    transform: translateY(4px);
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    isolation: isolate;
    top: 15px;
  }

  /* Zone liquide calibrée dans le cylindre */
  .sfc-batt-liquid-wrap {
    position: absolute;
    top: 18%;
    bottom: 31%;
    left: 36%;
    right: 36%;
    border-radius: 2px;
    overflow: hidden;
    z-index: 1;
  }
  .sfc-batt-empty {
    position:absolute;inset:0;
    background:rgba(10,20,40,0.7);
  }
  .sfc-batt-fill {
    position:absolute;
    bottom:0; left:0; right:0;
    height:0%;
    transition:height 2s cubic-bezier(0.4,0,0.2,1);
    background:linear-gradient(180deg,
      rgba(0,220,255,0.9) 0%,
      rgba(0,160,255,1) 40%,
      rgba(0,100,220,1) 100%);
    border-radius:4px 4px 0 0;
  }
  .sfc-batt-wave {
    position:absolute;
    bottom:0; left:0; right:0;
    height:0%;
    transition:height 2s cubic-bezier(0.4,0,0.2,1);
    overflow:hidden;
  }
  .sfc-batt-wave::before {
    content:'';
    position:absolute;
    top:-8px; left:-60%;
    width:220%; height:16px;
    background:rgba(255,255,255,0.35);
    border-radius:50%;
    animation:sfc-wave 2.5s linear infinite;
  }
  .sfc-batt-wave::after {
    content:'';
    position:absolute;
    top:-5px; left:-40%;
    width:180%; height:10px;
    background:rgba(255,255,255,0.2);
    border-radius:50%;
    animation:sfc-wave 3.5s linear infinite reverse;
  }
  @keyframes sfc-wave { from{transform:translateX(0)} to{transform:translateX(45%)} }
  /* Image batterie au-dessus (mix-blend-mode:screen = fond blanc→visible, fond noir→transparent) */
  .sfc-batt-img {
    mix-blend-mode: normal;
    background: transparent;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    /* z-index 2 = AU-DESSUS du liquide (z-index 1)
       Pas de mix-blend-mode : le fond noir de battery.png
       masque naturellement le liquide hors du cylindre. */
    z-index: 0;
    pointer-events: none;
    filter: drop-shadow(0 4px 16px rgba(0,0,0,0.6));
    transition: filter 0.5s;
  }
  .sfc-batt-shine {
    position:absolute;
    top:14%; left:22%; right:55%; bottom:12%;
    background:linear-gradient(180deg,rgba(255,255,255,0.25) 0%,rgba(255,255,255,0.05) 100%);
    border-radius:4px;
    z-index:3;
    pointer-events:none;
    opacity: 0.1;
  }
  .sfc-batt-soc-text {
    position:absolute;
    top:50%; left:50%;
    transform:translate(-50%,-50%);
    font-family:monospace;
    font-size:15px; font-weight:900;
    color:#fff;
    text-shadow:0 1px 4px rgba(0,0,0,0.9), 0 0 12px rgba(0,200,255,0.6);
    z-index:4;
    pointer-events:none;
  }
  .sfc-batt-wrapper.charging .sfc-batt-fill {
    background:linear-gradient(180deg,rgba(105,255,71,0.9) 0%,rgba(0,200,100,1) 40%,rgba(0,140,60,1) 100%);
    animation:sfc-batt-charge 2s ease-in-out infinite;
  }
  .sfc-batt-wrapper.discharging .sfc-batt-fill {
    background:linear-gradient(180deg,rgba(255,180,0,0.9) 0%,rgba(255,100,0,1) 40%,rgba(200,50,0,1) 100%);
  }
  .sfc-batt-wrapper.low .sfc-batt-fill {
    background:linear-gradient(180deg,rgba(255,80,80,0.9) 0%,rgba(200,20,20,1) 100%);
    animation:sfc-batt-low 1s ease-in-out infinite;
  }
  @keyframes sfc-batt-charge { 0%,100%{filter:brightness(1)} 50%{filter:brightness(1.3)} }
  @keyframes sfc-batt-low    { 0%,100%{opacity:1} 50%{opacity:0.55} }

  /* Labels */
  .sfc-img-label { font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);font-weight:700; }
  .sfc-img-val   { font-family:monospace;font-size:12px;font-weight:700;text-shadow:0 0 6px currentColor;transition:all .5s; }
  .sfc-img-sub   { font-size:9px;color:var(--muted); }

  /* ── Routeurs solaires ── */
  /* Les routeurs sont maintenant intégrés dans .sfc-energy-row */
  .sfc-router-row { display: contents; } /* dissout dans le flux flex parent */
  .sfc-router-node {
    display: flex; flex-direction: column; align-items: center; gap: 3px;
    pointer-events: auto;
  }
  .sfc-router-node img {
    object-fit: contain;
    filter: drop-shadow(0 2px 10px rgba(0,0,0,0.7));
    transition: filter 0.5s;
  }
  .sfc-router-node.active img {
    filter: drop-shadow(0 0 14px rgba(255,165,0,0.8)) drop-shadow(0 2px 10px rgba(0,0,0,0.5));
    animation: sfc-router-pulse 2s ease-in-out infinite;
  }
  @keyframes sfc-router-pulse {
    0%,100% { filter: drop-shadow(0 0 8px rgba(255,165,0,0.6)); }
    50%      { filter: drop-shadow(0 0 18px rgba(255,165,0,1)); }
  }
  .sfc-router-label {
    font-size: 8px; letter-spacing: 1px; text-transform: uppercase;
    color: var(--muted); font-weight: 700;
    background: rgba(6,13,26,0.6); padding: 1px 5px; border-radius: 4px;
  }
  .sfc-router-val {
    font-family: monospace; font-size: 11px; font-weight: 700;
    color: #FFA040; text-shadow: 0 0 6px rgba(255,160,64,0.6);
    background: rgba(6,13,26,0.55); padding: 1px 5px; border-radius: 4px;
  }
  .sfc-router-val.inactive { color: var(--muted); text-shadow: none; }
  /* Ligne de flux vers routeur */
  .sfc-router-svg {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 3;
  }
  .sfc-router-line {
    fill: none; stroke: #FFA040; stroke-width: 1.5;
    stroke-dasharray: 6 5; animation: sfc-dash 1.2s linear infinite;
    opacity: 0; transition: opacity 0.5s;
  }
  .sfc-router-line.active { opacity: 1; }

  .sfc-batt-flow-power {
    position:absolute;
    left: 72%;
    bottom: 28px;
    transform: translateX(-50%);
    z-index: 10;
    display: none;
    font-family: monospace;
    font-size: 11px;
    font-weight: 800;
    line-height: 1;
    color: var(--batt);
    text-shadow: 0 0 8px currentColor, 0 1px 4px rgba(102, 69, 69, 0.85);
    background: rgba(6,13,26,0.65);
    border: 1px solid rgba(105,255,71,0.25);
    border-radius: 6px;
    padding: 2px 7px;
    pointer-events: none;
    white-space: nowrap;
    }
    .sfc-batt-flow-power.discharge {
    color: #FFB340;
    border-color: rgba(255,179,64,0.28);
    }

  /* SOC bar under battery */
  .sfc-soc-bar {
    width: 50px; height: 4px; background: rgba(255,255,255,0.1);
    border-radius: 3px; overflow: hidden; margin-top: -2px;
  }
  .sfc-soc-fill {
    height: 100%; border-radius: 3px;
    background: linear-gradient(90deg, #69FF47, #00D4AA);
    transition: width 1.5s ease;
  }

  .sfc-flow {
    position:relative;height:160px;display:flex;align-items:center;
    justify-content:space-between;padding:10px 14px;
    background:linear-gradient(180deg,rgba(6,13,26,0) 0%,rgba(6,13,26,.95) 45%,rgba(6,13,26,1) 100%);
  }
  .sfc-flow-svg { position:absolute;inset:0;width:100%;height:100%;pointer-events:none; }
  .sfc-flow-core,
  .sfc-sun-flow-core {
    fill:none;
    color:var(--flow-color, #fff);
    stroke-linecap:round;
    opacity:.34;
    filter:drop-shadow(0 0 3px currentColor);
    transition:opacity .35s ease;
  }
  .sfc-flow-core { stroke-width:1.45; }
  .sfc-sun-flow-core { stroke-width:2; }
  .sfc-flow-neon,
  .sfc-flow-tail-mid,
  .sfc-flow-tail-long,
  .sfc-sun-flow-neon,
  .sfc-sun-flow-tail-mid,
  .sfc-sun-flow-tail-long {
    fill:none;
    color:var(--flow-color, #fff);
    stroke-linecap:round;
    transition:opacity .35s ease;
  }
  .sfc-flow-neon,
  .sfc-sun-flow-neon {
    stroke-dasharray:60 240;
    opacity:1;
    animation:sfc-neon-head-flow 2.15s linear infinite;
    filter:
      drop-shadow(0 0 2px currentColor)
      drop-shadow(0 0 6px currentColor)
      drop-shadow(0 0 12px currentColor);
  }
  .sfc-flow-tail-mid,
  .sfc-sun-flow-tail-mid {
    stroke-dasharray:172 128;
    opacity:.20;
    animation:sfc-neon-mid-flow 2.15s linear infinite;
    filter:
      blur(.7px)
      drop-shadow(0 0 7px currentColor)
      drop-shadow(0 0 14px currentColor);
  }
  .sfc-flow-tail-long,
  .sfc-sun-flow-tail-long {
    stroke-dasharray:264 36;
    opacity:.08;
    animation:sfc-neon-long-flow 2.15s linear infinite;
    filter:
      blur(1.6px)
      drop-shadow(0 0 18px currentColor);
  }
  .sfc-flow-neon { stroke-width:1.8; }
  .sfc-flow-tail-mid { stroke-width:2.4; }
  .sfc-flow-tail-long { stroke-width:3.2; }
  .sfc-sun-flow-neon { stroke-width:2.1; animation-duration:1.65s; }
  .sfc-sun-flow-tail-mid { stroke-width:2.8; animation-duration:1.65s; }
  .sfc-sun-flow-tail-long { stroke-width:3.6; animation-duration:1.65s; }
  .sfc-flow-core.inactive,
  .sfc-sun-flow-core.inactive { opacity:.08; }
  .sfc-flow-neon.inactive,
  .sfc-flow-tail-mid.inactive,
  .sfc-flow-tail-long.inactive,
  .sfc-sun-flow-neon.inactive,
  .sfc-sun-flow-tail-mid.inactive,
  .sfc-sun-flow-tail-long.inactive { opacity:0; animation:none; }

  @keyframes sfc-neon-head-flow {
    from { stroke-dashoffset: 0; }
    to   { stroke-dashoffset: -300; }
  }
  @keyframes sfc-neon-mid-flow {
    from { stroke-dashoffset: 56; }
    to   { stroke-dashoffset: -244; }
  }
  @keyframes sfc-neon-long-flow {
    from { stroke-dashoffset: 102; }
    to   { stroke-dashoffset: -198; }
  }

  .sfc-flow-line.inactive { animation:none;stroke-dasharray:4 8;opacity:.15; }
  @keyframes sfc-dash { to{stroke-dashoffset:-28} }
  .sfc-node { display:flex;flex-direction:column;align-items:center;gap:3px;z-index:2;min-width:60px; }
  .sfc-node-icon { font-size:28px; }
  .sfc-node-label { font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--muted);font-weight:700; }
  .sfc-node-val { font-family:monospace;font-size:12px;font-weight:700;text-shadow:0 0 6px currentColor;transition:all .5s; }
  .sfc-node-sub { font-size:9px;color:var(--muted); }
  .c-solar  { color:var(--solar); }
  .c-grid   { color:var(--grid); }
  .c-batt   { color:var(--batt); }
  .c-home   { color:var(--home); }
  .c-muted  { color:var(--muted); }

  /* ── Progress bars ── */
  .sfc-progress { display:flex;flex-direction:column;gap:7px;padding:10px 14px;
    background:var(--card);border-bottom:1px solid var(--border); }
  .sfc-prow { display:flex;align-items:center;gap:8px; }
  .sfc-plabel { width:26px;font-size:8px;letter-spacing:.5px;text-transform:uppercase;color:var(--muted);font-weight:700; }
  .sfc-ptrack { flex:1;height:6px;background:rgba(255,255,255,.06);border-radius:10px;overflow:hidden; }
  .sfc-pfill { height:100%;border-radius:10px;transition:width 1.5s cubic-bezier(.4,0,.2,1); }
  .sfc-pfill.pv   { background:linear-gradient(90deg,#A8FF3E,#FFD700); }
  .sfc-pfill.pwr  { background:linear-gradient(90deg,#4FC3F7,#0099FF); }
  .sfc-pfill.batt { background:linear-gradient(90deg,#69FF47,#00D4AA); }
  .sfc-ppct { width:32px;text-align:right;font-family:monospace;font-size:9px;font-weight:600; }

  /* ── Metric cards ── */
  .sfc-metrics { display:grid;gap:7px;padding:0 10px; }
  .sfc-metrics.cols-3 { grid-template-columns:1fr 1fr 1fr; }
  .sfc-metrics.cols-2 { grid-template-columns:1fr 1fr; }
  .sfc-mc {
    background:var(--card);border:1px solid var(--border);border-radius:11px;
    padding:9px 11px;display:flex;flex-direction:column;gap:3px;
    transition:background .2s;cursor:default;
  }
  .sfc-mc:hover { background:rgba(255,255,255,.07); }
  .sfc-mc-header { display:flex;align-items:center;gap:5px;font-size:8px;letter-spacing:1px;
    text-transform:uppercase;color:var(--muted);font-weight:700; }
  .sfc-mc-val { font-family:monospace;font-size:14px;font-weight:700;
    text-shadow:0 0 6px currentColor;transition:all .5s; }
  .sfc-mc-sub { font-size:9px;color:var(--muted);font-family:monospace; }

  /* ── Mode badge ── */
  .sfc-mode { display:inline-flex;align-items:center;gap:4px;padding:2px 8px;
    border-radius:20px;font-size:10px;font-weight:700;transition:all .5s; }
  .sfc-mode.discharge { background:rgba(255,107,107,.15);color:var(--home);border:1px solid rgba(255,107,107,.3); }
  .sfc-mode.charge    { background:rgba(105,255,71,.15);color:var(--batt);border:1px solid rgba(105,255,71,.3); }
  .sfc-mode.idle      { background:rgba(100,100,120,.3);color:#aaa;border:1px solid rgba(180,180,200,.2); }

  /* ── Endurance ── */
  .sfc-endurance {
    display:flex;align-items:center;justify-content:space-between;
    background:var(--card);border:1px solid var(--border);border-radius:11px;
    padding:9px 12px;margin:0 10px;
  }
  .sfc-end-left { display:flex;align-items:center;gap:7px;font-size:9px;
    letter-spacing:1px;text-transform:uppercase;color:var(--muted);font-weight:700; }
  .sfc-end-val { font-family:monospace;font-size:13px;font-weight:700;color:var(--batt);text-shadow:0 0 6px rgba(105,255,71,.4); }
  .sfc-end-sub { font-size:9px;color:var(--muted);margin-left:4px; }

  /* ── Section title ── */
  .sfc-section { font-size:8px;letter-spacing:2px;text-transform:uppercase;
    color:var(--muted);font-weight:700;display:flex;align-items:center;gap:5px;
    padding:0 10px; }
  .sfc-section::before { content:'';width:12px;height:2px;background:var(--solar);border-radius:1px; }

  /* ── Inverter ── */
  .sfc-inv { display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:7px;padding:0 10px; }
  .sfc-inv-card {
    background:var(--card);border:1px solid var(--border);border-radius:11px;
    padding:9px 6px;display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center;
    transition:background .2s;
  }
  .sfc-inv-card:hover { background:rgba(255,255,255,.07); }
  .sfc-inv-icon { font-size:18px; }
  .sfc-inv-label { font-size:7px;letter-spacing:.8px;text-transform:uppercase;color:var(--muted);font-weight:700; }
  .sfc-inv-val { font-family:monospace;font-size:10px;font-weight:700;text-shadow:0 0 5px currentColor; }
  .sfc-inv-sub { font-family:monospace;font-size:8px;color:var(--batt); }

  /* ── Spacer ── */
  .sfc-gap { height:8px; }

  /* ═══════════════════════════════════════
     EDITOR STYLES
  ═══════════════════════════════════════ */
  .sfc-editor {
    font-family: 'Roboto', sans-serif;
    background: #1a1a2e;
    color: #e0e0e0;
    padding: 0;
    border-radius: 12px;
    overflow: hidden;
  }
  .sfc-ed-title {
    background: linear-gradient(135deg, #0d7377, #14a085);
    padding: 14px 18px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .sfc-ed-section {
    border-bottom: 1px solid rgba(255,255,255,.08);
  }
  .sfc-ed-section-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 18px; cursor: pointer;
    background: rgba(255,255,255,.02);
    transition: background .2s;
    font-weight: 600; font-size: 13px; letter-spacing: .5px;
    user-select: none;
  }
  .sfc-ed-section-header:hover { background: rgba(255,255,255,.05); }
  .sfc-ed-section-header.active { color: #14a085; }
  .sfc-ed-chevron { transition: transform .2s; font-style: normal; }
  .sfc-ed-chevron.open { transform: rotate(180deg); }
  .sfc-ed-body { padding: 12px 18px 18px; display: none; flex-direction: column; gap: 12px; }
  .sfc-ed-body.open { display: flex; }
  .sfc-ed-row { display: flex; flex-direction: column; gap: 4px; }
  .sfc-ed-label { font-size: 11px; color: rgba(255,255,255,.6); font-weight: 500; }
  .sfc-ed-desc  { font-size: 10px; color: rgba(255,255,255,.35); margin-top: -2px; }
  .sfc-ed-input {
    background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.12);
    border-radius: 8px; padding: 8px 12px; color: #e0e0e0;
    font-size: 12px; outline: none; width: 100%;
    transition: border-color .2s;
    font-family: 'Roboto Mono', monospace;
  }
  .sfc-ed-input:focus { border-color: #14a085; }
  .sfc-ed-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .sfc-ed-toggle-row { display: flex; align-items: center; justify-content: space-between; padding: 4px 0; }
  .sfc-ed-toggle-label { font-size: 12px; color: rgba(255,255,255,.75); }
  .sfc-toggle {
    position: relative; width: 42px; height: 24px;
    background: rgba(255,255,255,.15); border-radius: 12px; cursor: pointer;
    transition: background .3s;
  }
  .sfc-toggle.on { background: #14a085; }
  .sfc-toggle::after {
    content: ''; position: absolute; top: 3px; left: 3px;
    width: 18px; height: 18px; border-radius: 50%; background: #fff;
    transition: transform .3s;
  }
  .sfc-toggle.on::after { transform: translateX(18px); }
  .sfc-color-row { display: flex; align-items: center; gap: 10px; }
  .sfc-color-swatch { width: 32px; height: 32px; border-radius: 8px; border: 2px solid rgba(255,255,255,.2); cursor: pointer; }
  .sfc-color-input { flex: 1; }
  .sfc-ed-number-row { display: flex; align-items: center; gap: 8px; }
  .sfc-ed-number { width: 80px; text-align: right; }
  .sfc-ed-slider { flex: 1; accent-color: #14a085; }
  .sfc-ed-actions {
    padding: 14px 18px;
    background: rgba(0,0,0,.3);
    display: flex; gap: 10px; justify-content: flex-end;
  }
  .sfc-ed-btn {
    padding: 8px 20px; border-radius: 20px; border: none; cursor: pointer;
    font-size: 12px; font-weight: 700; letter-spacing: .5px;
    transition: all .2s;
  }
  .sfc-ed-btn.primary { background: #14a085; color: #fff; }
  .sfc-ed-btn.primary:hover { background: #0d7377; }
  .sfc-ed-btn.secondary { background: rgba(255,255,255,.1); color: rgba(255,255,255,.7); }
  .sfc-ed-btn.secondary:hover { background: rgba(255,255,255,.18); }
  .sfc-ed-info {
    background: rgba(20,160,133,.1); border: 1px solid rgba(20,160,133,.3);
    border-radius: 8px; padding: 10px 12px; font-size: 11px; color: rgba(255,255,255,.6);
    line-height: 1.6;
  }
  .sfc-ed-info strong { color: #14a085; }
  /* En mode single, les labels flottent au-dessus de l'image */
  .sfc-energy-row .sfc-img-node .sfc-img-label,
  .sfc-energy-row .sfc-img-node .sfc-img-val,
  .sfc-energy-row .sfc-img-node .sfc-img-sub {
    text-shadow: 0 1px 6px rgba(0,0,0,0.9), 0 0 12px rgba(0,0,0,0.8);
    background: rgba(6,13,26,0.45);
    border-radius: 4px;
    padding: 1px 4px;
  }

  /* Mode single : cache les images des nœuds mais garde les flux et valeurs */
  .sfc-scene-mode-single .sfc-img-node img,
  .sfc-scene-mode-single .sfc-img-node > span {
    display: none !important;
  }

  /* Valeurs restent lisibles en overlay sur l'image */
  .sfc-scene-mode-single .sfc-img-node {
    justify-content: flex-end;
    padding-bottom: 4px;
  }

  .sfc-scene-mode-single .sfc-img-label,
  .sfc-scene-mode-single .sfc-img-val,
  .sfc-scene-mode-single .sfc-img-sub,
  .sfc-scene-mode-single .sfc-router-label,
  .sfc-scene-mode-single .sfc-router-val {
    background: rgba(6,13,26,0.65);
    backdrop-filter: blur(4px);
    border-radius: 5px;
    padding: 2px 6px;
    text-shadow: 0 1px 6px rgba(0,0,0,0.9);
  }

  .sfc-scene-mode-single ~ .sfc-sunrise,
  .sfc-scene-mode-single ~ .sfc-sunset {
    bottom: 310px;
  }
  
  /* Mode single : batterie positionnée sur la batterie murale de l'image */
  .sfc-scene-mode-single-scene .sfc-batt-wrapper {
    display: inline-flex !important;  /* override le display:none du mode single */
    position: absolute;
    bottom: 18%;        /* ← à ajuster selon l'image */
    right: 8%;          /* ← batterie murale droite du garage */
    width: 60px;
    height: 60px;
    top: auto;
    transform: none;
    opacity: 0.12;      /* 10-12% de transparence */
    z-index: 4;
  }
`;

// ══════════════════════════════════════════════════════════
//  CARD HTML TEMPLATE
// ══════════════════════════════════════════════════════════
function buildCardHTML(cfg) {
  const c = { ...DEFAULTS, ...cfg };
  const showBars = c.show_progress_bars;
  const showInv  = c.show_inverter;
  const showEnd  = c.show_endurance;
  const showCells= c.show_cells;

  return `
  <div class="sfc-root" id="sfcRoot" style="
    --sfc-solar:${c.color_solar};
    --sfc-grid:${c.color_grid};
    --sfc-batt:${c.color_battery};
    --sfc-home:${c.color_home};
    --sfc-bg:${c.color_bg};
  ">
    <!-- HEADER -->
    <div class="sfc-header">
      <div class="sfc-title-row">
        <span style="font-size:18px;animation:sfc-blink 3s infinite;">⚡</span>
        <span class="sfc-title">${c.title}</span>
        <span class="sfc-badge idle" id="sfcStatus">IDLE</span>
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <div class="sfc-weather">
          <span id="sfcWIcon">☀️</span>
          <span class="sfc-weather-temp" id="sfcWTemp">—°C</span>
        </div>
        <div class="sfc-live-dot"></div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════
         SCÈNE UNIFIÉE : ciel + soleil + énergie
    ════════════════════════════════════════════ -->
    <div class="sfc-unified-scene ${c.img_scene_mode === 'single' ? 'sfc-scene-mode-single-scene' : ''}" id="sfcUnifiedScene"
         style="height: ${c.show_images !== false ? (c.img_scene_mode === 'single' ? '520px' : '380px') : '200px'};">

      <!-- Fond ciel dynamique -->
      <div class="sfc-sky" id="sfcSky"></div>

      <!-- Étoiles (nuit) -->
      <div class="sfc-stars" id="sfcStars" style="opacity:0;"></div>

      <!-- Nuages CSS photoréalistes -->
      <div class="sfc-clouds" id="sfcClouds">
        <div class="sfc-cloud-shape" style="width:160px;height:35px;top:12%;animation-duration:65s;animation-delay:0s;opacity:0.5;"></div>
        <div class="sfc-cloud-shape" style="width:110px;height:25px;top:22%;animation-duration:85s;animation-delay:-20s;opacity:0.35;"></div>
        <div class="sfc-cloud-shape" style="width:200px;height:40px;top:8%;animation-duration:100s;animation-delay:-40s;opacity:0.4;"></div>
      </div>

      <!-- Arc de trajectoire solaire -->
      <svg class="sfc-sun-arc-svg" viewBox="0 0 520 200" preserveAspectRatio="xMidYMid meet"
           style="height:40%;top:0;left:0;right:0;position:absolute;z-index:3;">
        <path class="sfc-sun-arc-bg" d="M 40,175 Q 260,10 480,175" fill="none" stroke="rgba(255,215,0,0.22)" stroke-width="1.2" />
        <path id="sfcArcDone" class="sfc-sun-arc-active" d="M 40,175 Q 260,10 480,175" fill="none" stroke="rgba(255,215,0,0.78)" stroke-width="2.2"
          stroke-dasharray="1000" stroke-dashoffset="1000" style="transition:stroke-dashoffset 20s ease;"/>
        <defs>
          <radialGradient id="sfcGlowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(255,200,0,.22)"/>
            <stop offset="100%" stop-color="rgba(255,200,0,0)"/>
          </radialGradient>
        </defs>
        <ellipse id="sfcGlowEl" cx="260" cy="90" rx="55" ry="38" fill="url(#sfcGlowGrad)" style="transition:all 20s ease;"/>
      </svg>
      
      <svg class="sfc-sun-flow" viewBox="0 0 520 380"
             style="position:absolute;inset:0;pointer-events:none;z-index:5">
          
          <path id="sfcSunFlowLine"
            class="sfc-sun-flow-core"
            d="M 260,140 L 260,320"
            stroke="#FFD700"
            style="--flow-color:#FFD700"
            fill="none"/>
          <path id="sfcSunFlowTailLong"
            class="sfc-sun-flow-tail-long"
            d="M 260,140 L 260,320"
            stroke="#FFD700"
            style="--flow-color:#FFD700"
            fill="none"/>
          <path id="sfcSunFlowTailMid"
            class="sfc-sun-flow-tail-mid"
            d="M 260,140 L 260,320"
            stroke="#FFD700"
            style="--flow-color:#FFD700"
            fill="none"/>
          <path id="sfcSunFlowGlow"
            class="sfc-sun-flow-neon"
            d="M 260,140 L 260,320"
            stroke="#FFD700"
            style="--flow-color:#FFD700"
            fill="none"/>
        </svg>

      <!-- Soleil -->
      <div class="sfc-sun-orb" id="sfcSunOrb" style="left:50%;top:10%;opacity:1;">
        <div class="sfc-sun-inner" id="sfcSunInner"></div>
      </div>

      <!-- Lune (nuit uniquement) -->
      <div id="sfcMoonOrb" style="
        position:absolute;
        font-size:32px;
        transform:translate(-50%,-50%);
        transition:left 20s ease, top 20s ease;
        z-index:2;
        pointer-events:none;
        display:none;
        filter:drop-shadow(0 0 12px rgba(200,220,255,0.6));
        text-shadow:0 0 20px rgba(180,200,255,0.8);
      ">🌙</div>

      <!-- Badge PV -->
      <div class="sfc-pv-badge">
        <span>☀️</span>
        <span class="sfc-pv-val" id="sfcPvBig">0 W</span>
      </div>

      <!-- Heure + élévation -->
      <div class="sfc-sun-time" id="sfcSunTime">12:00 · 45°</div>

      <!-- Labels lever / coucher -->
      <div class="sfc-sunrise" id="sfcSunrise">🌅 06:00</div>
      <div class="sfc-sunset"  id="sfcSunset">🌇 21:00</div>

      <!-- SVG lignes de flux vers routeurs (overlay sur toute la scène) -->
      ${(c.router1_enabled || c.router2_enabled || c.router3_enabled) ? `
      <svg class="sfc-router-svg" id="sfcRouterSvg"
           style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:4;"
           viewBox="0 0 520 380" preserveAspectRatio="none">
        <path id="sfcRouterLine1" class="sfc-router-line" d="M 260,300 L 260,200"/>
        <path id="sfcRouterLine2" class="sfc-router-line" d="M 260,300 L 130,200"/>
        <path id="sfcRouterLine3" class="sfc-router-line" d="M 260,300 L 390,200"/>
      </svg>` : ''}

      <!-- Plan d'eau + sol -->
      ${c.show_images !== false ? `
        <div class="sfc-ground"></div>
        <div class="sfc-water"></div>
        <div class="sfc-water-line"></div>
      ` : ''}

      <!-- ── ZONE ÉNERGIE (images ou émojis) ── -->
      ${c.show_images !== false ? `
      <!-- Image scène unique (jour/nuit) — placée sous les flux -->
      ${c.img_scene_mode === 'single' ? `
      <div class="sfc-scene-image-wrap">
        <img class="sfc-scene-image" id="sfcSceneImg"
          src="${(c[`img_scene_day_${(c.img_scene_variant||'esc_ev').replace(/^esc_/, '')}`] || c.img_scene_day || '')}"
          alt="scene" onerror="this.style.display='none'"/>
      </div>
      ` : ''}
      <div class="sfc-energy-row ${c.img_scene_mode === 'single' ? 'sfc-scene-mode-single' : ''}" id="sfcEnergyRow">

        <!-- Lignes de flux SVG (dynamiques via JS) -->
        <svg class="sfc-flow-svg" id="sfcFlowSvg" viewBox="0 0 420 100" preserveAspectRatio="none">
          <defs>
            <marker id="arrowGrid" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="var(--sfc-grid,#4FC3F7)"/>
            </marker>
            <marker id="arrowGridRev" markerWidth="7" markerHeight="7" refX="2" refY="3" orient="auto">
              <path d="M8,0 L8,6 L0,3 z" fill="var(--sfc-grid,#4FC3F7)"/>
            </marker>
            <marker id="arrowBatt" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="var(--sfc-batt,#69FF47)"/>
            </marker>
            <marker id="arrowDis" markerWidth="7" markerHeight="7" refX="2" refY="3" orient="auto">
              <path d="M8,0 L8,6 L0,3 z" fill="var(--sfc-batt,#69FF47)"/>
            </marker>
            <marker id="arrowRouter" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#FFA040"/>
            </marker>
          </defs>
          <!-- Tube réseau↔maison : base pleine + traînée néon -->
          <path id="sfcLG" class="sfc-flow-core" stroke="var(--sfc-grid,#4FC3F7)" style="--flow-color:var(--sfc-grid,#4FC3F7)" d="M 65,48 L 195,48"/>
          <path id="sfcLGTailLong" class="sfc-flow-tail-long" stroke="var(--sfc-grid,#4FC3F7)" style="--flow-color:var(--sfc-grid,#4FC3F7)" d="M 65,48 L 195,48"/>
          <path id="sfcLGTailMid" class="sfc-flow-tail-mid" stroke="var(--sfc-grid,#4FC3F7)" style="--flow-color:var(--sfc-grid,#4FC3F7)" d="M 65,48 L 195,48"/>
          <path id="sfcLGGlow" class="sfc-flow-neon" stroke="var(--sfc-grid,#4FC3F7)" style="--flow-color:var(--sfc-grid,#4FC3F7)" d="M 65,48 L 195,48"/>

          <path id="sfcLB" class="sfc-flow-core" stroke="var(--sfc-batt,#69FF47)" style="--flow-color:var(--sfc-batt,#69FF47)" d="M 225,48 L 355,48" marker-end="url(#arrowBatt)"/>
          <path id="sfcLBTailLong" class="sfc-flow-tail-long" stroke="var(--sfc-batt,#69FF47)" style="--flow-color:var(--sfc-batt,#69FF47)" d="M 225,48 L 355,48"/>
          <path id="sfcLBTailMid" class="sfc-flow-tail-mid" stroke="var(--sfc-batt,#69FF47)" style="--flow-color:var(--sfc-batt,#69FF47)" d="M 225,48 L 355,48"/>
          <path id="sfcLBGlow" class="sfc-flow-neon" stroke="var(--sfc-batt,#69FF47)" style="--flow-color:var(--sfc-batt,#69FF47)" d="M 225,48 L 355,48"/>
          <path id="sfcLR1" class="sfc-router-line" d="M 210,48 L 280,48" marker-end="url(#arrowRouter)" style="display:none"/>
          <path id="sfcLR2" class="sfc-router-line" d="M 210,48 L 310,48" marker-end="url(#arrowRouter)" style="display:none"/>
          <path id="sfcLR3" class="sfc-router-line" d="M 210,48 L 340,48" marker-end="url(#arrowRouter)" style="display:none"/>
        </svg>

        ${c.img_scene_mode === 'single' ? `` : `
        <!-- ── RÉSEAU ── -->
        <div class="sfc-img-node node-grid" id="sfcNodeGrid">
          <img src="${c.img_grid || '/local/solar-flow-card/img/grid.png'}" alt="grid"
            onerror="this.style.display='none';this.nextElementSibling.style.display='block'"/>
          <span style="display:none;font-size:36px;">🏗️</span>
          <div class="sfc-img-label">${t(c,"node_grid")}</div>
          <div class="sfc-img-val c-grid" id="sfcGrid">0 W</div>
          <div class="sfc-img-sub" id="sfcGridDir">—</div>
        </div>

        <!-- ── MAISON (toujours centrale, plus grande) ── -->
        <div class="sfc-img-node node-home" id="sfcNodeHome" style="flex:1.6;">
          <img src="${c.img_house || '/local/solar-flow-card/img/house.png'}" alt="home"
            onerror="this.style.display='none';this.nextElementSibling.style.display='block'"/>
          <span style="display:none;font-size:44px;">🏠</span>
          <div class="sfc-img-label">${t(c,"node_home")}</div>
          <div class="sfc-img-val c-home" id="sfcHome">0 W</div>
        </div>
        `}

        <!-- ── ROUTEURS (si activés, entre maison et batterie) -->
        ${c.router1_enabled ? `
        <div class="sfc-img-node" id="sfcRouterNode1" style="flex:0.85;">
          ${c.router1_img
            ? `<img src="${c.router1_img}" style="height:65px;mix-blend-mode:screen;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.7));"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='block'"/>
<span style="display:none;font-size:30px;">♨️</span>`
            : `<span style="font-size:30px;">♨️</span>`}
          <div class="sfc-router-label">${c.router1_label||'Routeur'}</div>
          <div class="sfc-router-val inactive" id="sfcRouter1Val">0 W</div>
        </div>` : ''}
        ${c.router2_enabled ? `
        <div class="sfc-img-node" id="sfcRouterNode2" style="flex:0.85;">
          ${c.router2_img
            ? `<img src="${c.router2_img}" style="height:65px;mix-blend-mode:screen;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.7));"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='block'"/>
<span style="display:none;font-size:30px;">🌡️</span>`
            : `<span style="font-size:30px;">🌡️</span>`}
          <div class="sfc-router-label">${c.router2_label||'Routeur 2'}</div>
          <div class="sfc-router-val inactive" id="sfcRouter2Val">0 W</div>
        </div>` : ''}
        ${c.router3_enabled ? `
        <div class="sfc-img-node" id="sfcRouterNode3" style="flex:0.85;">
          ${c.router3_img
            ? `<img src="${c.router3_img}" style="height:65px;mix-blend-mode:screen;object-fit:contain;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.7));"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='block'"/>
<span style="display:none;font-size:30px;">⚡</span>`
            : `<span style="font-size:30px;">⚡</span>`}
          <div class="sfc-router-label">${c.router3_label||'Routeur 3'}</div>
          <div class="sfc-router-val inactive" id="sfcRouter3Val">0 W</div>
        </div>` : ''}

        <!-- ── BATTERIE avec niveau liquide ── -->
        <div class="sfc-img-node node-battery" id="sfcNodeBatt">
          <div class="sfc-batt-wrapper" id="sfcBattWrapper">
            <!-- Zone liquide calibrée à l'intérieur du cylindre -->
            <div class="sfc-batt-liquid-wrap">
              <div class="sfc-batt-empty"></div>
              <div class="sfc-batt-fill" id="sfcBattLiquid" style="height:0%"></div>
              <div class="sfc-batt-wave" id="sfcBattWave" style="height:0%"></div>
            </div>
            <!-- Image par-dessus (mix-blend-mode:screen efface le fond noir) -->
            <img class="sfc-batt-img" id="sfcBattImg"
              src="${c.img_battery || '/local/solar-flow-card/img/battery.png'}"
              alt="battery" onerror="this.style.display='none'"/>
            <div class="sfc-batt-shine"></div>
            <div class="sfc-batt-soc-text" id="sfcBattSocText">—%</div>
          </div>

          <span id="sfcBattFallback" style="display:none;font-size:36px;">🔋</span>
          <div class="sfc-img-label">${t(c,"node_battery")}</div>
          <div class="sfc-img-val c-batt" id="sfcBattFlowPower">0 W</div>
          <div class="sfc-img-sub" id="sfcBattV">—</div>
        </div>
      </div>

      ` : `
      <!-- EMOJI FALLBACK (show_images: false) -->
      <div class="sfc-flow" style="position:absolute;bottom:0;left:0;right:0;">
        <svg class="sfc-flow-svg" viewBox="0 0 420 160" preserveAspectRatio="none">
          <path id="sfcLG" class="sfc-flow-core" stroke="var(--sfc-grid,#4FC3F7)" style="--flow-color:var(--sfc-grid,#4FC3F7)" d="M 60,80 C 120,80 160,80 210,80"/>
          <path id="sfcLGTailLong" class="sfc-flow-tail-long" stroke="var(--sfc-grid,#4FC3F7)" style="--flow-color:var(--sfc-grid,#4FC3F7)" d="M 60,80 C 120,80 160,80 210,80"/>
          <path id="sfcLGTailMid" class="sfc-flow-tail-mid" stroke="var(--sfc-grid,#4FC3F7)" style="--flow-color:var(--sfc-grid,#4FC3F7)" d="M 60,80 C 120,80 160,80 210,80"/>
          <path id="sfcLGGlow" class="sfc-flow-neon" stroke="var(--sfc-grid,#4FC3F7)" style="--flow-color:var(--sfc-grid,#4FC3F7)" d="M 60,80 C 120,80 160,80 210,80"/>
          <path id="sfcLB" class="sfc-flow-core" stroke="var(--sfc-batt,#69FF47)" style="--flow-color:var(--sfc-batt,#69FF47)" d="M 210,80 C 260,80 300,80 360,80"/>
          <path id="sfcLBTailLong" class="sfc-flow-tail-long" stroke="var(--sfc-batt,#69FF47)" style="--flow-color:var(--sfc-batt,#69FF47)" d="M 210,80 C 260,80 300,80 360,80"/>
          <path id="sfcLBTailMid" class="sfc-flow-tail-mid" stroke="var(--sfc-batt,#69FF47)" style="--flow-color:var(--sfc-batt,#69FF47)" d="M 210,80 C 260,80 300,80 360,80"/>
          <path id="sfcLBGlow" class="sfc-flow-neon" stroke="var(--sfc-batt,#69FF47)" style="--flow-color:var(--sfc-batt,#69FF47)" d="M 210,80 C 260,80 300,80 360,80"/>
        </svg>
        <div class="sfc-batt-flow-power" id="sfcBattFlowPower">0 W</div>
        <div class="sfc-node">
          <div class="sfc-node-icon">🏗️</div>
          <div class="sfc-node-label">${t(c,"node_grid")}</div>
          <div class="sfc-node-val c-grid" id="sfcGrid">0 W</div>
          <div class="sfc-node-sub" id="sfcGridDir">—</div>
        </div>
        <div class="sfc-node" style="transform:scale(1.12);">
          <div class="sfc-node-icon">🏠</div>
          <div class="sfc-node-label">${t(c,"node_home")}</div>
          <div class="sfc-node-val c-home" id="sfcHome">0 W</div>
        </div>
        <div class="sfc-node">
          <div class="sfc-node-icon">🔋</div>
          <div class="sfc-node-label">${t(c,"node_battery")}</div>
          <div class="sfc-node-val c-batt" id="sfcBatt">—%</div>
          <div class="sfc-node-sub" id="sfcBattV">—</div>
        </div>
      </div>`}

    </div><!-- fin .sfc-unified-scene -->

    <!-- PROGRESS BARS -->
    <!-- PROGRESS BARS -->
    ${showBars ? `
    <div class="sfc-progress">
      <div class="sfc-prow">
        <span class="sfc-plabel">PV</span>
        <div class="sfc-ptrack"><div class="sfc-pfill pv" id="sfcPvBar" style="width:0%"></div></div>
        <span class="sfc-ppct" id="sfcPvBarPct">0%</span>
      </div>
      <div class="sfc-prow">
        <span class="sfc-plabel">PWR</span>
        <div class="sfc-ptrack"><div class="sfc-pfill pwr" id="sfcPwrBar" style="width:0%"></div></div>
        <span class="sfc-ppct" id="sfcPwrBarPct">0%</span>
      </div>
      <div class="sfc-prow">
        <span class="sfc-plabel" style="color:var(--sfc-batt,#69FF47)">BAT</span>
        <div class="sfc-ptrack"><div class="sfc-pfill batt" id="sfcBattBar" style="width:0%"></div></div>
        <span class="sfc-ppct" id="sfcBattBarPct">0%</span>
      </div>
    </div>` : ''}

    <div class="sfc-gap"></div>

    <!-- METRICS ROW 1 -->
    <div class="sfc-metrics cols-3">
      ${c.show_mode ? `
      <div class="sfc-mc">
        <div class="sfc-mc-header">${"⚙️ " + t(c,"lbl_mode")}</div>
        <span class="sfc-mode idle" id="sfcMode">Idle</span>
      </div>` : ''}
      ${c.show_bms_temp ? `
      <div class="sfc-mc">
        <div class="sfc-mc-header">${"🌡️ " + t(c,"lbl_bms_temp")}</div>
        <div class="sfc-mc-val" style="color:#FFA040;" id="sfcBmsT">—°C</div>
      </div>` : ''}
      ${c.show_total_pv ? `
      <div class="sfc-mc">
        <div class="sfc-mc-header">${"📊 " + t(c,"lbl_total_pv")}</div>
        <div class="sfc-mc-val c-solar" id="sfcTotalPv">— kWh</div>
      </div>` : ''}
    </div>

    <div class="sfc-gap"></div>

    <!-- METRICS ROW 2 (cells) -->
    ${showCells ? `
    <div class="sfc-metrics cols-3">
      <div class="sfc-mc">
        <div class="sfc-mc-header">${"🔋 " + t(c,"lbl_min_cell")}</div>
        <div class="sfc-mc-val c-batt" id="sfcMinCell">—V</div>
      </div>
      <div class="sfc-mc">
        <div class="sfc-mc-header">${"🔋 " + t(c,"lbl_max_cell")}</div>
        <div class="sfc-mc-val c-batt" id="sfcMaxCell">—V</div>
        <div class="sfc-mc-sub" id="sfcCellDelta">Δ —mV</div>
      </div>
      <div class="sfc-mc">
        <div class="sfc-mc-header">${"⚡ " + t(c,"lbl_batt_dis")}</div>
        <div class="sfc-mc-val c-home" id="sfcBattDis">— kWh</div>
      </div>
    </div>
    <div class="sfc-gap"></div>` : ''}

    <!-- ENDURANCE -->
    ${showEnd ? `
    <div class="sfc-endurance">
      <div class="sfc-end-left">${"⏱️ " + t(c,"lbl_endurance")}</div>
      <div>
        <span class="sfc-end-val" id="sfcEndVal">— h</span>
        <span class="sfc-end-sub" id="sfcEndSub"></span>
      </div>
    </div>
    <div class="sfc-gap"></div>` : ''}

    <!-- INVERTER -->
    ${showInv ? `
    <div class="sfc-section">${t(c,"section_inverter")}</div>
    <div class="sfc-gap" style="height:6px;"></div>
    <div class="sfc-inv">
      <div class="sfc-inv-card">
        <span class="sfc-inv-icon">☀️</span>
        <span class="sfc-inv-label">${t(c,"inv_today_pv")}</span>
        <span class="sfc-inv-val c-solar" id="sfcTodayPv">— kWh</span>
      </div>
      <div class="sfc-inv-card">
        <span class="sfc-inv-icon">🔋</span>
        <span class="sfc-inv-label">${t(c,"inv_chg_dis")}</span>
        <span class="sfc-inv-val c-batt" id="sfcChgDis">— kWh</span>
        <span class="sfc-inv-sub" id="sfcChgDisSub"></span>
      </div>
      <div class="sfc-inv-card">
        <span class="sfc-inv-icon">⚡</span>
        <span class="sfc-inv-label">${t(c,"inv_remaining")}</span>
        <span class="sfc-inv-val" style="color:#aaa;" id="sfcRemaining">— kWh</span>
      </div>
      <div class="sfc-inv-card">
        <span class="sfc-inv-icon">🏡</span>
        <span class="sfc-inv-label">${t(c,"inv_today_load")}</span>
        <span class="sfc-inv-val c-home" id="sfcTodayLoad">— kWh</span>
      </div>
    </div>` : ''}

    <div class="sfc-gap" style="height:10px;"></div>
  </div>
  `;
}

// ══════════════════════════════════════════════════════════
//  EDITOR HTML
// ══════════════════════════════════════════════════════════
function buildEditorHTML(cfg) {
  const c = cfg || {};
  return `
  <div class="sfc-editor">
    <div class="sfc-ed-title">☀️ ${t(c,"ed_title")}</div>

    <!-- SECTION: Général -->
    ${edSection('general', t(c,'ed_general'), true, `
      <div class="sfc-ed-row">
        <label class="sfc-ed-label">${t(c,"ed_card_title")}</label>
        <input class="sfc-ed-input" data-key="title" placeholder="Solar Flow" value="${c.title||''}" />
      </div>
      <div class="sfc-ed-grid">
        <div class="sfc-ed-row">
          <label class="sfc-ed-label">${t(c,"ed_lat")}</label>
          <input class="sfc-ed-input sfc-ed-number" data-key="latitude" type="number" step="0.01" placeholder="44.35" value="${c.latitude||''}" />
        </div>
        <div class="sfc-ed-row">
          <label class="sfc-ed-label">${t(c,"ed_lon")}</label>
          <input class="sfc-ed-input sfc-ed-number" data-key="longitude" type="number" step="0.01" placeholder="2.57" value="${c.longitude||''}" />
        </div>
        <div class="sfc-ed-row">
          <label class="sfc-ed-label">${t(c,"ed_pv_max")}</label>
          <label class="sfc-ed-desc">${t(c,"ed_pv_max_desc")}</label>
          <input class="sfc-ed-input sfc-ed-number" data-key="pv_max_watts" type="number" placeholder="2500" value="${c.pv_max_watts||''}" />
        </div>
        <div class="sfc-ed-row">
          <label class="sfc-ed-label">${t(c,"ed_batt_cap")}</label>
          <input class="sfc-ed-input sfc-ed-number" data-key="batt_capacity_kwh" type="number" step="0.1" placeholder="2.4" value="${c.batt_capacity_kwh||''}" />
        </div>
      </div>
      <div class="sfc-ed-row">
        <label class="sfc-ed-label">${t(c,"ed_language")}</label>
        <select class="sfc-ed-input" data-key="language" style="cursor:pointer;">
          <option value="fr" ${(c.language||"fr")==="fr"?"selected":""}>🇫🇷 Français</option>
          <option value="en" ${(c.language||"fr")==="en"?"selected":""}>🇬🇧 English</option>
        </select>
      </div>
    `)}

    <!-- SECTION: PV -->
    ${edSection('pv', t(c,'ed_pv'), false, `
      ${edEntity('pv_power', t(c,'ed_pv_power'), 'sensor.zendure_solar_input_power', c)}
      ${edEntity('pv_today', t(c,'ed_pv_today'), 'sensor.zendure_solar_today', c)}
      ${edEntity('pv_total', t(c,'ed_pv_total'), 'sensor.zendure_solar_total', c)}
    `)}

    <!-- SECTION: Batterie -->
    ${edSection('batt', t(c,'ed_batt'), false, `
      ${edEntity('batt_soc', t(c,'ed_batt_soc'), 'sensor.zendure_battery_soc', c)}
      ${edEntity('batt_voltage', t(c,'ed_batt_voltage'), 'sensor.zendure_battery_voltage', c)}
      ${edEntity('batt_mode', t(c,'ed_batt_mode'), 'sensor.zendure_battery_mode', c)}
      ${edEntity('batt_temp', t(c,'ed_batt_temp'), 'sensor.zendure_bms_temperature', c)}
      ${edEntity('batt_power', t(c,'ed_batt_power'), 'sensor.zendure_manager_power', c)}
      ${edEntity('batt_chg_today', t(c,'ed_batt_chg'), 'sensor.zendure_charge_today', c)}
      ${edEntity('batt_dis_today', t(c,'ed_batt_dis'), 'sensor.zendure_discharge_today', c)}
      ${edEntity('min_cell', t(c,'ed_min_cell'), 'sensor.zendure_min_cell_voltage', c)}
      ${edEntity('max_cell', t(c,'ed_max_cell'), 'sensor.zendure_max_cell_voltage', c)}
      ${edEntity('remaining', t(c,'ed_remaining'), 'sensor.zendure_remaining_energy', c)}
    `)}

    <!-- SECTION: Réseau & Maison -->
    ${edSection('grid', t(c,'ed_grid'), false, `
      ${edEntity('grid_power', t(c,'ed_grid_power'), 'sensor.linky_power', c)}
      ${edEntity('home_power', t(c,'ed_home_power'), 'sensor.home_consumption', c)}
      ${edEntity('pwr_percent', t(c,'ed_pwr_pct'), 'sensor.zendure_output_pack_power', c)}
      ${edEntity('today_load', t(c,'ed_today_load'), 'sensor.today_home_consumption', c)}
    `)}

    <!-- SECTION: Météo & Soleil -->
    ${edSection('meteo', t(c,'ed_meteo'), false, `
      ${edEntity('weather', t(c,'ed_weather'), 'weather.maison', c)}
      ${edEntity('ext_temp', t(c,'ed_ext_temp'), 'sensor.temperature_exterieure', c)}
      <div class="sfc-ed-info">
        ${t(c,"ed_sun_info")}
      </div>
      ${edEntity('sun_elevation', t(c,'ed_sun_elev'), 'sensor.sun_solar_elevation', c)}
      ${edEntity('sun_azimuth', t(c,'ed_sun_az'), 'sensor.sun_solar_azimuth', c)}
      ${edEntity('sun_rise', t(c,'ed_sun_rise'), 'sensor.sun_next_rising', c)}
      ${edEntity('sun_set', t(c,'ed_sun_set'), 'sensor.sun_next_setting', c)}
      ${edEntity('moon_phase', 'Phase de lune (sensor.moon_phase)', 'sensor.moon_phase', c)}
    `)}

    <!-- SECTION: Couleurs -->
    ${edSection('colors', t(c,'ed_colors'), false, `
      ${edColor('color_solar', t(c,'ed_col_solar'), '#FFD700', c)}
      ${edColor('color_grid', t(c,'ed_col_grid'),  '#4FC3F7', c)}
      ${edColor('color_battery', t(c,'ed_col_batt'),'#69FF47', c)}
      ${edColor('color_home', t(c,'ed_col_home'),  '#FF6B6B', c)}
      ${edColor('color_bg', t(c,'ed_col_bg'),    '#060d1a', c)}
    `)}

    <!-- SECTION: Routeurs -->
    ${edSection('routers', t(c,'ed_routers'), false, `
      <div class="sfc-ed-info">${t(c,'ed_routers_info')}</div>

      <div style="font-size:10px;font-weight:700;color:var(--sfc-solar,#FFD700);margin:8px 0 4px;letter-spacing:1px;">
        ♨️ ${t(c,'ed_router')} 1
      </div>
      ${edToggle('router1_enabled', t(c,'ed_router_enabled'), c)}
      ${edEntity('router1_label',    t(c,'ed_router_label'),   'Spa', c)}
      ${edEntity('router1_img',      t(c,'ed_router_img'),     '/local/solar-flow-card/img/spa.png', c)}
      ${edEntity('router1_power',    t(c,'ed_router_power'),   'sensor.spa_power', c)}
      ${edEntity('router1_energy',   t(c,'ed_router_energy'),  'sensor.spa_energy_today', c)}
      <div class="sfc-ed-row">
        <label class="sfc-ed-label">${t(c,'ed_router_pos')}</label>
        <select class="sfc-ed-input" data-key="router1_position" style="cursor:pointer;">
          <option value="left"   ${(c.router1_position||'right')==='left'   ?'selected':''}>← ${t(c,'ed_pos_left')}</option>
          <option value="center" ${(c.router1_position||'right')==='center' ?'selected':''}>↑ ${t(c,'ed_pos_center')}</option>
          <option value="right"  ${(c.router1_position||'right')==='right'  ?'selected':''}>→ ${t(c,'ed_pos_right')}</option>
        </select>
      </div>

      <div style="font-size:10px;font-weight:700;color:var(--sfc-solar,#FFD700);margin:12px 0 4px;letter-spacing:1px;">
        🌡️ ${t(c,'ed_router')} 2
      </div>
      ${edToggle('router2_enabled', t(c,'ed_router_enabled'), c)}
      ${edEntity('router2_label',    t(c,'ed_router_label'),   'Chauffe-eau', c)}
      ${edEntity('router2_img',      t(c,'ed_router_img'),     '/local/solar-flow-card/img/water_tank.png', c)}
      ${edEntity('router2_power',    t(c,'ed_router_power'),   'sensor.water_heater_power', c)}
      ${edEntity('router2_energy',   t(c,'ed_router_energy'),  'sensor.water_heater_energy_today', c)}
      <div class="sfc-ed-row">
        <label class="sfc-ed-label">${t(c,'ed_router_pos')}</label>
        <select class="sfc-ed-input" data-key="router2_position" style="cursor:pointer;">
          <option value="left"   ${(c.router2_position||'left')==='left'   ?'selected':''}>← ${t(c,'ed_pos_left')}</option>
          <option value="center" ${(c.router2_position||'left')==='center' ?'selected':''}>↑ ${t(c,'ed_pos_center')}</option>
          <option value="right"  ${(c.router2_position||'left')==='right'  ?'selected':''}>→ ${t(c,'ed_pos_right')}</option>
        </select>
      </div>

      <div style="font-size:10px;font-weight:700;color:var(--sfc-solar,#FFD700);margin:12px 0 4px;letter-spacing:1px;">
        ⚡ ${t(c,'ed_router')} 3
      </div>
      ${edToggle('router3_enabled', t(c,'ed_router_enabled'), c)}
      ${edEntity('router3_label',    t(c,'ed_router_label'),   'Routeur 3', c)}
      ${edEntity('router3_img',      t(c,'ed_router_img'),     '', c)}
      ${edEntity('router3_power',    t(c,'ed_router_power'),   'sensor.router3_power', c)}
      ${edEntity('router3_energy',   t(c,'ed_router_energy'),  'sensor.router3_energy_today', c)}
      <div class="sfc-ed-row">
        <label class="sfc-ed-label">${t(c,'ed_router_pos')}</label>
        <select class="sfc-ed-input" data-key="router3_position" style="cursor:pointer;">
          <option value="left"   ${(c.router3_position||'center')==='left'   ?'selected':''}>← ${t(c,'ed_pos_left')}</option>
          <option value="center" ${(c.router3_position||'center')==='center' ?'selected':''}>↑ ${t(c,'ed_pos_center')}</option>
          <option value="right"  ${(c.router3_position||'center')==='right'  ?'selected':''}>→ ${t(c,'ed_pos_right')}</option>
        </select>
      </div>
    `)}

    <!-- SECTION: Images -->
    ${edSection('images', t(c,'ed_images'), false, `
      ${edToggle('show_images', t(c,'ed_show_images'), c)}
      <div class="sfc-ed-info">${t(c,'ed_images_info')}</div>
      ${edEntity('img_house',   t(c,'ed_img_house'),   '/local/solar-flow-card/img/house.png', c)}
      ${edEntity('img_battery', t(c,'ed_img_battery'), '/local/solar-flow-card/img/battery.png', c)}
      ${edEntity('img_grid',    t(c,'ed_img_grid'),    '/local/solar-flow-card/img/grid.png', c)}
      <div class="sfc-ed-row">
        <label class="sfc-ed-label">${t(c,'ed_img_scene_mode')}</label>
        <select class="sfc-ed-input" data-key="img_scene_mode">
          <option value="separate"${(c.img_scene_mode==='separate'?' selected':'')}>${t(c,'ed_img_scene_mode_separate')}</option>
          <option value="single"${(c.img_scene_mode==='single'?' selected':'')}>${t(c,'ed_img_scene_mode_single')}</option>
        </select>
      </div>
      <div class="sfc-ed-row">
        <label class="sfc-ed-label">${t(c,'ed_img_scene_variant')}</label>
        <select class="sfc-ed-input" data-key="img_scene_variant">
          <option value="esc_ev"${(c.img_scene_variant==='esc_ev'?' selected':'')}>${t(c,'ed_img_scene_variant_ev')}</option>
          <option value="esc_spa"${(c.img_scene_variant==='esc_spa'?' selected':'')}>${t(c,'ed_img_scene_variant_spa')}</option>
        </select>
      </div>
      ${edEntity('img_scene_day',    t(c,'ed_img_scene_day'),    '/local/solar-flow-card/img/scene-day.png', c)}
      ${edEntity('img_scene_night',  t(c,'ed_img_scene_night'),  '/local/solar-flow-card/img/scene-night.png', c)}
      ${edEntity('img_scene_day_ev',   t(c,'ed_img_scene_day_ev'),   '/local/solar-flow-card/img/scene-day-ev.png', c)}
      ${edEntity('img_scene_night_ev', t(c,'ed_img_scene_night_ev'), '/local/solar-flow-card/img/scene-night-ev.png', c)}
      ${edEntity('img_scene_day_spa',  t(c,'ed_img_scene_day_spa'),  '/local/solar-flow-card/img/scene-day-spa.png', c)}
      ${edEntity('img_scene_night_spa',t(c,'ed_img_scene_night_spa'),'/local/solar-flow-card/img/scene-night-spa.png', c)}
      <div class="sfc-ed-label" style="margin-top:8px;color:var(--muted);font-size:10px;">— Overlays optionnels —</div>
      ${edEntity('img_overlay1',       t(c,'ed_img_overlay1'),       '', c)}
      ${edEntity('img_overlay1_label', t(c,'ed_img_overlay1_label'), '', c)}
      ${edEntity('img_overlay2',       t(c,'ed_img_overlay2'),       '', c)}
      ${edEntity('img_overlay2_label', t(c,'ed_img_overlay2_label'), '', c)}
    `)}

    <!-- SECTION: Affichage -->
    ${edSection('display', t(c,'ed_display'), false, `
      ${edToggle('show_progress_bars', t(c,'ed_show_bars'), c)}
      ${edToggle('show_mode', t(c,'ed_show_mode'), c)}
      ${edToggle('show_bms_temp', t(c,'ed_show_bms'), c)}
      ${edToggle('show_total_pv', t(c,'ed_show_total_pv'), c)}
      ${edToggle('show_cells', t(c,'ed_show_cells'), c)}
      ${edToggle('show_endurance', t(c,'ed_show_endurance'), c)}
      ${edToggle('show_inverter', t(c,'ed_show_inverter'), c)}
    `)}

    <!-- ACTIONS -->
    <div class="sfc-ed-actions" style="flex-direction:column;gap:8px;">
      <button class="sfc-ed-apply" id="sfcEdApply">💾 Appliquer les modifications</button>
      <div class="sfc-ed-saved" id="sfcEdSaved"></div>
      <button class="sfc-ed-btn secondary" id="sfcEdReset" style="align-self:flex-end;">↺ Réinitialiser</button>
    </div>
  </div>
  `;
}

function edSection(id, title, open, body) {
  return `
  <div class="sfc-ed-section">
    <div class="sfc-ed-section-header ${open ? 'active' : ''}" data-section="${id}">
      <span>${title}</span>
      <em class="sfc-ed-chevron ${open ? 'open' : ''}">▾</em>
    </div>
    <div class="sfc-ed-body ${open ? 'open' : ''}" id="sfc-sec-${id}">
      ${body}
    </div>
  </div>`;
}

function edEntity(key, label, placeholder, cfg) {
  const val = (cfg && cfg[key] !== undefined && cfg[key] !== null) ? String(cfg[key]) : '';
  return `<div class="sfc-ed-row">
    <label class="sfc-ed-label">${label}</label>
    <input class="sfc-ed-input" data-key="${key}" placeholder="${placeholder}" value="${val}"/>
  </div>`;
}

function edColor(key, label, def, cfg) {
  const val = (cfg && cfg[key]) ? cfg[key] : def;
  return `<div class="sfc-ed-row">
    <label class="sfc-ed-label">${label}</label>
    <div class="sfc-color-row">
      <input type="color" class="sfc-color-swatch" data-key="${key}" value="${val}"/>
      <input class="sfc-ed-input sfc-color-input" data-key="${key}_text" placeholder="${def}" value="${val}" data-color-key="${key}"/>
    </div>
  </div>`;
}

function edToggle(key, label, cfg) {
  const on = (!cfg || cfg[key] !== false) ? 'on' : '';
  return `<div class="sfc-ed-toggle-row">
    <span class="sfc-ed-toggle-label">${label}</span>
    <div class="sfc-toggle ${on}" data-key="${key}" data-toggle="true"></div>
  </div>`;
}

// ══════════════════════════════════════════════════════════
//  SOLAR FLOW CARD ELEMENT
// ══════════════════════════════════════════════════════════
class SolarFlowCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._cfg = {};
    this._hass = null;
    this._sunTimer = null;
    this._starsCreated = false;
    this._lightningTimer = null;
    this._rainAnim = null;
    this._snowAnim = null;
  }

  set hass(hass) {
    this._hass = hass;
    this._update();
  }

  setConfig(config) {
    this._cfg = { ...DEFAULTS, ...config };
    this._render();
    this._startSunTimer();
  }

  static getConfigElement() {
    return document.createElement('solar-flow-card-editor');
  }

  static getStubConfig() {
    return { title: 'Solar Flow', latitude: 44.35, longitude: 2.57 };
  }

  getCardSize() { return 8; }

  _render() {
    this._starsCreated = false;
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;600;700&display=swap');
        ${CARD_CSS}
      </style>
      ${buildCardHTML(this._cfg)}
    `;
    this._createStars();
  }

  _createStars() {
    if (this._starsCreated) return;
    const container = this.shadowRoot.getElementById('sfcStars');
    if (!container) return;
    this._starsCreated = true;
    for (let i = 0; i < 45; i++) {
      const s = document.createElement('div');
      s.className = 'sfc-star';
      s.style.left = Math.random() * 100 + '%';
      s.style.top  = Math.random() * 85 + '%';
      s.style.animationDelay    = Math.random() * 3 + 's';
      s.style.animationDuration = (1.5 + Math.random() * 2) + 's';
      const sz = 1 + Math.random() * 2;
      s.style.width = sz + 'px'; s.style.height = sz + 'px';
      container.appendChild(s);
    }
  }

  _startSunTimer() {
    if (this._sunTimer) clearInterval(this._sunTimer);
    this._sunTimer = setInterval(() => this._updateSun(), 30000);
  }

  disconnectedCallback() {
    if (this._sunTimer) {
      clearInterval(this._sunTimer);
      this._sunTimer = null;
    }
  }

  _getNum(entityId, fallback = 0) {
    if (!entityId || !this._hass) return fallback;
    const s = this._hass.states[entityId];
    if (s) {
      const v = parseFloat(s.state);
      return isNaN(v) ? fallback : v;
    }
    const raw = parseFloat(entityId);
    return isNaN(raw) ? fallback : raw;
  }

  _getState(entityId) {
    if (!entityId || !this._hass) return null;
    return this._hass.states[entityId]?.state || null;
  }

  _fmt(w, unit = 'W') {
    if (unit === 'W') return w >= 1000 ? (w/1000).toFixed(2) + ' kW' : Math.round(w) + ' W';
    return w.toFixed(2) + ' ' + unit;
  }

  _formatDuration(hours) {
    if (!Number.isFinite(hours) || hours < 0) return '—';
    const totalMinutes = Math.max(0, Math.round(hours * 60));
    const days = Math.floor(totalMinutes / 1440);
    const dayRemainder = totalMinutes % 1440;
    const wholeHours = Math.floor(dayRemainder / 60);
    const minutes = dayRemainder % 60;
    if (days > 0) return days + 'j ' + wholeHours + 'h';
    if (wholeHours > 0) return wholeHours + 'h ' + minutes + 'min';
    return minutes + 'min';
  }

  _el(id) { return this.shadowRoot.getElementById(id); }

  _setFlowActive(ids, active) {
    ids.forEach(id => this._el(id)?.classList.toggle('inactive', !active));
  }

  _setFlowPath(ids, path) {
    ids.forEach(id => this._el(id)?.setAttribute('d', path));
  }

  _update() {
    if (!this._hass) return;
    const c = this._cfg;
    const pvW      = this._getNum(c.pv_power);
    const gridW    = this._getNum(c.grid_power);
    const homeW    = this._getNum(c.home_power);
    const battSoc  = this._getNum(c.batt_soc, 0);
    const battV    = this._getNum(c.batt_voltage);
    const bmsT     = this._getNum(c.batt_temp);
    const battPower= c.batt_power ? this._getNum(c.batt_power) : null;
    const minCell  = this._getNum(c.min_cell);
    const maxCell  = this._getNum(c.max_cell);
    const battDis  = this._getNum(c.batt_dis_today);
    const battChg  = this._getNum(c.batt_chg_today);
    const totalPv  = this._getNum(c.pv_total);
    const todayPv  = this._getNum(c.pv_today);
    const rem      = this._getNum(c.remaining);
    const pwrPct   = this._getNum(c.pwr_percent, 0);
    const todayLoad= this._getNum(c.today_load);
    const modeRaw  = this._getState(c.batt_mode);
    const weatherSt= this._getState(c.weather);
    const extT     = this._getNum(c.ext_temp);

    // Status badge
    const sb = this._el('sfcStatus');
    if (sb) {
      let st = 'idle', txt = t(c,'status_idle');
      if (pvW > 50)                       { txt = t(c,'status_producing'); st = 'producing'; }
      if (battSoc < 99 && pvW > 100)      { txt = t(c,'status_charging');  st = 'charging';  }
      if (homeW > pvW + 100)              { txt = t(c,'status_discharge'); st = 'discharging'; }
      sb.textContent = txt; sb.className = 'sfc-badge ' + st;
    }

    // Météo
    const wi = getWeather(weatherSt || '');
    const wIcon = this._el('sfcWIcon'); if (wIcon) wIcon.textContent = wi.icon;
    const wTemp = this._el('sfcWTemp'); if (wTemp) wTemp.textContent = extT ? extT + '°C' : '—°C';

    // PV badge
    const pvb = this._el('sfcPvBig'); if (pvb) pvb.textContent = this._fmt(pvW);
    const sunActive = pvW > 50;
    this._setFlowActive(['sfcSunFlowLine','sfcSunFlowTailLong','sfcSunFlowTailMid','sfcSunFlowGlow'], sunActive);

    // Flow nodes
    const gEl = this._el('sfcGrid');   if (gEl) gEl.textContent = this._fmt(Math.abs(gridW));
    const hEl = this._el('sfcHome');   if (hEl) hEl.textContent = this._fmt(homeW);
    const bEl = this._el('sfcBatt');   if (bEl) bEl.textContent = Math.round(battSoc) + '%';
    const bvEl= this._el('sfcBattV'); if (bvEl) bvEl.textContent = battV ? battV.toFixed(1) + ' V' : '';

    const gdEl= this._el('sfcGridDir');
    if (gdEl) gdEl.textContent = gridW > 50 ? t(c,'dir_import') : gridW < -50 ? t(c,'dir_export') : '—';

    // Batterie liquide
    const battWrapper = this._el('sfcBattWrapper');
    const battLiquid  = this._el('sfcBattLiquid');
    const battWave    = this._el('sfcBattWave');
    const battSocTxt  = this._el('sfcBattSocText');
    if (battLiquid) battLiquid.style.height = Math.round(battSoc) + '%';
    if (battWave)   battWave.style.height   = Math.round(battSoc) + '%';
    if (battSocTxt) battSocTxt.textContent  = Math.round(battSoc) + '%';
    if (battWrapper) {
      battWrapper.classList.remove('charging','discharging','low');
      if (battSoc < 15)                          battWrapper.classList.add('low');
      else if (battSoc < 99.5 && pvW > 100)      battWrapper.classList.add('charging');
      else if (homeW > pvW + 100)                battWrapper.classList.add('discharging');
    }
    
    //batterie power
    const bpEl = this._el('sfcBattFlowPower');
    if (bpEl) {
        if (battPower === null || battPower === undefined || !c.batt_power) {
            bpEl.style.display = 'none';
        } else {
            const absPower = Math.abs(battPower);
            const sign = battPower > 50 ? '+' : battPower < -50 ? '-' : '';
            bpEl.textContent = absPower >= 1000
            ? sign + (absPower/1000).toFixed(2) + ' kW'
            : sign + Math.round(absPower) + ' W';
            bpEl.classList.toggle('discharge', battPower < -50);
            bpEl.style.display = absPower > 10 ? '' : 'none';
        }
    }

    // Glows
    const battNode = this._el('sfcNodeBatt');
    if (battNode) {
      battNode.classList.remove('charging','discharging');
      if (battSoc < 99 && pvW > 100)  battNode.classList.add('charging');
      else if (homeW > pvW + 100)     battNode.classList.add('discharging');
    }
    const gridNode = this._el('sfcNodeGrid');
    if (gridNode) gridNode.style.filter = gridW > 50 ? 'drop-shadow(0 0 10px rgba(79,195,247,0.5))' : '';

    // Flux lines + arrows
    const isSingle = c.img_scene_mode === 'single';
    const lg = this._el('sfcLG');
    if (lg) {
      const gridActive = Math.abs(gridW) >= 50;
      const gridFlowIds = ['sfcLG','sfcLGTailLong','sfcLGTailMid','sfcLGGlow'];
      this._setFlowActive(gridFlowIds, gridActive);
      if (gridActive) {
        const isSingle = c.img_scene_mode === 'single';
        if (isSingle) {
          const path = gridW < -50 ? 'M 175,13.5 L 48,47.5' : 'M 48,47.5 L 175,13.5';
          this._setFlowPath(gridFlowIds, path);
        } else {
          const path = gridW < -50 ? 'M 195,48 L 65,48' : 'M 65,48 L 195,48';
          this._setFlowPath(gridFlowIds, path);
        }
      }
    }

    const lb = this._el('sfcLB');
    const isDischarging = homeW > pvW + 100;
    if (lb) {
      const battFlowIds = ['sfcLB','sfcLBTailLong','sfcLBTailMid','sfcLBGlow'];
      const battPowerAbs = battPower !== null ? Math.abs(battPower) : null;
      const battActive = (battPowerAbs !== null ? battPowerAbs > 10 : (battDis >= 0.01 || battChg >= 0.01 || pvW >= 50 || isDischarging));
      this._setFlowActive(battFlowIds, battActive);
      if (isDischarging) {
        const path = isSingle ? 'M 414.5,10.5 L 213,10.5' : 'M 355,48 L 225,48';
        this._setFlowPath(battFlowIds, path);
        lb.setAttribute('marker-end', 'url(#arrowDis)');
      } else {
        const path = isSingle ? 'M 213,10.5 H 414.5' : 'M 225,48 L 355,48';
        this._setFlowPath(battFlowIds, path);
        lb.setAttribute('marker-end', 'url(#arrowBatt)');
      }
    }

    // Progress bars
    const pvPct = Math.min(100, Math.round(pvW / (c.pv_max_watts || 2500) * 100));
    this._setPct('sfcPvBar',   'sfcPvBarPct',  pvPct);
    this._setPct('sfcPwrBar',  'sfcPwrBarPct', Math.min(100, Math.max(0, pwrPct)));
    this._setPct('sfcBattBar', 'sfcBattBarPct',battSoc);

    // Mode
    const modeEl = this._el('sfcMode');
    if (modeEl) {
      const isChg = modeRaw === '0' || modeRaw === 'charge' || (pvW > 50 && homeW < pvW);
      const isDis = modeRaw === '1' || modeRaw === 'discharge';
      const mc = isDis ? 'discharge' : isChg ? 'charge' : 'idle';
      modeEl.textContent = isDis ? t(c,'mode_discharge') : isChg ? t(c,'mode_charge') : t(c,'mode_idle');
      modeEl.className = 'sfc-mode ' + mc;
    }

    const bmsEl = this._el('sfcBmsT');    if (bmsEl) bmsEl.textContent = bmsT ? bmsT.toFixed(1) + '°C' : '—°C';
    const tpEl  = this._el('sfcTotalPv'); if (tpEl)  tpEl.textContent  = totalPv ? totalPv.toFixed(2) + ' kWh' : '— kWh';
    const mn    = this._el('sfcMinCell'); if (mn)    mn.textContent    = minCell ? minCell.toFixed(3) + ' V' : '—V';
    const mx    = this._el('sfcMaxCell'); if (mx)    mx.textContent    = maxCell ? maxCell.toFixed(3) + ' V' : '—V';
    const dl    = this._el('sfcCellDelta');
    if (dl) { const d = minCell && maxCell ? Math.round((maxCell-minCell)*1000) : null; dl.textContent = d !== null ? 'Δ '+d+' mV' : ''; }
    const bd = this._el('sfcBattDis'); if (bd) bd.textContent = battDis ? battDis.toFixed(2)+' kWh' : '— kWh';

    // Endurance
    const ev = this._el('sfcEndVal'); const es = this._el('sfcEndSub');
    if (ev) {
      if (homeW > 50 && battSoc > 0) {
        const remKwh = (battSoc/100) * (c.batt_capacity_kwh || 2.4);
        const hours  = remKwh / (homeW/1000);
        const endD   = new Date(Date.now() + hours*3600000);
        ev.textContent = this._formatDuration(hours);
        if (es) es.textContent = '→ '+endD.toLocaleString(c.language==='en'?'en-GB':'fr-FR',{weekday:'short',hour:'2-digit',minute:'2-digit'});
      } else { ev.textContent='—'; if (es) es.textContent=''; }
    }

    // Routeurs
    this._updateRouters();

    // Inverter
    const tp  = this._el('sfcTodayPv');    if (tp)  tp.textContent  = todayPv  ? todayPv.toFixed(2)+' kWh'  : '— kWh';
    const cd  = this._el('sfcChgDis');     if (cd)  cd.textContent  = battChg  ? battChg.toFixed(2)+' kWh'  : '— kWh';
    const cds = this._el('sfcChgDisSub');  if (cds) cds.textContent = battDis  ? battDis.toFixed(2)+' kWh'  : '';
    const re  = this._el('sfcRemaining');  if (re)  re.textContent  = rem      ? rem.toFixed(2)+' kWh'      : '— kWh';
    const tl  = this._el('sfcTodayLoad'); if (tl)  tl.textContent  = todayLoad? todayLoad.toFixed(2)+' kWh': '— kWh';

    // Sun
    this._updateSun(wi.cloudy);
  }

  _setPct(barId, pctId, pct) {
    const bar = this._el(barId); const lbl = this._el(pctId);
    if (bar) bar.style.width = Math.round(pct) + '%';
    if (lbl) lbl.textContent = Math.round(pct) + '%';
  }

  _updateRouters() {
    const c = this._cfg;
    const activeRouters = [
      c.router1_enabled ? 1 : 0,
      c.router2_enabled ? 2 : 0,
      c.router3_enabled ? 3 : 0,
    ].filter(Boolean);
    const nRouters = activeRouters.length;
    const gap = nRouters > 0 ? (355 - 210) / (nRouters + 1) : 0;
    const routerXs = activeRouters.map((_, i) => Math.round(210 + gap * (i+1)));
    const isSingle = this._cfg.img_scene_mode === 'single';

    activeRouters.forEach((rn, i) => {
      const c2 = this._cfg;
      const rx = routerXs[i];
      const powerKey = 'router' + rn + '_power';
      const w = this._getNum(c2[powerKey]);
      const active = w > 10;
      const path = isSingle
        ? 'M 123,3 L 52.5,18.5'
        : `M 210,48 Q ${(210+rx)/2},28 ${rx},48`;

      const line = this._el('sfcLR' + rn);
      if (line) {
        line.style.display = '';
        line.setAttribute('d', path);
        line.classList.toggle('active', active);
        line.classList.toggle('inactive', !active);
      }

      const valEl = this._el('sfcRouter' + rn + 'Val');
      if (valEl) { valEl.textContent = w >= 1000 ? (w/1000).toFixed(2)+' kW' : Math.round(w)+' W'; valEl.className = 'sfc-router-val'+(active?'':' inactive'); }
      const node = this._el('sfcRouterNode' + rn);
      if (node)  node.classList.toggle('active', active);
    });

    // Ligne batterie depuis dernier routeur (ou maison)
    const lastX = routerXs.length > 0 ? routerXs[routerXs.length-1] : 210;
    const lineBatt = this._el('sfcLB');
    const isDischarging = this._getNum(this._cfg.home_power) > this._getNum(this._cfg.pv_power) + 100;
    if (lineBatt && nRouters > 0) {
      const battFlowIds = ['sfcLB','sfcLBTailLong','sfcLBTailMid','sfcLBGlow'];
      if (isDischarging) {
        const path = `M 355,48 L ${lastX+14},48`;
        this._setFlowPath(battFlowIds, path);
        lineBatt.setAttribute('marker-end', 'url(#arrowDis)');
      } else {
        const path = `M ${lastX+14},48 L 355,48`;
        this._setFlowPath(battFlowIds, path);
        lineBatt.setAttribute('marker-end', 'url(#arrowBatt)');
      }
    }
  }

  _updateSun(cloudyOverride) {

    const c   = this._cfg;
    const now = new Date();
    let elevation, azimuth;
    const haElevState = c.sun_elevation ? this._hass?.states[c.sun_elevation] : null;
    if (haElevState && haElevState.state !== 'unavailable' && haElevState.state !== 'unknown') {
      elevation = parseFloat(haElevState.state) || 0;
      const haAzState = c.sun_azimuth ? this._hass?.states[c.sun_azimuth] : null;
      azimuth = haAzState ? (parseFloat(haAzState.state) ?? 180) : 180;
    } else {
      const sp = computeSunPosition(now, c.latitude || 44.35, c.longitude || 2.57);
      elevation = sp.elevation; azimuth = sp.azimuth;
    }

    const ss = computeSunriseSunset(now, c.latitude || 44.35, c.longitude || 2.57);
    const sunrise = ss.sunrise, sunset = ss.sunset;
    const isSingle = c.img_scene_mode === 'single';
    const srEl = this._el('sfcSunrise');
    if (srEl) {
      srEl.textContent = '🌅 ' + formatTime(sunrise);
      srEl.style.bottom = isSingle ? '320px' : '190px';
    }
    const ssEl = this._el('sfcSunset');
    if (ssEl) {
      ssEl.textContent = '🌇 ' + formatTime(sunset);
      ssEl.style.bottom = isSingle ? '320px' : '190px';
    }

    let progress = 0.5;
    if (sunrise && sunset) {
    const totalMs = sunset.getTime() - sunrise.getTime();
    const elapsedMs = now.getTime() - sunrise.getTime();
    if (totalMs > 0) progress = elapsedMs / totalMs;
    }
    // Pas de correction azimuth — une seule source de vérité
    progress = Math.max(0, Math.min(1, progress));

    const tt   = progress;
    const bx   = (1-tt)*(1-tt)*40  + 2*(1-tt)*tt*260 + tt*tt*480;
    const by   = (1-tt)*(1-tt)*175 + 2*(1-tt)*tt*30  + tt*tt*175;
    const isSingleMode = c.img_scene_mode === 'single';
    const skyFraction = isSingleMode ? 0.35 : 0.55;
    const pctX = (bx / 520) * 100;
    // Décalage fixe pour que le soleil reste au-dessus de l'arc
    const pctY = Math.max(1, (by / 200) * skyFraction * 100 - 4);

    const orb = this._el('sfcSunOrb');
    const isNight = elevation < -3;
    if (orb) {
    orb.style.left  = pctX + '%';
    orb.style.top   = pctY + '%';
    orb.style.opacity = isNight ? '0' : elevation < 5 ? '0.7' : '1';
    }

    // Lune
    const moonEl = this._el('sfcMoonOrb');
    if (moonEl) {
    if (isNight && c.moon_phase) {
        const phase = this._getState(c.moon_phase) || '';
        const MOON_PHASES = {
        'new_moon':        '🌑', 'waxing_crescent': '🌒',
        'first_quarter':   '🌓', 'waxing_gibbous':  '🌔',
        'full_moon':       '🌕', 'waning_gibbous':  '🌖',
        'last_quarter':    '🌗', 'waning_crescent': '🌘',
        };
        const moonIcon = MOON_PHASES[phase] || '🌙';
        moonEl.textContent = moonIcon;
        moonEl.style.display = '';
        // Position : suit la même courbe que le soleil mais inversée (nuit = progress hors [0,1])
        const nightProgress = progress < 0 ? 0.5 + progress * 0.5 : 1 - progress * 0.5;
        const mt = Math.max(0, Math.min(1, nightProgress));
        const mx = (1-mt)*(1-mt)*40 + 2*(1-mt)*mt*260 + mt*mt*480;
        const my = (1-mt)*(1-mt)*175 + 2*(1-mt)*mt*30 + mt*mt*175;
        moonEl.style.left = ((mx / 520) * 100) + '%';
        moonEl.style.top  = Math.max(1, (my / 200) * 0.55 * 100 - 4) + '%';
    } else {
        moonEl.style.display = 'none';
    }
    }
    const inner = this._el('sfcSunInner');
    if (inner) inner.style.background = elevation < 10
      ? 'radial-gradient(circle at 35% 35%,#fff 0%,#FF8C00 40%,#CC4400 100%)'
      : 'radial-gradient(circle at 35% 35%,#fff 0%,#FFD700 40%,#FF8C00 100%)';
    const glowEl = this._el('sfcGlowEl');
    if (glowEl) { glowEl.setAttribute('cx', bx.toFixed(1)); glowEl.setAttribute('cy', by.toFixed(1)); }
    const arcDone = this._el('sfcArcDone');
    if (arcDone) arcDone.style.strokeDashoffset = (1000*(1-progress)).toFixed(0);

    const sceneImg = this._el('sfcSceneImg');
    if (sceneImg) {
      const variantKey = (c.img_scene_variant || 'esc_ev').replace(/^esc_/, '');
      const dayImg = c[`img_scene_day_${variantKey}`] || c.img_scene_day;
      const nightImg = c[`img_scene_night_${variantKey}`] || c.img_scene_night;
      const sceneSrc = isNight ? (nightImg || dayImg) : (dayImg || nightImg);
      if (sceneSrc) {
        sceneImg.src = sceneSrc;
        sceneImg.style.display = '';
      } else {
        sceneImg.style.display = 'none';
      }
    }
    const sky = this._el('sfcSky');
    const wi  = getWeather(this._getState(c.weather) || '');
    const cloudy = cloudyOverride !== undefined ? cloudyOverride : wi.cloudy;
    if (sky) sky.style.background = skyGradient(elevation, cloudy);

    const stars = this._el('sfcStars');
    if (stars) stars.style.opacity = elevation < 0 ? Math.min(1, -elevation/8).toFixed(2) : '0';

    // Nuages météo
    const cl1 = this._el('sfcCloud1'); if (cl1) cl1.style.opacity = wi.cloudy ? '.22' : '.08';
    const cl2 = this._el('sfcCloud2'); if (cl2) cl2.style.opacity = wi.cloudy ? '.16' : '.04';

    const stl = this._el('sfcSunTime');
    if (stl) stl.textContent = now.toLocaleTimeString(c.language==='en'?'en-GB':'fr-FR',{hour:'2-digit',minute:'2-digit'}) + ' · ' + Math.round(elevation) + '°';
  }
}

// ══════════════════════════════════════════════════════════
//  EDITOR — iOS-safe (v1.0.0)
// ══════════════════════════════════════════════════════════
const EDITOR_EXTRA_CSS = `
  .sfc-ed-apply {
    width:100%; padding:14px; border:none; border-radius:10px;
    cursor:pointer; font-size:14px; font-weight:700;
    letter-spacing:0.5px; color:#fff; background:#14a085;
    transition:all 0.3s; -webkit-appearance:none;
  }
  .sfc-ed-apply:active { transform:scale(0.97); }
  .sfc-ed-apply.saved   { background:rgba(20,160,133,0.25); box-shadow:none; }
  .sfc-ed-apply.pending { background:#14a085; box-shadow:0 0 16px rgba(20,160,133,0.5); }
  .sfc-ed-saved { text-align:center; font-size:11px; color:rgba(255,255,255,0.4); padding:4px 0 0; min-height:16px; }
`;

class SolarFlowCardEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._draft = { ...DEFAULTS };
    this._pendingConfig = null;
    this._ready = false;
    this._dirty = false;
  }

  setConfig(config) {
    const incoming = { ...DEFAULTS, ...config };
    if (!this._ready) {
      this._draft = incoming;
      this._pendingConfig = incoming;
      if (this.shadowRoot) { this._buildDOM(); this._ready = true; this._pendingConfig = null; }
    } else {
      this._draft = incoming;
      this._populateAll();
    }
  }

  connectedCallback() {
    if (!this._ready) {
      if (this._pendingConfig) { this._draft = this._pendingConfig; this._pendingConfig = null; }
      this._buildDOM();
      this._ready = true;
    }
  }

  _buildDOM() {
    this.shadowRoot.innerHTML = `<style>${CARD_CSS}${EDITOR_EXTRA_CSS}</style>` + buildEditorHTML(this._draft);
    this._populateAll();
    this._attachListeners();
  }

  _populateAll() {
    const d = this._draft;
    this.shadowRoot.querySelectorAll('[data-key]').forEach(el => {
      const k = el.dataset.key;
      if (el.dataset.toggle)    el.classList.toggle('on', d[k] !== false);
      else if (el.type==='color') el.value = d[k] || DEFAULTS[k] || '#ffffff';
      else if (el.dataset.colorKey) el.value = d[el.dataset.colorKey] || '';
      else el.value = (d[k] !== undefined && d[k] !== null) ? String(d[k]) : '';
    });
    this._refreshBtn();
  }

  _attachListeners() {
    this.shadowRoot.querySelectorAll('.sfc-ed-section-header').forEach(h => {
      h.addEventListener('click', () => {
        const body = this.shadowRoot.getElementById('sfc-sec-' + h.dataset.section);
        const chev = h.querySelector('.sfc-ed-chevron');
        if (!body) return;
        const open = body.classList.toggle('open');
        chev && chev.classList.toggle('open', open);
        h.classList.toggle('active', open);
      });
    });

    this.shadowRoot.querySelectorAll('[data-key]').forEach(el => {
      const k = el.dataset.key;
      if (el.tagName === 'SELECT') {
        el.addEventListener('change', () => { this._draft = { ...this._draft, [k]: el.value }; this._buildDOM(); this._apply(); });
      } else if (el.dataset.toggle) {
        el.addEventListener('click', () => { el.classList.toggle('on'); this._draft = { ...this._draft, [k]: el.classList.contains('on') }; this._apply(); });
      } else if (el.type === 'color') {
        el.addEventListener('change', () => { const txt = this.shadowRoot.querySelector(`[data-color-key="${k}"]`); if (txt) txt.value = el.value; this._draft = { ...this._draft, [k]: el.value }; this._setDirty(); });
      } else if (el.dataset.colorKey) {
        el.addEventListener('input', () => { const ck = el.dataset.colorKey; if (/^#[0-9a-fA-F]{6}$/.test(el.value)) { const col = this.shadowRoot.querySelector(`[data-key="${ck}"][type="color"]`); if (col) col.value = el.value; } this._draft = { ...this._draft, [ck]: el.value }; this._setDirty(); });
      } else {
        el.addEventListener('input', () => { let v = el.value; if (el.type==='number') { const n=parseFloat(v); if(!isNaN(n)) v=n; } this._draft = { ...this._draft, [k]: v }; this._setDirty(); });
      }
    });

    const applyBtn = this.shadowRoot.getElementById('sfcEdApply');
    if (applyBtn) applyBtn.addEventListener('click', () => this._apply());
    const rst = this.shadowRoot.getElementById('sfcEdReset');
    if (rst) rst.addEventListener('click', () => { this._draft = { ...DEFAULTS }; this._populateAll(); this._apply(); });
  }

  _setDirty() { this._dirty = true; this._refreshBtn(); }

  _refreshBtn() {
    const btn  = this.shadowRoot.getElementById('sfcEdApply');
    const note = this.shadowRoot.getElementById('sfcEdSaved');
    if (!btn) return;
    if (this._dirty) {
      btn.textContent = t(this._draft,'ed_apply'); btn.className = 'sfc-ed-apply pending'; if (note) note.textContent = '';
    } else {
      btn.textContent = t(this._draft,'ed_saved'); btn.className = 'sfc-ed-apply saved'; if (note) note.textContent = t(this._draft,'ed_saved_note');
    }
  }

  _apply() {
    this._dirty = false; this._refreshBtn();
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: { ...this._draft } }, bubbles: true, composed: true }));
  }
}

// ══════════════════════════════════════════════════════════
//  REGISTER
// ══════════════════════════════════════════════════════════
customElements.define('solar-flow-card', SolarFlowCard);
customElements.define('solar-flow-card-editor', SolarFlowCardEditor);

window.customCards = window.customCards || [];
window.customCards.push({ type:'solar-flow-card', name:'Solar Flow Card', description:'Arc solaire animé, météo dynamique, flux énergie temps réel', preview:true });

console.info('%c☀️ SOLAR FLOW CARD %c v1.0.12 ',
  'background:#0d7377;color:#fff;padding:2px 6px;border-radius:4px 0 0 4px;font-weight:700',
  'background:#14a085;color:#fff;padding:2px 6px;border-radius:0 4px 4px 0;');
