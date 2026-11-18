/* =========================================================
   Smart Líder IA · Desafio 7 dias — app (PWA)
   Tudo roda no navegador. O progresso fica salvo no aparelho.
   O modo equipe sincroniza um resumo do progresso no Supabase.
   ========================================================= */
'use strict';

/* ---------- configuração ---------- */
const SB_URL = 'https://ylsosycptkjbztbholfe.supabase.co';
const SB_KEY = 'sb_publishable_4X3e0K8-LwVlomDcvNhkAw_bREibqR3';
const SUPPORT = 'texas@txs.com.br';
const STORE_KEY = 'smartlider.v1';

/* ---------- conteúdo ---------- */
const STY = {
  int: { name: 'Estilo Interno', short: 'Interno', verb: 'Consciência', pillar: 'Postura Emocional', color: '#3D7BFF', emoji: '🧘',
    desc: 'Você lidera a partir do equilíbrio: pensa antes de agir e transmite segurança mesmo sob pressão.',
    grow: 'Cuidado para não ficar só observando. Compartilhe o que pensa e decida no tempo certo.' },
  com: { name: 'Estilo Comunicativo', short: 'Comunicativo', verb: 'Guiar', pillar: 'Propósito da Autoridade', color: '#F79300', emoji: '🧭',
    desc: 'Você lidera dando direção: o time sabe o que fazer, por que fazer e o que é sucesso.',
    grow: 'Cuidado para não virar só quem dá instruções. Pergunte mais e deixe o time propor.' },
  rel: { name: 'Estilo Relacional', short: 'Relacional', verb: 'Inspirar', pillar: 'Qualidade das Relações', color: '#16A673', emoji: '🤝',
    desc: 'Você lidera conectando: cria vínculo e confiança sem perder autoridade.',
    grow: 'Cuidado para não fugir de conversas difíceis só para preservar o clima.' },
  imp: { name: 'Estilo de Impacto', short: 'Impacto', verb: 'Desenvolver', pillar: 'Construção de Autonomia', color: '#8B5CF6', emoji: '🚀',
    desc: 'Você lidera multiplicando: delega, desenvolve pessoas e faz o time andar sem você.',
    grow: 'Cuidado para não delegar sem acompanhar. Autonomia precisa de combinados e retorno.' }
};
const KEYS = ['int', 'com', 'rel', 'imp'];

const DIAG = [
  { q: 'Uma pessoa da equipe entrega um trabalho abaixo do esperado. Qual é a sua primeira reação?', o: {
    int: 'Respiro e percebo o que estou sentindo antes de falar.',
    com: 'Explico de novo o objetivo e o padrão que eu espero.',
    rel: 'Converso para entender o que aconteceu com ela.',
    imp: 'Pergunto como ela resolveria e combinamos um plano de melhoria.' } },
  { q: 'Começa uma semana caótica, com metas apertadas. O que você faz?', o: {
    int: 'Organizo minhas prioridades e mantenho a calma para o time.',
    com: 'Reúno todos e deixo claro o que importa e por quê.',
    rel: 'Vejo como cada um está e reforço que estamos juntos.',
    imp: 'Distribuo as frentes e dou autonomia para cada responsável.' } },
  { q: 'O que mais te dá orgulho como líder?', o: {
    int: 'Manter o equilíbrio mesmo sob pressão.',
    com: 'Ver todo mundo entendendo para onde estamos indo.',
    rel: 'O clima de confiança da equipe.',
    imp: 'Ver alguém do time crescer e assumir mais.' } },
  { q: 'Em uma reunião, você costuma…', o: {
    int: 'Observar bastante antes de me posicionar.',
    com: 'Conduzir a pauta e alinhar os próximos passos.',
    rel: 'Garantir que todos tenham espaço para falar.',
    imp: 'Desafiar o time a trazer as soluções.' } },
  { q: 'Surge um conflito entre duas pessoas do time. Você…', o: {
    int: 'Avalio a situação com calma antes de agir.',
    com: 'Deixo claras as regras e o que espero de cada um.',
    rel: 'Ajudo os dois a se escutarem de verdade.',
    imp: 'Peço que os dois proponham juntos uma solução.' } },
  { q: 'Chega uma pessoa nova ao time. O que você faz primeiro?', o: {
    int: 'Observo o perfil dela para saber como lidar.',
    com: 'Passo um plano claro de objetivos e combinados.',
    rel: 'Apresento a todos e crio vínculo desde o primeiro dia.',
    imp: 'Dou uma responsabilidade real para ela aprender fazendo.' } },
  { q: 'Qual é o seu maior desafio hoje?', o: {
    int: 'Controlar a ansiedade e não reagir no impulso.',
    com: 'Ser entendido sem precisar repetir tudo várias vezes.',
    rel: 'Ser próximo sem perder o respeito.',
    imp: 'Largar a operação e confiar nas entregas do time.' } },
  { q: 'Que elogio você mais gostaria de ouvir da sua equipe?', o: {
    int: '“Você passa segurança, mesmo nos piores dias.”',
    com: '“Com você a gente sempre sabe o que fazer.”',
    rel: '“Você realmente se importa com a gente.”',
    imp: '“Você me fez crescer como profissional.”' } }
];

const DAYS = [
  null,
  { n: 1, key: 'int', title: 'Postura Emocional', sub: 'Equilíbrio antes de agir, mesmo sob pressão.', min: 12,
    read: `<p>O chefe <strong>reage</strong>. O líder <strong>responde</strong>. A diferença entre os dois cabe em poucos segundos: o intervalo entre o que acontece e o que você faz com isso.</p>
<p>Quando você explode, cobra no impulso ou se fecha, a equipe aprende uma lição silenciosa: <em>“é melhor esconder problemas do que trazê-los”</em>. E aí tudo volta a passar por você.</p>
<div class="quote">Sua equipe não precisa de um líder sem emoções. Precisa de um líder que não seja dirigido por elas.</div>
<p><strong>A Pausa de 90 segundos</strong> é a ferramenta de hoje. Uma emoção intensa dura, em média, cerca de 90 segundos no corpo. Se você não a alimenta, ela passa. Funciona assim:</p>
<ul><li><strong>Respire</strong> fundo três vezes, devagar.</li><li><strong>Nomeie</strong> a emoção: “estou irritado”, “estou ansioso”.</li><li><strong>Pergunte</strong>: “o que eu quero que aconteça depois desta conversa?”</li></ul>
<p>Só depois disso, fale. Você vai perceber que a resposta muda, e o resultado também.</p>`,
    action: 'Hoje, aplique a Pausa de 90 segundos em pelo menos uma situação real de tensão (uma cobrança, um erro, uma notícia ruim).',
    checks: ['Identifiquei 1 gatilho que costuma me tirar do eixo', 'Apliquei a pausa em pelo menos 1 situação real', 'Respondi com uma pergunta em vez de uma reação'],
    likert: ['Mantenho a calma quando algo sai do planejado.', 'Minha equipe se sente segura para me trazer problemas.', 'Percebo minhas emoções antes de agir sobre elas.', 'Não descarrego minhas frustrações na equipe.'],
    note: 'Qual situação de hoje testou seu equilíbrio, e como você respondeu?' },
  { n: 2, key: 'com', title: 'Propósito da Autoridade', sub: 'Orientar com propósito em vez de só mandar.', min: 12,
    read: `<p>“Faz assim porque eu estou mandando” consegue obediência por um tempo. “Faz assim porque isso vai gerar tal resultado” consegue <strong>compromisso</strong>.</p>
<p>Quando a equipe só recebe ordens, ela para de pensar. Fica esperando a próxima instrução, e qualquer imprevisto volta para a sua mesa.</p>
<div class="quote">Quem entende o porquê encontra sozinho o como.</div>
<p>A ferramenta de hoje é a <strong>Fórmula P.O.R.</strong> para qualquer pedido importante:</p>
<ul><li><strong>Por quê</strong>: qual o propósito, o que está em jogo.</li><li><strong>O quê</strong>: o resultado esperado, com prazo.</li><li><strong>Resultado</strong>: como saberemos que deu certo.</li></ul>
<p>E feche sempre com a pergunta que transforma ordem em parceria: <strong>“o que você precisa de mim para fazer isso acontecer?”</strong></p>`,
    action: 'Faça um pedido importante hoje usando a Fórmula P.O.R. e termine com: “o que você precisa de mim?”.',
    checks: ['Expliquei o porquê antes do quê', 'Deixei claro como saberemos que deu certo', 'Perguntei o que a pessoa precisa de mim'],
    likert: ['Explico o porquê das decisões que tomo.', 'Minha equipe sabe quais são as prioridades da semana.', 'Faço mais perguntas do que dou ordens.', 'Dou feedback claro e no momento certo.'],
    note: 'Como a pessoa reagiu quando você explicou o porquê? O que mudou na conversa?' },
  { n: 3, key: 'rel', title: 'Qualidade das Relações', sub: 'Conectar com empatia sem perder autoridade.', min: 12,
    read: `<p>Ninguém dá o melhor de si para quem não o enxerga. Pesquisas da Gallup mostram que cerca de <strong>70% do engajamento</strong> de uma equipe pode ser atribuído ao gestor.</p>
<p>Proximidade não é intimidade, nem perda de respeito. É a pessoa saber que você vê o trabalho dela, conhece o que a motiva e a escuta de verdade.</p>
<div class="quote">Reconhecimento genérico é ruído. Reconhecimento específico é combustível.</div>
<p>Hoje você vai praticar duas coisas:</p>
<ul><li><strong>Reconhecimento específico</strong>: “Quando você <em>[comportamento]</em>, isso gerou <em>[impacto]</em>. Obrigado.”</li><li><strong>Conversa de 10 minutos</strong> com uma pessoa do time, só para perguntar: “o que tornaria seu trabalho melhor aqui?” e <strong>escutar sem interromper</strong>.</li></ul>`,
    action: 'Faça 1 reconhecimento específico (comportamento + impacto) e 1 conversa de 10 minutos só para escutar.',
    checks: ['Fiz um reconhecimento específico e sincero', 'Tive uma conversa de 10 minutos só escutando', 'Anotei algo que eu não sabia sobre essa pessoa'],
    likert: ['Sei o que motiva cada pessoa do meu time.', 'Reconheço os esforços de forma específica.', 'Escuto até o fim, sem interromper.', 'Consigo ser próximo sem perder a autoridade.'],
    note: 'O que você descobriu na conversa de hoje que não sabia antes?' },
  { n: 4, key: 'imp', title: 'Construção de Autonomia', sub: 'Delegar e fazer a equipe crescer de verdade.', min: 14,
    read: `<p>Se tudo passa por você, você não tem uma equipe: tem ajudantes. E você vira o <strong>gargalo</strong> do próprio time.</p>
<p>Delegar não é “largar”. É transferir <strong>decisões</strong>, não só tarefas, de forma gradual. Use a <strong>Escada da Autonomia</strong>:</p>
<ul><li><strong>1.</strong> Faça exatamente o que eu disser.</li><li><strong>2.</strong> Pesquise e me traga as opções.</li><li><strong>3.</strong> Me traga sua recomendação.</li><li><strong>4.</strong> Decida e me informe depois.</li><li><strong>5.</strong> Decida. Você é o dono disso.</li></ul>
<div class="quote">O seu trabalho não é ter todas as respostas. É formar pessoas que encontrem as respostas.</div>
<p>Hoje, escolha uma decisão que hoje só você toma e suba <strong>um degrau</strong> com alguém do time. Combine o nível, o prazo e quando vocês vão conversar sobre o resultado.</p>`,
    action: 'Escolha uma decisão que hoje passa por você e transfira para alguém do time subindo 1 degrau na Escada da Autonomia.',
    checks: ['Listei 3 decisões que hoje só passam por mim', 'Escolhi uma decisão e a pessoa certa para ela', 'Combinei o nível de autonomia e o momento de retorno'],
    likert: ['Delego decisões, não só tarefas.', 'A equipe resolve problemas sem precisar de mim.', 'Invisto tempo no desenvolvimento das pessoas.', 'Trato erros como parte do aprendizado.'],
    note: 'Qual decisão você delegou, para quem, e como se sentiu ao soltar?' },
  { n: 5, key: 'pa', title: 'Diagnóstico Poder x Autoridade', sub: 'Um teste rápido revela onde você está entre os dois.', min: 8,
    read: `<p><strong>Poder</strong> vem do cargo. Ele garante obediência enquanto você está olhando. <strong>Autoridade</strong> vem do respeito. Ela garante adesão, inclusive quando você não está.</p>
<p>Todo líder usa um pouco dos dois. A questão é: <strong>qual deles sustenta a sua liderança no dia a dia?</strong></p>
<div class="quote">Poder se impõe. Autoridade se conquista, e é ela que faz o time andar sem você.</div>
<p>A seguir, 10 situações reais. Escolha, com honestidade, o que você <strong>realmente faz</strong>, não o que acha que deveria fazer. O resultado aparece na hora.</p>` },
  { n: 6, key: 'pnl', title: 'Crenças que Travam Líderes', sub: 'PNL aplicada: identifique e desafie as crenças do modo chefe.', min: 12,
    read: `<p>Por trás de todo comportamento de chefe existe uma <strong>crença</strong>. “Se eu não fizer, ninguém faz direito” gera centralização. “Se eu for próximo, perco o respeito” gera distância.</p>
<p>Na PNL, crenças não são verdades: são <strong>mapas</strong>. Foram úteis em algum momento, mas podem estar limitando o seu território hoje.</p>
<div class="quote">Você não muda o comportamento de forma duradoura sem mudar a crença que o sustenta.</div>
<p>O exercício de hoje tem três passos: <strong>identificar</strong> as crenças que você reconhece em si, <strong>escolher</strong> a que mais pesa e <strong>ressignificar</strong> com três perguntas poderosas.</p>` },
  { n: 7, key: 'ia', title: 'Diário de Liderança e Perfil da Semana', sub: 'IA + compromisso: feche com seu perfil e o plano da próxima semana.', min: 15,
    read: `<p>Chegou o dia de juntar tudo. Nos últimos dias você praticou os 4 comportamentos que separam o chefe do líder, mediu seu Poder x Autoridade e desafiou suas crenças.</p>
<p>Hoje você vai fazer três coisas:</p>
<ul><li><strong>Diário de Liderança com IA</strong>: um prompt pronto, já preenchido com os seus resultados, para usar no ChatGPT, Gemini ou Claude.</li><li><strong>Plano da próxima semana</strong>: 3 compromissos práticos, escolhidos a partir do seu ponto de desenvolvimento.</li><li><strong>Revelar o seu perfil</strong>: o formato da sua liderança, desenhado pelas suas ações, e o seu cartão de resultado.</li></ul>
<div class="quote">Liderança não é um título que você recebe. É um hábito que você treina.</div>` }
];

