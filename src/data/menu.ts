export type Spec = { k: string; v: string }

export type ProductItem = {
  id: string
  name: string
  en: string
  price: string
  summary: string
  desc: string
  swatch: string
  specs: Spec[]
}

export const featuredItems: ProductItem[] = [
  {
    id: 'roll',
    name: '抹茶生乳捲',
    en: 'matcha cream roll',
    price: 'NT$ 680 / 條',
    summary: '焙茶蛋糕體捲入抹茶鮮奶油，切面是一顆滾圓的綠。冷藏兩小時後食用最好。',
    desc: '焙茶蛋糕體薄薄一層，捲入不加糖的抹茶鮮奶油。切面是一顆滾圓的綠，邊緣有一圈焙茶的深色。冷藏兩小時後食用最好，奶油會剛好定形而不硬。',
    swatch: 'repeating-linear-gradient(135deg, #F1E4C4 0 10px, #FCF4E4 10px 20px)',
    specs: [
      { k: '尺寸', v: '長 18cm / 約 6 片' },
      { k: '抹茶', v: '宇治覆下・石磨' },
      { k: '保存', v: '冷藏 2 日，不冷凍' },
      { k: '過敏原', v: '乳、蛋、小麥' },
    ],
  },
  {
    id: 'basque',
    name: '抹茶巴斯克',
    en: 'matcha basque cheesecake',
    price: 'NT$ 1,080 / 模',
    summary: '表面鋪滿抹茶菠蘿粒，內裡近乎流動。整模六吋，切八刀剛好。',
    desc: '高溫短時烤出焦色的表面，鋪滿抹茶菠蘿粒；內裡近乎流動，靠冷藏才收住。整模六吋，切八刀剛好，室溫回溫十分鐘風味最完整。',
    swatch: 'repeating-linear-gradient(135deg, #E3EBCB 0 10px, #FCF4E4 10px 20px)',
    specs: [
      { k: '尺寸', v: '六吋 / 8 片' },
      { k: '抹茶', v: '宇治覆下・石磨' },
      { k: '保存', v: '冷藏 3 日' },
      { k: '過敏原', v: '乳、蛋' },
    ],
  },
  {
    id: 'cake',
    name: '紅豆抹茶餅',
    en: 'azuki matcha pastry',
    price: 'NT$ 320 / 盒',
    summary: '烙印抹茶餅皮夾大納言粒餡，帶回去的路上還是溫的。兩入一盒。',
    desc: '烙印的抹茶餅皮夾大納言粒餡，紅豆整顆留形，只糖漬不磨泥。現烤裝盒，帶回去的路上還是溫的。兩入一盒，也可單買。',
    swatch: 'repeating-linear-gradient(135deg, #F3D6B4 0 10px, #FCF4E4 10px 20px)',
    specs: [
      { k: '份量', v: '兩入 / 盒' },
      { k: '紅豆', v: '北海道大納言' },
      { k: '保存', v: '常溫當日，冷藏 3 日' },
      { k: '過敏原', v: '小麥、乳' },
    ],
  },
]

export const menuItems: { name: string; price: string }[] = [
  { name: '抹茶生乳捲', price: '680' },
  { name: '抹茶巴斯克（六吋）', price: '1,080' },
  { name: '抹茶巴斯克（單片）', price: '180' },
  { name: '紅豆抹茶餅（兩入）', price: '320' },
  { name: '抹茶白玉杯', price: '160' },
  { name: '抹茶千層小方', price: '220' },
  { name: '焙茶蕨餅', price: '240' },
  { name: '抹茶罐裝茶粉（30g）', price: '980' },
]

export const navLinks = [
  { href: '#season', label: '節令' },
  { href: '#craft', label: '工序' },
  { href: '#menu', label: '品項' },
  { href: '#visit', label: '來店' },
] as const
