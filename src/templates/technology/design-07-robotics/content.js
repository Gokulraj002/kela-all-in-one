import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('technology');

/* content. All copy is real-feeling robotics copy: axes, payload,
   repeatability, standards. No lorem ipsum. */
export const content = {
  brand: {
    name: `${kela.name}`,
    tagline: 'Precision robotic arms for modern factories',
  },
  nav: [
    { label: 'Products', href: '#products' },
    { label: 'Engineering', href: '#craft' },
    { label: 'Use cases', href: '#gallery' },
    { label: 'Support', href: '#contact' },
  ],
  hero: {
    eyebrow: `${kela.name} K7 · Six-axis articulated robot`,
    title: 'Precision, automated.',
    sub: 'The K7 is a 7-axis articulated arm built for lights-out manufacturing — 5 kg payload, ±0.02 mm repeatability, and an IP67-rated body that shrugs off coolant, dust, and 24/7 duty cycles.',
    ctaPrimary: 'Get a quote',
    ctaPrimaryHref: '#contact',
    ctaSecondary: 'Explore the K7',
    ctaSecondaryHref: '#products',
    specs: [
      { value: '7', label: 'Axes' },
      { value: '5 kg', label: 'Payload' },
      { value: '±0.02 mm', label: 'Repeatability' },
      { value: 'IP67', label: 'Rated' },
    ],
  },

  /* Exploded-view callouts. ax/ay are anchor positions as % of the stage.
     vec is the desktop explosion vector in px; vecM the mobile/static one. */
  callouts: [
    {
      id: 'base',
      part: 'Base',
      title: 'Base',
      spec: 'Bolt-down base · axis-1 360° rotation · integrated cable routing',
      ax: '44%', ay: '90%',
      vec: { dx: -150, dy: 90 }, vecM: { dx: -64, dy: 56 },
    },
    {
      id: 'shoulder',
      part: 'Shoulder joint',
      title: 'Shoulder joint',
      spec: 'Axis-2/3 shoulder · harmonic drive · zero-backlash gearing',
      ax: '40%', ay: '60%',
      vec: { dx: -230, dy: 30 }, vecM: { dx: -104, dy: 18 },
    },
    {
      id: 'elbow',
      part: 'Elbow actuator',
      title: 'Elbow actuator',
      spec: 'Axis-4 elbow actuator · full 5 kg payload at maximum reach',
      ax: '56%', ay: '34%',
      vec: { dx: 40, dy: -130 }, vecM: { dx: 24, dy: -64 },
    },
    {
      id: 'wrist',
      part: 'Wrist',
      title: 'Wrist',
      spec: 'Axis-5/6 spherical wrist · ±360° roll for complex orientations',
      ax: '71%', ay: '18%',
      vec: { dx: 170, dy: -70 }, vecM: { dx: 74, dy: -40 },
    },
    {
      id: 'gripper',
      part: 'Gripper',
      title: 'Gripper',
      spec: 'Axis-7 tool flange · ISO 9409-1 quick-change · servo-gripper ready',
      ax: '85%', ay: '14%',
      vec: { dx: 150, dy: 120 }, vecM: { dx: 56, dy: 62 },
    },
  ],
  exploded: {
    eyebrow: 'Anatomy of the K7',
    title: 'Seven axes. Zero guesswork.',
    body: 'Scroll to pull the K7 apart. Every joint is a harmonic-drive servo with an absolute encoder — no homing, no drift, no surprises on Monday morning.',
    hint: 'Scroll — explode the arm, then watch it reassemble',
  },

  craft: {
    eyebrow: 'Engineering',
    title: 'Engineered like it matters.',
    body: `The K7 was designed the way machine tools are: stiff where it counts, sealed everywhere, and calibrated against a laser tracker before it leaves our floor. ${kela.name} OS runs on board with a native ROS 2 bridge, EtherCAT, and PROFINET — it drops into your cell without a controls rewrite.`,
    points: [
      { title: 'Harmonic drives, every axis', text: 'Zero-backlash gearing holds ±0.02 mm repeatability across the full 1,420 mm reach, shift after shift.' },
      { title: 'Absolute encoders', text: 'Position is known at power-up. No homing cycle, no lost steps after an e-stop.' },
      { title: 'Sealed for the floor', text: 'IP67 body and connectors. Coolant mist, metal dust, washdown — the K7 keeps its tolerances.' },
      { title: 'Safety without the cage', text: 'ISO 10218-1 and PLd-rated monitoring for fenceless collaboration at reduced speed.' },
    ],
    specs: [
      { k: 'Reach', v: '1,420 mm' },
      { k: 'Payload', v: '5 kg' },
      { k: 'Repeatability', v: '±0.02 mm' },
      { k: 'Axes', v: '7' },
      { k: 'Arm weight', v: '34 kg' },
      { k: 'Protection', v: 'IP67' },
      { k: 'Avg. power', v: '1.2 kW' },
      { k: 'Fieldbus', v: 'EtherCAT · PROFINET' },
      { k: 'Programming', v: `${kela.name} OS · ROS 2 · Python SDK` },
      { k: 'Mounting', v: 'Floor · wall · ceiling' },
    ],
  },

  metrics: [
    { value: 16000, suffix: ' hrs', label: 'MTBF across the installed fleet', decimals: 0 },
    { value: 99.2, suffix: '%', label: 'Fleet uptime, trailing 12 months', decimals: 1 },
    { value: 240, suffix: '/min', label: 'Pick rate, 1 kg test payload', decimals: 0 },
    { value: 38, suffix: ' ms', label: 'Path correction latency', decimals: 0 },
  ],

  gallery: {
    eyebrow: 'Use cases',
    title: 'Put it on the line.',
    cases: [
      {
        title: 'Precision assembly',
        stat: '±0.02 mm',
        statLabel: 'placement repeatability',
        body: 'Press-fits, screwdriving, and connector mating at automotive takt times. Force feedback on the wrist catches a mis-seated part before it becomes scrap.',
      },
      {
        title: 'Pick-and-place',
        stat: '240/min',
        statLabel: 'picks at 1 kg payload',
        body: 'Conveyor tracking with vision handoff keeps the K7 fed at full rate. Changeovers are a 15-minute teach, not a controls project.',
      },
      {
        title: 'Quality inspection',
        stat: '100%',
        statLabel: 'inline inspection coverage',
        body: 'The same arm that builds the part checks it — laser and vision payloads on the tool flange measure every critical dimension without a separate station.',
      },
    ],
  },

  contact: {
    eyebrow: 'Get a quote',
    title: 'Put a K7 on your line.',
    body: 'Tell us your takt time, your payload, and your reach. An applications engineer — not a sales rep — will reply with a cell layout and a fixed quote within two business days.',
    cta: 'Request a quote',
    support: {
      title: 'Support',
      email: `support@${kela.domain}`,
      phone: '+1 (408) 555-0147',
      hours: '24/7 for installed cells · 8–18 PT for pre-sales',
    },
  },

  footer: {
    line: `© 2026 ${kela.name}. Built for the factory floor.`,
    colophon: 'K7 · 7 axes · 5 kg · ±0.02 mm · IP67',
  },
};
