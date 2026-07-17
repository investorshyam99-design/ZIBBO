const fs = require('fs');
let code = fs.readFileSync('src/data.ts', 'utf8');

// We want to replace the first 5 products with the ones requested
// 1 PLANETARIUM GALAXY PROJECTOR
// 2 UNBREAKABLE FIGHTER PLANE
// 3 MOTION SENSOR RC CAR
// 4 MINI LED ANDROID PROJECTOR
// 5 CRASH CLASH RC BATTLE CARS 2 PLAYERS

code = code.replace(/name: 'Nebula Pro Galaxy Projector',/g, "name: 'PLANETARIUM GALAXY PROJECTOR',");
code = code.replace(/name: 'Levitating Smart Moon Lamp',/g, "name: 'UNBREAKABLE FIGHTER PLANE',");
code = code.replace(/name: 'Aura Sync Ambient Light Bar',/g, "name: 'MOTION SENSOR RC CAR',");
code = code.replace(/name: 'Gravity Defying Water Drops',/g, "name: 'MINI LED ANDROID PROJECTOR',");
code = code.replace(/name: 'Kinetic Sand Art Table',/g, "name: 'CRASH CLASH RC BATTLE CARS 2 PLAYERS',");

fs.writeFileSync('src/data.ts', code);
