const { Telegraf, Markup } = require('telegraf');

// Railway automatically injects the BOT_TOKEN from your environment variables
const bot = new Telegraf(process.env.BOT_TOKEN);

// Main Football Menu
const footballKeyboard = () => {
  return Markup.keyboard([
    ['📋 Tactical Playbooks', '📣 Fan Chants'],
    ['🧠 Football Trivia', '❓ Help & Guide']
  ]).resize();
};

// Start Command
bot.start((ctx) => {
  ctx.reply(
    `⚽ Welcome to **PML88**, ${ctx.from.first_name || 'Fan'}!\n\nYour premier football companion is live. Explore deep tactical breakdowns, classic anthems, or test your football IQ right now.`,
    footballKeyboard()
  );
});

// Tactical Playbooks Module
bot.hears('📋 Tactical Playbooks', (ctx) => {
  ctx.reply(
    'Select a tactical blueprint to break down its philosophy:',
    Markup.inlineKeyboard([
      [Markup.button.callback('⚡ Gegenpressing', 'tac_gegen')],
      [Markup.button.callback('🔻 Tiki-Taka', 'tac_tiki')],
      [Markup.button.callback('🚌 Parking the Bus', 'tac_bus')]
    ])
  );
});

// Tactics Callbacks
bot.action('tac_gegen', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(
    '⚡ *Gegenpressing (The Counter-Press)*\n\n' +
    '• **Core Concept:** Win the ball back immediately within 5-7 seconds of losing it.\n' +
    '• **Key Requirements:** Intense physical stamina, high defensive line, and rapid forward transition.\n' +
    '• **Famous Icon:** Jurgen Klopp’s Liverpool and Dortmund eras.'
  );
});

bot.action('tac_tiki', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(
    '🔻 *Tiki-Taka (Possession Control)*\n\n' +
    '• **Core Concept:** Short, fluid passing and constant movement to retain high ball possession.\n' +
    '• **Key Requirements:** Elite technical passing, spatial awareness, and a "false nine" striker.\n' +
    '• **Famous Icon:** Pep Guardiola’s legendary 2008-2012 Barcelona.'
  );
});

bot.action('tac_bus', (ctx) => {
  ctx.answerCbQuery();
  ctx.reply(
    '🚌 *Parking the Bus (Low Block Defensive)*\n\n' +
    '• **Core Concept:** Deep, compact defensive lines absorbing pressure, frustrating the attacker.\n' +
    '• **Key Requirements:** Ultra-disciplined center-backs and relying heavily on solo counter-attacks.\n' +
    '• **Famous Icon:** Classic Jose Mourinho masterclasses in major finals.'
  );
});

// Fan Chants Module
const chants = [
  "📣 *Classic Anthem:*\n\n'Glory, Glory...!'\nAn iconic, rhythmic chant used to boost stadium energy right before kickoff.",
  "📣 *The Twelfth Man Chant:*\n\n'We love you team, we do! Oh, team we love you!'\nSimple, loud, and designed to echo across the stadium rafters.",
  "📣 *The Comeback Chant:*\n\n'We’re gonna win 4-3!'\nSung defiantly by traveling away fans when the team goes down an early goal."
];

bot.hears('📣 Fan Chants', (ctx) => {
  const randomChant = chants[Math.floor(Math.random() * chants.length)];
  ctx.reply(randomChant);
});

// Trivia Module (Local Array)
const triviaQuestions = [
  {
    q: "🧠 *Trivia:* Which club has won the most English top-flight league titles in football history?",
    a: "🏆 *Answer:* Manchester United holds the record with 20 top-flight league titles!"
  },
  {
    q: "🧠 *Trivia:* Who is the all-time top goalscorer in Premier League history?",
    a: "🏆 *Answer:* Alan Shearer dominates the chart with a massive 260 goals!"
  },
  {
    q: "🧠 *Trivia:* Which team went completely undefeated during the 2003-2004 league season?",
    a: "🏆 *Answer:* Arsenal achieved immortality as 'The Invincibles', winning 26 matches and drawing 12."
  }
];

bot.hears('🧠 Football Trivia', (ctx) => {
  const randomTrivia = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
  ctx.reply(randomTrivia.q);
  
  // Send answer with a small delay for suspense
  setTimeout(() => {
    ctx.reply(randomTrivia.a);
  }, 3500);
});

// Help & Info
bot.hears('❓ Help & Guide', (ctx) => {
  ctx.reply(
    'ℹ️ *How to use PML88:*\n\n' +
    '• Tap 📋 *Tactical Playbooks* to study elite coaching mechanics.\n' +
    '• Tap 📣 *Fan Chants* for classic stadium anthems.\n' +
    '• Tap 🧠 *Football Trivia* to quiz your soccer IQ.',
    footballKeyboard()
  );
});

// Fallback logic
bot.on('text', (ctx) => {
  ctx.reply("Please use the stadium menu buttons below to interact with the bot!", footballKeyboard());
});

// Railway Termination Handling
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch().then(() => {
  console.log('⚽ PML88 Football Bot is live on Railway!');
});
