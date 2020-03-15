var ncp = require('ncp').ncp;
 
ncp.limit = 16;
 
ncp("C:/Users/Inoor/Desktop/InStoGram/front/build", "C:/Users/Inoor/Desktop/InStoGram/client", function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('done!');
});