const PA = [
  ['Quando a equipe erra, eu procuro o culpado e corrijo.', 'Quando a equipe erra, eu procuro a causa e o aprendizado.'],
  ['Para conseguir algo, lembro que sou eu quem decide.', 'Para conseguir algo, mostro por que aquilo importa.'],
  ['Nas reuniões, eu falo a maior parte do tempo.', 'Nas reuniões, pergunto e escuto antes de concluir.'],
  ['Quando eu saio de folga, as coisas travam.', 'Quando eu saio de folga, a equipe segue com o combinado.'],
  ['Guardo informações até ser realmente necessário.', 'Compartilho informações para que decidam melhor.'],
  ['Normalmente acho que a minha ideia é a melhor.', 'Testo ideias do time, mesmo diferentes da minha.'],
  ['Dou feedback principalmente quando algo dá errado.', 'Dou feedback com frequência, positivo e corretivo.'],
  ['Cobro os números e pronto.', 'Conecto os números a um propósito e acompanho junto.'],
  ['Quando discordam de mim, encerro a discussão.', 'Quando discordam de mim, vejo sinal de engajamento.'],
  ['O mérito do resultado é da minha gestão.', 'Dou crédito em público a quem fez acontecer.']
];

const BELIEFS = [
  { b: 'Se eu não fizer, ninguém faz direito.', n: 'Quando eu ensino direito, as pessoas fazem bem, e eu fico livre para o que só eu posso fazer.' },
  { b: 'Delegar dá mais trabalho do que fazer.', n: 'Delegar dá trabalho uma vez; fazer sozinho dá trabalho para sempre.' },
  { b: 'Líder bom tem todas as respostas.', n: 'Líder bom faz as perguntas certas e forma quem encontra as respostas.' },
  { b: 'Se eu for próximo, perco o respeito.', n: 'Respeito vem da coerência, e a proximidade aumenta a confiança.' },
  { b: 'Errar na frente da equipe é sinal de fraqueza.', n: 'Assumir um erro mostra segurança e dá permissão para o time aprender.' },
  { b: 'As pessoas só trabalham sob pressão.', n: 'As pessoas trabalham melhor com clareza, propósito e reconhecimento.' },
  { b: 'Não tenho tempo para desenvolver ninguém.', n: 'Desenvolver pessoas é o que vai me devolver tempo.' },
  { b: 'Pedir ajuda é admitir incompetência.', n: 'Pedir ajuda é usar a inteligência do time inteiro.' }
];

const PLAN = {
  int: ['Aplicar a Pausa de 90 segundos antes de toda conversa difícil', 'Encerrar o dia anotando 1 momento em que reagi e como responderia', 'Fazer 1 reunião da semana sem olhar o celular, 100% presente', 'Pedir a alguém de confiança: “como eu reajo sob pressão?”'],
  com: ['Usar a Fórmula P.O.R. em todos os pedidos importantes', 'Abrir a semana com 15 min alinhando prioridades e o porquê', 'Trocar 3 ordens por perguntas: “como você faria?”', 'Dar 1 feedback claro e no momento certo por dia'],
  rel: ['Fazer 1 reconhecimento específico por dia', 'Ter uma conversa de 10 min com cada pessoa do time', 'Perguntar “o que tornaria seu trabalho melhor?” e agir em 1 resposta', 'Escutar até o fim antes de dar minha opinião'],
  imp: ['Subir 1 degrau na Escada da Autonomia com 2 pessoas', 'Listar o que só eu faço e escolher 1 item para ensinar', 'Responder “o que você sugere?” antes de dar a solução', 'Combinar 1 projeto em que a equipe decide e me informa depois']
};

const BADGES = [
  { id: 'diag', e: '🧭', t: 'Diagnóstico feito' },
  { id: 'd1', e: '🌱', t: 'Primeiro passo' },
  { id: 'streak3', e: '🔥', t: '3 dias seguidos' },
  { id: 'pa', e: '⚖️', t: 'Poder x Autoridade' },
  { id: 'belief', e: '🧠', t: 'Crença ressignificada' },
  { id: 'done', e: '🏆', t: 'Desafio completo' },
  { id: 'team', e: '👥', t: 'Em equipe' },
  { id: 'card', e: '📣', t: 'Resultado compartilhado' },
  { id: 'auth', e: '👑', t: 'Zona de Autoridade' }
];
const LEVELS = [[0, 'Chefe em transição'], [200, 'Líder em formação'], [450, 'Líder consciente'], [750, 'Smart Líder']];

/* ---------- estado ---------- */
const mem = {};
const store = {
  get() { try { return JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); } catch (e) { return mem.s || null; } },
  set(v) { mem.s = v; try { localStorage.setItem(STORE_KEY, JSON.stringify(v)); } catch (e) {} }
};
let S = store.get() || fresh();
function fresh() {
  return { v: 1, user: { name: '', role: '' }, mode: 'solo', team: null, memberId: uuid(), diag: null, days: {}, xp: 0, streak: 0, lastDone: null, badges: {}, onboarded: false, created: Date.now() };
}
function save() { store.set(S); }
function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c == 'x' ? r : (r & 3 | 8)).toString(16); });
}
const D = n => (S.days[n] = S.days[n] || {});
const isDone = n => !!(S.days[n] && S.days[n].done);
const doneCount = () => [1, 2, 3, 4, 5, 6, 7].filter(isDone).length;
const nextDay = () => { for (let i = 1; i <= 7; i++) if (!isDone(i)) return i; return 0; };
const unlocked = n => n === 1 || isDone(n - 1);
const firstName = () => (S.user.name || 'Líder').trim().split(/\s+/)[0];
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function today() { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
function yesterday() { const d = new Date(Date.now() - 864e5); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
function level() { let l = LEVELS[0], nx = null; for (let i = 0; i < LEVELS.length; i++) { if (S.xp >= LEVELS[i][0]) { l = LEVELS[i]; nx = LEVELS[i + 1] || null; } } return { name: l[1], from: l[0], to: nx ? nx[0] : l[0], next: nx ? nx[1] : null }; }

/* ---------- pontuações ---------- */
function diagScores() {
  if (!S.diag) return null;
  const c = { int: 0, com: 0, rel: 0, imp: 0 };
  S.diag.a.forEach(k => c[k]++);
  const o = {}; KEYS.forEach(k => o[k] = Math.round(25 + c[k] / DIAG.length * 75)); return o;
}
function dayScore(n) {
  const d = S.days[n]; if (!d || !d.done) return null;
  const lk = (d.likert || []).reduce((a, b) => a + (b || 0), 0);
  const ck = (d.checks || []).filter(Boolean).length;
  return Math.max(10, Math.min(100, Math.round((lk - 4) / 16 * 80 + ck / 3 * 20)));
}
function scores() {
  const ds = diagScores(); const o = {}; let fromDays = 0;
  KEYS.forEach((k, i) => { const v = dayScore(i + 1); if (v != null) { o[k] = v; fromDays++; } else o[k] = ds ? ds[k] : 0; });
  o._days = fromDays; return o;
}
function topK(sc) { return KEYS.slice().sort((a, b) => sc[b] - sc[a])[0]; }
function low(sc) { return KEYS.slice().sort((a, b) => sc[a] - sc[b])[0]; }
function paScore() { const d = S.days[5]; if (!d || !d.pa || d.pa.filter(x => x != null).length < PA.length) return null; return Math.round(d.pa.filter(x => x === 1).length / PA.length * 100); }
function paZone(v) { return v >= 70 ? ['Zona de Autoridade', 'Sua liderança se sustenta mais no respeito do que no cargo. O time tende a andar mesmo sem você por perto.'] : v >= 40 ? ['Zona de Transição', 'Você já usa autoridade em vários momentos, mas ainda recorre ao cargo quando aperta. É exatamente aqui que o desafio faz mais diferença.'] : ['Zona de Poder', 'Hoje sua liderança se apoia mais no cargo e no controle. A boa notícia: são comportamentos treináveis, e você acabou de enxergá-los.']; }

/* ---------- utilidades de UI ---------- */
const $ = s => document.querySelector(s);
const app = $('#app');
function toast(t) { const el = $('#toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('on'), 2600); }
function vibrate(ms) { try { navigator.vibrate && navigator.vibrate(ms); } catch (e) {} }
function addXP(n, why) { S.xp += n; save(); if (why) toast('+' + n + ' XP · ' + why); }
function award(id) { if (S.badges[id]) return; S.badges[id] = Date.now(); save(); const b = BADGES.find(x => x.id === id); if (b) setTimeout(() => toast(b.e + ' Conquista: ' + b.t), 900); }
function modal(html, onclose) {
  const m = document.createElement('div'); m.className = 'modal'; m.innerHTML = '<div class="sheet">' + html + '</div>';
  m.addEventListener('click', e => { if (e.target === m || e.target.closest('[data-close]')) { m.remove(); onclose && onclose(); } });
  document.body.appendChild(m); return m;
}
function radar(sc, size, opts) {
  opts = opts || {}; const c = size / 2, R = size * .38;
  const pt = (i, v) => { const a = -Math.PI / 2 + i * Math.PI / 2; return [c + Math.cos(a) * R * v / 100, c + Math.sin(a) * R * v / 100]; };
  const grid = [25, 50, 75, 100].map(g => '<polygon points="' + KEYS.map((k, i) => pt(i, g).join(',')).join(' ') + '" fill="none" stroke="' + (opts.dark ? 'rgba(255,255,255,.14)' : 'rgba(20,32,63,.10)') + '"/>').join('');
  const axes = KEYS.map((k, i) => { const p = pt(i, 100); return '<line x1="' + c + '" y1="' + c + '" x2="' + p[0] + '" y2="' + p[1] + '" stroke="' + (opts.dark ? 'rgba(255,255,255,.14)' : 'rgba(20,32,63,.10)') + '"/>'; }).join('');
  const shape = KEYS.map((k, i) => pt(i, opts.zero ? 2 : Math.max(sc[k], 4)).join(',')).join(' ');
  const dots = KEYS.map((k, i) => { const p = pt(i, opts.zero ? 2 : Math.max(sc[k], 4)); return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + size * .018 + '" fill="' + STY[k].color + '" stroke="#fff" stroke-width="2"/>'; }).join('');
  const lab = KEYS.map((k, i) => { const pos = [[c, c - R - size * .045, 'middle'], [size - 2, c - size * .035, 'end'], [c, c + R + size * .075, 'middle'], [2, c - size * .035, 'start']][i]; const x = pos[0], y = pos[1]; return '<text x="' + x + '" y="' + y + '" text-anchor="' + pos[2] + '" font-size="' + size * .042 + '" font-weight="700" fill="' + (opts.dark ? '#DCE6FF' : '#14203F') + '" font-family="Inter,sans-serif">' + STY[k].verb + '</text>'; }).join('');
  const second = opts.compare ? '<polygon points="' + KEYS.map((k, i) => pt(i, Math.max(opts.compare[k], 4)).join(',')).join(' ') + '" fill="none" stroke="' + (opts.dark ? 'rgba(255,255,255,.5)' : 'rgba(20,32,63,.35)') + '" stroke-dasharray="5 5" stroke-width="2"/>' : '';
  return '<svg class="radar" viewBox="0 0 ' + size + ' ' + size + '"><defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFC53D" stop-opacity=".85"/><stop offset="1" stop-color="#3D7BFF" stop-opacity=".7"/></linearGradient></defs>' + grid + axes + second + '<polygon class="shape" points="' + shape + '" fill="url(#rg)" stroke="#F79300" stroke-width="2.5" stroke-linejoin="round"/>' + dots + lab + '</svg>';
}
function legend(sc) { return '<div class="legend">' + KEYS.map(k => '<div class="lg"><div class="k" style="color:' + STY[k].color + '"><i style="background:' + STY[k].color + '"></i>' + STY[k].short + ' · ' + STY[k].verb + '</div><div class="v">' + sc[k] + '%</div></div>').join('') + '</div>'; }
function animateRadar() { requestAnimationFrame(() => document.querySelectorAll('.radar[data-target]').forEach(svg => { const t = svg.getAttribute('data-target'); const p = svg.querySelector('.shape'); setTimeout(() => p.setAttribute('points', t), 60); })); }

/* ---------- confete ---------- */
function confetti() {
  const cv = $('#confetti'), ctx = cv.getContext('2d'); cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; ctx.scale(devicePixelRatio, devicePixelRatio);
  const cols = ['#F79300', '#FFC53D', '#3D7BFF', '#0A3CB0', '#16A673', '#8B5CF6'];
  const ps = Array.from({ length: 140 }, () => ({ x: innerWidth / 2 + (Math.random() - .5) * 120, y: innerHeight * .35, vx: (Math.random() - .5) * 14, vy: -Math.random() * 14 - 4, s: 5 + Math.random() * 6, c: cols[Math.random() * cols.length | 0], r: Math.random() * 6, vr: (Math.random() - .5) * .3 }));
  let f = 0; (function tick() { ctx.clearRect(0, 0, innerWidth, innerHeight); ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .35; p.vx *= .99; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore(); }); if (++f < 150) requestAnimationFrame(tick); else ctx.clearRect(0, 0, innerWidth, innerHeight); })();
  vibrate([30, 40, 30]);
}

/* ---------- navegação ---------- */
let route = { v: 'home' }, dayStep = 0, quiz = { i: 0, a: [] };
function go(v, extra) {
  route = Object.assign({ v }, extra || {});
  render(); window.scrollTo({ top: 0 });
  try { history.replaceState(null, '', location.pathname + location.search + '#' + v + (extra && extra.n ? '-' + extra.n : '')); } catch (e) {}
}
document.addEventListener('click', e => {
  const g = e.target.closest('[data-go]'); if (g) { go(g.dataset.go, g.dataset.n ? { n: +g.dataset.n } : null); return; }
  const a = e.target.closest('[data-act]'); if (a && ACT[a.dataset.act]) ACT[a.dataset.act](a, e);
});
document.addEventListener('input', e => { const f = e.target.closest('[data-field]'); if (f && FIELD[f.dataset.field]) FIELD[f.dataset.field](f); });

function topbar(back) {
  return '<header class="topbar">' + (back ? '<button class="btn-ghost btn" style="padding:8px 12px" data-go="' + back + '">←</button>' : '') +
    '<span class="logo-sl" role="img" aria-label="Smart Líder"></span><span class="chip-ia">IA</span><span class="sp"></span>' +
    '<span class="pill fire" title="Dias seguidos">🔥 ' + S.streak + '</span><span class="pill xp" title="Pontos de experiência">⚡ ' + S.xp + '</span></header>';
}
function render() {
  const nav = $('#nav');
  if (!S.onboarded) { nav.hidden = true; app.innerHTML = viewOnboarding(); return; }
  const v = route.v;
  const full = v === 'diag' || v === 'day';
  nav.hidden = full;
  nav.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.go === v || (v === 'ebook' || v === 'prompt' ? b.dataset.go === 'more' : false)));
  const V = { home: viewHome, journey: viewJourney, day: viewDay, profile: viewProfile, team: viewTeam, more: viewMore, diag: viewDiag, ebook: viewEbook, prompt: viewPrompt }[v] || viewHome;
  app.innerHTML = V();
  animateRadar();
  if (v === 'team' && S.team) loadBoard();
}

