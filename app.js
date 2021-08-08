require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const maria = require('./db/mariadb') 

app.use(morgan("short"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// 화면 engine을 ejs로 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

const db = require('./models');

db.sequelize.sync()
.then(()=> {
  console.log("테이블 생성!")
})
.catch(err => {
  console.log("테이블 생성 실패")
  console.log(err)
});



app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token'); //1
  next();
});

const YAML = require('yamljs')
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = YAML.load('./swagger.yaml');

var os = require('os');
var ifaces = os.networkInterfaces();

app.use('/docs/', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

var port = process.env.PORT || 2394;
var server = app.listen(port, function(){
  console.log("Express server has started on port " + port)
});

Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
  
    ifaces[ifname].forEach(function (iface) {
      if ('IPv4' !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
  
      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ':' + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        console.log(ifname, iface.address);
      }
      ++alias;
    });
});

app.use('/api/term', require('./routers/term'));
app.use('/api/notify', require('./routers/notify'));

app.use('/api/user', require('./routers/user'));
app.use('/api/noun', require('./routers/noun'));
app.use('/api/writingSubject', require('./routers/writing_subject'));
app.use('/api/writingApplicate', require('./routers/writing_applicate'));
app.use('/api/applicateReply', require('./routers/writing_reply'));
