function r(limit) {
 return Math.round(Math.random()*limit)
}

window._pvad = {

 // численность (подразделения)
 staffDepartments: {
  aup: {color:"#723425", name:"АУП", full:"АУП"},//
  prj: {color:"#607985", name:"Проектирование", full:"Проектирование"},//
  it:  {color:"#ca4440", name:"ИТ", full:"Информатизация"},//
  usu: {color:"#72585c", name:"УСУ", full:"Управление Сервисных Услуг"},//
  sv:  {color:"#d1cf00", name:"Супервайзинг", full:"Супервайзинг"},//
  gti: {color:"#f39b71", name:"ГТИ", full:"ГТИ"},//
 },
 staff: [
  {year:2005, data:{aup:2,  sv:7}},
  {year:2006, data:{aup:6,  sv:12,  it:25}},
  {year:2007, data:{aup:14, sv:36,  it:34,  prj:3}},
  {year:2008, data:{aup:24, sv:38,  it:39,  prj:3, gti:30}},
  {year:2009, data:{aup:23, sv:43,  it:41,  prj:3, gti:30}},
  {year:2010, data:{aup:16, sv:60,  it:43,  prj:4, gti:25}},
  /*
  {year:2011, data:{aup:20, sv:60,  it:50,  prj:5, gti:24}},
  {year:2012, data:{aup:28, sv:81,  it:51,  prj:5, gti:51, usu:12}},
  {year:2013, data:{aup:30, sv:75,  it:63,  prj:2, gti:70, usu:7}},
  {year:2014, data:{aup:31, sv:76,  it:64,  prj:2, gti:74, usu:9}},
  {year:2015, data:{aup:40, sv:95,  it:85,  prj:2, gti:67, usu:7}},
  {year:2016, data:{aup:42, sv:122, it:94,  prj:2, gti:89, usu:8}},
  {year:2017, data:{aup:43, sv:118, it:101, prj:2, gti:88, usu:10}},
  {year:2018, data:{aup:47, sv:94, it:104, prj:2, gti:70, usu:10}},
   */
  {year:2011, data:{aup:20, sv:60,  it:46,  prj:5, gti:24}},
  {year:2012, data:{aup:28, sv:76,  it:51,  prj:5, gti:37}},
  {year:2013, data:{aup:22, sv:82,  it:55,  prj:2, gti:61}},
  {year:2014, data:{aup:24, sv:80,  it:57,  prj:2, gti:72}},
  {year:2015, data:{aup:61, sv:71,  it:70,  prj:2, gti:61}},
  {year:2016, data:{aup:32, sv:121, it:86,  prj:2, gti:80}},
  {year:2017, data:{aup:41, sv:136, it:91,  prj:2, gti:82}},
  {year:2018, data:{aup:44, sv:121, it:100, prj:2, gti:70}},
 ],

 // выручка (подразделения)
 proceedsDepartments: {
  sv:  {color:"#d1cf00", name:"Супервайзинг"},//
  it:  {color:"#ca4440", name:"ИТ"},//
  prj: {color:"#607985", name:"Проектирование"},//
  gti: {color:"#f39b71", name:"ГТИ"},//
  lc:  {color:"#72585c", name:"УЦ"},//
  oz:  {color:"#999999", name:"Прочее"}
 },
 proceeds: [
  {year:2005, data:{sv:3617}},
  {year:2006, data:{sv:16491,  it:34355}},
  {year:2007, data:{sv:30672,  it:37923,  prj:1684,  lc:90}},
  {year:2008, data:{sv:76778,  it:64000,  prj:6422,  lc:1030, gti:17600}},
  {year:2009, data:{sv:77787,  it:63339,  prj:5736,  lc:574,  gti:23296}},
  {year:2010, data:{sv:72516,  it:91219,  prj:6949,  lc:1069, gti:20809}},
  /*
  {year:2011, data:{sv:75419,  it:102600, prj:18918, lc:1350, gti:24958}},
  {year:2012, data:{sv:149965, it:101475, prj:1203,  lc:1980, gti:60599}},
  {year:2013, data:{sv:139550, it:104197, prj:679,   lc:679,  gti:91540}},
  {year:2014, data:{sv:162478, it:193159, prj:1800,  gti:151141}},
  {year:2015, data:{sv:150658, it:336223, gti:89177}},
  {year:2016, data:{sv:267863, it:268822, gti:135188}},
  {year:2017, data:{sv:289575, it:345132, gti:131930}},
  {year:2018, data:{sv:337850, it:347717, gti:85999}},
   */
  {year:2011, data:{sv:88774,  it:120704, prj:22505, lc:1640, gti:29448, oz:50}},
  {year:2012, data:{sv:166799, it:117413, prj:1539,  lc:2336, gti:73477, oz:649}},
  {year:2013, data:{sv:161329, it:120908, gti:108063, oz:3496}},
  {year:2014, data:{sv:162478, it:193159, prj:1800,  gti:151141, oz:576}},
  {year:2015, data:{sv:150141, it:279599, gti:89177, oz:2865}},
  {year:2016, data:{sv:267425, it:272669, gti:136788, oz:576}},
  {year:2017, data:{sv:289575, it:340466, gti:136597, oz:576}},
  {year:2018, data:{sv:338131, it:351094, gti:86631, oz:576}},
 ],

 // выручка (контрагенты)
 contractors: {
  rosneft:  {color:"#e18940", name:"Роснефть"},//
  lukoil:   {color:"#b61917", name:"Лукойл"},//
  surgut:   {color:"#847583", name:"Сургутнефтегаз"},//?
  gazprom:  {color:"#1e8cca", name:"Газпром"},//
  gpn:      {color:"#72a7da", name:"ГПН"},//
  tnk:      {color:"#2c41c8", name:"ТНК"},//
  bashneft: {color:"#DD0376", name:"Башнефть"},//
  belarus:  {color:"#02aa53", name:"Беларусь"},
  russneft: {color:"#608aa4", name:"Русснефть"},//
  tatneft:  {color:"#cba130", name:"Татнефть"},//
  zn:       {color:"#60943f", name:"Зарубежнефть"},//
  bke:      {color:"#aa9b87", name:"БКЕ"},//
  vostok:   {color:"#1c8f6d", name:"Восток НАО"},//
  nnk:      {color:"#2c41c8", name:"ННК"},//
  kazmun:   {color:"#02aef0", name:"КазМунайГаз"},
  novatek:  {color:"#0041ff", name:"Новатэк"},
  nztrade:  {color:"#52ac62", name:"НЗНП Трейд"},
  other:    {color:"#a1bf65", name:"Прочее"},//
 },

 contractorData: [
  // {year:2005, data:{other:3617}},
  // {year:2006, data:{rosneft:30846,  lukoil:16000, surgut:1400,  other:2600}},
  // {year:2007, data:{rosneft:24000,  lukoil:30500, surgut:6670,  gazprom:2060,  other:7139}},
  // {year:2008, data:{rosneft:70081,  lukoil:43000, surgut:10122, gazprom:12653, other:29975}},
  // {year:2009, data:{rosneft:73574,  lukoil:54894, surgut:4600,  gazprom:12364, other:25300}},
  // {year:2010, data:{rosneft:130750, lukoil:39300, surgut:4000,  gazprom:2580,  gpn:6732, other:10200}},
  // {year:2011, data:{rosneft:141700, lukoil:30800, gpn:25300, tnk:17100, other:8345}},
  // {year:2012, data:{rosneft:169000, lukoil:24500, gpn:21000, tnk:9200,  bashneft:3664,  belarus:52000, other:35858}},
  // {year:2013, data:{rosneft:142622, lukoil:28000, gpn:39000, tnk:2523,  bashneft:24500, belarus:19000, other:81000}},
  // {year:2014, data:{rosneft:226008, lukoil:36176, gazprom:1663,  gpn:95551,  bashneft:91763, other:57417}},
  // {year:2015, data:{rosneft:180781, lukoil:19975, gazprom:1599,  gpn:192847, bashneft:43943, russneft:34019, tatneft:22332, zn:34878, other:45684}},
  // {year:2016, data:{rosneft:207094, lukoil:15868, gazprom:22705, gpn:151416, bashneft:56183, russneft:62056, tatneft:99527, zn:25476, bke:11686, vostok:13872, other:5990}},
  // {year:2017, data:{rosneft:261684, lukoil:12447, gazprom:16783, gpn:222029, russneft:79100, tatneft:80265,  zn:8310, bke:25174, nnk:66311, other:1214}},
  {year:2017, data:{rosneft:261684, lukoil:12447, gazprom:16783, gpn:222029, russneft:79100, tatneft:80265,  zn:8310, bke:25174, nnk:66311, other:1214}},
//{year:2018, data:{rosneft:{it:95211, gti:85999, sv:54471}, rosneftTotal:235681, lukoil:9403, gpn:{it:220613, sv:51802}, gpnTotal:272415, tatneft:93745,  zn:4365, bke:16155, kazmun:111947, novatek:15335, nztrade:9825, other:2694}},
  {year:2018, data:{rosneft:{it:95211, gti:85999, sv:54471}, rosneftTotal:235681, lukoil:9403, gpn:{it:221613, sv:52802}, gpnTotal:272415, tatneft:94745,  zn:4365, bke:17155, kazmun:111947, novatek:15335, nztrade:9825, other:2694+866}},
 ],
 // 776432 - 771566 = 4866 (1000:gpn.it,1000:gpn.sv,1000:tatneft,1000:bke,1866:other)
}