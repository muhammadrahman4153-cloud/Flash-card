/* ═══════════════════════════════════════════════════════
   FlashFun — script.js
   Versi: No Login | + Deck Puisi & Majas | + Stats Enhanced
═══════════════════════════════════════════════════════ */

// ──────────────────────────────────────
// STORAGE
// ──────────────────────────────────────
const APP_KEY = 'flashfun_v3';
function loadData() { try { return JSON.parse(localStorage.getItem(APP_KEY)) || defaultData(); } catch { return defaultData(); } }
function saveData(d) { localStorage.setItem(APP_KEY, JSON.stringify(d)); }
function defaultData() { return { decks:[], quizHistory:[], studiedCards:0 }; }

// ──────────────────────────────────────
// BUILT-IN DECKS
// ──────────────────────────────────────
const BUILTIN_DECKS = [

  /* ── STATISTIKA ── */
  {
    id:'builtin_statistika', name:'Statistika',
    desc:'Konsep-konsep dasar statistika', category:'Matematika', color:'#43d9a2', favorite:false,
    cards:[
      {id:'s1',front:'Apa itu Mean?',back:'Mean (rata-rata) adalah jumlah semua nilai dibagi banyaknya data.\nRumus: x̄ = Σx / n',mastered:false},
      {id:'s2',front:'Apa itu Median?',back:'Median adalah nilai tengah data yang sudah diurutkan.\nJika n genap: rata-rata dua nilai tengah.',mastered:false},
      {id:'s3',front:'Apa itu Modus?',back:'Modus adalah nilai yang paling sering muncul dalam data.',mastered:false},
      {id:'s4',front:'Apa itu Varians?',back:'Varians adalah rata-rata kuadrat selisih tiap nilai dengan mean.\nRumus: σ² = Σ(xᵢ − x̄)² / n',mastered:false},
      {id:'s5',front:'Apa itu Simpangan Baku?',back:'Simpangan baku = akar kuadrat varians.\nRumus: σ = √[Σ(xᵢ − x̄)² / n]',mastered:false},
      {id:'s6',front:'Apa itu Kuartil?',back:'Kuartil membagi data terurut menjadi 4 bagian.\nQ1 = bawah, Q2 = median, Q3 = atas.',mastered:false},
      {id:'s7',front:'Apa itu IQR?',back:'IQR = Q3 − Q1\nDigunakan untuk mengukur sebaran tengah & deteksi outlier.',mastered:false},
      {id:'s8',front:'Apa itu Distribusi Normal?',back:'Distribusi berbentuk bel simetris.\nSifat: mean = median = modus.\n68-95-99.7% data dalam 1-2-3 std dev.',mastered:false},
      {id:'s9',front:'Apa itu Korelasi?',back:'Korelasi mengukur kekuatan hubungan linear dua variabel.\nNilai r: −1 (negatif kuat) hingga +1 (positif kuat).',mastered:false},
      {id:'s10',front:'Apa itu Regresi Linear?',back:'Regresi linear memodelkan hubungan X dan Y.\nRumus: ŷ = a + bx\nb = kemiringan, a = intercept.',mastered:false},
    ]
  },

  /* ── ENGLISH TENSES ── */
  {
    id:'builtin_english', name:'English Tenses',
    desc:'12 tenses bahasa Inggris lengkap', category:'Bahasa', color:'#6c63ff', favorite:false,
    cards:[
      {id:'e1',front:'Simple Present — Rumus',back:'(+) S + V1/V1s/es\n(-) S + do/does + not + V1\n(?) Do/Does + S + V1?\nContoh: She studies every day.',mastered:false},
      {id:'e2',front:'Simple Present — Signal Words',back:'always, usually, often, sometimes, never\nevery day / week / month',mastered:false},
      {id:'e3',front:'Present Continuous — Rumus',back:'(+) S + am/is/are + V-ing\n(-) S + am/is/are + not + V-ing\nContoh: I am reading now.',mastered:false},
      {id:'e4',front:'Present Perfect — Rumus',back:'(+) S + have/has + V3\n(-) S + have/has + not + V3\nContoh: I have finished my homework.',mastered:false},
      {id:'e5',front:'Simple Past — Rumus',back:'(+) S + V2\n(-) S + did + not + V1\nContoh: She went to market yesterday.',mastered:false},
      {id:'e6',front:'Past Continuous — Rumus',back:'(+) S + was/were + V-ing\nContoh: I was sleeping when she called.',mastered:false},
      {id:'e7',front:'Past Perfect — Rumus',back:'(+) S + had + V3\nContoh: He had left before I arrived.',mastered:false},
      {id:'e8',front:'Simple Future — Rumus',back:'(+) S + will + V1\nContoh: I will go to school tomorrow.',mastered:false},
      {id:'e9',front:'Do vs Does — Kapan dipakai?',back:'"Do" → I, You, We, They\n"Does" → He, She, It\nContoh:\nI do my homework. ✓\nShe does her homework. ✓',mastered:false},
      {id:'e10',front:'Conditional Type 1 — Rumus',back:'If + Simple Present, will + V1\nContoh: If it rains, I will bring an umbrella.',mastered:false},
    ]
  },

  /* ── PUISI ── */
  {
    id:'builtin_puisi', name:'📜 Puisi — Bahasa Indonesia',
    desc:'Unsur, jenis, dan analisis puisi', category:'Bahasa', color:'#f783ac', favorite:false,
    cards:[
      {id:'p1',front:'Apa pengertian Puisi?',back:'Puisi adalah karya sastra yang menggunakan bahasa indah, padat, dan imajinatif.\nCiri: diksi cermat, irama, rima, dan makna mendalam.',mastered:false},
      {id:'p2',front:'Apa yang dimaksud Diksi dalam puisi?',back:'Diksi adalah pilihan kata yang digunakan penyair untuk mengungkapkan perasaan dan gagasan.\nDiksi yang tepat menciptakan keindahan bunyi dan kedalaman makna.',mastered:false},
      {id:'p3',front:'Jelaskan pengertian Rima (persajakan)!',back:'Rima adalah persamaan bunyi pada akhir baris puisi.\nJenis rima:\n• Rima akhir: AA BB, AB AB, AB BA\n• Rima dalam: di tengah baris\n• Rima awal: di awal baris',mastered:false},
      {id:'p4',front:'Apa itu Irama (ritme) dalam puisi?',back:'Irama adalah pola tekanan, panjang-pendek bunyi, dan tinggi-rendah nada dalam pembacaan puisi.\nIrama membuat puisi enak dibaca dan didengar.',mastered:false},
      {id:'p5',front:'Apa perbedaan Puisi Lama dan Puisi Baru?',back:'Puisi Lama: terikat aturan (jumlah baris, suku kata, rima).\nContoh: pantun, syair, gurindam, mantra.\n\nPuisi Baru: bebas, tidak terikat aturan ketat.\nContoh: ode, elegi, balada, himne.',mastered:false},
      {id:'p6',front:'Apa itu Pantun? Sebutkan ciri-cirinya!',back:'Pantun adalah puisi lama Melayu.\nCiri:\n• 4 baris per bait\n• 2 baris pertama = sampiran\n• 2 baris terakhir = isi\n• Rima akhir: a-b-a-b\n• 8–12 suku kata per baris',mastered:false},
      {id:'p7',front:'Apa perbedaan Sampiran dan Isi dalam pantun?',back:'Sampiran: baris 1 & 2, pengantar rima, tidak berhubungan langsung dengan isi.\nIsi: baris 3 & 4, memuat pesan, nasihat, atau maksud utama.',mastered:false},
      {id:'p8',front:'Apa itu Syair? Bedakan dengan Pantun!',back:'Syair: puisi lama berisi cerita/nasihat.\nCiri syair:\n• 4 baris per bait, rima aaaa\n• Semua baris adalah isi (tidak ada sampiran)\n• Bercerita berkesinambungan antar bait\n\nPantun: rima abab, ada sampiran.',mastered:false},
      {id:'p9',front:'Apa itu Gurindam?',back:'Gurindam adalah puisi lama dua baris.\nCiri:\n• Baris 1 = syarat/sebab\n• Baris 2 = akibat/penjelasan\n• Rima akhir: a-a\n• Berisi nasihat atau ajaran hidup',mastered:false},
      {id:'p10',front:'Apa itu Puisi Bebas?',back:'Puisi bebas adalah puisi modern yang tidak terikat aturan jumlah baris, suku kata, maupun rima.\nPenyair bebas berekspresi sesuai perasaan.\nTokoh: Chairil Anwar, W.S. Rendra, Sapardi Djoko Damono.',mastered:false},
      {id:'p11',front:'Sebutkan unsur BATIN puisi!',back:'Unsur batin puisi (TARA):\n• Tema: pokok gagasan\n• Amanat: pesan moral\n• Rasa: sikap penyair terhadap tema\n• Tone/Nada: sikap penyair terhadap pembaca',mastered:false},
      {id:'p12',front:'Sebutkan unsur FISIK puisi!',back:'Unsur fisik puisi:\n• Diksi: pilihan kata\n• Imaji: gambaran indera\n• Kata konkret: membangkitkan imaji\n• Bahasa figuratif: majas/kiasan\n• Versifikasi: rima, ritme\n• Tipografi: tata letak visual',mastered:false},
      {id:'p13',front:'Apa itu Imaji (citraan) dalam puisi? Sebutkan jenisnya!',back:'Imaji adalah gambaran yang ditangkap indera lewat kata-kata.\nJenis:\n• Visual: penglihatan\n• Auditif: pendengaran\n• Taktil: perasaan/sentuhan\n• Olfaktori: penciuman\n• Gustatori: rasa',mastered:false},
      {id:'p14',front:'Apa itu Tipografi puisi?',back:'Tipografi adalah tata letak, bentuk visual, dan susunan baris/bait puisi di halaman.\nPuisi konkret menggunakan tipografi untuk memperkuat makna, bahkan membentuk gambar.',mastered:false},
      {id:'p15',front:'Apa itu Enjambemen?',back:'Enjambemen adalah pemenggalan kalimat di akhir baris yang dilanjutkan ke baris berikutnya.\nFungsi: menciptakan dinamika dan jeda dramatis dalam pembacaan.',mastered:false},
      {id:'p16',front:'Sebutkan sastrawan puisi Indonesia dan karyanya!',back:'• Chairil Anwar — "Aku", "Doa"\n• W.S. Rendra — "Ballada Orang-orang Tercinta"\n• Sapardi Djoko Damono — "Hujan Bulan Juni"\n• Taufiq Ismail — "Karangan Bunga"\n• Amir Hamzah — "Padamu Jua"',mastered:false},
      {id:'p17',front:'Apa perbedaan Puisi Lirik, Epik, dan Dramatik?',back:'• Lirik: mengungkapkan perasaan penyair (ode, elegi, himne)\n• Epik: menceritakan kisah kepahlawanan (balada, epos)\n• Dramatik: menggambarkan tokoh/situasi seperti drama',mastered:false},
      {id:'p18',front:'Apa fungsi Amanat dalam puisi?',back:'Amanat adalah pesan moral atau ajaran yang ingin disampaikan penyair kepada pembaca.\nAmanat bisa tersurat (langsung) atau tersirat (perlu ditafsirkan).',mastered:false},
    ]
  },

  /* ── MAJAS ── */
  {
    id:'builtin_majas', name:'🎭 Majas — Bahasa Indonesia',
    desc:'Jenis-jenis majas, contoh, dan ciri-cirinya', category:'Bahasa', color:'#ffa94d', favorite:false,
    cards:[
      {id:'m1',front:'Apa pengertian Majas?',back:'Majas adalah cara penyampaian pikiran/perasaan menggunakan bahasa kiasan.\nMajas membuat bahasa lebih hidup, indah, dan berkesan.\nDibagi menjadi 4 kelompok: perbandingan, pertentangan, perulangan, pernyataan.',mastered:false},
      {id:'m2',front:'Apa itu Majas Simile (Perumpamaan)?',back:'Simile membandingkan dua hal menggunakan kata penghubung.\nKata kunci: seperti, bagai, laksana, bagaikan, seumpama, ibarat, bak.\nContoh:\n"Matanya bersinar seperti bintang di langit."\n"Wajahnya bagai bulan purnama."',mastered:false},
      {id:'m3',front:'Apa itu Majas Metafora?',back:'Metafora adalah perbandingan LANGSUNG tanpa kata penghubung (seperti, bagai).\nContoh:\n"Dia adalah tulang punggung keluarga."\n"Buku adalah jendela dunia."\n"Waktu adalah uang."',mastered:false},
      {id:'m4',front:'Apa perbedaan Simile dan Metafora?',back:'Simile: menggunakan kata penghubung\n→ "Dia berlari SEPERTI kilat."\n\nMetafora: tanpa kata penghubung, langsung menyamakan\n→ "Dia adalah kilat dalam berlari."\n\nKunci: ada/tidaknya kata pembanding eksplisit.',mastered:false},
      {id:'m5',front:'Apa itu Majas Personifikasi?',back:'Personifikasi memberikan sifat/perilaku manusia kepada benda mati, hewan, atau alam.\nContoh:\n"Angin berbisik lembut di telingaku."\n"Ombak menari-nari di tepi pantai."\n"Matahari tersenyum menyambut pagi."',mastered:false},
      {id:'m6',front:'Apa itu Majas Hiperbola?',back:'Hiperbola melebih-lebihkan sesuatu dari kenyataan untuk efek dramatis.\nContoh:\n"Aku menunggumu selama seribu tahun."\n"Suaranya menggelegar hingga membelah bumi."\n"Tangisnya membasahi seluruh bumi."',mastered:false},
      {id:'m7',front:'Apa itu Majas Litotes?',back:'Litotes adalah kebalikan hiperbola — merendahkan sesuatu dari kenyataan, biasanya sebagai ungkapan rendah hati.\nContoh:\n"Silakan mampir ke gubuk kami." (padahal rumah bagus)\n"Ini hanya hadiah kecil yang tidak berarti."',mastered:false},
      {id:'m8',front:'Apa itu Majas Eufemisme?',back:'Eufemisme menggunakan kata lebih halus menggantikan kata yang dianggap kasar/tidak sopan.\nContoh:\n"Ayahnya sudah berpulang." (= meninggal)\n"Tidak berdaya secara ekonomi." (= miskin)\n"Petugas kebersihan" (= tukang sapu)',mastered:false},
      {id:'m9',front:'Apa itu Majas Antitesis?',back:'Antitesis mempertentangkan dua kata/ungkapan berlawanan dalam satu kalimat.\nContoh:\n"Suka dan duka harus kita hadapi bersama."\n"Kaya dan miskin tetap sama di hadapan Tuhan."',mastered:false},
      {id:'m10',front:'Apa itu Majas Paradoks?',back:'Paradoks adalah pernyataan yang tampaknya kontradiktif, namun mengandung kebenaran.\nContoh:\n"Aku merasa sepi di tengah keramaian."\n"Semakin banyak belajar, semakin terasa bodoh."',mastered:false},
      {id:'m11',front:'Apa itu Majas Ironi?',back:'Ironi adalah sindiran halus dengan mengatakan sesuatu yang bertentangan dengan kenyataan.\nContoh:\n"Wah, tulisanmu rapi sekali!" (padahal jelek)\n"Pintar sekali kamu, sampai nilai nol kamu dapat."',mastered:false},
      {id:'m12',front:'Apa itu Majas Sinisme dan Sarkasme?',back:'Sinisme: sindiran lebih langsung dari ironi.\n→ "Memang sudah dari sono-nya kamu tidak bisa menghargai orang."\n\nSarkasme: sindiran paling kasar, bisa menyakiti hati.\n→ "Dasar bodoh, begitu saja tidak bisa!"',mastered:false},
      {id:'m13',front:'Apa itu Majas Anafora?',back:'Anafora adalah pengulangan kata/frasa di AWAL setiap baris atau kalimat.\nContoh:\n"Aku ingin mencintaimu.\nAku ingin menjagamu.\nAku ingin selalu bersamamu."\n\nDigunakan dalam puisi dan pidato untuk efek ritmis.',mastered:false},
      {id:'m14',front:'Apa itu Majas Sinekdoke? Sebutkan dua jenisnya!',back:'Sinekdoke menggunakan sebagian untuk mewakili keseluruhan atau sebaliknya.\n\n• Pars pro toto: sebagian mewakili seluruh\n→ "Tidak tampak batang hidungnya." (= orangnya)\n\n• Totem pro parte: keseluruhan mewakili sebagian\n→ "Indonesia berhasil meraih emas."',mastered:false},
      {id:'m15',front:'Apa itu Majas Metonimia?',back:'Metonimia adalah penyebutan nama benda lain yang berkaitan erat sebagai pengganti.\nContoh:\n"Ia membeli Honda." (= motor Honda)\n"Ayah membaca Kompas." (= koran Kompas)\n"Kami naik Garuda ke Bali." (= pesawat Garuda)',mastered:false},
      {id:'m16',front:'Apa itu Majas Pleonasme?',back:'Pleonasme menggunakan kata berlebihan yang maknanya sudah tercakup.\nContoh:\n"Naik ke atas" (naik sudah berarti ke atas)\n"Maju ke depan"\n"Turun ke bawah"',mastered:false},
      {id:'m17',front:'Apa itu Majas Alegori?',back:'Alegori menyatakan sesuatu dengan menggunakan kiasan/cerita bermakna tersirat.\nContoh: Cerita binatang yang sebenarnya menceritakan manusia.\n"Kancil dan buaya" = alegori kecerdikan vs kekuatan.',mastered:false},
      {id:'m18',front:'Apa itu Majas Klimaks dan Antiklimaks?',back:'Klimaks: penyusunan dari lemah/kecil ke kuat/besar.\n→ "Anak-anak, remaja, dewasa, hingga orang tua ikut berduka."\n\nAntiklimaks: dari kuat ke lemah.\n→ "Jenderal, perwira, prajurit, rakyat jelata semuanya berjuang."',mastered:false},
      {id:'m19',front:'Apa itu Majas Repetisi?',back:'Repetisi adalah pengulangan kata/frasa untuk menekankan makna.\nContoh:\n"Hati-hati, hati-hati, harap hati-hati!"\n"Maju terus, maju terus, pantang mundur!"\nBerbeda dengan anafora: repetisi bisa di mana saja, bukan hanya di awal baris.',mastered:false},
      {id:'m20',front:'Sebutkan 4 kelompok besar Majas beserta contohnya!',back:'1. Majas Perbandingan: simile, metafora, personifikasi, hiperbola, litotes, eufemisme\n2. Majas Pertentangan: antitesis, paradoks, ironi, sinisme, sarkasme\n3. Majas Perulangan: repetisi, anafora, epifora, aliterasi\n4. Majas Pernyataan: sinekdoke, metonimia, alegori, pleonasme',mastered:false},
    ]
  },

  /* ── PEMROGRAMAN WEB ── */
  {
    id:'builtin_webdev', name:'Pemrograman Web',
    desc:'HTML, CSS & JavaScript dasar', category:'Pemrograman', color:'#74c0fc', favorite:false,
    cards:[
      {id:'w1',front:'Apa itu HTML?',back:'HTML (HyperText Markup Language) adalah bahasa standar membuat halaman web.\nMenggunakan tag untuk mendefinisikan struktur konten.',mastered:false},
      {id:'w2',front:'Perbedaan <div> dan <span>',back:'<div>: block-level, mulai baris baru, lebar penuh.\n<span>: inline, tidak mulai baris baru.\n<div> untuk layout, <span> untuk styling teks.',mastered:false},
      {id:'w3',front:'Apa itu CSS Box Model?',back:'Dari dalam ke luar:\n1. Content — isi elemen\n2. Padding — ruang dalam\n3. Border — garis batas\n4. Margin — ruang luar',mastered:false},
      {id:'w4',front:'Apa itu CSS Flexbox?',back:'Sistem layout 1D (baris atau kolom).\ndisplay: flex pada parent.\nProperti: justify-content, align-items, flex-direction, gap.',mastered:false},
      {id:'w5',front:'Apa itu CSS Grid?',back:'Sistem layout 2D (baris DAN kolom).\ndisplay: grid pada parent.\nContoh: grid-template-columns: repeat(3, 1fr)',mastered:false},
      {id:'w6',front:'var vs let vs const',back:'var: function-scoped, bisa redeclare.\nlet: block-scoped, bisa diubah nilainya.\nconst: block-scoped, tidak bisa diubah.\nGunakan const default, let jika perlu berubah.',mastered:false},
      {id:'w7',front:'Apa itu DOM Manipulation?',back:'DOM = representasi HTML sebagai objek.\ndocument.getElementById("id")\nelement.innerHTML = "..."\nelement.addEventListener("click", fn)',mastered:false},
      {id:'w8',front:'Apa itu Arrow Function?',back:'Sintaks ringkas untuk fungsi.\n// Biasa:\nfunction tambah(a,b){return a+b}\n// Arrow:\nconst tambah = (a,b) => a + b',mastered:false},
      {id:'w9',front:'Apa itu Async/Await?',back:'Sintaks bersih untuk operasi asinkron.\nasync function getData(){\n  const res = await fetch(url);\n  const data = await res.json();\n}',mastered:false},
      {id:'w10',front:'Array Methods penting di JS',back:'.map() → transform tiap elemen\n.filter() → saring elemen\n.reduce() → akumulasi\n.find() → cari satu elemen\n.includes() → cek keberadaan',mastered:false},
    ]
  }
];

