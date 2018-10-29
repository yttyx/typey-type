import Zipper from './zipper';
import { isPeak } from './utils.js';

function createWordListFromMetWords (metWords) {
  let munged = trimAndSumUniqMetWords(metWords);
  let metWordsEntries = Object.entries(munged).sort(function (a, b) {
    return b[1] - a[1]
  });

  // remove prefix and suffix entries because they're annoying to write
  // while practicing regular words
  metWordsEntries = metWordsEntries.filter(item => {
    let containsCaret = item[0].indexOf('^') !== -1;
    let isJustACaretCharacter = item[0] === '^';
    let isJustACaretCharacterWithSpaceBefore = item[0] === ' ^';
    let isJustACaretCharacterWithSpaceAfter = item[0] === '^ ';
    return !containsCaret || isJustACaretCharacter || isJustACaretCharacterWithSpaceBefore || isJustACaretCharacterWithSpaceAfter;
  });
  return metWordsEntries.map(entry => entry[0].trim());
}

function trimAndSumUniqMetWords (metWords) {
  let mungedUniqWords = {};
  for (const [metWord, timesSeen] of Object.entries(metWords)) {
    let trimmedWord = metWord.trim();
    if (mungedUniqWords[trimmedWord]) {
      mungedUniqWords[trimmedWord] += timesSeen;
    } else {
      mungedUniqWords[trimmedWord] = timesSeen;
    }
  }
  return mungedUniqWords;
}

function removeWhitespaceAndSumUniqMetWords (metWords) {
  let mungedUniqWords = {};
  for (const [metWord, timesSeen] of Object.entries(metWords)) {
    let removedWhitespaceWord = metWord.replace(/\s/g,'')
    if (mungedUniqWords[removedWhitespaceWord]) {
      mungedUniqWords[removedWhitespaceWord] += timesSeen;
    } else {
      mungedUniqWords[removedWhitespaceWord] = timesSeen;
    }
  }
  return mungedUniqWords;
}

function splitBriefsIntoStrokes (currentStroke) {
  return currentStroke.split(/[/ ]/);
}

function mapBriefToAmericanStenoKeys (brief) {
  let keys = { numberBar: false, leftSUpper: false, leftSLower: false, leftT: false, leftK: false, leftP: false, leftW: false, leftH: false, leftR: false, leftA: false, leftO: false, star: false, dash: false, rightE: false, rightU: false, rightF: false, rightR: false, rightP: false, rightB: false, rightL: false, rightG: false, rightT: false, rightS: false, rightD: false, rightZ: false, };

  let briefLetters = brief.split("");

  // stenoOrder and stenoKeys should always be updated together
  let stenoOrder = ["#","1","S","T","2","K","3","P","W","4","H","R","5","A","0","O","*","-","E","U","6","F","R","7","P","B","8","L","G","9","T","S","D","Z"];
  let stenoKeys = ['numberBar','leftSUpper','leftSLower','leftT','leftT','leftK','leftP','leftP','leftW','leftH','leftH','leftR','leftA','leftA','leftO','leftO','star','dash','rightE','rightU','rightF','rightF','rightR','rightP','rightP','rightB','rightL','rightL','rightG','rightT','rightT','rightS','rightD','rightZ'];

  for (let i = 0; i < stenoOrder.length; i++) {
    if (briefLetters.length > 0) {
      if (briefLetters[0] === stenoOrder[i]) {
        keys[stenoKeys[i]] = true;
        briefLetters.shift();
      }
    }
  }

  if (brief.match(/[0-9]/)) {
    keys["numberBar"] = true;
  }

  if (keys.leftSLower === true && keys.leftSUpper === false) {
    keys.leftSUpper = true;
  }

  return keys;
}

