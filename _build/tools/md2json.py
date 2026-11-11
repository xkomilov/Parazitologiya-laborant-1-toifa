#!/usr/bin/env python3
# Format converter: .md (qo'lda yozilgan matn) -> spec .json. Mazmun yaratmaydi.
import sys,json,re,os
src,dst=sys.argv[1],sys.argv[2]
for f in sorted(os.listdir(src)):
    if not f.endswith('.md'):continue
    L=open(os.path.join(src,f),encoding='utf8').read().split('\n')
    d={"number":int(f[:3]),"title":"","sections":[],"references":[]}
    mode=None
    for l in L:
        l=l.rstrip()
        if not l: continue
        if l.startswith('# '): d['title']=l[2:]
        elif l.startswith('## '):
            if l[3:].strip()=='Adabiyotlar': mode='ref'
            else: mode='sec'; d['sections'].append({"heading":l[3:].strip(),"content":[]})
        elif mode=='sec': d['sections'][-1]['content'].append(l)
        elif mode=='ref': d['references'].append(re.sub(r'^\d+\.\s*','',l))
    json.dump(d,open(os.path.join(dst,f[:3]+'.json'),'w',encoding='utf8'),ensure_ascii=False,indent=1)