// ──────────────────────────────────────
// STATE
// ──────────────────────────────────────
let currentPage   = 'dashboard';
let currentDeckId = null;
let selectedColor = '#6c63ff';
let selectedCat   = 'all';
let editingDeckId = null;
let editingCardId = null;

// ──────────────────────────────────────
// INIT
// ──────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  ensureBuiltins();
  navigate('dashboard');
  document.getElementById('sidebar').classList.remove('open');
});

function ensureBuiltins() {
  const d = loadData();
  const ids = d.decks.map(x => x.id);
  // Add builtins in reverse so they appear in correct order
  [...BUILTIN_DECKS].reverse().forEach(bd => {
    if (!ids.includes(bd.id)) {
      d.decks.unshift({ ...bd, cards: bd.cards.map(c => ({...c})) });
    }
  });
  saveData(d);
}

// ──────────────────────────────────────
// NAVIGATION
// ──────────────────────────────────────
function navigate(page, deckId) {
  document.querySelectorAll('.nav-item').forEach(el =>
    el.classList.toggle('active', el.dataset.page === page));
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  currentPage = page;
  if (deckId) currentDeckId = deckId;
  const el = document.getElementById('page-' + page);
  if (el) { el.classList.remove('hidden'); el.style.animation='none'; el.offsetHeight; el.style.animation=''; }
  if (page === 'dashboard')   renderDashboard();
  if (page === 'decks')       renderDecks();
  if (page === 'deck-detail') renderDeckDetail(currentDeckId);
  if (page === 'study')       handleStudyNav();
  if (page === 'quiz')        renderQuizSetup();
  if (page === 'stats')       renderStats();
  closeSidebar(); closeFab();
}

