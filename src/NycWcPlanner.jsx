import { useState } from "react";

const T = {
  MUST: { l: "MUST WATCH",     c: "#ff5555", bg: "#1a0404", b: "#882020", d: "🔴" },
  GOOD: { l: "WORTH WATCHING", c: "#00c87a", bg: "#011a0a", b: "#006640", d: "🟢" },
  MEH:  { l: "MODERATE",       c: "#f5a623", bg: "#160d00", b: "#7a4f10", d: "🟡" },
  SKIP: { l: "SKIP",           c: "#5a7a9a", bg: "#06101a", b: "#1a2e40", d: "⚪" },
};

const G = [
  {dt:"Jun 11",tm:"3:00 PM", gr:"A",h:"Mexico",      hf:"🇲🇽",a:"South Africa", af:"🇿🇦",v:"Mexico City, MX",    t:"GOOD",
   note:"Tournament opener at the iconic Estadio Azteca — the only stadium to host three World Cup openers (1970, 1986, 2026). Mexico on home soil with 80,000 roaring fans makes this electric regardless of the matchup."},
  {dt:"Jun 11",tm:"10:00 PM",gr:"A",h:"South Korea", hf:"🇰🇷",a:"Czechia",      af:"🇨🇿",v:"Zapopan, MX",        t:"MEH",
   note:"Two technically disciplined sides. South Korea's attacking quality has grown but this is a late kickoff with a moderate ceiling."},
  {dt:"Jun 12",tm:"3:00 PM", gr:"B",h:"Canada",      hf:"🇨🇦",a:"Bosnia & Herz.",af:"🇧🇦",v:"Toronto, ON",        t:"MEH",
   note:"Canada's home opener at BMO Field. The crowd will be raucous but Bosnia are physical and organized — more atmosphere than star quality."},
  {dt:"Jun 12",tm:"9:00 PM", gr:"D",h:"USA",         hf:"🇺🇸",a:"Paraguay",     af:"🇵🇾",v:"Inglewood, CA",       t:"MUST",usa:true,
   note:"🇺🇸 USMNT's opening match on home soil for the first time since 1994. SoFi Stadium will be electric — the biggest moment in US Soccer in a generation. Paraguay are physical and organized; don't expect an easy ride."},
  {dt:"Jun 13",tm:"3:00 PM", gr:"B",h:"Qatar",       hf:"🇶🇦",a:"Switzerland",  af:"🇨🇭",v:"Santa Clara, CA",    t:"MEH",
   note:"Switzerland are one of Europe's most consistent tournament sides. Qatar are significant underdogs. Worth watching for Swiss structure and discipline, not the contest."},
  {dt:"Jun 13",tm:"6:00 PM", gr:"C",h:"Brazil",      hf:"🇧🇷",a:"Morocco",      af:"🇲🇦",v:"East Rutherford, NJ",t:"MUST",
   note:"Elite clash. Brazil — five-time World Cup champions — vs. Morocco, who stunned Portugal and Spain en route to the 2022 semifinal. Two of the world's most watchable squads."},
  {dt:"Jun 13",tm:"9:00 PM", gr:"C",h:"Haiti",       hf:"🇭🇹",a:"Scotland",     af:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",v:"Foxborough, MA",      t:"MEH",
   note:"Scotland are a battling, passionate side that never makes it easy. Haiti are significant underdogs. Watchable for grit and atmosphere."},
  {dt:"Jun 14",tm:"12:00 AM",gr:"D",h:"Australia",   hf:"🇦🇺",a:"Türkiye",      af:"🇹🇷",v:"Vancouver, BC",       t:"MEH",
   note:"Very late ET kickoff. Australia are athletic and direct; Türkiye are technically gifted and unpredictable. Decent match, but hard to justify a midnight alarm."},
  {dt:"Jun 14",tm:"1:00 PM", gr:"E",h:"Germany",     hf:"🇩🇪",a:"Curaçao",      af:"🇨🇼",v:"Houston, TX",         t:"MEH",
   note:"Germany's tournament debut — always a major event. However, Curaçao (pop. ~150k) are making their first-ever World Cup appearance and are severely outmatched. Watch for Germany's tactical setup, not the scoreline."},
  {dt:"Jun 14",tm:"4:00 PM", gr:"F",h:"Netherlands", hf:"🇳🇱",a:"Japan",        af:"🇯🇵",v:"Arlington, TX",       t:"MUST",
   note:"One of the standout early fixtures. Netherlands are a top-10 side; Japan are disciplined, tactically advanced, and have a history of giant-killing upsets. Has real potential for a classic."},
  {dt:"Jun 14",tm:"7:00 PM", gr:"E",h:"Ivory Coast", hf:"🇨🇮",a:"Ecuador",      af:"🇪🇨",v:"Philadelphia, PA",    t:"MEH",
   note:"Two competitive mid-tier sides. Ivory Coast have flair and athleticism; Ecuador are organized and physical. Competitive but neither is elite."},
  {dt:"Jun 14",tm:"10:00 PM",gr:"F",h:"Sweden",      hf:"🇸🇪",a:"Tunisia",      af:"🇹🇳",v:"Monterrey, MX",       t:"SKIP",
   note:"Late ET kickoff with two mid-to-lower-tier sides. Low priority in a crowded schedule."},
  {dt:"Jun 15",tm:"12:00 PM",gr:"H",h:"Spain",       hf:"🇪🇸",a:"Cape Verde",   af:"🇨🇻",v:"Atlanta, GA",         t:"GOOD",
   note:"Spain's tournament opener — always worth watching for their technical, possession-based style. Cape Verde are outmatched but Spain in full flow is a spectacle."},
  {dt:"Jun 15",tm:"3:00 PM", gr:"G",h:"Belgium",     hf:"🇧🇪",a:"Egypt",        af:"🇪🇬",v:"Seattle, WA",         t:"GOOD",
   note:"Belgium's Golden Generation — De Bruyne, Lukaku — chasing the trophy that has always eluded them. Egypt bring genuine quality and will make Belgium work."},
  {dt:"Jun 15",tm:"6:00 PM", gr:"H",h:"Saudi Arabia",hf:"🇸🇦",a:"Uruguay",      af:"🇺🇾",v:"Miami Gardens, FL",   t:"GOOD",
   note:"Saudi Arabia shocked Argentina in 2022 and are never to be underestimated. Uruguay are battle-hardened and dangerous. Genuine upset potential — a fascinating Group H opener."},
  {dt:"Jun 15",tm:"9:00 PM", gr:"G",h:"Iran",        hf:"🇮🇷",a:"New Zealand",  af:"🇳🇿",v:"Inglewood, CA",       t:"SKIP",
   note:"Both teams at the lower end of Group G's quality spectrum. Hard to make a compelling case for this one."},
  {dt:"Jun 16",tm:"3:00 PM", gr:"I",h:"France",      hf:"🇫🇷",a:"Senegal",      af:"🇸🇳",v:"East Rutherford, NJ",t:"MUST",
   note:"Mbappe leads France — 2022 World Cup finalists — against a Senegal side loaded with Premier League stars. One of the most anticipated first-week fixtures."},
  {dt:"Jun 16",tm:"6:00 PM", gr:"I",h:"Iraq",        hf:"🇮🇶",a:"Norway",       af:"🇳🇴",v:"Foxborough, MA",      t:"GOOD",
   note:"Haaland's World Cup debut. Norway are built around the world's most prolific striker; Iraq will sit deep. Whatever the scoreline, watching Haaland on this stage for the first time is an occasion in itself."},
  {dt:"Jun 16",tm:"9:00 PM", gr:"J",h:"Argentina",   hf:"🇦🇷",a:"Algeria",      af:"🇩🇿",v:"Kansas City, MO",     t:"MUST",
   note:"Defending world champions open their campaign. Messi in what may be his final World Cup — every appearance is a landmark. Algeria are capable but this is Argentina's stage."},
  {dt:"Jun 17",tm:"12:00 AM",gr:"J",h:"Austria",     hf:"🇦🇹",a:"Jordan",       af:"🇯🇴",v:"Santa Clara, CA",     t:"SKIP",
   note:"Both teams at the lower end of Group J. Midnight ET kickoff makes this a very easy skip."},
  {dt:"Jun 17",tm:"1:00 PM", gr:"K",h:"Portugal",    hf:"🇵🇹",a:"DR Congo",     af:"🇨🇩",v:"Houston, TX",         t:"GOOD",
   note:"Ronaldo leads Portugal in what is widely seen as his final World Cup — every appearance carries legacy weight. DR Congo are outmatched but the Portuguese quality and occasion are worth watching."},
  {dt:"Jun 17",tm:"4:00 PM", gr:"L",h:"England",     hf:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",a:"Croatia",      af:"🇭🇷",v:"Arlington, TX",       t:"MUST",
   note:"2018 World Cup semifinal rematch — Croatia eliminated England in heartbreaking extra time in Moscow. Both teams are elite, rich with storyline, and carry enormous fanbases. Essential viewing."},
  {dt:"Jun 17",tm:"7:00 PM", gr:"L",h:"Ghana",       hf:"🇬🇭",a:"Panama",       af:"🇵🇦",v:"Toronto, ON",         t:"SKIP",
   note:"Both sides are the weaker end of Group L. Not a priority with better games throughout the schedule."},
  {dt:"Jun 17",tm:"10:00 PM",gr:"K",h:"Uzbekistan",  hf:"🇺🇿",a:"Colombia",     af:"🇨🇴",v:"Mexico City, MX",     t:"MEH",
   note:"Colombia are a talented, dynamic side with serious World Cup potential. Uzbekistan are a debut nation. Late ET is the main deterrent from an entertaining Colombia display."},
  {dt:"Jun 18",tm:"12:00 PM",gr:"A",h:"Czechia",     hf:"🇨🇿",a:"South Africa", af:"🇿🇦",v:"Atlanta, GA",         t:"SKIP",
   note:"Two lower-tier Group A sides. Neither has the star power or historical cachet to warrant prioritizing."},
  {dt:"Jun 18",tm:"3:00 PM", gr:"B",h:"Switzerland", hf:"🇨🇭",a:"Bosnia & Herz.",af:"🇧🇦",v:"Inglewood, CA",       t:"MEH",
   note:"Switzerland are always well-organized and competitive at major tournaments. Decent for fans of tactical European football."},
  {dt:"Jun 18",tm:"6:00 PM", gr:"B",h:"Canada",      hf:"🇨🇦",a:"Qatar",        af:"🇶🇦",v:"Vancouver, BC",        t:"MEH",
   note:"Canada on home soil in Vancouver will generate a superb atmosphere. Qatar are clear underdogs — the crowd will be the best thing about this game."},
  {dt:"Jun 18",tm:"9:00 PM", gr:"A",h:"Mexico",      hf:"🇲🇽",a:"South Korea",  af:"🇰🇷",v:"Zapopan, MX",         t:"GOOD",
   note:"Two technically capable, passionate sides with big fanbases. Should be competitive. The atmosphere in Zapopan — effectively Mexico's home — will be extraordinary."},
  {dt:"Jun 19",tm:"3:00 PM", gr:"D",h:"USA",         hf:"🇺🇸",a:"Australia",    af:"🇦🇺",v:"Seattle, WA",         t:"MUST",usa:true,
   note:"🇺🇸 USMNT's second group match. Australia's Socceroos are athletic, direct, and not a soft touch. Lumen Field in Seattle will be packed and loud. Essential for US fans."},
  {dt:"Jun 19",tm:"6:00 PM", gr:"C",h:"Scotland",    hf:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",a:"Morocco",      af:"🇲🇦",v:"Foxborough, MA",      t:"GOOD",
   note:"Morocco are one of the tournament's most compelling teams following their 2022 semifinal run. Scotland will press high and fight. A genuine test of Morocco's quality and depth."},
  {dt:"Jun 19",tm:"8:30 PM", gr:"C",h:"Brazil",      hf:"🇧🇷",a:"Haiti",        af:"🇭🇹",v:"Philadelphia, PA",    t:"MEH",
   note:"Brazil are always entertaining but Haiti are severely outmatched. Worth watching to see Brazil's attacking talent at full throttle — expect flair even if the contest is one-sided."},
  {dt:"Jun 19",tm:"11:00 PM",gr:"D",h:"Türkiye",     hf:"🇹🇷",a:"Paraguay",     af:"🇵🇾",v:"Santa Clara, CA",     t:"SKIP",
   note:"Very late ET kickoff with two mid-tier Group D sides. Low priority — rest ahead of more important upcoming fixtures."},
  {dt:"Jun 20",tm:"1:00 PM", gr:"F",h:"Netherlands", hf:"🇳🇱",a:"Sweden",       af:"🇸🇪",v:"Houston, TX",         t:"GOOD",
   note:"Netherlands are top-10 quality and a genuine pleasure to watch. Sweden are organized and dangerous. A well-contested, high-quality afternoon game."},
  {dt:"Jun 20",tm:"4:00 PM", gr:"E",h:"Germany",     hf:"🇩🇪",a:"Ivory Coast",  af:"🇨🇮",v:"Toronto, ON",         t:"MUST",
   note:"One of Group E's premier fixtures. Germany vs. a talented, physically powerful Ivory Coast side — this is far from a foregone conclusion. Both teams play beautiful, attacking football."},
  {dt:"Jun 20",tm:"8:00 PM", gr:"E",h:"Ecuador",     hf:"🇪🇨",a:"Curaçao",      af:"🇨🇼",v:"Kansas City, MO",     t:"SKIP",
   note:"Curaçao are a debut nation making World Cup history just by being here, but the matchup is severely lopsided. Watch if you want a historic debut, not a competitive game."},
  {dt:"Jun 21",tm:"12:00 AM",gr:"F",h:"Tunisia",     hf:"🇹🇳",a:"Japan",        af:"🇯🇵",v:"Monterrey, MX",       t:"MEH",
   note:"The 1,000th match in FIFA World Cup history. Japan are tactically fascinating and capable of stunning upsets. The milestone is compelling but midnight ET is a serious barrier."},
  {dt:"Jun 21",tm:"12:00 PM",gr:"H",h:"Spain",       hf:"🇪🇸",a:"Saudi Arabia", af:"🇸🇦",v:"Atlanta, GA",         t:"MUST",
   note:"Remember 2022? Saudi Arabia pulled off one of the greatest World Cup upsets ever, beating Argentina. Spain are elite, but Saudi Arabia carry genuine shock potential. Do not look away from this one."},
  {dt:"Jun 21",tm:"3:00 PM", gr:"G",h:"Belgium",     hf:"🇧🇪",a:"Iran",         af:"🇮🇷",v:"Inglewood, CA",       t:"GOOD",
   note:"Belgium's Golden Generation chasing the title that has always eluded them. Iran are disciplined and will make Belgium work. A compelling tactical contest."},
  {dt:"Jun 21",tm:"6:00 PM", gr:"H",h:"Uruguay",     hf:"🇺🇾",a:"Cape Verde",   af:"🇨🇻",v:"Miami Gardens, FL",   t:"MEH",
   note:"Uruguay are seasoned tournament veterans. Cape Verde are a small-nation story but significantly outmatched in Group H."},
  {dt:"Jun 21",tm:"9:00 PM", gr:"G",h:"New Zealand", hf:"🇳🇿",a:"Egypt",        af:"🇪🇬",v:"Vancouver, BC",       t:"SKIP",
   note:"Both sides among the weaker teams in Group G. Highlights over live viewing is the recommendation."},
  {dt:"Jun 22",tm:"1:00 PM", gr:"J",h:"Argentina",   hf:"🇦🇷",a:"Austria",      af:"🇦🇹",v:"Arlington, TX",       t:"MUST",
   note:"Defending world champions back in action. Austria are capable, but this is Argentina's stage — watch Messi and company showcase their World Cup pedigree."},
  {dt:"Jun 22",tm:"5:00 PM", gr:"I",h:"France",      hf:"🇫🇷",a:"Iraq",         af:"🇮🇶",v:"Philadelphia, PA",    t:"GOOD",
   note:"France are a joy to watch at full pace. Iraq will sit deep but the spectacle of Mbappe, Dembélé, and Co. at full throttle is worth your time even against a stubborn defense."},
  {dt:"Jun 22",tm:"8:00 PM", gr:"I",h:"Norway",      hf:"🇳🇴",a:"Senegal",      af:"🇸🇳",v:"East Rutherford, NJ",t:"MUST",
   note:"Haaland vs. a Senegal side brimming with Premier League talent. Both teams are genuine Group I contenders. All the ingredients of a classic group stage clash."},
  {dt:"Jun 22",tm:"11:00 PM",gr:"J",h:"Jordan",      hf:"🇯🇴",a:"Algeria",      af:"🇩🇿",v:"Santa Clara, CA",     t:"SKIP",
   note:"Both teams in the lower tier of Group J. The late ET kickoff makes this an easy skip."},
  {dt:"Jun 23",tm:"1:00 PM", gr:"K",h:"Portugal",    hf:"🇵🇹",a:"Uzbekistan",   af:"🇺🇿",v:"Houston, TX",         t:"MEH",
   note:"Ronaldo leads Portugal in what is expected to be his final World Cup, but Uzbekistan are a debut nation and severely outmatched. Watch for the Ronaldo narrative, not the contest."},
  {dt:"Jun 23",tm:"4:00 PM", gr:"L",h:"England",     hf:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",a:"Ghana",        af:"🇬🇭",v:"Foxborough, MA",      t:"GOOD",
   note:"England are loaded with Premier League talent from the elite clubs. Ghana bring pace and intensity. England should be strong but Ghana will make them work."},
  {dt:"Jun 23",tm:"7:00 PM", gr:"L",h:"Panama",      hf:"🇵🇦",a:"Croatia",      af:"🇭🇷",v:"Toronto, ON",         t:"GOOD",
   note:"Croatia are tournament perennials — 2018 finalists, 2022 third place — with a tactical brilliance and resilience that makes them fascinating to watch. Modric pulling strings is always worth your time."},
  {dt:"Jun 23",tm:"10:00 PM",gr:"K",h:"Colombia",    hf:"🇨🇴",a:"DR Congo",     af:"🇨🇩",v:"Zapopan, MX",         t:"MEH",
   note:"Colombia are a vibrant, attacking side with real talent and World Cup ambitions. DR Congo are the underdogs. Late ET is the main deterrent from an entertaining Colombia display."},
  {dt:"Jun 24",fd:true,tm:"3:00 PM", gr:"B",h:"Switzerland", hf:"🇨🇭",a:"Canada",      af:"🇨🇦",v:"Vancouver, BC",     t:"GOOD",
   note:"Final Group B matchday — both games kick off simultaneously. Switzerland are one of Europe's most reliable tournament sides. Canada at home with everything on the line. Should be tightly competitive."},
  {dt:"Jun 24",fd:true,tm:"3:00 PM", gr:"B",h:"Bosnia & Herz.",hf:"🇧🇦",a:"Qatar",       af:"🇶🇦",v:"Seattle, WA",      t:"SKIP",
   note:"Watch Switzerland vs. Canada in this slot instead — stronger teams, more compelling."},
  {dt:"Jun 24",fd:true,tm:"6:00 PM", gr:"C",h:"Scotland",    hf:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",a:"Brazil",      af:"🇧🇷",v:"Miami Gardens, FL", t:"MUST",
   note:"Final Group C matchday. Brazil closing out the group — always a spectacle. Scotland will press and fight, making this more than a formality. High energy on a decisive day."},
  {dt:"Jun 24",fd:true,tm:"6:00 PM", gr:"C",h:"Morocco",     hf:"🇲🇦",a:"Haiti",        af:"🇭🇹",v:"Atlanta, GA",      t:"MEH",
   note:"Morocco will handle business but the Group C drama is happening in Miami. Watch Scotland vs. Brazil in this slot."},
  {dt:"Jun 24",fd:true,tm:"9:00 PM", gr:"A",h:"Czechia",     hf:"🇨🇿",a:"Mexico",      af:"🇲🇽",v:"Mexico City, MX",  t:"MUST",
   note:"Final Group A matchday. Mexico at the Estadio Azteca with group stage stakes on the line — the atmosphere will be extraordinary. One of the tournament's great home-crowd moments."},
  {dt:"Jun 24",fd:true,tm:"9:00 PM", gr:"A",h:"South Africa",hf:"🇿🇦",a:"South Korea", af:"🇰🇷",v:"Monterrey, MX",    t:"MEH",
   note:"South Korea are technically interesting but Mexico vs. Czechia next door commands the attention on this final matchday."},
  {dt:"Jun 25",fd:true,tm:"4:00 PM", gr:"E",h:"Curaçao",     hf:"🇨🇼",a:"Ivory Coast", af:"🇨🇮",v:"Philadelphia, PA",t:"SKIP",
   note:"Watch Ecuador vs. Germany in this slot. Curaçao are significant underdogs and the Group E drama is happening at MetLife."},
  {dt:"Jun 25",fd:true,tm:"4:00 PM", gr:"E",h:"Ecuador",     hf:"🇪🇨",a:"Germany",     af:"🇩🇪",v:"East Rutherford, NJ",t:"MUST",
   note:"Final Group E showdown. Germany are tournament-level elite; Ecuador are a physical, well-organized side that won't be bullied. High-stakes, high-quality — one of the day's marquee fixtures."},
  {dt:"Jun 25",fd:true,tm:"7:00 PM", gr:"F",h:"Japan",       hf:"🇯🇵",a:"Sweden",      af:"🇸🇪",v:"Arlington, TX",    t:"MEH",
   note:"Final Group F matchday. Japan are always tactically fascinating — disciplined and capable of surprises. A decent parallel game."},
  {dt:"Jun 25",fd:true,tm:"7:00 PM", gr:"F",h:"Tunisia",     hf:"🇹🇳",a:"Netherlands", af:"🇳🇱",v:"Kansas City, MO",  t:"GOOD",
   note:"Netherlands closing out the group — consistently top-tier, always worth watching. Van Dijk's command and Dutch attacking flair on display."},
  {dt:"Jun 25",fd:true,tm:"10:00 PM",gr:"D",h:"Türkiye",     hf:"🇹🇷",a:"USA",         af:"🇺🇸",v:"Inglewood, CA",    t:"MUST",usa:true,
   note:"🇺🇸 USA's decisive final group game. Türkiye are dangerous, unpredictable, and technically gifted — a genuine test for the USMNT. Group D's fate is decided here. Do not miss."},
  {dt:"Jun 25",fd:true,tm:"10:00 PM",gr:"D",h:"Paraguay",    hf:"🇵🇾",a:"Australia",   af:"🇦🇺",v:"Santa Clara, CA",  t:"SKIP",
   note:"Watch Türkiye vs. USA in this slot — the USA game will decide Group D's outcome."},
  {dt:"Jun 26",fd:true,tm:"3:00 PM", gr:"I",h:"Norway",      hf:"🇳🇴",a:"France",      af:"🇫🇷",v:"Foxborough, MA",   t:"MUST",
   note:"🔥 Haaland vs. France. Norway are dangerous and could pull off something special. France are tournament-level elite. One of the standout final-matchday clashes on the entire schedule."},
  {dt:"Jun 26",fd:true,tm:"3:00 PM", gr:"I",h:"Senegal",     hf:"🇸🇳",a:"Iraq",        af:"🇮🇶",v:"Toronto, ON",      t:"SKIP",
   note:"Watch Norway vs. France in this slot. Clear recommendation — the companion game cannot compete."},
  {dt:"Jun 26",fd:true,tm:"8:00 PM", gr:"H",h:"Cape Verde",  hf:"🇨🇻",a:"Saudi Arabia",af:"🇸🇦",v:"Houston, TX",      t:"SKIP",
   note:"Watch Uruguay vs. Spain in this slot. Neither team here can match that game's quality or drama potential."},
  {dt:"Jun 26",fd:true,tm:"8:00 PM", gr:"H",h:"Uruguay",     hf:"🇺🇾",a:"Spain",       af:"🇪🇸",v:"Zapopan, MX",      t:"MUST",
   note:"🔥 Two World Cup winners. Spain's intricate possession game vs. Uruguay's physicality and cunning. One of the best group stage fixtures on the entire tournament schedule."},
  {dt:"Jun 26",fd:true,tm:"11:00 PM",gr:"G",h:"Egypt",       hf:"🇪🇬",a:"Iran",        af:"🇮🇷",v:"Seattle, WA",      t:"SKIP",
   note:"Very late ET kickoff with two lower-tier sides. Clear skip — save the energy for tomorrow."},
  {dt:"Jun 26",fd:true,tm:"11:00 PM",gr:"G",h:"New Zealand", hf:"🇳🇿",a:"Belgium",     af:"🇧🇪",v:"Vancouver, BC",    t:"MEH",
   note:"Belgium are genuinely top-tier but New Zealand are significant underdogs. Very late kickoff is the main barrier — catch the highlights."},
  {dt:"Jun 27",fd:true,tm:"5:00 PM", gr:"L",h:"Panama",      hf:"🇵🇦",a:"England",     af:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",v:"East Rutherford, NJ",t:"GOOD",
   note:"England are one of the tournament favorites closing out the group stage. Panama are massive underdogs but England fans travel in enormous numbers — the NJ crowd atmosphere will be something special."},
  {dt:"Jun 27",fd:true,tm:"5:00 PM", gr:"L",h:"Croatia",     hf:"🇭🇷",a:"Ghana",       af:"🇬🇭",v:"Philadelphia, PA", t:"GOOD",
   note:"Croatia are tactically brilliant — 2018 finalists, 2022 third place. Modric, Gvardiol, Kovacic. They elevate their game at tournaments and are always fascinating to watch."},
  {dt:"Jun 27",fd:true,tm:"7:30 PM", gr:"K",h:"Colombia",    hf:"🇨🇴",a:"Portugal",    af:"🇵🇹",v:"Miami Gardens, FL",t:"MUST",
   note:"🔥 Ronaldo's likely final World Cup chapter continues. Colombia are dynamic, attack-minded, and one of the tournament's most exciting sides. A standout game of the final group weekend."},
  {dt:"Jun 27",fd:true,tm:"7:30 PM", gr:"K",h:"DR Congo",    hf:"🇨🇩",a:"Uzbekistan",  af:"🇺🇿",v:"Atlanta, GA",     t:"SKIP",
   note:"Watch Colombia vs. Portugal in this slot. Both teams here lack the star power or storyline to compete for your attention."},
  {dt:"Jun 27",fd:true,tm:"10:00 PM",gr:"J",h:"Algeria",     hf:"🇩🇿",a:"Austria",     af:"🇦🇹",v:"Kansas City, MO", t:"SKIP",
   note:"Watch Jordan vs. Argentina in this slot. Algeria and Austria are mid-tier at best compared to the companion game."},
  {dt:"Jun 27",fd:true,tm:"10:00 PM",gr:"J",h:"Jordan",      hf:"🇯🇴",a:"Argentina",   af:"🇦🇷",v:"Arlington, TX",   t:"MUST",
   note:"Defending world champions close the group stage. Messi and Argentina are always unmissable — they carry the weight of champions with all the drama that entails. The perfect, fitting end to the 2026 group stage."},
];

