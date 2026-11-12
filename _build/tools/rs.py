# usage: rs.py NNN (stdin blocks "<<<substring\nreplacement"), replaces the single sentence containing substring
import sys,re
n=sys.argv[1];p='md/%s.md'%n;s=open(p).read()
for b in sys.stdin.read().split('<<<')[1:]:
    key,new=(b.split('\n',1)+[''])[:2];new=new.strip()
    i=s.index(key)
    a=max(s.rfind('. ',0,i),s.rfind('\n',0,i),s.rfind('] ',0,i)if False else -1)
    a=a+2 if s[a]=='.' else a+1
    m=re.compile(r'(\.|\])(\s|$)').search(s,i+len(key))
    # sentence end: '.' followed by space/newline (citations like [1]. included)
    m=re.compile(r'\.(?= |\n|$)').search(s,i+len(key));e=m.end()
    seg=s[a:e]
    s=s[:a]+new+s[e:]
    s=s.replace('  ',' ').replace(' \n','\n')
    print('REMOVED:',seg[:200])
open(p,'w').write(s)