function mapBriefToDanishStenoKeys (brief) {
  let keys = { numberBar: false, leftN: false, leftSLower: false, leftT: false, leftK: false, leftP: false, leftV: false, leftH: false, leftR: false, leftA: false, leftO: false, star: false, dash: false, rightÆ: false, rightÅ: false, rightF: false, rightR: false, rightP: false, rightE: false, rightL: false, rightK: false, rightT: false, rightS: false, rightDUpper: false, rightDLower: false, };

  let briefLetters = brief.split("");

  // stenoOrder and stenoKeys should always be updated together
  let stenoOrder = ["#","1","S","T","2","K","3","P","V","4","H","R","5","A","0","O","*","-","Æ","Å","6","F","R","7","P","E","8","L","K","9","T","S","D","D","N"];
  let stenoKeys = ['numberBar','leftN','leftSLower','leftT','leftT','leftK','leftP','leftP','leftV','leftH','leftH','leftR','leftA','leftA','leftO','leftO','star','dash','rightÆ','rightÅ','rightF','rightF','rightR','rightP','rightP','rightE','rightL','rightL','rightK','rightT','rightT','rightS','rightDUpper','rightDLower','leftN'];

  for (let i = 0; i < stenoOrder.length; i++) {
    if (briefLetters.length > 0) {
      if (briefLetters[0] === stenoOrder[i]) {
        keys[stenoKeys[i]] = true;
        briefLetters.shift();
      }
    }
  }

  if (brief.match(/[0-9]/)) {
    keys["numberBar"] = true;
  }

  if (keys.rightDUpper === true && keys.rightDLower === false) {
    keys.rightDLower = true;
  }

  return keys;
}

function mapBriefToKoreanModernCStenoKeys (brief) {
  let keys = {
    the1Key: false,
    the2Key: false,
    the3Key: false,
    the4Key: false,
    the5Key: false,
    theLeftㅎKey: false,
    theLeftㅁKey: false,
    theLeftㄱKey: false,
    theLeftㅈKey: false,
    theLeftㄴKey: false,
    theLeftㄷKey: false,
    theLeftㅇKey: false,
    theLeftㅅKey: false,
    theLeftㅂKey: false,
    theLeftㄹKey: false,
    theㅗKey: false,
    theㅏKey: false,
    theㅜKey: false,
    theStarKey: false,
    theㅓKey: false,
    theㅣKey: false,
    the6Key: false,
    the7Key: false,
    the8Key: false,
    the9Key: false,
    the0Key: false,
    theRightㅎKey: false,
    theRightㅇKey: false,
    theRightㄹKey: false,
    theRightㄱKey: false,
    theRightㄷKey: false,
    theRightㅂKey: false,
    theRightㄴKey: false,
    theRightㅅKey: false,
    theRightㅈKey: false,
    theRightㅁKey: false
  };

  let briefCharacters = brief.split("");
  let briefCharactersLength = briefCharacters.length;
  let numbers = [];
  let leftSide = [];
  let vowels = [];
  let rightSide = [];
  let vowel = false;
  let vowelRegex = /[ㅗㅏㅜ*\-ㅓㅣ]/;
  let numberRegex = /[0-9]/;

  for (let i = 0; i < briefCharactersLength; i++) {
    let char = briefCharacters[i];
    if (!!char.match(vowelRegex)) {
      vowel = true;
      vowels.push(char);
    }
    else if (!!char.match(numberRegex)) {
      numbers.push(char);
    }
    else {
      if (vowel) {
        rightSide.push(char);
      } else {
        leftSide.push(char);
      }
    }
  }

  let numberslength = numbers.length;
  for (let i = 0; i < numberslength; i++) {
    if (keys.hasOwnProperty('the' + numbers[i] + 'Key')) {
      keys['the' + numbers[i] + 'Key'] = true;
    }
  }

  let vowelslength = vowels.length;
  for (let i = 0; i < vowelslength; i++) {
    if (keys.hasOwnProperty('the' + vowels[i] + 'Key')) {
      keys['the' + vowels[i] + 'Key'] = true;
    } else if (vowels[i] === "*") {
      keys['theStarKey'] = true;
    }
  }

  let leftSidelength = leftSide.length;
  for (let i = 0; i < leftSidelength; i++) {
    if (keys.hasOwnProperty('theLeft' + leftSide[i] + 'Key')) {
      keys['theLeft' + leftSide[i] + 'Key'] = true;
    }
  }

  let rightSidelength = rightSide.length;
  for (let i = 0; i < rightSidelength; i++) {
    if (keys.hasOwnProperty('theRight' + rightSide[i] + 'Key')) {
      keys['theRight' + rightSide[i] + 'Key'] = true;
    }
  }

  // console.log("Brief: " + brief + ", keys: " + Object.entries(keys));
  // console.log("keys: " + Object.entries(keys));

  // This regex looks for 'vowels', star, or hyphen.
  // It escapes the star and hyphen.
  // It captures the matching character to preserve it in .split().
  // let regex = /([ㅗㅏㅜ*\-ㅓㅣ])/;
  // let sortedBrief = brief.split(regex).forEach((charsArray, index) => {
  //   charsArray.split('').sort().join('');
  // });

  // let koreanModernCStenoOrder = '12345ㅎㅁㄱㅈㄴㄷㅇㅅㅂㄹㅗㅏㅜ*ㅓㅣ67890ㅎㅇㄹㄱㄷㅂㄴㅅㅈㅁ';

  return keys;
}

