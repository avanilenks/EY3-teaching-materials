import { useState, useMemo, useCallback } from "react";

const EL = {
  A:{s:"/æ/",w:["apple","ant","arm","axe","alligator"],sen:"A is for apple.",lc:"a",d:"two slanting lines meeting at top with a belt",ld:"a circle with a stick on the right"},
  B:{s:"/b/",w:["ball","bear","banana","book","butterfly"],sen:"B is for ball.",lc:"b",d:"a tall line with two bumps on the right",ld:"a stick with one bump at bottom right"},
  C:{s:"/k/",w:["cat","cup","car","cookie","cloud"],sen:"C is for cat.",lc:"c",d:"a big open curve like a crescent moon",ld:"a small open curve"},
  D:{s:"/d/",w:["dog","duck","door","drum","deer"],sen:"D is for dog.",lc:"d",d:"a tall line with a big round tummy on the right",ld:"a small circle with a tall line on the right"},
  E:{s:"/ɛ/",w:["egg","elephant","elf","exit","elbow"],sen:"E is for egg.",lc:"e",d:"a tall line with three arms reaching right",ld:"a small curve with a middle belt"},
  F:{s:"/f/",w:["fish","flower","frog","fan","fox"],sen:"F is for fish.",lc:"f",d:"a tall line with two arms no bottom arm",ld:"a hook at top with a crossbar"},
  G:{s:"/g/",w:["goat","grape","girl","gift","green"],sen:"G is for goat.",lc:"g",d:"a C with a little shelf inside",ld:"a circle with a shelf and tail below"},
  H:{s:"/h/",w:["hat","hen","house","honey","hand"],sen:"H is for hat.",lc:"h",d:"two tall lines with a bridge in the middle",ld:"a stick then an arch then a stick"},
  I:{s:"/ɪ/",w:["insect","igloo","ink","ill","itch"],sen:"I is for insect.",lc:"i",d:"three lines top tall middle bottom",ld:"a single line with a dot on top"},
  J:{s:"/dʒ/",w:["jam","jar","jump","jungle","jacket"],sen:"J is for jam.",lc:"j",d:"a tall line with a hook at bottom",ld:"a hook with a dot on top"},
  K:{s:"/k/",w:["kite","king","key","kitten","kangaroo"],sen:"K is for kite.",lc:"k",d:"a tall line with two arms one up-right one down-right",ld:"like big K but smaller"},
  L:{s:"/l/",w:["lion","leaf","lemon","lamp","lizard"],sen:"L is for lion.",lc:"l",d:"a tall line with a foot turning right",ld:"a single tall line"},
  M:{s:"/m/",w:["moon","monkey","milk","mango","mouse"],sen:"M is for moon.",lc:"m",d:"two tall lines with a V-shape between them",ld:"two rounded arches side by side"},
  N:{s:"/n/",w:["nest","nut","nose","night","needle"],sen:"N is for nest.",lc:"n",d:"two tall lines connected by a diagonal",ld:"one rounded arch"},
  O:{s:"/o/",w:["orange","owl","ox","ocean","otter"],sen:"O is for orange.",lc:"o",d:"a big round circle",ld:"a small circle"},
  P:{s:"/p/",w:["pen","pig","pot","parrot","purple"],sen:"P is for pen.",lc:"p",d:"a tall line with one bump at top right",ld:"a stick with a ball at bottom right"},
  Q:{s:"/kw/",w:["queen","quilt","quiz","quiet","quack"],sen:"Q is for queen.",lc:"q",d:"a circle with a tiny tail at bottom right",ld:"a circle with a tail going down-right"},
  R:{s:"/r/",w:["rabbit","rain","red","ring","river"],sen:"R is for rabbit.",lc:"r",d:"a P with a leg kicking right",ld:"a small arch with a short leg"},
  S:{s:"/s/",w:["sun","star","snake","soap","spoon"],sen:"S is for sun.",lc:"s",d:"a wiggly path curving twice",ld:"a small wiggly s"},
  T:{s:"/t/",w:["tiger","tree","toy","train","tomato"],sen:"T is for tiger.",lc:"t",d:"a tall line with a hat on top",ld:"a small cross with a slight hook"},
  U:{s:"/u/",w:["umbrella","under","up","uncle","ugly"],sen:"U is for umbrella.",lc:"u",d:"a deep curve connecting two upward lines",ld:"a small cup shape"},
  V:{s:"/v/",w:["van","violet","vase","vine","village"],sen:"V is for van.",lc:"v",d:"two lines meeting at a point at the bottom",ld:"a small v"},
  W:{s:"/w/",w:["water","wind","wolf","well","worm"],sen:"W is for water.",lc:"w",d:"two V shapes side by side",ld:"a small w"},
  X:{s:"/ks/",w:["x-ray","xylophone","fox","box","mix"],sen:"X is for x-ray.",lc:"x",d:"two diagonal lines crossing in the middle",ld:"a small x cross"},
  Y:{s:"/j/",w:["yak","yarn","yell","yoga","yellow"],sen:"Y is for yak.",lc:"y",d:"two lines meeting in the middle then one going down",ld:"a small y with a descending tail"},
  Z:{s:"/z/",w:["zebra","zero","zoom","zigzag","zoo"],sen:"Z is for zebra.",lc:"z",d:"top line right diagonal down-left bottom line right",ld:"a small z"},
};
const LK=Object.keys(EL);

