'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════
// PHOTO REGISTRY — drop matching files into /public/images/
// ═══════════════════════════════════════════════════════════════
const P = {
  vaggers_classic:    '/images/f92651b3-a2d9-4a7d-a18e-1838d3e86fcf.jpg',
  vaggers_googly:     '/images/f128f710-2235-4c23-ab45-f3ee2338851a.jpg',
  vaggers_pucker:     '/images/ddb36926-2f8a-4852-95e5-72fa28c1f00d.jpg',
  vaggers_bondage:    '/images/db2f32ec-47d2-4647-8e15-ed97087c7356.jpg',
  vaggers_kit:        '/images/d2d0d0db-c930-410d-aec8-c063ac17bfa9.jpg',
  vaggers_thong:      '/images/cb35bfa3-29f4-407f-a243-8c93173f4ae8.jpg',
  vaggers_road:       '/images/c240f319-26e3-4c0d-b8b5-8e45878d2456.jpg',
  cluck_classic:      '/images/b88970fd-cfd0-4031-8848-1670ace671ab.jpg',
  cluck_vaggers:      '/images/b34728b8-cd89-4faf-b43a-628a481833db.jpg',
  bm_wanna:           '/images/b8ba2e12-1e02-4c60-820b-55a3ed16260d.jpg',
  bm_poot:            '/images/af20e5f6-6075-46ec-95ac-b42cb1a05a98.jpg',
  bm_jail:            '/images/a594064a-815b-4dd2-b01f-c0348d450c39.jpg',
  bm_squirrel:        '/images/64372420-d950-40a0-b973-02fd98214825.jpg',
  bm_platypus:        '/images/3416169c-7660-40c5-aa83-fef9b651322c.jpg',
  bm_fuse:            '/images/919361f1-b24d-4c5a-b83e-afe5193d89b1.jpg',
  bm_couple_sit:      '/images/074790a4-7543-40d6-9e68-006c3d193fa2.jpg',
  bm_couple_run:      '/images/24216ec3-eef2-4eb5-9f5f-5d5b58bf4406.jpg',
  bm_couple_pose:     '/images/9921bd6f-78fe-47a3-898e-620f431753c5.jpg',
  bm_couple_scared:   '/images/760fcd5d-f0f0-4903-9636-06c1436b0d01.jpg',
  bm_couple_heart:    '/images/744c064f-60b6-48e5-af97-8626f4a66db6.jpg',
  real_taboo:         '/images/582c565f-e7be-4787-bfbe-5d940e190ffc.jpg',
  real_harley:        '/images/409a36fd-3478-4ad3-83e5-5225e7e7e6aa.jpg',
  real_date1:         '/images/58c0722b-2313-48c5-8061-4a1ded923cde.jpg',
  real_date2:         '/images/52cbe5bf-6169-4480-8093-8c655bd83e69.jpg',
  real_date3:         '/images/23aa1210-51b4-4832-84d8-3418e1b5a0f4.jpg',
  real_selfie1:       '/images/4c6f3bb1-162e-422e-8f88-4d5ba1185f79.jpg',
  real_selfie2:       '/images/4bf1ea6a-cac1-4840-b169-34b2748f28c1.jpg',
  real_selfie3:       '/images/2dd8c3ce-fa9e-4403-a61f-03983ebbeff8.jpg',
  stella:             '/images/1f74dbac-c368-41c9-b161-afa4cc97b983.jpg',
  couch_dog:          '/images/0c505dca-8ad6-4a41-b004-f4cfa55d1ab9.jpg',
  raccoon:            '/images/0a710d55-05dc-41d8-a9f6-94eaa0001311.jpg',
  the_gang:           '/images/IMG_5121.jpeg',
  art_superhero:      '/images/IMG_5120.jpeg',
  art_kissing:        '/images/IMG_4949.jpeg',
  art_snake_penguin:  '/images/IMG_4330.jpeg',
  hero_chase:         '/images/f92651b3-a2d9-4a7d-a18e-1838d3e86fcf.jpg'
};

// Photo component: shows image or emoji fallback
function Photo({ slot, fallback = '🖼️', size = 80, round = false, style = {}, ...rest }) {
  const [error, setError] = useState(false);
  const src = P[slot];
  const dim = typeof size === 'number' ? `${size}px` : size;
  const baseStyle = {
    width: dim, height: dim,
    borderRadius: round ? '50%' : '12px',
    objectFit: 'cover',
    background: 'linear-gradient(135deg, #1a1a1a, #2a1a2a)',
    border: '2px solid rgba(255,215,0,0.25)',
    display: 'block',
    ...style,
  };
  if (!src || error) {
    return (
      <div style={{...baseStyle, display: 'grid', placeItems: 'center', fontSize: typeof size === 'number' ? size * 0.5 : 32}} {...rest}>
        <span>{fallback}</span>
      </div>
    );
  }
  return <img src={src} style={baseStyle} onError={() => setError(true)} alt="" {...rest} />;
}

// ═══════════════════════════════════════════════════════════════
// DATA — questions, lines, content
// ═══════════════════════════════════════════════════════════════

// THE STORIES — Kelli's edited questions. Type → Seal → Stay tuned 🦆 → Unlock → Story
const STORIES = [
  {
    id: 1,
    title: "The Great Escape",
    sub: "A Dr. Vaggers Travel Documentary",
    when: "In the car · first hour",
    icon: "🚗",
    vagPic: 'vaggers_road',
    qs: [
      { q: "If you had to describe the sound I make when I cum to a police sketch artist… but for sounds… what would you tell them?", inst: "Make up a sound effect. Go wild." },
      { q: "I'm packing snacks. Name ONE thing I could pull out of a bag that would make you look at me like I have personally offended you and your entire bloodline.", inst: "Name one specific snack." },
      { q: "You know that face I make when I'm cumming? Like REALLY HARD!!! Describe it the way a nature documentary narrator would describe an animal.", inst: "1–2 sentences. Be brutal." },
      { q: "Name a highway. Not a real one. A fake one. The kind of name that would make a cartographer quit their job.", inst: "Make up a highway name." },
    ],
    parts: [
      "On the morning of May the 8th… two women entered a vehicle with the unstated intention of being so aggressively in love that local wildlife would file noise complaints.\n\nDr. Vaggers — who had NOT been invited but stowed away in the glove compartment — observed the following:\n\nThe driver looked like ",
      { b: 2 },
      ".\n\nThe vehicle pulled onto ",
      { b: 3 },
      ". A road of destiny. A road of snacks.\n\nAt the 45-minute mark the driver attempted to sing. The sound: ",
      { b: 0 },
      ".\n\nCrystal's face was a medical event Dr. Vaggers catalogued for research.\n\nA snack emergency was declared. Crystal immediately rejected ",
      { b: 1 },
      " — which the driver had packed SPECIFICALLY for that face.\n\nThe chase continued. The mountains appeared. The bill was very impressive.\n\nEnd of Episode One. Quackington University Press."
    ],
  },
  {
    id: 2,
    title: "The Goat Prophecy",
    sub: "A Beatrix Potter Field Guide",
    when: "Last 30 minutes of the drive",
    icon: "🐐",
    vagPic: 'vaggers_classic',
    qs: [
      { q: "If Stella could finally talk for ONE day at the farm — what is the FIRST complaint she's filing?", inst: "What does Stella say?" },
      { q: "We meet a goat. The goat is staring directly at me. What is the goat thinking? Be honest.", inst: "Speak for the goat." },
      { q: "Write a one-sentence Google review of the last time I railed you. Yes. The whole sentence.", inst: "★★★★★ ___ stars" },
      { q: "Pick a Beatrix Potter-ass name for a chicken that becomes our nemesis at the farm.", inst: "First and last name." },
    ],
    parts: [
      "The lane was long. The goats were watching. Stella, who had been silent for years owing to anatomical limitations, chose this exact moment to speak.\n\nHer first complaint was: ",
      { b: 0 },
      "\n\nA goat appeared in the meadow. Its expression was unreadable. Crystal asked what it was thinking. The goat — privately — was thinking: ",
      { b: 1 },
      "\n\nMeanwhile, the women lay in the grass. Crystal opened her phone and left a Google review of the previous evening: ",
      { b: 2 },
      "\n\n★★★★★\n\nIn the henhouse, a single chicken raised her head. She had been waiting. Her name was ",
      { b: 3 },
      ". She would become their nemesis. She knew their names. She had a list.\n\nDr. Vaggers stood at the gate, monitoring with quiet professional concern.\n\n— THE END —\n— A Beatrix Potter Field Guide, Annotated by Quackington University Press"
    ],
  },
];

// MATCH GAME — both write secret answer, swap, guess
const MATCH = [
  "What's my hottest physical feature according to you?",
  "What's the most attractive thing I do without realizing?",
  "If you had to describe me in three words, what are they?",
  "What's the first thing you noticed about me?",
  "What's a song that makes you think of us?",
  "What's my most annoying habit you secretly love?",
  "What's our most ridiculous inside joke?",
  "What's the dumbest fight we've ever had?",
  "What's my go-to comfort food?",
  "What's something I do that makes you weak?",
  "What's the best gift I've ever given you?",
  "What's the first thing you'd grab from our place in a fire (after the dogs)?",
  "What's my love language in one word?",
  "What word would I use to describe you?",
  "Where would I want to be right now if not on this trip?",
  "What's my most-used emoji to you?",
  "If I were a cocktail, which one am I?",
  "If you were a cocktail, which one are you?",
  "What's a movie I quote constantly?",
  "What's something I always do before bed?",
  "What's the household chore I refuse to do?",
  "What food would I eat every day forever?",
  "What's my dream vacation in one word?",
  "What animal best represents me?",
  "What animal best represents you?",
  "What's a phrase I say all the time?",
  "What's my biggest pet peeve about you?",
  "What's your biggest pet peeve about me?",
  "What's our song?",
  "First place we kissed?",
  "What was I wearing the night we met?",
  "What's something you find hilarious about me that I don't?",
  "If we got married tomorrow what flowers would I want?",
  "What's my coffee order?",
  "What's your coffee order according to me?",
  "What time do I usually want to go to bed?",
  "What time do I actually fall asleep?",
  "Which one of us cries first watching a sad movie?",
  "Which one of us is the better driver?",
  "Which one of us is more dramatic?",
  "Which one of us would survive longer in the wilderness?",
  "What do I call you when no one else is around?",
  "What body part of yours do I obsess over?",
  "What body part of mine do you obsess over?",
  "What's a thing I do in my sleep that wakes you up?",
  "What's the ONE outfit of yours that destroys me?",
  "What's the ONE outfit of mine that does it for you?",
  "What's a sound I make when I want attention?",
  "What's something I'm secretly really good at?",
  "What's something you're secretly really good at?",
  "If I had to pick one word for our relationship — what is it?",
];

// TRIVIA — 80s/90s
const TRIVIA = [
  { q: "What 1985 movie has 'Don't you forget about me' as its theme?", a: 0, opts: ["The Breakfast Club","Sixteen Candles","Pretty in Pink","Ferris Bueller"] },
  { q: "Who sang 'Wannabe' in 1996?", a: 1, opts: ["TLC","Spice Girls","Backstreet Boys","All Saints"] },
  { q: "What year did 'Friends' debut?", a: 2, opts: ["1992","1993","1994","1995"] },
  { q: "What was the name of the bar in Cheers?", a: 0, opts: ["Cheers","Norm's","The Hangout","McLaren's"] },
  { q: "Which band released 'Smells Like Teen Spirit'?", a: 2, opts: ["Pearl Jam","Soundgarden","Nirvana","Alice in Chains"] },
  { q: "What was the first Pixar movie?", a: 0, opts: ["Toy Story","A Bug's Life","Monsters Inc","Finding Nemo"] },
  { q: "Who is Canada's most famous hockey player ever?", a: 1, opts: ["Mario Lemieux","Wayne Gretzky","Sidney Crosby","Bobby Orr"] },
  { q: "What year was the loonie introduced?", a: 1, opts: ["1985","1987","1989","1991"] },
  { q: "Which Canadian band gave us 'One Week'?", a: 2, opts: ["Tragically Hip","Our Lady Peace","Barenaked Ladies","Sloan"] },
  { q: "What movie features the line 'You can't handle the truth!'?", a: 0, opts: ["A Few Good Men","JFK","The Firm","Philadelphia"] },
  { q: "Who voiced Aladdin's Genie?", a: 0, opts: ["Robin Williams","Eddie Murphy","Mike Myers","Jim Carrey"] },
  { q: "What year did the Berlin Wall fall?", a: 1, opts: ["1987","1989","1991","1993"] },
  { q: "Which 90s show was set in Bayside High?", a: 0, opts: ["Saved by the Bell","Boy Meets World","Full House","Family Matters"] },
  { q: "What does the 'M' in MTV stand for?", a: 0, opts: ["Music","Modern","Media","Motion"] },
  { q: "Who wrote 'Goodbye Earl'?", a: 2, opts: ["Reba","Shania","Dixie Chicks","Faith Hill"] },
  { q: "What year did the Spice Girls release 'Wannabe'?", a: 1, opts: ["1995","1996","1997","1998"] },
  { q: "Which Canadian city hosted the 1988 Winter Olympics?", a: 0, opts: ["Calgary","Vancouver","Edmonton","Banff"] },
  { q: "Who sang 'I Will Always Love You' for The Bodyguard?", a: 1, opts: ["Mariah Carey","Whitney Houston","Celine Dion","Toni Braxton"] },
  { q: "What sitcom had Ross, Rachel, Joey, Chandler, Monica, Phoebe?", a: 0, opts: ["Friends","Seinfeld","Frasier","Will & Grace"] },
  { q: "What's the highest grossing film of the 90s?", a: 0, opts: ["Titanic","Jurassic Park","Star Wars: Phantom Menace","The Lion King"] },
  { q: "Who painted herself as Frida?", a: 0, opts: ["Frida Kahlo","Georgia O'Keeffe","Tamara de Lempicka","Cindy Sherman"] },
  { q: "What year did the loonie's friend the toonie come out?", a: 0, opts: ["1996","1997","1998","1999"] },
  { q: "Who was Canada's PM in 1995?", a: 1, opts: ["Brian Mulroney","Jean Chrétien","Kim Campbell","Paul Martin"] },
  { q: "Best Picture winner 1994?", a: 2, opts: ["Pulp Fiction","Schindler's List","Forrest Gump","The Shawshank Redemption"] },
  { q: "Which 80s movie features a Delorean time machine?", a: 0, opts: ["Back to the Future","Weird Science","The Terminator","Tron"] },
];