function mapBriefToPalantypeKeys (brief) {
  let keys = { leftS: false, leftC: false, leftP: false, leftT: false, leftH: false, leftPlusOne: false, leftPlusTwo: false, leftM: false, leftF: false, leftR: false, leftN: false, leftL: false, leftY: false, leftO: false, leftE: false, rightA: false, rightU: false, dash: false, centerI: false, rightCaretOne: false, rightCaretTwo: false, rightN: false, rightL: false, rightC: false, rightM: false, rightF: false, rightR: false, rightP: false, rightT: false, rightPlus: false, rightS: false, rightH: false, };

  let briefLetters = brief.split("");

  // palantypeOrder and palantypeKeys should always be updated together
  let palantypeOrder = ["S","C","P","T","H","+","+","M","F","R","N","L","Y","O","E","A","U","-","I","^","^","N","L","C","M","F","R","P","T","+","S","H"];
  let palantypeKeys = ['leftS','leftC','leftP','leftT','leftH','leftPlusOne','leftPlusTwo','leftM','leftF','leftR','leftN','leftL','leftY','leftO','leftE','rightA','rightU','dash','centerI','rightCaretOne','rightCaretTwo','rightN','rightL','rightC','rightM','rightF','rightR','rightP','rightT','rightPlus','rightS','rightH'];

  for (let i = 0; i < palantypeOrder.length; i++) {
    if (briefLetters.length > 0) {
      if (briefLetters[0] === palantypeOrder[i]) {
        keys[palantypeKeys[i]] = true;
        briefLetters.shift();
      }
    }
  }

  if (brief.match(/[0-9]/)) {
    keys["numberBar"] = true;
  }

  if (keys.leftPlusOne === true && keys.leftPlusTwo === false) {
    keys.leftPlusTwo = true;
  }

  if (keys.rightCaretOne === true && keys.rightCaretTwo === false) {
    keys.rightCaretTwo = true;
  }

  return keys;
}

function strokeAccuracy(currentPhraseAttempts, targetStrokeCount) {
  let strokeAccuracy = true;
  let attempts = [];

  for (let i = 0; i < currentPhraseAttempts.length - 1; i++) {
    if (currentPhraseAttempts[i-1] !== undefined && currentPhraseAttempts[i+1] !== undefined) {
      if (isPeak(currentPhraseAttempts[i].length, currentPhraseAttempts[i-1].length, currentPhraseAttempts[i+1].length)) {
        attempts.push(currentPhraseAttempts[i]);
        // console.log("IS A PEAK");
      } else if (currentPhraseAttempts[i].length === currentPhraseAttempts[i-1].length || currentPhraseAttempts[i].length === currentPhraseAttempts[i+1].length) {
        attempts.push(currentPhraseAttempts[i]);
        // console.log("IS A PEAK");
      }
    } else if (currentPhraseAttempts[i+1] !== undefined) {
      if (currentPhraseAttempts[i].length > currentPhraseAttempts[i+1].length) {
        attempts.push(currentPhraseAttempts[i]);
        // console.log("IS A PEAK");
      } else if (currentPhraseAttempts[i].length === currentPhraseAttempts[i+1].length) {
        attempts.push(currentPhraseAttempts[i]);
        // console.log("IS A PEAK");
      }
    } else if (currentPhraseAttempts[i-1] !== undefined) {
      if (currentPhraseAttempts[i].length > currentPhraseAttempts[i-1].length) {
        attempts.push(currentPhraseAttempts[i]);
        // console.log("IS A PEAK");
      } else if (currentPhraseAttempts[i].length === currentPhraseAttempts[i-1].length) {
        attempts.push(currentPhraseAttempts[i]);
        // console.log("IS A PEAK");
      }
    }
  }

  if (attempts.length >= targetStrokeCount) {
    // console.log("More attempts than expected strokes");
    return {strokeAccuracy: false, attempts: attempts};
  }

  // console.log("Fewer attempts than expected strokes");
  return {strokeAccuracy: strokeAccuracy, attempts: attempts};
}