const TV=[
  {l:"అ",r:"a",w:"అమ్మ",m:"mother",t:"v"},{l:"ఆ",r:"aa",w:"ఆకు",m:"leaf",t:"v"},
  {l:"ఇ",r:"i",w:"ఇల్లు",m:"house",t:"v"},{l:"ఈ",r:"ee",w:"ఈగ",m:"fly",t:"v"},
  {l:"ఉ",r:"u",w:"ఉప్పు",m:"salt",t:"v"},{l:"ఊ",r:"oo",w:"ఊరు",m:"village",t:"v"},
  {l:"ఋ",r:"ru",w:"ఋతువు",m:"season",t:"v"},{l:"ఎ",r:"e",w:"ఎలుక",m:"rat",t:"v"},
  {l:"ఏ",r:"ae",w:"ఏనుగు",m:"elephant",t:"v"},{l:"ఐ",r:"ai",w:"ఐదు",m:"five",t:"v"},
  {l:"ఒ",r:"o",w:"ఒంట్రి",m:"camel",t:"v"},{l:"ఓ",r:"oo2",w:"ఓడ",m:"ship",t:"v"},
  {l:"అం",r:"am",w:"అంబ",m:"sky",t:"v"},{l:"అః",r:"ah",w:"ప్రాతః",m:"morning",t:"v"},
];
const TC=[
  {l:"క",r:"ka",w:"కాకి",m:"crow",t:"c"},{l:"ఖ",r:"kha",w:"ఖర్జూర",m:"date fruit",t:"c"},
  {l:"గ",r:"ga",w:"గడియారం",m:"clock",t:"c"},{l:"ఘ",r:"gha",w:"ఘంట",m:"bell",t:"c"},
  {l:"చ",r:"cha",w:"చేప",m:"fish",t:"c"},{l:"ఛ",r:"chha",w:"ఛత్రం",m:"umbrella",t:"c"},
  {l:"జ",r:"ja",w:"జల్లు",m:"drizzle",t:"c"},{l:"ఝ",r:"jha",w:"ఝరి",m:"waterfall",t:"c"},
  {l:"ట",r:"ta",w:"టమాటా",m:"tomato",t:"c"},{l:"ఠ",r:"tha",w:"ఠీవి",m:"dignity",t:"c"},
  {l:"డ",r:"da",w:"డబ్బు",m:"money",t:"c"},{l:"ఢ",r:"dha",w:"ఢోల్",m:"drum",t:"c"},
  {l:"న",r:"na",w:"నక్క",m:"fox",t:"c"},{l:"ప",r:"pa",w:"పండు",m:"fruit",t:"c"},
  {l:"ఫ",r:"pha",w:"ఫలం",m:"result",t:"c"},{l:"బ",r:"ba",w:"బంతి",m:"ball",t:"c"},
  {l:"భ",r:"bha",w:"భాష",m:"language",t:"c"},{l:"మ",r:"ma",w:"మాట",m:"word",t:"c"},
  {l:"య",r:"ya",w:"యానం",m:"vehicle",t:"c"},{l:"ర",r:"ra",w:"రంగు",m:"colour",t:"c"},
  {l:"ల",r:"la",w:"లేడి",m:"deer",t:"c"},{l:"వ",r:"va",w:"వర్షం",m:"rain",t:"c"},
  {l:"శ",r:"sha",w:"శంఖు",m:"conch",t:"c"},{l:"ష",r:"sha2",w:"షర్ట్",m:"shirt",t:"c"},
  {l:"స",r:"sa",w:"సూర్యుడు",m:"sun",t:"c"},{l:"హ",r:"ha",w:"హంస",m:"swan",t:"c"},
  {l:"ళ",r:"La",w:"ళారు",m:"conjunct",t:"c"},{l:"క్ష",r:"ksha",w:"క్షమ",m:"forgiveness",t:"c"},
];
const HV=[
  {l:"अ",r:"a",w:"अनार",m:"pomegranate",t:"v"},{l:"आ",r:"aa",w:"आम",m:"mango",t:"v"},
  {l:"इ",r:"i",w:"इमली",m:"tamarind",t:"v"},{l:"ई",r:"ee",w:"ईख",m:"sugarcane",t:"v"},
  {l:"उ",r:"u",w:"उल्लू",m:"owl",t:"v"},{l:"ऊ",r:"oo",w:"ऊन",m:"wool",t:"v"},
  {l:"ऋ",r:"ri",w:"ऋषि",m:"sage",t:"v"},{l:"ए",r:"e",w:"एडी",m:"heel",t:"v"},
  {l:"ऐ",r:"ai",w:"ऐनक",m:"spectacles",t:"v"},{l:"ओ",r:"o",w:"ओखली",m:"mortar",t:"v"},
  {l:"औ",r:"au",w:"औरत",m:"woman",t:"v"},{l:"अं",r:"an",w:"अंगूर",m:"grapes",t:"v"},
  {l:"अः",r:"ah",w:"अः",m:"visarga",t:"v"},
];
const HC=[
  {l:"क",r:"ka",w:"कमल",m:"lotus",t:"c"},{l:"ख",r:"kha",w:"खरगोश",m:"rabbit",t:"c"},
  {l:"ग",r:"ga",w:"गाय",m:"cow",t:"c"},{l:"घ",r:"gha",w:"घडी",m:"clock",t:"c"},
  {l:"च",r:"cha",w:"चाँद",m:"moon",t:"c"},{l:"छ",r:"chha",w:"छाता",m:"umbrella",t:"c"},
  {l:"ज",r:"ja",w:"जहाज",m:"ship",t:"c"},{l:"झ",r:"jha",w:"झरना",m:"waterfall",t:"c"},
  {l:"ट",r:"ta",w:"टमाटर",m:"tomato",t:"c"},{l:"ठ",r:"tha",w:"ठंड",m:"cold",t:"c"},
  {l:"ड",r:"da",w:"डाकिया",m:"postman",t:"c"},{l:"ढ",r:"dha",w:"ढोल",m:"drum",t:"c"},
  {l:"ण",r:"Na",w:"णकार",m:"nasal",t:"c"},{l:"त",r:"ta2",w:"तितली",m:"butterfly",t:"c"},
  {l:"थ",r:"tha2",w:"थाली",m:"plate",t:"c"},{l:"द",r:"da2",w:"दरवाजा",m:"door",t:"c"},
  {l:"ध",r:"dha2",w:"धनिया",m:"coriander",t:"c"},{l:"न",r:"na",w:"नल",m:"tap",t:"c"},
  {l:"प",r:"pa",w:"पत्ता",m:"leaf",t:"c"},{l:"फ",r:"pha",w:"फूल",m:"flower",t:"c"},
  {l:"ब",r:"ba",w:"बकरी",m:"goat",t:"c"},{l:"भ",r:"bha",w:"भालू",m:"bear",t:"c"},
  {l:"म",r:"ma",w:"मछली",m:"fish",t:"c"},{l:"य",r:"ya",w:"यात्रा",m:"journey",t:"c"},
  {l:"र",r:"ra",w:"रंग",m:"colour",t:"c"},{l:"ल",r:"la",w:"लडडू",m:"sweet ball",t:"c"},
  {l:"व",r:"va",w:"वर्षा",m:"rain",t:"c"},{l:"श",r:"sha",w:"शेर",m:"lion",t:"c"},
  {l:"ष",r:"sha2",w:"षट्कोण",m:"hexagon",t:"c"},{l:"स",r:"sa",w:"सूरज",m:"sun",t:"c"},
  {l:"ह",r:"ha",w:"हाथी",m:"elephant",t:"c"},
];

const SW=["I","a","the","and","is","in","it","my","you","we","go","no","can","do","for","have","come","here","said","was","look","like","make","see","her","his","she","he","going","from","any","many","into","other","its","now","people","your","been","they","their","there","when","what","where","which","while","would","could","should"];

const MONTHS=[
  {name:"May 2026",theme:"Hello, World!",emoji:"🌍",col:"#F59E0B"},
  {name:"June 2026",theme:"Nature & Growth",emoji:"🌱",col:"#10B981"},
  {name:"July 2026",theme:"My Family & Me",emoji:"👨‍👩‍👧",col:"#F97316"},
  {name:"August 2026",theme:"Animals & Habitats",emoji:"🐾",col:"#8B5CF6"},
  {name:"September 2026",theme:"Community Helpers",emoji:"🏥",col:"#3B82F6"},
  {name:"October 2026",theme:"Food & Festivals",emoji:"🎉",col:"#EF4444"},
  {name:"November 2026",theme:"Transport & Travel",emoji:"✈️",col:"#6366F1"},
  {name:"December 2026",theme:"Weather & Seasons",emoji:"❄️",col:"#0EA5E9"},
  {name:"January 2027",theme:"My Body & Health",emoji:"💪",col:"#14B8A6"},
  {name:"February 2027",theme:"Science & Discovery",emoji:"🔬",col:"#EC4899"},
  {name:"March 2027",theme:"Stories & Imagination",emoji:"📚",col:"#A855F7"},
  {name:"April 2027",theme:"Review & Celebrate!",emoji:"🏆",col:"#F59E0B"},
];

const GAMES=[
  "Letter Sound Bounce: Bounce a ball and say a word starting with today's letter on each catch!",
  "Number Hopscotch: Draw 1 to 10 on the floor and hop to each number while counting!",
  "Alphabet Hunt: Find 5 objects starting with today's letter in 2 minutes!",
  "Clap the Syllables: Clap each syllable in a word. Who can do it fastest?",
  "I Spy Sounds: I spy with my little eye something beginning with... Take turns!",
  "Shape Scavenger Hunt: Find 3 circles, 3 squares, 3 triangles around the house!",
  "Rhyme Time: Say a word. Child finds a rhyme in 5 seconds!",
  "Story Dice: Roll a die, make a story with exactly that many characters!",
  "Simon Says Letters: Simon says point to the letter A, B, C!",
  "Math Market: Pretend shop using number cards to buy and sell items!",
  "Pattern Clap: Clap a pattern, child copies and extends it!",
  "Word Building: Use letter tiles or paper to build today's word!",
  "Number Line Jump: Draw 0 to 20, call a number, child jumps to it!",
  "Tongue Twister: Peter Piper picked a peck of pickled peppers! Who says it fastest?",
  "Sorting Race: Sort 10 objects by colour or shape in 30 seconds!",
  "Mirror Writing: Child writes a letter, parent copies as mirror image!",
  "Animal Sounds Relay: Parent makes animal sound, child names the animal!",
  "Colour Hunt: Find 3 red things, 3 blue things, 3 yellow things!",
  "Counting Steps: Count every step as you walk from room to room!",
  "Question Chain: Ask 5 questions using What, Who, Where, When, Why!",
];

const PATS=[
  ["Straight lines: -- -- -- -- --","Vertical lines: | | | | |","Zigzag: /v/v/v/v"],
  ["Open curves: ( ( ( ( (","Close curves: ) ) ) ) )","Full circles: O O O O O"],
  ["Loops: oo oo oo oo","Bumps down: u u u u u","Arches up: n n n n n"],
  ["Slants right: / / / / /","Slants left: \\ \\ \\ \\ \\","X crosses: x x x x x"],
  ["Wave pattern: ~ ~ ~ ~ ~","Tall strokes: | | | | |","Round shapes: o o o o o"],
  ["C shapes: c c c c c","U shapes: u u u u u","Mixed: c u c u c u"],
  ["Number 1: 1 1 1 1 1","Number 0: 0 0 0 0 0","Curved 2: 2 2 2 2 2"],
  ["S curves: s s s s s","Hooks: j j j j j","Tails down: q q q q q"],
  ["Bridges: n n n n n","Double humps: m m m m","Tall arches: h h h h h"],
  ["Diagonals: k k k k k","T crosses: t t t t t","Y forks: y y y y y"],
];

function isWD(d){return d.getDay()!==0&&d.getDay()!==6;}
function addD(d,n){const r=new Date(d);r.setDate(r.getDate()+n);return r;}
function fmtL(d){return d.toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"});}
function fmtS(d){return d.toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});}
function fmtWD(d){return d.toLocaleDateString("en-GB",{weekday:"long"});}

const ALL_DATES=(()=>{
  const a=[];let c=new Date("2026-05-01");const e=new Date("2027-04-30");
  while(c<=e){if(isWD(c))a.push(new Date(c));c=addD(c,1);}
  return a;
})();

