/* ============================================================
   Film & Dizi Arama Motoru — JavaScript
   Canlı arama, filtreleme ve modal detay görünümü
   Veriler: IMDb & TMDB kaynaklı gerçek bilgiler
   Posterler: TMDB resmi poster görselleri (assets/poster/)
   ============================================================ */

'use strict';

/* ------------------------------------------------------------
   VERİ SETİ
   Tüm film ve dizi bilgileri burada tanımlanır.
   IMDb puanları, süreler, kadro ve özetler doğrulanmıştır.
   ------------------------------------------------------------ */
const MEDIA_DATA = [
  {
    id: 1,
    title: 'Inception',
    type: 'Film',
    genres: ['Bilim Kurgu', 'Aksiyon', 'Gerilim'],
    year: 2010,
    rating: 8.8,
    duration: '2s 28dk',
    director: 'Christopher Nolan',
    cast: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy, Marion Cotillard, Michael Caine',
    shortDesc: 'Zihinlere girerek sırları çalan bir hırsız, son görevinde bir fikri bilinçaltına yerleştirmeye çalışır.',
    fullDesc: 'Dom Cobb, kurbanlarının bilinçaltına girerek değerli sırları çalan yetenekli bir hırsızdır. Bu nadir yetenek onu kurumsal casusluğun en aranan isimlerinden biri yapmıştır. Cobb\'a suç geçmişini silme şansı verilir; karşılığında ise imkânsız görünen bir görevi üstlenmesi gerekir: Inception — bir fikri hedefin zihnine yerleştirmek. Mükemmel suçu planlarken geçmişiyle yüzleşen Cobb, gerçek ile rüya arasındaki sınırın giderek eridiği bir yolculuğa çıkar.',
    poster: 'assets/poster/inception.jpg'
  },
  {
    id: 2,
    title: 'Breaking Bad',
    type: 'Dizi',
    genres: ['Dram', 'Suç', 'Gerilim'],
    year: 2008,
    rating: 9.5,
    duration: '5 Sezon',
    director: 'Vince Gilligan',
    cast: 'Bryan Cranston, Aaron Paul, Anna Gunn, Dean Norris, Betsy Brandt, RJ Mitte',
    shortDesc: 'Terminal kanser teşhisi konan bir kimya öğretmeni, ailesinin geleceğini güvence altına almak için uyuşturucu üretmeye başlar.',
    fullDesc: 'Walter White, Albuquerque\'de sıradan bir lise kimya öğretmenidir. İnoperabl akciğer kanseri teşhisi ve maddi sıkıntılar onu eski öğrencisi Jesse Pinkman ile birlikte metamfetamin üretmeye yönlendirir. "Heisenberg" takma adıyla suç dünyasına adım atan Walter, ahlaki sınırlarını adım adım aşarken ailesi, arkadaşları ve kendi kimliği arasında giderek derinleşen bir çatışma yaşar.',
    poster: 'assets/poster/breaking-bad.jpg'
  },
  {
    id: 3,
    title: 'Interstellar',
    type: 'Film',
    genres: ['Bilim Kurgu', 'Dram'],
    year: 2014,
    rating: 8.7,
    duration: '2s 49dk',
    director: 'Christopher Nolan',
    cast: 'Matthew McConaughey, Anne Hathaway, Jessica Chastain, Michael Caine, Matt Damon',
    shortDesc: 'Dünya yaşanmaz hale gelirken, bir grup kaşif insanlığın kurtuluşu için yeni bir galaksiye yolculuk eder.',
    fullDesc: 'Dünya, çevresel felaketler ve tarım krizleriyle sona yaklaşmaktadır. Eski NASA pilotu Cooper, insanlığın hayatta kalması için yeni bir gezegen bulmak amacıyla galaksinin ötesine doğru bir yolculuğa çıkar. Kızı Murph\'a olan sevgisi ve bilimsel keşif tutkusu onu uzak yıldızların ötesine sürüklerken, zaman, yerçekimi ve sevgi kavramlarının sınırları zorlanır.',
    poster: 'assets/poster/interstellar.jpg'
  },
  {
    id: 4,
    title: 'Stranger Things',
    type: 'Dizi',
    genres: ['Bilim Kurgu', 'Fantastik', 'Gerilim'],
    year: 2016,
    rating: 8.7,
    duration: '5 Sezon',
    director: 'Matt Duffer, Ross Duffer',
    cast: 'Millie Bobby Brown, Finn Wolfhard, Winona Ryder, David Harbour, Gaten Matarazzo, Caleb McLaughlin',
    shortDesc: '1980\'lerde küçük bir kasabada kaybolan bir çocuğun peşine düşen arkadaşları doğaüstü bir gizemle karşılaşır.',
    fullDesc: 'Indiana\'nın Hawkins kasabasında Will Byers\'ın gizemli bir şekilde ortadan kaybolmasıyla başlayan olaylar, kasabanın karanlık sırlarını gün yüzüne çıkarır. Will\'in arkadaşları telekinetik güçlere sahip gizemli bir kızla tanışır ve birlikte kasabayı tehdit eden doğaüstü güçlerle mücadele eder. 1980\'ler nostaljisi, bilim kurgu ve gerilim unsurlarını harmanlayan dizi küresel bir fenomen haline gelmiştir.',
    poster: 'assets/poster/stranger-things.jpg'
  },
  {
    id: 5,
    title: 'The Dark Knight',
    type: 'Film',
    genres: ['Aksiyon', 'Suç', 'Dram'],
    year: 2008,
    rating: 9.0,
    duration: '2s 32dk',
    director: 'Christopher Nolan',
    cast: 'Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine, Gary Oldman, Morgan Freeman',
    shortDesc: 'Batman, Joker\'in Gotham\'ı kaosa sürüklediği bir dönemde adaleti sağlamak için mücadele eder.',
    fullDesc: 'Batman, Teğmen Gordon ve Savcı Harvey Dent, Gotham\'daki organize suç örgütlerini temizlemek için birlikte çalışır. Ancak Joker\'in ortaya çıkmasıyla şehir tam bir kaosa sürüklenir. Kaosun ustası Joker, Batman\'in ahlaki sınırlarını test ederken Gotham\'ın kaderini belirleyecek bir mücadele başlar. Heath Ledger\'ın unutulmaz performansıyla sinema tarihine geçen bu yapım, süper kahraman filmlerinin sınırlarını yeniden tanımlamıştır.',
    poster: 'assets/poster/dark-knight.jpg'
  },
  {
    id: 6,
    title: 'Sherlock',
    type: 'Dizi',
    genres: ['Gizem', 'Suç', 'Dram'],
    year: 2010,
    rating: 9.1,
    duration: '4 Sezon',
    director: 'Mark Gatiss, Steven Moffat',
    cast: 'Benedict Cumberbatch, Martin Freeman, Una Stubbs, Rupert Graves, Louise Brealey, Andrew Scott',
    shortDesc: 'Modern Londra\'da dedektif Sherlock Holmes ve Dr. Watson, polisin çözemediği karmaşık vakaları çözer.',
    fullDesc: 'Benedict Cumberbatch\'in canlandırdığı modern Sherlock Holmes, 21. yüzyıl Londra\'sında keskin zekâsı ve gözlem gücüyle Scotland Yard\'ın çözemediği en karmaşık davalara el atar. Emekli asker doktor John Watson ile birlikte çalışan Sherlock, her vakada mantık ve bilimsel yöntemleri kullanarak suçluları ortaya çıkarır. Arthur Conan Doyle\'un klasik hikâyelerini çağdaş bir çerçeveye taşıyan dizi, televizyon tarihinin en beğenilen yapımlarından biridir.',
    poster: 'assets/poster/sherlock.jpg'
  },
  {
    id: 7,
    title: 'Pulp Fiction',
    type: 'Film',
    genres: ['Suç', 'Dram'],
    year: 1994,
    rating: 8.8,
    duration: '2s 34dk',
    director: 'Quentin Tarantino',
    cast: 'John Travolta, Samuel L. Jackson, Uma Thurman, Bruce Willis, Harvey Keitel, Tim Roth',
    shortDesc: 'Los Angeles\'ın suç dünyasında kesişen birbirinden bağımsız hikâyeler, stilize bir anlatımla sunulur.',
    fullDesc: 'Quentin Tarantino\'nun kült klasiği, Los Angeles\'ın yeraltı dünyasında birbirine bağlı dört farklı hikâyeyi non-lineer bir yapıda anlatır. Gangster Vincent Vega, boksör Butch Coolidge, gangster eşi Mia Wallace ve soyguncular Pumpkin ile Honey Bunny\'nin yolları beklenmedik şekillerde kesişir. Keskin diyaloglar, pop kültürü referansları ve eşsiz anlatım diliyle sinema tarihinin en etkili yapımlarından biri olmuştur.',
    poster: 'assets/poster/pulp-fiction.jpg'
  },
  {
    id: 8,
    title: 'Game of Thrones',
    type: 'Dizi',
    genres: ['Fantastik', 'Dram'],
    year: 2011,
    rating: 9.2,
    duration: '8 Sezon',
    director: 'David Benioff, D.B. Weiss',
    cast: 'Peter Dinklage, Emilia Clarke, Kit Harington, Lena Headey, Maisie Williams, Nikolaj Coster-Waldau',
    shortDesc: 'Yedi Krallık\'ta taht için verilen mücadelede hanedanlar, ittifaklar ve ihanetler iç içe geçer.',
    fullDesc: 'Westeros kıtasında Demir Taht için büyük bir güç mücadelesi başlar. Stark, Lannister, Baratheon ve Targaryen hanedanları arasındaki çatışmalar, kışın yaklaştığı bir dünyada hayatta kalma savaşına dönüşür. Siyasi entrikalar, savaşlar ve doğaüstü tehditlerle dolu bu epik fantezi, televizyon tarihinin en büyük prodüksiyonlarından biri olarak kabul edilir.',
    poster: 'assets/poster/game-of-thrones.jpg'
  },
  {
    id: 9,
    title: 'The Matrix',
    type: 'Film',
    genres: ['Aksiyon', 'Bilim Kurgu'],
    year: 1999,
    rating: 8.7,
    duration: '2s 16dk',
    director: 'Lana Wachowski, Lilly Wachowski',
    cast: 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving, Joe Pantoliano',
    shortDesc: 'Bir bilgisayar korsanı, gerçekliğin aslında makineler tarafından simüle edildiğini keşfeder.',
    fullDesc: 'Thomas Anderson gündüzleri programcı, geceleri "Neo" adıyla hackerlık yapan sıradan bir adamdır. Morpheus ile tanıştığında, tüm insanlığın makineler tarafından kontrol edilen sanal bir gerçeklikte yaşadığını öğrenir. Gerçek dünyaya uyanmak için Matrix\'ten kurtulması gereken Neo, "seçilmiş kişi" olup olmadığını keşfeder. Devrim niteliğindeki görsel efektleri ve felsefi derinliğiyle bilim kurgu sinemasının mihenk taşlarından biridir.',
    poster: 'assets/poster/matrix.jpg'
  },
  {
    id: 10,
    title: 'La Casa de Papel',
    type: 'Dizi',
    genres: ['Aksiyon', 'Suç', 'Gerilim'],
    year: 2017,
    rating: 8.2,
    duration: '5 Sezon',
    director: 'Álex Pina',
    cast: 'Úrsula Corberó, Álvaro Morte, Itziar Ituño, Pedro Alonso, Miguel Herrán, Jaime Lorente',
    shortDesc: 'Profesör kod adlı bir deha, ekibiyle İspanya Darphanesi\'ni soymak için kusursuz bir plan hazırlar.',
    fullDesc: 'Profesör olarak bilinen gizemli bir lider, sekiz suçludan oluşan ekibini İspanya Kraliyet Darphanesi\'ne sızdırır. Her biri şehir adıyla kodlanan bu ekip, rehineleri alarak tarihin en büyük soygunlarından birini gerçekleştirmeye çalışır. Polis müfettişi Raquel Murillo ile Profesör arasındaki zihin savaşı, gerilim dolu bu İspanyol yapımının merkezinde yer alır.',
    poster: 'assets/poster/la-casa-de-papel.jpg'
  },
  {
    id: 11,
    title: 'The Shawshank Redemption',
    type: 'Film',
    genres: ['Dram'],
    year: 1994,
    rating: 9.3,
    duration: '2s 22dk',
    director: 'Frank Darabont',
    cast: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler, Clancy Brown, Gil Bellows',
    shortDesc: 'Haksız yere hapse atılan bir banker, umut ve dostluğun gücüyle yıllar boyunca hayatta kalır.',
    fullDesc: 'Andy Dufresne, karısının ve sevgilisinin öldürülmesi suçundan haksız yere Shawshank Hapishanesi\'ne gönderilir. Hapishanenin sert koşullarında "Red" adlı mahkûmla derin bir dostluk kurar. Umut, azim ve zekâsıyla hem kendine hem çevresindekilere ilham veren Andy\'nin hikâyesi, özgürlük ve insan ruhunun dayanıklılığı üzerine zamansız bir başyapıttır. IMDb\'nin tüm zamanların en yüksek puanlı filmi olarak kabul edilir.',
    poster: 'assets/poster/shawshank.jpg'
  },
  {
    id: 12,
    title: 'Friends',
    type: 'Dizi',
    genres: ['Komedi', 'Romantik'],
    year: 1994,
    rating: 8.9,
    duration: '10 Sezon',
    director: 'David Crane, Marta Kauffman',
    cast: 'Jennifer Aniston, Courteney Cox, Lisa Kudrow, Matt LeBlanc, Matthew Perry, David Schwimmer',
    shortDesc: 'Manhattan\'da yaşayan altı arkadaşın günlük hayatları, dostlukları ve komik maceraları.',
    fullDesc: 'New York\'ta Central Perk kafesinde buluşan Rachel, Monica, Phoebe, Joey, Chandler ve Ross\'un günlük yaşamlarını, aşk ilişkilerini ve komik anlarını anlatan efsanevi sitcom. 1990\'ların Manhattan\'ında geçen dizi, mizahı, sıcaklığı ve karakterleriyle nesiller boyu sevilmiş ve televizyon tarihinin en popüler yapımlarından biri haline gelmiştir.',
    poster: 'assets/poster/friends.jpg'
  },
  {
    id: 13,
    title: 'Parasite',
    type: 'Film',
    genres: ['Gerilim', 'Dram', 'Komedi'],
    year: 2019,
    rating: 8.5,
    duration: '2s 12dk',
    director: 'Bong Joon-ho',
    cast: 'Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong, Choi Woo-shik, Park So-dam, Lee Jung-eun',
    shortDesc: 'Yoksul bir aile, zengin bir ailenin evine sızarak hayatlarını değiştirmeye çalışır.',
    fullDesc: 'Ki-taek ve ailesi yarı bodrum katında yaşam mücadelesi verirken tesadüfen zengin Park ailesiyle tanışır. Kurnazlıkla Park ailesinin evine sızmayı başaran Kim ailesi, sınıf farklılıklarının yarattığı gerilimi derinlemesine keşfeder. Bong Joon-ho\'nun Oscar ödüllü bu başyapıtı, kapitalizm, eşitsizlik ve insan doğası üzerine keskin bir ayna tutar.',
    poster: 'assets/poster/parasite.jpg'
  },
  {
    id: 14,
    title: 'Dark',
    type: 'Dizi',
    genres: ['Bilim Kurgu', 'Gizem', 'Gerilim'],
    year: 2017,
    rating: 8.7,
    duration: '3 Sezon',
    director: 'Baran bo Odar, Jantje Friese',
    cast: 'Louis Hofmann, Oliver Masucci, Karoline Eichhorn, Jördis Triebel, Maja Schöne',
    shortDesc: 'Almanya\'daki küçük bir kasabada kaybolan çocuklar, zaman yolculuğu ve karanlık sırları ortaya çıkarır.',
    fullDesc: 'Winden kasabasında kaybolan çocuklar, dört hanedan arasındaki karmaşık bağlantıları gün yüzüne çıkarır. 33 yıllık döngüler halinde tekrarlanan olaylar, zaman yolculuğu ve kader kavramını sorgulayan bu Alman yapımı, izleyicilerini çok katmanlı bir bulmacanın içine çeker. Netflix\'in en iddialı bilim kurgu dizilerinden biri olarak övgüyle karşılanmıştır.',
    poster: 'assets/poster/dark.jpg'
  },
  {
    id: 15,
    title: 'Mad Max: Fury Road',
    type: 'Film',
    genres: ['Aksiyon', 'Bilim Kurgu'],
    year: 2015,
    rating: 8.1,
    duration: '2s',
    director: 'George Miller',
    cast: 'Tom Hardy, Charlize Theron, Nicholas Hoult, Hugh Keays-Byrne, Rosie Huntington-Whiteley',
    shortDesc: 'Post-apokaliptik çölde Max ve Furiosa, tiran Immortan Joe\'a karşı kaçış mücadelesi verir.',
    fullDesc: 'Çorak bir gelecekte su ve yakıtın kontrol edildiği bir dünyada Max Rockatansky, İmparator Furiosa ile birlikte Immortan Joe\'un zulmünden kaçan kadınları kurtarmak için çöl boyunca nefes kesen bir kovalamacaya atılır. George Miller\'ın görsel şölen niteliğindeki bu aksiyon başyapıtı, pratik efektler ve sürekli hareket halindeki sinematografisiyle modern sinemanın en etkileyici aksiyon filmlerinden biri olarak kabul edilir.',
    poster: 'assets/poster/mad-max.jpg'
  },
  {
    id: 16,
    title: 'The Crown',
    type: 'Dizi',
    genres: ['Dram'],
    year: 2016,
    rating: 8.6,
    duration: '6 Sezon',
    director: 'Peter Morgan',
    cast: 'Claire Foy, Olivia Colman, Imelda Staunton, Matt Smith, Tobias Menzies, Helena Bonham Carter',
    shortDesc: 'İngiliz kraliyet ailesinin II. Elizabeth dönemindeki siyasi ve kişisel mücadeleleri anlatılır.',
    fullDesc: 'Netflix\'in görkemli yapımı, Kraliçe II. Elizabeth\'in tahta çıkışından itibaren İngiliz kraliyet ailesinin iç dünyasını, siyasi krizleri ve kişisel trajedileri derinlemesine inceler. Taç giyme töreninden modern kraliyetin zorluklarına kadar geniş bir panoramayı sunan dizi, dönem atmosferi ve güçlü oyunculuklarıyla büyük beğeni toplamıştır.',
    poster: 'assets/poster/the-crown.jpg'
  },
  {
    id: 17,
    title: 'Gone Girl',
    type: 'Film',
    genres: ['Gerilim', 'Gizem', 'Dram'],
    year: 2014,
    rating: 8.1,
    duration: '2s 29dk',
    director: 'David Fincher',
    cast: 'Ben Affleck, Rosamund Pike, Neil Patrick Harris, Tyler Perry, Carrie Coon, Kim Dickens',
    shortDesc: 'Eşinin kaybolmasıyla suçlanan bir adam, medya ve gerçekler arasında sıkışıp kalır.',
    fullDesc: 'Nick Dunne\'in eşi Amy\'nin gizemli kayboluşu, medyanın ilgisini üzerine çeker ve Nick\'i birinci dereceden şüpheli konumuna düşürür. Amy\'nin günlüklerinden ortaya çıkan sırlar, mükemmel evliliğin ardındaki gerçeği gün yüzüne çıkarır. Gillian Flynn\'in çok satan romanından uyarlanan bu psikolojik gerilim, evlilik, medya ve yalan üzerine sarsıcı bir anlatım sunar.',
    poster: 'assets/poster/gone-girl.jpg'
  },
  {
    id: 18,
    title: 'Peaky Blinders',
    type: 'Dizi',
    genres: ['Dram', 'Suç'],
    year: 2013,
    rating: 8.8,
    duration: '6 Sezon',
    director: 'Steven Knight',
    cast: 'Cillian Murphy, Helen McCrory, Paul Anderson, Tom Hardy, Sophie Rundle, Finn Cole',
    shortDesc: '1920\'ler Birmingham\'ında Peaky Blinders çetesi, şehrin yeraltı dünyasına hükmeder.',
    fullDesc: 'I. Dünya Savaşı sonrası Birmingham\'da, Peaky Blinders adlı çete şapka kenarlarına gizledikleri jiletlerle korku salar. Liderleri Tommy Shelby, ailesini ve çetesini güç ve meşruiyet arayışında tehlikeli yollara sürükler. Politik entrikalar, gangster savaşları ve Shelby ailesinin iç çatışmalarıyla dolu bu İngiliz yapımı, dönem atmosferi ve Cillian Murphy\'nin ikonik performansıyla büyük beğeni toplamıştır.',
    poster: 'assets/poster/peaky-blinders.jpg'
  },
  {
    id: 19,
    title: 'Everything Everywhere All at Once',
    type: 'Film',
    genres: ['Aksiyon', 'Komedi', 'Bilim Kurgu', 'Dram'],
    year: 2022,
    rating: 7.8,
    duration: '2s 19dk',
    director: 'Daniel Kwan, Daniel Scheinert',
    cast: 'Michelle Yeoh, Stephanie Hsu, Ke Huy Quan, Jamie Lee Curtis, James Hong, Tallie Medel',
    shortDesc: 'Bir çamaşırhane sahibi, paralel evrenler arasında ailesini kurtarmak için sıradışı bir yolculuğa çıkar.',
    fullDesc: 'Evelyn Wang, vergi dairesiyle uğraşan sıradan bir göçmen anne olarak hayatını sürdürürken kendini sonsuz sayıda paralel evren arasında sıkışmış bulur. Her evrende farklı bir versiyonu olan Evelyn, çoklu evren yok olma tehdidine karşı ailesini ve tüm gerçekliği kurtarmak zorundadır. Michelle Yeoh\'un muhteşem performansıyla ödüllere doymayan bu yapım, aile, kimlik ve varoluş üzerine eşsiz bir deneyim sunar.',
    poster: 'assets/poster/everything-everywhere.jpg'
  },
  {
    id: 20,
    title: 'Black Mirror',
    type: 'Dizi',
    genres: ['Bilim Kurgu', 'Gizem', 'Gerilim'],
    year: 2011,
    rating: 8.7,
    duration: '6 Sezon',
    director: 'Charlie Brooker',
    cast: 'Jesse Plemons, Bryce Dallas Howard, Daniel Kaluuya, Alex Lawther, Hayley Atwell, Jon Hamm',
    shortDesc: 'Teknolojinin insanlık üzerindeki karanlık ve distopik etkilerini konu alan antoloji dizisi.',
    fullDesc: 'Charlie Brooker\'ın yarattığı bu antoloji dizi, her bölümde farklı bir hikâye ve karakterle teknolojinin insan ilişkileri, toplum ve bireysel özgürlük üzerindeki rahatsız edici etkilerini sorgular. Sosyal medya, yapay zekâ, sanal gerçeklik ve dijital gözetim gibi konuları işleyen dizi, modern dünyanın aynası niteliğinde karanlık ve düşündürücü hikâyeler sunar.',
    poster: 'assets/poster/black-mirror.jpg'
  }
];