function matchSplitText(expected, actualText, settings={ignoredChars: ''}, userSettings={}) {
  if (userSettings.spacePlacement === 'spaceBeforeOutput') {
    expected = ' '+expected;
  } else if (userSettings.spacePlacement === 'spaceAfterOutput') {
    expected = expected+' ';
  }
  let expectedChars = expected.split('');
  let actualTextChars = actualText.split('');
  let charactersMatch;
  let expectedIndex = 0;
  let actualTextIndex = 0;
  let ignoredChars = settings.ignoredChars.slice(0);

  if (userSettings.caseSensitive) {
    charactersMatch = function (char1, char2) {
      return char1 === char2;
    }
  } else {
    charactersMatch = function (char1, char2) {
      return char1.toUpperCase() === char2.toUpperCase();
    }
  }

  if (userSettings.spacePlacement === 'spaceOff') {
    ignoredChars += " ";
  }

  for (; actualTextIndex < actualTextChars.length && expectedIndex < expectedChars.length; expectedIndex++, actualTextIndex++) {

    // Is material char an ignored char?
    while(ignoredChars.indexOf(expectedChars[expectedIndex]) !== -1) {
      expectedIndex++;
      if (expectedIndex >= expectedChars.length) {
        break;
      };
    }

    // Is typed char an ignored space?
    while(userSettings.spacePlacement === 'spaceOff' && actualTextChars[actualTextIndex] === ' ') {
      actualTextIndex++
      if (actualTextIndex >= actualTextChars.length) {
        break;
      }
    }

    // If typed char is undefined, break
    if (!actualTextChars[actualTextIndex]) {
      break;
    }

    // If material char is undefined, break
    if (!expectedChars[expectedIndex]) {
      break;
    }

    // Do material and typed chars match?
    if (!charactersMatch(actualTextChars[actualTextIndex], expectedChars[expectedIndex])) {
      break;
    }
  }

  // Alternative approach to matching trailing ignored character ^ does not work on ignored spaces setting when there are many ignored characters in the middle of the word
  // if (expectedChars.length > actualTextChars.length) {
  //   // Is material char an ignored char?
  //   while(ignoredChars.indexOf(expectedChars[expectedIndex]) !== -1) {
  //     expectedIndex++;
  //     if (expectedIndex >= expectedChars.length) {
  //       break;
  //     };
  //   }
  // }

  let matchedExpected = expectedChars.slice(0,expectedIndex).join('');
  let unmatchedExpected = expectedChars.slice(expectedIndex).join('');
  let matchedActual = actualTextChars.slice(0,actualTextIndex).join('');
  let unmatchedActual = actualTextChars.slice(actualTextIndex).join('');

  if ((unmatchedExpected.length === 1) && (ignoredChars.indexOf(unmatchedExpected) !== -1)) {
    unmatchedExpected = '';
  }
  // Alternative approach to matching trailing ignored character ^ … does not work?
  // if (ignoredChars.indexOf(expectedChars[expectedIndex]) !== -1) {
  //   unmatchedExpected = '';
  // }
  // if (ignoredChars.indexOf(actualTextChars[actualTextIndex]) !== -1) {
  //   unmatchedActual = '';
  // }

  return [matchedExpected, unmatchedExpected, matchedActual, unmatchedActual];
}

const SETTINGS_NAME_MAP = {
  ignore_characters: 'ignoredChars',
  warning_message: 'customMessage',
  locales: 'locales'
}