function getTI(i){return i<TV.length?TV[i]:TC[Math.min(i-TV.length,TC.length-1)];}
function getHI(i){return i<HV.length?HV[i]:HC[Math.min(i-HV.length,HC.length-1)];}

function genDay(idx){
  if(idx<0||idx>=ALL_DATES.length)return null;
  const date=ALL_DATES[idx];
  const mIdx=Math.min(Math.floor(idx/20),11);
  const wIdx=Math.floor((idx%20)/5);
  const mo=MONTHS[mIdx];
  const isRev=(idx%5)===4;
  const li=Math.min(Math.floor(idx/2),25);
  const letter=LK[li];
  const ld=EL[letter];
  const ti=getTI(Math.min(idx,TV.length+TC.length-1));
  const hi=getHI(Math.min(idx,HV.length+HC.length-1));
  const sw=SW[Math.min(Math.floor(idx/5),SW.length-1)];
  const game=GAMES[idx%GAMES.length];
  const pat=PATS[idx%PATS.length];
  const mn=Math.min(idx+1,100);
  const a=Math.min((idx%5)+1,5);
  const b=Math.min((idx%4)+1,4);

  const eng=isRev?{
    topic:`Review Week ${wIdx+1}: Letters and Sight Word "${sw}"`,
    objectives:[`Recall sounds for all letters practiced this week`,`Read and write sight word: "${sw}"`,`Use "${sw}" in an original spoken sentence`],
    concept:`Review Day! We look back at everything we learned this week. Flash cards, games, and the special sight word "${sw}" will lock in our learning forever!`,
    steps:[
      {say:`Lets do our Letter Sound Parade! I hold cards, you shout the sounds!`,do:`Flash all this weeks letter cards rapidly, one per second.`,child:`Shouts each sound confidently and earns a star sticker for each correct one!`},
      {say:`Our special sight word this week is "${sw}". Sight words are instant reading friends!`,do:`Write "${sw}" on paper. Use it in 2 sentences and read aloud pointing to each word.`,child:`Traces the sight word 3 times. Reads both sentences aloud pointing to each word.`},
      {say:`Now write "${sw}" from memory. You have got this!`,do:`Give blank paper. Child writes without looking. Celebrate every attempt!`,child:`Writes sight word independently. Draws a picture using the word.`},
    ],
    practice:[
      {q:`Say the sounds from this weeks letters`,a:`All sounds produced correctly`},
      {q:`Read aloud: "${sw}"`,a:`Child reads word instantly without sounding out`},
      {q:`Spell "${sw}" out loud`,a:`Letters spelled correctly`},
      {q:`Use "${sw}" in a sentence`,a:`Any grammatically correct sentence`},
      {q:`Write "${sw}" from memory`,a:`Correct spelling`},
    ],
    examples:ld.w.map(w=>`${letter} is for ${w}`),
  }:{
    topic:idx<52?`Letter ${letter} - Phonics and Recognition`:idx<104?`Blending CVC Words with ${letter}`:idx<156?`Vowel Teams and Long Vowels`:`Reading and Writing - ${mo.theme}`,
    objectives:[`Identify and produce the sound ${ld.s} as in "${ld.w[0]}"`,`Recognize and write uppercase ${letter} and lowercase ${ld.lc}`,`Read aloud: "${ld.sen}"`],
    concept:`Today we meet the amazing letter ${letter}! It makes the sound ${ld.s} like the beginning of "${ld.w[0]}"! The uppercase ${letter} looks like ${ld.d}. The lowercase ${ld.lc} looks like ${ld.ld}.`,
    steps:[
      {say:`Today we meet letter ${letter}! It makes the sound ${ld.s}. Say it with me - ${ld.s}! Like ${ld.w[0]}!`,do:`Hold up ${letter} flashcard with picture of ${ld.w[0]}. Hold tissue to mouth to show air movement.`,child:`Repeats ${ld.s} sound 3 times. Points to the picture and names it.`},
      {say:`Uppercase ${letter} looks like ${ld.d}. Watch me write it! Lowercase ${ld.lc} looks like ${ld.ld}.`,do:`Write ${letter} stroke by stroke with narration. Then write ${ld.lc} stroke by stroke.`,child:`Traces ${letter} and ${ld.lc} in the air 3 times. Traces on paper. Then writes independently.`},
      {say:`${letter} words: ${ld.w.slice(0,3).join(", ")}! Each starts with ${ld.s}! Can you think of another?`,do:`Show picture cards for all 5 words. Sort ${letter} words vs non-${letter} words.`,child:`Names each picture card. Tries to think of their own ${letter} word.`},
      {say:`Lets read together: "${ld.sen}" - point to each word!`,do:`Write sentence on paper. Point to each word as you read. Then child reads alone.`,child:`Reads "${ld.sen}" aloud pointing to each word. Copies sentence on paper.`},
    ],
    practice:[
      {q:`What sound does ${letter} make?`,a:`${ld.s} as in ${ld.w[0]}`},
      {q:`Which word starts with ${letter}? "${ld.w[0]}", "cat", "dog"`,a:`${ld.w[0]}`},
      {q:`Name 2 more things starting with ${letter}`,a:`${ld.w[1]} and ${ld.w[2]} or any correct words`},
      {q:`Read aloud: "${ld.sen}"`,a:`Child reads correctly pointing to each word`},
      {q:`Write ${letter} and ${ld.lc} from memory`,a:`Correct letter formation for both`},
    ],
    examples:ld.w.map(w=>`${letter} is for ${w} - starts with ${ld.s}`),
  };

  const mth=isRev?{
    topic:`Math Review - Week ${wIdx+1} Recap`,
    objectives:[`Review all numbers and concepts from this week`,`Solve 3 mixed problems with confidence`,`Demonstrate learning through physical activity`],
    concept:`Review day is FUN - it is when we show off! We practiced all week and today we prove how much we have grown. Lets count, solve, and celebrate!`,
    steps:[
      {say:`Count with me from 1 to ${Math.min(mn,20)} - as loud as you can!`,do:`Count together clapping each number. Then child counts solo.`,child:`Counts independently to ${Math.min(mn,20)} without mistakes.`},
      {say:`Time for 3 challenge problems! Ready?`,do:`Write 3 problems from this weeks topics on paper.`,child:`Solves each problem and says answer aloud.`},
      {say:`Amazing work! Reward - Number Hopscotch time!`,do:`Draw numbers on floor. Call a number and child hops to it.`,child:`Hops to correct number each time and says it aloud.`},
    ],
    practice:[
      {q:`Count from 1 to ${Math.min(mn,20)}`,a:`Correct unbroken count`},
      {q:`What comes after ${Math.min(mn-1,19)}?`,a:`${Math.min(mn,20)}`},
      {q:`${a} + ${b} = ?`,a:`${a+b}`},
      {q:`Which is more: ${mn-1} or ${mn}?`,a:`${mn}`},
    ],
    examples:[`We learned numbers up to ${mn} this week!`,`Numbers help us every single day!`],
  }:mIdx<2?{
    topic:`Number ${mn} - Recognise, Count and Write`,
    objectives:[`Recognise the numeral ${mn} and connect it to a quantity of ${mn} objects`,`Count ${mn} objects using one-to-one correspondence`,`Write the number ${mn} with correct formation`],
    concept:`Number ${mn} means ${mn} things! Lets count ${mn} objects, write ${mn} beautifully, and find ${mn} everywhere around us!`,
    steps:[
      {say:`Hold up ${mn} fingers! Count with me: ${Array.from({length:Math.min(mn,10)},(_,i)=>i+1).join(", ")}!`,do:`Place ${Math.min(mn,10)} objects on table. Touch each one while counting.`,child:`Holds up fingers and counts objects with one-to-one touch.`},
      {say:`The number ${mn} - watch how I write it step by step!`,do:`Write ${mn} on paper slowly with narration of each stroke.`,child:`Traces ${mn} in air then on paper. Writes independently 3 times.`},
      {say:`Lets go on a ${mn}-hunt! Find exactly ${mn} things at home!`,do:`Give child 60 seconds to find and count objects.`,child:`Finds and counts exactly ${Math.min(mn,5)} objects aloud.`},
      {say:`Compare: here is ${Math.max(mn-1,0)} and here is ${mn}. Which has MORE?`,do:`Place groups side by side on the table.`,child:`Points to ${mn} and says "${mn} is more!"`},
    ],
    practice:[
      {q:`Show me ${mn} fingers`,a:`${mn} fingers raised correctly`},
      {q:`How many? ${Array.from({length:Math.min(mn,8)},()=>"*").join(" ")}`,a:`${mn}`},
      {q:`What number comes just before ${mn}?`,a:`${mn-1}`},
      {q:`What number comes just after ${mn}?`,a:`${mn+1}`},
      {q:`Write the number ${mn} from memory`,a:`Correct stroke formation`},
    ],
    examples:[`${mn} - count ${mn} objects around you right now!`,`${mn} comes after ${mn-1} and before ${mn+1}`,`Write ${mn} in the air with your finger!`],
  }:mIdx<7?{
    topic:`Addition and Subtraction - Numbers to ${Math.min(mn,20)}`,
    objectives:[`Add ${a} plus ${b} equals ${a+b} using objects`,`Subtract ${b} from ${a+b} to get ${a}`,`Write addition and subtraction number sentences`],
    concept:`Addition means getting MORE like more apples! Subtraction means taking AWAY like eating biscuits! ${a} plus ${b} equals ${a+b}. And ${a+b} minus ${b} equals ${a}!`,
    steps:[
      {say:`If I have ${a} apples and you give me ${b} more - how many altogether?`,do:`Place ${a} objects then add ${b}. Count all together.`,child:`Counts all objects and writes total.`},
      {say:`Lets write: ${a} + ${b} = ___`,do:`Write ${a} + ${b} = blank on paper.`,child:`Writes the answer: ${a+b}.`},
      {say:`Now subtraction! I have ${a+b} and take away ${b}. Whats left?`,do:`Remove ${b} objects. Count remaining ones.`,child:`Counts remaining and says "${a} left!"`},
      {say:`${a+b} minus ${b} equals ${a}! Now lets try one more!`,do:`Create a new scenario with different numbers.`,child:`Solves independently using objects.`},
    ],
    practice:[
      {q:`${a} + ${b} = ?`,a:`${a+b}`},
      {q:`${a+b} - ${b} = ?`,a:`${a}`},
      {q:`Draw ${a} circles. Add ${b} more. How many?`,a:`${a+b} circles drawn and counted`},
      {q:`${a+b} biscuits, eat ${a}. How many left?`,a:`${b}`},
      {q:`Which is bigger: ${a} or ${a+b}?`,a:`${a+b}`},
    ],
    examples:[`${a} cats + ${b} dogs = ${a+b} animals!`,`${a+b} biscuits minus eat ${b} equals ${a} left!`,`${a} + ${b} = ${b} + ${a} same answer both ways!`],
  }:{
    topic:`Multiplication and Division Practice`,
    objectives:[`Understand multiplication as equal groups`,`Calculate using the ${Math.min(mIdx,10)} times table`,`Write multiplication number sentence`],
    concept:`Multiplication is a SUPER FAST way to add the same number many times! ${Math.min(mIdx,10)} times ${a} equals ${Math.min(mIdx,10)*a}! Groups make it easy!`,
    steps:[
      {say:`Lets make ${Math.min(mIdx,5)} groups of ${a} objects!`,do:`Arrange objects in equal groups on the table.`,child:`Creates groups and counts the total.`},
      {say:`${Math.min(mIdx,5)} times ${a} equals ${Math.min(mIdx,5)*a}! Lets say it 3 times!`,do:`Write multiplication sentence on paper.`,child:`Reads and writes the multiplication sentence.`},
      {say:`${Math.min(mIdx,5)} times ${a} equals ${Math.min(mIdx,5)*a}! Can you remember that?`,do:`Create a clapping rhythm for the fact.`,child:`Chants the multiplication fact with clapping.`},
    ],
    practice:[
      {q:`${Math.min(mIdx,5)} x ${a} = ?`,a:`${Math.min(mIdx,5)*a}`},
      {q:`${a} x ${Math.min(mIdx,5)} = ?`,a:`${Math.min(mIdx,5)*a} same answer!`},
      {q:`Draw ${Math.min(mIdx,4)} groups of ${a}`,a:`Correct drawing with ${Math.min(mIdx,4)*a} total`},
      {q:`${Math.min(mIdx,4)} plates with ${a} biscuits each. Total?`,a:`${Math.min(mIdx,4)*a}`},
    ],
    examples:[`${Math.min(mIdx,4)} plates times ${a} biscuits = ${Math.min(mIdx,4)*a} biscuits!`,`Groups make multiplication easy and fast!`],
  };

  const tel=isRev?{
    topic:`Telugu Review - Week ${wIdx+1}`,
    objectives:[`Recall all Telugu letters from this week`,`Give one word for each letter`,`Write all letters from memory`],
    concept:`This week we learned so many Telugu letters! Today we read and write them all again. You have learned beautifully!`,
    steps:[
      {say:`Say all the letters we learned this week!`,do:`Show all this weeks flashcards rapidly.`,child:`Names each letter and its sound.`},
      {say:`Give one word for each letter!`,do:`Matching activity with picture cards.`,child:`Matches and says words aloud.`},
      {say:`Now write all letters from memory!`,do:`Provide blank paper for independent writing.`,child:`Writes all letters independently.`},
    ],
    practice:[
      {q:`Say this weeks Telugu letters`,a:`All letters from this week`},
      {q:`What does ${ti.w} mean?`,a:`${ti.m}`},
      {q:`Write all this weeks letters`,a:`Correct formation`},
      {q:`Use ${ti.l} in a word`,a:`${ti.w} or any correct word`},
    ],
    examples:[`${ti.l} is for ${ti.w} meaning ${ti.m}`,`We learned ${ti.t==="v"?"vowels":"consonants"} this week!`],
  }:{
    topic:`Telugu ${ti.t==="v"?"Vowel":"Consonant"}: ${ti.l} (${ti.r})`,
    objectives:[`Recognize the Telugu ${ti.t==="v"?"vowel":"consonant"} ${ti.l}`,`Say the sound ${ti.r} correctly`,`Learn the word ${ti.w} meaning ${ti.m}`],
    concept:`${ti.l} is a Telugu ${ti.t==="v"?"vowel":"consonant"}. Its sound is ${ti.r}. ${ti.w} means ${ti.m}! This letter is very important in Telugu!`,
    steps:[
      {say:`Look at this letter - ${ti.l}! It makes the ${ti.r} sound!`,do:`Show large ${ti.l} flashcard with picture of ${ti.m}.`,child:`Says ${ti.r} sound 3 times clearly.`},
      {say:`${ti.w} means ${ti.m}! Look at this picture!`,do:`Show picture or real object representing ${ti.m}.`,child:`Repeats ${ti.w} and its meaning.`},
      {say:`Lets write ${ti.l} slowly together!`,do:`Write ${ti.l} stroke by stroke on paper.`,child:`Traces ${ti.l} 3 times with guide then independently.`},
      {say:`Can you name another word starting with ${ti.l}?`,do:`Give category clues if needed.`,child:`Attempts to name one more ${ti.l} word.`},
    ],
    practice:[
      {q:`Say the sound of ${ti.l}`,a:`${ti.r}`},
      {q:`What does ${ti.w} mean in English?`,a:`${ti.m}`},
      {q:`Write ${ti.l} three times`,a:`Correct letter formation`},
      {q:`Name a word starting with ${ti.l}`,a:`${ti.w} or any correct word`},
    ],
    examples:[`${ti.l} is for ${ti.w} meaning ${ti.m}`,`The sound ${ti.r} - say it now!`,`${ti.w} is a word we use every day!`],
  };

  const hin=isRev?{
    topic:`Hindi Review - Week ${wIdx+1}`,
    objectives:[`Recall all Hindi letters from this week`,`Give one word for each letter`,`Write all letters from memory`],
    concept:`We learned so much this week! Today we review everything - read, write, and play! You are very smart!`,
    steps:[
      {say:`Lets say all the letters from this week!`,do:`Show all this weeks flashcards rapidly.`,child:`Names each letter and gives one word example.`},
      {say:`Now match letter to picture!`,do:`Matching activity with cards.`,child:`Matches correctly and says each word aloud.`},
      {say:`Write without looking!`,do:`Provide blank paper for independent writing.`,child:`Writes all letters from memory.`},
    ],
    practice:[
      {q:`Say this weeks Hindi letters`,a:`All letters from this week`},
      {q:`What does ${hi.w} mean?`,a:`${hi.m}`},
      {q:`Write all this weeks letters`,a:`Correct formation`},
      {q:`Use ${hi.l} in a sentence`,a:`Any correct sentence`},
    ],
    examples:[`${hi.l} is for ${hi.w} meaning ${hi.m}`,`We learned ${hi.t==="v"?"vowels":"consonants"} this week!`],
  }:{
    topic:`Hindi ${hi.t==="v"?"Vowel":"Consonant"}: ${hi.l} (${hi.r})`,
    objectives:[`Recognize the Hindi ${hi.t==="v"?"vowel":"consonant"} ${hi.l}`,`Say the sound ${hi.r} correctly`,`Learn the word ${hi.w} meaning ${hi.m}`],
    concept:`${hi.l} is a Hindi ${hi.t==="v"?"vowel":"consonant"}. Its sound is ${hi.r}. ${hi.w} means ${hi.m}! This letter is very important in Hindi!`,
    steps:[
      {say:`Look at this letter - ${hi.l}! It makes the ${hi.r} sound!`,do:`Show ${hi.l} flashcard with ${hi.w} picture.`,child:`Repeats ${hi.r} sound 3 times.`},
      {say:`${hi.w} means ${hi.m}! Look at the picture!`,do:`Show picture or object for ${hi.m}.`,child:`Repeats word and meaning.`},
      {say:`Now lets write ${hi.l} carefully!`,do:`Write ${hi.l} stroke by stroke on paper.`,child:`Traces 3 times then writes independently.`},
      {say:`What other words start with ${hi.l}?`,do:`Give clues if needed.`,child:`Names 1-2 more words starting with ${hi.l}.`},
    ],
    practice:[
      {q:`What sound does ${hi.l} make?`,a:`${hi.r}`},
      {q:`What does ${hi.w} mean in English?`,a:`${hi.m}`},
      {q:`Write ${hi.l} three times`,a:`Correct formation`},
      {q:`Name another word starting with ${hi.l}`,a:`${hi.w} or any correct word`},
    ],
    examples:[`${hi.l} is for ${hi.w} meaning ${hi.m}`,`Say ${hi.r} right now!`,`${hi.w} is used in daily life!`],
  };

  const wrt={
    english:[
      `Trace uppercase: ${letter} ${letter} ${letter} ${letter} ${letter}`,
      `Trace lowercase: ${ld.lc} ${ld.lc} ${ld.lc} ${ld.lc} ${ld.lc}`,
      `Trace word: ${ld.w[0]}`,
      `Trace sentence: ${ld.sen}`,
      `Write independently: ${letter} - ${ld.lc} - ${ld.w[0]} - ${ld.w[1]}`,
    ],
    telugu:[
      `Trace: ${ti.l} ${ti.l} ${ti.l} ${ti.l} ${ti.l}`,
      `Trace word: ${ti.w}`,
      `Write ${ti.l} independently 3 times`,
      `Copy: ${ti.w} means ${ti.m}`,
    ],
    hindi:[
      `Trace: ${hi.l} ${hi.l} ${hi.l} ${hi.l} ${hi.l}`,
      `Trace word: ${hi.w}`,
      `Write ${hi.l} independently 3 times`,
      `Copy: ${hi.w} means ${hi.m}`,
    ],
    patterns:pat,
    tip:`Use correct pencil grip - thumb plus index finger equals pincer grip. Child says the sound or name while writing. Praise every attempt - perfection comes with practice!`,
  };

  const ws={
    A:[
      `1. Circle all "${letter}" and "${ld.lc}" in this row: B ${letter} c ${ld.lc} D ${letter} b`,
      `2. Match with a line: ${ld.w[0]} to ${letter} | ${ld.w[1]} to ${letter} | cat to C`,
      `3. Trace and colour: Draw a big ${letter} and put a picture of ${ld.w[0]} inside it`,
      `4. Circle the word starting with ${letter}: ${ld.w[0]} / cat / ball / door`,
      `5. Sight word box: Trace and write "${sw}" then say a sentence using it`,
    ],
    B:[
      `1. Count the pictures and write the number: (${mn} objects shown) = ___`,
      `2. Trace the number: ${mn}  ${mn}  ${mn}  ${mn}`,
      `3. Solve: ${a} + ${b} = ___ (use objects to help!)`,
      `4. Circle the bigger group: [${a} dots] or [${a+b} dots]`,
      `5. Draw ${Math.min(mn,5)} stars in the box`,
    ],
    C:[
      `1. Trace: ${ti.l}  ${ti.l}  ${ti.l}  ${ti.l}`,
      `2. Match: ${ti.l} to picture of ${ti.m}`,
      `3. Colour the picture of ${ti.m}`,
      `4. Write the word: ${ti.w}`,
    ],
    D:[
      `1. Trace: ${hi.l}  ${hi.l}  ${hi.l}  ${hi.l}`,
      `2. Circle: ${hi.w} starts with ${hi.l} - True or False?`,
      `3. Draw a picture of ${hi.m}`,
      `4. Write the word: ${hi.w}`,
    ],
    E:[
      `Fun Draw: Draw your favourite "${ld.w[0]}" and label it with the letter ${letter}!`,
      `Speaking: Tell 3 sentences about a ${ld.w[0]}! What is it? What colour? Where does it live?`,
      `Movement: Act like a ${ld.w[0]} for 10 seconds!`,
      `Fill in: My favourite thing starting with ${letter} is: ___________________________`,
    ],
  };

  const ak={
    A:[
      `1. All ${letter} and ${ld.lc} letters correctly circled`,
      `2. ${ld.w[0]} to ${letter} correct | ${ld.w[1]} to ${letter} correct | cat to C correct`,
      `3. ${letter} drawn with ${ld.w[0]} picture inside - any representation accepted`,
      `4. ${ld.w[0]} circled - correct!`,
      `5. "${sw}" traced and written correctly`,
    ],
    B:[
      `1. ${mn} written correctly`,
      `2. ${mn} traced 4 times with correct formation`,
      `3. ${a} + ${b} = ${a+b}`,
      `4. ${a+b} dots group circled - correct!`,
      `5. ${Math.min(mn,5)} stars drawn`,
    ],
    C:[
      `1. ${ti.l} traced correctly 4 times`,
      `2. ${ti.l} matched to ${ti.m} picture - correct!`,
      `3. ${ti.m} picture coloured`,
      `4. ${ti.w} written correctly`,
    ],
    D:[
      `1. ${hi.l} traced correctly 4 times`,
      `2. True - ${hi.w} starts with ${hi.l}`,
      `3. ${hi.m} drawn`,
      `4. ${hi.w} written correctly`,
    ],
    E:[
      `1. Any drawing of ${ld.w[0]} with ${letter} label accepted`,
      `2. Any 3 sentences about ${ld.w[0]} accepted`,
      `3. Creative movement - any attempt accepted`,
      `4. Child personal answer`,
    ],
  };

  const storOpts=[
    `The Amazing ${ld.w[0]}: Once upon a time a tiny ${ld.w[0]} named ${letter}ly wanted to explore the world. Along the way ${letter}ly met a ${ld.w[1]} and a ${ld.w[2]}! They counted to ${(idx%9)+2} together and had a magical adventure! Ask your child: What are the 3 friends? What sound does ${letter} make?`,
    `The Letter Garden: In a magical garden every flower was shaped like a letter. The ${letter} flower was the most beautiful with ${(idx%5)+1} petals! Every bee said ${ld.s} when visiting! Ask your child: How many petals? What sound does ${letter} make?`,
    `The Number ${Math.min(mn,10)} Adventure: One day the number ${Math.min(mn,10)} went for a walk and found ${Math.min(mn-1,9)} friends! They all counted together from 1 to ${Math.min(mn,10)}! Ask: What number went walking? How many friends joined?`,
  ];

  const spkOpts=[
    `Word Parade: Stand tall and say 5 words starting with ${letter}! Jump for each one!`,
    `Sentence Challenge: Use "${ld.w[0]}" in 3 different sentences. Say them out loud!`,
    `Show and Tell: Find 1 object starting with ${letter}. Say what it is, what colour it is, and what you use it for.`,
    `Story Builder: Make a 5-sentence story using these words: ${ld.w.slice(0,3).join(", ")}. Parent writes it down!`,
    `Telugu Talk: Say ${ti.w} meaning ${ti.m} - practice the Telugu word 3 times!`,
    `Hindi Talk: Say ${hi.w} meaning ${hi.m} - practice the Hindi word 3 times!`,
    `Counting Race: Count ${mn} objects in the room - how fast can you do it?`,
  ];

  return{
    dayNumber:idx+1,
    date:fmtL(date),
    shortDate:fmtS(date),
    weekday:fmtWD(date),
    monthIdx:mIdx,
    monthName:mo.name,
    monthTheme:mo.theme,
    monthEmoji:mo.emoji,
    monthCol:mo.col,
    weekNum:wIdx+1,
    dayInWeek:(idx%5)+1,
    isRev,
    letter,sw,mn,
    ti,hi,
    english:eng,math:mth,telugu:tel,hindi:hin,
    writing:wrt,worksheet:ws,answerKey:ak,
    engagement:{
      game,
      story:storOpts[idx%storOpts.length],
      speaking:spkOpts[idx%spkOpts.length],
      reflection:[
        `What was your favourite thing you learned today?`,
        `Can you TEACH me one thing from today? You become the teacher!`,
        `What was the trickiest part? Lets try it ONE more time together!`,
        `Give a BIG HUG and say: You are a BRILLIANT learner and I am SO proud of you!`,
      ],
    },
  };
}