// THIS OR THAT — 45 pairs
const TOT = [
  ["Pushed against the wall","Pulled onto the bed"],
  ["Slow and sweet","Fast and dangerous"],
  ["Top","Bottom"],
  ["Eye contact","Eyes closed"],
  ["Lights on","Lights off"],
  ["Bath together","Shower together"],
  ["Mountains","Ocean"],
  ["Whisper","Bite"],
  ["Hold hands","Hand on thigh"],
  ["Movie at home","Concert"],
  ["Coffee","Tea"],
  ["Beach","Forest"],
  ["Sunrise","Sunset"],
  ["Read","Be read to"],
  ["Driver","Passenger princess"],
  ["Road trip","Plane trip"],
  ["Snowy cabin","Tropical beach"],
  ["Big city","Small town"],
  ["Cook for you","Be cooked for"],
  ["Plan everything","Be surprised"],
  ["Hot bath","Hot tub"],
  ["Wine","Cocktails"],
  ["Slow dance kitchen","Loud dance club"],
  ["Spoon","Be spooned"],
  ["Shy you","Bold you"],
  ["Lazy Sunday","Adventure Sunday"],
  ["Texts","Voice notes"],
  ["Bookstore","Record store"],
  ["Fancy dinner","Diner at 2am"],
  ["Old movie","New movie"],
  ["Take photos","Be in photos"],
  ["Dogs everywhere","Cabin alone"],
  ["Dressed up","Dressed down"],
  ["Hair pulled","Throat held"],
  ["Eyes covered","Hands tied"],
  ["Quick & dirty","Long & slow"],
  ["Floor","Couch"],
  ["Morning","3am"],
  ["Watched","Hidden"],
  ["Speak","Stay quiet"],
  ["Run a bath","Make a snack"],
  ["Beg","Demand"],
  ["I move","You move"],
  ["First","Last"],
  ["Yours","Mine"],
];

// FINISH THE LYRIC — fill in the blank
const LYRICS = [
  { artist:"Whitney Houston", title:"I Will Always Love You", line:"And I... will always ___ you", a:"love" },
  { artist:"Spice Girls", title:"Wannabe", line:"If you wannabe my lover, you gotta ___ with my friends", a:"get" },
  { artist:"Backstreet Boys", title:"I Want It That Way", line:"Tell me ___, ain't nothin' but a heartache", a:"why" },
  { artist:"Nirvana", title:"Smells Like Teen Spirit", line:"Here we are now, ___ us", a:"entertain" },
  { artist:"Alanis Morissette", title:"Ironic", line:"It's like ___ on your wedding day", a:"rain" },
  { artist:"TLC", title:"Waterfalls", line:"Don't go chasing ___", a:"waterfalls" },
  { artist:"Shania Twain", title:"Man! I Feel Like a Woman", line:"Oh, oh, oh, go totally crazy, forget I'm a ___", a:"lady" },
  { artist:"Britney Spears", title:"...Baby One More Time", line:"My loneliness is killing ___", a:"me" },
  { artist:"Bryan Adams", title:"Summer of '69", line:"Those were the best ___ of my life", a:"days" },
  { artist:"Cher", title:"Believe", line:"Do you believe in life after ___?", a:"love" },
  { artist:"Backstreet Boys", title:"Everybody", line:"Everybody, ___", a:"yeah" },
  { artist:"Aqua", title:"Barbie Girl", line:"I'm a Barbie girl, in a Barbie ___", a:"world" },
  { artist:"Madonna", title:"Like a Prayer", line:"Life is a mystery, everyone must stand ___", a:"alone" },
  { artist:"No Doubt", title:"Don't Speak", line:"Don't ___, I know just what you're saying", a:"speak" },
  { artist:"Celine Dion", title:"My Heart Will Go On", line:"Near, ___, wherever you are", a:"far" },
  { artist:"Bonnie Tyler", title:"Total Eclipse", line:"Once upon a time I was falling in ___", a:"love" },
  { artist:"Journey", title:"Don't Stop Believin'", line:"Just a small town girl, livin' in a lonely ___", a:"world" },
  { artist:"Vanilla Ice", title:"Ice Ice Baby", line:"All right stop, collaborate and ___", a:"listen" },
  { artist:"Salt-N-Pepa", title:"Push It", line:"Push it real ___", a:"good" },
  { artist:"Bon Jovi", title:"Livin' on a Prayer", line:"We're halfway there, livin' on a ___", a:"prayer" },
];

// B'CYDER — 60 flirty + spicy
const BCYDER = [
  "What's the first thing you noticed about me?",
  "Where on my body do you most want to leave a mark?",
  "What's a fantasy you've never told me?",
  "What's the dirtiest dream you've had about us?",
  "What's something you want to try that you haven't asked for?",
  "Where is the boldest place you'd want to do it?",
  "What's a non-bedroom moment that turned you on most?",
  "What's the first thought you had this morning about me?",
  "Sweet, soft, or rough?",
  "Tell me what you wanted to do last night.",
  "Most attractive outfit I own?",
  "What word do I say that wrecks you?",
  "What sound that I make stays with you all day?",
  "What's something you'd want me to do… if no one would ever know?",
  "Best kiss we've ever had — when?",
  "What's a memory of us that gets you every time?",
  "What turns you on more — eye contact or being told what to do?",
  "Pin me, or let me pin you?",
  "Whisper or be loud?",
  "What pet name only you can call me?",
  "What's a place we haven't done it but should?",
  "What's something innocent that became sexy because of us?",
  "What's the longest you've thought about me in one day?",
  "What's something I could do in five seconds that would ruin you?",
  "What outfit do I wear that you can't stop thinking about?",
  "If we had ten minutes alone right now — what's the play?",
  "When did you last fantasize about us?",
  "What's a body part of yours you want me to focus on?",
  "What's a body part of mine you obsess over?",
  "Tell me the truth — where do you want my hand right now?",
  "Best vacation we could have — describe one night.",
  "Most romantic gesture I've made you?",
  "What part of our routine secretly turns you on?",
  "What's the most flattering thing I've said to you?",
  "First time I made you blush — when?",
  "What word do I say in bed you want me to say more?",
  "Where do you want to be kissed first?",
  "Where do you want to be kissed last?",
  "What's something I do that makes you melt?",
  "What's a 'public moment' between us that should've been private?",
  "What's a 'private moment' you'd want to relive in public?",
  "Slow burn or instant fire?",
  "Talked-into or pulled-into?",
  "What's a touch that says 'I want you' without words?",
  "What's a touch that says 'I love you' without words?",
  "What's the song that plays in your head when you think of us?",
  "Most romantic place we've kissed?",
  "Most surprising place we've kissed?",
  "What does my hand on your back feel like to you?",
  "What's the look you give me that means 'tonight'?",
  "What's the look I give you that means 'tonight'?",
  "What outfit of mine hits hardest?",
  "What outfit of yours destroys me — your guess?",
  "If we made a movie of our relationship, what's the title?",
  "If we made a movie of our relationship, what's the rating?",
  "What's the bravest thing you've done for love?",
  "What's the bravest thing I've done for love?",
  "Where would you marry me?",
  "Where would I marry you?",
  "Last thing you want to hear me say at the end of every day?",
];

// VAGGERS COMMENTARY — 30 lines
const VAGGERS = [
  "Crystal is winning. Not surprised.",
  "Kelli's answer received. Silence IS the comment.",
  "The bill is very impressive. As discussed.",
  "Quackington University Press will publish the findings.",
  "Crystal looked beautiful saying that. Documented.",
  "Kelli's strategy is concerning. Continue anyway.",
  "Two women. One duck. A love story.",
  "Dr. Vaggers approves. Cluck Norris is also here. Nervously.",
  "This level of devotion is pre-clinical. Recommended.",
  "Sponsored by Vaggers Private Practice. Very impressive bill.",
  "Crystal is the geography. Kelli is the weather.",
  "The blizzard test was passed. As expected.",
  "Nurse Beak prescribed googly eyes. Apply liberally.",
  "Their professional insurance does not cover WANNA events.",
  "Kelli will let Crystal answer. Just saying.",
  "Crystal's posture is being celebrated by science.",
  "Kelli would like a snack. Urgent.",
  "Has seen things. Cannot be unquacked.",
  "Crystal is correct. Again. Documented.",
  "Wellness check: emotionally chaotic but structurally sound.",
  "Stella has been waiting for this question her whole life.",
  "Cluck Norris would like to interject. He has been told no.",
  "Bad liddle dawg energy detected. Approved.",
  "If this were graded — Crystal: A+. Kelli: Effort visible.",
  "The Pucker Star is presented for context. As needed.",
  "Quackington faculty meeting: this is the agenda.",
  "Two days at the farm. Three goats. One prophecy.",
  "Snake and Penguin: official trip mascots.",
  "The chase is in late innings. Very late.",
  "Goodnight my lil lover energy detected. Carry on.",
];

// CLUCK NORRIS — pop-ins
const CLUCK = [
  "Cluck Norris reporting for kinky duty. 🐔",
  "the chicken approves. continue.",
  "I have notes on your last performance. several pages.",
  "Cluck Norris does not roundhouse kick. Cluck Norris peaches.",
  "I have been watching. professionally.",
  "did somebody say degenerate? I'm here. 🐔",
  "eggs. that's the whole comment.",
  "sliding into this chat uninvited as is my brand.",
  "I'm not a snack. I AM the snack.",
  "the poultry supports this energy.",
  "Vaggers thinks he's the protagonist. adorable. 🐔",
  "I came here to observe and judge. I'm doing both.",
  "clucks given today: zero. clucks owed to me: many.",
  "I had a thought. it was filthy. you're welcome.",
  "the peach situation is escalating. I support escalation.",
  "Penguin and Python — the only ship I sail. 🐔",
  "I tried to be respectful once. the vibe was off.",
  "Crystal — I exist for you. Kelli — I tolerate you.",
  "beak status: smug.",
  "I have no business being involved. and yet.",
  "this is a Cluck Norris-approved bedroom.",
  "I wrote a poem about your relationship. it's mostly me.",
  "Stella is barking. Cluck is judging. same energy.",
  "WHO LET THE CHICKEN OUT. (it was me. I let me out.)",
  "I have a leather jacket. it's tiny. it counts.",
  "currently nesting in your business.",
  "do I look like a quitter? I do not.",
  "Vaggers can't fire me. he won't. he's scared.",
  "coq au vin? more like coq au WIN.",
  "I came. I clucked. I caused problems.",
  "the duck does paperwork. I do CRIME. 🐔",
  "slide into bed already. I can't watch this slow burn.",
  "you tap a peach — I take credit. that's how it works.",
  "CLUCK CLUCK MOTHER PLUCKER.",
  "I'm not a wingman. I'm a wing. same energy.",
];

// WANNA RESPONSES — random
const WANNA = [
  "WANNA FUCK?",
  "FUCK. I MEAN WANNA. I MEAN FUCK. I MEAN YES.",
  "you tapped a peach... that means clothes off.",
  "drop everything. legs open. now.",
  "WANNA?? BEGGING????",
  "that mouth. on me. immediately.",
  "on your knees. on the bed. on top of me. pick.",
  "take the pants OFF.",
  "I'm already wet and you haven't even kissed me yet.",
  "wherever you are... be there with no underwear.",
  "I will literally crawl across this room for you.",
  "tap = consent. obviously. now SHOW UP.",
  "that bra needs to be on the floor in 30 seconds.",
  "fuck me sideways. literally. I have a position picked.",
  "I want my mouth between your legs in under sixty seconds.",
  "take it off. take ALL of it. let me look.",
  "you. me. zero clothes. extreme urgency.",
  "WANNA? we both know the answer is yes.",
  "I will ruin you. politely. with consent forms.",
  "say my name. then beg me.",
  "one peach. one yes. one minute. GO.",
  "clothes off, questions later.",
  "fuck me until Vaggers calls a wellness check.",
  "the duck looked away. opportunity.",
  "I want you so bad my teeth hurt.",
  "quietly... or not. I don't actually care which.",
  "lock the door. or don't. I'm into both.",
  "lay back. let me work.",
  "give me one hour and zero clothes and I'll fix everything.",
  "tell me what you want. I'll do worse.",
  "you're mine. all of you. for at least the next forty-five minutes.",
  "I want to taste you so bad I forgot what year it is.",
  "that sound you make. the breathy one. let's do that.",
  "on your back. now. don't argue.",
  "I'm going to wreck you very gently.",
  "the bed. the floor. the truck. the cabin. PICK.",
  "PEACH PEACH PEACH ALL THE PEACHES NOW NOW NOW",
  "you tapped me five times — that's basically a marriage proposal.",
  "red lace. wherever you are. I'm picturing it.",
  "crawl over here. I have plans.",
  "I'll be quiet if you want. I will NOT be still.",
  "I want to fuck you like we just met and like we never have to leave.",
  "WANNA — said with eye contact and zero shame.",
  "give me your hand. I'll show you where I want it.",
  "I'm not horny — I'm CRYSTAL-horny. it's a different category.",
  "I want to taste every inch of you slowly enough to ruin the day.",
  "take that shirt off. take it off SLOW so I can watch.",
  "I want you on top. or under. or beside. I just want you.",
  "there's no version of this where I don't have you tonight.",
  "tap = peach = me = you = bed = NOW.",
];

