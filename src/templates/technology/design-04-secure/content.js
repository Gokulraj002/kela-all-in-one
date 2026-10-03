import { brandFor } from '../../_shared/brand.js';

const kela = brandFor('technology');

/* 04 · Cybersecurity. All copy is editable via the ATELIER customizer.
   Plain JSON-compatible object: no functions. */

export const content = {
  brand: {
    name: `${kela.name}`,
    tagline: 'Managed cyber defense',
  },
  nav: [
    { label: 'Platform', href: '#platform' },
    { label: 'Threat intel', href: '#threats' },
    { label: 'Compliance', href: '#compliance' },
    { label: 'Pricing', href: '#cta' },
  ],
  hero: {
    eyebrow: `${kela.name.toUpperCase()} // MANAGED DEFENSE GRID`,
    title: 'Security that never sleeps.',
    sub: `${kela.name} watches your network, endpoints, and identities around the clock — 40 billion events a day, triaged by analysts and machines in under 60 seconds.`,
    ctaPrimary: 'Get protected',
    ctaPrimaryHref: '#cta',
    ctaSecondary: 'See the threat feed',
    ctaSecondaryHref: '#threats',
    status: 'SENSORS LIVE',
    eventsLabel: '40B EVENTS / DAY',
    mapLabel: 'GLOBAL THREAT MAP — LAST 24H',
  },
  ticker: [
    '14:02:11Z — C2 BEACON NEUTRALIZED — 185.220.101.4',
    '14:01:47Z — CREDENTIAL STUFFING BLOCKED — 1.2M ATTEMPTS',
    '14:00:03Z — RANSOMWARE PROCESS KILLED — FIN-WS-2214',
    '13:58:29Z — PHISHING DOMAIN SINKHOLED — secure-portal-update[.]net',
    '13:55:12Z — ZERO-DAY SIGNATURE PUSHED — CVE-2026-34117',
    '13:52:40Z — INSIDER EGRESS FLAGGED — 14.2 GB',
  ],
  scan: {
    eyebrow: 'LIVE INTERCEPTION',
    title: 'Watch one sweep. This happens every 60 seconds.',
    body: 'Scroll to drive the scan. Each pass inspects every endpoint, identity, and connection — threats lock in the moment they are found.',
    panelTitle: `${kela.name.toUpperCase()} INTERCEPT GRID`,
    sweepLabel: 'SWEEP',
    threats: [
      { id: 'THR-001', name: 'CrimsonVault Encryptor', vector: 'Phishing payload — finance workstation', severity: 'CRITICAL' },
      { id: 'THR-002', name: 'Credential Stuffing Wave', vector: '1.2M login attempts — auth endpoint', severity: 'HIGH' },
      { id: 'THR-003', name: 'C2 Beaconing', vector: 'Outbound beacon — 185.220.101.4', severity: 'CRITICAL' },
      { id: 'THR-004', name: 'Supply-Chain Intrusion', vector: 'Compromised vendor update package', severity: 'HIGH' },
      { id: 'THR-005', name: 'Zero-Day Exploit', vector: 'CVE-2026-34117 — edge gateway', severity: 'CRITICAL' },
      { id: 'THR-006', name: 'Insider Exfiltration', vector: 'Anomalous egress — 14.2 GB off-hours', severity: 'HIGH' },
      { id: 'THR-007', name: 'DNS Tunneling', vector: 'Covert channel over DNS-over-HTTPS', severity: 'MEDIUM' },
      { id: 'THR-008', name: 'SSH Brute Force', vector: 'Sweep — 40k attempts/min, bastion host', severity: 'MEDIUM' },
    ],
    stateScanning: 'SCANNING…',
    stateHit: 'NEUTRALIZED',
  },
  platform: {
    eyebrow: 'THE PLATFORM',
    title: 'Four systems. One verdict: safe.',
    body: 'Every layer reports to a single brain. No console-hopping, no blind spots, no "we\'ll look at it Monday."',
    cards: [
      {
        code: 'SYS-01',
        name: 'Endpoint detection & response',
        desc: 'Every laptop, server, and container watched at the kernel level. Behavioral models kill malicious processes in milliseconds — before encryption starts.',
        specs: ['Kernel-level telemetry', 'Automated process kill', 'One-click rollback'],
      },
      {
        code: 'SYS-02',
        name: 'Zero trust network',
        desc: 'Never trust. Always verify. Every connection re-authenticated, every device posture-checked, every session micro-segmented. Lateral movement dies at the door.',
        specs: ['Micro-segmentation', 'Continuous device posture', 'Identity-aware proxy'],
      },
      {
        code: 'SYS-03',
        name: 'Threat intelligence',
        desc: 'Know them before they knock. 40 billion daily signals fused with analyst research — your defenses update the hour a campaign is named, not the month it is published.',
        specs: ['40B events / day', 'Analyst-verified IOCs', 'Dark-web monitoring'],
      },
      {
        code: 'SYS-04',
        name: 'Incident response',
        desc: 'Humans on call, 24/7/365. A named response team inside your channel within 15 minutes of a confirmed breach. Containment playbooks rehearsed quarterly.',
        specs: ['< 15 min escalation', 'Named response lead', 'Quarterly tabletop drills'],
      },
    ],
  },
  features: [
    {
      imgKey: 'product-0',
      title: 'The operations floor',
      text: '250 analysts across three follow-the-sun SOCs. Your alerts never wait for morning.',
    },
    {
      imgKey: 'product-1',
      title: 'Identity, verified',
      text: 'Biometric MFA and behavioral identity scoring stop credential attacks cold.',
    },
    {
      imgKey: 'product-2',
      title: 'The backbone',
      text: 'Encrypted ingest from every corner of your estate, inspected at wire speed.',
    },
  ],
  compliance: {
    eyebrow: 'COMPLIANCE',
    title: 'Audited. Certified. Ready for your security review.',
    body: 'Full audit reports and penetration-test summaries available under NDA. We pass your vendor review in days, not quarters.',
    badges: ['SOC 2 Type II', 'ISO 27001', 'GDPR', 'PCI DSS'],
    note: 'INDEPENDENTLY AUDITED ANNUALLY',
  },
  metrics: {
    eyebrow: 'DETECTION METRICS',
    title: 'The numbers our customers quote back to us.',
    items: [
      { value: 99.99, decimals: 2, prefix: '', suffix: '%', label: 'Detection rate across all monitored endpoints' },
      { value: 60, decimals: 0, prefix: '<', suffix: 's', label: 'Mean time from detection to response' },
      { value: 40, decimals: 0, prefix: '', suffix: 'B', label: 'Events processed every single day' },
    ],
    detailCaption: 'SILICON UNDER RED LIGHT — THE SUBSTRATE WE DEFEND',
  },
  cta: {
    eyebrow: 'DEPLOY IN 48 HOURS',
    title: 'Sleep. We\u2019ll watch.',
    body: 'Flat per-endpoint pricing. No tiers, no ransom-style renewals. Full coverage live within two days of kickoff.',
    button: 'Get protected',
    buttonHref: '#cta',
    contactLine: `PREFER TO TALK FIRST? — DEFEND@${kela.domain.toUpperCase()}`,
  },
  contact: {
    email: `defend@${kela.domain}`,
    phone: '+1 (415) 555-0132',
  },
  footer: {
    line: `\u00A9 2026 ${kela.name}. All systems nominal.`,
    colophon: 'MONITORED 24/7/365 — 3 SOCS — 40B EVENTS/DAY',
  },
};
