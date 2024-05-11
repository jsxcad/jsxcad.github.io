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
  { "word": "usually", "sentence": "I _________ have cereal for breakfast, but sometimes I make eggs." },
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

    return Size('StorySummary', 6,
      `<div style="font-size: 12px">
        <b>${title}</b>
        <br>
        <br>
        ${paragraphs.join('<br><br>')}
        </div>`);
}

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