function parseCustomMaterial(lessonTextAndStrokes) {
  let emptyCustomLesson = {
    sourceMaterial: [],
    presentedMaterial: [{phrase: 'The', stroke: '-T'}],
    settings: { ignoredChars: '' },
    title: 'Custom',
    subtitle: '',
    newPresentedMaterial: new Zipper([{phrase: 'The', stroke: '-T'}]),
    path: process.env.PUBLIC_URL + '/lessons/custom'
  }
  if (lessonTextAndStrokes.length === 0 || !lessonTextAndStrokes.includes("	")) {
    return emptyCustomLesson;
  }
  let lessonTitle = 'Custom';
  let lessonSubtitle = '';
  let lines = lessonTextAndStrokes.split("\n");
  lines = lines.filter(phrase => phrase !== '');
  lines = lines.filter(phrase => phrase.includes("	"));
  if (lines.length === 0) {
    return emptyCustomLesson;
  }
  let sourceMaterial = [];
  let settings = {ignoredChars: ''};

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    let phraseAndStroke = line.split("	");
    let phrase = phraseAndStroke[0];
    let stroke = phraseAndStroke[1];
    sourceMaterial.push( {phrase: phrase, stroke: stroke} );
  }

  return {
    sourceMaterial: sourceMaterial,
    presentedMaterial: sourceMaterial,
    settings: settings,
    title: lessonTitle,
    subtitle: lessonSubtitle,
    newPresentedMaterial: new Zipper(sourceMaterial),
    path: process.env.PUBLIC_URL + '/lessons/custom'
  }
}

function parseWordList(userInputWordList) {
  let wordList = [];
  if (userInputWordList.length === 0) {
    return wordList;
  }
  let lines = userInputWordList.split("\n");
  lines = lines.filter(phrase => phrase !== '');
  if (lines.length === 0) {
    return wordList;
  }

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    wordList.push( line );
  }

  return wordList;
}

function generateDictionaryEntries(wordList, sourceWordsAndStrokes = {"the": "-T"}) {
  let dictionary = [];

  for (let i = 0; i < wordList.length; i++) {
    let entry = wordList[i];
    let stroke = sourceWordsAndStrokes[entry];
    if (!stroke) { stroke = sourceWordsAndStrokes[entry.toLowerCase()]; }
    if (!stroke) { stroke = "xxx"; }
    dictionary.push({phrase: entry, stroke: stroke});
  }

  return dictionary;
}

function parseLesson(lessonText, path) {
  let lines = lessonText.split("\n");
  let lessonTitle = lines[0];
  let lessonSubtitle = lines[1];
  let sourceMaterial = [];
  let settings = {ignoredChars: ''};

  for (let i = 2; i < lines.length; i++) {
    let line = lines[i];
    let firstChar = line.charAt(0);

    if (firstChar === "'") {
      let phraseAndStroke = line.split("': ");
      let phrase = phraseAndStroke[0].substring(1, phraseAndStroke[0].length);
      let stroke = phraseAndStroke[1];
      sourceMaterial.push( {phrase: phrase, stroke: stroke} );
    } else if (line.indexOf("=") !== -1) {
      let optionAndValue = line.split("=");
      let value = optionAndValue[1].replace(/'/g, "");
      if (value === "true") { value = true; } else if (value === "false") { value = false; }
      if (optionAndValue[0] in SETTINGS_NAME_MAP) {
        settings[SETTINGS_NAME_MAP[optionAndValue[0]]] = value;
      }
    }
  }

  return {
    sourceMaterial: sourceMaterial,
    presentedMaterial: sourceMaterial,
    settings: settings,
    title: lessonTitle,
    subtitle: lessonSubtitle,
    newPresentedMaterial: new Zipper([sourceMaterial]),
    path: path
  }
}

function lookUpDictionaryInIndex(path, dictionaryIndex = []) {
  let dictionaryMetadata = dictionaryIndex.find(metadataEntry => process.env.PUBLIC_URL + metadataEntry.path === path.replace(/\/$/,'.json'));

  if (typeof dictionaryMetadata === "undefined") {
    dictionaryMetadata = {
      author: "Typey Type",
      title: 'Missing dictionary details',
      subtitle: "",
      category: "Typey Type",
      subcategory: "",
      tagline: "Loading dictionary details…",
      link: "/typey-type/support#typey-type-dictionary",
      path: "/dictionaries/typey-type/top-10.json",
    }
  }


  // let dictionaryMetadata = {
  //   author: "Typey Type",
  //   title: "Dictionary",
  //   subtitle: "",
  //   category: "Typey Type",
  //   subcategory: "",
  //   tagline: "Typey Type’s dictionary is a version of the Plover dictionary with misstrokes removed for the top 10,000 words.",
  //   link: "/typey-type/support#typey-type-dictionary",
  //   path: "/dictionaries/typey-type/typey-type.json"
  // }
  // let dictionaryIndex = [
  //   {
  //     "author": "Typey Type",
  //     "title": "Dictionary",
  //     "subtitle": "",
  //     "category": "Typey Type",
  //     "subcategory": "",
  //     "tagline": "Typey Type’s dictionary is a version of the Plover dictionary with misstrokes removed for the top 10,000 words.",
  //     "link": "/typey-type/support#typey-type-dictionary",
  //     "path": "/dictionaries/typey-type/typey-type.json"
  //   }
  // ];

  // let len = dictionaryIndex.length;
  // for (let i = 0; i < len; i++) {
  //   if (i.path === path) {
  //   }
  // }

  return dictionaryMetadata;
}

function swapKeyValueInDictionary(sourceDictionaryFile) {
  let sourceWordsAndStrokes = {};
  for (let stroke in sourceDictionaryFile) {
    let word = sourceDictionaryFile[stroke];
    sourceWordsAndStrokes[word] = stroke;
  }
  return sourceWordsAndStrokes;
}

function processDictionary(swappedDictionaryFile) {
  let processedDictionary = {};
  let charsToRemove = [
    [/({\^)(.*)(\^})/, '$2'], // Replace "{^ ^}" with " "
    [/({\^})(.*)/, '$2'], // Replace "{^}™" with "™"
    [/(.*)(\^})/, '$1'], // Replace "words{^}" with "words"
    [/(^})(.*)({$)/, '$2'], // Replace "}words{" leftover from prev regex with "words"
    [/({)(.)(})/, '$2'], // Replace "{;}" with ";"
    [/({&)([0-9])(})/, '$2'], // Replace "{&1}" with "1"
  ];
  for (let property in swappedDictionaryFile) {
    let value = swappedDictionaryFile[property];
    for (let i = 0; i < charsToRemove.length; i++) {
      property = property.replace(charsToRemove[i][0], charsToRemove[i][1]);
    }
    processedDictionary[property] = value;
  }
  return processedDictionary;
}

