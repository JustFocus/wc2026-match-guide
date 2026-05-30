import { useState, useRef } from "react";

const T = {
  MUST: { l: "MUST WATCH",     c: "#ff5555", bg: "#150404", b: "#7a1a1a", d: "🔴" },
  GOOD: { l: "WORTH WATCHING", c: "#00c37a", bg: "#011509", b: "#005535", d: "🟢" },
  MEH:  { l: "MODERATE",       c: "#f5a623", bg: "#120c01", b: "#6a4510", d: "🟡" },
  SKIP: { l: "SKIP",           c: "#4a6a8a", bg: "#050c15", b: "#152030", d: "⚪" },
};

const G = [
  // ── JUN 11 ──────────────────────────────────────────────────────────────────
  {dt:"Jun 11",tm:"3:00 PM", gr:"A",h:"Mexico",      hf:"🇲🇽",a:"South Africa", af:"🇿🇦",v:"Mexico City, MX",    t:"GOOD",
   note:"Tournament opener at the iconic Estadio Azteca — the only stadium to host three World Cup openers (1970, 1986, 2026). Mexico on home soil with 80,000 roaring fans makes this electric regardless of the matchup. The opening ceremony alone is unmissable."},
  {dt:"Jun 11",tm:"10:00 PM",gr:"A",h:"South Korea", hf:"🇰🇷",a:"Czechia",      af:"🇨🇿",v:"Zapopan, MX",         t:"MEH",
   note:"Two technically disciplined sides with solid European and Asian pedigree. South Korea's attacking quality has grown considerably but this is a late ET kickoff with a moderate ceiling."},

  // ── JUN 12 ──────────────────────────────────────────────────────────────────
  {dt:"Jun 12",tm:"3:00 PM", gr:"B",h:"Canada",      hf:"🇨🇦",a:"Bosnia & Herz.",af:"🇧🇦",v:"Toronto, ON",         t:"MEH",
   note:"Canada's home opener at BMO Field. The crowd will be raucous but Bosnia are a physical European side — organized and stubborn. More atmosphere than star quality, but Canada's home World Cup is a historic moment."},
  {dt:"Jun 12",tm:"9:00 PM", gr:"D",h:"USA",         hf:"🇺🇸",a:"Paraguay",     af:"🇵🇾",v:"Inglewood, CA",        t:"MUST",usa:true,
   note:"🇺🇸 USMNT's opening match on home soil for the first time since 1994. SoFi Stadium will be electric — this is the biggest moment in US Soccer in a generation. Paraguay are physical and organized; don't expect an easy ride."},

  // ── JUN 13 ──────────────────────────────────────────────────────────────────
  {dt:"Jun 13",tm:"3:00 PM", gr:"B",h:"Qatar",       hf:"🇶🇦",a:"Switzerland",  af:"🇨🇭",v:"Santa Clara, CA",      t:"MEH",
   note:"Switzerland are one of Europe's most consistent tournament sides, organized and hard to break down. Qatar are significant underdogs. Worth watching for Swiss structure and discipline, not the contest."},
  {dt:"Jun 13",tm:"6:00 PM", gr:"C",h:"Brazil",      hf:"🇧🇷",a:"Morocco",      af:"🇲🇦",v:"East Rutherford, NJ",  t:"MUST",
   note:"Elite clash. Brazil — five-time World Cup champions — vs. Morocco, who stunned Portugal and Spain en route to the 2022 semifinal. Two of the world's most watchable squads. Unmissable early fixture."},
  {dt:"Jun 13",tm:"9:00 PM", gr:"C",h:"Haiti",       hf:"🇭🇹",a:"Scotland",     af:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",v:"Foxborough, MA",       t:"MEH",
   note:"Scotland are a battling, passionate side that never makes it easy for opponents. Haiti are significant underdogs. Watchable for Scottish grit and atmosphere but not a marquee fixture."},

  // ── JUN 14 ──────────────────────────────────────────────────────────────────
  {dt:"Jun 14",tm:"12:00 AM",gr:"D",h:"Australia",   hf:"🇦🇺",a:"Türkiye",      af:"🇹🇷",v:"Vancouver, BC",        t:"MEH",
   note:"Very late ET kickoff (9 PM Pacific). Australia are athletic and direct; Türkiye are technically gifted and unpredictable. Decent match, but hard to justify the midnight alarm for most viewers."},
  {dt:"Jun 14",tm:"1:00 PM", gr:"E",h:"Germany",     hf:"🇩🇪",a:"Curaçao",      af:"🇨🇼",v:"Houston, TX",          t:"MEH",
   note:"Germany's tournament debut — always a major event. However, Curaçao (pop. ~150,000) are making their first-ever World Cup appearance and are severely outmatched. Tune in for Germany's tactical setup, not the contest."},
  {dt:"Jun 14",tm:"4:00 PM", gr:"F",h:"Netherlands", hf:"🇳🇱",a:"Japan",        af:"🇯🇵",v:"Arlington, TX",        t:"MUST",
   note:"One of the standout Day 4 fixtures. Netherlands are a top-10 side with Van Dijk and a star-studded squad; Japan are disciplined, tactically advanced, and have a history of causing giant-killing upsets. This has real potential."},
  {dt:"Jun 14",tm:"7:00 PM", gr:"E",h:"Ivory Coast", hf:"🇨🇮",a:"Ecuador",      af:"🇪🇨",v:"Philadelphia, PA",     t:"MEH",
   note:"Two competitive mid-tier sides — Ivory Coast have flair and athleticism; Ecuador are organized and physical. Should be competitive but neither team is elite on a global scale."},
  {dt:"Jun 14",tm:"10:00 PM",gr:"F",h:"Sweden",      hf:"🇸🇪",a:"Tunisia",      af:"🇹🇳",v:"Monterrey, MX",        t:"SKIP",
   note:"Late ET kickoff with two mid-to-lower-tier sides. Low priority in a crowded group stage — save the energy."},

  // ── JUN 15 ──────────────────────────────────────────────────────────────────
  {dt:"Jun 15",tm:"12:00 PM",gr:"H",h:"Spain",       hf:"🇪🇸",a:"Cape Verde",   af:"🇨🇻",v:"Atlanta, GA",          t:"GOOD",
   note:"Spain's tournament opener — always worth watching for their technical, possession-based style. Cape Verde are a small-nation story making waves but are outmatched here. A good chance to see one of the world's best sides at full flow."},
  {dt:"Jun 15",tm:"3:00 PM", gr:"G",h:"Belgium",     hf:"🇧🇪",a:"Egypt",        af:"🇪🇬",v:"Seattle, WA",          t:"GOOD",
   note:"Belgium's 'Golden Generation' — De Bruyne, Lukaku — chasing the trophy that has always eluded them. Egypt bring genuine quality and will make Belgium work. A solid tactical battle."},
  {dt:"Jun 15",tm:"6:00 PM", gr:"H",h:"Saudi Arabia",hf:"🇸🇦",a:"Uruguay",      af:"🇺🇾",v:"Miami Gardens, FL",    t:"GOOD",
   note:"Saudi Arabia shocked Argentina in 2022 — one of the great World Cup upsets — and are never to be taken lightly. Uruguay are battle-hardened and dangerous. Genuine upset potential; a fascinating Group H opener."},
  {dt:"Jun 15",tm:"9:00 PM", gr:"G",h:"Iran",        hf:"🇮🇷",a:"New Zealand",  af:"🇳🇿",v:"Inglewood, CA",        t:"SKIP",
   note:"Both teams are at the lower end of Group G's quality spectrum. Hard to make a compelling case for prioritizing this one."},

  // ── JUN 16 ──────────────────────────────────────────────────────────────────
  {dt:"Jun 16",tm:"3:00 PM", gr:"I",h:"France",      hf:"🇫🇷",a:"Senegal",      af:"🇸🇳",v:"East Rutherford, NJ",  t:"MUST",
   note:"Mbappe leads France — 2022 World Cup finalists — against a Senegal side loaded with Premier League stars (Diatta, Sarr, Diedhiou and company). One of the most anticipated first-week fixtures. Don't miss."},
  {dt:"Jun 16",tm:"6:00 PM", gr:"I",h:"Iraq",        hf:"🇮🇶",a:"Norway",       af:"🇳🇴",v:"Foxborough, MA",       t:"GOOD",
   note:"Haaland's World Cup debut. Norway are built around the world's most prolific striker; Iraq will sit deep and defend. Whatever the scoreline, watching Haaland at the World Cup for the first time is a sporting occasion."},
  {dt:"Jun 16",tm:"9:00 PM", gr:"J",h:"Argentina",   hf:"🇦🇷",a:"Algeria",      af:"🇩🇿",v:"Kansas City, MO",      t:"MUST",
   note:"Defending world champions open their campaign. Messi in what may be his final World Cup — every appearance is a landmark. Algeria are a capable African side but this is Argentina's stage."},

  // ── JUN 17 ──────────────────────────────────────────────────────────────────
  {dt:"Jun 17",tm:"12:00 AM",gr:"J",h:"Austria",     hf:"🇦🇹",a:"Jordan",       af:"🇯🇴",v:"Santa Clara, CA",      t:"SKIP",
   note:"Both teams are at the foot of Group J's quality ladder. Midnight ET kickoff makes this a very easy skip."},
  {dt:"Jun 17",tm:"1:00 PM", gr:"K",h:"Portugal",    hf:"🇵🇹",a:"DR Congo",     af:"🇨🇩",v:"Houston, TX",          t:"GOOD",
   note:"Ronaldo leads Portugal in what is widely seen as his final World Cup — every appearance carries enormous legacy weight. DR Congo are competitive but outmatched. Watch for the occasion and the Portuguese attacking quality."},
  {dt:"Jun 17",tm:"4:00 PM", gr:"L",h:"England",     hf:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",a:"Croatia",      af:"🇭🇷",v:"Arlington, TX",        t:"MUST",
   note:"2018 World Cup semifinal rematch — Croatia eliminated England in heartbreaking extra time in Moscow. Both teams are elite and carry massive fanbases. Rich storyline, high quality, enormous stakes. Essential viewing."},
  {dt:"Jun 17",tm:"7:00 PM", gr:"L",h:"Ghana",       hf:"🇬🇭",a:"Panama",       af:"🇵🇦",v:"Toronto, ON",          t:"SKIP",
   note:"Both sides are the weaker end of Group L. Not a priority with better games throughout the schedule."},
  {dt:"Jun 17",tm:"10:00 PM",gr:"K",h:"Uzbekistan",  hf:"🇺🇿",a:"Colombia",     af:"🇨🇴",v:"Mexico City, MX",      t:"MEH",
   note:"Colombia are a talented, dynamic side with serious World Cup potential. Uzbekistan are a debut nation making their first-ever appearance. Late ET is the main deterrent from what should be an entertaining Colombia display."},

  // ── JUN 18 ──────────────────────────────────────────────────────────────────
  {dt:"Jun 18",tm:"12:00 PM",gr:"A",h:"Czechia",     hf:"🇨🇿",a:"South Africa", af:"🇿🇦",v:"Atlanta, GA",          t:"SKIP",
   note:"Two lower-tier sides in Group A, both looking to stay afloat. Neither has the star power or historical cachet to warrant prioritizing over the rest of the schedule."},
  {dt:"Jun 18",tm:"3:00 PM", gr:"B",h:"Switzerland", hf:"🇨🇭",a:"Bosnia & Herz.",af:"🇧🇦",v:"Inglewood, CA",        t:"MEH",
   note:"Switzerland are always well-organized and competitive at major tournaments. A decent watch for tactical European football fans, not a marquee fixture."},
  {dt:"Jun 18",tm:"6:00 PM", gr:"B",h:"Canada",      hf:"🇨🇦",a:"Qatar",        af:"🇶🇦",v:"Vancouver, BC",         t:"MEH",
   note:"Canada on home soil in Vancouver will generate a superb atmosphere. Qatar are the clear underdogs. The crowd will be the best thing about this game."},
  {dt:"Jun 18",tm:"9:00 PM", gr:"A",h:"Mexico",      hf:"🇲🇽",a:"South Korea",  af:"🇰🇷",v:"Zapopan, MX",          t:"GOOD",
   note:"Mexico and South Korea are both technically capable, passionate sides with big fanbases. Should be competitive. The atmosphere in Zapopan — essentially Mexico's home — will be extraordinary."},

  // ── JUN 19 ──────────────────────────────────────────────────────────────────
  {dt:"Jun 19",tm:"3:00 PM", gr:"D",h:"USA",         hf:"🇺🇸",a:"Australia",    af:"🇦🇺",v:"Seattle, WA",          t:"MUST",usa:true,
   note:"🇺🇸 USMNT's second group match. Australia's Socceroos are athletic, direct, and not a soft touch — don't expect a formality. Lumen Field in Seattle will be packed and loud. Essential for US soccer fans."},
  {dt:"Jun 19",tm:"6:00 PM", gr:"C",h:"Scotland",    hf:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",a:"Morocco",      af:"🇲🇦",v:"Foxborough, MA",       t:"GOOD",
   note:"Morocco are one of the tournament's most compelling teams following their 2022 semifinal run. Scotland will press high and fight hard. A genuine test of Morocco's quality and depth."},
  {dt:"Jun 19",tm:"8:30 PM", gr:"C",h:"Brazil",      hf:"🇧🇷",a:"Haiti",        af:"🇭🇹",v:"Philadelphia, PA",     t:"MEH",
   note:"Brazil are always entertaining but Haiti are severely outmatched. Watch to see Brazil's attacking talent at full throttle — the flair and creativity is worth a look even if the contest is one-sided."},
  {dt:"Jun 19",tm:"11:00 PM",gr:"D",h:"Türkiye",     hf:"🇹🇷",a:"Paraguay",     af:"🇵🇾",v:"Santa Clara, CA",      t:"SKIP",
   note:"Very late ET kickoff with two mid-tier Group D sides. Low priority — use this time to rest ahead of more important upcoming fixtures."},

  // ── JUN 20 ──────────────────────────────────────────────────────────────────
  {dt:"Jun 20",tm:"1:00 PM", gr:"F",h:"Netherlands", hf:"🇳🇱",a:"Sweden",       af:"🇸🇪",v:"Houston, TX",          t:"GOOD",
   note:"Netherlands are a top-10 side and a genuine pleasure to watch. Sweden are organized and defensively sound. Should be a well-contested, high-quality afternoon game."},
  {dt:"Jun 20",tm:"4:00 PM", gr:"E",h:"Germany",     hf:"🇩🇪",a:"Ivory Coast",  af:"🇨🇮",v:"Toronto, ON",          t:"MUST",
   note:"One of Group E's premier fixtures. Germany vs. a talented, physically powerful Ivory Coast side with genuine African quality — this is far from a foregone conclusion. Both teams can play beautiful, attacking football."},
  {dt:"Jun 20",tm:"8:00 PM", gr:"E",h:"Ecuador",     hf:"🇪🇨",a:"Curaçao",      af:"🇨🇼",v:"Kansas City, MO",      t:"SKIP",
   note:"Curaçao are a debut nation making World Cup history just by being here. Ecuador are expected to be dominant. Watch if you want to witness a historic first appearance, not a competitive match."},

  // ── JUN 21 ──────────────────────────────────────────────────────────────────
  {dt:"Jun 21",tm:"12:00 AM",gr:"F",h:"Tunisia",     hf:"🇹🇳",a:"Japan",        af:"🇯🇵",v:"Monterrey, MX",        t:"MEH",
   note:"The 1,000th match in FIFA World Cup history. Japan are tactically fascinating and capable of stunning upsets. The historical milestone is compelling, but the midnight ET kickoff is a serious barrier."},
  {dt:"Jun 21",tm:"12:00 PM",gr:"H",h:"Spain",       hf:"🇪🇸",a:"Saudi Arabia", af:"🇸🇦",v:"Atlanta, GA",          t:"MUST",
   note:"Remember 2022? Saudi Arabia pulled off one of the greatest World Cup upsets, beating Argentina. Spain are elite, but Saudi Arabia carry genuine shock potential. Spain are favorites but you cannot look away from this one."},
  {dt:"Jun 21",tm:"3:00 PM", gr:"G",h:"Belgium",     hf:"🇧🇪",a:"Iran",         af:"🇮🇷",v:"Inglewood, CA",        t:"GOOD",
   note:"Belgium's Golden Generation chasing the title that has evaded them for a decade. Iran are disciplined, defensively organized, and will make Belgium work for everything. Should be a compelling tactical contest."},
  {dt:"Jun 21",tm:"6:00 PM", gr:"H",h:"Uruguay",     hf:"🇺🇾",a:"Cape Verde",   af:"🇨🇻",v:"Miami Gardens, FL",    t:"MEH",
   note:"Uruguay are seasoned, physical tournament veterans. Cape Verde are a small-nation story but significantly outmatched in this Group H contest."},
  {dt:"Jun 21",tm:"9:00 PM", gr:"G",h:"New Zealand", hf:"🇳🇿",a:"Egypt",        af:"🇪🇬",v:"Vancouver, BC",        t:"SKIP",
   note:"Both sides are among the weaker teams in Group G. Highlights over live viewing is the recommendation here."},

  // ── JUN 22 ──────────────────────────────────────────────────────────────────
  {dt:"Jun 22",tm:"1:00 PM", gr:"J",h:"Argentina",   hf:"🇦🇷",a:"Austria",      af:"🇦🇹",v:"Arlington, TX",        t:"MUST",
   note:"Defending world champions back in action. Austria are organized and capable, but this is Argentina's stage — watch Messi and company showcase their World Cup pedigree in what may be a final farewell campaign."},
  {dt:"Jun 22",tm:"5:00 PM", gr:"I",h:"France",      hf:"🇫🇷",a:"Iraq",         af:"🇮🇶",v:"Philadelphia, PA",     t:"GOOD",
   note:"France are a joy to watch at full pace. Iraq will sit deep and frustrate, but tune in for the spectacle of French attacking talent — Mbappe, Dembélé — at full throttle. The matchup is lopsided; the football will be entertaining."},
  {dt:"Jun 22",tm:"8:00 PM", gr:"I",h:"Norway",      hf:"🇳🇴",a:"Senegal",      af:"🇸🇳",v:"East Rutherford, NJ",  t:"MUST",
   note:"Haaland vs. a Senegal side brimming with Premier League talent. Both teams are genuine Group I contenders with quality throughout their squads. This has all the ingredients of a classic group stage clash."},
  {dt:"Jun 22",tm:"11:00 PM",gr:"J",h:"Jordan",      hf:"🇯🇴",a:"Algeria",      af:"🇩🇿",v:"Santa Clara, CA",      t:"SKIP",
   note:"Both teams are in the lower tier of Group J. The late ET kickoff makes this an easy skip."},

  // ── JUN 23 ──────────────────────────────────────────────────────────────────
  {dt:"Jun 23",tm:"1:00 PM", gr:"K",h:"Portugal",    hf:"🇵🇹",a:"Uzbekistan",   af:"🇺🇿",v:"Houston, TX",          t:"MEH",
   note:"Ronaldo leads Portugal in what is widely expected to be his final World Cup, but Uzbekistan are a debut nation and a significant mismatch. Tune in for the Portugal quality and the Ronaldo narrative, not the contest."},
  {dt:"Jun 23",tm:"4:00 PM", gr:"L",h:"England",     hf:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",a:"Ghana",        af:"🇬🇭",v:"Foxborough, MA",       t:"GOOD",
   note:"England are loaded with Premier League talent from the elite clubs. Ghana bring pace, intensity, and tournament experience. England should be strong but Ghana will push them — a solid mid-tournament fixture."},
  {dt:"Jun 23",tm:"7:00 PM", gr:"L",h:"Panama",      hf:"🇵🇦",a:"Croatia",      af:"🇭🇷",v:"Toronto, ON",          t:"GOOD",
   note:"Croatia are tournament perennials — 2018 finalists, 2022 third place — with a tactical brilliance and resilience that makes them fascinating to watch. Modric pulling strings in midfield is always worth your time."},
  {dt:"Jun 23",tm:"10:00 PM",gr:"K",h:"Colombia",    hf:"🇨🇴",a:"DR Congo",     af:"🇨🇩",v:"Zapopan, MX",          t:"MEH",
   note:"Colombia are a vibrant, attacking side with serious talent and World Cup ambitions. DR Congo are the underdogs. Late ET is the main deterrent — the Colombia display should be entertaining if you can stay up."},

  // ── JUN 24 — Final Group Matchday: Groups A, B, C ────────────────────────
  {dt:"Jun 24",fd:true,tm:"3:00 PM", gr:"B",h:"Switzerland", hf:"🇨🇭",a:"Canada",      af:"🇨🇦",v:"Vancouver, BC",     t:"GOOD",
   note:"Final Group B matchday — both Group B games kick off simultaneously. Switzerland are one of Europe's most reliable tournament sides. Canada at home with everything on the line. Should be tightly competitive."},
  {dt:"Jun 24",fd:true,tm:"3:00 PM", gr:"B",h:"Bosnia & Herz.",hf:"🇧🇦",a:"Qatar",       af:"🇶🇦",v:"Seattle, WA",       t:"SKIP",
   note:"The parallel Group B game. Watch Switzerland vs. Canada in this slot — stronger teams, more compelling storyline."},
  {dt:"Jun 24",fd:true,tm:"6:00 PM", gr:"C",h:"Scotland",    hf:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",a:"Brazil",      af:"🇧🇷",v:"Miami Gardens, FL", t:"MUST",
   note:"Final Group C matchday. Brazil closing out the group stage — always a spectacle. Scotland will press and fight, making this far from a formality. High energy, high quality on a decisive day."},
  {dt:"Jun 24",fd:true,tm:"6:00 PM", gr:"C",h:"Morocco",     hf:"🇲🇦",a:"Haiti",        af:"🇭🇹",v:"Atlanta, GA",       t:"MEH",
   note:"Morocco will handle business but the Group C drama is happening next door. Watch Scotland vs. Brazil in this slot instead."},
  {dt:"Jun 24",fd:true,tm:"9:00 PM", gr:"A",h:"Czechia",     hf:"🇨🇿",a:"Mexico",      af:"🇲🇽",v:"Mexico City, MX",   t:"MUST",
   note:"Final Group A matchday. Mexico at the Estadio Azteca with group stage stakes on the line — the atmosphere will be extraordinary. One of the tournament's great home-crowd moments regardless of the circumstances."},
  {dt:"Jun 24",fd:true,tm:"9:00 PM", gr:"A",h:"South Africa",hf:"🇿🇦",a:"South Korea", af:"🇰🇷",v:"Monterrey, MX",     t:"MEH",
   note:"The parallel Group A game. South Korea are technically interesting but Mexico vs. Czechia next door commands the attention."},

  // ── JUN 25 — Final Group Matchday: Groups D, E, F ────────────────────────
  {dt:"Jun 25",fd:true,tm:"4:00 PM", gr:"E",h:"Curaçao",     hf:"🇨🇼",a:"Ivory Coast", af:"🇨🇮",v:"Philadelphia, PA", t:"SKIP",
   note:"Watch Ecuador vs. Germany in this slot. Curaçao are significant underdogs and the Group E drama will be happening across town."},
  {dt:"Jun 25",fd:true,tm:"4:00 PM", gr:"E",h:"Ecuador",     hf:"🇪🇨",a:"Germany",     af:"🇩🇪",v:"East Rutherford, NJ",t:"MUST",
   note:"Final Group E showdown. Germany are tournament-level elite; Ecuador are a physical, well-organized side that won't be pushed around. High-stakes, high-quality — one of the day's marquee fixtures."},
  {dt:"Jun 25",fd:true,tm:"7:00 PM", gr:"F",h:"Japan",       hf:"🇯🇵",a:"Sweden",      af:"🇸🇪",v:"Arlington, TX",     t:"MEH",
   note:"Final Group F matchday. Japan are always tactically fascinating and capable of surprises. A decent parallel game to have on."},
  {dt:"Jun 25",fd:true,tm:"7:00 PM", gr:"F",h:"Tunisia",     hf:"🇹🇳",a:"Netherlands", af:"🇳🇱",v:"Kansas City, MO",   t:"GOOD",
   note:"Netherlands closing out the group — consistently top-tier, always worth watching. Van Dijk's defensive command and Dutch attacking flair will be on full display."},
  {dt:"Jun 25",fd:true,tm:"10:00 PM",gr:"D",h:"Türkiye",     hf:"🇹🇷",a:"USA",         af:"🇺🇸",v:"Inglewood, CA",     t:"MUST",usa:true,
   note:"🇺🇸 USA's decisive final group game. Türkiye are dangerous, unpredictable, and technically gifted — a genuine gauntlet for the USMNT. Group D's fate is decided here. Do not miss."},
  {dt:"Jun 25",fd:true,tm:"10:00 PM",gr:"D",h:"Paraguay",    hf:"🇵🇾",a:"Australia",   af:"🇦🇺",v:"Santa Clara, CA",   t:"SKIP",
   note:"Watch Türkiye vs. USA in this slot. The USA game will decide Group D's outcome."},

  // ── JUN 26 — Final Group Matchday: Groups G, H, I ────────────────────────
  {dt:"Jun 26",fd:true,tm:"3:00 PM", gr:"I",h:"Norway",      hf:"🇳🇴",a:"France",      af:"🇫🇷",v:"Foxborough, MA",    t:"MUST",
   note:"🔥 Haaland vs. France — potentially one of the great group stage encounters. Norway are dangerous and could pull off something special. France are tournament-level elite. One of the standout final-matchday clashes on the entire schedule."},
  {dt:"Jun 26",fd:true,tm:"3:00 PM", gr:"I",h:"Senegal",     hf:"🇸🇳",a:"Iraq",        af:"🇮🇶",v:"Toronto, ON",       t:"SKIP",
   note:"Watch Norway vs. France in this slot. Clear choice — the companion game here cannot compete for attention."},
  {dt:"Jun 26",fd:true,tm:"8:00 PM", gr:"H",h:"Cape Verde",  hf:"🇨🇻",a:"Saudi Arabia",af:"🇸🇦",v:"Houston, TX",       t:"SKIP",
   note:"Watch Uruguay vs. Spain in this slot. Neither team here can match that game's quality, prestige, or drama potential."},
  {dt:"Jun 26",fd:true,tm:"8:00 PM", gr:"H",h:"Uruguay",     hf:"🇺🇾",a:"Spain",       af:"🇪🇸",v:"Zapopan, MX",       t:"MUST",
   note:"🔥 Two World Cup winners. Spain's intricate possession game vs. Uruguay's physicality, cunning, and battle-hardened experience. One of the premier fixtures of the entire group stage — don't look away."},
  {dt:"Jun 26",fd:true,tm:"11:00 PM",gr:"G",h:"Egypt",       hf:"🇪🇬",a:"Iran",        af:"🇮🇷",v:"Seattle, WA",       t:"SKIP",
   note:"Very late ET kickoff with two lower-tier sides. Clear skip — save the energy for tomorrow's final group matchday."},
  {dt:"Jun 26",fd:true,tm:"11:00 PM",gr:"G",h:"New Zealand", hf:"🇳🇿",a:"Belgium",     af:"🇧🇪",v:"Vancouver, BC",     t:"MEH",
   note:"Belgium are genuinely top-tier but New Zealand are significant underdogs. Very late kickoff is the main barrier — catch the highlights if Belgium put on a show."},

  // ── JUN 27 — Final Group Matchday: Groups J, K, L ────────────────────────
  {dt:"Jun 27",fd:true,tm:"5:00 PM", gr:"L",h:"Panama",      hf:"🇵🇦",a:"England",     af:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",v:"East Rutherford, NJ",t:"GOOD",
   note:"England are one of the tournament favorites closing out the group stage. Panama are massive underdogs but England fans travel in enormous numbers — the NJ crowd atmosphere will be something special."},
  {dt:"Jun 27",fd:true,tm:"5:00 PM", gr:"L",h:"Croatia",     hf:"🇭🇷",a:"Ghana",       af:"🇬🇭",v:"Philadelphia, PA", t:"GOOD",
   note:"Croatia are tactically brilliant and always fascinating to watch — 2018 finalists, 2022 third place. Modric, Gvardiol, Kovacic. They elevate their game at tournaments. Worth watching alongside the England match for the full Group L picture."},
  {dt:"Jun 27",fd:true,tm:"7:30 PM", gr:"K",h:"Colombia",    hf:"🇨🇴",a:"Portugal",    af:"🇵🇹",v:"Miami Gardens, FL", t:"MUST",
   note:"🔥 Ronaldo's likely final World Cup chapter continues. Colombia are dynamic, attack-minded, and one of the tournament's most exciting sides. Premier Group K fixture — a standout game of the final group weekend."},
  {dt:"Jun 27",fd:true,tm:"7:30 PM", gr:"K",h:"DR Congo",    hf:"🇨🇩",a:"Uzbekistan",  af:"🇺🇿",v:"Atlanta, GA",      t:"SKIP",
   note:"Watch Colombia vs. Portugal in this slot. Both teams here lack the star power or storyline to compete for your attention on this final group weekend."},
  {dt:"Jun 27",fd:true,tm:"10:00 PM",gr:"J",h:"Algeria",     hf:"🇩🇿",a:"Austria",     af:"🇦🇹",v:"Kansas City, MO",  t:"SKIP",
   note:"Watch Jordan vs. Argentina in this slot. Algeria and Austria are mid-tier at best and are outclassed by the companion game in terms of star power and stakes."},
  {dt:"Jun 27",fd:true,tm:"10:00 PM",gr:"J",h:"Jordan",      hf:"🇯🇴",a:"Argentina",   af:"🇦🇷",v:"Arlington, TX",    t:"MUST",
   note:"Defending world champions close the group stage. Messi and Argentina are always unmissable — they carry the weight of champions and the drama that comes with it. The perfect, fitting end to the 2026 group stage."},
];