// SOUNDTRACK — 5 Chase songs
const SOUNDTRACK = [
  { title:"The Chase", artist:"Emmit Fenn", meaning:"The whole trip in one song. Hunting and being hunted. The pulse of the Demon and the Python in motion." },
  { title:"Demons", artist:"Imagine Dragons", meaning:"Where the hideout lies. Where the shadows live. We're not afraid — we live there together." },
  { title:"Take Me to Church", artist:"Hozier", meaning:"You make me a believer. Worship in the most dangerous way." },
  { title:"Crystallized", artist:"Crystal's song", meaning:"The earth spent millions of years trying to make something as beautiful as you." },
  { title:"Goodnight My Lil Lover", artist:"The signature", meaning:"The signoff. The kiss before sleep. The Demon's claim." },
];

// HEADLINER — stripper name parts
const SN_TITLE = ["Madame","Sister","Princess","Reverend","Doctor","Chief","Lady","Saint","Empress","Auntie"];
const SN_FIRST = ["Cinnamon","Velvet","Ruby","Jezebel","Honey","Lilith","Diamond","Whiskey","Crimson","Mercy","Storm","Glitter","Topaz","Knuckle","Kitten"];
const SN_LAST = ["Buttons","Steele","Devereaux","Knight","Vixen","Heartbreak","Flame","Cross","Saint-Claire","Wild","Le Fay","Domingo","Quinton","St. James","Diamond"];
const SN_SONG = ["'Pour Some Sugar on Me' — Def Leppard","'Cherry Pie' — Warrant","'Closer' — NIN","'Toxic' — Britney","'Black Velvet' — Alannah Myles","'Wicked Game' — Chris Isaak","'Lady Marmalade'","'Crazy in Love'","'Sweet Dreams' — Eurythmics"];
const SN_BACK = [
  "Was a librarian for nine years. Had a moment.",
  "Used to teach pottery. Now teaches consequences.",
  "Has a PhD in something nobody asks about.",
  "Once owned a ferret. The ferret is the whole bit.",
  "Recently divorced from a man named Greg.",
  "Won a regional spelling bee in 1997. Has never recovered.",
  "Drives a car you've never heard of.",
  "Speaks three languages, none well.",
  "Dr. Vaggers is her emergency contact.",
  "Cluck Norris consults on her routines. Nervously.",
];
const SN_SPEC = [
  "The Reveal. The crowd weeps.",
  "Dramatic eye contact. Held for 11 seconds.",
  "Performs a full Beatrix Potter monologue mid-set.",
  "Strategic glitter deployment.",
  "Sings backup as her own backup.",
  "Knows your secret. Will sing it gently.",
  "Closes with a poem.",
  "Won't break character. Ever. Has a mortgage.",
  "Sponsored by the Pucker Star Foundation.",
  "Dr. Vaggers approved. Tasteful. Concerning.",
];

// REMEMBER THIS — photos with question + answer (Kelli is correct)
const REMEMBER = [
  { slot:'real_taboo',         q:"Remember when?",                                                a:"Crystal's memory IS the answer.", pts:5 },
  { slot:'real_harley',        q:"Tell me everything you remember about this.",                  a:"Demon — you were there. Trust it.", pts:10 },
  { slot:'real_date1',         q:"Where were we? What were we doing?",                           a:"Whatever she said — does it land?", pts:5 },
  { slot:'real_date2',         q:"What were you thinking right before this happened?",           a:"Only you know if she got it right.", pts:10 },
  { slot:'real_date3',         q:"What's the BEST part of this memory?",                         a:"Demon's call. The truth is what you remember.", pts:5 },
  { slot:'real_selfie1',       q:"What did I say RIGHT before this picture?",                    a:"Crystal's memory IS the answer.", pts:5 },
  { slot:'real_selfie2',       q:"What happened RIGHT after?",                                   a:"Demon — you were there. Trust it.", pts:5 },
  { slot:'real_selfie3',       q:"What were you wearing the rest of the day?",                   a:"Whatever she said — does it land?", pts:3 },
  { slot:'vaggers_classic',    q:"Remember when?",                                                a:"Crystal's memory IS the answer.", pts:5 },
  { slot:'vaggers_googly',     q:"What's the secret part of this picture I'm not seeing?",       a:"Demon — you were there. Trust it.", pts:10 },
  { slot:'vaggers_pucker',     q:"Tell me one thing nobody else knows about this moment.",       a:"Whatever she said — does it land?", pts:10 },
  { slot:'vaggers_bondage',    q:"Did anyone say something ridiculous that day? Quote it.",      a:"Only you know if she got it right.", pts:10 },
  { slot:'vaggers_kit',        q:"What did this day taste like?",                                a:"Demon's call. The truth is what you remember.", pts:5 },
  { slot:'vaggers_thong',      q:"If this was a movie — what's the title of this scene?",       a:"Crystal's memory IS the answer.", pts:5 },
  { slot:'vaggers_road',       q:"What were we supposed to be doing INSTEAD of this?",           a:"Demon — you were there. Trust it.", pts:5 },
  { slot:'cluck_classic',      q:"Did we plan this — or did it just happen?",                   a:"Whatever she said — does it land?", pts:5 },
  { slot:'cluck_vaggers',      q:"What did you think of me right then?",                         a:"Only you know if she got it right.", pts:10 },
  { slot:'bm_wanna',           q:"Remember when?",                                                a:"Demon's call. The truth is what you remember.", pts:3 },
  { slot:'bm_poot',            q:"Who was there besides us?",                                    a:"Crystal's memory IS the answer.", pts:3 },
  { slot:'bm_jail',            q:"What did we eat that day?",                                    a:"Demon — you were there. Trust it.", pts:3 },
  { slot:'bm_squirrel',        q:"What did I do for you that day?",                              a:"Whatever she said — does it land?", pts:5 },
  { slot:'bm_platypus',        q:"What were you nervous about right then?",                      a:"Only you know if she got it right.", pts:5 },
  { slot:'bm_fuse',            q:"What's one true thing about this picture?",                    a:"Demon's call. The truth is what you remember.", pts:5 },
  { slot:'bm_couple_sit',      q:"What did we promise each other that day?",                     a:"Crystal's memory IS the answer.", pts:10 },
  { slot:'bm_couple_run',      q:"What was the song playing in your head?",                      a:"Demon — you were there. Trust it.", pts:5 },
  { slot:'bm_couple_pose',     q:"What's the thing I don't remember — that you do?",             a:"Whatever she said — does it land?", pts:10 },
  { slot:'bm_couple_scared',   q:"What do you remember smelling?",                               a:"Only you know if she got it right.", pts:5 },
  { slot:'bm_couple_heart',    q:"If we re-took this exact photo today — what changes?",         a:"Demon's call. The truth is what you remember.", pts:10 },
  { slot:'stella',             q:"What did the rest of the day look like?",                      a:"Crystal's memory IS the answer.", pts:5 },
  { slot:'couch_dog',          q:"What did we do when we got home?",                             a:"Demon — you were there. Trust it.", pts:5 },
  { slot:'raccoon',            q:"What's the one detail you'll never forget?",                   a:"Whatever she said — does it land?", pts:10 },
  { slot:'the_gang',           q:"Tell me everything you remember about this.",                  a:"Only you know if she got it right.", pts:10 },
  { slot:'art_superhero',      q:"What did this moment teach us?",                               a:"Demon's call. The truth is what you remember.", pts:10 },
  { slot:'art_kissing',        q:"Remember when?",                                                a:"Crystal's memory IS the answer.", pts:10 },
  { slot:'art_snake_penguin',  q:"Say one true thing about this picture.",                       a:"Demon — you were there. Trust it.", pts:5 },
  { slot:'hero_chase',         q:"What did this day taste like?",                                a:"Whatever she said — does it land?", pts:10 },
];

// PHOTO CHALLENGE prompts (for camera mode)
const PHOTO_PROMPTS = {
  cute: ["Pose like you're on the cover of a magazine","Mountain view selfie","Recreate our first-date face","Goofy grin together","Dr. Vaggers cameo","Nail a couple-pose for the wall"],
  funny: ["Worst camera angle — try","Make a face that says 'WANNA'","Pretend to be Stella","Cluck Norris impression","Vaggers Pucker Star recreation (PG)","Pose like you've never been photographed before"],
  naughty: ["The look that means tonight","Bite your lip on three","One shoulder slip","Hand placement of choice","The 'pull me close' pose","Whisper in ear photo (no caption)"],
};

// DATE CARD content
const DATE_CARD = {
  intro: "You Are Cordially Invited",
  to: "Crystal — The Python",
  from: "Your Demon",
  phases: [
    { label:"PHASE I", t:"Windermere, BC — the farm. Goats. Stella with a complaint. The Beatrix Potter Field Guide. May 8 → 10." },
    { label:"PHASE II", t:"Pomeroy Kananaskis. Mountains. Hot tub. The Headliner gets enshrined in the Hall of Fame. May 10 → 12." },
    { label:"PHASE III", t:"Whatever the chase becomes. We were always going to end up here." },
  ],
  signoff: "Goodnight my lil lover. ❤️🧲❤️\n— Your Demon",
};

// ROAD TRIP MODE sequencer
const ROAD_TRIP = [
  { t:"Envelope 1", d:"The Great Escape — Story Card", target:"stories" },
  { t:"Match Game", d:"Five rounds. Pass the phone.", target:"match" },
  { t:"80s/90s Trivia", d:"Ten questions. Born '75 & '77.", target:"trivia" },
  { t:"This or That", d:"Speed round. Fast.", target:"tot" },
  { t:"Finish the Lyric", d:"Sing-off. No skipping.", target:"lyric" },
  { t:"Silent Game", d:"Ten minutes. Loser owes one favor.", target:"silent" },
  { t:"Envelope 2", d:"The Goat Prophecy — Story Card", target:"stories" },
];

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

function pick(arr) { return arr[Math.floor(Math.random()*arr.length)]; }
function shuffle(arr) { return [...arr].sort(()=>Math.random()-0.5); }

// localStorage helpers
function lsGet(key, def) { try { const v = typeof window!=='undefined' && localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; } }
function lsSet(key, val) { try { typeof window!=='undefined' && localStorage.setItem(key, JSON.stringify(val)); } catch {} }

// Web Speech API for narration
function speak(text, onEnd) {
  if (typeof window === 'undefined' || !window.speechSynthesis) { onEnd && onEnd(); return null; }
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.9;
  u.pitch = 1;
  u.onend = () => onEnd && onEnd();
  window.speechSynthesis.speak(u);
  return u;
}
function stopSpeak() { if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel(); }

// ═══════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Header({ title, sub, onBack, color = '#FFD700' }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:12,padding:'16px 18px',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
      {onBack && (
        <button onClick={onBack} className="btn-ghost" style={{padding:'8px 12px',fontSize:14}}>← Back</button>
      )}
      <div style={{flex:1}}>
        <div style={{fontWeight:800,fontSize:20,letterSpacing:'-0.01em',color}}>{title}</div>
        {sub && <div style={{opacity:0.7,fontSize:13,marginTop:2}}>{sub}</div>}
      </div>
    </div>
  );
}

function PlayerBadge({ player, score }) {
  const isPython = player === 'python';
  return (
    <div style={{
      display:'inline-flex',alignItems:'center',gap:8,
      padding:'6px 12px',borderRadius:999,
      background: isPython ? 'rgba(255,69,69,0.15)' : 'rgba(255,255,255,0.08)',
      border:`1px solid ${isPython ? 'rgba(255,69,69,0.4)' : 'rgba(255,255,255,0.2)'}`,
      fontSize:13,fontWeight:700
    }}>
      <span>{isPython ? '🐍' : '😈'}</span>
      <span>{isPython ? 'Python' : 'Demon'}</span>
      {score !== undefined && <span className="gold">{score}</span>}
    </div>
  );
}

function PlayerToggle({ player, setPlayer }) {
  return (
    <div style={{display:'flex',gap:8,padding:8,background:'rgba(255,255,255,0.04)',borderRadius:14,margin:'0 18px'}}>
      <button onClick={()=>setPlayer('demon')} style={{
        flex:1,padding:'10px 12px',borderRadius:10,fontWeight:700,fontSize:14,
        background: player==='demon' ? 'linear-gradient(135deg,#FFD700,#FFA500)' : 'transparent',
        color: player==='demon' ? '#0a0a0a' : 'rgba(255,255,255,0.6)',
      }}>😈 Demon (Kelli)</button>
      <button onClick={()=>setPlayer('python')} style={{
        flex:1,padding:'10px 12px',borderRadius:10,fontWeight:700,fontSize:14,
        background: player==='python' ? 'linear-gradient(135deg,#FF2D75,#9D4EDD)' : 'transparent',
        color: player==='python' ? '#fff' : 'rgba(255,255,255,0.6)',
      }}>🐍 Python (Crystal)</button>
    </div>
  );
}