// ──────────────────────────────────────
// SIDEBAR / DARK / FAB
// ──────────────────────────────────────
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const ov = document.getElementById('sidebar-overlay');
  sb.classList.toggle('open');
  ov.classList.toggle('show', sb.classList.contains('open'));
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
}
function toggleDark() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('theme-btn').textContent = isDark ? '🌙' : '☀️';
}
function toggleFab() {
  document.getElementById('fab-main').classList.toggle('open');
  document.getElementById('fab-menu').classList.toggle('open');
}
function closeFab() {
  document.getElementById('fab-main').classList.remove('open');
  document.getElementById('fab-menu').classList.remove('open');
}

// ──────────────────────────────────────
// DASHBOARD
// ──────────────────────────────────────
function renderDashboard() {
  const d = loadData();
  const totalCards = d.decks.reduce((s,x) => s + x.cards.length, 0);
  const scores = (d.quizHistory||[]).map(h => h.pct);
  const best = scores.length ? Math.max(...scores)+'%' : '-';
  const avg  = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length)+'%' : '-';
  document.getElementById('stat-decks').textContent = d.decks.length;
  document.getElementById('stat-cards').textContent = totalCards;
  document.getElementById('stat-best').textContent  = best;
  document.getElementById('stat-avg').textContent   = avg;

  const grid = document.getElementById('dash-decks');
  const recent = d.decks.slice(0,4);
  grid.innerHTML = recent.length
    ? recent.map(dk => deckCardHTML(dk)).join('')
    : '<div class="empty-state"><div class="empty-icon">📂</div><p>Buat deck pertamamu!</p></div>';

  const actEl = document.getElementById('dash-activity');
  const acts = (d.quizHistory||[]).slice(-5).reverse();
  actEl.innerHTML = acts.length
    ? acts.map(h => `<div class="activity-item">
        <span class="activity-icon">🧠</span>
        <div class="activity-info">
          <div class="activity-title">${escHtml(h.deckName)} — ${modeLabel(h.mode)}</div>
          <div class="activity-sub">Skor: ${h.correct}/${h.total} (${h.pct}%)</div>
        </div>
        <span class="activity-time">${timeAgo(h.date)}</span>
      </div>`).join('')
    : '<div class="empty-state"><div class="empty-icon">📭</div><p>Belum ada aktivitas.</p></div>';
}