const DATES = [...new Set(G.map(g => g.dt))];

const FILTER_OPTS = [
  {k:"ALL",  l:"All"},
  {k:"MUST", l:"🔴 Must"},
  {k:"GOOD", l:"🟢 Good"},
  {k:"MEH",  l:"🟡 Moderate"},
  {k:"SKIP", l:"⚪ Skip"},
];

export default function App() {
  const [date, setDate] = useState("Jun 11");
  const [filter, setFilter] = useState("ALL");

  const dayG = G.filter(g => g.dt === date);
  const shown = filter === "ALL" ? dayG : dayG.filter(g => g.t === filter);
  const isFD = dayG.some(g => g.fd);
  const counts = {
    MUST: dayG.filter(g => g.t==="MUST").length,
    GOOD: dayG.filter(g => g.t==="GOOD").length,
    MEH:  dayG.filter(g => g.t==="MEH").length,
    SKIP: dayG.filter(g => g.t==="SKIP").length,
  };
  const totalMust = G.filter(g=>g.t==="MUST").length;
  const usaGames = G.filter(g=>g.usa);

  return (
    <div style={{
      minHeight:"100vh", background:"#030b15",
      fontFamily:"'Palatino Linotype', Georgia, serif",
      color:"#d0e8ff",
    }}>
      {/* ─── HEADER ─────────────────────────────────────────── */}
      <div style={{
        background:"linear-gradient(160deg,#010e1e 0%,#011828 100%)",
        borderBottom:"2px solid #00904f",
        padding:"18px 16px 14px",
        position:"sticky", top:0, zIndex:10,
      }}>
        <div style={{maxWidth:840,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10,flexWrap:"wrap"}}>
            <div>
              <div style={{fontSize:9,letterSpacing:"0.3em",color:"#00904f",fontFamily:"monospace",marginBottom:4,textTransform:"uppercase"}}>
                ⚽ FIFA World Cup 2026 · Full Group Stage · Jun 11–27
              </div>
              <div style={{fontSize:"clamp(16px,4vw,26px)",fontWeight:"bold",letterSpacing:"-0.01em",lineHeight:1.1}}>
                What to Watch &amp; What to Skip
              </div>
            </div>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"}}>
              {Object.entries(T).map(([k,v])=>(
                <div key={k} style={{
                  display:"flex",alignItems:"center",gap:3,
                  background:v.bg,border:`1px solid ${v.b}`,
                  borderRadius:20,padding:"2px 7px",
                  fontSize:9,color:v.c,fontFamily:"monospace",
                }}>
                  {v.d} {v.l}
                </div>
              ))}
            </div>
          </div>

          {/* Date Tab Strip */}
          <div style={{
            display:"flex",gap:3,overflowX:"auto",paddingTop:10,paddingBottom:2,
            scrollbarWidth:"none",
          }}>
            {DATES.map(d=>{
              const dg=G.filter(g=>g.dt===d);
              const hasUSA=dg.some(g=>g.usa);
              const hasMust=dg.some(g=>g.t==="MUST");
              const isFinal=dg.some(g=>g.fd);
              const on=date===d;
              return (
                <button key={d} onClick={()=>setDate(d)} style={{
                  flexShrink:0,
                  background:on?"#001a30":"#05101c",
                  border:`2px solid ${on?(hasUSA?"#cc2222":hasMust?"#00904f":isFinal?"#c08020":"#1a3050"):"#0a1828"}`,
                  borderRadius:7,padding:"4px 9px",cursor:"pointer",
                  color:on?"#d0e8ff":"#2a5070",
                  fontSize:10,fontFamily:"monospace",
                  transition:"all 0.12s",
                  display:"flex",flexDirection:"column",alignItems:"center",gap:1,
                  boxShadow:on?"0 0 8px rgba(0,144,79,0.2)":"none",
                }}>
                  <span style={{fontWeight:"bold"}}>{d}</span>
                  <span style={{fontSize:8,color:hasUSA?"#ee5555":hasMust?"#00904f":isFinal?"#c08020":"#1a4060"}}>
                    {hasUSA?"🇺🇸 USA":hasMust?"★ must":isFinal?"⚡ final":dg.length+" games"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── BODY ────────────────────────────────────────────── */}
      <div style={{maxWidth:840,margin:"0 auto",padding:"12px 14px 40px"}}>

        {/* Day meta + filter row */}
        <div style={{
          display:"flex",flexWrap:"wrap",gap:8,alignItems:"center",
          marginBottom:10,
        }}>
          {/* Stats */}
          <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center",flex:1}}>
            {counts.MUST>0 && <span style={{fontSize:11,color:T.MUST.c,fontFamily:"monospace"}}>{T.MUST.d} {counts.MUST}</span>}
            {counts.GOOD>0 && <span style={{fontSize:11,color:T.GOOD.c,fontFamily:"monospace"}}>{T.GOOD.d} {counts.GOOD}</span>}
            {counts.MEH>0  && <span style={{fontSize:11,color:T.MEH.c, fontFamily:"monospace"}}>{T.MEH.d} {counts.MEH}</span>}
            {counts.SKIP>0 && <span style={{fontSize:11,color:T.SKIP.c,fontFamily:"monospace"}}>{T.SKIP.d} {counts.SKIP}</span>}
            {isFD && (
              <span style={{
                fontSize:9,background:"#14090000",border:"1px solid #6a4010",
                color:"#c08020",borderRadius:4,padding:"1px 6px",fontFamily:"monospace",
              }}>⚡ FINAL GROUP MATCHDAY · concurrent kickoffs</span>
            )}
          </div>
          {/* Filters */}
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            {FILTER_OPTS.map(f=>{
              const active=filter===f.k;
              const tier=T[f.k];
              return (
                <button key={f.k} onClick={()=>setFilter(f.k)} style={{
                  background:active?(tier?tier.bg:"#0a1828"):"#050e18",
                  border:`1px solid ${active?(tier?tier.b:"#2a4a6a"):"#0a1828"}`,
                  borderRadius:20,padding:"2px 9px",cursor:"pointer",
                  color:active?(tier?tier.c:"#d0e8ff"):"#2a5070",
                  fontSize:10,fontFamily:"monospace",transition:"all 0.12s",
                }}>
                  {f.l}
                </button>
              );
            })}
          </div>
        </div>

        {/* Game Cards */}
        <div style={{display:"flex",flexDirection:"column",gap:7}}>
          {shown.length===0 && (
            <div style={{color:"#1a4060",fontSize:13,padding:"24px 0",textAlign:"center",fontFamily:"monospace"}}>
              No {filter.toLowerCase()} games on {date}
            </div>
          )}
          {shown.map((g,i)=>{
            const tier=T[g.t];
            return (
              <div key={i} style={{
                background:tier.bg,
                border:`1.5px solid ${tier.b}`,
                borderRadius:10,padding:"10px 12px",
              }}>
                <div style={{display:"flex",alignItems:"center",gap:7,flexWrap:"wrap",marginBottom:5}}>
                  <div style={{
                    background:tier.c+"1a",border:`1px solid ${tier.b}`,
                    borderRadius:4,padding:"1px 6px",
                    fontSize:9,fontWeight:"bold",color:tier.c,
                    fontFamily:"monospace",letterSpacing:"0.1em",whiteSpace:"nowrap",
                  }}>
                    {tier.d} {tier.l}
                  </div>
                  <span style={{fontSize:10,color:"#1a4060",fontFamily:"monospace"}}>{g.tm} ET</span>
                  <span style={{fontSize:9,color:"#102030",marginLeft:"auto",textAlign:"right"}}>
                    Group {g.gr} · {g.v}
                  </span>
                </div>
                <div style={{display:"flex",alignItems:"center",gap:7,fontSize:"clamp(13px,2.8vw,17px)",fontWeight:"bold",marginBottom:4,flexWrap:"wrap"}}>
                  <span>{g.hf}</span><span>{g.h}</span>
                  <span style={{fontSize:9,color:"#102030",fontWeight:"normal"}}>vs</span>
                  <span>{g.a}</span><span>{g.af}</span>
                  {g.usa && (
                    <span style={{
                      fontSize:8,background:"#140303",border:"1px solid #882020",
                      color:"#ff7070",borderRadius:4,padding:"1px 6px",fontFamily:"monospace",whiteSpace:"nowrap",
                    }}>🇺🇸 USA GAME</span>
                  )}
                </div>
                <div style={{fontSize:11,color:"#3a6880",lineHeight:1.55}}>{g.note}</div>
              </div>
            );
          })}
        </div>

        {/* Bottom summary */}
        <div style={{
          marginTop:24,background:"#010e1e",border:"1px solid #0a2030",
          borderRadius:10,padding:"14px 14px",
        }}>
          <div style={{fontSize:10,color:"#00904f",fontFamily:"monospace",letterSpacing:"0.15em",marginBottom:10}}>
            🇺🇸 USA GAMES — DO NOT MISS
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {usaGames.map((g,i)=>(
              <div key={i} onClick={()=>{setDate(g.dt);setFilter("ALL");}} style={{
                display:"flex",alignItems:"center",gap:8,
                background:"#08121e",border:"1px solid #1a2a3a",
                borderRadius:7,padding:"7px 10px",cursor:"pointer",
                transition:"border-color 0.12s",
              }}
                onMouseEnter={e=>e.currentTarget.style.borderColor="#cc2222"}
                onMouseLeave={e=>e.currentTarget.style.borderColor="#1a2a3a"}
              >
                <span style={{fontSize:10,color:"#cc2222",fontFamily:"monospace",whiteSpace:"nowrap"}}>{g.dt} · {g.tm} ET</span>
                <span style={{fontSize:13,fontWeight:"bold"}}>{g.hf} {g.h} vs {g.a} {g.af}</span>
              </div>
            ))}
          </div>
          <div style={{
            marginTop:12,fontSize:10,color:"#0a3050",fontFamily:"monospace",
            borderTop:"1px solid #0a1828",paddingTop:10,
          }}>
            {totalMust} MUST WATCH games across the group stage · Jun 11–27, 2026
          </div>
        </div>
      </div>
    </div>
  );
}