// VAGGERS POPUP — slide up from bottom
function VaggersPopup({ message, pic = 'vaggers_classic', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [onClose]);
  if (!message) return null;
  return (
    <div onClick={onClose} style={{
      position:'fixed',left:12,right:12,bottom:90,zIndex:60,
      animation:'slide-up 0.4s cubic-bezier(.2,.9,.3,1.2)',
    }}>
      <div className="card" style={{
        padding:14,display:'flex',alignItems:'center',gap:14,
        background:'linear-gradient(135deg,rgba(255,215,0,0.15),rgba(157,78,221,0.1))',
        borderColor:'rgba(255,215,0,0.4)',
      }}>
        <Photo slot={pic} fallback="🦆" size={56} round />
        <div style={{flex:1}}>
          <div style={{fontSize:11,opacity:0.7,fontWeight:700,letterSpacing:'0.1em'}}>DR. VAGGERS, PHD</div>
          <div style={{fontSize:14,marginTop:2,lineHeight:1.4}}>{message}</div>
        </div>
      </div>
    </div>
  );
}

// CLUCK NORRIS POP-IN — corner
function CluckPopin({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);
  if (!message) return null;
  return (
    <div onClick={onClose} style={{
      position:'fixed',right:14,top:80,zIndex:55,
      maxWidth:240,animation:'pop-in 0.4s cubic-bezier(.2,.9,.3,1.2)',
    }}>
      <div className="card" style={{
        padding:12,display:'flex',gap:10,alignItems:'flex-start',
        background:'linear-gradient(135deg,rgba(255,140,0,0.15),rgba(255,69,69,0.1))',
        borderColor:'rgba(255,140,0,0.4)',
      }}>
        <Photo slot="cluck_classic" fallback="🐔" size={40} round />
        <div style={{flex:1}}>
          <div style={{fontSize:10,opacity:0.7,fontWeight:700}}>CLUCK NORRIS</div>
          <div style={{fontSize:13,marginTop:2,lineHeight:1.35}}>{message}</div>
        </div>
      </div>
    </div>
  );
}

