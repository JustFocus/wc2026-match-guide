import { useState } from "react";

const T = {
  MUST: { l: "MUST WATCH",     c: "#ff5555", bg: "#1a0404", b: "#882020", d: "🔴" },
  GOOD: { l: "WORTH WATCHING", c: "#00c87a", bg: "#011a0a", b: "#006640", d: "🟢" },
  MEH:  { l: "MODERATE",       c: "#f5a623", bg: "#160d00", b: "#7a4f10", d: "🟡" },
  SKIP: { l: "SKIP",           c: "#5a7a9a", bg: "#06101a", b: "#1a2e40", d: "⚪" },
};

const G = [
  {dt:"Jun 11",tm:"3:00 PM", gr:"A",h:"Mexico",      hf:"🇲🇽",a:"South Africa", af:"🇿🇦",v:"Mexico City, MX",    t:"GOOD",
   note:"RESULT: Mexico 2-0 South Africa. Mexico delivered on the biggest possible stage at the iconic Estadio Azteca — the only stadium to host three World Cup openers (1970, 1986, 2026). 80,000 roaring fans got exactly the tournament-opening spectacle they came for. South Africa were organized but outclassed."},
  {dt:"Jun 11",tm:"10:00 PM",gr:"A",h:"South Korea", hf:"🇰🇷",a:"Czechia",      af:"🇨🇿",v:"Zapopan, MX",        t:"MEH",
   note:"RESULT: South Korea 2-1 Czechia. South Korea got their campaign off to a winning start in a competitive encounter — their attacking quality made the difference, as predicted. Czechia fought back to make it interesting but couldn't hold on."},
  {dt:"Jun 12",tm:"3:00 PM", gr:"B",h:"Canada",      hf:"🇨🇦",a:"Bosnia & Herz.",af:"🇧🇦",v:"Toronto, ON",        t:"MEH",
   note:"RESULT: Canada 1-1 Bosnia & Herz. Exactly the MEH billing predicted — raucous BMO Field atmosphere, Bosnia physical and organized, no winner. Canada bounced back emphatically in MD2 with a stunning 6-0 destruction of Qatar."},
  {dt:"Jun 12",tm:"9:00 PM", gr:"D",h:"USA",         hf:"🇺🇸",a:"Paraguay",     af:"🇵🇾",v:"Inglewood, CA",       t:"MUST",usa:true,
   note:"🇺🇸 RESULT: USA 4-1 Paraguay. The USMNT delivered a dominant, clinical statement performance — the most emphatic US group stage win in decades. SoFi Stadium was electric. Paraguay were physical but couldn't contain the Americans. Historic opening night for US Soccer."},
  {dt:"Jun 13",tm:"3:00 PM", gr:"B",h:"Qatar",       hf:"🇶🇦",a:"Switzerland",  af:"🇨🇭",v:"Santa Clara, CA",    t:"MEH",
   note:"RESULT: Switzerland 1-1 Qatar. Qatar showed enough fight to earn a surprise point, frustrating a Switzerland side expected to cruise. Switzerland responded in MD2 with a dominant 4-1 win over Bosnia — the Swiss are the real deal in Group B."},
  {dt:"Jun 13",tm:"6:00 PM", gr:"C",h:"Brazil",      hf:"🇧🇷",a:"Morocco",      af:"🇲🇦",v:"East Rutherford, NJ",t:"MUST",
   note:"RESULT: Brazil 1-1 Morocco. Every bit the elite clash it promised to be — two of the world's most watchable squads cancelling each other out in a tactical masterclass. Morocco proved yet again they belong at the highest level. Both teams went on to win their MD2 fixtures, setting up a fascinating final matchday in Group C."},
  {dt:"Jun 13",tm:"9:00 PM", gr:"C",h:"Haiti",       hf:"🇭🇹",a:"Scotland",     af:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",v:"Foxborough, MA",      t:"MEH",
   note:"RESULT: Scotland 1-0 Haiti. Scotland ground out the narrow win with exactly the battling passion they're known for. Scotland then lost 0-1 to Morocco in MD2, meaning their knockout hopes now depend on beating Brazil in the final game."},
  {dt:"Jun 14",tm:"12:00 AM",gr:"D",h:"Australia",   hf:"🇦🇺",a:"Türkiye",      af:"🇹🇷",v:"Vancouver, BC",       t:"MEH",
   note:"RESULT: Australia 2-0 Türkiye. The Socceroos delivered a counterattacking masterclass at a midnight ET kickoff — Irankunda (27') and Metcalfe (75') with the goals as Australia stunned a Türkiye side expected to be more polished. Australia jumped to the top of Group D alongside the USA."},
  {dt:"Jun 14",tm:"1:00 PM", gr:"E",h:"Germany",     hf:"🇩🇪",a:"Curaçao",      af:"🇨🇼",v:"Houston, TX",         t:"MEH",
   note:"RESULT: Germany 7-1 Curaçao. German clinical efficiency on full display — seven goals in a relentless performance. Curaçao made World Cup history just by being here but couldn't compete. Group E standout: Germany vs. Ivory Coast today (Jun 20) is the real MD2 fixture to watch."},
  {dt:"Jun 14",tm:"4:00 PM", gr:"F",h:"Netherlands", hf:"🇳🇱",a:"Japan",        af:"🇯🇵",v:"Arlington, TX",       t:"MUST",
   note:"RESULT: Netherlands 2-2 Japan. Exactly the classic it promised to be — Japan twice fought back to earn a point against a Dutch side that should have been comfortable. The tactical battle between Dutch flair and Japanese discipline delivered everything. Group F is wide open heading into the final matchday."},
  {dt:"Jun 14",tm:"7:00 PM", gr:"E",h:"Ivory Coast", hf:"🇨🇮",a:"Ecuador",      af:"🇪🇨",v:"Philadelphia, PA",    t:"MEH",
   note:"RESULT: Ivory Coast 1-0 Ecuador. Amad Diallo's late winner decided a tightly contested match — more competitive than the MEH billing suggested. Group E after MD1: Germany (7-1), Ivory Coast (1-0), Ecuador (0-1), Curaçao (1-7). Today's Germany vs. Ivory Coast clash (Jun 20) is the group's standout fixture."},
  {dt:"Jun 14",tm:"10:00 PM",gr:"F",h:"Sweden",      hf:"🇸🇪",a:"Tunisia",      af:"🇹🇳",v:"Monterrey, MX",       t:"SKIP",
   note:"RESULT: Sweden 5-1 Tunisia. Far more emphatic than the SKIP billing expected — Sweden were outstanding. Catch the highlights; Sweden are now surprise Group F contenders alongside Netherlands."},
  {dt:"Jun 15",tm:"12:00 PM",gr:"H",h:"Spain",       hf:"🇪🇸",a:"Cape Verde",   af:"🇨🇻",v:"Atlanta, GA",         t:"GOOD",
   note:"RESULT: Spain 0-0 Cape Verde — one of the early tournament shocks. Spain couldn't break through a disciplined Cape Verde side in a stunning goalless draw. This completely changes Group H: Spain are vulnerable, and their MD2 clash with Saudi Arabia on Jun 21 is now one of the tournament's most urgent fixtures."},
  {dt:"Jun 15",tm:"3:00 PM", gr:"G",h:"Belgium",     hf:"🇧🇪",a:"Egypt",        af:"🇪🇬",v:"Seattle, WA",         t:"GOOD",
   note:"RESULT: Belgium 1-1 Egypt. De Bruyne and Lukaku couldn't find a winner against a well-organized Egyptian side. The Golden Generation's limitations showed again under pressure. All four Group G teams drew in MD1 — every MD2 game in the group carries knockout implications."},
  {dt:"Jun 15",tm:"6:00 PM", gr:"H",h:"Saudi Arabia",hf:"🇸🇦",a:"Uruguay",      af:"🇺🇾",v:"Miami Gardens, FL",   t:"GOOD",
   note:"RESULT: Saudi Arabia 1-1 Uruguay. All four Group H teams finished MD1 level on one point after Spain's 0-0 draw with Cape Verde. Saudi Arabia once again proved they're dangerous — Uruguay held them but couldn't win. Group H is completely wide open. Jun 21 Spain vs. Saudi Arabia is now unmissable."},
  {dt:"Jun 15",tm:"9:00 PM", gr:"G",h:"Iran",        hf:"🇮🇷",a:"New Zealand",  af:"🇳🇿",v:"Inglewood, CA",       t:"SKIP",
   note:"RESULT: Iran 2-2 New Zealand — a surprisingly entertaining 4-goal game that belied the SKIP rating. Both teams had their moments in a back-and-forth contest. All four Group G teams tied on one point heading into MD2."},
  {dt:"Jun 16",tm:"3:00 PM", gr:"I",h:"France",      hf:"🇫🇷",a:"Senegal",      af:"🇸🇳",v:"East Rutherford, NJ",t:"MUST",
   note:"RESULT: France 3-1 Senegal. Exactly the showcase it promised — Mbappe and co. were too good for a Senegal side that competed throughout. France look every inch the tournament favorites, scoring freely. They head into MD2 as commanding Group I leaders."},
  {dt:"Jun 16",tm:"6:00 PM", gr:"I",h:"Iraq",        hf:"🇮🇶",a:"Norway",       af:"🇳🇴",v:"Foxborough, MA",      t:"GOOD",
   note:"RESULT: Norway 4-1 Iraq. Haaland announced himself on the biggest stage in a dominant team performance — Norway served notice they're genuine Group I contenders. The Haaland vs. France showdown on June 26 is already one of the tournament's most anticipated fixtures."},
  {dt:"Jun 16",tm:"9:00 PM", gr:"J",h:"Argentina",   hf:"🇦🇷",a:"Algeria",      af:"🇩🇿",v:"Kansas City, MO",     t:"MUST",
   note:"RESULT: Argentina 3-0 Algeria. Messi and the defending champions delivered a dominant, clinical statement. Argentina lead Group J heading into a second fixture against an impressive Austria side. The weight of champions, carried with authority."},
  {dt:"Jun 17",tm:"12:00 AM",gr:"J",h:"Austria",     hf:"🇦🇹",a:"Jordan",       af:"🇯🇴",v:"Santa Clara, CA",     t:"SKIP",
   note:"RESULT: Austria 3-1 Jordan. Austria were far more impressive than their pre-tournament billing — a convincing victory that sets up their MD2 clash with Argentina as a genuine Group J decider. The SKIP was right for the live game but Austria are now a team to watch."},
  {dt:"Jun 17",tm:"1:00 PM", gr:"K",h:"Portugal",    hf:"🇵🇹",a:"DR Congo",     af:"🇨🇩",v:"Houston, TX",         t:"GOOD",
   note:"RESULT: Portugal 1-1 DR Congo — one of the tournament's biggest early shocks. Yoane Wissa equalized late in the first half to earn DR Congo their first-ever World Cup point, stunning a Ronaldo-led Portugal side. João Neves had given Portugal the lead but they couldn't hold on. ESPN flagged a 'Ronaldo problem.' Portugal's MD2 vs. Uzbekistan is now must-win."},
  {dt:"Jun 17",tm:"4:00 PM", gr:"L",h:"England",     hf:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",a:"Croatia",      af:"🇭🇷",v:"Arlington, TX",       t:"MUST",
   note:"RESULT: England 4-2 Croatia — revenge served spectacularly. Kane scored twice (12' pen, 42'), Bellingham struck immediately after half-time (47'), Rashford sealed it (85'). Croatia fought back twice to make it a genuine contest. The rematch of Moscow 2018 delivered everything. England look like genuine tournament contenders."},
  {dt:"Jun 17",tm:"7:00 PM", gr:"L",h:"Ghana",       hf:"🇬🇭",a:"Panama",       af:"🇵🇦",v:"Toronto, ON",         t:"SKIP",
   note:"RESULT: Ghana 1-0 Panama — a tight, low-quality contest. The SKIP rating was justified. Catch the highlights if curious about Group L's lower tier."},
  {dt:"Jun 17",tm:"10:00 PM",gr:"K",h:"Uzbekistan",  hf:"🇺🇿",a:"Colombia",     af:"🇨🇴",v:"Mexico City, MX",     t:"MEH",
   note:"RESULT: Colombia 3-1 Uzbekistan. Colombia's star power delivered an entertaining attacking display — three goals and dynamic football that lived up to their pre-tournament reputation. Colombia lead Group K outright heading into MD2."},
  {dt:"Jun 18",tm:"12:00 PM",gr:"A",h:"Czechia",     hf:"🇨🇿",a:"South Africa", af:"🇿🇦",v:"Atlanta, GA",         t:"SKIP",
   note:"RESULT: Czechia 1-1 South Africa — an unremarkable draw between the group's lower-ranked sides. The SKIP rating was correct. Group A's narrative centers entirely on Mexico's progress."},
  {dt:"Jun 18",tm:"3:00 PM", gr:"B",h:"Switzerland", hf:"🇨🇭",a:"Bosnia & Herz.",af:"🇧🇦",v:"Inglewood, CA",       t:"MEH",
   note:"RESULT: Switzerland 4-1 Bosnia & Herz. Switzerland showed exactly the tournament-level quality the MEH billing undersold — dominant and emphatic. They head into the Group B finale against Canada (also 4 pts) in a winner-takes-all match for top spot."},
  {dt:"Jun 18",tm:"6:00 PM", gr:"B",h:"Canada",      hf:"🇨🇦",a:"Qatar",        af:"🇶🇦",v:"Vancouver, BC",        t:"MEH",
   note:"RESULT: Canada 6-0 Qatar — one of the tournament's early highlights. The Vancouver crowd was electric and Canada's performance matched the atmosphere. Six goals on home soil. Canada (4 pts) now face Switzerland (4 pts) in the Group B finale in what is effectively a winner-takes-all clash."},
  {dt:"Jun 18",tm:"9:00 PM", gr:"A",h:"Mexico",      hf:"🇲🇽",a:"South Korea",  af:"🇰🇷",v:"Zapopan, MX",         t:"GOOD",
   note:"RESULT: Mexico 1-0 South Korea. A narrow but crucial win — Mexico top Group A with a perfect 6 points from 2 games. The Zapopan atmosphere was exactly as extraordinary as predicted. South Korea (3 pts) still in contention for a knockout spot heading into the final game."},
  {dt:"Jun 19",tm:"3:00 PM", gr:"D",h:"USA",         hf:"🇺🇸",a:"Australia",    af:"🇦🇺",v:"Seattle, WA",         t:"MUST",usa:true,
   note:"🇺🇸 RESULT: USA 2-0 Australia. The USMNT have clinched a knockout-round spot — consecutive World Cup wins for the first time since 1930. Two first-half goals at a packed Lumen Field, despite Pulisic's absence. USA top Group D. Historic moment for American soccer."},
  {dt:"Jun 19",tm:"6:00 PM", gr:"C",h:"Scotland",    hf:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",a:"Morocco",      af:"🇲🇦",v:"Foxborough, MA",      t:"GOOD",
   note:"RESULT: Morocco 1-0 Scotland. Morocco showed exactly why they're one of the tournament's most compelling teams — organized, clinical, too good for a Scotland side that pressed and fought. Morocco top Group C with 4 points. Scotland (3 pts) must beat Brazil in the final game to have any knockout hope."},
  {dt:"Jun 19",tm:"8:30 PM", gr:"C",h:"Brazil",      hf:"🇧🇷",a:"Haiti",        af:"🇭🇹",v:"Philadelphia, PA",    t:"MEH",
   note:"RESULT: Brazil 3-0 Haiti. Attacking talent at full throttle — three goals and plenty of flair, exactly as expected. Brazil (4 pts) need just a point against Scotland to advance as Group C winners. The real Group C drama is in the final-day Scotland vs. Brazil game."},
  {dt:"Jun 19",tm:"11:00 PM",gr:"D",h:"Türkiye",     hf:"🇹🇷",a:"Paraguay",     af:"🇵🇾",v:"Santa Clara, CA",     t:"SKIP",
   note:"RESULT: Paraguay beat Türkiye. Paraguay kept their knockout hopes alive while Türkiye — who also lost to Australia — are eliminated. The SKIP was right for live viewing. Paraguay vs. Australia in the final game is now a genuine 2nd-place decider."},
  {dt:"Jun 20",tm:"1:00 PM", gr:"F",h:"Netherlands", hf:"🇳🇱",a:"Sweden",       af:"🇸🇪",v:"Houston, TX",         t:"GOOD",
   note:"Netherlands drew 2-2 with Japan in a thriller and need a win here to take Group F control. Sweden were outstanding in MD1, hammering Tunisia 5-1. This is a more even contest than originally billed — Sweden are genuine competition. A high-stakes Group F showdown."},
  {dt:"Jun 20",tm:"4:00 PM", gr:"E",h:"Germany",     hf:"🇩🇪",a:"Ivory Coast",  af:"🇨🇮",v:"Toronto, ON",         t:"MUST",
   note:"The Group E showdown of the day. Germany scored 7 goals vs. Curaçao in MD1; Ivory Coast edged Ecuador 1-0 via Amad Diallo's late winner. Germany are ruthlessly efficient in attack; Ivory Coast have the pace, physicality, and talent to hurt anyone. Two in-form teams colliding for Group E supremacy."},
  {dt:"Jun 20",tm:"8:00 PM", gr:"E",h:"Ecuador",     hf:"🇪🇨",a:"Curaçao",      af:"🇨🇼",v:"Kansas City, MO",     t:"SKIP",
   note:"Ecuador need a win after losing 0-1 to Ivory Coast in MD1. Curaçao were beaten 7-1 by Germany but made World Cup history just by competing. Watch Germany vs. Ivory Coast instead — that's the real Group E story today."},
  {dt:"Jun 21",tm:"12:00 AM",gr:"F",h:"Tunisia",     hf:"🇹🇳",a:"Japan",        af:"🇯🇵",v:"Monterrey, MX",       t:"MEH",
   note:"The 1,000th match in FIFA World Cup history. Japan already held Netherlands 2-2 in a thriller — they've proven they belong. Tunisia were thrashed 5-1 by Sweden and are fighting to survive. Japan are heavy favorites, but the historic milestone adds genuine intrigue. Midnight ET remains the main barrier."},
  {dt:"Jun 21",tm:"12:00 PM",gr:"H",h:"Spain",       hf:"🇪🇸",a:"Saudi Arabia", af:"🇸🇦",v:"Atlanta, GA",         t:"MUST",
   note:"🚨 ELEVATED URGENCY. Spain were held to a humiliating 0-0 draw by Cape Verde — they are NOT the force they appeared. Saudi Arabia drew with Uruguay and have beaten Argentina before (2022). All four Group H teams are level on one point. Spain need a win desperately, under maximum pressure. Do. Not. Miss."},
  {dt:"Jun 21",tm:"3:00 PM", gr:"G",h:"Belgium",     hf:"🇧🇪",a:"Iran",         af:"🇮🇷",v:"Inglewood, CA",       t:"GOOD",
   note:"Belgium drew 1-1 with Egypt — De Bruyne and Lukaku couldn't find a winner and the Golden Generation's limitations showed again. Iran drew 2-2 with New Zealand in a lively, higher-scoring match than expected. All four Group G teams tied on 1 point. Belgium need this win desperately; Iran proved they can score. More intrigue than originally billed."},
  {dt:"Jun 21",tm:"6:00 PM", gr:"H",h:"Uruguay",     hf:"🇺🇾",a:"Cape Verde",   af:"🇨🇻",v:"Miami Gardens, FL",   t:"MEH",
   note:"Cape Verde held Spain 0-0 in one of the tournament's early shocks — they are defensively compact and absolutely not to be underestimated. Uruguay drew with Saudi Arabia and need points here. Cape Verde have already made one giant stumble — Uruguay cannot afford complacency."},
  {dt:"Jun 21",tm:"9:00 PM", gr:"G",h:"New Zealand", hf:"🇳🇿",a:"Egypt",        af:"🇪🇬",v:"Vancouver, BC",       t:"MEH",
   note:"All four Group G teams drew in MD1 (Belgium 1-1 Egypt, Iran 2-2 New Zealand) — every MD2 game is now a genuine six-pointer for knockout survival. New Zealand and Egypt both showed they can score. More meaningful than the original SKIP suggested."},
  {dt:"Jun 22",tm:"1:00 PM", gr:"J",h:"Argentina",   hf:"🇦🇷",a:"Austria",      af:"🇦🇹",v:"Arlington, TX",       t:"MUST",
   note:"Argentina dominated Algeria 3-0 in MD1. Austria were hugely impressive with a 3-1 win over Jordan — far better than their pre-tournament billing. Both teams arrive with 3 points: this is a genuine Group J decider. Messi vs. a confident, resurgent Austria side is one of the most compelling MD2 fixtures of the entire group stage."},
  {dt:"Jun 22",tm:"5:00 PM", gr:"I",h:"France",      hf:"🇫🇷",a:"Iraq",         af:"🇮🇶",v:"Philadelphia, PA",    t:"GOOD",
   note:"France were magnificent in a 3-1 win over Senegal. Iraq lost 4-1 to Norway and will sit extremely deep. Expect a French goal festival — but the spectacle of Mbappe and Dembélé at full throttle against a packed defense is always worth your time. France look every inch the tournament favorites."},
  {dt:"Jun 22",tm:"8:00 PM", gr:"I",h:"Norway",      hf:"🇳🇴",a:"Senegal",      af:"🇸🇳",v:"East Rutherford, NJ",t:"MUST",
   note:"Norway were electric — 4-1 vs Iraq, Haaland announcing himself on the biggest stage. Senegal lost 1-3 to France but competed throughout. Both teams are one point behind France and need this win. This carries genuine knockout-round implications. All the ingredients of a classic — now with real stakes."},
  {dt:"Jun 22",tm:"11:00 PM",gr:"J",h:"Jordan",      hf:"🇯🇴",a:"Algeria",      af:"🇩🇿",v:"Santa Clara, CA",     t:"SKIP",
   note:"Jordan lost 1-3 to Austria and Algeria lost 0-3 to Argentina in MD1 — both are winless and fighting for a best third-place berth at most. Argentina and Austria have taken over Group J. Late ET makes this an easy skip."},
  {dt:"Jun 23",tm:"1:00 PM", gr:"K",h:"Portugal",    hf:"🇵🇹",a:"Uzbekistan",   af:"🇺🇿",v:"Houston, TX",         t:"MEH",
   note:"Portugal MUST bounce back after their shocking 1-1 draw with DR Congo — ESPN flagged a 'Ronaldo problem' after a frustrating opener. Uzbekistan lost 1-3 to Colombia and are clear underdogs. Portugal need a convincing win to restore confidence. The pressure on Ronaldo makes this narrative compelling even if the contest should be one-sided."},
  {dt:"Jun 23",tm:"4:00 PM", gr:"L",h:"England",     hf:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",a:"Ghana",        af:"🇬🇭",v:"Foxborough, MA",      t:"GOOD",
   note:"England were OUTSTANDING in a 4-2 win over Croatia — Kane (2), Bellingham, Rashford all on the scoresheet. Ghana beat Panama 1-0 and will make England work, but the Three Lions look in tremendous form and are emerging as genuine tournament contenders. Another chance to impress."},
  {dt:"Jun 23",tm:"7:00 PM", gr:"L",h:"Panama",      hf:"🇵🇦",a:"Croatia",      af:"🇭🇷",v:"Toronto, ON",         t:"GOOD",
   note:"Croatia were blown away 2-4 by England — Modric and co. fought back twice but couldn't stop the Three Lions. Croatia MUST beat Panama (who lost to Ghana) to stay in knockout contention. This could be Modric's last World Cup hurrah — expect him to bring everything he has in a desperate must-win game."},
  {dt:"Jun 23",tm:"10:00 PM",gr:"K",h:"Colombia",    hf:"🇨🇴",a:"DR Congo",     af:"🇨🇩",v:"Zapopan, MX",         t:"MEH",
   note:"Colombia lead Group K after a 3-1 win over Uzbekistan — vibrant, attacking football as promised. DR Congo shocked Portugal 1-1 in one of the tournament's early upsets. Late ET is the deterrent, but Colombia's attacking flair and DR Congo's shock value make this a watchable late game."},
  {dt:"Jun 24",fd:true,tm:"3:00 PM", gr:"B",h:"Switzerland", hf:"🇨🇭",a:"Canada",      af:"🇨🇦",v:"Vancouver, BC",     t:"MUST",
   note:"🔥 Group B winner-takes-all. Switzerland (4 pts) crushed Bosnia 4-1; Canada (4 pts) destroyed Qatar 6-0. Both teams are in brilliant form and level on points. Switzerland are European tournament quality; Canada are fired up at home with 6 goals in their last game. This is effectively the Group B final — whoever wins tops the group."},
  {dt:"Jun 24",fd:true,tm:"3:00 PM", gr:"B",h:"Bosnia & Herz.",hf:"🇧🇦",a:"Qatar",       af:"🇶🇦",v:"Seattle, WA",      t:"SKIP",
   note:"Bosnia lost 1-4 to Switzerland; Qatar were destroyed 0-6 by Canada. Both teams have lost their MD2 games heavily — this is a consolation contest. Watch Switzerland vs. Canada in this slot for the real Group B drama."},
  {dt:"Jun 24",fd:true,tm:"6:00 PM", gr:"C",h:"Scotland",    hf:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",a:"Brazil",      af:"🇧🇷",v:"Miami Gardens, FL", t:"MUST",
   note:"Scotland (3 pts) MUST beat Brazil (4 pts) to have any chance of advancing as a third-place qualifier. They beat Haiti in MD1 but lost to Morocco in MD2 — this is a last-chance salvo against the five-time world champions. Scotland will press like their tournament depends on it, because it does. Brazil will want to close out on a high. High intensity on both sides."},
  {dt:"Jun 24",fd:true,tm:"6:00 PM", gr:"C",h:"Morocco",     hf:"🇲🇦",a:"Haiti",        af:"🇭🇹",v:"Atlanta, GA",      t:"MEH",
   note:"Morocco (4 pts) are in commanding shape after winning both MD1 and MD2. Haiti (0 pts) are eliminated. Morocco will handle business but all Group C drama is in Miami — watch Scotland vs. Brazil instead."},
  {dt:"Jun 24",fd:true,tm:"9:00 PM", gr:"A",h:"Czechia",     hf:"🇨🇿",a:"Mexico",      af:"🇲🇽",v:"Mexico City, MX",  t:"MUST",
   note:"Mexico have already won Group A with a perfect 6 points. Czechia (1 pt) need a miracle. The Estadio Azteca atmosphere will be extraordinary as always — 80,000 fans celebrating Mexico's group stage triumph. A spectacular occasion even without the group stage tension."},
  {dt:"Jun 24",fd:true,tm:"9:00 PM", gr:"A",h:"South Africa",hf:"🇿🇦",a:"South Korea", af:"🇰🇷",v:"Monterrey, MX",    t:"MEH",
   note:"South Korea (3 pts) need a result against South Africa (1 pt) to secure 2nd place in Group A. The stakes are real for South Korea but the Group A spectacle is happening at the Azteca — check the score and watch Czechia vs. Mexico for the occasion."},
  {dt:"Jun 25",fd:true,tm:"4:00 PM", gr:"E",h:"Curaçao",     hf:"🇨🇼",a:"Ivory Coast", af:"🇨🇮",v:"Philadelphia, PA",t:"SKIP",
   note:"Curaçao were beaten 7-1 by Germany in MD1 and have been outclassed in the group — they made history just by being here. Watch Ecuador vs. Germany in this slot for the Group E finale and all the drama."},
  {dt:"Jun 25",fd:true,tm:"4:00 PM", gr:"E",h:"Ecuador",     hf:"🇪🇨",a:"Germany",     af:"🇩🇪",v:"East Rutherford, NJ",t:"MUST",
   note:"Final Group E showdown. Germany are tournament-level elite after scoring 7 in MD1 alone. Ecuador need a result after losing 0-1 to Ivory Coast in MD1. The Group E standings after Germany vs. Ivory Coast today (Jun 20) will define exactly what's at stake — but Germany vs. Ecuador is guaranteed high-quality, high-stakes football."},
  {dt:"Jun 25",fd:true,tm:"7:00 PM", gr:"F",h:"Japan",       hf:"🇯🇵",a:"Sweden",      af:"🇸🇪",v:"Arlington, TX",    t:"MEH",
   note:"Japan held Netherlands 2-2 in a thriller — the Giant Killers showed their quality. Sweden hammered Tunisia 5-1 in MD1. Both teams are in Group F contention, with their exact standings depending on today's (Jun 20) Netherlands vs. Sweden result. Japan vs. Sweden could be crucial for both teams' knockout hopes."},
  {dt:"Jun 25",fd:true,tm:"7:00 PM", gr:"F",h:"Tunisia",     hf:"🇹🇳",a:"Netherlands", af:"🇳🇱",v:"Kansas City, MO",  t:"GOOD",
   note:"Netherlands need to close out Group F. They drew 2-2 with Japan and face Sweden today (Jun 20) — if they win that, they're likely through. Tunisia were thrashed 5-1 by Sweden and are fighting for survival. Watch the Dutch attacking flair and Van Dijk's command close out the group."},
  {dt:"Jun 25",fd:true,tm:"10:00 PM",gr:"D",h:"Türkiye",     hf:"🇹🇷",a:"USA",         af:"🇺🇸",v:"Inglewood, CA",    t:"MUST",usa:true,
   note:"🇺🇸 USA have already clinched Group D and the knockout rounds — consecutive World Cup wins for the first time since 1930. Türkiye are eliminated after losing to both Australia and Paraguay. Still worth watching for US fans to see the team close out the group. With nothing to lose, Türkiye may play freely — this might not be the walkover it appears."},
  {dt:"Jun 25",fd:true,tm:"10:00 PM",gr:"D",h:"Paraguay",    hf:"🇵🇾",a:"Australia",   af:"🇦🇺",v:"Santa Clara, CA",  t:"MEH",
   note:"Paraguay and Australia are both on 3 points fighting for 2nd place behind the USA. Paraguay beat Türkiye in MD2; Australia beat Türkiye 2-0 in MD1. Whoever wins this takes the second knockout spot in Group D — a genuine second-place decider potentially worth watching over the USA consolation game."},
  {dt:"Jun 26",fd:true,tm:"3:00 PM", gr:"I",h:"Norway",      hf:"🇳🇴",a:"France",      af:"🇫🇷",v:"Foxborough, MA",   t:"MUST",
   note:"🔥 Haaland vs. Mbappe. Norway were electric — 4-1 vs Iraq with Haaland announcing himself on the biggest stage. France were masterful — 3-1 vs Senegal. Both teams will arrive here likely on 6 points after MD2. Two of the world's greatest strikers in the Group I decider. One of the standout fixtures of the entire tournament."},
  {dt:"Jun 26",fd:true,tm:"3:00 PM", gr:"I",h:"Senegal",     hf:"🇸🇳",a:"Iraq",        af:"🇮🇶",v:"Toronto, ON",      t:"SKIP",
   note:"Senegal lost to France and Iraq lost to Norway in MD1 — both fighting for a third-place qualification spot. The Group I headline act is in Foxborough: watch Norway vs. France instead."},
  {dt:"Jun 26",fd:true,tm:"8:00 PM", gr:"H",h:"Cape Verde",  hf:"🇨🇻",a:"Saudi Arabia",af:"🇸🇦",v:"Houston, TX",      t:"SKIP",
   note:"Cape Verde held Spain 0-0 (major shock) and Saudi Arabia drew with Uruguay — both are still alive! But the Group H headline is in Zapopan: watch Uruguay vs. Spain for the higher-quality, higher-stakes clash."},
  {dt:"Jun 26",fd:true,tm:"8:00 PM", gr:"H",h:"Uruguay",     hf:"🇺🇾",a:"Spain",       af:"🇪🇸",v:"Zapopan, MX",      t:"MUST",
   note:"🔥 ELEVATED STAKES. Spain were held to a humiliating 0-0 draw by Cape Verde — they are vulnerable. Uruguay drew with Saudi Arabia. All four Group H teams are level on one point heading into the final matchday. This isn't just two World Cup winners going head-to-head — it's a desperate survival battle. Spain under maximum pressure vs. Uruguay's physicality and cunning. One of the group stage's most compelling finales."},
  {dt:"Jun 26",fd:true,tm:"11:00 PM",gr:"G",h:"Egypt",       hf:"🇪🇬",a:"Iran",        af:"🇮🇷",v:"Seattle, WA",      t:"SKIP",
   note:"All four Group G teams drew in MD1. By the final matchday, Egypt and Iran's standings depend on their MD2 results (vs Belgium and New Zealand). Still a very late ET kickoff — check the score, save the energy."},
  {dt:"Jun 26",fd:true,tm:"11:00 PM",gr:"G",h:"New Zealand", hf:"🇳🇿",a:"Belgium",     af:"🇧🇪",v:"Vancouver, BC",    t:"MEH",
   note:"Belgium's Golden Generation — who drew 1-1 with Egypt in MD1 — needs to perform here. New Zealand drew 2-2 with Iran and showed they can score. Group G's complete MD1 stalemate means every game matters. Belgium must win to keep realistic knockout hopes; New Zealand have nothing to lose. Very late kickoff is the main barrier."},
  {dt:"Jun 27",fd:true,tm:"5:00 PM", gr:"L",h:"Panama",      hf:"🇵🇦",a:"England",     af:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",v:"East Rutherford, NJ",t:"GOOD",
   note:"England have already advanced after a brilliant 4-2 win over Croatia. Panama are likely fighting for survival. England fans travel in enormous numbers — the MetLife atmosphere will be incredible regardless. This is England in strong form closing out the group, potentially resting key players."},
  {dt:"Jun 27",fd:true,tm:"5:00 PM", gr:"L",h:"Croatia",     hf:"🇭🇷",a:"Ghana",       af:"🇬🇭",v:"Philadelphia, PA", t:"GOOD",
   note:"Croatia lost 2-4 to England and MUST win to keep knockout hopes alive. Modric, Gvardiol, Kovacic — tournament legends who led the 2018 and 2022 miracle runs. Modric's final World Cup may be on the line here. Never count Croatia out under pressure — this could be a last hurrah for one of the tournament's greatest tacticians."},
  {dt:"Jun 27",fd:true,tm:"7:30 PM", gr:"K",h:"Colombia",    hf:"🇨🇴",a:"Portugal",    af:"🇵🇹",v:"Miami Gardens, FL",t:"MUST",
   note:"🔥 Group K decider. Portugal were SHOCKED to a 1-1 draw by DR Congo in MD1, creating what ESPN called 'a Ronaldo problem.' Colombia are in electric form after a 3-1 win over Uzbekistan. An under-pressure Ronaldo facing one of the tournament's most exciting attacking sides — narratively and competitively one of the group stage's greatest final-day clashes."},
  {dt:"Jun 27",fd:true,tm:"7:30 PM", gr:"K",h:"DR Congo",    hf:"🇨🇩",a:"Uzbekistan",  af:"🇺🇿",v:"Atlanta, GA",     t:"SKIP",
   note:"DR Congo earned a historic first-ever World Cup point against Portugal (1-1) — a remarkable milestone. Uzbekistan lost to Colombia. Watch Colombia vs. Portugal in this slot for the Group K headline act."},
  {dt:"Jun 27",fd:true,tm:"10:00 PM",gr:"J",h:"Algeria",     hf:"🇩🇿",a:"Austria",     af:"🇦🇹",v:"Kansas City, MO", t:"SKIP",
   note:"Algeria lost 0-3 to Argentina. Austria were impressive with a 3-1 win over Jordan. If Austria won their MD2 vs Argentina, this may decide 2nd place in Group J. Watch Jordan vs. Argentina in this slot — the Messi game commands the attention."},
  {dt:"Jun 27",fd:true,tm:"10:00 PM",gr:"J",h:"Jordan",      hf:"🇯🇴",a:"Argentina",   af:"🇦🇷",v:"Arlington, TX",   t:"MUST",
   note:"Argentina dominated Algeria 3-0 in MD1 and face Austria in MD2 (Jun 22). If Argentina win there too, this is Messi closing out the group stage in champion fashion. If Austria surprised them, Group J gets dramatic. Either way, Messi at a World Cup is unmissable — the perfect, fitting end to the 2026 group stage."},
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
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const todayStr = `${months[new Date().getMonth()]} ${new Date().getDate()}`;
  const defaultDate = DATES.includes(todayStr) ? todayStr : DATES[0];
  const [date, setDate] = useState(defaultDate);
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