/* ---------- onboarding ---------- */
let ob = { step: 0, mode: 'solo', teamAct: 'create' };
const invite = new URLSearchParams(location.search).get('time');
if (invite && !S.team) { ob.mode = 'team'; ob.teamAct = 'join'; ob.code = invite.toUpperCase(); }
function viewOnboarding() {
  const dots = '<div class="dots">' + [0, 1, 2].map(i => '<i class="' + (i === ob.step ? 'on' : '') + '"></i>').join('') + '</div>';
  if (ob.step === 0) return '<div class="ob view"><div class="logo-wrap"><span class="logo-sl"></span><span class="chip-ia">IA</span></div>' +
    '<div class="eyebrow">Desafio de 7 dias</div><h1 style="margin:8px 0 12px">Pare de ser o gargalo do seu próprio time.</h1>' +
    '<p style="color:#C9D6FA;font-size:17px">1 microação por dia, de 10 a 15 minutos. Primeiro você descobre que tipo de líder é hoje. No dia 7, suas próprias ações desenham o formato da sua liderança.</p>' +
    '<div class="stack" style="margin-top:22px"><div class="row" style="gap:10px;color:#C9D6FA;font-size:14px"><span>🧭 Diagnóstico</span><span>📅 7 microações</span><span>🏆 Perfil + cartão</span></div></div>' +
    '<button class="btn btn-gold btn-block" style="margin-top:26px" data-act="obNext">Começar agora</button>' + dots + '</div>';
  if (ob.step === 1) return '<div class="ob view"><div class="eyebrow">Passo 1 de 2</div><h1 style="margin:8px 0 18px">Como você vai fazer o desafio?</h1>' +
    '<button class="choice ' + (ob.mode === 'solo' ? 'on' : '') + '" data-act="obMode" data-m="solo"><span class="ic">🙋</span><div><b>Individual</b><span>Só eu, no meu ritmo. Meu progresso fica no meu aparelho.</span></div></button>' +
    '<button class="choice ' + (ob.mode === 'team' ? 'on' : '') + '" data-act="obMode" data-m="team"><span class="ic">👥</span><div><b>Em grupo de líderes</b><span>Com outros líderes da empresa, com painel e ranking da equipe.</span></div></button>' +
    (ob.mode === 'team' ? '<div class="seg" style="margin-top:16px;background:rgba(255,255,255,.1)"><button class="' + (ob.teamAct === 'create' ? 'on' : '') + '" data-act="obTeam" data-t="create" style="' + (ob.teamAct === 'create' ? '' : 'color:#C9D6FA') + '">Criar um grupo</button><button class="' + (ob.teamAct === 'join' ? 'on' : '') + '" data-act="obTeam" data-t="join" style="' + (ob.teamAct === 'join' ? '' : 'color:#C9D6FA') + '">Tenho um código</button></div>' +
      (ob.teamAct === 'create' ? '<label class="f">Nome do grupo</label><input type="text" id="obTeamName" maxlength="80" placeholder="Ex.: Líderes Comercial" value="' + esc(ob.teamName || '') + '"><label class="f">Empresa (opcional)</label><input type="text" id="obCompany" maxlength="80" placeholder="Ex.: Rede Âncora" value="' + esc(ob.company || '') + '">'
        : '<label class="f">Código do grupo</label><input type="text" id="obCode" maxlength="6" placeholder="Ex.: K7H4QP" style="text-transform:uppercase;letter-spacing:.2em;font-weight:800" value="' + esc(ob.code || '') + '">') : '') +
    '<button class="btn btn-gold btn-block" style="margin-top:22px" data-act="obNext">Continuar</button>' + dots + '</div>';
  return '<div class="ob view"><div class="eyebrow">Passo 2 de 2</div><h1 style="margin:8px 0 6px">Como podemos te chamar?</h1><p style="color:#C9D6FA">Seu nome aparece no seu cartão de resultado' + (ob.mode === 'team' ? ' e no painel do grupo' : '') + '.</p>' +
    '<label class="f">Seu nome</label><input type="text" id="obName" maxlength="60" autocomplete="name" placeholder="Ex.: Ana Souza" value="' + esc(S.user.name) + '">' +
    '<label class="f">Seu cargo (opcional)</label><input type="text" id="obRole" maxlength="60" placeholder="Ex.: Gerente de loja" value="' + esc(S.user.role) + '">' +
    '<button class="btn btn-gold btn-block" style="margin-top:22px" data-act="obFinish" id="obFinishBtn">Descobrir meu tipo de líder →</button>' +
    '<button class="btn btn-ghost btn-block" style="margin-top:10px" data-act="obBack">Voltar</button>' + dots + '</div>';
}

/* ---------- início ---------- */
function viewHome() {
  const n = nextDay(), dc = doneCount(), lv = level(), sc = scores();
  const pct = dc / 7, C = 2 * Math.PI * 42;
  const lvPct = lv.to > lv.from ? Math.min(100, (S.xp - lv.from) / (lv.to - lv.from) * 100) : 100;
  const hour = new Date().getHours(); const hi = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  let todayCard;
  if (!S.diag) todayCard = '<div class="card today"><div class="num">?</div><span class="tag">🧭 Antes do dia 1</span><h2 style="margin:10px 0 6px">Descubra que tipo de líder você é hoje</h2><p class="muted">8 situações reais, 2 minutos. É o seu ponto de partida para comparar no dia 7.</p><button class="btn btn-gold btn-block" style="margin-top:14px" data-act="startDiag">Fazer meu diagnóstico</button></div>';
  else if (n) { const d = DAYS[n]; const st = STY[d.key]; todayCard = '<div class="card today"><div class="num">' + n + '</div><span class="tag"><span class="dot" style="background:' + (st ? st.color : '#F79300') + '"></span>Dia ' + n + ' de 7 · ' + (st ? st.short + ' · ' + st.verb : n === 5 ? 'Diagnóstico' : n === 6 ? 'PNL aplicada' : 'IA + compromisso') + '</span><h2 style="margin:10px 0 6px">' + d.title + '</h2><p class="muted">' + d.sub + '</p><div class="row" style="margin-top:6px;font-size:13px;color:var(--muted)">⏱ ' + d.min + ' min ' + (S.days[n] && S.days[n].step ? '· <b style="color:var(--gold)">em andamento</b>' : '') + '</div><button class="btn btn-gold btn-block" style="margin-top:14px" data-go="day" data-n="' + n + '">' + (S.days[n] && S.days[n].step ? 'Continuar o dia ' + n : 'Começar o dia ' + n) + ' →</button></div>'; }
  else todayCard = '<div class="card today dark"><div class="num" style="color:rgba(255,255,255,.06)">7</div><span class="tag" style="background:rgba(255,255,255,.12);color:#FFC53D">🏆 Desafio completo</span><h2 style="margin:10px 0 6px">Você saiu do modo chefe.</h2><p class="muted">Seu perfil e o plano da próxima semana estão prontos.</p><div class="row" style="margin-top:14px"><button class="btn btn-gold" style="flex:1" data-go="profile">Ver meu perfil</button><button class="btn btn-ghost" style="flex:1" data-act="restartWeek">Nova semana</button></div></div>';
  const week = '<div class="week">' + [1, 2, 3, 4, 5, 6, 7].map(i => '<button class="wd ' + (isDone(i) ? 'done' : i === n && S.diag ? 'cur' : '') + '" data-act="openDay" data-n="' + i + '" aria-label="Dia ' + i + '">' + i + '</button>').join('') + '</div>';
  const shape = S.diag ? '<div class="card"><div class="row between"><h3>Seu formato agora</h3><button class="link small" data-go="profile">ver perfil</button></div><p class="muted small" style="margin-top:2px">' + (sc._days ? 'Desenhado pelas suas ações em ' + sc._days + ' de 4 dias.' : 'Ponto de partida, pelo diagnóstico. Suas ações vão redesenhar.') + '</p>' + radarAnimated(sc, 300) + '</div>' : '';
  return topbar() + '<main class="view stack">' +
    '<section class="card dark"><div class="hello"><div class="ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="9"/><circle cx="50" cy="50" r="42" fill="none" stroke="url(#gg)" stroke-width="9" stroke-linecap="round" stroke-dasharray="' + C + '" stroke-dashoffset="' + C * (1 - pct) + '" style="transition:stroke-dashoffset 1s"/><defs><linearGradient id="gg"><stop offset="0" stop-color="#FFC53D"/><stop offset="1" stop-color="#F79300"/></linearGradient></defs></svg><div class="v"><div>' + dc + '/7<small>dias</small></div></div></div>' +
    '<div><div class="muted small">' + hi + ',</div><h2>' + esc(firstName()) + '</h2><div class="small" style="color:#FFC53D;font-weight:700;margin-top:2px">' + lv.name + '</div></div></div>' +
    '<div class="level"><div class="row between small muted" style="margin-bottom:6px"><span>⚡ ' + S.xp + ' XP</span><span>' + (lv.next ? 'Próximo: ' + lv.next + ' (' + lv.to + ')' : 'Nível máximo') + '</span></div><div class="bar"><i style="width:' + lvPct + '%"></i></div></div></section>' +
    todayCard +
    '<div class="card"><div class="row between"><h3>Sua semana</h3><span class="small muted">' + (S.streak ? '🔥 ' + S.streak + ' dia' + (S.streak > 1 ? 's' : '') + ' seguido' + (S.streak > 1 ? 's' : '') : '1 microação por dia') + '</span></div>' + week + '</div>' +
    shape + installCard() +
    (S.team ? '<button class="card row" style="width:100%;text-align:left" data-go="team"><span style="font-size:28px">👥</span><div><b>' + esc(S.team.name) + '</b><div class="small muted">Veja como o seu grupo está avançando</div></div><span style="margin-left:auto">→</span></button>' : '') +
    '</main>';
}
function radarAnimated(sc, size, opts) {
  opts = opts || {};
  const html = radar(sc, size, Object.assign({}, opts, { zero: true }));
  const c = size / 2, R = size * .38;
  const target = KEYS.map((k, i) => { const a = -Math.PI / 2 + i * Math.PI / 2; const v = Math.max(sc[k], 4); return [c + Math.cos(a) * R * v / 100, c + Math.sin(a) * R * v / 100].join(','); }).join(' ');
  return html.replace('<svg class="radar"', '<svg class="radar" data-target="' + target + '"').replace(/<circle[^>]*fill="#[0-9A-F]{6}" stroke="#fff"[^>]*\/>/g, '') ;
}

