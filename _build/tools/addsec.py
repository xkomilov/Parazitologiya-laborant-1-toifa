import sys,re
# usage: addsec.py NNN  (stdin: "## Heading\ntext...") ; matn qo'lda yoziladi, skript faqat Xulosa oldiga joylaydi
n=sys.argv[1];p='md/%s.md'%n;s=open(p,encoding='utf8').read();add=sys.stdin.read().strip()+'\n'
i=s.index('## Xulosa');open(p,'w',encoding='utf8').write(s[:i]+add+s[i:])
