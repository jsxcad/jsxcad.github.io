export const chooseFromList = (list, chosen = new Map(), { limit } = {}) => {
  const choices = list.map(value => {
    if (value instanceof Function) {
      return { value, weight: 5, limit };
    } else if (value instanceof Object) {
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
  { "word": "accomplish", "sentence": "With hard work and dedication, she was able to _________ a great deal this year." },
  { "word": "adaptation", "sentence": "The lizard's _________ to its desert environment included developing water-conserving features." },
  { "word": "approached", "sentence": "He cautiously _________ the stray dog, offering it a piece of food." },
  { "word": "argued", "sentence": "The siblings _________ for hours about who would get to use the new game first." },
  { "word": "automatically", sentence: "Sensor lights _________ turn on when it gets dark to save energy." },
  { "word": "avoid", "sentence": "We need to _________ making the same mistakes in the future." },
  { "word": "border", "sentence": "The country increased security patrols along its _________ to prevent illegal crossings." },
  { "word": "calculate", "sentence": "The engineer will carefully _________ the amount of materials needed to build the bridge." },
  { "word": "cause", "sentence": "The heavy rain was the _________ of the flooding in the streets." },
  { "word": "circular", "sentence": "We ended up in a _________ argument, repeating the same points over and over again." },
  { "word": "compare", "sentence": "The scientist decided to _________ the results of the two experiments to see if there were any similarities. "},
  { "word": "concluding", "sentence": "The book's _________ chapter offered a satisfying resolution to the story." },
  { "word": "confirm",  "sentence": "Could you please _________ whether you'll be attending the event?" },
  { "word": "contrast", "sentence": "The _________ between the two cities, one modern and one ancient, was fascinating." },
  { "word": "convince", "sentence": "The lawyer worked hard to _________ the jury of her client's innocence." },
  { "word": "critical", "sentence": "Providing _________ feedback is essential for the team's growth." },
  { "word": "decrease", "sentence": "There has been a significant _________ in crime rates in the city this year." },
  { "word": "defend", "sentence": "The soldiers were prepared to _________ their territory from attack." },
  { "word": "demonstrate", "sentence": "The instructor will _________ how to use the software during the training session." },
  { "word": "describe", "sentence": "The witness was asked to _________ the attacker in as much detail as possible." },
  { "word": "detail", "sentence": "The detective paid close attention to every _________ of the crime scene." },
  { "word": "develop", "sentence": "The team worked together to _________ a new marketing strategy." },
  { "word": "difference", "sentence": "The main _________ between the two products was their price." },
  { "word": "disappointed", "sentence": "The fans were _________ when the concert was canceled." },
  { "word": "distribute", "sentence": "The organization plans to _________ food and supplies to those affected by the disaster." },
  { "word": "effective", "sentence": "The new medicine proved to be highly _________ in treating the disease." },
  { "word": "eliminate", "sentence": "The goal of the project was to _________ unnecessary expenses from the budget." },
  { "word": "entire", "sentence": "The _________ town gathered to celebrate the annual festival." },
  { "word": "essential", "sentence": "It is _________ to get enough sleep for good health." },
  { "word": "estimate", "sentence": "The contractor provided a rough _________ of the costs for the renovation project." },
  { "word": "evidence", "sentence": "The police collected fingerprints as _________ at the crime scene." },
  { "word": "example", "sentence": "The teacher used a real-world _________ to illustrate the concept." },
  { "word": "except", "sentence": "Everyone was invited to the party _________ for my brother." },
  { "word": "exclaimed", "sentence": "The child _________ with joy when she saw the puppy." },
  { "word": "experiment", "sentence": "The scientist conducted a controlled _________ to test his hypothesis."},
  { "word": "flexible", "sentence": "The gymnast's _________ body allowed her to perform complex routines." },
  { "word": "fortunate", "sentence": "We were _________ to find a parking spot right in front of the restaurant." },
  { "word": "frequent", "sentence": "Headaches had become a _________ occurrence for her." },
  { "word": "furious", "sentence": "The customer was _________ when the product arrived broken." },
  { "word": "increasing", "sentence": "The company is facing _________ pressure to reduce costs." },
  { "word": "infer", "sentence": "From the footprints, we were able to _________  that the suspect was running." },
  { "word": "inform", "sentence": "Please _________  me of any changes to the schedule." },
  { "word": "insert", "sentence": "The editor asked the writer to _________ a few more examples into the article." },
  { "word": "maximum", "sentence": "The _________ speed limit  on the highway was 100 kilometers per hour." },
  { "word": "minimum", "sentence": "There is a _________ order quantity of 10 items for this discount." },
  { "word": "observe", "sentence": "The astronomer used a telescope to _________ the stars." },
  { "word": "organized", "sentence": "Her desk was always neatly _________ with everything in its place." },
  { "word": "obvious", "sentence": "It was _________ from his reaction that he was surprised by the news." },
  { "word": "passage", "sentence": "The author read a moving _________ from her new book." },
  { "word": "persuade", "sentence": "The salesperson's excellent pitch managed to _________ the customer to buy the product." },
  { "word": "predict", "sentence": "The weather forecast does _________ rain for tomorrow." },
  { "word": "prefer", "sentence": "I _________ coffee over tea in the morning." },
  { "word": "previous", "sentence": "This is a significant improvement over our _________ attempt." },
  { "word": "purpose", "sentence": "The _________ of this meeting is to discuss the project timeline." },
  { "word": "prediction", "sentence": "Her _________ of winning the competition turned out to be accurate." },
  { "word": "rarely", "sentence": "We _________ see snow in this part of the country." },
  { "word": "reason", "sentence": "What is the _________ for your decision to change careers?" }, 
  { "word": "recognize", "sentence": "Do you _________ this person in the picture?" },
  { "word": "recommend", "sentence": "The doctor will _________ a healthy diet and exercise for weight loss." },
  { "word": "represent", "sentence": "The blue dot on the map will _________ our current location." },
  { "word": "result", "sentence": "The experiment yielded an unexpected _________." },
  { "word": "scarce", "sentence": "Due to the drought, clean water became a _________ resource." },
  { "word": "select", "sentence": "Please _________ your preferred date for the appointment." },
  { "word": "separate", "sentence": "The recycling plant has bins to _________  glass, plastic, and paper." },
  { "word": "simplify", "sentence": "Can you _________ the instructions so they are easier to understand?" },
  { "word": "summarize", "sentence": "The speaker asked the student to _________ the main points of the article." },
  { "word": "surround", "sentence": "The garden did _________ the old house." },
  { "word": "support", "sentence": "The group offered their _________ to the new project manager." },
  { "word": "temporary", "sentence": "The road closure is only _________ while repairs are being made." },
  { "word": "threatens", "sentence": "The invasive species _________ the balance of the local ecosystem." },
  { "word": "tradition", "sentence": "Baking cookies for the holidays is a long-standing family _________." },
  { "word": "typical", "sentence": "Getting stuck in traffic on the way to work is a _________ occurrence for many commuters." },
  { "word": "usually", "sentence": "I _________ have cereal for breakfast, but sometimes I make eggs." }
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
       return Size('DistanceTime', 3, `A ${v1} traveling at ${r1} km/h and a ${v2} at ${r2} km/h leave in opposite directions.
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
       return Size('WorkApartTime', 3, `${n1} can ${j} in ${h1} hours alone.
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
           return Size('TicketCost', 3,
                       `A concert sold ${count1 + count2} seats.
                        Adult tickets cost $${cost1} and child tickets cost $${cost2}.
                        If the concert received $${totalCost}, how many ${target} tickets were sold?`);
         }
         case 1: {
           const target = chooseFromList(['monkey', 'rabbit']);
           return Size('TicketCost', 3,
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
       return Size('CostBillCoin', 3,
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
       return Size('LeverDistance', 3, `${w1} kg balances ${dd} meters ${r} the center than a ${w2} kg. How far from the center is the ${w2} kg weight?`);
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
           return Size('Proportion', 3, `${n1} ${t1} cost ${c1} cents. How much would ${n2} ${t1} cost?`);
         case 1:
           return Size('Proportion', 3, `${n1} ${t1} weigh ${c1} kg. How much would ${n2} ${t1} weigh?`);
         case 2:
           return Size('Proportion', 3, `${n1} ${t1} stack ${c1} meters tall. How tall would ${n2} ${t1} stack?`);
         case 3:
           return Size('Proportion', 3, `${n1} ${t1} fill ${c1} boxes. How many boxes would ${n2} ${t1} fill?`);
       }
     }
   }

   export const buildPerimeterSideProblem = () => {
     const n = pick(10, 101);
     return Size('PerimeterSide', 3, `The perimeter of an equilateral triangle is ${n} cm longer than the length of one side. Find the length of the side.`);
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
       return Size('Cut', 3, `It takes ${n} ${m} minutes to cut a board into ${p1} pieces. How long would they take to cut a board into ${p2} pieces?`);
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
       return Size('TravelTimeBetweenCities', 3, `I travel ${d} km from ${n1} to ${n2} by ${v} at ${s} ${Rational('km', 'h')}. How long will it take to arrive?`);
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
       return Size('TravelDistanceBetweenCities', 2, `I travel ${t} hours from ${n1} to ${n2} by ${v} at ${s} ${Rational('km', 'h')}. How far apart are the cities?`);
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
       return Size('VehicleFuelDistance', 3, `I can travel ${d} km by ${v} by using ${a1} ${f}. How far can I go using ${a2} ${f}?`);
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
       return Size('CakeSlice', 3, `A ${Rational(n, d)} slice of a cake is cut out, then a ${Rational(n2, d2)} slice of that slice is cut out. How much of the cake is that slice?`);
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
       return Size('Dice', 3, `What is the probability of ${a} then ${b} with ${die} sided dice?`);
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

export const buildRectangleAreaProblem = () => {
  for (;;) {
    const l1 = pick(60, 180);
    const l2 = pick(20, l1 - 10);
    const w1 = pick(60, 140);
    const w2 = pick(20, w1 - 10);
    if (l2 + 10 >= l1) continue;
    if (w2 + 10 >= w1) continue;
    return Size('RectangleArea', 3, `
      <svg width="300" height="180" fill="yellow" stroke="black" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(10, 10)">
          <path d="M 0 0
                   L ${l1 - l2} 0
                   L ${l1 - l2} ${w2}
                   L ${l1} ${w2}
                   L ${l1} ${w1}
                   L 0 ${w1}
                   Z"/>
          ${createLabel([l1 / 2, w1], `${l1}`)}
          ${createLabel([0, w1 / 2], `${w1}`)}
          ${createLabel([l1 - l2 / 2, w2], `${l2}`)}
          ${createLabel([l1 - l2, w2 / 2], `${w2}`)}
          ${createLabel([l1 + 65, w2 / 2], 'What is the area?')}
        </g>
      </svg>
      `);
  }
};

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
    const choice = chooseFromList(gradeWords.grade4, chosen);
    for (const { word, sentence }  of gapSentences) {
      if (choice === word) {
        return Size('GapSentence', 1, reverse(reverse(sentence.replace('_', word.substring(0, 2))).replace('_', reverse(word).substring(0, 2))));
      }
    }
  }
};

export const buildStorySummaryProblem = (chosen) => {
  const stories = [
`The Missing Mittens
Sarah loved playing in the snow, but she always seemed to lose things. This winter, it was her favorite blue mittens. She looked everywhere – her room, the coat closet, even under the couch. Her mom helped her search, but the mittens were nowhere to be found. Sarah was starting to get really worried. She needed those mittens for recess!
The next day at school, Sarah went outside to play. It was so cold without her mittens! As she was building a snowman, she saw something blue sticking out of the snow. She rushed over and started digging. It was her mittens! Sarah was so happy, she almost forgot her hands were freezing.
Sarah ran inside to warm up, proud that she found her missing mittens. She knew she needed to be more careful with her things. But for now, she was just excited to be warm and have her favorite blue mittens just in time for playtime outside.`,
`The Best Bike Ride
Ben was so excited for the weekend. His dad had promised to take him on a bike ride through the park. Ben loved riding his bike, but he didn't get to go on long rides very often. He woke up early on Saturday and rushed to get ready, almost forgetting his helmet!
The park was even bigger than Ben remembered.  There were winding trails, a big pond with ducks, and even a playground. They rode for a long time, stopping for snacks and water breaks. Ben's legs were starting to get tired, but he didn't want to quit. He was having too much fun!
Finally, as the sun started to set, they headed home. Ben was exhausted but happy. He couldn't believe how far he had ridden. As he fell asleep that night, he dreamed of his next bike adventure with his dad.`,
`Lily's Lemonade Stand
It was the hottest day of summer, and Lily was bored. She wanted to do something fun, but it was too hot to play outside. Then, she had an idea! She would set up a lemonade stand. Lily asked her mom for help, and they got out a pitcher, cups, and all the ingredients to make delicious lemonade.
Lily set up her stand in the front yard with a big sign. At first, not many people came by. Then, her neighbor Mr. Johnson stopped for a glass. Then her friend Maya came over, and pretty soon more kids from the neighborhood showed up. Lily loved selling lemonade and chatting with everyone.
By the end of the day, Lily had sold out of lemonade and even earned some money. She decided the very best part wasn't the money, but the fun she had and the new friends she made. Maybe she would open her lemonade stand again next weekend!`,
`The Lost Puppy
Emily was walking home from school when she heard a whimpering sound. It was coming from the bushes near the sidewalk.  She peeked inside and saw a small, brown puppy all alone. The puppy looked scared and hungry. Emily knew she couldn't leave it there.
She gently picked up the puppy and carried it home. Her mom was surprised, but she helped Emily make a cozy spot for the puppy with blankets and some water. They even gave it some leftover chicken from dinner. Emily made posters with the puppy's picture and put them up around the neighborhood.
A few days later, a woman came to Emily's door. She said her puppy, Max, had gotten lost! Emily was sad to see Max go, but she was so happy that he was back with his owner.  She learned it's important to be kind and helpful, even to lost little puppies.`,
`The Treehouse Project
Sam and his best friend, Ben, had a big dream: to build a treehouse in Sam's backyard. They spent hours drawing plans and gathering supplies. Sam's dad was really good at building things, and he promised to help them.
One sunny Saturday, they started the project. First, they built a strong platform in the branches of the biggest tree. Then, they added walls and a roof. Sam painted the whole treehouse bright blue, his favorite color.
The treehouse was even better than they imagined. Sam and Ben spent all summer playing in it. They pretended to be pirates, explorers, and even astronauts. It was their own secret hideaway, and they loved every minute in it.`,
`The Talent Show Surprise
Maya was nervous. She was in the school talent show, and it was her turn to perform. She loved to sing, but sometimes she got stage fright. As she walked onto the stage, her heart was pounding. She took a deep breath and started to sing her favorite song.
At first, her voice was a little shaky. But as she kept singing, Maya started to relax. She remembered why she loved performing so much.  By the end of the song, Maya was belting out the notes with a big smile on her face.  The crowd cheered and clapped loudly.
Stepping off the stage, Maya felt proud of herself. She had faced her fear and done something amazing. Even better, she discovered how much she truly enjoyed sharing her singing with others.`,
`The Mystery of the Old Attic
Alex had always been fascinated by the attic in her grandparents' house. It was a dusty, forgotten space filled with old trunks, antique furniture, and boxes of faded photographs. One rainy afternoon, Alex decided to explore. She climbed the creaky attic stairs, a flashlight in hand.
In a corner, she discovered a wooden chest locked with an ornate padlock. Curiosity surged through her. Alex tried to pry it open but to no avail.  Back in her room, she searched online for clues about old padlocks.  She learned about skeleton keys and decided to give it a try.
The next day, armed with a set of skeleton keys her grandmother had, Alex returned to the attic. After several attempts, one key clicked, and the lock sprang open! Inside the chest, Alex found a bundle of letters tied with a faded ribbon and a worn, leather-bound journal. The letters were written in a flowing script from over a hundred years ago!  This was more than a dusty attic; it was a treasure trove of history, waiting to be uncovered.`,
`The Unexpected Friendship
Charlie was the new kid in school, and he felt like an outsider. He was shy and didn't know anyone.  During recess, he usually sat alone, reading a book. One day, a girl named Maya bounced up to him with a soccer ball under her arm.  "Want to play?" she asked with a wide grin. Charlie hesitated, feeling a mix of nervousness and excitement.
Charlie had never been very good at sports, but Maya was patient and encouraging.  She taught him some basic moves, and they even played a small game with a few other kids. Charlie discovered he had quite a knack for being a goalie.  By the end of recess, he was laughing and sweating, having the most fun he'd had in weeks.
From that day on, Charlie and Maya became friends. He learned that it was okay to step outside of his comfort zone and that sometimes the most unexpected friendships could be the very best.`,
`The Science Fair Challenge
Olivia loved science, but the upcoming science fair made her nervous. She had to come up with a project, conduct an experiment, and present her findings – all in front of her class and a judge! Olivia wracked her brain for ideas but nothing felt interesting enough.
While visiting her grandmother one afternoon, everything changed. Her grandmother was an avid gardener, and she complained about squirrels always eating her tomatoes. Olivia's eyes lit up. Could she design something to keep the squirrels away?
Inspired, Olivia started researching squirrel behavior, testing out different materials, and building prototypes.  She discovered that squirrels don't like the smell of peppermint! With her data, she created a squirrel-proof fence with a peppermint scent.  On science fair day, she confidently explained her project and even won an award. Best of all, her grandmother's tomatoes were finally safe!`,
`The Storyteller's Secret
Every Saturday, Maya and her little sister Lily visited the town library. Their favorite part was story time with Mr. Bennet, the elderly librarian. With his twinkling eyes and gentle voice, he made every story come alive. Maya especially loved his tales of faraway lands and brave heroes.
One day, Maya noticed Mr. Bennet looked sad. He told them that due to his poor eyesight, he might not be able to read stories anymore. Maya's heart sank. She couldn't imagine story time without Mr. Bennet. Then, an idea struck her. What if she and Lily memorized his stories and told them instead?
The girls spent weeks practicing Mr. Bennet's stories, trying to capture his voice and expressions. The next Saturday, they nervously stood up in front of the other children.  At first, their words stumbled, but as they got into the rhythm of the story, the words flowed, and the children were captivated.  Mr. Bennet beamed with pride.  Maya learned that sometimes the best help comes in the most unexpected ways.`,
`The Disappearing Cookies
Every Wednesday, Grandma baked the most delicious chocolate chip cookies. Jake and his brother, Ryan, couldn't wait to get home from school and have a snack.  But lately, something strange was happening.  The cookies were disappearing from the cookie jar faster than they could eat them!
At first, Jake and Ryan blamed each other. Then they suspected their dog, Buddy. Still, the cookies vanished. Determined to solve the mystery, the brothers set up a trap.  They left a note on the cookie jar asking the "cookie thief" to reveal themselves.
The next day, Jake and Ryan found a reply on the note. In messy handwriting, it said, "Sorry, couldn't resist. Meet me on the porch."  Confused, the boys went outside. There, sitting on the porch swing, was their dad, a sheepish grin on his face and crumbs on his shirt. The mystery was solved! Dad had a secret sweet tooth, and the boys had a new partner in their cookie-eating adventures.`,
`The Amazing Axolotl
Axolotls are really strange-looking creatures. They look like giant tadpoles that never grow up! These underwater salamanders have feathery gills around their heads and wide, smiling mouths. Axolotls are found in only one place in the wild: Lake Xochimilco in Mexico. Sadly, their lake home is polluted, and there aren't many axolotls left.
But what makes axolotls truly amazing is their power to heal. If an axolotl loses a leg, it can grow a brand new one! They can even regrow parts of their brains and hearts. Scientists are studying axolotls to learn more about their healing powers. Maybe one day, they'll help people who have been hurt.`,
`The Secret Language of Trees
Did you know that trees can talk to each other? It's not like how we talk, but they have their own way of communicating. Trees have a giant network of fungi living under the ground. This network connects the roots of different trees, kind of like an underground internet!
Trees use this network to send messages. They can warn each other when insects are attacking, or even share nutrients with trees that are sick or don't have enough sunlight. These amazing forests are like giant communities where trees help and support each other.`,
`The Story of Chocolate
Chocolate is one of the most popular treats in the world, but where does it come from? It all starts with a tree called the cacao tree. Cacao trees grow in warm, rainy places and produce pods filled with seeds called cacao beans.
Farmers harvest the pods and scoop out the beans. The beans are then fermented and dried in the sun.  Finally, they are roasted and ground up into a paste.  This paste is used to make all kinds of delicious chocolate treats! It takes a lot of work, but the journey from bean to chocolate bar is a sweet one.`,
`The Disappearing Islands of the Pacific
In the middle of the vast Pacific Ocean are groups of islands called atolls. These rings of coral islands are formed over thousands of years, but they sit very low in the water. Sadly, many Pacific atolls are in danger of disappearing.
The problem is rising sea levels. As the planet warms, ice caps and glaciers are melting, causing more water to flow into the oceans. These rising sea levels threaten to cover low-lying islands. Many people who live on Pacific Islands are worried that they may lose their homes.
Some scientists are trying to find solutions. They are studying ways to help the islands grow taller or to build walls to protect them from the rising water.  There's also a big effort to slow down climate change and protect Earth's ice, which will help keep sea levels from rising too quickly. The Pacific islanders and their beautiful homes need our help!`,
`The Mystery of the Northern Lights
Have you ever seen the Northern Lights? These beautiful dancing lights paint the night sky in amazing colors like green, purple, and red.  They can only be seen in the far north, in places like Alaska, Canada, and Norway.
The Northern Lights, also called Aurora Borealis, are caused by something called the solar wind. The sun constantly sends out charged particles that travel through space. When these particles reach Earth, they are pulled towards the north and south poles by Earth's magnetic field.
As the particles crash into the atmosphere, they excite the gases there, causing them to glow in those spectacular colors. The Northern Lights have inspired stories and legends for centuries, and they remain a breathtaking natural wonder.`,
`The World's Deepest Dive
The ocean is full of mysteries, especially in its deepest parts. The deepest spot in the whole ocean is called the Challenger Deep, located in the Mariana Trench in the Pacific Ocean. It's so deep that you could fit Mount Everest inside and still have over a mile of water above it!
In 1960, two brave explorers, Jacques Piccard and Don Walsh, were the first people to travel to the Challenger Deep. They used a special submarine called a bathyscaphe. Their journey was dangerous and dark,  but they made it all the way to the bottom!
In recent years, other explorers have traveled to the Challenger Deep and discovered amazing things. Strange, see-through creatures and glowing organisms live in this extreme environment.  Scientists continue to explore this mysterious place, hoping to uncover more of the ocean's secrets.`,
`Wolves: Not the Big Bad Beasts
For a long time, wolves were seen as scary and dangerous villains in fairy tales and stories.  But scientists who study wolves have discovered that they aren't so bad after all. Wolves are actually very important for a healthy environment.
Wolves live in packs, like families, and they hunt together to find food. They usually go after deer, elk, or other large animals. By keeping the numbers of those animals in balance, wolves help keep forests and grasslands healthy.
Sadly, humans have hunted wolves for many years, and many wolf populations have disappeared. Now, people are working to protect wolves and bring them back to places where they used to live.  We're learning that wolves are fascinating creatures  that deserve our respect and protection.`,
`The Power of Recycling
Every day we throw away lots of stuff – cans, bottles, plastic containers, old newspapers.  But what if we didn't have to throw it all away? That's where recycling comes in!
Recycling means taking used materials and turning them into new things.  Instead of ending up in a landfill, those empty soda cans can become parts of a new bicycle. Old plastic bottles can be turned into cozy fleece jackets.
Recycling is good for the Earth. It saves resources, because we don't have to cut down as many trees or mine for new metal. It also helps keep our air and water cleaner.
You can be a recycling hero! Find out what you can recycle in your town and start sorting those bottles, cans, and newspapers.  Together we can make a difference!`];

    const story = chooseFromList(stories, chosen);

    const [title, ...paragraphs] = story.split(/\n/g);

    return Size('StorySummary', 5,
                `<div style="font-size: 12px"><b>${title}</b><br><br>${paragraphs.join('<br><br>')}</div>`);
}