/* ---------- lista do desafio ---------- */
function viewJourney() {
  const item = i => { const d = DAYS[i]; const st = STY[d.key]; const done = isDone(i), un = unlocked(i);
    return '<button class="jitem ' + (done ? 'done' : '') + (un ? '' : ' lock') + '" data-act="openDay" data-n="' + i + '"><div class="jnum">' + i + '</div><div><div class="t">' + d.title + '</div><div class="s">' + (st ? st.name + ' · ' + st.verb : d.sub) + '</div></div><span class="r">' + (done ? '✅' : un ? '▶️' : '🔒') + '</span></button>'; };
  return topbar() + '<main class="view"><h1 style="font-size:30px">Sua semana, dia a dia</h1><p class="muted" style="margin-top:6px">Cinco dias úteis para construir o seu perfil. Um fim de semana para fixar a mudança.</p>' +
    '<div class="card" style="margin-top:16px"><div class="row between small"><b>Progresso</b><span class="muted">' + doneCount() + ' de 7</span></div><div class="bar light" style="margin-top:8px"><i style="width:' + doneCount() / 7 * 100 + '%"></i></div></div>' +
    '<button class="jitem ' + (S.diag ? 'done' : '') + '" style="margin-top:16px" data-act="startDiag"><div class="jnum">🧭</div><div><div class="t">Diagnóstico: que líder sou eu hoje?</div><div class="s">Ponto de partida · 2 min</div></div><span class="r">' + (S.diag ? '🔁' : '▶️') + '</span></button>' +
    '<div class="section-t">Dias úteis · cada dia alimenta um estilo</div>' + [1, 2, 3, 4, 5].map(item).join('') +
    '<div class="section-t">Fim de semana · aprofundamento e compromisso</div>' + [6, 7].map(item).join('') +
    '<p class="small muted" style="margin-top:16px">💡 O ideal é seguir um dia por vez. Se precisar, faça no seu ritmo: cada dia libera o seguinte.</p></main>';
}

