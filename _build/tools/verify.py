import zipfile,re,glob,os
res=[];bad=[]
for f in sorted(glob.glob('Мавзу/*.docx')):
    z=zipfile.ZipFile(f);x=z.read('word/document.xml').decode('utf8')
    import html
    x=x.replace('</w:p>','\n')
    txt=[html.unescape(re.sub(r'<[^>]+>','',p)) for p in x.split('\n')]
    txt=[t for t in txt if t.strip()]
    n=os.path.basename(f)[:3]
    title=txt[0]
    if not re.match(r'^%d\. '%int(n),title): bad.append((n,'title',title[:40]))
    full=' '.join(txt)
    if re.search(r"[ʻʼ’‘`´]",full): bad.append((n,'apostrof'))
    if '\u2022' in full: bad.append((n,'bullet'))
    idx=[k for k,t in enumerate(txt) if t.strip().lower().startswith('foydalanilgan')]
    if not idx: bad.append((n,'no refs'));continue
    i=idx[0]
    main=' '.join(txt[1:i]);w=len(main.split());res.append(w)
    if w<800: bad.append((n,'short',w))
    if not re.search(r'\[\d+(, \d+)*\]',main): bad.append((n,'nocite'))
    if not any(t.lower().startswith('kirish') for t in txt): bad.append((n,'nokirish'))
print(len(res),min(res) if res else 0,max(res) if res else 0);print(bad[:20])