const DAY_IDX=ALL_DATES.map((date,idx)=>{
  const mIdx=Math.min(Math.floor(idx/20),11);
  const wIdx=Math.floor((idx%20)/5);
  const li=Math.min(Math.floor(idx/2),25);
  return{idx,dayNumber:idx+1,shortDate:fmtS(date),weekday:fmtWD(date),monthIdx:mIdx,weekNum:wIdx+1,dayInWeek:(idx%5)+1,letter:LK[li],isRev:(idx%5)===4};
});

const BY_MW=Array.from({length:12},(_,mi)=>{
  const md=DAY_IDX.filter(d=>d.monthIdx===mi);
  const wk=[[],[],[],[]];
  md.forEach(d=>wk[Math.min(d.weekNum-1,3)].push(d));
  return wk.filter(w=>w.length>0);
});

const SM2={english:{ic:"🔤",lb:"English",bg:"#EFF6FF",br:"#93C5FD",ac:"#1D4ED8"},math:{ic:"🔢",lb:"Math",bg:"#F0FDF4",br:"#86EFAC",ac:"#15803D"},telugu:{ic:"🌸",lb:"Telugu",bg:"#FFF7ED",br:"#FDBA74",ac:"#C2410C"},hindi:{ic:"🪔",lb:"Hindi",bg:"#F5F3FF",br:"#C4B5FD",ac:"#6D28D9"}};
const SEC={A:{ic:"🔤",lb:"English",bg:"#EFF6FF",br:"#93C5FD",ac:"#1D4ED8"},B:{ic:"🔢",lb:"Math",bg:"#F0FDF4",br:"#86EFAC",ac:"#15803D"},C:{ic:"🌸",lb:"Telugu",bg:"#FFF7ED",br:"#FDBA74",ac:"#C2410C"},D:{ic:"🪔",lb:"Hindi",bg:"#F5F3FF",br:"#C4B5FD",ac:"#6D28D9"},E:{ic:"🎉",lb:"Fun Activity",bg:"#FFF1F2",br:"#FCA5A5",ac:"#BE123C"}};