// ──────────────────────────────────────
// DECKS PAGE
// ──────────────────────────────────────
function renderDecks() { filterDecks(); }

function filterDecks() {
  const d = loadData();
  const q = (document.getElementById('deck-search')?.value||'').toLowerCase();
  const favOnly = document.getElementById('fav-filter')?.checked;
  const decks = d.decks.filter(dk => {
    const mQ   = !q || dk.name.toLowerCase().includes(q)||(dk.desc||'').toLowerCase().includes(q);
    const mCat = selectedCat==='all' || dk.category===selectedCat;
    const mFav = !favOnly || dk.favorite;
    return mQ && mCat && mFav;
  });
  const grid  = document.getElementById('decks-grid');
  const empty = document.getElementById('decks-empty');
  if (decks.length) { grid.innerHTML = decks.map(dk => deckCardHTML(dk)).join(''); empty.classList.add('hidden'); }
  else { grid.innerHTML=''; empty.classList.remove('hidden'); }
}

function selectCat(el, cat) {
  selectedCat = cat;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  filterDecks();
}

function deckCardHTML(d) {
  const mastered = d.cards.filter(c=>c.mastered).length;
  const pct = d.cards.length ? Math.round(mastered/d.cards.length*100) : 0;
  const emoji = catEmoji(d.category);
  return `<div class="deck-card" onclick="navigate('deck-detail','${d.id}')">
    <div class="deck-card-top" style="background:linear-gradient(135deg,${d.color}cc,${d.color}77)">
      <span class="deck-emoji">${emoji}</span>
      <button class="fav-btn" onclick="toggleFav(event,'${d.id}')">${d.favorite?'⭐':'☆'}</button>
    </div>
    <div class="deck-card-body">
      <div class="deck-card-title">${escHtml(d.name)}</div>
      <div class="deck-card-desc">${escHtml(d.desc||'')}</div>
      <div class="deck-progress">
        <div class="deck-progress-bar"><div class="deck-progress-fill" style="width:${pct}%"></div></div>
        <div class="deck-progress-label">${mastered}/${d.cards.length} dikuasai (${pct}%)</div>
      </div>
      <div class="deck-meta">
        <span class="deck-count">🃏 ${d.cards.length} kartu</span>
        <span class="deck-cat-badge">${escHtml(d.category)}</span>
      </div>
    </div>
    <div class="deck-card-footer">
      <button class="deck-btn-study" onclick="event.stopPropagation();startStudyDeck('${d.id}')">🎓</button>
      <button class="deck-btn-quiz"  onclick="event.stopPropagation();startQuizDeck('${d.id}')">🧠</button>
      <button class="deck-btn-edit"  onclick="event.stopPropagation();openDeckModal('${d.id}')">✏️</button>
      <button class="deck-btn-del"   onclick="event.stopPropagation();deleteDeck('${d.id}')">🗑️</button>
    </div>
  </div>`;
}

function toggleFav(e, deckId) {
  e.stopPropagation();
  const d = loadData();
  const dk = d.decks.find(x => x.id===deckId);
  if (!dk) return;
  dk.favorite = !dk.favorite;
  saveData(d);
  filterDecks();
  showToast(dk.favorite?'⭐ Ditambah ke favorit!':'Dihapus dari favorit','info');
}

function deleteDeck(deckId) {
  if (!confirm('Hapus deck ini? Semua kartu ikut terhapus.')) return;
  const d = loadData();
  d.decks = d.decks.filter(x => x.id!==deckId);
  saveData(d);
  filterDecks(); renderDashboard();
  showToast('Deck dihapus','warn');
}

// ──────────────────────────────────────
// DECK MODAL
// ──────────────────────────────────────
function openDeckModal(deckId) {
  editingDeckId = deckId||null;
  const d = loadData();
  const existing = deckId ? d.decks.find(x=>x.id===deckId) : null;
  document.getElementById('deck-modal-title').textContent = existing ? 'Edit Deck' : 'Buat Deck Baru';
  document.getElementById('deck-name-input').value = existing?.name||'';
  document.getElementById('deck-desc-input').value = existing?.desc||'';
  document.getElementById('deck-cat-input').value  = existing?.category||'Matematika';
  selectedColor = existing?.color||'#6c63ff';
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.toggle('active', s.dataset.color===selectedColor));
  document.getElementById('deck-modal').classList.remove('hidden');
}
function closeDeckModal() { document.getElementById('deck-modal').classList.add('hidden'); editingDeckId=null; }
function selectColor(el, color) {
  selectedColor = color;
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
}
function saveDeck() {
  const name = document.getElementById('deck-name-input').value.trim();
  const desc = document.getElementById('deck-desc-input').value.trim();
  const cat  = document.getElementById('deck-cat-input').value;
  if (!name) { showToast('Nama deck wajib diisi!','error'); return; }
  const d = loadData();
  if (editingDeckId) {
    const dk = d.decks.find(x=>x.id===editingDeckId);
    if (dk) { dk.name=name; dk.desc=desc; dk.category=cat; dk.color=selectedColor; }
    showToast('Deck diperbarui ✅','success');
  } else {
    d.decks.unshift({ id:'deck_'+Date.now(), name, desc, category:cat, color:selectedColor, favorite:false, cards:[] });
    showToast('Deck baru dibuat! 🎉','success');
  }
  saveData(d); closeDeckModal();
  if (currentPage==='decks') filterDecks();
  renderDashboard();
}

// ──────────────────────────────────────
// DECK DETAIL
// ──────────────────────────────────────
function renderDeckDetail(deckId) {
  const d = loadData();
  const dk = d.decks.find(x=>x.id===deckId);
  if (!dk) { navigate('decks'); return; }
  const mastered = dk.cards.filter(c=>c.mastered).length;
  const pct = dk.cards.length ? Math.round(mastered/dk.cards.length*100) : 0;
  document.getElementById('deck-detail-header').innerHTML = `
    <div class="dh-color-bar" style="background:${dk.color}"></div>
    <div class="dh-info">
      <h2>${escHtml(dk.name)}</h2>
      <p>${escHtml(dk.desc||'Tidak ada deskripsi')}</p>
      <div class="dh-stats">
        <div class="dh-stat"><span>${dk.cards.length}</span><small>Kartu</small></div>
        <div class="dh-stat"><span>${mastered}</span><small>Dikuasai</small></div>
        <div class="dh-stat"><span>${pct}%</span><small>Progress</small></div>
      </div>
    </div>`;
  document.getElementById('card-count-label').textContent = dk.cards.length+' kartu';
  const grid  = document.getElementById('cards-grid');
  const empty = document.getElementById('cards-empty');
  if (dk.cards.length) {
    grid.innerHTML = dk.cards.map(c => `<div class="fc-item">
      <div class="fc-item-q">${escHtml(c.front)}</div>
      <div class="fc-item-a">${escHtml(c.back)}</div>
      <div class="fc-item-actions">
        <button class="fc-edit-btn" onclick="openCardModal('${c.id}')">✏️ Edit</button>
        <button class="fc-del-btn"  onclick="deleteCard('${c.id}')">🗑️ Hapus</button>
      </div>
    </div>`).join('');
    empty.classList.add('hidden');
  } else { grid.innerHTML=''; empty.classList.remove('hidden'); }
}

