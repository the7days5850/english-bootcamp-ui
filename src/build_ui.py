"""영어 부트 캠프 앱 화면 묶기 (개발자용).
플러그인의 세 화면 틀(form.html · bootcamp.html · db_browser.html)을 그대로 가져와
한 앱(app.js · app.css)으로 합치고, 정적인 설정(주문서 항목 · 교재 목록)을 cfg.js 로 만든다.
  python3 build_ui.py <플러그인 폴더> <출력 폴더>
"""
import sys, os, re, json

PL, OUT = sys.argv[1], sys.argv[2]
REF = os.path.join(PL, 'skills', 'register-passages', 'references')
OF = os.path.join(REF, 'order-form')
HERE = os.path.dirname(os.path.abspath(__file__))
os.makedirs(OUT, exist_ok=True)


def parts(name):
    h = open(os.path.join(OF, name), encoding='utf-8').read()
    css = h[h.index('<style>') + 7:h.index('</style>')]
    js = h[h.index('<script>') + 8:h.rindex('</script>')]
    js = re.sub(r'^\s*const D=/\*DATA\*/null;\s*\n', '', js, count=1)
    return css, js


def split_rules(css):
    """맨 바깥 규칙 단위로 자른다(@media 는 통째로)."""
    out, i, n = [], 0, len(css)
    while i < n:
        j = css.find('{', i)
        if j < 0: break
        sel = css[i:j].strip()
        depth, k = 1, j + 1
        while k < n and depth:
            if css[k] == '{': depth += 1
            elif css[k] == '}': depth -= 1
            k += 1
        out.append((sel, css[j + 1:k - 1]))
        i = k
    return out


def scope_sel(sel, sc):
    res = []
    for s in sel.split(','):
        s = s.strip()
        if not s: continue
        if re.match(r'^\.w(?![\w-])', s): s = sc + '.w' + s[2:]
        elif re.search(r'\s\.w(?![\w-])', s): s = re.sub(r'(\s)\.w(?![\w-])', r'\1' + sc + '.w', s, count=1)
        else: s = sc + ' ' + s
        res.append(s)
    return ','.join(res)


def scope(css, sc):
    imports = re.findall(r'@import[^;]+;', css)
    css = re.sub(r'@import[^;]+;', '', css)
    out = []
    for sel, body in split_rules(css):
        if sel.startswith('@media') or sel.startswith('@supports'):
            inner = ''.join(f'{scope_sel(s2, sc)}{{{b2}}}' for s2, b2 in split_rules(body))
            out.append(f'{sel}{{{inner}}}')
        else:
            out.append(f'{scope_sel(sel, sc)}{{{body}}}')
    return imports, '\n'.join(out)


SCR = {'home': 'bootcamp.html', 'form': 'form.html', 'db': 'db_browser.html'}
imports, css_all, js_all = [], [], []
for key, fn in SCR.items():
    css, js = parts(fn)
    im, sc = scope(css, '.s-' + key)
    imports += [x for x in im if x not in imports]
    css_all.append(sc)
    js = js.replace('sendPrompt(', 'EB.send(')
    if key == 'db':
        js = js.replace("room:'',nw:", "room:(D.preRoom||''),put:!!D.preRoom,nw:", 1)
    js_all.append(f'EB.screens.{key}=function(D){{\n{js}\n}};')

shell_css = open(os.path.join(HERE, 'shell.css'), encoding='utf-8').read()
shell_js = open(os.path.join(HERE, 'shell.js'), encoding='utf-8').read()
open(os.path.join(OUT, 'app.css'), 'w', encoding='utf-8').write('\n'.join(imports) + '\n' + shell_css + '\n' + '\n'.join(css_all))
open(os.path.join(OUT, 'app.js'), 'w', encoding='utf-8').write(
    '(function(){\nconst EB=window.EB={screens:{}};\n' + '\n'.join(js_all) + '\n' + shell_js + '\n})();\n')
cfg = {'forms': {}, 'catalog': json.load(open(os.path.join(REF, 'catalog.json'), encoding='utf-8'))}
for sk in ('vocab', 'passage-analysis', 'workbook', 'variant'):
    cfg['forms'][sk] = json.load(open(os.path.join(OF, sk + '.json'), encoding='utf-8'))
open(os.path.join(OUT, 'cfg.js'), 'w', encoding='utf-8').write('window.EBC=' + json.dumps(cfg, ensure_ascii=False, separators=(',', ':')) + ';\n')
for f in ('app.js', 'app.css', 'cfg.js'):
    print(f, os.path.getsize(os.path.join(OUT, f)))
