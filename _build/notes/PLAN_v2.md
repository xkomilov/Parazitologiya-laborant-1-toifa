# v2 reja (foydalanuvchi talabi, 2026-11-12)
- Kutubxona: https://xayrullokomilov.uz/api/materiallar/{id} -> JSON .matn (OCR matn). Fayl: /api/materiallar/{id}/fayl
- Matnlar: lib/txt/{id}.txt ; ro'yxat lib/para.json, lib/extra.json
- clean.py bajarildi (taqiqlangan bo'limlar/jumlalar o'chirildi). md_backup_v1 = eski holat.
- Har maqolaga "## <mahalliy mavzu>" bo'limi qo'shiladi (addsec.py), manba Adabiyotlarga qo'shiladi (addref.py).
- Guruhlar: G1 bezgak 14-44 (1523,1547,2104-2110,1605) | G2 leysh 45-65 (1524,1597) | G3 chivin 66-67 | G4 KQT 68-75 (1519)
  G5 gelmint 4-12,76-127,139-147 (1525,1521,1522,1607,2702,1053) | G6 protozoy 128-138 (1520) | G7 umumiy 1-3,13,147 (432,398,486,265,321) | G8 148-149 (896,897,119)
- Holat: (yangilab boriladi)
- [x] clean.py, clean2.py (meta), first-person cleanup — barcha 149 da bajarildi
- [x] G1 bezgak 14-44: mahalliy bo'limlar qo'shildi (notes_bezgak.md). 22/23 Xulosa yangilandi.
- [x] G2 leysh 45-67, G4 KQT 68-75, umumiy 4-12, 76-82 bajarildi (addsec + applyloc). notes_*.md fayllarida manbalar.
- [ ] Qoldi: 1-3, 13, 83-127, 128-149. Keyin: bld.sh (QISQA yo'qligi), final.sh, verify.py (sarlavha, apostrof, "esse"/"imtihon" yo'qligi, taqiqlangan bo'limlar yo'qligi), changelog, commit, PR.
- Qo'shimcha manbalar: 404 (SSV 43-son, VMQ 9-son 2015), 1559/1560 davolash bayonnomalari (166-son), 2737/2736 darsliklar.