// ──────────────────────────────────────
// CARD MODAL
// ──────────────────────────────────────
function openCardModal(cardId) {
  editingCardId = cardId||null;
  const d = loadData();
  const dk = d.decks.find(x=>x.id===currentDeckId);
  const existing = cardId&&dk ? dk.cards.find(c=>c.id===cardId) : null;
  document.getElementById('card-modal-title').textContent = existing?'Edit Kartu':'Tambah Kartu';
  document.getElementById('card-front-input').value = existing?.front||'';
  document.getElementById('card-back-input').value  = existing?.back||'';
  document.getElementById('card-modal').classList.remove('hidden');
}
function closeCardModal() { document.getElementById('card-modal').classList.add('hidden'); editingCardId=null; }
function saveCard() {
  const front = document.getElementById('card-front-input').value.trim();
  const back  = document.getElementById('card-back-input').value.trim();
  if (!front||!back) { showToast('Isi pertanyaan dan jawaban!','error'); return; }
  const d = loadData();
  const dk = d.decks.find(x=>x.id===currentDeckId);
  if (!dk) return;
  if (editingCardId) {
    const c = dk.cards.find(x=>x.id===editingCardId);
    if (c) { c.front=front; c.back=back; }
    showToast('Kartu diperbarui ✅','success');
  } else {
    dk.cards.push({ id:'card_'+Date.now(), front, back, mastered:false });
    showToast('Kartu ditambahkan! 🃏','success');
  }
  saveData(d); closeCardModal(); renderDeckDetail(currentDeckId);
}
function deleteCard(cardId) {
  if (!confirm('Hapus kartu ini?')) return;
  const d = loadData();
  const dk = d.decks.find(x=>x.id===currentDeckId);
  if (!dk) return;
  dk.cards = dk.cards.filter(c=>c.id!==cardId);
  saveData(d); renderDeckDetail(currentDeckId);
  showToast('Kartu dihapus','warn');
}

// ──────────────────────────────────────
// STUDY MODE
// ──────────────────────────────────────
let studyCards=[],studyIndex=0,studyRight=0,studyWrong=0,studyDeckId=null,studyFlipped=false;

function handleStudyNav() {
  if (currentDeckId) { startStudyDeck(currentDeckId); return; }
  const d = loadData();
  const dk = d.decks.find(x=>x.cards.length>0);
  if (dk) startStudyDeck(dk.id);
  else { showToast('Buat deck dengan kartu dulu!','warn'); navigate('decks'); }
}
function startStudyDeck(deckId) {
  currentDeckId = deckId;
  const d = loadData();
  const dk = d.decks.find(x=>x.id===deckId);
  if (!dk||!dk.cards.length) { showToast('Deck tidak punya kartu!','warn'); return; }
  studyDeckId=deckId; studyCards=shuffle([...dk.cards]); studyIndex=studyRight=studyWrong=0;
  document.getElementById('study-deck-name').textContent = dk.name;
  document.getElementById('study-result').classList.add('hidden');
  document.getElementById('study-controls').style.display='flex';
  navigate('study'); showStudyCard();
}
function startStudy() { if(currentDeckId) startStudyDeck(currentDeckId); }
function startQuizFromDeck() { navigate('quiz'); }

function showStudyCard() {
  if (studyIndex>=studyCards.length) { showStudyResult(); return; }
  const card = studyCards[studyIndex];
  studyFlipped=false;
  document.getElementById('fc-inner').classList.remove('flipped');
  document.getElementById('fc-front-content').textContent = card.front;
  document.getElementById('fc-back-content').textContent  = card.back;
  const pct = studyCards.length ? (studyIndex/studyCards.length*100) : 0;
  document.getElementById('study-progress-fill').style.width = pct+'%';
  document.getElementById('study-progress-text').textContent = studyIndex+'/'+studyCards.length;
}
function flipCard() {
  studyFlipped=!studyFlipped;
  document.getElementById('fc-inner').classList.toggle('flipped',studyFlipped);
}
function markCard(known) {
  const card = studyCards[studyIndex];
  if (known) { studyRight++; card.mastered=true; showMoti(); }
  else { studyWrong++; card.mastered=false; studyCards.push(studyCards[studyIndex]); }
  const d=loadData(); const dk=d.decks.find(x=>x.id===studyDeckId);
  if (dk) {
    const orig=dk.cards.find(c=>c.id===card.id);
    if (orig) orig.mastered=card.mastered;
    d.studiedCards=(d.studiedCards||0)+1;
    saveData(d);
  }
  studyIndex++; showStudyCard();
}
function showStudyResult() {
  document.getElementById('study-controls').style.display='none';
  document.getElementById('study-progress-fill').style.width='100%';
  document.getElementById('study-progress-text').textContent=studyCards.length+'/'+studyCards.length;
  const res=document.getElementById('study-result'); res.classList.remove('hidden');
  const pct=studyRight/(studyRight+studyWrong)*100;
  document.getElementById('result-emoji').textContent  = pct>=80?'🎉':pct>=50?'💪':'📖';
  document.getElementById('result-title').textContent  = pct>=80?'Luar biasa!':pct>=50?'Bagus, lanjutkan!':'Ayo latihan lagi!';
  document.getElementById('result-desc').textContent   = 'Kamu menguasai '+studyRight+' dari '+(studyRight+studyWrong)+' kartu.';
  document.getElementById('res-right').textContent = studyRight;
  document.getElementById('res-wrong').textContent = studyWrong;
}
function restartStudy() { startStudyDeck(studyDeckId); }
function exitStudy() { navigate(currentDeckId?'deck-detail':'decks',currentDeckId); }

const MOTIS=[
  {emoji:'🌟',msg:'Keren banget!'},{emoji:'🔥',msg:'On fire!'},
  {emoji:'💪',msg:'Mantap!'},{emoji:'🎯',msg:'Tepat sasaran!'},{emoji:'⚡',msg:'Super cepat!'},
];
let motiTimer=null;
function showMoti() {
  const m=MOTIS[Math.floor(Math.random()*MOTIS.length)];
  document.getElementById('moti-emoji').textContent=m.emoji;
  document.getElementById('moti-msg').textContent=m.msg;
  const el=document.getElementById('moti-popup');
  el.classList.remove('hidden'); el.classList.add('show');
  clearTimeout(motiTimer);
  motiTimer=setTimeout(()=>el.classList.remove('show'),1200);
}

// ──────────────────────────────────────
// QUIZ MODE
// ──────────────────────────────────────
let quizState={deck:null,mode:'mc',questions:[],index:0,correct:0,incorrect:0,timer:null,timeLeft:30,answered:false,_mcCorrect:'',_tfCorrect:false};

function renderQuizSetup() {
  document.getElementById('quiz-setup').classList.remove('hidden');
  document.getElementById('quiz-session').classList.add('hidden');
  document.getElementById('quiz-result').classList.add('hidden');
  const d=loadData();
  const sel=document.getElementById('quiz-deck-select');
  sel.innerHTML=d.decks.filter(dk=>dk.cards.length>=2).map(dk=>
    '<option value="'+dk.id+'">'+escHtml(dk.name)+' ('+dk.cards.length+' kartu)</option>').join('');
  if (currentDeckId) sel.value=currentDeckId;
}
function startQuizDeck(deckId) { currentDeckId=deckId; navigate('quiz'); }

function startQuizSession() {
  const deckId=document.getElementById('quiz-deck-select').value;
  const mode=document.querySelector('input[name="quiz-mode"]:checked')?.value||'mc';
  const d=loadData();
  const dk=d.decks.find(x=>x.id===deckId);
  if (!dk||dk.cards.length<2) { showToast('Pilih deck minimal 2 kartu!','warn'); return; }
  quizState={deck:dk,mode,questions:shuffle([...dk.cards]),index:0,correct:0,incorrect:0,timer:null,timeLeft:30,answered:false,_mcCorrect:'',_tfCorrect:false};
  document.getElementById('quiz-setup').classList.add('hidden');
  document.getElementById('quiz-session').classList.remove('hidden');
  document.getElementById('quiz-result').classList.add('hidden');
  document.getElementById('qz-mode-label').textContent=modeLabel(mode);
  document.getElementById('qz-deck-name').textContent=dk.name;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const {questions,index,mode}=quizState;
  if (index>=questions.length) { showQuizResult(); return; }
  const q=questions[index]; const total=questions.length;
  document.getElementById('quiz-progress-fill').style.width=(index/total*100)+'%';
  document.getElementById('qz-progress-text').textContent=(index+1)+'/'+total;
  document.getElementById('qz-counter').textContent='Soal '+(index+1)+' dari '+total;
  document.getElementById('qz-question').textContent=q.front;
  document.getElementById('qz-score').textContent=quizState.correct;
  hideFeedback();
  ['mc','type','tf'].forEach(m=>document.getElementById('qz-'+m).classList.add('hidden'));
  if (mode==='mc') renderMC(q);
  else if (mode==='type') renderType();
  else renderTF(q);
  quizState.answered=false; startTimer();
}

