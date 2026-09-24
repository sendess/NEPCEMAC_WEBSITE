// Only the icons the site uses are imported, so the build stays small.
import ArrowRightIcon from '@lucide/astro/icons/arrow-right';
import ArrowUpRightIcon from '@lucide/astro/icons/arrow-up-right';
import AwardIcon from '@lucide/astro/icons/award';
import BookOpenIcon from '@lucide/astro/icons/book-open';
import BrushCleaningIcon from '@lucide/astro/icons/brush-cleaning';
import BuildingIcon from '@lucide/astro/icons/building';
import CalendarIcon from '@lucide/astro/icons/calendar';
import CameraIcon from '@lucide/astro/icons/camera';
import CheckIcon from '@lucide/astro/icons/check';
import ChevronLeftIcon from '@lucide/astro/icons/chevron-left';
import ChevronRightIcon from '@lucide/astro/icons/chevron-right';
import CircleCheckIcon from '@lucide/astro/icons/circle-check';
import ClockIcon from '@lucide/astro/icons/clock';
import DownloadIcon from '@lucide/astro/icons/download';
import DropletsIcon from '@lucide/astro/icons/droplets';
import ExternalLinkIcon from '@lucide/astro/icons/external-link';
import FileTextIcon from '@lucide/astro/icons/file-text';
import FlaskConicalIcon from '@lucide/astro/icons/flask-conical';
import GlobeIcon from '@lucide/astro/icons/globe';
import GraduationCapIcon from '@lucide/astro/icons/graduation-cap';
import HandHeartIcon from '@lucide/astro/icons/hand-heart';
import HandshakeIcon from '@lucide/astro/icons/handshake';
import HeartPulseIcon from '@lucide/astro/icons/heart-pulse';
import HouseIcon from '@lucide/astro/icons/house';
import InfoIcon from '@lucide/astro/icons/info';
import LandmarkIcon from '@lucide/astro/icons/landmark';
import LeafIcon from '@lucide/astro/icons/leaf';
import MailIcon from '@lucide/astro/icons/mail';
import MapPinIcon from '@lucide/astro/icons/map-pin';
import MegaphoneIcon from '@lucide/astro/icons/megaphone';
import MenuIcon from '@lucide/astro/icons/menu';
import NewspaperIcon from '@lucide/astro/icons/newspaper';
import PhoneIcon from '@lucide/astro/icons/phone';
import PlayIcon from '@lucide/astro/icons/play';
import QuoteIcon from '@lucide/astro/icons/quote';
import RecycleIcon from '@lucide/astro/icons/recycle';
import SchoolIcon from '@lucide/astro/icons/school';
import ScrollTextIcon from '@lucide/astro/icons/scroll-text';
import SproutIcon from '@lucide/astro/icons/sprout';
import TrashIcon from '@lucide/astro/icons/trash';
import TruckIcon from '@lucide/astro/icons/truck';
import UsersIcon from '@lucide/astro/icons/users';
import XIcon from '@lucide/astro/icons/x';

export const icons = {
  'arrow-right': ArrowRightIcon,
  'arrow-up-right': ArrowUpRightIcon,
  award: AwardIcon,
  'book-open': BookOpenIcon,
  'brush-cleaning': BrushCleaningIcon,
  building: BuildingIcon,
  calendar: CalendarIcon,
  camera: CameraIcon,
  check: CheckIcon,
  'chevron-left': ChevronLeftIcon,
  'chevron-right': ChevronRightIcon,
  'circle-check': CircleCheckIcon,
  clock: ClockIcon,
  download: DownloadIcon,
  droplets: DropletsIcon,
  'external-link': ExternalLinkIcon,
  'file-text': FileTextIcon,
  'flask-conical': FlaskConicalIcon,
  globe: GlobeIcon,
  'graduation-cap': GraduationCapIcon,
  'hand-heart': HandHeartIcon,
  handshake: HandshakeIcon,
  'heart-pulse': HeartPulseIcon,
  house: HouseIcon,
  info: InfoIcon,
  landmark: LandmarkIcon,
  leaf: LeafIcon,
  mail: MailIcon,
  'map-pin': MapPinIcon,
  megaphone: MegaphoneIcon,
  menu: MenuIcon,
  newspaper: NewspaperIcon,
  phone: PhoneIcon,
  play: PlayIcon,
  quote: QuoteIcon,
  recycle: RecycleIcon,
  school: SchoolIcon,
  'scroll-text': ScrollTextIcon,
  sprout: SproutIcon,
  trash: TrashIcon,
  truck: TruckIcon,
  users: UsersIcon,
  x: XIcon,
} as const;

export type IconName = keyof typeof icons;

/** Brand marks from Simple Icons (CC0). Lucide no longer ships brand logos. */
export const brandPaths = {
  facebook:
    'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z',
  youtube:
    'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
} as const;

export type BrandName = keyof typeof brandPaths;
