import langs from 'flatpickr/dist/l10n';

const ar_dz = langs.ar_dz;
const ar = langs.ar;
const at = langs.at;
const az = langs.az;
const be = langs.be;
const bg = langs.bg;
const bn = langs.bn;
const bs = langs.bs;
const cat = langs.cat;
const ckb = langs.ckb;
const cs = langs.cs;
const cy = langs.cy;
const da = langs.da;
const de = langs.de;
const en = langs.default;
const eo = langs.eo;
const es = langs.es;
const et = langs.et;
const fa = langs.fa;
const fi = langs.fi;
const fo = langs.fo;
const fr = langs.fr;
const ga = langs.ga;
const gr = langs.gr;
const he = langs.he;
const hi = langs.hi;
const hr = langs.hr;
const hu = langs.hu;
const hy = langs.hy;
const id = langs.id;
const is = langs.is;
const it = langs.it;
const ja = langs.ja;
const ka = langs.ka;
const km = langs.km;
const ko = langs.ko;
const kz = langs.kz;
const lt = langs.lt;
const lv = langs.lv;
const mk = langs.mk;
const mn = langs.mn;
const ms = langs.ms;
const my = langs.my;
const nl = langs.nl;
const nn = langs.nn;
const no = langs.no;
const pa = langs.pa;
const pl = langs.pl;
const pt = langs.pt;
const ro = langs.ro;
const ru = langs.ru;
const si = langs.si;
const sk = langs.sk;
const sl = langs.sl;
const sq = langs.sq;
const sr_cyr = langs.sr_cyr;
const sr = langs.sr;
const sv = langs.sv;
const th = langs.th;
const tr = langs.tr;
const uk = langs.uk;
const uz = langs.uz;
const uz_latn = langs.uz_latn;
const vn = langs.vn;
const zh_tw = langs.zh_tw;
const zh = langs.zh;

const locale = (locale) => {
  let lang = null;

  switch (locale) {
    case 'ar_dz':
      lang = ar_dz;
      break;
    case 'ar':
      lang = ar;
      break;
    case 'at':
      lang = at;
      break;
    case 'az':
      lang = az;
      break;
    case 'be':
      lang = be;
      break;
    case 'bg':
      lang = bg;
      break;
    case 'bn':
      lang = bn;
      break;
    case 'bs':
      lang = bs;
      break;
    case 'ca':
    case 'cat':
      lang = cat;
      break;
    case 'ckb':
      lang = ckb;
      break;
    case 'cs':
      lang = cs;
      break;
    case 'cy':
      lang = cy;
      break;
    case 'da':
      lang = da;
      break;
    case 'de':
      lang = de;
      break;
    case 'eo':
      lang = eo;
      break;
    case 'es':
      lang = es;
      break;
    case 'et':
      lang = et;
      break;
    case 'fa':
      lang = fa;
      break;
    case 'fi':
      lang = fi;
      break;
    case 'fo':
      lang = fo;
      break;
    case 'fr':
      lang = fr;
      break;
    case 'ga':
      lang = ga;
      break;
    case 'gr':
      lang = gr;
      break;
    case 'he':
      lang = he;
      break;
    case 'hi':
      lang = hi;
      break;
    case 'hr':
      lang = hr;
      break;
    case 'hu':
      lang = hu;
      break;
    case 'hy':
      lang = hy;
      break;
    case 'id':
      lang = id;
      break;
    case 'is':
      lang = is;
      break;
    case 'it':
      lang = it;
      break;
    case 'ja':
      lang = ja;
      break;
    case 'ka':
      lang = ka;
      break;
    case 'km':
      lang = km;
      break;
    case 'ko':
      lang = ko;
      break;
    case 'kz':
      lang = kz;
      break;
    case 'lt':
      lang = lt;
      break;
    case 'lv':
      lang = lv;
      break;
    case 'mk':
      lang = mk;
      break;
    case 'mn':
      lang = mn;
      break;
    case 'ms':
      lang = ms;
      break;
    case 'my':
      lang = my;
      break;
    case 'nl':
      lang = nl;
      break;
    case 'nn':
      lang = nn;
      break;
    case 'no':
      lang = no;
      break;
    case 'pa':
      lang = pa;
      break;
    case 'pl':
      lang = pl;
      break;
    case 'pt':
      lang = pt;
      break;
    case 'ro':
      lang = ro;
      break;
    case 'ru':
      lang = ru;
      break;
    case 'si':
      lang = si;
      break;
    case 'sk':
      lang = sk;
      break;
    case 'sl':
      lang = sl;
      break;
    case 'sq':
      lang = sq;
      break;
    case 'sr-cyr':
      lang = sr_cyr;
    case 'sr':
      lang = sr;
      break;
    case 'sv':
      lang = sv;
      break;
    case 'th':
      lang = th;
      break;
    case 'tr':
      lang = tr;
      break;
    case 'uk':
      lang = uk;
      break;
    case 'uz':
      lang = uz;
      break;
    case 'uz_latn':
      lang = uz_latn;
      break;
    case 'vn':
      lang = vn;
      break;
    case 'zh-tw':
      lang = zh_tw;
      break;
    case 'zh':
      lang = zh;
      break;
    default:
      lang = en;
      break;
  }

  return lang;
};

export default locale;