const DATES = [...new Set(G.map(g => g.dt))];
const FILTER_OPTS = [
  {k:"ALL",  l:"All Games"},
  {k:"MUST", l:"🔴 Must Watch"},
  {k:"GOOD", l:"🟢 Worth It"},
  {k:"MEH",  l:"🟡 Moderate"},
  {k:"SKIP", l:"⚪ Skip"},
];

export default function NycWcPlanner() {
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
  const usaGames = G.filter(g => g.usa);

  return (
    <div style={{
      minHeight:"100vh",
      background:"#030c18",
      fontFamily:"system-ui, -apple-system, 'Segoe UI', sans-serif",
      color:"#d8eeff",
    }}>

      {/* ── STICKY HEADER ─────────────────────────────────────── */}
      <div style={{
        background:"#010e1e",
        borderBottom:"2px solid #00904f",
        padding:"16px 20px 0",
        position:"sticky", top:0, zIndex:10,
      }}>
        <div style={{maxWidth:860, margin:"0 auto"}}>

          {/* Title row */}
          <div style={{display:"flex", alignItems:"baseline", gap:12, flexWrap:"wrap", marginBottom:10}}>
            <h1 style={{margin:0, fontSize:22, fontWeight:700, letterSpacing:"-0.02em", color:"#e8f4ff"}}>
              ⚽ World Cup 2026
            </h1>
            <span style={{fontSize:14, color:"#3a6a8a"}}>Group Stage Watch Guide · Jun 11–27</span>
          </div>

          {/* Legend */}
          <div style={{display:"flex", gap:6, flexWrap:"wrap", marginBottom:12}}>
            {Object.entries(T).map(([k,v]) => (
              <div key={k} style={{
                display:"flex", alignItems:"center", gap:5,
                background:v.bg, border:`1.5px solid ${v.b}`,
                borderRadius:20, padding:"3px 10px",
                fontSize:12, color:v.c, fontWeight:500,
              }}>
                {v.d} {v.l}
              </div>
            ))}
          </div>

          {/* Date strip */}
          <div style={{
            display:"flex", gap:4, overflowX:"auto", paddingBottom:0,
            scrollbarWidth:"none", marginLeft:-20, marginRight:-20,
            paddingLeft:20, paddingRight:20,
          }}>
            {DATES.map(d => {
              const dg = G.filter(g => g.dt===d);
              const hasUSA = dg.some(g => g.usa);
              const hasMust = dg.some(g => g.t==="MUST");
              const isFinal = dg.some(g => g.fd);
              const on = date===d;
              return (
                <button key={d} onClick={() => setDate(d)} style={{
                  flexShrink:0,
                  background: on ? "#002040" : "transparent",
                  border:"none",
                  borderBottom:`3px solid ${on ? (hasUSA?"#dd3333":hasMust?"#00904f":isFinal?"#c08020":"#3a6a9a") : "transparent"}`,
                  padding:"6px 10px 8px",
                  cursor:"pointer",
                  color: on ? "#e8f4ff" : "#3a6080",
                  fontSize:13,
                  fontWeight: on ? 700 : 400,
                  transition:"all 0.12s",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:2,
                  borderRadius:"4px 4px 0 0",
                }}>
                  <span>{d}</span>
                  <span style={{
                    fontSize:10, fontWeight:600,
                    color: hasUSA?"#ee5555" : hasMust?"#00904f" : isFinal?"#c08020" : "transparent",
                  }}>
                    {hasUSA ? "🇺🇸 USA" : hasMust ? "★ MUST" : isFinal ? "⚡ FINAL" : "·"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── BODY ──────────────────────────────────────────────── */}
      <div style={{maxWidth:860, margin:"0 auto", padding:"16px 20px 48px"}}>

        {/* Day meta row */}
        <div style={{
          display:"flex", justifyContent:"space-between", alignItems:"center",
          flexWrap:"wrap", gap:10, marginBottom:14,
        }}>
          {/* Stat pills */}
          <div style={{display:"flex", gap:8, alignItems:"center", flexWrap:"wrap"}}>
            {isFD && (
              <span style={{
                fontSize:12, fontWeight:600,
                background:"#1a0e00", border:"1px solid #7a5020",
                color:"#e0a030", borderRadius:6, padding:"3px 10px",
              }}>
                ⚡ Final Group Matchday — concurrent kickoffs
              </span>
            )}
            {(["MUST","GOOD","MEH","SKIP"] ).map(k => counts[k] > 0 && (
              <span key={k} style={{fontSize:13, color:T[k].c, fontWeight:500}}>
                {T[k].d} {counts[k]}
              </span>
            ))}
          </div>

          {/* Filter buttons */}
          <div style={{display:"flex", gap:5, flexWrap:"wrap"}}>
            {FILTER_OPTS.map(f => {
              const on = filter===f.k;
              const tier = T[f.k];
              return (
                <button key={f.k} onClick={() => setFilter(f.k)} style={{
                  background: on ? (tier ? tier.bg : "#0a1e30") : "#07121e",
                  border:`1.5px solid ${on ? (tier ? tier.b : "#2a4a6a") : "#0e1e2e"}`,
                  borderRadius:20, padding:"4px 13px", cursor:"pointer",
                  color: on ? (tier ? tier.c : "#d8eeff") : "#3a6080",
                  fontSize:12, fontWeight: on ? 600 : 400,
                  transition:"all 0.12s",
                }}>
                  {f.l}
                </button>
              );
            })}
          </div>
        </div>

        {/* Game cards */}
        {shown.length === 0 && (
          <div style={{color:"#2a5070", fontSize:15, padding:"32px 0", textAlign:"center"}}>
            No {filter.toLowerCase()} games on {date}
          </div>
        )}
        <div style={{display:"flex", flexDirection:"column", gap:10}}>
          {shown.map((g, i) => {
            const tier = T[g.t];
            return (
              <div key={i} style={{
                background:tier.bg,
                border:`1.5px solid ${tier.b}`,
                borderRadius:12,
                padding:"14px 16px",
              }}>
                {/* Top row: badge + time + venue */}
                <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:10, flexWrap:"wrap"}}>
                  <div style={{
                    background:tier.c+"22", border:`1px solid ${tier.b}`,
                    borderRadius:6, padding:"3px 9px",
                    fontSize:11, fontWeight:700, color:tier.c,
                    letterSpacing:"0.05em", whiteSpace:"nowrap",
                  }}>
                    {tier.d} {tier.l}
                  </div>
                  {g.usa && (
                    <div style={{
                      background:"#200505", border:"1px solid #882020",
                      borderRadius:6, padding:"3px 9px",
                      fontSize:11, fontWeight:700, color:"#ff7070",
                      whiteSpace:"nowrap",
                    }}>
                      🇺🇸 USA GAME
                    </div>
                  )}
                  <div style={{marginLeft:"auto", textAlign:"right"}}>
                    <span style={{fontSize:13, color:"#5a8aaa", fontWeight:500}}>{g.tm} ET</span>
                    <span style={{fontSize:12, color:"#2a4a60", marginLeft:8}}>Group {g.gr}</span>
                  </div>
                </div>

                {/* Teams */}
                <div style={{
                  display:"flex", alignItems:"center", gap:10,
                  marginBottom:10,
                }}>
                  <span style={{fontSize:26, lineHeight:1}}>{g.hf}</span>
                  <span style={{fontSize:18, fontWeight:700, color:"#e8f4ff"}}>{g.h}</span>
                  <span style={{fontSize:13, color:"#2a4a60", fontWeight:400, padding:"0 2px"}}>vs</span>
                  <span style={{fontSize:18, fontWeight:700, color:"#e8f4ff"}}>{g.a}</span>
                  <span style={{fontSize:26, lineHeight:1}}>{g.af}</span>
                </div>

                {/* Venue */}
                <div style={{fontSize:12, color:"#2a5070", marginBottom:8}}>
                  📍 {g.v}
                </div>

                {/* Note */}
                <div style={{
                  fontSize:14, color:"#6a90a8", lineHeight:1.6,
                  borderTop:`1px solid ${tier.b}44`,
                  paddingTop:8,
                }}>
                  {g.note}
                </div>
              </div>
            );
          })}
        </div>

        {/* USA Games Summary */}
        <div style={{
          marginTop:28,
          background:"#07111e",
          border:"1px solid #1a2e40",
          borderRadius:12,
          padding:"16px 18px",
        }}>
          <div style={{
            fontSize:13, fontWeight:700, color:"#cc3333",
            letterSpacing:"0.05em", marginBottom:12,
            display:"flex", alignItems:"center", gap:6,
          }}>
            🇺🇸 USA GAMES — DON'T MISS
          </div>
          <div style={{display:"flex", flexDirection:"column", gap:7}}>
            {usaGames.map((g, i) => (
              <div
                key={i}
                onClick={() => { setDate(g.dt); setFilter("ALL"); }}
                style={{
                  display:"flex", alignItems:"center", gap:10,
                  background:"#0a1828", border:"1px solid #1a2e40",
                  borderRadius:8, padding:"10px 14px",
                  cursor:"pointer", transition:"border-color 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor="#882020"}
                onMouseLeave={e => e.currentTarget.style.borderColor="#1a2e40"}
              >
                <span style={{fontSize:20}}>{g.hf}</span>
                <span style={{fontSize:16, fontWeight:700, color:"#e8f4ff"}}>{g.h} vs {g.a}</span>
                <span style={{fontSize:20}}>{g.af}</span>
                <span style={{marginLeft:"auto", fontSize:13, color:"#3a6080", whiteSpace:"nowrap"}}>
                  {g.dt} · {g.tm} ET
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