/* ---------- diagnóstico inicial ---------- */
function viewDiag() {
  if (quiz.i >= DIAG.length) {
    const ds = diagScores(); const t = topK(ds), st = STY[t];
    return topbar('home') + '<main class="view stack"><div class="card dark" style="text-align:center"><div class="eyebrow">Seu estilo de partida</div><div style="font-size:54px;margin:8px 0" class="big">' + st.emoji + '</div><h1>' + st.name + '</h1><p style="color:#FFC53D;font-weight:700;margin-top:4px">' + st.verb + ' · ' + st.pillar + '</p><p class="muted" style="margin-top:10px">' + st.desc + '</p>' + radarAnimated(ds, 300, { dark: true }) + '</div>' +
      '<div class="card"><h3>Seu ponto de atenção</h3><p class="muted" style="margin-top:6px">' + st.grow + '</p><p class="muted" style="margin-top:10px">Seu estilo que pede mais treino agora: <b style="color:' + STY[low(ds)].color + '">' + STY[low(ds)].name + ' (' + STY[low(ds)].verb + ')</b>.</p></div>' +
      '<div class="card action"><h3>E agora?</h3><p style="margin-top:6px">Isto é um retrato do que você <b>acredita</b> que faz. Nos próximos dias, quem desenha o seu formato são as suas <b>ações</b>. No dia 7 você compara os dois.</p></div>' +
      '<button class="btn btn-gold btn-block" data-go="day" data-n="1">Começar o dia 1 →</button><button class="btn btn-ghost btn-block" data-go="home">Ir para o início</button></main>';
  }
  const q = DIAG[quiz.i]; const keys = shuffleSeed(KEYS, quiz.i);
  return '<main class="view" style="padding-top:calc(18px + env(safe-area-inset-top,0px))"><div class="row between"><button class="btn btn-ghost" style="padding:8px 12px" data-act="diagBack">←</button><span class="qcount">' + (quiz.i + 1) + ' de ' + DIAG.length + '</span></div>' +
    '<div class="steps" style="margin-top:14px">' + DIAG.map((_, i) => '<i class="' + (i <= quiz.i ? 'on' : '') + '"></i>').join('') + '</div>' +
    '<h2 style="margin:18px 0 18px;font-size:23px">' + q.q + '</h2>' +
    keys.map((k, j) => '<button class="opt ' + (quiz.a[quiz.i] === k ? 'on' : '') + '" data-act="diagPick" data-k="' + k + '"><b>' + 'ABCD'[j] + '</b>' + q.o[k] + '</button>').join('') +
    '<p class="small muted" style="margin-top:16px">Não existe resposta certa. Escolha o que você realmente faz no dia a dia.</p></main>';
}
function shuffleSeed(arr, seed) { const a = arr.slice(); let s = seed * 9301 + 49297; for (let i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor(s / 233280 * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/* ---------- dia ---------- */
function stepsFor(n) { return n <= 4 ? ['read', 'action', 'self', 'note'] : n === 5 ? ['read', 'test', 'result'] : n === 6 ? ['read', 'beliefs', 'reframe'] : ['read', 'diary', 'plan', 'reveal']; }
function viewDay() {
  const n = route.n, d = DAYS[n], st = STY[d.key], s = D(n), steps = stepsFor(n);
  dayStep = Math.min(s.step || 0, steps.length - 1);
  if (s.done && route.review !== false && dayStep === 0 && !route.fresh) dayStep = 0;
  const cur = steps[dayStep];
  const head = '<div class="row between"><button class="btn btn-ghost" style="padding:8px 12px" data-go="journey">✕</button><span class="tag"><span class="dot" style="background:' + (st ? st.color : '#F79300') + '"></span>Dia ' + n + ' · ' + (st ? st.verb : d.title.split(' ')[0]) + '</span><span class="qcount">' + (dayStep + 1) + '/' + steps.length + '</span></div>' +
    '<div class="steps" style="margin-top:14px">' + steps.map((_, i) => '<i class="' + (i <= dayStep ? 'on' : '') + '"></i>').join('') + '</div>';
  let body = '', canNext = true, nextLabel = 'Continuar →';
  if (cur === 'read') { body = '<div class="eyebrow">Leitura do dia · ' + d.min + ' min no total</div><h1 style="margin:6px 0 16px;font-size:30px">' + d.title + '</h1><div class="read">' + d.read + '</div>'; nextLabel = n <= 4 ? 'Ver a microação de hoje →' : n === 5 ? 'Fazer o teste →' : n === 6 ? 'Começar o exercício →' : 'Abrir meu diário →'; }
  if (cur === 'action') { const ck = s.checks || [false, false, false];
    body = '<div class="eyebrow">Microação de hoje</div><div class="card action" style="margin-top:10px"><div style="font-size:30px">🎯</div><h2 style="margin:6px 0 8px;font-size:21px">' + d.action + '</h2><p class="small muted">Faça ao longo do dia. Pode voltar aqui depois: seu progresso fica salvo.</p></div>' +
      '<h3 style="margin:20px 0 10px">Checklist do dia</h3>' + d.checks.map((c, i) => '<button class="check ' + (ck[i] ? 'on' : '') + '" data-act="check" data-i="' + i + '"><span class="box"></span><span>' + c + '</span></button>').join('');
    nextLabel = ck.filter(Boolean).length ? 'Fazer minha autoavaliação →' : 'Já apliquei, quero avaliar →'; }
  if (cur === 'self') { const lk = s.likert || [];
    body = '<div class="eyebrow">Autoavaliação</div><h2 style="margin:6px 0 4px">Como você se vê hoje em ' + st.verb + '?</h2><p class="muted small">De 1 (quase nunca) a 5 (quase sempre). É isso que desenha o seu formato.</p>' +
      d.likert.map((q, i) => '<div class="likert"><div class="q">' + q + '</div><div class="scale">' + [1, 2, 3, 4, 5].map(v => '<button class="' + (lk[i] === v ? 'on' : '') + '" data-act="likert" data-i="' + i + '" data-v="' + v + '">' + v + '</button>').join('') + '</div><div class="scale-l"><span>Quase nunca</span><span>Quase sempre</span></div></div>').join('');
    canNext = d.likert.every((_, i) => lk[i]); }
  if (cur === 'note') { body = '<div class="eyebrow">Registro do dia</div><h2 style="margin:6px 0 10px">' + d.note + '</h2><textarea data-field="note" placeholder="Escreva em poucas linhas. Só você vê isso.">' + esc(s.note || '') + '</textarea><p class="small muted" style="margin-top:8px">✍️ Registrar dobra a fixação do aprendizado (+20 XP).</p>' + aiBlock(n); nextLabel = 'Concluir o dia ' + n + ' ✓'; }
  if (cur === 'test') { const pa = s.pa || []; const i = Math.min(s.paI || 0, PA.length - 1);
    body = '<div class="eyebrow">Poder x Autoridade · ' + (i + 1) + ' de ' + PA.length + '</div><div class="bar light" style="margin:10px 0 18px"><i style="width:' + (pa.filter(x => x != null).length / PA.length * 100) + '%"></i></div><h2 style="margin-bottom:14px">O que você realmente faz?</h2>' +
      PA[i].map((t, j) => { const k = (i % 2) ? 1 - j : j; return '<button class="opt ' + (pa[i] === k ? 'on' : '') + '" data-act="paPick" data-k="' + k + '"><b>' + 'AB'[j] + '</b>' + PA[i][k] + '</button>'; }).join('') +
      (i > 0 ? '<button class="link small" style="margin-top:14px" data-act="paBack">← questão anterior</button>' : '');
    canNext = pa.filter(x => x != null).length === PA.length; nextLabel = 'Ver meu resultado →'; }
  if (cur === 'result') { const v = paScore() || 0, z = paZone(v);
    body = '<div class="card dark" style="text-align:center"><div class="eyebrow">Seu resultado</div><h1 style="margin:8px 0">' + z[0] + '</h1><div class="gauge"><i id="gi" style="left:0%"></i></div><div class="row between small muted"><span>Poder</span><span>Autoridade</span></div><div style="font:800 46px var(--font-d);color:#FFC53D;margin-top:10px">' + v + '%</div><div class="muted small">das suas respostas vêm da autoridade</div></div><div class="card" style="margin-top:14px"><p>' + z[1] + '</p></div>' +
      '<div class="card" style="margin-top:14px"><h3>Onde o poder ainda aparece</h3><ul style="margin:8px 0 0 18px" class="muted">' + PA.map((p, i) => (s.pa || [])[i] === 0 ? '<li>' + p[0] + '</li>' : '').join('') + '</ul>' + ((s.pa || []).every(x => x === 1) ? '<p class="muted">Em nenhuma das situações. Excelente!</p>' : '') + '</div>' + aiBlock(5);
    nextLabel = 'Concluir o dia 5 ✓';
    setTimeout(() => { const g = $('#gi'); if (g) g.style.left = v + '%'; }, 120); }
  if (cur === 'beliefs') { const bs = s.beliefs || [];
    body = '<div class="eyebrow">Passo 1 · Identificar</div><h2 style="margin:6px 0 4px">Quais destas frases já passaram pela sua cabeça?</h2><p class="muted small">Marque todas que você reconhece. Depois toque na <b>estrela</b> da que mais pesa.</p>' +
      BELIEFS.map((b, i) => '<div class="row" style="gap:8px"><button class="belief ' + (bs.includes(i) ? 'on' : '') + (s.pick === i ? ' pick' : '') + '" data-act="belief" data-i="' + i + '" style="flex:1">' + (bs.includes(i) ? '🔴 ' : '⚪ ') + b.b + '</button>' + (bs.includes(i) ? '<button class="btn btn-ghost" style="margin-top:8px;padding:12px" data-act="beliefPick" data-i="' + i + '" aria-label="Esta é a que mais pesa">' + (s.pick === i ? '⭐' : '☆') + '</button>' : '') + '</div>').join('');
    canNext = s.pick != null && bs.includes(s.pick); nextLabel = 'Ressignificar →'; }
  if (cur === 'reframe') { const b = BELIEFS[s.pick] || BELIEFS[0];
    body = '<div class="eyebrow">Passo 2 · Ressignificar</div><div class="card" style="margin-top:10px;background:#FFF2F2;border-color:#F6C9C9"><div class="small muted">Crença que trava</div><h3 style="margin-top:4px">“' + b.b + '”</h3></div>' +
      '<label class="f">1. Que evidência você já viu de que isso nem sempre é verdade?</label><textarea data-field="r1" style="min-height:80px">' + esc(s.r1 || '') + '</textarea>' +
      '<label class="f">2. O que essa crença está custando para você e para o time?</label><textarea data-field="r2" style="min-height:80px">' + esc(s.r2 || '') + '</textarea>' +
      '<label class="f">3. Qual crença nova te serve melhor a partir de hoje?</label><textarea data-field="r3" style="min-height:80px" placeholder="Sugestão: ' + esc(b.n) + '">' + esc(s.r3 || '') + '</textarea>' +
      '<button class="link small" style="margin-top:8px" data-act="useSuggest">Usar a sugestão</button>' + aiBlock(6);
    canNext = (s.r3 || '').trim().length > 3; nextLabel = 'Concluir o dia 6 ✓'; }
  if (cur === 'diary') { body = '<div class="eyebrow">Diário de Liderança com IA</div><h2 style="margin:6px 0 8px">Seu prompt já está pronto</h2><p class="muted">Ele foi montado com os seus resultados da semana. Copie e cole no seu assistente de IA favorito. Responda às perguntas que ele fizer: esse é o seu diário.</p><div class="prompt" style="margin-top:14px">' + esc(buildPrompt()) + '</div>' +
      '<div class="grid2" style="margin-top:12px"><button class="btn btn-blue" data-act="copyPrompt">📋 Copiar prompt</button><button class="btn btn-ghost" data-act="openAI" data-u="https://chatgpt.com/">Abrir ChatGPT</button><button class="btn btn-ghost" data-act="openAI" data-u="https://gemini.google.com/app">Abrir Gemini</button><button class="btn btn-ghost" data-act="openAI" data-u="https://claude.ai/new">Abrir Claude</button></div>' +
      '<label class="f">O principal aprendizado da sua semana (opcional)</label><textarea data-field="diary" placeholder="O que a IA te ajudou a enxergar?">' + esc(s.diary || '') + '</textarea>'; nextLabel = 'Montar meu plano →'; }
  if (cur === 'plan') { const sc = scores(); const lo = low(sc); const plan = s.plan || [];
    const opts = PLAN[lo].map(t => ({ t, k: lo })).concat(PLAN[KEYS.filter(k => k !== lo).sort((a, b) => sc[a] - sc[b])[0]].slice(0, 2).map(t => ({ t, k: '' })));
    body = '<div class="eyebrow">Plano da próxima semana</div><h2 style="margin:6px 0 6px">Escolha 3 compromissos</h2><p class="muted small">Seu ponto de desenvolvimento é <b style="color:' + STY[lo].color + '">' + STY[lo].name + ' · ' + STY[lo].verb + '</b>, por isso as sugestões começam por ele.</p>' +
      opts.map(o => '<button class="check ' + (plan.includes(o.t) ? 'on' : '') + '" data-act="planPick" data-t="' + esc(o.t) + '"><span class="box"></span><span>' + o.t + '</span></button>').join('');
    canNext = plan.length === 3; nextLabel = plan.length === 3 ? 'Revelar meu perfil ✨' : 'Escolha ' + (3 - plan.length) + ' compromisso' + (3 - plan.length > 1 ? 's' : ''); }
  if (cur === 'reveal') { body = '<div class="celebrate"><div class="big">✨</div><h1 style="margin:10px 0">Tudo pronto, ' + esc(firstName()) + '.</h1><p class="muted">Suas ações dos dias 1 a 4 desenharam o formato da sua liderança. Toque para revelar.</p></div>'; nextLabel = 'Revelar meu perfil ✨'; }
  return '<main class="view" style="padding-top:calc(18px + env(safe-area-inset-top,0px))">' + head + '<div style="margin-top:8px">' + body + '</div>' +
    '<div class="footer-actions">' + (dayStep > 0 ? '<button class="btn btn-ghost" style="flex:0 0 auto" data-act="dayPrev">←</button>' : '') + '<button class="btn btn-gold" data-act="dayNext" ' + (canNext ? '' : 'disabled') + '>' + nextLabel + '</button></div></main>';
}

function completeDay(n) {
  const s = D(n); if (s.done) { afterComplete(n, 0); return; }
  s.done = Date.now(); let xp = 100;
  if (n <= 4) { xp += (s.checks || []).filter(Boolean).length * 10; if ((s.note || '').trim().length >= 20) xp += 20; }
  if (n === 6 && (s.r1 || '').trim() && (s.r2 || '').trim()) xp += 30;
  const t = today(); if (S.lastDone === t) {} else if (S.lastDone === yesterday()) S.streak++; else S.streak = 1; S.lastDone = t;
  S.xp += xp; save();
  award('d1'); if (S.streak >= 3) award('streak3'); if (n === 5) { award('pa'); if ((paScore() || 0) >= 70) award('auth'); } if (n === 6) award('belief'); if (n === 7) award('done');
  sync(); afterComplete(n, xp);
}
function afterComplete(n, xp) {
  if (n === 7) { go('profile', { reveal: true }); confetti(); return; }
  confetti();
  const nx = n + 1, d = DAYS[nx];
  modal('<div class="celebrate"><div class="big">' + (n === 5 ? '⚖️' : n === 6 ? '🧠' : '🎉') + '</div><h2 style="margin:10px 0 4px">Dia ' + n + ' concluído!</h2>' + (xp ? '<div class="xpfly">+' + xp + ' XP</div>' : '') +
    '<p class="muted" style="margin-top:8px">' + (S.streak > 1 ? '🔥 ' + S.streak + ' dias seguidos. ' : '') + doneCount() + ' de 7 dias feitos.</p>' +
    (d ? '<div class="card" style="margin-top:16px;text-align:left"><div class="small muted">Amanhã · Dia ' + nx + '</div><b>' + d.title + '</b><div class="small muted">' + d.sub + '</div></div>' : '') +
    '<button class="btn btn-gold btn-block" style="margin-top:16px" data-close>Ir para o início</button>' + (d ? '<button class="btn btn-ghost btn-block" style="margin-top:8px" data-close data-go="day" data-n="' + nx + '">Quero fazer o dia ' + nx + ' agora</button>' : '') + '</div>', () => { if (route.v === 'day') go('home'); });
}

/* ---------- perfil ---------- */
function viewProfile() {
  const sc = scores(), ds = diagScores();
  if (!S.diag && !sc._days) return topbar() + '<main class="view"><div class="card" style="text-align:center"><div style="font-size:48px">🧭</div><h2 style="margin:8px 0">Seu perfil começa aqui</h2><p class="muted">Faça o diagnóstico de 2 minutos para ver o seu formato de partida.</p><button class="btn btn-gold btn-block" style="margin-top:14px" data-act="startDiag">Fazer meu diagnóstico</button></div>' + badgesCard() + '</main>';
  const t = topK(sc), st = STY[t], final = isDone(7), pa = paScore();
  const plan = (S.days[7] && S.days[7].plan) || [];
  return topbar() + '<main class="view stack">' +
    '<div class="card dark" style="text-align:center"><div class="eyebrow">' + (final ? 'Meu perfil de líder da semana' : sc._days ? 'Perfil em construção · ' + sc._days + '/4 dias' : 'Estilo de partida') + '</div><div style="font-size:50px;margin-top:6px" class="' + (route.reveal ? 'big' : '') + '">' + st.emoji + '</div><h1>' + st.name + '</h1><p style="color:#FFC53D;font-weight:700">' + st.verb + ' · ' + sc[t] + '%</p><p class="muted" style="margin-top:8px">' + st.desc + '</p>' +
    radarAnimated(sc, 300, { dark: true, compare: final && ds ? ds : null }) + (final && ds ? '<p class="small muted">Linha tracejada: seu diagnóstico do início. Área dourada: o que suas ações mostraram.</p>' : '') + legend(sc) + '</div>' +
    (final ? '<div class="card"><h3>📣 Cartão de resultado</h3><p class="muted small" style="margin-top:4px">Pronto para compartilhar nas suas redes ou enviar para o seu gestor.</p><div id="cardWrap" style="margin-top:12px"></div><div class="grid2" style="margin-top:12px"><button class="btn btn-gold" data-act="shareCard">Compartilhar</button><button class="btn btn-ghost" data-act="downloadCard">Baixar imagem</button></div></div>' : '') +
    '<div class="card"><h3>Ponto forte e ponto de atenção</h3><p style="margin-top:8px"><b style="color:' + st.color + '">Força: ' + st.verb + '.</b> ' + st.desc + '</p><p style="margin-top:8px"><b style="color:' + STY[low(sc)].color + '">Desenvolver: ' + STY[low(sc)].verb + '.</b> ' + STY[low(sc)].grow + '</p></div>' +
    (pa != null ? '<div class="card"><div class="row between"><h3>⚖️ Poder x Autoridade</h3><b style="color:var(--royal)">' + pa + '%</b></div><div class="gauge"><i style="left:' + pa + '%"></i></div><p class="muted small">' + paZone(pa)[0] + '</p></div>' : '') +
    (plan.length ? '<div class="card action"><h3>🗓️ Plano da próxima semana</h3>' + plan.map(p => '<div class="row" style="margin-top:10px;align-items:flex-start"><span>✅</span><span>' + esc(p) + '</span></div>').join('') + '<button class="btn btn-ghost btn-block" style="margin-top:14px" data-act="ics">📅 Colocar lembretes na agenda</button></div>' : '') +
    (S.days[6] && S.days[6].r3 ? '<div class="card"><h3>🧠 Minha nova crença</h3><p style="margin-top:6px;font-family:var(--font-d);font-size:19px;color:var(--royal)">“' + esc(S.days[6].r3) + '”</p></div>' : '') +
    badgesCard() + (!final ? '<div class="card" style="text-align:center"><p class="muted">O perfil completo, a comparação com o início e o cartão de resultado são liberados no <b>dia 7</b>.</p><button class="btn btn-blue btn-block" style="margin-top:12px" data-go="journey">Continuar o desafio</button></div>' : '') +
    '</main>';
}
function badgesCard() { return '<div class="card"><h3>Conquistas</h3><div class="badges" style="margin-top:12px">' + BADGES.map(b => '<div class="badge ' + (S.badges[b.id] ? 'on' : '') + '"><span class="e">' + b.e + '</span>' + b.t + '</div>').join('') + '</div></div>'; }

/* ---------- cartão (canvas) ---------- */
let logoImg = null;
function loadLogo() { return new Promise(r => { if (logoImg) return r(logoImg); const i = new Image(); i.onload = () => { logoImg = i; r(i); }; i.onerror = () => r(null); i.src = 'logo.webp'; }); }
async function drawCard() {
  try { await document.fonts.ready; } catch (e) {}
  const lg = await loadLogo();
  const W = 1080, H = 1350, cv = document.createElement('canvas'); cv.width = W; cv.height = H; const x = cv.getContext('2d');
  const g = x.createRadialGradient(150, 100, 50, 300, 300, 1400); g.addColorStop(0, '#1b3c95'); g.addColorStop(.55, '#061233'); g.addColorStop(1, '#040b22'); x.fillStyle = g; x.fillRect(0, 0, W, H);
  const sc = scores(), t = topK(sc), st = STY[t];
  // topo
  rr(x, 70, 70, 400, 110, 26, '#fff'); if (lg) x.drawImage(lg, 95, 85, 280, 280 * 181 / 560); rr(x, 385, 103, 62, 44, 10, '#F79300'); x.fillStyle = '#061233'; x.font = '800 26px Inter, sans-serif'; x.textAlign = 'center'; x.fillText('IA', 416, 135);
  x.textAlign = 'left'; x.fillStyle = '#FFC53D'; x.font = '700 30px Inter, sans-serif'; x.fillText('MEU PERFIL DE LÍDER DA SEMANA', 70, 260);
  x.fillStyle = '#fff'; x.font = '800 92px Fraunces, Georgia, serif'; x.fillText(st.name, 70, 370);
  x.fillStyle = '#FFC53D'; x.font = '600 46px Fraunces, Georgia, serif'; x.fillText(st.verb + ' · ' + sc[t] + '%', 70, 440);
  x.fillStyle = '#AFC0EE'; x.font = '500 34px Inter, sans-serif'; x.fillText(S.user.name ? S.user.name + (S.user.role ? ' · ' + S.user.role : '') : '', 70, 500);
  // radar
  const cx = 800, cy = 800, R = 150; x.strokeStyle = 'rgba(255,255,255,.15)'; x.lineWidth = 2;
  [25, 50, 75, 100].forEach(v => { x.beginPath(); KEYS.forEach((k, i) => { const a = -Math.PI / 2 + i * Math.PI / 2; const px = cx + Math.cos(a) * R * v / 100, py = cy + Math.sin(a) * R * v / 100; i ? x.lineTo(px, py) : x.moveTo(px, py); }); x.closePath(); x.stroke(); });
  const gg = x.createLinearGradient(cx - R, cy - R, cx + R, cy + R); gg.addColorStop(0, 'rgba(255,197,61,.9)'); gg.addColorStop(1, 'rgba(61,123,255,.75)');
  x.beginPath(); KEYS.forEach((k, i) => { const a = -Math.PI / 2 + i * Math.PI / 2; const v = Math.max(sc[k], 4); const px = cx + Math.cos(a) * R * v / 100, py = cy + Math.sin(a) * R * v / 100; i ? x.lineTo(px, py) : x.moveTo(px, py); }); x.closePath(); x.fillStyle = gg; x.fill(); x.strokeStyle = '#F79300'; x.lineWidth = 5; x.stroke();
  x.fillStyle = '#DCE6FF'; x.font = '700 24px Inter, sans-serif';
  [[cx, cy - R - 22, 'center'], [cx + R + 12, cy + 8, 'left'], [cx, cy + R + 40, 'center'], [cx - R - 12, cy + 8, 'right']].forEach((q, i) => { x.textAlign = q[2]; x.fillText(STY[KEYS[i]].verb, q[0], q[1]); });
  // barras
  x.textAlign = 'left'; KEYS.forEach((k, i) => { const y = 640 + i * 120; x.fillStyle = '#fff'; x.font = '700 32px Inter, sans-serif'; x.fillText(STY[k].short, 70, y); x.fillStyle = '#AFC0EE'; x.textAlign = 'right'; x.fillText(sc[k] + '%', 470, y); x.textAlign = 'left'; rr(x, 70, y + 20, 400, 18, 9, 'rgba(255,255,255,.14)'); rr(x, 70, y + 20, Math.max(18, 400 * sc[k] / 100), 18, 9, STY[k].color); });
  const pa = paScore(); if (pa != null) { x.fillStyle = '#AFC0EE'; x.font = '600 30px Inter, sans-serif'; x.fillText('Poder x Autoridade: ' + pa + '% autoridade', 70, 1150); }
  x.fillStyle = 'rgba(255,255,255,.12)'; x.fillRect(70, 1190, W - 140, 2);
  x.fillStyle = '#fff'; x.font = '700 34px Inter, sans-serif'; x.fillText('Desafio Smart Líder IA · 7 dias', 70, 1260); x.fillStyle = '#FFC53D'; x.textAlign = 'right'; x.font = '600 30px Inter, sans-serif'; x.fillText('by Pedro Berto', W - 70, 1260);
  return cv;
}
function rr(x, a, b, w, h, r, fill) { x.beginPath(); x.moveTo(a + r, b); x.arcTo(a + w, b, a + w, b + h, r); x.arcTo(a + w, b + h, a, b + h, r); x.arcTo(a, b + h, a, b, r); x.arcTo(a, b, a + w, b, r); x.closePath(); x.fillStyle = fill; x.fill(); }
async function renderCardPreview() { const w = $('#cardWrap'); if (!w) return; const cv = await drawCard(); const img = new Image(); img.className = 'cardimg'; img.alt = 'Cartão de resultado'; img.src = cv.toDataURL('image/png'); w.innerHTML = ''; w.appendChild(img); }

/* ---------- prompt de IA ---------- */
function buildPrompt() {
  const sc = scores(), t = topK(sc), lo = low(sc), pa = paScore(); const b = S.days[6] && S.days[6].pick != null ? BELIEFS[S.days[6].pick].b : null;
  return 'Você é meu mentor de liderança, especialista no método Smart Líder (4 comportamentos: Consciência, Guiar, Inspirar e Desenvolver).\n\n' +
    'Meu contexto:\n- Nome: ' + (S.user.name || 'Líder') + (S.user.role ? '\n- Cargo: ' + S.user.role : '') +
    '\n- Estilo predominante: ' + STY[t].name + ' (' + STY[t].verb + ', ' + sc[t] + '%)\n- Ponto a desenvolver: ' + STY[lo].name + ' (' + STY[lo].verb + ', ' + sc[lo] + '%)' +
    '\n- Notas da semana: ' + KEYS.map(k => STY[k].verb + ' ' + sc[k] + '%').join(', ') +
    (pa != null ? '\n- Diagnóstico Poder x Autoridade: ' + pa + '% autoridade (' + paZone(pa)[0] + ')' : '') +
    (b ? '\n- Crença que me trava: "' + b + '"' : '') +
    '\n\nConduza meu Diário de Liderança de hoje:\n1. Faça UMA pergunta por vez sobre uma situação real que vivi com minha equipe hoje e espere minha resposta.\n2. Depois de 3 perguntas, me mostre onde agi como chefe e onde agi como líder, com exemplos do que eu contei.\n3. Sugira 1 microação de 10 minutos para amanhã, focada em ' + STY[lo].verb + '.\n4. Termine com uma frase curta para eu ler antes da minha próxima reunião.\n\nSeja direto, prático e use exemplos do dia a dia de equipes brasileiras.';
}

function buildDayPrompt(n) {
  const d = DAYS[n], s = S.days[n] || {}, st = STY[d.key];
  let ctx = '';
  if (n <= 4) { const ck = d.checks.filter((c, i) => (s.checks || [])[i]); ctx = '- Microação de hoje: ' + d.action + '\n- O que eu cumpri: ' + (ck.length ? ck.join('; ') : 'ainda nada') + '\n- Meu registro: ' + ((s.note || '').trim() || '(ainda não escrevi)'); }
  if (n === 5) { const v = paScore(); ctx = '- Resultado Poder x Autoridade: ' + (v != null ? v + '% autoridade (' + paZone(v)[0] + ')' : 'ainda não concluído') + '\n- Onde o poder ainda aparece: ' + (PA.filter((p, i) => (s.pa || [])[i] === 0).map(p => p[0]).join('; ') || 'nenhum ponto'); }
  if (n === 6) { const b = s.pick != null ? BELIEFS[s.pick].b : null; ctx = '- Crença que me trava: ' + (b ? '"' + b + '"' : '(ainda não escolhi)') + '\n- Evidência contrária: ' + ((s.r1 || '').trim() || '-') + '\n- O que ela me custa: ' + ((s.r2 || '').trim() || '-') + '\n- Minha nova crença: ' + ((s.r3 || '').trim() || '-'); }
  if (n === 7) return buildPrompt();
  return 'Você é meu mentor de liderança no método Smart Líder (Consciência, Guiar, Inspirar e Desenvolver).\n\n' +
    'Hoje é o dia ' + n + ' do meu desafio de 7 dias: ' + d.title + (st ? ' (' + st.name + ' · ' + st.verb + ')' : '') + '.\n' +
    '- Nome: ' + (S.user.name || 'Líder') + (S.user.role ? ', ' + S.user.role : '') + '\n' + ctx +
    '\n\nConduza meu Diário de Liderança de hoje:\n1. Faça UMA pergunta por vez sobre como foi a prática de hoje com minha equipe e espere minha resposta.\n2. Depois de 3 perguntas, mostre onde agi como chefe e onde agi como líder, usando o que eu contei.\n3. Sugira 1 ajuste concreto para amanhã, de no máximo 10 minutos.\n4. Feche com uma frase curta para eu lembrar amanhã cedo.\n\nSeja direto, prático e use exemplos de equipes brasileiras.';
}
function aiBlock(n) {
  return '<div class="card" style="margin-top:18px"><h3>🤖 Diário de Liderança com IA</h3><p class="muted small" style="margin-top:4px">Prompt pronto com o que você fez hoje. Copie, cole na IA e responda: 5 minutos que fixam o aprendizado.</p>' +
    '<details style="margin-top:10px"><summary class="link small" style="cursor:pointer">Ver o prompt</summary><div class="prompt" style="margin-top:8px">' + esc(buildDayPrompt(n)) + '</div></details>' +
    '<div class="grid2" style="margin-top:12px"><button class="btn btn-blue" data-act="copyPrompt" data-n="' + n + '">📋 Copiar prompt</button><button class="btn btn-ghost" data-act="openAI" data-n="' + n + '" data-u="https://chatgpt.com/">ChatGPT</button><button class="btn btn-ghost" data-act="openAI" data-n="' + n + '" data-u="https://gemini.google.com/app">Gemini</button><button class="btn btn-ghost" data-act="openAI" data-n="' + n + '" data-u="https://claude.ai/new">Claude</button></div></div>';
}

/* ---------- equipe ---------- */
async function rpc(fn, body) {
  const r = await fetch(SB_URL + '/rest/v1/rpc/' + fn, { method: 'POST', headers: { apikey: SB_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if (!r.ok) throw new Error('rpc ' + r.status); const t = await r.text(); return t ? JSON.parse(t) : null;
}
async function sync() {
  if (!S.team) return; const sc = scores(); const t = (S.diag || sc._days) ? STY[topK(sc)].short : '';
  try { await rpc('sl_sync', { p_member: S.memberId, p_code: S.team.code, p_name: S.user.name || 'Líder', p_role: S.user.role || '', p_done: doneCount(), p_xp: S.xp, p_streak: S.streak, p_style: t, p_scores: { int: sc.int, com: sc.com, rel: sc.rel, imp: sc.imp, pa: paScore() } }); S.pending = false; }
  catch (e) { S.pending = true; } save();
}
let board = null, boardErr = false;
async function loadBoard() {
  try { board = await rpc('sl_board', { p_code: S.team.code }); boardErr = false; } catch (e) { boardErr = true; }
  if (route.v === 'team') { const el = $('#board'); if (el) el.innerHTML = boardHTML(); const st = $('#teamStats'); if (st) st.innerHTML = teamStatsHTML(); animateRadar(); }
}
function boardHTML() {
  if (boardErr) return '<p class="muted">Sem conexão agora. Tente de novo em instantes.</p>';
  if (!board) return '<p class="muted">Carregando o grupo…</p>';
  if (!board.length) return '<p class="muted">Ninguém por aqui ainda. Convide os líderes com o código acima.</p>';
  return board.map((m, i) => { const k = KEYS.find(k => STY[k].short === m.style); const col = k ? STY[k].color : '#0A3CB0'; return '<div class="member"><div class="avatar" style="background:' + col + '">' + esc((m.name || '?').trim().charAt(0).toUpperCase()) + '</div><div><div class="n">' + (i < 3 && m.done ? ['🥇 ', '🥈 ', '🥉 '][i] : '') + esc(m.name) + '</div><div class="m">' + (m.role ? esc(m.role) + ' · ' : '') + (m.style ? esc(m.style) : 'sem perfil ainda') + (m.streak ? ' · 🔥 ' + m.streak : '') + '</div></div><div class="p">' + m.done + '/7<div class="small muted" style="font:600 11px var(--font-b)">' + m.xp + ' XP</div></div></div>'; }).join('');
}
function teamStatsHTML() {
  if (!board || !board.length) return '';
  const avg = {}; KEYS.forEach(k => { const v = board.map(m => m.scores && m.scores[k]).filter(x => x > 0); avg[k] = v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length) : 0; });
  const comp = Math.round(board.reduce((a, m) => a + m.done, 0) / (board.length * 7) * 100);
  const fin = board.filter(m => m.done === 7).length;
  const dist = KEYS.map(k => ({ k, n: board.filter(m => m.style === STY[k].short).length }));
  const pas = board.map(m => m.scores && m.scores.pa).filter(x => x != null); const paAvg = pas.length ? Math.round(pas.reduce((a, b) => a + b, 0) / pas.length) : null;
  return '<div class="grid2"><div class="lg"><div class="k">Líderes</div><div class="v">' + board.length + '</div></div><div class="lg"><div class="k">Conclusão média</div><div class="v">' + comp + '%</div></div><div class="lg"><div class="k">Concluíram os 7 dias</div><div class="v">' + fin + '</div></div><div class="lg"><div class="k">Autoridade média</div><div class="v">' + (paAvg != null ? paAvg + '%' : '–') + '</div></div></div>' +
    (KEYS.some(k => avg[k]) ? '<h3 style="margin-top:18px">Formato médio do grupo</h3>' + radarAnimated(avg, 280) + '<h3 style="margin-top:8px">Estilos predominantes</h3>' + dist.map(d => '<div style="margin-top:10px"><div class="row between small"><b style="color:' + STY[d.k].color + '">' + STY[d.k].name + '</b><span class="muted">' + d.n + '</span></div><div class="bar light" style="margin-top:4px"><i style="width:' + (d.n / board.length * 100) + '%;background:' + STY[d.k].color + '"></i></div></div>').join('') : '');
}
function inviteLink() { return location.origin + location.pathname + '?time=' + S.team.code; }
let teamTab = 'create';
function viewTeam() {
  if (!S.team) return topbar() + '<main class="view stack"><div class="card dark"><div style="font-size:40px">👥</div><h2 style="margin:6px 0">Faça o desafio em grupo</h2><p class="muted">Junte os líderes da empresa: cada um faz o seu desafio, e o grupo acompanha o avanço de todos num painel com ranking, formato médio e estilos predominantes.</p></div>' +
    '<div class="card"><div class="seg"><button class="' + (teamTab === 'create' ? 'on' : '') + '" data-act="teamTab" data-t="create">Criar grupo</button><button class="' + (teamTab === 'join' ? 'on' : '') + '" data-act="teamTab" data-t="join">Entrar com código</button></div>' +
    (teamTab === 'create' ? '<label class="f">Nome do grupo</label><input type="text" id="tName" maxlength="80" placeholder="Ex.: Líderes Comercial"><label class="f">Empresa (opcional)</label><input type="text" id="tCompany" maxlength="80"><button class="btn btn-gold btn-block" style="margin-top:16px" data-act="createTeam">Criar e gerar código</button>'
      : '<label class="f">Código do grupo</label><input type="text" id="tCode" maxlength="6" placeholder="Ex.: K7H4QP" style="text-transform:uppercase;letter-spacing:.2em;font-weight:800"><button class="btn btn-gold btn-block" style="margin-top:16px" data-act="joinTeam">Entrar no grupo</button>') +
    '<p class="small muted" style="margin-top:12px">O grupo vê só o resumo: nome, cargo, dias concluídos, pontos e estilo. Suas anotações pessoais nunca saem do seu aparelho.</p></div></main>';
  return topbar() + '<main class="view stack"><div class="card dark"><div class="row between"><div><div class="eyebrow">Grupo</div><h2>' + esc(S.team.name) + '</h2>' + (S.team.company ? '<div class="muted small">' + esc(S.team.company) + '</div>' : '') + '</div><button class="btn btn-ghost" style="padding:8px 12px" data-act="refreshBoard">↻</button></div></div>' +
    '<div class="card"><div class="small muted" style="margin-bottom:8px">Código de convite</div><div class="code">' + esc(S.team.code) + '</div><div class="grid2" style="margin-top:12px"><button class="btn btn-blue" data-act="shareInvite">Convidar líderes</button><button class="btn btn-ghost" data-act="copyInvite">Copiar link</button></div></div>' +
    '<div class="card"><h3>Ranking do grupo</h3><div id="board" style="margin-top:6px">' + boardHTML() + '</div></div>' +
    '<div class="card"><h3>Painel do gestor</h3><div id="teamStats" style="margin-top:12px">' + teamStatsHTML() + '</div></div>' +
    '<button class="btn btn-ghost btn-block" data-act="leaveTeam">Sair do grupo</button></main>';
}

/* ---------- mais ---------- */
let deferredInstall = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredInstall = e; if (route.v === 'home' || route.v === 'more') render(); });
window.addEventListener('appinstalled', () => { deferredInstall = null; toast('App instalado! 🎉'); });
const inFrame = (() => { try { return window.self !== window.top; } catch (e) { return true; } })();
const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
function installCard() {
  if (standalone || S.hideInstall) return '';
  return '<div class="card"><div class="install-hint"><div class="ic"></div><div style="flex:1"><b>Tenha o Smart Líder na tela inicial</b><div class="small muted">Abre como app, no celular ou no computador.</div></div></div><div class="row" style="margin-top:12px"><button class="btn btn-blue" style="flex:1" data-act="install">Instalar app</button><button class="btn btn-ghost" data-act="hideInstall">Agora não</button></div></div>';
}
function viewMore() {
  const it = (e, t, act, extra) => '<button ' + act + '><span class="e">' + e + '</span><span>' + t + (extra ? '<div class="small muted" style="font-weight:500">' + extra + '</div>' : '') + '</span><span class="chev">›</span></button>';
  return topbar() + '<main class="view stack"><div class="card mlist">' +
    it('📘', 'E-book do desafio', 'data-go="ebook"', 'Leia todos os capítulos no app') +
    it('🤖', 'Prompt de IA do diário', 'data-go="prompt"', 'Pronto para ChatGPT, Gemini ou Claude') +
    it('🧭', 'Refazer o diagnóstico', 'data-act="startDiag"', 'Veja se o seu estilo de partida mudou') +
    it('📅', 'Lembrete diário na agenda', 'data-act="icsDaily"', 'Um aviso por dia durante o desafio') +
    it('📲', 'Instalar o app', 'data-act="install"', standalone ? 'Já instalado neste aparelho' : 'Celular ou computador') +
    '</div><div class="card mlist">' +
    it('✏️', 'Meus dados', 'data-act="editMe"', esc(S.user.name) + (S.user.role ? ' · ' + esc(S.user.role) : '')) +
    it('💾', 'Salvar uma cópia do meu progresso', 'data-act="export"', 'Para levar a outro aparelho') +
    it('📥', 'Restaurar progresso', 'data-act="import"', 'A partir de uma cópia salva') +
    it('✉️', 'Suporte', 'data-act="support"', SUPPORT) +
    it('🔄', 'Recomeçar do zero', 'data-act="reset"', 'Apaga o progresso deste aparelho') +
    '</div><div class="card coach"><div class="ph"></div><div><div class="eyebrow">Quem conduz</div><b>Pedro Berto</b><div class="small muted">Forma líderes e equipes de vendas há mais de 25 anos. Especialista em PNL e fundador da Texas Treinamentos.</div></div></div>' +
    '<p class="small muted" style="text-align:center">Smart Líder IA · Texas Treinamentos<br>Seu progresso fica salvo neste aparelho.</p></main>';
}
function viewEbook() {
  const ch = route.n;
  if (ch) { const d = DAYS[ch]; return topbar('ebook') + '<main class="view"><div class="eyebrow">Capítulo ' + ch + '</div><h1 style="margin:6px 0 16px">' + d.title + '</h1><div class="read">' + d.read + (d.action ? '<div class="card action" style="margin-top:16px"><b>🎯 Microação</b><p style="margin-top:4px">' + d.action + '</p></div>' : '') + '</div><div class="footer-actions">' + (ch > 1 ? '<button class="btn btn-ghost" data-go="ebook" data-n="' + (ch - 1) + '">← Anterior</button>' : '') + (ch < 7 ? '<button class="btn btn-blue" data-go="ebook" data-n="' + (ch + 1) + '">Próximo →</button>' : '') + '</div></main>'; }
  return topbar('more') + '<main class="view"><div class="eyebrow">E-book</div><h1 style="margin:6px 0 8px">Desafio Smart Líder IA</h1><p class="muted">Da postura de chefe à liderança que faz o time andar sozinho.</p>' +
    '<div class="card read" style="margin-top:16px"><p><b>Introdução.</b> A diferença entre chefe e líder não está no cargo. Está em <b>4 comportamentos</b> que dá para treinar: Postura Emocional, Propósito da Autoridade, Qualidade das Relações e Construção de Autonomia. Cada um deles corresponde a um estilo, e a combinação deles forma o <b>formato</b> da sua liderança.</p><p>Leia um capítulo por dia, aplique a microação e registre. Em 7 dias, você troca a teoria por prática.</p></div>' +
    '<div style="margin-top:16px">' + [1, 2, 3, 4, 5, 6, 7].map(i => '<button class="jitem" data-go="ebook" data-n="' + i + '"><div class="jnum">' + i + '</div><div><div class="t">' + DAYS[i].title + '</div><div class="s">' + DAYS[i].sub + '</div></div><span class="r">›</span></button>').join('') + '</div></main>';
}
function viewPrompt() {
  let last = 0; for (let i = 7; i >= 1; i--) if (isDone(i) || (S.days[i] && S.days[i].step)) { last = i; break; }
  const n = last && last < 7 ? last : 0;
  return topbar('more') + '<main class="view stack"><div><div class="eyebrow">Prompt de IA pronto</div><h1 style="margin:6px 0 8px">Seu Diário de Liderança</h1><p class="muted">Use todos os dias, em 5 minutos. ' + (n ? 'Este é o prompt do <b>dia ' + n + '</b>, preenchido com o que você registrou.' : 'O prompt já usa os seus resultados.') + ' Não precisa entender de IA: copie, cole e responda.</p></div><div class="prompt">' + esc(n ? buildDayPrompt(n) : buildPrompt()) + '</div>' +
    '<div class="grid2"><button class="btn btn-blue" data-act="copyPrompt"' + (n ? ' data-n="' + n + '"' : '') + '>📋 Copiar</button>' + ['https://chatgpt.com/|ChatGPT', 'https://gemini.google.com/app|Gemini', 'https://claude.ai/new|Claude'].map(x => '<button class="btn btn-ghost" data-act="openAI"' + (n ? ' data-n="' + n + '"' : '') + ' data-u="' + x.split('|')[0] + '">' + x.split('|')[1] + '</button>').join('') + '</div></main>';
}

/* ---------- ações ---------- */
function copy(t) { (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => toast('Copiado! ✅'), () => { const ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); toast('Copiado! ✅'); } catch (e) { toast('Não consegui copiar'); } ta.remove(); }); }
function download(name, blob) { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000); }
function icsFile(events) {
  const pad = n => String(n).padStart(2, '0'); const fmt = d => d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + 'T' + pad(d.getHours()) + pad(d.getMinutes()) + '00';
  let s = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Smart Lider IA//PT\r\n';
  events.forEach((e, i) => { const end = new Date(e.d.getTime() + 15 * 60000); s += 'BEGIN:VEVENT\r\nUID:sl-' + Date.now() + '-' + i + '\r\nDTSTAMP:' + fmt(new Date()) + '\r\nDTSTART:' + fmt(e.d) + '\r\nDTEND:' + fmt(end) + '\r\nSUMMARY:' + e.t.replace(/[,;]/g, ' ') + '\r\nDESCRIPTION:' + (e.x || '').replace(/[,;\n]/g, ' ') + '\r\nBEGIN:VALARM\r\nTRIGGER:-PT0M\r\nACTION:DISPLAY\r\nDESCRIPTION:Smart Líder\r\nEND:VALARM\r\nEND:VEVENT\r\n'; });
  return new Blob([s + 'END:VCALENDAR\r\n'], { type: 'text/calendar' });
}
const ACT = {
  obNext() { if (ob.step === 1 && ob.mode === 'team') { if (ob.teamAct === 'create') { ob.teamName = ($('#obTeamName').value || '').trim(); ob.company = ($('#obCompany').value || '').trim(); if (!ob.teamName) return toast('Dê um nome ao grupo'); } else { ob.code = ($('#obCode').value || '').trim().toUpperCase(); if (ob.code.length !== 6) return toast('O código tem 6 caracteres'); } } ob.step++; render(); },
  obBack() { ob.step--; render(); },
  obMode(el) { ob.mode = el.dataset.m; render(); },
  obTeam(el) { ob.teamAct = el.dataset.t; render(); },
  async obFinish() {
    const name = ($('#obName').value || '').trim(); if (!name) return toast('Digite seu nome'); S.user.name = name; S.user.role = ($('#obRole').value || '').trim();
    if (ob.mode === 'team') { const b = $('#obFinishBtn'); b.disabled = true; b.textContent = 'Conectando ao grupo…';
      try { if (ob.teamAct === 'create') { const code = await rpc('sl_create_team', { p_name: ob.teamName, p_company: ob.company || '' }); S.team = { code, name: ob.teamName, company: ob.company || '' }; }
        else { const info = await rpc('sl_team_info', { p_code: ob.code }); if (!info) { b.disabled = false; b.textContent = 'Descobrir meu tipo de líder →'; ob.step = 1; render(); return toast('Código não encontrado. Confira com quem te convidou.'); } S.team = { code: info.code, name: info.name, company: info.company }; }
        S.mode = 'team'; award('team'); } catch (e) { toast('Sem conexão: você começa no modo individual e entra no grupo depois.'); } }
    S.onboarded = true; save(); sync(); try { history.replaceState(null, '', location.pathname); } catch (e) {}
    quiz = { i: 0, a: [] }; go('diag');
  },
  startDiag() { quiz = { i: 0, a: [] }; go('diag'); },
  diagPick(el) { quiz.a[quiz.i] = el.dataset.k; vibrate(10); el.classList.add('on'); setTimeout(() => { quiz.i++; if (quiz.i >= DIAG.length) { const first = !S.diag; S.diag = { a: quiz.a.slice(), at: Date.now() }; if (first) addXP(50, 'diagnóstico'); award('diag'); save(); sync(); confetti(); } render(); window.scrollTo({ top: 0 }); }, 220); },
  diagBack() { if (quiz.i > 0) { quiz.i--; render(); } else go('home'); },
  openDay(el) { const n = +el.dataset.n; if (!unlocked(n)) { toast('🔒 Conclua o dia ' + (n - 1) + ' para liberar'); vibrate(40); return; } if (!S.diag && n === 1 && !isDone(1)) { toast('Comece pelo diagnóstico de 2 minutos'); quiz = { i: 0, a: [] }; go('diag'); return; } if (isDone(n)) D(n).step = 0; go('day', { n }); },
  dayNext() { const n = route.n, s = D(n), steps = stepsFor(n); const cur = steps[dayStep];
    if (cur === 'note' || (cur === 'result') || (cur === 'reframe')) { s.step = dayStep; save(); completeDay(n); return; }
    if (cur === 'reveal') { completeDay(7); return; }
    s.step = Math.min(dayStep + 1, steps.length - 1); save(); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); },
  dayPrev() { const s = D(route.n); s.step = Math.max(0, dayStep - 1); save(); render(); window.scrollTo({ top: 0 }); },
  check(el) { const s = D(route.n); s.checks = s.checks || [false, false, false]; const i = +el.dataset.i; s.checks[i] = !s.checks[i]; save(); vibrate(12); el.classList.toggle('on'); if (s.checks[i]) toast('+10 XP ao concluir o dia'); const b = $('[data-act="dayNext"]'); if (b) b.textContent = s.checks.filter(Boolean).length ? 'Fazer minha autoavaliação →' : 'Já apliquei, quero avaliar →'; },
  likert(el) { const s = D(route.n); s.likert = s.likert || []; s.likert[+el.dataset.i] = +el.dataset.v; save(); vibrate(8); el.parentNode.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === el)); const d = DAYS[route.n]; const b = $('[data-act="dayNext"]'); if (b) b.disabled = !d.likert.every((_, i) => s.likert[i]); },
  paPick(el) { const s = D(5); s.pa = s.pa || Array(PA.length).fill(null); const i = Math.min(s.paI || 0, PA.length - 1); s.pa[i] = +el.dataset.k; vibrate(10); el.classList.add('on');
    setTimeout(() => { if (i < PA.length - 1) s.paI = i + 1; save(); if (s.pa.filter(x => x != null).length === PA.length && i === PA.length - 1) { s.step = 2; save(); } render(); }, 220); },
  paBack() { const s = D(5); s.paI = Math.max(0, (s.paI || 0) - 1); save(); render(); },
  belief(el) { const s = D(6); s.beliefs = s.beliefs || []; const i = +el.dataset.i; const k = s.beliefs.indexOf(i); if (k >= 0) { s.beliefs.splice(k, 1); if (s.pick === i) s.pick = null; } else { s.beliefs.push(i); if (s.pick == null) s.pick = i; } save(); vibrate(10); render(); },
  beliefPick(el) { const s = D(6); s.pick = +el.dataset.i; save(); render(); },
  useSuggest() { const s = D(6); s.r3 = BELIEFS[s.pick].n; save(); render(); },
  planPick(el) { const s = D(7); s.plan = s.plan || []; const t = el.dataset.t; const k = s.plan.indexOf(t); if (k >= 0) s.plan.splice(k, 1); else { if (s.plan.length >= 3) return toast('Escolha no máximo 3'); s.plan.push(t); } save(); vibrate(10); render(); },
  copyPrompt(el) { copy(el && el.dataset.n ? buildDayPrompt(+el.dataset.n) : buildPrompt()); },
  openAI(el) { copy(el.dataset.n ? buildDayPrompt(+el.dataset.n) : buildPrompt()); setTimeout(() => window.open(el.dataset.u, '_blank', 'noopener'), 300); toast('Prompt copiado. Cole na conversa ✅'); },
  async shareCard() { const cv = await drawCard(); award('card'); cv.toBlob(async b => { const f = new File([b], 'meu-perfil-smart-lider.png', { type: 'image/png' }); const txt = 'Descobri o formato da minha liderança no Desafio Smart Líder IA: ' + STY[topK(scores())].name + '!';
    if (navigator.canShare && navigator.canShare({ files: [f] })) { try { await navigator.share({ files: [f], text: txt }); return; } catch (e) { if (e.name === 'AbortError') return; } } download('meu-perfil-smart-lider.png', b); toast('Imagem baixada. Agora é só postar 📣'); }, 'image/png'); },
  async downloadCard() { const cv = await drawCard(); award('card'); cv.toBlob(b => download('meu-perfil-smart-lider.png', b), 'image/png'); },
  ics() { const plan = (S.days[7] && S.days[7].plan) || []; const ev = []; const base = new Date(); base.setHours(8, 30, 0, 0); let d = new Date(base.getTime() + 864e5); while (ev.length < 5) { if (d.getDay() !== 0 && d.getDay() !== 6) ev.push({ d: new Date(d), t: 'Smart Líder: ' + plan[ev.length % plan.length], x: 'Compromisso da semana do Desafio Smart Líder IA' }); d = new Date(d.getTime() + 864e5); } download('plano-smart-lider.ics', icsFile(ev)); toast('Abra o arquivo para adicionar à agenda'); },
  icsDaily() { const ev = []; const base = new Date(); base.setHours(8, 0, 0, 0); if (Date.now() > base.getTime()) base.setTime(base.getTime() + 864e5); for (let i = 1; i <= 7; i++) { if (isDone(i)) continue; ev.push({ d: new Date(base.getTime() + ev.length * 864e5), t: 'Smart Líder · Dia ' + i + ': ' + DAYS[i].title, x: '10 a 15 minutos. Abra o app Smart Líder.' }); } if (!ev.length) return toast('Você já concluiu todos os dias 🏆'); download('lembretes-smart-lider.ics', icsFile(ev)); toast('Abra o arquivo para adicionar à agenda'); },
  async install() {
    if (standalone) return toast('O app já está instalado ✅');
    if (deferredInstall) { deferredInstall.prompt(); const r = await deferredInstall.userChoice; deferredInstall = null; if (r.outcome === 'accepted') toast('Instalando… 🎉'); return; }
    const url = location.origin + location.pathname;
    modal('<h2>Instalar o Smart Líder</h2>' + (inFrame ? '<p class="muted" style="margin-top:8px">Você está usando o app dentro da área de membros. Para instalar, abra-o em uma janela própria:</p><button class="btn btn-gold btn-block" style="margin-top:12px" data-act="openOut">Abrir o app em tela cheia ↗</button><p class="small muted" style="margin-top:10px">Seu progresso de lá começa do zero na primeira vez. Use “Salvar uma cópia do meu progresso” (menu Mais) para levar seus dados.</p>' : '') +
      '<div class="stack" style="margin-top:16px">' + (isIOS ? '<div class="card"><b>iPhone / iPad (Safari)</b><p class="muted small" style="margin-top:4px">1. Toque em <b>Compartilhar</b> (quadrado com seta ↑)<br>2. Escolha <b>Adicionar à Tela de Início</b><br>3. Toque em <b>Adicionar</b></p></div>' : '<div class="card"><b>Android (Chrome)</b><p class="muted small" style="margin-top:4px">1. Toque no menu <b>⋮</b><br>2. Escolha <b>Instalar app</b> ou <b>Adicionar à tela inicial</b></p></div><div class="card"><b>Computador (Chrome ou Edge)</b><p class="muted small" style="margin-top:4px">Clique no ícone de instalar <b>⊕</b> na barra de endereço, ou no menu <b>⋮ → Instalar Smart Líder</b>.</p></div><div class="card"><b>iPhone</b><p class="muted small" style="margin-top:4px">No Safari: Compartilhar → Adicionar à Tela de Início.</p></div>') + '</div>' +
      '<button class="btn btn-ghost btn-block" style="margin-top:14px" data-close>Fechar</button>');
  },
  openOut() { window.open(location.origin + location.pathname, '_blank', 'noopener'); },
  hideInstall() { S.hideInstall = true; save(); render(); },
  restartWeek() { modal('<h2>Começar uma nova semana?</h2><p class="muted" style="margin-top:8px">Seus pontos, conquistas e diagnóstico ficam. Os 7 dias recomeçam para você treinar de novo e ver o seu formato evoluir.</p><button class="btn btn-gold btn-block" style="margin-top:16px" data-act="doRestartWeek" data-close>Sim, nova semana</button><button class="btn btn-ghost btn-block" style="margin-top:8px" data-close>Cancelar</button>'); },
  doRestartWeek() { S.history = S.history || []; S.history.push({ at: Date.now(), scores: scores(), pa: paScore() }); S.days = {}; save(); sync(); go('home'); },
  teamTab(el) { teamTab = el.dataset.t; render(); },
  async createTeam(el) { const name = ($('#tName').value || '').trim(), company = ($('#tCompany').value || '').trim(); if (!name) return toast('Dê um nome ao grupo'); el.disabled = true; el.textContent = 'Criando…';
    try { const code = await rpc('sl_create_team', { p_name: name, p_company: company }); S.team = { code, name, company }; S.mode = 'team'; award('team'); save(); await sync(); render(); confetti(); } catch (e) { el.disabled = false; el.textContent = 'Criar e gerar código'; toast('Sem conexão. Tente de novo.'); } },
  async joinTeam(el) { const code = ($('#tCode').value || '').trim().toUpperCase(); if (code.length !== 6) return toast('O código tem 6 caracteres'); el.disabled = true; el.textContent = 'Procurando…';
    try { const info = await rpc('sl_team_info', { p_code: code }); if (!info) { el.disabled = false; el.textContent = 'Entrar no grupo'; return toast('Código não encontrado'); } S.team = { code: info.code, name: info.name, company: info.company }; S.mode = 'team'; award('team'); save(); await sync(); render(); toast('Você entrou em ' + info.name + ' 🎉'); } catch (e) { el.disabled = false; el.textContent = 'Entrar no grupo'; toast('Sem conexão. Tente de novo.'); } },
  refreshBoard() { board = null; const el = $('#board'); if (el) el.innerHTML = boardHTML(); sync().then(loadBoard); },
  shareInvite() { const t = 'Vamos fazer juntos o Desafio Smart Líder IA! Entre no grupo "' + S.team.name + '" com o código ' + S.team.code + ': ' + inviteLink(); if (navigator.share) navigator.share({ text: t }).catch(() => {}); else copy(t); },
  copyInvite() { copy(inviteLink()); },
  leaveTeam() { modal('<h2>Sair do grupo?</h2><p class="muted" style="margin-top:8px">Seu progresso pessoal continua neste aparelho. Você só deixa de aparecer no painel do grupo.</p><button class="btn btn-gold btn-block" style="margin-top:16px" data-act="doLeave" data-close>Sair do grupo</button><button class="btn btn-ghost btn-block" style="margin-top:8px" data-close>Cancelar</button>'); },
  async doLeave() { try { await rpc('sl_leave', { p_member: S.memberId }); } catch (e) {} S.team = null; S.mode = 'solo'; board = null; save(); render(); },
  editMe() { const m = modal('<h2>Meus dados</h2><label class="f">Nome</label><input type="text" id="meName" maxlength="60" value="' + esc(S.user.name) + '"><label class="f">Cargo</label><input type="text" id="meRole" maxlength="60" value="' + esc(S.user.role) + '"><button class="btn btn-gold btn-block" style="margin-top:16px" data-act="saveMe">Salvar</button>'); },
  saveMe() { const n = ($('#meName').value || '').trim(); if (n) S.user.name = n; S.user.role = ($('#meRole').value || '').trim(); save(); sync(); document.querySelector('.modal').remove(); render(); toast('Salvo ✅'); },
  export() { const t = btoa(unescape(encodeURIComponent(JSON.stringify(S)))); modal('<h2>Cópia do seu progresso</h2><p class="muted small" style="margin-top:6px">Copie este código e cole em “Restaurar progresso” no outro aparelho ou navegador.</p><textarea readonly style="margin-top:10px;font-size:12px">' + t + '</textarea><button class="btn btn-gold btn-block" style="margin-top:12px" data-act="copyExport">Copiar código</button>'); ACT._exp = t; },
  copyExport() { copy(ACT._exp); },
  import() { modal('<h2>Restaurar progresso</h2><p class="muted small" style="margin-top:6px">Cole o código copiado no outro aparelho.</p><textarea id="impTxt" style="margin-top:10px;font-size:12px"></textarea><button class="btn btn-gold btn-block" style="margin-top:12px" data-act="doImport">Restaurar</button>'); },
  doImport() { try { const o = JSON.parse(decodeURIComponent(escape(atob(($('#impTxt').value || '').trim())))); if (!o || !o.v) throw 0; S = o; save(); document.querySelector('.modal').remove(); go('home'); toast('Progresso restaurado ✅'); } catch (e) { toast('Código inválido'); } },
  support() { location.href = 'mailto:' + SUPPORT + '?subject=' + encodeURIComponent('Suporte · App Smart Líder IA'); },
  reset() { modal('<h2>Recomeçar do zero?</h2><p class="muted" style="margin-top:8px">Isso apaga seu progresso, pontos e diagnóstico deste aparelho. Não dá para desfazer.</p><button class="btn btn-block" style="margin-top:16px;background:#E5484D;color:#fff" data-act="doReset" data-close>Apagar e recomeçar</button><button class="btn btn-ghost btn-block" style="margin-top:8px" data-close>Cancelar</button>'); },
  doReset() { const id = S.memberId, team = S.team; S = fresh(); S.memberId = id; S.team = team; save(); ob = { step: 0, mode: 'solo', teamAct: 'create' }; render(); }
};
const FIELD = {
  note(f) { D(route.n).note = f.value; save(); },
  r1(f) { D(6).r1 = f.value; save(); }, r2(f) { D(6).r2 = f.value; save(); },
  r3(f) { D(6).r3 = f.value; save(); const b = $('[data-act="dayNext"]'); if (b) b.disabled = f.value.trim().length <= 3; },
  diary(f) { D(7).diary = f.value; save(); }
};

/* ---------- início ---------- */
(function boot() {
  const h = (location.hash || '').slice(1); const m = h.match(/^(home|journey|profile|team|more|ebook|prompt)$/); if (m) route = { v: m[1] };
  render();
  if (route.v === 'profile') setTimeout(renderCardPreview, 50);
  if (S.pending) sync();
  window.addEventListener('online', () => { if (S.pending) sync(); });
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
})();
// prévia do cartão sempre que o perfil final é exibido
new MutationObserver(() => { if ($('#cardWrap') && !$('#cardWrap').firstChild) renderCardPreview(); }).observe(app, { childList: true });