function renderMC(q) {
  const cont=document.getElementById('qz-mc'); cont.classList.remove('hidden');
  const correct=q.back; quizState._mcCorrect=correct;
  const others=quizState.questions.filter(c=>c.id!==q.id);
  const wrongs=shuffle(others).slice(0,3).map(c=>c.back);
  const opts=shuffle([correct,...wrongs]);
  cont.innerHTML='';
  opts.forEach(txt=>{
    const btn=document.createElement('button');
    btn.className='mc-option'; btn.textContent=txt;
    btn.addEventListener('click',()=>handleMC(btn,txt));
    cont.appendChild(btn);
  });
}
function handleMC(btn,chosen) {
  if (quizState.answered) return;
  quizState.answered=true; stopTimer();
  const correct=quizState._mcCorrect;
  document.querySelectorAll('.mc-option').forEach(b=>{
    b.disabled=true;
    if (b.textContent===correct) b.classList.add('correct');
    else if (b===btn) b.classList.add('wrong');
  });
  recordAnswer(chosen===correct);
}
function renderType() {
  document.getElementById('qz-type').classList.remove('hidden');
  document.getElementById('qz-type-input').value='';
  setTimeout(()=>document.getElementById('qz-type-input').focus(),80);
}
function submitTypeAnswer() {
  if (quizState.answered) return;
  const val=document.getElementById('qz-type-input').value.trim().toLowerCase();
  const ans=quizState.questions[quizState.index].back.split('\n')[0].trim().toLowerCase();
  quizState.answered=true; stopTimer();
  recordAnswer(val===ans||(ans.includes(val)&&val.length>2));
}
function renderTF(q) {
  document.getElementById('qz-tf').classList.remove('hidden');
  const showCorrect=Math.random()>0.5; quizState._tfCorrect=showCorrect;
  const others=quizState.questions.filter(c=>c.id!==q.id);
  if (!showCorrect&&others.length) {
    const wrong=others[Math.floor(Math.random()*others.length)].back.split('\n')[0];
    document.getElementById('qz-question').textContent=q.front+'\n\nJawaban: "'+wrong+'"';
  } else {
    document.getElementById('qz-question').textContent=q.front+'\n\nJawaban: "'+q.back.split('\n')[0]+'"';
  }
  document.querySelectorAll('.btn-tf').forEach(b=>b.disabled=false);
}
function submitTF(userSaysTrue) {
  if (quizState.answered) return;
  quizState.answered=true; stopTimer();
  document.querySelectorAll('.btn-tf').forEach(b=>b.disabled=true);
  recordAnswer(userSaysTrue===quizState._tfCorrect);
}
function recordAnswer(isRight) {
  if (isRight) quizState.correct++; else quizState.incorrect++;
  showFeedback(isRight);
  setTimeout(()=>{ hideFeedback(); quizState.index++; renderQuizQuestion(); },1200);
}
function showFeedback(ok) {
  const ov=document.getElementById('feedback-overlay');
  document.getElementById('feedback-text').textContent=ok?'✅ Benar!':'❌ Salah!';
  ov.style.background=ok?'rgba(64,192,87,.5)':'rgba(250,82,82,.5)';
  ov.classList.remove('hidden');
}
function hideFeedback() { document.getElementById('feedback-overlay').classList.add('hidden'); }

const TIMER_MAX=30, CIRCUM=2*Math.PI*26;
function startTimer() {
  stopTimer(); quizState.timeLeft=TIMER_MAX; updateTimer();
  quizState.timer=setInterval(()=>{
    quizState.timeLeft--; updateTimer();
    if (quizState.timeLeft<=0) { stopTimer(); if(!quizState.answered){quizState.answered=true;recordAnswer(false);} }
  },1000);
}
function stopTimer() { clearInterval(quizState.timer); }
function updateTimer() {
  const t=quizState.timeLeft;
  document.getElementById('timer-val').textContent=t;
  const arc=document.getElementById('timer-arc');
  arc.style.strokeDashoffset=CIRCUM*(1-t/TIMER_MAX);
  arc.style.stroke=t>10?'var(--primary)':t>5?'var(--warn)':'var(--danger)';
}
function exitQuiz()  { stopTimer(); navigate('decks'); }
function retryQuiz() { stopTimer(); startQuizSession(); }

function showQuizResult() {
  stopTimer();
  document.getElementById('quiz-session').classList.add('hidden');
  document.getElementById('quiz-result').classList.remove('hidden');
  const total=quizState.questions.length, score=quizState.correct;
  const pct=total?Math.round(score/total*100):0;
  document.getElementById('qz-final-score').textContent=score;
  document.getElementById('qz-denom').textContent='/'+total;
  document.getElementById('qz-result-emoji').textContent=pct>=80?'🏆':pct>=60?'🎉':pct>=40?'💪':'📖';
  document.getElementById('qz-result-msg').textContent=pct>=80?'Luar biasa! Nilai sempurna!':pct>=60?'Bagus sekali!':pct>=40?'Lumayan, bisa lebih baik!':'Jangan menyerah, coba lagi!';
  document.getElementById('result-breakdown').innerHTML=`
    <div class="breakdown-item"><span style="color:var(--success)">${score}</span><small>Benar</small></div>
    <div class="breakdown-item"><span style="color:var(--danger)">${quizState.incorrect}</span><small>Salah</small></div>
    <div class="breakdown-item"><span style="color:var(--primary)">${pct}%</span><small>Akurasi</small></div>`;
  const d=loadData();
  d.quizHistory=d.quizHistory||[];
  d.quizHistory.push({deckId:quizState.deck.id,deckName:quizState.deck.name,mode:quizState.mode,correct:score,total,pct,date:Date.now()});
  saveData(d);
  if (pct>=70) launchConfetti();
}

function launchConfetti() {
  const wrap=document.getElementById('confetti-wrap'); wrap.innerHTML='';
  const colors=['#6c63ff','#ff6584','#43d9a2','#ffa94d','#74c0fc','#f783ac','#fff'];
  for (let i=0;i<70;i++) {
    const p=document.createElement('div'); p.className='confetti-piece';
    const c=colors[Math.floor(Math.random()*colors.length)];
    const x=Math.random()*100, dur=2+Math.random()*2, delay=Math.random()*1.5;
    p.style.cssText='left:'+x+'%;background:'+c+';width:'+(6+Math.random()*8)+'px;height:'+(6+Math.random()*8)+'px;animation:confettiFall '+dur+'s '+delay+'s ease-in forwards;border-radius:'+(Math.random()>.5?'50%':'2px');
    wrap.appendChild(p);
  }
  setTimeout(()=>wrap.innerHTML='',5000);
}

// ──────────────────────────────────────
// STATISTIK — ENHANCED
// ──────────────────────────────────────
function renderStats() {
  const d=loadData();
  const totalCards=d.decks.reduce((s,dk)=>s+dk.cards.length,0);
  const totalMastered=d.decks.reduce((s,dk)=>s+dk.cards.filter(c=>c.mastered).length,0);
  const hist=d.quizHistory||[];
  const scores=hist.map(h=>h.pct);
  const best=scores.length?Math.max(...scores):null;
  const avg=scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):null;

  document.getElementById('st-decks').textContent=d.decks.length;
  document.getElementById('st-cards').textContent=totalCards;
  document.getElementById('st-best').textContent=best!==null?best+'%':'-';
  document.getElementById('st-avg').textContent=avg!==null?avg+'%':'-';
  document.getElementById('st-quizzes').textContent=hist.length;
  document.getElementById('st-studied').textContent=d.studiedCards||0;

  renderMasteryPanel(totalCards, totalMastered);
  drawScoreLineChart(hist);
  drawDistChart(hist);
  renderActivityCalendar(hist);
  drawDeckMasteryChart(d.decks);
  renderDeckBreakdown(d.decks, hist);

  const histEl=document.getElementById('history-list');
  histEl.innerHTML=hist.length
    ? [...hist].reverse().slice(0,20).map(h=>`<div class="history-item">
        <div><div class="hi-deck">${escHtml(h.deckName)}</div><div class="hi-mode">${modeLabel(h.mode)}</div></div>
        <div style="text-align:right"><div class="hi-score">${h.correct}/${h.total} — ${h.pct}%</div><div class="hi-date">${timeAgo(h.date)}</div></div>
      </div>`).join('')
    : '<div class="empty-state"><div class="empty-icon">📋</div><p>Belum ada riwayat quiz.</p></div>';
}