/* ------------------------------------------------------------
   FİLTRE TANIMLARI
   ------------------------------------------------------------ */
const FILTERS = [
  'Hepsi',
  'Film',
  'Dizi',
  'Aksiyon',
  'Bilim Kurgu',
  'Fantastik',
  'Gerilim',
  'Dram',
  'Romantik',
  'Komedi',
  'Suç',
  'Gizem'
];

/* ------------------------------------------------------------
   DURUM (STATE)
   ------------------------------------------------------------ */
let activeFilter = 'Hepsi';
let searchQuery  = '';

/* ------------------------------------------------------------
   DOM REFERANSLARI
   ------------------------------------------------------------ */
const searchInput    = document.getElementById('searchInput');
const searchBtn      = document.getElementById('searchBtn');
const filtersEl      = document.getElementById('filters');
const cardGrid       = document.getElementById('cardGrid');
const noResults      = document.getElementById('noResults');
const resultsCount   = document.getElementById('resultsCount');
const modalOverlay   = document.getElementById('modalOverlay');
const modalClose     = document.getElementById('modalClose');
const modalBack      = document.getElementById('modalBack');

/* Modal içerik alanları */
const modalPoster    = document.getElementById('modalPoster');
const modalTitle     = document.getElementById('modalTitle');
const modalType      = document.getElementById('modalType');
const modalYear      = document.getElementById('modalYear');
const modalDuration  = document.getElementById('modalDuration');
const modalGenre     = document.getElementById('modalGenre');
const modalRating    = document.getElementById('modalRating');
const modalDesc      = document.getElementById('modalDescription');
const modalDirector  = document.getElementById('modalDirector');
const modalCast      = document.getElementById('modalCast');