// function isFirstVisit() {
//   // metWords should at least contain `{'.':0}` so it should be length 7 or greater
//   if (window.localStorage && window.localStorage.getItem('metWords') && window.localStorage.getItem('metWords').length>=7) {
//     return false;
//   } else {
//     return true;
//   }
// }

function loadPersonalPreferences() {
  let metWords = {};
  let flashcardsProgress = {};
  let flashcardsMetWords = {
    "the": {
      phrase: "the",
      stroke: "-T",
      rung: 0,
    },
  };
  let lessonsProgress = {};
  let userSettings = {
    blurMaterial: false,
    caseSensitive: false,
    simpleTypography: true,
    retainedWords: true,
    limitNumberOfWords: 45,
    startFromWord: 1,
    newWords: true,
    repetitions: 3,
    showScoresWhileTyping: true,
    showStrokes: true,
    showStrokesAsDiagrams: false,
    hideStrokesOnLastRepetition: true,
    spacePlacement: 'spaceOff',
    speakMaterial: false,
    sortOrder: 'sortOff',
    seenWords: true,
    study: 'discover',
    stenoLayout: 'stenoLayoutAmericanSteno'
  };
  if (window.localStorage) {
    if (window.localStorage.getItem('metWords')) {
      metWords = JSON.parse(window.localStorage.getItem('metWords'));
    }
    if (window.localStorage.getItem('userSettings')) {
      userSettings = Object.assign(userSettings, JSON.parse(window.localStorage.getItem('userSettings')));
    }
    if (window.localStorage.getItem('flashcardsMetWords')) {
      flashcardsMetWords = Object.assign(flashcardsMetWords, JSON.parse(window.localStorage.getItem('flashcardsMetWords')));
    }
    if (window.localStorage.getItem('flashcardsProgress')) {
      flashcardsProgress = Object.assign(flashcardsProgress, JSON.parse(window.localStorage.getItem('flashcardsProgress')));
    }
    if (window.localStorage.getItem('lessonsProgress')) {
      lessonsProgress = Object.assign(lessonsProgress, JSON.parse(window.localStorage.getItem('lessonsProgress')));
    }
    return [metWords, userSettings, flashcardsMetWords, flashcardsProgress, lessonsProgress];
  }
  return [metWords, userSettings, flashcardsMetWords, flashcardsProgress, lessonsProgress];
}