// CONFETTI
function Confetti({ count = 50 }) {
  const colors = ['#FFD700','#FF2D75','#9D4EDD','#FF8C00','#00C2FF','#FF69B4'];
  const pieces = Array.from({length:count}, (_,i) => ({
    left: Math.random()*100,
    delay: Math.random()*0.5,
    color: colors[Math.floor(Math.random()*colors.length)],
    size: 8 + Math.random()*8,
    duration: 2 + Math.random()*2,
  }));
  return (
    <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:100}}>
      {pieces.map((p,i)=>(
        <div key={i} style={{
          position:'absolute',
          left:`${p.left}%`,top:0,
          width:p.size,height:p.size,
          background:p.color,
          borderRadius:Math.random()>0.5 ? '50%' : '2px',
          animation:`confetti-fall ${p.duration}s ease-out ${p.delay}s forwards`,
        }} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODE: STORIES
// ═══════════════════════════════════════════════════════════════
function Stories({ onBack, fireVaggers, fireCluck }) {
  const [storyIdx, setStoryIdx] = useState(0);
  const [phase, setPhase] = useState('list'); // list | answering | sealed | unlocked
  const [answers, setAnswers] = useState(['','','','']);
  const [reading, setReading] = useState(false);

  const story = STORIES[storyIdx];

  const renderStory = () => {
    return story.parts.map((p, i) => {
      if (typeof p === 'string') return <span key={i}>{p}</span>;
      const ans = answers[p.b] || `___`;
      return <span key={i} style={{color:'#FFD700',fontWeight:700,fontStyle:'italic'}}>{ans}</span>;
    });
  };

  const fullText = () => story.parts.map(p => typeof p === 'string' ? p : (answers[p.b] || '___')).join('');

  return (
    <div style={{minHeight:'100vh',paddingBottom:120}}>
      <Header title="The Stories" sub="Type → Seal → Unlock" onBack={onBack} color="#FFD700" />

      {phase === 'list' && (
        <div style={{padding:18}}>
          <div style={{opacity:0.75,fontSize:14,marginBottom:18,lineHeight:1.5}}>
            Open a card. Type your answers. Seal the envelope. The Demon will tell you when it's time to unlock the story.
          </div>
          {STORIES.map((s,i)=>(
            <button key={s.id} onClick={()=>{setStoryIdx(i);setAnswers(['','','','']);setPhase('answering');}} style={{
              width:'100%',textAlign:'left',padding:18,marginBottom:14,
              background:'linear-gradient(135deg,rgba(255,215,0,0.08),rgba(157,78,221,0.06))',
              border:'1px solid rgba(255,215,0,0.25)',borderRadius:18,
            }}>
              <div style={{display:'flex',alignItems:'center',gap:14}}>
                <div style={{fontSize:36}}>{s.icon}</div>
                <div style={{flex:1}}>
                  <div className="serif" style={{fontSize:24,fontWeight:600,color:'#FFD700'}}>{s.title}</div>
                  <div style={{fontSize:12,opacity:0.6,marginTop:2}}>{s.sub}</div>
                  <div style={{fontSize:11,opacity:0.5,marginTop:6,letterSpacing:'0.05em'}}>{s.when.toUpperCase()}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {phase === 'answering' && (
        <div style={{padding:18}}>
          <div style={{textAlign:'center',marginBottom:18}}>
            <div style={{fontSize:40}}>{story.icon}</div>
            <div className="serif" style={{fontSize:26,fontWeight:600,color:'#FFD700',marginTop:6}}>{story.title}</div>
            <div style={{fontSize:12,opacity:0.6}}>{story.sub}</div>
          </div>
          {story.qs.map((q,i)=>(
            <div key={i} className="card" style={{padding:16,marginBottom:14}}>
              <div style={{fontSize:11,opacity:0.5,fontWeight:700,letterSpacing:'0.1em'}}>CARD {i+1} OF 4</div>
              <div style={{fontSize:16,marginTop:8,marginBottom:10,lineHeight:1.45}}>{q.q}</div>
              <div style={{fontSize:12,opacity:0.55,marginBottom:10,fontStyle:'italic'}}>{q.inst}</div>
              <textarea value={answers[i]} onChange={e=>{const a=[...answers];a[i]=e.target.value;setAnswers(a);}} placeholder="Your answer…" />
            </div>
          ))}
          <button onClick={()=>{
            setPhase('sealed');
            fireVaggers("Stay tuned 🦆 — the Demon will tell you when it's time.", story.vagPic);
          }} className="btn-gold" style={{width:'100%',marginTop:12}}>
            🔒 SEAL THE ENVELOPE
          </button>
        </div>
      )}

      {phase === 'sealed' && (
        <div style={{padding:'40px 18px',textAlign:'center'}}>
          <div style={{fontSize:80,marginBottom:18}}>✉️</div>
          <div className="serif" style={{fontSize:32,fontWeight:600,color:'#FFD700'}}>Sealed.</div>
          <div style={{fontSize:14,opacity:0.7,marginTop:14,lineHeight:1.5,maxWidth:300,margin:'14px auto'}}>
            Your answers are hidden inside the story.<br/>Stay tuned 🦆<br/>The Demon will tell you when it's time.
          </div>
          <button onClick={()=>{setPhase('unlocked'); fireCluck && fireCluck();}} className="btn-primary" style={{marginTop:24}}>
            🔓 UNLOCK THE STORY
          </button>
          <button onClick={()=>setPhase('answering')} className="btn-ghost" style={{marginTop:12,display:'block',margin:'12px auto'}}>
            Go back & edit
          </button>
        </div>
      )}

      {phase === 'unlocked' && (
        <div style={{padding:18}}>
          <div className="card" style={{padding:22,background:'linear-gradient(135deg,rgba(20,15,30,0.95),rgba(40,20,40,0.9))'}}>
            <div className="serif" style={{textAlign:'center',marginBottom:18}}>
              <div style={{fontSize:11,opacity:0.5,letterSpacing:'0.2em'}}>EPISODE</div>
              <div style={{fontSize:28,fontWeight:600,color:'#FFD700',marginTop:4}}>{story.title}</div>
              <div style={{fontSize:13,opacity:0.6,fontStyle:'italic',marginTop:4}}>{story.sub}</div>
            </div>
            <div style={{lineHeight:1.7,fontSize:15,whiteSpace:'pre-wrap'}}>
              {renderStory()}
            </div>
          </div>
          <div style={{display:'flex',gap:10,marginTop:16}}>
            <button onClick={()=>{
              if (reading) { stopSpeak(); setReading(false); }
              else { setReading(true); speak(fullText(), ()=>setReading(false)); }
            }} className="btn-primary" style={{flex:1}}>
              {reading ? '⏸️ Stop' : '🔊 Read Aloud'}
            </button>
            <button onClick={()=>setPhase('list')} className="btn-ghost" style={{flex:1}}>← Stories</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODE: ROAD TRIP
// ═══════════════════════════════════════════════════════════════
function RoadTrip({ onBack, navigate }) {
  return (
    <div style={{minHeight:'100vh',paddingBottom:120}}>
      <Header title="Road Trip Mode" sub="The 5.5-hour battle plan" onBack={onBack} color="#FF8C00" />
      <div style={{padding:18}}>
        <Photo slot="bm_couple_run" fallback="🚗" size="100%" style={{height:160,marginBottom:18}} />
        <div style={{opacity:0.75,fontSize:14,marginBottom:18,lineHeight:1.5}}>
          Tap a step to jump straight to that game. Cluck Norris recommends snacks between every two stages.
        </div>
        {ROAD_TRIP.map((step,i)=>(
          <button key={i} onClick={()=>navigate(step.target)} style={{
            width:'100%',textAlign:'left',padding:16,marginBottom:12,
            background:'rgba(255,140,0,0.06)',border:'1px solid rgba(255,140,0,0.25)',borderRadius:14,
            display:'flex',alignItems:'center',gap:14,
          }}>
            <div style={{
              width:40,height:40,borderRadius:'50%',
              background:'linear-gradient(135deg,#FF8C00,#FF2D75)',
              display:'grid',placeItems:'center',fontWeight:800,
            }}>{i+1}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:16}}>{step.t}</div>
              <div style={{fontSize:13,opacity:0.7,marginTop:2}}>{step.d}</div>
            </div>
            <div style={{opacity:0.4}}>→</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODE: MATCH GAME
// ═══════════════════════════════════════════════════════════════
function MatchGame({ onBack, addScore, fireVaggers }) {
  const [order, setOrder] = useState(()=>shuffle(MATCH.map((_,i)=>i)));
  const [pos, setPos] = useState(0);
  const [phase, setPhase] = useState('demon-write'); // demon-write | python-write | reveal | done
  const [demonAns, setDemon] = useState('');
  const [pythonAns, setPython] = useState('');
  const [demonGuess, setDG] = useState('');
  const [pythonGuess, setPG] = useState('');
  const [history, setHistory] = useState([]);

  const q = MATCH[order[pos]];

  const next = () => {
    if (pos+1 >= order.length) { setPhase('done'); return; }
    setPos(p=>p+1);
    setDemon(''); setPython(''); setDG(''); setPG('');
    setPhase('demon-write');
  };

  const grade = () => {
    let dPts = 0, pPts = 0;
    if (demonAns.trim().toLowerCase() && pythonAns.trim().toLowerCase()) {
      const same = demonAns.trim().toLowerCase().split(/\s+/).some(w => w.length>2 && pythonAns.toLowerCase().includes(w));
      if (same) { dPts += 10; pPts += 10; }
    }
    if (demonGuess.trim().toLowerCase() && pythonAns.trim().toLowerCase()) {
      const close = demonGuess.toLowerCase().split(/\s+/).some(w => w.length>2 && pythonAns.toLowerCase().includes(w));
      if (close) dPts += 5;
    }
    if (pythonGuess.trim().toLowerCase() && demonAns.trim().toLowerCase()) {
      const close = pythonGuess.toLowerCase().split(/\s+/).some(w => w.length>2 && demonAns.toLowerCase().includes(w));
      if (close) pPts += 5;
    }
    addScore('match', dPts, pPts);
    setHistory(h=>[...h, {q, demon:demonAns, python:pythonAns, dPts, pPts}]);
    if (Math.random()<0.5) fireVaggers(pick(VAGGERS));
    setPhase('reveal');
  };

  if (phase === 'done') {
    return (
      <div style={{minHeight:'100vh'}}>
        <Header title="Match Game" sub="Round complete" onBack={onBack} color="#FF2D75" />
        <div style={{padding:18}}>
          <div className="card" style={{padding:22,textAlign:'center'}}>
            <div style={{fontSize:60,marginBottom:14}}>💕</div>
            <div className="serif" style={{fontSize:26,fontWeight:600,color:'#FFD700'}}>That's a wrap.</div>
            <div style={{fontSize:14,opacity:0.7,marginTop:8}}>Run another round? Or check the Dashboard.</div>
            <button onClick={()=>{setOrder(shuffle(MATCH.map((_,i)=>i)));setPos(0);setPhase('demon-write');setHistory([]);}}
              className="btn-primary" style={{marginTop:18}}>↻ Another Round</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:'100vh',paddingBottom:120}}>
      <Header title="Match Game" sub={`Question ${pos+1} of ${order.length}`} onBack={onBack} color="#FF2D75" />
      <div style={{padding:18}}>
        <div className="card" style={{padding:18,marginBottom:16,background:'linear-gradient(135deg,rgba(255,45,117,0.08),rgba(157,78,221,0.05))'}}>
          <div style={{fontSize:11,opacity:0.5,fontWeight:700,letterSpacing:'0.1em'}}>QUESTION</div>
          <div style={{fontSize:18,marginTop:8,lineHeight:1.4}}>{q}</div>
        </div>

        {phase === 'demon-write' && (
          <>
            <PlayerBadge player="demon" />
            <div style={{margin:'14px 0 8px',fontSize:14,opacity:0.7}}>Type your answer (Python: look away)</div>
            <textarea value={demonAns} onChange={e=>setDemon(e.target.value)} placeholder="Demon's secret answer…" />
            <div style={{margin:'14px 0 8px',fontSize:14,opacity:0.7}}>Now guess what Python will say:</div>
            <textarea value={demonGuess} onChange={e=>setDG(e.target.value)} placeholder="My guess about Crystal…" />
            <button onClick={()=>setPhase('python-write')} className="btn-primary" style={{width:'100%',marginTop:14}}
              disabled={!demonAns.trim()}>Pass to Python →</button>
          </>
        )}

        {phase === 'python-write' && (
          <>
            <PlayerBadge player="python" />
            <div style={{margin:'14px 0 8px',fontSize:14,opacity:0.7}}>Type your answer (Demon: look away)</div>
            <textarea value={pythonAns} onChange={e=>setPython(e.target.value)} placeholder="Python's secret answer…" />
            <div style={{margin:'14px 0 8px',fontSize:14,opacity:0.7}}>Now guess what Demon said:</div>
            <textarea value={pythonGuess} onChange={e=>setPG(e.target.value)} placeholder="My guess about Kelli…" />
            <button onClick={grade} className="btn-primary" style={{width:'100%',marginTop:14}}
              disabled={!pythonAns.trim()}>🎭 Reveal Both</button>
          </>
        )}

        {phase === 'reveal' && (
          <div style={{animation:'fade-in 0.4s'}}>
            <div className="card" style={{padding:14,marginBottom:10,borderColor:'rgba(255,215,0,0.3)'}}>
              <div style={{fontSize:11,opacity:0.6,fontWeight:700}}>😈 DEMON SAID:</div>
              <div style={{marginTop:6,fontSize:15}} className="gold">{demonAns}</div>
              <div style={{fontSize:12,opacity:0.6,marginTop:8}}>Python guessed: <em>{pythonGuess || '—'}</em></div>
            </div>
            <div className="card" style={{padding:14,marginBottom:14,borderColor:'rgba(255,69,69,0.3)'}}>
              <div style={{fontSize:11,opacity:0.6,fontWeight:700}}>🐍 PYTHON SAID:</div>
              <div style={{marginTop:6,fontSize:15}} className="gold">{pythonAns}</div>
              <div style={{fontSize:12,opacity:0.6,marginTop:8}}>Demon guessed: <em>{demonGuess || '—'}</em></div>
            </div>
            <button onClick={next} className="btn-primary" style={{width:'100%'}}>Next Question →</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODE: TRIVIA
// ═══════════════════════════════════════════════════════════════
function Trivia({ onBack, addScore, fireVaggers, fireCluck }) {
  const [order, setOrder] = useState(()=>shuffle(TRIVIA.map((_,i)=>i)));
  const [pos, setPos] = useState(0);
  const [player, setPlayer] = useState('demon');
  const [picked, setPicked] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [streak, setStreak] = useState({demon:0,python:0});

  if (pos >= order.length) {
    return (
      <div style={{minHeight:'100vh'}}>
        <Header title="80s/90s Trivia" sub="Round complete" onBack={onBack} color="#00C2FF" />
        <div style={{padding:18,textAlign:'center'}}>
          <div className="card" style={{padding:22}}>
            <div style={{fontSize:50}}>🧠</div>
            <div className="serif gold" style={{fontSize:24,fontWeight:600,marginTop:8}}>Quiz complete</div>
            <button onClick={()=>{setOrder(shuffle(TRIVIA.map((_,i)=>i)));setPos(0);setShowResult(false);setPicked(null);}} className="btn-primary" style={{marginTop:18}}>↻ Run It Back</button>
          </div>
        </div>
      </div>
    );
  }

  const item = TRIVIA[order[pos]];
  const correct = picked === item.a;

  const submit = (i) => {
    if (showResult) return;
    setPicked(i);
    setShowResult(true);
    const ok = i === item.a;
    if (ok) {
      addScore('trivia', player==='demon' ? 10 : 0, player==='python' ? 10 : 0);
      setStreak(s => ({...s, [player]: s[player]+1}));
      if (Math.random()<0.4) fireVaggers(pick(VAGGERS));
    } else {
      setStreak(s => ({...s, [player]: 0}));
      if (Math.random()<0.3) fireCluck && fireCluck();
    }
  };

  const next = () => {
    setPlayer(p => p === 'demon' ? 'python' : 'demon');
    setPos(p => p+1);
    setPicked(null);
    setShowResult(false);
  };

  return (
    <div style={{minHeight:'100vh',paddingBottom:120}}>
      <Header title="80s/90s Trivia" sub={`Question ${pos+1} of ${order.length}`} onBack={onBack} color="#00C2FF" />
      <div style={{padding:18}}>
        <div style={{display:'flex',gap:8,justifyContent:'center',marginBottom:14}}>
          <PlayerBadge player="demon" score={streak.demon} />
          <PlayerBadge player="python" score={streak.python} />
        </div>
        <div style={{textAlign:'center',padding:8,marginBottom:14,fontSize:13,opacity:0.7}}>
          {player === 'demon' ? "😈 Demon's turn" : "🐍 Python's turn"}
        </div>
        <div className="card" style={{padding:18,marginBottom:14}}>
          <div style={{fontSize:18,lineHeight:1.4}}>{item.q}</div>
        </div>
        {item.opts.map((o,i)=>{
          let bg = 'rgba(255,255,255,0.04)';
          let bord = 'rgba(255,255,255,0.1)';
          if (showResult) {
            if (i === item.a) { bg='rgba(0,200,100,0.18)'; bord='rgba(0,200,100,0.5)'; }
            else if (i === picked) { bg='rgba(255,69,69,0.18)'; bord='rgba(255,69,69,0.5)'; }
          }
          return (
            <button key={i} onClick={()=>submit(i)} disabled={showResult} style={{
              width:'100%',padding:14,marginBottom:10,
              background:bg,border:`1px solid ${bord}`,borderRadius:12,
              textAlign:'left',fontSize:15,fontWeight:600,
            }}>{String.fromCharCode(65+i)}. {o}</button>
          );
        })}
        {showResult && (
          <div style={{marginTop:14,textAlign:'center',animation:'fade-in 0.3s'}}>
            <div style={{fontSize:18,fontWeight:700}} className={correct ? 'gold' : ''}>
              {correct ? `✓ +10 for ${player==='demon' ? 'Demon' : 'Python'}` : `✗ Tough one. Pass to ${player==='demon' ? 'Python' : 'Demon'}.`}
            </div>
            <button onClick={next} className="btn-primary" style={{marginTop:14}}>Next →</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODE: THIS OR THAT
// ═══════════════════════════════════════════════════════════════
function ThisOrThat({ onBack, addScore, fireVaggers }) {
  const [order, setOrder] = useState(()=>shuffle(TOT.map((_,i)=>i)));
  const [pos, setPos] = useState(0);
  const [demonPick, setDemonPick] = useState(null);
  const [pythonPick, setPythonPick] = useState(null);
  const [phase, setPhase] = useState('demon'); // demon | python | reveal | done
  const [matches, setMatches] = useState(0);

  if (phase === 'done' || pos >= order.length) {
    const pct = Math.round((matches / order.length) * 100);
    return (
      <div style={{minHeight:'100vh'}}>
        <Header title="This or That" sub="Match Complete" onBack={onBack} color="#FFD700" />
        <div style={{padding:18,textAlign:'center'}}>
          <div className="card" style={{padding:22}}>
            <div style={{fontSize:50}}>⚡</div>
            <div className="serif" style={{fontSize:48,fontWeight:600,color:'#FFD700',marginTop:8}}>{pct}%</div>
            <div style={{fontSize:14,opacity:0.7}}>matched · {matches} of {order.length}</div>
            <button onClick={()=>{setOrder(shuffle(TOT.map((_,i)=>i)));setPos(0);setMatches(0);setPhase('demon');setDemonPick(null);setPythonPick(null);}} className="btn-primary" style={{marginTop:18}}>↻ Again</button>
          </div>
        </div>
      </div>
    );
  }

  const pair = TOT[order[pos]];

  const next = () => {
    if (demonPick !== null && pythonPick !== null && demonPick === pythonPick) {
      setMatches(m=>m+1);
      addScore('tot', 5, 5);
    }
    if (pos+1 >= order.length) { setPhase('done'); return; }
    setPos(p=>p+1);
    setDemonPick(null); setPythonPick(null);
    setPhase('demon');
  };

  const handlePick = (i) => {
    if (phase === 'demon') { setDemonPick(i); setPhase('python'); }
    else if (phase === 'python') {
      setPythonPick(i);
      setPhase('reveal');
      if (i === demonPick && Math.random()<0.4) fireVaggers(pick(VAGGERS));
    }
  };

  return (
    <div style={{minHeight:'100vh',paddingBottom:120}}>
      <Header title="This or That" sub={`${pos+1} / ${order.length} · matches: ${matches}`} onBack={onBack} color="#FFD700" />
      <div style={{padding:18}}>
        <div style={{textAlign:'center',marginBottom:14,fontSize:13,opacity:0.7}}>
          {phase==='demon' && "😈 Demon picks first (Python: look away)"}
          {phase==='python' && "🐍 Python picks (Demon: look away)"}
          {phase==='reveal' && (demonPick===pythonPick ? "💕 MATCH" : "Different. That's hot too.")}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          {pair.map((opt,i)=>{
            const dPicked = demonPick === i;
            const pPicked = pythonPick === i;
            const showAll = phase === 'reveal';
            return (
              <button key={i} onClick={()=>handlePick(i)} disabled={phase==='reveal'} style={{
                padding:'24px 18px',borderRadius:18,
                background: showAll && dPicked && pPicked ? 'linear-gradient(135deg,rgba(255,215,0,0.2),rgba(255,45,117,0.15))'
                  : (dPicked || pPicked) ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.04)',
                border: `2px solid ${showAll && dPicked && pPicked ? 'rgba(255,215,0,0.6)' : (dPicked || pPicked) ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
                fontSize:18,fontWeight:700,
                position:'relative',
              }}>
                {opt}
                {showAll && (
                  <div style={{position:'absolute',top:8,right:10,display:'flex',gap:4,fontSize:13}}>
                    {dPicked && <span>😈</span>}{pPicked && <span>🐍</span>}
                  </div>
                )}
              </button>
            );
          })}
        </div>
        {phase === 'reveal' && (
          <button onClick={next} className="btn-primary" style={{width:'100%',marginTop:18}}>Next →</button>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODE: FINISH LYRIC
// ═══════════════════════════════════════════════════════════════
function FinishLyric({ onBack, addScore, fireVaggers }) {
  const [order, setOrder] = useState(()=>shuffle(LYRICS.map((_,i)=>i)));
  const [pos, setPos] = useState(0);
  const [player, setPlayer] = useState('demon');
  const [guess, setGuess] = useState('');
  const [shown, setShown] = useState(false);

  if (pos >= order.length) {
    return (
      <div style={{minHeight:'100vh'}}>
        <Header title="Finish the Lyric" sub="Sing-off complete" onBack={onBack} color="#FF2D75" />
        <div style={{padding:18,textAlign:'center'}}>
          <div className="card" style={{padding:22}}>
            <div style={{fontSize:50}}>🎤</div>
            <div className="serif gold" style={{fontSize:24,fontWeight:600,marginTop:8}}>Mic drop</div>
            <button onClick={()=>{setOrder(shuffle(LYRICS.map((_,i)=>i)));setPos(0);setShown(false);setGuess('');}} className="btn-primary" style={{marginTop:18}}>↻ Again</button>
          </div>
        </div>
      </div>
    );
  }

  const l = LYRICS[order[pos]];
  const correct = guess.trim().toLowerCase() === l.a.toLowerCase();

  const submit = () => {
    setShown(true);
    if (correct) {
      addScore('lyric', player==='demon'?5:0, player==='python'?5:0);
      if (Math.random()<0.3) fireVaggers(pick(VAGGERS));
    }
  };

  const next = () => {
    setPlayer(p=>p==='demon'?'python':'demon');
    setPos(p=>p+1); setGuess(''); setShown(false);
  };

  return (
    <div style={{minHeight:'100vh',paddingBottom:120}}>
      <Header title="Finish the Lyric" sub={`${pos+1} / ${order.length}`} onBack={onBack} color="#FF2D75" />
      <div style={{padding:18}}>
        <div style={{textAlign:'center',marginBottom:14,fontSize:13,opacity:0.7}}>
          {player==='demon' ? "😈 Demon's turn" : "🐍 Python's turn"}
        </div>
        <div className="card" style={{padding:20}}>
          <div style={{fontSize:11,opacity:0.5,fontWeight:700,letterSpacing:'0.1em'}}>{l.artist} · {l.title}</div>
          <div className="serif" style={{fontSize:24,marginTop:14,lineHeight:1.4,fontStyle:'italic'}}>
            "{l.line.replace('___', shown ? `__${l.a}__` : '_____')}"
          </div>
          {!shown && (
            <>
              <input type="text" value={guess} onChange={e=>setGuess(e.target.value)} placeholder="Fill in the blank…" style={{marginTop:18}} onKeyDown={e=>e.key==='Enter'&&submit()} />
              <button onClick={submit} className="btn-primary" style={{width:'100%',marginTop:14}}>Lock In</button>
            </>
          )}
          {shown && (
            <div style={{marginTop:18,textAlign:'center'}}>
              <div style={{fontSize:18,fontWeight:700}} className={correct?'gold':''}>
                {correct ? `✓ +5 for ${player==='demon'?'Demon':'Python'}` : `✗ It was "${l.a}"`}
              </div>
              <button onClick={next} className="btn-primary" style={{marginTop:14}}>Next →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODE: B'CYDER
// ═══════════════════════════════════════════════════════════════
function BCyder({ onBack, addScore, fireVaggers, fireCluck }) {
  const [order] = useState(()=>shuffle(BCYDER.map((_,i)=>i)));
  const [pos, setPos] = useState(0);
  const [player, setPlayer] = useState('demon');

  if (pos >= order.length) {
    return (
      <div style={{minHeight:'100vh'}}>
        <Header title="B'Cyder" sub="All asked. None answered." onBack={onBack} color="#9D4EDD" />
        <div style={{padding:18,textAlign:'center'}}>
          <div className="card" style={{padding:22}}>
            <div style={{fontSize:50}}>💜</div>
            <div className="serif gold" style={{fontSize:24,fontWeight:600,marginTop:8}}>Out of questions.</div>
            <div style={{fontSize:13,opacity:0.7,marginTop:8}}>Build something with what you found.</div>
          </div>
        </div>
      </div>
    );
  }

  const q = BCYDER[order[pos]];

  const award = () => {
    addScore('bcyder', player==='demon'?5:0, player==='python'?5:0);
    if (Math.random()<0.3) fireVaggers(pick(VAGGERS));
    if (Math.random()<0.15) fireCluck && fireCluck();
    setPlayer(p=>p==='demon'?'python':'demon');
    setPos(p=>p+1);
  };

  return (
    <div style={{minHeight:'100vh',paddingBottom:120}}>
      <Header title="B'Cyder" sub={`Q ${pos+1} of ${order.length}`} onBack={onBack} color="#9D4EDD" />
      <div style={{padding:18}}>
        <div style={{textAlign:'center',marginBottom:18,fontSize:14,opacity:0.7}}>
          {player==='demon' ? "🐍 Python asks Demon" : "😈 Demon asks Python"}
        </div>
        <div className="card" style={{padding:24,minHeight:200,display:'flex',alignItems:'center',justifyContent:'center',background:'linear-gradient(135deg,rgba(157,78,221,0.1),rgba(255,45,117,0.05))'}}>
          <div className="serif" style={{fontSize:24,fontWeight:500,textAlign:'center',lineHeight:1.4}}>{q}</div>
        </div>
        <div style={{display:'flex',gap:10,marginTop:18}}>
          <button onClick={award} className="btn-primary" style={{flex:1}}>✓ Answered (+5)</button>
          <button onClick={()=>{setPlayer(p=>p==='demon'?'python':'demon');setPos(p=>p+1);}} className="btn-ghost" style={{flex:1}}>Skip</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODE: PHOTO CHALLENGE — uses prompts; saves to localStorage
// ═══════════════════════════════════════════════════════════════
function PhotoChallenge({ onBack }) {
  const [tab, setTab] = useState('cute');
  const [prompts, setPrompts] = useState(()=>shuffle(PHOTO_PROMPTS.cute));
  const [idx, setIdx] = useState(0);
  const [taken, setTaken] = useState(()=>lsGet('yams_photos',[]));

  const reroll = (cat) => { setTab(cat); setPrompts(shuffle(PHOTO_PROMPTS[cat])); setIdx(0); };

  return (
    <div style={{minHeight:'100vh',paddingBottom:120}}>
      <Header title="Photo Challenge" sub="Cute · Funny · Naughty" onBack={onBack} color="#00C2FF" />
      <div style={{padding:18}}>
        <div style={{display:'flex',gap:8,marginBottom:18}}>
          {['cute','funny','naughty'].map(c=>(
            <button key={c} onClick={()=>reroll(c)} style={{
              flex:1,padding:'10px 8px',borderRadius:10,fontWeight:700,fontSize:13,
              background: tab===c ? 'linear-gradient(135deg,#FF2D75,#9D4EDD)' : 'rgba(255,255,255,0.06)',
              color: tab===c ? '#fff' : 'rgba(255,255,255,0.6)',
              textTransform:'capitalize'
            }}>{c}</button>
          ))}
        </div>
        <div className="card" style={{padding:24,marginBottom:14,minHeight:120,display:'grid',placeItems:'center'}}>
          <div style={{fontSize:11,opacity:0.5,fontWeight:700,letterSpacing:'0.1em',textAlign:'center'}}>PROMPT</div>
          <div className="serif" style={{fontSize:22,fontWeight:500,textAlign:'center',marginTop:6,lineHeight:1.4}}>{prompts[idx]}</div>
        </div>
        <div style={{display:'flex',gap:10,marginBottom:18}}>
          <button onClick={()=>setIdx(i=>(i+1)%prompts.length)} className="btn-ghost" style={{flex:1}}>↻ New Prompt</button>
          <button onClick={()=>{
            const t = [...taken, {cat:tab, prompt:prompts[idx], at:new Date().toISOString()}];
            setTaken(t); lsSet('yams_photos', t);
          }} className="btn-primary" style={{flex:1}}>📸 Mark Taken</button>
        </div>
        <div style={{fontSize:13,opacity:0.65,marginBottom:8}}>{taken.length} prompt{taken.length===1?'':'s'} completed</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(110px, 1fr))',gap:8}}>
          {taken.slice(-12).reverse().map((t,i)=>(
            <div key={i} style={{padding:10,background:'rgba(255,255,255,0.04)',borderRadius:10,fontSize:11}}>
              <div style={{fontSize:9,opacity:0.5,fontWeight:700}}>{t.cat.toUpperCase()}</div>
              <div style={{marginTop:4}}>{t.prompt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODE: HEADLINER — stripper name slot machine
// ═══════════════════════════════════════════════════════════════
function Headliner({ onBack, fireVaggers }) {
  const [name, setName] = useState({title:'',first:'',last:'',song:'',back:'',spec:''});
  const [spinning, setSpinning] = useState(false);
  const [hof, setHof] = useState(()=>lsGet('yams_hof',[]));

  const spin = () => {
    setSpinning(true);
    let t = 0;
    const tick = setInterval(()=>{
      setName({
        title: pick(SN_TITLE),
        first: pick(SN_FIRST),
        last: pick(SN_LAST),
        song: pick(SN_SONG),
        back: pick(SN_BACK),
        spec: pick(SN_SPEC),
      });
      t++;
      if (t > 18) {
        clearInterval(tick);
        setSpinning(false);
        if (Math.random()<0.7) fireVaggers(pick(VAGGERS));
      }
    }, 80);
  };

  const enshrine = () => {
    if (!name.first) return;
    const updated = [...hof, {...name, at:new Date().toISOString()}];
    setHof(updated); lsSet('yams_hof', updated);
  };

  return (
    <div style={{minHeight:'100vh',paddingBottom:120}}>
      <Header title="The Headliner" sub="Stripper Name Generator™" onBack={onBack} color="#FF2D75" />
      <div style={{padding:18}}>
        <div className="card" style={{padding:22,background:'linear-gradient(135deg,rgba(255,45,117,0.12),rgba(255,215,0,0.06))',borderColor:'rgba(255,215,0,0.4)'}}>
          {!name.first ? (
            <div style={{textAlign:'center',padding:'30px 0'}}>
              <div style={{fontSize:52}}>💋</div>
              <div className="serif gold-glow" style={{fontSize:24,marginTop:12}}>Spin to be reborn</div>
            </div>
          ) : (
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:11,opacity:0.5,fontWeight:700,letterSpacing:'0.2em'}}>NOW INTRODUCING</div>
              <div className="serif gold-glow" style={{fontSize:30,fontWeight:700,marginTop:10,lineHeight:1.2}}>
                {name.title} {name.first} {name.last}
              </div>
              {!spinning && (
                <>
                  <div style={{marginTop:18,fontSize:13,opacity:0.7}}>Entrance song:</div>
                  <div style={{fontSize:14,fontStyle:'italic',marginTop:4}}>{name.song}</div>
                  <div style={{marginTop:14,fontSize:13,opacity:0.7}}>Backstory:</div>
                  <div style={{fontSize:14,marginTop:4,fontStyle:'italic'}}>"{name.back}"</div>
                  <div style={{marginTop:14,fontSize:13,opacity:0.7}}>Specialty:</div>
                  <div style={{fontSize:14,marginTop:4,fontStyle:'italic'}}>"{name.spec}"</div>
                </>
              )}
            </div>
          )}
        </div>
        <div style={{display:'flex',gap:10,marginTop:18}}>
          <button onClick={spin} disabled={spinning} className="btn-primary" style={{flex:1}}>{spinning?'…spinning…':'🎰 SPIN'}</button>
          {name.first && !spinning && (
            <button onClick={enshrine} className="btn-gold" style={{flex:1}}>🏆 Enshrine</button>
          )}
        </div>
        {hof.length > 0 && (
          <div style={{marginTop:24}}>
            <div style={{fontSize:12,opacity:0.5,fontWeight:700,letterSpacing:'0.1em',marginBottom:10}}>HALL OF FAME · {hof.length}</div>
            {hof.slice(-5).reverse().map((h,i)=>(
              <div key={i} className="card" style={{padding:12,marginBottom:8}}>
                <div className="serif gold" style={{fontSize:18,fontWeight:600}}>{h.title} {h.first} {h.last}</div>
                <div style={{fontSize:11,opacity:0.6,marginTop:4,fontStyle:'italic'}}>{h.spec}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODE: DATE CARD
// ═══════════════════════════════════════════════════════════════
function DateCard({ onBack }) {
  const [accepted, setAccepted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <div style={{minHeight:'100vh',paddingBottom:120,background:'linear-gradient(180deg,#1a0a14 0%,#0a0a0a 100%)'}}>
      <Header title="Date Card" sub="Cordial Invitation" onBack={onBack} color="#FFD700" />
      {showConfetti && <Confetti />}
      <div style={{padding:24,textAlign:'center'}}>
        {!accepted ? (
          <>
            <div className="serif gold-glow" style={{fontSize:34,fontWeight:600,marginTop:18,letterSpacing:'-0.01em'}}>
              {DATE_CARD.intro}
            </div>
            <div style={{margin:'20px 0',width:80,height:1,background:'linear-gradient(90deg,transparent,#FFD700,transparent)',marginLeft:'auto',marginRight:'auto'}} />
            <div style={{fontSize:13,opacity:0.7,letterSpacing:'0.15em'}}>TO</div>
            <div className="serif" style={{fontSize:26,marginTop:6,color:'#FF2D75',fontStyle:'italic'}}>{DATE_CARD.to}</div>
            <div style={{fontSize:13,opacity:0.7,letterSpacing:'0.15em',marginTop:14}}>FROM</div>
            <div className="serif gold" style={{fontSize:24,marginTop:6,fontStyle:'italic'}}>{DATE_CARD.from}</div>
            <div style={{margin:'30px 0 18px',width:80,height:1,background:'linear-gradient(90deg,transparent,#FFD700,transparent)',marginLeft:'auto',marginRight:'auto'}} />
            <div style={{textAlign:'left',maxWidth:420,margin:'0 auto'}}>
              {DATE_CARD.phases.map((p,i)=>(
                <div key={i} className="card" style={{padding:16,marginBottom:12,borderColor:'rgba(255,215,0,0.2)'}}>
                  <div style={{fontSize:11,opacity:0.6,fontWeight:700,letterSpacing:'0.15em',color:'#FFD700'}}>{p.label}</div>
                  <div style={{fontSize:14,marginTop:6,lineHeight:1.5}}>{p.t}</div>
                </div>
              ))}
            </div>
            <button onClick={()=>{setAccepted(true);setShowConfetti(true);setTimeout(()=>setShowConfetti(false),5000);}} className="btn-gold" style={{marginTop:22,padding:'18px 40px',fontSize:18}}>
              💍 SAY YES
            </button>
          </>
        ) : (
          <div style={{paddingTop:60}}>
            <div style={{fontSize:80}}>💍</div>
            <div className="serif gold-glow" style={{fontSize:48,fontWeight:600,marginTop:14}}>SHE SAID YES</div>
            <div className="serif" style={{fontSize:18,marginTop:18,opacity:0.85,whiteSpace:'pre-wrap',fontStyle:'italic'}}>
              {DATE_CARD.signoff}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODE: SOUNDTRACK
// ═══════════════════════════════════════════════════════════════
function Soundtrack({ onBack }) {
  const [open, setOpen] = useState(null);
  return (
    <div style={{minHeight:'100vh',paddingBottom:120}}>
      <Header title="The Soundtrack" sub="Five songs. The whole chase." onBack={onBack} color="#9D4EDD" />
      <div style={{padding:18}}>
        {SOUNDTRACK.map((s,i)=>(
          <button key={i} onClick={()=>setOpen(open===i?null:i)} style={{
            width:'100%',textAlign:'left',padding:16,marginBottom:12,
            background:'rgba(157,78,221,0.06)',border:'1px solid rgba(157,78,221,0.25)',borderRadius:14,
          }}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{
                width:44,height:44,borderRadius:'50%',
                background:'linear-gradient(135deg,#9D4EDD,#FF2D75)',
                display:'grid',placeItems:'center',fontSize:18
              }}>♫</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:16}}>{s.title}</div>
                <div style={{fontSize:12,opacity:0.6,marginTop:2}}>{s.artist}</div>
              </div>
              <div style={{opacity:0.4}}>{open===i?'−':'+'}</div>
            </div>
            {open===i && (
              <div style={{marginTop:14,paddingTop:14,borderTop:'1px solid rgba(255,255,255,0.06)',fontSize:14,lineHeight:1.5,opacity:0.85,fontStyle:'italic'}}>
                {s.meaning}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODE: DASHBOARD
// ═══════════════════════════════════════════════════════════════
function Dashboard({ onBack, scores }) {
  const total = (p) => Object.values(scores).reduce((a,b)=>a+(b[p]||0),0);
  const tDemon = total('demon');
  const tPython = total('python');
  const lead = tDemon > tPython ? 'demon' : tPython > tDemon ? 'python' : null;
  const games = [
    {key:'match',label:'💕 Match Game'},
    {key:'trivia',label:'🎮 Trivia'},
    {key:'tot',label:'⚡ This or That'},
    {key:'lyric',label:'🎤 Lyrics'},
    {key:'bcyder',label:'💜 B\'Cyder'},
    {key:'wanna',label:'🍑 WANNA'},
    {key:'remember',label:'🖼️ Remember This'},
  ];
  const vagComment = lead === 'python'
    ? "Crystal is winning. Not surprised."
    : lead === 'demon' ? "Kelli is winning. Crystal allowed it." : "Tied. Vaggers calls it artistic.";

  return (
    <div style={{minHeight:'100vh',paddingBottom:120}}>
      <Header title="Dashboard" sub="The full board" onBack={onBack} color="#FFD700" />
      <div style={{padding:18}}>
        <div className="card" style={{padding:22,marginBottom:18}}>
          <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
            <div style={{textAlign:'center',opacity:lead==='demon'?1:0.55}}>
              <div style={{fontSize:36}}>😈</div>
              <div style={{fontSize:11,opacity:0.7,marginTop:4,fontWeight:700,letterSpacing:'0.1em'}}>DEMON</div>
              <div className="serif gold" style={{fontSize:42,fontWeight:700,marginTop:4}}>{tDemon}</div>
            </div>
            <div style={{fontSize:24,opacity:0.4}}>·</div>
            <div style={{textAlign:'center',opacity:lead==='python'?1:0.55}}>
              <div style={{fontSize:36}}>🐍</div>
              <div style={{fontSize:11,opacity:0.7,marginTop:4,fontWeight:700,letterSpacing:'0.1em'}}>PYTHON</div>
              <div className="serif gold" style={{fontSize:42,fontWeight:700,marginTop:4}}>{tPython}</div>
            </div>
          </div>
          <div style={{textAlign:'center',marginTop:18,padding:12,background:'rgba(255,215,0,0.06)',borderRadius:10,fontSize:13,fontStyle:'italic'}}>
            🦆 Dr. Vaggers: <span className="gold">{vagComment}</span>
          </div>
        </div>
        <div style={{fontSize:12,opacity:0.5,fontWeight:700,letterSpacing:'0.1em',marginBottom:10}}>BREAKDOWN</div>
        {games.map(g=>{
          const d = scores[g.key]?.demon || 0;
          const p = scores[g.key]?.python || 0;
          if (d === 0 && p === 0) return null;
          return (
            <div key={g.key} className="card" style={{padding:14,marginBottom:10,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{fontSize:14}}>{g.label}</div>
              <div style={{display:'flex',gap:14,fontSize:13,fontWeight:700}}>
                <span>😈 {d}</span><span>🐍 {p}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODE: WANNA PEACH GAME — floating peaches, tap to collect
// ═══════════════════════════════════════════════════════════════
function WannaGame({ onBack, addScore, fireVaggers, fireCluck }) {
  const [player, setPlayer] = useState('demon');
  const [peaches, setPeaches] = useState([]);
  const [counts, setCounts] = useState({demon:0, python:0});
  const [lastMessage, setLastMessage] = useState(null);
  const [history, setHistory] = useState([]);
  const idRef = useRef(0);
  const containerRef = useRef(null);

  // Spawn peaches periodically
  useEffect(() => {
    const spawn = setInterval(() => {
      setPeaches(prev => {
        if (prev.length > 8) return prev;
        const id = ++idRef.current;
        const isFuck = Math.random() < 0.08; // rare FUCK peach
        const isCluck = Math.random() < 0.06; // even rarer Cluck
        return [...prev, {
          id,
          left: 5 + Math.random()*85,
          duration: 5 + Math.random()*4,
          emoji: isCluck ? '🐔' : isFuck ? '🍆' : '🍑',
          type: isCluck ? 'cluck' : isFuck ? 'fuck' : 'wanna',
        }];
      });
    }, 700);
    return () => clearInterval(spawn);
  }, []);

  // Cleanup off-screen peaches
  useEffect(() => {
    const cleanup = setInterval(() => {
      setPeaches(prev => prev.slice(-12));
    }, 5000);
    return () => clearInterval(cleanup);
  }, []);

  const tapPeach = (peach) => {
    setPeaches(prev => prev.filter(p => p.id !== peach.id));
    let msg;
    if (peach.type === 'cluck') {
      msg = pick(CLUCK);
      fireCluck && fireCluck(msg);
    } else if (peach.type === 'fuck') {
      msg = pick(["FUCK. I MEAN WANNA. I MEAN FUCK. I MEAN YES.","FUCK YES.","FUCK ME UP.","FUCK. (whispered.)"]);
    } else {
      msg = pick(WANNA);
    }
    setLastMessage({ text: msg, by: player, type: peach.type });
    setCounts(c => ({...c, [player]: c[player]+1}));
    setHistory(h => [{by:player, msg, type:peach.type, at:Date.now()}, ...h].slice(0,20));
    addScore('wanna', player==='demon'?1:0, player==='python'?1:0);
    if (Math.random() < 0.15) fireVaggers(pick(VAGGERS), Math.random()<0.5 ? 'vaggers_pucker' : 'vaggers_googly');
    setTimeout(() => setLastMessage(m => m && m.text === msg ? null : m), 2200);
  };

  return (
    <div style={{minHeight:'100vh',position:'relative',overflow:'hidden',background:'linear-gradient(180deg,#1a0a14 0%,#0a0a0a 100%)'}}>
      <Header title="WANNA?" sub="Tap the peaches. Collect the chaos." onBack={onBack} color="#FF69B4" />

      <div style={{padding:'12px 18px 0'}}>
        <PlayerToggle player={player} setPlayer={setPlayer} />
        <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',padding:14,marginTop:12,background:'rgba(255,105,180,0.08)',borderRadius:14,border:'1px solid rgba(255,105,180,0.2)'}}>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:11,opacity:0.6,fontWeight:700}}>😈 DEMON</div>
            <div className="serif gold" style={{fontSize:32,fontWeight:700}}>{counts.demon}</div>
          </div>
          <div style={{fontSize:12,opacity:0.4}}>·</div>
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:11,opacity:0.6,fontWeight:700}}>🐍 PYTHON</div>
            <div className="serif gold" style={{fontSize:32,fontWeight:700}}>{counts.python}</div>
          </div>
        </div>
      </div>

      <div ref={containerRef} style={{
        position:'fixed',inset:0,top:0,zIndex:5,pointerEvents:'none'
      }}>
        {peaches.map(p => (
          <button key={p.id} onClick={()=>tapPeach(p)} className="no-select" style={{
            position:'absolute',
            left:`${p.left}%`,bottom:0,
            fontSize: p.type === 'cluck' ? 56 : 52,
            animation: `float-up ${p.duration}s linear forwards`,
            pointerEvents:'auto',
            background:'transparent',
            filter: p.type === 'fuck' ? 'hue-rotate(-30deg) saturate(1.5)' : 'none',
            textShadow: '0 4px 12px rgba(255,69,140,0.4)',
            cursor:'pointer',
            border:'none',
          }}>{p.emoji}</button>
        ))}
      </div>

      {lastMessage && (
        <div style={{
          position:'fixed',top:'40%',left:0,right:0,zIndex:50,
          textAlign:'center',pointerEvents:'none',
          animation:'pop-in 0.4s cubic-bezier(.2,.9,.3,1.4)',
        }}>
          <div className="serif" style={{
            display:'inline-block',padding:'18px 26px',
            background:'linear-gradient(135deg,rgba(255,105,180,0.95),rgba(255,45,117,0.9))',
            borderRadius:18,
            fontSize: lastMessage.text.length > 40 ? 18 : 26,
            fontWeight:700,letterSpacing:'-0.01em',
            boxShadow:'0 12px 40px rgba(255,45,117,0.5)',
            maxWidth:'90vw',
            color:'#fff',
          }}>
            {lastMessage.text}
            <div style={{fontSize:11,opacity:0.7,marginTop:6,fontWeight:600}}>
              {lastMessage.by === 'demon' ? '😈 Demon' : '🐍 Python'}
            </div>
          </div>
        </div>
      )}

      <div style={{padding:'180px 18px 30px',minHeight:'40vh',position:'relative',zIndex:10}}>
        <div style={{fontSize:12,opacity:0.5,fontWeight:700,letterSpacing:'0.1em',marginBottom:10,marginTop:120}}>RECENT</div>
        {history.length === 0 && (
          <div style={{padding:18,textAlign:'center',opacity:0.5,fontSize:13,fontStyle:'italic'}}>
            Tap a 🍑 to start. Watch for 🍆 (rare FUCK) and 🐔 (Cluck Norris).
          </div>
        )}
        {history.slice(0,8).map((h,i)=>(
          <div key={i} className="card" style={{padding:10,marginBottom:6,fontSize:12,display:'flex',justifyContent:'space-between',gap:8}}>
            <span>{h.by==='demon'?'😈':'🐍'} {h.msg}</span>
            <span style={{opacity:0.4}}>{h.type==='cluck'?'🐔':h.type==='fuck'?'🍆':'🍑'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODE: REMEMBER THIS — photo questions, Kelli is correct
// ═══════════════════════════════════════════════════════════════
function RememberThis({ onBack, addScore, fireVaggers, fireCluck }) {
  const [order] = useState(()=>shuffle(REMEMBER.map((_,i)=>i)));
  const [pos, setPos] = useState(0);
  const [pythonGuess, setPythonGuess] = useState('');
  const [phase, setPhase] = useState('guess'); // guess | reveal
  const [judge, setJudge] = useState(null); // 'correct' | 'partial' | 'wrong'
  const [results, setResults] = useState([]);

  if (pos >= order.length) {
    const right = results.filter(r=>r.judge==='correct').length;
    const partial = results.filter(r=>r.judge==='partial').length;
    return (
      <div style={{minHeight:'100vh'}}>
        <Header title="Remember This?" sub="Photo memory test" onBack={onBack} color="#00C2FF" />
        <div style={{padding:18,textAlign:'center'}}>
          <div className="card" style={{padding:22}}>
            <div style={{fontSize:50}}>🖼️</div>
            <div className="serif gold" style={{fontSize:24,fontWeight:600,marginTop:8}}>Memory bank scored.</div>
            <div style={{fontSize:14,opacity:0.7,marginTop:10}}>{right} fully correct · {partial} partial · {results.length-right-partial} miss</div>
            <button onClick={()=>{setPos(0);setPhase('guess');setPythonGuess('');setResults([]);}} className="btn-primary" style={{marginTop:18}}>↻ Run It Back</button>
          </div>
        </div>
      </div>
    );
  }

  const item = REMEMBER[order[pos]];

  const submitJudge = (j) => {
    setJudge(j);
    let pPts = 0;
    if (j === 'correct') pPts = item.pts;
    else if (j === 'partial') pPts = Math.ceil(item.pts/2);
    addScore('remember', item.pts, pPts);
    setResults(r => [...r, {q:item.q, guess:pythonGuess, judge:j, pPts}]);
    if (j === 'correct' && Math.random()<0.5) fireVaggers(pick(VAGGERS), item.slot);
    if (j === 'wrong' && Math.random()<0.4) fireCluck && fireCluck();
  };

  const next = () => {
    setPos(p=>p+1); setPythonGuess(''); setPhase('guess'); setJudge(null);
  };

  return (
    <div style={{minHeight:'100vh',paddingBottom:120}}>
      <Header title="Remember This?" sub={`${pos+1} / ${order.length} · worth ${item.pts} pts`} onBack={onBack} color="#00C2FF" />
      <div style={{padding:18}}>
        <div className="photo-frame" style={{width:'100%',aspectRatio:'4/3',marginBottom:14}}>
          {P[item.slot] ? <img src={P[item.slot]} alt="" /> : <div style={{display:'grid',placeItems:'center',width:'100%',height:'100%',fontSize:64,opacity:0.4}}>🖼️</div>}
        </div>
        <div className="card" style={{padding:14,marginBottom:14}}>
          <div style={{fontSize:11,opacity:0.5,fontWeight:700,letterSpacing:'0.1em'}}>QUESTION</div>
          <div style={{fontSize:16,marginTop:6,lineHeight:1.4}}>{item.q}</div>
        </div>

        {phase === 'guess' && (
          <>
            <div style={{fontSize:13,opacity:0.7,marginBottom:8}}>🐍 Python's guess:</div>
            <textarea value={pythonGuess} onChange={e=>setPythonGuess(e.target.value)} placeholder="Crystal types her answer…" />
            <button onClick={()=>setPhase('reveal')} className="btn-primary" style={{width:'100%',marginTop:14}}>Reveal Demon's Answer</button>
          </>
        )}

        {phase === 'reveal' && (
          <div style={{animation:'fade-in 0.3s'}}>
            <div className="card" style={{padding:14,marginBottom:10,borderColor:'rgba(255,69,69,0.3)'}}>
              <div style={{fontSize:11,opacity:0.5,fontWeight:700}}>🐍 PYTHON SAID:</div>
              <div style={{marginTop:6,fontSize:14}}>{pythonGuess || <em style={{opacity:0.5}}>(no answer)</em>}</div>
            </div>
            <div className="card" style={{padding:14,marginBottom:14,borderColor:'rgba(255,215,0,0.4)'}}>
              <div style={{fontSize:11,opacity:0.5,fontWeight:700}}>😈 DEMON KNOWS:</div>
              <div style={{marginTop:6,fontSize:15}} className="gold">{item.a}</div>
            </div>
            {!judge ? (
              <>
                <div style={{fontSize:13,opacity:0.7,marginBottom:8,textAlign:'center'}}>Demon: judge Python's answer</div>
                <div style={{display:'flex',gap:8}}>
                  <button onClick={()=>submitJudge('correct')} className="btn-gold" style={{flex:1}}>✓ Correct</button>
                  <button onClick={()=>submitJudge('partial')} className="btn-primary" style={{flex:1}}>~ Partial</button>
                  <button onClick={()=>submitJudge('wrong')} className="btn-ghost" style={{flex:1}}>✗ Miss</button>
                </div>
              </>
            ) : (
              <div style={{textAlign:'center'}}>
                <div className="gold" style={{fontSize:18,fontWeight:700}}>
                  {judge==='correct' ? `+${item.pts}` : judge==='partial' ? `+${Math.ceil(item.pts/2)}` : '+0'} for Python
                </div>
                <button onClick={next} className="btn-primary" style={{marginTop:14}}>Next →</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MODE: HALL OF FAME (saved Headliners)
// ═══════════════════════════════════════════════════════════════
function HallOfFame({ onBack }) {
  const hof = lsGet('yams_hof', []);
  return (
    <div style={{minHeight:'100vh',paddingBottom:120}}>
      <Header title="Hall of Fame" sub="The Headliners" onBack={onBack} color="#FFD700" />
      <div style={{padding:18}}>
        {hof.length === 0 ? (
          <div className="card" style={{padding:30,textAlign:'center'}}>
            <div style={{fontSize:50}}>🏆</div>
            <div style={{fontSize:16,marginTop:14,opacity:0.7}}>No headliners enshrined yet.</div>
            <div style={{fontSize:13,opacity:0.5,marginTop:8}}>Spin one in The Headliner.</div>
          </div>
        ) : hof.slice().reverse().map((h,i)=>(
          <div key={i} className="card" style={{padding:18,marginBottom:14,background:'linear-gradient(135deg,rgba(255,215,0,0.06),rgba(157,78,221,0.04))',borderColor:'rgba(255,215,0,0.3)'}}>
            <div style={{fontSize:11,opacity:0.5,fontWeight:700,letterSpacing:'0.1em'}}>NOW INTRODUCING</div>
            <div className="serif gold-glow" style={{fontSize:24,fontWeight:600,marginTop:6}}>{h.title} {h.first} {h.last}</div>
            <div style={{fontSize:13,opacity:0.7,marginTop:10,fontStyle:'italic'}}>Entrance: {h.song}</div>
            <div style={{fontSize:13,opacity:0.7,marginTop:6,fontStyle:'italic'}}>"{h.back}"</div>
            <div style={{fontSize:13,opacity:0.7,marginTop:6,fontStyle:'italic'}}>Specialty: {h.spec}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HOME / MODE PICKER
// ═══════════════════════════════════════════════════════════════
function Home({ navigate, scores }) {
  const tDemon = Object.values(scores).reduce((a,b)=>a+(b.demon||0),0);
  const tPython = Object.values(scores).reduce((a,b)=>a+(b.python||0),0);
  const modes = [
    {k:'stories',  e:'📖', t:'The Stories',     s:'Type. Seal. Unlock.',           grad:['#FFD700','#FFA500']},
    {k:'roadtrip', e:'🚗', t:'Road Trip Mode',  s:'The 5.5-hour playbook',         grad:['#FF8C00','#FF2D75']},
    {k:'wanna',    e:'🍑', t:'WANNA Game',      s:'Floating peaches. Tap fast.',   grad:['#FF69B4','#FF2D75']},
    {k:'remember', e:'🖼️', t:'Remember This?', s:'Photo memory · Demon judges',   grad:['#00C2FF','#9D4EDD']},
    {k:'match',    e:'💕', t:'Match Game',       s:'Both write. Both guess.',       grad:['#FF2D75','#9D4EDD']},
    {k:'tot',      e:'⚡', t:'This or That',    s:'Pick fast. Match harder.',      grad:['#FFD700','#FF2D75']},
    {k:'trivia',   e:'🎮', t:'80s/90s Trivia',  s:'Born \'75 & \'77',               grad:['#00C2FF','#0066FF']},
    {k:'lyric',    e:'🎤', t:'Finish the Lyric', s:'Sing-off',                      grad:['#FF2D75','#FF8C00']},
    {k:'bcyder',   e:'💜', t:'B\'Cyder',         s:'Flirty + spicy',                grad:['#9D4EDD','#FF2D75']},
    {k:'photo',    e:'📸', t:'Photo Challenge', s:'Cute · Funny · Naughty',        grad:['#00C2FF','#FFD700']},
    {k:'headliner',e:'💋', t:'The Headliner',   s:'Stripper Name Generator™',      grad:['#FF2D75','#FFD700']},
    {k:'date',     e:'💌', t:'Date Card',        s:'You Are Cordially Invited',     grad:['#FFD700','#FF2D75']},
    {k:'soundtrack',e:'🎵',t:'Soundtrack',       s:'5 songs · the chase',           grad:['#9D4EDD','#0066FF']},
    {k:'dashboard',e:'📊', t:'Dashboard',        s:'Combined scores',               grad:['#00C2FF','#00C200']},
    {k:'hof',      e:'🏆', t:'Hall of Fame',     s:'Enshrined Headliners',          grad:['#FFD700','#FF8C00']},
  ];

  return (
    <div style={{minHeight:'100vh',paddingBottom:120}}>
      <div style={{padding:'24px 18px 6px',textAlign:'center'}}>
        <div style={{fontSize:11,opacity:0.55,letterSpacing:'0.3em',fontWeight:700}}>THE CHASE</div>
        <div className="serif gold-glow" style={{fontSize:42,fontWeight:600,marginTop:6,letterSpacing:'-0.02em',lineHeight:1}}>You Are<br/>My Story</div>
        <div style={{fontSize:12,opacity:0.6,marginTop:12,fontStyle:'italic'}}>For Crystal · By Your Demon · ❤️🧲❤️</div>
      </div>

      <div style={{display:'flex',justifyContent:'center',gap:10,padding:'14px 18px'}}>
        <PlayerBadge player="demon" score={tDemon} />
        <PlayerBadge player="python" score={tPython} />
      </div>

      <div style={{padding:'8px 18px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2, 1fr)',gap:12}}>
          {modes.map(m=>(
            <button key={m.k} onClick={()=>navigate(m.k)} style={{
              padding:'18px 14px',textAlign:'left',
              background:`linear-gradient(135deg, ${m.grad[0]}22, ${m.grad[1]}11)`,
              border:`1px solid ${m.grad[0]}55`,
              borderRadius:16,
              minHeight:120,
              display:'flex',flexDirection:'column',justifyContent:'space-between',
              transition:'transform 0.15s',
            }}>
              <div style={{fontSize:36}}>{m.e}</div>
              <div>
                <div style={{fontWeight:700,fontSize:14,letterSpacing:'-0.01em',lineHeight:1.2}}>{m.t}</div>
                <div style={{fontSize:11,opacity:0.65,marginTop:4,lineHeight:1.3}}>{m.s}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:'24px 18px',textAlign:'center'}}>
        <Photo slot="art_snake_penguin" fallback="🐍🐧" size="100%" style={{height:140,opacity:0.85}} />
        <div className="serif" style={{fontSize:14,marginTop:14,opacity:0.7,fontStyle:'italic',lineHeight:1.5,maxWidth:300,marginLeft:'auto',marginRight:'auto'}}>
          The earth spent millions of years trying to make something as beautiful as you.
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// FLOATING WANNA BUTTON — appears on every screen except WANNA game
// ═══════════════════════════════════════════════════════════════
function FloatingWanna({ onClick, hide }) {
  if (hide) return null;
  return (
    <button onClick={onClick} className="no-select" style={{
      position:'fixed',bottom:20,right:20,zIndex:40,
      width:64,height:64,borderRadius:'50%',
      background:'linear-gradient(135deg,#FF69B4,#FF2D75)',
      boxShadow:'0 10px 30px rgba(255,45,117,0.45)',
      fontSize:32,
      animation:'pulse 2.5s infinite',
      border:'none',
    }}>🍑</button>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE — orchestrator
// ═══════════════════════════════════════════════════════════════
export default function Page() {
  const [view, setView] = useState('home');
  const [scores, setScores] = useState(()=>lsGet('yams_scores',{}));
  const [vag, setVag] = useState(null);
  const [cluck, setCluck] = useState(null);

  const navigate = useCallback((v) => { setView(v); window.scrollTo(0,0); }, []);
  const back = useCallback(() => navigate('home'), [navigate]);

  const addScore = useCallback((game, demon, python) => {
    setScores(prev => {
      const updated = {
        ...prev,
        [game]: {
          demon: (prev[game]?.demon || 0) + (demon || 0),
          python: (prev[game]?.python || 0) + (python || 0),
        }
      };
      lsSet('yams_scores', updated);
      return updated;
    });
  }, []);

  const fireVaggers = useCallback((message, pic) => {
    setVag({ message: message || pick(VAGGERS), pic: pic || pick(['vaggers_classic','vaggers_googly','vaggers_pucker']) });
  }, []);

  const fireCluck = useCallback((message) => {
    setCluck({ message: message || pick(CLUCK) });
  }, []);

  // Random Cluck Norris pop-in every 3-5 minutes of activity
  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() < 0.3 && view !== 'wanna' && view !== 'date') {
        fireCluck();
      }
    }, 180000);
    return () => clearInterval(t);
  }, [view, fireCluck]);

  let screen;
  switch (view) {
    case 'stories':    screen = <Stories     onBack={back} fireVaggers={fireVaggers} fireCluck={fireCluck} />; break;
    case 'roadtrip':   screen = <RoadTrip    onBack={back} navigate={navigate} />; break;
    case 'match':      screen = <MatchGame   onBack={back} addScore={addScore} fireVaggers={fireVaggers} />; break;
    case 'trivia':     screen = <Trivia      onBack={back} addScore={addScore} fireVaggers={fireVaggers} fireCluck={fireCluck} />; break;
    case 'tot':        screen = <ThisOrThat  onBack={back} addScore={addScore} fireVaggers={fireVaggers} />; break;
    case 'lyric':      screen = <FinishLyric onBack={back} addScore={addScore} fireVaggers={fireVaggers} />; break;
    case 'bcyder':     screen = <BCyder      onBack={back} addScore={addScore} fireVaggers={fireVaggers} fireCluck={fireCluck} />; break;
    case 'photo':      screen = <PhotoChallenge onBack={back} />; break;
    case 'headliner':  screen = <Headliner   onBack={back} fireVaggers={fireVaggers} />; break;
    case 'date':       screen = <DateCard    onBack={back} />; break;
    case 'soundtrack': screen = <Soundtrack  onBack={back} />; break;
    case 'dashboard':  screen = <Dashboard   onBack={back} scores={scores} />; break;
    case 'hof':        screen = <HallOfFame  onBack={back} />; break;
    case 'wanna':      screen = <WannaGame   onBack={back} addScore={addScore} fireVaggers={fireVaggers} fireCluck={fireCluck} />; break;
    case 'remember':   screen = <RememberThis onBack={back} addScore={addScore} fireVaggers={fireVaggers} fireCluck={fireCluck} />; break;
    case 'silent':     screen = (
      <div style={{minHeight:'100vh'}}>
        <Header title="The Silent Game" sub="No phones. No words. 10 minutes." onBack={back} color="#666" />
        <div style={{padding:30,textAlign:'center'}}>
          <div style={{fontSize:60}}>🤫</div>
          <div className="serif" style={{fontSize:26,marginTop:14,fontWeight:600}}>Loser owes one favor.</div>
          <div style={{fontSize:13,opacity:0.6,marginTop:8,maxWidth:280,margin:'8px auto'}}>Set a timer. First to speak loses. Vaggers will keep score with disapproving silence.</div>
        </div>
      </div>
    ); break;
    default:           screen = <Home navigate={navigate} scores={scores} />;
  }

  return (
    <>
      {screen}
      <VaggersPopup message={vag?.message} pic={vag?.pic} onClose={()=>setVag(null)} />
      <CluckPopin message={cluck?.message} onClose={()=>setCluck(null)} />
      <FloatingWanna onClick={()=>navigate('wanna')} hide={view==='wanna' || view==='date'} />
    </>
  );
}
