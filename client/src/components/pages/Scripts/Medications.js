import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios'
    
 
// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    "id": 1,
    "DrugName": "ABILIFY 10MG TAB",
    "DrugNdc": 59148000813,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 2,
    "DrugName": "ABILIFY 5MG TAB",
    "DrugNdc": 59148000713,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 3,
    "DrugName": "ACCU-CHEK AVIVA PLUS TES",
    "DrugNdc": 65702040810,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 4,
    "DrugName": "ACCU-CHEK FASTCLIX EA",
    "DrugNdc": 65702028810,
    "DrugQty": 102,
    "FIELD5": ""
  },
  {
    "id": 5,
    "DrugName": "ACCU-CHEK MULTICLIX TES",
    "DrugNdc": 50924045001,
    "DrugQty": 102,
    "FIELD5": ""
  },
  {
    "id": 6,
    "DrugName": "ACCU-CHEK SMARTVIEW TES",
    "DrugNdc": 65702049210,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 7,
    "DrugName": "ACETAMINOPHE/CODEINE 300-30MG TAB",
    "DrugNdc": 93015001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 8,
    "DrugName": "ACETAMINOPHEN/CODEIN 300-30MG TAB",
    "DrugNdc": 65162003310,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 9,
    "DrugName": "ACYCLOVIR 200MG CAP",
    "DrugNdc": 60505004206,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 10,
    "DrugName": "ACYCLOVIR 400MG TAB",
    "DrugNdc": 61442011201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 11,
    "DrugName": "ACYCLOVIR 400MG TAB",
    "DrugNdc": 23155022701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 12,
    "DrugName": "ACYCLOVIR 800MG TAB",
    "DrugNdc": 60505530701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 13,
    "DrugName": "ACYCLOVIR 800MG TAB",
    "DrugNdc": 61442011301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 14,
    "DrugName": "ADVAIR DISKUS 250/50* 250-50MCG/INH EA",
    "DrugNdc": 173069600,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 15,
    "DrugName": "AEROCHAMBER PLUS EA",
    "DrugNdc": 4351797100,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 16,
    "DrugName": "AFINITOR 10MG TAB",
    "DrugNdc": 78056751,
    "DrugQty": 28,
    "FIELD5": ""
  },
  {
    "id": 17,
    "DrugName": "AFINITOR 2.5MG TAB",
    "DrugNdc": 78059451,
    "DrugQty": 28,
    "FIELD5": ""
  },
  {
    "id": 18,
    "DrugName": "AFINITOR 5MG TAB",
    "DrugNdc": 78056651,
    "DrugQty": 28,
    "FIELD5": ""
  },
  {
    "id": 19,
    "DrugName": "AGRYLIN 0.5MG CAP",
    "DrugNdc": 54092006301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 20,
    "DrugName": "AIRDUO RESPICLICK 55-14MCG AER",
    "DrugNdc": 59310080506,
    "DrugQty": 6,
    "FIELD5": ""
  },
  {
    "id": 21,
    "DrugName": "AKWA TEARS 1.4% SOL",
    "DrugNdc": 17478006012,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 22,
    "DrugName": "AKYNZEO 300MG CAP",
    "DrugNdc": 69639010101,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 23,
    "DrugName": "ALBUTEROL SULFATE 0.042% SOL",
    "DrugNdc": 378699252,
    "DrugQty": 75,
    "FIELD5": ""
  },
  {
    "id": 24,
    "DrugName": "ALBUTEROL SULFATE 2.5mg/3ml* 0.083% SOL",
    "DrugNdc": 76204020030,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 25,
    "DrugName": "ALBUTEROL SULFATE 2MG/5ML LIQ",
    "DrugNdc": 50383074016,
    "DrugQty": 473,
    "FIELD5": ""
  },
  {
    "id": 26,
    "DrugName": "ALECENSA 150MG CAP",
    "DrugNdc": 50242013001,
    "DrugQty": 240,
    "FIELD5": ""
  },
  {
    "id": 27,
    "DrugName": "ALENDRONATE SODIUM 35MG TAB",
    "DrugNdc": 69543013004,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 28,
    "DrugName": "ALENDRONATE SODIUM 70MG TAB",
    "DrugNdc": 65862032904,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 29,
    "DrugName": "ALENDRONATE SODIUM 70MG TAB",
    "DrugNdc": 69097022416,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 30,
    "DrugName": "ALFUZOSIN HCL 10MG TER",
    "DrugNdc": 57237011490,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 31,
    "DrugName": "ALFUZOSIN HCL 10MG TER",
    "DrugNdc": 60505285001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 32,
    "DrugName": "ALKERAN 2MG TAB",
    "DrugNdc": 52609000105,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 33,
    "DrugName": "ALLERGY 24 HR 10MG TAB",
    "DrugNdc": 904572887,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 34,
    "DrugName": "ALLOPURINOL 300MG TAB",
    "DrugNdc": 378018101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 35,
    "DrugName": "ALLOPURINOL 300MG TAB",
    "DrugNdc": 591554401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 36,
    "DrugName": "ALLOPURINOL* 100MG TAB",
    "DrugNdc": 591554301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 37,
    "DrugName": "ALPHAGAN P 0.15% SOL",
    "DrugNdc": 23917710,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 38,
    "DrugName": "ALPHAGAN P* 0.1% SOL",
    "DrugNdc": 23932105,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 39,
    "DrugName": "ALPHAGAN P* 0.1% SOL",
    "DrugNdc": 23932110,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 40,
    "DrugName": "ALPHAGAN P* 0.15% SOL",
    "DrugNdc": 23917715,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 41,
    "DrugName": "ALPRAZolam 0.25MG TAB",
    "DrugNdc": 67253090010,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 42,
    "DrugName": "ALPRAZolam 0.5MG TAB",
    "DrugNdc": 67253090110,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 43,
    "DrugName": "ALPRAZolam 1MG TAB",
    "DrugNdc": 67253090210,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 44,
    "DrugName": "ALPRAZolam 1MG TAB",
    "DrugNdc": 59762372101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 45,
    "DrugName": "ALPRAZolam* 2MG TAB",
    "DrugNdc": 67253090310,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 46,
    "DrugName": "ALREX 0.2% SUSPENSION 5ML* 0.2% SUS",
    "DrugNdc": 24208035305,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 47,
    "DrugName": "AMANTADINE HCL 100MG CAP",
    "DrugNdc": 832201200,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 48,
    "DrugName": "AMIODARONE HCL 200MG TAB",
    "DrugNdc": 68382022714,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 49,
    "DrugName": "AMIODARONE HCL 400MG TAB",
    "DrugNdc": 51862015630,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 50,
    "DrugName": "AMIODARONE HCL 400MG TAB",
    "DrugNdc": 51862024230,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 51,
    "DrugName": "AMIODARONE HCL* 200MG TAB",
    "DrugNdc": 65862073260,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 52,
    "DrugName": "AMITIZA 24MCG CAP",
    "DrugNdc": 64764024060,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 53,
    "DrugName": "AMITIZA* 8MCG CAP",
    "DrugNdc": 64764008060,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 54,
    "DrugName": "AMITRIPTYLINE HCL 10MG TAB",
    "DrugNdc": 603221221,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 55,
    "DrugName": "AMITRIPTYLINE HCL 50MG TAB",
    "DrugNdc": 781148801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 56,
    "DrugName": "AMITRIPTYLINE HCL 50MG TAB",
    "DrugNdc": 378265001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 57,
    "DrugName": "AMITRIPTYLINE HCL* 25MG TAB",
    "DrugNdc": 603221321,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 58,
    "DrugName": "AMLACTIN 12% LOT",
    "DrugNdc": 245002340,
    "DrugQty": 400,
    "FIELD5": ""
  },
  {
    "id": 59,
    "DrugName": "amLODIPine BESYLATE 10MG TAB",
    "DrugNdc": 68382012305,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 60,
    "DrugName": "amLODIPine BESYLATE 10MG TAB",
    "DrugNdc": 42806005705,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 61,
    "DrugName": "amLODIPine BESYLATE 2.5MG TAB",
    "DrugNdc": 378520877,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 62,
    "DrugName": "amLODIPine BESYLATE 2.5MG TAB",
    "DrugNdc": 69097083605,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 63,
    "DrugName": "amLODIPine BESYLATE 5MG TAB",
    "DrugNdc": 68382012205,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 64,
    "DrugName": "amLODIPine BESYLATE 5MG TAB",
    "DrugNdc": 69097012715,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 65,
    "DrugName": "AmLODIPine BESYLATE* 2.5MG TAB",
    "DrugNdc": 67877019790,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 66,
    "DrugName": "AmLODIPine BESYLATE* 5MG TAB",
    "DrugNdc": 67877019890,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 67,
    "DrugName": "AMMONIUM LACTATE 12% CRM",
    "DrugNdc": 51672130104,
    "DrugQty": 280,
    "FIELD5": ""
  },
  {
    "id": 68,
    "DrugName": "AMMONIUM LACTATE 12% LOT",
    "DrugNdc": 45802041954,
    "DrugQty": 225,
    "FIELD5": ""
  },
  {
    "id": 69,
    "DrugName": "AMOXICILLIN 250MG CAP",
    "DrugNdc": 781202001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 70,
    "DrugName": "AMOXICILLIN 250MG/5ML SPN",
    "DrugNdc": 93415573,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 71,
    "DrugName": "AMOXICILLIN 250MG/5ML SPN",
    "DrugNdc": 143988901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 72,
    "DrugName": "AMOXICILLIN 400MG/5ML SPN",
    "DrugNdc": 143988701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 73,
    "DrugName": "AMOXICILLIN 875MG TAB",
    "DrugNdc": 93226401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 74,
    "DrugName": "AMOXICILLIN* 500MG CAP",
    "DrugNdc": 781261305,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 75,
    "DrugName": "AMOXICILLIN/CLAVULAN 500-125MG TAB",
    "DrugNdc": 66685100200,
    "DrugQty": 20,
    "FIELD5": ""
  },
  {
    "id": 76,
    "DrugName": "AMOXICILLIN/CLAVULAN 875-125MG TAB",
    "DrugNdc": 66685100100,
    "DrugQty": 20,
    "FIELD5": ""
  },
  {
    "id": 77,
    "DrugName": "AMOXICILLIN/CLAVULAN* 875-125MG TAB",
    "DrugNdc": 65862050320,
    "DrugQty": 20,
    "FIELD5": ""
  },
  {
    "id": 78,
    "DrugName": "ANAGRELIDE HCL 0.5MG CAP",
    "DrugNdc": 13668045301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 79,
    "DrugName": "ANAGRELIDE HCL 0.5MG CAP",
    "DrugNdc": 172524160,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 80,
    "DrugName": "ANASTROZOLE 1MG TAB",
    "DrugNdc": 51991062033,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 81,
    "DrugName": "ANASTROZOLE 1MG TAB",
    "DrugNdc": 68001015504,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 82,
    "DrugName": "ANTACID SUSPENSION 225-200MG/5 ML SUS",
    "DrugNdc": 24385035640,
    "DrugQty": 360,
    "FIELD5": ""
  },
  {
    "id": 83,
    "DrugName": "ANUSOL-HC 2.5% CRM",
    "DrugNdc": 65649040130,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 84,
    "DrugName": "APIDRA SOLOSTAR* 100U/ML INJ",
    "DrugNdc": 88250205,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 85,
    "DrugName": "APREPITANT 125MG CAP",
    "DrugNdc": 68462011233,
    "DrugQty": 3,
    "FIELD5": ""
  },
  {
    "id": 86,
    "DrugName": "APREPITANT TRIFOLD* CAP",
    "DrugNdc": 781406336,
    "DrugQty": 3,
    "FIELD5": ""
  },
  {
    "id": 87,
    "DrugName": "APTIOM 400MG TAB",
    "DrugNdc": 63402020430,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 88,
    "DrugName": "AQUAPHOR HEALING 41% ONT",
    "DrugNdc": 72140045231,
    "DrugQty": 1.75,
    "FIELD5": ""
  },
  {
    "id": 89,
    "DrugName": "ARIMIDEX 1MG TAB",
    "DrugNdc": 310020130,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 90,
    "DrugName": "ARIPiprazole 10MG TAB",
    "DrugNdc": 31722082730,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 91,
    "DrugName": "ARIPiprazole 20MG TAB",
    "DrugNdc": 31722082930,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 92,
    "DrugName": "ARIPiprazole 2MG TAB",
    "DrugNdc": 31722081930,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 93,
    "DrugName": "ARIPiprazole 30MG TAB",
    "DrugNdc": 31722083030,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 94,
    "DrugName": "ARIPiprazole 5MG TAB",
    "DrugNdc": 31722082030,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 95,
    "DrugName": "AROMASIN 25MG TAB",
    "DrugNdc": 9766304,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 96,
    "DrugName": "ASPIRIN 81MG TAB",
    "DrugNdc": 69618001702,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 97,
    "DrugName": "ASPIRIN 81MG TAB",
    "DrugNdc": 46122018087,
    "DrugQty": 300,
    "FIELD5": ""
  },
  {
    "id": 98,
    "DrugName": "ASPIRIN CHEWABLE 81MG TAB",
    "DrugNdc": 57896091136,
    "DrugQty": 36,
    "FIELD5": ""
  },
  {
    "id": 99,
    "DrugName": "ASPIRIN CHEWABLE 81MG TAB",
    "DrugNdc": 904628889,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 100,
    "DrugName": "ASPIRIN E.C. 325MG TAB",
    "DrugNdc": 603016921,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 101,
    "DrugName": "ASPIRIN LOW DOSE 81MG TAB",
    "DrugNdc": 603002632,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 102,
    "DrugName": "ASPIR-LOW E.C. 81MG TAB",
    "DrugNdc": 904770418,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 103,
    "DrugName": "ASPIR-LOW E.C.* 81MG TAB",
    "DrugNdc": 904770480,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 104,
    "DrugName": "ATENOLOL 100MG TAB",
    "DrugNdc": 93075301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 105,
    "DrugName": "ATENOLOL 25MG TAB",
    "DrugNdc": 68382002201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 106,
    "DrugName": "ATENOLOL 25MG TAB",
    "DrugNdc": 781107810,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 107,
    "DrugName": "ATENOLOL 25MG TAB",
    "DrugNdc": 93078710,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 108,
    "DrugName": "ATENOLOL 50MG TAB",
    "DrugNdc": 68382002301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 109,
    "DrugName": "ATENOLOL 50MG TAB",
    "DrugNdc": 93075201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 110,
    "DrugName": "ATENOLOL* 100MG TAB",
    "DrugNdc": 378075701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 111,
    "DrugName": "ATOMOXETINE HCL 18MG CAP",
    "DrugNdc": 64980037403,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 112,
    "DrugName": "ATORVASTATIN CALCIUM 10MG TAB",
    "DrugNdc": 60505257809,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 113,
    "DrugName": "ATORVASTATIN CALCIUM 80MG TAB",
    "DrugNdc": 60505267109,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 114,
    "DrugName": "ATORVASTATIN CALCIUM* 10MG TAB",
    "DrugNdc": 60505257809,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 115,
    "DrugName": "ATORVASTATIN CALCIUM* 20MG TAB",
    "DrugNdc": 60505257909,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 116,
    "DrugName": "ATORVASTATIN CALCIUM* 40MG TAB",
    "DrugNdc": 60505258009,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 117,
    "DrugName": "ATORVASTATIN CALCIUM* 80MG TAB",
    "DrugNdc": 60505267109,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 118,
    "DrugName": "ATOVAQUONE 750MG/5ML SUS",
    "DrugNdc": 65162069388,
    "DrugQty": 210,
    "FIELD5": ""
  },
  {
    "id": 119,
    "DrugName": "ATROVENT HFA* 17MCG/INH AER",
    "DrugNdc": 597008717,
    "DrugQty": 12.9,
    "FIELD5": ""
  },
  {
    "id": 120,
    "DrugName": "AUGMENTIN 200MG-28.5MG TAB",
    "DrugNdc": 29607112,
    "DrugQty": 20,
    "FIELD5": ""
  },
  {
    "id": 121,
    "DrugName": "AVIANE 0.1-0.02MG TAB",
    "DrugNdc": 555904558,
    "DrugQty": 168,
    "FIELD5": ""
  },
  {
    "id": 122,
    "DrugName": "azaTHIOprine 50MG TAB",
    "DrugNdc": 68382000301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 123,
    "DrugName": "AZELASTINE HCL 0.05% SOL",
    "DrugNdc": 60505057804,
    "DrugQty": 6,
    "FIELD5": ""
  },
  {
    "id": 124,
    "DrugName": "AZELASTINE HCL 0.05% SOL",
    "DrugNdc": 61314030802,
    "DrugQty": 6,
    "FIELD5": ""
  },
  {
    "id": 125,
    "DrugName": "AZELASTINE HCL 137MCG/INH SOL",
    "DrugNdc": 47335077991,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 126,
    "DrugName": "AZELASTINE HCL 137MCG/INH SOL",
    "DrugNdc": 65162067684,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 127,
    "DrugName": "AZITHROMYCIN 200MG/5ML SPN",
    "DrugNdc": 59762312001,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 128,
    "DrugName": "AZITHROMYCIN 200MG/5ML SPN",
    "DrugNdc": 59762313001,
    "DrugQty": 22.5,
    "FIELD5": ""
  },
  {
    "id": 129,
    "DrugName": "AZITHROMYCIN 250MG TAB",
    "DrugNdc": 68180016013,
    "DrugQty": 18,
    "FIELD5": ""
  },
  {
    "id": 130,
    "DrugName": "AZITHROMYCIN 250MG TAB",
    "DrugNdc": 60505258103,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 131,
    "DrugName": "AZITHROMYCIN 500MG TAB",
    "DrugNdc": 50111078855,
    "DrugQty": 3,
    "FIELD5": ""
  },
  {
    "id": 132,
    "DrugName": "AZITHROMYCIN* 1GM SPN",
    "DrugNdc": 59762305102,
    "DrugQty": 3,
    "FIELD5": ""
  },
  {
    "id": 133,
    "DrugName": "AZOPT* 1% SUS",
    "DrugNdc": 65027510,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 134,
    "DrugName": "B COMPLEX & B12 0 TAB",
    "DrugNdc": 74312001900,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 135,
    "DrugName": "B COMPLEX 0 CAP",
    "DrugNdc": 54629056001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 136,
    "DrugName": "BACITRACIN 500U/GM ONT",
    "DrugNdc": 45802006001,
    "DrugQty": 14,
    "FIELD5": ""
  },
  {
    "id": 137,
    "DrugName": "BACITRACIN/POLYMYXIN 500-10,000U/GM ONT",
    "DrugNdc": 24208055555,
    "DrugQty": 3.5,
    "FIELD5": ""
  },
  {
    "id": 138,
    "DrugName": "BACITRACIN/POLYMYXIN 500-10,000U/GM ONT",
    "DrugNdc": 168002135,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 139,
    "DrugName": "BACLOFEN 10MG TAB",
    "DrugNdc": 172409660,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 140,
    "DrugName": "BACLOFEN 10MG TAB",
    "DrugNdc": 527133001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 141,
    "DrugName": "BACLOFEN 20MG TAB",
    "DrugNdc": 172409760,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 142,
    "DrugName": "BACLOFEN 20MG TAB",
    "DrugNdc": 832102500,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 143,
    "DrugName": "BACLOFEN* 10MG TAB",
    "DrugNdc": 832102400,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 144,
    "DrugName": "BANOPHEN 12.5MG/5 ML ELX",
    "DrugNdc": 904122800,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 145,
    "DrugName": "BANOPHEN 25MG CAP",
    "DrugNdc": 904203524,
    "DrugQty": 24,
    "FIELD5": ""
  },
  {
    "id": 146,
    "DrugName": "BANOPHEN 50MG CAP",
    "DrugNdc": 904530780,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 147,
    "DrugName": "BARACLUDE 0.05MG/ML SOL",
    "DrugNdc": 3161412,
    "DrugQty": 210,
    "FIELD5": ""
  },
  {
    "id": 148,
    "DrugName": "BASAGLAR KWIKPEN* 100U/ML INJ",
    "DrugNdc": 2771559,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 149,
    "DrugName": "BD INSULIN SYRING 6MM 31GX0.5ML",
    "DrugNdc": 82903249114,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 150,
    "DrugName": "BD PEN ND UF 29G EA",
    "DrugNdc": 8290328203,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 151,
    "DrugName": "BD PEN ND UFII 31G EA",
    "DrugNdc": 8290320109,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 152,
    "DrugName": "BD SYR MF .3CC 28G EA",
    "DrugNdc": 8290328430,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 153,
    "DrugName": "BD SYR MF .5CC 28G EA",
    "DrugNdc": 8290328465,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 154,
    "DrugName": "BD SYR MF 1CC 28G EA",
    "DrugNdc": 8290328410,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 155,
    "DrugName": "BD SYR U-500, 31 G EA",
    "DrugNdc": 8290326730,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 156,
    "DrugName": "BD SYR UF .5CC 30G EA",
    "DrugNdc": 8290328466,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 157,
    "DrugName": "BD SYR UFII .5CC 31G EA",
    "DrugNdc": 8290328468,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 158,
    "DrugName": "BD ULTRA-FINE 15/64\" EA",
    "DrugNdc": 8290324911,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 159,
    "DrugName": "BD ULTRA-FINE MINI EA",
    "DrugNdc": 8290320119,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 160,
    "DrugName": "BD ULTRA-FINE NANO* EA",
    "DrugNdc": 8290320122,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 161,
    "DrugName": "BENADRYL 25MG CAP",
    "DrugNdc": 12547170210,
    "DrugQty": 24,
    "FIELD5": ""
  },
  {
    "id": 162,
    "DrugName": "BENADRYL ITCH STOPPI 2% GEL",
    "DrugNdc": 12547017157,
    "DrugQty": 3.5,
    "FIELD5": ""
  },
  {
    "id": 163,
    "DrugName": "BENAZEPRIL HCL 10MG TAB",
    "DrugNdc": 43547033650,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 164,
    "DrugName": "BENAZEPRIL HCL 20MG TAB",
    "DrugNdc": 43547033750,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 165,
    "DrugName": "BENAZEPRIL HCL 40MG TAB",
    "DrugNdc": 65162075410,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 166,
    "DrugName": "BENAZEPRIL HCL 5MG TAB",
    "DrugNdc": 65162075150,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 167,
    "DrugName": "BENAZEPRIL HCL* 40MG TAB",
    "DrugNdc": 43547033810,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 168,
    "DrugName": "BENDEKA 25MG/ML INJ",
    "DrugNdc": 63459034804,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 169,
    "DrugName": "BENZONATATE 100MG CAP",
    "DrugNdc": 69452014320,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 170,
    "DrugName": "BENZONATATE 100MG CAP",
    "DrugNdc": 67877010501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 171,
    "DrugName": "BENZTROPINE MESYLATE 1MG TAB",
    "DrugNdc": 76385010401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 172,
    "DrugName": "BENZTROPINE MESYLATE 2MG TAB",
    "DrugNdc": 76385010510,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 173,
    "DrugName": "BENZTROPINE MESYLATE* 0.5MG TAB",
    "DrugNdc": 603243721,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 174,
    "DrugName": "BESIVANCE 0.6% SUS",
    "DrugNdc": 24208044605,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 175,
    "DrugName": "BETAMETHASONE DIPROP 0.05% CRM",
    "DrugNdc": 168005515,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 176,
    "DrugName": "BETAMETHASONE DIPROP 0.05% CRM",
    "DrugNdc": 472038045,
    "DrugQty": 45,
    "FIELD5": ""
  },
  {
    "id": 177,
    "DrugName": "BICALUTAMIDE 50MG TAB",
    "DrugNdc": 93022001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 178,
    "DrugName": "BICALUTAMIDE 50MG TAB",
    "DrugNdc": 16729002301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 179,
    "DrugName": "BIOTIN 5MG TAB",
    "DrugNdc": 40985027116,
    "DrugQty": 110,
    "FIELD5": ""
  },
  {
    "id": 180,
    "DrugName": "BISACODYL 5MG TAB",
    "DrugNdc": 904792760,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 181,
    "DrugName": "BISACODYL 5MG TAB",
    "DrugNdc": 30904792760,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 182,
    "DrugName": "BISACODYL 5MG TAB",
    "DrugNdc": 904792780,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 183,
    "DrugName": "BLISOVI FE 1.5/30* 1500-30MCG TAB",
    "DrugNdc": 68180086613,
    "DrugQty": 84,
    "FIELD5": ""
  },
  {
    "id": 184,
    "DrugName": "BRILINTA* 90MG TAB",
    "DrugNdc": 186077760,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 185,
    "DrugName": "BRIMONIDINE TARTRATE 0.15% SOL",
    "DrugNdc": 61314014410,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 186,
    "DrugName": "BRIMONIDINE TARTRATE 0.2% SOL",
    "DrugNdc": 24208041110,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 187,
    "DrugName": "BRIMONIDINE TARTRATE 0.2% SOL",
    "DrugNdc": 61314014310,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 188,
    "DrugName": "BRIMONIDINE TARTRATE* 0.15% SOL",
    "DrugNdc": 61314014405,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 189,
    "DrugName": "BRIMONIDINE TARTRATE* 0.2% SOL",
    "DrugNdc": 24208041115,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 190,
    "DrugName": "BROVANA 15MCG/2ML SOL",
    "DrugNdc": 63402091164,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 191,
    "DrugName": "BUDESONIDE* 0.5MG/2ML NEB",
    "DrugNdc": 591376830,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 192,
    "DrugName": "BUMETANIDE 1MG TAB",
    "DrugNdc": 42799012001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 193,
    "DrugName": "BUMETANIDE 2MG TAB",
    "DrugNdc": 832054211,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 194,
    "DrugName": "BUMETANIDE* 1MG TAB",
    "DrugNdc": 185012901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 195,
    "DrugName": "BUMETANIDE* 2MG TAB",
    "DrugNdc": 185013001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 196,
    "DrugName": "BuPROPion HCL 100MG TAB",
    "DrugNdc": 781106401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 197,
    "DrugName": "BuPROPion HCL SR 100MG TER",
    "DrugNdc": 185041060,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 198,
    "DrugName": "BuPROPion HCL SR 100MG TER",
    "DrugNdc": 69097087703,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 199,
    "DrugName": "BuPROPion HCL SR 150MG TER",
    "DrugNdc": 185041560,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 200,
    "DrugName": "BuPROPion XL 150MG TER",
    "DrugNdc": 115681108,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 201,
    "DrugName": "BuPROPion XL 150MG TER",
    "DrugNdc": 68001032204,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 202,
    "DrugName": "BuPROPion XL 300MG TER",
    "DrugNdc": 45963014230,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 203,
    "DrugName": "BusPIRone HCL 10MG TAB",
    "DrugNdc": 16729020216,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 204,
    "DrugName": "BusPIRone HCL 10MG TAB",
    "DrugNdc": 68382018105,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 205,
    "DrugName": "BusPIRone HCL 10MG TAB",
    "DrugNdc": 115169102,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 206,
    "DrugName": "BusPIRone HCL 15MG TAB",
    "DrugNdc": 115169219,
    "DrugQty": 180,
    "FIELD5": ""
  },
  {
    "id": 207,
    "DrugName": "BusPIRone HCL 30MG TAB",
    "DrugNdc": 68382018314,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 208,
    "DrugName": "BusPIRone HCL 5MG TAB",
    "DrugNdc": 68382018001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 209,
    "DrugName": "BusPIRone HCL 7.5MG TAB",
    "DrugNdc": 378114501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 210,
    "DrugName": "BYDUREON PEN 2MG INJ",
    "DrugNdc": 310653004,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 211,
    "DrugName": "BYSTOLIC 5MG TAB",
    "DrugNdc": 456140530,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 212,
    "DrugName": "CALCITONIN-SALMON* 200IU/INH AER",
    "DrugNdc": 49884016111,
    "DrugQty": 3.7,
    "FIELD5": ""
  },
  {
    "id": 213,
    "DrugName": "CALCITRATE W/D 200-200MG-IU TAB",
    "DrugNdc": 904527260,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 214,
    "DrugName": "CALCITRIOL 0.25MCG CAP",
    "DrugNdc": 64380072306,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 215,
    "DrugName": "CALCITRIOL 0.5MCG CAP",
    "DrugNdc": 64380072406,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 216,
    "DrugName": "CALCIUM 600 + D3 600-200MG-IU TAB",
    "DrugNdc": 904585692,
    "DrugQty": 150,
    "FIELD5": ""
  },
  {
    "id": 217,
    "DrugName": "CALCIUM ACETATE* 667MG CAP",
    "DrugNdc": 69097086283,
    "DrugQty": 200,
    "FIELD5": ""
  },
  {
    "id": 218,
    "DrugName": "CALCIUM CARBONATE 600MG TAB",
    "DrugNdc": 904323252,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 219,
    "DrugName": "CALCIUM/VITAMIN D * 600-400MG-IU TAB",
    "DrugNdc": 904323392,
    "DrugQty": 150,
    "FIELD5": ""
  },
  {
    "id": 220,
    "DrugName": "CANASA 1000MG SUP",
    "DrugNdc": 58914050156,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 221,
    "DrugName": "CAPECITABINE 150MG TAB",
    "DrugNdc": 93747306,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 222,
    "DrugName": "CAPECITABINE 500MG TAB",
    "DrugNdc": 93747489,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 223,
    "DrugName": "CAPECITABINE* 500MG TAB",
    "DrugNdc": 378251278,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 224,
    "DrugName": "CAPTOPRIL 25MG TAB",
    "DrugNdc": 143117201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 225,
    "DrugName": "carBAMazepine 100MG TAB",
    "DrugNdc": 13668027101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 226,
    "DrugName": "carBAMazepine ER 100MG CER",
    "DrugNdc": 60505280507,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 227,
    "DrugName": "carBAMazepine ER 200MG CER",
    "DrugNdc": 60505280607,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 228,
    "DrugName": "CarBAMazepine ER* 200MG CER",
    "DrugNdc": 66993040832,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 229,
    "DrugName": "CarBAMazepine ER* 300MG CER",
    "DrugNdc": 60505280707,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 230,
    "DrugName": "CarBAMazepine* 200MG TAB",
    "DrugNdc": 51672400501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 231,
    "DrugName": "CARBATROL* 300MG CER",
    "DrugNdc": 54092017312,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 232,
    "DrugName": "CARBIDOPA/LEVODOPA 25-100MG TER",
    "DrugNdc": 378008801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 233,
    "DrugName": "CARBIDOPA/LEVODOPA 25-100MG TER",
    "DrugNdc": 62756046188,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 234,
    "DrugName": "CARBIDOPA/LEVODOPA* 25-100MG TAB",
    "DrugNdc": 228253910,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 235,
    "DrugName": "CARISOPRODOL 350MG TAB",
    "DrugNdc": 591551305,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 236,
    "DrugName": "CARISOPRODOL* 350MG TAB",
    "DrugNdc": 591551301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 237,
    "DrugName": "CARVEDILOL 25MG TAB",
    "DrugNdc": 65862014505,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 238,
    "DrugName": "CARVEDILOL 3.125MG TAB",
    "DrugNdc": 76385011050,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 239,
    "DrugName": "CARVEDILOL* 12.5MG TAB",
    "DrugNdc": 68001015103,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 240,
    "DrugName": "CARVEDILOL* 25MG TAB",
    "DrugNdc": 68001015203,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 241,
    "DrugName": "CARVEDILOL* 3.125MG TAB",
    "DrugNdc": 68001015303,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 242,
    "DrugName": "CARVEDILOL* 6.25MG TAB",
    "DrugNdc": 68001015403,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 243,
    "DrugName": "CASODEX 50MG TAB",
    "DrugNdc": 310070530,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 244,
    "DrugName": "CEFACLOR* 500MG CAP",
    "DrugNdc": 61442017230,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 245,
    "DrugName": "CEFUROXIME AXETIL 500MG TAB",
    "DrugNdc": 63304075220,
    "DrugQty": 20,
    "FIELD5": ""
  },
  {
    "id": 246,
    "DrugName": "CEFUROXIME AXETIL 500MG TAB",
    "DrugNdc": 67877021620,
    "DrugQty": 20,
    "FIELD5": ""
  },
  {
    "id": 247,
    "DrugName": "CELECOXIB 100MG CAP",
    "DrugNdc": 62332014131,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 248,
    "DrugName": "CELECOXIB 100MG CAP",
    "DrugNdc": 59762151601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 249,
    "DrugName": "CELECOXIB 50MG CAP",
    "DrugNdc": 69097042303,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 250,
    "DrugName": "CELECOXIB* 200MG CAP",
    "DrugNdc": 62332014231,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 251,
    "DrugName": "CEPACOL 15mg/3.6mgMG LOZ",
    "DrugNdc": 63824071316,
    "DrugQty": 16,
    "FIELD5": ""
  },
  {
    "id": 252,
    "DrugName": "Cepacol extra strength 15mg/3.6mgmg LOZ",
    "DrugNdc": 5923109520,
    "DrugQty": 16,
    "FIELD5": ""
  },
  {
    "id": 253,
    "DrugName": "CEPACOL LOZ",
    "DrugNdc": 68020518,
    "DrugQty": 18,
    "FIELD5": ""
  },
  {
    "id": 254,
    "DrugName": "CEPACOL SORE THROAT 15-3.6MG LOZ",
    "DrugNdc": 63824071198,
    "DrugQty": 576,
    "FIELD5": ""
  },
  {
    "id": 255,
    "DrugName": "CEPHALEXIN 250MG/5ML SPN",
    "DrugNdc": 68180012401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 256,
    "DrugName": "CEPHALEXIN 250MG/5ML SPN",
    "DrugNdc": 68180012402,
    "DrugQty": 200,
    "FIELD5": ""
  },
  {
    "id": 257,
    "DrugName": "CEPHALEXIN 500MG CAP",
    "DrugNdc": 93314701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 258,
    "DrugName": "CEPHALEXIN 500MG CAP",
    "DrugNdc": 68180012202,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 259,
    "DrugName": "CEPHALEXIN 500MG CAP",
    "DrugNdc": 42043014105,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 260,
    "DrugName": "CEPHALEXIN* 250MG CAP",
    "DrugNdc": 68180012101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 261,
    "DrugName": "CETIRIZINE HCL 10MG TAB",
    "DrugNdc": 45802091987,
    "DrugQty": 300,
    "FIELD5": ""
  },
  {
    "id": 262,
    "DrugName": "CETIRIZINE HCL* 10MG TAB",
    "DrugNdc": 378363701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 263,
    "DrugName": "CEVIMELINE HCL 30MG CAP",
    "DrugNdc": 54033425,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 264,
    "DrugName": "CHERATUSSIN AC 10-100MG/5ML LIQ",
    "DrugNdc": 603107556,
    "DrugQty": 236,
    "FIELD5": ""
  },
  {
    "id": 265,
    "DrugName": "CHILDREN'S TYLENOL 160MG/5ML LIQ",
    "DrugNdc": 50580017001,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 266,
    "DrugName": "CHLORASEPTIC AER",
    "DrugNdc": 78112001103,
    "DrugQty": 177,
    "FIELD5": ""
  },
  {
    "id": 267,
    "DrugName": "CHLORHEXIDINE GLUCON* 0.12% LIQ",
    "DrugNdc": 116200116,
    "DrugQty": 473,
    "FIELD5": ""
  },
  {
    "id": 268,
    "DrugName": "CHLORHEXIDINE GLUCONATE* 0.12% LIQ",
    "DrugNdc": 116200104,
    "DrugQty": 118,
    "FIELD5": ""
  },
  {
    "id": 269,
    "DrugName": "ChlorproMAZINE HCL 50MG TAB",
    "DrugNdc": 832030200,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 270,
    "DrugName": "CHLORTHALIDONE 50MG 50MG TAB",
    "DrugNdc": 64980030401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 271,
    "DrugName": "CHLORTHALIDONE 50MG TAB",
    "DrugNdc": 57664064988,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 272,
    "DrugName": "CHLORTHALIDONE* 25MG TAB",
    "DrugNdc": 57664064888,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 273,
    "DrugName": "CHOLESTYRAMINE 4GM POW",
    "DrugNdc": 49884046565,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 274,
    "DrugName": "CIALIS 5MG TAB",
    "DrugNdc": 2446230,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 275,
    "DrugName": "CICLOPIROX 8% SOL",
    "DrugNdc": 51672530200,
    "DrugQty": 6.6,
    "FIELD5": ""
  },
  {
    "id": 276,
    "DrugName": "CICLOPIROX OLAMINE 0.77% CRM",
    "DrugNdc": 51672131802,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 277,
    "DrugName": "CICLOPIROX OLAMINE* 0.77% CRM",
    "DrugNdc": 51672131808,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 278,
    "DrugName": "CILOSTAZOL 100MG TAB",
    "DrugNdc": 185022360,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 279,
    "DrugName": "CILOSTAZOL 50MG TAB",
    "DrugNdc": 60505252101,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 280,
    "DrugName": "CILOSTAZOL 50MG TAB",
    "DrugNdc": 54002821,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 281,
    "DrugName": "CILOSTAZOL* 100MG TAB",
    "DrugNdc": 54004421,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 282,
    "DrugName": "CIMZIA PFS 200MG/ML KIT",
    "DrugNdc": 50474071079,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 283,
    "DrugName": "CIMZIA STARTER KIT 200MG/ML KIT",
    "DrugNdc": 50474071081,
    "DrugQty": 3,
    "FIELD5": ""
  },
  {
    "id": 284,
    "DrugName": "CIPRODEX 0.3-0.1% SUS",
    "DrugNdc": 65853302,
    "DrugQty": 7.5,
    "FIELD5": ""
  },
  {
    "id": 285,
    "DrugName": "CIPROFLOXACIN 0.3% SOL",
    "DrugNdc": 16571012050,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 286,
    "DrugName": "CIPROFLOXACIN 0.3% SOL",
    "DrugNdc": 61314065605,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 287,
    "DrugName": "CIPROFLOXACIN 500MG TAB",
    "DrugNdc": 55111012705,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 288,
    "DrugName": "CIPROFLOXACIN HCL 250MG TAB",
    "DrugNdc": 65862007601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 289,
    "DrugName": "CIPROFLOXACIN HCL 500MG TAB",
    "DrugNdc": 16571041250,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 290,
    "DrugName": "CITALOPRAM HBR 10MG TAB",
    "DrugNdc": 378623101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 291,
    "DrugName": "CITALOPRAM HBR 10MG TAB",
    "DrugNdc": 65162005210,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 292,
    "DrugName": "CITALOPRAM HBR 20MG TAB",
    "DrugNdc": 65162005310,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 293,
    "DrugName": "CITALOPRAM HBR 20MG TAB",
    "DrugNdc": 65162005350,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 294,
    "DrugName": "CITALOPRAM HBR 40MG TAB",
    "DrugNdc": 65162005410,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 295,
    "DrugName": "CITALOPRAM HBR UD* 20MG TAB",
    "DrugNdc": 904608561,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 296,
    "DrugName": "CLARITHROMYCIN 250MG TAB",
    "DrugNdc": 781196160,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 297,
    "DrugName": "CLARITHROMYCIN 500 MG TAB 500 MG TAB",
    "DrugNdc": 59746074360,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 298,
    "DrugName": "CLASSIC PRENATAL* TAB",
    "DrugNdc": 536406301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 299,
    "DrugName": "CLEMASTINE FUMARATE 2.68MG TAB",
    "DrugNdc": 93030801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 300,
    "DrugName": "CLINDAGEL 1% GEL",
    "DrugNdc": 16781046275,
    "DrugQty": 75,
    "FIELD5": ""
  },
  {
    "id": 301,
    "DrugName": "CLINDAMYCIN HCL 150MG CAP",
    "DrugNdc": 591570801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 302,
    "DrugName": "CLINDAMYCIN HCL 300MG CAP",
    "DrugNdc": 591293201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 303,
    "DrugName": "CLINDAMYCIN PHOSPHAT 1% GEL",
    "DrugNdc": 59762374301,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 304,
    "DrugName": "CLINDAMYCIN PHOSPHAT 1% GEL",
    "DrugNdc": 59762374302,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 305,
    "DrugName": "CLOBETASOL PROPIONAT 0.05% ONT",
    "DrugNdc": 51672125903,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 306,
    "DrugName": "CLOBETASOL PROPIONAT 0.05% ONT",
    "DrugNdc": 50383026860,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 307,
    "DrugName": "clonazePAM 0.125MG ODT",
    "DrugNdc": 49884030602,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 308,
    "DrugName": "clonazePAM 0.5MG TAB",
    "DrugNdc": 185006301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 309,
    "DrugName": "clonazePAM 0.5MG TAB",
    "DrugNdc": 228300311,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 310,
    "DrugName": "clonazePAM 0.5MG TAB",
    "DrugNdc": 93083201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 311,
    "DrugName": "clonazePAM 1MG TAB",
    "DrugNdc": 185006401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 312,
    "DrugName": "clonazePAM 1MG TAB",
    "DrugNdc": 16729013700,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 313,
    "DrugName": "clonazePAM 2MG TAB",
    "DrugNdc": 185006501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 314,
    "DrugName": "CLONIDINE  PAT 4 0.2MG PAT",
    "DrugNdc": 51862045404,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 315,
    "DrugName": "cloNIDine HCL 0.2MG TAB",
    "DrugNdc": 62332005531,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 316,
    "DrugName": "cloNIDine HCL 0.2MG TAB",
    "DrugNdc": 68001023800,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 317,
    "DrugName": "cloNIDine HCL 0.3MG TAB",
    "DrugNdc": 68001023900,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 318,
    "DrugName": "cloNIDine HCL 0.3MG TAB",
    "DrugNdc": 228212910,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 319,
    "DrugName": "cloNIDine HCL 0.3MG TAB",
    "DrugNdc": 29300013701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 320,
    "DrugName": "CloNIDine HCL* 0.1MG TAB",
    "DrugNdc": 68001023703,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 321,
    "DrugName": "CLOPIDOGREL BISULFAT 75MG TAB",
    "DrugNdc": 65862035730,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 322,
    "DrugName": "CLOPIDOGREL BISULFAT 75MG TAB",
    "DrugNdc": 65862035705,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 323,
    "DrugName": "CLOPIDOGREL BISULFAT* 75MG TAB",
    "DrugNdc": 55111019630,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 324,
    "DrugName": "CLOTRIM ANTIFUNGAL 1% CRM",
    "DrugNdc": 904782236,
    "DrugQty": 14.17,
    "FIELD5": ""
  },
  {
    "id": 325,
    "DrugName": "CLOTRIMAZOLE LOZENGE 10MG LOZ",
    "DrugNdc": 574010770,
    "DrugQty": 70,
    "FIELD5": ""
  },
  {
    "id": 326,
    "DrugName": "CLOTRIMAZOLE VAGINAL 1% CRM",
    "DrugNdc": 472022041,
    "DrugQty": 45,
    "FIELD5": ""
  },
  {
    "id": 327,
    "DrugName": "CLOTRIMAZOLE VAGINAL* 2% CRM",
    "DrugNdc": 51672206200,
    "DrugQty": 21,
    "FIELD5": ""
  },
  {
    "id": 328,
    "DrugName": "CLOTRIMAZOLE* 1% CRM",
    "DrugNdc": 45802043411,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 329,
    "DrugName": "CLOTRIMAZOLE* 1% CRM",
    "DrugNdc": 51672127506,
    "DrugQty": 45,
    "FIELD5": ""
  },
  {
    "id": 330,
    "DrugName": "CLOTRIMAZOLE* 1% SOL",
    "DrugNdc": 51672126003,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 331,
    "DrugName": "CLOTRIMAZOLE/BETAMET 1-0.05% CRM",
    "DrugNdc": 168025815,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 332,
    "DrugName": "CLOTRIMAZOLE/BETAMET 1-0.05% CRM",
    "DrugNdc": 168025846,
    "DrugQty": 45,
    "FIELD5": ""
  },
  {
    "id": 333,
    "DrugName": "CODEINE/GUAIFENESIN 10-100MG/5ML SOL",
    "DrugNdc": 58657050016,
    "DrugQty": 473,
    "FIELD5": ""
  },
  {
    "id": 334,
    "DrugName": "COLCHICINE* 0.6MG TAB",
    "DrugNdc": 66993016502,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 335,
    "DrugName": "COMBIGAN* 0.2-0.5% SOL",
    "DrugNdc": 23921105,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 336,
    "DrugName": "COMPLERA* 200-25-300MG TAB",
    "DrugNdc": 61958110101,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 337,
    "DrugName": "CORLANOR 5MG TAB",
    "DrugNdc": 55513080060,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 338,
    "DrugName": "CORTISPORIN OTIC 3.5-10000-1MG-U-% SOL",
    "DrugNdc": 61570003410,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 339,
    "DrugName": "COSENTYX 150MG/ML INJ",
    "DrugNdc": 78063968,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 340,
    "DrugName": "COSENTYX 150MG/ML INJ",
    "DrugNdc": 78063941,
    "DrugQty": 2,
    "FIELD5": ""
  },
  {
    "id": 341,
    "DrugName": "CULTURELLE KIDS PACK POW",
    "DrugNdc": 49100040008,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 342,
    "DrugName": "CYCLOBENZAPRINE HCL 10MG TAB",
    "DrugNdc": 43547040010,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 343,
    "DrugName": "CYCLOBENZAPRINE HCL 10MG TAB",
    "DrugNdc": 69097084607,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 344,
    "DrugName": "CYCLOBENZAPRINE HCL 5MG TAB",
    "DrugNdc": 69097084507,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 345,
    "DrugName": "CYCLOPHOSPHAMIDE* 50MG CAP",
    "DrugNdc": 54038325,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 346,
    "DrugName": "DAIRY AID 30MG TAB",
    "DrugNdc": 904522452,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 347,
    "DrugName": "DEBROX 6.5% SOL",
    "DrugNdc": 42037010478,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 348,
    "DrugName": "DEEP SEA 0.65% AER",
    "DrugNdc": 904386575,
    "DrugQty": 44,
    "FIELD5": ""
  },
  {
    "id": 349,
    "DrugName": "DEFEROXAMINE MESYLAT 500MG INJ",
    "DrugNdc": 409233610,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 350,
    "DrugName": "DEPO-Medrol 80MG/ML INJ",
    "DrugNdc": 9347501,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 351,
    "DrugName": "DESFERAL 500MG INJ",
    "DrugNdc": 78046791,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 352,
    "DrugName": "DESLORATADINE 5MG TAB",
    "DrugNdc": 69543010730,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 353,
    "DrugName": "DESMOPRESSIN ACETATE 0.1MG TAB",
    "DrugNdc": 68001023300,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 354,
    "DrugName": "DESVENLAFAXINE* 100MG TER",
    "DrugNdc": 54040113,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 355,
    "DrugName": "DEXAMETHASONE 4MG TAB",
    "DrugNdc": 54418425,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 356,
    "DrugName": "DEXILANT* 30MG CER",
    "DrugNdc": 64764017130,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 357,
    "DrugName": "DEXILANT* 60MG CER",
    "DrugNdc": 64764017530,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 358,
    "DrugName": "DEXILANT* 60MG CER",
    "DrugNdc": 64764017590,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 359,
    "DrugName": "DEXTROMETHORPHAN/GUA 10-100MG/5ML LIQ",
    "DrugNdc": 904005300,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 360,
    "DrugName": "DIABETIC TUSSIN DM M 10-200MG/5 ML LIQ",
    "DrugNdc": 46122001734,
    "DrugQty": 240,
    "FIELD5": ""
  },
  {
    "id": 361,
    "DrugName": "DiazePAM RECTAL GEL* 20MG GEL",
    "DrugNdc": 93613932,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 362,
    "DrugName": "DICLEGIS* 10-10MG TER",
    "DrugNdc": 55494010010,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 363,
    "DrugName": "DICLOFENAC SODIUM 0.1% SOL",
    "DrugNdc": 61314001405,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 364,
    "DrugName": "DICLOFENAC SODIUM 0.1% SOL",
    "DrugNdc": 16571010150,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 365,
    "DrugName": "DICLOFENAC SODIUM 50MG TER",
    "DrugNdc": 16571020210,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 366,
    "DrugName": "DICLOFENAC SODIUM 75MG TER",
    "DrugNdc": 16571020106,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 367,
    "DrugName": "DICLOFENAC SODIUM 75MG TER",
    "DrugNdc": 68001028106,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 368,
    "DrugName": "DICLOFENAC SODIUM ER 100MG TER",
    "DrugNdc": 591067601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 369,
    "DrugName": "DICLOFENAC SODIUM GEL* 1% GEL",
    "DrugNdc": 49884093547,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 370,
    "DrugName": "DICLOFENAC SODIUM* 50MG TER",
    "DrugNdc": 68001028000,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 371,
    "DrugName": "DICYCLOMINE 10MG CAP",
    "DrugNdc": 591079401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 372,
    "DrugName": "DICYCLOMINE HCL 10MG CAP",
    "DrugNdc": 378161001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 373,
    "DrugName": "DICYCLOMINE* 20MG TAB",
    "DrugNdc": 591079501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 374,
    "DrugName": "DIGITEK 0.25MG TAB",
    "DrugNdc": 378615601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 375,
    "DrugName": "DIGOXIN 0.125MG TAB",
    "DrugNdc": 49884051401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 376,
    "DrugName": "DIGOXIN 0.25MG TAB",
    "DrugNdc": 527132501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 377,
    "DrugName": "DIGOXIN* 0.125MG TAB",
    "DrugNdc": 527132401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 378,
    "DrugName": "DILTIAZEM 90MG TAB",
    "DrugNdc": 62584067401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 379,
    "DrugName": "DILTIAZEM CD* 180MG CER",
    "DrugNdc": 10370083009,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 380,
    "DrugName": "dilTIAZem HCL 60MG TAB",
    "DrugNdc": 93031901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 381,
    "DrugName": "dilTIAZem HCL 90MG TAB",
    "DrugNdc": 378013501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 382,
    "DrugName": "dilTIAZem HCL ER 180MG TAB",
    "DrugNdc": 68682070590,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 383,
    "DrugName": "dilTIAZem HCL ER 240MG CER",
    "DrugNdc": 68682099798,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 384,
    "DrugName": "DIMAPHEN DM ELIXIR 1-5-2.5MG/5ML ELX",
    "DrugNdc": 904646320,
    "DrugQty": 118,
    "FIELD5": ""
  },
  {
    "id": 385,
    "DrugName": "DiphenhydrAMINE 25MG CAP",
    "DrugNdc": 42806064801,
    "DrugQty": 750,
    "FIELD5": ""
  },
  {
    "id": 386,
    "DrugName": "DiphenhydrAMINE HCL 25MG CAP",
    "DrugNdc": 603333932,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 387,
    "DrugName": "DiphenhydrAMINE HCL 50MG CAP",
    "DrugNdc": 42806064901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 388,
    "DrugName": "DiphenhydrAMINE HCL 50MG/ML INJ",
    "DrugNdc": 641037625,
    "DrugQty": 25,
    "FIELD5": ""
  },
  {
    "id": 389,
    "DrugName": "DIPHENOXYLA/ATROPINE 2.5-0.025MG TAB",
    "DrugNdc": 62559049001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 390,
    "DrugName": "DIVALPROEX SODIUM DR 125MG TAB",
    "DrugNdc": 29300013801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 391,
    "DrugName": "DIVALPROEX SODIUM DR 125MG TAB",
    "DrugNdc": 62756079688,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 392,
    "DrugName": "DIVALPROEX SODIUM DR 250MG TAB",
    "DrugNdc": 29300013901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 393,
    "DrugName": "DIVALPROEX SODIUM DR 500MG TAB",
    "DrugNdc": 29300014005,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 394,
    "DrugName": "DIVALPROEX SODIUM DR 500MG TAB",
    "DrugNdc": 62756079813,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 395,
    "DrugName": "DIVALPROEX SODIUM ER 500MG TER",
    "DrugNdc": 55111053401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 396,
    "DrugName": "DIVALPROEX SODIUM ER 500MG TER",
    "DrugNdc": 65162075710,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 397,
    "DrugName": "DOC-Q-LACE 100MG CAP",
    "DrugNdc": 603015021,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 398,
    "DrugName": "DOFETILIDE 250MCG CAP",
    "DrugNdc": 59762003802,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 399,
    "DrugName": "DOK 250MG CAP",
    "DrugNdc": 904645859,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 400,
    "DrugName": "DOK 250MG CAP",
    "DrugNdc": 904645859,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 401,
    "DrugName": "DONEPEZIL HCL* 10MG TAB",
    "DrugNdc": 13668010330,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 402,
    "DrugName": "DONEPEZIL HCL* 5MG TAB",
    "DrugNdc": 13668010230,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 403,
    "DrugName": "DORZOLAMIDE HCL* 2% SOL",
    "DrugNdc": 61314001910,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 404,
    "DrugName": "DORZOLAMIDE/TIMOLOL 22.3-6.8MG/ML SOL",
    "DrugNdc": 50383023310,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 405,
    "DrugName": "DOXAZOSIN MESYLATE 4MG TAB",
    "DrugNdc": 67253038210,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 406,
    "DrugName": "DOXAZOSIN MESYLATE 8MG TAB",
    "DrugNdc": 59762238006,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 407,
    "DrugName": "DOXAZOSIN MESYLATE 8MG TAB",
    "DrugNdc": 60505009600,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 408,
    "DrugName": "DOXAZOSIN MESYLATE 8MG TAB",
    "DrugNdc": 67253038310,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 409,
    "DrugName": "DOXEPIN HCL* 5% CRM",
    "DrugNdc": 40085071645,
    "DrugQty": 45,
    "FIELD5": ""
  },
  {
    "id": 410,
    "DrugName": "DOXYCYCLINE HYCLATE 100MG CAP",
    "DrugNdc": 143314250,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 411,
    "DrugName": "DOXYCYCLINE HYCLATE 100MG TAB",
    "DrugNdc": 42806031250,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 412,
    "DrugName": "DOXYCYCLINE HYCLATE 100MG TAB",
    "DrugNdc": 53489012002,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 413,
    "DrugName": "DOXYCYCLINE HYCLATE 20MG TAB",
    "DrugNdc": 527133601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 414,
    "DrugName": "DOXYCYCLINE MONOHYDR 100MG CAP",
    "DrugNdc": 68382070718,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 415,
    "DrugName": "DOXYCYCLINE MONOHYDR 100MG CAP",
    "DrugNdc": 68180065208,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 416,
    "DrugName": "DRONABINOL 2.5MG CAP",
    "DrugNdc": 591359160,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 417,
    "DrugName": "DULERA* 200-5MCG AER",
    "DrugNdc": 85461001,
    "DrugQty": 13,
    "FIELD5": ""
  },
  {
    "id": 418,
    "DrugName": "DULoxetine HCL DR 30MG CER",
    "DrugNdc": 68180029506,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 419,
    "DrugName": "DULoxetine HCL DR 60MG CER",
    "DrugNdc": 31722058330,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 420,
    "DrugName": "DULoxetine HCL DR* 20MG CER",
    "DrugNdc": 68001025506,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 421,
    "DrugName": "DULoxetine HCL DR* 30MG CER",
    "DrugNdc": 68001025604,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 422,
    "DrugName": "DULoxetine HCL DR* 60MG CER",
    "DrugNdc": 68001025704,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 423,
    "DrugName": "DUPIXENT 300MG/2ML INJ",
    "DrugNdc": 24591401,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 424,
    "DrugName": "DUREZOL 0.05% LIQ",
    "DrugNdc": 65924007,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 425,
    "DrugName": "DUTASTERIDE 0.5MG CAP",
    "DrugNdc": 42806054930,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 426,
    "DrugName": "DUTASTERIDE* 0.5MG CAP",
    "DrugNdc": 60505387703,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 427,
    "DrugName": "DUTASTERIDE/TAMSULOS* 0.5-0.4MG CAP",
    "DrugNdc": 10370028009,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 428,
    "DrugName": "EAR DROPS 6.5% SOL",
    "DrugNdc": 904662735,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 429,
    "DrugName": "EAR DROPS* 6.5% SOL",
    "DrugNdc": 46122024905,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 430,
    "DrugName": "EASYTOUCH ALCOHOL 70% PAD",
    "DrugNdc": 42423027101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 431,
    "DrugName": "ECONAZOLE NITRATE 1% CRM",
    "DrugNdc": 52565002285,
    "DrugQty": 85,
    "FIELD5": ""
  },
  {
    "id": 432,
    "DrugName": "ECONAZOLE NITRATE 1% CRM",
    "DrugNdc": 51672130308,
    "DrugQty": 85,
    "FIELD5": ""
  },
  {
    "id": 433,
    "DrugName": "ECONAZOLE NITRATE* 1% CRM",
    "DrugNdc": 52565002230,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 434,
    "DrugName": "ECOTRIN ADULT LOW ST 81MG TAB",
    "DrugNdc": 49692902360,
    "DrugQty": 36,
    "FIELD5": ""
  },
  {
    "id": 435,
    "DrugName": "EDARBYCLOR 40-12.5MG TAB",
    "DrugNdc": 60631041230,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 436,
    "DrugName": "EFFIENT* 10MG TAB",
    "DrugNdc": 2512330,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 437,
    "DrugName": "ELECTROLYTE PEDIATRI 0 SOL",
    "DrugNdc": 24385010147,
    "DrugQty": 1013.99,
    "FIELD5": ""
  },
  {
    "id": 438,
    "DrugName": "ELECTROLYTE PEDIATRI 0 SOL",
    "DrugNdc": 24385010347,
    "DrugQty": 1013.99,
    "FIELD5": ""
  },
  {
    "id": 439,
    "DrugName": "ELIQUIS* 2.5MG TAB",
    "DrugNdc": 3089321,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 440,
    "DrugName": "ELIQUIS* 5MG TAB",
    "DrugNdc": 3089421,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 441,
    "DrugName": "EMEND TRIFOLD PACK* CAP",
    "DrugNdc": 6386203,
    "DrugQty": 3,
    "FIELD5": ""
  },
  {
    "id": 442,
    "DrugName": "ENALAPRIL MALEATE 10MG TAB",
    "DrugNdc": 51672403901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 443,
    "DrugName": "ENALAPRIL MALEATE 2.5MG TAB",
    "DrugNdc": 51672403701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 444,
    "DrugName": "ENALAPRIL MALEATE 20MG TAB",
    "DrugNdc": 51672404001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 445,
    "DrugName": "ENALAPRIL MALEATE 20MG TAB",
    "DrugNdc": 64679092602,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 446,
    "DrugName": "ENALAPRIL MALEATE 20MG TAB",
    "DrugNdc": 68682071301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 447,
    "DrugName": "ENALAPRIL MALEATE 5MG TAB",
    "DrugNdc": 51672403801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 448,
    "DrugName": "ENALAPRIL5 MALEATE 5 MG 5MG TAB",
    "DrugNdc": 68084039001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 449,
    "DrugName": "ENBREL 50MG/ML INJ",
    "DrugNdc": 58406044504,
    "DrugQty": 3.92,
    "FIELD5": ""
  },
  {
    "id": 450,
    "DrugName": "ENEMA* LIQ",
    "DrugNdc": 536741551,
    "DrugQty": 133,
    "FIELD5": ""
  },
  {
    "id": 451,
    "DrugName": "ENOXAPARIN SODIUM 100MG/ML INJ",
    "DrugNdc": 703858023,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 452,
    "DrugName": "ENOXAPARIN SODIUM 80MG/0.8ML INJ",
    "DrugNdc": 955100810,
    "DrugQty": 8,
    "FIELD5": ""
  },
  {
    "id": 453,
    "DrugName": "ENOXAPARIN SODIUM 80MG/0.8ML INJ",
    "DrugNdc": 703868023,
    "DrugQty": 8,
    "FIELD5": ""
  },
  {
    "id": 454,
    "DrugName": "ENOXAPARIN SODIUM* 40MG/0.4ML INJ",
    "DrugNdc": 703854023,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 455,
    "DrugName": "ENTRESTO 24-26MG TAB",
    "DrugNdc": 78065920,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 456,
    "DrugName": "ENTYVIO 300MG INJ",
    "DrugNdc": 64764030020,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 457,
    "DrugName": "EPCLUSA 400-100MG TAB",
    "DrugNdc": 61958220101,
    "DrugQty": 28,
    "FIELD5": ""
  },
  {
    "id": 458,
    "DrugName": "EPIDUO FORTE 0.3-2.5% GEL",
    "DrugNdc": 299590645,
    "DrugQty": 45,
    "FIELD5": ""
  },
  {
    "id": 459,
    "DrugName": "EPINASTINE HCL* 0.05% SOL",
    "DrugNdc": 60505058401,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 460,
    "DrugName": "ERIVEDGE 150MG CAP",
    "DrugNdc": 50242014001,
    "DrugQty": 28,
    "FIELD5": ""
  },
  {
    "id": 461,
    "DrugName": "ERYTHROMYCIN 2% GEL",
    "DrugNdc": 168021660,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 462,
    "DrugName": "ERYTHROMYCIN 5MG/GM ONT",
    "DrugNdc": 24208091055,
    "DrugQty": 3.5,
    "FIELD5": ""
  },
  {
    "id": 463,
    "DrugName": "ESCITALOPRAM 10MG TAB",
    "DrugNdc": 16729016901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 464,
    "DrugName": "ESCITALOPRAM 10MG TAB",
    "DrugNdc": 68001019600,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 465,
    "DrugName": "ESCITALOPRAM 20MG TAB",
    "DrugNdc": 68001019700,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 466,
    "DrugName": "ESCITALOPRAM 20MG TAB",
    "DrugNdc": 68180013601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 467,
    "DrugName": "ESCITALOPRAM 20MG TAB",
    "DrugNdc": 16729017001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 468,
    "DrugName": "ESCITALOPRAM 5MG TAB",
    "DrugNdc": 68180013701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 469,
    "DrugName": "ESCITALOPRAM 5MG TAB",
    "DrugNdc": 68001019500,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 470,
    "DrugName": "ESOMEPRAZOLE MAGN DR 20MG CER",
    "DrugNdc": 43598050930,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 471,
    "DrugName": "ESOMEPRAZOLE MAGN DR 40MG CER",
    "DrugNdc": 65862078430,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 472,
    "DrugName": "ESOMEPRAZOLE MAGN DR* 40MG CER",
    "DrugNdc": 43598051030,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 473,
    "DrugName": "ESTRACE* 0.1MG/GM CRM",
    "DrugNdc": 430375414,
    "DrugQty": 42.5,
    "FIELD5": ""
  },
  {
    "id": 474,
    "DrugName": "ESTRADIOL 1MG TAB",
    "DrugNdc": 555088602,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 475,
    "DrugName": "ETOPOSIDE 50MG CAP",
    "DrugNdc": 378326694,
    "DrugQty": 20,
    "FIELD5": ""
  },
  {
    "id": 476,
    "DrugName": "EUFLEXXA 10MG/ML INJ",
    "DrugNdc": 55566410001,
    "DrugQty": 6,
    "FIELD5": ""
  },
  {
    "id": 477,
    "DrugName": "EXEMESTANE 25MG TAB",
    "DrugNdc": 59762285801,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 478,
    "DrugName": "EXJADE 500MG TAB",
    "DrugNdc": 78047015,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 479,
    "DrugName": "EZETIMIBE 10MG TAB",
    "DrugNdc": 67877049030,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 480,
    "DrugName": "EZETIMIBE* 10MG TAB",
    "DrugNdc": 591371330,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 481,
    "DrugName": "EZETIMIBE/SIMVASTATI 10-20MG TAB",
    "DrugNdc": 115138608,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 482,
    "DrugName": "FAMCICLOVIR 500MG TAB",
    "DrugNdc": 31722070830,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 483,
    "DrugName": "FAMOTIDINE 40MG TAB",
    "DrugNdc": 172572970,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 484,
    "DrugName": "FAMOTIDINE 40MG TAB",
    "DrugNdc": 68001024103,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 485,
    "DrugName": "FAMOTIDINE* 20MG TAB",
    "DrugNdc": 68001024000,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 486,
    "DrugName": "FARXIGA 10MG TAB",
    "DrugNdc": 310621030,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 487,
    "DrugName": "FARXIGA 5MG TAB",
    "DrugNdc": 310620530,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 488,
    "DrugName": "FARYDAK 15MG CAP",
    "DrugNdc": 78065106,
    "DrugQty": 6,
    "FIELD5": ""
  },
  {
    "id": 489,
    "DrugName": "FAST ACTING DIARY RELIEF",
    "DrugNdc": 46122014866,
    "DrugQty": 32,
    "FIELD5": ""
  },
  {
    "id": 490,
    "DrugName": "FELBAMATE 600MG TAB",
    "DrugNdc": 51525043101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 491,
    "DrugName": "FELBATOL 400MG TAB",
    "DrugNdc": 37043001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 492,
    "DrugName": "FEMARA 2.5MG TAB",
    "DrugNdc": 78024915,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 493,
    "DrugName": "FENOFIBRATE 134MG CAP",
    "DrugNdc": 115052201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 494,
    "DrugName": "FENOFIBRATE 145MG TAB",
    "DrugNdc": 378306677,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 495,
    "DrugName": "FENOFIBRATE 160MG TAB",
    "DrugNdc": 63304090190,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 496,
    "DrugName": "FENOFIBRATE 54MG TAB",
    "DrugNdc": 63304090090,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 497,
    "DrugName": "FENOFIBRATE* 160MG TAB",
    "DrugNdc": 68180036309,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 498,
    "DrugName": "FENOFIBRATE* 54MG TAB",
    "DrugNdc": 68180036209,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 499,
    "DrugName": "FEROSUL* 325MG TAB",
    "DrugNdc": 904759080,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 500,
    "DrugName": "FERROUS GLUCONATE 325MG TAB",
    "DrugNdc": 79854500320,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 501,
    "DrugName": "FEXOFENADINE HCL 180MG TAB",
    "DrugNdc": 45802057178,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 502,
    "DrugName": "FINASTERIDE 5MG TAB",
    "DrugNdc": 31722052590,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 503,
    "DrugName": "FINASTERIDE 5MG TAB",
    "DrugNdc": 16729009015,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 504,
    "DrugName": "FINASTERIDE* 5MG TAB",
    "DrugNdc": 31722052530,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 505,
    "DrugName": "FISH OIL 1000MG CAP",
    "DrugNdc": 904404360,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 506,
    "DrugName": "FLAXSEED OIL 1000 MG SOFT GEL 1000MG CAP",
    "DrugNdc": 7985408038,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 507,
    "DrugName": "FLEET ENEMA LIQ",
    "DrugNdc": 132020140,
    "DrugQty": 133,
    "FIELD5": ""
  },
  {
    "id": 508,
    "DrugName": "FLONASE OTC 50MCG/INH AER",
    "DrugNdc": 135057603,
    "DrugQty": 15.8,
    "FIELD5": ""
  },
  {
    "id": 509,
    "DrugName": "FLONASE*",
    "DrugNdc": 53100200208,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 510,
    "DrugName": "FLORASTOR 250MG CAP",
    "DrugNdc": 66825000201,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 511,
    "DrugName": "FLOVENT DISKUS 100MCG EA",
    "DrugNdc": 173060202,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 512,
    "DrugName": "FLOVENT* 110MCG/INH AER",
    "DrugNdc": 173071920,
    "DrugQty": 12,
    "FIELD5": ""
  },
  {
    "id": 513,
    "DrugName": "FLUCONAZOLE 100MG TAB",
    "DrugNdc": 68462010230,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 514,
    "DrugName": "FLUCONAZOLE 150MG TAB",
    "DrugNdc": 57237000511,
    "DrugQty": 12,
    "FIELD5": ""
  },
  {
    "id": 515,
    "DrugName": "FLUCONAZOLE 150MG TAB",
    "DrugNdc": 68001025320,
    "DrugQty": 12,
    "FIELD5": ""
  },
  {
    "id": 516,
    "DrugName": "FLUCONAZOLE 200MG TAB",
    "DrugNdc": 68001025404,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 517,
    "DrugName": "FLUNISOLIDE 0.025% AER",
    "DrugNdc": 24208034425,
    "DrugQty": 25,
    "FIELD5": ""
  },
  {
    "id": 518,
    "DrugName": "FLUOCINOLONE ACETONI 0.01% LIQ",
    "DrugNdc": 65162070294,
    "DrugQty": 20,
    "FIELD5": ""
  },
  {
    "id": 519,
    "DrugName": "FLUOCINONIDE 0.05% CRM",
    "DrugNdc": 168013930,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 520,
    "DrugName": "FLUOCINONIDE 0.05% CRM",
    "DrugNdc": 168013960,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 521,
    "DrugName": "FLUOCINONIDE 0.05% CRM",
    "DrugNdc": 51672125304,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 522,
    "DrugName": "FLUOCINONIDE 0.1% CRM",
    "DrugNdc": 68462050535,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 523,
    "DrugName": "FLUOCINONIDE* 0.05% CRM",
    "DrugNdc": 51672138603,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 524,
    "DrugName": "FLUOCINONIDE* 0.05% ONT",
    "DrugNdc": 51672126402,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 525,
    "DrugName": "FLUOCINONIDE* 0.05% ONT",
    "DrugNdc": 51672126403,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 526,
    "DrugName": "FLUOROMETHOLONE 0.1% SUS",
    "DrugNdc": 60758088005,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 527,
    "DrugName": "FLUOROMETHOLONE 0.1% SUS",
    "DrugNdc": 60758088010,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 528,
    "DrugName": "FLUoxetine 10MG CAP",
    "DrugNdc": 781282301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 529,
    "DrugName": "FLUoxetine 10MG CAP",
    "DrugNdc": 50111064701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 530,
    "DrugName": "FLUoxetine 10MG TAB",
    "DrugNdc": 378073493,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 531,
    "DrugName": "FLUoxetine 20MG CAP",
    "DrugNdc": 65862019301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 532,
    "DrugName": "FLUoxetine 20MG CAP",
    "DrugNdc": 781282201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 533,
    "DrugName": "FLUoxetine* 40MG CAP",
    "DrugNdc": 68001012900,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 534,
    "DrugName": "FLUTICASONE PROPIONA 50MCG/INH AER",
    "DrugNdc": 60505082901,
    "DrugQty": 16,
    "FIELD5": ""
  },
  {
    "id": 535,
    "DrugName": "FLUTICASONE PROPIONA* 50MCG/INH AER",
    "DrugNdc": 50383070016,
    "DrugQty": 16,
    "FIELD5": ""
  },
  {
    "id": 536,
    "DrugName": "FLUTICASONE/SALMETER 113-14MCG AER",
    "DrugNdc": 93360882,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 537,
    "DrugName": "FOLIC ACID 1MG TAB",
    "DrugNdc": 603316232,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 538,
    "DrugName": "FORTEO 20MCG INJ",
    "DrugNdc": 2840001,
    "DrugQty": 2.4,
    "FIELD5": ""
  },
  {
    "id": 539,
    "DrugName": "FOSAMAX 70MG TAB",
    "DrugNdc": 6003144,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 540,
    "DrugName": "FREESTYLE FDM LITE EA",
    "DrugNdc": 99073070914,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 541,
    "DrugName": "FREESTYLE LANCETS NA EA",
    "DrugNdc": 99073013001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 542,
    "DrugName": "FREESTYLE LITE METER EA",
    "DrugNdc": 99073070805,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 543,
    "DrugName": "FREESTYLE LITE* TES",
    "DrugNdc": 99073070822,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 544,
    "DrugName": "FREESTYLE LITE* TES",
    "DrugNdc": 99073070827,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 545,
    "DrugName": "FREESTYLE STRIP TES",
    "DrugNdc": 99073012101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 546,
    "DrugName": "FULL SPECTRUM B W/C TAB TAB",
    "DrugNdc": 79854012699,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 547,
    "DrugName": "FUROSEMIDE * 20MG TAB",
    "DrugNdc": 69315011610,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 548,
    "DrugName": "FUROSEMIDE 40MG TAB",
    "DrugNdc": 378021601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 549,
    "DrugName": "FUROSEMIDE 40MG TAB",
    "DrugNdc": 69315011701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 550,
    "DrugName": "FUROSEMIDE 40MG TAB",
    "DrugNdc": 69315011710,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 551,
    "DrugName": "FUROSEMIDE 80MG TAB",
    "DrugNdc": 69315011801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 552,
    "DrugName": "FUROSEMIDE 80MG TAB",
    "DrugNdc": 378023201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 553,
    "DrugName": "FUROSEMIDE* 20MG TAB",
    "DrugNdc": 54429731,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 554,
    "DrugName": "FUROSEMIDE* 40MG TAB",
    "DrugNdc": 54429931,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 555,
    "DrugName": "FYCOMPA* 2MG TAB",
    "DrugNdc": 62856027230,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 556,
    "DrugName": "GABAPENTIN 800MG TAB",
    "DrugNdc": 60505255201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 557,
    "DrugName": "GABAPENTIN* 100MG CAP",
    "DrugNdc": 45963055550,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 558,
    "DrugName": "GABAPENTIN* 300MG CAP",
    "DrugNdc": 45963055650,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 559,
    "DrugName": "GABAPENTIN* 400MG CAP",
    "DrugNdc": 45963055750,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 560,
    "DrugName": "GABAPENTIN* 600MG TAB",
    "DrugNdc": 68001000603,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 561,
    "DrugName": "GAMMAGARD LIQUID 10% INJ",
    "DrugNdc": 944270004,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 562,
    "DrugName": "GAMMAGARD LIQUID 10% INJ",
    "DrugNdc": 944270007,
    "DrugQty": 300,
    "FIELD5": ""
  },
  {
    "id": 563,
    "DrugName": "GAS RELIEF 80 80MG TAB",
    "DrugNdc": 24385011878,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 564,
    "DrugName": "GAVILYTE G SOL",
    "DrugNdc": 43386009019,
    "DrugQty": 4000,
    "FIELD5": ""
  },
  {
    "id": 565,
    "DrugName": "GEMFIBROZIL 600MG TAB",
    "DrugNdc": 69097082112,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 566,
    "DrugName": "GENTAMICIN SULFATE 0.1% CRM",
    "DrugNdc": 45802005635,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 567,
    "DrugName": "GENTAMICIN SULFATE 0.1% CRM",
    "DrugNdc": 45802005611,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 568,
    "DrugName": "GILOTRIF 40MG TAB",
    "DrugNdc": 597013830,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 569,
    "DrugName": "GLIMEPIRIDE 1MG TAB",
    "DrugNdc": 16729000101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 570,
    "DrugName": "GLIMEPIRIDE 2MG TAB",
    "DrugNdc": 69543012410,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 571,
    "DrugName": "GLIMEPIRIDE 2MG TAB",
    "DrugNdc": 68001017800,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 572,
    "DrugName": "GLIMEPIRIDE* 4MG TAB",
    "DrugNdc": 68001017900,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 573,
    "DrugName": "Glipez and Metfor Hydro 5mg/500mg TAB",
    "DrugNdc": 68382018601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 574,
    "DrugName": "GlipiZIDE XL 10MG TER",
    "DrugNdc": 59762054201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 575,
    "DrugName": "GlipiZIDE XL 10MG TER",
    "DrugNdc": 591084501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 576,
    "DrugName": "GlipiZIDE XL 2.5MG TER",
    "DrugNdc": 591090030,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 577,
    "DrugName": "GlipiZIDE XL 5MG TER",
    "DrugNdc": 591084401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 578,
    "DrugName": "GlipiZIDE* 10MG TAB",
    "DrugNdc": 60505014201,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 579,
    "DrugName": "GlipiZIDE* 5MG TAB",
    "DrugNdc": 60505014102,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 580,
    "DrugName": "GLIPIZIDE/ METFORMIN 5-500MG TAB",
    "DrugNdc": 93745701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 581,
    "DrugName": "GLIPIZIDE/METFORMIN 5-500MG TAB",
    "DrugNdc": 378313301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 582,
    "DrugName": "GLUCAGEN HYPOKIT 1MG KIT",
    "DrugNdc": 169706515,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 583,
    "DrugName": "GLYBURIDE 2.5MG TAB",
    "DrugNdc": 93943305,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 584,
    "DrugName": "GlyBURIDE 5MG TAB",
    "DrugNdc": 65862003001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 585,
    "DrugName": "GLYBURIDE/METFORMIN* 5-500MG TAB",
    "DrugNdc": 65862008201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 586,
    "DrugName": "GLYCOPYRROLATE 1MG TAB",
    "DrugNdc": 64980027201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 587,
    "DrugName": "GLYCOPYRROLATE 2MG TAB",
    "DrugNdc": 64980027301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 588,
    "DrugName": "GLYCOPYRROLATE 2MG TAB",
    "DrugNdc": 49884006601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 589,
    "DrugName": "GLYXAMBI 25-5MG TAB",
    "DrugNdc": 597016430,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 590,
    "DrugName": "GOLYTELY 0 SOL",
    "DrugNdc": 52268010101,
    "DrugQty": 4000,
    "FIELD5": ""
  },
  {
    "id": 591,
    "DrugName": "GRANIX 300MCG/0.5ML INJ",
    "DrugNdc": 63459091036,
    "DrugQty": 2.5,
    "FIELD5": ""
  },
  {
    "id": 592,
    "DrugName": "GRANIX 480MCG/0.8ML INJ",
    "DrugNdc": 63459091236,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 593,
    "DrugName": "guaiFENesin 100MG/5ML LIQ",
    "DrugNdc": 121041904,
    "DrugQty": 118,
    "FIELD5": ""
  },
  {
    "id": 594,
    "DrugName": "guanFACINE HCL 1MG TAB",
    "DrugNdc": 591044401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 595,
    "DrugName": "guanFACINE HCL 1MG TAB",
    "DrugNdc": 378116001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 596,
    "DrugName": "guanFACINE HCL 2MG TAB",
    "DrugNdc": 591045301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 597,
    "DrugName": "HALCION * 0.25MG TAB",
    "DrugNdc": 9001758,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 598,
    "DrugName": "HALOG 0.1% CRM",
    "DrugNdc": 10631009420,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 599,
    "DrugName": "HALOPERIDOL 0.5MG TAB",
    "DrugNdc": 781139101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 600,
    "DrugName": "HALOPERIDOL 10MG TAB",
    "DrugNdc": 68382008001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 601,
    "DrugName": "HALOPERIDOL* 5MG TAB",
    "DrugNdc": 68382007901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 602,
    "DrugName": "HARVONI* 90-400MG TAB",
    "DrugNdc": 61958180101,
    "DrugQty": 28,
    "FIELD5": ""
  },
  {
    "id": 603,
    "DrugName": "HEALTHYLAX POW",
    "DrugNdc": 68084043098,
    "DrugQty": 14,
    "FIELD5": ""
  },
  {
    "id": 604,
    "DrugName": "HEPARIN LOCK FLUSH 100U/ML INJ",
    "DrugNdc": 8290306515,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 605,
    "DrugName": "HERCEPTIN 150 MG INJ",
    "DrugNdc": 50242013201,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 606,
    "DrugName": "HumaLOG 200U KWIKPEN* 200U/ML INJ",
    "DrugNdc": 2771227,
    "DrugQty": 6,
    "FIELD5": ""
  },
  {
    "id": 607,
    "DrugName": "HumaLOG KWIKPEN* 100U/ML INJ",
    "DrugNdc": 2879959,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 608,
    "DrugName": "HumaLOG MIX 75/25 KWIKPEN* 75-25U/ML INJ",
    "DrugNdc": 2879759,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 609,
    "DrugName": "HumaLOG MIX KWIKPEN* 75-25U/ML INJ",
    "DrugNdc": 2879759,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 610,
    "DrugName": "HUMALOG VIAL* 100U/ML SOL",
    "DrugNdc": 2751001,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 611,
    "DrugName": "HUMIRA 40MG/0.8ML INJ",
    "DrugNdc": 74379902,
    "DrugQty": 2,
    "FIELD5": ""
  },
  {
    "id": 612,
    "DrugName": "HUMIRA PEN 40MG/0.8ML INJ",
    "DrugNdc": 74433907,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 613,
    "DrugName": "HUMIRA PEN* 40MG/0.8ML INJ",
    "DrugNdc": 74433902,
    "DrugQty": 2,
    "FIELD5": ""
  },
  {
    "id": 614,
    "DrugName": "HUMIRA STARTER PACK* 40MG/0.8ML INJ",
    "DrugNdc": 74433906,
    "DrugQty": 6,
    "FIELD5": ""
  },
  {
    "id": 615,
    "DrugName": "HUMULIN  70/30* 70 U-30 U/ML SUS",
    "DrugNdc": 2871501,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 616,
    "DrugName": "HumuLIN 70/30 KWIKPE 70-30U/ML INJ",
    "DrugNdc": 2880359,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 617,
    "DrugName": "HumuLIN N 100U/ML INJ",
    "DrugNdc": 2831517,
    "DrugQty": 3,
    "FIELD5": ""
  },
  {
    "id": 618,
    "DrugName": "HumuLIN N KWIKPEN 100U/ML INJ",
    "DrugNdc": 2880559,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 619,
    "DrugName": "HYCAMTIN 1MG CAP",
    "DrugNdc": 78067301,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 620,
    "DrugName": "HydrALAZINE HCL 100MG TAB",
    "DrugNdc": 904644361,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 621,
    "DrugName": "HydrALAZINE HCL 100MG TAB",
    "DrugNdc": 64380073606,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 622,
    "DrugName": "HydrALAZINE HCL 10MG TAB",
    "DrugNdc": 31722051901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 623,
    "DrugName": "HydrALAZINE HCL 10MG TAB",
    "DrugNdc": 23155000101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 624,
    "DrugName": "HydrALAZINE HCL 25MG TAB",
    "DrugNdc": 31722052001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 625,
    "DrugName": "HydrALAZINE HCL 25MG TAB",
    "DrugNdc": 50111032701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 626,
    "DrugName": "HydrALAZINE HCL 50MG TAB",
    "DrugNdc": 23155000301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 627,
    "DrugName": "HydrALAZINE HCL 50MG TAB",
    "DrugNdc": 64380073508,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 628,
    "DrugName": "HydrALAZINE HCL* 100MG TAB",
    "DrugNdc": 50111039701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 629,
    "DrugName": "HYDRALAZINE HCL* 50MG TAB",
    "DrugNdc": 50111032801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 630,
    "DrugName": "HYDREA 500MG CAP",
    "DrugNdc": 3083050,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 631,
    "DrugName": "hydroCHLOROthiazide 12.5MG CAP",
    "DrugNdc": 378081001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 632,
    "DrugName": "hydroCHLOROthiazide 12.5MG TAB",
    "DrugNdc": 228282011,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 633,
    "DrugName": "hydroCHLOROthiazide 50MG TAB",
    "DrugNdc": 16729018401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 634,
    "DrugName": "HydroCHLOROthiazide* 12.5MG CAP",
    "DrugNdc": 57237000201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 635,
    "DrugName": "HydroCHLOROthiazide* 25MG TAB",
    "DrugNdc": 16729018317,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 636,
    "DrugName": "HYDROCODONE/APAP 10-325MG TAB",
    "DrugNdc": 591261201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 637,
    "DrugName": "HYDROCODONE/APAP 5-325MG TAB",
    "DrugNdc": 591217201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 638,
    "DrugName": "HYDROCODONE/APAP 7.5-325MG TAB",
    "DrugNdc": 591260501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 639,
    "DrugName": "HYDROCORTISONE 1% CRM",
    "DrugNdc": 45802043803,
    "DrugQty": 28,
    "FIELD5": ""
  },
  {
    "id": 640,
    "DrugName": "HYDROCORTISONE 2.5% CRM",
    "DrugNdc": 168008031,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 641,
    "DrugName": "HYDROCORTISONE 2.5% ONT",
    "DrugNdc": 168014630,
    "DrugQty": 28.35,
    "FIELD5": ""
  },
  {
    "id": 642,
    "DrugName": "HYDROCORTISONE* 0.5% CRM",
    "DrugNdc": 168001431,
    "DrugQty": 28.35,
    "FIELD5": ""
  },
  {
    "id": 643,
    "DrugName": "HYDROCORTISONE* 2.5% CRM",
    "DrugNdc": 45802000403,
    "DrugQty": 28,
    "FIELD5": ""
  },
  {
    "id": 644,
    "DrugName": "HYDROmorphone HCL* 2MG TAB",
    "DrugNdc": 13107010701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 645,
    "DrugName": "HYDROXYCHLOROQUINE 200MG TAB",
    "DrugNdc": 63304029601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 646,
    "DrugName": "HYDROXYCHLOROQUINE 200MG TAB",
    "DrugNdc": 68382009601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 647,
    "DrugName": "HYDROXYUREA* 500MG CAP",
    "DrugNdc": 49884072401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 648,
    "DrugName": "HydrOXYzine HCL 10MG TAB",
    "DrugNdc": 23155050001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 649,
    "DrugName": "HydrOXYzine HCL 10MG TAB",
    "DrugNdc": 10702001001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 650,
    "DrugName": "HydrOXYzine HCL 25MG TAB",
    "DrugNdc": 23155050101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 651,
    "DrugName": "HydrOXYzine HCL 50MG TAB",
    "DrugNdc": 23155050201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 652,
    "DrugName": "HydrOXYzine HCL* 25MG TAB",
    "DrugNdc": 68462035301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 653,
    "DrugName": "HydrOXYzine PAMOATE 25MG CAP",
    "DrugNdc": 185067401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 654,
    "DrugName": "HydrOXYzine PAMOATE 50MG CAP",
    "DrugNdc": 185061501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 655,
    "DrugName": "IBRANCE 100MG CAP",
    "DrugNdc": 69018821,
    "DrugQty": 21,
    "FIELD5": ""
  },
  {
    "id": 656,
    "DrugName": "IBRANCE 125MG CAP",
    "DrugNdc": 69018921,
    "DrugQty": 21,
    "FIELD5": ""
  },
  {
    "id": 657,
    "DrugName": "IBRANCE 75MG CAP",
    "DrugNdc": 69018721,
    "DrugQty": 21,
    "FIELD5": ""
  },
  {
    "id": 658,
    "DrugName": "IBUPROFEN 100MG/5ML SUS",
    "DrugNdc": 472125594,
    "DrugQty": 118,
    "FIELD5": ""
  },
  {
    "id": 659,
    "DrugName": "IBUPROFEN 400MG TAB",
    "DrugNdc": 53746046405,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 660,
    "DrugName": "IBUPROFEN 400MG TAB",
    "DrugNdc": 67877031905,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 661,
    "DrugName": "IBUPROFEN 600MG TAB",
    "DrugNdc": 65162046550,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 662,
    "DrugName": "IBUPROFEN 600MG TAB",
    "DrugNdc": 67877032005,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 663,
    "DrugName": "IBUPROFEN 800MG TAB",
    "DrugNdc": 55111068405,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 664,
    "DrugName": "IBUPROFEN 800MG TAB",
    "DrugNdc": 53746046605,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 665,
    "DrugName": "IBUPROFEN* 100MG/5ML SUS",
    "DrugNdc": 472127016,
    "DrugQty": 473,
    "FIELD5": ""
  },
  {
    "id": 666,
    "DrugName": "IBUPROFEN* 600MG TAB",
    "DrugNdc": 53746046505,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 667,
    "DrugName": "IMATINIB MESYLATE 100MG TAB",
    "DrugNdc": 93762998,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 668,
    "DrugName": "IMATINIB MESYLATE 100MG TAB",
    "DrugNdc": 60505290009,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 669,
    "DrugName": "IMATINIB MESYLATE 100MG TAB",
    "DrugNdc": 47335047281,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 670,
    "DrugName": "IMATINIB MESYLATE 400MG TAB",
    "DrugNdc": 60505290103,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 671,
    "DrugName": "IMATINIB MESYLATE 400MG TAB",
    "DrugNdc": 47335047583,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 672,
    "DrugName": "IMATINIB MESYLATE* 400MG TAB",
    "DrugNdc": 93763056,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 673,
    "DrugName": "IMBRUVICA 140MG CAP",
    "DrugNdc": 57962014009,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 674,
    "DrugName": "IMBRUVICA 140MG CAP",
    "DrugNdc": 57962014012,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 675,
    "DrugName": "IMIPRAMINE HCL 25MG TAB",
    "DrugNdc": 69315013401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 676,
    "DrugName": "IMIPRAMINE HCL 50MG TAB",
    "DrugNdc": 69315013501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 677,
    "DrugName": "INCRUSE ELLIPTA 62.5MCG POW",
    "DrugNdc": 173087310,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 678,
    "DrugName": "INDAPAMIDE* 2.5MG TAB",
    "DrugNdc": 43975030410,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 679,
    "DrugName": "INDOMETHACIN 50MG CAP",
    "DrugNdc": 31722054301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 680,
    "DrugName": "INFANTS GAS RELIEF DROPS* 40mg/0.6mlml LIQ",
    "DrugNdc": 904589430,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 681,
    "DrugName": "INTUNIV 3MG TER",
    "DrugNdc": 54092051702,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 682,
    "DrugName": "INVOKAMET XR* 150-1000MG TER",
    "DrugNdc": 50458094301,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 683,
    "DrugName": "INVOKANA* 100MG TAB",
    "DrugNdc": 50458014030,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 684,
    "DrugName": "INVOKANA* 300MG TAB",
    "DrugNdc": 50458014130,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 685,
    "DrugName": "IPRATROPIUM BROMIDE 0.02% SOL",
    "DrugNdc": 487980125,
    "DrugQty": 62.5,
    "FIELD5": ""
  },
  {
    "id": 686,
    "DrugName": "IPRATROPIUM BROMIDE 0.02% SOL",
    "DrugNdc": 487980130,
    "DrugQty": 75,
    "FIELD5": ""
  },
  {
    "id": 687,
    "DrugName": "IPRATROPIUM/ALBUTERO 0.5-3MG/3ML SOL",
    "DrugNdc": 76204060030,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 688,
    "DrugName": "IRBESARTAN 150MG TAB",
    "DrugNdc": 68180041106,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 689,
    "DrugName": "IRPON SLOW RELEASE TAB",
    "DrugNdc": 79854077490,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 690,
    "DrugName": "ISONIAZID 300MG TAB",
    "DrugNdc": 555007102,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 691,
    "DrugName": "ISOSORBIDE DINITRATE 10MG TAB",
    "DrugNdc": 68001022500,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 692,
    "DrugName": "ISOSORBIDE DINITRATE 20MG TAB",
    "DrugNdc": 781169501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 693,
    "DrugName": "ISOSORBIDE DINITRATE 40MG TER",
    "DrugNdc": 57664060088,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 694,
    "DrugName": "ISOSORBIDE DINITRATE* 30MG TAB",
    "DrugNdc": 49884000901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 695,
    "DrugName": "ISOSORBIDE MONONITRA 20MG TAB",
    "DrugNdc": 228262011,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 696,
    "DrugName": "ISOSORBIDE MONONITRA 30MG TER",
    "DrugNdc": 23155051901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 697,
    "DrugName": "ISOSORBIDE MONONITRA ER 120MG TER",
    "DrugNdc": 603411221,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 698,
    "DrugName": "ISOSORBIDE MONONITRA ER 60MG TER",
    "DrugNdc": 603411121,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 699,
    "DrugName": "ISOSORBIDE MONONITRA* 120MG TER",
    "DrugNdc": 62175012937,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 700,
    "DrugName": "ISOSORBIDE MONONITRA* 30MG TER",
    "DrugNdc": 62175012837,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 701,
    "DrugName": "ISOSORBIDE MONONITRA* 60MG TER",
    "DrugNdc": 62175011937,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 702,
    "DrugName": "ITRACONAZOLE* 100MG CAP",
    "DrugNdc": 65162063003,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 703,
    "DrugName": "JADENU 180MG TAB",
    "DrugNdc": 78065515,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 704,
    "DrugName": "JADENU 360MG TAB",
    "DrugNdc": 78065615,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 705,
    "DrugName": "JADENU SPRINKLE 360MG TAB",
    "DrugNdc": 78072015,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 706,
    "DrugName": "JAKAFI 5MG TAB",
    "DrugNdc": 50881000560,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 707,
    "DrugName": "JANUMET 50-500MG TAB",
    "DrugNdc": 6057561,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 708,
    "DrugName": "JANUMET XR 100-1000MG TER",
    "DrugNdc": 6008131,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 709,
    "DrugName": "JANUMET XR 50-1000MG TER",
    "DrugNdc": 6008061,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 710,
    "DrugName": "JANUMET* 50-1000MG TAB",
    "DrugNdc": 6057761,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 711,
    "DrugName": "JANUVIA 25MG TAB",
    "DrugNdc": 6022154,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 712,
    "DrugName": "JANUVIA 50MG TAB",
    "DrugNdc": 6011231,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 713,
    "DrugName": "JANUVIA* 100MG TAB",
    "DrugNdc": 6027731,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 714,
    "DrugName": "JANUVIA* 100MG TAB",
    "DrugNdc": 6027754,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 715,
    "DrugName": "JARDIANCE 25MG TAB",
    "DrugNdc": 597015390,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 716,
    "DrugName": "JARDIANCE* 25MG TAB",
    "DrugNdc": 597015330,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 717,
    "DrugName": "JENTADUETO XR 2.5-1000MG TER",
    "DrugNdc": 597027073,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 718,
    "DrugName": "JENTADUETO* 2.5-850MG TAB",
    "DrugNdc": 597014760,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 719,
    "DrugName": "JUBLIA 10% SOL",
    "DrugNdc": 187540008,
    "DrugQty": 8,
    "FIELD5": ""
  },
  {
    "id": 720,
    "DrugName": "KAYEXALATE POW",
    "DrugNdc": 24987007501,
    "DrugQty": 454,
    "FIELD5": ""
  },
  {
    "id": 721,
    "DrugName": "KEPPRA XR* 500MG TER",
    "DrugNdc": 50474059866,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 722,
    "DrugName": "KEPPRA* 1000MG TAB",
    "DrugNdc": 50474059766,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 723,
    "DrugName": "KEPPRA* 500MG TAB",
    "DrugNdc": 50474059540,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 724,
    "DrugName": "KETOCONAZOLE 2% CRM",
    "DrugNdc": 51672129802,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 725,
    "DrugName": "KETOCONAZOLE 2% CRM",
    "DrugNdc": 168009930,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 726,
    "DrugName": "KETOCONAZOLE* 2% CRM",
    "DrugNdc": 51672129803,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 727,
    "DrugName": "KETOCONAZOLE* 2% SHA",
    "DrugNdc": 45802046564,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 728,
    "DrugName": "KETOROLAC TROMETHAMI 0.4% SOL",
    "DrugNdc": 60758077305,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 729,
    "DrugName": "KETOROLAC TROMETHAMI 0.5% SOL",
    "DrugNdc": 61314012605,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 730,
    "DrugName": "KETOROLAC TROMETHAMI 0.5% SOL",
    "DrugNdc": 60505100301,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 731,
    "DrugName": "KEYTRUDA 25MG/ML INJ",
    "DrugNdc": 6302602,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 732,
    "DrugName": "KISQALI 200MG TAB",
    "DrugNdc": 78086742,
    "DrugQty": 42,
    "FIELD5": ""
  },
  {
    "id": 733,
    "DrugName": "KOMBIGLYZE XR 5-1000MG TER",
    "DrugNdc": 310614530,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 734,
    "DrugName": "KOMBIGLYZE XR* 2.5-1000MG TER",
    "DrugNdc": 310612560,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 735,
    "DrugName": "LABETALOL HCL 100MG TAB",
    "DrugNdc": 43199003701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 736,
    "DrugName": "LABETALOL HCL 100MG TAB",
    "DrugNdc": 591060501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 737,
    "DrugName": "LABETALOL HCL 100MG TAB",
    "DrugNdc": 68001020500,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 738,
    "DrugName": "LABETALOL HCL 200MG TAB",
    "DrugNdc": 68001020400,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 739,
    "DrugName": "LABETALOL HCL 300MG TAB",
    "DrugNdc": 591060701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 740,
    "DrugName": "LACTULOSE 10GM/15ML SOL",
    "DrugNdc": 603137858,
    "DrugQty": 473,
    "FIELD5": ""
  },
  {
    "id": 741,
    "DrugName": "LACTULOSE* 10GM/15ML SOL",
    "DrugNdc": 50383077916,
    "DrugQty": 473,
    "FIELD5": ""
  },
  {
    "id": 742,
    "DrugName": "LaMICtal  XR* 200MG TER",
    "DrugNdc": 173075700,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 743,
    "DrugName": "LaMICtal 150MG TAB",
    "DrugNdc": 173064360,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 744,
    "DrugName": "LaMICtal* 100MG TAB",
    "DrugNdc": 173064255,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 745,
    "DrugName": "lamoTRIgine 150MG TAB",
    "DrugNdc": 51672413204,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 746,
    "DrugName": "lamoTRIgine 150MG TAB",
    "DrugNdc": 69097015103,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 747,
    "DrugName": "lamoTRIgine 200MG TAB",
    "DrugNdc": 68382001014,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 748,
    "DrugName": "lamoTRIgine 200MG TAB",
    "DrugNdc": 69097015203,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 749,
    "DrugName": "lamoTRIgine 25MG TAB",
    "DrugNdc": 59746024501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 750,
    "DrugName": "lamoTRIgine 25MG TAB",
    "DrugNdc": 69097014807,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 751,
    "DrugName": "LamoTRIgine* 100MG TAB",
    "DrugNdc": 69097014907,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 752,
    "DrugName": "LamoTRIgine^ 200MG TAB",
    "DrugNdc": 51672413304,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 753,
    "DrugName": "LANCETS NA EA",
    "DrugNdc": 24385065178,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 754,
    "DrugName": "LANCETS NA EA",
    "DrugNdc": 37205014282,
    "DrugQty": 200,
    "FIELD5": ""
  },
  {
    "id": 755,
    "DrugName": "LANSOPRAZOLE DR* 30MG CER",
    "DrugNdc": 68001011205,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 756,
    "DrugName": "LANTUS SOLOSTAR* 100U/ML INJ",
    "DrugNdc": 88221905,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 757,
    "DrugName": "LANTUS VIAL* 100U/ML SOL",
    "DrugNdc": 88222033,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 758,
    "DrugName": "LASIX 40MG TAB",
    "DrugNdc": 30698006001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 759,
    "DrugName": "LATANOPROST 0.005% SOL",
    "DrugNdc": 61314054701,
    "DrugQty": 2.5,
    "FIELD5": ""
  },
  {
    "id": 760,
    "DrugName": "LATANOPROST* 0.005% SOL",
    "DrugNdc": 61314054701,
    "DrugQty": 2.5,
    "FIELD5": ""
  },
  {
    "id": 761,
    "DrugName": "LATANOPROST^ 0.005% SOL",
    "DrugNdc": 24208046325,
    "DrugQty": 2.5,
    "FIELD5": ""
  },
  {
    "id": 762,
    "DrugName": "LATUDA 20MG TAB",
    "DrugNdc": 63402030230,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 763,
    "DrugName": "LATUDA 60MG TAB",
    "DrugNdc": 63402030630,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 764,
    "DrugName": "LATUDA 80MG TAB",
    "DrugNdc": 63402030830,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 765,
    "DrugName": "LATUDA* 40MG TAB",
    "DrugNdc": 63402030430,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 766,
    "DrugName": "LEFLUNOMIDE 10MG TAB",
    "DrugNdc": 62332006130,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 767,
    "DrugName": "LEFLUNOMIDE 20MG TAB",
    "DrugNdc": 62332006230,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 768,
    "DrugName": "LENVIMA 8MG 8MG CAP",
    "DrugNdc": 62856070830,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 769,
    "DrugName": "LETROZOLE 2.5MG TAB",
    "DrugNdc": 16729003410,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 770,
    "DrugName": "LEVEMIR FLEXTOUCH* 100U/ML INJ",
    "DrugNdc": 169643810,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 771,
    "DrugName": "LEVEMIR* 100U/ML SOL",
    "DrugNdc": 169368712,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 772,
    "DrugName": "levETIRAcetam 1000MG TAB",
    "DrugNdc": 68180011507,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 773,
    "DrugName": "levETIRAcetam 250MG TAB",
    "DrugNdc": 68180011216,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 774,
    "DrugName": "levETIRAcetam 500MG TAB",
    "DrugNdc": 68180011316,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 775,
    "DrugName": "levETIRAcetam 500MG TAB",
    "DrugNdc": 31722053712,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 776,
    "DrugName": "levETIRAcetam 750MG TAB",
    "DrugNdc": 68180011416,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 777,
    "DrugName": "levETIRAcetam 750MG TAB",
    "DrugNdc": 68001011807,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 778,
    "DrugName": "LevETIRAcetam* 750MG TAB",
    "DrugNdc": 31722053812,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 779,
    "DrugName": "levOCARNitine 330MG TAB",
    "DrugNdc": 50383017290,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 780,
    "DrugName": "LEVOCETIRIZINE DIHYD 5MG TAB",
    "DrugNdc": 31722055190,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 781,
    "DrugName": "LEVOCETIRIZINE DIHYD 5MG TAB",
    "DrugNdc": 60505371309,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 782,
    "DrugName": "levoFLOXacin 250MG TAB",
    "DrugNdc": 65862053650,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 783,
    "DrugName": "levoFLOXacin 500MG TAB",
    "DrugNdc": 69097028970,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 784,
    "DrugName": "levoFLOXacin 500MG TAB",
    "DrugNdc": 65862053750,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 785,
    "DrugName": "levoFLOXacin 500MG TAB",
    "DrugNdc": 781579150,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 786,
    "DrugName": "LEVONORGESTREL 1.5MG TAB",
    "DrugNdc": 68462012340,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 787,
    "DrugName": "LEVOTHYROXINE SODIUM 125MCG TAB",
    "DrugNdc": 527134701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 788,
    "DrugName": "LEVOTHYROXINE SODIUM 137MCG TAB",
    "DrugNdc": 527163801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 789,
    "DrugName": "LEVOTHYROXINE SODIUM 150MCG TAB",
    "DrugNdc": 527134901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 790,
    "DrugName": "LEVOTHYROXINE SODIUM 75MCG TAB",
    "DrugNdc": 527134301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 791,
    "DrugName": "LEVOTHYROXINE SODIUM* 100MCG TAB",
    "DrugNdc": 527134501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 792,
    "DrugName": "LEVOTHYROXINE SODIUM* 112MCG TAB",
    "DrugNdc": 527134601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 793,
    "DrugName": "LEVOTHYROXINE SODIUM* 175MCG TAB",
    "DrugNdc": 527135001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 794,
    "DrugName": "LEVOTHYROXINE SODIUM* 200MCG TAB",
    "DrugNdc": 527135101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 795,
    "DrugName": "LEVOTHYROXINE SODIUM* 25MCG TAB",
    "DrugNdc": 527134101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 796,
    "DrugName": "LEVOTHYROXINE SODIUM* 50MCG TAB",
    "DrugNdc": 527134201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 797,
    "DrugName": "LEVOTHYROXINE SODIUM* 88MCG TAB",
    "DrugNdc": 527134401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 798,
    "DrugName": "LIDOCAINE HCL 2% SOL",
    "DrugNdc": 603139364,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 799,
    "DrugName": "LIDOCAINE OINTMENT 5% ONT",
    "DrugNdc": 65162091838,
    "DrugQty": 35.44,
    "FIELD5": ""
  },
  {
    "id": 800,
    "DrugName": "LIDOCAINE OINTMENT 5% ONT",
    "DrugNdc": 51672300803,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 801,
    "DrugName": "LIDOCAINE PATCH* 5% PAT",
    "DrugNdc": 591352530,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 802,
    "DrugName": "LIDOCAINE/PRILOCAINE 2.5-2.5% CRM",
    "DrugNdc": 50383066730,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 803,
    "DrugName": "LINEZOLID* 600MG TAB",
    "DrugNdc": 67877041984,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 804,
    "DrugName": "LINZESS 145MCG CAP",
    "DrugNdc": 456120130,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 805,
    "DrugName": "LINZESS 290MCG CAP",
    "DrugNdc": 456120230,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 806,
    "DrugName": "LIPITOR 20MG TAB",
    "DrugNdc": 54569446700,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 807,
    "DrugName": "LISINOPRIL 10MG TAB",
    "DrugNdc": 68001026808,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 808,
    "DrugName": "LISINOPRIL 10MG TAB",
    "DrugNdc": 68001033408,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 809,
    "DrugName": "LISINOPRIL 20MG TAB",
    "DrugNdc": 68001033508,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 810,
    "DrugName": "LISINOPRIL 20MG TAB",
    "DrugNdc": 68180098103,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 811,
    "DrugName": "LISINOPRIL 20MG TAB",
    "DrugNdc": 68180051503,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 812,
    "DrugName": "LISINOPRIL 30MG TAB",
    "DrugNdc": 68180051601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 813,
    "DrugName": "LISINOPRIL 40MG TAB",
    "DrugNdc": 68001033700,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 814,
    "DrugName": "LISINOPRIL 40MG TAB",
    "DrugNdc": 43547035611,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 815,
    "DrugName": "LISINOPRIL 5MG TAB",
    "DrugNdc": 68180051303,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 816,
    "DrugName": "LISINOPRIL 5MG TAB",
    "DrugNdc": 68001033308,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 817,
    "DrugName": "LISINOPRIL* 10MG TAB",
    "DrugNdc": 68180098003,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 818,
    "DrugName": "LISINOPRIL* 2.5MG TAB",
    "DrugNdc": 68001027200,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 819,
    "DrugName": "LISINOPRIL/HCTZ 10-12.5MG TAB",
    "DrugNdc": 68180051801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 820,
    "DrugName": "LISINOPRIL/HCTZ 20-12.5MG TAB",
    "DrugNdc": 68180051901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 821,
    "DrugName": "LITHIUM CARBONATE 300MG CAP",
    "DrugNdc": 31722054501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 822,
    "DrugName": "LO LOESTRIN FE 1000-10-10MCG TAB",
    "DrugNdc": 430042014,
    "DrugQty": 140,
    "FIELD5": ""
  },
  {
    "id": 823,
    "DrugName": "LOESTRIN FE 1.5/30 1500-30MCG TAB",
    "DrugNdc": 51285012870,
    "DrugQty": 140,
    "FIELD5": ""
  },
  {
    "id": 824,
    "DrugName": "LONSURF 20-8.19MG TAB",
    "DrugNdc": 64842102002,
    "DrugQty": 40,
    "FIELD5": ""
  },
  {
    "id": 825,
    "DrugName": "LOPERAMIDE HCL 2MG CAP",
    "DrugNdc": 378210001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 826,
    "DrugName": "LORATADINE 10MG TAB",
    "DrugNdc": 45802065065,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 827,
    "DrugName": "LORATADINE CHILDREN 5MG/5ML LIQ",
    "DrugNdc": 904623420,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 828,
    "DrugName": "LORATADINE SYRUP* 5MG/5ML LIQ",
    "DrugNdc": 51672209208,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 829,
    "DrugName": "LORATADINE* 10MG TAB",
    "DrugNdc": 45802065078,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 830,
    "DrugName": "LORazepam 0.5MG TAB",
    "DrugNdc": 69315090401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 831,
    "DrugName": "LORazepam 0.5MG TAB",
    "DrugNdc": 603424621,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 832,
    "DrugName": "LORazepam 0.5MG TAB",
    "DrugNdc": 781537101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 833,
    "DrugName": "LORazepam 1MG * 1MG TAB",
    "DrugNdc": 781537701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 834,
    "DrugName": "LORazepam 1MG TAB",
    "DrugNdc": 69315090501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 835,
    "DrugName": "LORazepam 1MG TAB",
    "DrugNdc": 591024101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 836,
    "DrugName": "LORazepam 2MG TAB",
    "DrugNdc": 69315090601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 837,
    "DrugName": "LOSARTAN POTASSIUM ^ 100MG TAB",
    "DrugNdc": 13668011590,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 838,
    "DrugName": "LOSARTAN POTASSIUM 100MG TAB",
    "DrugNdc": 43547036209,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 839,
    "DrugName": "LOSARTAN POTASSIUM 100MG TAB",
    "DrugNdc": 58657061210,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 840,
    "DrugName": "LOSARTAN POTASSIUM 25MG TAB",
    "DrugNdc": 13668011390,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 841,
    "DrugName": "LOSARTAN POTASSIUM 25MG TAB",
    "DrugNdc": 58657061090,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 842,
    "DrugName": "LOSARTAN POTASSIUM 25MG TAB",
    "DrugNdc": 13668011310,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 843,
    "DrugName": "LOSARTAN POTASSIUM 50MG TAB",
    "DrugNdc": 13668040930,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 844,
    "DrugName": "LOSARTAN POTASSIUM 50MG TAB",
    "DrugNdc": 65862020230,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 845,
    "DrugName": "LOSARTAN POTASSIUM 50MG TAB",
    "DrugNdc": 13668040990,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 846,
    "DrugName": "LOSARTAN POTASSIUM 50MG TAB",
    "DrugNdc": 43547036109,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 847,
    "DrugName": "LOSARTAN POTASSIUM 50MG TAB",
    "DrugNdc": 13668040910,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 848,
    "DrugName": "LOSARTAN POTASSIUM* 100MG TAB",
    "DrugNdc": 58657061290,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 849,
    "DrugName": "LOSARTAN POTASSIUM* 50MG TAB",
    "DrugNdc": 58657061190,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 850,
    "DrugName": "LOSARTAN/HCTZ 100-12.5MG TAB",
    "DrugNdc": 781520431,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 851,
    "DrugName": "LOSARTAN/HCTZ 100-12.5MG TAB",
    "DrugNdc": 781520492,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 852,
    "DrugName": "LOSARTAN/HCTZ 100-25MG TAB",
    "DrugNdc": 93736856,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 853,
    "DrugName": "LOSARTAN/HCTZ 100-25MG TAB",
    "DrugNdc": 781520731,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 854,
    "DrugName": "LOSARTAN/HCTZ 50-12.5MG TAB",
    "DrugNdc": 781520692,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 855,
    "DrugName": "LOSARTAN/HCTZ 50-12.5MG TAB",
    "DrugNdc": 62332004890,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 856,
    "DrugName": "LOVASTATIN 10MG TAB",
    "DrugNdc": 68180046701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 857,
    "DrugName": "LOVASTATIN 20MG TAB",
    "DrugNdc": 68180046801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 858,
    "DrugName": "LOVASTATIN 20MG TAB",
    "DrugNdc": 68001031500,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 859,
    "DrugName": "LOVASTATIN* 40MG TAB",
    "DrugNdc": 68001031608,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 860,
    "DrugName": "LOVAZA 1000MG CAP",
    "DrugNdc": 173088408,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 861,
    "DrugName": "LOVENOX 60MG/0.6ML INJ",
    "DrugNdc": 75062160,
    "DrugQty": 6,
    "FIELD5": ""
  },
  {
    "id": 862,
    "DrugName": "LOVENOX 80MG/0.8 ML INJ",
    "DrugNdc": 75062280,
    "DrugQty": 8,
    "FIELD5": ""
  },
  {
    "id": 863,
    "DrugName": "LOXAPINE SUCCINATE 25MG CAP",
    "DrugNdc": 527139601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 864,
    "DrugName": "LOXAPINE SUCCINATE 25MG CAP",
    "DrugNdc": 591037101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 865,
    "DrugName": "LUMIGAN 0.01% SOL",
    "DrugNdc": 23320505,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 866,
    "DrugName": "LUMIGAN 0.01% SOL",
    "DrugNdc": 23320508,
    "DrugQty": 7.5,
    "FIELD5": ""
  },
  {
    "id": 867,
    "DrugName": "LUMIGAN* 0.01% SOL",
    "DrugNdc": 23320503,
    "DrugQty": 2.5,
    "FIELD5": ""
  },
  {
    "id": 868,
    "DrugName": "LUPRON DEPOT 22.5MG KIT",
    "DrugNdc": 74334603,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 869,
    "DrugName": "LUPRON DEPOT* 3.75MG KIT",
    "DrugNdc": 74364103,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 870,
    "DrugName": "Lynparza 150MG TAB",
    "DrugNdc": 310067960,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 871,
    "DrugName": "LYNPARZA 50MG CAP",
    "DrugNdc": 310065758,
    "DrugQty": 448,
    "FIELD5": ""
  },
  {
    "id": 872,
    "DrugName": "LYRICA 100MG CAP",
    "DrugNdc": 71101568,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 873,
    "DrugName": "LYRICA 25MG CAP",
    "DrugNdc": 71101268,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 874,
    "DrugName": "LYRICA 50MG CAP",
    "DrugNdc": 71101368,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 875,
    "DrugName": "LYRICA 75MG CAP",
    "DrugNdc": 71101468,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 876,
    "DrugName": "LYRICA* 150MG CAP",
    "DrugNdc": 71101668,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 877,
    "DrugName": "LYRICA* 200MG CAP",
    "DrugNdc": 71101768,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 878,
    "DrugName": "MAGNESIUM 250MG TAB",
    "DrugNdc": 40985022713,
    "DrugQty": 110,
    "FIELD5": ""
  },
  {
    "id": 879,
    "DrugName": "MAGNESIUM OXIDE 400MG TAB",
    "DrugNdc": 35789663412,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 880,
    "DrugName": "MAGNESIUM OXIDE 500MG TAB",
    "DrugNdc": 904423960,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 881,
    "DrugName": "MAPAP 325MG TAB",
    "DrugNdc": 904198280,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 882,
    "DrugName": "MAPAP ARTHRITIS PAIN 650MG AER",
    "DrugNdc": 46122017081,
    "DrugQty": 200,
    "FIELD5": ""
  },
  {
    "id": 883,
    "DrugName": "MAPAP ARTHRITIS PAIN 650MG TER",
    "DrugNdc": 904576960,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 884,
    "DrugName": "MAPAP CHILDREN'S 160MG/5ML SUS",
    "DrugNdc": 904653620,
    "DrugQty": 118,
    "FIELD5": ""
  },
  {
    "id": 885,
    "DrugName": "MAPAP EXTRA STRENGTH 500MG TAB",
    "DrugNdc": 904198351,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 886,
    "DrugName": "MAPAP EXTRA STRENGTH 500MG TAB",
    "DrugNdc": 904198359,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 887,
    "DrugName": "MAPAP* 325MG TAB",
    "DrugNdc": 904198251,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 888,
    "DrugName": "MAVYRET 100/40MG 100/40MG TAB",
    "DrugNdc": 74262528,
    "DrugQty": 84,
    "FIELD5": ""
  },
  {
    "id": 889,
    "DrugName": "MECLIZINE HCL 12.5MG TAB",
    "DrugNdc": 65162044110,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 890,
    "DrugName": "MECLIZINE HCL 12.5MG TAB",
    "DrugNdc": 42806001201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 891,
    "DrugName": "MECLIZINE HCL* 25MG TAB",
    "DrugNdc": 65162044210,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 892,
    "DrugName": "MEDROL 4MG TAB",
    "DrugNdc": 9005604,
    "DrugQty": 21,
    "FIELD5": ""
  },
  {
    "id": 893,
    "DrugName": "MedroxyPROGESTERone 10MG TAB",
    "DrugNdc": 555077902,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 894,
    "DrugName": "MEGESTROL ACETATE 40MG TAB",
    "DrugNdc": 49884029001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 895,
    "DrugName": "MEGESTROL ACETATE 40MG/ML SUS",
    "DrugNdc": 54354258,
    "DrugQty": 240,
    "FIELD5": ""
  },
  {
    "id": 896,
    "DrugName": "MEGESTROL ACETATE 40MG/ML SUS",
    "DrugNdc": 49884090761,
    "DrugQty": 480,
    "FIELD5": ""
  },
  {
    "id": 897,
    "DrugName": "MEGESTROL ACETATE* 40MG/ML SUS",
    "DrugNdc": 49884090738,
    "DrugQty": 240,
    "FIELD5": ""
  },
  {
    "id": 898,
    "DrugName": "MEGESTROL-ACE 625MG-5ML ORAL SUS 15 625MG/5ML SUS",
    "DrugNdc": 24979004113,
    "DrugQty": 150,
    "FIELD5": ""
  },
  {
    "id": 899,
    "DrugName": "MEKINIST 0.5MG TAB",
    "DrugNdc": 78066615,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 900,
    "DrugName": "MEKINIST 2MG TAB",
    "DrugNdc": 78066815,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 901,
    "DrugName": "MELATONIN 3MG TAB",
    "DrugNdc": 536641208,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 902,
    "DrugName": "MELOXICAM 15MG TAB",
    "DrugNdc": 68382005105,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 903,
    "DrugName": "MELOXICAM 7.5MG TAB",
    "DrugNdc": 68382005001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 904,
    "DrugName": "MELPHALAN 2MG TAB",
    "DrugNdc": 47781020050,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 905,
    "DrugName": "Memantine ER 14mg 14mg CER",
    "DrugNdc": 65162078303,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 906,
    "DrugName": "MEMANTINE HCI EXTENDED RELEASE CAP 7MG CER",
    "DrugNdc": 65162078203,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 907,
    "DrugName": "MEMANTINE HCL 10MG TAB",
    "DrugNdc": 33342029809,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 908,
    "DrugName": "MEMANTINE HCL 10MG TAB",
    "DrugNdc": 29300017216,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 909,
    "DrugName": "MEMANTINE HCL* 5MG TAB",
    "DrugNdc": 33342029709,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 910,
    "DrugName": "METAMUCIL MULTIHEALT 3.4GM POW",
    "DrugNdc": 37000045310,
    "DrugQty": 822,
    "FIELD5": ""
  },
  {
    "id": 911,
    "DrugName": "metFORMIN HCL 1000MG TAB",
    "DrugNdc": 68382076010,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 912,
    "DrugName": "metFORMIN HCL 1000MG TAB",
    "DrugNdc": 65862001099,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 913,
    "DrugName": "metFORMIN HCL 850MG TAB",
    "DrugNdc": 68382075905,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 914,
    "DrugName": "metFORMIN HCL ER 500MG TER",
    "DrugNdc": 51224000750,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 915,
    "DrugName": "metFORMIN HCL ER 500MG TER",
    "DrugNdc": 53746017801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 916,
    "DrugName": "metFORMIN HCL ER 500MG TER",
    "DrugNdc": 60505026001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 917,
    "DrugName": "metFORMIN HCL ER 500MG TER",
    "DrugNdc": 62756014202,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 918,
    "DrugName": "metFORMIN HCL ER 750MG TER",
    "DrugNdc": 60505132901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 919,
    "DrugName": "metFORMIN HCL ER 750MG TER",
    "DrugNdc": 62756014301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 920,
    "DrugName": "MetFORMIN HCL ER* 500MG TER",
    "DrugNdc": 62756014201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 921,
    "DrugName": "MetFORMIN HCL* 1000MG TAB",
    "DrugNdc": 67877056310,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 922,
    "DrugName": "MetFORMIN HCL* 500MG TAB",
    "DrugNdc": 67877056105,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 923,
    "DrugName": "MetFORMIN HCL* 850MG TAB",
    "DrugNdc": 67877056205,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 924,
    "DrugName": "METHENAMINE HIPPURAT 1GM TAB",
    "DrugNdc": 43199002001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 925,
    "DrugName": "METHENAMINE HIPPURAT 1GM TAB",
    "DrugNdc": 47781057701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 926,
    "DrugName": "methIMAzole 10MG TAB",
    "DrugNdc": 64980026101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 927,
    "DrugName": "methIMAzole 10MG TAB",
    "DrugNdc": 185021001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 928,
    "DrugName": "methIMAzole 10MG TAB",
    "DrugNdc": 23155007101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 929,
    "DrugName": "methIMAzole 5MG TAB",
    "DrugNdc": 23155007001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 930,
    "DrugName": "METHOCARBAMOL 500MG TAB",
    "DrugNdc": 31722053301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 931,
    "DrugName": "METHOCARBAMOL 750MG TAB",
    "DrugNdc": 31722053401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 932,
    "DrugName": "METHOTREXATE 2.5MG TAB",
    "DrugNdc": 67253032010,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 933,
    "DrugName": "METHOTREXATE 2.5MG TAB",
    "DrugNdc": 54455025,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 934,
    "DrugName": "MethylPREDNISolone 4MG TAB",
    "DrugNdc": 68001000501,
    "DrugQty": 21,
    "FIELD5": ""
  },
  {
    "id": 935,
    "DrugName": "MethylPREDNISolone 4MG TAB",
    "DrugNdc": 781502207,
    "DrugQty": 21,
    "FIELD5": ""
  },
  {
    "id": 936,
    "DrugName": "MethylPREDNISolone 80MG/ML INJ",
    "DrugNdc": 703005101,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 937,
    "DrugName": "METOCLOPRAMIDE 10MG TAB",
    "DrugNdc": 591246801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 938,
    "DrugName": "METOCLOPRAMIDE 10MG TAB",
    "DrugNdc": 93220301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 939,
    "DrugName": "METOCLOPRAMIDE 5MG TAB",
    "DrugNdc": 93220401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 940,
    "DrugName": "METOCLOPRAMIDE 5MG TAB",
    "DrugNdc": 93220405,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 941,
    "DrugName": "metOLazone 10MG TAB",
    "DrugNdc": 378617401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 942,
    "DrugName": "metOLazone 2.5MG TAB",
    "DrugNdc": 65580064371,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 943,
    "DrugName": "metOLazone 5MG TAB",
    "DrugNdc": 65580064471,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 944,
    "DrugName": "METOPROLOL SUCCINATE 100MG TER",
    "DrugNdc": 68001011900,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 945,
    "DrugName": "METOPROLOL SUCCINATE ER 100MG TER",
    "DrugNdc": 62037083201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 946,
    "DrugName": "METOPROLOL SUCCINATE* 25MG TER",
    "DrugNdc": 68001012100,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 947,
    "DrugName": "METOPROLOL SUCCINATE* 50MG TER",
    "DrugNdc": 68001012200,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 948,
    "DrugName": "METOPROLOL TARTRATE 100MG TAB",
    "DrugNdc": 57664016752,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 949,
    "DrugName": "METOPROLOL TARTRATE 100MG TAB",
    "DrugNdc": 57237010299,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 950,
    "DrugName": "METOPROLOL TARTRATE 25MG TAB",
    "DrugNdc": 65862006299,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 951,
    "DrugName": "METOPROLOL TARTRATE 25MG TAB",
    "DrugNdc": 57664050658,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 952,
    "DrugName": "METOPROLOL TARTRATE 50MG TAB",
    "DrugNdc": 65862006301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 953,
    "DrugName": "METOPROLOL TARTRATE 50MG TAB",
    "DrugNdc": 378003210,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 954,
    "DrugName": "METOPROLOL TARTRATE 50MG TAB",
    "DrugNdc": 57664047758,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 955,
    "DrugName": "METOPROLOL TARTRATE 75MG TAB",
    "DrugNdc": 378459401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 956,
    "DrugName": "metroNIDAZOLE 1% GEL",
    "DrugNdc": 66993093661,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 957,
    "DrugName": "metroNIDAZOLE 250MG TAB",
    "DrugNdc": 23155056801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 958,
    "DrugName": "metroNIDAZOLE 500MG TAB",
    "DrugNdc": 23155056901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 959,
    "DrugName": "metroNIDAZOLE 500MG TAB",
    "DrugNdc": 50111033401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 960,
    "DrugName": "metroNIDAZOLE VAGIN. 0.75% GEL",
    "DrugNdc": 781707787,
    "DrugQty": 70,
    "FIELD5": ""
  },
  {
    "id": 961,
    "DrugName": "metroNIDAZOLE VAGIN. 0.75% GEL",
    "DrugNdc": 68682045570,
    "DrugQty": 70,
    "FIELD5": ""
  },
  {
    "id": 962,
    "DrugName": "MetroNIDAZOLE* 0.75% CRM",
    "DrugNdc": 168032346,
    "DrugQty": 45,
    "FIELD5": ""
  },
  {
    "id": 963,
    "DrugName": "MEXILETINE HCL 200MG CAP",
    "DrugNdc": 93874001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 964,
    "DrugName": "MI-ACID 80MG TAB",
    "DrugNdc": 904506860,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 965,
    "DrugName": "MICONAZOLE NITRATE 2% CRM",
    "DrugNdc": 51672200102,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 966,
    "DrugName": "MICONAZOLE NITRATE 2% CRM",
    "DrugNdc": 713025237,
    "DrugQty": 45,
    "FIELD5": ""
  },
  {
    "id": 967,
    "DrugName": "MICROGESTIN FE 1/20 1000-20MCG TAB",
    "DrugNdc": 51862001206,
    "DrugQty": 168,
    "FIELD5": ""
  },
  {
    "id": 968,
    "DrugName": "MIDODRINE HCL 5MG TAB",
    "DrugNdc": 185004301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 969,
    "DrugName": "MIDODRINE HCL 5MG TAB",
    "DrugNdc": 245021211,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 970,
    "DrugName": "MINOXIDIL* 10MG TAB",
    "DrugNdc": 53489038701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 971,
    "DrugName": "MINOXIDIL* 2.5MG TAB",
    "DrugNdc": 53489038601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 972,
    "DrugName": "MiraLAX POW",
    "DrugNdc": 11523723404,
    "DrugQty": 510,
    "FIELD5": ""
  },
  {
    "id": 973,
    "DrugName": "MIRTAZAPINE 15MG TAB",
    "DrugNdc": 13107003134,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 974,
    "DrugName": "MIRTAZAPINE 15MG TAB",
    "DrugNdc": 57237000830,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 975,
    "DrugName": "MIRTAZAPINE 30MG TAB",
    "DrugNdc": 13107000334,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 976,
    "DrugName": "MIRTAZAPINE 45MG TAB",
    "DrugNdc": 13107003234,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 977,
    "DrugName": "MIRTAZAPINE* 30MG TAB",
    "DrugNdc": 57237000930,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 978,
    "DrugName": "MOMETASONE FUROATE 0.1% CRM",
    "DrugNdc": 45802025735,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 979,
    "DrugName": "MOMETASONE FUROATE 0.1% CRM",
    "DrugNdc": 45802025742,
    "DrugQty": 45,
    "FIELD5": ""
  },
  {
    "id": 980,
    "DrugName": "MONTELUKAST CHEWABLE* 5MG TAB",
    "DrugNdc": 93742556,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 981,
    "DrugName": "MONTELUKAST SODIUM* 10MG TAB",
    "DrugNdc": 68001024805,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 982,
    "DrugName": "MOVANTIK 12.5MG TAB",
    "DrugNdc": 310196930,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 983,
    "DrugName": "MOXIFLOXACIN HCL 400MG TAB",
    "DrugNdc": 47781026830,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 984,
    "DrugName": "MULTAQ* 400MG TAB",
    "DrugNdc": 24414260,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 985,
    "DrugName": "MULTI-VITAMINS 0 TAB",
    "DrugNdc": 536404610,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 986,
    "DrugName": "MUPIROCIN 2% ONT",
    "DrugNdc": 68462018022,
    "DrugQty": 22,
    "FIELD5": ""
  },
  {
    "id": 987,
    "DrugName": "MUPIROCIN 2% ONT",
    "DrugNdc": 51672131200,
    "DrugQty": 22,
    "FIELD5": ""
  },
  {
    "id": 988,
    "DrugName": "MURO-128 2% SOL",
    "DrugNdc": 24208027615,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 989,
    "DrugName": "MY WAY 1.5MG TAB",
    "DrugNdc": 68180085211,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 990,
    "DrugName": "MYCOPHENOLATE MOFETI 250MG CAP",
    "DrugNdc": 16729009401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 991,
    "DrugName": "MYCOPHENOLATE MOFETI 500MG TAB",
    "DrugNdc": 781517501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 992,
    "DrugName": "MYCOPHENOLATE MOFETI 500MG TAB",
    "DrugNdc": 16729001901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 993,
    "DrugName": "MYRBETRIQ 25MG TER",
    "DrugNdc": 469260130,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 994,
    "DrugName": "NAC 600MG CAP",
    "DrugNdc": 54629409760,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 995,
    "DrugName": "NALTREXONE HCL 50MG TAB",
    "DrugNdc": 406117001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 996,
    "DrugName": "NALTREXONE HCL 50MG TAB",
    "DrugNdc": 47335032688,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 997,
    "DrugName": "NAMENDA XR 14MG CER",
    "DrugNdc": 456341433,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 998,
    "DrugName": "NAMENDA XR* 7MG CER",
    "DrugNdc": 456340733,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 999,
    "DrugName": "NAPROXEN 250MG TAB",
    "DrugNdc": 68462018801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1000,
    "DrugName": "NAPROXEN 375MG TAB",
    "DrugNdc": 68462018901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1001,
    "DrugName": "NAPROXEN 375MG TAB",
    "DrugNdc": 31722034101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1002,
    "DrugName": "NAPROXEN* 500MG TAB",
    "DrugNdc": 68462019001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1003,
    "DrugName": "NASAL MOISTURIZING SPRAY 0.65% SOL",
    "DrugNdc": 24385032521,
    "DrugQty": 45,
    "FIELD5": ""
  },
  {
    "id": 1004,
    "DrugName": "NASONEX 50MCG/INH AER",
    "DrugNdc": 49999047450,
    "DrugQty": 17,
    "FIELD5": ""
  },
  {
    "id": 1005,
    "DrugName": "NECON 7/7/7 0.035-0.5-0.75-1MG TAB",
    "DrugNdc": 52544016528,
    "DrugQty": 168,
    "FIELD5": ""
  },
  {
    "id": 1006,
    "DrugName": "NEOMYCIN SULFATE 500MG TAB",
    "DrugNdc": 50383056510,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1007,
    "DrugName": "NEOMYCIN/POLYMYX/DEX 0.1-0.35-10000%-U/GM ONT",
    "DrugNdc": 574416035,
    "DrugQty": 3.5,
    "FIELD5": ""
  },
  {
    "id": 1008,
    "DrugName": "NEOMYCIN/POLYMYX/HC 3.5-10000-1MG-U-% SOL",
    "DrugNdc": 61314064610,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 1009,
    "DrugName": "NEOMYCIN/POLYMYX/HC 3.5-10000-1MG-U-% SUS",
    "DrugNdc": 61314064511,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 1010,
    "DrugName": "NEOMYCIN/POLYMYXIN/D* 0.1-0.35-10000%-U/ML SUS",
    "DrugNdc": 61314063006,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1011,
    "DrugName": "NEOSPORIN 400-3.5-5,000U-MG-U/GM ONT",
    "DrugNdc": 81073088,
    "DrugQty": 14.2,
    "FIELD5": ""
  },
  {
    "id": 1012,
    "DrugName": "NEPHRO-VITE 0 TAB",
    "DrugNdc": 536730001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1013,
    "DrugName": "NEPHRO-VITE RX TAB",
    "DrugNdc": 52544097701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1014,
    "DrugName": "NEPHRO-VITE* 0 TAB",
    "DrugNdc": 536730001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1015,
    "DrugName": "NERLYNX 40mg TAB",
    "DrugNdc": 70437024018,
    "DrugQty": 180,
    "FIELD5": ""
  },
  {
    "id": 1016,
    "DrugName": "NEULASTA 6MG/0.6ML INJ",
    "DrugNdc": 55513019001,
    "DrugQty": 0.6,
    "FIELD5": ""
  },
  {
    "id": 1017,
    "DrugName": "NEUPOGEN 300MCG/ML INJ",
    "DrugNdc": 54868252200,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 1018,
    "DrugName": "NEUPOGEN SINGLEJECT* 300MCG/0.5ML INJ",
    "DrugNdc": 55513092410,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1019,
    "DrugName": "NEUPOGEN SINGLEJECT* 480MCG/0.8ML INJ",
    "DrugNdc": 55513020910,
    "DrugQty": 8,
    "FIELD5": ""
  },
  {
    "id": 1020,
    "DrugName": "NexAVAR 200MG TAB",
    "DrugNdc": 50419048858,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 1021,
    "DrugName": "NexIUM DR* 40MG CER",
    "DrugNdc": 186504031,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1022,
    "DrugName": "NIACIN 1000MG TER",
    "DrugNdc": 536703801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1023,
    "DrugName": "NIACIN ER 1000MG TER",
    "DrugNdc": 65162032309,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1024,
    "DrugName": "NIACIN ER 1000MG TER",
    "DrugNdc": 93739498,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1025,
    "DrugName": "NIACIN* 250MG TAB",
    "DrugNdc": 79854201406,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1026,
    "DrugName": "NIACIN** 100MG TAB",
    "DrugNdc": 54629007101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1027,
    "DrugName": "NIASPAN 1000MG TER",
    "DrugNdc": 74308090,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1028,
    "DrugName": "NiCARdipine HCL* 30MG CAP",
    "DrugNdc": 42806050209,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1029,
    "DrugName": "NICOTINE TRANSDERMAL* 21MG/24HR PAT",
    "DrugNdc": 536110888,
    "DrugQty": 14,
    "FIELD5": ""
  },
  {
    "id": 1030,
    "DrugName": "NIFEdipine 10MG CAP",
    "DrugNdc": 59762100401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1031,
    "DrugName": "NIFEdipine ER 90MG TER",
    "DrugNdc": 62175026237,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1032,
    "DrugName": "NIFEdipine ER 90MG TER",
    "DrugNdc": 24979000901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1033,
    "DrugName": "NIFEdipine ER* 30MG TER",
    "DrugNdc": 50742062001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1034,
    "DrugName": "NIFEdipine ER* 60MG TER",
    "DrugNdc": 62175026137,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1035,
    "DrugName": "NINLARO 2.3MG CAP",
    "DrugNdc": 63020007802,
    "DrugQty": 3,
    "FIELD5": ""
  },
  {
    "id": 1036,
    "DrugName": "NINLARO 3MG CAP",
    "DrugNdc": 63020007902,
    "DrugQty": 3,
    "FIELD5": ""
  },
  {
    "id": 1037,
    "DrugName": "NINLARO 4MG CAP",
    "DrugNdc": 63020008002,
    "DrugQty": 3,
    "FIELD5": ""
  },
  {
    "id": 1038,
    "DrugName": "NITROFURANTOIN MACRO 100MG CAP",
    "DrugNdc": 68001000300,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1039,
    "DrugName": "NITROFURANTOIN MONOH 100MG CAP",
    "DrugNdc": 47781030301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1040,
    "DrugName": "NITROFURANTOIN MONOH* 100MG CAP",
    "DrugNdc": 68001000100,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1041,
    "DrugName": "NITROGLYCERIN 0.4MG TAB",
    "DrugNdc": 59762330403,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1042,
    "DrugName": "NITROGLYCERIN 0.4MG TAB",
    "DrugNdc": 68462063945,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1043,
    "DrugName": "NITROGLYCERIN* 0.4MG TAB",
    "DrugNdc": 59762330401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1044,
    "DrugName": "NITROMIST 400MCG AER",
    "DrugNdc": 76299043004,
    "DrugQty": 4.1,
    "FIELD5": ""
  },
  {
    "id": 1045,
    "DrugName": "NITROSTAT 0.4MG TAB",
    "DrugNdc": 71041824,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1046,
    "DrugName": "NORETHINDRONE/ETHINY 1000-20MCG TAB",
    "DrugNdc": 378728053,
    "DrugQty": 63,
    "FIELD5": ""
  },
  {
    "id": 1047,
    "DrugName": "NORTREL 1/35 1000-35MCG TAB",
    "DrugNdc": 555901058,
    "DrugQty": 168,
    "FIELD5": ""
  },
  {
    "id": 1048,
    "DrugName": "NORTREL 7/7/7 0.035-0.5-0.75-1MG TAB",
    "DrugNdc": 555901258,
    "DrugQty": 168,
    "FIELD5": ""
  },
  {
    "id": 1049,
    "DrugName": "NORTRIPTYLINE HCL 10MG CAP",
    "DrugNdc": 51672400105,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1050,
    "DrugName": "NORTRIPTYLINE HCL 25MG CAP",
    "DrugNdc": 51672400205,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1051,
    "DrugName": "NORTRIPTYLINE HCL 50MG CAP",
    "DrugNdc": 51672400305,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1052,
    "DrugName": "NOVOFINE 30G EA",
    "DrugNdc": 169185250,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1053,
    "DrugName": "NOVOLIN 70/30* 70 U-30 U/ML SUS",
    "DrugNdc": 169183711,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 1054,
    "DrugName": "NOVOLIN N 100U/ML SOL",
    "DrugNdc": 169183411,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 1055,
    "DrugName": "NovoLOG 100U/ML SOL",
    "DrugNdc": 169750111,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 1056,
    "DrugName": "NovoLOG FLEXPEN* 100U/ML INJ",
    "DrugNdc": 169633910,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 1057,
    "DrugName": "NovoLOG MIX 70/30 F 70-30U/ML INJ",
    "DrugNdc": 169369619,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 1058,
    "DrugName": "NUVARING 0.015-0.12MG/24HR KIT",
    "DrugNdc": 52027303,
    "DrugQty": 3,
    "FIELD5": ""
  },
  {
    "id": 1059,
    "DrugName": "NYSTATIN 100000U/GM CRM",
    "DrugNdc": 713067815,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 1060,
    "DrugName": "NYSTATIN 100000U/GM CRM",
    "DrugNdc": 51672128902,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1061,
    "DrugName": "NYSTATIN 100000U/GM POW",
    "DrugNdc": 42543005261,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 1062,
    "DrugName": "NYSTATIN 100000U/ML SUS",
    "DrugNdc": 603148158,
    "DrugQty": 473,
    "FIELD5": ""
  },
  {
    "id": 1063,
    "DrugName": "NYSTATIN 100000U/ML SUS",
    "DrugNdc": 364207516,
    "DrugQty": 473,
    "FIELD5": ""
  },
  {
    "id": 1064,
    "DrugName": "NYSTATIN/TRIAMCINOLO 100000-0.1U/GM-% ONT",
    "DrugNdc": 472015560,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1065,
    "DrugName": "NYSTATIN/TRIAMCINOLO 100000-1U-MG/GM CRM",
    "DrugNdc": 472015030,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1066,
    "DrugName": "OCUVITE 0 TAB",
    "DrugNdc": 24208038760,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1067,
    "DrugName": "OFLOXACIN OPHTHALMIC 0.3% SOL",
    "DrugNdc": 17478071310,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1068,
    "DrugName": "OFLOXACIN OPHTHALMIC* 0.3% SOL",
    "DrugNdc": 64980051505,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1069,
    "DrugName": "OFLOXACIN OTIC 0.3% SOL",
    "DrugNdc": 24208041005,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1070,
    "DrugName": "OLANZapine 10MG TAB",
    "DrugNdc": 60505311303,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1071,
    "DrugName": "OLANZapine 10MG TAB",
    "DrugNdc": 43598016630,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1072,
    "DrugName": "OLANZapine 15MG TAB",
    "DrugNdc": 55111016730,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1073,
    "DrugName": "OLANZapine 2.5MG TAB",
    "DrugNdc": 60505311003,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1074,
    "DrugName": "OLANZapine 20MG TAB",
    "DrugNdc": 60505314003,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1075,
    "DrugName": "OLANZapine 5MG TAB",
    "DrugNdc": 60505311103,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1076,
    "DrugName": "OLANZapine 5MG TAB",
    "DrugNdc": 43598016430,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1077,
    "DrugName": "OLANZapine ODT 10MG ODT",
    "DrugNdc": 62756075464,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1078,
    "DrugName": "OLANZapine ODT 10MG ODT",
    "DrugNdc": 60505327603,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1079,
    "DrugName": "OLANZapine* 20MG TAB",
    "DrugNdc": 55111016830,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1080,
    "DrugName": "OLMESARTAN/HCTZ 40-12.5MG TAB",
    "DrugNdc": 62332015030,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1081,
    "DrugName": "OLMESTN/AMLDPNE/HCTZ 40-10-12.5MG TAB",
    "DrugNdc": 57664079883,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1082,
    "DrugName": "OLOPATADINE HCL* 0.2% SOL",
    "DrugNdc": 93768432,
    "DrugQty": 2.5,
    "FIELD5": ""
  },
  {
    "id": 1083,
    "DrugName": "OMEGA 3 1200MG 1200",
    "DrugNdc": 30768016888,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1084,
    "DrugName": "OMEGA-3 ACID ETHYL* 1000MG CAP",
    "DrugNdc": 65162003416,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 1085,
    "DrugName": "OMEGA-3-ACID ETHYL 1000MG CAP",
    "DrugNdc": 60505317007,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 1086,
    "DrugName": "OMEPRAZOLE DR 20MG CER",
    "DrugNdc": 68462039601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1087,
    "DrugName": "OMEPRAZOLE DR* 20MG CER",
    "DrugNdc": 68462039610,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 1088,
    "DrugName": "OMEPRAZOLE DR* 40MG CER",
    "DrugNdc": 68462039710,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 1089,
    "DrugName": "OMEPRAZOLE/SODIUM 40-1100MG CAP",
    "DrugNdc": 55111036430,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1090,
    "DrugName": "ONDANSETRON 4MG TAB",
    "DrugNdc": 65862018730,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1091,
    "DrugName": "ONDANSETRON 4MG TAB 4MG TAB",
    "DrugNdc": 57237007530,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1092,
    "DrugName": "ONDANSETRON 8MG TAB",
    "DrugNdc": 45963053930,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1093,
    "DrugName": "ONDANSETRON 8MG TAB",
    "DrugNdc": 57237007630,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1094,
    "DrugName": "ONDANSETRON ODT 4MG ODT",
    "DrugNdc": 68462015713,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1095,
    "DrugName": "ONDANSETRON ODT 4MG ODT",
    "DrugNdc": 378773293,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1096,
    "DrugName": "ONDANSETRON ODT 8MG ODT",
    "DrugNdc": 781523964,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1097,
    "DrugName": "ONDANSETRON ODT 8MG ODT",
    "DrugNdc": 68462015813,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1098,
    "DrugName": "ONDANSETRON ODT* 8MG ODT",
    "DrugNdc": 68001024717,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1099,
    "DrugName": "ONDANSETRON* 4MG TAB",
    "DrugNdc": 45963053830,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1100,
    "DrugName": "ONE TOUCH DELICA 33G EA",
    "DrugNdc": 53885013610,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1101,
    "DrugName": "ONE TOUCH PROFILE SY KIT",
    "DrugNdc": 53885037201,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 1102,
    "DrugName": "ONE TOUCH ULTRA MINI EA",
    "DrugNdc": 53885091101,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 1103,
    "DrugName": "ONE TOUCH ULTRA TES",
    "DrugNdc": 53885099425,
    "DrugQty": 25,
    "FIELD5": ""
  },
  {
    "id": 1104,
    "DrugName": "ONE TOUCH ULTRA TES",
    "DrugNdc": 53885024450,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 1105,
    "DrugName": "ONE TOUCH ULTRA TES",
    "DrugNdc": 53885024510,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1106,
    "DrugName": "ONE TOUCH VERIO EA",
    "DrugNdc": 53885027210,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1107,
    "DrugName": "ONFI* 10MG TAB",
    "DrugNdc": 67386031401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1108,
    "DrugName": "OPDIVO 10MG/ML INJ",
    "DrugNdc": 3373413,
    "DrugQty": 24,
    "FIELD5": ""
  },
  {
    "id": 1109,
    "DrugName": "ORENCIA 125MG/ML INJ",
    "DrugNdc": 3218811,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 1110,
    "DrugName": "ORENCIA 250MG INJ",
    "DrugNdc": 3218710,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 1111,
    "DrugName": "ORENCIA CLICK JET 125MG/ML INJ",
    "DrugNdc": 3218851,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 1112,
    "DrugName": "OSELTAMIVIR PHOSPHAT 30MG CAP",
    "DrugNdc": 69238126401,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 1113,
    "DrugName": "OSELTAMIVIR PHOSPHAT 45MG CAP",
    "DrugNdc": 69238126501,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 1114,
    "DrugName": "OSELTAMIVIR PHOSPHAT 75MG CAP",
    "DrugNdc": 69238126601,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 1115,
    "DrugName": "OSELTAMIVIR PHOSPHATE SUS",
    "DrugNdc": 70710116506,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1116,
    "DrugName": "OTEZLA TAB",
    "DrugNdc": 59572063255,
    "DrugQty": 55,
    "FIELD5": ""
  },
  {
    "id": 1117,
    "DrugName": "OTEZLA* 30MG TAB",
    "DrugNdc": 59572063106,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1118,
    "DrugName": "OXcarbazepine 150MG TAB",
    "DrugNdc": 54009725,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1119,
    "DrugName": "OXcarbazepine 300MG TAB",
    "DrugNdc": 68462013801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1120,
    "DrugName": "OXcarbazepine 300MG TAB",
    "DrugNdc": 51991029301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1121,
    "DrugName": "OXcarbazepine 600MG TAB",
    "DrugNdc": 51991029401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1122,
    "DrugName": "OXcarbazepine 600MG TAB",
    "DrugNdc": 54009925,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1123,
    "DrugName": "OXYBUTYNIN CHLOR ER 10MG TER",
    "DrugNdc": 378661001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1124,
    "DrugName": "OXYBUTYNIN CHLOR ER 10MG TER",
    "DrugNdc": 62175027137,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1125,
    "DrugName": "OXYBUTYNIN CHLOR ER 15MG TER",
    "DrugNdc": 62175027237,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1126,
    "DrugName": "OXYBUTYNIN CHLOR ER 5MG TER",
    "DrugNdc": 62175027037,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1127,
    "DrugName": "OXYBUTYNIN CHLORIDE 5MG TAB",
    "DrugNdc": 832003800,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1128,
    "DrugName": "OXYBUTYNIN CHLORIDE 5MG TAB",
    "DrugNdc": 603497521,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1129,
    "DrugName": "OYSCO 500/D 500-125MG-IU TAB",
    "DrugNdc": 536781708,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1130,
    "DrugName": "OYSTER SHEEL CALCIUM WITH VIT D 500MG+D TAB",
    "DrugNdc": 30904546052,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1131,
    "DrugName": "OYSTER SHELL CALCIUM 500-125MG-IU TAB",
    "DrugNdc": 79854016800,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1132,
    "DrugName": "OYSTER SHELL CALCIUM 500-200MG-IU TAB",
    "DrugNdc": 904546080,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 1133,
    "DrugName": "OYSTER SHELL CALCIUM 500MG TAB",
    "DrugNdc": 904188352,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1134,
    "DrugName": "OYSTER SHELL CALCIUM* 500-200MG-IU TAB",
    "DrugNdc": 904546052,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1135,
    "DrugName": "PAIN RELIEF 500MG TAB",
    "DrugNdc": 57896020101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1136,
    "DrugName": "PANTOPRAZOLE SODIUM 20MG TER",
    "DrugNdc": 93001198,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1137,
    "DrugName": "PANTOPRAZOLE SODIUM 40MG TER",
    "DrugNdc": 31722071390,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1138,
    "DrugName": "PANTOPRAZOLE SODIUM* 40MG TER",
    "DrugNdc": 31722071390,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1139,
    "DrugName": "PARoxetine HCL 10MG TAB",
    "DrugNdc": 60505009701,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1140,
    "DrugName": "PARoxetine HCL 10MG TAB",
    "DrugNdc": 378700193,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1141,
    "DrugName": "PARoxetine HCL 10MG TAB",
    "DrugNdc": 43547034709,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1142,
    "DrugName": "PARoxetine HCL 20MG TAB",
    "DrugNdc": 43547034809,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1143,
    "DrugName": "PARoxetine HCL 20MG TAB",
    "DrugNdc": 68382009816,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1144,
    "DrugName": "PARoxetine HCL 20MG TAB",
    "DrugNdc": 68382009801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1145,
    "DrugName": "PARoxetine HCL 30MG TAB",
    "DrugNdc": 378700393,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1146,
    "DrugName": "PARoxetine HCL 40MG TAB",
    "DrugNdc": 378700493,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1147,
    "DrugName": "PARoxetine HCL 40MG TAB",
    "DrugNdc": 43547035009,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1148,
    "DrugName": "PARoxetine HCL* 30MG TAB",
    "DrugNdc": 68382009906,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1149,
    "DrugName": "PATADAY* 0.2% SOL",
    "DrugNdc": 65027225,
    "DrugQty": 2.5,
    "FIELD5": ""
  },
  {
    "id": 1150,
    "DrugName": "PAZEO 0.7% SOL",
    "DrugNdc": 65427325,
    "DrugQty": 2.5,
    "FIELD5": ""
  },
  {
    "id": 1151,
    "DrugName": "PEG-3350/ELECTRO SOL",
    "DrugNdc": 10572010101,
    "DrugQty": 4000,
    "FIELD5": ""
  },
  {
    "id": 1152,
    "DrugName": "PENICILLIN VK 500MG TAB",
    "DrugNdc": 65862017601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1153,
    "DrugName": "PENNSAID* 2% SOL",
    "DrugNdc": 75987004005,
    "DrugQty": 112,
    "FIELD5": ""
  },
  {
    "id": 1154,
    "DrugName": "PENTOXIFYLLINE* 400MG TER",
    "DrugNdc": 68682010110,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1155,
    "DrugName": "PERJETA 30MG/ML INJ",
    "DrugNdc": 50242014501,
    "DrugQty": 14,
    "FIELD5": ""
  },
  {
    "id": 1156,
    "DrugName": "PERMETHRIN 5% CRM",
    "DrugNdc": 472024260,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1157,
    "DrugName": "PHENAZOPYRIDINE 100MG 100MG TAB",
    "DrugNdc": 58657045001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1158,
    "DrugName": "PHENAZOPYRIDINE HCL 200MG TAB",
    "DrugNdc": 69367016304,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1159,
    "DrugName": "PHENobarbital 32.4MG TAB",
    "DrugNdc": 603516621,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1160,
    "DrugName": "PHENobarbital 64.8MG TAB",
    "DrugNdc": 13517011201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1161,
    "DrugName": "PHENobarbital 97.2MG TAB",
    "DrugNdc": 13517011301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1162,
    "DrugName": "PHENobarbital 97.2MG TAB",
    "DrugNdc": 603516821,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1163,
    "DrugName": "PHENTERMINE HCL 30MG CAP",
    "DrugNdc": 527130801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1164,
    "DrugName": "PHENYTOIN EXT SODIUM 100MG CER",
    "DrugNdc": 62756040201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1165,
    "DrugName": "PHENYTOIN EXT SODIUM 300MG CER",
    "DrugNdc": 62756043283,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1166,
    "DrugName": "PHENYTOIN SODIUM 100MG CAP",
    "DrugNdc": 182019710,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 1167,
    "DrugName": "PHOSPHA 250 NEUTRAL 155-852-130MG TAB",
    "DrugNdc": 64980010401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1168,
    "DrugName": "PICATO* 0.015% GEL",
    "DrugNdc": 50222050247,
    "DrugQty": 3,
    "FIELD5": ""
  },
  {
    "id": 1169,
    "DrugName": "PILOCARPINE HCL* 5MG TAB",
    "DrugNdc": 228280111,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1170,
    "DrugName": "PIOGLITAZONE HCL 15MG TAB",
    "DrugNdc": 93727156,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1171,
    "DrugName": "PIOGLITAZONE HCL 15MG TAB",
    "DrugNdc": 16729002015,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1172,
    "DrugName": "PIOGLITAZONE HCL 15MG TAB",
    "DrugNdc": 33342005410,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1173,
    "DrugName": "PIOGLITAZONE HCL 30MG TAB",
    "DrugNdc": 13668011930,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1174,
    "DrugName": "PIOGLITAZONE HCL 30MG TAB",
    "DrugNdc": 16729002110,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1175,
    "DrugName": "PIOGLITAZONE HCL 45MG TAB",
    "DrugNdc": 13668012030,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1176,
    "DrugName": "PIOGLITAZONE HCL 45MG TAB",
    "DrugNdc": 16729002215,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1177,
    "DrugName": "PIOGLITAZONE HCL* 30MG TAB",
    "DrugNdc": 93727256,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1178,
    "DrugName": "PLAVIX* 75MG TAB",
    "DrugNdc": 63653117106,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1179,
    "DrugName": "POLYETHYLENE GLYCOL POW",
    "DrugNdc": 51991045758,
    "DrugQty": 255,
    "FIELD5": ""
  },
  {
    "id": 1180,
    "DrugName": "POLYETHYLENE GLYCOL POW",
    "DrugNdc": 62175044215,
    "DrugQty": 255,
    "FIELD5": ""
  },
  {
    "id": 1181,
    "DrugName": "POLYETHYLENE GLYCOL POW",
    "DrugNdc": 45802086803,
    "DrugQty": 510,
    "FIELD5": ""
  },
  {
    "id": 1182,
    "DrugName": "POLYETHYLENE GLYCOL* POW",
    "DrugNdc": 62175044231,
    "DrugQty": 527,
    "FIELD5": ""
  },
  {
    "id": 1183,
    "DrugName": "POLYETHYLENE GLYCOL* POW",
    "DrugNdc": 51991045757,
    "DrugQty": 527,
    "FIELD5": ""
  },
  {
    "id": 1184,
    "DrugName": "POLYMYXIN/TRIMETHOPR 10000-1U-MG/ML SOL",
    "DrugNdc": 61314062810,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 1185,
    "DrugName": "POLYSPORIN 500-10,000U/GM ONT",
    "DrugNdc": 81079887,
    "DrugQty": 28.3,
    "FIELD5": ""
  },
  {
    "id": 1186,
    "DrugName": "Polysporin 500U-10,000Ugram CRM",
    "DrugNdc": 5923068931,
    "DrugQty": 28.3,
    "FIELD5": ""
  },
  {
    "id": 1187,
    "DrugName": "POLY-VI-SOL 0 LIQ",
    "DrugNdc": 87040203,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 1188,
    "DrugName": "POTASSIUM CHLORIDE 10MEQ TER",
    "DrugNdc": 68001030300,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1189,
    "DrugName": "POTASSIUM CHLORIDE 750MG ( 10 mEq K TER",
    "DrugNdc": 68001030300,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1190,
    "DrugName": "POTASSIUM CL ER 10MEQ TER",
    "DrugNdc": 781571001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1191,
    "DrugName": "POTASSIUM CL ER 20MEQ TER",
    "DrugNdc": 68001023500,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1192,
    "DrugName": "POTASSIUM CL ER 8MEQ CER",
    "DrugNdc": 62037055901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1193,
    "DrugName": "POTASSIUM CL ER 8MEQ TER",
    "DrugNdc": 378456077,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1194,
    "DrugName": "POTASSIUM CL ER 8MEQ TER",
    "DrugNdc": 574027401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1195,
    "DrugName": "POTASSIUM CL ER* 20MEQ TER",
    "DrugNdc": 62037099901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1196,
    "DrugName": "PRADAXA* 150MG CAP",
    "DrugNdc": 597013554,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1197,
    "DrugName": "PRAVASTATIN SODIUM 10MG TAB",
    "DrugNdc": 60505016809,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1198,
    "DrugName": "PRAVASTATIN SODIUM 20MG TAB",
    "DrugNdc": 60505016909,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1199,
    "DrugName": "PRAVASTATIN SODIUM 20MG TAB",
    "DrugNdc": 68180048609,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1200,
    "DrugName": "PRAVASTATIN SODIUM 40MG TAB",
    "DrugNdc": 68180048709,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1201,
    "DrugName": "PRAVASTATIN SODIUM 40MG TAB",
    "DrugNdc": 60505017009,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1202,
    "DrugName": "PRAVASTATIN SODIUM 80mg SUS",
    "DrugNdc": 68382007816,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1203,
    "DrugName": "PRAVASTATIN SODIUM 80MG TAB",
    "DrugNdc": 68382007316,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1204,
    "DrugName": "PRAVASTATIN SODIUM 80MG TAB",
    "DrugNdc": 68180048809,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1205,
    "DrugName": "PRAZOSIN HCL 1MG CAP",
    "DrugNdc": 378110101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1206,
    "DrugName": "PRAZOSIN HCL 1MG CAP",
    "DrugNdc": 93406701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1207,
    "DrugName": "PrednisoLONE ACETATE 1% SUS",
    "DrugNdc": 61314063705,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1208,
    "DrugName": "PrednisoLONE ACETATE 1% SUS",
    "DrugNdc": 60758011905,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1209,
    "DrugName": "PrednisoLONE ACETATE* 1% SUS",
    "DrugNdc": 61314063710,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 1210,
    "DrugName": "PrednisoLONE* 15MG/5ML LIQ",
    "DrugNdc": 603156756,
    "DrugQty": 240,
    "FIELD5": ""
  },
  {
    "id": 1211,
    "DrugName": "PredniSONE 10MG TAB",
    "DrugNdc": 59746017306,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1212,
    "DrugName": "PredniSONE 10MG TAB",
    "DrugNdc": 603533821,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1213,
    "DrugName": "PredniSONE 1MG TAB",
    "DrugNdc": 59746017106,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1214,
    "DrugName": "PredniSONE 20MG TAB",
    "DrugNdc": 59746017506,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1215,
    "DrugName": "PREDNISONE 5MG TAB",
    "DrugNdc": 591505201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1216,
    "DrugName": "PredniSONE 5MG TAB",
    "DrugNdc": 59746017206,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1217,
    "DrugName": "PREMARIN* 0.625MG/GM CRM",
    "DrugNdc": 46087221,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1218,
    "DrugName": "PREMPRO* 0.3-1.5MG TAB",
    "DrugNdc": 46110511,
    "DrugQty": 28,
    "FIELD5": ""
  },
  {
    "id": 1219,
    "DrugName": "PRENATAL TAB",
    "DrugNdc": 904531360,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1220,
    "DrugName": "PRENATAL TABLETS",
    "DrugNdc": 30904531360,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1221,
    "DrugName": "PREVIDENT 5000 SENSI 1.1-5% PAS",
    "DrugNdc": 126007061,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1222,
    "DrugName": "PRIFTIN 150MG TAB",
    "DrugNdc": 88210024,
    "DrugQty": 24,
    "FIELD5": ""
  },
  {
    "id": 1223,
    "DrugName": "PriLOSEC OTC 20MG TER",
    "DrugNdc": 37000045502,
    "DrugQty": 14,
    "FIELD5": ""
  },
  {
    "id": 1224,
    "DrugName": "PriLOSEC OTC 20MG TER",
    "DrugNdc": 37000045503,
    "DrugQty": 28,
    "FIELD5": ""
  },
  {
    "id": 1225,
    "DrugName": "PRIMIDONE 50MG TAB",
    "DrugNdc": 603537121,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1226,
    "DrugName": "PRIMIDONE 50MG TAB",
    "DrugNdc": 65162054410,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1227,
    "DrugName": "PRIMIDONE 50MG TAB",
    "DrugNdc": 527130101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1228,
    "DrugName": "PROAIR HFA* 90MCG/INH AER",
    "DrugNdc": 59310057922,
    "DrugQty": 8.5,
    "FIELD5": ""
  },
  {
    "id": 1229,
    "DrugName": "PROCARDIA XL 30MG TER",
    "DrugNdc": 69265066,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1230,
    "DrugName": "PROCHLORPERAZINE MAL 10MG TAB",
    "DrugNdc": 59746011506,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1231,
    "DrugName": "PROCRIT 10000U/ML INJ",
    "DrugNdc": 59676031001,
    "DrugQty": 6,
    "FIELD5": ""
  },
  {
    "id": 1232,
    "DrugName": "PROCRIT 20000U/ML INJ",
    "DrugNdc": 59676032004,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 1233,
    "DrugName": "PROCRIT 40000U/ML INJ",
    "DrugNdc": 59676034001,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 1234,
    "DrugName": "PROCTOZONE-HC* 2.5% CRM",
    "DrugNdc": 64980032430,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1235,
    "DrugName": "PROLENSA 0.07% SOL",
    "DrugNdc": 24208060203,
    "DrugQty": 3,
    "FIELD5": ""
  },
  {
    "id": 1236,
    "DrugName": "PROLIA 60MG/ML INJ",
    "DrugNdc": 55513071001,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 1237,
    "DrugName": "PROMACTA 25MG TAB",
    "DrugNdc": 78068515,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1238,
    "DrugName": "PROMACTA 50MG TAB",
    "DrugNdc": 78068615,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1239,
    "DrugName": "PROMETH/CODEINE 6.25-10MG/5ML LIQ",
    "DrugNdc": 603158554,
    "DrugQty": 118,
    "FIELD5": ""
  },
  {
    "id": 1240,
    "DrugName": "PROMETH/CODEINE 6.25-10MG/5ML LIQ",
    "DrugNdc": 603158558,
    "DrugQty": 473,
    "FIELD5": ""
  },
  {
    "id": 1241,
    "DrugName": "PROMETHAZINE DM 6.25-15MG/5ML LIQ",
    "DrugNdc": 603158658,
    "DrugQty": 473,
    "FIELD5": ""
  },
  {
    "id": 1242,
    "DrugName": "PROMETHAZINE HCL 25MG TAB",
    "DrugNdc": 68001016200,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1243,
    "DrugName": "PROMETHAZINE HCL 6.25MG/5ML LIQ",
    "DrugNdc": 603158454,
    "DrugQty": 118,
    "FIELD5": ""
  },
  {
    "id": 1244,
    "DrugName": "PROPAFENONE HCL 300MG TAB",
    "DrugNdc": 603545021,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1245,
    "DrugName": "PROPRANOLOL HCL 10MG TAB",
    "DrugNdc": 23155011001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1246,
    "DrugName": "PROPRANOLOL HCL 20MG TAB",
    "DrugNdc": 603548321,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1247,
    "DrugName": "PROPRANOLOL HCL 20MG TAB",
    "DrugNdc": 50111046801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1248,
    "DrugName": "PROPRANOLOL HCL 20MG TAB",
    "DrugNdc": 591555501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1249,
    "DrugName": "PROVENTIL 90MCG/INH AER",
    "DrugNdc": 85113211,
    "DrugQty": 6.7,
    "FIELD5": ""
  },
  {
    "id": 1250,
    "DrugName": "PSYLLIUM HUSK PACKETS 3.4GM/DOSE SPN",
    "DrugNdc": 37000002444,
    "DrugQty": 44,
    "FIELD5": ""
  },
  {
    "id": 1251,
    "DrugName": "PYLERA 140-125-125MG CAP",
    "DrugNdc": 58914060120,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 1252,
    "DrugName": "QUEtiapine FUMARATE 100MG TAB",
    "DrugNdc": 68001018400,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1253,
    "DrugName": "QUEtiapine FUMARATE 100MG TAB",
    "DrugNdc": 47335090418,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 1254,
    "DrugName": "QUEtiapine FUMARATE 200MG TAB",
    "DrugNdc": 67877024601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1255,
    "DrugName": "QUEtiapine FUMARATE 200MG TAB",
    "DrugNdc": 47335090588,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1256,
    "DrugName": "QUEtiapine FUMARATE 200MG TAB",
    "DrugNdc": 16729014801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1257,
    "DrugName": "QUEtiapine FUMARATE 25MG TAB",
    "DrugNdc": 16729014501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1258,
    "DrugName": "QUEtiapine FUMARATE 25MG TAB",
    "DrugNdc": 68001018500,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1259,
    "DrugName": "QUEtiapine FUMARATE 25MG TAB",
    "DrugNdc": 67877024201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1260,
    "DrugName": "QUEtiapine FUMARATE 300MG TAB",
    "DrugNdc": 67877024760,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1261,
    "DrugName": "QUEtiapine FUMARATE 300MG TAB",
    "DrugNdc": 16729014912,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1262,
    "DrugName": "QUEtiapine FUMARATE 400MG TAB",
    "DrugNdc": 47335090788,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1263,
    "DrugName": "QUEtiapine FUMARATE 50MG TAB",
    "DrugNdc": 68001018000,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1264,
    "DrugName": "QUEtiapine FUMARATE 50MG TAB",
    "DrugNdc": 67877024901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1265,
    "DrugName": "QUINAPRIL HCL 10MG TAB",
    "DrugNdc": 68180055709,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1266,
    "DrugName": "QUINAPRIL HCL 40MG TAB",
    "DrugNdc": 68001026005,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1267,
    "DrugName": "quiNIDine SULFATE 300MG TAB",
    "DrugNdc": 185104701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1268,
    "DrugName": "QVAR W/DOSE COUNTER 0.08MG/INH AER",
    "DrugNdc": 59310020412,
    "DrugQty": 8.7,
    "FIELD5": ""
  },
  {
    "id": 1269,
    "DrugName": "QVAR W/DOSE COUNTER* 0.04MG/INH AER",
    "DrugNdc": 59310020212,
    "DrugQty": 8.7,
    "FIELD5": ""
  },
  {
    "id": 1270,
    "DrugName": "RALOXIFENE HCL 60MG TAB",
    "DrugNdc": 69097082507,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1271,
    "DrugName": "RALOXIFENE HCL 60MG TAB",
    "DrugNdc": 43598050501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1272,
    "DrugName": "RAMIPRIL 10MG CAP",
    "DrugNdc": 68001014100,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1273,
    "DrugName": "RAMIPRIL 10MG CAP",
    "DrugNdc": 54010925,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1274,
    "DrugName": "RAMIPRIL 5MG CAP",
    "DrugNdc": 54010825,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1275,
    "DrugName": "RANEXA 1000MG TER",
    "DrugNdc": 61958100401,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1276,
    "DrugName": "RANEXA ER* 1000MG TER",
    "DrugNdc": 61958100401,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1277,
    "DrugName": "RANEXA* 500MG TER",
    "DrugNdc": 61958100301,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1278,
    "DrugName": "raNITIdine HCL 300MG TAB",
    "DrugNdc": 781188425,
    "DrugQty": 250,
    "FIELD5": ""
  },
  {
    "id": 1279,
    "DrugName": "raNITIdine HCL 300MG TAB",
    "DrugNdc": 64380080438,
    "DrugQty": 250,
    "FIELD5": ""
  },
  {
    "id": 1280,
    "DrugName": "RaNITIdine HCL* 150MG TAB",
    "DrugNdc": 64380080307,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 1281,
    "DrugName": "RASUVO 7.5MG/0.15ML INJ",
    "DrugNdc": 59137050504,
    "DrugQty": 0.6,
    "FIELD5": ""
  },
  {
    "id": 1282,
    "DrugName": "REFRESH LIQUIGEL* 1% SOL",
    "DrugNdc": 23920515,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 1283,
    "DrugName": "REGLAN 5MG TAB",
    "DrugNdc": 62559016501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1284,
    "DrugName": "REMICADE* 100MG INJ",
    "DrugNdc": 57894003001,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 1285,
    "DrugName": "RENAGEL* 800MG TAB",
    "DrugNdc": 58468002101,
    "DrugQty": 180,
    "FIELD5": ""
  },
  {
    "id": 1286,
    "DrugName": "RENA-VITE TAB",
    "DrugNdc": 60258016001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1287,
    "DrugName": "RENO CAPS* CAP",
    "DrugNdc": 63044062201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1288,
    "DrugName": "RENVELA* 0.8GM SPN",
    "DrugNdc": 58468013202,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1289,
    "DrugName": "RENVELA* 800MG TAB",
    "DrugNdc": 58468013001,
    "DrugQty": 270,
    "FIELD5": ""
  },
  {
    "id": 1290,
    "DrugName": "RESTASIS MULTIDOSE 0.05% LIQ",
    "DrugNdc": 23530105,
    "DrugQty": 5.5,
    "FIELD5": ""
  },
  {
    "id": 1291,
    "DrugName": "RESTASIS* 0.05% LIQ",
    "DrugNdc": 23916360,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1292,
    "DrugName": "REVLIMID 10MG CAP",
    "DrugNdc": 59572041028,
    "DrugQty": 28,
    "FIELD5": ""
  },
  {
    "id": 1293,
    "DrugName": "REVLIMID 15MG CAP",
    "DrugNdc": 59572041521,
    "DrugQty": 21,
    "FIELD5": ""
  },
  {
    "id": 1294,
    "DrugName": "REVLIMID 25MG CAP",
    "DrugNdc": 59572042521,
    "DrugQty": 21,
    "FIELD5": ""
  },
  {
    "id": 1295,
    "DrugName": "RISACAL-D 105-81-120MG-U TAB",
    "DrugNdc": 64980015001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1296,
    "DrugName": "risperiDONE 0.25MG TAB",
    "DrugNdc": 27241000250,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 1297,
    "DrugName": "risperiDONE 0.5MG TAB",
    "DrugNdc": 68382011305,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 1298,
    "DrugName": "risperiDONE 0.5MG TAB",
    "DrugNdc": 43547034050,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 1299,
    "DrugName": "risperiDONE 1MG TAB",
    "DrugNdc": 13668003705,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 1300,
    "DrugName": "risperiDONE 1MG TAB",
    "DrugNdc": 68382011405,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 1301,
    "DrugName": "risperiDONE 2MG TAB",
    "DrugNdc": 43547034250,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 1302,
    "DrugName": "RisperiDONE* 3MG TAB",
    "DrugNdc": 68382011605,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 1303,
    "DrugName": "RITUXAN 10MG/ML INJ",
    "DrugNdc": 50242005121,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 1304,
    "DrugName": "RITUXAN 10MG/ML INJ",
    "DrugNdc": 50242005306,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 1305,
    "DrugName": "RIZATRIPTAN BENZOATE 10MG TAB",
    "DrugNdc": 68462046640,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 1306,
    "DrugName": "RIZATRIPTAN BENZOATE 10MG TAB",
    "DrugNdc": 68462046699,
    "DrugQty": 18,
    "FIELD5": ""
  },
  {
    "id": 1307,
    "DrugName": "RIZATRIPTAN BENZOATE 5MG ODT",
    "DrugNdc": 65862062590,
    "DrugQty": 9,
    "FIELD5": ""
  },
  {
    "id": 1308,
    "DrugName": "ROBAFEN DM 10-100MG/5ML LIQ",
    "DrugNdc": 904630620,
    "DrugQty": 118,
    "FIELD5": ""
  },
  {
    "id": 1309,
    "DrugName": "ROBAFEN* 100MG/5ML LIQ",
    "DrugNdc": 904006116,
    "DrugQty": 480,
    "FIELD5": ""
  },
  {
    "id": 1310,
    "DrugName": "ROPINIRole HCL* 0.5MG TAB",
    "DrugNdc": 62332003131,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1311,
    "DrugName": "ROSUVASTATIN CALCIUM 10MG TAB",
    "DrugNdc": 781540192,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1312,
    "DrugName": "ROSUVASTATIN CALCIUM 10MG TAB",
    "DrugNdc": 31722088390,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1313,
    "DrugName": "ROSUVASTATIN CALCIUM 10MG TAB",
    "DrugNdc": 57237016990,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1314,
    "DrugName": "ROSUVASTATIN CALCIUM 20MG TAB",
    "DrugNdc": 781540292,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1315,
    "DrugName": "ROSUVASTATIN CALCIUM 5MG TAB",
    "DrugNdc": 31722088290,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1316,
    "DrugName": "ROSUVASTATIN CALCIUM* 20MG TAB",
    "DrugNdc": 57237017090,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1317,
    "DrugName": "RUGBY NICOTINE GUM 2MG GUM",
    "DrugNdc": 536302934,
    "DrugQty": 20,
    "FIELD5": ""
  },
  {
    "id": 1318,
    "DrugName": "SANCUSO 3.1MG/24HR PAT",
    "DrugNdc": 42747072601,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 1319,
    "DrugName": "SANDOSTATIN LAR DEPO 10MG KIT",
    "DrugNdc": 78081181,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 1320,
    "DrugName": "SANTYL 250U/GM ONT",
    "DrugNdc": 50484001030,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1321,
    "DrugName": "SENEXON-S 50-8.6MG TAB",
    "DrugNdc": 536408601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1322,
    "DrugName": "SENNA* 8.6MG TAB",
    "DrugNdc": 904643459,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1323,
    "DrugName": "SENSIPAR 30MG TAB",
    "DrugNdc": 55513007330,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1324,
    "DrugName": "SENSIPAR 90MG TAB",
    "DrugNdc": 55513007530,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1325,
    "DrugName": "SENSIPAR* 60MG TAB",
    "DrugNdc": 55513007430,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1326,
    "DrugName": "SEROquel 100MG TAB",
    "DrugNdc": 310027110,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1327,
    "DrugName": "SEROquel 300MG TAB",
    "DrugNdc": 310027460,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1328,
    "DrugName": "SEROquel XR 300MG TER",
    "DrugNdc": 310028360,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1329,
    "DrugName": "SEROquel XR 50MG TER",
    "DrugNdc": 310028060,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1330,
    "DrugName": "SERTRALINE HCL 100MG TAB",
    "DrugNdc": 65862001330,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1331,
    "DrugName": "SERTRALINE HCL 100MG TAB",
    "DrugNdc": 68180035306,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1332,
    "DrugName": "SERTRALINE HCL 25MG TAB",
    "DrugNdc": 16729021510,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1333,
    "DrugName": "SERTRALINE HCL 25MG TAB",
    "DrugNdc": 68180035109,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1334,
    "DrugName": "SERTRALINE HCL 50MG TAB",
    "DrugNdc": 65862001230,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1335,
    "DrugName": "SERTRALINE HCL 50MG TAB",
    "DrugNdc": 68180035209,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1336,
    "DrugName": "SERTRALINE HCL* 50MG TAB",
    "DrugNdc": 65862001205,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 1337,
    "DrugName": "SETOPRESS HIGH COMPR NA EA",
    "DrugNdc": 3153504,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 1338,
    "DrugName": "SEVELAMER CARBONATE 0.8GM SPN",
    "DrugNdc": 65862093090,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1339,
    "DrugName": "SEVELAMER CARBONATE* 800MG TAB",
    "DrugNdc": 65862092127,
    "DrugQty": 270,
    "FIELD5": ""
  },
  {
    "id": 1340,
    "DrugName": "SILDENAFIL CITRATE* 20MG TAB",
    "DrugNdc": 68001017605,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1341,
    "DrugName": "SILIQ 210MG/1.5ML INJ",
    "DrugNdc": 187000402,
    "DrugQty": 2,
    "FIELD5": ""
  },
  {
    "id": 1342,
    "DrugName": "SILVADENE 1% CRM",
    "DrugNdc": 61570013120,
    "DrugQty": 20,
    "FIELD5": ""
  },
  {
    "id": 1343,
    "DrugName": "SILVADENE 1% CRM",
    "DrugNdc": 61570013185,
    "DrugQty": 85,
    "FIELD5": ""
  },
  {
    "id": 1344,
    "DrugName": "SILVER SULFADIAZINE 1% CRM",
    "DrugNdc": 67877012420,
    "DrugQty": 20,
    "FIELD5": ""
  },
  {
    "id": 1345,
    "DrugName": "SILVER SULFADIAZINE* 1% CRM",
    "DrugNdc": 67877012450,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 1346,
    "DrugName": "SILVER SULFADIAZINE* 1% CRM",
    "DrugNdc": 67877012485,
    "DrugQty": 85,
    "FIELD5": ""
  },
  {
    "id": 1347,
    "DrugName": "SILVER SULFADIAZINE* 1% CRM",
    "DrugNdc": 67877012440,
    "DrugQty": 400,
    "FIELD5": ""
  },
  {
    "id": 1348,
    "DrugName": "SIMETHICONE CHEW 80MG TAB",
    "DrugNdc": 57896079101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1349,
    "DrugName": "SIMPONI 50MG/0.5ML INJ",
    "DrugNdc": 57894007002,
    "DrugQty": 0.5,
    "FIELD5": ""
  },
  {
    "id": 1350,
    "DrugName": "SIMVASTATIN 10MG TAB",
    "DrugNdc": 31722051110,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 1351,
    "DrugName": "SIMVASTATIN 10MG TAB",
    "DrugNdc": 68180047803,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 1352,
    "DrugName": "SIMVASTATIN 20MG TAB",
    "DrugNdc": 68180047902,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1353,
    "DrugName": "SIMVASTATIN 20MG TAB",
    "DrugNdc": 68180047903,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 1354,
    "DrugName": "SIMVASTATIN 5MG TAB",
    "DrugNdc": 65862005090,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1355,
    "DrugName": "SIMVASTATIN* 20MG TAB",
    "DrugNdc": 31722051290,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1356,
    "DrugName": "SIMVASTATIN* 20MG TAB",
    "DrugNdc": 31722051210,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 1357,
    "DrugName": "SIMVASTATIN* 40MG TAB",
    "DrugNdc": 16729000615,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1358,
    "DrugName": "SIMVASTATIN* 40MG TAB",
    "DrugNdc": 31722051310,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 1359,
    "DrugName": "SIMVASTATIN* 80MG TAB",
    "DrugNdc": 31722051490,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1360,
    "DrugName": "SLOW FE 160MG (50MG IRON)* 160MG TAB",
    "DrugNdc": 79854007749,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1361,
    "DrugName": "SODIUM BICARBONATE 325MG TAB",
    "DrugNdc": 223172001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1362,
    "DrugName": "SODIUM CHLORIDE 0.9% INJ",
    "DrugNdc": 338004941,
    "DrugQty": 4800,
    "FIELD5": ""
  },
  {
    "id": 1363,
    "DrugName": "SODIUM CHLORIDE 0.9% INJ",
    "DrugNdc": 338004903,
    "DrugQty": 12000,
    "FIELD5": ""
  },
  {
    "id": 1364,
    "DrugName": "SODIUM CHLORIDE 0.9% INJ",
    "DrugNdc": 409798309,
    "DrugQty": 12000,
    "FIELD5": ""
  },
  {
    "id": 1365,
    "DrugName": "SODIUM POLYSTYRENE S POW",
    "DrugNdc": 46287001216,
    "DrugQty": 454,
    "FIELD5": ""
  },
  {
    "id": 1366,
    "DrugName": "SOFTCLIX LANCETS NA EA",
    "DrugNdc": 50924097110,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1367,
    "DrugName": "SOFTCLIX LANCETS NA EA",
    "DrugNdc": 50924098820,
    "DrugQty": 200,
    "FIELD5": ""
  },
  {
    "id": 1368,
    "DrugName": "SOTALOL HCL 80MG TAB",
    "DrugNdc": 603576921,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1369,
    "DrugName": "SOTALOL HCL 80MG TAB",
    "DrugNdc": 60505008000,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1370,
    "DrugName": "SOTALOL HCL 80MG TAB",
    "DrugNdc": 76385011401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1371,
    "DrugName": "SOVALDI 400MG TAB",
    "DrugNdc": 61958150101,
    "DrugQty": 28,
    "FIELD5": ""
  },
  {
    "id": 1372,
    "DrugName": "SPIRIVA HANDIHALER 18MCG CAP",
    "DrugNdc": 597007541,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1373,
    "DrugName": "SPIRIVA RESPIMAT 2.5MCG/INH AER",
    "DrugNdc": 597010061,
    "DrugQty": 4,
    "FIELD5": ""
  },
  {
    "id": 1374,
    "DrugName": "SPIRONOLACTONE 25MG TAB",
    "DrugNdc": 53746051101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1375,
    "DrugName": "SPIRONOLACTONE 25MG TAB",
    "DrugNdc": 53489014301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1376,
    "DrugName": "SPIRONOLACTONE 25MG TAB",
    "DrugNdc": 53746051101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1377,
    "DrugName": "SPIRONOLACTONE 50MG TAB",
    "DrugNdc": 228267211,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1378,
    "DrugName": "SPIRONOLACTONE 50MG TAB",
    "DrugNdc": 53746051401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1379,
    "DrugName": "SPIRONOLACTONE* 25MG TAB",
    "DrugNdc": 228280311,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1380,
    "DrugName": "SPRYCEL 100MG TAB",
    "DrugNdc": 3085222,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1381,
    "DrugName": "SPRYCEL 50MG TAB",
    "DrugNdc": 3052811,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1382,
    "DrugName": "STELARA 90MG/ML INJ",
    "DrugNdc": 57894006103,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 1383,
    "DrugName": "STELARA IV 130MG 130MG/26ML INJ",
    "DrugNdc": 57894005427,
    "DrugQty": 26,
    "FIELD5": ""
  },
  {
    "id": 1384,
    "DrugName": "STELARA* 45MG/0.5ML INJ",
    "DrugNdc": 57894006003,
    "DrugQty": 0.5,
    "FIELD5": ""
  },
  {
    "id": 1385,
    "DrugName": "STIMATE 1.5MG/ML SOL",
    "DrugNdc": 53687100,
    "DrugQty": 2.5,
    "FIELD5": ""
  },
  {
    "id": 1386,
    "DrugName": "STIVARGA 40MG TAB",
    "DrugNdc": 50419017103,
    "DrugQty": 84,
    "FIELD5": ""
  },
  {
    "id": 1387,
    "DrugName": "STOOL SOFTENER ES 250MG CAP",
    "DrugNdc": 536106410,
    "DrugQty": 1000,
    "FIELD5": ""
  },
  {
    "id": 1388,
    "DrugName": "STRATTERA 18MG CAP",
    "DrugNdc": 2323830,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1389,
    "DrugName": "SUCRALFATE 1GM TAB",
    "DrugNdc": 59762040101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1390,
    "DrugName": "SUCRALFATE 1GM TAB",
    "DrugNdc": 591389201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1391,
    "DrugName": "SUCRALFATE 1GM TAB",
    "DrugNdc": 93221005,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 1392,
    "DrugName": "SUDOGEST 30MG TAB",
    "DrugNdc": 904633860,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1393,
    "DrugName": "SUDOGEST 30MG TAB",
    "DrugNdc": 904505359,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1394,
    "DrugName": "SUDOGEST 60MG TAB",
    "DrugNdc": 904512559,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1395,
    "DrugName": "SULFAMETHOX/TRIME 200-40MG/5ML SUS",
    "DrugNdc": 65862049647,
    "DrugQty": 473,
    "FIELD5": ""
  },
  {
    "id": 1396,
    "DrugName": "SULFAMETHOX/TRIME 400-80MG TAB",
    "DrugNdc": 53746027101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1397,
    "DrugName": "SULFAMETHOX/TRIME DS 800-160MG TAB",
    "DrugNdc": 53746027201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1398,
    "DrugName": "SULFAMETHOX/TRIME DS 800-160MG TAB",
    "DrugNdc": 65862042001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1399,
    "DrugName": "SULFAMETHOX/TRIME DS 800-160MG TAB",
    "DrugNdc": 53746027205,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 1400,
    "DrugName": "SULINDAC 150MG TAB",
    "DrugNdc": 53489047801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1401,
    "DrugName": "SUMAtriptan NASAL* 20MG/INH AER",
    "DrugNdc": 527185943,
    "DrugQty": 6,
    "FIELD5": ""
  },
  {
    "id": 1402,
    "DrugName": "SUMAtriptan SUCCINAT * 25MG TAB",
    "DrugNdc": 65862014636,
    "DrugQty": 9,
    "FIELD5": ""
  },
  {
    "id": 1403,
    "DrugName": "SUMAtriptan SUCCINAT 25MG TAB",
    "DrugNdc": 62756052088,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1404,
    "DrugName": "SUMAtriptan SUCCINAT 50MG TAB",
    "DrugNdc": 62756052169,
    "DrugQty": 9,
    "FIELD5": ""
  },
  {
    "id": 1405,
    "DrugName": "SURE COMFORT 31G EA",
    "DrugNdc": 86227012155,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1406,
    "DrugName": "SURE COMFORT 31G* EA",
    "DrugNdc": 86227012105,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1407,
    "DrugName": "SUTENT 37.5MG CAP",
    "DrugNdc": 69083038,
    "DrugQty": 28,
    "FIELD5": ""
  },
  {
    "id": 1408,
    "DrugName": "SYMBICORT 160-4.5MCG AER",
    "DrugNdc": 186037028,
    "DrugQty": 6,
    "FIELD5": ""
  },
  {
    "id": 1409,
    "DrugName": "SYMBICORT* 160-4.5MCG AER",
    "DrugNdc": 186037020,
    "DrugQty": 10.2,
    "FIELD5": ""
  },
  {
    "id": 1410,
    "DrugName": "SYNJARDY XR 25-1000MG TER",
    "DrugNdc": 597029578,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1411,
    "DrugName": "TAB-A-VITE* 0 TAB",
    "DrugNdc": 904053060,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1412,
    "DrugName": "TACROLIMUS 0.5MG CAP",
    "DrugNdc": 16729004101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1413,
    "DrugName": "TACROLIMUS 1MG CAP",
    "DrugNdc": 16729004201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1414,
    "DrugName": "TALTZ 80MG/ML INJ",
    "DrugNdc": 2144511,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 1415,
    "DrugName": "TALTZ 80MG/ML INJ",
    "DrugNdc": 2214527,
    "DrugQty": 2,
    "FIELD5": ""
  },
  {
    "id": 1416,
    "DrugName": "TALTZ 80MG/ML INJ",
    "DrugNdc": 2144509,
    "DrugQty": 3,
    "FIELD5": ""
  },
  {
    "id": 1417,
    "DrugName": "TAMOXIFEN CITRATE 20MG TAB",
    "DrugNdc": 591247330,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1418,
    "DrugName": "TAMOXIFEN CITRATE* 10MG TAB",
    "DrugNdc": 591247218,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1419,
    "DrugName": "TAMSULOSIN HCL 0.4MG CAP",
    "DrugNdc": 57237001401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1420,
    "DrugName": "TAMSULOSIN HCL* 0.4MG CAP",
    "DrugNdc": 228299611,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1421,
    "DrugName": "TAMSULOSIN HCL* 0.4MG CAP",
    "DrugNdc": 68382013201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1422,
    "DrugName": "TARCEVA 100MG TAB",
    "DrugNdc": 50242006301,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1423,
    "DrugName": "TARCEVA 150MG TAB",
    "DrugNdc": 50242006401,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1424,
    "DrugName": "TASIGNA 150MG CAP",
    "DrugNdc": 78059287,
    "DrugQty": 112,
    "FIELD5": ""
  },
  {
    "id": 1425,
    "DrugName": "TELMISARTAN* 80MG TAB",
    "DrugNdc": 67877048484,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1426,
    "DrugName": "TEMAZEPAM 15MG CAP",
    "DrugNdc": 378401001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1427,
    "DrugName": "TEMAZEPAM 30MG CAP",
    "DrugNdc": 228207710,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1428,
    "DrugName": "TEMAZEPAM* 30MG CAP",
    "DrugNdc": 378505001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1429,
    "DrugName": "TEMODAR 100MG CAP",
    "DrugNdc": 85136603,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1430,
    "DrugName": "TEMODAR 140MG CAP",
    "DrugNdc": 85142503,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1431,
    "DrugName": "TEMODAR 20MG CAP",
    "DrugNdc": 85151903,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1432,
    "DrugName": "TEMODAR 250MG CAP",
    "DrugNdc": 85141702,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1433,
    "DrugName": "TEMOZOLOMIDE 100MG CAP",
    "DrugNdc": 16729005053,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1434,
    "DrugName": "TEMOZOLOMIDE 100MG CAP",
    "DrugNdc": 47335089280,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1435,
    "DrugName": "TEMOZOLOMIDE 140MG CAP",
    "DrugNdc": 47335092980,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1436,
    "DrugName": "TEMOZOLOMIDE 140MG CAP",
    "DrugNdc": 781269475,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1437,
    "DrugName": "TEMOZOLOMIDE 180MG CAP",
    "DrugNdc": 781269575,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1438,
    "DrugName": "TEMOZOLOMIDE 180MG CAP",
    "DrugNdc": 16729013053,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1439,
    "DrugName": "TEMOZOLOMIDE 180MG CAP",
    "DrugNdc": 16729013054,
    "DrugQty": 14,
    "FIELD5": ""
  },
  {
    "id": 1440,
    "DrugName": "TEMOZOLOMIDE 20MG CAP",
    "DrugNdc": 16729004953,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1441,
    "DrugName": "TEMOZOLOMIDE 20MG CAP",
    "DrugNdc": 47335089180,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1442,
    "DrugName": "TEMOZOLOMIDE 20MG CAP",
    "DrugNdc": 47335089121,
    "DrugQty": 14,
    "FIELD5": ""
  },
  {
    "id": 1443,
    "DrugName": "TEMOZOLOMIDE 250MG CAP",
    "DrugNdc": 16729005153,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1444,
    "DrugName": "TEMOZOLOMIDE 250MG CAP",
    "DrugNdc": 781269675,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1445,
    "DrugName": "TERAZOSIN HCL 10MG CAP",
    "DrugNdc": 59746038606,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1446,
    "DrugName": "TERAZOSIN HCL 1MG CAP",
    "DrugNdc": 59746038306,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1447,
    "DrugName": "TERAZOSIN HCL 5MG CAP",
    "DrugNdc": 59746038506,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1448,
    "DrugName": "TERBINAFINE 250MG TAB",
    "DrugNdc": 69097085902,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1449,
    "DrugName": "THEOPHYLLINE 200MG TER",
    "DrugNdc": 50111048201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1450,
    "DrugName": "THIORIDAZINE HCL 100MG TAB",
    "DrugNdc": 378061801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1451,
    "DrugName": "TIMOLOL MALEATE 0.5% SOL",
    "DrugNdc": 64980051401,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 1452,
    "DrugName": "TIMOLOL MALEATE 0.5% SOL",
    "DrugNdc": 61314022715,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 1453,
    "DrugName": "TIMOLOL MALEATE* 0.5% SOL",
    "DrugNdc": 61314022705,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1454,
    "DrugName": "TIMOLOL MALEATE* 0.5% SOL",
    "DrugNdc": 61314022710,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 1455,
    "DrugName": "TIMOLOL MALEATE^ 0.5% SOL",
    "DrugNdc": 64980051415,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 1456,
    "DrugName": "TOBRADEX 0.1-0.3% ONT",
    "DrugNdc": 65064835,
    "DrugQty": 3.5,
    "FIELD5": ""
  },
  {
    "id": 1457,
    "DrugName": "TOBRAMYCIN* 0.3% SOL",
    "DrugNdc": 17478029010,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1458,
    "DrugName": "TOBRAMYCIN/DEXAMETHA 0.3-0.1% SUS",
    "DrugNdc": 24208029525,
    "DrugQty": 2.5,
    "FIELD5": ""
  },
  {
    "id": 1459,
    "DrugName": "TOLTERODINE TART. ER 4MG CER",
    "DrugNdc": 93716456,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1460,
    "DrugName": "TOPAMAX* 200MG TAB",
    "DrugNdc": 50458064265,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1461,
    "DrugName": "TOPIRAMATE 100MG TAB",
    "DrugNdc": 68382014014,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1462,
    "DrugName": "TOPIRAMATE 200MG TAB",
    "DrugNdc": 68462011060,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1463,
    "DrugName": "TOPIRAMATE 25MG TAB",
    "DrugNdc": 68462010860,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1464,
    "DrugName": "TOPIRAMATE 25MG TAB",
    "DrugNdc": 68382013814,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1465,
    "DrugName": "TOPIRAMATE 50MG TAB",
    "DrugNdc": 68462015360,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1466,
    "DrugName": "TOPIRAMATE* 100MG TAB",
    "DrugNdc": 68462010960,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1467,
    "DrugName": "TOPROL XL 100MG TER",
    "DrugNdc": 186109205,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1468,
    "DrugName": "TORSEMIDE 10MG TAB",
    "DrugNdc": 31722053001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1469,
    "DrugName": "TORSEMIDE 20MG TAB",
    "DrugNdc": 31722053101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1470,
    "DrugName": "TORSEMIDE 20MG TAB",
    "DrugNdc": 57237014001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1471,
    "DrugName": "TORSEMIDE 5MG TAB",
    "DrugNdc": 31722052901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1472,
    "DrugName": "TOTAL B WITH C CAP",
    "DrugNdc": 30904026013,
    "DrugQty": 130,
    "FIELD5": ""
  },
  {
    "id": 1473,
    "DrugName": "TOUJEO SOLOSTAR* 300U/ML INJ",
    "DrugNdc": 24586903,
    "DrugQty": 4.5,
    "FIELD5": ""
  },
  {
    "id": 1474,
    "DrugName": "TOVIAZ 4MG TER",
    "DrugNdc": 69024230,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1475,
    "DrugName": "TOVIAZ 8MG TER",
    "DrugNdc": 69024430,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1476,
    "DrugName": "TRADJENTA* 5MG TAB",
    "DrugNdc": 597014030,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1477,
    "DrugName": "TraMADOL HCL* 50MG TAB",
    "DrugNdc": 57664037708,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1478,
    "DrugName": "TRAVATAN Z* 0.004% SOL",
    "DrugNdc": 65026025,
    "DrugQty": 2.5,
    "FIELD5": ""
  },
  {
    "id": 1479,
    "DrugName": "trAZODone HCL 100MG TAB",
    "DrugNdc": 50111043401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1480,
    "DrugName": "trAZODone HCL 150MG TAB",
    "DrugNdc": 50111044101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1481,
    "DrugName": "trAZODone HCL 50MG TAB",
    "DrugNdc": 60505265305,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 1482,
    "DrugName": "trAZODone HCL 50MG TAB",
    "DrugNdc": 50111043302,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 1483,
    "DrugName": "TREANDA 100MG/20ML INJ",
    "DrugNdc": 63459039120,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 1484,
    "DrugName": "TREMFYA 100MG/ML PFS 100MG INJ",
    "DrugNdc": 57894064001,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 1485,
    "DrugName": "TRESIBA U-200* 200U/ML INJ",
    "DrugNdc": 169255013,
    "DrugQty": 9,
    "FIELD5": ""
  },
  {
    "id": 1486,
    "DrugName": "TRIAMCINOLONE ACETON 0.025% CRM",
    "DrugNdc": 45802006336,
    "DrugQty": 80,
    "FIELD5": ""
  },
  {
    "id": 1487,
    "DrugName": "TRIAMCINOLONE ACETON 0.025% ONT",
    "DrugNdc": 713022915,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 1488,
    "DrugName": "TRIAMCINOLONE ACETON 0.025% ONT",
    "DrugNdc": 45802005435,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 1489,
    "DrugName": "TRIAMCINOLONE ACETON 0.1% CRM",
    "DrugNdc": 45802006435,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 1490,
    "DrugName": "TRIAMCINOLONE ACETON 0.1% CRM",
    "DrugNdc": 713022515,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 1491,
    "DrugName": "TRIAMCINOLONE ACETON 0.1% CRM",
    "DrugNdc": 51672128202,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1492,
    "DrugName": "TRIAMCINOLONE ACETON 0.1% CRM",
    "DrugNdc": 45802006436,
    "DrugQty": 80,
    "FIELD5": ""
  },
  {
    "id": 1493,
    "DrugName": "TRIAMCINOLONE ACETON 0.1% CRM",
    "DrugNdc": 67877025145,
    "DrugQty": 454,
    "FIELD5": ""
  },
  {
    "id": 1494,
    "DrugName": "TRIAMCINOLONE ACETON 0.1% ONT",
    "DrugNdc": 168000615,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 1495,
    "DrugName": "TRIAMCINOLONE ACETON 0.1% PAS",
    "DrugNdc": 713065540,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1496,
    "DrugName": "TRIAMCINOLONE ACETON 0.5% ONT",
    "DrugNdc": 52565004815,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 1497,
    "DrugName": "TRIAMCINOLONE ACETON* 0.1% CRM",
    "DrugNdc": 51672128202,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1498,
    "DrugName": "TRIAMCINOLONE ACETON* 0.1% ONT",
    "DrugNdc": 51672128402,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1499,
    "DrugName": "TRIAMCINOLONE ACETON* 0.5% CRM",
    "DrugNdc": 45802006535,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 1500,
    "DrugName": "TRIAMCINOLONE ACETON* 0.5% CRM",
    "DrugNdc": 168000215,
    "DrugQty": 15,
    "FIELD5": ""
  },
  {
    "id": 1501,
    "DrugName": "TRIAMTERENE/HCTZ 37.5-25MG CAP",
    "DrugNdc": 781207401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1502,
    "DrugName": "TRIAMTERENE/HCTZ 37.5-25MG CAP",
    "DrugNdc": 378253701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1503,
    "DrugName": "TRIAMTERENE/HCTZ 37.5-25MG CAP",
    "DrugNdc": 378253701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1504,
    "DrugName": "TRIAMTERENE/HCTZ 37.5-25MG TAB",
    "DrugNdc": 68001032700,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1505,
    "DrugName": "TRIAZOLAM 0.125MG TAB",
    "DrugNdc": 59762371704,
    "DrugQty": 10,
    "FIELD5": ""
  },
  {
    "id": 1506,
    "DrugName": "TRIAZOLAM* 0.25MG TAB",
    "DrugNdc": 59762371809,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1507,
    "DrugName": "TRICOR 145MG TAB",
    "DrugNdc": 74612390,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1508,
    "DrugName": "TRIHEXYPHENIDYL HCL 2MG TAB",
    "DrugNdc": 16571016010,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1509,
    "DrugName": "TRILEPTAL 300MG TAB",
    "DrugNdc": 78033705,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1510,
    "DrugName": "TRILEPTAL* 300MG TAB",
    "DrugNdc": 78033705,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1511,
    "DrugName": "TRINESSA TAB",
    "DrugNdc": 52544024828,
    "DrugQty": 168,
    "FIELD5": ""
  },
  {
    "id": 1512,
    "DrugName": "TRUE METRIX SELF MON EA",
    "DrugNdc": 56151147603,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 1513,
    "DrugName": "TRUE METRIX TEST STR EA",
    "DrugNdc": 56151146003,
    "DrugQty": 25,
    "FIELD5": ""
  },
  {
    "id": 1514,
    "DrugName": "TRUE METRIX TEST STR EA",
    "DrugNdc": 56151146004,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 1515,
    "DrugName": "TRUE METRIX TEST STR EA",
    "DrugNdc": 56151146001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1516,
    "DrugName": "TRUEPLUS INSULIN SYR EA",
    "DrugNdc": 56151172201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1517,
    "DrugName": "TRUEPLUS LANCET EA",
    "DrugNdc": 56151014260,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1518,
    "DrugName": "TRULANCE 3MG TAB",
    "DrugNdc": 70194000330,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1519,
    "DrugName": "TRULICITY 1.5MG/0.5ML INJ",
    "DrugNdc": 2143480,
    "DrugQty": 2,
    "FIELD5": ""
  },
  {
    "id": 1520,
    "DrugName": "TRULICITY* 0.75MG/0.5ML INJ",
    "DrugNdc": 2143380,
    "DrugQty": 2,
    "FIELD5": ""
  },
  {
    "id": 1521,
    "DrugName": "TUMS E-X 750MG TAB",
    "DrugNdc": 766738896,
    "DrugQty": 96,
    "FIELD5": ""
  },
  {
    "id": 1522,
    "DrugName": "TYKERB 250MG TAB",
    "DrugNdc": 78067119,
    "DrugQty": 150,
    "FIELD5": ""
  },
  {
    "id": 1523,
    "DrugName": "TYLENOL/CODEINE#2 15-300MG TAB",
    "DrugNdc": 45051160,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1524,
    "DrugName": "TYLENOL/CODEINE#4 60-300MG TAB",
    "DrugNdc": 50458051570,
    "DrugQty": 500,
    "FIELD5": ""
  },
  {
    "id": 1525,
    "DrugName": "ULORIC 40MG TAB",
    "DrugNdc": 64764091830,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1526,
    "DrugName": "ULORIC 80MG TAB",
    "DrugNdc": 64764067730,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1527,
    "DrugName": "ULTICARE PEN NEEDLE 4MM 32G INJ",
    "DrugNdc": 8222095435,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1528,
    "DrugName": "ULTICARE PEN NEEDLES EA",
    "DrugNdc": 8222095633,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1529,
    "DrugName": "ULTICARE PEN NEEDLES EA",
    "DrugNdc": 8222095831,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1530,
    "DrugName": "ULTICARE PEN NEEDLES EA",
    "DrugNdc": 8222095633,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1531,
    "DrugName": "ULTICARE SYR .3ML 31 EA",
    "DrugNdc": 8222094391,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1532,
    "DrugName": "ULTICARE SYR .5ML 29 EA",
    "DrugNdc": 8222092595,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1533,
    "DrugName": "ULTICARE SYR .5ML 30 EA",
    "DrugNdc": 8222093554,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1534,
    "DrugName": "ULTICARE SYR .5ML 31 EA",
    "DrugNdc": 8222094599,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1535,
    "DrugName": "ULTICARE SYR 1ML 29G EA",
    "DrugNdc": 8222092199,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1536,
    "DrugName": "ULTICARE SYR 1ML 30G EA",
    "DrugNdc": 8222093158,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1537,
    "DrugName": "ULTICARE SYR 1ML 31G EA",
    "DrugNdc": 8222094193,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1538,
    "DrugName": "ULTICARE SYRINGE 5/16 31GX1/2CC 31GX1/2CC",
    "DrugNdc": 57515094599,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1539,
    "DrugName": "ULTRACET 325-37.5MG TAB",
    "DrugNdc": 50458065060,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1540,
    "DrugName": "UNISOM SLEEPMELTS 25MG TAB",
    "DrugNdc": 4116700140,
    "DrugQty": 24,
    "FIELD5": ""
  },
  {
    "id": 1541,
    "DrugName": "valACYclovir HCL 1GM TAB",
    "DrugNdc": 378427693,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1542,
    "DrugName": "valACYclovir HCL 500MG TAB",
    "DrugNdc": 31722070430,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1543,
    "DrugName": "ValACYclovir HCL* 1GM TAB",
    "DrugNdc": 65862044930,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1544,
    "DrugName": "VALCYTE 450MG TAB",
    "DrugNdc": 4003822,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1545,
    "DrugName": "VALERIAN 500MG CAP",
    "DrugNdc": 7985461090,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1546,
    "DrugName": "valGANciclovir HCL 450MG TAB",
    "DrugNdc": 55111076260,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1547,
    "DrugName": "VALPROIC ACID 250MG CAP",
    "DrugNdc": 591401201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1548,
    "DrugName": "VALSARTAN 160MG TAB",
    "DrugNdc": 43547036909,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1549,
    "DrugName": "VALSARTAN 40MG TAB",
    "DrugNdc": 43547036703,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1550,
    "DrugName": "VALSARTAN* 320MG TAB",
    "DrugNdc": 43547037009,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1551,
    "DrugName": "VALSARTAN* 80MG TAB",
    "DrugNdc": 43547036809,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1552,
    "DrugName": "VALSARTAN/HCTZ 160-12.5MG TAB",
    "DrugNdc": 43547031209,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1553,
    "DrugName": "VALSARTAN/HCTZ 160-12.5MG TAB",
    "DrugNdc": 591231619,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1554,
    "DrugName": "VARUBI 90MG TAB",
    "DrugNdc": 69656010102,
    "DrugQty": 2,
    "FIELD5": ""
  },
  {
    "id": 1555,
    "DrugName": "VASCEPA* 1GM CAP",
    "DrugNdc": 52937000120,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 1556,
    "DrugName": "VEGETABLE FIBER 33% SPN",
    "DrugNdc": 24385030127,
    "DrugQty": 390,
    "FIELD5": ""
  },
  {
    "id": 1557,
    "DrugName": "VELPHORO 500MG TAB",
    "DrugNdc": 49230064551,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1558,
    "DrugName": "VEMLIDY 25MG TAB",
    "DrugNdc": 61958230101,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1559,
    "DrugName": "VENLAFAXINE HCL 75MG TAB",
    "DrugNdc": 65162030709,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1560,
    "DrugName": "VENLAFAXINE HCL 75MG TAB",
    "DrugNdc": 57664039588,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1561,
    "DrugName": "VENLAFAXINE HCL XR 150MG CER",
    "DrugNdc": 65862069790,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1562,
    "DrugName": "VENLAFAXINE HCL XR 37.5MG CER",
    "DrugNdc": 68382003406,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1563,
    "DrugName": "VENLAFAXINE HCL XR 75MG CER",
    "DrugNdc": 65862052830,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1564,
    "DrugName": "VENLAFAXINE HCL XR* 150MG CER",
    "DrugNdc": 68382003606,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1565,
    "DrugName": "VENOFER 20MG/ML INJ",
    "DrugNdc": 517231005,
    "DrugQty": 50,
    "FIELD5": ""
  },
  {
    "id": 1566,
    "DrugName": "VENTOLIN HFA* 90MCG/INH AER",
    "DrugNdc": 173068220,
    "DrugQty": 18,
    "FIELD5": ""
  },
  {
    "id": 1567,
    "DrugName": "VERAPAMIL HCL 80MG TAB",
    "DrugNdc": 591034301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1568,
    "DrugName": "VERSACLOZ 50MG/ML SUS",
    "DrugNdc": 18860012101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1569,
    "DrugName": "VESICARE 5MG TAB",
    "DrugNdc": 51248015001,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1570,
    "DrugName": "VICTOZA PEN* 6MG/ML INJ",
    "DrugNdc": 169406012,
    "DrugQty": 6,
    "FIELD5": ""
  },
  {
    "id": 1571,
    "DrugName": "VICTOZA PEN* 6MG/ML INJ",
    "DrugNdc": 169406013,
    "DrugQty": 9,
    "FIELD5": ""
  },
  {
    "id": 1572,
    "DrugName": "VIMPAT 150MG TAB",
    "DrugNdc": 131247935,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1573,
    "DrugName": "VIMPAT* 100MG TAB",
    "DrugNdc": 131247835,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1574,
    "DrugName": "VIMPAT* 200MG TAB",
    "DrugNdc": 131248035,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1575,
    "DrugName": "VIRACEPT 250MG TAB",
    "DrugNdc": 63010001030,
    "DrugQty": 300,
    "FIELD5": ""
  },
  {
    "id": 1576,
    "DrugName": "VIREAD* 300MG TAB",
    "DrugNdc": 61958040101,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1577,
    "DrugName": "VITAMIN B COMPLEX CAP",
    "DrugNdc": 79854200800,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1578,
    "DrugName": "VITAMIN B COMPLEX CAP",
    "DrugNdc": 35046000131,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1579,
    "DrugName": "VITAMIN B1 100MG TAB",
    "DrugNdc": 904054460,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1580,
    "DrugName": "VITAMIN B12 1000MCG TAB",
    "DrugNdc": 11845009661,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1581,
    "DrugName": "VITAMIN B12* 1000MCG TAB",
    "DrugNdc": 536355601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1582,
    "DrugName": "VITAMIN B12* 100MCG TAB",
    "DrugNdc": 536354201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1583,
    "DrugName": "VITAMIN B-2 100MGT TAB",
    "DrugNdc": 7985420195,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1584,
    "DrugName": "VITAMIN B6 50MG TAB",
    "DrugNdc": 904052060,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1585,
    "DrugName": "VITAMIN B-6 TAB",
    "DrugNdc": 8770140730,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1586,
    "DrugName": "VITAMIN B-60 50MG TAB",
    "DrugNdc": 30904052060,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1587,
    "DrugName": "VITAMIN C 250MG TAB",
    "DrugNdc": 35789683101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1588,
    "DrugName": "VITAMIN C 500MG TAB",
    "DrugNdc": 904052360,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1589,
    "DrugName": "VITAMIN C* 500MG TAB",
    "DrugNdc": 536329201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1590,
    "DrugName": "VITAMIN D* 50000IU CAP",
    "DrugNdc": 64380073706,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1591,
    "DrugName": "VITAMIN D3 1000IU TAB",
    "DrugNdc": 90904582460,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1592,
    "DrugName": "VITAMIN D3 2000IU CAP",
    "DrugNdc": 536379001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1593,
    "DrugName": "VITAMIN D3 2000IU TAB",
    "DrugNdc": 904615760,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1594,
    "DrugName": "VITAMIN D3 400 UNIT TABLETS TAB",
    "DrugNdc": 63551595917,
    "DrugQty": null,
    "FIELD5": ""
  },
  {
    "id": 1595,
    "DrugName": "VITAMIN D3 50000IU CAP",
    "DrugNdc": 75834002012,
    "DrugQty": 12,
    "FIELD5": ""
  },
  {
    "id": 1596,
    "DrugName": "VITAMIN D3 5000IU CAP",
    "DrugNdc": 904598660,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1597,
    "DrugName": "VITAMIN D3* 1000IU TAB",
    "DrugNdc": 904582460,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1598,
    "DrugName": "VITAMIN D3* 2000IU CAP",
    "DrugNdc": 536379001,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1599,
    "DrugName": "VITAMIN D3* 400IU TAB",
    "DrugNdc": 904582360,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1600,
    "DrugName": "VOL-CARE RX* TAB",
    "DrugNdc": 13811051510,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1601,
    "DrugName": "VOLTAREN GEL* 1% GEL",
    "DrugNdc": 63481068447,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1602,
    "DrugName": "VOSEVI 400-100-100MG TAB",
    "DrugNdc": 61958240101,
    "DrugQty": 28,
    "FIELD5": ""
  },
  {
    "id": 1603,
    "DrugName": "VOTRIENT 200MG TAB",
    "DrugNdc": 173080409,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 1604,
    "DrugName": "VOTRIENT 200MG TAB",
    "DrugNdc": 78067066,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 1605,
    "DrugName": "WARFARIN SODIUM 1MG TAB",
    "DrugNdc": 93171201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1606,
    "DrugName": "WARFARIN SODIUM 2.5MG TAB",
    "DrugNdc": 93171401,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1607,
    "DrugName": "WARFARIN SODIUM 2MG TAB",
    "DrugNdc": 93171301,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1608,
    "DrugName": "WARFARIN SODIUM 4MG TAB",
    "DrugNdc": 93171601,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1609,
    "DrugName": "WARFARIN SODIUM 6MG TAB",
    "DrugNdc": 93171801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1610,
    "DrugName": "WARFARIN SODIUM 7.5MG TAB",
    "DrugNdc": 93171901,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1611,
    "DrugName": "WARFARIN SODIUM* 3MG TAB",
    "DrugNdc": 93171501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1612,
    "DrugName": "WARFARIN SODIUM* 5MG TAB",
    "DrugNdc": 93172101,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1613,
    "DrugName": "WELLBUTRIN SR 100MG TER",
    "DrugNdc": 173094755,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1614,
    "DrugName": "WELLBUTRIN XL 150MG TER",
    "DrugNdc": 187073030,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1615,
    "DrugName": "XALKORI 250MG CAP",
    "DrugNdc": 69814020,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1616,
    "DrugName": "XARELTO 10MG TAB",
    "DrugNdc": 50458058030,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1617,
    "DrugName": "XARELTO 10MG TAB",
    "DrugNdc": 50458058090,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1618,
    "DrugName": "XARELTO* 15MG TAB",
    "DrugNdc": 50458057830,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1619,
    "DrugName": "XARELTO* 20MG TAB",
    "DrugNdc": 50458057930,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1620,
    "DrugName": "XELJANZ 5MG TAB",
    "DrugNdc": 69100101,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1621,
    "DrugName": "XELJANZ XR* 11MG TER",
    "DrugNdc": 69050130,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1622,
    "DrugName": "XELODA 150MG TAB",
    "DrugNdc": 4110020,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1623,
    "DrugName": "XELODA 500MG TAB",
    "DrugNdc": 4110150,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 1624,
    "DrugName": "XGEVA 120MG/1.7ML INJ",
    "DrugNdc": 55513073001,
    "DrugQty": 1.7,
    "FIELD5": ""
  },
  {
    "id": 1625,
    "DrugName": "XIFAXAN 200MG TAB",
    "DrugNdc": 65649030103,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1626,
    "DrugName": "XIFAXAN 550MG TAB",
    "DrugNdc": 65649030304,
    "DrugQty": 42,
    "FIELD5": ""
  },
  {
    "id": 1627,
    "DrugName": "XIFAXAN 550MG TAB",
    "DrugNdc": 65649030303,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1628,
    "DrugName": "XIFAXAN 550MG TAB",
    "DrugNdc": 65649030302,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1629,
    "DrugName": "XTANDI 40MG CAP",
    "DrugNdc": 469012599,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 1630,
    "DrugName": "XULANE 150-35MCG PAT",
    "DrugNdc": 378334053,
    "DrugQty": 3,
    "FIELD5": ""
  },
  {
    "id": 1631,
    "DrugName": "XYZAL 5MG TAB",
    "DrugNdc": 50474092090,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1632,
    "DrugName": "ZALEPLON 10MG CAP",
    "DrugNdc": 29300013201,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1633,
    "DrugName": "ZARXIO 300MCG/0.5ML INJ",
    "DrugNdc": 61314030401,
    "DrugQty": 0.5,
    "FIELD5": ""
  },
  {
    "id": 1634,
    "DrugName": "ZARXIO 300MCG/0.5ML INJ",
    "DrugNdc": 61314030410,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1635,
    "DrugName": "ZARXIO 480MCG/0.8ML INJ",
    "DrugNdc": 61314031201,
    "DrugQty": 0.8,
    "FIELD5": ""
  },
  {
    "id": 1636,
    "DrugName": "ZARXIO 480MCG/0.8ML INJ",
    "DrugNdc": 61314031210,
    "DrugQty": 8,
    "FIELD5": ""
  },
  {
    "id": 1637,
    "DrugName": "ZEASORB POW",
    "DrugNdc": 7346215045,
    "DrugQty": 70.9,
    "FIELD5": ""
  },
  {
    "id": 1638,
    "DrugName": "ZEJULA 100MG CAP",
    "DrugNdc": 69656010390,
    "DrugQty": 90,
    "FIELD5": ""
  },
  {
    "id": 1639,
    "DrugName": "ZENPEP* 15000-51000-82000U CER",
    "DrugNdc": 42865030202,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1640,
    "DrugName": "ZEPATIER 100-50MG TAB",
    "DrugNdc": 6307402,
    "DrugQty": 28,
    "FIELD5": ""
  },
  {
    "id": 1641,
    "DrugName": "ZINC OXIDE 20% ONT",
    "DrugNdc": 168006202,
    "DrugQty": 56.7,
    "FIELD5": ""
  },
  {
    "id": 1642,
    "DrugName": "ZIPRASIDONE HCL 40MG CAP",
    "DrugNdc": 55111025760,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1643,
    "DrugName": "ZIPRASIDONE HCL 60MG CAP",
    "DrugNdc": 378735291,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1644,
    "DrugName": "ZIPRASIDONE HCL 80MG CAP",
    "DrugNdc": 68180033407,
    "DrugQty": 60,
    "FIELD5": ""
  },
  {
    "id": 1645,
    "DrugName": "ZOCOR 10MG TAB",
    "DrugNdc": 6073531,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1646,
    "DrugName": "ZOFRAN 4MG TAB",
    "DrugNdc": 173044600,
    "DrugQty": 30,
    "FIELD5": ""
  },
  {
    "id": 1647,
    "DrugName": "ZOFRAN 8MG TAB",
    "DrugNdc": 54569487200,
    "DrugQty": 9,
    "FIELD5": ""
  },
  {
    "id": 1648,
    "DrugName": "ZOLADEX 10.8MG IMP",
    "DrugNdc": 310095130,
    "DrugQty": 1,
    "FIELD5": ""
  },
  {
    "id": 1649,
    "DrugName": "ZOLEDRONIC ACID 4MG/5ML INJ",
    "DrugNdc": 23155017031,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1650,
    "DrugName": "ZOLPIDEM TARTRATE 5MG TAB",
    "DrugNdc": 781531701,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1651,
    "DrugName": "ZOLPIDEM TARTRATE 5MG TAB",
    "DrugNdc": 378530501,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1652,
    "DrugName": "ZOLPIDEM TARTRATE* 10MG TAB",
    "DrugNdc": 13668000801,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1653,
    "DrugName": "ZONISAMIDE* 100MG CAP",
    "DrugNdc": 62756026002,
    "DrugQty": 100,
    "FIELD5": ""
  },
  {
    "id": 1654,
    "DrugName": "ZOVIRAX* 5% CRM",
    "DrugNdc": 187099445,
    "DrugQty": 5,
    "FIELD5": ""
  },
  {
    "id": 1655,
    "DrugName": "ZYKADIA 150MG CAP",
    "DrugNdc": 78064070,
    "DrugQty": 70,
    "FIELD5": ""
  },
  {
    "id": 1656,
    "DrugName": "ZYTIGA 250MG TAB",
    "DrugNdc": 57894015012,
    "DrugQty": 120,
    "FIELD5": ""
  },
  {
    "id": 1657,
    "DrugName": "Zytiga 500MG TAB",
    "DrugNdc": 57894019506,
    "DrugQty": 60,
    "FIELD5": ""
  }
//   ...
];
 
// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
 
  return inputLength === 0 ? [] : languages.filter(lang =>
    lang.DrugName.toLowerCase().slice(0, inputLength) === inputValue
  );
};
 
// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.DrugName;
 
// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.DrugName}
  </div>
);
 
class Example extends React.Component {
  constructor() {
    super();
 
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  componentDidMount() {
    const loginToken = window.localStorage.getItem("token");
        axios.get('api/medications/search/', { headers: { "Authorization": "Bearer " + loginToken } })
          .then((resp) => {
            console.log(resp);
            console.log(resp.data);
            console.log(resp.data.medications);
            this.setState({
                medications: resp.data
            })
           
          }).catch((error) => {
            console.error(error);
        })
       
      }
 
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
 
  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };
 
  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
 
  render() {
    const { value, suggestions } = this.state;
 
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type a medication',
      value,
      onChange: this.onChange
    };
 
    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default Example;