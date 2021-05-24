var http = require("https");

var options = {
  "method": "GET",
  "hostname": "cdn-api.co-vin.in",
  "port": null,
  "path": "/api/v2/appointment/sessions/public/calendarByDistrict?district_id=504&date=24-05-2021",
  "headers": {
    "cache-control": "no-cache"
  },
  rejectUnauthorized: false,//add when working with https sites
  requestCert: false,//add when working with https sites
  agent: false//add when working with https sites
};

let countPrint = 0
setInterval(function()  {
  try {
    countPrint++;
    var req = http.request(options, function (res) {
      var chunks = [];
      
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function () {
        var body = Buffer.concat(chunks);
        let reqRes = JSON.parse(body);
        let centers = reqRes.centers
        console.log(countPrint + ". Printing\n");
        for(const sessions of centers)  {
          if  (sessions.sessions[0].available_capacity_dose1 > 0) {
            console.log('\u0007');
            break;
          }
        }
      });
    });

    req.end();
  } catch (error) {
    console.log("error");
  }
},3006);
