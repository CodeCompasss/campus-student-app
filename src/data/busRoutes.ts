export type BusRouteItem = {
  slNo: number;
  point: string;
  fn: string;
  an: string;
};

export type BusRoute = {
  slug: string;
  title: string;
  routes: BusRouteItem[];
};

export const busRoutes: BusRoute[] = [
  {
    slug: "bus-1",
    title: "Bus Route 1 (Mannarkkad)",
    routes: [
      { slNo: 1, point: "YATHEEMKHANA SCHOOL", fn: "8.30", an: "5.25" },
      { slNo: 2, point: "AASUPATHRIPPADI", fn: "8.33", an: "5.22" },
      { slNo: 3, point: "TOWN STOP", fn: "8.35", an: "5.20" },
      { slNo: 4, point: "BUS STAND", fn: "8.37", an: "5.18" },
      { slNo: 5, point: "KODATHIPPADI", fn: "8.40", an: "5.15" },
      { slNo: 6, point: "CHUNGAM", fn: "8.45", an: "5.10" },
      { slNo: 7, point: "ARYAMBAVU", fn: "8.55", an: "5.00" },
      { slNo: 8, point: "KOTTAPPURAM", fn: "9.05", an: "4.55" },
      { slNo: 9, point: "SHEDDUMKUNNU", fn: "9.10", an: "4.50" },
      { slNo: 10, point: "CONVENT", fn: "9.12", an: "4.48" },
      { slNo: 11, point: "SREEKRISHNAPURAM STAND", fn: "9.15", an: "4.45" },
      { slNo: 12, point: "U.P SCHOOL", fn: "9.20", an: "4.40" },
      { slNo: 13, point: "COLLEGE", fn: "9.25", an: "4.35" },
    ],
  },
  
  {
    "slug": "bus-2",
    "title": "Bus Route 3 (Palakkad via Olavakkode)",
    "routes": [
      { "slNo": 1, "point": "POLYTECHNIC", "fn": "8.00", "an": "5.55" },
      { "slNo": 2, "point": "KOOTTUPATHA", "fn": "8.03", "an": "5.52" },
      { "slNo": 3, "point": "PIRIVUSALA", "fn": "8.04", "an": "5.51" },
      { "slNo": 4, "point": "CHANDRANAGAR", "fn": "8.06", "an": "5.49" },
      { "slNo": 5, "point": "KALMANDAPAM", "fn": "8.08", "an": "5.47" },
      { "slNo": 6, "point": "STADIUM", "fn": "8.10", "an": "5.45" },
      { "slNo": 7, "point": "THAREKKAD", "fn": "8.13", "an": "5.42" },
      { "slNo": 8, "point": "SEKHAREEPURAM", "fn": "8.16", "an": "5.39" },
      { "slNo": 9, "point": "CHATHAPURAM", "fn": "8.18", "an": "5.37" },
      { "slNo": 10, "point": "OLAVAKKODE", "fn": "8.20", "an": "5.36" },
      { "slNo": 11, "point": "THANAVU", "fn": "8.22", "an": "5.33" },
      { "slNo": 12, "point": "ESTATE", "fn": "8.24", "an": "5.30" },
      { "slNo": 13, "point": "PUTHUPPARIYARAM", "fn": "8.26", "an": "5.29" },
      { "slNo": 14, "point": "MUTTIKULANGARA", "fn": "8.32", "an": "5.23" },
      { "slNo": 15, "point": "VALLIKKODE", "fn": "8.34", "an": "5.21" },
      { "slNo": 16, "point": "MUMNDUR", "fn": "8.40", "an": "5.15" },
      { "slNo": 17, "point": "MUNDUR KOOTTUPATHA", "fn": "8.45", "an": "5.10" },
      { "slNo": 18, "point": "CHALLIKKAL", "fn": "8.55", "an": "5.00" },
      { "slNo": 19, "point": "COLLEGE", "fn": "9.20", "an": "4.35" }
    ]
  },
  {
    "slug": "bus-3",
    "title": "Bus Route 4 (Palakkad via Pathirippala)",
    "routes": [
      { "slNo": 1, "point": "POLYTECHNIC", "fn": "7.55", "an": "6.00" },
      { "slNo": 2, "point": "KALLINGAL", "fn": "7.58", "an": "5.57" },
      { "slNo": 3, "point": "MANAPPULLIKKAVU", "fn": "8.00", "an": "5.55" },
      { "slNo": 4, "point": "KOTTAMAITHANAM", "fn": "8.05", "an": "5.50" },
      { "slNo": 5, "point": "MISSION SCHOOL", "fn": "8.07", "an": "5.48" },
      { "slNo": 6, "point": "NOORANI", "fn": "8.10", "an": "5.45" },
      { "slNo": 7, "point": "MERCY COLLEGE", "fn": "8.12", "an": "5.43" },
      { "slNo": 8, "point": "KALLEKKAD", "fn": "8.18", "an": "5.37" },
      { "slNo": 9, "point": "1 MILE", "fn": "8.22", "an": "5.33" },
      { "slNo": 10, "point": "EDATHARA", "fn": "8.25", "an": "5.30" },
      { "slNo": 11, "point": "PARALI CHECK POST", "fn": "8.28", "an": "5.27" },
      { "slNo": 12, "point": "MANKURISSI", "fn": "8.35", "an": "5.20" },
      { "slNo": 13, "point": "KANNAMPARIYARAM", "fn": "8.37", "an": "5.18" },
      { "slNo": 14, "point": "PATHIRIPPALA", "fn": "8.40", "an": "5.15" },
      { "slNo": 15, "point": "NAGARIPPURAM", "fn": "8.42", "an": "5.13" },
      { "slNo": 16, "point": "MANNOOR", "fn": "8.46", "an": "5.09" },
      { "slNo": 17, "point": "THADUKKASSERY", "fn": "8.50", "an": "5.05" },
      { "slNo": 18, "point": "KUNDALASSERY", "fn": "8.55", "an": "5.00" },
      { "slNo": 19, "point": "KONGAD", "fn": "9.00", "an": "4.55" },
      { "slNo": 20, "point": "PARASSERY", "fn": "9.05", "an": "4.50" },
      { "slNo": 21, "point": "PERINGODE", "fn": "9.10", "an": "4.45" },
      { "slNo": 22, "point": "16 MILE", "fn": "9.12", "an": "4.43" },
      { "slNo": 23, "point": "COLLEGE", "fn": "9.20", "an": "4.35" }
    ]
  },
  {
    "slug": "bus-4",
    "title": "Bus Route 5 (Pattambi)",
    "routes": [
      { "slNo": 1, "point": "PATTAMBI BUS STAND", "fn": "8.09", "an": "6.00" },
      { "slNo": 2, "point": "POLICE STATION", "fn": "8.05", "an": "5.55" },
      { "slNo": 3, "point": "KALPAKA", "fn": "8.10", "an": "5.50" },
      { "slNo": 4, "point": "KARIMPULLY", "fn": "8.15", "an": "5.45" },
      { "slNo": 5, "point": "MARUTHOOR", "fn": "8.20", "an": "5.40" },
      { "slNo": 6, "point": "VALLAPPUZHAYARAM", "fn": "8.25", "an": "5.35" },
      { "slNo": 7, "point": "VALLAPPUZHA GATE", "fn": "8.30", "an": "5.30" },
      { "slNo": 8, "point": "POTTACHIRA", "fn": "8.35", "an": "5.25" },
      { "slNo": 9, "point": "PENGATTIRI", "fn": "8.40", "an": "5.20" },
      { "slNo": 10, "point": "NELLAYA CITY", "fn": "8.45", "an": "5.15" },
      { "slNo": 11, "point": "CHERPPULASSERY BUS STAND", "fn": "8.50", "an": "5.10" },
      { "slNo": 12, "point": "KACHERIKUNNU JUNCTION", "fn": "8.55", "an": "5.05" },
      { "slNo": 13, "point": "VELLINEZHI ROAD", "fn": "9.00", "an": "5.00" },
      { "slNo": 14, "point": "ADAKKAPUTHUR", "fn": "9.05", "an": "4.55" },
      { "slNo": 15, "point": "THIRUVAZHIYODE", "fn": "9.10", "an": "4.50" },
      { "slNo": 16, "point": "SREEKRISHNAPURAM BUS STAND", "fn": "9.15", "an": "4.45" },
      { "slNo": 17, "point": "COLLEGE", "fn": "9.25", "an": "4.35" }
    ]
  },
  {
    "slug": "bus-5",
    "title": "Bus Route 6 (Shornur via Cherppulassery)",
    "routes": [
      { "slNo": 1, "point": "SHORNUR SMP JUNCTION", "fn": "8.00", "an": "6.00" },
      { "slNo": 2, "point": "RAILWAY STATION", "fn": "8.01", "an": "5.49" },
      { "slNo": 3, "point": "SHORNUR BUS STAND", "fn": "8.02", "an": "5.48" },
      { "slNo": 4, "point": "KULAPPULLY", "fn": "8.05", "an": "5.45" },
      { "slNo": 5, "point": "KSONATHARA", "fn": "8.10", "an": "5.40" },
      { "slNo": 6, "point": "VANIYAMKULAM", "fn": "8.12", "an": "5.38" },
      { "slNo": 7, "point": "THRIKKANGODE", "fn": "8.14", "an": "5.36" },
      { "slNo": 8, "point": "MANISSERY", "fn": "8.16", "an": "5.34" },
      { "slNo": 9, "point": "VALLUVANAD", "fn": "8.20", "an": "5.30" },
      { "slNo": 10, "point": "OTTAPPALAM", "fn": "8.25", "an": "5.25" },
      { "slNo": 11, "point": "KOTHAKKURISSI", "fn": "8.40", "an": "5.20" },
      { "slNo": 12, "point": "CHERAMBATTA", "fn": "8.42", "an": "5.18" },
      { "slNo": 13, "point": "KEEZHOOR", "fn": "8.45", "an": "5.15" },
      { "slNo": 14, "point": "THRIKKADEERI", "fn": "8.47", "an": "5.13" },
      { "slNo": 15, "point": "KUTTIKKODE", "fn": "8.50", "an": "5.10" },
      { "slNo": 16, "point": "CHERPPULASSERY", "fn": "9.00", "an": "5.00" },
      { "slNo": 17, "point": "COLLEGE", "fn": "9.25", "an": "4.35" }
    ]
  },
  {
  "slug": "mannpatta-to-palakkad",
  "title": "Mannpatta to Palakkad (Private Bus Timings)",
  "routes": [
    { "slNo": 1, "point": "PAARIJAATHAM", "fn": "06.25", "an": "" },
    { "slNo": 2, "point": "VINOD", "fn": "07.00", "an": "" },
    { "slNo": 3, "point": "SHAARADA", "fn": "07.10", "an": "" },
    { "slNo": 4, "point": "PAVITHRAM", "fn": "08.15", "an": "" },
    { "slNo": 5, "point": "PAVIZHAM (KDP)", "fn": "08.55", "an": "" },
    { "slNo": 6, "point": "FRL (KDP)", "fn": "09.00", "an": "" },
    { "slNo": 7, "point": "PAAVANA (KDP)", "fn": "09.40", "an": "" },
    { "slNo": 8, "point": "NASHA", "fn": "10.00", "an": "" },
    { "slNo": 9, "point": "SHAARADA", "fn": "11.05", "an": "" },
    { "slNo": 10, "point": "BHAGYAREKHA", "fn": "11.20", "an": "" },
    { "slNo": 11, "point": "PAARIJAATHAM", "fn": "11.35", "an": "" },
    { "slNo": 12, "point": "PAAVANA", "fn": "12.00", "an": "" },
    { "slNo": 13, "point": "FRL (KDP)", "fn": "12.10", "an": "" },
    { "slNo": 14, "point": "PAVITHRAM", "fn": "12.45", "an": "" },
    { "slNo": 15, "point": "NASHA", "fn": "01.55", "an": "" },
    { "slNo": 16, "point": "SHAARADA", "fn": "03.10", "an": "" },
    { "slNo": 17, "point": "PAARIJAATHAM", "fn": "04.30", "an": "" },
    { "slNo": 18, "point": "PAVITHRAM", "fn": "04.55", "an": "" },
    { "slNo": 19, "point": "FRL (KDP)", "fn": "05.25", "an": "" },
    { "slNo": 20, "point": "BHAGYAREKHA", "fn": "05.45", "an": "" },
    { "slNo": 21, "point": "NASHA", "fn": "06.05", "an": "" }
  ]
},
{
  "slug": "mannpatta-to-skp",
  "title": "Mannpatta to SKP (Private Bus Timings)",
  "routes": [
    { "slNo": 1, "point": "PAVIZHAM", "fn": "08.05", "an": "" },
    { "slNo": 2, "point": "NASHA", "fn": "08.50", "an": "" },
    { "slNo": 3, "point": "PAARIJAATHAM", "fn": "09.25", "an": "" },
    { "slNo": 4, "point": "BHAVANA", "fn": "10.00", "an": "" },
    { "slNo": 5, "point": "BHAGYAREKHA", "fn": "10.50", "an": "" },
    { "slNo": 6, "point": "VINOD", "fn": "11.35", "an": "" },
    { "slNo": 7, "point": "PAVIZHAM", "fn": "12.05", "an": "" },
    { "slNo": 8, "point": "NASHA", "fn": "01.10", "an": "" },
    { "slNo": 9, "point": "PAARIJAATHAM", "fn": "02.15", "an": "" },
    { "slNo": 10, "point": "SHAARADHA", "fn": "02.40", "an": "" },
    { "slNo": 11, "point": "PAVITHRAM", "fn": "03.20", "an": "" },
    { "slNo": 12, "point": "BHAVANA", "fn": "04.35", "an": "" },
    { "slNo": 13, "point": "BHAGYAREKHA", "fn": "05.05", "an": "" },
    { "slNo": 14, "point": "SHAARADHA", "fn": "05.40", "an": "" },
    { "slNo": 15, "point": "PAARIJAATHAM", "fn": "07.25", "an": "" }
  ]
},
{
  "slug": "skp-to-otp",
  "title": "SKP to Ottappalam (Private Bus Timings)",
  "routes": [
    { "slNo": 1, "point": "ST XAVIER", "fn": "05.40", "an": "TCR" },
    { "slNo": 2, "point": "KSRTC", "fn": "06.05", "an": "TCR" },
    { "slNo": 3, "point": "UDAYA", "fn": "06.35", "an": "" },
    { "slNo": 4, "point": "KAVITHA", "fn": "06.50", "an": "" },
    { "slNo": 5, "point": "AMBADATH", "fn": "07.08", "an": "" },
    { "slNo": 6, "point": "KSRTC", "fn": "07.12", "an": "TCR" },
    { "slNo": 7, "point": "CITY STAR", "fn": "07.35", "an": "" },
    { "slNo": 8, "point": "SS BROS", "fn": "07.55", "an": "" },
    { "slNo": 9, "point": "UDAYAM", "fn": "08.02", "an": "CPY" },
    { "slNo": 10, "point": "RAJAPRABHA", "fn": "08.03", "an": "CPY" },
    { "slNo": 11, "point": "SS KUMAR", "fn": "08.05", "an": "" },
    { "slNo": 12, "point": "KSRTC", "fn": "08.05", "an": "TCR" },
    { "slNo": 13, "point": "SS KUMAR", "fn": "09.05", "an": "" },
    { "slNo": 14, "point": "KARUNYAM", "fn": "09.20", "an": "" },
    { "slNo": 15, "point": "ZINDAGY", "fn": "10.01", "an": "" },
    { "slNo": 16, "point": "CITY STAR", "fn": "10.35", "an": "" },
    { "slNo": 17, "point": "UDAYA", "fn": "10.45", "an": "" },
    { "slNo": 18, "point": "HARISRI", "fn": "11.01", "an": "" },
    { "slNo": 19, "point": "KAVITHA", "fn": "11.30", "an": "" },
    { "slNo": 20, "point": "RAJAPRABHA", "fn": "11.40", "an": "CPY" },
    { "slNo": 21, "point": "UDAYA", "fn": "12.05", "an": "" },
    { "slNo": 22, "point": "RAJAPRABHA", "fn": "12.50", "an": "CPY" },
    { "slNo": 23, "point": "ST XAVIER", "fn": "12.57", "an": "TCR" },
    { "slNo": 24, "point": "UDAYAM", "fn": "12.58", "an": "CPY" },
    { "slNo": 25, "point": "AMBADATH", "fn": "02.02", "an": "" },
    { "slNo": 26, "point": "ZINDAGY", "fn": "02.40", "an": "" },
    { "slNo": 27, "point": "SS BROS", "fn": "02.58", "an": "" },
    { "slNo": 28, "point": "KARUNYAM", "fn": "03.03", "an": "" },
    { "slNo": 29, "point": "SS KUMAR", "fn": "03.48", "an": "" },
    { "slNo": 30, "point": "SS KUMAR", "fn": "04.00", "an": "" },
    { "slNo": 31, "point": "CITY STAR", "fn": "04.20", "an": "" },
    { "slNo": 32, "point": "UDAYA", "fn": "04.40", "an": "" },
    { "slNo": 33, "point": "UDAYA", "fn": "05.00", "an": "" },
    { "slNo": 34, "point": "KAVITHA", "fn": "05.35", "an": "" },
    { "slNo": 35, "point": "RAJAPRABHA", "fn": "05.40", "an": "CPY" }
  ]
},
{
  "slug": "skp-to-shr",
  "title": "SKP to Shornnur(Private Bus Timings)",
  "routes": [
    { "slNo": 1, "point": "AMBADATH", "fn": "07.58", "an": "CPY" },
    { "slNo": 2, "point": "SS KUMAR", "fn": "09.05", "an": "OTP" },
    { "slNo": 3, "point": "RENIRAJ", "fn": "09.50", "an": "CPY" },
    { "slNo": 4, "point": "KAVITHA", "fn": "10.55", "an": "CPY" },
    { "slNo": 5, "point": "PRL", "fn": "11.02", "an": "CPY" },
    { "slNo": 6, "point": "TK", "fn": "12.18", "an": "CPY" },
    { "slNo": 7, "point": "POWER", "fn": "01.45", "an": "CPY" },
    { "slNo": 8, "point": "AMBADATH", "fn": "02.01", "an": "CPY" },
    { "slNo": 9, "point": "RENIRAJ", "fn": "02.45", "an": "CPY" },
    { "slNo": 10, "point": "KALLOORKAL", "fn": "03.15", "an": "CPY" },
    { "slNo": 11, "point": "TK", "fn": "05.50", "an": "CPY" }
  ]
},

  
];
