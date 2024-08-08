import AlefAudio from '../assets/audio/Alef.mp3';
import BetAudio from '../assets/audio/Bet.mp3';
import GimelAudio from '../assets/audio/Gimel.mp3';
import DaletAudio from '../assets/audio/Dalet.mp3';
import HeAudio from '../assets/audio/He.mp3';
import VavAudio from '../assets/audio/Vav.mp3';
import ZayinAudio from '../assets/audio/Zayin.mp3';
import HetAudio from '../assets/audio/Het.mp3';
import TetAudio from '../assets/audio/Tet.mp3';
import YodAudio from '../assets/audio/Yod.mp3';
import KafAudio from '../assets/audio/Kaf.mp3';
import LamedAudio from '../assets/audio/Lamed.mp3';
import MemAudio from '../assets/audio/Mem.mp3';
import NunAudio from '../assets/audio/Nun.mp3';
import SamechAudio from '../assets/audio/Samech.mp3';
import AyinAudio from '../assets/audio/Ayin.mp3';
import PehAudio from '../assets/audio/Peh.mp3';
import TsadehAudio from '../assets/audio/Tsadeh.mp3';
import QofAudio from '../assets/audio/Qof.mp3';
import ReshAudio from '../assets/audio/Resh.mp3';
import ShinAudio from '../assets/audio/Shin.mp3';
import TavAudio from '../assets/audio/Tav.mp3';

import AlefPhoto from '../assets/media/Alef.png';
import BetPhoto from '../assets/media/Bet.png';
import GimelPhoto from '../assets/media/Gimel.png';
import DaletPhoto from '../assets/media/Dalet.png';
import HePhoto from '../assets/media/He.png';
import VavPhoto from '../assets/media/Vav.png';
import ZayinPhoto from '../assets/media/Zayin.png';
import HetPhoto from '../assets/media/Het.png';
import TetPhoto from '../assets/media/Tet.png';
import YodPhoto from '../assets/media/Yod.png';
import KafPhoto from '../assets/media/Kaf.png';
import LamedPhoto from '../assets/media/Lamed.png';
import MemPhoto from '../assets/media/Mem.png';
import NunPhoto from '../assets/media/Nun.png';
import SamechPhoto from '../assets/media/Samech.png';
import AyinPhoto from '../assets/media/Ayin.png';
import PehPhoto from '../assets/media/Peh.png';
import TsadehPhoto from '../assets/media/Tsadeh.png';
import QofPhoto from '../assets/media/Qof.png';
import ReshPhoto from '../assets/media/Resh.png';
import ShinPhoto from '../assets/media/Shin.png';
import TavPhoto from '../assets/media/Tav.png';

export const hebrewAudioContainer: {[key: string]: string} = {
    'Alef': AlefAudio,
    'Bet': BetAudio,
    'Gimel': GimelAudio,
    'Dalet': DaletAudio,
    'He': HeAudio,
    'Vav': VavAudio,
    'Zayin': ZayinAudio,
    'Het': HetAudio,
    'Tet': TetAudio,
    'Yod': YodAudio,
    'Kaf': KafAudio,
    'Lamed': LamedAudio,
    'Mem': MemAudio,
    'Nun': NunAudio,
    'Samech': SamechAudio,
    'Ayin': AyinAudio,
    'Peh': PehAudio,
    'Tsadeh': TsadehAudio,
    'Qof': QofAudio,
    'Resh': ReshAudio,
    'Shin': ShinAudio,
    'Tav': TavAudio,
}

export const hebrewPhotoContainer: {[key: string]: string} = {
    'Alef': AlefPhoto,
    'Bet': BetPhoto,
    'Gimel': GimelPhoto,
    'Dalet': DaletPhoto,
    'He': HePhoto,
    'Vav': VavPhoto,
    'Zayin': ZayinPhoto,
    'Het': HetPhoto,
    'Tet': TetPhoto,
    'Yod': YodPhoto,
    'Kaf': KafPhoto,
    'Lamed': LamedPhoto,
    'Mem': MemPhoto,
    'Nun': NunPhoto,
    'Samech': SamechPhoto,
    'Ayin': AyinPhoto,
    'Peh': PehPhoto,
    'Tsadeh': TsadehPhoto,
    'Qof': QofPhoto,
    'Resh': ReshPhoto,
    'Shin': ShinPhoto,
    'Tav': TavPhoto,
}

export const hebrew2english: { [key: string]: string } = {
    'א': 'Alef',
    'ב': 'Bet',
    'ג': 'Gimel',
    'ד': 'Dalet',
    'ה': 'He',
    'ו': 'Vav',
    'ז': 'Zayin',
    'ח': 'Het',
    'ט': 'Tet',
    'י': 'Yod',
    'כ': 'Kaf',
    'ל': 'Lamed',
    'מ': 'Mem',
    'נ': 'Nun',
    'ס': 'Samech',
    'ע': 'Ayin',
    'פ': 'Peh',
    'צ': 'Tsadeh',
    'ק': 'Qof',
    'ר': 'Resh',
    'ש': 'Shin',
    'ת': 'Tav',
}

export const english2Hebrew: { [key: string]: string } = Object.fromEntries(
    Object.entries(hebrew2english)
        .map(([hebrew, english]) => [english, hebrew]))

