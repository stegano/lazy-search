var LazySearch = require("../src/index");
var lazySearch = new LazySearch();
var billboard = [
  "Despacito - Luis Fonsi &amp; Daddy Yankee Featuring Justin Bieber",
  "Wild Thoughts - DJ Khaled Featuring Rihanna &amp; Bryson Tiller",
  "Bodak Yellow (Money Moves) - Cardi B",
  "Unforgettable - French Montana Featuring Swae Lee",
  "Believer - Imagine Dragons",
  "Attention - Charlie Puth",
  "There's Nothing Holdin' Me Back - Shawn Mendes",
  "That's What I Like - Bruno Mars",
  "Shape Of You - Ed Sheeran",
  "Body Like A Back Road - Sam Hunt",
  "I'm The One - DJ Khaled Featuring Justin Bieber, Quavo, Chance The Rapper &amp; Lil Wayne",
  "Bank Account - 21 Savage",
  "Strip That Down - Liam Payne Featuring Quavo",
  "Congratulations - Post Malone Featuring Quavo",
  "Slow Hands - Niall Horan",
  "Redbone - Childish Gambino",
  "Humble. - Kendrick Lamar",
  "XO TOUR Llif3 - Lil Uzi Vert",
  "Something Just Like This - The Chainsmokers &amp; Coldplay",
  "Feels - Calvin Harris Featuring Pharrell Williams, Katy Perry &amp; Big Sean",
  "Mi Gente - J Balvin &amp; Willy William",
  "Praying - Kesha",
  "Stay - Zedd &amp; Alessia Cara",
  "Rake It Up - Yo Gotti Featuring Nicki Minaj",
  "Sorry Not Sorry - Demi Lovato",
  "Feel It Still - Portugal. The Man",
  "Location - Khalid",
  "Mask Off - Future",
  "What About Us - P!nk",
  "Say You Won't Let Go - James Arthur",
  "Loyalty. - Kendrick Lamar Featuring Rihanna",
  "Now Or Never - Halsey",
  "Versace On The Floor - Bruno Mars",
  "It Ain't Me - Kygo x Selena Gomez",
  "Love Galore - SZA Featuring Travis Scott",
  "Magnolia - Playboi Carti",
  "1-800-273-8255 - Logic Featuring Alessia Cara &amp; Khalid",
  "Small Town Boy - Dustin Lynch",
  "Castle On The Hill - Ed Sheeran",
  "Everyday We Lit - YFN Lucci Featuring PnB Rock",
  "Drowning - A Boogie Wit da Hoodie Featuring Kodak Black",
  "Silence - Marshmello Featuring Khalid",
  "No Promises - Cheat Codes Featuring Demi Lovato",
  "What Ifs - Kane Brown Featuring Lauren Alaina",
  "In Case You Didn't Know - Brett Young",
  "Slippery - Migos Featuring Gucci Mane",
  "It's A Vibe - 2 Chainz Featuring Ty Dolla $ign, Trey Songz &amp; Jhene Aiko",
  "Fetish - Selena Gomez Featuring Gucci Mane",
  "Young Dumb &amp; Broke - Khalid",
  "No Such Thing As A Broken Heart - Old Dominion",
  "Drinkin' Problem - Midland",
  "The Race - Tay-K",
  "Felices Los 4 - Maluma",
  "Crew - GoldLink Featuring Brent Faiyaz &amp; Shy Glizzy",
  "Heartache On The Dance Floor - Jon Pardi",
  "Back To You - Louis Tomlinson Featuring Bebe Rexha &amp; Digital Farm Animals",
  "Thunder - Imagine Dragons",
  "Butterfly Effect - Travis Scott",
  "Somebody Else Will - Justin Moore",
  "Craving You - Thomas Rhett Featuring Maren Morris",
  "Whatever You Need -  Meek Mill Featuring Chris Brown &amp; Ty Dolla $ign",
  "Do I Make You Wanna - Billy Currington",
  "Do Re Mi - Blackbear",
  "2U - David Guetta Featuring Justin Bieber",
  "You Look Good - Lady Antebellum",
  "DNA. - Kendrick Lamar",
  "Most Girls - Hailee Steinfeld",
  "When It Rains It Pours - Luke Combs",
  "Escapate Conmigo - Wisin Featuring Ozuna",
  "Love. - Kendrick Lamar Featuring Zacari",
  "Glorious - Macklemore Featuring Skylar Grey",
  "My Girl - Dylan Scott",
  "Unforgettable - Thomas Rhett",
  "Flatliner - Cole Swindell",
  "The Weekend - SZA",
  "Reminder - The Weeknd",
  "Honest - The Chainsmokers",
  "Malibu - Miley Cyrus",
  "It Ain't My Fault - Brothers Osborne",
  "All The Pretty Girls - Kenny Chesney",
  "New Rules - Dua Lipa",
  "They Don't Know - Jason Aldean",
  "Bad Liar - Selena Gomez",
  "First Day Out - Tee Grizzley",
  "Every Little Thing - Carly Pearce",
  "Patty Cake - Kodak Black",
  "Wish I Knew You - The Revivalists",
  "More Girls Like You -  Kip Moore",
  "B.E.D. - Jacquees",
  "4 AM - 2 Chainz Featuring Travis Scott",
  "Privacy - Chris Brown",
  "Something New - Wiz Khalifa Featuring Ty Dolla $ign",
  "Perplexing Pegasus - Rae Sremmurd",
  "For Her - Chris Lane",
  "Untouchable - YoungBoy Never Broke Again",
  "It's Goin' Down - Descendants 2 Cast",
  "I Could Use A Love Song - Maren Morris",
  "Fix A Drink - Chris Janson",
  "El Amante - Nicky Jam",
  "Wokeuplikethis* - Playboi Carti Featuring Lil Uzi Vert"];

function renderList(listData) {
  var resultEl = document.querySelector("#result");
  var htmlStr = [];
  for (var i = 0; i < listData.length; i++) {
    htmlStr.push(`<li>${listData[i]}</li>`);
  }
  resultEl.innerHTML = htmlStr.join("");
}

function highlight(plainText, charInfo) {
  var ret = plainText.split("");
  var rawData = charInfo._rawData;
  for (var index, rawDataItem, i = 0; i < rawData.length; i++) {
    rawDataItem = rawData[i];
    index = rawDataItem.index;
    if (index <= ret.length) {
      ret[index] = "<em>" + ret[index] + "</em>";
    } else {
      break;
    }
  }
  return ret.join("");
}

document.querySelector("#search").addEventListener("keyup", function () {
  var keyword = this.value;
  var ret = [];
  if (!keyword) {
    ret = billboard;
  } else {
    for (var billboardItem, searchResult, i = 0; i < billboard.length; i++) {
      billboardItem = billboard[i];
      searchResult = lazySearch.find(billboardItem, keyword);
      if (searchResult.length > 0) {
        ret.push(
          highlight(billboardItem, searchResult[0])
        );
      }
    }
  }
  renderList(ret);
});

renderList(billboard);
