# Seans o'zgarishlari jurnali (1-toifa laborant, 149 mavzu)

## 2026-11-11 — Yangi seans: 1-toifa laborant, 149 mavzuni qayta yozish
- Manba: `Мавзу1.zip` — 149 ta mavzu (001–149.docx). `shablon.xlsx` (Question, A–E, Correct, Comment) test shabloni, mavzu emas. Foydalanuvchi 149 ta deb tasdiqladi.
- Rol: parazitologiya laboranti, 1-toifa. So'z hisobi: sarlavha va adabiyotlar kirmaydi, minimum 800 (foydalanuvchi tasdiqladi).
- Kutubxona: https://xayrullokomilov.uz/kutubxona — sahifa JavaScript orqali yuklanadi, hujjatlar ro'yxati o'qilmadi; faqat ochiq xalqaro manbalar ishlatildi.
- Eski fayllar audit natijasi: 0/149 fayl 800 so'zga yetgan (eng ko'pi ~490), "Kirish" yo'q, 006–086 da havola yo'q va adabiyot o'rniga "veb-qidiruv natijalari" yozilgan, sarlavhalar `001.` ko'rinishida (nol bilan), apostroflar aralash.
- Foydalanuvchi talabi: esse uslubi; havola abzats oxirida.
- Qoida: sarlavha `N. Mavzu nomi` (nolsiz, birinchi harf bosh harf, manba matni saqlangan); adabiyotda «Tekshiruv holati» ko'rsatiladi; havolalar abzats oxirida birlashtirib `[1, 2]`.
- Builder o'zgarishi: `_build/tools/build_docx.js` da `[1, 2]` va `[1-3]` shaklidagi guruhli havolalar qabul qilinadi (asl builder faqat `[n]` ni tanir edi).
- 1-partiya (001–010) yozildi: 821–842 so'z, hammasi builder bo'yicha OK.

## 2026-11-11 — Yakuniy holat: 001–149 tayyor
- Barcha 149 esse yozildi va qurildi (`Мавзу/001.docx … 149.docx`), arxiv: `Мавзу.zip`.
- Mustaqil tekshiruv (Python): 149/149 faylda sarlavha `N. …` ko'rinishida, apostrof faqat `'`, punktuatsiyali markerlar yo'q, har birida "Kirish", abzats oxirida `[n]` havolalar va "Foydalanilgan adabiyotlar" bor. Asosiy matn: eng kam 800, eng ko'p 898 so'z.
- Qoida o'zgarishi (foydalanuvchi tasdig'i): adabiyotda "Tekshiruv holati" yozilmaydi; tasdiqlanmagan jihatlar matnda yoki adabiyotda `[tasdiqlanmagan]` deb belgilanadi.
- Tasdiqlanmagan sohalar (uydirilmadi): O'zbekistonning me'yoriy hujjatlari, buyruqlar raqamlari, hududlar va dispanser kuzatuvi muddatlari; O'zbekiston bo'yicha epidemiologik statistika; geogelmintoz o'choqlarining darslik tasnifi; sanitariya-gelmintologik nazoratning milliy tartibi; darslik darajasidagi morfologik tafsilotlar.
- O'qilgan manbalar: JSST fakt-varaqalari (bezgak, leyshmanioz, exinokokkoz, taenioz, trematodozlar, tuproq gelmintozlari, oziq-ovqat xavfsizligi), JSST bezgak mikroskopiyasi SOP, PMC maqolalari (PMC6522669, PMC5580801, PMC8906094, PMC4015569, PMC8875715, PMC6441489, PMC6055529, PMC7783816, PMC9407268, PMC2620635, PMC8223542, PMC3374688 va boshqalar). Kutubxona sayti (xayrullokomilov.uz) o'qilmadi.

## 2026-11-12 — v2: mahalliy manbalar va taqiqlangan bo'limlarni olib tashlash
- Kutubxona (xayrullokomilov.uz/kutubxona) JSON API orqali o'qildi (`/api/materiallar`, `/api/materiallar/{id}` — OCR matni `matn` maydonida); ~140 hujjat yuklab olindi. Adabiyotlardagi havola: `https://xayrullokomilov.uz/api/materiallar/{id}/fayl`. Oldingi "sayt o'qilmaydi" xulosasi bekor qilindi.
- Olib tashlandi: «Laboratoriya xodimi uchun amaliy xulosa», «Savolga javob berish tartibi», «Savolga qanday/halol javob», «Imtihon uchun qisqa javob», «Eslatma», «Laborant vazifalari», «Misol», «Klinik/Tashxis/Amaliy misol», «Takrorlash uchun savollar» va shunga o'xshash 359 bo'lim; «imtihon», «esse», «Laborant uchun», «Savol:» va meta/birinchi shaxs gaplar (~600 gap); «Savolda … so'ralgan» uslubidagi kirishlar; laborantga qaratilgan repetitorlik bo'limlari (8 tasi olib tashlandi, 8 tasi neytral nomlandi).
- «esse/essay» so'zi hech qayerda qolmadi (md va docx matnida tekshirildi).
- Har bir maqolaga mahalliy manbalarga asoslangan bo'lim qo'shildi: SSV 121-son buyrug'i (1–7-ilovalar), 166-son buyruq (standartlar va davolash bayonnomalari), 630-son, 43-son buyruqlar, VMQ 9-son va 386-son qarorlar, SEO va JSQ 8-son buyrug'i (laboratoriya nizomi), SanQvaM 0112-26, SanQvaN 0083-24, SanPiN 0036-22/0037-22, O'zMSt 133:2024, GOST 17.4.4.02-2017, MUK 4.2.1884-04, uslubiy qo'llanmalar (TTA 2009 bezgak, Rasulov–Matnazarova exinokokkoz), SOPlar, Farg'ona DSENM materiallari, o'quv qo'llanmalar. Jami 57 ta kutubxona hujjati, 417 ta adabiyot yozuvi.
- "[tasdiqlanmagan]" belgilari mahalliy manbalar bilan javob topilgan joylarda almashtirildi (600 → 1 ta, u ham ma'noli: "homiladorlikda tasdiqlanmagan" dori).
- 034-mavzu: oxirgi mahalliy bezgak holatlari — 2010-yil, Surxondaryo (Uzun t.) va Sirdaryo aholisi (Qashqadaryo, Dehqonobod t.da yuqtirilgan) — JSST 2023 hisobotidan.
- Tekshiruv: 149/149 docx, asosiy matn 819–1119 so'z, sarlavha `N. …`, apostrof `'`, Kirish va [n] havolalar bor.