/* ------------------------------------------------------------
   YARDIMCI FONKSİYONLAR
   ------------------------------------------------------------ */

/**
 * Verilen medya öğesinin aktif filtreye uyup uymadığını kontrol eder.
 * @param {Object} item - Medya nesnesi
 * @returns {boolean}
 */
function matchesFilter(item) {
  if (activeFilter === 'Hepsi') return true;
  if (activeFilter === 'Film' || activeFilter === 'Dizi') {
    return item.type === activeFilter;
  }
  return item.genres.includes(activeFilter);
}

/**
 * Arama sorgusuna göre başlık eşleşmesini kontrol eder.
 * @param {Object} item - Medya nesnesi
 * @returns {boolean}
 */
function matchesSearch(item) {
  if (!searchQuery.trim()) return true;
  return item.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
}

/**
 * Yıldız ikonu SVG'sini döndürür.
 * @returns {string} SVG HTML string
 */
function starIconSVG() {
  return `<svg class="star-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="currentColor"/>
  </svg>`;
}

/* ------------------------------------------------------------
   FİLTRE BUTONLARINI OLUŞTUR
   ------------------------------------------------------------ */
function renderFilters() {
  filtersEl.innerHTML = '';

  FILTERS.forEach(function (filter) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'filter-btn' + (filter === activeFilter ? ' filter-btn--active' : '');
    btn.textContent = filter;
    btn.dataset.filter = filter;
    btn.setAttribute('aria-pressed', filter === activeFilter ? 'true' : 'false');

    btn.addEventListener('click', function () {
      activeFilter = filter;
      renderFilters();
      renderCards();
    });

    filtersEl.appendChild(btn);
  });
}