function writePersonalPreferences(itemToStore, JSONToStore) {
  let stringToStore = JSON.stringify(JSONToStore);
  if (window.localStorage) {
    window.localStorage.setItem(itemToStore, stringToStore);
  } else {
    console.log('Unable to write to local storage. Changes to User Settings and Met Words will be lost.');
  }
}

function targetStrokeCount(currentOutline) {
  // console.log(currentOutline.stroke.split(/[/ ]/).length);
  return currentOutline.stroke.split(/[/ ]/).length || 1;
}

function repetitionsRemaining(userSettings, presentedMaterial, currentPhraseID) {
  let lessonLength = presentedMaterial.length;
  if (currentPhraseID > lessonLength) { return 0; }
  let reps = userSettings.repetitions;
  let wordsPerRep = lessonLength/ userSettings.repetitions;
  let wordsRemaining = lessonLength - currentPhraseID;
  return reps - Math.floor(((lessonLength - wordsRemaining)/wordsPerRep));
}

function shouldShowStroke(showStrokesInLesson, showStrokes, repetitionsRemaining, hideStrokesOnLastRepetition) {
  if (showStrokesInLesson) {
    // console.log("You clicked the hint linked");
    return true;
  } else if (showStrokes && repetitionsRemaining > 1) {
    // console.log("show strokes and more than 1 rep left");
    return true;
  } else if (showStrokes && repetitionsRemaining <= 1 && !(hideStrokesOnLastRepetition) ) {
    // console.log("show strokes and <=1 rep and not hide briefs on lest rep");
    return true;
  }
    // console.log("show stroke");
  return false;
}

function getLesson(lessonFile) {
  return fetch(lessonFile, {
    method: "GET",
    credentials: "same-origin"
  }).then((response) => {
    return response.text();
  });
}

function fetchDictionaryIndex() {
  return fetch(process.env.PUBLIC_URL + '/dictionaries/dictionaryIndex.json', {
    method: "GET",
    credentials: "same-origin"
  }).then((response) => {
    return response.json()
  }).then(json => {
    return(json);
  }).catch(function(e) {
    console.log('Unable to load dictionary index', e)
    return(
      [
      {
        "title": "Typey Type",
        "category": "Typey Type",
        "subcategory": "",
        "path": process.env.PUBLIC_URL + "/typey-type/typey-type.json"
      },
      {
        "title": "Steno",
        "category": "Drills",
        "subcategory": "",
        "path": process.env.PUBLIC_URL + "/drills/steno/steno.json"
      }]
    );
  });
}

function fetchLessonIndex() {
  return fetch(process.env.PUBLIC_URL + '/lessons/lessonIndex.json', {
    method: "GET",
    credentials: "same-origin"
  }).then((response) => {
    return response.json()
  }).then(json => {
    return(json);
  });
}

function setupLessonProgress(lessonIndex) {
  let lessonProgress = {};
  // debugger;
  return lessonProgress;
}

// for custom lesson setup
function fetchDictionaries() {
  return fetch(process.env.PUBLIC_URL + '/dictionaries/dict.json', {
    method: "GET",
    credentials: "same-origin"
  }).then((response) => {
    return response.json()
  }).then(json => {
    return(json);
  });
}

export {
  createWordListFromMetWords,
  fetchLessonIndex,
  fetchDictionaryIndex,
  fetchDictionaries, // for custom lesson setup
  generateDictionaryEntries,
  getLesson,
  loadPersonalPreferences,
  lookUpDictionaryInIndex,
  matchSplitText,
  mapBriefToAmericanStenoKeys,
  mapBriefToDanishStenoKeys,
  mapBriefToKoreanModernCStenoKeys,
  mapBriefToPalantypeKeys,
  trimAndSumUniqMetWords,
  parseCustomMaterial,
  parseLesson,
  parseWordList,
  processDictionary,
  swapKeyValueInDictionary,
  removeWhitespaceAndSumUniqMetWords,
  repetitionsRemaining,
  setupLessonProgress,
  shouldShowStroke,
  splitBriefsIntoStrokes,
  strokeAccuracy,
  targetStrokeCount,
  writePersonalPreferences
};