export default function App(){
  const[view,setView]=useState("home");
  const[selMonth,setSelMonth]=useState(0);
  const[selIdx,setSelIdx]=useState(0);
  const[tab,setTab]=useState("teach");
  const[openS,setOpenS]=useState(null);
  const[done,setDone]=useState({});

  const day=useMemo(()=>genDay(selIdx),[selIdx]);
  const mo=MONTHS[selMonth];
  const totalDone=Object.values(done).filter(Boolean).length;
  const pct=Math.round((totalDone/ALL_DATES.length)*100);

  const goDay=useCallback((idx)=>{setSelIdx(idx);setSelMonth(DAY_IDX[idx].monthIdx);setTab("teach");setOpenS(null);setView("day");},[]);
  const toggle=useCallback((n)=>setDone(p=>({...p,[n]:!p[n]})),[]);

  if(view==="home") return(
    <div style={{fontFamily:"'Segoe UI',sans-serif",background:"linear-gradient(160deg,#0F172A,#1E1B4B,#0C4A6E)",minHeight:"100vh",padding:"28px 14px 36px"}}>
      <div style={{maxWidth:"700px",margin:"0 auto",textAlign:"center"}}>
        <div style={{fontSize:"11px",letterSpacing:"4px",color:"#818CF8",marginBottom:"8px",fontFamily:"monospace"}}>CAMBRIDGE EYFS STAGE 3 - AGE 4.5</div>
        <h1 style={{color:"white",fontSize:"clamp(20px,5vw,36px)",margin:"0 0 6px",fontWeight:"900"}}>Complete Year Curriculum</h1>
        <div style={{color:"#BAE6FD",fontSize:"14px",marginBottom:"4px"}}>May 1, 2026 to April 30, 2027</div>
        <div style={{color:"#7DD3FC",fontSize:"12px",marginBottom:"22px"}}>{ALL_DATES.length} School Days - 6 Subjects Daily - 3 Hours Per Day</div>
        <div style={{display:"flex",justifyContent:"center",gap:"8px",flexWrap:"wrap",marginBottom:"20px"}}>
          {[["📅",ALL_DATES.length,"Days"],["📚","12","Months"],["🔤","A-Z","English"],["🌸","42","Telugu"],["🪔","43","Hindi"],["🔢","1-100","Math"]].map(([ic,v,l])=>(
            <div key={l} style={{background:"rgba(255,255,255,0.1)",borderRadius:"10px",padding:"10px 12px",border:"1px solid rgba(255,255,255,0.15)",minWidth:"80px"}}>
              <div style={{fontSize:"16px"}}>{ic}</div>
              <div style={{color:"white",fontWeight:"bold",fontSize:"15px"}}>{v}</div>
              <div style={{color:"#94A3B8",fontSize:"10px"}}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{background:"rgba(255,255,255,0.1)",borderRadius:"10px",padding:"12px",border:"1px solid rgba(255,255,255,0.15)",marginBottom:"20px",maxWidth:"380px",margin:"0 auto 20px"}}>
          <div style={{display:"flex",justifyContent:"space-between",color:"white",fontSize:"12px",marginBottom:"6px"}}>
            <span>Progress</span><span style={{fontWeight:"bold"}}>{totalDone}/{ALL_DATES.length} ({pct}%)</span>
          </div>
          <div style={{background:"rgba(255,255,255,0.2)",borderRadius:"6px",height:"8px",overflow:"hidden"}}>
            <div style={{background:"linear-gradient(90deg,#34D399,#10B981)",height:"100%",width:`${pct}%`,transition:"width 0.4s"}}/>
          </div>
        </div>
        <div style={{color:"#E2E8F0",fontSize:"14px",fontWeight:"bold",marginBottom:"10px"}}>Select a Month</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:"8px"}}>
          {MONTHS.map((m,i)=>{
            const md=DAY_IDX.filter(d=>d.monthIdx===i);
            const mc=md.filter(d=>done[d.dayNumber]).length;
            const mp=md.length?Math.round((mc/md.length)*100):0;
            return(
              <button key={i} onClick={()=>{setSelMonth(i);setView("month");}} style={{background:"rgba(255,255,255,0.07)",border:"2px solid rgba(255,255,255,0.12)",borderRadius:"12px",padding:"12px 10px",cursor:"pointer",textAlign:"left",color:"white"}}>
                <div style={{fontSize:"20px",marginBottom:"3px"}}>{m.emoji}</div>
                <div style={{fontWeight:"bold",fontSize:"11px",marginBottom:"2px"}}>{m.name}</div>
                <div style={{fontSize:"10px",color:"#94A3B8",marginBottom:"6px"}}>{m.theme}</div>
                <div style={{background:"rgba(255,255,255,0.15)",borderRadius:"3px",height:"3px",overflow:"hidden"}}>
                  <div style={{background:m.col,height:"100%",width:`${mp}%`}}/>
                </div>
                <div style={{fontSize:"9px",color:"#94A3B8",marginTop:"3px"}}>{mc}/{md.length} done</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  if(view==="month"){
    const weeks=BY_MW[selMonth]||[];
    const md=DAY_IDX.filter(d=>d.monthIdx===selMonth);
    const mc=md.filter(d=>done[d.dayNumber]).length;
    return(
      <div style={{fontFamily:"'Segoe UI',sans-serif",background:"#F8FAFC",minHeight:"100vh"}}>
        <div style={{background:`${mo.col}22`,borderBottom:"2px solid #E2E8F0",padding:"14px"}}>
          <button onClick={()=>setView("home")} style={{background:"none",border:"1px solid #CBD5E1",borderRadius:"7px",padding:"5px 10px",cursor:"pointer",color:"#475569",fontSize:"12px",marginBottom:"8px"}}>Back to Home</button>
          <div style={{fontSize:"24px"}}>{mo.emoji}</div>
          <h2 style={{margin:"3px 0",color:"#1E293B",fontSize:"18px"}}>{mo.name} - {mo.theme}</h2>
          <div style={{color:"#64748B",fontSize:"12px"}}>{md.length} school days - {mc} completed</div>
        </div>
        <div style={{padding:"12px",maxWidth:"660px",margin:"0 auto"}}>
          {weeks.map((wkD,wi)=>(
            <div key={wi} style={{background:"white",borderRadius:"12px",border:"2px solid #E2E8F0",marginBottom:"10px",overflow:"hidden"}}>
              <div style={{background:`${mo.col}18`,padding:"9px 14px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontWeight:"bold",color:"#1E293B",fontSize:"13px"}}>Week {wi+1}</div>
                <div style={{fontSize:"11px",color:"#64748B"}}>{ALL_DATES[wkD[0].idx]?fmtS(ALL_DATES[wkD[0].idx]):""} to {ALL_DATES[wkD[wkD.length-1].idx]?fmtS(ALL_DATES[wkD[wkD.length-1].idx]):""}</div>
              </div>
              <div style={{padding:"8px",display:"grid",gap:"5px"}}>
                {wkD.map(di=>(
                  <button key={di.dayNumber} onClick={()=>goDay(di.idx)} style={{width:"100%",background:done[di.dayNumber]?"#F0FDF4":"#FAFAFA",border:`1px solid ${done[di.dayNumber]?"#86EFAC":"#E2E8F0"}`,borderRadius:"9px",padding:"9px 12px",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontWeight:"bold",color:"#1E293B",fontSize:"13px"}}>Day {di.dayNumber} - {di.weekday}</div>
                      <div style={{fontSize:"11px",color:"#64748B"}}>{di.shortDate} - Letter {di.letter} - {di.isRev?"Review Day":"Teaching Day"}</div>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
                      {done[di.dayNumber]&&<span style={{color:"#16A34A",fontSize:"14px"}}>Done</span>}
                      <span style={{color:"#94A3B8",fontSize:"16px"}}>›</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if(!day) return <div style={{padding:40,textAlign:"center",fontFamily:"sans-serif",fontSize:"18px"}}>Loading day {selIdx+1}...</div>;

  const dm=MONTHS[day.monthIdx];
  const TABS=[{id:"teach",l:"Teaching"},{id:"writing",l:"Writing"},{id:"worksheet",l:"Worksheet"},{id:"answers",l:"Answers"},{id:"engage",l:"Engage"}];

  return(
    <div style={{fontFamily:"'Segoe UI',sans-serif",background:"#F1F5F9",minHeight:"100vh"}}>
      <div style={{background:"white",borderBottom:"2px solid #E2E8F0",padding:"9px 12px",position:"sticky",top:0,zIndex:40}}>
        <div style={{maxWidth:"820px",margin:"0 auto",display:"flex",gap:"5px",alignItems:"center",flexWrap:"wrap"}}>
          <button onClick={()=>setView("month")} style={{background:"none",border:"1px solid #CBD5E1",borderRadius:"7px",padding:"4px 9px",cursor:"pointer",color:"#475569",fontSize:"11px"}}>Back</button>
          <button onClick={()=>{if(selIdx>0)goDay(selIdx-1);}} disabled={selIdx===0} style={{background:"none",border:"1px solid #CBD5E1",borderRadius:"7px",padding:"4px 8px",cursor:selIdx===0?"default":"pointer",color:selIdx===0?"#CBD5E1":"#475569",fontSize:"12px"}}>Prev</button>
          <div style={{flex:1,textAlign:"center",fontWeight:"bold",color:"#1E293B",fontSize:"12px"}}>Day {day.dayNumber} of {ALL_DATES.length}</div>
          <button onClick={()=>{if(selIdx<ALL_DATES.length-1)goDay(selIdx+1);}} disabled={selIdx===ALL_DATES.length-1} style={{background:"none",border:"1px solid #CBD5E1",borderRadius:"7px",padding:"4px 8px",cursor:selIdx===ALL_DATES.length-1?"default":"pointer",color:selIdx===ALL_DATES.length-1?"#CBD5E1":"#475569",fontSize:"12px"}}>Next</button>
          <button onClick={()=>toggle(day.dayNumber)} style={{background:done[day.dayNumber]?"#16A34A":"white",border:`2px solid ${done[day.dayNumber]?"#16A34A":"#CBD5E1"}`,borderRadius:"7px",padding:"4px 9px",cursor:"pointer",color:done[day.dayNumber]?"white":"#475569",fontSize:"11px"}}>
            {done[day.dayNumber]?"Done!":"Mark Done"}
          </button>
        </div>
      </div>

      <div style={{maxWidth:"820px",margin:"0 auto",padding:"12px"}}>
        <div style={{background:`linear-gradient(135deg,${dm.col}28,${dm.col}10)`,borderRadius:"12px",padding:"14px",marginBottom:"12px",border:`2px solid ${dm.col}44`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"8px"}}>
            <div>
              <div style={{fontSize:"10px",letterSpacing:"2px",color:"#64748B",marginBottom:"2px"}}>MONTH {day.monthIdx+1} - WEEK {day.weekNum} - DAY {day.dayInWeek}</div>
              <h2 style={{margin:"0 0 2px",color:"#1E293B",fontSize:"17px",fontWeight:"900"}}>Day {day.dayNumber} - {day.date}</h2>
              <div style={{color:"#475569",fontSize:"12px"}}>{dm.emoji} {dm.theme}</div>
              {day.isRev&&<span style={{background:"#FEF3C7",border:"1px solid #F59E0B",borderRadius:"5px",padding:"2px 7px",marginTop:"5px",display:"inline-block",fontSize:"11px",color:"#92400E"}}>Review Day</span>}
            </div>
            <div style={{background:"white",borderRadius:"9px",padding:"9px 11px",border:"1px solid #E2E8F0",fontSize:"10px",color:"#374151"}}>
              <div style={{fontWeight:"bold",marginBottom:"4px"}}>Daily Schedule</div>
              {["🔤 English 30 min","🔢 Math 30 min","🌸 Telugu 30 min","🪔 Hindi 30 min","✏️ Writing 30 min","🎉 Activity 30 min"].map(s=><div key={s}>{s}</div>)}
            </div>
          </div>
        </div>

        <div style={{display:"flex",gap:"4px",marginBottom:"12px",flexWrap:"wrap"}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"6px 11px",borderRadius:"8px",border:"2px solid",cursor:"pointer",fontSize:"12px",fontWeight:"bold",borderColor:tab===t.id?dm.col:"#E2E8F0",background:tab===t.id?`${dm.col}22`:"white",color:tab===t.id?"#1E293B":"#64748B"}}>
              {t.l}
            </button>
          ))}
        </div>

        {tab==="teach"&&["english","math","telugu","hindi"].map(subj=>{
          const s=SM2[subj];const data=day[subj];const op=openS===subj;
          return(
            <div key={subj} style={{marginBottom:"9px",borderRadius:"12px",border:`2px solid ${s.br}`,overflow:"hidden",background:"white"}}>
              <button onClick={()=>setOpenS(op?null:subj)} style={{width:"100%",padding:"11px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",border:"none",background:op?s.bg:"white",textAlign:"left"}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                  <span style={{fontSize:"22px"}}>{s.ic}</span>
                  <div>
                    <div style={{fontWeight:"bold",fontSize:"13px",color:"#1E293B"}}>{s.lb} - 30 Minutes</div>
                    <div style={{fontSize:"11px",color:"#64748B"}}>{data.topic}</div>
                  </div>
                </div>
                <span style={{color:s.ac,fontSize:"16px",fontWeight:"bold"}}>{op?"▲":"▼"}</span>
              </button>
              {op&&(
                <div style={{padding:"14px",background:s.bg,borderTop:`1px solid ${s.br}`}}>
                  <div style={{background:"white",borderRadius:"9px",padding:"10px",marginBottom:"9px",border:`1px solid ${s.br}`}}>
                    <div style={{fontWeight:"bold",color:s.ac,marginBottom:"5px",fontSize:"12px"}}>Learning Objectives</div>
                    {data.objectives.map((o,i)=><div key={i} style={{fontSize:"12px",color:"#374151",marginBottom:"3px",display:"flex",gap:"4px"}}><span style={{color:"#16A34A"}}>✓</span><span>{o}</span></div>)}
                  </div>
                  <div style={{background:"white",borderRadius:"9px",padding:"10px",marginBottom:"9px",border:`1px solid ${s.br}`}}>
                    <div style={{fontWeight:"bold",color:s.ac,marginBottom:"5px",fontSize:"12px"}}>Concept Explanation</div>
                    <div style={{fontSize:"12px",color:"#374151",fontStyle:"italic",lineHeight:"1.7"}}>{data.concept}</div>
                  </div>
                  <div style={{marginBottom:"9px"}}>
                    <div style={{fontWeight:"bold",color:"#1E293B",marginBottom:"7px",fontSize:"12px"}}>Teaching Steps</div>
                    {data.steps.map((step,i)=>(
                      <div key={i} style={{background:"white",borderRadius:"9px",padding:"10px",marginBottom:"7px",border:`1px solid ${s.br}`}}>
                        <div style={{fontWeight:"bold",color:s.ac,marginBottom:"5px",fontSize:"11px"}}>STEP {i+1}</div>
                        <div style={{display:"grid",gap:"4px"}}>
                          <div style={{background:"#EDE9FE",borderRadius:"6px",padding:"6px 8px"}}><strong style={{color:"#5B21B6",fontSize:"10px"}}>PARENT SAYS: </strong><span style={{fontSize:"12px",color:"#374151"}}>{step.say}</span></div>
                          <div style={{background:"#FEF9C3",borderRadius:"6px",padding:"6px 8px"}}><strong style={{color:"#92400E",fontSize:"10px"}}>PARENT DOES: </strong><span style={{fontSize:"12px",color:"#374151"}}>{step.do}</span></div>
                          <div style={{background:"#DCFCE7",borderRadius:"6px",padding:"6px 8px"}}><strong style={{color:"#166534",fontSize:"10px"}}>CHILD DOES: </strong><span style={{fontSize:"12px",color:"#374151"}}>{step.child}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{background:"white",borderRadius:"9px",padding:"10px",marginBottom:"9px",border:`1px solid ${s.br}`}}>
                    <div style={{fontWeight:"bold",color:s.ac,marginBottom:"5px",fontSize:"12px"}}>Examples</div>
                    {data.examples.map((e,i)=><div key={i} style={{fontSize:"12px",color:"#374151",marginBottom:"2px"}}>• {e}</div>)}
                  </div>
                  <div style={{background:"white",borderRadius:"9px",padding:"10px",border:`1px solid ${s.br}`}}>
                    <div style={{fontWeight:"bold",color:s.ac,marginBottom:"7px",fontSize:"12px"}}>Guided Practice with Answers</div>
                    {data.practice.map((p,i)=>(
                      <div key={i} style={{background:s.bg,borderRadius:"7px",padding:"8px",marginBottom:"5px",border:`1px solid ${s.br}`}}>
                        <div style={{fontSize:"12px",color:"#1E293B",marginBottom:"3px"}}><strong>Q{i+1}:</strong> {p.q}</div>
                        <div style={{fontSize:"11px",color:"#16A34A",background:"#F0FDF4",padding:"3px 7px",borderRadius:"4px"}}>Answer: {p.a}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {tab==="writing"&&(
          <div style={{background:"white",borderRadius:"12px",padding:"14px",border:"2px solid #E2E8F0"}}>
            <h3 style={{margin:"0 0 4px",color:"#1E293B",fontSize:"15px"}}>Writing Practice - 30 Minutes</h3>
            <div style={{background:"#FEF3C7",borderRadius:"7px",padding:"7px 10px",marginBottom:"12px",fontSize:"11px",color:"#78350F",border:"1px solid #FCD34D"}}><strong>Parent Tip:</strong> {day.writing.tip}</div>
            {[{lang:"English Writing",items:day.writing.english,bg:"#EFF6FF",br:"#93C5FD",col:"#1D4ED8"},{lang:"Telugu Writing",items:day.writing.telugu,bg:"#FFF7ED",br:"#FDBA74",col:"#9A3412"},{lang:"Hindi Writing",items:day.writing.hindi,bg:"#F5F3FF",br:"#C4B5FD",col:"#5B21B6"},{lang:"Pattern Writing",items:day.writing.patterns,bg:"#F0FDF4",br:"#86EFAC",col:"#166534"}].map(({lang,items,bg,br,col})=>(
              <div key={lang} style={{background:bg,borderRadius:"10px",padding:"11px",marginBottom:"8px",border:`1px solid ${br}`}}>
                <div style={{fontWeight:"bold",color:col,marginBottom:"7px",fontSize:"12px"}}>{lang}</div>
                {items.map((item,i)=>(
                  <div key={i} style={{background:"white",borderRadius:"7px",padding:"8px 10px",marginBottom:"4px",border:`1px solid ${br}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:"12px",color:"#374151"}}>{item}</span>
                    <span style={{fontSize:"10px",color:"#94A3B8",background:"#F1F5F9",padding:"1px 6px",borderRadius:"4px",marginLeft:"6px",flexShrink:0}}>3x</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {tab==="worksheet"&&(
          <div style={{background:"white",borderRadius:"12px",padding:"14px",border:"2px solid #E2E8F0"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px",flexWrap:"wrap",gap:"5px"}}>
              <div>
                <h3 style={{margin:"0 0 1px",color:"#1E293B",fontSize:"15px"}}>Daily Worksheet - Day {day.dayNumber}</h3>
                <div style={{fontSize:"11px",color:"#64748B"}}>{day.date}</div>
              </div>
              <div style={{background:"#FEF3C7",borderRadius:"7px",padding:"4px 9px",border:"1px solid #F59E0B",fontSize:"11px",color:"#92400E"}}>20-25 min</div>
            </div>
            {Object.entries(day.worksheet).map(([sec,items])=>{
              const sm3=SEC[sec];
              return(
                <div key={sec} style={{background:sm3.bg,borderRadius:"10px",padding:"11px",marginBottom:"8px",border:`1px solid ${sm3.br}`}}>
                  <div style={{fontWeight:"bold",color:sm3.ac,marginBottom:"7px",fontSize:"12px"}}>{sm3.ic} Section {sec} - {sm3.lb}</div>
                  {items.map((item,i)=>(
                    <div key={i} style={{background:"white",borderRadius:"7px",padding:"8px 10px",marginBottom:"4px",border:`1px solid ${sm3.br}`}}>
                      <span style={{fontSize:"12px",color:"#374151"}}>{item}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {tab==="answers"&&(
          <div style={{background:"white",borderRadius:"12px",padding:"14px",border:"2px solid #86EFAC"}}>
            <h3 style={{margin:"0 0 12px",color:"#14532D",fontSize:"15px"}}>Answer Key - Day {day.dayNumber}</h3>
            {Object.entries(day.answerKey).map(([sec,answers])=>{
              const sm3=SEC[sec];
              return(
                <div key={sec} style={{background:sm3.bg,borderRadius:"10px",padding:"11px",marginBottom:"8px",border:`1px solid ${sm3.br}`}}>
                  <div style={{fontWeight:"bold",color:sm3.ac,marginBottom:"7px",fontSize:"12px"}}>{sm3.ic} Section {sec} - {sm3.lb}</div>
                  {answers.map((ans,i)=>(
                    <div key={i} style={{background:"white",borderRadius:"7px",padding:"7px 10px",marginBottom:"4px",border:`1px solid ${sm3.br}`,display:"flex",gap:"5px",alignItems:"flex-start"}}>
                      <span style={{color:"#16A34A",flexShrink:0,fontSize:"12px"}}>✓</span>
                      <span style={{fontSize:"12px",color:"#374151"}}>{ans}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {tab==="engage"&&(
          <div style={{display:"grid",gap:"9px"}}>
            {[{t:"Game of the Day",c:day.engagement.game,bg:"linear-gradient(135deg,#FEF3C7,#FDE68A)",br:"#F59E0B",tc:"#78350F"},{t:"Story Idea",c:day.engagement.story,bg:"linear-gradient(135deg,#EDE9FE,#DDD6FE)",br:"#A78BFA",tc:"#4C1D95"},{t:"Speaking Activity",c:day.engagement.speaking,bg:"linear-gradient(135deg,#DCFCE7,#BBF7D0)",br:"#4ADE80",tc:"#14532D"}].map(({t,c,bg,br,tc})=>(
              <div key={t} style={{background:bg,borderRadius:"12px",padding:"14px",border:`2px solid ${br}`}}>
                <div style={{fontSize:"14px",fontWeight:"bold",marginBottom:"6px",color:tc}}>{t}</div>
                <div style={{fontSize:"12px",color:tc,lineHeight:"1.7"}}>{c}</div>
              </div>
            ))}
            <div style={{background:"linear-gradient(135deg,#FFF1F2,#FECDD3)",borderRadius:"12px",padding:"14px",border:"2px solid #FB7185"}}>
              <div style={{fontSize:"14px",fontWeight:"bold",marginBottom:"6px",color:"#881337"}}>End-of-Day Reflection</div>
              {day.engagement.reflection.map((r,i)=><div key={i} style={{fontSize:"12px",color:"#881337",marginBottom:"4px"}}>• {r}</div>)}
            </div>
            <div style={{background:"white",borderRadius:"12px",padding:"12px",border:"2px solid #E2E8F0"}}>
              <div style={{fontWeight:"bold",color:"#1E293B",marginBottom:"8px",fontSize:"13px"}}>Today at a Glance</div>
              {[{ic:"🔤",s:"English",info:`${day.english.topic} - Sight word: ${day.sw}`},{ic:"🔢",s:"Math",info:day.math.topic},{ic:"🌸",s:"Telugu",info:`${day.ti.l} (${day.ti.r}) - ${day.ti.w} means ${day.ti.m}`},{ic:"🪔",s:"Hindi",info:`${day.hi.l} (${day.hi.r}) - ${day.hi.w} means ${day.hi.m}`}].map(({ic,s,info})=>(
                <div key={s} style={{display:"flex",gap:"7px",alignItems:"flex-start",marginBottom:"5px",padding:"6px 8px",background:"#F8FAFC",borderRadius:"7px"}}>
                  <span style={{fontSize:"14px"}}>{ic}</span>
                  <div><div style={{fontWeight:"bold",fontSize:"11px",color:"#374151"}}>{s}</div><div style={{fontSize:"11px",color:"#64748B"}}>{info}</div></div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{textAlign:"center",padding:"14px 0 4px",color:"#94A3B8",fontSize:"10px",borderTop:"1px solid #E2E8F0",marginTop:"14px"}}>
          Cambridge EYFS Stage 3 - Day {day.dayNumber} of {ALL_DATES.length} - {dm.name} - Progress: {totalDone}/{ALL_DATES.length} ({pct}%)
        </div>
      </div>
    </div>
  );
}
