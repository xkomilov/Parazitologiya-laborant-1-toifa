import os,re,sys
def wc(f):
    s=open(f).read().split('## Adabiyotlar')[0]
    s='\n'.join(l for l in s.split('\n') if not l.startswith('#'))
    return len(s.split())
r={f[:3]:wc('md/'+f) for f in sorted(os.listdir('md'))}
lo=[k for k,v in r.items() if v<1000]
print('min',min(r.values()),'max',max(r.values()),'<800:',sum(v<800 for v in r.values()),'<1000:',len(lo))
if len(sys.argv)>1: print(' '.join('%s:%d'%(k,v) for k,v in r.items()))
