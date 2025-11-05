import { slugify } from './utils';
export const TOPIC_DEFINITIONS = [
    { name: '5G/6G', description: 'Fifth and sixth generation cellular networks', keywords: ['5g', '6g', 'nr', 'new radio', 'mmwave', 'massive mimo'] },
    { name: 'WiFi/WLAN', description: 'Wireless LAN technologies', keywords: ['wifi', 'wi-fi', 'wlan', '802.11', 'ax', 'ac', 'be', 'router'] },
    { name: 'RF Engineering', description: 'Radio frequency engineering concepts', keywords: ['rf', 'radio frequency', 'rf design', 'rf circuits', 'rf amplifier', 's-parameters'] },
    { name: 'Antenna Design', description: 'Antenna theory and design', keywords: ['antenna', 'dipole', 'yagi', 'patch', 'array', 'radiation pattern'] },
    { name: 'Cellular Networks', description: 'Mobile network architecture and protocols', keywords: ['lte', '4g', 'cellular', 'base station', 'eNodeB', 'gNodeB', 'ran', 'core network'] },
    { name: 'Satellite Communication', description: 'Satellite links and systems', keywords: ['satellite', 'satcom', 'geo', 'leo', 'vsat', 'uplink', 'downlink'] },
    { name: 'IoT Wireless', description: 'IoT connectivity technologies', keywords: ['iot', 'lora', 'lorawan', 'nb-iot', 'sigfox', 'ble', 'zigbee', 'thread'] },
    { name: 'Signal Processing', description: 'DSP and communication signal processing', keywords: ['signal processing', 'dsp', 'fft', 'filter', 'modulation', 'demodulation'] },
    { name: 'Network Protocols', description: 'Wireless protocol stacks and standards', keywords: ['protocol', 'mac', 'phy', 'tcp/ip', 'routing', 'handover'] },
    { name: 'SDR (Software Defined Radio)', description: 'Software-defined radio platforms and development', keywords: ['sdr', 'gnuradio', 'usrp', 'hackrf', 'rtl-sdr', 'bladeRF'] },
];
export const TOPICS = TOPIC_DEFINITIONS.map((t) => ({
    id: undefined,
    name: t.name,
    slug: slugify(t.name),
    description: t.description,
    keywords: t.keywords,
}));
export const TOPIC_SLUGS = TOPICS.map((t) => t.slug);
