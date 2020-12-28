function r(limit) {
 return Math.round(Math.random()*limit)
}

window._pvad = {
 title: "",
 currentYear: 2020,
 staffSidebar: {
  in: {title: "Принято", count: 26, measure: "человек"},
  out: {title: "Уволено", count: 67, measure: "человек"},
  male: {title: "Мужчины", count: 218, measure: "человек"},
  female: {title: "Женщины", count: 51, measure: "человек"},
  child: {title: "Родилось", count: 7, measure: "детей"},
 },
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
  {year:2011, data:{aup:20, sv:60,  it:46,  prj:5, gti:24}},
  {year:2012, data:{aup:28, sv:76,  it:51,  prj:5, gti:37}},
  {year:2013, data:{aup:22, sv:82,  it:55,  prj:2, gti:61}},
  {year:2014, data:{aup:24, sv:80,  it:57,  prj:2, gti:72}},
  {year:2015, data:{aup:61, sv:71,  it:70,  prj:2, gti:61}},
  {year:2016, data:{aup:32, sv:121, it:86,  prj:2, gti:80}},
  {year:2017, data:{aup:41, sv:136, it:91,  prj:2, gti:82}},
  {year:2018, data:{aup:44, sv:121, it:100, prj:2, gti:70}},
  {year:2019, data:{aup:50, sv:84,  it:110, gti:78}},
  {year:2020, data:{aup:48, sv:61,  it:100, gti:60}},
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
  {year:2011, data:{sv:88774,  it:120704, prj:22505, lc:1640, gti:29448, oz:50}},
  {year:2012, data:{sv:166799, it:117413, prj:1539,  lc:2336, gti:73477, oz:649}},
  {year:2013, data:{sv:161329, it:120908, gti:108063, oz:3496}},
  {year:2014, data:{sv:162478, it:193159, prj:1800,  gti:151141, oz:576}},
  {year:2015, data:{sv:150141, it:279599, gti:89177, oz:2865}},
  {year:2016, data:{sv:267425, it:272669, gti:136788, oz:576}},
  {year:2017, data:{sv:289575, it:340466, gti:136597, oz:576}},
  {year:2018, data:{sv:338131, it:351094, gti:86631, oz:576}},
  {year:2019, data:{sv:207645, it:390022, gti:133368, oz:693}},
  {year:2020, data:{sv:144635, it:365090, gti: 78537, oz:0}},
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

  taymyr:   {color:"#276207", name:"Таймырнефтегаз"},
  ink:      {color:"#bce3e9", name:"ИНК"},
  novpotok: {color:"#03a63c", name:"Новый Поток"},

  other:    {color:"#a1bf65", name:"Прочее"},//
 },

 contractorData: [
  {year:2017, data:{rosneft:261684, lukoil:12447, gazprom:16783, gpn:222029, russneft:79100, tatneft:80265,  zn:8310, bke:25174, nnk:66311, other:1214}},
  {year:2018, data:{rosneft:235681, lukoil:9403, gpn:272415, tatneft:94745,  zn:4365, bke:17155, kazmun:111947, novatek:15335, nztrade:9825, other:2694+866}},

  // {year:2019, data:{rosneft:{it:113940, gti:128064, sv:63259}, rosneftTotal:305263, lukoil:4690, gpn:{it:236609, sv:45310}, gpnTotal:281919, tatneft:57046,  zn:12425, bke:13344, gazprom:7205, ink:4384, taymyr:15755, nztrade:21348, other:7657 + 693}},
  {year:2019, data:{rosneft:305263, lukoil:4690, gpn:281919, tatneft:57046,  zn:12425, bke:13344, gazprom:7205, ink:4384, taymyr:15755, nztrade:21348, other:7657 + 693}},
  {year:2020, data:{rosneft:{it:104651, gti:51395, sv:51825}, rosneftTotal:207872, lukoil:10179, gpn:{it:181170, sv:0}, gpnTotal:181170, tatneft:15078,  zn:20857, bke:26880, gazprom:56087, ink:22385, novpotok:32837, other:14725}},
 ],
 // 776432 - 771566 = 4866 (1000:gpn.it,1000:gpn.sv,1000:tatneft,1000:bke,1866:other)
}