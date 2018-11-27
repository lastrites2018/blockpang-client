//TODO: normal에 있고 test에 굳이 적혀 있지 않은 코드는 normal에 존재하는 코드를 계승하도록...

const test = {
  time: 30000,
  nextBlockTime: 29500,
  score: 690,
  block: {
    colors: ['#f783ac', '#69db7c', '#4dabf7'],
    keys: ['a', 's', 'd']
  },
  eventBlock: {
    colors: ['lime', 'purple', 'black', 'orange', 'cyan'], //color not used now
    keys: ['f', 'c']
  },
  stage: {
    1: {
      multiBlockKeys: [['i']],
      appearanceScoreConditions: 100,
      appearanceProbability: 1,
      bonusTime: 10000
    },
    2: {
      multiBlockKeys: [
        ['a', 'a'],
        ['d', 'd'],
        ['s', 's'],
        ['f', 'f'],
        ['a', 's']
      ],
      appearanceScoreConditions: 700,
      appearanceProbability: 15,
      bonusTime: 10000
    },
    3: {
      multiBlockKeys: [
        ['a', 's'],
        ['d', 'f'],
        ['a', 'd'],
        ['a', 'f'],
        ['s', 'd']
      ],
      appearanceScoreConditions: 1400,
      appearanceProbability: 15,
      bonusTime: 10000
    },
    4: {
      multiBlockKeys: [
        ['s', 'a'],
        ['f', 'd'],
        ['s', 'a'],
        ['a', 's', 'd'],
        ['d', 'a', 's']
      ],
      appearanceScoreConditions: 2100,
      appearanceProbability: 15,
      bonusTime: 10000
    },

    10: {
      multiBlockKeys: [['{', '{'], '[', ']', ['{', '}']], // if font doesn't support, this key didn't show.
      appearanceScoreConditions: 1500,
      appearanceProbability: 100
    }
  },

  // The sum of the three probabilities below and
  // the appearanceProbability of the stage shall not exceed 100%.
  // -> No Basic block is created.
  bonusBlockProbability: 5, // 1~100%
  iconBlockProbability: 5, // 1~100%
  bombBlockProbability: 5, // 1~100%
  ///
  nextBlockGenerationSpeed: 70, // direct proportion
  nextBlockGenerationInterval: 300,
  allowedKeyCodes: [9, 13, 16, 17, 18, 20, 32, 91] //9tab, 13enter, 16shift, 17ctrl,18alt,20capslock, 32space, 91ctrl,
};

const normal = {
  time: 30000,
  nextBlockTime: 29500,
  score: 0,
  block: {
    colors: ['#f783ac', '#69db7c', '#4dabf7'],
    keys: ['a', 's', 'd']
  },
  eventBlock: {
    colors: ['lime', 'purple', 'black', 'orange', 'cyan'], //color not used now
    keys: ['f', 'c']
  },
  stage: {
    1: {
      multiBlockKeys: [['i']],
      appearanceScoreConditions: 100,
      appearanceProbability: 1,
      bonusTime: 10000
    },
    2: {
      multiBlockKeys: [
        ['a', 'a'],
        ['d', 'd'],
        ['s', 's'],
        ['f', 'f'],
        ['a', 's']
      ],
      appearanceScoreConditions: 700,
      appearanceProbability: 15,
      bonusTime: 10000
    },
    3: {
      multiBlockKeys: [
        ['a', 's'],
        ['d', 'f'],
        ['a', 'd'],
        ['a', 'f'],
        ['s', 'd']
      ],
      appearanceScoreConditions: 1400,
      appearanceProbability: 15,
      bonusTime: 10000
    },
    4: {
      multiBlockKeys: [
        ['s', 'a'],
        ['f', 'd'],
        ['s', 'a'],
        ['a', 's', 'd'],
        ['d', 'a', 's']
      ],
      appearanceScoreConditions: 2100,
      appearanceProbability: 15,
      bonusTime: 10000
    },

    10: {
      multiBlockKeys: [['{', '{'], '[', ']', ['{', '}']], // if font doesn't support, this key didn't show.
      appearanceScoreConditions: 1500,
      appearanceProbability: 100
    }
  },

  // The sum of the three probabilities below and
  // the appearanceProbability of the stage shall not exceed 100%.
  // -> No Basic block is created.
  bonusBlockProbability: 5, // 1~100%
  iconBlockProbability: 5, // 1~100%
  bombBlockProbability: 5, // 1~100%
  ///
  nextBlockGenerationSpeed: 70, // direct proportion
  nextBlockGenerationInterval: 300,
  allowedKeyCodes: [9, 13, 16, 17, 18, 20, 32, 91] //9tab, 13enter, 16shift, 17ctrl,18alt,20capslock, 32space, 91ctrl,
};

export default {
  test,
  normal
};