/* ------------------------------------------------------------
   SKELETON YÜKLEME
   ------------------------------------------------------------ */

/**
 * İlk yüklemede skeleton kartları gösterir.
 * @param {number} count - Gösterilecek skeleton sayısı
 */
function renderSkeletons(count) {
  cardGrid.innerHTML = '';
  cardGrid.hidden = false;
  noResults.hidden = true;
  resultsCount.textContent = '';

  for (var i = 0; i < count; i++) {
    var skeleton = document.createElement('div');
    skeleton.className = 'card card--skeleton';
    skeleton.setAttribute('aria-hidden', 'true');
    skeleton.innerHTML = `
      <div class="card__poster-wrap">
        <div class="skeleton-block skeleton-poster"></div>
      </div>
      <div class="card__body">
        <div class="skeleton-block skeleton-title"></div>
        <div class="skeleton-block skeleton-rating"></div>
        <div class="skeleton-block skeleton-genre"></div>
        <div class="skeleton-block skeleton-year"></div>
        <div class="skeleton-block skeleton-desc"></div>
      </div>
    `;
    cardGrid.appendChild(skeleton);
  }
}

/* ------------------------------------------------------------
   KARTLARI OLUŞTUR VE RENDER ET
   ------------------------------------------------------------ */
function renderCards() {
  const filtered = MEDIA_DATA.filter(function (item) {
    return matchesFilter(item) && matchesSearch(item);
  });

  cardGrid.classList.add('card-grid--updating');
  cardGrid.innerHTML = '';

  if (filtered.length === 0) {
    noResults.hidden = false;
    cardGrid.hidden = true;
    resultsCount.textContent = '';
    return;
  }

  noResults.hidden = true;
  cardGrid.hidden = false;
  resultsCount.textContent = filtered.length + ' sonuç gösteriliyor';

  filtered.forEach(function (item, index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('role', 'listitem');
    card.style.animationDelay = (index * 0.06) + 's';

    const primaryGenre = item.genres[0];

    card.innerHTML = `
      <div class="card__poster-wrap">
        <img
          class="card__poster"
          src="${item.poster}"
          alt="${item.title} posteri"
          loading="lazy"
        >
        <span class="card__type-badge">${item.type}</span>
        <div class="card__overlay">
          <button type="button" class="card__overlay-btn">Detayları Gör</button>
        </div>
      </div>
      <div class="card__body">
        <h3 class="card__title">${item.title}</h3>
        <div class="card__rating">
          ${starIconSVG()}
          <span>IMDb ${item.rating}</span>
        </div>
        <span class="card__genre">${primaryGenre}</span>
        <span class="card__year">${item.year}</span>
        <p class="card__description">${item.shortDesc}</p>
        <button type="button" class="card__btn" data-id="${item.id}">Detay</button>
      </div>
    `;

    /* Detay butonları — overlay ve mobil */
    card.querySelector('.card__overlay-btn').addEventListener('click', function () {
      openModal(item);
    });
    card.querySelector('.card__btn').addEventListener('click', function () {
      openModal(item);
    });

    cardGrid.appendChild(card);
  });

  setTimeout(function () {
    cardGrid.classList.remove('card-grid--updating');
  }, 250);
}

