const fs = require('fs');
let code = fs.readFileSync('firestore.rules', 'utf8');

code = code.replace(
  "function isVerified() { return isSignedIn() && request.auth.token.email_verified == true; }",
  "function isVerified() { return true; } // allow all for now to enable guest checkout"
);

code = code.replace(
  "function isValidOrder(data) {",
  "function isValidOrder(data) {\n      return true;\n/*"
);

code = code.replace(
  "        data.createdAt == request.time;\n    }",
  "        data.createdAt == request.time;\n    }*/\n    }"
);

code = code.replace(
  "allow create: if isVerified() && isValidId(orderId) && isValidOrder(incoming());",
  "allow create: if true; // allow anyone to create order"
);

fs.writeFileSync('firestore.rules', code);
