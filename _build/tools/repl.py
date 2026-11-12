# usage: repl.py NNN  (stdin: blocks "<<<substring\nnew paragraph"), replaces whole line containing substring
import sys
n=sys.argv[1];p='md/%s.md'%n;L=open(p).read().split('\n')
for b in sys.stdin.read().split('<<<')[1:]:
    key,new=b.split('\n',1);new=new.strip()
    idx=[i for i,l in enumerate(L) if key in l]
    assert len(idx)==1,(key,idx)
    L[idx[0]]=new
open(p,'w').write('\n'.join(L))
