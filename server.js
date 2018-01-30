const express = require('express');
const moment = require('moment');     //https://momentjs.com/docs/#/parsing/string-formats/  - moment doc

const app = express();

app.use(express.static('views'));
app.get('/datevalues/:dateVal',function(req, res){

	var dtval = req.params.dateVal;
	if(isNaN(dtval))
	{ 
      var timestamp = null;
	  var naturaldate = null;                            // for long month(word), moment code is MMMM (4 M)
     if(moment(dtval, ["MMMM DD,YYYY","MMMM DD YYYY","MMMM DD, YYYY"],true).isValid()) // check validity of date
	 {
	      naturaldate = new Date(dtval);
	      timestamp = naturaldate.getTime()/1000;
	      naturaldate = moment(naturaldate).format("MMMM DD, YYYY");    // convert date from ISO format 
	 }
	  res.json({unix: timestamp, natural: naturaldate});
	}
	else{
		var timestamp = null;
	    var naturaldate = null;
	    if(dtval.toString().length <= 10)
		{
		 var naturaldate = new Date(dtval * 1000);
		 naturaldate = moment(naturaldate, moment.ISO_8601).format("MMMM DD, YYYY");
		 res.json({unix: dtval, natural: naturaldate});
		}
		res.json({unix: timestamp, natural: naturaldate});
	}
});

app.listen(process.env.PORT || 3000);