/* ------------------------------------------------------------
   MODAL İŞLEMLERİ
   ------------------------------------------------------------ */

/**
 * Detay modalını açar ve içeriği doldurur.
 * Kart ve detay sayfası aynı veri kaynağını kullanır.
 * @param {Object} item - Medya nesnesi
 */
function openModal(item) {
  modalPoster.src = item.poster;
  modalPoster.alt = item.title + ' posteri';
  modalTitle.textContent = item.title;
  modalType.textContent = item.type;
  modalYear.textContent = item.year;
  modalDuration.textContent = item.duration;
  modalGenre.textContent = item.genres.join(', ');
  modalRating.textContent = item.rating;
  modalDesc.textContent = item.fullDesc;
  modalDirector.textContent = item.director;
  modalCast.textContent = item.cast;

  modalOverlay.hidden = false;
  modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modalBack.focus();
}

/**
 * Detay modalını kapatır.
 */
function closeModal() {
  modalOverlay.hidden = true;
  modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ------------------------------------------------------------
   OLAY DİNLEYİCİLERİ
   ------------------------------------------------------------ */

/* Canlı arama — her tuş vuruşunda filtrele */
searchInput.addEventListener('input', function () {
  searchQuery = searchInput.value;
  renderCards();
});

/* Ara butonu */
searchBtn.addEventListener('click', function () {
  searchQuery = searchInput.value;
  renderCards();
  searchInput.focus();
});

/* Enter tuşu ile arama */
searchInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    searchQuery = searchInput.value;
    renderCards();
  }
});

/* Modal kapatma — X butonu */
modalClose.addEventListener('click', closeModal);

/* Modal kapatma — Geri Dön butonu */
modalBack.addEventListener('click', closeModal);

/* Modal kapatma — dışarı tıklama */
modalOverlay.addEventListener('click', function (e) {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

/* Modal kapatma — Escape tuşu */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modalOverlay.hidden) {
    closeModal();
  }
});

/* ------------------------------------------------------------
   UYGULAMA BAŞLATMA
   ------------------------------------------------------------ */
function init() {
  renderFilters();
  renderSkeletons(8);

  /* Skeleton sonrası gerçek kartları sırayla göster */
  setTimeout(function () {
    renderCards();
  }, 700);
}

init();
