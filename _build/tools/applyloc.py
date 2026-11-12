# [Lnnn] belgilarini adabiyot raqamiga almashtiradi va adabiyotni ro'yxatga qo'shadi (format ishi).
import re,sys
sys.path.insert(0,'.');from localrefs import R
for n in sys.argv[1:]:
    p='md/%s.md'%n;s=open(p).read()
    body,refs=s.split('## Adabiyotlar\n')
    rl=[l for l in refs.strip().split('\n') if l.strip()]
    def num(i):
        i=int(i);txt=R[i]
        for k,l in enumerate(rl):
            if re.sub(r'^\d+\.\s*','',l)==txt: return k+1
        rl.append('%d. %s'%(len(rl)+1,txt));return len(rl)
    def rep(m):
        parts=[x.strip() for x in m.group(1).split(',')]
        out=[]
        for x in parts:
            out.append(str(num(x[1:])) if x.startswith('L') else x)
        return '['+', '.join(out)+']'
    body=re.sub(r'\[((?:L?\d+)(?:,\s*L?\d+)*)\]',lambda m: rep(m) if 'L' in m.group(1) else m.group(0),body)
    open(p,'w').write(body+'## Adabiyotlar\n'+'\n'.join(rl)+'\n')
