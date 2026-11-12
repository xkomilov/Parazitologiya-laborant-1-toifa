# Deterministik tozalash: taqiqlangan bo'limlar va jumlalarni o'chiradi. Yangi matn yaratmaydi.
import re,os,sys,json
BAN_H=re.compile(r"misol|takrorlash|laborant uchun|laboratoriya xodimi uchun|laborant vazifalari|imtihon|savolga|qisqa javob|eslatma|savol-javob",re.I)
BAN_S=re.compile(r"imtihon|\besse\w*|laborant uchun|laboratoriya xodimi uchun|\bSavol:|\btalaba\w*",re.I)
SPLIT=re.compile(r"(?<=[.!?])\s+(?=[A-ZÀ-ÿʻ'«\"(0-9А-Я])")
rep={}
for f in sorted(os.listdir('md')):
    L=open('md/'+f).read().split('\n');out=[];skip=False;rs=0;rh=[]
    for l in L:
        if l.startswith('## '):
            h=l[3:].strip()
            skip = h not in ('Adabiyotlar',) and bool(BAN_H.search(h))
            if skip: rh.append(h);continue
            out.append(l);continue
        if skip: continue
        if l.startswith('# ') or not l.strip() or re.match(r'^\d+\. ',l) and out and any(x=='## Adabiyotlar' for x in out):
            out.append(l);continue
        ss=SPLIT.split(l);keep=[s for s in ss if not BAN_S.search(s)];rs+=len(ss)-len(keep)
        if keep: out.append(' '.join(keep))
    # drop empty sections
    o2=[]
    for i,l in enumerate(out):
        if l.startswith('## ') and (i+1>=len(out) or out[i+1].startswith('## ')) and l!='## Adabiyotlar': continue
        o2.append(l)
    open('md/'+f,'w').write('\n'.join(o2).rstrip('\n')+'\n');rep[f]=(rh,rs)
json.dump(rep,open('clean_report.json','w'),ensure_ascii=False,indent=0)
print(sum(len(v[0]) for v in rep.values()),'bo\'lim;',sum(v[1] for v in rep.values()),'jumla o\'chirildi')
