export const chooseFromList = (list, chosen = new Map(), { limit } = {}) => {
  const choices = list.map(value => {
    if (value instanceof Function) {
      return { value, weight: 5, limit };
    } else if (value instanceof Object && value.hasOwnProperty('value')) {
      return value;
    } else {
      return { value, weight: 5, limit };
    }
  });
  return choose(choices, chosen);
};

export const chooseFromUniformList = (list, chosen, { limit } = {}) => {
  const choices = list.map(value => ({ value, weight: 5, limit }));
  return choose(choices, chosen);
};

const shuffle = (array) => {
  for (let attempt = 0; attempt < 100; attempt++) {
    const original = array.join('');
    let currentIndex = array.length;
    while (currentIndex != 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    if (array.join('') != original) {
      return array;
    }
  }
  return array;
};

export const buildVocabulary = ([korean, english]) => {
     const translation = new Map();
     for (let i = 0; i < korean.length; i++) {
       translation.set(english[i], korean[i]);
     }
     const vocabulary = new Set(english);
     const questions = [];
     for (const word of vocabulary) {
       questions.push({ value: `${translation.get(word)} [${shuffle(word.split('')).join('')}] = `, weight: word.length });
     }
     return questions;
   };

export const buildCopying = ([korean, english]) => {
     const vocabulary = new Set(english);
     const questions = [];
     for (const word of vocabulary) {
       questions.push({ value: `${word} = `, weight: word.length });
     }
     return questions;
   };

export const buildPrompt = () => {
     const vocabulary = new Set(
       ["because", "then", "since", "until", "seemed", "looked", "felt",
        "thought", "said", "afterward", "before", "so", "therefore", "thought",
        "strangely", "mysteriously", "unusually", "often", "rarely",
        "sometimes", "happy", "angry", "sad", "glad", "bad", "good", "interesting", "boring",
        "jealous", "kind", "mean", "orange", "violet", "blue", "pink", "delicious", "horrible",
        "ugly", "beautiful", "expensive", "cheap", "fast", "slow", "quick", "clumsy",
        "careful", "dangerous", "safe", "sloppy", "stupid", "clever", "intelligent", "dumb",
        "tiny", "huge", "small", "large", "ordinary", "extraordinary", "telescope", "planet",
        "star", "rainbow", "cave", "waterfall", "computer", "paper", "train", "truck", "bicycle",
        "shop", "thief", "doctor", "maniac", "person", "badly", "well", "ill", "healthy",
        "turnip", "fish", "animal", "spider", "insect", "crab", "crocodile", "monkey",
        "volcano", "mountain", "field", "swamp", "forest", "snow", "desert", "ice", "lava",
        "cliff", "skyscraper", "hospital", "fire", "water", "earth", "air", "ambulance",
        "fire station", "train station", "airport", "submarine", "spaceship", "alien",
        "plant", "elephant", "dog", "cat", "mouse", "giant", "goblin", "elf", "nose", "ear",
        "tongue", "finger", "hand", "leg", "foot", "knee", "elbow", "bellybutton", "shoulder",
        "turtle", "shoe", "glove", "hat", "scarf", "zoom", "zip", "zap"]);
     const questions = [];
     for (const word of vocabulary) {
       questions.push({ value: `${word}`, weight: word.length });
     }
     return questions;
   };

export const buildEmotivePrompt = () => {
  const vocabulary = new Set(
    ["underground", "forbidden", "banned", "secret", "concealed", "unbelievable", "covert",
     "hidden", "magical", "instantly", "left", "magnificent", "miracle", "profitable",
     "proven", "quick", "remarkable", "results", "revolutionary", "safe", "save", "sensational",
     "should", "startling", "recommend", "suggest", "superb", "superior", "tremendous", "truly",
     "trustworthy", "urge", "worthwhile", "limited", "seize", "bargain", "discount", "explode",
     "extra", "fortune", "freebie", "jackpot", "reduced", "instant", "rocket", "doubtful", "uncertain",
     "indecisive", "perplexed", "embarrassed", "hesitant", "disillusioned", "distrustful", "misgiving",
     "unsure", "tense", "stressed", "uncomfortable", "dishonest", "disdainful", "manipulative", "judgmental",
     "argumentative", "authoritative", "condescending", "distracted", "disoriented", "off-kilter", "frenzied",
     "blushing", "awkward", "incapable", "paralyzed", "fatigued", "inferior", "vulnerable", "distressed",
     "pathetic", "distraught", "doomed", "overwhelmed", "incompetent", "incapacitated", "trapped", "squirming",
     "jittery", "woozy", "twitching", "compulsive", "uncaring", "uninterested", "unresponsive", "terrified",
     "suspicious", "anxious", "alarmed", "panicked", "threatened", "cowardly", "insecure", "ordeal",
     "outrageousness", "provoke", "repulsive", "scandal", "severe", "shameful", "shocking", "terrible",
     "tragic", "unreliable", "unstable", "wicked", "aggravate", "agony", "appalled", "atrocious", "corrupting",
     "damaging", "deplorable", "disadvantages", "disastrous", "disgusted", "dreadful", "eliminate", "harmful",
     "harsh", "inconsiderate", "enraged", "offensive", "aggressive", "frustrated", "controlling",
     "resentful", "malicious", "infuriated", "critical", "violent", "vindictive", "sadistic", "spiteful",
     "furious", "agitated", "antagonistic", "repulsed", "quarrelsome", "venomous", "rebellious", "exasperated",
     "impatient", "contrary", "condemning", "seething", "scornful", "sarcastic", "poisonous", "jealous",
     "ticked off", "revengeful", "retaliating", "reprimanding", "powerless", "despicable", "self-hating",
     "desperate", "alienated", "pessimistic", "dejected", "accurate", "instantly", "advantage", "always",
     "bargain", "certain", "certainly", "confident", "convenient", "definitely", "delighted", "easy",
     "ecstatic", "effective", "emphasize", "extremely", "freedom", "guaranteed", "introducing", "first ever",
     "investment", "conscientious", "approving", "honored", "privileged", "adaptable", "relaxed", "astonishing",
     "astounded", "assured", "fulfilled", "genuine", "authentic", "self-sufficient", "reliable",
     "sure", "secure", "stable", "honest", "truthful", "supportive", "excellent", "responsible", "solid",
     "trusting", "supported", "absolutely", "bargain", "blissful", "joyous", "delighted", "overjoyed", "gleeful",
     "thankful", "festive", "ecstatic", "satisfied", "cheerful", "sunny", "elated", "jubilant", "jovial",
     "fun-loving", "lighthearted", "glorious", "innocent", "child-like", "gratified", "euphoric", "world",
     "playful", "courageous", "energetic", "liberated", "optimistic", "frisky", "animated", "spirited",
     "thrilled", "wonderful", "funny", "intelligent", "exhilarated", "spunky", "youthful", "vigorous",
     "tickled", "creative", "constructive", "helpful", "resourceful", "at ease", "comfortable", "pleased",
     "encouraged", "surprised", "content", "serene", "bright", "blessed", "motivated", "eager", "keen",
     "earnest", "inspired", "enthusiastic", "bold", "brave", "daring", "hopeful", "upbeat", "assured", "clear",
     "balanced", "fine", "okay", "grateful", "carefree", "adequate", "fulfilled", "genuine", "authentic",
     "forgiving", "sincere", "uplifted", "unburdened", "confident", "self-sufficient", "reliable", "sure",
     "unique", "dynamic", "tenacious", "cooperative", "productive", "exuberant", "responsive", "conscientious",
     "approving", "honored", "privileged", "adaptable", "calm", "at ease", "comfortable", "content", "quiet",
     "certain", "relaxed", "serene", "bright", "blessed", "balanced", "grateful", "carefree", "fulfilled",
     "genuine", "authentic", "forgiving", "sincere", "uplifted", "unburdened", "confident", "self-sufficient",
     "glowing", "radiant", "beaming", "reflective", "smiling", "grounded", "unhurried", "open-minded",
     "efficient", "non-controlling", "unassuming", "trusting", "supported", "fluid", "light", "spontaneous",
     "aware", "healthy", "meditative", "still", "rested", "waiting", "laughing", "graceful", "natural", "steady",
     "centered", "placid",
        ]);
     const questions = [];
     for (const word of vocabulary) {
       questions.push({ value: `${word}`, weight: word.length });
     }
     return questions;
   };

export const buildThirdGradePrompt = () => {
    const vocabulary = new Set([
      "ability", "absorb", "accuse", "act", "active", "actual", "adopt", "advantage", "advice", "ambition", "ancient",
      "approach", "arrange", "arctic", "attitude", "attract", "average", "avoid", "Bold", "border", "brief", "brilliant",
      "cable", "capture", "certain", "chill", "clever", "climate", "cling", "coast", "confess", "consider", "contain",
      "continent", "convince", "coward", "crew", "crumple", "custom", "decay", "deed", "defend", "delicate", "device",
      "diagram", "digest", "disease", "distant", "doze", "drift", "elegant", "enable", "examine", "explore", "fan",
      "fatal", "fierce", "flutter", "fortunate", "frail", "gasp", "glide", "globe", "grace", "gradual", "grasp", "habit",
      "harsh", "imitate", "individual", "intelligent", "intend", "journey", "launch", "limit", "locate", "loyal",
      "magnificent", "marsh", "method", "misery", "moisture", "mural", "mystify", "nation", "nectar", "nursery", "observe",
      "opponent", "opposite", "ordeal", "origin", "outcome", "passage", "pastime", "pause", "perform", "plunge", "predator",
      "predict", "prevent", "primary", "privilege", "process", "rare", "rate", "recall", "rely", "remark", "resident",
      "respect", "responsible", "reverse", "revive", "risk", "scatter", "schedule", "sensitive", "signal", "solution", "spoil",
      "starve", "steer", "struggled", "suitable", "survey", "swift", "symbol", "talent", "theory", "thrill", "treasure",
      "triumph", "value", "vision", "volunteer", "wander", "wisdom", "wit", "woe"]);
   const questions = [];
   for (const word of vocabulary) {
     questions.push({ value: `${word}`, weight: word.length });
   }
   return questions;
  }

   const englishToKorean = [
     ["누구", "이다", "그", "하자", "놀다", "야구", "하다", "너", "원하다", "일부", "얼음", "크림", "무엇", "이다", "행위", "낮", "그것", "뭐야", "당신의", "이름", "듣다", "그리고", "말하다", "가지다", "재미있는", "노래하다", "이것", "생각하다", "말하다", "수업", "친구", "선생님", "읽다", "쓰다", "문화", "프로젝트", "이야기", "시간", "포장하다", "위로", "바라보다", "화난", "행복하다", "배고픈", "슬퍼", "그녀", "키가 큰", "아빠", "엄마", "형제", "자매", "농구", "배드민턴", "축구", "보다", "접착제", "지우개", "구두", "연필", "그것은", "을 위한", "아침", "저녁", "점심", "아래에", "그만큼", "테이블", "에", "책상", "의자", "안에", "상자", "침대", "쌀", "케이크", "고양이", "모자", "사과", "파이", "예", "제발", "할 수 있다", "나", "만지다", "오다", "앉다", "여기", "확신하는", "빨간색", "나는", "그림", "ㅏ", "그림", "독서", "책", "만들기", "로봇", "가져가다", "끄다", "스카프", "놓다", "재킷", "치마", "바지", "긴", "노래", "돕다", "좋다", "인형", "팬", "박쥐", "어떻게", "많이", "백(百)", "천(千)", "하나", "둘", "삼", "네", "다섯", "육", "일곱", "여덟", "아홉", "십", "컵", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일",

"할 수 있는", "~에 대한", "~ 위에", "가로질러", "추가하다", "~ 후에", "다시", "~에 맞서", "~ 전에", "공기", "모두", "거의", "홀로", "~을 따라", "이미", "또한", "하지만",
"언제나", "~이다", "미국 사람", "~ 중에", "안", "그리고", "동물", "동물", "또 다른", "답변", "어느", "아무것", "~이다", "영역", "약", "~처럼", "물었다", "~에",
"떨어져 있는", "뒤쪽에", "공", "BE", "아름다운", "~가 되었다", "왜냐하면", "~이 되다", "계속 ~ 이다", "~ 전에", "시작했다", "시작하다", "뒤에", "존재", "아래에",
"내기", "더 나은", "~ 사이", "큰", "검은색", "파란색", "보트", "몸", "책", "둘 다", "맨 아래", "상자", "소년", "가져오다", "가져왔다", "짓다", "세워짐", "하지만",
"~에 의해", "~라고 불리는", "왔다", "~할 수 있다", "캔트", "할 수 없다", "자동차", "케어", "주의하여", "나르다", "센터", "확실한", "변화", "확인하다", "어린이들", "도시",
"수업", "닫다", "추운", "오다", "흔한", "완벽한", "~할 수 있었다", "국가", "강의", "자르다", "어두운", "낮", "깊은", "했다", "하지 않았다", "다른", "거리", "하다", "하다",
"개", "하지 않다", "완료", "문", "아래에", "그리다", "마른", "~ 동안", "각", "일찍", "지구", "쉬운", "먹다", "어느 하나", "또 다른", "끝", "영어", "충분한", "심지어",
"항상", "모든", "모든 사람", "모든 것", "예", "얼굴", "사실", "떨어지다", "가족", "멀리", "빠른", "아버지", "느끼다", "피트", "펠트", "약간의", "필드", "마지막으로",
"찾다", "괜찮은", "불", "첫 번째", "물고기", "다섯", "바닥", "따르다", "음식", "발", "~을 위한", "형태", "설립하다", "네", "친구", "~에서", "앞쪽", "가득한", "게임",
"준", "얻다", "소녀", "주다", "유리", "가다", "가고 있다", "금", "다 쓴", "좋은", "갖다", "엄청난", "녹색", "지면", "그룹", "자라다", "가졌다", "반", "손", "일어난",
"딱딱한", "가지다", "가지다", "그", "머리", "듣다", "들었다", "마음", "무거운", "유지된", "돕다", "그녀의", "여기", "높은", "그를", "그 자신", "그의", "잡고 있다",
"집", "말", "더운", "시간", "집", "어떻게", "하지만", "백", "나", "아픈", "나는", "얼음", "아이디어", "만약에", "중요한", "~에", "내부에", "대신에", "~ 안으로", "~이다",
"그것", "그것은", "그것은", "그 자체", "직업", "단지", "유지하다", "유지된", "친절한", "알고 있었다", "알다", "땅", "언어", "크기가 큰", "마지막", "나중에", "놓다",
"배우다", "배운", "최소", "떠나다", "나뭇잎", "왼쪽", "더 적은", "허락하다", "편지", "삶", "빛", "좋다", "선", "목록", "작은", "살다", "살았다", "생활", "긴", "더 길게",
"바라보다", "낮은", "만들어진", "기본", "만들다", "남성", "많은", "지도", "문제", "5월", "나", "평균", "남자들", "~할 것 같다", "정신", "놓치다", "돈", "달", "더", "아침",
"최대", "어머니", "이동하다", "많이", "~ 해야 하다", "나의", "이름", "가까운", "필요", "절대", "새로운", "다음", "밤", "아니요", "~ 아니다", "아무것도 아님", "알아채다",
"지금", "숫자", "~의", "끄다", "자주", "오", "오래된", "~에", "한 번", "하나", "오직", "열려 있는", "또는", "주문하다", "다른", "우리의", "밖으로", "밖의", "~ 위에",
"소유하다", "페이지", "종이", "부분", "과거", "무늬", "사람들", "아마도", "사람", "그림", "조각", "장소", "식물", "놀다", "가리키다", "가난한", "가능한", "힘", "아마",
"문제", "놓다", "질문", "상당히", "비", "달렸다", "읽다", "준비가 된", "진짜", "정말", "빨간색", "기억하다", "나머지", "오른쪽", "강", "도로", "바위", "방", "둥근",
"달리다", "슬퍼", "말했다", "같은", "앉았다", "봤다", "말하다", "학교", "바다", "두번째", "보다", "본", "문장", "세트", "여러 개의", "~일 것이다", "그녀", "배", "짧은",
"~해야 한다", "보여주다", "표시됨", "옆", "단순한", "~부터", "육", "크기", "하늘", "작은", "눈", "그래서", "일부", "누구", "무엇", "곧", "소리", "공간", "특별한", "서다",
"시작", "상태", "머무르다", "아직", "서 있었다", "멈추다", "이야기", "강한", "공부하다", "그런", "갑자기", "여름", "해", "확신하는", "표면", "체계", "테이블", "가져가다",
"말하다", "키가 큰", "말하다", "십", "~보다", "저것", "그건", "그만큼", "그들의", "그들을", "그들 자신", "그 다음에", "거기", "이것들", "그들", "물건", "생각하다", "제삼",
"이것", "저것들", "그렇지만", "생각", "삼", "~을 통해", "시간", "매우 작은", "에게", "오늘", "함께", "말했다", "~도", "가지고 갔다", "맨 위", "~ 을 향하여", "도시",
"나무", "진실", "노력하다", "회전하다", "돌린", "둘", "아래에", "이해하다", "미국", "~까지", "위로", "...에", "우리를", "사용", "대개", "매우", "목소리", "걷다", "걸었다",
"원하다", "따뜻한", "~였다", "보다", "물", "방법", "우리", "날씨", "잘", "갔다", "~이었다", "무엇", "언제", "어디", "~이든", "어느", "~하는 동안", "하얀색", "전체",
"왜", "넓은", "야생의", "~ 할 것이다", "바람", "겨울", "~와 함께", "이내에", "없이", "단어", "일하다", "세계", "~일 것이다", "쓰다", "년도", "예", "아직", "너", "어린",
"당신의",
     ],
     ["who", "is", "he", "let's", "play", "baseball", "do", "you", "want", "some", "ice", "cream", "what", "are", "doing", "day", "it", "what's", "your", "name", "listen", "and", "speak", "have", "fun", "sing", "this", "think", "talk", "class", "friend", "teacher", "read", "write", "culture", "project", "story", "time", "wrap", "up", "look", "angry", "happy", "hungry", "sad", "she's", "tall", "dad", "mom", "brother", "sister", "basketball", "badminton", "soccer", "watch", "glue", "eraser", "shoe", "pencil", "it's", "for", "breakfast", "dinner", "lunch", "under", "the", "table", "on", "desk", "chair", "in", "box", "bed", "rice", "cake", "cat", "hat", "apple", "pie", "yes", "please", "can", "I", "touch", "come", "sit", "here", "sure", "red", "I'm", "drawing", "a", "picture", "reading", "book", "making", "robot", "take", "off", "scarf", "put", "jacket", "skirt", "pants", "long", "song", "help", "like", "doll", "fan", "bat", "how", "much", "hundred", "thousand", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "cup", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",

"able", "about", "above", "across", "add", "after", "again", "against", "ago", "air", "all", "almost", "alone", "along", "already", "also", "although", "always", "am",
"American", "among", "an", "and", "animal", "animals", "another", "answer", "any", "anything", "are", "area", "around", "as", "asked", "at", "away", "back", "ball", "be",
"beautiful", "became", "because", "become", "been", "before", "began", "begin", "behind", "being", "below", "bet", "better", "between", "big", "black", "blue", "boat",
"body", "book", "both", "bottom", "box", "boy", "bring", "brought", "build", "built", "but", "by", "called", "came", "can", "can’t", "cannot", "car", "care", "carefully",
"carry", "center", "certain", "change", "check", "children", "city", "class", "close", "cold", "come", "common", "complete", "could", "country", "course", "cut", "dark",
"day", "deep", "did", "didn’t", "different", "distance", "do", "does", "dog", "don’t", "done", "door", "down", "draw", "dry ", "during", "each", "early", "earth", "easy",
"eat", "either", "else", "end", "English", "enough", "even", "ever", "every", "everyone", "everything", "example", "face", "fact", "fall", "family", "far", "fast",
"father", "feel", "feet", "felt", "few", "field", "finally", "find", "fine", "fire", "first", "fish", "five", "floor", "follow", "food", "foot", "for", "form", "found",
"four", "friend", "from", "front", "full", "game", "gave", "get", "girl", "give", "glass", "go", "going", "gold", "gone", "good", "got", "great", "green", "ground",
"group", "grow", "had", "half", "hand", "happened", "hard", "has", "have", "he", "head", "hear", "heard", "heart", "heavy", "held", "help", "her", "here", "high", "him",
"himself", "his", "hold", "home", "horse", "hot", "hour", "house", "how", "however", "hundred", "I", "I’ll", "I’m", "ice", "idea", "if", "important", "in", "inside",
"instead", "into", "is", "it", "it’s", "its", "itself", "job", "just", "keep", "kept", "kind", "knew", "know", "land", "language ", "large", "last", "later", "lay",
"learn", "learned", "least", "leave", "leaves", "left", "less", "let", "letter", "life", "light", "like", "line", "list", "little", "live", "lived", "living", "long",
"longer", "look", "low", "made", "main", "make", "man", "many", "map", "matter", "may", "me", "mean", "men", "might", "mind", "miss", "money", "moon", "more", "morning",
"most", "mother", "move", "much", "must", "my", "name", "near", "need", "never", "new", "next", "night", "no", "not", "nothing", "notice", "now", "number", "of", "off",
"often", "oh", "old", "on", "once", "one", "only", "open", "or", "order", "other", "our", "out", "outside", "over", "own", "page", "paper", "part", "past", "pattern",
"people", "perhaps", "person", "picture", "piece", "place", "plants", "play", "point", "poor", "possible", "power", "probably", "problem", "put", "question", "quite",
"rain", "ran", "read", "ready", "real", "really", "red", "remember", "rest", "right", "river", "road", "rock", "room", "round", "run", "sad ", "said", "same", "sat",
"saw", "say", "school", "sea", "second", "see", "seen", "sentence", "set", "several", "shall", "she", "ship", "short", "should", "show", "shown", "side", "simple", "since",
"six", "size", "sky", "small", "snow", "so", "some", "someone", "something", "soon", "sound", "space", "special", "stand", "start", "state", "stay", "still", "stood",
"stop", "story", "strong", "study", "such", "suddenly", "summer", "sun", "sure", "surface", "system", "table", "take", "talk", "tall", "tell", "ten", "than", "that",
"that’s", "the", "their", "them", "themselves", "then", "there", "these", "they", "thing", "think", "third", "this", "those", "though", "thought", "three", "through",
"time", "tiny", "to", "today", "together", "told", "too", "took", "top", "toward", "town", "tree", "true", "try", "turn", "turned", "two", "under", "understand",
"United States", "until", "up", "upon", "us", "use", "usually", "very", "voice", "walk", "walked", "want", "warm", "was", "watch", "water", "way", "we", "weather", "well",
"went", "were ", "what", "when", "where", "whether", "which", "while", "white", "whole", "why", "wide", "wild", "will", "wind", "winter", "with", "within", "without",
"words", "work", "world", "would", "write", "year", "yes", "yet", "you", "young", "your ",
     ]];

export  const englishVocabulary = buildVocabulary(englishToKorean);

export  const englishCopying = buildCopying(englishToKorean);

export  const englishPrompts = buildPrompt();
export  const emotivePrompts = buildEmotivePrompt();
export  const thirdGradePrompts = buildThirdGradePrompt();

const fixGradeWords = (s) => s.split(' ').map(w => w.toLowerCase());

const gradeWords = {
  grade1: fixGradeWords("annoy attention calm comfortable consequences curious curve decide directions discover disappointed embarrassed enormous exhausted explore fair fascinating feast focus gigantic grumpy huge ignore instead investigate invite important jealous leader list lovely frustrated leader listen measuring miserable mumble negative nervous nibbled note notice observing opposite ordinary positive precious prefer problem protect proud question reminds repeat report rhyme respect rhyme searching special spotless squirm stomped suddenly suggestion surprise uncomfortable warning wonder worried"),
  grade2: fixGradeWords("Amaze Amusing Analyze Annoy Arranged Avoid Cause Classify Community Conclusion Connection Continue Cooperation Curious Cycle Data Describe Detail Diagram Difference Different Discover Drowsy Edit Effect Energy Enormous Escape Estimate Exercise Expect Famous Flock Friendly Frighten Frown Gasp Gather Gust Helpful Include Insist Investigate Label Leaned Living March Matter Moist Necessary Non-living Noticed Observe Opinion Peeking Plan Poke Predict Prefer Process Publish Records Revise Separate Steaming Shivered Similar Sum Suppose Sway Stormy Swoop Treasure Vanish Volunteer"),
  grade3: fixGradeWords("additional agreeable argue arrange assist attract careless cause climate coast compare construct continent contrast credit culture dangle defend describe details develop diagram disappointed division effect elect endangered event examine example experience fatal flexible furious gathered gist infer intelligent invitation irritate marine mend multiply nervous occur opposite passage patient peer persuade pleasant prank predict purpose recognize region repair ridiculous scar scatter shiver signal similar slumber solution starve stumble tackle tentacle typical unite unusual valuable vehicle volunteer"),
  grade4: fixGradeWords("Accomplish Adaptation Approached Argued Automatically Avoid Border Calculate Cause Circular Compare Concluding Confirm Contrast Convince Critical Decrease Defend Demonstrate Describe Detail Develop Difference Disappointed Distribute Effective Eliminate Entire Essential Estimate Evidence Example Except Exclaimed Experiment Flexible Fortunate Frequent Furious Increasing Infer Inform Insert Maximum Minimum Observe Organized Obvious Passage Persuade Predict Prefer Previous Purpose Prediction Rarely Reason Recognize Recommend Represent Result Scarce Select Separate Simplify Summarize Surround Support Temporary Threatens Tradition Typical Usually"),
  grade5: fixGradeWords("abolish accomplish accurate announce anxious approach approval approximate argument avoid briskly cease claim conclude conflict consistent context convince culture decade dissatisfied dominate drowsy edible effortless equivalent escalate establish evaluate evidence exhaust expansion expectation explain express extend familiar frequent gigantic gist glare harsh heroic hesitate hilarious historic horizontal hostile huddle identify illegible immigrate influence investigate navigate opposed ordinary passage persuade primary recently reference review revolt scarce significant source summarize superior tension tolerate tremble unexpected unfamiliar vertical"),
  grade6: fixGradeWords("adjacent accumulate adapt adequate analyze anticipate appropriate artifact benefit calculate catastrophe chronological citizen civilization compose conclusion congruent consequence construct continuous contrast contribute declare democracy dimension drastic elaborate encourage equation evaluate exaggerate exhaust expression extend extensive factor ferocious frequent/frequency genuine government history hypothesis insists irrigate lofty manipulate massive narrate obedient oblivious origin peculiar persuade prediction priority quote realistic recount reinforce repetition retrieve similar solution strategy substitute suspense tentative thesis transfer unanimous unique variable viewpoint violate"),
  grade7: fixGradeWords("abdicate abrasive abruptly acknowledge acquire addict adequate admonish affiliation agitate allege allocate alternative amendment antagonize attribute authentic bamboozle belligerent bewilder bewildered bias boycott candor casualty cause characterize chronological compel competent component conclusive concur condemn confront connotation consecutive consecutive consult contrast copious correspond dawdle deceitful demeanor derogatory devastate devious devour diversity eligible emphasize estimate evaluate exonerated exposition exuberant famished formidable harass impartial indifferent industrious inevitable infuriate inhabitants initiate intimidate irate irrelevant legendary liaison libel ludicrous mandatory mitigate naive narrate necessity negligent obnoxious omit opposition oppress perceive persuasive prediction prominent prospective punctual quote relinquish resolve rudimentary secession signify sovereign suspense talisman tentative toxic treason viewpoint"),
  grade8: fixGradeWords("abhor abrasion alternative ambiguous amiss anarchy anonymous anthology apathy apprehend assimilate assumption audacious authority avid ban belligerent bisect bizarre boycott capable cause characterize chronological colleague commence compels concise conclude confiscate conjecture conscientious consecutive consistent conspire construct contrast corroborate depict derive despicable despondent elapse embark encompass endeavor evidence evoke feasible focus formula generation gruesome imminent impel imperative integrate interrogate merge meticulous modify mutiny narrate novice obsolete opposition perish perspective persuasive plagiarize precise prediction prevalent procedure profound proprietor prudent pseudonym quote rebel rebuff rebuke recur resilient response reverberate significant similar simulate simultaneous source specific spontaneous surmise suspense theory tirade universal validate variable"),
  grade9: fixGradeWords("absolve alleviate alternative ambivalent analyze analyze animosity approximate arbitrary attribute beneficial comprehensive connotation contrast credible cursory cursory cynic dearth deficient demonstrate depict derive detract devastate digress dilemma diligent dissent distort diversion elation elicit escalate evaluate exacerbate excerpt exemplify explicit exposition falter feasible feign fluctuate fluctuate formulate generate gist hypothetical impartial implausible implication imply incentive incoherent indolent infamous infuriate innovation intercede interpret intimidate isolate jeopardize lucrative mandatory mediate mortify niche obscure obsolete pacify perception perspective pertinent ponder prevalent proponent punitive rapport rationale reconcile redundant respective retaliate sabotage scrutiny similar simulate squander succumb tangible technique traumatic turmoil valid verify viable vulnerable"),
  grade10: fixGradeWords("abstract admonish advocate advocate alternative ambiguous analogy anarchy assiduous assimilate augment authentic belligerent bolster bureaucratic circumvent coalition cohesive collaborate comply concurrent connotation constituent contingent criteria demeanor deplore derogatory disparity disseminate dissident distraught divert dormant egocentric elusive emulate equitable eradicate estrange exacerbate expedite fabricate facilitate fortuitous fraudulent heinous hypothetical illicit imminent impetuous incongruous indigenous indiscriminate inherent jurisdiction lax meticulous negligent nonchalant oblivious obscure omnipotent opportune oppose panacea perfunctory preposterous precarious precipitate preclude proficient propensity qualitative quantitative recalcitrant redeem rejuvenate relegate relinquish repugnant resilient retrospect sanction spontaneous static stringent subordinate subsidize tenuous travesty tumult unilateral validate vindicate zealot"),
  grade11: fixGradeWords("aberration abstract accolade accommodate aesthetic affinity altercation ameliorate amicable anarchy anomaly appall archaic arduous articulate astute authoritarian aversion biased brevity cajole callous capitulate catalyst catharsis caustic censure chastise clamor coalesce cognizant commiserate composure conciliatory contract copious cordial dearth debilitate decadence deference delineate deprecate despot devious didactic disparage dissonance duplicity ediface effervescent egregious elusive equivocal erroneous exemplary expedient extraneous formidable frivolous grueling haphazard heretic hindrance hypocrisy iconoclast incessant incidental incite incorrigible indict indoctrinate insurgetn' intangible judicious lavish listless meager meander negligent obliterate ponderous preclude prerequisite proximity rectify rescind resolution rigorous scrutinize substantiate surmise tirade turbulence unimpeachable unobtrusive usurp vacillate whimsical"),
  grade12: fixGradeWords("anachronistic abbreviate abdicate abstinence adulation adversity aesthetic amicable anecdote anonymous antagonist arid assiduous asylum benevolent camaraderie censure circuitous clairvoyant collaborate compassion compromise condescending conditional conformist congregation convergence deleterious demagogue digression diligent discredit disdain divergent empathy emulate enervating enhance ephemeral evanescent exasperation exemplary extenuating florid fortuitous frugal hackneyed haughty hedonist hypothesis impetuous impute incompatible inconsequential inevitable integrity intrepid intuitive jubilation lobbyist longevity mundane nonchalant novice opulent orator ostentatious parched perfidious precocious pretentious procrastinate prosaic prosperity provocative prudent querulous rancorous reclusive reconciliation renovation resilient restrained reverence sagacity scrutinize spontaneity spurious submissive substantiate subtle superficial superfluous suppress surreptitious tactful tenacious transient venerable vindicate wary")
};

const gapSentences = [
  {"input":"injury","word":"injury","level":"3","sentence":"During the soccer game, Emma suffered an in__ry when she collided with another player and fell to the ground."},
  {"input":"still","word":"still","level":"1","sentence":"The dog is st_ll sleeping on his favorite cushion after all that excitement"},
  {"input":"influence","word":"influence","level":"3","sentence":"The famous scientist's groundbreaking discovery had a significant in_____ce on the way we understand the universe today."},
  {"input":"observe","word":"observe","level":"3","sentence":"As I walked through the forest, I like to ob___ve the different types of leaves on the trees."},
  {"input":"lesson","word":"lesson","level":"1","sentence":"After the teacher explained the concept of fractions, the students learned an important le__on about adding and subtracting them."},
  {"input":"waste","word":"waste","level":"2","sentence":"The community decided to organize a recycling program to reduce wa_te and protect the environment."},
  {"input":"sensitive","word":"sensitive","level":"3","sentence":"The new camera was se_____ve to light, so it could capture beautiful photos even on cloudy days."},
  {"input":"blackboard","word":"blackboard","level":"1","sentence":"The teacher used the bl______rd to write down the math problems for the class to solve"},
  {"input":"entirely","word":"entirely","level":"3","sentence":"The new roller coaster was en____ly too scary for little Timmy to ride."},
  {"input":"fortieth","word":"fortieth","level":"2","sentence":"The city was celebrating its fo____th anniversary of becoming a major metropolis and everyone was excited to see the fireworks display."},
  {"input":"Sunday","word":"Sunday","level":"2","sentence":"After finishing her homework on Su__ay afternoon, Emily went to the park to play soccer with her friends."},
  {"input":"chance","word":"chance","level":"1","sentence":"If I get a ch__ce to go to the amusement park this weekend, I'm definitely going to ride the rollercoaster for the tenth time."},
  {"input":"system","word":"system","level":"2","sentence":"The city's public transportation sy__em helps people get around without needing to drive."},
  {"input":"waiting","word":"waiting","level":"3","sentence":"As I sat on the bench, I was wa___ng patiently for my best friend to finish her game so we could go get ice cream."},
  {"input":"fashionable","word":"fashionable","level":"3","sentence":"The new boutique store on Main Street was very fa_______le and quickly became the go-to spot for teenagers to get dressed up for school dances."},
  {"input":"powder","word":"powder","level":"2","sentence":"The magician waved his wand and scattered a puff of sparkling po__er across the stage."},
  {"input":"introduction","word":"introduction","level":"3","sentence":"The teacher gave us an in________on to the new chapter on fractions that we would be studying for the next few weeks."},
  {"input":"bedroom","word":"bedroom","level":"1","sentence":"After getting ready for bed, Sarah climbed into her cozy be___om and settled in to read a book."},
  {"input":"proof","word":"proof","level":"2","sentence":"The math problem was tricky, but Emma finally found the pr_of that she had been looking for."},
  {"input":"straight","word":"straight","level":"1","sentence":"The hiker decided to take the st____ht path through the forest to avoid getting lost."},
  {"input":"peanut","word":"peanut","level":"2","sentence":"Sarah's favorite snack was a pe__ut butter sandwich on whole wheat bread"},
  {"input":"recent","word":"recent","level":"3","sentence":"The teacher asked the students to bring their re__nt book reports to class today."},
  {"input":"altogether","word":"altogether","level":"3","sentence":"After we finished cleaning up the mess, we decided to have a party al______er and invite all our friends."},
  {"input":"weekday","word":"weekday","level":"3","sentence":"Sarah likes to go to the park on her we___ay afternoons to play soccer with her friends."},
  {"input":"convenient","word":"convenient","level":"3","sentence":"The apartment complex had a co______nt laundry room on every floor, making it easy for residents to do their washing and drying."},
  {"input":"loyal","word":"loyal","level":"3","sentence":"Max has always been very lo_al to his friends and will stick up for them no matter what."},
  {"input":"pressure","word":"pressure","level":"3","sentence":"The scuba diver felt a lot of pr____re on his ears as he descended to the bottom of the ocean."},
  {"input":"happily","word":"happily","level":"2","sentence":"After finishing her math homework, Sarah ha___ly curled up on the couch to read her favorite book."},
  {"input":"wound","word":"wound","level":"3","sentence":"The brave firefighter carefully cleaned and dressed the wo_nd on Tom's hand."},
  {"input":"possible","word":"possible","level":"2","sentence":"With the new technology, it's po____le to communicate with people on the other side of the world instantly."},
  {"input":"recover","word":"recover","level":"2","sentence":"After being sick for a week, Emma was finally starting to re___er and felt like playing soccer again."},
  {"input":"personality","word":"personality","level":"3","sentence":"Emily's bubbly pe_______ty made her a natural fit for leading group projects in class."},
  {"input":"hurry","word":"hurry","level":"1","sentence":"We need to hu_ry and finish our project so we can go to the movie tonight."},
  {"input":"square","word":"square","level":"1","sentence":"The carpenter carefully measured the wood to cut out a perfect sq__re piece for the corner of the bookshelf."},
  {"input":"teenage","word":"teenage","level":"2","sentence":"As she entered her te___ge years, Emily began to develop a passion for photography and started taking her camera on adventures around town."},
  {"input":"slowly","word":"slowly","level":"1","sentence":"The hikers sl__ly made their way up the mountain trail, taking care not to slip on the loose rocks."},
  {"input":"tightly","word":"tightly","level":"3","sentence":"The firefighter had to wear his uniform ti___ly so it wouldn't get blown away by the strong wind"},
  {"input":"seventieth","word":"seventieth","level":"2","sentence":"The seventh-grade class had been on their annual field trip to Washington D.C. for the se______th time."},
  {"input":"eight","word":"eight","level":"1","sentence":"The school bus stopped in front of my house at exactly ei_ht o'clock"},
  {"input":"dollar","word":"dollar","level":"1","sentence":"Emily saved her allowance of one do__ar and spent it on a new pencil case."},
  {"input":"address","word":"address","level":"2","sentence":"The postal service will not deliver mail to an ad___ss that is not correctly written."},
  {"input":"occupy","word":"occupy","level":"3","sentence":"The protesters decided to oc__py the town square until their demands were met."},
  {"input":"would","word":"would","level":"1","sentence":"I wo_ld love to go on a camping trip this weekend."},
  {"input":"ablaze","word":"ablaze","level":"\"","sentence":"The fire department was called to put out the house that was ab__ze after a lightning strike during the storm."},
  {"input":"academic","word":"academic","level":"3","sentence":"The student spent countless hours studying for their ac____ic exams to ensure they got high scores."},
  {"input":"pitcher","word":"pitcher","level":"3","sentence":"The Little League pi___er threw three strikes in a row to get the win."},
  {"input":"central","word":"central","level":"2","sentence":"The town's ce___al park was where everyone gathered to watch the fireworks on the Fourth of July."},
  {"input":"noisy","word":"noisy","level":"2","sentence":"The no_sy firework exploded in the sky and startled the sleeping children."},
  {"input":"flood","word":"flood","level":"2","sentence":"The heavy rainfall caused a fl_od that damaged many homes and businesses along the river."},
  {"input":"secretary","word":"secretary","level":"2","sentence":"Ms. Johnson was the se_____ry of the school's student council and helped plan the annual talent show."},
  {"input":"widely","word":"widely","level":"3","sentence":"The new restaurant is wi__ly known for its delicious burgers and friendly staff."},
  {"input":"ideal","word":"ideal","level":"3","sentence":"Sarah thought her id_al vacation would be spending two weeks on a beach in Hawaii, relaxing and reading a good book."},
  {"input":"careful","word":"careful","level":"1","sentence":"When crossing the busy street to get to school, you should be very ca___ul not to step into the road."},
  {"input":"length","word":"length","level":"2","sentence":"The new rope needed to be long enough to reach the top of the climbing wall, so it had a le__th of 20 feet."},
  {"input":"popular","word":"popular","level":"1","sentence":"The new video game was really po___ar among kids my age"},
  {"input":"bedtime","word":"bedtime","level":"3","sentence":"After finishing her homework, Emma got ready for be___me and climbed into bed to read a book before lights out."},
  {"input":"enjoy","word":"enjoy","level":"1","sentence":"After finishing their homework, they liked to en_oy playing video games together."},
  {"input":"recommend","word":"recommend","level":"3","sentence":"I would re_____nd visiting the new amusement park on your birthday because it's so much fun!"},
  {"input":"corner","word":"corner","level":"1","sentence":"The little boy liked to play hide-and-seek in the co__er of his bedroom."},
  {"input":"statue","word":"statue","level":"3","sentence":"As we walked through the park, I noticed a beautiful st__ue of a horse on top of the fountain."},
  {"input":"merchant","word":"merchant","level":"3","sentence":"The me____nt carefully counted his money before leaving the market."},
  {"input":"individual","word":"individual","level":"3","sentence":"In their own way, each in______al can make a difference by volunteering in their community."},
  {"input":"clinic","word":"clinic","level":"2","sentence":"The school nurse set up a small cl__ic in the gym to help students who had gotten injured during recess."},
  {"input":"fourteenth","word":"fourteenth","level":"2","sentence":"The annual school fair will take place on April fo______th and everyone is invited."},
  {"input":"social","word":"social","level":"2","sentence":"The school's so__al committee planned a fun fair for all students to attend."},
  {"input":"praise","word":"praise","level":"2","sentence":"The choir received loud pr__se for their beautiful performance of 'Ave Maria'"},
  {"input":"junior","word":"junior","level":"1","sentence":"The ju__or detective worked tirelessly to solve the mystery of the missing cookies."},
  {"input":"strawberry","word":"strawberry","level":"2","sentence":"Sarah loved to eat fresh strawberries and st______ry shortcake on her birthday."},
  {"input":"between","word":"between","level":"1","sentence":"The wide river flowed smoothly be___en the two islands."},
  {"input":"count","word":"count","level":"1","sentence":"The teacher asked the students to co_nt how many pencils they had in their pencil cases."},
  {"input":"location","word":"location","level":"3","sentence":"The real estate agent asked the couple to specify their lo____on preferences before showing them any houses."},
  {"input":"healthy","word":"healthy","level":"1","sentence":"My mom told me to eat more fruits and veggies because they're he___hy for my body."},
  {"input":"fortunate","word":"fortunate","level":"2","sentence":"After winning the contest, Sarah felt fo_____te to have had such an amazing opportunity to meet her favorite musician."},
  {"input":"horrible","word":"horrible","level":"3","sentence":"The smell of rotten fish was ho____le and made it hard for me to enjoy my trip to the beach."},
  {"input":"steal","word":"steal","level":"2","sentence":"Sarah's little brother tried to st_al her favorite toy, but she caught him and took it back."},
  {"input":"sharply","word":"sharply","level":"3","sentence":"As she ran through the forest, her senses were heightened and she noticed the bright sunlight shining sh___ly on the trees ahead."},
  {"input":"September","word":"September","level":"1","sentence":"My birthday is in Se_____er and I always get to have a big party with my friends."},
  {"input":"industry","word":"industry","level":"2","sentence":"The city's growing in____ry in solar panels has created many new jobs and opportunities for people to work."},
  {"input":"shade","word":"shade","level":"2","sentence":"The picnic blanket was spread out under the sh_de of the big oak tree."},
  {"input":"broadcast","word":"broadcast","level":"2","sentence":"The local news station will br_____st live coverage of the parade from Main Street."},
  {"input":"presence","word":"presence","level":"3","sentence":"The teacher felt her students' absence when she walked into an empty classroom, but then she noticed their pr____ce in the notes they had left for her."},
  {"input":"sample","word":"sample","level":"3","sentence":"The scientist took a sa__le of water from the lake to test for pollution."},
  {"input":"house","word":"house","level":"1","sentence":"The old ho_se on the hill was rumored to be haunted."},
  {"input":"defeat","word":"defeat","level":"3","sentence":"The team worked together to come up with a new strategy and ultimately de__at their opponents in the championship game."},
  {"input":"beside","word":"beside","level":"1","sentence":"The cat curled up be__de me on the couch and started to purr."},
  {"input":"balcony","word":"balcony","level":"3","sentence":"As she sat on the ba___ny of her hotel room, Emily could see the sparkling lights of the city below"},
  {"input":"bookstore","word":"bookstore","level":"2","sentence":"After school, Emma walked to the bo_____re to find her favorite author's new novel."},
  {"input":"slightly","word":"slightly","level":"3","sentence":"The new student was sl____ly nervous on his first day of school"},
  {"input":"treasure","word":"treasure","level":"3","sentence":"As we dug deeper into the sand, we finally found the tr____re chest buried beneath the palm tree"},
  {"input":"phrase","word":"phrase","level":"3","sentence":"The teacher asked her students to come up with a catchy ph__se for their school's new slogan."},
  {"input":"month","word":"month","level":"1","sentence":"My favorite mo_th is October because it's when my birthday is."},
  {"input":"awful","word":"awful","level":"2","sentence":"The aw_ul storm ruined our picnic and left us shivering under the trees."},
  {"input":"argument","word":"argument","level":"3","sentence":"After the school play, Sarah and Emily got into an ar____nt over who was the best actress, but eventually they made up and became friends again."},
  {"input":"fountain","word":"fountain","level":"3","sentence":"The children loved playing around the beautiful fo____in in the city park on hot summer days."},
  {"input":"joint","word":"joint","level":"3","sentence":"The carpenter carefully hammered the jo_nt between the two wooden planks to create a strong and sturdy shelf."},
  {"input":"importance","word":"importance","level":"2","sentence":"The im______ce of recycling was discussed by the class during their environmental lesson."},
  {"input":"absence","word":"absence","level":"3","sentence":"The student's ab___ce from school was noted by the teacher because she had not returned her homework yet."},
  {"input":"temperature","word":"temperature","level":"3","sentence":"The thermometer showed that the te_______re outside was exactly 72 degrees Fahrenheit."},
  {"input":"presumably","word":"presumably","level":"おそらく\"","sentence":"The teacher assumed that everyone had finished their homework pr______ly before coming to class, so she didn't collect it until the end of the period."},
  {"input":"maker","word":"maker","level":"2","sentence":"The LEGO enthusiast was an expert builder and had even become a ma_er of intricate cityscapes"},
  {"input":"absolute","word":"absolute","level":"3","sentence":"The coach said that winning the championship game would be an ab____te must if they wanted to make it to the finals."},
  {"input":"third","word":"third","level":"1","sentence":"The th_rd game of the season was won by our school's soccer team."},
  {"input":"sight","word":"sight","level":"2","sentence":"As we hiked up the mountain, the breathtaking si_ht of the waterfall took our breath away."},
  {"input":"reasonable","word":"reasonable","level":"2","sentence":"It's re______le to expect that you'll have some fun on your birthday, even if it's just a small party with friends."},
  {"input":"refrigerator","word":"refrigerator","level":"3","sentence":"After lunch, Emma remembered to put the leftover pizza in the re________or so it would stay fresh for dinner."},
  {"input":"island","word":"island","level":"1","sentence":"As we sailed across the ocean, we finally spotted a tiny is__nd on the horizon."},
  {"input":"population","word":"population","level":"3","sentence":"The city's growing po______on has led to an increase in traffic congestion and parking challenges."},
  {"input":"plane","word":"plane","level":"1","sentence":"The pilot expertly landed the pl_ne on the runway after a long flight from New York to Los Angeles."},
  {"input":"onion","word":"onion","level":"2","sentence":"The farmer's market was filled with colorful vegetables, including a big juicy on_on that made my eyes water when I chopped it."},
  {"input":"rubber","word":"rubber","level":"3","sentence":"The kid used his favorite ru__er ball to play catch with his friends during recess."},
  {"input":"journal","word":"journal","level":"3","sentence":"Sarah kept a jo___al to write down her thoughts and ideas about her favorite book."},
  {"input":"string","word":"string","level":"3","sentence":"Sarah loved playing with the colorful st__ng that her grandmother had given her as a gift."},
  {"input":"image","word":"image","level":"2","sentence":"The artist used a special technique to create an im_ge of a beautiful sunset on the canvas."},
  {"input":"reflect","word":"reflect","level":"3","sentence":"After finishing her math homework, Emma liked to re___ct on what she had learned and think about how she could apply it to real-life problems."},
  {"input":"festival","word":"festival","level":"2","sentence":"The town's annual summer fe____al was a huge hit, with games, food, and live music for everyone to enjoy."},
  {"input":"something","word":"something","level":"1","sentence":"I found so_____ng hidden behind the couch that belonged to my little sister."},
  {"input":"alphabet","word":"alphabet","level":"2","sentence":"The teacher asked the students to learn the entire al____et by writing it on their flashcards."},
  {"input":"company","word":"company","level":"1","sentence":"The co___ny that my dad works for is having a big sale on all of their products."},
  {"input":"outdoor","word":"outdoor","level":"3","sentence":"The park ranger led the group of scouts on an ou___or adventure through the woods and along the creek."},
  {"input":"apply","word":"apply","level":"2","sentence":"To get a job as a mechanic, you need to ap_ly for an apprenticeship or take a course to learn about car repair."},
  {"input":"contact","word":"contact","level":"3","sentence":"After finding the phone number on the website, I decided to make co___ct with the company and ask about their return policy."},
  {"input":"profit","word":"profit","level":"2","sentence":"The company decided to invest in solar panels because they expected it would increase their pr__it and help reduce their energy costs."},
  {"input":"kitten","word":"kitten","level":"3","sentence":"The little girl was so excited to hold her new ki__en for the first time."},
  {"input":"competition","word":"competition","level":"3","sentence":"The school's robotics team is gearing up for the regional co_______on next weekend."},
  {"input":"daughter","word":"daughter","level":"1","sentence":"My da____er loves playing soccer with her friends on weekends."},
  {"input":"flute","word":"flute","level":"3","sentence":"The young musician carefully blew across the edge of her fl_te to produce a clear and beautiful note."},
  {"input":"wallet","word":"wallet","level":"3","sentence":"After buying his favorite video game, Tommy reached into his wa__et to make sure he had enough money to buy a snack at the arcade."},
  {"input":"swimmer","word":"swimmer","level":"3","sentence":"The sw___er dove into the pool and started to do some laps."},
  {"input":"hundredth","word":"hundredth","level":"3","sentence":"The hu_____th time I rode my bike down that hill, I finally got up enough speed to perform a perfect wheelie."},
  {"input":"pistol","word":"pistol","level":"3","sentence":"The cowboy carefully placed his pi__ol back in its holster after settling the dispute with the rival rancher."},
  {"input":"bitter","word":"bitter","level":"3","sentence":"The old lady's bi__er complaint about the new neighborhood noise was met with silence by her neighbors."},
  {"input":"sailor","word":"sailor","level":"2","sentence":"As the sun set over the ocean, Jack felt proud to be a sa__or on his first voyage."},
  {"input":"feeling","word":"feeling","level":"1","sentence":"As she watched the sunset on the beach, Sarah felt a warm fe___ng of happiness and peace."},
  {"input":"identify","word":"identify","level":"3","sentence":"To id____fy the different types of birds, Emma used a field guide and looked for distinctive markings on their feathers."},
  {"input":"stiff","word":"stiff","level":"3","sentence":"After being stuck in the cold rain for hours, Sarah's hair had become st_ff and unmanageable."},
  {"input":"twelfth","word":"twelfth","level":"2","sentence":"The Johnson family was going to celebrate their daughter's birthday on the tw___th of December."},
  {"input":"issue","word":"issue","level":"3","sentence":"The teacher noticed an is_ue with the school's playground equipment and decided to report it to the maintenance team."},
  {"input":"thousand","word":"thousand","level":"1","sentence":"The new amusement park had over a th____nd rides and attractions to explore."},
  {"input":"horrible","word":"horrible","level":"3","sentence":"The ho____le smell from the dumpster on Main Street made everyone walking by wrinkle their noses in disgust."},
  {"input":"helpful","word":"helpful","level":"2","sentence":"My brother's he___ul advice allowed me to fix my bike without asking for assistance."},
  {"input":"careful","word":"careful","level":"1","sentence":"As I walked across the icy parking lot, I had to be very ca___ul not to slip and fall."},
  {"input":"twelve","word":"twelve","level":"1","sentence":"After Christmas, Emma received tw__ve gifts from her friends and family."},
  {"input":"moving","word":"moving","level":"3","sentence":"The family was getting ready to start their mo__ng day, packing up boxes and saying goodbye to their old home."},
  {"input":"seafood","word":"seafood","level":"3","sentence":"The se___od restaurant served a variety of dishes including fish tacos and shrimp scampi."},
  {"input":"channel","word":"channel","level":"3","sentence":"The stormy weather caused a power outage, so we had to ch___el our energy into playing board games instead."},
  {"input":"deliver","word":"deliver","level":"2","sentence":"The pizza delivery guy arrived at our doorstep to de___er the hot and fresh pie we had been craving all day."},
  {"input":"invitation","word":"invitation","level":"2","sentence":"Emma was thrilled to receive an in______on to her best friend's birthday party on Saturday afternoon."},
  {"input":"rival","word":"rival","level":"3","sentence":"Tommy's ri_al in the school science fair was Sarah, who had already won first prize three years in a row."},
  {"input":"maintain","word":"maintain","level":"3","sentence":"The park rangers work hard to ma____in the beautiful trails and gardens throughout the year."},
  {"input":"stick","word":"stick","level":"2","sentence":"As I walked through the forest, I stumbled upon a st_ck that was perfectly shaped for drawing in the sand."},
  {"input":"stair","word":"stair","level":"2","sentence":"As I walked into the old mansion, I noticed a creaky st_ir that led up to the attic"},
  {"input":"choose","word":"choose","level":"1","sentence":"When planning our summer vacation, my family and I have to ch__se between going to the beach or visiting grandparents."},
  {"input":"nervous","word":"nervous","level":"2","sentence":"As I stood up to give my presentation, I could feel myself getting ne___us and my hands started to shake."},
  {"input":"baker","word":"baker","level":"1","sentence":"The ba_er was famous for making the most delicious chocolate chip cookies in town."},
  {"input":"somebody","word":"somebody","level":"1","sentence":"When I lost my favorite pencil, so____dy had to find it for me."},
  {"input":"ticket","word":"ticket","level":"1","sentence":"After waiting in line for what felt like forever, Emma finally got her ti__et to the concert and couldn't wait to see her favorite band play."},
  {"input":"canoe","word":"canoe","level":"3","sentence":"After packing her backpack with snacks and water, Emma carefully carried her ca_oe down to the lake for a morning of paddling."},
  {"input":"landing","word":"landing","level":"3","sentence":"The spaceship began its la___ng procedure as it entered Earth's atmosphere"},
  {"input":"doing","word":"doing","level":"3","sentence":"During recess, I love do_ng my favorite math problems on a piece of paper to see if I can solve them quickly."},
  {"input":"affair","word":"affair","level":"3","sentence":"The school's principal was caught up in a scandalous af__ir with a teacher that had been going on for months."},
  {"input":"latest","word":"latest","level":"3","sentence":"The la__st smartphone released by Samsung has many exciting features that my friends are talking about."},
  {"input":"motorcycle","word":"motorcycle","level":"3","sentence":"The thrill-seeking teenager rode his shiny new mo______le down the winding mountain road."},
  {"input":"entertain","word":"entertain","level":"3","sentence":"The magician's tricks were so impressive that he was able to en_____in the whole audience for hours."},
  {"input":"hotel","word":"hotel","level":"1","sentence":"After a long road trip, Emma and her family checked into a cozy ho_el to rest their tired heads."},
  {"input":"willing","word":"willing","level":"2","sentence":"The firefighter was wi___ng to risk his life to save the family from the burning building."},
  {"input":"sulfur","word":"sulfur","level":" 記号 S》\"","sentence":"The volcanologist studied the su__ur deposits at the active volcano to learn more about its geological history."},
  {"input":"balance","word":"balance","level":"2","sentence":"To keep from falling off her bike, Emma had to find the right ba___ce between leaning forward and sitting back"},
  {"input":"charge","word":"charge","level":"2","sentence":"The electric toothbrush started to ch__ge as soon as I plugged it in."},
  {"input":"responsible","word":"responsible","level":"2","sentence":"The captain of the soccer team knew he was re_______le for making sure everyone got to the game on time and arrived safely."},
  {"input":"atomic","word":"atomic","level":"3","sentence":"The at__ic clock in the science museum was used to teach students about the importance of precise timekeeping."},
  {"input":"supper","word":"supper","level":"2","sentence":"After working all day, Emma looked forward to having su__er with her family at their cozy cabin by the lake."},
  {"input":"continent","word":"continent","level":"3","sentence":"The African co_____nt is home to many different countries and cultures."},
  {"input":"brake","word":"brake","level":"2","sentence":"As I rode my bike down the hill, I had to use my br_ke to slow down before turning onto the sidewalk."},
  {"input":"noise","word":"noise","level":"1","sentence":"The no_se from the construction site was so loud that it woke up everyone in the apartment building."},
  {"input":"elephant","word":"elephant","level":"1","sentence":"The little girl was amazed by the giant el____nt that walked into the zoo's main exhibit."},
  {"input":"excite","word":"excite","level":"3","sentence":"The crowd of students began to ex__te as the band started playing their favorite song."},
  {"input":"trust","word":"trust","level":"2","sentence":"I had to tr_st my instincts and follow the map to find the hidden treasure."},
  {"input":"effort","word":"effort","level":"2","sentence":"Sarah decided to put in extra ef__rt to finish her math homework early so she could play with her friends later."},
  {"input":"accent","word":"accent","level":"2","sentence":"Maria's ac__nt was so strong that her American friends could barely understand her when she spoke on the phone."},
  {"input":"divide","word":"divide","level":"2","sentence":"The math problem was so difficult that it seemed to di__de the class into two groups: those who could solve it and those who couldn't."},
  {"input":"background","word":"background","level":"3","sentence":"The artist's ba______nd in painting was evident as she skillfully blended colors to create a beautiful sunset."},
  {"input":"especially","word":"especially","level":"2","sentence":"Sarah loved playing soccer es______ly during recess because it was one of her favorite times to run around and have fun with her friends."},
  {"input":"until","word":"until","level":"1","sentence":"The class had to wait outside un_il the rain stopped so they could go on their field trip."},
  {"input":"short","word":"short","level":"1","sentence":"The sh_rt athlete was determined to break the record."},
  {"input":"tennis","word":"tennis","level":"1","sentence":"After school, Emily grabbed her te__is racket and headed to the court to practice her serves."},
  {"input":"actress","word":"actress","level":"2","sentence":"The ac___ss smiled brightly as she accepted her award for Best Actress"},
  {"input":"public","word":"public","level":"2","sentence":"The pu__ic library was a popular place for kids to read and do their homework."},
  {"input":"reasonable","word":"reasonable","level":"2","sentence":"It's re______le to expect that Sarah will finish her homework by bedtime tonight, since she's been working on it for a few hours already."},
  {"input":"fairly","word":"fairly","level":"3","sentence":"The new policy is intended to be applied fa__ly across all departments, ensuring equal opportunities for everyone."},
  {"input":"grandfather","word":"grandfather","level":"1","sentence":"My gr_______er taught me how to fish on his favorite lake."},
  {"input":"advance","word":"advance","level":"3","sentence":"The army had to ad___ce through the dense jungle to reach the enemy's base camp."},
  {"input":"opportunity","word":"opportunity","level":"3","sentence":"The new school program gave students an op_______ty to learn about coding and create their own video games."},
  {"input":"carefully","word":"carefully","level":"2","sentence":"The scientist ca_____ly poured the special liquid into the test tube to avoid any mistakes."},
  {"input":"probable","word":"probable","level":"3","sentence":"It is pr____le that the new soccer team will win the championship this year."},
  {"input":"average","word":"average","level":"3","sentence":"The students in Mrs. Johnson's class took a quiz and their av___ge score was an A minus."},
  {"input":"monster","word":"monster","level":"2","sentence":"The little boy was terrified of the mo___er that lived under his bed."},
  {"input":"eleventh","word":"eleventh","level":"2","sentence":"The el____th time I tried to ride the rollercoaster without a parent was finally successful!"},
  {"input":"employment","word":"employment","level":"3","sentence":"After graduating from college, she started looking for em______nt opportunities to use her degree in marketing."},
  {"input":"pants","word":"pants","level":"1","sentence":"Tommy spilled his juice and now his favorite pair of pa_ts is stained."},
  {"input":"polish","word":"polish","level":"2","sentence":"After cleaning the piano, Emma used a soft cloth to po__sh the shiny surface"},
  {"input":"native","word":"native","level":"2","sentence":"The park ranger was excited to introduce us to some of the na__ve animals that lived in the forest."},
  {"input":"strike","word":"strike","level":"2","sentence":"The baseball team was ready to st__ke against their arch-rivals on Saturday morning."},
  {"input":"unusual","word":"unusual","level":"3","sentence":"The new pet store owner had an un___al collection of exotic animals that he kept in his backyard"},
  {"input":"technique","word":"technique","level":"3","sentence":"The gymnast used a special te_____ue to land the difficult tumbling pass without falling."},
  {"input":"mystery","word":"mystery","level":"2","sentence":"The old mansion had been abandoned for years, but the new neighbors were determined to solve the my___ry of what had happened to the former owners."},
  {"input":"rapid","word":"rapid","level":"2","sentence":"The ra_id current swept the boat downstream, carrying the excited campers to their next adventure."},
  {"input":"usually","word":"usually","level":"1","sentence":"I us___ly have a bowl of cereal for breakfast."},
  {"input":"destroy","word":"destroy","level":"2","sentence":"The tornado was so powerful that it would de___oy the entire town if it wasn't stopped"},
  {"input":"coffeepot","word":"coffeepot","level":"3","sentence":"After breakfast, Sarah carefully washed and dried the co_____ot her grandmother had given her."},
  {"input":"evening","word":"evening","level":"1","sentence":"After finishing their homework, the kids went outside to play as the ev___ng sunlight began to fade."},
  {"input":"attractive","word":"attractive","level":"3","sentence":"The new playground equipment was very at______ve to all the kids who loved climbing and sliding."},
  {"input":"earring","word":"earring","level":"2","sentence":"Sarah carefully took off her ea___ng before swimming in the pool."},
  {"input":"authority","word":"authority","level":"3","sentence":"The coach had au_____ty over the entire sports team and made sure everyone was working together effectively."},
  {"input":"waitress","word":"waitress","level":"2","sentence":"The wa____ss brought our food to the table and smiled as we dug in."},
  {"input":"watchman","word":"watchman","level":"\"","sentence":"The wa____an climbed to the top of the lighthouse and scanned the horizon for any signs of ships in trouble."},
  {"input":"yours","word":"yours","level":"1","sentence":"Can I borrow yo_rs for the party?"},
  {"input":"future","word":"future","level":"1","sentence":"As I looked up at the stars on the night of my birthday, I couldn't help but think about what amazing things my fu__re held."},
  {"input":"agreement","word":"agreement","level":"3","sentence":"After discussing the terms of the project, Sarah and her group members reached an ag_____nt on how to divide the workload."},
  {"input":"sorry","word":"sorry","level":"1","sentence":"After spilling the juice on the carpet, Timmy apologized and said so_ry to his mom."},
  {"input":"bathtub","word":"bathtub","level":"3","sentence":"After her bath, Emma climbed out of the ba___ub and wrapped herself in a warm towel."},
  {"input":"equal","word":"equal","level":"2","sentence":"The girls and boys on the soccer team worked together to make sure everyone got an eq_al amount of playing time."},
  {"input":"hopeless","word":"hopeless","level":"3","sentence":"The worn-out couch had been collecting dust for years, and Emma thought it was ho____ss to ever get it clean again."},
  {"input":"convenient","word":"convenient","level":"3","sentence":"The coffee shop on my way to school has a co______nt drive-thru, so I can grab a latte and go."},
  {"input":"hungry","word":"hungry","level":"1","sentence":"After playing outside all morning, Emma was so hu__ry that she ran inside to grab a snack."},
  {"input":"permanent","word":"permanent","level":"3","sentence":"After she got her ears pierced, Emma decided to make the hole pe_____nt and not just temporary like some of her friends had done."},
  {"input":"limit","word":"limit","level":"2","sentence":"The manager had to set a li_it on how many cookies each child could eat at the party."},
  {"input":"climbing","word":"climbing","level":"3","sentence":"As I was cl____ng up the mountain, I had to stop and catch my breath because it was getting so steep."},
  {"input":"tonight","word":"tonight","level":"1","sentence":"I'm excited to go to the school dance to___ht with my friends!"},
  {"input":"roast","word":"roast","level":"3","sentence":"After hours of preparation, Sarah decided to ro_st her famous homemade coffee beans for the annual farmers market competition."},
  {"input":"brother","word":"brother","level":"1","sentence":"My br___er and I love to ride our bikes through the park on Saturday mornings."},
  {"input":"cruel","word":"cruel","level":"3","sentence":"The villainous pirate was known for his cr_el ways of treating prisoners on his ship."},
  {"input":"church","word":"church","level":"1","sentence":"The family decided to attend the big ch__ch picnic on Sunday afternoon."},
  {"input":"impress","word":"impress","level":"3","sentence":"The new employee wanted to im___ss the boss by completing all his tasks ahead of schedule."},
  {"input":"index","word":"index","level":"3","sentence":"After searching through the entire library bookshelf, Emma finally found the in_ex to the rare book she had been looking for."},
  {"input":"result","word":"result","level":"2","sentence":"The scientists studied the data and got a clear re__lt that showed the new medicine was effective."},
  {"input":"separate","word":"separate","level":"2","sentence":"The library has se____te sections for fiction and nonfiction books, making it easy to find what you're looking for."},
  {"input":"start","word":"start","level":"1","sentence":"As soon as the bell rang, I knew it was time to st_rt my math homework."},
  {"input":"absolute","word":"absolute","level":"3","sentence":"The ab____te best part of the roller coaster was the huge drop at the end."},
  {"input":"fairy","word":"fairy","level":"3","sentence":"As I walked through the enchanted forest, I stumbled upon a hidden glade where a tiny fa_ry was busy tending to her delicate flower garden."},
  {"input":"employ","word":"employ","level":"3","sentence":"The company will em__oy several new staff members to help with their busy season."},
  {"input":"third","word":"third","level":"1","sentence":"After eating two slices of pizza for lunch, I saved my th_rd slice for dessert."},
  {"input":"stomach","word":"stomach","level":"2","sentence":"After eating the spicy taco, Emma had to run to the bathroom because her st___ch was hurting from the food"},
  {"input":"judge","word":"judge","level":"2","sentence":"The ju_ge looked carefully at the evidence before making her decision."},
  {"input":"selection","word":"selection","level":"3","sentence":"The farmer had to make a careful se_____on of which crops to plant in the new field."},
  {"input":"freezer","word":"freezer","level":"3","sentence":"After finishing dinner, Sarah stored the leftover pizza in the fr___er so it would stay fresh for lunch tomorrow."},
  {"input":"legal","word":"legal","level":"3","sentence":"The lawyer spent hours researching to make sure the contract was completely le_al and binding."},
  {"input":"recent","word":"recent","level":"3","sentence":"The weather forecast said there was a re__nt chance of thunderstorms today."},
  {"input":"wonder","word":"wonder","level":"2","sentence":"As she walked through the museum, she couldn't help but wo__er what it would be like to travel back in time and see the ancient civilizations firsthand."},
  {"input":"baggage","word":"baggage","level":"3","sentence":"As she was getting ready for her big trip to Europe, Emma realized that she had brought a lot of unnecessary ba___ge and decided to leave some things behind."},
  {"input":"healthy","word":"healthy","level":"1","sentence":"Eating plenty of fruits and vegetables helps me maintain a he___hy lifestyle."},
  {"input":"culture","word":"culture","level":"2","sentence":"The school's cu___re encourages students to be kind and respectful to one another."},
  {"input":"continue","word":"continue","level":"2","sentence":"The teacher asked Emma to co____ue working on her math problems until she got them all correct."},
  {"input":"servant","word":"servant","level":"2","sentence":"The loyal se___nt had been working for the royal family for many years and was very well respected."},
  {"input":"cowboy","word":"cowboy","level":"2","sentence":"The co__oy rode his horse across the open range, feeling free and wild."},
  {"input":"description","word":"description","level":"3","sentence":"The artist's de_______on of the sunset was so vivid that it felt like I was standing right there with her, watching the colors change."},
  {"input":"passion","word":"passion","level":"3","sentence":"The young musician's pa___on for playing the violin was contagious and inspired her friends to start learning how to play too."},
  {"input":"clothe","word":"clothe","level":"3","sentence":"The store was having a sale on cl__he for kids, so Emma bought a few outfits to wear to school."},
  {"input":"weekly","word":"weekly","level":"2","sentence":"I make sure to do my homework every week for a total of three hours, and it's become a we__ly routine that helps me stay on top of my schoolwork."},
  {"input":"creation","word":"creation","level":"2","sentence":"The artist's latest cr____on was a beautiful painting of a sunset that she had been working on for weeks."},
  {"input":"favorite","word":"favorite","level":"2","sentence":"After trying many different flavors of ice cream, Emma's fa____te is still strawberry."},
  {"input":"jacket","word":"jacket","level":"2","sentence":"After school, Emma put on her favorite ja__et and rode her bike to the park."},
  {"input":"guilty","word":"guilty","level":"3","sentence":"The little boy looked down at his feet, feeling gu__ty about taking an extra cookie from the jar without asking."},
  {"input":"exact","word":"exact","level":"2","sentence":"To make sure she got the ex_ct measurements right, Maria used a ruler to measure out the ingredients for her famous chocolate cake."},
  {"input":"slide","word":"slide","level":"2","sentence":"The kids loved playing on the playground sl_de during recess."},
  {"input":"international","word":"international","level":"2","sentence":"The school's in_________al student club is planning a cultural festival to celebrate the diversity of its members from around the world."},
  {"input":"perfectly","word":"perfectly","level":"3","sentence":"The cake was pe_____ly moist and tasted like my grandma used to make."},
  {"input":"finger","word":"finger","level":"1","sentence":"As she carefully held the fragile glass vial, Emma accidentally poked her fi__er on the sharp edge and winced."},
  {"input":"babysitter","word":"babysitter","level":"3","sentence":"My neighbor asked me to be her ba______er for the night so she could go out and see a movie."},
  {"input":"district","word":"district","level":"2","sentence":"The school di____ct decided to add more buses to help students get home safely after school."},
  {"input":"painful","word":"painful","level":"2","sentence":"After falling off her bike, Emma's scraped knee began to throb with a pa___ul reminder of her careless mistake."},
  {"input":"round","word":"round","level":"1","sentence":"The hikers had to navigate ro_nd the steep mountain path to reach the summit."},
  {"input":"eighteenth","word":"eighteenth","level":"2","sentence":"The country's independence celebration was held on July 4th, marking its ei______th year of freedom."},
  {"input":"woman","word":"woman","level":"1","sentence":"The wo_an who lived next door was known for her beautiful garden."},
  {"input":"unfortunate","word":"unfortunate","level":"3","sentence":"The little boy's kite was an un_______te victim of a strong gust of wind and flew away into the nearby pond."},
  {"input":"defense","word":"defense","level":"2","sentence":"The new de___se system was designed to protect the city from any potential threats."},
  {"input":"shock","word":"shock","level":"2","sentence":"The sudden sh_ck of seeing her favorite dog, Max, wearing a superhero cape made Emma jump up and down with excitement."},
  {"input":"driver","word":"driver","level":"1","sentence":"The dr__er of the school bus was very careful to make sure all the kids got off safely."},
  {"input":"distance","word":"distance","level":"2","sentence":"The hikers had to calculate the di____ce between the two mountain peaks before deciding which one to climb first."},
  {"input":"guitar","word":"guitar","level":"1","sentence":"Tommy had been practicing his gu__ar for weeks and was finally ready to play it in front of his friends at school."},
  {"input":"since","word":"since","level":"1","sentence":"I've been practicing my piano skills si_ce I was 8 years old."},
  {"input":"method","word":"method","level":"2","sentence":"The scientist found that the new me__od for collecting water samples was more efficient and effective than the old one."},
  {"input":"directly","word":"directly","level":"2","sentence":"The pilot's instructions allowed us to land di____ly onto the runway."},
  {"input":"invent","word":"invent","level":"3","sentence":"The clever scientist decided to in__nt a machine that could convert sunlight into electricity."},
  {"input":"economy","word":"economy","level":"3","sentence":"The country's ec___my was affected by the drought that lasted for three years."},
  {"input":"improve","word":"improve","level":"2","sentence":"With practice and patience, we can im___ve our skills and do better on tests."},
  {"input":"dirty","word":"dirty","level":"1","sentence":"After playing outside all day, Emma's shoes were covered in di_ty mud and leaves."},
  {"input":"retire","word":"retire","level":"3","sentence":"After 30 years of working for the same company, John decided to re__re and spend his golden years traveling the world."},
  {"input":"praise","word":"praise","level":"2","sentence":"The crowd gave the new superhero movie a lot of pr__se for its amazing special effects."},
  {"input":"spread","word":"spread","level":"2","sentence":"The new idea to help the community sp__ad quickly through social media and soon everyone was involved."},
  {"input":"enjoin","word":"enjoin","level":"禁止する\"","sentence":"The judge instructed the jurors not to en__in the deliberation process until all the evidence had been presented."},
  {"input":"saving","word":"saving","level":"3","sentence":"After the tornado hit our town, we started sa__ng what was left of our belongings so we could rebuild our homes."},
  {"input":"minor","word":"minor","level":"3","sentence":"The mi_or adjustments to the machine's settings fixed the problem and it started working properly."},
  {"input":"cassette","word":"cassette","level":"3","sentence":"I loved listening to my favorite songs on my old ca____te player during summer vacation."},
  {"input":"answer","word":"answer","level":"1","sentence":"The teacher asked the class to raise their hand if they knew the an__er to the math problem"},
  {"input":"seventeenth","word":"seventeenth","level":"2","sentence":"The city's annual fireworks display was scheduled to take place on the se_______th of July."},
  {"input":"kindly","word":"kindly","level":"3","sentence":"After Mrs. Smith finished her shopping, she ki__ly offered to carry my bags for me."},
  {"input":"voice","word":"voice","level":"1","sentence":"The teacher asked Sarah to use her outside vo_ce when she played soccer during recess."},
  {"input":"certain","word":"certain","level":"1","sentence":"If you follow the recipe carefully, you can be ce___in that your cake will turn out delicious."},
  {"input":"style","word":"style","level":"2","sentence":"The fashion designer's unique st_le made her clothing line stand out from the rest."},
  {"input":"protest","word":"protest","level":"3","sentence":"The students decided to pr___st the new school rule by wearing black armbands to class every day for a week."},
  {"input":"spoken","word":"spoken","level":"2","sentence":"The wise old owl's words were sp__en with such conviction that it made all the other animals listen."},
  {"input":"quarrel","word":"quarrel","level":"3","sentence":"The two siblings got into a qu___el over who got to play with their favorite toy first."},
  {"input":"elder","word":"elder","level":"2","sentence":"The el_er of the group, Mrs. Johnson, led the hike through the woods."},
  {"input":"relationship","word":"relationship","level":"3","sentence":"The way you communicate with your friends can affect the re________ip you have with them."},
  {"input":"loose","word":"loose","level":"3","sentence":"The lo_se thread on my favorite shirt was starting to unravel."},
  {"input":"raise","word":"raise","level":"2","sentence":"The farmer's new irrigation system will help ra_se the crop yields and make their farm more profitable."},
  {"input":"sleepy","word":"sleepy","level":"1","sentence":"After eating a big lunch, Emma started to feel sl__py and decided to take a nap on the couch."},
  {"input":"seriously","word":"seriously","level":"3","sentence":"After falling off his bike, Max was se_____ly hurt and had to get stitches"},
  {"input":"leisure","word":"leisure","level":"3","sentence":"After finishing her homework, Sarah had some le___re time to play her favorite video game."},
  {"input":"observe","word":"observe","level":"3","sentence":"The scientist asked her students to ob___ve the ants marching around their anthill."},
  {"input":"violet","word":"violet","level":"2","sentence":"Sarah loved to wear her favorite vi__et scarf on special occasions."},
  {"input":"connection","word":"connection","level":"3","sentence":"The new router helped establish a strong co______on between my laptop and the Wi-Fi network, allowing me to finish my homework."},
  {"input":"fortieth","word":"fortieth","level":"2","sentence":"The fo____th birthday party was going to be the most epic celebration ever!"},
  {"input":"immediate","word":"immediate","level":"2","sentence":"The doctor ordered an im_____te X-ray to determine the severity of my brother's injury."},
  {"input":"seven","word":"seven","level":"1","sentence":"After se_en days of exploring the forest, Emma finally found the hidden waterfall she had been searching for."},
  {"input":"cotton","word":"cotton","level":"2","sentence":"The farmer carefully planted the co__on seeds in the fertile soil, hoping for a bountiful harvest."},
  {"input":"handsome","word":"handsome","level":"2","sentence":"The prince was so ha____me that he caught every girl's eye at the royal ball."},
  {"input":"strength","word":"strength","level":"2","sentence":"Sarah found her st____th in helping others by volunteering at the local animal shelter."},
  {"input":"anger","word":"anger","level":"2","sentence":"As she watched her brother play with her favorite toy without asking, Emma felt a surge of an_er and stomped away to calm down."},
  {"input":"narrow","word":"narrow","level":"1","sentence":"As I rode my bike across the rickety bridge, I had to stay very still to avoid falling off because it was incredibly na__ow and wobbly."},
  {"input":"memory","word":"memory","level":"1","sentence":"The old photograph brought back a fond me__ry of my family's summer vacation to the beach."},
  {"input":"cushion","word":"cushion","level":"3","sentence":"After a long bike ride, Sarah fell onto her favorite cu___on on the porch and let out a sigh of relief."},
  {"input":"career","word":"career","level":"3","sentence":"After high school, Maria decided to pursue a ca__er in photography, enrolling in a prestigious art program to hone her skills."},
  {"input":"busily","word":"busily","level":"3","sentence":"The bee was bu__ly collecting nectar from the bright yellow flowers."},
  {"input":"blood","word":"blood","level":"2","sentence":"The injured rabbit hopped away from the scene, leaving behind a small puddle of bl_od on the forest floor."},
  {"input":"school","word":"school","level":"1","sentence":"After summer break, I'm excited to go back to sc__ol and see my friends again."},
  {"input":"musician","word":"musician","level":"1","sentence":"The talented mu____an played the guitar solo at the school talent show."},
  {"input":"analysis","word":"analysis","level":"3","sentence":"The scientist conducted a thorough an____is of the data to determine the cause of the unusual phenomenon."},
  {"input":"motion","word":"motion","level":"3","sentence":"The skateboarder performed a smooth trick, catching air and executing precise mo__on to land perfectly on the ramp."},
  {"input":"protection","word":"protection","level":"2","sentence":"The helmet provided pr______on for my head during the bike ride."},
  {"input":"finance","word":"finance","level":"3","sentence":"The school is offering a fi___ce class to help students learn how to manage their money wisely."},
  {"input":"phrase","word":"phrase","level":"3","sentence":"The advertising slogan 'Just Do It' became a popular ph__se used to motivate people to take action."},
  {"input":"similar","word":"similar","level":"2","sentence":"The two paintings were si___ar in style and color, both depicting serene landscapes."},
  {"input":"element","word":"element","level":"3","sentence":"The chemist carefully added the el___nt hydrogen to the mixture."},
  {"input":"house","word":"house","level":"1","sentence":"The small ho_se on the corner had a big bright red door."},
  {"input":"supply","word":"supply","level":"3","sentence":"The store's emergency su__ly of flashlights and batteries helped keep the community safe during the power outage."},
  {"input":"player","word":"player","level":"2","sentence":"The basketball pl__er scored three points during the game and was proud of his accomplishment."},
  {"input":"relate","word":"relate","level":"3","sentence":"The characters in the story can re__te to each other's struggles and triumphs because they have similar experiences and personalities."},
  {"input":"process","word":"process","level":"2","sentence":"The scientist carefully followed each step of the pr___ss to mix the two chemicals together safely."},
  {"input":"mainly","word":"mainly","level":"3","sentence":"The students ma__ly focused on their math homework during recess."},
  {"input":"universe","word":"universe","level":"3","sentence":"As she gazed up at the stars on a clear night, Emily felt tiny compared to the vast un____se stretching out before her."},
  {"input":"shadow","word":"shadow","level":"2","sentence":"As I walked through the forest, I noticed that my own sh__ow was hiding behind the tall tree"},
  {"input":"agree","word":"agree","level":"2","sentence":"My friend and I ag_ee that our favorite subject is math."},
  {"input":"opening","word":"opening","level":"3","sentence":"The crowd cheered as the curtains drew back to reveal the op___ng act on stage."},
  {"input":"additional","word":"additional","level":"3","sentence":"The teacher provided ad______al help to the students who struggled with the math homework."},
  {"input":"ocean","word":"ocean","level":"2","sentence":"As I walked along the beach, I loved watching the oc_an waves crash against the shore."},
  {"input":"photograph","word":"photograph","level":"1","sentence":"The family's vacation was captured perfectly in a ph______ph by my dad."},
  {"input":"speak","word":"speak","level":"1","sentence":"After thinking carefully, Maria decided to sp_ak up and share her idea with the class."},
  {"input":"schoolgirl","word":"schoolgirl","level":"2","sentence":"Sarah was a bright sc______rl who always did her homework on time and got good grades."},
  {"input":"science","word":"science","level":"1","sentence":"The student's experiment on the effects of light on plant growth was a great example of how sc___ce can be used to answer real-world questions."},
  {"input":"regret","word":"regret","level":"3","sentence":"After realizing she had forgotten to invite her best friend to her birthday party, Sarah felt a deep re__et for not being more considerate."},
  {"input":"unexpected","word":"unexpected","level":"3","sentence":"While walking home from school, Emma stumbled upon an un______ed surprise party thrown by her friends to celebrate her birthday."},
  {"input":"train","word":"train","level":"1","sentence":"The tr_in rumbled down the tracks as we waited for our stop to arrive."},
  {"input":"bathroom","word":"bathroom","level":"1","sentence":"After finishing her homework, Emma quickly ran to the ba____om to wash her hands before dinner."},
  {"input":"information","word":"information","level":"2","sentence":"The librarian helped us find reliable in_______on about the different planets in our solar system."},
  {"input":"hammer","word":"hammer","level":"2","sentence":"Tommy's dad handed him a ha__er and told him to fix the loose board on their porch."},
  {"input":"physical","word":"physical","level":"3","sentence":"The ph____al therapist helped me stretch my sore muscles after the marathon."},
  {"input":"bakery","word":"bakery","level":"3","sentence":"After school, Sarah walked to the ba__ry and bought a warm chocolate chip cookie for her brother's birthday party."},
  {"input":"turkey","word":"turkey","level":"2","sentence":"The farmer raised a big tu__ey for Thanksgiving dinner."},
  {"input":"avoid","word":"avoid","level":"3","sentence":"To av_id getting lost on the hike, make sure to bring a map and compass."},
  {"input":"mental","word":"mental","level":"3","sentence":"The coach helped the player overcome their me__al blocks to improve their game"},
  {"input":"monkey","word":"monkey","level":"1","sentence":"As we walked through the jungle, we saw a curious mo__ey swinging from tree to tree."},
  {"input":"pointed","word":"pointed","level":"3","sentence":"The arrow was carefully placed on the map so that its po___ed end would match exactly with the location of the treasure."},
  {"input":"worry","word":"worry","level":"1","sentence":"Sarah started to wo_ry that she would forget her lines during the school play."},
  {"input":"grace","word":"grace","level":"3","sentence":"Sarah was grateful for the gr_ce she received when her teacher gave her extra time to complete her project."},
  {"input":"pigeon","word":"pigeon","level":"3","sentence":"As I walked through the park, I noticed a pi__on perched on a bench, pecking at crumbs from a discarded sandwich."},
  {"input":"wonderful","word":"wonderful","level":"1","sentence":"The fireworks display was wo_____ul because it lit up the whole sky and made everyone cheer."},
  {"input":"military","word":"military","level":"3","sentence":"The mi____ry base was located on the outskirts of the city and was home to many brave soldiers."},
  {"input":"silently","word":"silently","level":"3","sentence":"The librarian si____ly read her book as she worked on cataloging the new arrivals."},
  {"input":"celebration","word":"celebration","level":"3","sentence":"The whole school came together for a big ce_______on to mark the end of the school year."},
  {"input":"insist","word":"insist","level":"3","sentence":"Sarah's mom in__st that she eat her veggies before leaving for school."},
  {"input":"flour","word":"flour","level":"3","sentence":"Sarah carefully measured out two cups of fl_ur before starting to make her favorite chocolate cake."},
  {"input":"kitchen","word":"kitchen","level":"1","sentence":"After school, Sarah headed straight to the ki___en to grab a snack"},
  {"input":"distant","word":"distant","level":"2","sentence":"The astronomer gazed up at the di___nt stars twinkling in the night sky."},
  {"input":"dancing","word":"dancing","level":"2","sentence":"The kids loved watching their friends da___ng to their favorite song during recess."},
  {"input":"program","word":"program","level":"2","sentence":"The students worked together to create a pr___am for their school's annual talent show."},
  {"input":"unique","word":"unique","level":"3","sentence":"The colorful painting on the museum wall was one-of-a-kind and had a un__ue style that caught everyone's attention."},
  {"input":"peanut","word":"peanut","level":"2","sentence":"Sarah packed a pe__ut butter and jelly sandwich in her lunchbox for school today."},
  {"input":"useless","word":"useless","level":"3","sentence":"The old, rusty bicycle was nothing more than a us___ss hunk of metal, collecting dust in the corner of the garage."},
  {"input":"soldier","word":"soldier","level":"2","sentence":"The brave so___er helped carry injured people to safety during the disaster."},
  {"input":"statue","word":"statue","level":"3","sentence":"The school's new st__ue of a brave firefighter was unveiled during recess."},
  {"input":"hometown","word":"hometown","level":"3","sentence":"My family and I love visiting my ho____wn every summer to go swimming and play games at the park."},
  {"input":"place","word":"place","level":"1","sentence":"The family decided to visit their favorite pl_ce in the woods for a picnic."},
  {"input":"throw","word":"throw","level":"1","sentence":"The kids decided to th_ow a surprise party for their friend's birthday"},
  {"input":"hunger","word":"hunger","level":"3","sentence":"The refugees had been traveling for days and were experiencing severe hu__er due to the lack of food."},
  {"input":"determine","word":"determine","level":"3","sentence":"The scientist had to de_____ne which sample of water was safe to drink from the polluted river."},
  {"input":"police","word":"police","level":"1","sentence":"The po__ce officer helped Mrs. Johnson find her lost dog."},
  {"input":"happening","word":"happening","level":"3","sentence":"As I walked into the school auditorium, I realized that the surprise party for my best friend was ha_____ng right before my eyes!"},
  {"input":"visitor","word":"visitor","level":"1","sentence":"The vi___or from the zoo arrived early to set up the animal exhibits."},
  {"input":"instrument","word":"instrument","level":"3","sentence":"The music teacher asked Sarah to choose an in______nt from the box to play during the school concert."},
  {"input":"total","word":"total","level":"2","sentence":"The to_al amount of money we need to raise for the school carnival is $500."},
  {"input":"recognize","word":"recognize","level":"3","sentence":"As she walked into the classroom, Emma was thrilled to see that her teacher had set up a special display board so students could re_____ze their own artwork from previous art projects."},
  {"input":"arrest","word":"arrest","level":"3","sentence":"The police officer had to make an ar__st when the shoplifter refused to put back the stolen toys."},
  {"input":"mixer","word":"mixer","level":"3","sentence":"Sarah's mom brought out the electric mi_er and we all got to make our own batches of cookie dough."},
  {"input":"proposal","word":"proposal","level":"3","sentence":"After weeks of planning, Sarah decided to make a formal pr____al for her school's new recycling program to the student council."},
  {"input":"steel","word":"steel","level":"2","sentence":"The construction workers hammered away as they built the new skyscraper's st_el frame, which would support the heavy concrete floors."},
  {"input":"communicate","word":"communicate","level":"3","sentence":"The team's leader worked hard to co_______te their plan to all the players so they would be on the same page during the big game."},
  {"input":"spaghetti","word":"spaghetti","level":"2","sentence":"After the game, we went to Mom's house for dinner and had a big plate of sp_____ti with meatballs."},
  {"input":"couple","word":"couple","level":"2","sentence":"After finishing their homework, Sarah and her co__le of friends decided to have a movie night."},
  {"input":"serious","word":"serious","level":"2","sentence":"The coach took a se___us look at the player's injury before deciding whether to let them play in the game."},
  {"input":"pianist","word":"pianist","level":"3","sentence":"The pi___st played a beautiful melody on the grand piano during the school's talent show."},
  {"input":"carry","word":"carry","level":"1","sentence":"As I walked to school, I had to ca_ry my heavy backpack and my friend's books for her."},
  {"input":"boxer","word":"boxer","level":"3","sentence":"Tommy was a young bo_er who loved to train every day after school."},
  {"input":"supermarket","word":"supermarket","level":"1","sentence":"My mom took me to the su_______et after school so I could get some fresh milk and cookies for my snack time."},
  {"input":"violinist","word":"violinist","level":"3","sentence":"The young vi_____st had been playing her instrument since she was six years old and was now preparing for a big concert."},
  {"input":"development","word":"development","level":"3","sentence":"The company's recent de_______nt of a new app has led to an increase in customer engagement and revenue."},
  {"input":"totally","word":"totally","level":"3","sentence":"I was to___ly excited to go to the amusement park and ride my favorite roller coaster again!"},
  {"input":"throughout","word":"throughout","level":"3","sentence":"The company's new policy was implemented th______ut all of its offices and departments."},
  {"input":"confidence","word":"confidence","level":"3","sentence":"Sarah's co______ce grew as she practiced her lines for the school play."},
  {"input":"easily","word":"easily","level":"2","sentence":"Sarah can ea__ly solve math problems on her tablet because she has a math app that helps her"},
  {"input":"sweep","word":"sweep","level":"3","sentence":"The strong gust of wind swept across the playground, causing the trash cans to roll and sw_ep the sidewalk clean."},
  {"input":"painting","word":"painting","level":"2","sentence":"The little girl loved pa____ng her favorite animal, a butterfly, on her bedroom wall."},
  {"input":"understand","word":"understand","level":"1","sentence":"After watching the documentary about climate change, I finally started to un______nd how human actions can affect the environment."},
  {"input":"permit","word":"permit","level":"2","sentence":"The fire department issued a special pe__it to allow us to have a campfire on the beach."},
  {"input":"grapefruit","word":"grapefruit","level":"2","sentence":"After lunch, Emma walked to her backyard and picked a ripe gr______it from the tree to enjoy for dessert."},
  {"input":"around","word":"around","level":"1","sentence":"The kids ran ar__nd the park, laughing and playing tag."},
  {"input":"instant","word":"instant","level":"3","sentence":"As soon as I opened the new video game, I experienced an in___nt thrill from the exciting music and colorful graphics."},
  {"input":"expert","word":"expert","level":"3","sentence":"The ex__rt scientist carefully analyzed the data to develop a new theory about the behavior of the Earth's climate."},
  {"input":"gossip","word":"gossip","level":"3","sentence":"Sarah tried to avoid talking to her classmates about the latest celebrity news because she knew it would just fuel more go__ip around school."},
  {"input":"barber","word":"barber","level":"3","sentence":"The old-fashioned ba__er shop on Main Street had been a staple of the community for over 20 years."},
  {"input":"parent","word":"parent","level":"1","sentence":"My pa__nt is going to help me with my homework tonight."},
  {"input":"polite","word":"polite","level":"2","sentence":"Sarah remembered to say 'please' and 'thank you', being po__te when she asked her friend for a pencil."},
  {"input":"chimpanzee","word":"chimpanzee","level":"3","sentence":"At the zoo, I saw a ch______ee swinging from tree to tree."},
  {"input":"earthquake","word":"earthquake","level":"3","sentence":"The strong ea______ke shook the city and caused buildings to fall."},
  {"input":"happily","word":"happily","level":"2","sentence":"After finishing her homework, Emily went to bed ha___ly knowing she had done a good job."},
  {"input":"differently","word":"differently","level":"3","sentence":"The teacher asked the students to draw their favorite animal di_______ly each time they drew it."},
  {"input":"practical","word":"practical","level":"2","sentence":"Sarah decided to buy pr_____al shoes for her new job as a park ranger because she would be hiking and working outdoors every day."},
  {"input":"secretary","word":"secretary","level":"2","sentence":"The new se_____ry was very organized and helped Mrs. Smith keep track of all the important papers."},
  {"input":"discovery","word":"discovery","level":"3","sentence":"The archaeologist's di_____ry of the ancient temple revealed a hidden city deep in the jungle."},
  {"input":"brush","word":"brush","level":"2","sentence":"Sarah liked to br_sh her long hair every morning before school."},
  {"input":"fixed","word":"fixed","level":"3","sentence":"The handyman was able to fi_ed the broken fence post so that it wouldn't fall over anymore."},
  {"input":"consider","word":"consider","level":"3","sentence":"Before making a decision about what to wear to school tomorrow, you should co____er the weather forecast and your favorite outfit."},
  {"input":"really","word":"really","level":"1","sentence":"I re__ly love playing soccer on the weekends."},
  {"input":"perform","word":"perform","level":"2","sentence":"The talented student was asked to pe___rm a magic trick for her class"},
  {"input":"example","word":"example","level":"2","sentence":"The math teacher used an ex___le to show us how to solve for x."},
  {"input":"bunch","word":"bunch","level":"3","sentence":"As I walked through the farmer's market, I grabbed a bu_ch of fresh apples to take home and share with my family."},
  {"input":"spare","word":"spare","level":"2","sentence":"Tom had to get a new tire because he didn't have a sp_re one left from his old bike."},
  {"input":"schedule","word":"schedule","level":"3","sentence":"The student planner had a sc____le for each day of the week, including time for homework and extracurricular activities."},
  {"input":"apart","word":"apart","level":"2","sentence":"After the concert, Sarah and her friends decided to ap_rt from each other and go their separate ways."},
  {"input":"justice","word":"justice","level":"3","sentence":"The judge worked hard to ensure that ju___ce was served and the guilty party received fair punishment."},
  {"input":"secondly","word":"secondly","level":"3","sentence":"After I finished my math homework, se____ly I started working on my science project, and then I went to play soccer with my friends."},
  {"input":"hiking","word":"hiking","level":"2","sentence":"As we laced up our hi__ng boots, we couldn't wait to hit the trails and explore the beautiful mountains."},
  {"input":"shelf","word":"shelf","level":"3","sentence":"Sarah carefully placed her favorite book on the sh_lf so it wouldn't get lost or damaged."},
  {"input":"toothbrush","word":"toothbrush","level":"2","sentence":"After breakfast, Emma grabbed her favorite to______sh and headed to the bathroom to brush her teeth."},
  {"input":"shower","word":"shower","level":"1","sentence":"After playing outside all day, Emma rushed to take a quick sh__er before dinner."},
  {"input":"drama","word":"drama","level":"2","sentence":"The school play was so much dr_ma that even the actors got confused about what was going on!"},
  {"input":"battery","word":"battery","level":"3","sentence":"Sarah forgot to turn off her flashlight before bed, and now it's running on empty - its ba___ry is dead!"},
  {"input":"birthday","word":"birthday","level":"1","sentence":"I'm so excited for my friend's bi____ay party tomorrow!"},
  {"input":"support","word":"support","level":"2","sentence":"The school counselor provided su___rt to students who were struggling with their homework."},
  {"input":"biscuit","word":"biscuit","level":"3","sentence":"Emma loved to have a warm bi___it for breakfast on Sundays."},
  {"input":"goose","word":"goose","level":"3","sentence":"The farmer's pet go_se honked loudly as it waddled across the farmyard."},
  {"input":"paradise","word":"paradise","level":"3","sentence":"After a long year of school, the summer vacation was like a pa____se for Emma and her friends."},
  {"input":"experiment","word":"experiment","level":"3","sentence":"The students were excited to conduct their ex______nt on growing crystals using hot water and food coloring."},
  {"input":"November","word":"November","level":"1","sentence":"I remember building a snowman with my friends on the first day of No____er when I was a kid."},
  {"input":"paper","word":"paper","level":"1","sentence":"Sarah carefully cut out the shapes from her favorite pa_er to decorate her new journal."},
  {"input":"figure","word":"figure","level":"2","sentence":"The detective tried to fi__re out who had hidden the missing treasure."},
  {"input":"lucky","word":"lucky","level":"1","sentence":"After finding a four-leaf clover on his way to school, Max felt lu_ky that day and decided to wear it as a good luck charm."},
  {"input":"aloud","word":"aloud","level":"3","sentence":"The students cheered al_ud as their favorite football team scored the winning goal."},
  {"input":"error","word":"error","level":"2","sentence":"When I tried to download the software, I got an er_or message on my screen that said 'file not found'"},
  {"input":"window","word":"window","level":"1","sentence":"As she sat on her bed, Sarah gazed out the wi__ow watching the birds fly by."},
  {"input":"likely","word":"likely","level":"2","sentence":"Tommy is li__ly to get an A on his math test because he has been studying hard for weeks."},
  {"input":"rainbow","word":"rainbow","level":"2","sentence":"As the storm passed, a beautiful ra___ow appeared in the sky, reminding Emma of her favorite childhood story."},
  {"input":"motor","word":"motor","level":"2","sentence":"The mo_or of my toy car is very loud and makes it move fast."},
  {"input":"imagine","word":"imagine","level":"2","sentence":"As she sat by the ocean, she loved to im___ne what kind of adventures might be waiting for her on the other side of the waves."},
  {"input":"underground","word":"underground","level":"3","sentence":"The group of friends loved to explore the un_______nd tunnels beneath their town's old buildings."},
  {"input":"schoolboy","word":"schoolboy","level":"2","sentence":"Tommy was excited to be playing soccer during recess and proved to be quite the sc_____oy by kicking the ball into the goal"},
  {"input":"repeat","word":"repeat","level":"2","sentence":"The scientist asked me to re__at the experiment again to get more accurate results."},
  {"input":"dream","word":"dream","level":"1","sentence":"As she drifted off to sleep, Emma's dr_am took her on a magical adventure through a land of sparkling unicorns and fluffy clouds."},
  {"input":"writing","word":"writing","level":"2","sentence":"The student spent most of her free time wr___ng creative stories and poetry."},
  {"input":"cringe","word":"cringe","level":" へつらう\"","sentence":"When I saw my little brother's terrible attempt to do a skateboard trick and he fell flat on his face, I couldn't help but cr__ge at how awkward it was."},
  {"input":"independent","word":"independent","level":"3","sentence":"The young entrepreneur decided to start her own business, becoming an in_______nt contractor and creating a successful company that grew rapidly."},
  {"input":"fifteen","word":"fifteen","level":"1","sentence":"The group of friends decided to go to the movies on Friday night and spent fi___en dollars on popcorn and drinks."},
  {"input":"application","word":"application","level":"3","sentence":"After designing her website, Emma submitted an ap_______on to get accepted into the prestigious coding competition."},
  {"input":"princess","word":"princess","level":"2","sentence":"The kind pr____ss helped her little brother find his favorite toy, Mr. Whiskers the teddy bear."},
  {"input":"sugar","word":"sugar","level":"1","sentence":"The baker added just the right amount of su_ar to her famous chocolate chip cookies."},
  {"input":"ground","word":"ground","level":"1","sentence":"The soccer ball rolled across the gr__nd and came to rest near the goal"},
  {"input":"instruction","word":"instruction","level":"3","sentence":"The teacher gave each student an in_______on sheet to help them complete their project."},
  {"input":"seller","word":"seller","level":"2","sentence":"The farmer was also a se__er of fresh produce at the local market every Saturday."},
  {"input":"vehicle","word":"vehicle","level":"3","sentence":"The fire department received a call about a ve___le that was stuck on the ice and needed help to get back onto the road."},
  {"input":"altogether","word":"altogether","level":"3","sentence":"The new furniture was al______er too expensive for my budget, so I had to make some adjustments."},
  {"input":"contact","word":"contact","level":"3","sentence":"After sending the letter to her pen pal, Sarah waited anxiously for co___ct from her new friend."},
  {"input":"fortune","word":"fortune","level":"3","sentence":"After finding a shiny penny on the sidewalk, Sarah felt like she had stumbled upon good fo___ne and decided to use it to buy herself a small treat."},
  {"input":"political","word":"political","level":"3","sentence":"The candidate's po_____al views were shaped by her experiences growing up in a diverse neighborhood."},
  {"input":"shrimp","word":"shrimp","level":"2","sentence":"The children loved to eat sh__mp on their pizza night at school."},
  {"input":"twist","word":"twist","level":"3","sentence":"The rope had taken a strange tw_st as it wrapped around the tree trunk."},
  {"input":"prepare","word":"prepare","level":"2","sentence":"Before the big presentation, Sarah needed to pr___re all her slides and make sure she had the right props."},
  {"input":"either","word":"either","level":"1","sentence":"You can ei__er go to the park or watch your favorite TV show."},
  {"input":"count","word":"count","level":"1","sentence":"The teacher asked the students to co_nt how many pencils they had in their pencil cases."},
  {"input":"adviser","word":"adviser","level":"3","sentence":"After getting into trouble for skipping school, Tom was forced to see his guidance ad___er to come up with a plan to get back on track."},
  {"input":"response","word":"response","level":"3","sentence":"The fire department received a quick re____se to their emergency call and arrived on the scene within minutes."},
  {"input":"satisfy","word":"satisfy","level":"3","sentence":"The new video game was designed to sa___fy the craving of gamers everywhere for more adventure and excitement."},
  {"input":"stupid","word":"stupid","level":"2","sentence":"After he accidentally knocked over his sister's art project, Tim thought to himself, 'I was so st__id for not being more careful!'"},
  {"input":"grammar","word":"grammar","level":"2","sentence":"To improve her writing skills, Sarah studied gr___ar rules to make sure her sentences were clear and easy to understand."},
  {"input":"mount","word":"mount","level":"3","sentence":"The mo_nt on the bike was wobbly and needed to be tightened before I could ride it safely."},
  {"input":"communication","word":"communication","level":"3","sentence":"The team's coach emphasized the importance of co_________on among teammates during games."},
  {"input":"fight","word":"fight","level":"1","sentence":"The two friends decided to have a pillow fi_ht instead of going to bed early."},
  {"input":"coffee","word":"coffee","level":"1","sentence":"Sarah's mom brought her favorite co__ee mug to school for her birthday party."},
  {"input":"outside","word":"outside","level":"1","sentence":"After finishing my homework, I decided to go ou___de and play soccer with my friends."},
  {"input":"across","word":"across","level":"1","sentence":"The students walked ac__ss the new pedestrian bridge to get to school"},
  {"input":"court","word":"court","level":"2","sentence":"The soccer team had to play their final game on the co_rt before the winter break."},
  {"input":"typical","word":"typical","level":"3","sentence":"The ty___al small town in America has a main street with shops and restaurants."},
  {"input":"necessity","word":"necessity","level":"3","sentence":"According to the instructor, learning how to swim was a ne_____ty for anyone who wanted to enjoy the lake on summer vacations."},
  {"input":"sketchbook","word":"sketchbook","level":"3","sentence":"After finishing her art class, Emma eagerly pulled out her favorite sk______ok to draw some inspiration from the beautiful painting she had just learned about."},
  {"input":"broccoli","word":"broccoli","level":"3","sentence":"My mom added steamed br____li to my favorite pasta dish for extra nutrients."},
  {"input":"scientific","word":"scientific","level":"2","sentence":"The scientist's groundbreaking discovery was the result of years of sc______ic research and experimentation."},
  {"input":"steak","word":"steak","level":"2","sentence":"My dad's favorite dinner is grilled st_ak with roasted vegetables."},
  {"input":"trousers","word":"trousers","level":"3","sentence":"Tommy's brand new pair of bright blue tr____rs made him feel like he was ready to take on the whole school"},
  {"input":"bread","word":"bread","level":"1","sentence":"After school, Emma walked to the bakery and bought a warm loaf of br_ad for her mom's surprise party."},
  {"input":"together","word":"together","level":"1","sentence":"The team worked to____er to build a new playground for the school."},
  {"input":"choice","word":"choice","level":"2","sentence":"I had to make a tough ch__ce between playing soccer or going to the beach on Saturday."},
  {"input":"parade","word":"parade","level":"2","sentence":"The small town's annual summer pa__de was filled with colorful floats and marching bands."},
  {"input":"fortunate","word":"fortunate","level":"2","sentence":"After winning the essay contest, Emma felt fo_____te to have received the scholarship and was able to attend her dream college."},
  {"input":"religious","word":"religious","level":"3","sentence":"The re_____us leader spoke about the importance of kindness and compassion during the holiday season."},
  {"input":"partner","word":"partner","level":"3","sentence":"Emily was very excited to start her new pa___er project in school, where she would be working together with a friend to create a diorama."},
  {"input":"spoil","word":"spoil","level":"3","sentence":"The heat made the milk sp_il and go bad before we could finish making the smoothie."},
  {"input":"hundred","word":"hundred","level":"1","sentence":"The farmer's market had a hu___ed different types of fruits and vegetables to buy."},
  {"input":"triangle","word":"triangle","level":"3","sentence":"The students used geometry software to draw a perfect tr____le for their math project."},
  {"input":"rainy","word":"rainy","level":"1","sentence":"On ra_ny days, Emma likes to stay inside and read a good book."},
  {"input":"translate","word":"translate","level":"3","sentence":"The company hired a professional to tr_____te the company's website from English to Spanish so that they could reach more customers"},
  {"input":"where","word":"where","level":"1","sentence":"After looking around the park for what felt like hours, Emma finally found her lost puppy wh_re she had left it by the swings."},
  {"input":"sixteenth","word":"sixteenth","level":"2","sentence":"The concert was held on July 16th, which is also the si_____th day of the month."},
  {"input":"interest","word":"interest","level":"1","sentence":"The new video game caught my in____st because it had a fun storyline and cool graphics."},
  {"input":"meaning","word":"meaning","level":"2","sentence":"The artist spent hours thinking about the me___ng of her new painting, trying to capture the emotions she wanted viewers to feel."},
  {"input":"liter","word":"liter","level":"3","sentence":"The author used a li_er of water to mix the paint for her art project."},
  {"input":"eraser","word":"eraser","level":"2","sentence":"After lunch, Sarah pulled out her favorite pencil case to find an er__er to fix the mistake on her math worksheet."},
  {"input":"prove","word":"prove","level":"2","sentence":"The scientist spent years studying the behavior of the rare species to pr_ve that it was not extinct after all."},
  {"input":"locker","word":"locker","level":"2","sentence":"After gym class, Emma grabbed her bag from her lo__er and headed to her next period class."},
  {"input":"media","word":"media","level":"3","sentence":"The me_ia reported that a new theme park would be built on the outskirts of town."},
  {"input":"drinking","word":"drinking","level":"2","sentence":"After a long day of playing soccer, I like to sit on the porch and start dr____ng fresh-squeezed lemonade from my mom's garden."},
  {"input":"ghost","word":"ghost","level":"2","sentence":"The old mansion was said to be haunted by a friendly gh_st named George who liked to play tricks on visitors."},
  {"input":"artist","word":"artist","level":"1","sentence":"Sarah is an ar__st who loves to paint beautiful sunsets."},
  {"input":"excuse","word":"excuse","level":"1","sentence":"Can you ex__se me for a minute so I can go to the bathroom?"},
  {"input":"introduction","word":"introduction","level":"3","sentence":"The professor gave an in________on to the topic of climate change before starting his lecture."},
  {"input":"tower","word":"tower","level":"1","sentence":"The brave knight climbed up the to_er to rescue the princess from the dragon's lair."},
  {"input":"laugh","word":"laugh","level":"1","sentence":"As I watched my friend's silly dance routine, I couldn't help but la_gh along with her"},
  {"input":"rumor","word":"rumor","level":"2","sentence":"The students were worried about the ru_or that the school was going to be closed for the rest of the week."},
  {"input":"orange","word":"orange","level":"1","sentence":"Sarah's favorite color is or__ge and she loves wearing an orange scarf on sunny days."},
  {"input":"active","word":"active","level":"2","sentence":"The ac__ve dog ran quickly around the corner to chase its tail."},
  {"input":"income","word":"income","level":"3","sentence":"By starting her own lemonade stand, Emma was able to earn an extra $20 per week in in__me to save for a new bike"},
  {"input":"board","word":"board","level":"2","sentence":"The skateboarders gathered around the halfpipe on the wooden bo_rd to perform their tricks."},
  {"input":"display","word":"display","level":"3","sentence":"The museum's new exhibit featured a large di___ay of dinosaur fossils from around the world."},
  {"input":"spider","word":"spider","level":"2","sentence":"As I walked through the garden, I saw a big sp__er spinning a web between two bushes."},
  {"input":"beginner","word":"beginner","level":"3","sentence":"Sarah was excited to start learning how to play the guitar and decided to take be____er lessons from her favorite music teacher."},
  {"input":"during","word":"during","level":"1","sentence":"The students went on a field trip du__ng their spring break to explore the local museum."},
  {"input":"young","word":"young","level":"1","sentence":"The yo_ng artist spent hours every day practicing her drawing skills to create amazing works of art."},
  {"input":"football","word":"football","level":"1","sentence":"The quarterback threw the fo____ll to his teammate, who ran it all the way to the end zone."},
  {"input":"softly","word":"softly","level":"3","sentence":"The cat's whiskers so__ly touched my hand as it purred contentedly on my lap."},
  {"input":"living","word":"living","level":"3","sentence":"The family of rabbits was li__ng happily in their cozy burrow under the big oak tree."},
  {"input":"golden","word":"golden","level":"1","sentence":"The sun was setting over the fields, casting a warm go__en glow across the landscape."},
  {"input":"bookshop","word":"bookshop","level":"2","sentence":"After school, Emma walked to the cozy bo____op on Main Street to browse through the new releases."},
  {"input":"poison","word":"poison","level":"2","sentence":"The hikers had to be careful not to drink the water from the stream, because it was rumored to contain a tiny amount of po__on that could harm them if ingested."},
  {"input":"envelope","word":"envelope","level":"2","sentence":"The postman handed Sarah an en____pe with her name on it."},
  {"input":"within","word":"within","level":"2","sentence":"The treasure chest was hidden wi__in the old oak tree, and it took us hours to find it."},
  {"input":"small","word":"small","level":"1","sentence":"Sarah's sm_ll dog ran quickly around the corner of the park."},
  {"input":"ability","word":"ability","level":"2","sentence":"Maria's ab___ty to speak multiple languages allowed her to communicate effectively with people from different countries."},
  {"input":"youth","word":"youth","level":"2","sentence":"The community center offers programs and activities specifically designed for local yo_th to help them develop their skills and make new friends."},
  {"input":"escalator","word":"escalator","level":"3","sentence":"As I walked into the busy shopping mall, I was amazed by the es_____or that took me up to the second floor where my favorite bookstore was located."},
  {"input":"speech","word":"speech","level":"2","sentence":"The class president's inspiring sp__ch encouraged everyone to work together and achieve their goals."},
  {"input":"leather","word":"leather","level":"2","sentence":"The new bike saddle was made of soft le___er and felt comfortable under my seat"},
  {"input":"somewhat","word":"somewhat","level":"3","sentence":"The new video game was so____at exciting, but it didn't live up to my expectations."},
  {"input":"fashion","word":"fashion","level":"2","sentence":"Emma's favorite fa___on magazine had the most amazing hairstyles and clothing designs that she wanted to try out."},
  {"input":"central","word":"central","level":"2","sentence":"The city's ce___al park was where everyone went to play and have fun on weekends."},
  {"input":"early","word":"early","level":"1","sentence":"The farmer got up ea_ly to milk the cows before the sun rose."},
  {"input":"shore","word":"shore","level":"2","sentence":"The family spent their summer vacation building sandcastles on the sh_re of Lake Michigan."},
  {"input":"freeze","word":"freeze","level":"2","sentence":"As I stepped outside into the winter morning, the cold air would fr__ze my breath in mid-air, making it look like tiny ice crystals."},
  {"input":"therefore","word":"therefore","level":"3","sentence":"Since I didn't bring my lunch, I will have to buy something from the cafeteria th_____re I'll need some extra money."},
  {"input":"sympathy","word":"sympathy","level":"3","sentence":"After learning about the devastating earthquake that hit the small town, Emma felt a strong sense of sy____hy for the people who lost their homes and were struggling to survive."},
  {"input":"tummy","word":"tummy","level":"2","sentence":"After eating too much candy, Sarah had a big tu_my ache and couldn't play outside."},
  {"input":"studio","word":"studio","level":"3","sentence":"The young artist set up her easel and paints in her cozy st__io to work on her latest masterpiece."},
  {"input":"private","word":"private","level":"2","sentence":"Emily kept her favorite book a pr___te secret from her siblings."},
  {"input":"route","word":"route","level":"2","sentence":"The hikers planned their ro_te through the mountains carefully to avoid any steep cliffs."},
  {"input":"center","word":"center","level":"1","sentence":"The school's basketball team practiced at the ce__er of the court to improve their passes."},
  {"input":"touch","word":"touch","level":"1","sentence":"As I walked through the museum, I couldn't help but to_ch the glass case to get a closer look at the ancient artifact."},
  {"input":"greatness","word":"greatness","level":"2","sentence":"The ancient pyramids were built to demonstrate the gr_____ss of the Egyptian pharaohs and their civilization."},
  {"input":"classmate","word":"classmate","level":"1","sentence":"I was surprised when my cl_____te from last year's math class became my new best friend this summer."},
  {"input":"doctor","word":"doctor","level":"1","sentence":"The do__or gave me a special bandage to help my cut heal faster."},
  {"input":"global","word":"global","level":"3","sentence":"The gl__al community came together to discuss ways to protect endangered species."},
  {"input":"missing","word":"missing","level":"3","sentence":"The detective was searching for clues to find the mi___ng cat that had been gone for three days."},
  {"input":"freedom","word":"freedom","level":"2","sentence":"The brave firefighter risked his life to save people trapped in the burning building, knowing that fr___om from danger was worth the sacrifice."},
  {"input":"follow","word":"follow","level":"2","sentence":"The dog decided to fo__ow its owner down the street, even though it was tired from playing all day."},
  {"input":"recently","word":"recently","level":"2","sentence":"My family and I re____ly moved to a new house that is right next to a park where I can ride my bike."},
  {"input":"gently","word":"gently","level":"3","sentence":"The doctor ge__ly examined my ear to see if I had an infection."},
  {"input":"combination","word":"combination","level":"3","sentence":"The new recipe was a co_______on of her mom's and grandmother's favorite dishes, which resulted in an incredible flavor."},
  {"input":"completely","word":"completely","level":"2","sentence":"After I finished my math homework, I felt co______ly relaxed and ready to play outside."},
  {"input":"approach","word":"approach","level":"2","sentence":"As we near the top of the mountain, we need to take a more cautious ap____ch to avoid any loose rocks."},
  {"input":"attract","word":"attract","level":"3","sentence":"The bright colors on the butterfly's wings at___ct many bees and butterflies to its flower bed."},
  {"input":"celebrate","word":"celebrate","level":"3","sentence":"The school is going to ce_____te its anniversary by having a big party and inviting all the students and their families."},
  {"input":"intelligent","word":"intelligent","level":"2","sentence":"The scientist's in_______nt approach to solving the complex problem led her team to a groundbreaking discovery."},
  {"input":"grant","word":"grant","level":"3","sentence":"The community center received a gr_nt to build a new playground for kids to play on."},
  {"input":"tough","word":"tough","level":"3","sentence":"The new football player was to_gh and didn't let anyone push him around on the field."},
  {"input":"cover","word":"cover","level":"1","sentence":"The detective's job was to co_er all the clues and interview witnesses to solve the mystery."},
  {"input":"bridge","word":"bridge","level":"1","sentence":"The old wooden br__ge creaked and groaned as we walked across it."},
  {"input":"ninetieth","word":"ninetieth","level":"2","sentence":"The town's historic clock tower was built to celebrate the ni_____th anniversary of its founding."},
  {"input":"financial","word":"financial","level":"3","sentence":"The fi_____al advisor helped Mrs. Johnson create a budget that allowed her to save money each month for retirement."},
  {"input":"signal","word":"signal","level":"2","sentence":"The lifeguard watched for any sign of trouble and then gave a si__al to the swimmers that it was time to get out of the water."},
  {"input":"punish","word":"punish","level":"2","sentence":"The teacher decided to pu__sh Jimmy for talking out of turn during class."},
  {"input":"geography","word":"geography","level":"3","sentence":"In social studies class, we learned about the ge_____hy of different countries and how it affects their cultures."},
  {"input":"twenty","word":"twenty","level":"1","sentence":"The fireworks display was so bright that it could be seen from tw__ty miles away."},
  {"input":"manager","word":"manager","level":"2","sentence":"The soccer team's ma___er helped them prepare for the big game."},
  {"input":"omelette","word":"omelette","level":"3","sentence":"After cooking dinner, I like to make myself an om____te as a special treat."},
  {"input":"account","word":"account","level":"2","sentence":"After the big sale, the cashier had to make an ac___nt of all the money she earned that day."},
  {"input":"community","word":"community","level":"3","sentence":"The small town's co_____ty came together to clean up the park and make it a safer place for kids to play."},
  {"input":"nation","word":"nation","level":"2","sentence":"The team's victory was celebrated across the na__on as they won their first championship title."},
  {"input":"goods","word":"goods","level":"3","sentence":"The charity drive collected many go_ds and supplies for the local animal shelter."},
  {"input":"nineteenth","word":"nineteenth","level":"2","sentence":"The Battle of Gettysburg took place on the ni______th day of July, 1863."},
  {"input":"senior","word":"senior","level":"3","sentence":"The se__or member of the school's debate team was proud to have been selected as the team captain."},
  {"input":"according","word":"according","level":"3","sentence":"The students worked on their math problems ac_____ng to the instructions provided by their teacher."},
  {"input":"thunder","word":"thunder","level":"3","sentence":"As I watched the storm roll in, the th___er boomed loudly and lit up the darkening sky."},
  {"input":"dinner","word":"dinner","level":"1","sentence":"After finishing their homework, the kids were excited to sit down for di__er and talk about their favorite part of the day."},
  {"input":"metal","word":"metal","level":"2","sentence":"The me_al detector beeped loudly as it searched for buried treasures on the beach."},
  {"input":"wheat","word":"wheat","level":"3","sentence":"The farmer planted the wh_at seeds in the fertile soil and waited for them to grow."},
  {"input":"develop","word":"develop","level":"2","sentence":"The students will de___op their problem-solving skills by completing math puzzles and games."},
  {"input":"bathe","word":"bathe","level":"3","sentence":"After playing outside all day, Emma decided it was time to ba_he and get ready for bed."},
  {"input":"medicine","word":"medicine","level":"2","sentence":"The doctor prescribed some special me____ne to help her feel better after she got sick."},
  {"input":"hallmark","word":"hallmark","level":" 太鼓判\"","sentence":"The company's high-quality products have become a ha____rk of their brand, making them stand out from the competition."},
  {"input":"kingdom","word":"kingdom","level":"3","sentence":"The brave knight rode into the ki___om to save the princess from the dragon's fiery breath."},
  {"input":"inside","word":"inside","level":"1","sentence":"After I finished building my Lego castle, I felt happy to be in__de and admire all my hard work."},
  {"input":"delay","word":"delay","level":"3","sentence":"The storm caused a de_ay on our road trip, and we had to stop for the night in a nearby town."},
  {"input":"engine","word":"engine","level":"2","sentence":"The toy train had a small en__ne that made it move around the track."},
  {"input":"number","word":"number","level":"1","sentence":"The math problem required me to multiply a nu__er by itself, which was equal to 64."},
  {"input":"flame","word":"flame","level":" 燃え上がる \"","sentence":"The campers huddled around the campfire as the fl_me danced and crackled, warming their hands on a chilly autumn night."},
  {"input":"bookstore","word":"bookstore","level":"2","sentence":"After school, Emma walked to the bo_____re to find a new novel for her book club"},
  {"input":"alcohol","word":"alcohol","level":"3","sentence":"The doctor warned her mother that excessive use of al___ol during pregnancy can cause serious birth defects."},
  {"input":"order","word":"order","level":"1","sentence":"The teacher asked the students to take their seats in or_er before we started the lesson."},
  {"input":"means","word":"means","level":"3","sentence":"The teacher explained that homework me_ns doing your schoolwork outside of class to help you understand what you learned."},
  {"input":"payment","word":"payment","level":"3","sentence":"After finishing the project, John made sure to make his pa___nt on time so he wouldn't get charged any extra fees."},
  {"input":"champion","word":"champion","level":"2","sentence":"After months of hard work and dedication, Maria became a ch____on in her first gymnastics competition."},
  {"input":"institution","word":"institution","level":"3","sentence":"The hospital is an important in_______on that provides medical care to people in need."},
  {"input":"block","word":"block","level":"2","sentence":"The construction workers used a big bl_ck to hold up the scaffolding while they worked on the building."},
  {"input":"damage","word":"damage","level":"2","sentence":"The strong winds from Hurricane Maria caused significant da__ge to the coastal towns and homes."},
  {"input":"burger","word":"burger","level":"3","sentence":"After lunch, I went to the park to play soccer and grab a bu__er from the food truck."},
  {"input":"tulip","word":"tulip","level":"2","sentence":"The bright red tu_ip bloomed early this spring, surprising all of us with its vibrant color."},
  {"input":"uniform","word":"uniform","level":"2","sentence":"As she got ready for school, Emily put on her new un___rm and grabbed her backpack to head out the door."},
  {"input":"family","word":"family","level":"1","sentence":"After the holiday dinner, the whole fa__ly decided to go for a winter walk together."},
  {"input":"search","word":"search","level":"3","sentence":"The detective began to se__ch for clues around the mysterious crime scene."},
  {"input":"scarf","word":"scarf","level":"3","sentence":"Sarah loved to wear her favorite sc_rf on Fridays because it made her feel like she was going to a special adventure."},
  {"input":"float","word":"float","level":"2","sentence":"The helium balloon began to fl_at up towards the ceiling, carrying the birthday candle with it."},
  {"input":"problem","word":"problem","level":"2","sentence":"The new student had trouble fitting in and was trying to figure out why she was having such a big pr___em making friends."},
  {"input":"structure","word":"structure","level":"3","sentence":"The architect designed the new skyscraper's st_____re to be strong and stable, with thick columns supporting each floor."},
  {"input":"shampoo","word":"shampoo","level":"2","sentence":"After her swim meet, Emma loved to use sh___oo to wash away the chlorine smell from her hair."},
  {"input":"chart","word":"chart","level":"3","sentence":"Sarah used a ch_rt to help her keep track of her favorite books she had read so far this year."},
  {"input":"final","word":"final","level":"2","sentence":"After weeks of hard work, Sarah submitted her fi_al project to the teacher."},
  {"input":"Christmas","word":"Christmas","level":"1","sentence":"The whole family loved decorating the Ch_____as tree together."},
  {"input":"review","word":"review","level":"3","sentence":"After trying out the new recipe, I wrote a re__ew of how it turned out."},
  {"input":"widely","word":"widely","level":"3","sentence":"The new pizza place is wi__ly known for its delicious toppings and generous portions."},
  {"input":"guess","word":"guess","level":"2","sentence":"I have to gu_ss how many cookies are in the jar because I forgot to count them earlier."},
  {"input":"indeed","word":"indeed","level":"3","sentence":"The new student was in__ed shy at first, but after making some friends on the playground, she started to open up."},
  {"input":"boxing","word":"boxing","level":"3","sentence":"Tommy loved watching bo__ng matches on TV and dreamed of becoming a professional boxer when he grew up."},
  {"input":"goodbye","word":"goodbye","level":"1","sentence":"After saying go___ye to her friends, Emma walked home from school feeling happy and excited for the weekend."},
  {"input":"whose","word":"whose","level":"1","sentence":"The dog wh_se tail was wagging the most won the prize at the pet show."},
  {"input":"horse","word":"horse","level":"1","sentence":"As I rode my ho_se across the open field, I felt the wind blowing through my hair."},
  {"input":"ruler","word":"ruler","level":"2","sentence":"Sarah carefully drew straight lines on her paper using the ru_er to make sure they were perfect."},
  {"input":"properly","word":"properly","level":"3","sentence":"After finishing her homework, Sarah pr____ly folded the laundry to put it away in her dresser."},
  {"input":"backward","word":"backward","level":"2","sentence":"Sarah had to run ba____rd to catch the ball that was rolling away from her."},
  {"input":"subway","word":"subway","level":"1","sentence":"As we walked to school on Monday morning, I couldn't wait to grab my favorite lunchbox and head down into the su__ay to meet up with my friends for a quick snack before our math test."},
  {"input":"thief","word":"thief","level":"2","sentence":"The detective had been tracking the clever th_ef for weeks, trying to figure out how they were always one step ahead."},
  {"input":"timetable","word":"timetable","level":"3","sentence":"The student carefully planned out her day using the ti_____le to ensure she had enough time for her homework and extracurricular activities."},
  {"input":"peach","word":"peach","level":"2","sentence":"Emily's favorite fruit is the juicy pe_ch that her grandma grows in her backyard."},
  {"input":"wheel","word":"wheel","level":"2","sentence":"As I rode my bike down the hill, I could feel the wind rushing past me and the wh_el spinning smoothly on the pavement."},
  {"input":"slope","word":"slope","level":"3","sentence":"As I walked down the mountain trail, I had to be careful not to slip on the steep sl_pe that led to the rushing waterfall."},
  {"input":"camera","word":"camera","level":"1","sentence":"As we walked through the park, I used my ca__ra to take pictures of the beautiful flowers."},
  {"input":"extremely","word":"extremely","level":"3","sentence":"The roller coaster was ex_____ly fast and exciting!"},
  {"input":"palace","word":"palace","level":"2","sentence":"The royal family lived in a grand pa__ce with tall spires and sparkling fountains."},
  {"input":"cliff","word":"cliff","level":"3","sentence":"As I hiked up the mountain, I reached the edge of a steep cl_ff that offered a breathtaking view of the valley below."},
  {"input":"chairman","word":"chairman","level":"3","sentence":"The new ch____an of the school council was thrilled to announce that they would be building a new playground during spring break."},
  {"input":"knock","word":"knock","level":"2","sentence":"As I was walking to school, I heard my friend kn_ck on the classroom door."},
  {"input":"appear","word":"appear","level":"2","sentence":"The magic trick was so good that the rabbit suddenly ap__ar on stage."},
  {"input":"possible","word":"possible","level":"2","sentence":"It's po____le that the new park will have a skate ramp and a splash pad for kids to enjoy."},
  {"input":"carbon","word":"carbon","level":"3","sentence":"The ca__on atoms in the tree's cells helped to make its trunk strong and sturdy."},
  {"input":"listener","word":"listener","level":"3","sentence":"The counselor was a good li____er and helped me work through my problems."},
  {"input":"certainly","word":"certainly","level":"2","sentence":"I'd ce_____ly be happy to help you with your math homework."},
  {"input":"steal","word":"steal","level":"2","sentence":"Tommy tried to st_al a cookie from his sister's plate without her noticing."},
  {"input":"wherever","word":"wherever","level":"3","sentence":"As she packed her backpack for camp, Emma wondered where she would put her favorite stuffed animal, Mr. Whiskers, wh____er she ended up sleeping that night."},
  {"input":"shout","word":"shout","level":"2","sentence":"When I got the news that my favorite team won the championship, I jumped up and started to sh_ut 'We did it!' over and over again."},
  {"input":"different","word":"different","level":"1","sentence":"The two dogs had di_____nt personalities - one was friendly and outgoing, while the other was shy and reserved."},
  {"input":"hearing","word":"hearing","level":"3","sentence":"The court reporter was very careful when she was he___ng the witness's testimony to ensure that every word was recorded accurately."},
  {"input":"stranger","word":"stranger","level":"2","sentence":"As I walked to school, I noticed a st____er standing outside my favorite bookstore, looking at the same book that I had been reading last night."},
  {"input":"waist","word":"waist","level":"3","sentence":"Sarah's favorite jeans were too tight around her wa_st and needed to be let out."},
  {"input":"cigarette","word":"cigarette","level":"2","sentence":"The principal found an empty ci_____te pack on the school's playground and decided to remind everyone about the dangers of smoking"},
  {"input":"skiing","word":"skiiing","level":"1","sentence":"After a few lessons, Emma was excited to try sk___ng down the bunny hill for the first time."},
  {"input":"soccer","word":"soccer","level":"1","sentence":"The kids loved playing so__er during recess because it helped them get exercise and have fun."},
  {"input":"phone","word":"phone","level":"1","sentence":"Can you please pass me my ph_ne so I can call my mom?"},
  {"input":"theater","word":"theater","level":"2","sentence":"The school's annual talent show was held in the th___er and featured songs, dances, and even a magic trick."},
  {"input":"normal","word":"normal","level":"2","sentence":"The doctor said it was no__al for kids to get sick sometimes, but we should wash our hands frequently to stay healthy."},
  {"input":"salary","word":"salary","level":"2","sentence":"After five years of working as an accountant, Maria was excited to receive her new sa__ry and use it to buy a new car."},
  {"input":"devil","word":"devil","level":"3","sentence":"The cowboy's rival, known as Blackheart, was said to have made a deal with the de_il to gain his superhuman strength."},
  {"input":"pleasant","word":"pleasant","level":"2","sentence":"The park was a pl____nt place to play on a sunny day."},
  {"input":"marry","word":"marry","level":"1","sentence":"Sarah's parents told her she could ma_ry her best friend John when they turn 18 if they still want to be together."},
  {"input":"think","word":"think","level":"1","sentence":"Before he made his decision, he had to th_nk carefully about what would happen next."},
  {"input":"travel","word":"travel","level":"1","sentence":"The family decided to tr__el to Florida for their summer vacation."},
  {"input":"napkin","word":"napkin","level":"3","sentence":"After eating her sandwich at lunchtime, Emma used a na__in to clean up the crumbs from her mouth."},
  {"input":"advantage","word":"advantage","level":"3","sentence":"The new bike gave me an ad_____ge over my friends when we went on a hike through the woods."},
  {"input":"brightly","word":"brightly","level":"3","sentence":"The fireworks exploded br____ly into the night sky, filling the air with colorful sparks and cheers from the crowd."},
  {"input":"member","word":"member","level":"1","sentence":"The boy decided to become a me__er of the school's environmental club because he loved recycling and helping his community."},
  {"input":"insurance","word":"insurance","level":"3","sentence":"The company that owned the big trucks had to buy special in_____ce to protect themselves in case one of their drivers got into an accident."},
  {"input":"crush","word":"crush","level":"3","sentence":"Sarah had a cr_sh on her new classmate, Alex, and couldn't stop thinking about him during recess."},
  {"input":"former","word":"former","level":"2","sentence":"The fo__er mayor of our town is now working as a consultant for local businesses."},
  {"input":"still","word":"still","level":"1","sentence":"After watching the fireworks for hours, Sarah was st_ll tired and decided to go to bed"},
  {"input":"factory","word":"factory","level":"1","sentence":"The old toy fa___ry on Main Street was famous for making the best wooden trains and cars."},
];

const wordProblems = [
  {"problem":"There are 40 rooms in a motel and some rooms have a double bed while the others have a single bed. If the double beds cost $80 per night and the single beds cost $60 per night and the motel collected $2880 for a night, how many rooms with each type of bed are there?","expression":{"double beds":"x","single beds":"y","equation 1":"x + y = 40","equation 2":"80x + 60y = 2880"},"solution":{"double beds":20,"single beds":20},"prompt":"motel"},
  {"problem":"An absurd farmer charges $x per pumpkin and $y per zucchini. If he sells 3 pumpkins and 2 zucchinis for $20, but 5 pumpkins and 4 zucchinis cost $25, find the cost of each vegetable.","expression":"{equation1} = 3x + 2y = 20\n{equation2} = 5x + 4y = 25","solution":"x = 5, y = 5","prompt":"absurd"},
  {"problem":"An unreal creature has two traits. One trait is 3 times the other plus 5. The other trait is 2 times the first trait minus 1. What are the values of the two traits?","expression":{"equation1":"y = 3x + 5","equation2":"x = 2y - 1"},"solution":{"x":7,"y":22},"prompt":"unreal"},
  {"problem":"A drama club has 120 members. Some members are adults and some are teenagers. If there are 3 times as many adults as teenagers, how many adults and teenagers are there in the club?","expression":{"adults":"a","teenagers":"t","equation1":"a + t = 120","equation2":"a = 3t"},"solution":{"a":90,"t":30},"prompt":"dramatic"},
  {"problem":"In a bag of apples and oranges, there are 30 pieces of fruit in total. If the number of oranges is 5 more than twice the number of apples, how many of each are there?","expression":{"apples":"a","oranges":"2a + 5"},"solution":{"a":10,"oranges":25},"prompt":"example"},
  {"problem":"In a fair competition, the total points earned by Maya and Liam together are 90. Maya scored 6 points more than Liam. How many points did each of them score?","expression":"{eq1} y = x + 6\n{eq2} x + (x + 6) = 90","solution":"{x=30, y=36}","prompt":"ethic"},
  {"problem":"There are 100 tickets sold for a concert. Some tickets were sold at $10 each and some at $15 each. If the total amount collected was $1350, how many tickets of each type were sold?","expression":{"equation1":"10x + 15y = 1350","equation2":"x + y = 100"},"solution":{"x":60,"y":40},"prompt":"last"},
  {"problem":"A defensive line has 40 yards of space to cover. One defensive player covers 3x yards, while another defensive player covers 2x yards. How many yards does each player cover in total?","expression":{"equation1":"3x + 2x = 40","equation2":"5x = 40"},"solution":"8","prompt":"defense"},
  {"problem":"A database has 300 records in total. Some records are classified as type A and the rest are classified as type B. If there are 50 more type A records than type B records, how many records of each type are there?","expression":{"equation1":"A + B = 300","equation2":"A = B + 50"},"solution":{"A":175,"B":125},"prompt":"database"},
  {"problem":"A farmer has 100 acres of land that he wants to divide into two fields, one of which is twice as narrow as the other. How many acres should each field be to satisfy the farmer's requirements?","expression":{"equation1":"x + 2x = 100","equation2":"x = 2y"},"solution":"x = 60, y = 30","prompt":"narrow"},
  {"problem":"The prosecution presents two pieces of evidence. One piece of evidence is 3 times older than a witness, and the other piece is 5 years younger than twice the witness's age. If the combined age of the two pieces of evidence is 40, how old is the witness?","expression":{"equation1":"w + 3w = 40","equation2":"2w - 5 = 3w - 15"},"solution":"10","prompt":"prosecution"},
  {"problem":"Harmonica enthusiasts collect two types of harmonicas: vintage and modern. The total number of harmonicas collected is 15. Vintage harmonicas cost $80 each, while modern harmonicas cost $40 each. If the total amount spent on the harmonicas is $680, how many of each type of harmonicas did they collect?","expression":{"equation1":"v + m = 15","equation2":"80v + 40m = 680"},"solution":{"v":2,"m":13},"prompt":"harmonica"},
  {"problem":"A passionate baker creates two delicious pastries. One pastry contains 3 times the flour as the other. The total amount of flour used for both pastries is 12 cups. How much flour did each pastry use?","expression":"{2x + 3x = 12}","solution":"{x = 4, 2x = 8}","prompt":"passion"},
  {"problem":"A mischievous squirrel hides 12 nuts in two different trees. In one tree, he hides 3 times as many nuts as in the other. How many nuts are hidden in each tree?","expression":{"equation1":"x + y = 12","equation2":"x = 3y"},"solution":{"x":9,"y":3},"prompt":"perverse"},
  {"problem":"There are 100 students who took an examination. Some students scored 80% and others scored 70%. If the total score of all students is 8400, how many students scored 80% and how many scored 70%?","expression":{"80% students":80,"70% students":70},"solution":{"80% students":60,"70% students":40},"prompt":"examination"},
  {"problem":"A therapist has discovered two exercises that can help patients recover from paralysis. Exercise A reduces muscle stiffness by 3 times more than exercise B. Together, the two exercises reduce muscle stiffness by 24 units. How much does each exercise reduce muscle stiffness?","expression":{"equation 1":"3x + y = 24","equation 2":"x + y = 8"},"solution":{"x":4,"y":4},"prompt":"paralysis"},
  {"problem":"There are 124 birds outside the house. Some of them are blue jays and the rest are cardinals. If there are 3 times as many blue jays as cardinals, how many blue jays are there outside the house?","expression":{"equation1":"b + c = 124","equation2":"b = 3c"},"solution":"b = 97, c = 33","prompt":"outside"},
  {"problem":"A tailor has 12 yards of fabric and 8 yards of lining. How many coats can he make if each coat requires 3 yards of fabric and 2 yards of lining?","expression":{"equation1":"3x + 2y = 12","equation2":"x + y = 8"},"solution":{"x":4,"y":4},"prompt":"clothe"},
  {"problem":"A farmer has 100 acres of land. He plants corn on 3x acres and soybeans on 2x acres. How many acres of each crop did he plant if he used all of his land?","expression":{"equation1":"3x + 2x = 100","equation2":"x = 20"},"solution":"The farmer planted 60 acres of corn and 40 acres of soybeans.","prompt":"slogan"},
  {"problem":"A group of friends bought 12 beers and 8 snacks for a party. Each beer costs $3 more than the snacks. How much did they spend on snacks and beers altogether? If a beer costs x dollars and a snack costs y dollars, write an algebraic expression to represent the total amount spent.","expression":"12x + 8y = 192","solution":"x = 15, y = 12","prompt":"beer"},
  {"problem":"There are 12 green marbles in a bag. Some of the marbles are blue and the rest are green. If the number of blue marbles is 3 less than half the number of green marbles, how many green marbles are there? How many blue marbles are there?","expression":{"equation1":"g + b = 12","equation2":"b = (g/2) - 3"},"solution":{"green marbles":9,"blue marbles":3},"prompt":"green"},
  {"problem":"There are 50 students in a class and their average score on a test is 80%. How many students scored above 80% and how many scored below 80%? Let x be the number of students who scored above 80% and y be the number of students who scored below 80%.","expression":" { x + y = 50 \n 80x + 20y = 4000 }","solution":"{ x = 40 \n y = 10 }","prompt":"average"},
  {"problem":"There are 100 chickens and cows on a farm. If the chickens outnumber the cows by 20, how many chickens and cows are there on the farm?","expression":"{x + y = 100, x - y = 20}","solution":{"x":60,"y":40},"prompt":"shit"},
  {"problem":"A farmer has 100 acres of land. He plants wheat on 3x acres and barley on 2x acres. How many acres did he plant in wheat and barley combined?","expression":{"equation1":"3x + 2x = 100","equation2":"x = 20"},"solution":"20 acres of wheat and 40 acres of barley were planted.","prompt":"wheedle"},
  {"problem":"A parachutist jumps from an airplane with a main parachute and a reserve parachute. The main parachute slows the parachutist down by 3 meters per second, while the reserve parachute slows the parachutist down by 2 meters per second. If after deploying both parachutes the parachutist is still descending at a rate of 1 meter per second, what is the combined rate of descent of both parachutes?","expression":{"equation1":"y = 3x + c","equation2":"y = 2x + c","equation3":"y = x + c","variables":{"y":"rate of descent after deploying parachutes","x":"rate of descent before deploying parachutes","c":"constant representing initial velocity"}},"solution":"x = -1 meter/second","prompt":"parachute"},
  {"problem":"A train travels 300 miles in 5 hours. If the speed of the train is x miles per hour and the distance is y miles, what are the values of x and y?","expression":"{x} + {y} = 300, {y} = 5{x}","solution":"{x} = 60, {y} = 300","prompt":"imply"},
  {"problem":"There are 12 fish in a pond, some are pikes and the rest are catfish. If the total length of all the pikes is 30 inches and all the catfish are 8 inches each, how many pikes are there?","expression":{"equation1":"p + c = 12","equation2":"p * 3 + 8c = 30","variables":{"p":"number of pikes","c":"number of catfish"}},"solution":{"p":6,"c":6},"prompt":"pike"},
  {"problem":"There are 24 eggs in a basket, some laid by hens and some by roosters. If the hens laid 3 times as many eggs as roosters, how many eggs did each type of bird lay?","expression":{"hens":3,"roosters":1},"solution":{"hens":18,"roosters":6},"prompt":"chicken"},
  {"problem":"A newscaster is preparing a report with a banner headline and a short news story. The headline banner is 3 times longer than the news story. If the headline banner is 18 inches long, how long is the news story?","expression":{"headline":18,"story":18,"headline_length":3,"story_length":1},"solution":"The news story is 6 inches long.","prompt":"newscaster"},
  {"problem":"There are 100 students enrolled in a school program. Some students are taking music and the rest are taking art. If 40 students are taking music, how many students are taking art?","expression":{"equation1":"m + a = 100","equation2":"m = 40"},"solution":{"a":60},"prompt":"program"},
  {"problem":"There are 100 whispers in the wind. Some whispers are strong and each strong whisper is 3 times louder than a weak whisper. How many strong whispers are there if there are 4 times as many weak whispers as strong whispers?","expression":{"equation1":"S + W = 100","equation2":"S = 3W"},"solution":{"S":40,"W":60},"prompt":"whisper"},
  {"problem":"There are 12 friends at a party. Some of them give each other hugs, and each hug is shared between two friends. If there are 48 hugs given in total, how many friends are giving hugs to others?","expression":{"equation1":"x + y = 12","equation2":"2x + 2y = 48"},"solution":"x = 6, y = 6","prompt":"hug"},
  {"problem":"Concerning a school fundraiser, ticket sales generate $25 for adults and $15 for students. If 3 times the adult tickets sold is equal to 5 times the student tickets sold, how many adult and student tickets were sold in total? (Let A be the number of adult tickets and S be the number of student tickets.)","expression":{"equation1":"25A + 15S = 500","equation2":"3A = 5S"},"solution":{"A":20,"S":12},"prompt":"concerning"},
  {"problem":"A train travels 240 miles in 4 hours. Another train travels 300 miles in 5 hours. How many miles per hour does each train travel frequently?","expression":{"train 1":"240 / 4 = x","train 2":"300 / 5 = y"},"solution":{"x":60,"y":60},"prompt":"frequently"},
  {"problem":"A farmer has 100 acres of land and wants to plant corn and soybeans. Each acre of corn requires 30 hours of labor, while each acre of soybeans requires 20 hours of labor. He has 1800 hours of labor available. How many acres of each crop should he plant to maximize his use of the available labor?","expression":{"equation1":"c + s = 100","equation2":"30c + 20s = 1800"},"solution":{"c":60,"s":40},"prompt":"realization"},
  {"problem":"A baker has 24 pounds of flour and 12 pounds of sugar. How many pounds of each should the baker use to make 3 batches of warm cookies if each batch requires 3 pounds of flour and 2 pounds of sugar?","expression":"{F} = 3{B} + 3, {S} = 2{B} + 2","solution":"{F} = 15, {S} = 10","prompt":"warmly"},
  {"problem":"There are two types of cells in the retina: rods and cones. Rods are 5 times less numerous than cones. Together, they make up 98% of the retinal cells. How many of each type of cell are there if there are 100,000 total retinal cells?","expression":{"cones":"c","rods":"c/5"},"solution":{"cones":95000,"rods":1500},"prompt":"retina"},
  {"problem":"Neatly organize a collection of books with 120 books and 240 books so that the total number of books in the first stack is 3x and the total number of books in the second stack is 2x + 40. Find the values of x that represent the number of books in each stack.","expression":{"stack1":3,"stack2":2,"pages":[120,240]},"solution":{"x":20},"prompt":"neatly"},
  {"problem":"There are 50 pounds of rye in a bag. Some of the rye is ground into flour, and the rest is left whole. If the amount of flour is 3 times less than the amount of whole rye left, how many pounds of rye are in flour and how many pounds are left whole?","expression":{"flour":"3x","whole":"x"},"solution":{"flour":15,"whole":35},"prompt":"rye"},
  {"problem":"During an evacuation, there are 1200 people to be transported to safety. Some are transported by buses with 40 people capacity, while others are transported by trucks with 10 people capacity. How many buses and trucks are needed to transport everyone if buses carry twice as many people as trucks?","expression":{"buses":40,"trucks":10},"solution":{"buses":30,"trucks":30},"prompt":"evacuation"},
  {"problem":"A farmer has 100 seeds and wants to plant them in rows and columns. The number of rows is 5 times the number of columns. How many rows and columns can he plant the seeds in?","expression":{"rows":5,"columns":"x","equation1":"rows + columns = 100","equation2":"rows = 5 * columns"},"solution":{"columns":20,"rows":100},"prompt":"sprig"},
  {"problem":"Affable Sam sold tickets for a school fundraiser. Adult tickets cost $10 each and student tickets cost $5 each. He sold a total of 200 tickets and collected $1750. How many adult and student tickets did he sell?","expression":{"equation1":"A + S = 200","equation2":"10A + 5S = 1750"},"solution":{"A":150,"S":50},"prompt":"affable"},
  {"problem":"An artist has 120 paintings to sell. Some of them are abstract and the rest are landscapes. The abstract paintings cost $50 each and the landscape paintings cost $75 each. If the artist sells all of the paintings and makes a total of $8750, how many abstract paintings did they sell?","expression":{"equation1":"a + l = 120","equation2":"50a + 75l = 8750"},"solution":"a = 60, l = 60","prompt":"elude"},
  {"problem":"Sarah has 12 more stickers than Liam. Together, they have 50 stickers. How many stickers does each of them have?","expression":{"equation1":"L + S = 50","equation2":"S = L + 12"},"solution":{"L":38,"S":50},"prompt":"impatience"},
  {"problem":"There are 100 students in a class. Some students are boys and some are girls. If there are 40 more girls than boys, how many boys and girls are there in the class?","expression":"{x + y = 100, y = x + 40}","solution":"{x = 40, y = 60}","prompt":"upright"},
  {"problem":"An evangelist sold x adult tickets and y children's tickets for a fundraiser. Adult tickets cost $20 each and children's tickets cost $10 each. If they sold a total of 300 tickets and collected $5000 in ticket sales, write two equations that represent this situation and solve them to find the number of adult and children's tickets sold.","expression":{"equation1":"x + y = 300","equation2":"20x + 10y = 5000"},"solution":{"x":100,"y":200},"prompt":"evangelist"},
  {"problem":"Maria has completed 3 more art projects than math projects. If she has completed a total of 10 art and math projects, how many art projects has she completed?","expression":{"art projects":"a","math projects":"b","equation 1":"a = b + 3","equation 2":"a + b = 10"},"solution":"a = 7, b = 4","prompt":"proficiency"},
  {"problem":"A storm produces 30 pounds of hail. One type of hail is twice as heavy as the other. How much does each type of hail weigh?","expression":"{ x + 2x = 30 } and { x = 2y }","solution":"{ x = 20, y = 10 }","prompt":"hail"},
  {"problem":"An artist spent $3x + 5 on art supplies and $2y + 2 on canvas. If she spent a total of $50 on these items, write an equation that represents this situation.","expression":"{3x + 5} + {2y + 2} = 50","solution":"{x = 8, y = 14}","prompt":"extravagant"},
  {"problem":"Please share 10 cookies equally between 3 friends and 2 family members. How many cookies should each friend and family member get?","expression":{"friend":"x","family":"y","equation1":"3x + 2y = 10","equation2":"x + y = 5"},"solution":{"friend":3,"family":2},"prompt":"please"},
  {"problem":"A playful dog has 12 toys in total. Some toys are tennis balls and the rest are chew toys. If the number of tennis balls is represented by x and the number of chew toys is represented by y, write two equations that represent the total toys and the difference between tennis balls and chew toys is 5.","expression":{"equation1":"x + y = 12","equation2":"x - y = 5"},"solution":{"x":8,"y":4},"prompt":"playful"},
  {"problem":"Since Sarah spent $3 on notebooks and pencils, and she spent $5 on pens and erasers, how much did she spend in total? If pens cost $2 more than notebooks, and erasers cost $1 less than pencils, find the cost of each item.","expression":{"total":"3x + 5y","pencils":"x + 2","erasers":"y - 1"},"solution":{"x":4,"y":3},"prompt":"since"},
  {"problem":"During Homecoming, there were 300 students at the game. Some students were cheering and some were dancing. There were 75 more students cheering than dancing. How many students were cheering and how many were dancing?","expression":{"cheering":"x + 75","dancing":"x"},"solution":{"cheering":237.5,"dancing":162.5},"prompt":"homecoming"},
  {"problem":"A contemplative artist spends 3 hours painting and 2 hours sketching. How many total hours did the artist spend on these two activities?","expression":{"equation1":"p + s = h","equation2":"p = 3h - 2s","variables":{"p":"hours spent painting","s":"hours spent sketching","h":"total hours spent"},"solution":"p = 3(2) - 2(3) = 6 - 6 = 0","solution2":"s = 2(2) = 4"},"prompt":"contemplative"},
  {"problem":"A thief stole 12 apples and 8 oranges from the store. If the total value of the stolen fruits is $10, how much did each type of fruit cost? Let the cost of an apple be x and the cost of an orange be y.","expression":"{x + y = 20, 4x + 3y = 10}","solution":"{x = 2, y = 3}","prompt":"steal"},
  {"problem":"A peasant has 12 coins and some eggs. If he sells 3 coins for 2 eggs each, he will have 17 eggs. How many coins and eggs does the peasant have?","expression":{"coins":"x","eggs":"y","equation1":"x + y = 12","equation2":"x - (3 * 2) = y + 17"},"solution":{"coins":6,"eggs":6},"prompt":"peasant"},
  {"problem":"During the weekend, Sarah spent 3 hours drawing and 2 hours reading. How many total hours did she spend on these activities? Let d be the hours spent drawing and r be the hours spent reading.","expression":{"equation1":"d + r = 5","equation2":"d = r + 1"},"solution":{"step1":"Substitute the second equation into the first equation: (r + 1) + r = 5","step2":"Combine like terms: 2r + 1 = 5","step3":"Solve for r: 2r = 4, r = 2","step4":"Substitute the value of r back into the second equation: d = 2 + 1, d = 3"},"prompt":"weekend"},
  {"problem":"A train travels 120 kilometers in 2 hours. Another train travels 180 kilometers in 3 hours. At what constant speed do both trains travel, in kilometers per hour? Express your answer as a rate.","expression":{"equation1":"v = (120 / 2)","equation2":"v = (180 / 3)"},"solution":"v = 60 km/h","prompt":"intercept"},
  {"problem":"During a lunar phase, the length of the illuminated portion of the moon changes. One night, the illuminated portion is x kilometers and the shadowed portion is y kilometers. If the total area of the moon is 36 million square kilometers, find the algebraic expressions for the area of the illuminated and shadowed portions.","expression":{"illuminated":0.5435435435435436,"shadowed":0.4564564564564565},"solution":"The area of the illuminated portion is 19.44 million square kilometers and the area of the shadowed portion is 16.56 million square kilometers.","prompt":"phase"},
  {"problem":"A reactor has 100 gallons of coolant. Some of the coolant is drained out and replaced with a new solution that is 50% concentrated. After the replacement, the reactor has 80 gallons of coolant remaining. How many gallons of coolant were drained out and how many gallons of the new solution were added?","expression":{"equation1":"c + n = 100","equation2":"80 = 100 - (c/2)","variables":{"c":"gallons of coolant drained out","n":"gallons of new solution added"}},"solution":{"c":20,"n":80},"prompt":"reactor"},
  {"problem":"Flora has 30 flower pots and 20 plants. Some pots hold 2 plants each, while the others hold 3 plants each. How many pots hold 2 plants and how many hold 3 plants if she wants to use all the plants?","expression":{"equation1":"2x + 3y = 30","equation2":"x + 3y = 20"},"solution":{"x":10,"y":6},"prompt":"flora"},
  {"problem":"There are 50 employees in a company. Some of them are lawyers and the rest are engineers. If there are 10 more lawyers than engineers, how many lawyers are there in the company?","expression":{"equation1":"L + E = 50","equation2":"L = E + 10"},"solution":{"L":30,"E":20},"prompt":"occupation"},
  {"problem":"There are 120 people on a ferry. Some of them are adults and some are children. The number of adults is 5 more than twice the number of children. How many adults and children are there on the ferry?","expression":{"equation1":"A + C = 120","equation2":"A = 2C + 5"},"solution":{"A":85,"C":35},"prompt":"mainland"},
  {"problem":"A contractor is building a rectangular shed with a length that is 5 meters longer than the width. The total area of the shed is 40 square meters. Find the length and width of the shed.","expression":{"length":"x + 5","width":"x"},"solution":{"equation1":"x + 5 = (length)","equation2":"x * (x + 5) = 40","solution":"x = 5, length = 10"},"prompt":"construe"},
  {"problem":"A seller has 120 apples and 80 oranges to sell. Each apple costs $2 and each orange costs $1.50. How much money will the seller make from selling all the fruits?","expression":{"apples":120,"oranges":80,"apple_price":2,"orange_price":1.5},"solution":240,"prompt":"seller"},
  {"problem":"A farmer has 120 acres of land. He plants wheat on 3x acres and barley on 2y acres. If he plants a total of 80 acres of wheat and barley, how many acres of each crop did he plant?","expression":{"equation1":"3x + 2y = 80","equation2":"x + y = 120"},"solution":{"x":40,"y":80},"prompt":"tout"},
  {"problem":"An indignant farmer has 12 acres of land to cultivate. He plans to plant corn and soybeans on the land. The corn requires 3 times more land than soybeans. How many acres of each crop should the farmer plant?","expression":{"equation 1":"C + S = 12","equation 2":"C = 3S"},"solution":{"C":9,"S":3},"prompt":"indignant"},
  {"problem":"An optometrist has a collection of blue and green eye glasses with a total of 12 pairs. If the number of blue glasses is 4 more than the number of green glasses, how many green glasses does the optometrist have?","expression":{"equation1":"b + g = 12","equation2":"b = g + 4"},"solution":"g = 8","prompt":"eye"},
  {"problem":"An apple orchard has 350 trees and produces 25% more apples than it did last year. How many apples did the orchard produce this year if each tree produces 20 more apples than last year?","expression":{"equation1":"x + y = 350","equation2":"y = 1.25x + 20"},"solution":"x = 200, y = 250","prompt":"apple"},
  {"problem":"A train travels 180 miles in 3 hours. If the speed of the train in miles per hour is x and the travel time in hours is y, write two equations that represent the distance and time traveled. How fast is the train and how many hours did it take to travel 180 miles?","expression":{"distance equation":"x * y = 180","time equation":"y = 3"},"solution":{"speed":"x = 60 mph","time":"y = 3 hours"},"prompt":"hasten"},
  {"problem":"A plate of pasta costs $10, and a plate of chicken parmesan costs $15. If you order both dishes, how much will it cost in total?","expression":{"equation1":"p + c = 25","equation2":"p = 10","variables":{"p":"Price of the pasta dish","c":"Price of the chicken parmesan dish"}},"solution":35,"prompt":"plate"},
  {"problem":"There are 12 people in a coffeehouse. Some people order coffee and others order tea, and there are 5 more coffee orders than tea orders. How many coffee and tea orders are there?","expression":{"coffee":"c","tea":"t","equation1":"c + t = 12","equation2":"c = t + 5"},"solution":{"c":7,"t":5},"prompt":"coffeehouse"},
  {"problem":"A farmer has 100 acres of land and wants to plant barley and wheat. The barley requires 4 times more land than wheat. How many acres of each type of grain can the farmer plant?","expression":{"barley":"4x","wheat":"x"},"solution":"x = 20 (wheat), barley = 80 (barley)","prompt":"temperate"},
  {"problem":"A farmer has 100 acres of land. He wants to allocate some land for growing corn and some land for growing soybeans. The amount of land allocated for corn must be 5 times greater than the amount of land allocated for soybeans. How many acres of land should he allocate for each crop?","expression":{"corn":"5x","soybeans":"x"},"solution":"x = 20 (soybeans), corn = 100 - 20 = 80","prompt":"entrench"},
  {"problem":"Maya and Liam are hiking through the forest. Maya has traveled 3 times as far as Liam. Together, they have covered 8 kilometers. How far has each of them hiked?","expression":{"maya":3,"liam":1},"solution":{"maya":6,"liam":2},"prompt":"trudge"},
  {"problem":"There are 20 students in a preparatory class. Some students are boys and the rest are girls. If there are 3 more girls than boys, how many boys and girls are there in the class?","expression":{"equation 1":"b + g = 20","equation 2":"g = b + 3"},"solution":{"b":8,"g":12},"prompt":"preparatory"},
];

const probabilityProblems = [
  {"problem":"There are 120 students in a class. 60% of them prefer chocolate ice cream, and 20% of them prefer vanilla ice cream. How many students prefer chocolate ice cream, and how many prefer vanilla ice cream?","expression":"Chocolate: 0.6 * 120, Vanilla: 0.2 * 120","solution":"Chocolate: 72 students, Vanilla: 24 students","prompt":"feedback"},
  {"problem":"There are 200 sailors in the Navy. 30% of them are officers. How many sailors are officers?","expression":"200 * 0.3","solution":"60","prompt":"navy"},
  {"problem":"There are 30 marbles in a jar, 12 of which are blue. If you reach into the jar and grab 5 marbles, what is the probability that exactly 3 of them are blue?","expression":"P(3 blue) = 12C3 / 30C5","solution":"P(3 blue) = 220 / 1440 = 11 / 72","prompt":"swollen"},
  {"problem":"There are 12 different fabrics with different textures. 3 of them have a rough texture, 5 have a smooth texture, and 4 have a soft texture. What is the probability of selecting a fabric with a rough texture or a smooth texture from the group?","expression":"P(Rough) + P(Smooth) - P(Rough and Smooth)","solution":"3/12 + 5/12 - 0 = 8/12 = 2/3","prompt":"texture"},
  {"problem":"There are 24 icy treats in a freezer, 12 of which are popsicles. If you randomly select 3 treats from the freezer, what is the probability that at least one of them is a popsicle? Express your answer as a fraction in simplest form.","expression":"1 - (21/24)^3","solution":"1 - 9/16 = 7/16","prompt":"frigid"},
  {"problem":"There are 12 red marbles and 8 blue marbles in a jar. If you randomly select 3 marbles from the jar, what is the probability that exactly two of them are red? Express the probability as a fraction in simplest form.","expression":"3C2 * 12/20","solution":"3/5","prompt":"earn"},
  {"problem":"There are 12 red marbles and 8 blue marbles in a jar. What is the probability of randomly selecting a red marble from the jar?","expression":"P(red) = 12 / (12 + 8)","solution":"P(red) = 12 / 20 = 0.6 or 60%","prompt":"unify"},
  {"problem":"There are 120 patients in a hospital. 60% of them received a new treatment, while the rest received the old treatment. How many patients received the new treatment?","expression":"120x - 120(1-x)","solution":"72 patients received the new treatment.","prompt":"treatment"},
  {"problem":"There are 48 holes in a grid, 25 of which are covered with dirt. What is the probability that a randomly chosen hole is covered with dirt?","expression":"P(covered) = 25/48","solution":"0.5208 or 52.08% of the holes are covered with dirt.","prompt":"hole"},
  {"problem":"There is a 25% chance of rain in a specific area. If there are 100 people surveyed, how many of them would you expect to say it will rain?","expression":"0.25 * 100","solution":25,"prompt":"gale"},
  {"problem":"There are 48 marbles in a jar, 24 of which are blue. If you randomly pick 3 marbles from the jar, what is the probability that exactly two of them are blue? Express your answer as a fraction in simplest form.","expression":"P(2 blue) = (24C2 * 24C1) / 48C3","solution":"P(2 blue) = (24*23) / (48*47*46) = 13/504","prompt":"unaccountable"},
  {"problem":"There are 12 red marbles and 8 blue marbles in a jar. If you randomly pick 3 marbles from the jar without replacement, what is the probability that exactly two of them are red?","expression":"P(2 red) = (12/20) * (11/19) * (8/18)","solution":"0.354","prompt":"start"},
  {"problem":"There are 20 marbles in a bag, 6 of which are red. What is the probability of randomly selecting a red marble from the bag?","expression":"P(red) = 6/20","solution":"P(red) = 3/10","prompt":"baggy"},
  {"problem":"An innkeeper has 30 rooms in his hotel. 12 rooms are occupied, and the rest are available. What is the probability that a randomly chosen room is available?","expression":"P(available) = (30-12) / 30","solution":"P(available) = 18 / 30 = 3 / 5 = 0.6 or 60%","prompt":"innkeeper"},
  {"problem":"There are 20 students in a class, 8 of whom are rebels. If you randomly choose 3 students, what is the probability that exactly 2 of them are rebels? Express your answer as a fraction in simplest form.","expression":"P(2 rebels) = (8C2 * 12C1) / 20C3","solution":"P(2 rebels) = (28*12) / 120 = 336 / 120 = 7 / 10","prompt":"rebel"},
  {"problem":"There are 3 red marbles and 5 blue marbles in a jar. If you randomly select two marbles from the jar, what is the probability that both of them will be red? Express the probability as a fraction in simplest form.","expression":"3/8 * 3/8","solution":"9/64","prompt":"interesting"},
  {"problem":"There are 24 flower arrangements in a shop, 9 of them have roses. What is the probability that a randomly chosen arrangement has roses?","expression":"P(roses) = 9/24","solution":"P(roses) = 3/8","prompt":"centerpiece"},
  {"problem":"There are 100 cookies in a jar, 40 of them are chocolate chip. What is the probability that a randomly selected cookie from the jar is chocolate chip?","expression":"P(chocolate chip) = 40 / 100","solution":"P(chocolate chip) = 4 / 10 = 2 / 5","prompt":"quality"},
  {"problem":"There are 12 lush ferns in a garden, 5 of them are mature. What is the probability that a randomly chosen fern from the garden is mature?","expression":"P(mature) = 5/12","solution":"The probability of choosing a mature fern is 5 out of 12, or 5/12.","prompt":"lush"},
  {"problem":"There are 30 cookies in a jar and 8 friends want to share them equally. What is the probability that any given friend will get 3 or fewer cookies?","expression":"P(x ≤ 3) = (3 + 2x + x^2) / 30","solution":"P(x ≤ 3) = (3 + 2(8) + 8^2) / 30 = 73 / 30 = 24.33% of the friends will get 3 or fewer cookies.","prompt":"remainder"},
  {"problem":"There are 12 gum drops in a bag, 5 of them are cherry flavored. What is the probability that a randomly selected gum drop from the bag is cherry flavored? Express the probability as a fraction in simplest form.","expression":"P(cherry) = 5/12","solution":"The probability of selecting a cherry flavored gum drop is 5 out of 12, or 5/12.","prompt":"chew"},
  {"problem":"There is a jar filled with soil samples from different parts of a forest. 1/3 of the samples contain clay, 2/5 of the samples contain sand, and 1/5 of the samples contain both clay and sand. What is the probability that a randomly chosen soil sample from the jar contains either clay or sand?","expression":"P(clay) + P(sand) - P(clay and sand)","solution":"1/3 + 2/5 - 1/5 = 13/15","prompt":"soil"},
  {"problem":"There are 36 marbles in a jar, 18 of which are red. What is the probability of randomly selecting a red marble from the jar?","expression":"P(red) = 18 / 36","solution":"P(red) = 1 / 2","prompt":"setting"},
  {"problem":"There are 3 red marbles and 5 blue marbles in a bag. What is the probability of randomly selecting a red marble from the bag?","expression":"3/8","solution":"3/8 = 3/ (3 + 5)","prompt":"demonstration"},
  {"problem":"There are 3 red marbles and 5 blue marbles in a jar. What is the probability of randomly selecting a red marble from the jar?","expression":"3 / (3 + 5)","solution":"3 / 8","prompt":"addition"},
  {"problem":"There are 100 students in a class, 60 of whom are healthy. If a student is randomly selected from the class, what is the probability that the student is not healthy? Express the probability as a fraction in simplest form.","expression":"P(not healthy) = 1 - (60/100)","solution":"P(not healthy) = 1 - 3/5 = 2/5","prompt":"infirmity"},
  {"problem":"There are 12 red marbles and 8 blue marbles in a jar. If you randomly pick 3 marbles from the jar, what is the probability that exactly 2 of them are red?","expression":"P(2 red) = (12C2 * 8C1) / (20C3)","solution":"0.48","prompt":"vouch"},
  {"problem":"There are 3 red marbles and 5 blue marbles in a bag. What is the probability of randomly selecting a red marble from the bag?","expression":"3/8","solution":"3/8 = 3/ (3 + 5)","prompt":"rigorous"},
  {"problem":"There are 30 students in a class, 12 of whom prefer pizza. What is the probability that a randomly selected student prefers pizza?","expression":"P(pizza) = 12/30 = 4/10","solution":"The probability of randomly selecting a student who prefers pizza is 4 in 10 or 40%.","prompt":"prevail"},
  {"problem":"There are 100 bills in a jar, 40 of them are worth $1 and the rest are worth $5 each. What is the probability that a randomly selected bill is worth $5?","expression":"P(bill is $5) = 60/100","solution":"0.6 or 60%","prompt":"debtor"},
  {"problem":"There are 3 red marbles and 5 blue marbles in a jar. If you randomly pick 2 marbles from the jar, what is the probability that both marbles will be red? Express your answer as a fraction in simplest form.","expression":"P(red) * P(red) = (3/8) * (3/8) = 9/64","solution":"The probability of picking a red marble on the first pick is 3/8. The probability of picking a red marble on the second pick is also 3/8. So, the probability of picking both marbles being red is the multiplication of these two probabilities: 9/64.","prompt":"inconvenience"},
  {"problem":"A bag contains 3 red marbles, 5 blue marbles, and 2 green marbles. If you randomly choose 2 marbles from the bag, what is the probability that both marbles will be blue?","expression":"P(blue and blue) = (5/10) * (5/10)","solution":"1/4 or 25% of the time","prompt":"generation"},
  {"problem":"There are 40 students in a class, 15 of whom are boys. What is the probability that a randomly chosen student is a boy?","expression":"P(boy) = 15 / 40","solution":"P(boy) = 3 / 8","prompt":"victim"},
  {"problem":"There are 3 red marbles, 4 blue marbles, and 2 green marbles in a jar. If you randomly select two marbles from the jar without replacement, what is the probability that both marbles will be red? Express your answer as a fraction in simplest form.","expression":"3/10 * 3/10","solution":"9/100","prompt":"interference"},
  {"problem":"There are 3 red marbles, 5 blue marbles, and 2 green marbles in a fountain. What is the probability of randomly selecting a red or blue marble from the fountain?","expression":"P(red) + P(blue) = (3/10) + (5/10) = 8/10","solution":"The probability of randomly selecting a red or blue marble from the fountain is 8/10 or 4/5.","prompt":"fountain"},
  {"problem":"There are 40 marbles in a jar, 15 of them are red. If you randomly select 3 marbles from the jar without replacement, what is the probability that exactly two of them are red?","expression":"P(2 red) = (15/40) * (14/39) * (21/38)","solution":"0.277","prompt":"precisely"},
  {"problem":"There are 4 red marbles, 3 blue marbles, and 2 green marbles in a bag. If you randomly choose 2 marbles from the bag, what is the probability that both marbles will be red?","expression":"P(red) * P(red) = (4/9) * (4/9)","solution":"16/81","prompt":"strategic"},
  {"problem":"There are 30 students in a class, 15 of whom are boys. What is the probability that a randomly chosen student is a boy?","expression":"P(boy) = 15 / 30 = 1 / 2","solution":"The probability of randomly choosing a boy from the class is 1 / 2 or 50%.","prompt":"alpha"},
  {"problem":"There are 30 students in a class, 12 of whom are fearful of spiders. What is the probability that a randomly selected student is fearful of spiders?","expression":"P(fearful) = 12/30","solution":"P(fearful) = 4/10 = 2/5","prompt":"fearful"},
  {"problem":"There are 3 red marbles and 5 blue marbles in a bag. If you randomly pick two marbles from the bag without replacement, what is the probability that both marbles will be red?","expression":"P(Red) * P(Red) = (3/8) * (3/7)","solution":"9/56","prompt":"restraint"},
  {"problem":"There are 40 marbles in a jar, 15 of which are blue. If you reach into the jar and grab a marble without knowing its color, what is the probability that it will be blue? Express your answer as a fraction in simplest form.","expression":"P(blue) = 15 / 40 = 3 / 8","solution":"The probability of grabbing a blue marble is 3 in 8 or 3/8.","prompt":"generally"},
  {"problem":"There are 3 red marbles and 5 blue marbles in a bag. If you randomly choose two marbles from the bag without replacement, what is the probability that both marbles will be red?","expression":"P(red) * P(red) = (3/8) * (3/7)","solution":"9/56","prompt":"similar"},
  {"problem":"There are 3 red marbles and 5 blue marbles in a bag. If you randomly pick 2 marbles from the bag, what is the probability that both marbles will be red?","expression":"P(red) * P(red) = (3/8) * (3/8)","solution":"9/64","prompt":"dabble"},
  {"problem":"An inventor has 12 prototypes and 5 of them are functional. What is the probability that a randomly chosen prototype is functional?","expression":"P(functional) = 5/12","solution":"0.42 or 42% of the prototypes are functional.","prompt":"inventor"},
  {"problem":"There are 3 red marbles and 5 blue marbles in a bag. If you randomly select 2 marbles from the bag, what is the probability that both are red? Express the probability as a fraction in simplest form.","expression":"P(red and red) = 3/8 * 3/8","solution":"9/64","prompt":"spill"},
  {"problem":"There are 24 tea leaves in a jar, 9 of them are green and the rest are black. What is the probability of randomly selecting a green tea leaf from the jar?","expression":"P(green) = 9/24","solution":"0.375 or 37.5%","prompt":"tea"},
  {"problem":"There are 12 red marbles and 8 blue marbles in a jar. What is the probability of randomly selecting a red marble from the jar?","expression":"P(red) = 12 / (12 + 8)","solution":"P(red) = 12 / 20 = 0.6 or 60%","prompt":"possibility"},
  {"problem":"There are 24 students in a class, 12 of whom are girls. What is the probability that a randomly selected student is a girl?","expression":"P(girl) = 12/24 = 1/2","solution":"The probability of selecting a girl from the class is 1 in 2 or 50%.","prompt":"compilation"},
  {"problem":"There are 12 red marbles and 8 blue marbles in a jar. What is the probability of randomly selecting a red marble from the jar?","expression":"P(red) = 12 / (12 + 8)","solution":"P(red) = 12 / 20 = 0.6 or 60% of the marbles in the jar are red.","prompt":"embed"},
  {"problem":"There are 7 asteroids in a belt, of which 3 are classified as near-Earth asteroids. What is the probability of randomly selecting an asteroid that is not a near-Earth asteroid? Express the probability as a fraction in simplest form.","expression":"P(not near-Earth) = 4/7","solution":"The probability of selecting an asteroid that is not a near-Earth asteroid is 4 out of 7, or 4/7.","prompt":"asteroid"},
  {"problem":"There are 4 red marbles and 3 blue marbles in a jar. If you randomly select 2 marbles from the jar, what is the probability that both are red? Express your answer as a fraction in simplest form.","expression":"P(red) = 4/7 * 4/7","solution":"16/49","prompt":"retrieval"},
  {"problem":"There are 24 students in a class, and 9 of them are boys. What is the probability that a randomly chosen student is a boy? Express your answer as a fraction in simplest form.","expression":"9/24 = 3/8","solution":"The probability of randomly selecting a boy from the class is 3/8.","prompt":"resistance"},
  {"problem":"There are 3 red marbles, 5 blue marbles, and 2 green marbles in a jar. If you randomly pick 2 marbles from the jar, what is the probability that both of them will be red? Express your answer as a fraction in simplest form.","expression":"3/10 * 3/10","solution":"9/100","prompt":"truly"},
  {"problem":"There are 30 students in a class, 12 of them are boys. What is the probability that a randomly selected student is a boy?","expression":"P(boy) = 12/30","solution":"0.4 or 40% of the students are boys.","prompt":"profession"},
  {"problem":"There are 24 colorful markers in a box. 3/4 of the markers are red. How many markers are not red?","expression":"24 - (24 * 3/4)","solution":"6 markers","prompt":"coloring"},
  {"problem":"There are 20 students in a class, 5 of whom are known as 'snobs'. If you randomly select 3 students from the class, what is the probability that exactly 2 of them are 'snobs'?","expression":"P(2 snobs and 1 non-snob) = (5/20) * (4/19) * (15/19)","solution":"0.14 or 14%","prompt":"snob"},
  {"problem":"There are 12 red apples and 8 green apples in a bowl. What is the probability of randomly selecting a red apple from the bowl?","expression":"P(red) = 12 / (12 + 8)","solution":"0.6","prompt":"muzzle"},
  {"problem":"There are 9 red marbles and 6 blue marbles in a bag. What is the probability of randomly selecting a red marble from the bag?","expression":"P(red) = 9 / (9 + 6)","solution":"0.6","prompt":"three"},
  {"problem":"There are 30 students in a class. 12 students prefer pizza, and 18 students prefer hamburgers. What is the probability that a randomly chosen student prefers pizza?","expression":"P(pizza) = 12 / 30 = 4 / 10","solution":"The probability of randomly selecting a student who prefers pizza is 4 / 10 or 0.4.","prompt":"bureaucratic"},
  {"problem":"There are 24 cupcakes in a box, 12 of which are chocolate. If you randomly choose 3 cupcakes from the box, what is the probability that exactly 2 of them are chocolate? Express the probability as a fraction in simplest form.","expression":"P(2 chocolate) = (12C2 * 12C1) / 24C3","solution":"P(2 chocolate) = (6 * 12) / 120 = 72 / 120 = 3 / 5","prompt":"bless"},
  {"problem":"A thermal camera can detect temperatures between -20°C and 100°C with a precision of 0.5°C. What is the probability that the camera will detect a temperature between 25°C and 50°C?","expression":"P(25°C ≤ X ≤ 50°C) = (50°C - 25°C) / (100°C + 20°C) = 3 / 6 = 1 / 2","solution":"The probability of the camera detecting a temperature between 25°C and 50°C is 1 / 2 or 50%.","prompt":"thermal"},
  {"problem":"There are 30 pepperonis in a pizza, and 6 of them are extra large. What is the probability of randomly selecting a pepperoni that is not extra large, expressed as a fraction in simplest form?","expression":"P(not extra large) = (24/30) = 8/15","solution":"The probability of randomly selecting a pepperoni that is not extra large is 8/15.","prompt":"peppery"},
  {"problem":"A bag of marbles contains 24 red marbles and 16 blue marbles. If you randomly select 5 marbles from the bag, what is the probability that exactly 3 of them are red?","expression":"P(3 red) = (24/40) * (23/39) * (22/38) * (16/37) * (15/36)","solution":"0.234","prompt":"immortality"},
  {"problem":"There are 24 light bulbs in a box, 9 of which are known to be defective. If you randomly select 3 light bulbs from the box, what is the probability that exactly 2 of them are defective?","expression":"P(2 defective) = (9/24) * (8/23) * (15/22)","solution":"0.263","prompt":"illuminate"},
  {"problem":"There are 3 red marbles and 5 blue marbles in a jar. If you pick two marbles without replacement, what is the probability that both of them will be red? Express your answer as a fraction.","expression":"3/8 * 3/8","solution":"9/64","prompt":"impending"},
  {"problem":"A storekeeper has 3 boxes of apples, each with 12 apples, and 2 boxes of oranges, each with 15 oranges. What is the probability that a randomly picked fruit is an apple?","expression":"3/5","solution":"3/5 or 0.6","prompt":"storekeeper"},
  {"problem":"There are 30 students in a class, 12 of whom confess to cheating on a test. What is the probability that a randomly chosen student from the class confesses to cheating?","expression":"P(confesses) = 12/30","solution":"0.4 or 40%","prompt":"confession"},
  {"problem":"There are 9 statues on an altar. 3 of them are gold, 4 are silver, and the rest are bronze. What is the probability that a randomly chosen statue is gold or silver?","expression":"(3/9) + (4/9) = 7/9","solution":"The probability of choosing a gold or silver statue is 7 out of 9, or 7/9.","prompt":"altar"},
  {"problem":"There are 30 marbles in a jar, 12 of them are blue. What is the probability of randomly selecting a blue marble from the jar?","expression":"P(blue) = 12/30 = 4/15","solution":"The probability of selecting a blue marble is 4 out of 15 or 4/15.","prompt":"lot"},
  {"problem":"There is a 25% chance of rain today and a 75% chance of humidity. What is the probability that it will both rain and be humid today?","expression":"0.25 * 0.75","solution":"0.1875 or 18.75% chance","prompt":"humid"},
  {"problem":"There are 36 fish in a pond, 18 of them are trout. What is the probability that a randomly selected fish from the pond is a trout?","expression":"P(trout) = 18/36 = 1/2","solution":"The probability of selecting a trout is 1/2 or 50%.","prompt":"trout"},
  {"problem":"There are 30 students in a class, 12 of whom are boys. What is the probability that a randomly chosen student is a boy?","expression":"P(boy) = 12/30","solution":"0.4 or 40%","prompt":"totter"},
  {"problem":"There are 30 students in a class, 12 of whom are boys. If a student is randomly selected from the class, what is the probability that the student is a girl? Express the probability as a fraction in simplest form.","expression":"P(girl) = (30 - 12) / 30","solution":"P(girl) = 18 / 30 = 3 / 5","prompt":"delinquency"},
  {"problem":"There are 12 red marbles and 8 blue marbles in a jar. If you pick one marble out of the jar without knowing its color, what is the probability that it will be red?","expression":"P(Red) = 12 / (12 + 8)","solution":"P(Red) = 12 / 20 = 0.6 or 60%","prompt":"sometimes"},
  {"problem":"A jar contains 50 marbles, 25 of which are blue. If you randomly select 3 marbles from the jar, what is the probability that exactly two of them are blue? Express your answer as a fraction in simplest form.","expression":"P(2 blue) = 3C2 / 50C3","solution":"P(2 blue) = 3/10","prompt":"excessive"},
  {"problem":"There are 40 students in a class. 1/3 of the students take math, 1/4 take science, and 1/5 take both math and science. What is the probability that a randomly chosen student takes only math or only science?","expression":"P(math only) + P(science only) - P(math and science)","solution":"P(math only) = 1/3 - 1/5 = 2/15\nP(science only) = 1/4 - 1/5 = 1/20\nP(math and science) = 1/5\nP(math only or science only) = 2/15 + 1/20 = 13/60","prompt":"discrepancy"},
  {"problem":"There are 12 red cups and 8 blue cups in a cupboard. What is the probability of randomly selecting a red cup from the cupboard?","expression":"P(red) = 12 / (12 + 8)","solution":"0.6","prompt":"cup"},
  {"problem":"There are 30 students in a class, 12 of whom are boys. If a student is chosen randomly from the class, what is the probability that the student is a boy? Express the probability as a fraction in simplest form.","expression":"P(boy) = 12/30 = 4/15","solution":"The probability of choosing a boy from the class is 4/15.","prompt":"furtive"},
  {"problem":"There are 4 engineers working on a project. 3 of them are civil engineers and the rest are electrical engineers. What is the probability that a randomly chosen engineer is an electrical engineer?","expression":"P(electrical engineer) = (number of electrical engineers) / (total number of engineers)","solution":"P(electrical engineer) = (1 / 4)","prompt":"engineer"},
  {"problem":"An immediate survey of 100 students in a class shows that 40% of them prefer chocolate ice cream, 30% prefer vanilla ice cream, and the rest prefer strawberry ice cream. What is the probability that a randomly chosen student from the class prefers strawberry ice cream?","expression":"P(strawberry) = 1 - P(chocolate) - P(vanilla)","solution":"P(strawberry) = 1 - 0.4 - 0.3 = 0.3 or 30%","prompt":"immediate"},
  {"problem":"A bag of marbles contains 12 red marbles, 8 blue marbles, and 6 green marbles. If you randomly pick 3 marbles from the bag, what is the probability that exactly two of them are red?","expression":"P(2 red, 1 non-red) = (12/26) * (12/26) * (10/26)","solution":"0.343","prompt":"imitation"},
  {"problem":"There are 3 red marbles and 5 blue marbles in a bag. What is the probability of randomly selecting a red marble from the bag?","expression":"P(red) = 3 / (3 + 5)","solution":"P(red) = 3 / 8","prompt":"err"},
  {"problem":"There are 24 students in a class, and 1/3 of them are boys. What is the probability that a randomly chosen student is a boy?","expression":"P(boy) = 1/3","solution":"0.33 or 33% of the students are boys.","prompt":"mid"},
  {"problem":"There are 3 red marbles, 5 blue marbles, and 2 green marbles in a jar. If you randomly select two marbles from the jar, what is the probability that both marbles will be red?","expression":"P(red) * P(red) = (3/10) * (3/10)","solution":"9/100","prompt":"garish"},
  {"problem":"There are 12 red marbles and 8 blue marbles in a jar. If you randomly pick 2 marbles from the jar, what is the probability that both are red? Express the probability as a fraction in simplest form.","expression":"P(Red and Red) = (12/20) * (12/20)","solution":"P(Red and Red) = 144/400 = 9/25","prompt":"ignite"},
  {"problem":"There are 45 passengers waiting for the subway. 15 of them are going to work, 20 are going home, and 10 are going to school. What is the probability that a randomly chosen passenger is going to school?","expression":"P(school) = 10/45","solution":"P(school) = 1/4.25 or 0.22","prompt":"subway"},
  {"problem":"A bag of marbles contains 3 red marbles, 5 blue marbles, and 2 green marbles. If you randomly select 2 marbles from the bag without replacement, what is the probability that both marbles will be red?","expression":"P(Red) * P(Red) = (3/10) * (3/9)","solution":"9/90 = 1/10","prompt":"motionless"},
  {"problem":"There are 12 red marbles and 8 blue marbles in a bag. If you reach in and grab one marble without knowing its color, what is the probability that it will be red? Express the probability as a fraction in simplest form.","expression":"P(red) = 12 / (12 + 8)","solution":"P(red) = 12 / 20 = 3 / 5","prompt":"unfurl"},
  {"problem":"There are 12 linen shirts and 8 linen pants in a closet. What is the probability of randomly selecting a linen shirt from the closet?","expression":"P(shirt) = 12 / (12 + 8)","solution":"P(shirt) = 12 / 20 = 3 / 5 = 0.6 or 60%.","prompt":"linen"},
  {"problem":"There are 30 students in a class, 12 of whom are boys. What is the probability that a randomly chosen student is a boy? Express the probability as a fraction in simplest form.","expression":"P(boy) = 12/30 = 4/15","solution":"The probability that a randomly chosen student is a boy is 4 out of 15, or 4/15.","prompt":"specialist"},
  {"problem":"There are 3 red marbles and 5 blue marbles in a bag. If you randomly choose 2 marbles from the bag, what is the probability that both will be red? Express your answer as a fraction.","expression":"3/8 * 3/8","solution":"9/64","prompt":"dummy"},
  {"problem":"There are 12 costumes in a theatrical production. 3 of them are medieval costumes. What is the probability of choosing a medieval costume at random?","expression":"3/12","solution":"1/4","prompt":"theatrical"},
  {"problem":"There are 12 holes in a golf course. If a golfer has a 70% chance of completing each hole, what is the probability that the golfer completes 9 or more holes?","expression":"P(9+) = ∑(P(x) for x in {9, 10, 11, 12}) = ∑(0.7^x for x in {9, 10, 11, 12})","solution":"0.8235","prompt":"golf"},
  {"problem":"There are 3 red marbles, 5 blue marbles, and 2 green marbles in a jar. If you randomly pick 2 marbles from the jar, what is the probability that both marbles are blue?","expression":"P(blue & blue) = (5/10) * (5/10)","solution":"1/4 or 0.25","prompt":"retort"},
  {"problem":"There are 30 students in a class, 12 of whom prefer reading sci-fi books. What is the probability that a randomly chosen student from the class prefers reading sci-fi books?","expression":"P(sci-fi) = 12/30","solution":"P(sci-fi) = 1/2 or 50%","prompt":"alienation"},
  {"problem":"There are 12 rubber bands in a jar, 5 of them are red. What is the probability of picking a red rubber band from the jar?","expression":"P(red) = 5/12","solution":"0.42 or 42%","prompt":"rubber"},
  {"problem":"There are 12 equally likely marbles in a jar, 3 of which are blue. What is the probability that a randomly chosen marble from the jar is blue?","expression":"P(blue) = 3/12","solution":"P(blue) = 1/4","prompt":"rotation"},
  {"problem":"There are 30 students in a class, 12 of them are passionate about reading, and 18 of them are passionate about music. What is the probability that a randomly chosen student is passionate about either reading or music?","expression":"P(reading) + P(music) - P(reading and music)","solution":"12/30 + 18/30 - 6/30 = 24/30 = 8/15","prompt":"passion"},
  {"problem":"There are 40 houses in a neighborhood, 15 of which have squatters. What is the probability that a randomly chosen house in the neighborhood has a squatter?","expression":"P(squatter) = 15 / 40","solution":"0.375 or 37.5% of the houses have squatters.","prompt":"squatter"},
  {"problem":"There are 3 red marbles and 5 blue marbles in a jar. If you pick two marbles without replacement, what is the probability that both are red? Express the probability as a fraction in simplest form.","expression":"3/8 * 2/7","solution":"3/14","prompt":"relational"},
  {"problem":"There are 24 marbles in a jar, 12 of them are blue and the rest are green. If you randomly pick 3 marbles from the jar, what is the probability that exactly two of them are blue? Express your answer as a fraction in lowest terms.","expression":"P(2 blue and 1 green) = (12/24) * (12/24) * (12/24)","solution":"1/9","prompt":"morally"},
  {"problem":"There are 30 socks in a drawer, 12 of them are blue. What is the probability that a randomly selected sock from the drawer is blue?","expression":"P(blue) = 12/30","solution":"P(blue) = 1/2","prompt":"foot"},
  {"problem":"There are 12 red marbles and 8 blue marbles in a jar. If you pick one marble without knowing its color, what is the probability that it will be red? Express the probability as a fraction in simplest form.","expression":"P(Red) = 12 / (12 + 8)","solution":"P(Red) = 12 / 20 = 3 / 5","prompt":"instant"},
  {"problem":"There are 30 cookies in a jar, 12 of which are chocolate chip. If you randomly choose 5 cookies from the jar, what is the probability that exactly 2 of them are chocolate chip? Express your answer as a fraction in simplest form.","expression":"P(2 chocolate chip) = (12/30) * (11/29) * (18/29) * (17/29) * (16/29)","solution":"1320/8748 = 3/7","prompt":"glut"},
  {"problem":"There are 12 cousins at a family reunion. 3/4 of them are boys. How many of the cousins are girls?","expression":"12x(1-3/4)","solution":"9","prompt":"cousin"},
  {"problem":"There are 120 trees in an orchard. 3/5 of the trees bear apples, and 1/4 of the trees bear oranges. How many trees bear either apples or oranges?","expression":"120x/5 + 120x/4","solution":"120(3/5 + 1/4) = 120(17/20) = 96 trees","prompt":"orchard"},
  {"problem":"There are 3 red marbles, 5 blue marbles, and 2 green marbles in a jar. If you randomly pick one marble from the jar, what is the probability that it will be a red or blue marble? Express the probability as a fraction.","expression":"P(red) + P(blue) = (3/10) + (5/10) = 8/10","solution":"The probability of picking a red or blue marble is 8 out of 10, or 8/10.","prompt":"freely"},
  {"problem":"There are 30 students in a class, 12 of whom are boys. What is the probability that a randomly selected student is a boy?","expression":"P(boy) = 12/30","solution":"P(boy) = 1/2","prompt":"level"},
  {"problem":"There are 3 red marbles, 5 blue marbles, and 2 green marbles in a jar. If you randomly pick 2 marbles from the jar, what is the probability that both marbles are blue, expressed as a fraction? ","expression":"P(blue and blue) = (5/10) * (5/10)","solution":"1/4","prompt":"misunderstanding"},
  {"problem":"There are 100 tickets in a raffle, of which 20 are winning tickets. What is the probability of winning a ticket, expressed as a fraction in simplest form?","expression":"P(winning) = 20/100","solution":"P(winning) = 1/5","prompt":"voucher"},
  {"problem":"There are 3 red marbles, 5 blue marbles, and 2 green marbles in a bag. If you randomly pick 2 marbles from the bag without replacement, what is the probability that both marbles are red?","expression":"P(Red) * P(Red) = (3/10) * (3/9)","solution":"3/15 or 1/5","prompt":"generalization"},
  {"problem":"There are 50 tickets in a raffle, 20 of which are for a bicycle. What is the probability of winning a bicycle in this raffle?","expression":"P(bicycle) = 20/50","solution":"P(bicycle) = 1/2 or 50% of the tickets are for a bicycle.","prompt":"eliminate"},
  {"problem":"There are 120 marbles in a jar, 48 of which are red. What is the probability of randomly selecting a red marble from the jar?","expression":"P(red) = 48 / 120","solution":"P(red) = 4 / 10 = 2 / 5","prompt":"embezzle"},
  {"problem":"There are 120 books in a library. 40% of them are fiction books. What is the probability that a randomly selected book from the library is a fiction book?","expression":"P(fiction) = 40/120","solution":"P(fiction) = 1/3","prompt":"reader"},
  {"problem":"There are 30 students in a class, and 15 of them like pizza. What is the probability that a randomly chosen student likes pizza?","expression":"P(pizza) = 15/30","solution":"P(pizza) = 1/2","prompt":"plethora"},
  {"problem":"There are 90 students in a class, 30 of whom prefer reading fantasy books. What is the probability that a randomly selected student from the class prefers reading fantasy books?","expression":"P(fantasy) = 30/90","solution":"P(fantasy) = 1/3","prompt":"glory"},
  {"problem":"There are 20 cookies in a jar, 12 of which are chocolate chip. If you randomly select 3 cookies from the jar, what is the probability that exactly 2 of them are chocolate chip?","expression":"P(2 chocolate chip) = (12/20) * (11/19) * (8/18)","solution":"0.278 or 27.8% chance","prompt":"outweigh"},
  {"problem":"There are 40 students in a class, 25 of whom prefer pizza. What is the probability that a randomly chosen student prefers pizza?","expression":"P(pizza) = 25/40","solution":"P(pizza) = 5/8 = 0.625 or 62.5%","prompt":"dissent"},
  {"problem":"There are 30 students in a class, 12 of whom prefer pizza. What is the probability that a randomly chosen student prefers pizza?","expression":"P(pizza) = 12/30 = 2/5","solution":"The probability that a randomly chosen student prefers pizza is 2 out of 5, or 40%.","prompt":"leverage"},
  {"problem":"There are 3 red marbles and 5 blue marbles in a jar. If you randomly pick 2 marbles from the jar, what is the probability that both marbles are red? Express the probability as a fraction in simplest form.","expression":"P(red) = 3/8 * 3/8","solution":"P(red) = 9/64","prompt":"instability"},
  {"problem":"A bag of apples contains 25 red, 18 green, and 12 yellow ones. If you randomly choose 3 apples from the bag, what is the probability that exactly two of them will be red?","expression":"P(2 red, 1 not red) = (25/55) * (24/54) * (36/55)","solution":"0.387","prompt":"lusty"},
  {"problem":"There are 25 students in a class, 12 of whom prefer reading fantasy books. What is the probability that a randomly chosen student from the class prefers reading fantasy books?","expression":"P(fantasy) = 12/25","solution":"0.48 or 48%","prompt":"conquest"},
  {"problem":"There are 48 marbles in a jar, 15 of which are red. What is the probability of randomly selecting a red marble from the jar?","expression":"P(red) = 15 / 48","solution":"0.3125 or 31.25% of the marbles are red.","prompt":"fortieth"},
  {"problem":"There are 30 students in a class, and 12 of them prefer reading. What is the probability that a randomly chosen student from the class prefers reading, expressed as a fraction?","expression":"P(reading) = 12/30 = 2/5","solution":"The probability that a randomly chosen student from the class prefers reading is 2 out of 5 or 40%.","prompt":"sector"},
  {"problem":"There are 12 red marbles and 8 blue marbles in a bag. What is the probability of randomly selecting a red marble from the bag?","expression":"P(red) = 12 / (12 + 8)","solution":"P(red) = 12 / 20 = 3 / 5 or 0.6","prompt":"touch"},
  {"problem":"There are 12 countries in Asia and 6 countries in Africa. What is the probability of randomly selecting a country from Asia or Africa?","expression":"P(Asia) + P(Africa) = 12/18 + 6/18","solution":"7/9 or 0.78","prompt":"country"},
  {"problem":"There are 20 students in a class, 10 of whom are boys. If 3 students are randomly selected without replacement from the class, what is the probability that exactly 2 of them are boys?","expression":"P(exactly 2 boys) = (10/20) * (9/19) * (10/18)","solution":"0.385","prompt":"reelect"},
  {"problem":"There are 12 ornate hats in a box, of which 3 are red and 9 are blue. If you randomly pick 2 hats from the box without replacement, what is the probability that both hats are red?","expression":"P(red) * P(red) = (3/12) * (3/11)","solution":"9/132","prompt":"ornate"},
  {"problem":"There are 3 red marbles, 5 blue marbles, and 2 green marbles in a jar. If you randomly select 2 marbles from the jar, what is the probability that both marbles are red? Express the probability as a fraction in simplest form.","expression":"P(Red) = 3/10 * 3/10","solution":"P(Red) = 9/100 = 0.09 or 9%.","prompt":"inborn"},
  {"problem":"There are 30 students in a class, and 12 of them are boys. What is the probability that a randomly selected student is a boy?","expression":"P(boy) = 12/30","solution":"0.4 or 40% of the students are boys.","prompt":"recipient"},
  {"problem":"There are 30 flowers in a garden, of which 12 are tulips and the rest are lilies. What is the probability that a randomly selected flower is a tulip?","expression":"P(tulip) = (12 / 30)","solution":"0.4 or 40%","prompt":"springtime"},
  {"problem":"There are 3 red marbles and 5 blue marbles in a jar. If you randomly select 2 marbles from the jar, what is the probability that both marbles are red? Express your answer as a fraction in simplest form.","expression":"P(Red, Red) = 3/8 * 3/8","solution":"9/64","prompt":"decency"},
  {"problem":"There are 20 pencils in a box, 5 of which are broken. What is the probability that a randomly selected pencil from the box is not broken? Express your answer as a fraction in simplest form.","expression":"P(not broken) = 1 - (5/20)","solution":"P(not broken) = 1 - 1/4 = 3/4","prompt":"cumbersome"},
  {"problem":"There are 24 houses in a neighborhood. 3 of those houses are scheduled for demolition. What is the probability that a randomly selected house in the neighborhood is not scheduled for demolition?","expression":"P(not demolished) = 1 - (3/24)","solution":"P(not demolished) = 1 - (1/8) = 7/8 = 0.875","prompt":"demolish"},
  {"problem":"There are 120 chestnuts in a bowl. 1/3 of the chestnuts are brown, 1/4 are red, and the rest are yellow. Write an algebraic expression to represent the number of brown and red chestnuts in the bowl.","expression":"1/3x + 1/4x","solution":"1/3x + 1/4x = 25/12x","prompt":"chestnut"},
  {"problem":"There are 12 red marbles and 8 blue marbles in a jar. If you randomly pick 2 marbles from the jar, what is the probability that both are red? Express the probability as a fraction in simplest form.","expression":"P(Red) = (12/20) * (12/20)","solution":"P(Red) = 3/5","prompt":"seeker"},
  {"problem":"There are 30 students in a class. 12 of them are boys and 18 of them are girls. What is the probability that a randomly selected student is a boy?","expression":"P(boy) = 12/30","solution":"P(boy) = 1/2","prompt":"homosexual"},
  {"problem":"There are 24 jokes in a book. 3 of them are puns. What is the probability of randomly selecting a joke that is not a pun? Express your answer as a fraction in simplest form.","expression":"P(not pun) = 1 - (3/24)","solution":"P(not pun) = 1 - 1/8 = 7/8","prompt":"humor"},
  {"problem":"In a school corridor with 30 students, 12 are going to math class and 8 are going to science class. What is the probability that a randomly chosen student is going to math class?","expression":"P(math) = 12/30 = 4/10","solution":"The probability of randomly selecting a student going to math class is 4 out of 10, or 40%.","prompt":"corridor"},
  {"problem":"There are 30 marbles in a jar, 12 of them are blue. What is the probability of randomly selecting a non-blue marble from the jar?","expression":"1 - (12/30)","solution":"1 - (1/2) = 1/2","prompt":"contain"},
  {"problem":"There are 50 items in a basket, 25 of which are red. What is the probability that a randomly selected item from the basket is red, expressed as a fraction in simplest form?","expression":"P(red) = 25/50 = 1/2","solution":"The probability of selecting a red item is 1 in 2 or 50%. ","prompt":"economy"},
  {"problem":"A traveler has a 1/3 probability of reaching their destination by train, a 1/4 probability by bus, and a 1/5 probability by plane. What is the probability that the traveler will reach their destination by any of those three methods?","expression":"1/3 + 1/4 + 1/5","solution":"13/60","prompt":"traveler"},
  {"problem":"There are 90 students in a school, 45 of them like reading, 30 like playing video games, and 15 like both. How many students like reading or playing video games?","expression":"45x + 30y - 15xy","solution":"75","prompt":"cathedral"},
  {"problem":"There are 30 students in a class, 15 of whom are going south for vacation. What is the probability that a randomly selected student is going south for vacation?","expression":"P(south) = 15 / 30 = 1 / 2","solution":"The probability that a randomly selected student is going south for vacation is 1 / 2 or 50%.","prompt":"south"},
  {"problem":"There are 30 marbles in a bag, 15 of them are blue. What is the probability of randomly selecting a blue marble from the bag?","expression":"P(blue) = 15 / 30 = 1 / 2","solution":"The probability of selecting a blue marble is 1 in 2 or 50%.","prompt":"even"},
];

const geometryProblems = [
  {"problem":"In the town of Oakwood, there are x houses and y apartments. Together, they have a total of 200 living spaces. How many houses are there if there are 30 more apartments than houses?","expression":"x + (x + 30) = 200","solution":"x = 60 houses","prompt":"town"},
  {"problem":"The length of a rectangle is 3x + 5 and its width is 2x - 1. Find the perimeter of the rectangle.","expression":"2(3x + 5) + 2(2x - 1)","solution":"6x + 10 + 4x - 2 = 10x + 8","prompt":"transaction"},
  {"problem":"A rectangle has a perimeter of 30 cm. If the length is 3x cm and the width is x cm, express the area of the rectangle using algebraic expressions.","expression":"2(3x + x) = 30","solution":"6x + 2x = 30, 8x = 30, x = 3.75 cm","prompt":"horizontal"},
  {"problem":"A rectangle has a perimeter of 30 cm. If the length is 3 cm more than the width, find the length and width of the rectangle.","expression":"2(length + width) = 30\n length = width + 3","solution":"Let w cm be the width of the rectangle.\nThen, the length of the rectangle is (w + 3) cm.\n2(w + w + 3) = 30\n2(2w + 3) = 30\n2w + 3 = 15\n2w = 12\n w = 6\nTherefore, the width of the rectangle is 6 cm and the length is 9 cm.","prompt":"approach"},
  {"problem":"A rectangle has a perimeter of 30 cm. If the length is 2x cm and the width is x + 5 cm, find the length and width of the rectangle.","expression":"2(2x + x + 5) = 30","solution":"{x = 5 cm, 2x = 10 cm}","prompt":"graphic"},
  {"problem":"A rectangular room is 2x meters long and x + 3 meters wide. Find the area of the room in square meters.","expression":"Area = 2x(x + 3)","solution":"Area = 2x^2 + 6x square meters","prompt":"homework"},
  {"problem":"An ewe has a patch of grass that is x meters long and y meters wide. If she wants to make a square enclosure out of half the grass, express the area of the square enclosure in terms of x and y.","expression":"1/2 * x * y","solution":"1/2 * x * y = 25m^2","prompt":"ewe"},
  {"problem":"A rectangular garden bed has a perimeter of 30 meters. If the length is 3 meters longer than the width, find the dimensions of the garden bed.","expression":"2(L + W) = 30, L = W + 3","solution":"L = 10m, W = 7m","prompt":"lime"},
  {"problem":"In a triangle with a base of x meters and a height of y meters, find the area of the triangle using the formula: Area = (base * height) / 2.","expression":"Area = (x * y) / 2","solution":"If the base of the triangle is 6 meters and the height is 4 meters, the area of the triangle is (6 * 4) / 2 = 12 square meters.","prompt":"epic"},
  {"problem":"A rectangle has a perimeter of 40 cm. If the length is 3x cm and the width is x cm, express the area of the rectangle as an algebraic expression.","expression":"Perimeter = 2(length + width) \n 40 = 2(3x + x)\n 40 = 2(4x)\n 40 = 8x\n x = 5","solution":"The area of the rectangle is A = length * width = 3x * x = 3(5) * 5 = 75 cm^2.","prompt":"distraction"},
  {"problem":"A farmer has 120 acres of land to cultivate. He wants to divide the land into equal parts to grow corn and soybeans. Write an algebraic expression that represents the number of acres of land allocated for each crop?","expression":"x + y = 120","solution":"x = y = 60","prompt":"rein"},
  {"problem":"A rectangular piece of seaweed has a length that is 3 meters more than its width. If the perimeter of the seaweed is 50 meters, find the length and width of the seaweed in meters.","expression":"Let x be the width of the seaweed in meters.\nLength = x + 3\nPerimeter = 2(x + x + 3) = 50","solution":"Solving the equation:\n2x + 6 = 50\n2x = 44\nx = 22\nTherefore, the width of the seaweed is 22 meters and the length is 22 + 3 = 25 meters.","prompt":"sea"},
  {"problem":"A sprightly squirrel gathered 3x nuts from the forest and 2y nuts from the garden. How many nuts did the squirrel gather in total?","expression":"3x + 2y","solution":"3x + 2y = 15; x = 5, y = 3. The squirrel gathered 15 nuts in total.","prompt":"sprightly"},
  {"problem":"A banjo has a neck that is 2x cm long and a body that is 3x cm long. What is the total length of the banjo in cm?","expression":"2x + 3x = 5x","solution":"5x = 35, therefore x = 7. The total length of the banjo is 5 * 7 = 35 cm.","prompt":"banjo"},
  {"problem":"A square room has a ceiling height of 8 feet. If the area of the ceiling is represented by x square feet, write an algebraic expression to represent the perimeter of the room.","expression":"P = 4√(x/8)","solution":"P = 4√(x)/4 = √x feet","prompt":"ceiling"},
  {"problem":"A rectangular fuel tank has a length that is 2 meters more than its width. If the tank holds 100 cubic meters of fuel, find the length and width of the tank.","expression":"Let x be the width of the tank.\nThe length of the tank is x + 2.\nVolume = (x + 2)x = 100","solution":"x = 10, length = 12","prompt":"fuel"},
  {"problem":"A rectangular pool is 3x meters long and 2x meters wide. If the water level in the pool is 1.5x meters deep, what is the volume of water in the pool in cubic meters?","expression":"3x * 2x * 1.5x = 9x^3","solution":"9x^3 cubic meters","prompt":"shallow"},
  {"problem":"A rectangle has a perimeter of 30 cm. If the length is 3 cm longer than the width, find the length and width of the rectangle.","expression":"2(l + w) = 30, l = w + 3","solution":{"length":"3 + 6 = 9 cm","width":"3 cm","substitute":"w + 6 = w + 3","solve":"w = 3"},"prompt":"wrongly"},
  {"problem":"A jellyfish's tentacles are 3x cm long, and its body is 2x cm long. What is the total length of the jellyfish, including tentacles and body?","expression":"3x cm + 2x cm = 5x cm","solution":"The total length of the jellyfish is 5x cm.","prompt":"jellyfish"},
  {"problem":"A rectangle has a perimeter of 30 cm. If the length is 3x cm and the width is x + 5 cm, find the length and width of the rectangle.","expression":"2(3x + x + 5) = 30","solution":"3x = 10, x + 5 = 5; length = 30 cm, width = 15 cm","prompt":"participle"},
  {"problem":"A rectangular garden is 3x meters long and 2x meters wide. Find the perimeter of the garden in terms of x.","expression":"2(3x + 2x)","solution":"2(5x) = 10x meters","prompt":"gratify"},
  {"problem":"A square has an area of x<sup>2</sup> + 4x + 4. What is the length of one side of the square?","expression":"sqrt(x^2 + 4x + 4)","solution":"x + 2","prompt":"evolve"},
  {"problem":"A rectangular room is 3x meters long and 2x meters wide. What is the area of the room in square meters?","expression":"Area = 3x * 2x = 6x^2","solution":"6x^2 square meters","prompt":"theirs"},
  {"problem":"A rectangle has a perimeter of 40 cm. If the length is 5 cm more than the width, find the length and width of the rectangle.","expression":{"perimeter":2,"length":"x + 5","width":"x"},"solution":{"equation":"2(x + 5) + 2x = 40","solution":"x = 8 cm","length":"8 + 5 = 13 cm","width":"8 cm"},"prompt":"before"},
  {"problem":"A farmer has 100 acres of land. He cultivates wheat on x acres and barley on y acres. If he cultivates twice as many acres of wheat as barley, how many acres of each crop does he cultivate?","expression":"2x + y = 100","solution":"x = 60, y = 40","prompt":"agricultural"},
  {"problem":"A square has a perimeter of 12x + 8. Find the length of one side of the square.","expression":"4x + 2 = 12x + 8","solution":"x = 2","prompt":"biting"},
  {"problem":"A triangle has a base of 3x + 5 and a height of 2x - 1. Find the area of the triangle.","expression":"A = (1/2) * (3x + 5) * (2x - 1)","solution":"A = (3x^2 + 8x - 5)/2","prompt":"grotesque"},
  {"problem":"A rectangular room is 3x meters long and 2x meters wide. What is the area of the room in square meters?","expression":"Area = 3x * 2x = 6x^2","solution":"The area of the room is 6x^2 square meters.","prompt":"electoral"},
  {"problem":"A caddy carries 3 golf bags, each weighing 5 pounds. How many pounds of golf bags does the caddy carry in total? Express your answer as an algebraic expression.","expression":"3x + 5","solution":"3(5) + 5 = 15 + 5 = 20 pounds","prompt":"caddie"},
  {"problem":"A rectangle has a perimeter of 3x + 10. If the length is 2x - 5, what is the width in terms of x?","expression":"2(2x-5) + 10 = 3x + 10","solution":"x = 5","prompt":"trillion"},
  {"problem":"A triangle has a base of 2x + 5 and a height of 3x - 2. Find the area of the triangle.","expression":"A = (1/2) * (base) * (height) = (1/2) * (2x + 5) * (3x - 2)","solution":"Area = 3x^2 + 13x - 10","prompt":"culmination"},
  {"problem":"A square garden has a perimeter of 4x + 10 meters. Find the length of one side of the garden.","expression":"P = 4x + 10","solution":"x = (P - 10) / 4","prompt":"breathless"},
  {"problem":"A pundit has a rectangular garden with a length that is 3 meters more than twice the width. If the perimeter of the garden is 50 meters, find the length and width.","expression":"Let x be the width of the garden in meters.\nLength = 2x + 3\nPerimeter = 2(2x + 3) + 2x = 50","solution":"Solving the equation, we get:\n2(2x + 3) + 2x = 50\n4x + 6 + 2x = 50\n6x + 6 = 50\n6x = 44\nx = 7\nTherefore, the width of the garden is 7 meters and the length is 2(7) + 3 = 17 meters.","prompt":"pundit"},
  {"problem":"A square room has a perimeter of 40 meters. Find the area of the room in square meters.","expression":"P = 4s\nA = s^2","solution":"s = 10\nA = 100 square meters","prompt":"chuck"},
  {"problem":"A triangle has a base of x cm and a height of 2x cm. Find the area of the triangle.","expression":"A = (1/2) * base * height = (1/2) * x * 2x = x^2 cm^2","solution":"The area of the triangle is x^2 cm^2.","prompt":"arousal"},
  {"problem":"A rectangle has a perimeter of 30 cm. If the length is 3 cm more than the width, find the length and width of the rectangle.","expression":"2(L + W) = 30, L = W + 3","solution":"L = 10 cm, W = 7 cm","prompt":"readily"},
  {"problem":"A rectangle has a perimeter of 30 cm. If the length is 3 cm more than the width, find the length and width of the rectangle.","expression":"2(l + w) = 30, l = w + 3","solution":"l = 10 cm, w = 7 cm","prompt":"warrant"},
  {"problem":"A rectangle has a perimeter of 40 cm. If the length is 5 cm more than the width, find the length and width of the rectangle.","expression":{"perimeter":2,"length":"l","width":"w","equation1":2,"equation2":2},"solution":{"length":12,"width":7},"prompt":"size"},
  {"problem":"A rectangular room is 3x meters long and 2x meters wide. What is the area of the room in square meters?","expression":"A = 3x * 2x = 6x^2","solution":"The area of the room is 6x^2 square meters.","prompt":"afford"},
  {"problem":"A rectangular field has a length that is 3 meters more than its width. If the perimeter of the field is 50 meters, find the length and width of the field.","expression":"Let x be the width of the field.\nLength = x + 3\nPerimeter = 2(x + 3) + 2x = 50","solution":"x = 8\nx + 3 = 11","prompt":"queue"},
  {"problem":"The area of a motorbike helmet is given by the expression 3x + 5. The perimeter of the helmet is 2x + 10. Find the values of x that make the area and perimeter equal.","expression":"area = 3x + 5, perimeter = 2x + 10","solution":"3x + 5 = 2x + 10\n3x = 2x + 5\nx = 5","prompt":"motorbike"},
  {"problem":"The area of a circle is represented by πr². If the radius of the circle is increased by 2 cm, how will the area of the circle change? Express your answer in terms of r.","expression":"π(r+2)^2 - πr^2","solution":"π(r^2 + 4r + 4) - πr^2 = π(4r + 4)","prompt":"accent"},
  {"problem":"A sightseeing tour bus has 50 passengers and wants to allocate 3x seats to adults and 2(x+7) seats to children. How many seats does the bus allocate to adults and children combined? Express the total number of seats as an algebraic expression.","expression":"3x + 2(x+7)","solution":"3x + 2x + 14 = 5x + 14","prompt":"sightseeing"},
  {"problem":"In a utopian community where everyone shares their possessions, there are 3 houses with x rooms each and 2 houses with y rooms each. If there are 18 rooms in total, express the total number of rooms as an algebraic expression.","expression":"3x + 2y = 18","solution":"x = 6, y = 3","prompt":"communism"},
  {"problem":"A rectangle has a perimeter of 40 cm. If the length is 5 cm more than the width, find the length and width of the rectangle.","expression":"2(L + W) = 40, L = W + 5","solution":"L = 12 cm, W = 7 cm","prompt":"snare"},
  {"problem":"A rectangle has a perimeter of 40 cm. If the length is 3x cm and the width is 2x cm, find the algebraic expression for the perimeter of the rectangle.","expression":"2(3x + 2x) = 40","solution":"2(5x) = 40, 10x = 40, x = 4 cm","prompt":"evidence"},
  {"problem":"A rectangular garden has a length that is 3 meters more than its width. If the perimeter of the garden is 40 meters, find the length and width.","expression":{"length":"w + 3","perimeter":"2(w + 3) + 2w = 40"},"solution":{"w":6,"length":9},"prompt":"assess"},
  {"problem":"A rectangle has a perimeter of 4x + 10. If the length is 2x + 5, find the width.","expression":"2x + 5 + 2x + 5 = 4x + 10","solution":"x = 2.5","prompt":"statistical"},
  {"problem":"A saucer has a diameter of 6x cm and a height of 4x cm. What is the volume of the saucer in cubic cm?","expression":"V = (1/4)σϓΓ(6x)^2(4x)","solution":"V = 36x^3 cm^3","prompt":"saucer"},
  {"problem":"A rectangle has a perimeter of 30 cm. If the length is 3 cm more than the width, find the length and width of the rectangle.","expression":"2(l + w) = 30, l = w + 3","solution":"l = 9 cm, w = 6 cm","prompt":"insecure"},
  {"problem":"A rectangle has a perimeter of 40 cm. If the length is 2x cm and the width is x + 5 cm, find the length and width of the rectangle.","expression":"2(2x + x + 5) = 40","solution":"x = 5, 2x = 10","prompt":"embassy"},
  {"problem":"A rectangle has a perimeter of 40 cm. If the length is 3x cm and the width is x + 5 cm, find the length and width of the rectangle.","expression":"2(3x) + 2(x + 5) = 40","solution":"x = 5 cm, 3x = 15 cm","prompt":"practicable"},
  {"problem":"A rectangular garden bed has a length that is 5 meters more than twice its width. If the perimeter of the garden bed is 50 meters, find the length and width.","expression":"Let x be the width of the garden bed.\nLength = 2x + 5\nPerimeter = 2(2x + 5) + 2x = 50","solution":"{width: 5, length: 15}","prompt":"lucrative"},
  {"problem":"A rectangle has a perimeter of 40 cm. If the length is 5 cm more than the width, find the length and width of the rectangle.","expression":"2(l + w) = 40, l = w + 5","solution":"w = 10cm, l = 15cm","prompt":"cowardice"},
  {"problem":"A sturdy bookshelf has a height of x centimeters and a width of y centimeters. If the bookshelf has a total area of 900 square centimeters, write an algebraic expression to represent the area of the bookshelf.","expression":"x * y = 900","solution":"The area of the bookshelf is 900 square centimeters when the height is x cm and the width is y cm.","prompt":"sturdy"},
  {"problem":"A rectangle has a perimeter of 30 cm. If the length is 3 cm more than the width, find the length and width of the rectangle.","expression":"2(L + W) = 30, L = W + 3","solution":"L = 10 cm, W = 7 cm","prompt":"chiefly"},
  {"problem":"A circle has a radius of 3x + 2. What is the circumference of the circle?","expression":"2π(3x + 2)","solution":"6π(3x + 2)","prompt":"circumscribe"},
  {"problem":"A rectangle has a perimeter of 40 cm. If the length is x cm and the width is y cm, write an algebraic expression for the area of the rectangle.","expression":"2(x + y) = 40, xy = area","solution":"x = 10, y = 15, area = 150 cm^2","prompt":"eventual"},
  {"problem":"A rectangular garden bed has a length that is 3 meters more than its width. If the perimeter of the garden bed is 50 meters, find the length and width.","expression":"Let x be the width of the garden bed.\nLength = x + 3\nPerimeter = 2(x + x + 3) = 50","solution":"x = 11\nx + 3 = 14","prompt":"earn"},
  {"problem":"A panther is 2 meters long and its tail is 1.5 meters long. What is the total length of the panther and its tail? Let x represent the length of the panther and y represent the length of the tail.","expression":"x + y","solution":"2 + 1.5 = 3.5 meters","prompt":"panther"},
  {"problem":"A rectangular room is 3x meters long and 2x meters wide. What is the area of the room in square meters?","expression":"Area = 3x * 2x = 6x^2","solution":"The area of the room is 6x^2 square meters.","prompt":"miss"},
  {"problem":"A circle has a radius of x cm. Find the circumference of the circle in terms of x.","expression":"C = 2πx cm","solution":"The circumference of the circle is 2π times the radius, which is 2πx cm.","prompt":"radiate"},
  {"problem":"In a rectangular room, the length is 3x + 2 meters and the width is 2x - 1 meters. What is the area of the room in square meters?","expression":"A = (3x + 2)(2x - 1)","solution":"A = 6x^2 + 4x - 2 square meters","prompt":"quietly"},
  {"problem":"A rectangular room is 4x meters long and 3x meters wide. If the total area of the walls is 84 square meters, find the value of x.","expression":"2(4x + 3x) = 84","solution":"x = 3","prompt":"insulation"},
  {"problem":"A rectangle has a perimeter of 30 cm. If the length is 3 cm more than the width, find the length and width of the rectangle.","expression":{"perimeter":2,"length":"x + 3","width":"x","equation":2,"solution":"x + 3 = 15, x = 12 cm"},"solution":"The length of the rectangle is 15 cm and the width is 12 cm.","prompt":"exhale"},
  {"problem":"A rectangular garden bed has a length that is 3 meters more than twice the width. If the perimeter of the garden bed is 40 meters, find the length and width.","expression":"Let x be the width in meters.\nLength = 2x + 3\nPerimeter = 2(2x + 3) + 2x = 40","solution":"x = 6\nLength = 2(6) + 3 = 15 meters","prompt":"infirmity"},
  {"problem":"A square has a perimeter of 4x + 8. Find the length of one side of the square.","expression":"P = 4x + 8 = s^2","solution":"s = (4x + 8) / 4 = x + 2","prompt":"fearless"},
  {"problem":"A rectangle has a length that is 3 cm more than its width. If the perimeter of the rectangle is 50 cm, find the length and width of the rectangle.","expression":"Let l and w represent the length and width of the rectangle respectively.\nPerimeter = 2(l + w) = 50\nLength = l = w + 3","solution":"Substituting the length equation into the perimeter equation:\n2(w + 3) + 2w = 50\n2w + 6 + 2w = 50\n4w + 6 = 50\n4w = 44\nw = 11\nSubstituting w back into the length equation:\nl = 11 + 3\n= 14 cm","prompt":"clearly"},
  {"problem":"A rectangle has a perimeter of 30 cm. If the length is 3x cm and the width is x cm, express the area of the rectangle as an algebraic expression.","expression":"2(3x + x) = 30, A = 3x^2 + 6x","solution":"3x^2 + 6x = 30, x = 5 cm, Area = 3(5)^2 + 6(5) = 75 cm^2","prompt":"motive"},
  {"problem":"A shark travels 3x + 5 kilometers in the morning and 2x - 1 kilometers in the afternoon. How many kilometers did the shark travel in total?","expression":"3x + 5 + 2x - 1","solution":"5x + 4 kilometers","prompt":"hark"},
  {"problem":"A square garden has a perimeter of 40 meters. Find the length of each side in meters.","expression":"4s = 40","solution":"s = 10 meters","prompt":"sovereignty"},
  {"problem":"A rectangle has a perimeter of 30 cm. If the length is 3 cm more than the width, find the length and width of the rectangle.","expression":{"perimeter":2,"length":30,"width":30},"solution":{"length":12,"width":9},"prompt":"suppress"},
  {"problem":"A rectangle has a perimeter of 40 cm. If the length is 5 cm more than the width, find the length and width of the rectangle.","expression":{"perimeter":2,"length":"x + 5","width":"x","equation":2,"solution":"25 cm, 20 cm"},"solution":"The length of the rectangle is 25 cm and the width is 20 cm.","prompt":"since"},
  {"problem":"A supplier has 120 meters of fabric and needs to cut it into pieces that are 3 meters long. How many pieces of fabric can the supplier cut?","expression":"120 = 3x","solution":"40","prompt":"supplier"},
  {"problem":"A farmer has a field of wheat that is x meters long and y meters wide. The weight of the wheat in the field is 50kg/m^2. Calculate the total weight of the wheat in the field.","expression":"50kg/m^2 * x * y","solution":"50xy kg","prompt":"heavy"},
  {"problem":"A rectangular room is 2x meters long and x + 5 meters wide. What is the area of the room in square meters?","expression":"A = 2x(x + 5)","solution":"A = 2x^2 + 10x square meters","prompt":"fidelity"},
  {"problem":"A nurse has 120 milligrams of medication to administer to patients. Each patient receives x milligrams of medication. Write an algebraic expression to represent the amount of medication remaining after administering to p patients.","expression":"120 - px","solution":"If 8 patients receive 15 milligrams each, the medication remaining is 120 - 8 * 15 = 40 milligrams.","prompt":"nurse"},
  {"problem":"A square has a perimeter of 2x + 10. Find the length of one side of the square.","expression":"P = 4s = 2x + 10","solution":"s = (2x + 10) / 4 = x + 2.5","prompt":"tepid"},
  {"problem":"A square has a side length of x + 3. If the perimeter of the square is 20 cm, express the area of the square as an algebraic expression.","expression":"A = (x + 3)^2","solution":"Substituting the perimeter value: 20 = 4(x + 3) \n 5 = x + 3 \n x = 2 \n Area: A = (2 + 3)^2 = 25 cm^2","prompt":"tamper"},
  {"problem":"A rectangular room is 3x meters long and 2x meters wide. What is the area of the room in square meters?","expression":"Area = 3x * 2x = 6x^2","solution":"The area of the room is 6x^2 square meters.","prompt":"illiterate"},
  {"problem":"A rectangle has a perimeter of 30 cm. If the length is 2x cm and the width is x cm, find the algebraic expression for the area of the rectangle.","expression":"Area = 2x^2 cm^2","solution":"Substituting the given values into the expression: Area = 2(2x)^2 = 2(4x^2) = 8x^2 cm^2","prompt":"splice"},
  {"problem":"The area of a rectangle is 80 square meters. If the length is 5 meters more than the width, find the length and width of the rectangle.","expression":"L = w + 5\nArea = L*w = 80","solution":"L = 18\nw = 8","prompt":"eighty"},
  {"problem":"A witch has a cauldron with a diameter of 3x + 5 inches and a height of 2x - 1 inches. What is the volume of the cauldron in cubic inches?","expression":"V = π(3x + 5)^2(2x - 1)","solution":"V = π(9x^2 + 30x + 25)(2x - 1)","prompt":"witch"},
  {"problem":"A triangle has a base of x cm and a height of (x + 5) cm. What is the area of the triangle in square centimeters?","expression":"A = (1/2) * x * (x + 5)","solution":"A = (1/2) * x * (x + 5) = (1/2) * x^2 + 5x cm^2","prompt":"cleverly"},
  {"problem":"A rectangular room is 3x meters long and 2x meters wide. Find the perimeter of the room in terms of x.","expression":"2(3x + 2x)","solution":"2(5x) = 10x meters","prompt":"management"},
  {"problem":"A triangle has a base of 3x cm and a height of 2x cm. What is the area of the triangle in square centimeters?","expression":"A = (1/2) * base * height = (1/2) * (3x cm) * (2x cm) = 3x^2 cm^2","solution":"The area of the triangle is 3x^2 square centimeters.","prompt":"vertical"},
  {"problem":"A rectangle has a perimeter of 30 cm. If the length is 2x cm and the width is x + 5 cm, find the length and width of the rectangle.","expression":"2(2x + x + 5) = 30","solution":"{length: 10 cm, width: 7 cm}","prompt":"mumble"},
  {"problem":"A train travels x kilometers every hour. If it travels 5 kilometers ahead of schedule, how many kilometers has it traveled in y hours? Write an algebraic expression to represent this.","expression":"x + 5y","solution":"If the train travels 5 kilometers ahead of schedule and x kilometers every hour, it has traveled x + 5y kilometers in y hours.","prompt":"ahead"},
  {"problem":"A rectangle has a perimeter of 40 cm. If the length is 3x cm and the width is 2x cm, express the area of the rectangle as an algebraic expression.","expression":"A = 6x^2 cm^2","solution":"The area of the rectangle is 6x^2 cm^2.","prompt":"epilepsy"},
  {"problem":"A rectangle has a perimeter of 40 cm. If the length is 3x cm and the width is x cm, express the area of the rectangle as an algebraic expression.","expression":"2(3x + x) = 40cm","solution":"6x + 2x = 40cm\n8x = 40cm\nx = 5cm\nArea = 3x * x = 3 * 5cm * 5cm = 75cm^2","prompt":"misuse"},
  {"problem":"A rectangle has a length that is 3 cm more than its width. If the perimeter of the rectangle is 40 cm, find the length and width.","expression":"Let l and w represent the length and width of the rectangle.\n\nPerimeter = 2(l + w) = 40\n\nLength = l = w + 3","solution":"Width (w) = 8 cm\nLength (l) = 11 cm","prompt":"honeymoon"},
  {"problem":"A bowl has a radius of x cm. If the bowl's height is 2x cm, find the volume of the bowl in cubic centimeters.","expression":"V = (4/3)πx^3","solution":"If the radius is 3 cm, the volume of the bowl is V = (4/3)π(3)^3 = 18π cm^3.","prompt":"bowl"},
  {"problem":"A rectangular room is 2x meters in length and x + 3 meters in width. What is the area of the room in square meters?","expression":"A = 2x(x + 3)","solution":"A = 2x^2 + 6x square meters","prompt":"unpack"},
  {"problem":"A rectangular garden has a perimeter of 100 meters. If the length is x meters, express the width of the garden in terms of x.","expression":"2x + 2w = 100","solution":"w = (50 - x)/x","prompt":"sincerity"},
  {"problem":"A square has a perimeter of 4x + 8. Find the length of one side of the square.","expression":"P = 4x + 8 <=> x = (P - 8) / 4","solution":"If the perimeter is 20, the length of one side is (20 - 8) / 4 = 3.","prompt":"mortal"},
  {"problem":"A square has a perimeter of 4x + 8. Find the length of its side.","expression":"4x + 8 = 4s","solution":"s = (4x + 8) / 4 = x + 2","prompt":"screaming"},
  {"problem":"A mixer has a radius that is 3x cm. What is the area of the mixer's circular base in terms of x?","expression":"π(3x)^2","solution":"9πx^2 cm^2","prompt":"mixer"},
  {"problem":"The height of a mounting tree is represented by h meters. If the tree is growing at a rate of 2 meters per year, write an algebraic expression that represents the height of the tree after t years?","expression":"h + 2t","solution":"The height of the tree after t years will be h + 2t meters.","prompt":"mounting"},
  {"problem":"In a solar panel, the current flowing through a circuit is directly proportional to the voltage. If the current is 3A when the voltage is 6V, find the current when the voltage is 8V.","expression":"I = 3A + 6V/8V","solution":"I = 3A + (6/8) * 8 = 3A + 6A = 9A","prompt":"solar"},
  {"problem":"A rectangular garden is 3x meters long and 2x meters wide. What is the perimeter of the garden in meters?","expression":"2(3x + 2x)","solution":"2(5x) = 10x meters","prompt":"adjacent"},
  {"problem":"A rectangle has a perimeter of 30 cm. If the length is 2x cm and the width is x cm, express the area of the rectangle as an algebraic expression.","expression":"A = 2x^2 cm^2","solution":"The area of the rectangle is 2x^2 cm^2.","prompt":"copy"},
  {"problem":"A square has a side length of x cm. If the square is turned 90 degrees, what is the new area of the square in cm^2?","expression":"A = x^2 cm^2","solution":"If the square is turned 90 degrees, the new side length is x cm. The new area is x^2 cm^2.","prompt":"turn"},
  {"problem":"A rectangle has a length that is 3 meters more than its width. If the perimeter of the rectangle is 40 meters, find the length and width of the rectangle.","expression":"Let x be the width of the rectangle.\nLength = x + 3\nPerimeter = 2(x + 3) + 2x = 40","solution":"x = 6\nx + 3 = 9","prompt":"start"},
  {"problem":"A rectangle has a perimeter of 30 cm. If the length is 2x cm and the width is x cm, express the area of the rectangle as an algebraic expression.","expression":"2(2x + x) = 30, A = 2x^2","solution":"2(2x + x) = 30 => 2(3x) = 30 => 6x = 30 => x = 5cm\nArea = 2x^2 = 2(5)^2 = 50 cm^2","prompt":"pivotal"},
  {"problem":"A triangle has an angle that is 3x degrees and another angle that is 2x + 10 degrees. If the third angle is 40 degrees less than the second angle, find the measures of all three angles.","expression":"3x + 2x + 10 = 180","solution":"x = 20. The angles are 60 degrees, 30 degrees, and 90 degrees.","prompt":"dangerous"},
  {"problem":"A rectangular room is 2x meters in length and x + 3 meters in width. Find the area of the room in square meters.","expression":"A = 2x(x + 3)","solution":"A = 2x^2 + 6x square meters","prompt":"revise"},
  {"problem":"A farmer has a rectangular field with an area of 12x^2 + 15x + 5. If the length is 3x + 1, what is the width of the field?","expression":"12x^2 + 15x + 5 = (3x + 1)(4x + 5)","solution":"4x + 5","prompt":"inconvenience"},
  {"problem":"A scholar buys notebooks for $2 each and pens for $1.50 each. If she buys x notebooks and y pens, how much did she spend in total? Express your answer as an algebraic expression.","expression":"2x + 1.50y","solution":"If she buys 5 notebooks and 7 pens, she spent 2(5) + 1.50(7) = $17.50 in total.","prompt":"scholarly"},
  {"problem":"A cube has a side length of x + 2 cm. Find the volume of the cube in cubic centimeters.","expression":"V = (x + 2)^3 cm^3","solution":"V = (x + 2)(x + 2)(x + 2) cm^3 = (x^3 + 6x^2 + 12x + 8) cm^3","prompt":"sherbet"},
  {"problem":"A rectangular garden is 3x meters long and 2x meters wide. What is the perimeter of the garden in meters?","expression":"2(3x + 2x)","solution":"2(5x) = 10x meters","prompt":"search"},
  {"problem":"A rectangle has a perimeter of 30cm. If the length is 3cm more than the width, find the length and width of the rectangle.","expression":"2(length + width) = 30, length = width + 3","solution":"{length}= {width + 3}, {width}= {15cm}","prompt":"frenzy"},
  {"problem":"A dishonest vendor charges $2x + 5 for a product that is actually worth $x - 3. How much more does the vendor charge for the product than its actual value?","expression":"2x + 5 - (x - 3)","solution":"x + 8","prompt":"fraud"},
  {"problem":"A rectangle has a perimeter of 4x + 8. If the length is 2x + 1, what is the width in terms of x?","expression":"2(2x + 1) + 2x = 4x + 8","solution":"x = 2","prompt":"thirsty"},
  {"problem":"A mercenary charges $x per hour for their services, and after working for y hours, they have earned a total of $150. Write an algebraic expression to represent this situation.","expression":"xy = 150","solution":"The mercenary charges $25 per hour and worked for 6 hours.","prompt":"mercenary"},
  {"problem":"A rectangle has a perimeter of 3x + 8. If the length is 2x + 4, find the value of the width.","expression":"2(2x + 4) + 2x + 8 = 3x + 8","solution":"x = 2","prompt":"seventeenth"},
  {"problem":"A piece of wooden board is 3x meters long and 2x meters wide. Find the perimeter of the board in meters.","expression":"2(3x + 2x)","solution":"2(5x) = 10x meters","prompt":"wooden"},
  {"problem":"A pheasant is 3x meters long and 2x meters wide. What is the perimeter of the pheasant's pen in meters?","expression":"2(3x + 2x)","solution":"2(5x) = 10x meters","prompt":"pheasant"},
  {"problem":"The perimeter of a rectangle is 4x + 8. If the length is 2x + 1, find the value of the width.","expression":"2x + 1 + 2x + 1 = 4x + 8","solution":"x = 3","prompt":"outgoing"},
  {"problem":"A rectangular cage has a perimeter of 40 meters. The length is 2 meters longer than the width. Find the length and width of the cage.","expression":"2x + 2(x + 2) = 40","solution":"x = 6, x + 2 = 8","prompt":"cage"},
  {"problem":"A rectangle has a length of x + 5 meters and a width of x - 2 meters. Find the perimeter of the rectangle in terms of x.","expression":"2(x + 5) + 2(x - 2)","solution":"2x + 10 + 2x - 4 = 4x + 6 meters","prompt":"transitional"},
  {"problem":"A rectangle has a perimeter of 30 cm. If the length is 3 cm more than the width, find the length and width of the rectangle.","expression":"2(l + w) = 30\n l = w + 3","solution":"l = 10 cm\nw = 7 cm","prompt":"does"},
  {"problem":"The length of a rectangle is 3x + 5 and the width is x - 2. Find the perimeter of the rectangle.","expression":"2(3x + 5) + 2(x - 2)","solution":"6x + 10 + 2x - 4 = 8x + 6","prompt":"key"},
  {"problem":"The area of a rectangle is represented by the expression 3x + 5. If the length is 2x + 1, find the value of x that makes the area equal to 20 square units.","expression":"3x + 5 = 20","solution":"x = 5","prompt":"unaccountable"},
  {"problem":"A rectangle has a perimeter of 4x + 8. If the length is x + 2, find the width.","expression":"2(length + width) = 4x + 8, length = x + 2","solution":"2(x + 2 + width) = 4x + 8, width = 2","prompt":"periodical"},
];

const summaryProblems = [
  {"paragraphs":["Sleekness is a captivating quality that can be found in various forms across the natural and man-made worlds. A sleek design emphasizes simplicity, elegance, and functionality. In the animal kingdom, animals like dolphins and cheetahs possess sleek bodies that enable them to navigate through water and land with remarkable speed and agility. Their streamlined shapes reduce resistance and maximize efficiency.","Sleekness extends beyond the physical realm. It can be applied to ideas, concepts, and even human experiences. A well-written story with a sleek plot captures the reader's attention effortlessly. A sleek website design showcases information in a clear and concise manner, enhancing user experience. In these instances, sleekness is about presenting information in a way that is visually appealing and easy to understand.","Sleekness is not merely about physical appearance or superficial qualities. It embodies a harmonious balance between functionality, elegance, and simplicity. It is about creating something that is both practical and visually stunning, something that inspires awe and admiration."],"summary":"Sleekness is a captivating quality that emphasizes simplicity, elegance, and functionality in both the natural and man-made worlds.","prompt":"sleek"},
  {"paragraphs":["A bustling boulevard is a vibrant artery of a city, teeming with life in every corner. People rush to and fro, their faces a kaleidoscope of expressions. Shops of all kinds line the sides, offering an endless array of goods and services. The air is filled with the melody of conversations, music from street performers, and the comforting aroma of freshly brewed coffee.","Boulevards are often the heart of a city. They are places where people gather to socialize, shop, or simply enjoy the atmosphere. Tall buildings and skyscrapers cast long shadows on the wide roads, creating a sense of awe and grandeur. The architecture reflects the unique character of the city, showcasing its rich history and cultural identity.","The boulevard is a place where dreams and aspirations collide. It is a stage where people can pursue their passions, find new opportunities, and make memories that will last a lifetime. From street artists showcasing their talents to entrepreneurs launching their first ventures, the boulevard is a testament to the boundless possibilities of human potential."],"summary":"Boulevards are lively and bustling streets that serve as the social and commercial hubs of cities, offering a diverse range of shops, services, and entertainment opportunities.","prompt":"boulevard"},
  {"paragraphs":["Indeed, throughout history, remarkable individuals have defied expectations and shattered barriers. From scientists who have unlocked the secrets of the universe to artists who have expressed themselves in extraordinary ways, these trailblazers have shown that anything is possible when one dares to dream big. Their stories inspire us to believe in ourselves and to pursue our own passions with unwavering determination.","Moreover, the spirit of innovation and progress is evident in the countless technological advancements we have witnessed. From the invention of the internet to the development of self-driving cars, humanity has consistently pushed the boundaries of what is deemed possible. These breakthroughs demonstrate that indeed, human ingenuity knows no limits and that the future holds endless potential for progress.","In conclusion, the statement 'indeed' aptly reflects the extraordinary feats of human achievement throughout history. From groundbreaking scientific discoveries to transformative technological advancements, the sheer magnitude of human progress is a testament to the boundless potential within each of us. The future is bright with possibility, and we can only imagine the remarkable things that await us as we continue to explore the limits of human imagination."],"summary":"Indeed, human achievements throughout history showcase the boundless potential of human ingenuity and inspire us to pursue innovation and progress.","prompt":"indeed"},
  {"paragraphs":["Some people might think that living in a big city is disadvantageous because of the crowded streets and noisy traffic. However, there are many advantages to living in a city, such as having access to many different types of people, places, and things. Cities are filled with people from all walks of life, which means there are always new and exciting people to meet. There are also many different places to explore, such as museums, restaurants, and shops. And, of course, cities have lots of opportunities for jobs and education.","Another advantage of living in a city is that you are close to many important things. Hospitals, schools, and grocery stores are all usually located within a short distance of each other. This makes it easy for people to get the things they need without having to travel far. Additionally, cities have reliable public transportation systems, which makes it easy for people to get around without having to drive.","Living in a city can also be advantageous because there are always new and exciting things happening. There are often festivals, concerts, and sporting events happening in cities. This means that there is always something to do and see. Cities are also great places to start a business or advance your career."],"summary":"Living in a city offers numerous advantages, such as diverse populations, plentiful opportunities, and frequent access to essential services and entertainment.","prompt":"advantageous"},
  {"paragraphs":["Merriment fills our lives with joy and laughter. It's the sweet feeling of happiness that spreads like sunshine on a warm day. Merriment can be as simple as sharing a silly joke with a friend or as grand as celebrating a special achievement. It's the infectious energy that makes us want to join in and celebrate life's special moments.","Merriment is often associated with festive occasions like birthday parties, holiday celebrations, or family gatherings. But it can also be found in the little things we do every day. A warm cup of hot chocolate on a cold day, a cozy blanket on the couch while watching a movie, or even a playful game with our pets can bring immense merriment. These small moments add up to a joyful and fulfilling life.","Merriment is vital for a healthy life. It reduces stress, boosts our immune system, and even improves our physical health. When we are merry, we release endorphins which have mood-boosting effects. Surrounding ourselves with joyful people and engaging in playful activities can lead to a happier and more fulfilling life."],"summary":"Merriment is the essence of happiness, bringing joy, laughter, and fulfillment to our lives through both grand celebrations and everyday moments.","prompt":"merriment"},
  {"paragraphs":["Solidarity is a powerful force that connects people from different backgrounds, cultures, and beliefs. It means standing together with others who share our values or who are facing adversity. True solidarity is built on trust, respect, and a willingness to support others. When people unite in solidarity, they can overcome challenges, achieve common goals, and create a better world. By working together, we can create a more just and equitable society for all.","Solidarity is not limited to physical presence or shared identities. It can also exist in the virtual world. Social media platforms and online communities can foster solidarity by connecting people from different parts of the world. Online communities can provide a space for people to share their stories, discuss common challenges, and find support. This sense of connection can create a powerful sense of belonging and solidarity.","Solidarity is an essential ingredient for social change. When people stand together in solidarity, they can bring about positive change in their communities and the world. Social movements such as civil rights movements and environmental movements rely on solidarity to achieve their goals. By working together, people can create lasting change and build a better future."],"summary":"Solidarity is a fundamental principle that promotes unity, supports individuals and groups in facing challenges, and drives social change.","prompt":"solidarity"},
  {"paragraphs":["Myths are tales passed down through generations, filled with magic, heroes, and fantastical creatures. These stories often reflect the values and beliefs of the people who told them. One such myth is the tale of Achilles, a legendary warrior known for his immense strength and unwavering determination. He was destined to be a hero, but his fatal flaw was his pride. His inability to control his temper often led him to make reckless decisions, ultimately leading to his downfall.","Another captivating myth is that of the Golden Fleece. In this story, the Fleece is said to possess healing powers. Many brave adventurers have attempted to claim the Fleece, but only the most worthy have been able to retrieve it. The myth of the Golden Fleece highlights the idea that true courage and determination are essential for achieving greatness.","Myths inspire us to dream big and believe in ourselves. They teach us valuable lessons about overcoming challenges, the importance of humility, and the power of human potential. The stories we hear and the characters we meet in these myths stay with us, shaping our imagination and reminding us of the limitless possibilities that exist in the world."],"summary":"Myths entertain and inspire by showcasing human values, heroic deeds, and fantastical elements.","prompt":"myth"},
  {"paragraphs":["Imagine a world where anything is possible. Where gravity is a suggestion and trees can fly. In this wondrous realm, creatures exist that defy imagination, their wings as colorful as sunsets and their eyes as sparkling as the night sky. The very air is filled with a melody of impossible sounds, creating a symphony that dances around you.","Anything can be real in this realm. Mountains can be made of chocolate, oceans of popcorn, and houses of marshmallow. Even the most outlandish ideas become reality, fueled by the boundless imagination of those who dare to dream. The possibilities are endless, limited only by the limits of one's own imagination.","The beauty of a world where anything is possible lies in the freedom it offers. The freedom to be whoever you want, to do whatever you please, and to explore ideas that would otherwise be deemed impossible. This is a world where creativity reigns supreme, and the imagination is the only limit."],"summary":"In a world where anything is possible, boundless imagination and limitless creativity flourish.","prompt":"anything"},
  {"paragraphs":["An adage is a short, witty saying that contains a piece of advice or wisdom. It is often used to express a general truth or principle. Adages can be found in many cultures and languages, and they often reflect the shared experiences and values of a particular group. Some well-known adages include 'Early to bed, early to rise' and 'A picture is worth a thousand words.'","Adages are often used in everyday conversations to convey complex ideas in a concise and memorable way. They can also be used to add humor and color to a conversation. When used effectively, adages can help to communicate ideas clearly and engagingly. They can also create a sense of connection and belonging among those who share them.","Adages are valuable tools that can help us to learn and grow. By sharing and understanding different adages, we can gain access to a wealth of wisdom and advice that can guide us throughout our lives. From improving our relationships to making better decisions, adages can provide us with the insights we need to navigate the challenges of life."],"summary":"Adages are short, witty sayings that offer practical advice and wisdom, reflecting cultural values and often conveying complex ideas in a concise manner.","prompt":"adage"},
  {"paragraphs":["A recession is a period of economic decline that affects a whole country. It's like a storm that takes away jobs, businesses, and even people's homes. Recessions can be caused by many things, like too much debt, bad investments, or even a pandemic. During a recession, prices of things like food and gas often go up, and people might have less money to buy things.","Recessions can be scary and stressful for people. Many families lose their jobs and have to struggle to put food on the table. Businesses might close their doors forever, leaving communities without important services. But recessions are also a chance for people to learn and grow. Some businesses fail, but new ones often take their place. People also learn to spend their money more wisely and become more resourceful.","Recessions can be tough, but they're not the end of the world. By learning from the past and working together, we can overcome recessions and build a stronger future."],"summary":"Recessions are periods of economic decline caused by various factors, leading to job losses, business closures, and financial challenges for individuals and communities.","prompt":"recession"},
  {"paragraphs":["A trial is a formal process where someone accused of wrongdoing is given a chance to defend themselves. It's like a mini-court where facts are presented, witnesses are questioned, and a judge makes the final decision. The accused can be found guilty or not guilty based on the evidence presented. The entire process is designed to ensure that justice is served and that the rights of the accused are protected.","In a trial, the prosecution team, which represents the government, gathers evidence to support their claim that the accused is guilty. They present witness testimonies, physical evidence, and other facts that link the accused to the crime. The defense team, on the other hand, tries to poke holes in the prosecution's case by cross-examining witnesses, presenting their own evidence, and arguing that the accused is innocent. This back-and-forth exchange of information is crucial in determining the outcome of the trial.","Trials are important because they provide a way to resolve legal disputes and ensure that those who break the law are held accountable. The process is complex and demanding, but it is also a vital part of our legal system. By ensuring that trials are fair and impartial, we can maintain a just and peaceful society."],"summary":"Trials are formal processes where the accused is given a chance to defend themselves against accusations of wrongdoing.","prompt":"trial"},
  {"paragraphs":["Sarcasm is a playful weapon of words that shoots down negativity with a witty remark. It's like a mischievous artist who uses words to paint funny or ironic pictures in people's minds. Sarcastic comments often start with seemingly serious statements, but then twist the meaning with a playful tone or exaggerated exaggeration. For example, someone might sarcastically say, 'Oh, you're a genius!' when they clearly think the person is not intelligent. This humor arises from the clash between the literal meaning and the sarcastic intent.","Sarcasm isn't just about making fun of others. It can also be used to poke fun at ourselves or to challenge unfair or boring rules. When people use sarcasm to challenge authority, they are showing their creativity and willingness to think outside the box. This can be a powerful tool for change, as it can inspire others to question things and find new ways of thinking.","Sarcasm is like a delicate flower that needs the right setting to bloom. It thrives in friendly conversations where people can understand the playful intent and appreciate the humor. When used wisely and respectfully, sarcasm can be a delightful addition to our verbal arsenal, adding depth and fun to our communication."],"summary":"Sarcasm is a witty and playful use of language that challenges expectations and adds humor to conversations.","prompt":"sarcasm"},
  {"paragraphs":["A stuffy room feels like a cozy hug on a chilly day. The blankets are like warm arms, and the pillows are soft cushions against the cold floor. The closed windows keep the outside noises out, and the gentle breeze inside feels like a quiet lullaby. Everything feels still and peaceful, like a peaceful haven away from the busy world.","But sometimes, stuffiness can be a little too much. When the air is too thick, it can feel hard to breathe. The closed windows can trap dust and pollen, making it difficult to cough or sneeze. The lack of air circulation can also make people feel sleepy and sluggish. It's important to open the windows and let in some fresh air to keep the room comfortable and healthy.","The right amount of stuffiness can be cozy and comforting. But too much stuffiness can be suffocating and unhealthy. Finding the perfect balance is key to creating a comfortable and enjoyable space."],"summary":"Stuffiness can be enjoyable in moderation, but too much of it can be uncomfortable and unhealthy.","prompt":"stuffy"},
  {"paragraphs":["A figure can be anything that has size and shape. It can be a person, an animal, an object, or even an idea. Figures can be real or imaginary. A real figure is something that exists in the physical world, like a tree or a dog. An imaginary figure is something that exists only in the imagination, like a dragon or a fairy. Figures can be tall or short, thin or wide, and they can have many different features. The shape and size of a figure can tell us a lot about it.","The way a figure is positioned can also be important. A figure that is standing tall and proud might be confident or powerful, while a figure that is hunched over might be feeling sad or weak. The position of a figure can also suggest action or movement. A figure that is running might be in a hurry, while a figure that is sitting still might be relaxed or thoughtful.","Figures can be used in many different ways. Artists often use figures to tell stories or express emotions. Writers sometimes use figures to create vivid descriptions of their characters. Even in everyday language, we often use figures of speech, such as metaphors or similes, to make our words more interesting and engaging."],"summary":"Figures are representations of physical or imaginary objects or concepts, characterized by their size, shape, position, and features.","prompt":"figure"},
  {"paragraphs":["Heritage is more than just physical objects or traditions. It encompasses the beliefs, values, and stories that make up who we are. It connects us to our ancestors and gives us a sense of identity. Our heritage is something we inherit from those who came before us, and it is something we pass on to future generations. It is the foundation of our culture and the driving force behind our actions and decisions.","Every family has a unique heritage filled with memories, traditions, and stories. These traditions can range from simple rituals to complex celebrations. They can be as small as a special dish passed down from generation to generation or as large as a cultural festival that showcases traditional clothing, music, and dance. These traditions are what make up our family identity and help us feel connected to our ancestors.","Heritage is not just something that belongs to the past. It is alive and well in the present. Our heritage influences our values, our beliefs, and our actions. It is a source of pride and inspiration, reminding us of the strength and resilience of our ancestors. By embracing our heritage, we can learn from the past and build a brighter future."],"summary":"Heritage is a vital aspect of identity, connecting individuals to their ancestors and shaping their values, traditions, and actions.","prompt":"heritage"},
  {"paragraphs":["Eating is an essential part of life. From the delicious breakfast that fuels our bodies to the healthy snacks that keep us going throughout the day, food sustains us and helps us grow. Different foods provide different nutrients that our bodies need to function properly. Fruits and vegetables are packed with vitamins and minerals that keep us strong and healthy. Proteins and carbohydrates give us energy to run and play.","Eating together can be a social experience. Sharing meals with family and friends creates memories that last a lifetime. It can also be a way to learn about different cultures and traditions. Different countries have their own unique cuisines with special dishes and ingredients that reflect their heritage. Trying new foods can be an exciting adventure and a way to discover new favorites.","Eating healthy is important for our long-term well-being. Choosing nutritious foods over processed foods helps us maintain a healthy weight and reduce our risk of chronic diseases such as obesity and diabetes. Eating fresh fruits and vegetables also gives us the vitamins and minerals we need to stay healthy and fight off illnesses."],"summary":"Eating provides sustenance, social connection, and contributes to overall well-being.","prompt":"comer"},
  {"paragraphs":["A hearty person is someone who has a strong and healthy constitution. They have a positive attitude and a willingness to tackle challenges. Their energy and enthusiasm are contagious, inspiring others to be their best selves. A hearty individual is always ready to lend a helping hand and make a difference in the lives of others.","A hearty breakfast fuels a hearty day. A nutritious meal with plenty of fruits, vegetables, and whole grains gives our bodies the energy they need to get through the day. The vitamins and minerals in these foods strengthen our immune systems and protect us from getting sick. A hearty breakfast sets the stage for a successful and productive day.","A hearty laugh is the best medicine. When we share a good joke or funny story, our worries and troubles seem to melt away. Laughter has a positive impact on our physical and mental health. It reduces stress, boosts our mood, and even strengthens our immune system."],"summary":"A hearty person is characterized by their strong constitution, positive attitude, and willingness to contribute to the well-being of others.","prompt":"hearty"},
  {"paragraphs":["Imagine stepping into a cozy library, the warm scent of old books filling the air. Sunlight filters through stained glass windows, casting colorful patterns on the walls. This is the inside of a place where stories come to life.","Inside our homes, we find a sanctuary. It's where we feel safe and loved. Our bedrooms are filled with the things that comfort us, like cozy beds, fluffy pillows, and nightlights that cast a gentle glow. The kitchen is where we gather as a family to share meals and laughter.","The inside of our minds is just as important as the physical inside of our bodies. It's where our thoughts and dreams live. We have the inside of our hearts, which holds love and compassion, and the inside of our heads, which is filled with memories and ideas."],"summary":"The inside of a place, whether physical or mental, offers a sense of comfort, safety, and a place where stories and memories flourish.","prompt":"inside"},
  {"paragraphs":["In a world filled with drama and unexpected twists, scandal can be a powerful force that shakes the ground beneath our feet. A scandal is an event or action that gravely damages someone's reputation or standing in society. It often involves wrongdoing, betrayal, or something that goes against widely accepted norms. From political corruption to celebrity misbehavior, scandals can capture the public's attention and leave lasting scars.","Scandals can be incredibly damaging to those involved. The victims of scandals often face public scrutiny, criticism, and even legal consequences. The media loves to sensationalize scandals, exploiting the personal lives of those involved for ratings. This constant scrutiny can lead to emotional distress, financial losses, and even threats to personal safety.","While scandals can be shocking and captivating, it is important to remember that they are not always black and white. Sometimes, the truth behind a scandal is more complex than it appears. It is important to investigate all sides of the story and make an informed judgment."],"summary":"Scandals are events or actions that gravely damage someone's reputation due to wrongdoing, betrayal, or violations of social norms.","prompt":"scandalous"},
  {"paragraphs":["Vinegar is a tangy liquid that has been used in kitchens for centuries. It is made from fermented grapes or other fruits, and it adds a unique flavor to many dishes. Vinegar can be used as a condiment, a preservative, or even as a cleaning agent. Its versatility and delicious taste make it a staple in many households.","Vinegar has many health benefits as well. It is a natural antibiotic and antibacterial agent, which can help to keep food fresh. It is also a good source of acetic acid, which has been shown to have several health benefits. Acetic acid can help to improve digestion, reduce inflammation, and even lower blood pressure.","Vinegar is a versatile and flavorful ingredient that has been used for centuries. It adds flavor to food, preserves it, and even has health benefits. Its affordability and delicious taste make it a beloved staple in many cuisines around the world."],"summary":"Vinegar is a flavorful and versatile liquid with culinary, preservative, and health benefits.","prompt":"vinegar"},
  {"paragraphs":["Peaches are juicy, sweet treats that grow on tall trees. They come in many different sizes and shapes, from tiny bites to huge, fuzzy ones. The most popular variety is the Georgia peach, known for its sweet flavor and soft flesh. Peaches are a delicious snack on their own, but they can also be used in many different recipes. From pies and jams to ice cream and cobblers, peaches add a touch of sweetness to every dish.","Peaches are packed with vitamins and minerals, making them a healthy treat. They are a good source of vitamin C, which helps boost the immune system, and fiber, which is important for digestion. Additionally, peaches contain antioxidants that can help protect the body from disease. These healthy benefits make peaches a great choice for people of all ages.","Peaches are more than just delicious fruits. They are also a symbol of summer and nostalgia. The scent of ripe peaches evokes memories of childhood memories and warm summer days. This makes peaches even more special and enjoyable to savor."],"summary":"Peaches are sweet, juicy fruits that offer a combination of delicious flavor, nutritional value, and sentimental significance.","prompt":"peach"},
  {"paragraphs":["Importance plays a crucial role in shaping our lives. From the tiny grains of sand that make up a towering dune to the vast oceans that cover our planet, every little thing has an impact on the world around us. The things we deem important are the ones that we value, prioritize, and strive to achieve. These could be our families, our dreams, or even something as simple as a warm cup of coffee in the morning.","When we truly believe something is important, we are more likely to put in the effort to make it happen. This could mean studying hard to achieve a good grade, helping others in need, or making time for the things we love. The importance of something often inspires us to take action and make a difference.","Therefore, it is important to carefully consider what we deem important in our lives. By prioritizing the things that truly matter, we can live a more fulfilling and meaningful life. True importance lies not in material possessions or external validation, but in the values, relationships, and dreams that we hold dear."],"summary":"Importance shapes our lives and inspires us to take action by valuing, prioritizing, and actively pursuing what we deem important.","prompt":"importantly"},
  {"paragraphs":["Some people are insatiable, forever craving more. This insatiable desire can drive them to achieve great things, but it can also lead to trouble. For example, some children are insatiable learners, always wanting to know more and explore new ideas. This insatiable curiosity helps them grow and become well-rounded individuals. However, others may become insatiable in their desire for material possessions, leading to unhealthy spending habits and financial struggles.","Insatiable hunger can be both a blessing and a curse. While it can motivate people to work harder and achieve their goals, it can also lead to greed and dissatisfaction. Those with insatiable appetites often feel like they never have enough, leading to persistent cravings and a sense of emptiness. This can negatively impact their relationships, as they may become too focused on their own desires to notice the needs of others.","Insatiable desire can be managed by setting limits and prioritizing. It is important to recognize when cravings become excessive and to seek balance in life. By cultivating a sense of contentment and gratitude, people can learn to satisfy their insatiable desires without harming themselves or others."],"summary":"Insatiable desire can be both beneficial and detrimental, driving individuals towards greatness but also potentially leading to greed and dissatisfaction.","prompt":"insatiable"},
  {"paragraphs":["Our ears are incredible tools that allow us to experience the world of sound. From the gentle whisper of the wind to the symphony of voices around us, hearing is a sense that brings us joy, information, and a deeper connection to others. Each ear is equipped with intricate structures like the eardrum and bones that work together to capture vibrations in the air and translate them into electrical signals that our brains can understand.","The process of hearing starts with the eardrum, which is like a thin membrane that vibrates in response to sound waves. These vibrations are then transferred through bones in the ear, called the malleus, incus, and stapes, to the inner ear. This mechanical process converts the sound waves into electrical signals that are sent to the brain for interpretation.","Hearing is not just about physical processes. It is also about the ability to interpret and understand the sounds we hear. Our brains are trained to recognize patterns and meaning in the sounds around us, allowing us to identify voices, music, and even the spoken word. This complex process involves memory, language, and cultural background."],"summary":"Hearing is a multifaceted process that involves the physical functioning of the ear, the interpretation of sound waves by the brain, and the cultural context in which sounds are experienced.","prompt":"hearing"},
  {"paragraphs":["Primary education lays the foundation for a child's entire educational journey. It is where young minds first encounter the wonders of knowledge and develop a love for learning. The primary years are crucial for nurturing intellectual curiosity, fostering creativity, and cultivating essential skills such as reading, writing, and numeracy. By providing a solid base in these areas, primary education empowers children to navigate the complexities of future learning.","The primary stage of education is also pivotal for social and emotional development. Children learn to interact with peers, develop social skills, and navigate interpersonal relationships. They discover their strengths, explore their passions, and cultivate important values such as empathy, respect, and responsibility. These formative experiences lay the groundwork for a well-rounded individual who can thrive both academically and socially.","In conclusion, primary education is the cornerstone of a child's education. It fosters intellectual growth, nurtures social and emotional development, and lays the groundwork for future success. By investing in quality primary education, we empower young minds to become lifelong learners and productive members of society."],"summary":"Primary education provides a foundational base for intellectual, social, and emotional development, laying the groundwork for future academic success and personal growth.","prompt":"primary"},
  {"paragraphs":["Carps are fascinating fish known for their sleek bodies and powerful tails. They can be found in freshwater habitats across the world, swimming in groups and displaying captivating behaviors. Carps are vegetarians, feeding on algae and plants, and their large mouths with rows of teeth help them munch on these underwater treats. They are also known for their ability to jump out of the water, sometimes landing on the surface of the pond or lake. Their playful antics and energetic movements make them a joy to watch.","Carps have a rich history and cultural significance. In many countries, they are considered a delicacy and are often farmed for food. The practice of carp farming dates back centuries, and today, it is a significant industry providing food and income for people worldwide. Additionally, carps play a role in traditional ceremonies and festivals, where their colorful scales and graceful movements symbolize abundance and good fortune.","Carps are valuable members of the aquatic ecosystem, contributing to the balance of freshwater habitats. They help control algae growth through their feeding habits, and their presence can attract other fish and wildlife to the area. Carps also serve as a food source for larger predators, ensuring a harmonious connection within the natural world."],"summary":"Carps are remarkable fish with diverse characteristics, ecological significance, and cultural importance.","prompt":"carp"},
  {"paragraphs":["Imagine a world where sights, sounds, and smells completely surround you. This is the power of immersion. It's like stepping into a book, a game, or even a different country. When we immerse ourselves in an experience, our minds are filled with new information and our imaginations can take flight. From exploring ancient ruins to discovering new musical genres, immersion is a journey that captures our attention and transports us to different realms.","Immersion can be as simple as listening to a captivating story. The words paint pictures in our minds, transporting us to the setting of the tale. It can also be as complex as stepping into a virtual reality game, where we can physically interact with the environment. The possibilities are endless, and the level of immersion can be adjusted to suit our preferences.","The beauty of immersion lies in the complete engagement it fosters. When we immerse ourselves in an activity, our worries and troubles fade away. We become fully focused on the present moment, enjoying the sensations and learning new things. This sense of deep engagement is what makes immersion so powerful and enjoyable."],"summary":"Immersion offers a complete sensory and emotional experience, transporting individuals to different worlds and fostering deep engagement.","prompt":"immerse"},
  {"paragraphs":["Rotten food is a smelly and unpleasant sight in the kitchen. It's the kind of food that makes your nose wrinkle and your stomach turn. Spoiled fruits and vegetables release gases that can make the whole house smell bad. Sometimes, even the trash can starts to smell rotten because of all the scraps that go in there.","The reason food gets rotten is because of bacteria. Bacteria are tiny living things that can multiply quickly and eat away at food. They love warm, moist environments and are especially fond of sugary or starchy foods. Once bacteria get into your food, they start to break down the molecules that give it its flavor, texture, and nutrients. This process creates new molecules that smell and taste bad.","It's important to throw away rotten food right away to keep it from spoiling other foods in the refrigerator or freezer. Rotting food can also attract pests like flies and beetles. It's best to check food regularly and throw away anything that looks or smells spoiled."],"summary":"Rotten food is caused by bacteria that break down food molecules and produces unpleasant smells and flavors.","prompt":"rotten"},
  {"paragraphs":["Consolidation is about bringing things together to make them simpler and more efficient. It's like combining two toy boxes filled with blocks to make one bigger box with all the blocks. This process can be applied to many things in life, such as combining multiple files into one document or organizing messy papers into folders. The goal is to reduce clutter and make things easier to manage.","When we consolidate, we can eliminate unnecessary duplicates and focus on the essentials. This saves space, reduces confusion, and allows us to access information or items more quickly. For example, a school might consolidate textbooks from different subjects into a single online platform, making it easier for students to access them all in one place. This not only saves space in libraries but also helps students stay organized.","Consolidation can also be used to improve efficiency and productivity. By combining tasks or processes, we can reduce the amount of time spent on non-essential activities. This frees up valuable resources that can be used for more important things. In business, companies often consolidate their operations to streamline their processes and reduce costs."],"summary":"Consolidation is the process of bringing together multiple items or processes to simplify and improve efficiency.","prompt":"consolidate"},
  {"paragraphs":["A devout person is someone who has a deep and sincere commitment to their beliefs. They are guided by their faith and principles, and their actions reflect their spiritual values. Devout individuals often prioritize spiritual growth and seek to live in accordance with their beliefs. They are known for their unwavering faith and their willingness to serve others in the name of their beliefs.","Devotion can manifest in various ways. It can be seen in the way people pray, meditate, or engage in acts of worship. It can also be expressed through charitable contributions, volunteering, or engaging in spiritual discussions and studies. Devout individuals often find comfort and inspiration in their beliefs, and they may find purpose and meaning in serving their spiritual community.","Devotion requires dedication and discipline. It involves overcoming challenges and temptations, and remaining steadfast in one's beliefs. Devout people are willing to sacrifice their time, energy, and even material possessions for their spiritual growth. Their unwavering commitment to their beliefs often inspires others and leads to a sense of fulfillment and peace."],"summary":"Devotion is a deep and sincere commitment to spiritual beliefs, characterized by unwavering faith, spiritual growth, and selfless service.","prompt":"devout"},
  {"paragraphs":["The little worm wriggled and squirmed through the soft dirt, its plump body pulsating with each tiny muscle. It seemed like an endless adventure, a thrilling escape from the dry leaves and dusty patches above ground. The worm's squirming and wriggling were a mesmerizing dance, a graceful waltz in the silent symphony of the garden.","As the worm continued its squirming journey, it unearthed hidden treasures. Tiny worms, like microscopic explorers, tunneled through the soil, unearthing sparkling quartz crystals and smooth, round pebbles. The worm's squirming was a treasure hunt, leading to the discovery of secrets buried deep beneath the surface.","The squirming worm eventually reached its destination, a juicy apple core left behind by a careless bird. It burrowed into the sweet flesh, munching and crunching with each bite. The worm's squirming had led it to a delicious meal, proving that even the most seemingly mundane movements can lead to something truly satisfying."],"summary":"The worm's squirming and wriggling are a fascinating display of movement, uncovering hidden treasures and leading to unexpected delights.","prompt":"squirm"},
  {"paragraphs":["Badminton is an exciting sport that requires skill, strategy, and teamwork. Played on a rectangular court with a net, two or four players hit a shuttlecock back and forth using rackets. The objective is to score points by sending the shuttlecock over the net and into your opponent's court. Badminton is a fast-paced and enjoyable sport that can be enjoyed by people of all ages and abilities.","The key to playing badminton effectively is to have good hand-eye coordination and timing. Players need to anticipate the movement of the shuttlecock and react quickly to hit it. Proper footwork is also important for moving around the court and reaching the shuttlecock. Badminton requires teamwork and communication between players to win points and achieve victory.","Badminton is a fantastic way to get exercise, socialize, and have fun. It is a popular sport in many countries and is often played in school physical education classes and local clubs. The mental and physical benefits of badminton make it a valuable activity that can contribute to a healthy lifestyle."],"summary":"Badminton is an enjoyable and competitive sport that requires skill, strategy, and teamwork to play effectively.","prompt":"badminton"},
  {"paragraphs":["Imagine a warm hug on a chilly day, or a cozy blanket on a rainy afternoon. That's the feeling of being coddled - being cared for and protected. Sometimes, people need a little extra love and attention, and that's perfectly okay. Just like a fluffy puppy or a sweet baby, people can benefit from being coddled, especially when they're feeling down or need a helping hand.","There are many ways to coddle someone. It could be offering a listening ear when they're feeling sad, or helping them with a difficult task. A gentle touch, like a hug or a pat on the shoulder, can also be incredibly comforting. It's about showing someone that you care and that you're there for them.","Coddling isn't just for physical comfort. It's about providing emotional support, understanding, and encouragement. It's about showing someone that they are loved and valued, which can be incredibly important for their well-being. A little bit of extra love can go a long way in making someone feel special and cared for."],"summary":"Coddling is a gesture of love and care that provides physical and emotional comfort, offering support and understanding when someone needs it.","prompt":"coddle"},
  {"paragraphs":["The cross stands as a powerful symbol, representing sacrifice and redemption. Throughout history, it has been used in various cultures and religions to represent significant events and beliefs. From ancient Egyptian hieroglyphs to the crucifixion of Jesus Christ in Christianity, the cross has held deep meaning for countless civilizations.","In many religions, the cross symbolizes the ultimate sacrifice made by a deity or revered figure. For Christians, the cross represents the crucifixion and resurrection of Jesus Christ, which is central to their faith. Similarly, in Buddhism, the cross symbolizes the passing of suffering through the act of self-sacrifice.","The cross serves as a reminder of the immense love and sacrifice that people are willing to make for their beliefs. It stands as a testament to the resilience of the human spirit and the power of faith to overcome adversity."],"summary":"The cross symbolizes sacrifice and redemption across various cultures and religions, representing the ultimate act of selflessness and faith.","prompt":"cross"},
  {"paragraphs":["Imagine a bustling marketplace filled with colorful fruits and vegetables. Some juicy oranges and plump tomatoes are rolling around freely, causing quite a mess. But there's no need to worry! Nearby, there's a tall basket just waiting to contain them. By placing the fruits inside, we keep them organized and prevent them from getting lost or bruised. This ability to contain things is important in many different situations, just like the basket in the marketplace.","Sometimes, we need to contain our emotions. When we feel angry or excited, our feelings can get overwhelming. But just like putting a lid on a jar of pickles, we can use strategies to contain these emotions. We can take a deep breath, count to ten, or talk to a trusted friend. These techniques help us manage our feelings and avoid getting into trouble.","Containment isn't just about physical objects or emotions. It can also be used to protect valuable information. Just like storing a computer's data in a secure folder, we can contain sensitive information by encrypting it or using strong passwords. This ensures that only the right people can access it and that it stays safe from unauthorized individuals."],"summary":"Containment is the act of enclosing or managing something to keep it organized, protected, or under control.","prompt":"contain"},
  {"paragraphs":["Thumping is an action that can describe a variety of activities, from playful games to powerful movements. When something is thumped, it usually involves making a loud, rhythmic noise. This action can be used to express excitement, joy, or even frustration. In some cases, thumping can also be used as a way to communicate or signal others. For example, children often thump their chests or fists to show they are happy or proud.","Thumping can also be used in physical activities. Athletes often thump the ground or their opponents to show their strength or determination. In sports like basketball or soccer, a thump can be used to celebrate a goal or to intimidate the other team. The sound of a thump can be both exhilarating and motivating.","Thumping can also be used in artistic expressions. In music, a thump can be used to create a rhythmic beat or to emphasize certain notes or melodies. In art, a thump can be used as a symbol or representation of a particular emotion or concept."],"summary":"Thumping is a versatile action that can express a wide range of emotions, from joy and excitement to frustration and determination.","prompt":"thump"},
  {"paragraphs":["In the hushed whispers of the morning, a tiny snip of morning dew hangs suspended in the spider's web. The dewdrop, like a miniature mirror, reflects the first rays of the rising sun. Its delicate surface shimmers with an iridescent glow, catching the fleeting light like precious gems. The snip of dew, though small, holds a captivating beauty that momentarily arrests the world in its peaceful dance.","Every snip of dew is unique. Some are as large as a pencil eraser, while others are as tiny as a speck of dust. Each droplet is a masterpiece of natural artistry, formed by the gentle condensation of water vapor in the air. The varying sizes and shapes of the dewdrops create a captivating diversity that adds to the beauty of the morning landscape.","The fleeting nature of the snip of dew is both enchanting and heartbreaking. As the sun ascends and warms the earth, the dew gradually evaporates, leaving behind only a trace of its presence. This constant dance of creation and destruction reminds us of the delicate balance of life on Earth."],"summary":"The snippet of morning dew showcases the wonders of natural artistry and the delicate balance of life.","prompt":"snip"},
  {"paragraphs":["Greetings are an essential part of social interaction, expressing respect, acknowledging others, and fostering connections. A warm and friendly greeting can instantly lighten the mood, make someone feel valued, and create a positive atmosphere. It is important to learn and use appropriate greetings in different situations, such as greeting teachers, classmates, or people in positions of authority. A simple 'hello' or 'good morning' can go a long way in building relationships and establishing positive connections.","Different cultures and societies have their own unique greeting customs. Some common greetings include shaking hands, bowing, or exchanging hugs. Each culture has its own traditions and interpretations of these gestures, so it is important to be respectful of cultural differences when greeting people from different backgrounds. Learning about different customs can also help you make meaningful connections with people from diverse backgrounds.","The importance of greeting others extends beyond just saying hello. It is also about acknowledging their presence, showing that you see and value them. A genuine and heartfelt greeting can convey respect, empathy, and a desire to connect with the person on a deeper level. By taking the time to greet others thoughtfully and respectfully, we can create a more inclusive and welcoming environment for everyone."],"summary":"Greetings are vital for building relationships, expressing respect, and fostering positive social interactions by establishing connections and acknowledging the presence of others.","prompt":"greeting"},
  {"paragraphs":["Failing is a natural part of life. Everyone experiences setbacks and disappointments throughout their journey. It's how we handle these challenges that defines our character and growth. Sometimes, failing can feel like a defeat, but it's actually an opportunity to learn and improve. By embracing the possibility of failure, we open ourselves up to new possibilities and greater success in the future.","Learning from our failures is crucial for success. When we encounter setbacks, it's important to reflect on what went wrong and identify areas for improvement. This process of reflection helps us develop better strategies and make smarter decisions in the future. It's okay to feel disappointed when we fail, but it's essential to move forward and keep trying.","Failure is not a sign of weakness or inadequacy. It's simply a part of the learning process. Every successful person has experienced failures along their path to greatness. By learning from our mistakes and developing a positive attitude towards failure, we can achieve greater things in life."],"summary":"Failing is an inevitable part of life, providing opportunities for learning, growth, and achieving greater success.","prompt":"fail"},
  {"paragraphs":["Alcoholism is a severe problem affecting countless families and communities worldwide. It is a chronic disease that causes significant harm to both the individual and their loved ones. Alcoholism disrupts the brain's functioning, leading to impaired decision-making, memory problems, and mood swings. The physical consequences of alcoholism can be devastating, including liver damage, heart disease, and even death.","The underlying causes of alcoholism are complex and multifaceted. Some factors include genetic predisposition, environmental influences, and mental health disorders. People with a family history of alcoholism are more likely to develop the disease. Additionally, traumatic experiences and social or economic stressors can contribute to the risk of alcoholism.","Alcoholism is not merely a moral failing but a serious medical condition requiring professional treatment. Treatment options include therapy, medication, and rehabilitation programs. Support groups like Alcoholics Anonymous (AA) can also provide invaluable guidance and encouragement. Early intervention and appropriate treatment are crucial for recovery and maintaining sobriety."],"summary":"Alcoholism is a serious disease caused by various factors and requires professional treatment and support to overcome its devastating effects.","prompt":"alcoholism"},
  {"paragraphs":["Yoga, a practice that has captivated minds for centuries, is a holistic approach to physical and mental well-being. Its origins trace back to ancient India, where it was initially developed as a spiritual discipline. This discipline emphasizes physical postures (asanas) that promote flexibility and strength, alongside deep breathing techniques (pranayama) that calm the mind and reduce stress. Yoga fosters a sense of tranquility and balance by connecting the body and mind through mindful movements and breathing exercises.","The beauty of yoga lies in its adaptability to different needs and abilities. Modifications can be made to accommodate individual limitations or physical challenges. Whether practiced in a group setting or at home, yoga offers a peaceful sanctuary where individuals can find solace from the demands of daily life. The practice can also be used as a complementary therapy alongside traditional medical treatments for various health conditions.","Yoga is more than just physical postures. It is a way of life that encourages a conscious and compassionate approach to oneself and the world. By cultivating mindfulness and self-awareness through yoga, individuals can learn to live in the present moment, appreciating the beauty of life's simple joys. The practice fosters a sense of inner peace and tranquility, allowing individuals to navigate life's challenges with greater clarity and resilience."],"summary":"Yoga is a holistic practice that promotes physical and mental well-being through mindful movements, breathing exercises, and a conscious approach to life.","prompt":"yoga"},
  {"paragraphs":["Opening a door can be as simple as twisting a handle, but the act itself holds a magic of possibility. Every opening, be it of a physical door or a metaphorical one, represents a journey into the unknown. It signifies new experiences, fresh starts, and the chance to discover something new. The anticipation of what lies beyond the threshold can be thrilling, echoing the excitement of an adventure about to unfold.","Openings can be physical, like the creaking hinges of an old barn door leading into a forgotten space, or emotional. The opening of a heart to love, for example, involves vulnerability and trust. It means allowing someone to see the true you, your fears and your dreams. This kind of opening can be terrifying but also incredibly rewarding.","Every opening, no matter its form, is a chance to step outside of our comfort zones and explore new horizons. It is the gateway to growth, discovery, and the creation of lasting memories. The act of opening can be as simple as a physical action, but the potential it holds is limitless."],"summary":"Opening represents new possibilities, both physically and metaphorically, offering the chance to embark on journeys of discovery and growth.","prompt":"opening"},
  {"paragraphs":["The thirteenth month of the year is called December. It has 31 days and is the coldest month of the year in many parts of the world. December is known for its snowy weather and festive celebrations. The word 'December' comes from the Latin word 'decem,' which means 'ten,' referring to the fact that it was the tenth month of the ancient Roman calendar.","The thirteenth position can hold special significance. For example, the thirteenth floor of a building is often skipped due to a superstition that it brings bad luck. Some people believe that the number 13 is unlucky, while others find it to be a lucky number. This belief in lucky or unlucky numbers can be traced back to ancient cultures.","The concept of a thirteenth month or position can be seen in various cultural contexts. From the ancient Egyptians who believed in a thirteenth lunar month to the modern-day practice of skipping the thirteenth floor in buildings, the belief in the significance of the thirteenth position has endured throughout history."],"summary":"The concept of the thirteenth month, position, or superstition highlights the interplay of cultural beliefs, historical practices, and the human fascination with the unusual or extraordinary.","prompt":"thirteenth"},
  {"paragraphs":["There's a magic in loosening up. It's like a gentle breeze that carries away worries and allows space for new ideas to bloom. Sometimes, we get stuck in our routines, afraid to try something different. But loosening up can be as simple as taking a deep breath and letting go of tight muscles or anxieties. It's about giving ourselves permission to explore, experiment, and discover new ways of doing things.","Looseness can also be about freeing ourselves from physical restrictions. Imagine a cozy blanket that feels wonderful at first, but then becomes a burden as the day goes on. It's time to loosen up and move around, stretch our legs, and get some fresh air. This physical loosening up can lead to a calmer and more focused mind.","The beauty of loosening up is that it leads to new possibilities. When we let go of our tightest restrictions and anxieties, we open ourselves up to creative solutions, new friendships, and a sense of freedom that makes life truly enjoyable."],"summary":"Loosen up to embrace new possibilities, overcome anxieties, and find freedom in both physical and mental realms.","prompt":"loosen"},
  {"paragraphs":["Punishment can be a helpful tool when used correctly. It teaches children that their actions have consequences. When a child understands that their behavior affects others, they are more likely to make good choices in the future.","However, punishment should never be used as a way to control or intimidate children. It should be focused on teaching them valuable lessons about responsibility and accountability. The goal is to empower them to make better decisions and become responsible members of society.","Finding the right balance between providing appropriate consequences and nurturing a child's self-esteem is crucial for effective discipline. Positive reinforcement, such as praise and rewards, can be just as powerful as punishment in shaping behavior. By using a combination of both approaches, parents and teachers can help children learn valuable life skills that will enable them to become successful and compassionate individuals."],"summary":"Punishment can be useful as a teaching tool when used thoughtfully, but should be balanced with positive reinforcement to foster a child's sense of responsibility and accountability.","prompt":"punishment"},
  {"paragraphs":["Bears are massive and powerful creatures that inhabit the snowy mountains and rugged forests of the world. They possess keen senses of smell and hearing, allowing them to detect prey and threats from afar. Their thick fur and large paws provide insulation and protection from the harsh cold, while their sharp claws and teeth are formidable weapons when necessary.","While bears are known for their ferocious nature, they are also compassionate mothers and attentive fathers. They meticulously care for their cubs, providing them with warmth, nourishment, and guidance. Their protective instincts are especially strong when their young are vulnerable. The bond between a bear and its cubs is truly remarkable and showcases their nurturing and caring spirit.","The captivating world of bears showcases their diverse personalities and behaviors. Some bears are solitary wanderers, while others form close-knit families. They are curious creatures with a playful streak, often engaging in playful antics that entertain both themselves and those around them. Their impressive strength, protective instincts, and fascinating behaviors make bears truly captivating creatures."],"summary":"Bears are remarkable creatures known for their powerful physique, keen senses, protective instincts, and diverse personalities.","prompt":"bear"},
  {"paragraphs":["A watchful protector stands guard, keeping a vigilant eye on the night's hushed whispers. The watchman's vigilant gaze sweeps across the darkness, detecting any sign of trouble or trespass. Armed with a lantern and a watchful heart, he stands as a barrier, deterring mischief and ensuring the safety of those who slumber under the night's blanket.","The watchman's presence is a comfort to the weary and the vulnerable. He stands as a symbol of hope, reminding people that even in the darkest of nights, there is a watchful eye looking out for them. His unwavering vigilance brings peace of mind to those who need it most, knowing that they are protected from harm.","The selfless watchman serves as a guardian of the night, tirelessly guarding the peace and tranquility of the community. His unwavering dedication and vigilant spirit make him an essential part of the night's symphony, ensuring the safety and security of all who dwell within its shadows."],"summary":"The watchman stands as a vigilant protector, providing security and peace of mind during the night.","prompt":"watchman"},
  {"paragraphs":["An isle is a piece of land surrounded by water, like a tiny island floating on a vast sea. It can be a natural formation, like a spit of land jutting out into the ocean, or a man-made structure, like a barrier island built to protect a coastline. Isolates are often home to unique plants and animals that have adapted to survive in their isolated environments.","Isles can be found in all parts of the world, from the icy landscapes of the Arctic to the tropical islands of the Pacific Ocean. Some of the most famous isles include Manhattan in New York, England's Isle of Wight, and the Galapagos Islands off the coast of Ecuador. These diverse islands offer a wide range of experiences, from exploring historical sites to enjoying stunning natural landscapes.","Isles can play important roles in human history and culture. They have been the sites of many significant events, such as battles, settlements, and trade routes. Many cultures have strong traditions and stories associated with their local isles, which are often passed down through generations. These islands have also been home to many notable figures, from explorers to scientists."],"summary":"Isles are isolated pieces of land surrounded by water, harboring unique ecosystems, historical significance, and cultural importance.","prompt":"isle"},
  {"paragraphs":["Revision is an essential part of the learning process. When we revise, we revisit the information we have learned and reinforce our understanding. This process helps us to remember things better and apply them in different situations. Effective revision involves going over the material, connecting it to our existing knowledge, and testing ourselves to identify areas that need more attention.","There are different ways to approach revision. Some people prefer to review the material in a quiet environment, while others find it helpful to discuss it with others. The key is to find a revision style that works best for each individual. Using diagrams, flashcards, and summaries can help to simplify complex concepts and make them easier to remember.","Regular revision is crucial for success in school and in life. By making time for regular reviews, we can ensure that we retain the information we have learned and can apply it when needed. The more we revise, the better we will understand the material and the more confident we will feel in our abilities."],"summary":"Revision is an important process that helps learners strengthen their understanding of information by reviewing, connecting, and testing their knowledge.","prompt":"revision"},
  {"paragraphs":["A radiant glow can illuminate the darkest corners, casting away shadows and revealing hidden beauty. This phenomenon is known as gleam. It is a captivating sight that can be found in various forms, from the sparkling of dewdrops on a spider's web to the shimmering of sunlight on a crystal. The gleam of hope, for example, can inspire us to persevere through challenges and believe in a brighter future.","The gleam of knowledge is equally valuable. When we learn something new, our minds are illuminated with newfound understanding. This gleam can empower us to solve problems, make better decisions, and navigate the world with greater confidence. The pursuit of knowledge is therefore essential for personal growth and development.","Gleam can also be found in the natural world. The shimmering of water droplets on a leaf, the twinkling of stars in the night sky, and the colorful reflections of fish underwater are all examples of the captivating gleam that can be found in the beauty of the natural surroundings."],"summary":"Gleam represents the radiance and beauty that can be found in various forms, inspiring hope, illuminating knowledge, and captivating the natural world.","prompt":"gleam"},
  {"paragraphs":["Combustion is a chemical reaction that involves the rapid oxidation of a fuel in the presence of oxygen. This exothermic process releases energy, light, and gases such as carbon dioxide and water vapor. The fuel can be anything that can burn, such as wood, coal, gasoline, or natural gas. The oxygen required for combustion comes from the air. When fuel and oxygen combine, their molecules break down and new molecules are formed. This process releases energy that can be used to power engines, generate heat, or produce electricity.","The efficiency of combustion depends on several factors. The amount of oxygen available, the fuel-air ratio, and the temperature of the mixture play a crucial role in determining how much energy is released. A perfect combustion process requires the right balance of fuel and oxygen. Too much fuel can lead to incomplete combustion, resulting in unburned fuel and pollutants. Conversely, too little fuel can lead to inefficient combustion, releasing less energy.","Combustion has both benefits and drawbacks. It is an essential process for generating energy and powering our daily lives. However, it also contributes to air pollution and greenhouse gas emissions. Measures such as using renewable energy sources and implementing pollution control technologies can help mitigate these environmental impacts."],"summary":"Combustion is a chemical process involving the rapid oxidation of fuel in the presence of oxygen, releasing energy, light, and gases.","prompt":"combustion"},
  {"paragraphs":["Confession is a powerful act that can bring closure and healing to both the confesser and those affected by their wrongdoing. When someone confesses, they acknowledge that they have done something wrong and take responsibility for their actions. This act of honesty can be incredibly liberating, as it allows individuals to release their burden of guilt and move forward. True confession requires immense courage and integrity, as it involves facing one's mistakes and admitting wrongdoing. However, the relief and restoration that follow can be immeasurable.","Confessions can also be crucial for maintaining healthy relationships. In families and friendships, honesty and transparency are vital for trust and forgiveness. When someone confesses their mistakes, they show that they value the relationship and are willing to repair any damage caused. This act can strengthen bonds and foster stronger connections with others. Additionally, confessing can lead to better understanding and empathy among those involved.","Confession is not merely about punishment or retribution. It is about taking accountability for one's actions and demonstrating genuine remorse. When individuals confess their wrongdoing, they open themselves up to the possibility of forgiveness and reconciliation. This process can be immensely healing and can lead to personal growth and transformation. True confession is an act of immense bravery and integrity that can ultimately lead to greater peace, understanding, and growth."],"summary":"Confession is a powerful act that promotes closure, facilitates healing, and strengthens relationships by fostering accountability, promoting forgiveness, and encouraging personal growth.","prompt":"confession"},
  {"paragraphs":["Squalor is a disturbing reality that affects countless communities around the world. It manifests as extreme poverty, lack of access to basic necessities, and an environment riddled with garbage and decay. The impoverished residents of these areas often live in dilapidated structures, devoid of basic amenities like running water and electricity. The scarcity of resources and the accumulation of trash create unsanitary and unhealthy living conditions.","The causes of squalor are multifaceted. Some countries grapple with poverty and political instability, leading to limited access to food, shelter, and healthcare. Overcrowding and poor sanitation further exacerbate the problem. In some cases, natural disasters or conflicts can trigger displacement and lead to the creation of makeshift settlements lacking essential infrastructure.","Squalor not only poses significant health risks but also has profound psychological and social consequences. Living in such impoverished conditions can perpetuate a cycle of poverty, as limited access to education and job opportunities creates a barrier to breaking free from the situation. The psychological effects of squalor are severe, with residents experiencing heightened stress, anxiety, and depression."],"summary":"Squalor is a devastating consequence of poverty, lack of access to resources, and poor sanitation, leading to unhealthy living conditions and perpetuating cycles of deprivation.","prompt":"squalor"},
  {"paragraphs":["Monopoly is a game of strategy and competition where players accumulate wealth by buying properties, building houses and hotels. The goal is to become the wealthiest player by trading, building structures and collecting rent from others. Players can trade properties with each other to create a more balanced portfolio. The player who owns all the properties in a color group can build houses or hotels, which increases the amount of rent they collect from other players. The game teaches valuable lessons about financial responsibility and the importance of making smart decisions in order to achieve financial success.","In Monopoly, players are given the opportunity to practice making financial decisions. They have to decide how much money to spend on properties, whether to trade properties or hold onto them, and when to build houses or hotels. These decisions require careful consideration and planning. The game also teaches players about the concept of risk and reward. By investing in properties, players have the chance to earn high returns, but they also risk losing money if the market changes. This teaches players the importance of balancing risk and reward in financial decisions.","Monopoly is a fun and educational game that can be enjoyed by people of all ages. It teaches valuable lessons about financial responsibility, strategy, and decision-making. The game can also be used to teach children about the importance of competition and the satisfaction of achieving financial success."],"summary":"Monopoly is a game that simulates financial decision-making and teaches valuable lessons about financial responsibility, strategy, and risk and reward.","prompt":"monopoly"},
  {"paragraphs":["The word 'ever' holds a special significance in our language. It emphasizes that something has happened on multiple occasions or will continue to happen repeatedly. From sunrise to sunset, from learning to ride a bike to making new friends, countless events in our lives occur 'ever' so often that they become ingrained in our memories. 'Ever' reminds us that some experiences are truly exceptional and deserve to be remembered.","The prefix 'ever' can also be used to describe something that will never happen. For example, we might say that a certain animal is 'ever' going to become extinct or that a certain event will never be repeated. This use of 'ever' conveys a sense of finality and emphasizes that certain things are simply not destined to be.","From the countless memories we make to the profound changes we encounter, 'ever' serves as a versatile word that highlights both the frequency and significance of events in our lives. It emphasizes that some experiences are exceptional, while others are simply part of the natural course of life. 'Ever' reminds us that our lives are filled with a wide range of experiences that will stay with us 'ever' after."],"summary":"The word 'ever' emphasizes the frequency and significance of events in our lives, highlighting both the exceptional experiences we have and the changes we encounter.","prompt":"ever"},
  {"paragraphs":["The number fourteen is a curious one. It's not quite a teen, but not yet an adult. It's a bridge between childhood and adulthood, holding a special place in many cultures and traditions. For example, in some countries, the age of legal adulthood is set at fourteen, marking a significant transition in a person's life.","Fourteen is also a number associated with balance and harmony. It appears in various mathematical patterns and geometric shapes, demonstrating its inherent mathematical significance. Additionally, there are fourteen herbs traditionally used in ancient Egypt for healing and spiritual purposes, highlighting its importance in their culture.","The number fourteen holds a unique place in history as well. There have been fourteen Olympic Games throughout history, each filled with thrilling stories and remarkable achievements. Additionally, there have been fourteen different individuals who have held the title of President of the United States, showcasing its significance in the country's leadership history."],"summary":"The number fourteen symbolizes transition, balance, and historical significance, encompassing cultural, mathematical, and political aspects.","prompt":"fourteen"},
  {"paragraphs":["A builder is someone who creates amazing things from scratch. They are like artists who use tools and materials to bring their visions to life. From towering skyscrapers to delicate bridges, builders leave their mark on the world. They work tirelessly to transform landscapes and make our lives easier.","Builders come from all walks of life. Some are skilled architects who design the blueprint of a building, while others are construction workers who bring those plans to life. Each one plays a vital role in the building process. Architects use their creativity and knowledge to envision and plan the structure, while construction workers use their physical strength and technical skills to build it.","Builders are responsible for some of the most important and impressive structures in our world. Their work improves our communities and inspires future generations. From the bridges we cross every day to the schools we learn in, builders leave a lasting legacy on our lives. They are true heroes who shape the future."],"summary":"Builders are skilled professionals who design and construct remarkable structures, leaving a lasting impact on the world.","prompt":"builder"},
  {"paragraphs":["In the hushed whispers of the library, a stifled gasp can be mistaken for a page turning. The thick silence, once comforting, now feels like a blanket suffocating any spontaneous thought. The vibrant ideas trapped within our minds yearn to burst free, but something is holding them back, like dampened paint on a canvas. This stifling atmosphere can be both frustrating and fascinating, as it reveals the power of silence and the desperate need for expression.","Stifling can be physical, too. The sweltering heat of summer can trap us in a web of sluggishness, draining energy from every movement. Each step becomes an arduous climb, and thoughts slow to a crawl. The vibrant energy we once possessed seems to vanish under the oppressive weight of the heat. This physical stifledness can be a mirror for the emotional stifledness we sometimes experience, where our voices are choked by fear or societal expectations.","Stifling can be both external and internal. Sometimes, it's a deliberate act, like silencing a debate or controlling information. But often, it's an unintended consequence of our own choices. The walls we build around ourselves, the routines we follow, and the anxieties we harbor can all contribute to a stifled life. It's important to recognize these limitations and make conscious efforts to break free, allowing ourselves to explore new possibilities and express our true selves."],"summary":"Stifling can be physical, emotional, or even deliberate, hindering expression, creativity, and overall progress.","prompt":"stifle"},
  {"paragraphs":["An ovary is a tiny organ found in female bodies that plays a crucial role in producing eggs and hormones. It is located deep inside the abdomen and is responsible for the development of eggs that can potentially become babies. The ovary is like a factory that produces eggs and releases them into the fallopian tubes, where fertilization can occur. The hormones produced by the ovary regulate the menstrual cycle and are essential for maintaining a healthy reproductive system.","Inside the ovary are tiny structures called follicles. Each follicle contains an immature egg that grows and matures over time. When the egg is finally mature, it is released from the follicle and travels through the fallopian tubes. If the egg is not fertilized, it is naturally expelled during menstruation. The process of egg release is controlled by hormones produced by the ovary.","The ovary is a vital organ in the female reproductive system, producing eggs and regulating hormones. Its role in egg production and hormone balance is crucial for maintaining a healthy and functioning reproductive system."],"summary":"The ovary is an essential organ in female bodies responsible for egg production, hormone regulation, and the development of eggs.","prompt":"ovary"},
  {"paragraphs":["A billion is a mind-boggling number. It represents a thousand million, or one followed by twelve zeros. The concept of a billion is often used to describe incredibly large sums of money or items. For example, a company might have a billion dollars in revenue, or a country might have a billion inhabitants. Such a vast number is difficult to grasp, highlighting the extraordinary scale of these achievements.","Billions of years ago, our planet was a very different place. Giant creatures roamed the land, the climate was vastly different, and life as we know it had not yet evolved. The concept of billions of years emphasizes the immense age of our planet and the vast stretches of time that have shaped its history. It is a reminder of the incredible journey of life on Earth and the countless generations that have passed.","The word 'billion' evokes a sense of awe and wonder. It represents a colossal number that transcends human comprehension. From the towering skyscrapers that touch the clouds to the technological advancements that shape our lives, human achievements often reach billion-dollar or billion-unit scales. The use of this word highlights the remarkable progress and vastness of human endeavors."],"summary":"The concept of a billion emphasizes the extraordinary scale of large numbers, highlighting human achievements, geological time spans, and the vastness of various endeavors.","prompt":"billion"},
  {"paragraphs":["A product is anything that can be made, bought, or sold that has value. It can be a physical object like a toy or a computer, or a service like a haircut or a meal. The value of a product comes from the benefits it provides to consumers. For example, a smartphone allows people to stay connected with others, play games, and access information on the go.","Products are often the result of careful planning and innovation. Manufacturers and entrepreneurs spend time researching market needs, developing ideas, and testing prototypes before bringing a product to market. The success of a product depends on its quality, features, and marketing strategy. Companies need to find a balance between offering a competitive product at a reasonable price.","Products play a vital role in our daily lives. They provide us with the tools we need to work, learn, and play. From the clothes we wear to the food we eat, the products we choose can have a significant impact on our lives. By carefully considering the needs of consumers and offering innovative products, businesses can contribute to economic growth and improve the quality of life for people."],"summary":"Products are valuable items that result from planning and innovation, providing benefits to consumers and playing a crucial role in daily life.","prompt":"product"},
  {"paragraphs":["Installation is a carefully planned process that involves setting up equipment, systems, or structures in their designated locations. It requires meticulous attention to detail and coordination among team members. The installation process often involves unboxing and assembling components, connecting cables and wires, and configuring settings to ensure optimal performance. Proper installation is crucial for the successful functioning of the equipment or system.","Installation can range from the simple assembly of furniture in a room to the complex integration of technology in a large-scale industrial facility. In some cases, installation may require specialized training and certifications. The installer's expertise and attention to detail can significantly impact the quality of the final product or system. Experienced installers can anticipate potential problems and make necessary adjustments to ensure a smooth and efficient process.","The installation process is often the first step in bringing a product or system to life. A successful installation ensures that the equipment or system operates correctly and meets the intended purpose. By investing in thorough and professional installation, businesses and individuals can maximize the benefits of their investments and achieve their desired outcomes."],"summary":"Installation involves meticulous planning, assembly, and configuration of equipment, systems, or structures to ensure optimal performance and functionality.","prompt":"installation"},
  {"paragraphs":["Athletics is an exciting world filled with challenges and teamwork. It involves physical activities that require speed, strength, and endurance. Athletes push their limits and demonstrate incredible feats of physical ability. They train rigorously, focusing on techniques and tactics to achieve success. Track and field, swimming, basketball, and soccer are just a few of the many sports that fall under the umbrella of athletics. These sports teach athletes valuable life lessons such as discipline, perseverance, and collaboration.","The benefits of athletics extend far beyond physical performance. Athletes learn important social skills such as communication, teamwork, and leadership. They develop a sense of camaraderie and belonging with their teammates. Athletics also foster a healthy lifestyle by encouraging regular exercise and physical fitness. By engaging in physical activities, athletes can improve their overall well-being and prepare for a healthy life in adulthood.","Athletics is more than just competitive games and victories. It is a journey of personal growth and development. Athletes learn to overcome challenges, celebrate successes, and develop a strong sense of self. The lessons learned in athletics will stay with them throughout their lives, empowering them to become well-rounded individuals with valuable skills and experiences."],"summary":"Athletics promotes physical fitness, social development, and personal growth by cultivating teamwork, resilience, and healthy habits.","prompt":"athletics"},
  {"paragraphs":["A pioneer is someone who travels to a new and unfamiliar place, opening the way for others to follow. They are brave adventurers who overcome challenges and establish new settlements or routes. Pioneers often face harsh conditions, such as unexplored wilderness, limited resources, and hostile encounters with the local inhabitants. However, their determination and spirit of exploration drive them forward, making them true heroes of their time.","Pioneers were crucial to the growth of our nation. They pushed the boundaries of human settlement, exploring vast lands and establishing new communities. Their tireless efforts brought new opportunities for people to live, work, and thrive. Many pioneers were farmers, building new agricultural communities far from their ancestral homes. Others were traders, establishing trading routes and connecting different parts of the country.","Pioneers were the backbone of exploration and settlement in our history. Their courage, resilience, and determination paved the way for future generations. Their stories remind us of the incredible feats of human ingenuity and the boundless potential for new discoveries and settlements."],"summary":"Pioneers were brave explorers who opened new territories and established settlements, shaping the course of history through their tireless efforts and pioneering spirit.","prompt":"pioneer"},
  {"paragraphs":["A realm is a magical place where anything can happen. It's like a secret garden where only those who know the right way can enter. In a realm, you might find talking animals, flying islands, or even a giant talking tree! Realms are full of wonders and surprises, and they're often places where dreams come true.","Every realm has its own special rules and challenges. Some realms are peaceful and calm, while others are full of danger and excitement. There are realms where time stands still, and others where it speeds up. The most important thing is to respect the rules of the realm you're visiting and to be careful not to get into trouble.","Realms are places where imagination runs wild. They're places where anything is possible and where dreams can come true. Whether you're exploring a magical forest or battling a dragon in a fiery realm, there's always something new to discover in these wondrous places."],"summary":"Realms are magical places filled with wonders and surprises, where imagination runs wild and dreams can come true.","prompt":"realm"},
  {"paragraphs":["A squabble is a small, temporary argument or disagreement between two or more people. It's like a mini-war where words are the weapons. Sometimes, squabbles can be silly and harmless, like when friends disagree about what to eat for lunch. But other times, they can be more serious, like when people have different opinions about important things like school or family. Regardless of the reason, squabbles are a part of life and can even be helpful in learning how to solve problems and communicate effectively.","The root of a squabble is usually something that triggers a strong feeling or opinion in one or both of the people involved. This could be anything from a misunderstanding to a difference in values or goals. Sometimes, a squabble can escalate quickly and become a bigger argument, but most of the time, they are short-lived and eventually fade away. However, even the smallest squabbles can sometimes lead to lasting consequences, especially if they damage the relationship between the people involved.","While squabbles are often seen as negative things, they can actually be beneficial in some ways. When people disagree and debate different ideas, they can learn new things and come up with better solutions. Squabbles can also help people to develop their critical thinking and communication skills. By learning how to handle and resolve squabbles gracefully and respectfully, people can become better equipped to deal with challenges and conflicts throughout their lives."],"summary":"Squabbles are small, temporary arguments that arise due to differences in opinion or triggers strong feelings, but can also foster learning, critical thinking, and communication skills.","prompt":"squabble"},
  {"paragraphs":["Chemists are scientists who are magic makers of sorts. They mix and combine different substances to create new and amazing things. From the bubble bath that makes your bath extra fizzy to the delicious soda that tickles your taste buds, chemists are responsible for many of the everyday products we use. They are like detectives, figuring out the exact combination of ingredients to create something truly special.","Chemists are also responsible for some of the most important discoveries in human history. They discovered penicillin, which saved countless lives from deadly diseases. They also discovered the process of fermentation, which led to the creation of countless delicious foods and beverages. Chemists are always pushing the boundaries of science, finding new ways to make our lives better.","Chemists are true heroes who use their knowledge and skills to improve the world around us. They are responsible for countless innovations that have changed the way we live and work. From developing new vaccines to finding sustainable ways to produce energy, chemists are making a difference in the lives of people all over the world."],"summary":"Chemists are scientists who use their knowledge of chemicals to create new products, make important discoveries, and improve the lives of people.","prompt":"chemist"},
  {"paragraphs":["Trucks are massive vehicles that play a vital role in modern transportation. They are commonly used to transport goods, materials, and equipment across long distances. From food and supplies to construction materials and machinery, trucks carry a wide range of items that are essential to our daily lives. Their ability to transport goods efficiently and cost-effectively has made them indispensable to the functioning of our economy.","Trucks are powered by large engines and have a complex system of axles and suspension. Their spacious cabins and comfortable beds allow drivers to rest and sleep during long journeys. Modern trucks are also equipped with advanced safety features such as anti-lock brakes and electronic stability control to ensure safe handling. These features have significantly reduced the number of accidents involving trucks.","Trucks have had a profound impact on transportation and logistics. They have enabled businesses to expand their reach, reduce transportation costs, and improve efficiency. By transporting goods efficiently and cost-effectively, trucks have played a crucial role in economic growth and development."],"summary":"Trucks are massive vehicles that are essential to transportation, playing a crucial role in the efficient movement of goods, materials, and equipment.","prompt":"truck"},
  {"paragraphs":["Gold shines with a dazzling brilliance, capturing the eye with its luxurious gleam. From ancient pharaohs adorned in gold jewelry to modern-day athletes receiving gleaming gold medals, the precious metal has captivated humanity for centuries. Gold's allure stems from its rarity, beauty, and association with wealth and power. It symbolizes achievement, wealth, and success, often serving as a reward for exceptional performance or a token of great value.","Gilt is not merely a coating of gold but a process of applying a thin layer of gold to a surface. This technique creates a reflective and decorative finish that enhances the beauty of various objects. Gilt can be applied to metals, glass, or even wood, transforming them into luxurious and aesthetically pleasing items. The process of gilding involves hammering thin gold leaf onto the surface using adhesives or pressure, resulting in a delicate and shimmering finish.","The concept of gold and gilt transcends physical objects and extends to metaphorical applications. In our society, we often associate certain individuals or ideas with a sense of grandeur or exclusivity. We describe someone as having a 'golden heart' to mean they possess a kind and compassionate nature. Similarly, something that is described as 'gilded' suggests that it is adorned with refinement, sophistication, or a touch of luxury."],"summary":"Gold and its derivative, gilt, embody concepts of wealth, beauty, and exclusivity, influencing both physical objects and symbolic representations in our world.","prompt":"gilt"},
  {"paragraphs":["Kittens are playful and curious creatures that bring joy to many homes. They are small and fluffy, with soft fur and tiny paws. Kittens love to explore their surroundings, climbing on furniture and chasing after toys. Their curious nature and playful spirit make them delightful companions for people of all ages.","Kittens are also affectionate and loving. They often snuggle up to their humans, purring contentedly. They enjoy being petted and receiving gentle attention. Their unconditional love and companionship can provide a sense of comfort and happiness to their owners.","Kittens are growing and learning rapidly. They can go from tiny, helpless newborns to playful and independent kittens in just a few short weeks. Their rapid development and eagerness to explore make each day an adventure for both the kitten and its owner."],"summary":"Kittens are playful, affectionate, and curious creatures that delight their owners with their love, companionship, and playful nature.","prompt":"kitten"},
  {"paragraphs":["Imagine a giant playground with lots of kids, but there's no one in charge. Some kids might argue and fight, and it wouldn't be much fun. That's why we need a government. It's like a group of responsible kids who work together to keep everyone safe and happy. They make rules to keep everyone safe, like building fences to protect the playground, and they also handle things like fixing broken equipment. Without a government, it would be chaos in the playground!","The government is made up of different parts, just like a team. There are leaders who make decisions, like the president or prime minister. They're like the team captain who gives everyone orders. There are also other important people who help run the government, like judges who settle disputes and police officers who keep everyone safe. Each part works together to make the government strong and efficient.","The government is important because it helps us in so many ways. It provides public services like schools, hospitals, and roads. It also protects our rights, like freedom of speech and freedom of religion. The government is like a big umbrella that keeps us safe from the rain and other problems. It's a team that works for us to make our lives better."],"summary":"The government is essential for maintaining order, providing public services, and protecting individual rights in a society.","prompt":"government"},
  {"paragraphs":["Imagine having a superhero who can absorb all the mean punches and kicks, protecting others from getting hurt. That superhero is called a buffer. In computer programming, a buffer is like that superhero, absorbing harmful data and protecting important information from getting corrupted. When data travels through a computer system, it sometimes encounters problems or mistakes. A buffer acts as a safe zone, catching these mistakes before they can reach sensitive areas. By doing so, it ensures that the important data stays intact and the system runs smoothly.","Buffers are like little containers that hold data temporarily before sending it to its final destination. They can be of different sizes and have different purposes. Some buffers are designed to hold only a few pieces of data, while others can hold large amounts. The size of a buffer depends on the specific application and the amount of data being processed. Larger buffers can hold more mistakes or problems, but they also take up more memory space.","Buffers are crucial for many computer processes. They are used in various scenarios, such as data transmission, storage, and processing. By absorbing errors and protecting data integrity, buffers contribute to the overall stability and efficiency of computer systems."],"summary":"Buffers are temporary data containers that safeguard important information by absorbing errors and protecting it from corruption.","prompt":"buffer"},
  {"paragraphs":["A prompt can be anything that stirs us to action or sparks an idea. It's like a tiny seed that can blossom into something much bigger. Sometimes, prompts are as simple as a question, like 'What would you do if you were lost in the woods?' or 'Imagine a world where animals can talk'. Other times, prompts are more complex, like a story fragment or a piece of artwork that inspires us to create something of our own.","The best prompts are the ones that challenge us to think outside the box and explore new possibilities. They can motivate us to be creative, solve problems, or simply appreciate the world around us in new ways. A good prompt can also help us to learn new things and develop our imaginations.","The next time you're feeling stuck or uninspired, try using a prompt. It could be anything from reading a poem to talking to a friend or even just taking a walk in the park. You never know what amazing ideas or creations might come from a simple prompt."],"summary":"Prompts are creative sparks that can ignite our imaginations and inspire us to explore new possibilities.","prompt":"prompt"},
  {"paragraphs":["Emotions are an integral part of being human. They influence our thoughts, actions, and interactions with others. Happiness, sadness, anger, fear, and love are just some of the many emotions that shape our lives. Each emotion serves a purpose, allowing us to respond to different situations and navigate the world around us effectively.","Emotional intelligence is the ability to recognize and manage our emotions, as well as understand and appreciate the emotions of others. It involves self-awareness, empathy, and effective communication. Developing emotional intelligence is crucial for building strong relationships, achieving success in school and life, and coping with challenges and setbacks.","Emotions can be contagious, both positively and negatively. When we are around people who are experiencing positive emotions, such as joy or enthusiasm, we may feel inspired and uplifted. Conversely, being exposed to negative emotions, such as sadness or anger, can have a detrimental effect on our mood and behavior."],"summary":"Emotional intelligence plays a vital role in managing our own emotions and understanding those of others, influencing our relationships, successes, and overall well-being.","prompt":"emotional"},
  {"paragraphs":["A smirk is a playful twist of the lips that suggests mischief or amusement. It's a secret smile that often travels across faces like wildfire. Sometimes, a smirk is used to hide true feelings, while other times it's a way to show that we're in on the fun. A mischievous smirk can be contagious, spreading from person to person like a whispered joke.","Smirks can be innocent or mischievous. They can be used to express satisfaction, boredom, or even disapproval. When someone smirks at us, it's important to pay attention to the context and body language to understand their true intentions. A gentle smirk might indicate delight, while a sly smirk could suggest something more mischievous.","Smirks are a versatile expression that can convey a wide range of emotions. They can be used to lighten the mood, add humor to a situation, or even to convey defiance or disrespect. The next time you see someone smirking, take a moment to enjoy the playful expression and try to decipher the secret message behind it."],"summary":"Smirks are playful facial expressions that suggest mischief, amusement, or hidden feelings.","prompt":"smirk"},
  {"paragraphs":["Culmination is a moment of great accomplishment, the culmination of all the effort and practice put into achieving a goal. It's the climax of a journey, the point where dreams become reality. Every achievement, big or small, is a culmination of the steps taken along the way. It's the joyful result of overcoming challenges, pushing boundaries, and learning from experiences.","Culmination can be applied to many aspects of life. In school, students celebrate the culmination of their hard work when they finish a project or receive a good grade. Athletes reach the pinnacle of their performance when they win a championship or break a record. Artists often showcase their culmination works, their finest creations after years of practice and experimentation.","Culmination is a feeling of satisfaction and pride. It's the joy of completing something meaningful, the result of dedicated effort and unwavering determination. Every time we reach a culmination, we learn valuable lessons about ourselves and our abilities. These moments of accomplishment pave the way for future successes and inspire us to continue chasing our dreams."],"summary":"Culmination represents the culmination of effort, the climax of a journey, and a moment of great accomplishment.","prompt":"culmination"},
  {"paragraphs":["Prolonging something means making it last longer. It's like stretching out a fun activity or delaying a boring chore. We often wish we could prolong special moments, like a birthday celebration or a peaceful afternoon in the park. But sometimes, prolonging things can be a good thing, while other times it can be a drag. It all depends on the situation.","There are many reasons why people might want to prolong something. Sometimes it's because they're enjoying the experience. For example, a child might want to prolong a game because they're having so much fun. Other times, people prolong things because they're afraid of what comes next. This could be something like a boring task or a difficult situation.","However, prolonging things can also have negative consequences. It can mean missing out on other important things or wasting time that could be used for something more productive. So, it's important to decide whether prolonging something is truly beneficial in each situation."],"summary":"Prolonging something involves making it last longer, with both positive and negative consequences depending on the context.","prompt":"prolong"},
  {"paragraphs":["A sir is a title of respect used to address a man. It is often used to show deference or formality. The word 'sir' is typically used in formal situations or when addressing someone in a position of authority. It is a way of showing that you respect the person and their opinions.","Sir is a title that has been used for centuries. It originates from the Old French word 'sire', which means 'master' or 'lord'. Over time, the word evolved to mean 'a respectful title for a man'. The use of 'sir' is widespread in many cultures and languages, demonstrating its importance as a way to show respect.","The use of 'sir' is not limited to formal situations. It is also commonly used in everyday conversations as a way of addressing a man respectfully. Whether you are speaking to a teacher, a doctor, or a stranger, using 'sir' is a polite and respectful way to show that you value their opinions and expertise."],"summary":"The essay explores the significance of the title 'sir' as a respectful expression used to address a man.","prompt":"sir"},
  {"paragraphs":["The internet has become an integral part of our lives. We can connect with friends and family across continents, access information on almost any topic imaginable, and even learn new skills. From online games to educational websites, the online world offers endless possibilities for entertainment and knowledge.","However, the online world also has its drawbacks. Spending too much time on screens can lead to health problems and social isolation. Cyberbullying and online predators are serious concerns that require careful attention and parental guidance. It's important to establish healthy boundaries and use the internet responsibly.","The online world is a complex and evolving ecosystem. While it brings numerous benefits, it also poses risks that must be carefully managed. Finding a balance between enjoying the advantages of the internet and mitigating its potential negative consequences is key to navigating the online landscape successfully."],"summary":"The online world offers a wide range of opportunities but also comes with potential risks that require responsible and balanced use.","prompt":"online"},
  {"paragraphs":["Interference can be a frustrating experience. It disrupts our plans, throws a wrench into our carefully crafted schedules, and sometimes even prevents us from achieving our goals. The worst part is that it often happens when we least expect it. For example, a sudden downpour can disrupt our outdoor picnic, or a traffic jam can turn a simple commute into an ordeal. These unplanned interruptions can be incredibly annoying and sometimes even lead to disappointment.","Interference can take many forms. It can be as obvious as someone interrupting a conversation or as subtle as background noise that makes it difficult to focus. Sometimes, interference can even be intentional. People may intentionally try to sabotage our efforts or prevent us from achieving success. This deliberate interference can be even more frustrating as it often feels like a personal attack.","Interference is a part of life. However, it is important to learn how to manage it effectively. By anticipating potential disruptions and developing strategies to cope with them, we can minimize their impact on our lives. This will allow us to focus better, achieve our goals, and enjoy our experiences more."],"summary":"Interference can be frustrating but learning to anticipate and manage it can help us achieve our goals and make the most of our experiences.","prompt":"interference"},
  {"paragraphs":["Clarity is a precious gift that helps us navigate the complex world around us. It's about expressing ourselves in a way that others can easily understand. When we speak or write clearly, we avoid confusion and ensure that our message gets across without unnecessary hurdles. Clear communication is an essential skill for building strong relationships and achieving success in both our personal and professional lives.","Clarity extends beyond just words. It also involves being clear in our thoughts and actions. When we are clear about our goals and values, we make better decisions and take actions that align with them. This clarity of purpose helps us stay focused and motivated, even when faced with challenges. By clarifying our intentions, we avoid unnecessary mistakes and achieve better outcomes.","Clearly expressing ourselves and maintaining clarity in our thoughts and actions is a vital aspect of living a fulfilling life. It fosters strong connections with others, facilitates personal growth, and allows us to navigate the world with greater efficiency and effectiveness."],"summary":"Clarity is fundamental to effective communication, personal growth, and building meaningful relationships.","prompt":"clearly"},
  {"paragraphs":["Contemplation is a journey inward, a pause in the whirlwind of daily life where we can truly connect with ourselves. It is about slowing down, silencing the noise around us, and focusing on the moment. We can contemplate anything that stirs our curiosity – a breathtaking sunset, a profound quote, or even our own dreams. This act of deliberate reflection allows us to appreciate the beauty of the world and to understand ourselves better.","Contemplation is not about rushing to conclusions or finding the right answers. It is about simply observing and experiencing, allowing our minds to wander freely and soak in the beauty of our surroundings. It is in these moments of quiet reflection that we can discover new ideas, unlock hidden potential, and find inspiration for future endeavors. The peace and clarity that accompany contemplation are invaluable in our ever-changing world.","Contemplation is a gift that we can cultivate and practice. By making a conscious effort to set aside time for quiet reflection, we can learn to appreciate the simple joys of life and to approach challenges with renewed purpose and creativity."],"summary":"Contemplation is a deliberate practice of inner reflection that fosters appreciation, self-discovery, and a deeper understanding of the world.","prompt":"contemplate"},
  {"paragraphs":["Frogs are fascinating creatures that can be found in various habitats around the world. They possess unique physical features and behaviors that allow them to thrive in their aquatic and terrestrial environments. Frogs have smooth, moist skin that helps them absorb oxygen through their skin. Their large eyes and sensitive skin enable them to detect movement and changes in their surroundings. Their powerful tongues help them catch prey and defend themselves.","Frogs have a diverse range of diets depending on their habitat and lifestyle. Some frogs are carnivores, preying on insects, worms, and small fish. Others are herbivores, feeding on plants and algae. Their diets are essential for maintaining the balance of ecosystems. Frogs also play a role in controlling populations of insects and other pests.","Frogs are remarkable amphibians that exhibit impressive survival skills. They can withstand changes in temperature and humidity, and their ability to both swim and hop allows them to access different food and shelter sources. Their resilience and adaptability make them important members of aquatic ecosystems."],"summary":"Frogs are fascinating amphibians known for their unique physical features, diverse diets, and remarkable survival skills.","prompt":"frog"},
  {"paragraphs":["A rack can be anything that holds or supports something. It can be as small as a bookshelf for your favorite books or as big as a railway track that carries trains. Racks can be used for many things, like storing clothes in a closet, displaying items in a store, or even holding up plants in a garden. They can be made from different materials like wood, metal, or even plastic, and can be designed in many different shapes and sizes.","Racks play an important role in keeping things organized. In libraries, racks keep books neatly arranged so that readers can easily find what they need. In museums, racks display artifacts and artwork, making it easier for visitors to appreciate them. Racks can also be used to store supplies in offices or workshops, ensuring that everything is easily accessible and well-organized.","Racks are useful for more than just holding things. They can also be used to create fun and interesting spaces. For example, a rack of colorful umbrellas can brighten up a rainy day, and a rack of books can create a cozy reading nook. Racks can be used to add personality and functionality to any room or space."],"summary":"Racks are versatile and useful structures that can hold, support, and organize various items, making them essential for maintaining order and functionality in various settings.","prompt":"rack"},
  {"paragraphs":["A marshal is a brave and important figure in any community. They are the ones who keep the peace and ensure everyone is safe. Marshals have many different responsibilities, such as patrolling neighborhoods, responding to emergencies, and investigating crimes. They are often the first point of contact for people in need, and they play a vital role in maintaining order and justice.","Marshals have a lot of training and experience to prepare them for their jobs. They must be physically fit and able to handle stressful situations. They also need to be able to communicate effectively with people from all walks of life. Many marshals have previous experience as police officers or firefighters, and they bring that valuable experience with them to their new roles.","The job of a marshal is both challenging and rewarding. Marshals play a critical role in keeping communities safe and secure. They are often praised for their bravery and dedication to their jobs. Being a marshal is a demanding but incredibly fulfilling career path for those who want to serve their communities and make a difference in the lives of others."],"summary":"Marshals are brave and dedicated professionals who play a vital role in maintaining peace, order, and justice in communities.","prompt":"marshal"},
  {"paragraphs":["A talisman is a special object that is believed to have magical or protective powers. These objects can be anything from amulets with mystical symbols to crystals with potent energies. Many people throughout history have used talismans to bring them luck, ward off evil, or harness specific abilities. Some common talismans include four-leaf clovers, lucky charms, and even pets like dogs or cats.","The use of talismans can be traced back to ancient civilizations. In Egypt, pharaohs wore gold necklaces and amulets believed to contain the power of the gods. In China, warriors carried jade pendants and warriors carried swords believed to bring them strength and bravery. Throughout history, people have continued to find comfort and hope in the power of talismans.","Talismans can provide people with a sense of security and belief in their own abilities. By carrying or wearing these objects, people often feel empowered and protected. The power of a talisman is often linked to the belief of the wearer, and can be as strong as the individual's conviction. Talismans can be a valuable source of strength and inspiration for those who believe in their magic."],"summary":"Talismans are special objects believed to possess mystical or protective powers, often used by people throughout history to bring them luck, ward off evil, or harness specific abilities.","prompt":"talisman"},
  {"paragraphs":["A limousine is a luxurious vehicle that stands out with its sleek design and spacious interior. It's often associated with wealth and prestige, and is commonly used for special events or business trips. Limousines are usually driven by a professional chauffeur who takes care of everything from navigating traffic to ensuring a comfortable ride. Their polished paint and elegant features make them a symbol of sophistication and style.","Limousines come in various sizes and models to cater to different needs. Some models can comfortably fit eight passengers, while others are more intimate, accommodating only two. Each limousine is equipped with top-notch amenities such as plush leather seats, a premium sound system, and a refrigerated mini-bar. The spacious interior and luxurious features provide passengers with a truly exceptional experience.","Limousines are not just for the wealthy or famous. They can be rented for a variety of occasions, such as proms, weddings, or anniversary celebrations. Companies also use limousines for executive transportation, offering their clients a comfortable and reliable way to get around town. Regardless of the purpose, limousines always make a lasting impression and provide a memorable ride."],"summary":"Limousines are luxurious vehicles renowned for their spacious interiors, elegant features, and exceptional amenities.","prompt":"limousine"},
  {"paragraphs":["A putt is a delicate dance between precision and power. The golfer approaches the ball slowly, eyes focused on the target. With a measured stride, they transfer their weight forward, gripping the club tighter. The muscles in their arms and wrists work in harmony to impart just the right amount of force to send the ball towards its intended destination. The perfect putt is a symphony of technique and composure.","Putts are more than just hitting the ball. They require meticulous planning and an understanding of the course. Experienced golfers study the terrain, noting the undulations and slopes of the greens. They analyze the speed and direction of the wind, factoring it into their calculations. The best putters are able to visualize the path of the ball and make necessary adjustments to their aim and power.","The satisfaction of a successful putt is unmatched. The feeling of the ball rolling smoothly into the hole is pure joy. It is a testament to the golfer's skill and determination. Every putt is a chance to showcase their talent and demonstrate their mastery of the game."],"summary":"Putts are a combination of precision, technique, and mental calculation that require meticulous planning and careful execution to achieve success.","prompt":"putt"},
  {"paragraphs":["Speaking is an essential skill that allows us to express ourselves and connect with others. It is a complex process that involves understanding language, articulating thoughts, and using vocal and non-verbal cues. The ability to speak effectively is crucial for both personal and professional success. Without the power of words, we would be unable to share our ideas, learn from others, or build meaningful relationships.","Speaking goes beyond just words. It is about using tone, volume, and body language to convey meaning. Different situations require different speaking styles. For example, formal speeches require careful planning and a more formal tone, while casual conversations are more relaxed and allow for humor and personal anecdotes. The way we speak can significantly impact the way others perceive us.","Learning to speak fluently and confidently takes practice and effort. By engaging in regular conversations, reading books, and listening to others speak, we can improve our vocabulary, grammar, and pronunciation. With dedicated practice and encouragement, anyone can become a confident and effective communicator."],"summary":"Speaking is a vital skill that involves understanding language, articulating thoughts, and using vocal and non-verbal cues to express oneself and connect with others.","prompt":"speak"},
  {"paragraphs":["Scoffing is a dismissive attitude that shows a lack of respect or belief in something. It often involves making fun of something or someone, and can be hurtful or damaging. People scoff when they disagree with something, when they think something is silly or unimportant, or when they simply do not understand it. This negative attitude can spread like wildfire, especially if it is expressed by influential people or in large groups.","The act of scoffing can be harmful in several ways. Firstly, it can damage relationships by pushing people away and creating conflict. Secondly, it can stifle creativity and progress by discouraging new ideas and innovations. Thirdly, it can perpetuate ignorance and prejudice by reinforcing negative stereotypes and biases.","Scoffing is a destructive behavior that can have far-reaching consequences. By fostering a culture of respect and open-mindedness, we can create a more positive and productive society where everyone has the opportunity to contribute their unique perspectives and talents."],"summary":"Scoffing is a disrespectful and harmful attitude that undermines relationships, stifles creativity, and perpetuates ignorance.","prompt":"scoff"},
  {"paragraphs":["Picketing is a powerful way for people to make their voices heard and demand change. It involves gathering in a public space to express disapproval or concern about a certain issue. People often picket outside government buildings, businesses, or other places where the decision-makers are likely to be present. The goal of picketing is to raise awareness of the problem and put pressure on those in power to take action.","Picketing can be used for many different causes. People may picket to protest against environmental pollution, racial discrimination, or economic inequality. They may also picket to support causes such as improving public education or providing healthcare for the poor. Picketing is a nonviolent form of protest that relies on the power of numbers and public opinion to create change.","Picketing can be an effective way to generate media coverage and bring attention to important issues. By standing together and making their voices heard, picketers can raise awareness of the problem and put pressure on those in power to take action. Many successful social and political movements have been fueled by the power of picketing."],"summary":"Picketing is a form of nonviolent protest where people gather in a public space to express disapproval or concern about a certain issue.","prompt":"picket"},
  {"paragraphs":["A fork is a versatile tool that has been a part of human meals for centuries. Its smooth, curved handle provides a comfortable grip, while the tines at the end help to grasp and manipulate food. Forks come in different sizes and shapes to suit various culinary purposes. From the traditional dinner fork with three tines to the spork with a spoon and fork combined, each type has its unique function. Forks can also be made from various materials, such as metal, plastic, or even wood.","Forks play a crucial role in dining experiences. They help us to eat a variety of foods, from delicate salads to hearty soups. The tines make it easy to grab and manipulate food without fingers. This is especially helpful when handling slippery or messy dishes. Additionally, forks can be used to serve food, such as appetizers or desserts. Their versatility and practicality make them essential utensils in many kitchens and dining settings.","The humble fork has evolved over time, reflecting changing culinary habits and technological advancements. From their origins as simple spoons with tines to the modern-day designer forks, the fork's design and functionality have continued to fascinate people. Its importance as a tool that enhances the dining experience and adds elegance to meals cannot be understated."],"summary":"Forks are versatile tools that have been used for centuries to handle and manipulate food, showcasing remarkable evolution and adaptability over time.","prompt":"fork"},
  {"paragraphs":["In the hushed whispers of the night, there exists a thrilling escape – a journey into the unknown. Sometimes, escape is a desperate flight from danger, a desperate bid for freedom from the chains that bind. The heart pounds with adrenaline, urging every muscle to move faster, to outrun the shadows that pursue. A thrilling sense of liberation washes over as the escape is successful, leaving the burden of the past behind.","Other times, escape is a deliberate choice – a conscious decision to break free from routine, from the predictable patterns of everyday life. It could be a spontaneous road trip, exploring hidden corners of the world, or diving into a captivating book that transports you to another realm. The joy of discovery, the thrill of the unexpected, fuels this escape, leaving a sense of renewed wonder and inspiration.","Escape is a universal human experience, a yearning for something beyond the mundane. Whether driven by peril or a desire for liberation, the act of escape fosters growth, imagination, and a sense of awe for the beauty of life's boundless possibilities."],"summary":"Escape offers a thrilling sense of liberation, whether from danger or the ordinary routine, fostering growth, imagination, and a sense of awe for life's possibilities.","prompt":"escape"},
  {"paragraphs":["Archaeology is the study of past human societies through the analysis of their material remains. Archaeologists carefully uncover and examine artifacts, like tools, pottery, and bones, to learn about the people who lived in ancient times. They also study the landscapes and environments where these societies existed to understand how people interacted with their surroundings.","The process of archaeology involves meticulous excavation and documentation. Archaeologists use trowels and brushes to remove dirt and sediment from artifacts, while careful mapping and photography document the location and condition of finds. This meticulous work reveals valuable insights about the daily lives, technological advancements, and cultural practices of past civilizations.","Archaeological discoveries have shed light on many significant historical events. For example, the discovery of ancient burial sites has provided evidence of early human settlements, while the unearthing of ancient temples has revealed the religious beliefs and practices of past cultures. These discoveries continue to challenge our understanding of human history and inspire awe for the accomplishments of our ancestors."],"summary":"Archaeology explores past human societies through the study of material remains, landscapes, and environments.","prompt":"archaeology"},
  {"paragraphs":["In our bustling world filled with differences, there exists a special kind of treasure that transcends individuality – commonality. It is the thread that binds people together, weaving a tapestry of shared values, beliefs, and experiences. Commonality is found in the laughter shared between friends, the traditions passed down through generations, and the simple act of helping someone in need. It is a force that transcends boundaries, connecting people from all walks of life and creating a sense of belonging.","Commonality is not just about physical traits or cultural backgrounds. It is about shared dreams, aspirations, and a desire to make a difference in the world. When people discover common ground, they can collaborate, create meaningful relationships, and work towards common goals. It is this spirit of unity that drives innovation, progress, and social change.","Commonality is not limited to grand gestures or extraordinary feats. It can be found in the everyday moments, in the small acts of kindness and the simple exchanges of friendly conversation. By embracing commonality, we celebrate our shared humanity, recognize our interconnectedness, and foster a sense of community where everyone feels valued and respected."],"summary":"Commonality lies in shared values, experiences, and aspirations, fostering a sense of belonging and connecting people across differences.","prompt":"common"},
  {"paragraphs":["Vulgar language, often associated with street slang or improper behavior, can be surprisingly effective in certain situations. While it might seem inappropriate in formal settings, there are times when a direct and honest approach is necessary. For example, when expressing strong emotions like anger or frustration, using strong language can quickly convey the intensity of the feeling. However, it's important to be mindful of the audience and choose the right words accordingly.","Vulgarity can also be used comedically to create humor. When used in a humorous context, it can add a touch of spontaneity and realism to a story. However, using vulgar language humorously requires a careful balance. The joke must be funny in the context of the story and should not be offensive or inappropriate.","Ultimately, the use of vulgar language is a contextual decision. While it can be effective in certain situations, it's important to be aware of the potential consequences and choose words that are appropriate for the audience and the situation."],"summary":"Vulgar language can be used effectively for expressing strong emotions, creating humor, or adding realism, but should be carefully considered based on the context and audience.","prompt":"vulgar"},
  {"paragraphs":["An artery is a blood vessel that carries oxygenated blood away from the heart and towards the rest of the body. It is like a superhighway for blood, delivering vital oxygen and nutrients to every cell. Arteries have thick, muscular walls that can contract and expand to regulate blood flow throughout the body. The largest artery in the body is the aorta, which branches out into smaller and smaller arteries, delivering oxygenated blood to all parts of the circulatory system.","Arteries play a crucial role in maintaining homeostasis, the balance of fluids and electrolytes in the body. They transport oxygenated blood rich in oxygen and nutrients to tissues and organs that need them to function properly. Without adequate oxygen supply, cells can become starved and unable to perform their tasks efficiently. The functioning of organs like the brain, heart, and muscles depends on the proper functioning of arteries.","Arteries are vulnerable to various factors that can affect their health. High blood pressure, smoking, unhealthy diet, and cholesterol buildup can narrow or block arteries, leading to reduced blood flow and potential health complications. Understanding the importance of maintaining healthy arteries is crucial for overall well-being and preventing cardiovascular issues."],"summary":"Arteries are vital blood vessels that carry oxygenated blood throughout the body, ensuring oxygen and nutrients reach cells and organs to maintain homeostasis.","prompt":"artery"},
  {"paragraphs":["A council is a group of people who come together to make decisions and solve problems for a community. These people are usually elected by the residents of the community and are responsible for things like planning parks, fixing roads, and collecting taxes. They also listen to the needs of the community and make sure that everyone has a chance to voice their opinions.","Councils can be made up of different people with different backgrounds and experiences. Some councils have only a few members, while others have many. The size of the council usually depends on the size of the community. The members of a council work together to make decisions that benefit everyone in the community.","Councils are an important part of our communities because they give people a chance to have a say in how their communities are run. They also make sure that the needs of the community are met. By working together, councils can create stronger and more vibrant communities for everyone."],"summary":"Councils are groups of elected individuals who make decisions and solve community problems.","prompt":"council"},
  {"paragraphs":["Intimacy is a feeling of closeness and connection that exists between two people who share a deep understanding of each other. It involves trust, vulnerability, and a sense of safety. Intimacy can be found in friendships, romantic relationships, or even between family members. The foundation of intimacy is open communication, where individuals can share their thoughts, feelings, and dreams without fear of judgment.","Intimacy is not just about physical contact or sexual intimacy. It is about emotional connection and a shared sense of purpose. True intimacy involves being vulnerable and allowing someone to see the real you. It is about feeling comfortable enough to be yourself and knowing that the other person will accept you for who you are.","Intimacy is essential for healthy relationships. When people feel intimate with each other, they experience deeper connection, greater trust, and stronger bonds. Intimacy fosters empathy, understanding, and a sense of belonging. It is the foundation of strong and lasting relationships."],"summary":"Intimacy revolves around deep emotional connection, trust, and vulnerability in relationships.","prompt":"intimate"},
  {"paragraphs":["Constructing something new requires careful planning and dedication. Every towering skyscraper, intricate machine, or innovative gadget starts as an idea in someone's mind. To bring these ideas to life, engineers, architects, and other skilled builders must work collaboratively, utilizing their knowledge, tools, and creativity. The process of construction is full of challenges, but the satisfaction of seeing a project come together is truly rewarding.","Constructive endeavors go beyond physical construction. Building strong relationships, fostering new ideas, and overcoming adversity are all forms of constructive action. When people work together towards a common goal, they can achieve remarkable things. This teamwork and sense of purpose are essential for progress and innovation.","The act of constructing something new not only involves physical building but also mental and emotional construction. By taking on challenges, expanding our knowledge, and collaborating with others, we can build confidence, resilience, and a foundation for future success. True constructive action extends beyond just creating physical structures; it encompasses the growth and development of individuals and communities."],"summary":"Constructive action involves physical building, mental growth, and collaborative teamwork to achieve remarkable results.","prompt":"constructive"},
  {"paragraphs":["An ornate design is one that is characterized by elaborate and intricate details. From the intricate patterns on a butterfly's wing to the breathtaking architecture of a Gothic cathedral, ornate decorations capture attention and evoke a sense of awe. The word 'ornate' comes from the Latin 'ornatus,' which means 'decorated' or 'adorned.' It is often used to describe something that is highly decorated or elaborate in design.","Ornate decorations can be found across different cultures and eras. In ancient Egypt, hieroglyphics adorned with colorful paints adorned tombs and temples. The majestic palaces of the Renaissance were adorned with elaborate frescoes and carvings. Even in modern times, architects often incorporate ornate elements into their designs, such as intricate columns and decorative moldings.","The use of ornate decorations often reflects the wealth and status of the owner or builder. In a society where beauty and craftsmanship are valued, ornate designs become a way to showcase the skill and resources of the artisans involved. The presence of intricate details and elaborate patterns suggests a commitment to creating something truly special and awe-inspiring."],"summary":"The word 'ornate' describes something that is highly decorated with elaborate and intricate details, reflecting wealth and craftsmanship.","prompt":"ornate"},
  {"paragraphs":["Some decisions we make in life are reversible, while others are not. When we make a mistake, we often wish we could take it back. This is called an reversible decision. For example, if we accidentally spill milk on the table, we can easily wipe it up and start over. However, other decisions are not so easily reversed. Once we make a commitment to something, such as joining a team or taking on a responsibility, it can be difficult or even impossible to change our minds.","The ability to reverse a decision gives us flexibility and the opportunity to learn from our mistakes. When we know we can make a mistake and fix it, we are less afraid to try new things. This can lead to greater creativity and innovation. Additionally, reversible decisions allow us to adjust our plans as needed. If we realize that something isn't working out, we can change course without having to worry about the consequences of our initial decision.","Therefore, the concept of reversibility is important in many aspects of life. Whether we are making a small daily decision or a big life choice, knowing that we can always change our minds gives us the confidence to explore different options and make the best decision for ourselves."],"summary":"The ability to reverse decisions provides flexibility, allows for learning from mistakes, and enables us to adjust our plans as needed.","prompt":"reversible"},
  {"paragraphs":["Safety is an incredibly important aspect of our lives. It's about being aware of potential risks and taking steps to minimize them. This can range from something as simple as crossing the street cautiously to being careful when playing with sharp objects. By taking precautions and following safety rules, we can protect ourselves from harm and enjoy our activities to the fullest.","Being safe also involves being aware of our surroundings. This means paying attention to what's happening around us and anticipating potential dangers. For example, we should be aware of traffic when crossing the street, and we should be aware of slippery surfaces when walking outdoors. By being mindful of our surroundings, we can avoid accidents and keep ourselves safe.","Safety is not just about avoiding physical harm. It's also about protecting our emotional and mental well-being. This means being cautious when sharing personal information online, avoiding dangerous situations, and surrounding ourselves with positive and supportive people. By taking care of our emotional safety, we can build a strong sense of confidence and well-being that will help us navigate the world safely and confidently."],"summary":"Safety is about being aware of potential risks, taking precautions, and being mindful of our surroundings to protect ourselves from physical, emotional, and mental harm.","prompt":"safety"},
  {"paragraphs":["The moment a child is born, a new life enters the world. Surrounded by the warmth of their parents, the tiny soul takes their first breaths and opens their eyes to a brand-new world. The cries and smiles that fill the air are a melody of joy that celebrates the precious arrival. From the first tentative grasps to the first clumsy steps, each moment is a miracle of creation.","Every child is born with a unique set of gifts and talents. Some may inherit their parents' physical features or personalities, while others discover their own special qualities. Every laugh, every tear, and every action teaches them valuable lessons about themselves and the world around them. The possibilities are endless, and their potential to make a difference is limitless.","The birth of a child is not just about physical arrival. It is the birth of a dream. The dreams of parents, the dreams of the child themself. With each heartbeat, each breath, and each tear, a story unfolds. The journey from womb to world is filled with wonder and love, shaping the lives of both the child and those who surround them."],"summary":"The birth of a child is a remarkable event that celebrates the arrival of new life, the discovery of unique talents, and the unfolding of a heartfelt story.","prompt":"born"},
  {"paragraphs":["Imagine you have a story you wrote that has some parts that don't quite work. That's where editing comes in! It's like going through your story and making little changes to improve it. Sometimes, you might remove unnecessary words or sentences, or even change the order of events. Other times, you might add details that make your characters more believable or your plot more exciting.","Editing is like being a detective. You have to look for clues in your story, like awkward sentences or confusing paragraphs. Then, you use your imagination and knowledge to fix them. It's like taking a messy puzzle and putting it together in a way that makes sense. Experienced editors can even help you with this process, guiding you on what changes to make and why.","The final step in editing is proofreading. This means carefully reading your story again to make sure it's free of any typos or grammatical errors. It's like double-checking your work to ensure that it's the best it can be. With a fresh set of eyes, you can identify any remaining mistakes and make the final touches to your story."],"summary":"Editing is the process of carefully reviewing and improving a story by making changes, removing unnecessary parts, adding details, and correcting any errors.","prompt":"edit"},
  {"paragraphs":["Beige isn't just a color, it's a feeling. It's the quiet whisper of a summer breeze, the soft touch of a cozy blanket on a chilly night. It's the calmness before a storm, the peacefulness of a rolling meadow. Beige represents a peaceful sanctuary, a place where worries melt away and troubles fade into the background.","Though often mistaken for blandness, beige actually holds a wealth of complexity. It's a mix of earth tones, ranging from the paleness of sand to the warmth of nutmeg. It can be calming and serene, yet also evokes feelings of richness and depth. This versatility makes beige a fascinating color to explore.","Beige inspires a sense of tranquility and balance. It's the perfect color for creating a calm and welcoming space, whether that's a cozy bedroom or a peaceful office. Its neutrality allows other colors to shine, creating a harmonious and well-rounded visual experience."],"summary":"Beige embodies tranquility, calmness, and a sense of peaceful sanctuary, making it a versatile and captivating color.","prompt":"beige"},
  {"paragraphs":["Proximity fosters meaningful connections. When people are physically close to one another, they share common experiences, create lasting bonds, and can easily communicate. The physical presence of others evokes a sense of belonging and encourages collaboration. Shared meals, games, or simply spending time in the same space can strengthen relationships and foster a sense of community.","Proximity also plays a role in learning and development. Children learn best from those who are close to them, whether it's parents, teachers, or friends. The physical presence of mentors and peers allows for personalized guidance, encouragement, and the exchange of knowledge. This close interaction promotes intellectual growth and fosters a sense of self.","Proximity is crucial for building lasting friendships and maintaining close relationships. When people are physically close to each other, they can easily share their thoughts, feelings, and experiences. This sense of closeness creates a foundation for strong and lasting friendships. The physical presence of friends provides comfort, support, and a sense of belonging."],"summary":"Proximity promotes meaningful connections, facilitates learning, and fosters lasting friendships.","prompt":"proximity"},
  {"paragraphs":["A teacup, a delicate vessel crafted from porcelain or glass, holds a precious liquid that brings warmth and comfort. Its graceful curves and smooth surface reflect the light, making it a sight to behold. Teacups have been a part of human culture for centuries, with variations in size, shape, and design reflecting different eras and civilizations.","The history of teacups dates back to ancient civilizations like China and Japan. Early teacups were made from materials like clay, bone, or even stone. As civilizations evolved, so did the art of teacup making. Different cultures developed their own unique styles, often influenced by their geographical location and cultural heritage.","Teacups are not just practical objects but also works of art. From intricate hand-painted designs to delicate patterns of flowers and animals, teacups become personal expressions. Each teacup tells a story, capturing the essence of its time and place in history."],"summary":"Teacups are not only functional vessels but also artistic objects that hold cultural significance and reflect the diverse traditions of different civilizations.","prompt":"teacup"},
  {"paragraphs":["Baseball, a beloved pastime, is more than just a game. It embodies the values of teamwork, discipline, and perseverance. Players must work together seamlessly to execute plays, with each one having a specific role to play. Their disciplined movements and precise throws and catches showcase their dedication to the sport. Even when faced with setbacks, determined players never give up, demonstrating the power of resilience.","The thrill of watching a baseball game is unmatched. The crack of the bat, the roar of the crowd, and the soaring ball capture our imagination. Every play is a moment of suspense, filled with anticipation and excitement. The game teaches us the importance of celebrating both victory and defeat, learning that the true joy comes from the experience itself.","Baseball has a profound impact on communities. It brings people together, fostering a sense of belonging and shared identity. Local teams become a source of pride, uniting fans from all walks of life. The sport also provides opportunities for young athletes to develop their skills and pursue their dreams. It teaches them valuable life lessons that extend far beyond the field."],"summary":"Baseball is more than just a game, it fosters teamwork, discipline, and community, creating an unforgettable and valuable experience for players and fans alike.","prompt":"baseball"},
  {"paragraphs":["Luggage, the faithful companion on our travels, comes in many shapes and sizes. Suitcases, backpacks, and duffel bags each offer unique features to fit different needs. Hard-sided suitcases provide maximum protection for fragile items, while soft-sided options are more flexible and easier to pack. Backpacks are ideal for shorter trips and offer convenient hands-free carrying. Duffel bags are perfect for larger items like clothes or bedding.","The size and number of pieces of luggage we need depend on our travel plans. For weekend getaways, a small backpack or duffel bag might be enough. However, for longer journeys, we may need a larger suitcase or even a combination of different luggage types. Travelers should also consider the weight of their luggage when packing to avoid extra fees and make it easier to move around.","Luggage plays a crucial role in ensuring a smooth and enjoyable travel experience. By carefully selecting the right luggage for our needs and packing efficiently, we can maximize our space, protect our belongings, and make the most of our travels."],"summary":"Luggage varieties cater to different travel needs, providing functionality, protection, and convenience.","prompt":"luggage"},
  {"paragraphs":["Gall is a strong word that describes a brave or selfless act. It's the kind of action that makes people stand up for what they believe in, even when it's difficult. Sometimes, beinggall means risking your own safety to help others. Other times, it's about speaking out against injustice, even if it means going against the popular opinion. True gall comes from a deep sense of compassion and a willingness to stand up for what you believe is right.","Gall is not just about physical bravery. It's also about inner strength. Standing up for what you believe in, even when others disagree with you, takes a lot of courage. It requires conviction and a willingness to face challenges. The most courageous people are often those who are willing to speak out for what they believe in, even when it's unpopular.","Gall is a valuable quality that can make a real difference in the world. By standing up for what we believe in and helping others, we can create a better future for everyone. The most impactful people are those who demonstrate gall in their daily lives, inspiring others to be their best selves."],"summary":"Gall is the act of displaying remarkable courage, compassion, and conviction in the face of adversity.","prompt":"gall"},
  {"paragraphs":["A tournament is a competition where multiple teams or individuals gather to play a game or engage in a sport. It's usually a series of matches or contests organized with specific rules and regulations. The main goal is to determine the champion or winner among the participants. Tournaments can be held for various sports, such as basketball, soccer, or tennis, and can range from local competitions to international events. The excitement and anticipation surrounding a tournament make it a thrilling experience for both the competitors and the spectators.","Tournaments often involve elimination rounds where teams or individuals are eliminated one by one until only the strongest remain. The winners of each round advance to the next stage, while the losers are typically eliminated from the competition. This creates a sense of drama and suspense as the tournament progresses. Additionally, tournaments often feature group stages where teams or individuals are divided into groups and compete against each other. The top teams from each group then advance to the next round.","The climax of a tournament is the final match, where the remaining teams or individuals battle it out to determine the champion. The atmosphere in the final match is usually electric, filled with cheers and excitement from the crowd. The team or individual that emerges victorious is crowned the champion and receives the coveted trophy or title."],"summary":"Tournaments are competitive events where teams or individuals play a game or engage in a sport to determine the champion.","prompt":"tournament"},
  {"paragraphs":["There's a tingling worry that hangs in the air like the scent of autumn leaves. It's the feeling of something not being quite right, something that needs attention. Sometimes, this concern is like a tiny shadow following us, reminding us of unfinished tasks or looming challenges. Other times, it feels like a powerful current pulling us towards something dangerous or uncertain.","When we're concerned, our minds naturally start to wander. We replay conversations, imagine possible outcomes, and worry about what might happen next. This concern can be helpful, driving us to take action and solve problems. But sometimes, it can become overwhelming, leading to sleepless nights and anxious days.","Fortunately, there are ways to manage our concern. Talking to trusted friends and family can help us process our worries and feel less alone. Identifying the source of our concern allows us to focus our energy and find solutions. By learning to control our concern, we can transform it from a burden into a valuable tool that helps us navigate the world with greater awareness and purpose."],"summary":"Concern is a natural human emotion that can be both helpful and overwhelming, but it can be managed through communication, problem-solving, and self-awareness.","prompt":"concerned"},
  {"paragraphs":["Treating others with respect is vital for building strong and healthy relationships. When we treat people with kindness, empathy, and understanding, we create an environment where everyone can feel valued and appreciated. It's important to listen attentively to others' perspectives, even if we don't agree with them, and to respect their feelings and opinions. Treating others with respect fosters trust and encourages positive interactions.","Treating others with fairness is also crucial for creating a just and equitable society. Fairness involves treating people equally, regardless of their background, abilities, or circumstances. This means providing equal opportunities and access to resources, and treating people with dignity and respect. When we treat others fairly, we create a level playing field where everyone has a chance to succeed and reach their full potential.","Treating others with compassion is especially important in times of difficulty. When people are struggling with challenges, such as illness, loss, or financial problems, it's important to offer them support and encouragement. This can mean providing practical assistance, such as offering a shoulder to cry on or helping with errands, or offering emotional support, such as listening attentively and expressing understanding and concern."],"summary":"Treating others with respect, fairness, and compassion is essential for building strong relationships, creating a just society, and providing support during difficult times.","prompt":"treatment"},
  {"paragraphs":["A habit is a repeated action that becomes automatic over time. It can be anything from brushing your teeth in the morning to reading a book before bed. Habits are formed through repetition and become ingrained in our routines. The more often we perform an action, the more likely it is to become a habit. Some habits are helpful, like reading or exercising, while others can be harmful, like smoking or overeating.","Habits can be both positive and negative. Positive habits, like exercising or meditating, can improve our physical and mental health. Negative habits, like overspending or procrastination, can lead to problems in our lives. The good news is that habits can be changed. With consistent practice, we can break negative habits and create new, positive ones.","Habits play a significant role in shaping our lives. By forming good habits and avoiding bad ones, we can take control of our actions and achieve our goals. The key is to be consistent and patient, as forming habits takes time and effort."],"summary":"Habits are repeated actions that become automatic over time and significantly impact our lives, both positively and negatively.","prompt":"habitual"},
  {"paragraphs":["Snowflakes dance gracefully in the winter wind, forming delicate crystals that slowly coalesce into fluffy snowballs. Each snowball is unique, with varying sizes, shapes, and even colorful streaks. The soft, white spheres are a delight for children to build forts, throw at each other, or even make elaborate snow creatures. The joy of rolling and sculpting these icy wonders brings a spark of delight to the coldest days.","As the winter progresses, the snowballs grow larger and rounder. The more they are rolled, the denser they become. Some brave souls attempt to make colossal snowballs, but often end up with arms aching and faces covered in fluffy white. The effort is always worth it, though, as the final product is a magnificent masterpiece of winter playtime.","Snowballs are more than just playful mounds of snow. They hold a special place in the hearts of many. The memory of building snowballs with friends and family becomes a cherished part of childhood. The soft, white spheres are a reminder of the beauty and joy that winter brings."],"summary":"Snowballs are delightful winter creations that bring joy, offer opportunities for play, and hold special memories for many.","prompt":"snowball"},
  {"paragraphs":["In a bustling courtroom, whispers of suspicion hang thick in the air. Accused of wrongdoing, a person stands accused, facing the weight of evidence and the scrutiny of a judge and jury. The burden of proof rests on the prosecution to present credible and compelling facts that link the accused to the crime. The accused must then have the opportunity to present their defense, offering evidence and explanations that may clear their name.","The accused are often innocent until proven guilty. The legal system recognizes the importance of due process, ensuring that the accused are treated fairly and that their rights are protected. This includes the right to a fair trial, the right to legal representation, and the right to remain silent. Even when accused of the most serious crimes, it is essential to uphold these fundamental rights.","The experience of being accused can be daunting and stressful. The accused may feel overwhelmed by the legal process, the media scrutiny, and the emotional toll of the situation. It is crucial for the justice system to provide support and guidance to those who are accused. This includes offering legal aid, providing access to mental health services, and ensuring that the accused are aware of their rights and options."],"summary":"The legal system ensures that the accused are treated fairly and receive a fair trial, while upholding the burden of proof and upholding the rights of the accused.","prompt":"accused"},
  {"paragraphs":["A side can be something that completes something else. Like a slice of pizza, the crust is a side that holds all the delicious toppings. In a team sport, the sidelines are where the players go when they're not on the field, but they're still part of the game. Even in a book, the side characters are just as important as the main character because they help tell the story.","Sides can be physical or emotional. A side table next to a bed is a physical side, while a friend who is always there for you is an emotional side. Sometimes, a side can be something that makes things better. A slice of lemon can make lemonade taste better, and a friendly dog can make a lonely person feel loved. These sides are what make things more enjoyable or complete.","Sides are important because they can be the things that make something whole. They can be physical, emotional, or even just ideas. Without sides, things wouldn't be as interesting or complete. Just like a pizza with toppings or a team with substitutes, sides are an essential part of many things in life."],"summary":"Sides are important because they can complement or enhance the main thing, adding variety and depth to the overall experience.","prompt":"side"},
  {"paragraphs":["An imprint leaves a lasting mark on something. It's like a memory that stays with an object or even a living thing. When something leaves an imprint, it changes the surface or behavior of the object in a way that lasts. For example, when you press a stamp onto paper, it leaves an imprint of the stamp's design. The imprint remains even after the stamp is removed, reminding us of the mark it made.","Imprints can also be made on people. Every interaction we have, every experience we go through, leaves an imprint on our hearts and minds. The people we meet, the things we learn, and the challenges we overcome all shape who we are. These imprints stay with us, influencing our thoughts and actions in the future.","Imprints can even be found in the natural world. Animals often leave imprints in the ground or on trees as they mark their territory or communicate with others. Plants can also leave imprints on the soil as their roots grow and spread underground."],"summary":"Imprints are lasting marks that can be found on objects, people, and even in the natural world, leaving a significant impact on their behavior and characteristics.","prompt":"imprint"},
  {"paragraphs":["A loft is a spacious room in an old building that has been converted into a living space. It often features high ceilings and large windows, providing a sense of openness and airiness. Lofts are usually located on the top floors of buildings and offer stunning views of the surrounding area. They can be used as bedrooms, offices, or living areas, and often include features such as exposed brick walls and industrial lighting.","Lofts were originally used as storage spaces or workrooms in factories and other industrial buildings. As these buildings were often left empty or underutilized, entrepreneurs and creatives saw potential in them. They transformed the spaces into comfortable and stylish living areas, capitalizing on the unique features and historical significance of the buildings.","Lofts have become increasingly popular among young professionals and artists who appreciate the combination of spaciousness, character, and affordability. They offer a unique living experience that blends history and modern design. The conversion of lofts also contributes to the preservation of older buildings and their unique architectural styles."],"summary":"Lofts are converted spaces in old buildings that offer spacious and stylish living areas with high ceilings and stunning views.","prompt":"loft"},
  {"paragraphs":["A snowflake, so finely crafted, dances gracefully in the winter wind. Each delicate crystal, formed from water vapor frozen in the cold, is like a miniature masterpiece. The intricate patterns and fragile structure of a snowflake are a testament to the power of even the finest elements to create something truly remarkable.","Fine dust swirling in the air can be a nuisance. It settles on surfaces, making them dusty and dull. But sometimes, finely ground materials can be used for good. For example, artists often use powdered pigments to create vibrant and colorful paintings. In medicine, finely ground herbs and spices are used to make potent remedies.","The word 'finely' can describe things that are incredibly small or things that are expertly done. From the finest silk to the finest craftsmanship, these things are characterized by their precision and attention to detail. The next time you see something that is finely done, take a moment to appreciate the care and skill that went into making it."],"summary":"The word 'finely' can refer to things that are incredibly small or expertly crafted, highlighting the precision and attention to detail in such creations.","prompt":"finely"},
  {"paragraphs":["An unobtrusive person blends seamlessly into their surroundings. They are quiet and respectful, never drawing unnecessary attention to themselves. Their actions speak for themselves, without any loud or flamboyant displays. Unobtrusive individuals understand the power of discretion and use it to create a positive impact on those around them. Their humility and consideration make them valuable assets in any social setting.","A true mark of an unobtrusive person is their ability to adapt to different situations. They can seamlessly navigate social gatherings, making connections without being overbearing. They respect the opinions of others and are willing to listen attentively. Unobtrusive individuals are also mindful of their surroundings, paying attention to details and avoiding any disruptions. Their quiet presence creates a sense of calm and tranquility.","Unobtrusive people are not afraid to stand out from the crowd, but they do so in a respectful and understated way. They possess a confident demeanor that exudes trustworthiness and integrity. Their actions are guided by values of honesty and kindness, which allows them to build meaningful relationships with others. Unobtrusive individuals are true gems, valued for their humility, discretion, and unwavering support."],"summary":"Unobtrusive people are respectful and quiet individuals who seamlessly blend into their surroundings, demonstrating humility, discretion, and a mindful presence.","prompt":"unobtrusive"},
  {"paragraphs":["Saturation can be a bittersweet feeling. While it implies having enough of something good, like delicious food or exciting toys, it can also mean having too much of something, leading to boredom or discomfort. For example, eating too much candy can lead to a tummy ache, while having too many toys can make it difficult to choose which ones to play with. Finding the right balance is key to experiencing true satisfaction.","Saturation can also apply to emotions. Feeling too much joy or happiness can lead to fatigue and a loss of interest in other things. Similarly, being overwhelmed with sadness or anger can lead to emotional exhaustion. It's important to acknowledge and express emotions, but in moderation to maintain a healthy balance.","Saturation is a common experience in our daily lives. From overeating snacks to spending too much time on screens, we can easily find ourselves feeling overwhelmed. Recognizing when enough is enough and finding joy in moderation will lead to a happier and more fulfilling life."],"summary":"Saturation, while often associated with having enough of something good, can also refer to having too much, leading to boredom, discomfort, or emotional exhaustion.","prompt":"saturation"},
  {"paragraphs":["Hope hangs like a thin veil over the horizon, whispering promises of better days ahead. It's a fragile feeling, easily swayed by the winds of doubt and disappointment. But hope, at its core, is about believing in a brighter future, even when things seem bleak in the present. It fuels the human spirit and compels us to keep striving, to push forward despite challenges.","Hope is not just about wishing for something to happen. It's about taking action, putting in the effort, and believing that our actions can make a difference. It's about surrounding ourselves with positive people and fostering a supportive community. This way, even when setbacks occur, hope remains alive, propelling us forward towards our goals.","Hope is a powerful force, capable of overcoming adversity and inspiring greatness. It teaches us that the future is not set in stone and that we have the power to shape it through our actions and beliefs. It's a reminder that no matter how tough things may seem, there is always a reason to hope, to dream, and to believe in a brighter tomorrow."],"summary":"Hope fosters a belief in a brighter future, encourages action and positive choices, and ultimately empowers individuals to overcome challenges and achieve their goals.","prompt":"hopefully"},
  {"paragraphs":["In the bustling world of human progress, invention has played a pivotal role. From the humble pen that revolutionized writing to the awe-inspiring smartphone that fits in your pocket, countless breakthroughs have shaped our lives. The spirit of innovation has always driven humanity forward, leading to remarkable discoveries that have improved our lives and expanded our horizons.","Invention is a process of problem-solving and creativity. It involves brainstorming ideas, experimenting with different materials and designs, and overcoming challenges that arise. The pioneers of invention, like Leonardo da Vinci and Marie Curie, were driven by an insatiable curiosity and a desire to make the world a better place. Their groundbreaking discoveries opened up new possibilities and transformed industries.","The importance of invention extends far beyond material advancements. It also encompasses significant strides in healthcare, education, and social progress. Medical inventions such as vaccines and medical devices have saved countless lives. Educational innovations like the printing press and the internet have transformed the way we learn and access information. Social inventions like the telephone and the internet have connected people across vast distances, fostering communication and understanding."],"summary":"Invention has been a driving force behind human progress, leading to groundbreaking discoveries that have revolutionized various aspects of life.","prompt":"invention"},
  {"paragraphs":["Lockers play a crucial role in the daily lives of students. These metal cabinets provide a secure and convenient place to store belongings such as books, notebooks, and other school materials. They offer a sense of ownership and organization, allowing students to keep their things organized and easily accessible. Having a locker makes it easier for students to focus on their studies without worrying about misplacing or damaging their belongings.","Lockers are not only practical but also symbolic. They represent a transition from childhood to adolescence, as students begin to take on more responsibility for their belongings. The act of locking and unlocking a locker teaches students about accountability and the importance of taking care of their possessions. This sense of responsibility will stay with them throughout their lives.","In addition to their practical and symbolic value, lockers also offer a sense of community. Students often socialize in the vicinity of their lockers, forming friendships and sharing stories. They become a place where memories are made and friendships are strengthened."],"summary":"Lockers serve multiple functions, providing secure storage, fostering a sense of ownership, and cultivating responsibility among students.","prompt":"locker"},
  {"paragraphs":["Some people believe that certain personality traits and abilities are inborn, meaning they are present from birth. These traits can include things like musical talent, athleticism, or artistic creativity. Others argue that these qualities are developed through environment, education, and experiences throughout life. The debate over the relative influence of nature and nurture on human characteristics has been ongoing for centuries.","Supporters of the inborn theory point to evidence suggesting that some abilities have a genetic basis. Studies have shown that twins, who share 100% of their genes, often exhibit similarities in their personalities and skills. Additionally, some physical traits like eye color or height appear to be predetermined by genetics.","Ultimately, the question of whether certain traits are inborn or learned is complex and multifaceted. Both nature and nurture play a role in shaping the individuals we become. While some abilities may have a genetic predisposition, they can also be honed and developed through practice and dedication."],"summary":"The debate over the influence of genetics versus environment on human characteristics is ongoing, with evidence supporting both the inborn and learned theories.","prompt":"inborn"},
  {"paragraphs":["In our fast-paced world, it is important to exercise caution in everything we do. From crossing the street to using sharp objects, our decisions can have serious consequences. By being careful, we can avoid injuries, damage to property, and even save lives. Caution is not just about avoiding danger, but also about making thoughtful choices that will lead to positive outcomes.","Taking precautions is especially important in unfamiliar situations. When we are in new places or dealing with unfamiliar tasks, we need to be extra careful to avoid potential risks. This could mean asking for help from an adult, reading instructions carefully before attempting something, or simply taking a moment to assess the situation and consider possible risks. By being cautious, we can minimize the chances of making mistakes or encountering problems.","The benefits of caution extend far beyond physical safety. By exercising caution in our thoughts and actions, we can also protect our emotional and mental well-being. Carefully considering our decisions can help us avoid making choices that could harm our relationships, damage our reputation, or lead to feelings of regret."],"summary":"Caution is essential for avoiding risks, making thoughtful decisions, and ensuring positive outcomes in various aspects of life.","prompt":"precaution"},
  {"paragraphs":["In the dizzying whirlwind of our daily lives, we often encounter moments that seem utterly senseless. These are the times when actions and decisions seem to make no logical sense, leaving us feeling confused and bewildered. One such moment is when we witness senseless violence or cruelty, where the perpetrators' motives seem beyond comprehension. The sheer senselessness of such acts fills us with a profound sense of unease and despair.","Another instance of senselessness is when we encounter inexplicable tragedies. Natural disasters, plane crashes, or sudden illnesses often leave us questioning the fairness of life. The loss of innocent lives, the destruction of property, and the sheer magnitude of such events seem to transcend any rational explanation. This sense of meaninglessness can be overwhelming and lead to feelings of grief, fear, and existential dread.","The senselessness of these moments reminds us that there are things in life that simply cannot be explained. While logic and reason often guide us through our daily lives, there are times when the universe simply defies our understanding. It is during these times that we must learn to embrace the mystery and awe of the unknown, rather than searching for answers that may not exist."],"summary":"The essay explores the profound sense of senselessness encountered in moments of unexplained violence, tragedy, and the mysteries of life.","prompt":"senseless"},
  {"paragraphs":["Courage is the ability to face challenges and overcome fears. When we dare to be brave, we open doors to new possibilities and make amazing discoveries. Sometimes, the greatest adventures start with a simple dare. Imagine standing on the edge of a cliff, your heart pounding in your chest. The wind whispers in your ear, telling you that it's too dangerous. But if you dare to take that step, you might just find yourself soaring through the air, feeling the rush of adrenaline like a superhero. Every great achievement starts with a daring act. From climbing mountains to solving mysteries, daring to be bold unlocks a world of potential.","Daring also means standing up for what you believe in. It's about speaking out against injustice and fighting for what's right. When we dare to be different, we challenge the status quo and inspire others to do the same. Sometimes, daring to be yourself is the most courageous thing you can do. In a world filled with expectations, it takes courage to be unapologetically yourself and embrace your unique qualities. Daring to be different fosters a sense of individuality and empowers you to make your own choices.","In conclusion, daring is an essential part of life. It is the fuel that drives exploration, the key to unlocking potential, and the power that transforms ordinary people into extraordinary heroes. By daring to be brave, we push our limits, discover new talents, and make a difference in the world. The greatest adventures and most meaningful accomplishments are often those that require us to overcome our fears and embrace the unknown."],"summary":"Daring to be brave unlocks a world of possibilities by allowing individuals to face challenges, explore their potential, and make a difference in the world.","prompt":"dare"},
  {"paragraphs":["Leeches are fascinating creatures that have evolved to survive in diverse environments. These bloodsucking invertebrates can be found in freshwater, saltwater, and even on land. Despite their reputation as harmful creatures, leeches play a vital role in ecosystems as natural blood donors. They help maintain the health of aquatic animals by regulating blood flow and removing excess blood.","Leeches have a simple body structure consisting of a head, a muscular body, and a tail. Their heads are equipped with specialized teeth and a muscular mouth that enable them to pierce skin and suck blood. These creatures possess a complex nervous system that allows them to navigate their surroundings and locate prey. Despite their seemingly aggressive behavior, leeches are actually quite sensitive to changes in water quality and temperature.","Leeches have been used for centuries in traditional medicine and modern healthcare. Their anticoagulant properties make them valuable in treating blood clots and improving blood circulation. In addition, leeches have been shown to have potential in wound healing and pain relief. Their ability to regulate blood flow and remove excess fluid makes them useful in various medical settings."],"summary":"Leeches are bloodsucking invertebrates that play a crucial role in ecosystems while also having potential applications in traditional medicine and healthcare.","prompt":"leach"},
  {"paragraphs":["Intoxication is a state of altered mental and physical abilities caused by the presence of certain substances in the body. These substances can be drugs, alcohol, or even some natural substances. The effects of intoxication can range from mild euphoria to severe hallucinations and impaired decision-making. In some cases, intoxication can even be deadly.","The effects of intoxication are due to the way these substances interact with the brain and nervous system. They can disrupt the chemical balance in the brain, leading to changes in mood, behavior, and cognitive abilities. Some common symptoms of intoxication include slurred speech, impaired coordination, and difficulty concentrating.","Intoxication can have serious consequences for both the individual and society. It can lead to impaired driving, increased risk of accidents, and even addiction. It is important to be aware of the potential risks of intoxication and to make responsible choices regarding the use of substances."],"summary":"Intoxication disrupts brain function, leading to altered mental and physical abilities, potentially causing harm to individuals and society.","prompt":"intoxication"},
  {"paragraphs":["Painting is an art form that utilizes paints, brushes, and canvas to create visual masterpieces. The process starts with a blank canvas, where artists apply paint in various techniques to transform it into a work of art. Different types of paint like acrylic, oil, and watercolor offer unique characteristics that influence the final product. Artists often blend these paints to create new colors and achieve their desired effects.","The beauty of painting lies in its versatility. It can capture diverse subjects, from serene landscapes to bustling cityscapes. Artists can express their emotions through their paintings, creating abstract or representational works. Their brushes dance across the canvas, leaving behind trails of vibrant colors that tell a story. Each painting is a unique journey of imagination and creativity.","Painting is a rewarding and therapeutic experience. It allows artists to explore their inner selves and communicate their ideas through their art. The act of painting can be calming and meditative, offering a sense of peace and fulfillment. Whether it's a hobby or a profession, painting empowers individuals to unleash their creativity and bring their visions to life."],"summary":"Painting is an art form that showcases creativity, captures diverse subjects, and allows artists to express their emotions through paint and brushstrokes.","prompt":"painting"},
  {"paragraphs":["A subscriber is someone who chooses to regularly receive a service or information. Just like receiving a delicious pizza every month as a 'Pizza Club' subscriber, or enjoying a new book every week as a 'Bookworm' subscriber, there are many different types of subscriptions available. Some subscriptions are digital, like streaming music or online games, while others are physical, like magazines or newspapers. The common thread among all subscriptions is that they offer something valuable on a regular basis to the subscriber.","Many people choose to subscribe to things that interest them. Sports fans might subscribe to a website or app to get live updates and highlights of their favorite team. News enthusiasts might subscribe to a newspaper or news channel to stay informed about current events. People who love music might subscribe to a streaming service to enjoy a vast library of songs. The variety of subscription options caters to different interests and budgets.","Subscriptions can be incredibly beneficial. They provide convenience, access to exclusive content, and sometimes even discounts. By subscribing to something that you truly enjoy or find useful, you are ensuring that you will continue to receive that special something on a regular basis. This can make life easier, more enjoyable, and even save you money in the long run."],"summary":"Subscriptions offer regular access to valuable services, information, or content, catering to diverse interests and providing convenience, exclusive content, and often discounts.","prompt":"subscriber"},
  {"paragraphs":["A lucrative career offers the potential for great financial rewards and job satisfaction. Doctors, lawyers, and engineers are just a few examples of professions that are often associated with high salaries and opportunities for advancement. These careers require years of education, training, and hard work to achieve, but the financial benefits can be significant. The ability to earn a good living allows people to provide for their families, pursue their passions, and achieve financial security.","A lucrative business can be incredibly profitable. Starting a successful company or investing in established businesses can lead to large financial gains. Entrepreneurs who create innovative products or services, or who identify profitable market opportunities, can reap the rewards of their hard work. The potential for wealth and growth makes starting a business an attractive option for many people.","While financial rewards are important, it's also crucial to consider the value and fulfillment associated with a lucrative career or business. Choosing a path that aligns with your interests, values, and skills will lead to greater satisfaction and success in the long run. A lucrative career should not be the sole motivator, but it can be a significant factor in making informed decisions about your future."],"summary":"A lucrative career or business offers financial rewards, job satisfaction, and the potential for wealth and growth.","prompt":"lucrative"},
  {"paragraphs":["The occult refers to beliefs and practices that are outside the realm of mainstream religion or science. These practices often involve supernatural elements and aim to harness or manipulate spiritual forces for personal or mystical purposes. Witchcraft, voodoo, and astrology are common examples of occult beliefs. Some people engage in these practices for entertainment or curiosity, while others believe they can offer solutions to real-life problems or spiritual guidance.","The history of the occult dates back to ancient civilizations. Many cultures have their own unique occult practices, such as the ancient Egyptians with their hieroglyphics and rituals involving the afterlife. Throughout history, there have been numerous individuals and groups who have embraced the occult, seeking knowledge and power beyond what conventional wisdom offers.","The debate surrounding the occult centers on its legitimacy and potential dangers. Some experts view it as harmless and a form of escapism, while others caution against its potential for manipulation and harm. The occult can be seen as a reflection of human desire for the extraordinary and a way of exploring the mysteries of the universe."],"summary":"The occult encompasses diverse beliefs and practices that delve into supernatural realms and aim to harness spiritual forces.","prompt":"occult"},
  {"paragraphs":["Feeling satisfied is a warm and happy feeling that comes when we have accomplished something or received something that makes us happy. It's like a delicious taste of success, and it motivates us to keep going. Sometimes, satisfaction comes from completing a challenging task, like finishing a difficult homework assignment or studying for a test. Other times, it comes from receiving something special, like a gift from a loved one or a treat that we've been wanting.","Satisfaction can be found in many different things. It can be as simple as enjoying a delicious meal or spending time with friends and family. It can also be about achieving goals, like finishing a project or getting a good grade on a test. When we achieve something, no matter how small, it fills us with a sense of accomplishment and satisfaction.","Feeling satisfied is an important part of life. It helps us to stay motivated and to feel happy and fulfilled. When we are satisfied, we are more likely to be productive and to enjoy life to the fullest."],"summary":"Satisfaction is a feeling of accomplishment and happiness that comes from completing tasks, receiving rewards, or achieving goals.","prompt":"satisfaction"},
  {"paragraphs":["Being downright silly sometimes is a good thing. It lets us release tension, have fun, and learn new things. When we're silly, we're not focused on being perfect or on following every rule. We can just be ourselves and enjoy the moment. Sometimes, being downright silly is the best way to make others happy too. When we share our silly faces and jokes, we can lighten the mood and make people feel more comfortable around us.","Downright mean can be hurtful and damaging. It's important to be respectful of others and to use kind words. When we call someone downright mean, we're telling them that they're stupid or worthless. This can hurt their feelings and make them feel bad about themselves. It's important to remember that everyone is different and should be treated with respect.","Being downright curious can lead to amazing discoveries. When we're curious, we ask questions and explore new things. We learn new things about the world and about ourselves. Being curious can also help us to solve problems and to make new friends. It's important to embrace our curiosity and to let it guide us on our journey through life."],"summary":"The essay explores different meanings of the term 'downright,' emphasizing the importance of being silly for enjoyment, respecting others with kindness, and embracing curiosity for learning.","prompt":"downright"},
  {"paragraphs":["Imagine a creature towering over mountains, its footsteps shaking the ground beneath your feet. This awe-inspiring giant stands tall, reaching heights that seem out of reach for anyone. Some giants are known for their immense strength, able to lift objects that would crush a human. Others possess wisdom passed down from generations, sharing stories and lessons learned from their long lives. But giants are more than just their physical size. They represent a spirit of wonder and an imagination that can only be found in the most extraordinary beings.","Throughout history, tales of giants have captivated our imagination. From the gentle giants of Greek mythology to the terrifying giants of Irish folklore, these creatures have left their mark on stories and legends. Some giants are protectors, offering aid to those in need. Others are fierce warriors, battling against evil forces. These diverse representations show that giants are not just one type of creature, but a representation of different qualities and characteristics.","The idea of a giant represents something that is beyond our ordinary reach. It is a reminder that there are things in the world that are bigger and better than ourselves. The presence of giants reminds us to dream big, to explore new horizons, and to embrace the wonders of our imagination. These extraordinary beings teach us that anything is possible if we dare to believe in the impossible."],"summary":"The theme of 'giant' explores the concept of extraordinary beings that represent immense strength, wisdom, and the boundless possibilities of imagination.","prompt":"giant"},
  {"paragraphs":["Recommendations play a vital role in our lives, guiding us towards the best products, services, and even people. When someone we trust recommends something, we're more likely to consider it. This is because their opinion is valued and we believe they have experience with the item or service. A good recommendation can be like a stamp of approval, reassuring us that whatever we're being recommended is worth checking out.","Recommendations can be found everywhere. From friends and family members to online reviewers and industry experts, there are many different sources of recommendations. Each source offers a unique perspective and can provide valuable insights. It's important to consider the credibility of the recommender and the relevance of their recommendation to our needs.","Recommendations can have a significant impact on our decisions. By listening to the recommendations of others, we can discover new and exciting things that we might not have found on our own. Ultimately, recommendations can help us make better choices and find products or services that meet our specific needs and preferences."],"summary":"Recommendations from trusted sources can guide individuals towards valuable products, services, or people.","prompt":"recommendation"},
  {"paragraphs":["The world above our heads is a place of wonders and mysteries. From towering clouds to birds soaring through the sky, there is always something fascinating to discover overhead. The fluffy white clouds drift like giant blankets, casting shadows on the ground below. Sometimes, they even look like fluffy animals or shapes that capture our imagination. The birds, on the other hand, are graceful aerial performers, showcasing their beautiful colors and distinctive calls as they navigate the skies.","The overhead view offers a different perspective on the world. From high up, we can see vast landscapes, sparkling bodies of water, and even distant mountains. The feeling of being so high up can be both exhilarating and calming. It is a reminder of the vastness of the world and the smallness of our individual lives.","The things that are overhead play an important role in our lives. The clouds help regulate the temperature and provide shelter from the sun. The birds provide us with food and companionship. The stars and moon that twinkle in the night sky bring wonder and awe to our lives."],"summary":"The world overhead is a captivating and diverse realm filled with natural wonders that influence our lives in numerous ways.","prompt":"overhead"},
  {"paragraphs":["The word 'clear' has many different meanings. It can mean free from clouds or fog, allowing sunlight to shine through. This kind of clear is often associated with peaceful weather and breathtaking views. Another meaning of clear is easy to understand or follow. When something is clear, it means there are no confusing or complicated parts. This kind of clear is important for learning and completing tasks. Finally, 'clear' can also mean morally good or honest. When someone is clear, they are someone you can trust and rely on.","Clear skies and calm waters are a sight to behold. The absence of clouds creates a stunning view of the world below. The clear blue sky reflects on the water, creating a peaceful and serene atmosphere. The clarity of the water allows us to see fish swimming below the surface, adding to the beauty of the moment.","Clear communication is vital for successful relationships and teamwork. When people can understand each other easily, they can work together more effectively and build stronger bonds. Clear instructions and explanations make completing tasks and solving problems easier. In all aspects of life, clarity is key to achieving success and building meaningful connections."],"summary":"The word 'clear' encompasses various meanings related to the absence of obstructions, ease of understanding, and moral integrity.","prompt":"clear"},
  {"paragraphs":["An infirm person is someone who is physically or mentally unable to perform certain activities due to illness or injury. This can range from mild limitations to severe disabilities that greatly affect their daily lives. Many factors can contribute to infirmity, including age, underlying health conditions, and accidents. Some common symptoms of infirmity include pain, fatigue, mobility issues, and cognitive difficulties.","Infirmity can have a profound impact on the lives of those who experience it. It can limit their ability to perform tasks, socialize, and participate in meaningful activities. The physical and emotional challenges associated with infirmity can also lead to feelings of isolation, depression, and anxiety. Caregivers often take on significant responsibilities to assist infirm individuals with their daily needs, which can also be physically and emotionally demanding.","While infirmity can be a difficult and challenging experience, there are many resources available to support those who are affected. Healthcare professionals, social workers, and rehabilitation therapists can provide medical care, emotional support, and practical guidance. Support groups and assistive devices can also help infirm individuals maintain a sense of independence and dignity."],"summary":"Infirmity, caused by illness, injury, or other factors, poses physical and emotional challenges, limiting activities, causing isolation, and requiring caregiving support.","prompt":"infirm"},
  {"paragraphs":["Keeping our surroundings clean and free from germs is vital for staying healthy. A sanitary environment is one that is free from dirt, dust, and other harmful substances. Having a clean and sanitary environment reduces the risk of illness and disease. Cleanliness is not just about physical hygiene, but also about maintaining a clean and sanitary space in our homes, schools, and workplaces. Regularly cleaning and sanitizing surfaces helps to prevent the spread of germs and bacteria.","A sanitary environment is not only important for physical health, but also for mental well-being. A clean and sanitary space can create a sense of calmness and relaxation. This is especially important in our homes, where we spend a lot of time. A cluttered and dirty environment can be stressful and can negatively impact our mood. By maintaining a clean and sanitary home, we can create a more peaceful and enjoyable living space.","Therefore, it is important to prioritize sanitation in our daily lives. This includes regularly cleaning our surroundings, washing our hands frequently, and taking steps to prevent the spread of germs. By creating a sanitary environment, we can protect ourselves from illness, promote good health, and maintain a sense of peace and well-being."],"summary":"Maintaining a clean and sanitary environment is crucial for physical health, mental well-being, and overall protection from illness.","prompt":"sanitary"},
  {"paragraphs":["Discarded items fill landfills and harm the environment. Plastic bottles, food scraps, and old clothes take hundreds of years to decompose. These discarded items release harmful chemicals into the soil and water, harming animals and plants. It is important to reduce the amount of trash we produce and find ways to reuse or recycle items whenever possible.","There are many ways to reduce the amount of trash we discard. We can bring our own reusable bags to the grocery store, choose products with less packaging, and compost food scraps. We can also fix or repair items instead of throwing them away. These small changes can make a big difference in reducing the amount of trash we produce.","Discarded items can be given a new life through recycling or repurposing. Plastic bottles can be turned into new bottles or park benches. Old clothes can be turned into new clothes or cleaning rags. By giving discarded items a new purpose, we can reduce the amount of trash that ends up in landfills."],"summary":"Reducing the amount of trash we discard through reuse, recycling, and repurposing is important for protecting the environment.","prompt":"discard"},
  {"paragraphs":["Extracting precious metals from the Earth is a complex and environmentally impactful process. Miners must use powerful machines and techniques to unearth and process the ores that contain these metals. The extraction process often leaves behind massive holes and environmental damage. Environmental regulations are in place to minimize the harm caused by mining, but the debate over its sustainability continues.","Gold, silver, copper, and aluminum are just a few of the valuable metals that are extracted from the ground. These metals are used in various industries, including electronics, construction, and transportation. The extraction of these metals is essential for modern technology and infrastructure.","The extraction of metals is a delicate balance between providing essential resources and preserving the environment. Balancing the need for these resources with the responsibility to protect the planet is a challenge that society must address as technology advances and our understanding of environmental sustainability evolves."],"summary":"The extraction of metals involves complex processes that impact the environment, but is crucial for providing essential resources for modern society.","prompt":"extract"},
  {"paragraphs":["Circumstances play a significant role in shaping our lives. From the environment we grow up in to the people we meet and the events we encounter, our surroundings influence our thoughts, actions, and destinies. For instance, a child raised in a wealthy family may have different opportunities and challenges compared to a child from a less affluent background. Their circumstances can impact their education, social experiences, and future prospects.","Circumstances can also affect our choices and behaviors. When faced with adversity or difficult circumstances, people may develop resilience, determination, or a sense of compassion for others. Conversely, comfortable and supportive circumstances can lead to complacency or a lack of motivation. Our surroundings can therefore shape our character and ethical values.","In conclusion, circumstantial factors play a profound role in our lives, influencing our opportunities, choices, and destinies. By recognizing the influence of our surroundings, we can better understand ourselves and the world around us."],"summary":"Circumstances significantly shape our lives, impacting opportunities, choices, and destinies.","prompt":"circumstantial"},
  {"paragraphs":["In the whirlwind of daily life, finding ways to save time is a superpower. The ability to manage our minutes and hours effectively allows us to accomplish more, explore new hobbies, and simply enjoy life to the fullest. One way to achieve this is to streamline our routines and eliminate unnecessary steps. By simplifying tasks and automating processes, we can free up valuable time that would otherwise be spent on tedious chores.","Another way to quicken our pace is to set priorities and focus on completing the most important tasks first. By identifying the items that truly matter, we can allocate our energy and attention accordingly. This ensures that we get the most out of our time and avoid feeling overwhelmed by a backlog of unfinished projects. Additionally, learning to delegate tasks or outsource them when possible can further lighten our load and create more free time.","Ultimately, quickening our pace is about making conscious choices and taking deliberate action. By strategically managing our time, simplifying processes, prioritizing tasks, and delegating when necessary, we can reclaim valuable minutes and hours in our day. This newfound freedom allows us to pursue our passions, spend more time with loved ones, or simply savor the simple joys of life."],"summary":"Quickening our pace in life involves prioritizing tasks, streamlining routines, automating processes, and deliberately allocating our time to achieve more in less time.","prompt":"quicken"},
  {"paragraphs":["The number fifty holds a special place in many cultures and traditions. It symbolizes a significant milestone, often associated with achievements, celebrations, and transitions. From completing a decade of education to reaching the halfway point in a race, reaching fifty is a reason for reflection and pride. Many cultures have traditions and rituals associated with the fiftieth birthday, such as elaborate parties and gift-giving.","The number fifty is also significant in mathematics and science. It appears in various mathematical formulas and calculations, and plays a role in scientific discoveries and technological advancements. For example, the formula for calculating the area of a circle involves the number fifty-two. This demonstrates the importance of fifty in mathematical reasoning and problem-solving.","Throughout history, notable figures have reached the age of fifty and gone on to achieve remarkable things. From renowned scientists to inspiring leaders, their accomplishments at this stage of their lives often inspire future generations to reach their own goals and celebrate their own fiftieths."],"summary":"The number fifty symbolizes significant milestones, is mathematically and scientifically important, and has been associated with notable achievements throughout history.","prompt":"fiftieth"},
  {"paragraphs":["A composite is a combination of different parts to form a whole. It's like making a delicious pizza! You can choose different toppings like pepperoni, mushrooms, or onions to create your perfect pizza. Each topping is unique, but together they make something even better. Just like your favorite pizza, composites are made up of many different pieces that work together to create something special.","A composite can be found in many different places. From the buildings we live in to the cars we drive, composites are everywhere. In buildings, concrete is a composite made of sand, gravel, water, and cement. It's strong and durable, making it perfect for building tall structures. In cars, fiberglass is a composite made of glass fibers and resin. It's lightweight and strong, making it ideal for cars.","Composites are special because they have unique properties that are greater than the sum of their parts. They are often stronger, lighter, or more durable than materials that are made from just one type of substance. This is why composites are so widely used in various industries and applications."],"summary":"Composites are combinations of different parts that create something stronger and more useful than the individual parts alone.","prompt":"composite"},
  {"paragraphs":["Slate is a naturally occurring metamorphic rock that is prized for its smooth, flat surfaces and beautiful patterns. Formed from sedimentary rocks under high pressure and temperature, slate exhibits a distinct layered structure. The layers can be easily split into thin sheets, making it ideal for various artistic and practical applications.","Slate's versatility has captivated humans for centuries. Artists have utilized its smooth surfaces to create stunning carvings and paintings, while architects and engineers have employed it in building construction due to its durability and water resistance. Slate pencils, a common school supply, are made from finely ground slate dust, offering a smooth and consistent writing experience.","Slate's unique properties and fascinating history make it a valuable resource for both artistic and practical purposes. From its natural formations to its diverse applications, slate has captivated people across cultures and continues to inspire awe and wonder."],"summary":"Slate's remarkable properties and diverse applications have captivated humans for generations, making it a treasured material for artistic and practical endeavors.","prompt":"slate"},
  {"paragraphs":["The word 'occur' is an action word that describes something happening at a specific time. It can be used to describe both planned and unplanned events. For example, a school dance is a planned occurrence, while a sudden thunderstorm is an unplanned occurrence.","The word 'occur' can also be used to describe the natural development of something over time. This is often used in science and history. For example, a plant growing from a seed is a gradual occurrence that takes place over weeks or months. Similarly, the rise and fall of civilizations is a historical occurrence that unfolds over centuries.","The word 'occur' is a versatile and important word that can be used to describe a wide range of events, from the sudden to the gradual. Its flexibility and accuracy make it a valuable tool for communication in both everyday conversations and formal writing."],"summary":"The word 'occur' refers to an action or event happening at a specific time or naturally developing over time.","prompt":"occur"},
  {"paragraphs":["A professional is someone who has developed skills and knowledge in a specific area and uses them to perform tasks efficiently and effectively. Doctors, teachers, engineers, and lawyers are all professionals who have undergone rigorous training and education to acquire their expertise. They are expected to maintain a high standard of conduct and ethical behavior in their work, as their actions have a direct impact on others.","Professionalism is not limited to individuals with formal titles or high-paying jobs. Anyone who approaches their responsibilities with dedication, integrity, and a commitment to excellence can be considered a professional. This includes volunteers, students, or even someone who takes care of their household chores with meticulous care. The core qualities of professionalism are respect, responsibility, and a willingness to go above and beyond expectations.","Being professional is crucial in both personal and professional settings. It fosters trust and respect among colleagues, clients, and society as a whole. By demonstrating professionalism, individuals can build strong relationships, achieve success, and make a positive impact on the world around them."],"summary":"Professionalism involves developing skills, maintaining high standards, and displaying respect and responsibility in both formal and informal settings.","prompt":"professional"},
  {"paragraphs":["A taunt is a playful or teasing statement or action. It's often used to lighten the mood, create a sense of camaraderie, or simply have fun. Taunts can be directed at friends, family members, or even strangers. While they may sometimes hurt the feelings of the recipient, they're usually intended to be harmless and not malicious. A well-timed and appropriately delivered taunt can bring laughter and joy to a situation.","Taunts can be verbal or nonverbal. Verbal taunts include jokes, funny comments, or playful insults. Nonverbal taunts can be expressed through facial expressions, gestures, or even physical actions. The effectiveness of a taunt often depends on the context and the relationship between the taunter and the recipient. In general, taunts are more likely to be accepted and appreciated by those who are close to the taunter.","Taunts can be a valuable tool for building relationships and fostering positive social interactions. By playfully teasing each other, people can create a sense of intimacy and belonging. They can also be used to resolve conflicts or lighten the tension in tense situations. However, it's important to remember that taunts should be used responsibly and should never be intended to hurt or humiliate others."],"summary":"Taunts are playful and teasing statements or actions intended to lighten the mood, create camaraderie, or foster positive social interactions.","prompt":"taunt"},
  {"paragraphs":["A console is like a mini-computer that lets you control other devices. It's like a secret command center where you can tell your computer what to do. For example, you can use a console to download music, play games, or even write stories. Consoles are usually found on computers or other electronic devices, and they give you more control over what's happening inside them.","Consoles are like little workers that help you get things done. They can take commands from you and then translate them into actions. This is why they're so useful for things like downloading large files or installing new software. Consoles can also be used to troubleshoot problems, which means they can help you identify and fix any issues with your computer.","Consoles are an important part of many electronic devices. They give you more control over your computer and can be used for a variety of tasks. From downloading music to fixing problems, consoles are like mini-computers that can do a lot of different things."],"summary":"Consoles are small computer interfaces that provide users with control over electronic devices by translating commands into actions.","prompt":"console"},
  {"paragraphs":["Volunteering is an act of kindness and generosity that benefits both the individual and the community. When people volunteer their time and skills, they are freely giving back to society without receiving any financial compensation. This act of selfless service can take many forms, such as tutoring younger students, cleaning up local parks, or assisting at soup kitchens. By volunteering, individuals can make a positive impact on their surroundings and foster stronger relationships within their communities.","The benefits of volunteering extend far beyond the immediate impact it has on the community. Volunteers often develop new skills and expand their existing knowledge through their involvement. They also have the opportunity to meet new people and make friends with similar interests. The sense of accomplishment and satisfaction that comes with volunteering can boost self-confidence and morale.","Volunteering is a valuable opportunity for people of all ages and backgrounds to contribute to their communities and make a difference. By freely offering their time and talents, volunteers empower others and create a more harmonious and inclusive society."],"summary":"Volunteering is an act of kindness and generosity that benefits both individuals and communities through skill development, social interaction, and positive impact.","prompt":"voluntary"},
  {"paragraphs":["The brain is an intricate and complex organ that serves as the control center for the entire body. Composed of billions of neurons, it allows us to think, move, and experience the world around us. The brain processes information from our senses, controls our movements, and stores memories. It is responsible for everything from remembering our favorite songs to solving mathematical problems.","Inside the brain, there are different regions that each have a specific function. The frontal lobe is responsible for planning, decision-making, and problem-solving. The temporal lobe deals with hearing, memory, and language. The occipital lobe is involved in vision, while the parietal lobe helps us with spatial awareness and attention. These regions work together to create a cohesive and functioning brain.","The brain is an amazing and adaptable organ that can learn and grow throughout our lives. By engaging in mental activities such as reading, puzzles, and playing games, we can stimulate our brains and improve our cognitive abilities. Taking care of our physical health through proper diet and exercise also contributes to brain function and health."],"summary":"The brain is a crucial organ that controls all bodily functions and processes information, thoughts, and memories.","prompt":"brain"},
  {"paragraphs":["Grueling challenges can feel overwhelming and daunting, but they also offer opportunities for growth and development. When we face something grueling, our minds and bodies are pushed to their limits. This can be uncomfortable and even painful, but it is also when we learn the most. Overcoming grueling obstacles teaches us resilience, determination, and the importance of pushing ourselves beyond our comfort zones.","Grueling challenges can teach us valuable lessons about ourselves. By facing adversity, we discover hidden strengths and capabilities. We learn what we are capable of achieving when we set our minds to it. This newfound knowledge and confidence can empower us to tackle future challenges with renewed determination.","Grueling challenges may be difficult, but they are also essential for personal growth. By pushing ourselves beyond our limits, we learn new skills, develop greater resilience, and discover who we truly are. These experiences can shape us into stronger, more capable individuals."],"summary":"Grueling challenges are uncomfortable and demanding, but they also provide opportunities for personal growth, teaching individuals resilience, determination, and valuable lessons about themselves.","prompt":"grueling"},
  {"paragraphs":["An usher's role is vital in ensuring the smooth functioning of any event or gathering. They are the friendly faces that greet attendees, answer questions, and guide them through the venue. Ushers are responsible for seating people, managing crowds, and ensuring that everyone has a comfortable and enjoyable experience. Their calm demeanor and helpful attitude create a positive atmosphere that enhances the overall event.","Ushers play a crucial role in security and safety. They monitor crowds to identify potential risks, intervene in emergencies, and maintain order. Their vigilance and quick thinking can prevent disturbances, ensure the safety of attendees, and maintain a sense of security at the event. Additionally, ushers often work in collaboration with security personnel to handle security-related tasks.","Ushers are often the first point of contact for attendees at large events. They provide valuable information about the event schedule, seating arrangements, and nearby amenities. Their knowledge of the venue and their ability to communicate clearly and efficiently contribute to a positive and memorable experience for everyone involved."],"summary":"Ushers are essential for creating a smooth and enjoyable event by managing crowds, ensuring safety, and providing valuable information to attendees.","prompt":"usher"},
  {"paragraphs":["A reviewer is someone who assesses and evaluates something, be it a book, a movie, or even a person. They look at the different aspects of the item and decide whether it is worth recommending to others. Critics often have strong opinions about the things they review, and their reviews can help others make informed decisions about what to enjoy. Some reviewers are experts in a particular field, such as literature or film, while others are simply passionate about a particular hobby or interest.","Reviewers play a crucial role in shaping public opinion. Their words can influence whether people decide to watch a new movie, read a new book, or visit a new restaurant. Positive reviews can generate excitement and encourage people to try something new, while negative reviews can deter people from something they might otherwise enjoy. The reviews of reviewers can be trusted by others because they have often built up a reputation for being honest and insightful.","Reviewers are not simply critics. They can also be advocates. They can highlight the positive aspects of something and encourage others to appreciate its unique qualities. Reviewers can also play a role in supporting emerging artists or creators. By reviewing their work, reviewers can bring attention to talented individuals who might not otherwise be discovered."],"summary":"Reviewers assess and evaluate various items, shaping public opinion and supporting creators through their insightful and informative reviews.","prompt":"reviewer"},
  {"paragraphs":["Turmoil can be a chaotic and unsettling experience that disrupts the peace and stability of an individual's life. It often stems from sudden or unexpected changes that challenge established routines and expectations. The disruption of daily life can lead to feelings of confusion, anxiety, and fear. Individuals may feel overwhelmed by the amount of uncertainty and lack of control during tumultuous times.","The effects of turmoil can extend far beyond immediate physical or emotional distress. It can also lead to long-term psychological and social consequences. The constant disruption of routines can make it difficult for people to maintain relationships, focus on work, or engage in meaningful activities. The sense of loss and displacement can lead to feelings of isolation and loneliness.","While turmoil can be devastating, it can also be an opportunity for growth and transformation. By learning to navigate through challenging times, individuals can develop resilience, adaptability, and a deeper appreciation for the peace and stability that comes with it."],"summary":"Turmoil disrupts routines, causing anxiety and feelings of loss, but it can also foster resilience and promote personal growth.","prompt":"turmoil"},
  {"paragraphs":["Resentment simmers like a bubbling pot on the stove, threatening to spill over and burn everything in its path. It's an unwanted companion, clinging to us like unwanted shadows. The source of our resentment can be as diverse as the people themselves. It could be a friend who constantly borrows things without offering repayment, or a sibling who always seems to get the better toys. This burning feeling can poison relationships and make it difficult to enjoy simple pleasures.","When we feel resentful, we often find ourselves holding grudges. We replay the hurtful moments over and over in our minds, adding fuel to the fire. This constant negativity can drain our energy and make it hard to focus on the positive things in our lives. It's like carrying around a heavy burden that weighs us down.","Fortunately, there's a way to escape the chains of resentment. By forgiving others, we release ourselves from the pain they caused. This doesn't mean forgetting the hurtful things people did or condoning their behavior. It simply means choosing not to let their actions define us or dictate our emotions. By letting go of resentment, we open ourselves up to a world filled with more love, joy, and peace."],"summary":"Resentment is a negative emotion that can damage relationships and drain energy, but it can be overcome through forgiveness.","prompt":"resentful"},
  {"paragraphs":["Earnestly means to do something with all your heart and mind. It's like giving something your full attention and effort. When you do something earnestly, you're showing that you really care about it. Sometimes, people might say you're 'earnest' if they think you're sincere or honest about something. For example, if you're writing a story and you really want to capture the reader's attention, you might write it earnestly and with all your creativity.","Being earnest isn't just about doing something with physical effort. It's also about doing it with mental focus. When you're concentrating on something earnestly, you're giving it your full mental energy. This means paying attention to every detail and making sure you understand the task or goal. It's about being dedicated and determined to finish what you start.","Earnestly is an important quality that can help you achieve your dreams and goals. When you approach something with earnest enthusiasm, you're showing that you truly believe in its importance. This can inspire others and motivate them to support you. So, if you want to make a real difference in the world, remember to do things earnestly and with all your heart."],"summary":"Earnestly is about doing something with sincerity, concentration, and determination to achieve the best possible outcome.","prompt":"earnestly"},
  {"paragraphs":["Dominance is a powerful force that shapes the behavior of individuals and groups. It manifests in different ways, from physical dominance among animals to social dominance among humans. Dominant individuals often have greater access to resources, opportunities, and social acceptance. They tend to exert control over others through their physical strength, intelligence, or social skills.","Dominance can be both positive and negative. While some degree of dominance is necessary for order and productivity, excessive or unhealthy dominance can lead to conflict and oppression. Dominant individuals must learn to balance their desire for power with the need to respect and collaborate with others.","Dominance can have a profound impact on the lives of those who are dominated. Those who are constantly subjected to dominance may feel powerless, anxious, or even depressed. It is important to promote inclusivity and empower individuals to challenge dominant forces and create a more just and equitable society."],"summary":"Dominance is a complex social phenomenon that can have both positive and negative consequences on individuals and society.","prompt":"dominance"},
  {"paragraphs":["Being humane means treating others with kindness and respect. It's about understanding their feelings and needs, and acting in ways that benefit them. Kindness can be as simple as offering a helping hand to someone who needs it or expressing empathy when someone is going through tough times. By treating others with respect, we acknowledge their individuality and value their unique perspectives. True humanity lies in recognizing the common ground we share with others and in treating them as we would like to be treated.","Humane behavior extends beyond just treating individuals with kindness and respect. It also involves taking action to address the suffering of others. This could mean volunteering in our communities, supporting organizations that work to help those in need, or speaking out against injustice. By standing up for those who are unable to speak for themselves, we can make a positive impact on the world and create a more just and equitable society.","Ultimately, being humane is about treating others as we would like to be treated. This involves practicing empathy, kindness, and compassion. It's about recognizing the interconnectedness of all living things and taking action to create a better world for everyone."],"summary":"Being humane involves treating others with kindness and respect, addressing their suffering, and living by values of empathy and compassion.","prompt":"humane"},
  {"paragraphs":["In a bustling city, there are many separate spaces for different things. There are parks for playing, libraries for reading, and schools for learning. Each place serves a specific purpose and caters to a different need. Even in our homes, we have separate rooms for sleeping, eating, and playing. This separation helps us organize our lives and focus on the things that are important to us.","Separation can also be seen in the way people interact. In large groups, people often separate themselves into smaller groups based on their interests or beliefs. This separation allows for more focused conversations and deeper connections. For example, some people might gather to discuss literature, while others might form a group to play music. The separation of interests creates a richer and more diverse social experience.","Separation is an important part of life. It allows us to focus on specific tasks, connect with others who share our interests, and create a more organized and efficient environment. By separating things that are not essential, we can create space for the things that matter most."],"summary":"Separation in various aspects of life helps us prioritize, connect with others, and maintain focus.","prompt":"separate"},
  {"paragraphs":["A mug is a cozy companion that holds our warm and soothing beverages. It's the perfect vessel for a steaming cup of cocoa on a chilly day or a refreshing glass of lemonade on a hot afternoon. Mugs come in all sorts of shapes, sizes, and colors, making it easy to find one that reflects your personality. Some mugs even have fun designs or messages printed on them, adding a touch of individuality to your morning routine.","Mugs are more than just containers for our drinks. They can also be a symbol of comfort and nostalgia. Many people have a special mug that they associate with happy memories of home or family. It's a reminder of the good times spent with loved ones, making each sip of coffee or tea even more enjoyable.","Mugs are practical and stylish accessories that can enhance our drinking experience. They protect our hands from the heat of warm beverages and add a touch of elegance to our table settings. Whether you're using a classic porcelain mug or a modern stainless steel one, it's clear that mugs play a special role in our lives."],"summary":"Mugs are cherished items that combine functionality, individuality, and sentimental value in our daily lives.","prompt":"mug"},
  {"paragraphs":["Capacity refers to the amount of something a person or object can hold or contain. It can be physical, like the space inside a cup, or mental, like the amount of information a brain can process. Understanding capacity is important in various situations, such as choosing the right container for a drink or estimating how much time it takes to complete a task. The capacity of an individual often determines their potential for success in different areas of life.","Capacity can also be related to the amount of responsibility or workload someone can handle. For example, a student with a large capacity can manage multiple assignments and extracurricular activities with ease. Similarly, a leader with great capacity can inspire and motivate their team to achieve common goals. It is crucial to develop and cultivate our capacity over time through practice, learning, and positive experiences.","The concept of capacity extends beyond physical or mental limitations. It can also refer to the emotional capacity to handle difficult situations or the social capacity to build meaningful relationships. By acknowledging and developing our various capacities, we can unlock our full potential and thrive in life."],"summary":"Capacity refers to the ability to hold, contain, or handle a certain amount of something, whether physical, mental, or emotional.","prompt":"capacity"},
  {"paragraphs":["Stereotypes are widely held beliefs about certain groups of people that can be inaccurate and harmful. These biases can negatively impact individuals and society as a whole. For example, the stereotype that all boys are good at math can create unfair expectations and limit opportunities for girls. Such misconceptions can perpetuate inequality and undermine the potential of individuals based on their gender or other characteristics.","Stereotypes can be deeply ingrained in society, influencing how people perceive and interact with others. Media, culture, and social norms can perpetuate these biases, leading to the formation and reinforcement of stereotypes. The media often portrays certain groups in stereotypical roles, reinforcing existing beliefs and creating new ones. Cultural norms can also play a role, as certain behaviors or characteristics are associated with specific groups, leading to further stereotyping.","Stereotypes can have serious consequences for individuals and society. They can perpetuate discrimination, limit opportunities, and create social conflict. By challenging stereotypes and promoting understanding, we can create a more just and inclusive society where individuals can be valued for their unique qualities and contributions."],"summary":"Stereotypes perpetuate inaccurate and harmful beliefs, limiting opportunities and fostering social inequality.","prompt":"stereo"},
  {"paragraphs":["The iris, a colorful flower with a unique pattern, has captivated humans for centuries. Its petals, often ranging from pale hues to vibrant shades, display intricate veins that resemble a network of tiny rivers. These vibrant hues and fascinating patterns make the iris a popular choice for gardens and bouquets.","The iris flower symbolizes various emotions and has cultural significance across different regions. In ancient Greece, it was associated with the goddess Aphrodite, representing love and beauty. In Ireland, the white iris stands for purity and faith, while the yellow variety symbolizes friendship and joy. These diverse meanings make the iris a meaningful gift that can convey a variety of emotions.","The iris plant exhibits resilience and adaptability. It can thrive in various environments, from moist meadows to dry landscapes. The iris flower is also known for its medicinal properties. Its extracts have been used to treat various ailments, such as eye infections and digestive problems. The iris's remarkable beauty, cultural significance, and practical applications make it a truly remarkable flower."],"summary":"The iris flower, with its colorful petals, intricate patterns, and diverse symbolism, holds significance in both cultural and practical contexts.","prompt":"iris"},
  {"paragraphs":["A humanist is someone who believes in the power of human reason and action to solve problems. They focus on understanding human nature and improving the lives of others. Humanists value things like freedom of thought, individual rights, and social justice. They believe in using science, technology, and the arts to make the world a better place.","Humanists often question traditional beliefs and practices. They want to find out what works best for people based on evidence and reason. They are critical thinkers who are not afraid to challenge assumptions and search for new ideas. Humanism is not about rejecting religion or morality, but about focusing on what makes us human and finding solutions to problems through our own actions.","Humanism is a philosophy that emphasizes the potential of individuals to create a better world. Humanists believe in the power of human reason, creativity, and compassion to solve social and environmental problems. They are often involved in social activism and volunteering to make a difference in their communities."],"summary":"Humanism is a philosophy that emphasizes the importance of human reason, action, and social responsibility in creating a better world.","prompt":"humanist"},
  {"paragraphs":["In the bustling world of nature, there exists a captivating phenomenon known as replication. From the delicate petals of a flower to the intricate patterns of a spider's web, countless creatures and objects have the remarkable ability to replicate themselves. This process of creating an exact copy ensures the continuation of life forms and the preservation of vital features in the ecosystem. Throughout history, human ingenuity has also embraced replication, utilizing it in various fields such as science, engineering, and manufacturing.","Replication is a vital process in biological evolution. Plants and animals possess the ability to generate offspring that are genetically similar to themselves. This ensures the passing on of traits and genetic diversity. Cellular replication is equally crucial for the survival of all living organisms. Cells divide and multiply, creating new instances of themselves without compromising the integrity of the original. The process of replication in biology is essential for growth, renewal, and the continuity of life.","Beyond the realm of biology, human replication has found numerous applications. Technological advancements have enabled the replication of data, ideas, and even physical objects. Digital files can be easily copied and shared, while creative works like paintings and music can be replicated through various methods. In manufacturing and engineering, replication is used to produce precise copies of components and devices, ensuring consistency and efficiency."],"summary":"Replication is a ubiquitous process observed in nature and human endeavors, enabling the creation of exact copies of biological organisms, natural phenomena, and technological advancements.","prompt":"replicate"},
  {"paragraphs":["Some things are useful because they make our lives easier. For example, a pencil is useful because it helps us write and draw. It's small and lightweight, making it easy to carry around and use. Another useful thing is a computer. It can store and access information, play games, and connect with others. Computers are very important in our modern world.","Some things are useful because they help us solve problems. A calculator is useful because it can perform mathematical calculations quickly and accurately. It's especially helpful for complex or time-consuming problems. A flashlight is useful because it provides light in dark places. It can be used to explore caves, fix things at night, or simply find something that's dropped under furniture.","Things are useful when they are helpful, practical, or solve a problem. Many everyday items are useful because they make our lives simpler or more enjoyable. From simple tools to complex technology, there are many things that can be considered useful in our daily lives."],"summary":"Various items are considered useful due to their ability to simplify lives, solve problems, or provide practical benefits.","prompt":"useful"},
  {"paragraphs":["Chimpanzees are fascinating creatures that share many similarities with humans. They have intelligent minds, playful personalities, and complex social behaviors. These similarities have led to debates about whether chimpanzees are truly wild animals or simply distant cousins of humans. Their remarkable abilities and emotional complexities make them captivating subjects of study for scientists and animal lovers alike.","Chimpanzees live in large groups called troops, led by an alpha male. They communicate using a combination of vocalizations, gestures, and facial expressions. Their complex social structure involves hierarchy, cooperation, and conflict resolution. Chimps often engage in playful and aggressive games, demonstrating their playful nature and competitive spirit.","Chimpanzees face numerous threats in their natural habitats due to habitat loss, poaching, and the illegal pet trade. Conservation efforts are crucial to protecting these vulnerable creatures and preserving the biodiversity of the forests they call home."],"summary":"Chimpanzees exhibit human-like intelligence, social behaviors, and physical characteristics, highlighting their close relationship to humans and raising ethical considerations regarding their treatment and conservation.","prompt":"chimpanzee"},
  {"paragraphs":["A catastrophe is an event that causes widespread damage, suffering, or disruption. These events can be natural disasters like earthquakes, hurricanes, or volcanic eruptions, or human-made disasters such as wars, terrorist attacks, or financial crises. The effects of a catastrophe can be devastating, leaving behind destruction, loss of life, and lasting trauma. The aftermath of such events often requires immediate relief efforts and long-term recovery plans to restore communities and rebuild lives.","Catastrophes can have a profound impact on both individuals and communities. People often experience displacement, loss of loved ones, and financial hardship as a result of these events. The disruption of essential services and infrastructure can lead to shortages of food, water, and shelter. The psychological and emotional effects of a catastrophe can be just as devastating as the physical damage.","While some catastrophes are inevitable, others can be mitigated through preparation and prevention measures. Early warning systems, evacuation plans, and disaster drills can help reduce casualties and damage. Investing in resilient infrastructure and emergency supplies can also enhance communities' ability to withstand and recover from disasters. By taking these precautions, we can minimize the devastating effects of future catastrophes and ensure the safety and well-being of our communities."],"summary":"Catastrophes cause widespread damage, loss of life, and lasting trauma, emphasizing the importance of preparation, prevention measures, and community resilience.","prompt":"catastrophe"},
  {"paragraphs":["Preoccupation can be a burden that weighs heavily on our minds. When we are preoccupied, our thoughts are filled with worry, anxiety, or stress. This can make it difficult to focus on the present moment and enjoy life. Many factors can contribute to preoccupation, such as unresolved problems, negative thoughts, and a lack of balance in our lives. It is important to learn how to manage and overcome preoccupation to live a fulfilling life.","Preoccupation can also affect our physical health. When we are constantly worried, our bodies may respond by releasing stress hormones. This can lead to physical symptoms such as headaches, fatigue, and difficulty sleeping. It is important to take care of our physical health by engaging in healthy activities such as exercise, eating nutritious foods, and getting enough sleep. This can help to reduce stress and improve our overall well-being.","Preoccupation can be a cycle that is difficult to break. However, there are strategies we can use to overcome this. One way is to identify and address the underlying causes of our preoccupation. Another is to practice mindfulness techniques such as meditation or yoga to calm our minds and reduce worry. By taking these steps, we can learn to manage our preoccupation and live more fulfilling lives."],"summary":"Preoccupation can negatively impact both mental and physical health, but it can be overcome through addressing underlying issues, practicing mindfulness techniques, and taking care of physical health.","prompt":"preoccupation"},
  {"paragraphs":["Applause fills the air with a joyful hum, a symphony of appreciation for a performance well-done. It's like magic, where silent whispers transform into waves of delight. When someone finishes a breathtaking dance or delivers a captivating speech, the audience's thunderous clapping expresses their awe and admiration. Each clap is like a tiny drum, creating a powerful rhythm that celebrates the artist's talent and hard work.","Applause is not just for dazzling performances or exceptional skills. It can be a heartfelt response to any act that touches our hearts or inspires us. A kind word, a selfless act, or even a courageous decision can all warrant a round of applause. In these moments, the applause becomes a way to acknowledge the positive impact that the performance or action has had on the audience.","The beauty of applause lies in its ability to connect people. It transcends differences and fosters a sense of community. When we clap together, we celebrate not just the individual accomplishment but also the shared experience of witnessing something truly remarkable. This collective expression of appreciation creates lasting memories and fosters a culture of respect and admiration."],"summary":"Applause is a powerful expression of appreciation that celebrates individual achievements, inspires the audience, and fosters a sense of community.","prompt":"applause"},
  {"paragraphs":["Enlisting in something implies a conscious decision to join a group or organization with shared goals. Whether it's joining a school club or a sports team, enlisting shows a willingness to contribute to something bigger than oneself. The excitement of belonging and the chance to learn new things often motivate people to enlist in activities that interest them. Many people find fulfillment and lasting friendships through their enlistments, making it a significant step in their personal development.","Enlisting in the armed forces is a different kind of commitment. It requires physical and mental preparation, and often involves leaving behind family and friends. However, those who enlist in the military are driven by a sense of duty, patriotism, and a desire to serve their country. They understand the sacrifices involved but believe their service will make a difference in the lives of others.","Enlisting in anything, whether it's a casual club or a life-changing career, can be daunting, but it's always an opportunity to learn and grow. By stepping outside of one's comfort zone and embracing new challenges, people can discover their true potential and create lasting memories."],"summary":"Enlisting in anything signifies a conscious decision to join a group or organization with the potential for personal growth and fulfillment.","prompt":"enlist"},
  {"paragraphs":["Imagine you have a brand-new toy, but your friend wants to play with it too. How do you feel about sharing? Sometimes, it's easy to want something all to yourself, but it's also important to consider the feelings of others. When we discuss things with others and listen to their perspectives, we can often find a solution that works for everyone. Sometimes, sharing means making a compromise or finding a different way to enjoy the toy together. It's important to remember that discussions can lead to better understanding and happier outcomes.","When we discuss things openly and honestly, we can learn from different viewpoints. Every person has their own unique experiences and ideas, which can enrich our own understanding of a situation. By listening carefully and engaging in respectful conversations, we can gather valuable information and make better decisions. It's important to create a safe and comfortable space where everyone feels comfortable sharing their thoughts and feelings.","Discussions are valuable tools that can help us solve problems, make new friends, and build strong relationships. When we learn how to discuss things effectively, we can overcome challenges, find creative solutions, and foster positive connections with others. By encouraging open communication and respectful conversations, we can create a more inclusive and joyful environment for everyone."],"summary":"Discussions are crucial for sharing perspectives, understanding different viewpoints, and finding collaborative solutions to various situations.","prompt":"discuss"},
  {"paragraphs":["A sturdy structure is built to withstand the toughest challenges. Imagine a towering skyscraper that can shake and tremble in an earthquake, but still remain standing tall. That's because it was built with strong materials and meticulous engineering, making it sturdy enough to overcome any obstacle. Strength and stability are key to building something sturdy.","Sturdy things are often made from materials that can resist breaking or bending. For example, steel is a commonly used material for sturdy furniture because it is strong and can hold weight without breaking. Similarly, reinforced concrete is often used for sturdy buildings because it can withstand extreme temperatures and withstand the weight of the people and objects inside.","A sturdy object is one that can endure wear and tear over time. A sturdy toy car will be able to handle rough play and still be fun to drive. A sturdy chair will hold its shape and provide comfortable support for many years to come. By choosing sturdy items, we can ensure that they will last longer and provide more value for our money."],"summary":"Sturdiness is about having strength, stability, and the ability to withstand challenges and remain functional over time.","prompt":"sturdy"},
  {"paragraphs":["In the realm of human history, countless individuals have stood as discoverers, etching their names into the pages of progress. From the ancient Egyptians who unraveled the secrets of writing to the explorers who charted new lands, their curiosity and determination led them to remarkable breakthroughs. The spirit of discovery is a timeless flame that has driven humanity towards innovation and enlightenment.","Leonardo da Vinci, a true renaissance man, embodied the spirit of a discoverer. His insatiable curiosity and vast knowledge spanned various fields, from art and engineering to science and anatomy. His meticulous observations, innovative experiments, and groundbreaking inventions revealed hidden possibilities and transformed the world of art and science.","Modern-day discoverers continue to push the boundaries of knowledge. Scientists like Marie Curie, who discovered radium and polonium, and Jane Goodall, who revolutionized our understanding of chimpanzees, have made significant contributions to scientific understanding. Their relentless pursuit of knowledge has led to groundbreaking discoveries that have improved human lives and expanded our knowledge of the natural world."],"summary":"Throughout history, discoverers have made invaluable contributions to human progress through their curiosity, determination, and groundbreaking discoveries.","prompt":"discoverer"},
  {"paragraphs":["A convoy is a group of vehicles traveling together for safety or efficiency. Often, these vehicles carry important goods, people, or supplies. Convoys can be seen on highways, on construction sites, or even in military operations. The vehicles in a convoy travel in close formation, with drivers staying alert and aware of their surroundings. This formation helps to protect the vehicles from hazards on the road and ensures the safe and efficient transport of their cargo.","Convoys are commonly used for transporting valuable or sensitive goods. Companies that transport goods like electronics, precious metals, or medical supplies often use convoys. This is because the increased security and protection offered by the group reduces the risk of theft or damage during transport. The vehicles in a convoy can also share fuel and maintenance costs, making it more economical for companies to transport goods.","Convoys are not only used for commercial purposes. They are also used for military operations and disaster relief efforts. In military operations, convoys transport soldiers, equipment, and supplies to different locations. In disaster relief efforts, convoys deliver essential supplies like food, water, and medical aid to affected areas."],"summary":"Convoys are groups of vehicles traveling together to enhance security, efficiency, and cost-effectiveness in transportation.","prompt":"convoy"},
  {"paragraphs":["Respect is an important part of having healthy relationships. When we regard others, we value their opinions and feelings, and we treat them with kindness and consideration. Respectful behavior creates a positive and supportive environment where everyone can feel comfortable and valued.","Regard is not just about saying or doing kind things. It also involves listening attentively to others, understanding their perspectives, and considering their needs. When we take the time to truly regard others, we learn from them and build strong and lasting relationships.","Respectful relationships are essential for personal growth and success. By learning to regard others, we develop empathy, communication skills, and the ability to work effectively in teams. This respect will stay with us throughout our lives and help us to build meaningful connections with people from all walks of life."],"summary":"Respect is crucial for building healthy relationships by fostering positive connections and value-driven interactions.","prompt":"regard"},
  {"paragraphs":["Residential areas are the neighborhoods where people live and raise their families. They are usually filled with houses, apartments, or other types of housing. Residents of residential areas often have access to amenities such as parks, schools, and shopping centers. These areas provide a sense of community and safety for residents.","Residential neighborhoods are designed to meet the basic needs of their inhabitants. They typically have well-maintained streets, reliable utilities, and adequate parking spaces. Many residential areas also have community spaces such as swimming pools, tennis courts, and playgrounds. These features contribute to a sense of belonging and foster social interaction among residents.","The importance of residential areas cannot be understated. They provide a place for people to call home and establish their lives. The amenities and sense of community found in these neighborhoods contribute to residents' physical and emotional well-being. Residential areas are the foundation of a thriving community, where people can live, work, and socialize."],"summary":"Residential areas are neighborhoods designed to provide housing and a sense of community for residents.","prompt":"residential"},
  {"paragraphs":["A hall is a large, open space in a building that serves various purposes. It can be a place for gatherings, events, or simply a thoroughfare between different rooms. The high ceilings and spaciousness create a sense of grandeur and importance. Halls are often adorned with decorative elements such as paintings, sculptures, or architectural features that reflect the style and history of the building.","Halls can be found in different types of buildings, including schools, hospitals, office buildings, and hotels. In schools, halls are typically used for student gatherings, assemblies, or as a common space for socializing. In hospitals, halls are used to move patients between different departments or rooms. In office buildings, halls serve as connecting points between different floors and departments.","Halls play an important role in creating a welcoming and functional environment in buildings. They provide a space for people to gather, socialize, and move around easily. The design and layout of halls can significantly impact the overall atmosphere and functionality of a building."],"summary":"Halls are large, open spaces in buildings that serve multiple purposes, enhancing the functionality and aesthetic appeal of the surrounding environment.","prompt":"hall"},
  {"paragraphs":["Achievement is a journey, not a destination. It's about the process of learning, growing, and overcoming challenges. True achievement comes from putting in the effort, even when things get tough. Every small step you take, every new skill you learn, is a step towards success. Remember, the journey itself is filled with valuable lessons and experiences that will help you achieve your goals in the future.","Achieving something meaningful requires hard work, dedication, and a positive attitude. To reach your potential, you must be willing to push yourself beyond your comfort zone and embrace new challenges. Surround yourself with supportive friends and family who believe in you and encourage you to keep going. Remember, every achievement, no matter how big or small, is a testament to your determination and resilience.","The greatest achievements are often the ones that are most personal. They are the ones that you accomplish with your own hands and your own heart. These achievements will stay with you forever and will give you a sense of pride and accomplishment that is unmatched. So, set your goals, work hard, and celebrate your progress along the way."],"summary":"Achievement is about the journey of learning, overcoming challenges, and celebrating personal growth.","prompt":"achievement"},
  {"paragraphs":["Exploring new places brings joy and knowledge. When we sightsee, our eyes capture the beauty of our surroundings. From towering skyscrapers to bustling city streets, each place offers unique sights and sounds that broaden our horizons. The sights we see inspire us, reminding us of the wonders of the world.","Sightseeing isn't just about looking at things. It's about experiencing the atmosphere. The sights, sounds, and smells of a place combine to create a unique and unforgettable experience. We can feel the warmth of the sun on our skin, hear the waves crashing on the shore, and smell the fresh scent of blooming flowers. These sensory experiences enrich our lives and create lasting memories.","The joy of sightseeing extends beyond just the physical sights. It's about connecting with the history, culture, and people of a place. By visiting historical landmarks and cultural centers, we learn about the rich heritage and diverse perspectives of different communities. This understanding and appreciation make our travels truly enriching."],"summary":"Sightseeing is an exciting adventure that offers beauty, sensory experiences, and cultural insights.","prompt":"sightseeing"},
  {"paragraphs":["The word 'midway' holds a special significance, indicating a point exactly in the middle of a journey or process. It is a pivotal moment when half of the trip is already behind us. This term is often used to describe situations where a clear decision or change is required to reach the final destination. Whether it's navigating through physical landscapes or tackling academic challenges, reaching the halfway point often brings a sense of accomplishment and renewed determination.","Midway through life, we encounter countless crossroads. Some are exhilarating, offering the promise of new experiences and growth. Others may be daunting, demanding adjustments to our plans or values. It is during these pivotal moments that we learn the importance of adaptability and the flexibility of our goals. Reflecting on our progress halfway through helps us assess our strengths, weaknesses, and the areas where we can improve.","The concept of 'midway' extends beyond physical journeys. It can also symbolize emotional or intellectual growth. Reaching the halfway point of our personal development often brings a realization of the vastness of our potential. It is a reminder that there is still much to learn and grow, motivating us to push forward with renewed enthusiasm and determination."],"summary":"The term 'midway' emphasizes the pivotal moment when half of a journey or process has been completed, highlighting the importance of adaptability, determination, and reflection during such crucial points.","prompt":"midway"},
  {"paragraphs":["The word 'canny' describes something that feels both familiar and strange at the same time. It's like encountering a friendly face that looks just a little different from the ones we know. This uncanny feeling often arises in situations where technology or human behavior mimics human qualities, leading to a sense of unease or mystery.","A prime example of the uncanny is a robot that can convincingly mimic human movements and speech. While its physical appearance might differ from a human's, the robot's actions and responses can be so realistic that it creates an unsettlingly familiar experience. This mimicry can trigger emotions like trust and comfort, yet simultaneously expose the underlying mechanical nature of the robot, generating a sense of unease.","The uncanny is not limited to technological advancements. Human behavior can also trigger this feeling. When someone's actions or words are slightly off or unnatural, it can disrupt our sense of familiarity and create a sense of discomfort or suspicion. This is why certain social interactions or encounters with certain characters in fiction often evoke an uncanny feeling."],"summary":"The uncanny arises from the unsettling combination of familiarity and strangeness, often occurring when technology or human behavior mimics human qualities.","prompt":"canny"},
  {"paragraphs":["Prey are animals that depend on other animals for food. These hunters rely on their keen senses and physical abilities to track, capture, and consume their prey. Some predators have specialized adaptations like sharp teeth, claws, and stealthy movements that help them become successful hunters. Different types of prey have unique vulnerabilities that their predators exploit. For example, birds with soft feathers are vulnerable to birds of prey with strong beaks and talons.","Predators often display impressive teamwork and collaboration when hunting. They may work together to surround and capture their prey. Animals like lions and wolves rely on their pack mentality to bring down large prey. Smaller predators may team up to attack larger prey that they would be unable to defeat alone. This teamwork ensures the success of these predators in the wild.","The relationship between prey and predators is crucial for maintaining ecological balance. Predators keep prey populations in check, preventing overpopulation and potential ecological damage. In turn, prey populations are limited by their predators, ensuring that the ecosystem remains in equilibrium. This delicate balance is vital for the survival of many species."],"summary":"Prey rely on their specialized abilities and teamwork to capture and consume other animals, maintaining ecological balance through predator-prey relationships.","prompt":"prey"},
  {"paragraphs":["The word 'literally' is an interesting and versatile adverb that can add emphasis and clarity to our speech. It's often used to emphasize that something is actually happening, or to make a comparison that is so close to reality that it feels like it's happening in the present. For example, when we say 'I am literally dying of laughter,' we mean that we are actually dying from laughter, even though that's physically impossible. This exaggeration highlights the immense joy we are experiencing.","The literal meaning of a word refers to its direct or straightforward definition. When we use 'literally' correctly, we are adding emphasis to the literal meaning of a word or phrase. This helps to avoid confusion and ensure that our communication is clear and effective. However, it's important to note that 'literally' should only be used when it truly reflects the actual event or action being described.","The next time you come across the word 'literally,' take a moment to appreciate its nuanced meaning. It can be a powerful tool for adding emphasis and clarity to our speech, as long as it is used appropriately and in accordance with its literal definition."],"summary":"The essay explores the significance of the adverb 'literally,' emphasizing its ability to emphasize literal meaning and create vivid imagery.","prompt":"literally"},
  {"paragraphs":["Pineapples are tropical fruits that grow tall and juicy stems. They have rough brown skin and a sweet, tangy flesh inside. Pineapples are native to South America but are now grown in many warm places around the world. They are known for their delicious taste and healthy benefits.","Pineapples are packed with vitamins and minerals. They are a rich source of vitamin C, which helps strengthen the immune system. They also contain antioxidants that can protect the body from damage caused by free radicals. Additionally, pineapples are a good source of fiber, which can help digestion and keep the digestive system healthy.","Pineapples are versatile fruits that can be enjoyed in many different ways. They can be eaten fresh, juiced, or used in various dishes. They can also be dried or canned for later. Pineapples are a delicious and nutritious treat that can be enjoyed by people of all ages."],"summary":"Pineapples are tropical fruits known for their sweet taste, health benefits, and versatility.","prompt":"pineapple"},
  {"paragraphs":["An abrasive substance is one that causes damage to another surface through friction or wear. Sandpaper, for example, is commonly used for smoothing out rough surfaces or removing paint. The grit in sandpaper is abrasive, as it scratches away the material being worked on. The harder the sandpaper, the more abrasive it is. Abrasive substances can also be found in nature, such as volcanic ash or river sediment. These materials can damage metal surfaces or erode rocks over time.","Abrasiveness can be intentional or unintentional. When we intentionally use abrasive substances like toothpaste or cleaning products, we are removing dirt and grime. But sometimes, abrasiveness can be unintentional. For example, when metal objects are left together for too long, they can scratch or corrode each other. This is an abrasive process that can cause damage over time.","The effectiveness of an abrasive substance depends on its composition and the material being worked on. Some abrasive materials are better suited for certain surfaces than others. For example, a soft sponge may be effective for cleaning glass, while a steel wool pad may be necessary for removing rust from metal. Choosing the right abrasive substance can ensure that the desired result is achieved without causing unnecessary damage."],"summary":"Abrasive substances cause damage to other surfaces through friction or wear, intentionally or unintentionally, depending on their composition and the material being worked on.","prompt":"abrasive"},
  {"paragraphs":["Hats play a crucial role in protecting individuals from the elements, offering warmth in chilly weather and shielding from harsh sun and rain. Different types of hats serve specific purposes, such as baseball caps for casual wear, ski masks for winter sports, and rain hats to keep heads dry. The right hat can not only protect but also express personal style and identity.","Hats have become fashion statements, with people often choosing hats that complement their outfits and reflect their unique personalities. From stylish fedoras to classic bowlers, there is a wide variety of hats available to suit various tastes and occasions. The selection of hats has grown significantly in recent years, offering individuals a chance to express their individuality through their headwear.","Hats hold cultural significance in many societies, with certain hats being associated with specific traditions or communities. For example, Native American tribes often wear traditional hats made from materials like buckskin or feathers, while in some Asian cultures, hats like the samurai helmet or the conical hat are considered cultural icons."],"summary":"Hats serve multiple purposes, ranging from practical protection to fashion statements and cultural symbols.","prompt":"hat"},
  {"paragraphs":["Egalitarianism is about treating everyone equally, regardless of their background, abilities, or circumstances. It's about creating a society where everyone has the same opportunities to succeed and live happy lives. In an egalitarian society, power and wealth are distributed fairly. Everyone has a say in how the community is run, and everyone has access to the same basic needs, like healthcare and education.","Egalitarianism also means that everyone should have an equal chance to participate in society. This includes having equal access to jobs, housing, and political power. It means that everyone should be treated with respect and dignity, regardless of their differences. In an egalitarian society, people are judged on their abilities and character, not on their background or wealth.","Egalitarianism is an important value because it helps to create a just and fair society. When everyone is treated equally, everyone has the chance to reach their full potential. A truly egalitarian society is one where everyone has the opportunity to live a fulfilling life, regardless of their circumstances."],"summary":"Egalitarianism promotes a just and fair society by advocating for equal opportunities and treatment for all individuals.","prompt":"egalitarian"},
  {"paragraphs":["Interest is a powerful force that drives us to explore new things and discover our passions. It sparks curiosity and motivates us to delve deeper into subjects that capture our attention. When we are interested in something, our minds become engaged and we are eager to learn more. This curiosity often leads to remarkable discoveries and personal growth.","Interest can be sparked by various factors. Our surroundings, experiences, and the people we interact with can all play a role in fostering our interests. Some interests emerge from a natural affinity for certain activities, while others are fueled by exposure to new ideas or challenges. The key is to identify what sparks our curiosity and pursue it with determination.","Interest is not limited to academic subjects or hobbies. It can extend to social causes, community involvement, and even careers. When we are genuinely interested in something, we are more likely to invest time and energy into it. This dedication can lead to fulfilling experiences and meaningful contributions to society."],"summary":"Interest is a fundamental driver of exploration, discovery, and personal growth, influencing both our academic pursuits and wider lives.","prompt":"interested"},
  {"paragraphs":["In the delicate dance of life, some creatures are more susceptible to harm than others. Animals like butterflies, with their fragile wings and soft bodies, flutter around the meadows, easily swayed by the slightest breeze. Their vulnerability makes them more likely to be preyed upon or affected by environmental changes. Their susceptibility highlights the importance of careful protection for vulnerable populations in the natural world.","Humans, too, are susceptible to various challenges throughout their lives. Some are genetically predisposed to certain illnesses or physical weaknesses, making them more likely to experience health complications. Others may find themselves in vulnerable situations, such as poverty or lack of access to healthcare, which can significantly reduce their ability to cope with adversity. Recognizing human susceptibility is crucial for implementing measures to support those in need.","Susceptibility is not limited to physical attributes or external circumstances. Emotional vulnerability can also leave individuals susceptible to distress. People who have experienced trauma or loss may find themselves more susceptible to anxiety, depression, or other mental health challenges. This susceptibility highlights the need for empathy and support systems to help people overcome their struggles and build resilience."],"summary":"Susceptibility reveals the inherent fragility and vulnerability of living things, emphasizing the importance of careful protection and support for those who are easily affected by their surroundings, health conditions, or emotional states.","prompt":"susceptible"},
  {"paragraphs":["The word 'has' is a powerful little word that shows ownership and possession. It connects people to their belongings, like toys, books, or even pets. 'Has' is often used in sentences to describe things that belong to someone, like 'My mom has a beautiful garden.' It tells us that someone has something and that it is theirs.","The word 'has' can also be used to describe things that belong to groups. For example, 'Our class has a new teacher this year.' In this sentence, 'has' shows that the class collectively has a new teacher. It is a way of sharing ownership among a group.","The word 'has' is important because it helps us understand who owns what and what belongs to whom. It is a simple but effective way to communicate possession and ownership in sentences."],"summary":"The word 'has' is a versatile word that demonstrates ownership and possession in both individual and group contexts.","prompt":"has"},
  {"paragraphs":["Benefits are all the good things that come from doing something. For example, when you study, you learn new things and improve your brain. Studying also helps you get good grades, which can open up lots of opportunities in your future. So, studying is a benefit that can lead to many other great things.","Another benefit is having a healthy diet. Eating fruits and vegetables gives your body the vitamins and minerals it needs to stay strong and healthy. A healthy diet can also help you avoid getting sick. A healthy body is a happy body, and a happy body can enjoy all the benefits of life.","Benefits can be big or small, but they're all important. Sometimes, the benefits are immediate, like getting a delicious treat after finishing your homework. Other times, the benefits take time, like becoming an expert in a subject. No matter the size or time frame, benefits are always worth pursuing."],"summary":"Benefits are the positive outcomes that result from actions or choices, offering advantages in various aspects of life.","prompt":"benefit"},
  {"paragraphs":["Culmination is a magical moment when all the hard work, practice, and dedication finally pay off. It's the climax of a journey, a culmination of all that has been learned and achieved. Every individual has their own unique culmination experiences, from completing a challenging school project to crossing a finish line in a race. The anticipation and excitement leading up to the culmination are palpable. The culmination itself is a breathtaking achievement, a moment of immense pride and satisfaction.","Culmination is often associated with completing a major life goal. For some, it might be earning a degree or getting a promotion. For others, it could be finishing a personal project like writing a book or building a house. Every accomplishment, no matter how big or small, is a culmination of dedicated effort and perseverance. The journey towards culmination is just as important as the culmination itself. The lessons learned and the challenges overcome along the way contribute to the final achievement.","Culmination is not just about completing a specific goal. It's about personal growth and development. Each culmination is a testament to the individual's determination, resilience, and ability to overcome obstacles. The culmination of our efforts is what makes life meaningful. It's the sum of all our experiences, accomplishments, and lessons learned that defines who we are and where we are going in life."],"summary":"Culmination is the culmination of all the hard work, dedication, and perseverance towards completing a major life goal or personal accomplishment.","prompt":"culmination"},
  {"paragraphs":["There's a magical quality to steadily moving forward, like a determined little caterpillar inching towards a juicy leaf. It's the patient climb up a mountain, the calm and collected journey across an ocean. Steady doesn't mean fast or hurried; it means taking small steps and maintaining focus, even when faced with challenges. A steady pace can lead to incredible achievements, like completing a daunting project or reaching a long-held goal.","Sometimes, the fastest way to reach our destination is to take things slowly. When we rush, we often make mistakes or miss important details. By steadily focusing on the task at hand, we can ensure that we complete it with precision and care. This approach allows us to learn new skills, solve problems efficiently, and achieve lasting results.","The beauty of steadily moving forward is that it teaches us valuable life lessons. It shows us that great things take time, that perseverance is key, and that small consistent efforts can lead to remarkable outcomes. By embracing a steady pace, we learn to appreciate the journey just as much as the destination."],"summary":"Steadily moving forward, with focus and consistency, leads to remarkable achievements and valuable life lessons.","prompt":"steadily"},
  {"paragraphs":["Assignments are important learning tools that help students grow academically. When given an assignment, students are challenged to apply their knowledge and skills to solve a problem or complete a task. This process helps them to reinforce what they have learned and to develop new skills. Additionally, assignments provide students with valuable feedback on their progress, allowing them to identify areas where they need to improve.","Assignments can take many different forms, such as written reports, presentations, or artistic projects. Each type of assignment is designed to assess different skills and knowledge. For example, writing assignments assess students' ability to communicate effectively, while art projects assess their creativity and technical skills. By completing different assignments, students can demonstrate their understanding of various concepts and showcase their talents.","Assignments are an essential part of the learning process. They provide students with opportunities to apply their knowledge, develop new skills, and receive feedback on their progress. By completing assignments, students can demonstrate their understanding of concepts, showcase their talents, and track their growth throughout their academic journey."],"summary":"Assignments play a crucial role in student learning by challenging them to apply knowledge, develop skills, and receive feedback.","prompt":"assignment"},
  {"paragraphs":["Cheerleading isn't just about loud cheers and energetic movements. It's about teamwork, encouragement, and supporting others. Cheerleaders work together to create a positive and exciting atmosphere at games and performances. They lift the spirits of their team and inspire them to play their best. Their cheers and support can make a real difference in the outcome of a game or competition.","Cheerleading requires physical fitness, coordination, and creativity. Cheerleaders practice hard to master their routines, which often involve complex stunts and acrobatics. They must also be able to synchronize their movements and perform together as a team. Their creativity is evident in the costumes, cheers, and routines they design.","Cheerleading is more than just a extracurricular activity. It teaches valuable lessons about teamwork, leadership, and communication. Cheerleaders learn to work together to achieve a common goal, support their team, and express themselves creatively. These skills are transferable to other aspects of life and can help individuals excel in various situations."],"summary":"Cheerleading is an activity that combines physical fitness, teamwork, and creativity to create a positive and supportive atmosphere for athletes and audiences.","prompt":"cheerleader"},
  {"paragraphs":["A warm breeze rustles through the leaves of a towering oak, carrying with it the sweet scent of honeysuckle. The sun paints the sky in hues of orange and pink, casting a pleasant glow over the world. Birds chirp merrily, filling the air with a melody that brings a smile to my face. Such moments, where everything feels peaceful and enjoyable, are truly pleasurable.","Pleasure can be found in the simplest of things. A juicy slice of watermelon on a hot summer day, the refreshing spray of water on a tired face, or the comforting warmth of a blanket on a chilly evening. These small pleasures add up to create a sense of joy and contentment that makes life worth living.","Pleasure is not just about material things or exciting adventures. It can also be found in spending time with loved ones, sharing stories and laughter, or simply taking a moment to appreciate the beauty of the natural world. True pleasure lies in the genuine connection we make with ourselves, others, and our surroundings."],"summary":"Pleasure is found in both grand experiences and simple moments of joy and contentment.","prompt":"pleasurable"},
];

export   const buildSpellingQuestion = (chosen) => chooseFromList(englishVocabulary, chosen);

export   const buildCopyingQuestion = (chosen) => chooseFromList(englishCopying, chosen);

export   const buildPromptWord = (chosen) => chooseFromList(englishPrompts, chosen);

export   const buildEmotivePromptWord = (chosen) => chooseFromList(emotivePrompts, chosen);

export   const buildThirdGradePromptWord = (chosen) => chooseFromList(thirdGradePrompts, chosen);

export   const buildFourthGradePromptWord = (chosen) => chooseFromList(gradeWords.grade4, chosen);

export   const pickKoreanWord = () =>
     chooseFromList(
         ["많이", "이후", "다시",
          "항상", "동물", "다른",
          "묻다", "멀리", "뒤로",
          "때문에", "전에", "전에",
          "사이", "혼합", "보트",
          { value: "오빠", weight: 5 * 2 },
          "사다", "전화",
          "깨끗하다", "시계", "춥다",
          "깊은", "사슴", "접시",
          "드레스", "드립", "드라이브",
          "각", "여덟", "일레븐",
          "모든", "가족", "빠른",
          "싸움", "먼저", "발견",
          "주다", "염소", "간다",
          "성장", "행복", 
          { value: "도움", weight: 5 * 2 },
          "그",
          { value: "집", weight: 5 / 2 },
          "그냥", "친절", "키스",
          "선", "사자", "목록",
          "길게", "봐", "크게",
          "엉망", "아마도", "대부분",
          "새로운", "밤", "나인",
          "만", "또는", "우리의",
          "장소", "플러스", "수영장",
          "읽다", "쉬다", "오른쪽",
          "말하다", "바다", "두 번째",
          { value: "일곱", weight: 5 * 2 },
          "모양", "시력",
          "자매", "미끄러지다", "미끄러지다",
          "노래", "곧", "소리",
          "여전히", "돌", "그런",
          "말하다", "그들의", "그들",
          "것", "생각", "톤",
          "치료", "속임수", "조율",
          "에", "우리", "사용",
          "잘", "갔다", "어디로",
          "왜", "겨울", "소원",
          "쓰다", "마당", "연도",
          "공기", "또한", "거기",
          "아무거나", "주위", "너무",
          "헛간", "목욕탕", "12",
          "최고", "더 나은", "매우",
          "둘 다", "밝다", "어떤",
          "할 수 없다", "아이", "일하다",
          "할 수 있다", "계산하다", "아직",
          "한다", "하지 않는다", "이것",
          "드롭", "드럼", "트레이",
          "종료", "짝수", "아래",
          "먹이", "먹이", "씻다",
          "친구", "주었어요", "누가",
          "좋다", "좋다", "~할 것이다",
          "여기", "높은", "너의",
          "그것", "점프", "보인다",
          "큰", "가벼운", "어리석은",
          "조금", "자물쇠", "간식",
          "점심", "만든", "도장",
          "많이", "반드시", "여름",
          "지금", "끄기", "보내기",
          "밖으로", "경로", "노래",
          "넣다", "토끼", "속도",
          "바위", "말했다", "상태",
          { value: "가져가다", weight: 5 * 2 },
          "가져오다", "가져가다",
          "갔다", "길", "여행",
          "집", "작은", "지붕",
          "빨대", "비", "시원하다",
          "행성", "하늘", "밤",
          "돈", "날개", "새",
          "부리", "닫기", "휴식",
          "저것", "접시", "코",
          "포도", "상", "슬픈"],
       ["lot", "after", "again",
        "always", "animal", "another",
        "ask", "away", "back",
        "because", "been", "before",
        "between", "blend", "boat",
        "brother", "buy", "call",
        "clean", "clock", "cold",
        "deep", "deer", "dish",
        "dress", "drip", "drive",
        "each", "eight", "eleven",
        "every", "family", "fast",
        "fight", "first", "found",
        "give", "goat", "goes",
        "grow", "happy", "help",
        "him", "home", "house",
        "just", "kind", "kiss",
        "line", "lion", "list",
        "long", "look", "loud",
        "mess", "might", "most",
        "new", "night", "nine",
        "only", "or", "our",
        "place", "plus", "pool",
        "read", "rest", "right",
        "says", "sea", "second",
        "seven", "shape", "sight",
        "sister", "slide", "slip",
        "song", "soon", "sound",
        "still", "stone", "such",
        "tell", "their", "them",
        "thing", "think", "ton",
        "treat", "trick", "tune",
        "upon", "us", "use",
        "well", "went", "where",
        "why", "winter", "wish",
        "write", "yard", "year",
        "air", "also", "there",
        "any", "around", "too",
        "barn", "bath", "twelve",
        "best", "better", "very",
        "both", "bright", "which",
        "cannot", "child", "work",
        "could", "count", "yet",
        "does", "don’t", "these",
        "drop", "drum", "tray",
        "end", "even", "under",
        "fed", "feed", "wash",
        "friend", "gave", "who",
        "good", "great", "would",
        "here", "high", "your",
        "its", "jump", "seem",
        "large", "light", "silly",
        "little", "lock", "snack",
        "lunch", "made", "stamp",
        "much", "must", "summer",
        "now", "off", "send",
        "out", "path", "sing",
        "put", "rabbit", "speed",
        "rock", "said", "state",
        "take", "bring", "away",
        "went", "road", "trip",
        "house", "little", "roof",
        "straw", "rain", "cool",
        "planet", "sky", "night",
        "money", "wings", "birds",
        "beak", "close", "rest",
        "those", "plate", "nose",
        "grapes", "prize", "sad"], chosen);

export   const pickKoreanVerb = () =>
     choose([
       { value: '가다', english: 'To go', weight: 5 },
       { value: '가르치다', english: 'To teach', weight: 5 },
       { value: '가지다', english: 'To have', weight: 5 },
       { value: '갖다', english: 'To have', weight: 5 },
       { value: '거짓말하다', english: 'To lie', weight: 5 },
       { value: '걱정하다', english: 'To worry', weight: 5 },
       { value: '걷다', english: 'To walk', weight: 5 },
       { value: '걸다', english: 'To call, dial', weight: 5 },
       { value: '결혼하다', english: 'To marry', weight: 5 },
       { value: '고백하다', english: 'To confess', weight: 5 },
       { value: '공부하다', english: 'To study', weight: 5 },
       { value: '굽다', english: 'To roast, grill, bake', weight: 5 },
       { value: '기다리다', english: 'To wait', weight: 5 },
       { value: '기억하다', english: 'To remember', weight: 5 },
       { value: '꿈꾸다', english: 'To dream', weight: 5 },
       { value: '끓이다', english: 'To boil', weight: 5 },
       { value: '끝나다', english: 'To finish', weight: 5 },
       { value: '나가다', english: 'To exit', weight: 5 },
       { value: '내다', english: 'To pay', weight: 5 },
       { value: '닫다', english: 'To close', weight: 5 },
       { value: '대답하다', english: 'To answer', weight: 5 },
       { value: '도와주다', english: 'To help', weight: 5 },
       { value: '도착하다', english: 'To arrive', weight: 5 },
       { value: '듣다', english: ' To hear', weight: 5 },
       { value: '들어오다', english: 'To enter', weight: 5 },
       { value: '마시다', english: 'To drink', weight: 5 },
       { value: '만나다', english: 'To meet', weight: 5 },
       { value: '만들다', english: 'To make', weight: 5 },
       { value: '말하다', english: 'To talk, speak', weight: 5 },
       { value: '먹다', english: 'To eat', weight: 5 },
       { value: '모르다', english: 'To not know', weight: 5 },
       { value: '묻다', english: 'To ask', weight: 5 },
       { value: '물어보다', english: 'To ask', weight: 5 },
       { value: '배우다', english: 'To learn', weight: 5 },
       { value: '벗다', english: 'To undress, take off clothes', weight: 5 },
       { value: '보내다', english: 'To send', weight: 5 },
       { value: '보다', english: 'To see', weight: 5 },
       { value: '볶다', english: 'To fry', weight: 5 },
       { value: '빌리다', english: 'To borrow, lend', weight: 5 },
       { value: '사다', english: 'To buy', weight: 5 },
       { value: '사랑에 빠지다', english: 'To fall in love', weight: 5 },
       { value: '사랑하다', english: 'To love', weight: 5 },
       { value: '사용하다', english: 'To use', weight: 5 },
       { value: '살다', english: 'To live', weight: 5 },
       { value: '생각하다', english: 'To think', weight: 5 },
       { value: '서두르다', english: 'To hurry, rush', weight: 5 },
       { value: '섞다', english: 'To mix, blend', weight: 5 },
       { value: '소개하다', english: 'To introduce', weight: 5 },
       { value: '쉬다', english: 'To rest', weight: 5 },
       { value: '시작하다', english: 'To start', weight: 5 },
       { value: '신다', english: ' to wear (shoes, socks, footwear)', weight: 5 },
       { value: '싫어하다', english: 'To hate, dislike', weight: 5 },
       { value: '싸우다', english: 'To fight', weight: 5 },
       { value: '썰다', english: ' To chop, slice', weight: 5 },
       { value: '쓰다', english: 'To write', weight: 5 },
       { value: '쓰다', english: 'To wear (hat, eyewear)', weight: 5 },
       { value: '씻다', english: 'To wash', weight: 5 },
       { value: '앉다', english: 'To sit', weight: 5 },
       { value: '알다', english: 'To know', weight: 5 },
       { value: '약속하다', english: 'To promise', weight: 5 },
       { value: '없다', english: 'To not have', weight: 5 },
       { value: '연습하다', english: 'To practice', weight: 5 },
       { value: '열다', english: 'To open', weight: 5 },
       { value: '오다', english: 'To come', weight: 5 },
       { value: '요리하다', english: 'To cook', weight: 5 },
       { value: '운동하다', english: 'To exercise', weight: 5 },
       { value: '운전하다', english: 'To drive', weight: 5 },
       { value: '울다', english: 'To cry', weight: 5 },
       { value: '웃다', english: 'To laugh', weight: 5 },
       { value: '이기다', english: 'To win, defeat', weight: 5 },
       { value: '이야기하다', english: ' To talk, chat', weight: 5 },
       { value: '일어나다', english: 'To get up', weight: 5 },
       { value: '일하다', english: 'To work', weight: 5 },
       { value: '읽다', english: 'To read', weight: 5 },
       { value: '입다', english: 'To wear', weight: 5 },
       { value: '있다', english: 'To have', weight: 5 },
       { value: '자다', english: 'To sleep', weight: 5 },
       { value: '재다', english: 'To measure, weigh', weight: 5 },
       { value: '전화하다', english: 'To telephone', weight: 5 },
       { value: '좋아하다', english: 'To like', weight: 5 },
       { value: '죄송하다', english: 'To be sorry', weight: 5 },
       { value: '주다', english: ' To give', weight: 5 },
       { value: '주문하다', english: 'To order', weight: 5 },
       { value: '죽다', english: 'To die', weight: 5 },
       { value: '준비하다', english: 'To prepare', weight: 5 },
       { value: '지다', english: 'To lose, be defeated', weight: 5 },
       { value: '찌다', english: 'To steam', weight: 5 },
       { value: '찍다', english: 'To take (picture)', weight: 5 },
       { value: '찾다', english: 'To find,To look for', weight: 5 },
       { value: '청소하다', english: 'To clean', weight: 5 },
       { value: '축하하다', english: 'To congratulate', weight: 5 },
       { value: '출발하다', english: 'To depart', weight: 5 },
       { value: '춤추다', english: 'To dance', weight: 5 },
       { value: '타다', english: 'To ride', weight: 5 },
       { value: '태어나다', english: 'To be born', weight: 5 },
       { value: '튀기다', english: 'To deep fry', weight: 5 },
       { value: '팔다', english: 'To sell', weight: 5 },
       { value: '필요하다', english: 'To need', weight: 5 },
       { value: '하다', english: 'To do', weight: 5 },
       { value: '휘젓다', english: 'To stir', weight: 5 },
     ]);

const hanja8 = [
  ['校','학교','교'],
  ['敎','가르칠','교'],
  ['九','아홉','구'],
  ['國','나라','국'],
  ['軍','군사','군'],
  ['金','쇠','금','성','김'],
  ['南','남녘','남'],
  ['女','여자','녀'],
  ['年','해','년'],
  ['大','큰','대'],
  ['東','동녘','동'],
  ['六','여섯','륙'],
  ['萬','일만','만'],
  ['母','어머니','모'],
  ['木','나무','목','門','문','문'],
  ['民','백성','민'],
  ['白','흰','백'],
  ['父','아버지','부'],
  ['北','북녘','북','달아날','배'],
  ['四','넉','사'],
  ['山','메','산'],
  ['三','석','삼'],
  ['生','날','생'],
  ['西','서녘','서'],
  ['先','먼저','선'],
  ['小','작을','소'],
  ['水','물','수'],
  ['室','집','실'],
  ['十','열','십'],
  ['五','다섯','오'],
  ['王','임금','왕'],
  ['外','바깥','외'],
  ['月','달','월'],
  ['二','두','이'],
  ['人','사람','인'],
  ['一','한','일'],
  ['日','날','일'],
  ['長','긴','장'],
  ['弟','아우','제'],
  ['中','가운데','중'],
  ['靑','푸를','청'],
  ['寸','마디','촌'],
  ['七','일곱','칠'],
  ['土','흙','토'],
  ['八','여덟','팔'],
  ['學','배울','학'],
  ['韓','한국/나라','한'],
  ['兄','형','형'],
  ['火','불','화']
];

const hanja7 = [
  ['家','집','가'],
  ['間','사이','간'],
  ['江','강','강'],
  ['車','수레','거/차'],
  ['工','장인','공'],
  ['空','빌','공'],
  ['氣','기운','기'],
  ['記','기록할','기'],
  ['男','사내','남'],
  ['內','안','내'],
  ['農','농사','농'],
  ['答','대답','답'],
  ['道','길','도'],
  ['動','움직일','동'],
  ['力','힘','력'],
  ['立','설','립'],
  ['每','매양','매'],
  ['名','이름','명'],
  ['物','물건','물'],
  ['方','모','방'],
  ['不','아닐','불'],
  ['事','일','사'],
  ['上','윗','상'],
  ['姓','성','성'],
  ['世','인간','세'],
  ['手','손','수'],
  ['時','때','시'],
  ['市','저자','시'],
  ['食','밥/먹을','식'],
  ['安','편안','안'],
  ['午','낮','오'],
  ['右','오를/오른(쪽)','우'],
  ['子','아들','자'],
  ['自','스스로','자'],
  ['場','마당','장'],
  ['電','번개','전'],
  ['前','앞','전'],
  ['全','온전','전'],
  ['正','바를','정'],
  ['足','발','족'],
  ['左','왼','좌'],
  ['直','곧을','직'],
  ['平','평평할','평'],
  ['下','아래','하'],
  ['漢','한수/한나라','한'],
  ['海','바다','해'],
  ['話','말씀','화'],
  ['活','살','활'],
  ['孝','효도','효'],
  ['後','뒤','후']
];

const hanja6 = [
  ['各','각각','각'],
  ['角','뿔','각'],
  ['界','지경','계'],
  ['計','셀','계'],
  ['高','높을','고'],
  ['公','공평할','공'],
  ['共','한가지','공'],
  ['功','공','공'],
  ['果','실과','과'],
  ['科','과목','과'],
  ['光','빛','광'],
  ['球','공','구'],
  ['今','이제','금'],
  ['急','급할','급'],
  ['短','짧을','단'],
  ['堂','집','당'],
  ['代','대신할','대'],
  ['對','대할','대'],
  ['圖','그림','도'],
  ['讀','읽을','독','구절','두'],
  ['童','아이','동'],
  ['等','무리','등'],
  ['樂','즐길','락','노래','악','좋아할','요'],
  ['利','이할','리'],
  ['理','다스릴','리'],
  ['明','밝을','명'],
  ['聞','들을','문'],
  ['半','반','반'],
  ['反','돌이킬','돌아올','반'],
  ['班','나눌','반'],
  ['發','필','발'],
  ['放','놓을','방'],
  ['部','떼','부'],
  ['分','나눌','분'],
  ['社','모일','사'],
  ['書','글','서'],
  ['線','줄','선'],
  ['雪','눈','설'],
  ['成','이룰','성'],
  ['省','살필','성','덜','생'],
  ['消','사라질','소'],
  ['術','재주','술'],
  ['始','비로소','시'],
  ['身','몸','신'],
  ['神','귀신','신'],
  ['信','믿을','신'],
  ['新','새','신'],
  ['弱','약할','약'],
  ['藥','약','약'],
  ['業','업','업'],
  ['勇','날랠','용'],
  ['用','쓸','용'],
  ['運','옮길','운'],
  ['音','소리','음'],
  ['飮','마실','음'],
  ['意','뜻','의'],
  ['作','지을','작'],
  ['昨','어제','작'],
  ['才','재주','재'],
  ['戰','싸울','전'],
  ['庭','뜰','정'],
  ['第','차례','제'],
  ['題','제목','제'],
  ['注','부을','주'],
  ['集','모을','집'],
  ['窓','창','창'],
  ['淸','맑을','청'],
  ['體','몸','체'],
  ['表','겉','표'],
  ['風','바람','풍'],
  ['幸','다행','행'],
  ['現','나타날','현'],
  ['形','모양','형'],
  ['和','화할','화'],
  ['會','모일','회'],
];

const hanja = [
  { value: ['生', '날 생'] },
  { value: ['命', '목숨 명'] },
  { value: ['老', '늙을 로'] },
  { value: ['病', '병 병'] },
  { value: ['死', '죽을 사'] },
  { value: ['姓', '성씨 성'] },
  { value: ['名', '이름 명'] },
  { value: ['身', '몸 신'] },
  { value: ['體', '몸 체'] },
  { value: ['頭', '미리 두'] },
  { value: ['目', '눈 목'] },
  { value: ['口', '입 구'] },
  { value: ['面', '얼굴 면'] },
  { value: ['手', '손 수'] },
  { value: ['足', '발 족'] },
  { value: ['飲', '마실 음'] },
  { value: ['食', '먹을 식'] },
  { value: ['便', '똥오줌 변'] },
  { value: ['活', '살 활'] },
  { value: ['事', '일 사'] },
  { value: ['休', '쉴 휴'] },
  { value: ['心', '마음 심'] },
  { value: ['思', '생각 사'] },
  { value: ['感', '느낄 감'] },
  { value: ['性', '성품 성'] },
  { value: ['情', '뜻 정'] },
  { value: ['意', '뜻 의'] },
  { value: ['力', '힘 력'] },
  { value: ['便', '편할 편'] },
  { value: ['主', '주인 주'] },
  { value: ['社', '모일 사'] },
  { value: ['會', '모일 회'] },
  { value: ['家', '집 가'] },
];

export   const pickSubject = () => 
     choose([
       { value: "I", weight: 5 },
       { value: "you", weight: 5 },
       { value: "he", weight: 5 },
       { value: "she", weight: 5 },
       { value: "it", weight: 5 },
       { value: "we", weight: 5 },
       { value: "they", weight: 5 },
       { value: "me", weight: 5 },
       { value: "you", weight: 5 },
       { value: "him", weight: 5 },
       { value: "her", weight: 5 },
       { value: "it", weight: 5 },
       { value: "us", weight: 5 },
       { value: "them", weight: 5 },
       { value: "my", weight: 5 },
       { value: "your", weight: 5 },
       { value: "his", weight: 5 },
       { value: "her", weight: 5 },
       { value: "its", weight: 5 },
       { value: "our", weight: 5 },
       { value: "their", weight: 5 },
       { value: "mine", weight: 5 },
       { value: "yours", weight: 5 },
       { value: "his", weight: 5 },
       { value: "hers", weight: 5 },
       { value: "its", weight: 5 },
       { value: "ours", weight: 5 },
       { value: "theirs", weight: 5 },
       { value: "this", weight: 5 },
       { value: "that", weight: 5 },
       { value: "these", weight: 5 },
       { value: "those", weight: 5 },
       { value: "who", weight: 5 },
       { value: "whom", weight: 5 },
       { value: "whose", weight: 5 },
       { value: "whoever", weight: 5 },
       { value: "whomever", weight: 5 },
       { value: "whosever", weight: 5 },
       { value: "person", weight: 5 },
       { value: "man", weight: 5 },
       { value: "woman", weight: 5 },
       { value: "boy", weight: 5 },
       { value: "girl", weight: 5 },
       { value: "child", weight: 5 },
       { value: "baby", weight: 5 },
       { value: "adult", weight: 5 },
       { value: "senior", weight: 5 },
       { value: "teacher", weight: 5 },
       { value: "student", weight: 5 },
       { value: "doctor", weight: 5 },
       { value: "nurse", weight: 5 },
       { value: "police", weight: 5 },
       { value: "firefighter", weight: 5 },
       { value: "soldier", weight: 5 },
       { value: "engineer", weight: 5 },
       { value: "lawyer", weight: 5 },
       { value: "businessman", weight: 0 },
       { value: "businesswoman", weight: 0 },
       { value: "celebrity", weight: 5 },
       { value: "politician", weight: 5 },
       { value: "athlete", weight: 5 },
       { value: "artist", weight: 5 },
       { value: "musician", weight: 5 },
       { value: "writer", weight: 5 },
       { value: "actor", weight: 5 },
       { value: "actress", weight: 5 },
     ]);

   export const pickNoun = () =>
     choose([
       { value: "apple", weight: 5 },
       { value: "ball", weight: 5 },
       { value: "book", weight: 5 },
       { value: "car", weight: 5 },
       { value: "chair", weight: 5 },
       { value: "computer", weight: 5 },
       { value: "dog", weight: 5 },
       { value: "door", weight: 5 },
       { value: "house", weight: 5 },
       { value: "key", weight: 5 },
       { value: "light", weight: 5 },
       { value: "pencil", weight: 5 },
       { value: "phone", weight: 5 },
       { value: "shoe", weight: 5 },
       { value: "table", weight: 5 },
       { value: "tree", weight: 5 },
       { value: "window", weight: 5 },
       { value: "airplane", weight: 5 },
       { value: "boat", weight: 5 },
       { value: "bottle", weight: 5 },
       { value: "cat", weight: 5 },
       { value: "cloud", weight: 5 },
       { value: "cup", weight: 5 },
       { value: "flower", weight: 5 },
       { value: "guitar", weight: 5 },
       { value: "hand", weight: 5 },
       { value: "hat", weight: 5 },
       { value: "ice cream", weight: 5 },
       { value: "money", weight: 5 },
       { value: "moon", weight: 5 },
       { value: "music", weight: 5 },
       { value: "pen", weight: 5 },
       { value: "picture", weight: 5 },
       { value: "plant", weight: 5 },
       { value: "radio", weight: 5 },
       { value: "school", weight: 5 },
       { value: "shirt", weight: 5 },
       { value: "star", weight: 5 },
       { value: "street", weight: 5 },
       { value: "tree", weight: 5 },
       { value: "watch", weight: 5 },
       { value: "water", weight: 5 },
       { value: "yard", weight: 5 },
     ]);

   export const pickObject = () => pickNoun();

   export const pickAdjective = () =>
     choose([
       { value: 'good', weight: 5 },
       { value: 'bad', weight: 5 },
       { value: 'beautiful', weight: 5 },
       { value: "big", weight: 5 },
       { value: "small", weight: 5 },
       { value: "tall", weight: 5 },
       { value: "short", weight: 5 },
       { value: "fat", weight: 5 },
       { value: "thin", weight: 5 },
       { value: "old", weight: 5 },
       { value: "young", weight: 5 },
       { value: "happy", weight: 5 },
       { value: "sad", weight: 5 },
       { value: "funny", weight: 5 },
       { value: "serious", weight: 5 },
       { value: "smart", weight: 5 },
       { value: "dumb", weight: 5 },
       { value: "beautiful", weight: 5 },
       { value: "ugly", weight: 5 },
       { value: "fast", weight: 5 },
       { value: "slow", weight: 5 },
       { value: "loud", weight: 5 },
       { value: "quiet", weight: 5 },
       { value: "hard", weight: 5 },
       { value: "soft", weight: 5 },
       { value: "hot", weight: 5 },
       { value: "cold", weight: 5 },
       { value: "heavy", weight: 5 },
       { value: "light", weight: 5 },
       { value: "new", weight: 5 },
       { value: "old", weight: 5 },
       { value: "good", weight: 5 },
       { value: "bad", weight: 5 },
       { value: "important", weight: 5 },
       { value: "unimportant", weight: 5 },
       { value: "necessary", weight: 5 },
       { value: "unnecessary", weight: 5 },
       { value: "real", weight: 5 },
       { value: "imaginary", weight: 5 },
       { value: "possible", weight: 5 },
       { value: "impossible", weight: 5 },
       { value: "helpful", weight: 5 },
       { value: "harmful", weight: 5 },
       { value: "correct", weight: 5 },
       { value: "incorrect", weight: 5 },
       { value: "true", weight: 5 },
       { value: "false", weight: 5 },
     ]);

   export const pickAdverb = () =>
     choose([
       { value: "quickly", weight: 5 },
       { value: "slowly", weight: 5 },
       { value: "loudly", weight: 5 },
       { value: "quietly", weight: 5 },
       { value: "hardly", weight: 5 },
       { value: "easily", weight: 5 },
       { value: "carefully", weight: 5 },
       { value: "thoughtfully", weight: 5 },
       { value: "sadly", weight: 5 },
       { value: "happily", weight: 5 },
       { value: "excitedly", weight: 5 },
       { value: "calmly", weight: 5 },
       { value: "angrily", weight: 5 },
       { value: "fearfully", weight: 5 },
       { value: "hopefully", weight: 5 },
       { value: "unfortunately", weight: 5 },
       { value: "fortunately", weight: 5 },
       { value: "recently", weight: 5 },
       { value: "finally", weight: 5 },
       { value: "always", weight: 5 },
       { value: "never", weight: 5 },
       { value: "usually", weight: 5 },
       { value: "sometimes", weight: 5 },
       { value: "rarely", weight: 5 },
       { value: "often", weight: 5 },
       { value: "just", weight: 5 },
       { value: "only", weight: 5 },
       { value: "very", weight: 5 },
       { value: "too", weight: 5 },
       { value: "so", weight: 5 },
       { value: "enough", weight: 5 },
       { value: "almost", weight: 5 },
       { value: "nearly", weight: 5 },
       { value: "quite", weight: 5 },
       { value: "really", weight: 5 },
       { value: "certainly", weight: 5 },
       { value: "probably", weight: 5 },
       { value: "possibly", weight: 5 },
       { value: "perhaps", weight: 5 },
       { value: "definitely", weight: 5 },
       { value: "definitely not", weight: 5 },
     ]);

   export const buildKoreanVerb = () => Pre(`${pickKoreanVerb()} = ${kAnswer}`);

   export const buildKoreanWord = () => Pre(`${pickKoreanWord()} = ${kAnswer}`);

   export const pickVerb = () =>
     choose([
       { value: 'is', weight: 5 },
       { value: 'was', weight: 5 },
       { value: 'like', weight: 5 },
       { value: 'ate', weight: 5 },
       { value: 'sat', weight: 5 },
       { value: 'ran', weight: 5 },
       { value: 'went', weight: 5 },
       { value: "add", weight: 5 },
       { value: "ask", weight: 5 },
       { value: "begin", weight: 5 },
       { value: "break", weight: 5 },
       { value: "bring", weight: 5 },
       { value: "call", weight: 5 },
       { value: "choose", weight: 5 },
       { value: "come", weight: 5 },
       { value: "cook", weight: 5 },
       { value: "cry", weight: 5 },
       { value: "dance", weight: 5 },
       { value: "draw", weight: 5 },
       { value: "eat", weight: 5 },
       { value: "fall", weight: 5 },
       { value: "feel", weight: 5 },
       { value: "find", weight: 5 },
       { value: "fly", weight: 5 },
       { value: "go", weight: 5 },
       { value: "have", weight: 5 },
       { value: "hear", weight: 5 },
       { value: "help", weight: 5 },
       { value: "hold", weight: 5 },
       { value: "jump", weight: 5 },
       { value: "know", weight: 5 },
       { value: "laugh", weight: 5 },
       { value: "learn", weight: 5 },
       { value: "like", weight: 5 },
       { value: "listen", weight: 5 },
       { value: "look", weight: 5 },
       { value: "make", weight: 5 },
       { value: "need", weight: 5 },
       { value: "open", weight: 5 },
       { value: "play", weight: 5 },
       { value: "read", weight: 5 },
       { value: "see", weight: 5 },
       { value: "sell", weight: 5 },
       { value: "sing", weight: 5 },
       { value: "sit", weight: 5 },
       { value: "sleep", weight: 5 },
       { value: "speak", weight: 5 },
       { value: "stand", weight: 5 },
       { value: "take", weight: 5 },
       { value: "tell", weight: 5 },
       { value: "think", weight: 5 },
       { value: "touch", weight: 5 },
       { value: "walk", weight: 5 },
       { value: "want", weight: 5 },
       { value: "watch", weight: 5 },
       { value: "write", weight: 5 },
     ]);

   export const buildSVOSentence = () => Pre(`${pickSubject()} ${pickVerb()} ${pickObject()} = ${kAnswer}`);

   /*
   export const sentences = [
     'I like ice cream.',
     'She is a good friend.',
     'The dog ate the cat.',
     'The sky is blue.',
     'He went to the store.',
     'The cat sat on the mat.',
     'He ran to the store.',
     'She likes to dance.',
     'We went to the park.',
     'It was a beautiful day.',
   ];
   */

   export const pad = (n, v, c = ' ') => String(v).padStart(n, c);
   export const pick = (a, b) => {
     if (b === undefined) {
       b = a;
       a = 0;
     }
     return Math.floor(Math.random() * (b - a)) + a;
   }
   export const pickNonZero = (a, b) => {
     for (;;) {
       const value = pick(a, b);
       if (value !== 0) {
         return value;
       }
     }
   };
   export const Size = (name, size, html) => ({ name, html, size });
   export const Text = (container, text, size) => {
     const pre = document.createElement('pre');
     pre.appendChild(document.createTextNode(text));
     if (size) {
       pre.style.fontSize = size;
     }
     container.appendChild(pre);
   }
   export const Power = (container, text, power, size) => {
     const pre = document.createElement('pre');
     pre.appendChild(document.createTextNode(text));
     if (size) {
       pre.style.fontSize = size;
     }
     const sup = document.createElement('sup');
     sup.appendChild(document.createTextNode(power));
     if (size) {
       sup.style.fontSize = size;
     }
     pre.appendChild(sup);
     container.appendChild(pre);
   }
   export const Time = (hours, minutes, size) => `<span style="font-size: 0.75em">${pad(2, pick(24), '0')}시${pad(2, pick(60), '0')}분</span>`;
   export const Rational = (numerator, denominator) =>
     `<table style="display: inline-block; transform: translateY(40%); font-size: 0.5em; text-align: center"><tr><td style="text-align: center; border-bottom: 1px solid black">${numerator}</td></tr><tr><td>${denominator}</td></tr></table>`;

   export const kWorkedAnswer = '<br><br><br><br><br><br>';
   export const kAnswer = ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
   export const kMinus = '\u002D';
   export const kPlus = '\u002B';
   export const kTimes = '\u00D7';
   export const kDivide = '\u00F7';
   export const kEqual = '\u003D';
   export const kRoot = '\u221A';
   export const kTherefore = '\u2234';

   export const buildSimpleDivision31 = () => {
     for (let i = 0; i < Infinity; i++) {
       const x = pick(900);
       const y = pick(10);
       if (y < 2) {
         continue;
       }
       const product = x * y;
       const t = `${product}`;
       if (t.length < 3) {
         continue;
       }
       return Size('SimpleDivision31', 1, `${x} ${kDivide} ${y} = ${kAnswer}`);
     }
   };

   export const buildSimpleDivision32 = () => {
     for (let i = 0; i < Infinity; i++) {
       const x = pick(1000);
       if (x < 100) {
         continue;
       }
       const y = pick(100);
       if (y < 10) {
         continue;
       }
       const product = x * y;
       const t = `${product}`;
       if (t.length < 4) {
         continue;
       }
       return Size('SimpleDivision32', 1, `${x} ${kDivide} ${y} = ${kAnswer}`);
     }
   };

   export const buildSimpleDivision52 = () => {
     for (let i = 0; i < Infinity; i++) {
       const x = pick(100000);
       if (x < 10000) {
         continue;
       }
       const y = pick(100);
       if (y < 10) {
         continue;
       }
       return Size('SimpleDivision52', 1, `${x} ${kDivide} ${y} = ${kAnswer}`);
     }
   };

   export const buildSquare = () => 
     Size('Square', 1, `${pick(-10, 10)}<sup>2</sup> = ${kAnswer}`);

   export const buildCube = () => 
     Size('Cube', 1, `${pick(-4, 4)}<sup>3</sup> = ${kAnswer}`);

   export const buildSquareRoot = () => {
     const x = pick(10);
     return Size('SquareRoot', 1, `${kRoot}${x * x} = ${kAnswer}`);
   }

   export const buildSubtraction = () => Size('Subtraction', 1, `${pick(1000)} ${kMinus} ${pick(1000)} = ${kAnswer}`);

   export const buildTimeSubtraction = () => {
     const xH = pick(24);
     const xM = pick(60);
     const yH = pick(24);
     const yM = pick(60);

     return Size('TimeSubtraction', 1, `${Time(xH, xM)} ${kMinus} ${Time(yH, yM)} = ${kAnswer}`);
   }

   export const buildAddition = () => Size('Addition', 1, `${pick(1000)} ${kPlus} ${pick(1000)} = ${kAnswer}`);

   export const buildTimeAddition = () => {
     const xH = pick(24);
     const xM = pick(60);
     const yH = pick(24);
     const yM = pick(60);

     return Size('TimeAddition', 1, `${Time(xH, xM)} ${kPlus} ${Time(yH, yM)} = ${kAnswer}`);
   }

   export const buildMultiplication21 = () =>
     Size('Multiplication21', 1, `${pick(100)} ${kTimes} ${pick(10)} = ${kAnswer}`);

   export const buildMultiplicationTens = () =>
     Size('MultiplicationTens', 1, `${pick(1, 11) * 10} ${kTimes} ${pick(1, 11) * 10} = ${kAnswer}`);

   export const buildMultiplicationThousands = () =>
     Size('MultiplicationThousands', 1, `${pick(1, 11) * 10} ${kTimes} ${pick(1, 11) * 10} = ${kAnswer}`);

   export const buildMultiplicationOneOffTens = () =>
     Size('MultiplicationOneOffTens', 1, `${pick(1, 11) * 10} ${kTimes} ${pick(1, 11) * 10 + chooseFromList([-1, 1])} = ${kAnswer}`);

   export const buildMultiplicationOneOffHundreds = () =>
     Size('MultiplicationOneOffHundreds', 1, `${pick(1, 11) * 10} ${kTimes} ${pick(1, 11) * 100 + chooseFromList([-1, 1])} = ${kAnswer}`);

   export const buildMultiplication22 = () =>
     Size('Multiplication22', 1, `${pick(100)} ${kTimes} ${pick(100)} = ${kAnswer}`);

   export const buildMultiplication32 = () =>
     Size('Multiplication32', 1, `${pick(1000)} ${kTimes} ${pick(100)} = ${kAnswer}`);

   // export const kInequalities = `<table style="display: inline-block"><tr><td>&lt;</td><td>=</td><td>&gt;</td></tr></table>`;
   export const kInequalities = ` [&lt = &gt] `;

   // export const buildMultiplicationInequality = () =>
   //  Size('MultiplicationInequality', 1, `${pick(100)} ${kTimes} ${pick(100)} ${kInequalities} ${pick(100)} ${kTimes} ${pick(100)}`);

   export const isInteger = (a) => Math.floor(a) === a;

   export const buildMultiplicationInequalitySimple = () => {
     for (;;) {
       const ab = pick(1, 101);
       const af = pick(1, 11);
       const a = ab * af;
       const bb = pick(1, 101);
       const bf = pick(1, 11);
       const b = bb * bf;
       if (af === bf) {
         continue;
       }
       const r = a / b;
       if (r < 0.95 || r > 1.05) {
         continue;
       }
       if (!isInteger(af / bf) && !isInteger(bf / af)) {
         continue;
       }
       return Size('MultiplicationInequalitySimple', 1, `${ab} ${kTimes} ${af} ${kInequalities} ${bb} ${kTimes} ${bf}`);
     }
   }

   export const buildRationalAddition = () => {
     for (;;) {
       const xD = pick(-11, 11);
       const xN = pick(-11, 11);
       const yD = pick(-11, 11);
       const yN = pick(-11, 11);
       if (xN === 0 || yN === 0 || (!Number.isInteger(xN / yN) && !Number.isInteger(yN / xN))) {
         continue;
       }
       return Size('RationalAddition', 1, `${Rational(xD, xN)} ${kPlus} ${Rational(yD, yN)} = ${kAnswer}`);
     }
   };

   export const buildRationalSubtraction = () => {
     for (;;) {
       const xD = pick(-11, 11);
       const xN = pick(-11, 11);
       const yD = pick(-11, 11);
       const yN = pick(-11, 11);
       if (xN === 0 || yN === 0 || (!Number.isInteger(xN / yN) && !Number.isInteger(yN / xN))) {
         continue;
       }
       return Size('RationalSubtraction', 1, `${Rational(xD, xN)} ${kMinus} ${Rational(yD, yN)} = ${kAnswer}`);
     }
   }

   export const buildIntegerRationalSubtraction = () => {
     for (;;) {
       const xD = pick(-11, 11);
       const yD = pick(-11, 11);
       const yN = pick(-11, 11);
       if (xD === 0 || yN === 0) {
         continue;
       }
       return Size('IntegerRationalSubtraction', 1, `${xD} ${kMinus} ${Rational(yD, yN)} = ${kAnswer}`);
     }
   }

   export const buildFractionFractionSubtraction = () => {
     for (;;) {
       const x = pick(1, 11);
       const xD = pick(1, 21);
       const xN = pick(1, 21);
       const y = pick(1, 11);
       const yD = pick(1, 21);
       const yN = pick(1, 21);
       if (x === 0 || xD === 0 || xN === 0) {
         continue;
       }
       if (y === 0 || yD === 0 || yN === 0) {
         continue;
       }
       if (xD >= xN || yD >= yN) {
         continue;
       }
       if (xN * yN > 50) {
         continue;
       }
       return Size('FractionFractionSubtraction', 1, `${x}${Rational(xD, xN)} ${kMinus} ${y}${Rational(yD, yN)} = ${kAnswer}`);
     }
   }

   export const buildFractionFractionSubtractionCommonDenominator = () => {
     for (;;) {
       const x = pick(1, 11);
       const xD = pick(1, 21);
       const xN = pick(1, 21);
       const y = pick(1, 11);
       const yD = pick(1, 21);
       const yN = xN;
       if (x === 0 || xD === 0 || xN === 0) {
         continue;
       }
       if (y === 0 || yD === 0 || yN === 0) {
         continue;
       }
       if (xD >= xN || yD >= yN) {
         continue;
       }
       if (xN * yN > 50) {
         continue;
       }
       return Size('FractionFractionSubtraction', 1, `${x}${Rational(xD, xN)} ${kMinus} ${y}${Rational(yD, yN)} = ${kAnswer}`);
     }
   }

   export const buildIntegerFractionSubtraction = () => {
     for (;;) {
       const x = pick(1, 11);
       const y = pick(1, 11);
       const yD = pick(1, 21);
       const yN = pick(1, 21);
       if (x <= y) {
         continue;
       }
       if (y === 0 || yD === 0 || yN === 0 || yN <= yD) {
         continue;
       }
       return Size('IntegerFractionSubtraction', 1, `${x} ${kMinus} ${y}${Rational(yD, yN)} = ${kAnswer}`);
     }
   }

   export const buildIntegerDecimalSubtraction = () => {
     for (;;) {
       const xD = pick(-11, 11);
       const yD = pick(-11, 11) / 10;
       return Size('IntegerDecimalSubtraction', 1, `${xD} ${kMinus} ${yD} = ${kAnswer}`);
     }
   }

   export const buildDecimalDecimalSubtraction = () => {
     for (;;) {
       const xD = pick(-110, 110) / 10;
       const yD = pick(-11, 11) / 10;
       if (xD === 0 || yD === 0) {
         continue;
       }
       return Size('DecimalDecimalSubtraction', 1, `${xD} ${kMinus} ${yD} = ${kAnswer}`);
     }
   }

   export const buildIntegerDecimalMultiplication = () => {
     for (;;) {
       const xD = pick(-11, 11);
       const yD = pick(-11, 11) / 10;
       return Size('IntegerDecimalMultiplication', 1, `${xD} ${kTimes} ${yD} = ${kAnswer}`);
     }
   }

   export const buildIntegerRationalMultiplication = () => {
     for (;;) {
       const xD = pick(-11, 11);
       const yD = pick(-11, 11);
       const yN = pick(-11, 11);
       if (xD === 0 || yN === 0) {
         continue;
       }
       return Size('IntegerRationalMultiplication', 1, `${xD} ${kTimes} ${Rational(yD, yN)} = ${kAnswer}`);
     }
   }

   export const buildIntegerPercentageMultiplication = () => {
     for (;;) {
       const xD = pick(-11, 11);
       const yD = pick(-21, 21) * 10;
       return Size('IntegerPercentageMultiplication', 1, `${xD} ${kTimes} ${yD}% = ${kAnswer}`);
     }
   }

   export const buildIntegerRationalDivision = () => {
     for (;;) {
       const xD = pick(-11, 11);
       const yD = pick(-11, 11);
       const yN = pick(-11, 11);
       if (xD === 0 || yN === 0 || yD === 0) {
         continue;
       }
       return Size('IntegerRationalDivision', 1, `${xD} ${kDivide} ${Rational(yD, yN)} = ${kAnswer}`);
     }
   }

   export const buildRationalDivision = () => {
     for (;;) {
       const xD = pick(-11, 11);
       const xN = pick(-11, 11);
       const yD = pick(-11, 11);
       const yN = pick(-11, 11);
       if (xN === 0 || xD === 0 || yN === 0 || yD === 0) {
         continue;
       }
       return Size('RationalDivision', 1, `${Rational(xD, xN)} ${kDivide} ${Rational(yD, yN)} = ${kAnswer}`);
     }
   }

   export const buildRationalMultiplication = () => {
     for (;;) {
       const xD = pick(-11, 11);
       const xN = pick(-11, 11);
       const yD = pick(-11, 11);
       const yN = pick(-11, 11);
       if (xN === 0 || xD === 0 || yN === 0 || yD === 0) {
         continue;
       }
       return Size('RationalMultiplication', 1, `${Rational(xD, xN)} ${kTimes} ${Rational(yD, yN)} = ${kAnswer}`);
     }
   }

   export const buildRationalInequality = () => {
     for (;;) {
       const xD = pick(-11, 11);
       const xN = pick(-11, 11);
       const yD = pick(-11, 11);
       const yN = pick(-11, 11);
       if (xN === 0 || yN === 0 || xN === yN) {
         continue;
       }
       return Size('RationalInequality', 1, `${Rational(xD, xN)} ${kInequalities} ${Rational(yD, yN)}`);
     }
   };

   export const pickUnit = () => 
     choose([
       { value: 'g', weight: 5 },
       { value: 'kg', weight: 5 },
       { value: 'm', weight: 5 },
       { value: 'cm', weight: 5 },
       { value: 'ml', weight: 5 },
       { value: 'h', weight: 5 },
       { value: 's', weight: 5 },
       { value: 'apple', weight: 5 },
       { value: 'pear', weight: 5 },
       { value: 'fish', weight: 5 },
       { value: 'q', weight: 5 },
       { value: 'v', weight: 5 },
     ]);

   export const pickConvertibleUnitPair = () => 
     choose([
       { value: ['kg', 'g'], weight: 5 },
       { value: ['m', 'cm'], weight: 5 },
       { value: ['km', 'm'], weight: 5 },
       { value: ['l', 'ml'], weight: 5 },
       { value: ['hours', 'minutes'], weight: 5 },
       { value: ['minutes', 'seconds'], weight: 5 },
     ]);

   export const buildUnitAddition = () => Size('UnitAddition', 1, `${pick(-11, 11)} ${pickUnit()} ${kPlus} ${pick(-11, 11)} ${pickUnit()} = ${kAnswer}`);
   export const buildUnitSubtraction = () => Size('UnitSubtraction', 1, `${pick(-11, 11)} ${pickUnit()} ${kMinus} ${pick(-11, 11)} ${pickUnit()} = ${kAnswer}`);
   export const buildUnitMultiplication = () => Size('UnitMultiplication', 1, `${pick(-11, 11)} ${pickUnit()} ${kTimes} ${pick(-11, 11)} ${pickUnit()} = ${kAnswer}`);
   export const buildUnitDivision = () => Size('UnitDivision', 1, `${pick(-11, 11)} ${pickUnit()} ${kDivide} ${pickNonZero(-11, 11)} ${pickUnit()} = ${kAnswer}`);

   export const buildUnitDimensionlessDivision = () => Size('UnitDimensionlessDivision', 1, `${pick(-11, 11)} ${pickUnit()} ${kDivide} ${pickNonZero(-11, 11)} = ${kAnswer}`);
   export const buildUnitDimensionlessMultiplication = () => Size('UnitDimensionlessMultiplication', 1, `${pick(-11, 11)} ${pickUnit()} ${kTimes} ${pick(-11, 11)} = ${kAnswer}`);

   export const buildSameUnitAddition = () => { const unit = pickUnit(); return Size('SameUnitAddition', 1, `${pick(-11, 11)} ${unit} ${kPlus} ${pick(-11, 11)} ${unit} = ${kAnswer}`); };
   export const buildSameUnitNegativeAddition = () => { const unit = pickUnit(); return Size('SameUnitNegativeAddition', 1, `${pick(-11, 11)} ${unit} ${kPlus} ${pick(-11, 0)} ${unit} = ${kAnswer}`); };
   export const buildSameUnitSubtraction = () => { const unit = pickUnit(); return Size('SameUnitSubtraction', 1, `${pick(-11, 11)} ${unit} ${kMinus} ${pick(-11, 11)} ${unit} = ${kAnswer}`); };
   export const buildSameUnitMultiplication = () => { const unit = pickUnit(); return Size('SameUnitMultiplication', 1, `${pick(-11, 11)} ${unit} ${kTimes} ${pick(-11, 11)} ${unit} = ${kAnswer}`); };
   export const buildSameUnitDivision = () => { const unit = pickUnit(); return Size('SameUnitDivision', 1, `${pick(-11, 11)} ${unit} ${kDivide} ${pickNonZero(-11, 11)} ${unit} = ${kAnswer}`); };

   export const buildConvertibleUnitAddition = () => { const [a, b] = pickConvertibleUnitPair(); return Size('ConvertibleUnitAddition', 1, `${pick(-11, 11)} ${a} ${kPlus} ${pick(-11, 11)} ${b} = ${kAnswer}`); };
   export const buildConvertibleUnitNegativeAddition = () => { const [a, b] = pickConvertibleUnitPair(); return Size('ConvertibleUnitNegativeAddition', 1, `${pick(-11, 11)} ${a} ${kPlus} ${pick(-11, 0)} ${b} = ${kAnswer}`); };
   export const buildConvertibleUnitSubtraction = () => { const [a, b] = pickConvertibleUnitPair(); return Size('ConvertibleUnitSubtraction', 1, `${pick(-11, 11)} ${a} ${kMinus} ${pick(-11, 11)} ${b} = ${kAnswer}`); };
   export const buildConvertibleUnitMultiplication = () => { const [a, b] = pickConvertibleUnitPair(); return Size('ConvertibleUnitMultiplication', 1, `${pick(-11, 11)} ${a} ${kTimes} ${pick(-11, 11)} ${b} = ${kAnswer}`); };
   export const buildConvertibleUnitDivision = () => {
     for (;;) {
       const [a, b] = pickConvertibleUnitPair();
       if (a === 'g' && b === 'kg') {
         continue;
       }
       return Size('ConvertibleUnitDivision', 1, `${pick(-11, 11)} ${a} ${kDivide} ${pickNonZero(-11, 11)} ${b} = ${kAnswer}`);
     }
   };

   export const buildSameBasisAddition = () => {
     const basis = pick(1, 11);
     return Size('SameBasisAddition', 1, `${pick(-11, 11)} ${kTimes} ${basis} ${kPlus} ${pick(-11, 11)} ${kTimes} ${basis} ${kPlus} ${pick(-11, 11)} ${kTimes} ${basis} = ${kAnswer}`);
   };

   export const buildSystemOfEquations = () => {
     switch (pick(2)) {
       case 0: // x + y = b; x - y = c;
         for (;;) {
           const x = pick(-11, 11);
           const y = pick(-11, 11);
           switch (pick(2)) {
             case 0: return Size('SystemOfEquations', 1, `x + y = ${x + y} ${kTherefore} x = ${kAnswer} <br>x - y = ${x - y} ${kTherefore} y = ${kAnswer}<br>`);
             case 1: return Size('SystemOfEquations', 1, `x - y = ${x - y} ${kTherefore} x = ${kAnswer} <br>x + y = ${x + y} ${kTherefore} y = ${kAnswer}<br>`);
           }
         }
       case 1: // x * y = b; x / y = c;
         for (;;) {
           const x = pick(-11, 11);
           const y = pick(-11, 11);
           const d = x / y;
           if (!isFinite(d) || d != Math.floor(d)) {
             continue;
           }
           switch (pick(2)) {
             case 0: return Size('SystemOfEquations', 1, `x ${kTimes} y = ${x * y} ${kTherefore} x = ${kAnswer} <br>x ${kDivide} y = ${d} ${kTherefore} y = ${kAnswer}<br>`);
             case 1: return Size('SystemOfEquations', 1, `x ${kDivide} y = ${d} ${kTherefore} x = ${kAnswer} <br>x ${kTimes} y = ${x * y} ${kTherefore} y = ${kAnswer}<br>`);
           }
         }
       }
     };

   const kMan = 10000;

   export const buildKoreanUnitManProblem = () => {
     for (;;) {
       const v = Math.floor(Math.random() * kMan * kMan * kMan * 100);
       if (v < kMan) {
         continue;
       }
       return Size('KoreanUnitMan', 1, `How many 만 in ${v}?`);
     }
   }

   export const buildKoreanUnitOkProblem = () => {
     for (;;) {
       const v = Math.floor(Math.random() * kMan * kMan * kMan * 100);
       if (v < kMan * kMan) {
         continue;
       }
       return Size('KoreanUnitOk', 1, `How many 억 in ${v}?`);
     }
   }

   export const buildKoreanUnitJoProblem = () => {
     for (;;) {
       const v = Math.floor(Math.random() * kMan * kMan * kMan * 100);
       if (v < kMan * kMan * kMan) {
         continue;
       }
       return Size('KoreanUnitJo', 1, `How many 조 in ${v}?`);
     }
   }

   export const buildDigitPlaceValueProblem = () => {
     for (;;) {
       const v = Math.floor(Math.random() * kMan * kMan * kMan * 100);
       const digits = `${v}`.split('');
       const index = Math.floor(Math.random() * digits.length);
       const digit = digits[index];
       let count = 0;
       for (const other of digits) {
         if (other === digit) {
           count += 1;
         }
       }
       if (count !== 1) {
         continue;
       }
       return Size('DigitPlaceValue', 1, `What is the 값 of ${digit} in ${v}`);
     }
   }

   const pickName = (chosen) => chooseFromList(['Juan', 'Carlos', 'Carole', 'Nancy', 'Mr. Granger', 'Mr. Rose', 'John', 'Steve', 'Bill'], chosen);
   const pickColor = (chosen) => chooseFromList(['red', 'blue', 'green', 'orange', 'purple', 'yellow', 'pink', 'black', 'silver', 'gold', 'bronze', 'copper', 'swirly']);
   const pickVehicle = (chosen) => chooseFromList(['moped', 'car', 'camel', 'horse', 'giant snail', 'helicopter', 'bicycle', 'train', 'aeroplane'], chosen);
   const pickFuel = (chosen) => chooseFromList(['boxes', 'rods', 'crystals', 'bulbs', 'batteries', 'liters', 'pellets'], chosen);
   const pickThing = (chosen) => chooseFromList(['pencil', 'flower', 'bullet', 'watermelon', 'mysterious cube', 'dog', 'nose'], chosen);
   const pickContainer = (chosen) => chooseFromList(['a tank', 'a bowl', 'a tube', 'a box', 'a pipe', 'a swimming pool', 'an aquarium'], chosen);
   const pickMaterial = (chosen) => chooseFromList(['water', 'air', 'sand', 'lava', 'cheese', 'hamburger'], chosen);
   const pickThings = (chosen) => chooseFromList(['pencils', 'flowers', 'bullets', 'watermelons', 'mysterious cubes', 'dogs', 'noses'], chosen);
   const pickJob = (chosen) => chooseFromList(['type', 'paint', 'write', 'mow', 'build', 'demolish', 'transport', 'read'], chosen);
   const pickPlace = (chosen) => chooseFromList(['auditorium', 'theater', 'prison'], chosen);
   const pickCity = (chosen) => chooseFromList(['Paris', 'Dubai', 'Madrid', 'Tokyo', 'Amsterdam', 'Berlin', 'Rome', 'New York City', 'Barcelona',
     'London', 'Singapore', 'Munich', 'Milan', 'Seoul', 'Dublin', 'Osaka', 'Hong Kong', 'Vienna', 'Los Angeles', 'Lisbon', 'Prague',
     'Sydney', 'Istanbul', 'Melbourne', 'Orlando', 'Frankfurt', 'Kyoto', 'Taipei', 'Florence', 'Toronto', 'Athens', 'Zurich', 'Bangkok',
     'Las Vegas', 'Miami', 'Kuala Lumpur', 'Venice', 'Abu Dhabi', 'Stockholm', 'Brussels', 'Tel Aviv', 'San Francisco', 'Shanghai',
     'Warsaw', 'Guangzhou', 'Copenhagen', 'Nice', 'Washington', 'Budapest', 'Shenzhen', 'Vancouver', 'Palma de Mallorca', 'Seville', 'São Paulo',
     'Valencia', 'Mexico City', 'Antalya', 'Sapporo', 'Beijing', 'Busan', 'Fukuoka', 'Edinburgh', 'Porto', 'Jerusalem', 'Kraków', 'Rio de Janeiro',
     'Honolulu', 'Montreal', 'Macau', 'Cancún', 'Marne-La-Vallée', 'Doha', 'Sharjah', 'Rhodes', 'Verona', 'Bologna', 'Thessaloniki', 'Buenos Aires',
     'Lima', 'Phuket', 'Delhi', 'Heraklion', 'Tallinn', 'Pattaya-Chonburi', 'Ho Chi Minh City', 'Playa Del Carmen', 'Johor Bahru', 'Santiago',
     'Tbilisi', 'Riyadh', 'Vilnius', 'Mugla', 'Zhuhai', 'Mecca', 'Punta Cana', 'Guilin', 'Hanoi', 'Cairo', 'Muscat'], chosen);

   const pickTransport = (chosen) => chooseFromUniformList([
       {"mode": "walking", "speed_kph": 5},
       {"mode": "bicycle", "speed_kph": 20},
       {"mode": "electric scooter", "speed_kph": 25},
       {"mode": "skateboard", "speed_kph": 15},
       {"mode": "car", "speed_kph": 120},
       {"mode": "motorcycle", "speed_kph": 80},
       {"mode": "bus", "speed_kph": 50},
       {"mode": "tram", "speed_kph": 70},
       {"mode": "subway", "speed_kph": 40},
       {"mode": "train", "speed_kph": 300},
       {"mode": "airplane", "speed_kph": 1000},
       {"mode": "helicopter", "speed_kph": 240},
       {"mode": "ferry", "speed_kph": 30},
       {"mode": "boat", "speed_kph": 50},
       {"mode": "horse", "speed_kph": 15},
       {"mode": "rollerblading", "speed_kph": 18},
       {"mode": "canoe", "speed_kph": 8}
     ], chosen);

   const addReverseCityPairs = (pairs) => {
     const reverses = [];
     for (const { cities, distance_km } of pairs) {
       reverses.push({ cities: [...cities].reverse(), distance_km });
     }
     return [...pairs, ...reverses];
   }

   const pickCityPair = (chosen) => chooseFromUniformList(addReverseCityPairs([
     {"cities": ["New York City, USA", "Los Angeles, USA"], "distance_km": 3948},
     {"cities": ["Tokyo, Japan", "Sydney, Australia"], "distance_km": 7772},
     {"cities": ["London, UK", "Paris, France"], "distance_km": 344},
     {"cities": ["Beijing, China", "Moscow, Russia"], "distance_km": 5807},
     {"cities": ["Rio de Janeiro, Brazil", "Buenos Aires, Argentina"], "distance_km": 2000},
     {"cities": ["Cairo, Egypt", "Cape Town, South Africa"], "distance_km": 7925},
     {"cities": ["Delhi, India", "Dubai, UAE"], "distance_km": 2786},
     {"cities": ["Toronto, Canada", "Mexico City, Mexico"], "distance_km": 3296},
     {"cities": ["Berlin, Germany", "Rome, Italy"], "distance_km": 1151},
     {"cities": ["Seoul, South Korea", "Hanoi, Vietnam"], "distance_km": 2839},
     {"cities": ["Istanbul, Turkey", "Tehran, Iran"], "distance_km": 1770},
     {"cities": ["Bangkok, Thailand", "Jakarta, Indonesia"], "distance_km": 1722},
     {"cities": ["Moscow, Russia", "St. Petersburg, Russia"], "distance_km": 634},
     {"cities": ["Sydney, Australia", "Auckland, New Zealand"], "distance_km": 2156},
     {"cities": ["Cape Town, South Africa", "Nairobi, Kenya"], "distance_km": 2897},
     {"cities": ["Chicago, USA", "Miami, USA"], "distance_km": 2014},
     {"cities": ["Madrid, Spain", "Lisbon, Portugal"], "distance_km": 505},
     {"cities": ["Montreal, Canada", "Vancouver, Canada"], "distance_km": 3664},
     {"cities": ["Dubai, UAE", "Riyadh, Saudi Arabia"], "distance_km": 1190},
     {"cities": ["Oslo, Norway", "Stockholm, Sweden"], "distance_km": 415},
     {"cities": ["Mumbai, India", "Singapore", "Singapore"], "distance_km": 3963},
     {"cities": ["Los Angeles, USA", "Toronto, Canada"], "distance_km": 3441},
     {"cities": ["Paris, France", "Berlin, Germany"], "distance_km": 878},
     {"cities": ["Istanbul, Turkey", "Cairo, Egypt"], "distance_km": 762},
     {"cities": ["Bangkok, Thailand", "Mumbai, India"], "distance_km": 3260},
     {"cities": ["Sydney, Australia", "Tokyo, Japan"], "distance_km": 7487},
     {"cities": ["Shanghai, China", "Seoul, South Korea"], "distance_km": 864},
     {"cities": ["New York City, USA", "London, UK"], "distance_km": 5561},
     {"cities": ["Lima, Peru", "Santiago, Chile"], "distance_km": 3031},
     {"cities": ["Johannesburg, South Africa", "Lagos, Nigeria"], "distance_km": 4283},
     {"cities": ["San Francisco, USA", "Mexico City, Mexico"], "distance_km": 3517},
     {"cities": ["Osaka, Japan", "Beijing, China"], "distance_km": 3072},
     {"cities": ["Rome, Italy", "Athens, Greece"], "distance_km": 794},
     {"cities": ["Stockholm, Sweden", "Helsinki, Finland"], "distance_km": 398},
     {"cities": ["Jakarta, Indonesia", "Manila, Philippines"], "distance_km": 2792},
     {"cities": ["Copenhagen, Denmark", "Amsterdam, Netherlands"], "distance_km": 692},
     {"cities": ["Vienna, Austria", "Budapest, Hungary"], "distance_km": 214},
     {"cities": ["Brisbane, Australia", "Wellington, New Zealand"], "distance_km": 2056},
     {"cities": ["Hanoi, Vietnam", "Phnom Penh, Cambodia"], "distance_km": 553},
     {"cities": ["Lisbon, Portugal", "Barcelona, Spain"], "distance_km": 622},
     {"cities": ["Nairobi, Kenya", "Addis Ababa, Ethiopia"], "distance_km": 1061},
     {"cities": ["Vancouver, Canada", "Calgary, Canada"], "distance_km": 676},
     {"cities": ["Dublin, Ireland", "Edinburgh, UK"], "distance_km": 417},
     {"cities": ["Munich, Germany", "Zurich, Switzerland"], "distance_km": 304},
     {"cities": ["Perth, Australia", "Johannesburg, South Africa"], "distance_km": 8676},
     {"cities": ["Buenos Aires, Argentina", "Sao Paulo, Brazil"], "distance_km": 1169},
     {"cities": ["Minsk, Belarus", "Kiev, Ukraine"], "distance_km": 530},
     {"cities": ["Bangalore, India", "Chennai, India"], "distance_km": 290},
     {"cities": ["Edmonton, Canada", "Winnipeg, Canada"], "distance_km": 1318},
     {"cities": ["Amman, Jordan", "Baghdad, Iraq"], "distance_km": 785},
     {"cities": ["Lahore, Pakistan", "Karachi, Pakistan"], "distance_km": 1021},
     {"cities": ["Dakar, Senegal", "Accra, Ghana"], "distance_km": 3114},
     {"cities": ["Tbilisi, Georgia", "Yerevan, Armenia"], "distance_km": 175},
     {"cities": ["Brussels, Belgium", "Luxembourg City, Luxembourg"], "distance_km": 161},
     {"cities": ["San Juan, Puerto Rico", "Havana, Cuba"], "distance_km": 1462},
     {"cities": ["Kuala Lumpur, Malaysia", "Manila, Philippines"], "distance_km": 2592},
     {"cities": ["Bucharest, Romania", "Sofia, Bulgaria"], "distance_km": 307},
     {"cities": ["Kigali, Rwanda", "Nairobi, Kenya"], "distance_km": 1499},
     {"cities": ["Lima, Peru", "Quito, Ecuador"], "distance_km": 2232},
     {"cities": ["Tehran, Iran", "Yerevan, Armenia"], "distance_km": 1064},
     {"cities": ["Helsinki, Finland", "Saint Petersburg, Russia"], "distance_km": 300},
     {"cities": ["San Francisco, USA", "Vancouver, Canada"], "distance_km": 1302},
     {"cities": ["Caracas, Venezuela", "Bogotá, Colombia"], "distance_km": 2138},
     {"cities": ["Auckland, New Zealand", "Wellington, New Zealand"], "distance_km": 492},
     {"cities": ["Warsaw, Poland", "Prague, Czech Republic"], "distance_km": 517},
     {"cities": ["Addis Ababa, Ethiopia", "Djibouti City, Djibouti"], "distance_km": 1003},
     {"cities": ["Kiev, Ukraine", "Bucharest, Romania"], "distance_km": 934},
     {"cities": ["Accra, Ghana", "Abuja, Nigeria"], "distance_km": 996},
     {"cities": ["Kathmandu, Nepal", "Dhaka, Bangladesh"], "distance_km": 785},
     {"cities": ["Monrovia, Liberia", "Freetown, Sierra Leone"], "distance_km": 629},
     {"cities": ["Antananarivo, Madagascar", "Nairobi, Kenya"], "distance_km": 1474},
     {"cities": ["Manila, Philippines", "Taipei, Taiwan"], "distance_km": 1108},
     {"cities": ["Havana, Cuba", "Santo Domingo, Dominican Republic"], "distance_km": 1163},
     {"cities": ["Tunis, Tunisia", "Algiers, Algeria"], "distance_km": 730},
     {"cities": ["Brisbane, Australia", "Sydney, Australia"], "distance_km": 703},
     {"cities": ["Riyadh, Saudi Arabia", "Doha, Qatar"], "distance_km": 516},
     {"cities": ["Ouagadougou, Burkina Faso", "Niamey, Niger"], "distance_km": 984},
     {"cities": ["Ashgabat, Turkmenistan", "Tashkent, Uzbekistan"], "distance_km": 575},
     {"cities": ["Port-au-Prince, Haiti", "Santo Domingo, Dominican Republic"], "distance_km": 260},
     {"cities": ["Islamabad, Pakistan", "Colombo, Sri Lanka"], "distance_km": 2839},
     {"cities": ["Vientiane, Laos", "Phnom Penh, Cambodia"], "distance_km": 539},
     {"cities": ["Accra, Ghana", "Lome, Togo"], "distance_km": 463},
     {"cities": ["San Jose, Costa Rica", "Panama City, Panama"], "distance_km": 381},
     {"cities": ["Tirana, Albania", "Podgorica, Montenegro"], "distance_km": 170},
     {"cities": ["Helsinki, Finland", "Riga, Latvia"], "distance_km": 383},
     {"cities": ["Bucharest, Romania", "Chisinau, Moldova"], "distance_km": 362},
     {"cities": ["Amsterdam, Netherlands", "Geneva, Switzerland"], "distance_km": 629},
     {"cities": ["Ulaanbaatar, Mongolia", "Astana, Kazakhstan"], "distance_km": 1634},
     {"cities": ["Maputo, Mozambique", "Lusaka, Zambia"], "distance_km": 1230},
     {"cities": ["Suva, Fiji", "Port Vila, Vanuatu"], "distance_km": 2076},
     {"cities": ["Gaborone, Botswana", "Windhoek, Namibia"], "distance_km": 1551},
     {"cities": ["Kuala Lumpur, Malaysia", "Bangkok, Thailand"], "distance_km": 1317},
     {"cities": ["Manama, Bahrain", "Muscat, Oman"], "distance_km": 406},
     {"cities": ["Bujumbura, Burundi", "Lusaka, Zambia"], "distance_km": 1634},
     {"cities": ["Tehran, Iran", "Damascus, Syria"], "distance_km": 953},
     {"cities": ["Sofia, Bulgaria", "Skopje, North Macedonia"], "distance_km": 176},
     {"cities": ["Lisbon, Portugal", "Marrakech, Morocco"], "distance_km": 623},
     {"cities": ["Rabat, Morocco", "Algiers, Algeria"], "distance_km": 590},
     {"cities": ["Ankara, Turkey", "Baku, Azerbaijan"], "distance_km": 1238},
     {"cities": ["Rome, Italy", "Zagreb, Croatia"], "distance_km": 494},
     {"cities": ["Copenhagen, Denmark", "Hamburg, Germany"], "distance_km": 291},
     {"cities": ["Yerevan, Armenia", "Tbilisi, Georgia"], "distance_km": 220},
     {"cities": ["Khartoum, Sudan", "Nairobi, Kenya"], "distance_km": 1405},
     {"cities": ["Dakar, Senegal", "Bamako, Mali"], "distance_km": 648},
     {"cities": ["Kampala, Uganda", "Dar es Salaam, Tanzania"], "distance_km": 1793},
     {"cities": ["Niamey, Niger", "Abuja, Nigeria"], "distance_km": 885},
     {"cities": ["Bishkek, Kyrgyzstan", "Dushanbe, Tajikistan"], "distance_km": 520},
     {"cities": ["Bangkok, Thailand", "Hanoi, Vietnam"], "distance_km": 805},
     {"cities": ["Cairo, Egypt", "Amman, Jordan"], "distance_km": 602},
     {"cities": ["Brasilia, Brazil", "Sao Paulo, Brazil"], "distance_km": 1012},
     {"cities": ["Athens, Greece", "Sofia, Bulgaria"], "distance_km": 302},
     {"cities": ["Bogota, Colombia", "Quito, Ecuador"], "distance_km": 1007},
     {"cities": ["Bamako, Mali", "Conakry, Guinea"], "distance_km": 1205},
     {"cities": ["Kabul, Afghanistan", "Islamabad, Pakistan"], "distance_km": 682},
     {"cities": ["Kinshasa, Democratic Republic of the Congo", "Brazzaville, Republic of the Congo"], "distance_km": 1066},
     {"cities": ["Bucharest, Romania", "Sarajevo, Bosnia and Herzegovina"], "distance_km": 541},
     {"cities": ["Asuncion, Paraguay", "Montevideo, Uruguay"], "distance_km": 1089},
     {"cities": ["Ljubljana, Slovenia", "Sarajevo, Bosnia and Herzegovina"], "distance_km": 384},
     {"cities": ["Lome, Togo", "Abuja, Nigeria"], "distance_km": 487},
     {"cities": ["N'Djamena, Chad", "Niamey, Niger"], "distance_km": 972},
     {"cities": ["Panama City, Panama", "San Salvador, El Salvador"], "distance_km": 669},
   ]), chosen);

   export const buildDistanceTimeProblem = (chosen) => {
     for (;;) {
       const r1 = pick(1, 100);
       const r2 = pick(1, 100);
       if (r1 <= r2) {
         continue;
       }
       const h = pick(1, 10);
       const d = r1 * h + r2 * h;
       const t1 = pickTransport(chosen);
       const t2 = pickTransport(chosen);
       if (t1.speed_kph < r1 || t2.speed_kph < r2) {
         continue;
       }
       const v1 = t1.mode;
       const v2 = t2.mode;
       return Size('DistanceTime', 2, `A ${v1} traveling at ${r1} km/h and a ${v2} at ${r2} km/h leave in opposite directions.
               How long until they are ${d} km apart?`);
     }
   }

   export const buildCrashTimeProblem = (chosen) => {
     for (;;) {
       const r1 = pick(1, 100);
       const r2 = pick(1, 100);
       if (r1 <= r2) {
         continue;
       }
       const h = pick(1, 10);
       const d = r1 * h + r2 * h;
       const t1 = pickTransport(chosen);
       const t2 = pickTransport(chosen);
       if (t1.speed_kph < r1 || t2.speed_kph < r2) {
         continue;
       }
       const v1 = t1.mode;
       const v2 = t2.mode;
       return Size('CrashTime', 3, `A ${v1} and a ${v2} move toward each other on a ${d} km track.
               The ${v1} goes at ${r1} km/h and the ${v2} goes at ${r2} km/h.
               How long until they crash?`);
     }
   }

   export const buildTimeDistanceProblem = (chosen) => {
     for (;;) {
       const r1 = pick(10, 20);
       const r2 = pick(10, 20);
       if (r1 === r2) {
         continue;
       }
       const h = pick(1, 10);
       const n1 = pickName(chosen);
       const t1 = pickTransport(chosen);
       if (t1.speed_kph < r1) {
         continue;
       }
       const v1 = t1.mode;
       return Size('TimeDistance', 3, `${n1} went from home to office by ${v1} at the average speed of ${r1} km/h.
               On return home from the office, using the same route, they averaged ${r2} km/h.
               If the total round trip took ${h} hours, what was the distance from home to office?`);
     }
   }

   export const buildTimeMeetProblem = (chosen) => {
     const n1 = pickName(chosen);
     const n2 = pickName(chosen);
     for (;;) {
       const r1 = pick(10, 100);
       const r2 = pick(10, 100);
       if (r2 <= r1) {
         continue;
       }
       const h1 = pick(1, 5);

       const t1 = pickTransport(chosen);
       const t2 = pickTransport(chosen);
       if (t1.speed_kph < r1 || t2.speed_kph < r2) {
         continue;
       }
       const v1 = t1.mode;
       const v2 = t2.mode;
       return Size('TimeMeet', 3, `${n1} starts out on a ${v1} at the rate of ${r1} km/h.
               ${h1} hours later, ${n2} drives a ${v2} along the same route at ${r2} km/h.
               In how much time will ${n2} overtake ${n1}?`);
     }
   }

   export const buildWorkTogetherTimeProblem = (chosen) => {
     for (;;) {
       const h1 = pick(1, 20);
       const h2 = pick(1, 20);
       if (h1 >= h2) {
         continue;
       }
       const n1 = pickName(chosen);
       const n2 = pickName(chosen);
       const j = pickJob(chosen);
       return Size('WorkTogetherTime', 2, `${n1} can ${j} in ${h1} hours.
               ${n2} can ${j} in ${h2} hours.
               How long does it take if they ${j} together?`);
     }
   }

   export const buildWorkApartTimeProblem = (chosen) => {
     for (;;) {
       const h1 = pick(1, 10);
       const h2 = pick(1, 10);
       if (h2 >= h1) {
         continue;
       }
       const n1 = pickName(chosen);
       const n2 = pickName(chosen);
       const j = pickJob(chosen);
       return Size('WorkApartTime', 2, `${n1} can ${j} in ${h1} hours alone.
               ${n1} and ${n2} can ${j} together in ${h2} hours.
               How long does it take if ${n2} works alone?`);
     }
   }

   export const buildAttendanceTicketProblem = (chosen) => {
     for (;;) {
       const cost1 = pick(1, 10);
       const cost2 = pick(1, 10);
       if (cost1 <= cost2) {
         continue;
       }
       const count1 = pick(1, 10);
       const count2 = count1 * 2;
       const totalCost = cost1 * count1 + cost2 * count2;
       switch (pick(2)) {
         case 0: {
           const target = chooseFromList(['adult', 'child']);
           return Size('TicketCost', 4,
                       `A concert sold ${count1 + count2} seats.
                        Adult tickets cost $${cost1} and child tickets cost $${cost2}.
                        If the concert received $${totalCost}, how many ${target} tickets were sold?`);
         }
         case 1: {
           const target = chooseFromList(['monkey', 'rabbit']);
           return Size('TicketCost', 4,
                       `A factory sold ${count1 + count2} toys.
                        Monkey toys cost $${cost1} and rabbit toys cost $${cost2}.
                        If the factory received $${totalCost}, how many ${target} toys were sold?`);
         }
       }
     }
   }

   export const buildTicketCostProblem = (chosen) => {
     for (;;) {
       const adultTicketCost = pick(1, 10);
       const studentTicketCost = pick(1, 10);
       if (adultTicketCost <= studentTicketCost) {
         continue;
       }
       const adultTicketCount = pick(1, 10);
       const studentTicketCount = adultTicketCount * 2;
       const totalCost = adultTicketCost * adultTicketCount + studentTicketCost * studentTicketCount;
       const target = chooseFromList(['student', 'adult']);
       return Size('TicketCost', 3,
                   `A concert received $${totalCost}.
                    Twice as many student tickets were sold as adult tickets.
                    Student tickets are $${studentTicketCost} and adult tickets are $${adultTicketCost}.
                    How many ${target} tickets were sold?`);
     }
   }

   export const buildCostBillCoinProblem = (chosen) => {
     const name = pickName(chosen);
     for (;;) {
       const billValue = chooseFromList([1000, 5000, 10000]);
       const coinValue = chooseFromList([10, 50, 100, 500]);
       const billCount = pick(1, 10);
       const coinCount = pick(1, 10);
       const cost = billCount * billValue + coinCount * coinValue;
       const target = chooseFromList(['bill', 'coin']);
       return Size('CostBillCoin', 2,
                   `${name} paid ₩${cost}, using ${billCount} equal bills and ${coinCount} equal coins.
                    What was the value of each ${target}?`);
     }
   }

   export const buildAttendanceProblem = (chosen) => {
     for (;;) {
       const g = pick(1, 100);
       const l = pick(1, 100);
       const b = g * 2 - l;
       if (b < 0) {
         continue;
       }
       return Size('Attendance', 3, `There are ${g + b} boys and girls. There are ${l} less than twice as many boys as girls. How many boys are there?`);
     }
   }

   export const buildLeverWeightProblem = () => {
     for (;;) {
       const d2 = pick(1, 11);
       if (d2 < 2) {
         continue;
       }
       const w1 = pick(1, 101);
       const d1 = pick(1, 11);
       const w2 = (w1 * d1) / d2;
       if (d1 === d2 || !Number.isInteger(w2)) {
         continue;
       }
       return Size('LeverWeight', 3, `${w1} kg balances ${d1} meters from the center of a lever against another weight ${d2} meters from the center. What is the other weight?`);
     }
   }

   export const buildLeverDistanceProblem = () => {
     for (;;) {
       const w1 = pick(1, 101);
       const d1 = pick(1, 11);
       const d2 = pick(1, 11);
       if (d1 >= d2) {
         continue;
       }
       const dd = d2 - d1;
       const w2 = (w1 * d1) / d2;
       if (!Number.isInteger(w2)) {
         continue;
       }
       const r = chooseFromList(['nearer to', 'further from']);
       if (r === 'nearer to' && w1 < w2) {
         continue;
       }
       if (r === 'further from' && w1 > w2) {
         continue;
       }
       return Size('LeverDistance', 2, `${w1} kg balances ${dd} meters ${r} the center than a ${w2} kg. How far from the center is the ${w2} kg weight?`);
     }
   }

   export const buildAgeProblem = (chosen) => {
     for (;;) {
       const a1 = pick(1, 20);
       for (let a2 = 1; a2 < a1; a2++) {
         const d1 = a1 - a2;
         let d2;
         for (let n = -a1; n < a1; n++) {
           if ((a1 - n) === (a2 - n) * 2) {
             d2 = n;
             break;
           }
         }
         if (d2 === undefined || d2 === 0) {
           continue;
         }
         const n1 = pickName(chosen);
         const n2 = pickName(chosen);
         if (d2 > 0) {
           return Size('Age', 3, `${n1} is ${d1} years older than ${n2}.
                   ${d2} years ago, ${n1} was twice as old as ${n2}.
                   How old is each now?`);
         } else {
           return Size('Age', 3, `${n1} is ${d1} years older than ${n2}.
                   In ${-d2} years, ${n1} will be twice as old as ${n2}.
                   How old is each now?`);
         }
       }
     }
   }

   export const buildProportionProblem = (chosen) => {
     for (;;) {
       const n1 = pick(2, 101);
       const n2 = n1 * pick(2, 10);
       const c1 = pick(1, 101);
       if (n1 === n2) {
         continue;
       }
       const t1 = pickThings(chosen);
       switch (pick(4)) {
         case 0:
           return Size('Proportion', 1, `${n1} ${t1} cost ${c1} cents. How much would ${n2} ${t1} cost?`);
         case 1:
           return Size('Proportion', 1, `${n1} ${t1} weigh ${c1} kg. How much would ${n2} ${t1} weigh?`);
         case 2:
           return Size('Proportion', 1, `${n1} ${t1} stack ${c1} meters tall. How tall would ${n2} ${t1} stack?`);
         case 3:
           return Size('Proportion', 1, `${n1} ${t1} fill ${c1} boxes. How many boxes would ${n2} ${t1} fill?`);
       }
     }
   }

   export const buildPerimeterSideProblem = () => {
     const n = pick(10, 101);
     return Size('PerimeterSide', 2, `The perimeter of an equilateral triangle is ${n} cm longer than the length of one side. Find the length of the side.`);
   }

   export const buildPerimeterDimensionsProblem = () => {
     for (;;) {
       const l = pick(1, 101);
       const d = pick(1, 11);
       const m = pick(2, 6);
       // l = w * m - d;
       const w = (l + d) / m;
       const p = l * 2 + w * 2;
       if (!Number.isInteger(p)) {
         continue;
       }
       return Size('PerimeterDimensions', 3, `The length of a rectangle is ${d} cm less than ${m} times its width. If the perimeter is ${p} cm, what are the dimensions of the rectangle?`);
     }
   }

   export const buildAngleProblem = () => {
     const a = pick(2, 5);
     const b = pick(2, 5);
     return Size('Angle', 3, `Angle A is ${a} times angle B. Angle B is ${b} times angle C. Given triangle ABC, what are A, B, and C?`);
   }

   export const buildSideAreaDimensionsProblem = () => {
     const n = pick(2, 10);
     const w = pick(1, 20);
     const a = w * (w * n);
     return Size('SideAreaDimensions', 3, `A rectangle is 4 times longer than its width. The area is ${a} cm<sup>2</sup>. Find the length and width.`);
   };

   export const buildTrainCarsRationalProblem = () => {
     for (;;) {
       const c = pick(2, 10);
       const n = pick(1, 20);
       const d = pick(1, 20);
       if (n > d) {
         continue;
       }
       return Size('TrainCarsRational', 3, `${c} cars is ${Rational(n, d)} of a train. How many cars does the train have?`);
     }
   };

   export const buildCutProblem = (chosen) => {
     const n = pickName(chosen);
     for (;;) {
       const m = pick(2, 20);
       const p1 = pick(2, 20);
       const p2 = pick(2, 20);
       if (p1 === p2) {
         continue;
       }
       if (!Number.isInteger(m / (p1 - 1)) || m == (p1 - 1)) {
         continue;
       }
       return Size('Cut', 2, `It takes ${n} ${m} minutes to cut a board into ${p1} pieces. How long would they take to cut a board into ${p2} pieces?`);
     }
   };

   export const buildTravelTimeBetweenCitiesProblem = (chosen) => {
     for (;;) {
       const s = pick(1, 300);
       const t1 = pickTransport(chosen);
       if (t1.speed_kph < s) {
         continue;
       }
       const v = t1.mode;
       const t = pick(2, 10);
       const d = s * t;
       const c = pickCityPair(chosen);
       if (c.distance_km < d * 0.9 || c.distance_km > d * 1.1) {
         continue;
       }
       const n1 = c.cities[0];
       const n2 = c.cities[1];
       return Size('TravelTimeBetweenCities', 2, `I travel ${d} km from ${n1} to ${n2} by ${v} at ${s} ${Rational('km', 'h')}. How long will it take to arrive?`);
     }
   }

   export const buildTravelDistanceBetweenCitiesProblem = (chosen) => {
     for (;;) {
       const s = pick(1, 300);
       const t1 = pickTransport(chosen);
       if (t1.speed_kph < s) {
         continue;
       }
       const v = t1.mode;
       const t = pick(2, 10);
       const d = s * t;
       const c = pickCityPair(chosen);
       if (c.distance_km < d * 0.9 || c.distance_km > d * 1.1) {
         continue;
       }
       const n1 = c.cities[0];
       const n2 = c.cities[1];
       switch (pick(2)) {
         case 0: return Size('TravelDistanceBetweenCities', 2, `I travel ${t} hours from ${n1} to ${n2} by ${v} at ${s} ${Rational('km', 'h')}. How far apart are the cities?`);
         case 0: return Size('TravelDistanceBetweenCities', 2, `A cyclist is participating in a race from ${n1} to ${n2}. If she travels at an average speed of ${s} kilometers per hour and the race takes ${t} hours to complete, what is the total distance of the race?`);
       }
     }
   }

   export const buildVehicleFuelDistanceProblem = (chosen) => {
     const f = pickFuel(chosen);
     for (;;) {
       const s = pick(1, 100);
       const t1 = pickTransport(chosen);
       if (t1.speed_kph < s) {
         continue;
       }
       const v = t1.mode;
       const t = pick(2, 20);
       const a1 = pick(2, 10);
       const a2 = pick(2, 10);
       if (t < a1 || t < a2) {
         continue;
       }
       if (a1 == a2) {
         continue;
       }
       const d = s * a1;
       return Size('VehicleFuelDistance', 2, `I can travel ${d} km by ${v} by using ${a1} ${f}. How far can I go using ${a2} ${f}?`);
     }
   }

   export const buildCoinProblem = (chosen) => {
     const n = pickName(chosen);
     for (;;) {
       const p1 = pick(2, 20);
       const p2 = pick(2, 20);
       if (p1 <= p2) {
         continue;
       }
       const c = 100 / (p1 - p2);
       if (!Number.isInteger(c)) {
         continue;
       }
       return Size('Coin', 3, `${n} has ${p1} coins of the same kind. The coins have the same value as one dollar and ${p2} coins. What is the coin?`);
     }
   };

   export const buildCakeSliceProblem = (chosen) => {
     const l = pickMaterial(chosen);
     const c = pickContainer(chosen);
     for (;;) {
       const n = pick(1, 11);
       const d = pick(1, 11);
       if (n >= d) {
         continue;
       }
       const n2 = pick(1, 11);
       const d2 = pick(1, 11);
       if (n2 >= d2) {
         continue;
       }
       return Size('CakeSlice', 2, `A ${Rational(n, d)} slice of a cake is cut out, then a ${Rational(n2, d2)} slice of that slice is cut out. How much of the cake is that slice?`);
     }
   };

   export const buildBallProblem = (chosen) => {
     const color = pickColor(chosen);
     for (;;) {
       const n = pick(1, 10);
       const b = pick(1, 10);
       const c = pick(1, 10);
       if (b >= n || c >= b) {
         continue;
       }
       return Size('Ball', 3, `There is a bag with ${n} marbles in it. ${b} of the marbles are ${color}. What is the chance of picking ${c} ${color} marbles in a row?`);
     }
   }

   export const buildDiceProblem = (chosen) => {
     const color = pickColor(chosen);
     for (;;) {
       const die = pick(1, 8);
       const pickDicePositive = () => {
         switch (pick(0, 4)) {
           case 0: return 'rolling an odd number';
           case 1: return 'rolling an even number';
           case 2: return `rolling a ${pick(1, die + 1)}`;
           case 3: {
             for (;;) {
               const a = pick(1, 7);
               const b = pick(1, 7);
               if (a === b) {
                 continue;
               }
               return `rolling ${a} or ${b}`;
             }
           }
         }
       };
       const pickDiceNegative = () => {
         switch (pick(0, 4)) {
           case 0: return 'not rolling an odd number';
           case 1: return 'not rolling an even number';
           case 2: return `not rolling a ${pick(1, die + 1)}`;
           case 3: {
             for (;;) {
               const a = pick(1, 7);
               const b = pick(1, 7);
               if (a === b) {
                 continue;
               }
               return `not rolling ${a} or ${b}`;
             }
           }
         }
       };
       const pickDice = () => {
         switch (pick(0, 2)) {
           case 0: return pickDicePositive();
           case 1: return pickDiceNegative();
         }
       };
       const a = pickDice();
       const b = pickDice();
       return Size('Dice', 2, `What is the probability of ${a} then ${b} with ${die} sided dice?`);
     }
   }

   export const buildDiceProbabilityProblem = (chosen) => {
     const d = pick(2, 10);
     const n = pick(2, 13);
     const r = chooseFromList(['two', 'three']);
     return Size('DiceProbability', 3, `What is the probability of rolling a total of ${n} with ${r} ${d} sided dice?`);
   };

   export const buildReorderingProblem = (chosen) => {
     const color = pickColor(chosen);
     for (;;) {
       const a = pick(3, 20);
       const b = pick(3, 20);
       const c = pick(3, 20);
       if (a === b || a === c || b === c) {
         continue;
       }
       if (!isInteger(a / c)) {
         continue;
       }
       return Size('Reordering', 1, `${a} ${kTimes} ${b} ${kDivide} ${c}`);
     }
   }

   export const buildExpansionProblem = (chosen) => {
     const color = pickColor(chosen);
     for (;;) {
       const f = chooseFromList(['d', pick(3, 20)]);
       const a = chooseFromList(['a', pick(3, 20)]);
       const b = chooseFromList(['b', pick(3, 20)]);
       const c = chooseFromList(['c', pick(3, 20)]);
       const o = chooseFromList([kPlus, kMinus]);
       const o2 = chooseFromList([kPlus, kMinus]);
       return Size('Expansion', 1, `${c} ${o2} ${f}(${a} ${o} ${b})`);
     }
   }

   export const choose = (choices, chosen = new Map()) => {
     let total = 0;
     for (const { value, weight = 1, limit = 1 } of choices) {
       if (chosen.get(value) >= limit) {
         continue;
       }
       total += weight;
     }
     let choice = pick(total);
     for (const { weight = 1, value, limit = 1 } of choices) {
       const count = chosen.get(value) || 0;
       console.log(`choose: value=${value} count=${count} limit=${limit} weight=${weight}`);
       if (count >= limit) {
         console.log(`choose: count=${count} exceeds limit=${limit}`);
         continue;
       }
       if (weight >= choice) {
         console.log(`choose: select`);
         chosen.set(value, count + 1);
         console.log(`QQ/choose: ${value}`);
         return value;
       }
       choice -= weight;
       console.log(`choose: next choice=${choice}`);
     }
     throw Error('Choose failed to make a choice');
   };

const computeTriangleArea = ([x1, y1], [x2, y2], [x3, y3]) => {
  return 0.5 * Math.abs(
    x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)
  );
};

const computeLength = ([x1, y1], [x2, y2]) => Math.sqrt(Math.pow(Math.abs(x1 - x2), 1) + Math.pow(Math.abs(y1 - y2), 2));

const computeAngle = (p1, p2, p3) => {
  // Calculate the vectors representing two sides of the triangle
  const vectorAB = [p2[0] - p1[0], p2[1] - p1[1]];
  const vectorBC = [p3[0] - p2[0], p3[1] - p2[1]];

  // Calculate the dot product of the vectors
  const dotProduct = vectorAB[0] * vectorBC[0] + vectorAB[1] * vectorBC[1];

  // Calculate the magnitudes of the vectors
  const magnitudeAB = Math.sqrt(vectorAB[0] * vectorAB[0] + vectorAB[1] * vectorAB[1]);
  const magnitudeBC = Math.sqrt(vectorBC[0] * vectorBC[0] + vectorBC[1] * vectorBC[1]);

  // Calculate the cosine of the angle
  const cosAngle = dotProduct / (magnitudeAB * magnitudeBC);

  // Calculate the angle (in radians)
  let angle = Math.acos(cosAngle);

  // Convert angle from radians to degrees if desired
  angle = angle * 180 / Math.PI;

  return 180 - angle;
};

const findCenter = ([p1x, p1y], [p2x, p2y], [p3x, p3y], a, b, c) => {
  const perimeter = a + b + c;
  const x = (a * p1x + b * p2x + c * p3x) / perimeter;
  const y = (a * p1y + b * p2y + c * p3y) / perimeter;
  return [x, y];
};

const lerp = (start, end, amount) => (1 - amount) * start + amount * end;

const lerp2 = ([x1, y1], [x2, y2], amount) => [lerp(x1, x2, amount), lerp(y1, y2, amount)];

const findLineIntersection = ([[x1, y1], [x2, y2]], [[x3, y3], [x4, y4]]) => {
  // Calculate denominators and determinants
  const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  const uaNumerator = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3));
  const ubNumerator = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3));

  // Check for special cases
  if (denominator === 0) {
    // Parallel lines:
    return null;
  }

  const ua = uaNumerator / denominator;
  const ub = ubNumerator / denominator;

  // Calculate intersection coordinates
  const x = x1 + ua * (x2 - x1);
  const y = y1 + ua * (y2 - y1);

  return [x, y];
};

const createLabel = ([x, y], id) => {
  const d = `<text x=${x} y=${y} dominant-baseline="middle" text-anchor="middle" style="stroke-width:2px;stroke:white;paint-order:stroke;fill:black">${id}</text>`;
  return d;
}

const createCorner = (p1, p2, p3, id) => createLabel(p2, id);

const createTriangle = (a, b, c, id, getRadius) => {
  return `
    <path d="M ${a[0]} ${a[1]} L ${b[0]} ${b[1]} L ${c[0]} ${c[1]} Z" style="stroke:black;stroke-width:1;fill:none"/>
    ${createCorner(a, b, c, id[1])}
    ${createCorner(b, c, a, id[2])}
    ${createCorner(c, a, b, id[0])}
    `;
}

export const buildTriangleTwoProblem = () => {
  for (;;) {
    const a = [pick(20, 180), pick(20, 180)];
    const b = [pick(20, 180), pick(20, 180)];
    const c = [pick(20, 180), pick(20, 180)];
    const d = lerp2(b, c, Math.random());
    if (d[0] < 20 || d[0] > 180 || d[1] < 20 || d[1] > 180) {
      continue;
    }
    const area1 = computeTriangleArea(a, b, c);
    const area2 = computeTriangleArea(a, b, d);
    if (area1 < 5000 || area2 < 5000) {
      continue;
    }
    let hasGoodSeparation = (() => {
      for (const p1 of [a, b, c, d]) {
        for (const p2 of [a, b, c, d]) {
          if (p1 === p2) {
            continue;
          }
          if (computeLength(p1, p2) < 40) {
            return false;
          }
        }
      }
      return true;
    })();
    if (!hasGoodSeparation) {
      continue;
    }
    let info = [];
    const addInfo = (text) => {
      info.push(`<text x=200 y=${(info.length + 1) * 20}>${text}</text>`);
    }
    switch (pick(2)) {
      case 0:
        addInfo(`ACD = ${computeAngle(a, c, d).toFixed(0)}`);
        addInfo(`ABD = `);
        addInfo(`DAB = ${computeAngle(d, a, b).toFixed(0)}`);
        addInfo(`DAC = ${computeAngle(d, a, c).toFixed(0)}`);
        break;
      case 1:
        addInfo(`ADB = ${computeAngle(a, d, b).toFixed(0)}`);
        addInfo(`ADC = `);
        addInfo(`CAB = ${computeAngle(c, a, b).toFixed(0)}`);
        break;
    }
    return Size('TriangleTwo', 3, `
      <svg width="300" height="180" xmlns="http://www.w3.org/2000/svg">
       ${createTriangle(a, b, c, 'ABC')}
       ${createTriangle(a, b, d, 'ABD')}
       ${createTriangle(a, c, d, 'ACD')}
       ${info.join('\n')}
      </svg>
      `);
  }
};

export const buildTriangleKiteProblem = () => {
  for (;;) {
    const a = [pick(20, 80), pick(20, 80)];
    const b = [pick(20, 80), pick(120, 180)];
    const c = [pick(120, 180), pick(120, 180)];
    const d = [pick(120, 180), pick(20, 80)];
    const e = findLineIntersection([a, c], [b, d]);
    if (e === null) {
      continue;
    }
    if (computeTriangleArea(a, b, e) < 1000 ||
        computeTriangleArea(b, c, e) < 1000 ||
        computeTriangleArea(c, d, e) < 1000 ||
        computeTriangleArea(d, a, e) < 1000) {
      continue;
    }
    let hasGoodSeparation = (() => {
      for (const p1 of [a, b, c, d]) {
        for (const p2 of [a, b, c, d]) {
          if (p1 === p2) {
            continue;
          }
          if (computeLength(p1, p2) < 40) {
            return false;
          }
        }
      }
      return true;
    })();
    if (!hasGoodSeparation) {
      continue;
    }
    let info = [];
    const addInfo = (text) => {
      info.push(`<text x=200 y=${(info.length + 1) * 20}>${text}</text>`);
    }
    switch (pick(1)) {
      case 0:
        addInfo(`ACD = ${computeAngle(a, c, d).toFixed(0)}`);
        addInfo(`ADE = ${computeAngle(a, d, e).toFixed(0)}`);
        addInfo(`AEB = `);
        addInfo(`CAD = ${computeAngle(c, a, d).toFixed(0)}`);
        addInfo(`AC and BD cross at E`);
        break;
    }
    return Size('TriangleKite', 3, `
      <svg width="350" height="190" xmlns="http://www.w3.org/2000/svg">
       ${createTriangle(a, b, e, 'ABE')}
       ${createTriangle(b, c, e, 'BCE')}
       ${createTriangle(c, d, e, 'CDE')}
       ${createTriangle(d, a, e, 'DAE')}
       ${info.join('\n')}
      </svg>
      `);
  }
}

export const buildTriangleHypotenuseProblem = (chosen) => {
  for (;;) {
    const a = pick(1, 10);
    const b = pick(1, 10);
    const c = Math.sqrt(a * a + b * b);
    return Size('TriangleHypotenuse', 2, `
      <svg width="350" height="80" xmlns="http://www.w3.org/2000/svg">
       <g transform="translate(10, 10)">
         ${createTriangle([0, 40 - (a * 5)], [0, 40], [b * 10, 40], 'ABC')}
         ${createLabel([200, 10], `AB = ${a}`)}
         ${createLabel([200, 30], `BC = ${b}`)}
         ${createLabel([200, 50], `AC =  `)}
       </g>
      </svg>
      `);
  }
};

export const buildRectangleAreaProblem = () => {
  for (;;) {
    const l1 = pick(60, 180);
    const l2 = pick(20, l1 - 10);
    const w1 = pick(60, 140);
    const w2 = pick(20, w1 - 10);
    if (l2 + 10 >= l1) continue;
    if (w2 + 10 >= w1) continue;
    return Size('RectangleArea', 3, `
      <svg width="400" height="180" fill="none" stroke="black" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(10, 10)">
          <path d="M 0 0
                   L ${l1 - l2} 0
                   L ${l1 - l2} ${w2}
                   L ${l1} ${w2}
                   L ${l1} ${w1}
                   L 0 ${w1}
                   Z"/>
          ${createLabel([l1 - l2, 0], 'A')}
          ${createLabel([l1 - l2, w2], 'B')}
          ${createLabel([l1, w2], 'C')}
          ${createLabel([l1, w1], 'D')}
          ${createLabel([0, w1], 'E')}
          ${createLabel([0, 0], 'F')}
          ${createLabel([200, 20], `AB = ${w2}`)}; // yes
          ${createLabel([200, 40], `AF = ${l1 - l2}`)}; // yes
          ${createLabel([200, 60], `BC = ${l2}`)}; // yes
          ${createLabel([200, 80], `CD = ${w1 - w2}`)}; // yes
        </g>
      </svg>
      `);
  }
};

export const buildRectangleAreaTriangleProblem = () => {
  for (;;) {
    const l1 = pick(60, 180);
    const l2 = pick(20, l1 - 10);
    const w1 = pick(60, 140);
    const w2 = pick(20, w1 - 10);
    if (l2 + 10 >= l1) continue;
    if (w2 + 10 >= w1) continue;
    return Size('RectangleAreaTriangle', 3, `
      <svg width="250" height="180" fill="none" stroke="black" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(10, 10)">
          <path d="M 0 0
                   L ${l1 - l2} 0
                   L ${l1} ${w2}
                   L ${l1} ${w1}
                   L 0 ${w1}
                   Z"/>
          ${createLabel([l1 - l2, 0], 'A')}
          ${createLabel([l1, w2], 'C')}
          ${createLabel([l1, w1], 'D')}
          ${createLabel([0, w1], 'E')}
          ${createLabel([0, 0], 'F')}
          ${createLabel([200, 20], `CD = ${w1 - w2}`)};
          ${createLabel([200, 40], `ED = ${l1}`)};
          ${createLabel([200, 60], `FA = ${l1 - l2}`)};
          ${createLabel([200, 80], `FE = ${w1}`)};
        </g>
      </svg>
      `);
  }
};

export const buildLinePointsProblem = () => {
  for (;;) {
    const a = [pick(1, 8), pick(1, 8)];
    const b = [pick(1, 8), pick(1, 8)];
    if (a[0] === b[0] || a[1] === b[1]) {
      continue;
    }
    const X = (x) => x * 20 + 20;
    const Y = (y) => 180 - (y * 20 + 20);
    const grid = [];
    for (let x = 0; x < 8; x++) {
      grid.push(`<path stroke="black" d="M ${X(x)} ${Y(0)} L ${X(x)} ${Y(7)}"/>`);
    }
    for (let y = 0; y < 8; y++) {
      grid.push(`<path stroke="black" d="M ${X(0)} ${Y(y)} L ${X(7)} ${Y(y)}"/>`);
    }
    return Size('LinePoints', 3, `
      <svg width="300" height="180" xmlns="http://www.w3.org/2000/svg">
       ${grid}
       ${createLabel([X(a[0]), Y(a[1])], 'A')}
       ${createLabel([X(b[0]), Y(b[1])], 'B')}
       <text x=180 y=20>A = (${a[0]}, ${a[1]})</text>
       <text x=180 y=40>B = (${b[0]}, ${b[1]})</text>
       <text x=180 y=60>식=</text>
      </svg>
      `);
  }
};

export const buildLineEquationProblem = () => {
  for (;;) {
    const a = [pick(1, 8), pick(1, 8)];
    const b = [pick(1, 8), pick(1, 8)];
    if (a[0] === b[0] || a[1] === b[1]) {
      continue;
    }
    const X = (x) => x * 20 + 20;
    const Y = (y) => 180 - (y * 20 + 20);
    const grid = [];
    for (let x = 0; x < 8; x++) {
      grid.push(`<path stroke="black" d="M ${X(x)} ${Y(0)} L ${X(x)} ${Y(7)}"/>`);
    }
    for (let y = 0; y < 8; y++) {
      grid.push(`<path stroke="black" d="M ${X(0)} ${Y(y)} L ${X(7)} ${Y(y)}"/>`);
    }
    const mN = b[1] - a[1];
    const mD = b[0] - a[0];
    const sign = (mN < 0 && mD < 0) || (mN >= 0 && mD >= 0) ? '' : '-';
    const q = pick(-4, 5);
    return Size('LineEquation', 3, `
      <svg width="300" height="180" xmlns="http://www.w3.org/2000/svg">
       ${grid}
       <text x=180 y=20>식: y=${sign}(${Math.abs(mN)}/${Math.abs(mD)})x+${q}</text>
      </svg>
      `);
  }
};

export const buildIntersectionOverlapProblem = () => {
  for (;;) {
    const a = pick(0, 200);
    const b = pick(0, 200);
    const c = pick(0, 200);
    const d = pick(0, 200);
    if (a + 20 > b || b + 20 > c || c + 20 > d) {
      continue;
    }
    return Size('IntersectionOverlap', 2, `
      <svg width="300" height="90" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(10, 10)">
          <path stroke="black" d="M ${a} 0 L ${d} 0"/>
          ${createLabel([a, 0], 'a')}
          ${createLabel([b, 0], 'b')}
          ${createLabel([c, 0], 'c')}
          ${createLabel([d, 0], 'd')}
          <text x=0 y=20>ac = ${c - a}</text>
          <text x=100 y=20>bd = ${d - b}</text>
          <text x=200 y=20>ad = ${d - a}</text>
          <text x=0 y=40>bc =</text>
        </g>
      </svg>
      `);
  }
}

export const buildVocabProblem = (chosen) => {
  const vocab = [];
  const words = [...gradeWords.grade4, ...gradeWords.grade5];
  for (let nth = 0; nth < 4; nth++) {
    vocab.push(chooseFromList(words, chosen));
  }
  const cells = [];
  for (const word of vocab) {
    cells.push(`<td style="text-align: center; vertical-align: top; width: 25%">${word}</td>`);
  }
  return Size('Vocab', 1, `<table style="border: thin solid; width: 100%">
           <tr style="height: 100%; outline: thin solid; margin: 10px">
            ${cells.join('\n')}
           </tr>
          </table>`);
};

export const buildHanjaProblem = (chosen) => {
  const entries = [];
  for (let nth = 0; nth < 4; nth++) {
    const [character, note] = choose(hanja, chosen);
    entries.push({ character, note });
  }
  const keys = new Set();
  for (const { note } of entries) {
    for (const letter of note) {
      keys.add(letter);
    }
  }
  const indices = new Map();
  let nth = 0;
  const codes = [];
  for (const letter of shuffle([...keys])) {
    indices.set(letter, nth++);
    codes.push(letter);
  }
  const obfuscate = (note) => note.split('').map(letter => indices.get(letter)).join(',');
  const cells = [];
  for (const { character, note } of entries) {
    cells.push(`<td style="text-align: center; vertical-align: top; width: 25%">${character}<br>${obfuscate(note)}</td>`);
  }
  return Size('Hanja', 1,
              `<table style="width: 100%">
                <tr>
                 ${cells.join('\n')}
                </tr>
                <tr>
                 <td colspan=4><center>${codes.join(',')}</center></td>
                </tr>
               </table>`);
};

export const buildSubtractionWithCarryCascade = () => {
  for (;;) {
    const a = [pick(10), 0, pick(10)];
    const b = [pick(10), pick(10), pick(10)];
    if (a[0] < b[0] || a[2] >= b[2]) {
      continue;
    }

    return Size('SubtractionWithCarryCascade', 1, `${a[0]}${a[1]}${a[2]} ${kMinus} ${b[0]}${b[1]}${b[2]} = ${kAnswer}`);
  }
};

export const buildSequenceProblem = () => {
  switch (pick(3)) {
    case 0: {
      for (;;) {
        const start = pick(0, 100);
        const delta = pick(-21, 21);
        if (delta === 0) {
          continue;
        }
        const limit = pick(3, 10);
        const samples = [];
        for (let nth = 0; nth < limit; nth++) {
          samples.push(start + delta * nth);
        }
        return Size('Sequence', 1, `${samples.join(', ')}`);
      }
    }
    case 1: {
      for (;;) {
        const start = pick(0, 100);
        const acceleration = pick(-21, 21);
        if (acceleration === 0) {
          continue;
        }
        const limit = pick(3, 10);
        const samples = [];
        let delta = 0;
        for (let nth = 0; nth < limit; nth++) {
          delta += acceleration;
          samples.push(start + delta);
        }
        return Size('Sequence', 1, `${samples.join(', ')}`);
      }
    }
    case 2: {
      for (;;) {
        const start = pick(0, 100);
        const limit = pick(3, 10);
        const samples = [];
        for (let nth = 1; nth <= limit; nth++) {
          const value = start / nth;
          samples.push(start / nth);
        }
        if (!samples.every(v => v !== 0 && isInteger(v))) {
          continue;
        }
        return Size('Sequence', 1, `${samples.join(', ')}`);
      }
    }
    case 3: {
      for (;;) {
        const start = pick(0, 100);
        const limit = pick(3, 10);
        const samples = [];
        for (let nth = 1; nth <= limit; nth++) {
          samples.push(start + nth * nth);
        }
        if (!samples.every(v => v < 100)) {
          continue;
        }
        return Size('Sequence', 1, `${samples.join(', ')}`);
      }
    }
  }
}

const reverse = (s) => s.split('').reverse().join('');

export const buildGapSentenceProblem = (chosen) => {
  for (;;) {
    const { level, sentence } = chooseFromList(gapSentences, chosen);
    return Size('GapSentence', 1, sentence);
  }
};

export const buildAlgebra2WordProblem = (chosen) => {
  for (;;) {
    const { problem } = chooseFromList(wordProblems, chosen);
    const length = problem.length;
    if (length < 300) {
      return Size(`Algebra2Word`, 2, `<p style="font-size: 1em">${problem}</p>`);
    } else {
      return Size(`Algebra2Word`, 2, `<p style="font-size: 0.5em">${problem}</p>`);
    }
  }
};

export const buildProbabilityProblem = (chosen) => {
  for (;;) {
    const { problem } = chooseFromList(probabilityProblems, chosen);
    return Size('Probability', 2, problem);
  }
};

export const buildGeometryProblem = (chosen) => {
  for (;;) {
    const { problem } = chooseFromList(geometryProblems, chosen);
    return Size('Geometry', 2, problem);
  }
};

export const buildSummaryProblem = (chosen) => {
  for (;;) {
    const { paragraphs } = chooseFromList(summaryProblems, chosen);
    let length = 0;
    for (const paragraph of paragraphs) {
      length += paragraph.length;
    }
    if (length < 600) {
      return Size(`Summary`, 3, paragraphs.map((p) => `<p style="font-size: 1em;">${p}</p>`).join('\n'));
    } else if (length < 1400) {
      return Size(`Summary`, 4, paragraphs.map((p) => `<p style="font-size: 0.6em;">${p}</p>`).join('\n'));
    } else {
      return Size(`Summary`, 4, paragraphs.map((p) => `<p style="font-size: 0.5em;">${p}</p>`).join('\n'));
    }
  }
};

export const buildSentencePromptProblem = (chosen, count = 3, promptWeight = 200, emotivePromptWeight = 10) => {
  const vocab = [];
  for (let i = 0; i < count; i++) {
    const choice = choose([
      { value: buildPromptWord, weight: promptWeight, limit: Infinity },
      { value: buildThirdGradePromptWord, weight: promptWeight, limit: Infinity },
      { value: buildFourthGradePromptWord, weight: promptWeight, limit: Infinity },
      { value: buildEmotivePromptWord, weight: emotivePromptWeight, limit: Infinity },
    ], chosen);
    vocab.push(choice(chosen));
  }

  return Size('SentencePrompt', 2,
    `<div>
       <span style="text-align: right">${vocab.join(', ')}</span>
     </div>`);
};
