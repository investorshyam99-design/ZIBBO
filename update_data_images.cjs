const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

const productVideos = {
  'PLANETARIUM GALAXY PROJECTOR': 'https://cdn-cf-east.streamable.com/video/mp4/q06ssn.mp4?Expires=1784418824279&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=m1uu9nmG94cha3Og6gMlh1GaAhRNg0OEk6eMw~fCeM2IqXJpyAh0QOcS-KpIl1Ba2IA4dfBKCgXSxEa86ZKz82KGPiqr9MLeagTjjeFN~T4lHzI-ZI4yc1uhBPG9oQ~1MLcSHN6rnLFxyOl8hZysuwgM1KCTzqMol9kY-NlfevZIaGJclXt8F8XcMp-3nN4JhJoLz9JMWjJrTUmQdPTU1Lk8unaWrEfvN8UXqNYD5k1upO9vmDC8Krp-VSfSKeNYgOLZWxhn7JrO3-QuEbEeZx9HcorUIQ4cRspXhydB8mN-21udOPRe8c6QbYDXy-P2Y3-VPo1iT1~h59jTUoof4w__',
  'UNBREAKABLE FIGHTER PLANE': 'https://cdn-cf-east.streamable.com/video/mp4/vus5jg.mp4?Expires=1784419026377&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=i~tp6850TrVjJXtYaZoSKHzX8-J0EiIjlWh9hbWb2QPtJuIiGSgRKWtjmV9S5mVOD9oXlIU0TM4xFZ2BoZfmocJZ7wTbaciYp6q4axxi5BQ~dka8iS49eZJHy3ZfCEH1BPG8qrz2J8Qdi7kzoJxy9RHhN61zu9gJ~8f34400D9h7Mq9g7Z6YrNEXwKLL~Mj6gTvkSCmbETWbJT4sKdKbA3K7GLBv8-e0a7Nl~iUBfIffLqmmt2Lc7WsYsOpTnxcJ~71Kfrs5-o5MN8K4HjvujDHPKD51gTwT9kZnZSXZoEp0uyX~Dnv6EMZOPV~t9PK0wNgzxbJ~9f3FvgFHTiWvZA__',
  'MOTION SENSOR RC CAR': 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  'MINI LED ANDROID PROJECTOR': 'https://www.w3schools.com/html/mov_bbb.mp4',
  'CRASH CLASH RC BATTLE CARS 2 PLAYERS': 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
};

for (const [name, video] of Object.entries(productVideos)) {
  const nameRegex = new RegExp(\`name: '\${name}',\\n\\s*price: [0-9]+,\\n\\s*(?:originalPrice: [0-9]+,\\n\\s*)?rating: [0-9.]+,\\n\\s*reviews: [0-9]+,\\n\\s*image: '([^']+)',\`);
  
  const match = code.match(nameRegex);
  if (match) {
    const imageUrl = match[1];
    const newReplacement = \`images: ['\${imageUrl}', '\${video}'],\\n    \` + match[0];
    
    // Check if images is already added to avoid double adding
    if (!code.includes(\`name: '\${name}'\`) || !code.includes(\`images: ['\${imageUrl}'\`)) {
        // Find exact match string to replace
        const matchStr = match[0];
        const newStr = matchStr + \`\\n    images: ['\${imageUrl}', '\${video}'],\`;
        code = code.replace(matchStr, newStr);
    }
  }
}

fs.writeFileSync('src/data.ts', code);
