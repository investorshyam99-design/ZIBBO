const fs = require('fs');
let code = fs.readFileSync('src/components/ShopTheLook.tsx', 'utf8');

const regex = /<video[\s\S]*?className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"\s*\/>/;

const newVideo = `<video 
                   src={
                     product.name.toLowerCase().includes('planetarium') ? 'https://cdn-cf-east.streamable.com/video/mp4/q06ssn.mp4?Expires=1784418824279&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=m1uu9nmG94cha3Og6gMlh1GaAhRNg0OEk6eMw~fCeM2IqXJpyAh0QOcS-KpIl1Ba2IA4dfBKCgXSxEa86ZKz82KGPiqr9MLeagTjjeFN~T4lHzI-ZI4yc1uhBPG9oQ~1MLcSHN6rnLFxyOl8hZysuwgM1KCTzqMol9kY-NlfevZIaGJclXt8F8XcMp-3nN4JhJoLz9JMWjJrTUmQdPTU1Lk8unaWrEfvN8UXqNYD5k1upO9vmDC8Krp-VSfSKeNYgOLZWxhn7JrO3-QuEbEeZx9HcorUIQ4cRspXhydB8mN-21udOPRe8c6QbYDXy-P2Y3-VPo1iT1~h59jTUoof4w__' : 
                     product.name.toLowerCase().includes('fighter') ? 'https://cdn-cf-east.streamable.com/video/mp4/vus5jg.mp4?Expires=1784419026377&Key-Pair-Id=APKAIEYUVEN4EVB2OKEQ&Signature=i~tp6850TrVjJXtYaZoSKHzX8-J0EiIjlWh9hbWb2QPtJuIiGSgRKWtjmV9S5mVOD9oXlIU0TM4xFZ2BoZfmocJZ7wTbaciYp6q4axxi5BQ~dka8iS49eZJHy3ZfCEH1BPG8qrz2J8Qdi7kzoJxy9RHhN61zu9gJ~8f34400D9h7Mq9g7Z6YrNEXwKLL~Mj6gTvkSCmbETWbJT4sKdKbA3K7GLBv8-e0a7Nl~iUBfIffLqmmt2Lc7WsYsOpTnxcJ~71Kfrs5-o5MN8K4HjvujDHPKD51gTwT9kZnZSXZoEp0uyX~Dnv6EMZOPV~t9PK0wNgzxbJ~9f3FvgFHTiWvZA__' : 
                     videos[i % videos.length]
                   }
                   autoPlay 
                   loop 
                   muted 
                   playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />`;

if(regex.test(code)) {
    code = code.replace(regex, newVideo);
    fs.writeFileSync('src/components/ShopTheLook.tsx', code);
    console.log("Success");
} else {
    console.log("Regex didn't match");
}