/* ── Mastery Ring Panel ── */
function renderMasteryPanel(total, mastered) {
  const el=document.getElementById('mastery-panel'); if(!el)return;
  const pct=total?Math.round(mastered/total*100):0;
  const col=pct>=80?'#43d9a2':pct>=50?'#6c63ff':'#ffa94d';
  const r=40, circ=2*Math.PI*r;
  const dash=circ*(pct/100);
  el.innerHTML=`
    <div class="mastery-ring">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="${r}" fill="none" stroke="var(--bg2)" stroke-width="10"/>
        <circle cx="50" cy="50" r="${r}" fill="none" stroke="${col}" stroke-width="10"
          stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${circ-dash}"
          transform="rotate(-90 50 50)" style="transition:stroke-dashoffset .8s ease"/>
        <text x="50" y="55" text-anchor="middle" font-size="18" font-weight="900" fill="${col}">${pct}%</text>
      </svg>
    </div>
    <div class="mastery-info">
      <div class="mastery-title">Penguasaan Kartu Keseluruhan</div>
      <div class="mastery-sub">${mastered} dari ${total} kartu dikuasai</div>
      <div class="mastery-bar-wrap">
        <div class="mastery-bar"><div class="mastery-bar-fill" style="width:${pct}%;background:${col}"></div></div>
      </div>
      <div class="mastery-msg">${pct>=80?'🏆 Luar biasa! Hampir semua dikuasai!':pct>=50?'💪 Sudah separuh jalan, terus semangat!':pct>0?'📖 Yuk, perbanyak sesi belajar!':'🌱 Mulai belajar flashcard sekarang!'}</div>
    </div>`;
}

/* ── Line Chart: Tren Skor Quiz ── */
function drawScoreLineChart(hist) {
  const canvas=document.getElementById('score-chart');
  const empty=document.getElementById('chart-empty');
  if (!hist.length) { canvas.classList.add('hidden'); empty.classList.remove('hidden'); return; }
  canvas.classList.remove('hidden'); empty.classList.add('hidden');
  const recent=hist.slice(-15);
  const W=Math.max(canvas.parentElement.clientWidth-40,200), H=200;
  canvas.width=W; canvas.height=H;
  const ctx=canvas.getContext('2d');
  const isDark=document.documentElement.getAttribute('data-theme')==='dark';
  const gridC=isDark?'rgba(255,255,255,.07)':'rgba(0,0,0,.06)';
  const lblC=isDark?'#aab0cc':'#8888aa';
  const pad={top:24,right:20,bottom:44,left:44};
  const iW=W-pad.left-pad.right, iH=H-pad.top-pad.bottom;
  ctx.clearRect(0,0,W,H);
  for (let i=0;i<=4;i++) {
    const y=pad.top+iH-(i/4*iH);
    ctx.strokeStyle=gridC; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(pad.left,y); ctx.lineTo(W-pad.right,y); ctx.stroke();
    ctx.fillStyle=lblC; ctx.font='11px Nunito,sans-serif'; ctx.textAlign='right';
    ctx.fillText((i*25)+'%',pad.left-6,y+4);
  }
  const pts=recent.map((h,i)=>({x:pad.left+(i/Math.max(recent.length-1,1))*iW, y:pad.top+iH-(h.pct/100)*iH}));
  const grad=ctx.createLinearGradient(0,pad.top,0,pad.top+iH);
  grad.addColorStop(0,'rgba(108,99,255,.22)'); grad.addColorStop(1,'rgba(108,99,255,0)');
  ctx.beginPath(); ctx.moveTo(pts[0].x,pad.top+iH);
  pts.forEach(p=>ctx.lineTo(p.x,p.y));
  ctx.lineTo(pts[pts.length-1].x,pad.top+iH); ctx.closePath();
  ctx.fillStyle=grad; ctx.fill();
  ctx.beginPath(); pts.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
  ctx.strokeStyle='#6c63ff'; ctx.lineWidth=2.5; ctx.lineJoin='round'; ctx.stroke();
  pts.forEach((p,i)=>{
    const score=recent[i].pct;
    const dc=score>=80?'#43d9a2':score>=60?'#6c63ff':score>=40?'#ffa94d':'#fa5252';
    ctx.beginPath(); ctx.arc(p.x,p.y,5,0,Math.PI*2);
    ctx.fillStyle=dc; ctx.fill();
    ctx.strokeStyle=isDark?'#1e2235':'#fff'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle=lblC; ctx.font='bold 10px Nunito,sans-serif'; ctx.textAlign='center';
    ctx.fillText(score+'%',p.x,p.y-10);
  });
  recent.forEach((h,i)=>{
    const x=pad.left+(i/Math.max(recent.length-1,1))*iW;
    ctx.fillStyle=lblC; ctx.font='9px Nunito,sans-serif'; ctx.textAlign='center';
    const lbl=h.deckName.length>6?h.deckName.slice(0,6)+'…':h.deckName;
    ctx.fillText(lbl,x,H-6);
  });
}

/* ── Donut Chart: Distribusi Skor ── */
function drawDistChart(hist) {
  const canvas=document.getElementById('dist-chart');
  const empty=document.getElementById('dist-empty');
  if (!canvas) return;
  if (!hist.length) { canvas.classList.add('hidden'); empty?.classList.remove('hidden'); return; }
  canvas.classList.remove('hidden'); empty?.classList.add('hidden');
  const buckets=[0,0,0,0]; // <40, 40-59, 60-79, 80+
  hist.forEach(h=>{ if(h.pct>=80)buckets[3]++; else if(h.pct>=60)buckets[2]++; else if(h.pct>=40)buckets[1]++; else buckets[0]++; });
  const total=hist.length;
  const colors=['#fa5252','#ffa94d','#6c63ff','#43d9a2'];
  const labels=['< 40%','40–59%','60–79%','≥ 80%'];
  const S=200; canvas.width=S; canvas.height=S;
  const ctx=canvas.getContext('2d');
  const cx=S/2, cy=S/2, r=S/2-16, inner=r*0.56;
  ctx.clearRect(0,0,S,S);
  let startAngle=-Math.PI/2;
  buckets.forEach((cnt,i)=>{
    if (!cnt) return;
    const slice=(cnt/total)*Math.PI*2;
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,startAngle,startAngle+slice);
    ctx.closePath(); ctx.fillStyle=colors[i]; ctx.fill();
    if (cnt/total>0.08) {
      const midA=startAngle+slice/2;
      ctx.fillStyle='#fff'; ctx.font='bold 12px Nunito,sans-serif'; ctx.textAlign='center';
      ctx.fillText(Math.round(cnt/total*100)+'%', cx+Math.cos(midA)*(r*0.72), cy+Math.sin(midA)*(r*0.72)+4);
    }
    startAngle+=slice;
  });
  const isDark=document.documentElement.getAttribute('data-theme')==='dark';
  ctx.beginPath(); ctx.arc(cx,cy,inner,0,Math.PI*2);
  ctx.fillStyle=isDark?'#1e2235':'#fff'; ctx.fill();
  ctx.fillStyle=isDark?'#aab0cc':'#555577'; ctx.font='bold 13px Nunito,sans-serif'; ctx.textAlign='center';
  ctx.fillText(total+' quiz',cx,cy+5);
  const legEl=document.getElementById('dist-legend');
  if (legEl) legEl.innerHTML=labels.map((l,i)=>`
    <span class="dist-leg-item">
      <span class="dist-leg-dot" style="background:${colors[i]}"></span>${l}: <b>${buckets[i]}</b>
    </span>`).join('');
}

