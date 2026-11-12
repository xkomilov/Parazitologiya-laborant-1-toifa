# 2-bosqich: meta-jumlalarni o'chiradi (birinchi shaxs, seans, "tekshirilmagan" deb faqat ogohlantiruvchi jumlalar). Yangi matn yozmaydi.
import re,os
META=re.compile(r"seans|\bmen\b|\bmenga\b|\bmening\b|olmadim|olmaganim|qilmayman|keltirmayman|o'tmayman|qoldiraman|uydiril|uydirma|taxmin qilmayman|ocha olmadim|\bo'qilmadi\b|o'qib tekshiril|o'qib chiqilmagan|lex\.uz|ochiq masala",re.I)
WARN=re.compile(r"^(Bu|Ushbu|Mazkur|Shu|Bunday|Ular|U|Ayni|Bu yerda|Mahalliy|Milliy|O'zbekiston|Aniq|Qolgan)[^.]{0,220}(tekshirilmagan|tasdiqlanmagan|tasdiqlanmadi|tekshirilmadi|ko'rib chiqilmagan|keltirilmaydi)[^.]*\.?$",re.I)
SPLIT=re.compile(r"(?<=[.!?])\s+(?=[A-ZÀ-ÿʻ'«\"(0-9А-Я])")
tot=0
for f in sorted(os.listdir('md')):
    s=open('md/'+f).read();body,refs=s.split('## Adabiyotlar\n')
    out=[]
    for l in body.split('\n'):
        if l.startswith('#') or not l.strip(): out.append(l);continue
        ss=SPLIT.split(l);keep=[]
        for x in ss:
            xs=re.sub(r'\s*\[[^\]]*\]\s*','',x).strip()
            if META.search(x) or WARN.match(xs): tot+=1;continue
            keep.append(x)
        if keep: out.append(' '.join(keep))
    o2=[]
    for i,l in enumerate(out):
        if l.startswith('## ') and (i+1>=len(out) or out[i+1].startswith('## ') or not ''.join(out[i+1:i+2]).strip()) : 
            if i+1<len(out) and out[i+1].startswith('## '): continue
        o2.append(l)
    open('md/'+f,'w').write('\n'.join(o2).rstrip('\n')+'\n## Adabiyotlar\n'+refs)
print('o\'chirildi:',tot)