/* ── Bar Chart: Penguasaan per Deck ── */
function drawDeckMasteryChart(decks) {
  const canvas=document.getElementById('mastery-chart');
  if (!canvas) return;
  const filtered=decks.filter(d=>d.cards.length>0).slice(0,8);
  const empty=document.getElementById('mastery-empty');
  if (!filtered.length) { canvas.classList.add('hidden'); empty?.classList.remove('hidden'); return; }
  canvas.classList.remove('hidden'); empty?.classList.add('hidden');
  const W=Math.max(canvas.parentElement.clientWidth-40,200);
  const rowH=44; const H=filtered.length*rowH+16;
  canvas.width=W; canvas.height=H;
  const ctx=canvas.getContext('2d');
  const isDark=document.documentElement.getAttribute('data-theme')==='dark';
  const lblC=isDark?'#aab0cc':'#555577';
  const barBg=isDark?'rgba(255,255,255,.07)':'rgba(0,0,0,.06)';
  ctx.clearRect(0,0,W,H);
  const padL=140, barH=22, gap=rowH;
  filtered.forEach((dk,i)=>{
    const y=i*gap+10;
    const mastered=dk.cards.filter(c=>c.mastered).length;
    const pct=Math.round(mastered/dk.cards.length*100);
    const barW=W-padL-24;
    ctx.fillStyle=lblC; ctx.font='600 12px Nunito,sans-serif'; ctx.textAlign='right';
    const name=dk.name.replace(/[📜🎭]/g,'').trim();
    const nm=name.length>16?name.slice(0,16)+'…':name;
    ctx.fillText(nm, padL-8, y+barH/2+4);
    ctx.fillStyle=barBg;
    ctx.beginPath(); ctx.roundRect(padL,y,barW,barH,barH/2); ctx.fill();
    if (pct>0) {
      const grad=ctx.createLinearGradient(padL,0,padL+barW,0);
      grad.addColorStop(0,dk.color||'#6c63ff');
      grad.addColorStop(1,(dk.color||'#6c63ff')+'88');
      ctx.fillStyle=grad;
      ctx.beginPath(); ctx.roundRect(padL,y,Math.max(barW*pct/100,barH),barH,barH/2); ctx.fill();
    }
    const txtX=pct>=25?padL+8:padL+barW*pct/100+8;
    const txtFill=pct>=25?'#fff':lblC;
    ctx.fillStyle=txtFill; ctx.font='bold 11px Nunito,sans-serif'; ctx.textAlign='left';
    ctx.fillText(pct+'% ('+mastered+'/'+dk.cards.length+')', txtX, y+barH/2+4);
  });
}

/* ── Activity Calendar: 30 hari ── */
function renderActivityCalendar(hist) {
  const el=document.getElementById('activity-calendar'); if(!el)return;
  const days=30, now=Date.now(), msDay=86400000;
  const map={};
  hist.forEach(h=>{ const key=new Date(h.date).toDateString(); map[key]=(map[key]||0)+1; });
  const maxAct=Math.max(...Object.values(map),1);
  let html='<div class="cal-grid">';
  for (let i=days-1;i>=0;i--) {
    const ts=now-i*msDay;
    const key=new Date(ts).toDateString();
    const cnt=map[key]||0;
    const intensity=cnt?Math.min(Math.ceil((cnt/maxAct)*4),4):0;
    const dateStr=new Date(ts).toLocaleDateString('id-ID',{day:'numeric',month:'short'});
    html+='<div class="cal-cell intensity-'+intensity+'" title="'+dateStr+': '+cnt+' aktivitas"></div>';
  }
  html+='</div>';
  html+='<div class="cal-legend"><span style="color:var(--text3);font-size:.75rem">Kurang aktif</span><div class="cal-leg-boxes">';
  for(let n=0;n<=4;n++) html+='<div class="cal-cell intensity-'+n+'"></div>';
  html+='</div><span style="color:var(--text3);font-size:.75rem">Sangat aktif</span></div>';
  el.innerHTML=html;
}

/* ── Per-deck Breakdown Table ── */
function renderDeckBreakdown(decks, hist) {
  const el=document.getElementById('deck-breakdown'); if(!el)return;
  const byDeck={};
  hist.forEach(h=>{ if(!byDeck[h.deckId])byDeck[h.deckId]=[]; byDeck[h.deckId].push(h.pct); });
  const rows=decks.filter(d=>d.cards.length>0).map(d=>{
    const m=d.cards.filter(c=>c.mastered).length;
    const pct=Math.round(m/d.cards.length*100);
    const qs=byDeck[d.id]||[];
    const avgQ=qs.length?Math.round(qs.reduce((a,b)=>a+b,0)/qs.length):null;
    const col=d.color||'#6c63ff';
    const bar='<div style="display:flex;align-items:center;gap:6px"><div style="flex:1;height:6px;background:var(--bg2);border-radius:99px;overflow:hidden"><div style="width:'+pct+'%;height:100%;background:'+col+';border-radius:99px"></div></div><span style="font-size:.75rem;color:var(--text3)">'+pct+'%</span></div>';
    const sc=avgQ!==null?'<span class="score-badge" style="background:'+(avgQ>=80?'rgba(67,217,162,.15)':avgQ>=60?'rgba(108,99,255,.12)':'rgba(255,169,77,.15)')+'";color:'+(avgQ>=80?'#43d9a2':avgQ>=60?'#6c63ff':'#ffa94d')+'">'+avgQ+'%</span>':'<span style="color:var(--text3)">-</span>';
    return '<tr><td><span class="dk-dot" style="background:'+col+'"></span>'+escHtml(d.name.replace(/[📜🎭]/g,'').trim())+'</td><td>'+d.cards.length+'</td><td>'+bar+'</td><td>'+qs.length+'</td><td>'+sc+'</td></tr>';
  }).join('');
  el.innerHTML='<table class="breakdown-table"><thead><tr><th>Deck</th><th>Kartu</th><th>Dikuasai</th><th>Quiz</th><th>Avg</th></tr></thead><tbody>'+rows+'</tbody></table>';
}

// ──────────────────────────────────────
// TOAST
// ──────────────────────────────────────
function showToast(msg,type='info',dur=2800) {
  const cont=document.getElementById('toast-container');
  const t=document.createElement('div');
  const icons={success:'✅',error:'❌',warn:'⚠️',info:'ℹ️'};
  t.className='toast '+type;
  t.innerHTML='<span>'+(icons[type]||'ℹ️')+'</span>'+escHtml(msg);
  cont.appendChild(t);
  setTimeout(()=>{ t.style.animation='toastOut .3s ease forwards'; setTimeout(()=>t.remove(),300); },dur);
}

// ──────────────────────────────────────
// UTILITIES
// ──────────────────────────────────────
function shuffle(arr) {
  for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
  return arr;
}
function escHtml(s) {
  if(!s)return'';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}
function timeAgo(ts) {
  const m=Math.floor((Date.now()-ts)/60000);
  if(m<1)return'Baru saja'; if(m<60)return m+' menit lalu';
  const h=Math.floor(m/60); if(h<24)return h+' jam lalu';
  const day=Math.floor(h/24); if(day<7)return day+' hari lalu';
  return new Date(ts).toLocaleDateString('id-ID');
}
function modeLabel(m){return{mc:'Pilihan Ganda',type:'Ketik Jawaban',tf:'Benar/Salah'}[m]||m;}
function catEmoji(cat){return{Matematika:'📐',Bahasa:'📖',Pemrograman:'💻',Sains:'🔬',Lainnya:'📝'}[cat]||'📚';}

// ──────────────────────────────────────
// EVENT LISTENERS
// ──────────────────────────────────────
document.getElementById('deck-modal')?.addEventListener('click',function(e){if(e.target===this)closeDeckModal();});
document.getElementById('card-modal')?.addEventListener('click',function(e){if(e.target===this)closeCardModal();});
document.getElementById('qz-type-input')?.addEventListener('keydown',function(e){if(e.key==='Enter')submitTypeAnswer();});
window.addEventListener('resize',()=>{
  if(currentPage==='stats'){const d=loadData();drawScoreLineChart(d.quizHistory||[]);drawDeckMasteryChart(d.decks);}
});

console.log('⚡ FlashFun v3 ready! Deck Puisi & Majas + Stats Enhanced');