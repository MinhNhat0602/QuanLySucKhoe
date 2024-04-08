//Sử dụng Framework Express 
const express = require("express")
const app = express()
//Cổng lắng nghe
const port = 1234;
//Tạo biến google lấy dữ liệu từ googleapis
const { google } = require("googleapis");
//module gửi yêu cầu HTTP và xử lý các phản hồi từ máy chủ
const request = require("request");
//import cort vào cho phép tương tác giữa các trang web or nguồn tài nguyên từ các domain khác nhau
const cors = require("cors");
//phân tích URL
const urlParse = require("url-parse");
// phân tích và xử lý các chuỗi query parameters của URL 
const queryParse = require("query-string");
const bodyParser = require("body-parser");
const axios = require("axios");
// Module oauth2 này cung cấp các phương thức để tương tác với Google OAuth2 API
//đặc biệt là để xác thực và quản lý quyền truy cập OAuth 2.0.
const { oauth2 } = require("googleapis/build/src/apis/oauth2");
const { response } = require("express");
//một thư viện giúp gửi email từ máy chủ Node.js của bạn.
var nodemailer = require('nodemailer');
//xử lý dữ liệu đa phương tiện
const multer = require('multer');
//Bot telegram
const TelegramBot = require('node-telegram-bot-api');
const token = '6772120862:AAESMVkwrGRWW2OyKupw9Kq6c0dWe4Dwff8';
const bot = new TelegramBot(token, {polling: true});
//làm việc với đường dẫn tệp và thư mục
const path = require('path')
//Chuyển đổi dữ liệu JSON thành JavaScrip
app.use(express.json()) // for parsing application/json
//Chuyển dữ liệu dạng form thành JavaScrip
app.use(express.urlencoded({ extended: true }))

//KẾT NỐI TỚI MYSQL
var mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'quanlysuckhoe'
});

//Định cấu hình multer để xử lý tải lên file và lưu trữ chúng
//trong một thư mục cụ thể trên máy chủ
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage })

//Uphinh

app.get('/upload', (req, res) => {

  res.render('upload');

})
app.post('/upload', upload.single('image'), async (req, res) => {

  image = req.file;
  image2 = req.body.image;
  console.log(image);
  console.log(image.path);
})

var session = require('express-session');
const { connect } = require("http2");
const { error } = require("console");
app.use(session({
  secret: 'abcdefg',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
}));

//Bot Telegram
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Chào bạn! Đây là bot thông báo về sức khoẻ của bạn");
});

bot.onText(/\/send_notification/, (msg) => {
  const chatId = msg.chat.id;

  const query = 'SELECT * FROM chisosuckhoe';
  connection.query(query, (error, results, fields) => {
    if(error){
      console.error('Lỗi truy vấn cơ sở dữ liệu', error);
      bot.sendMessage(chatId, "Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu");
      return;
    }

    else if(results.length > 0){
      const healthData = results[0];
      const message = 'Thông báo sức khoẻ mới nhất: \n\nNhịp tim: ${chisosuckhoe.NhipTim bpm\nSpO2: ${chisosuckhoe.SpO2} \nHuyết áp tâm trương: ${chisosuckhoe.HATTRUONG} \nHuyết áp tâm thu: ${chisosuckhoe.HATThu}}'

      bot.sendMessage(chatId, message);
    }else{
      bot.sendMessage(chatId,'Không có dữ liệu sức khoẻ');
    }
  });
  // const message = 'Chỉ số sức khoẻ của bạn bình thường';
  // bot.sendMessage(chatId, message);
});

//Thêm Bệnh Nhân
app.get('/themBenhNhan', (req, res) => {
  res.render('themBenhNhan', { un: req.session.username })
})
app.post('/themBenhNhan', upload.single('Image'), (req, res) => {
  console.log(req.body);
  let image = req.file.filename;
  req.body.Avatar = image;
  console.log(req.body.ReToKen);
  db.query("insert into benhnhan SET ? ", req.body, function (err, data) {
    if (err) throw err;
    let u = req.body.MaBenhNhan;
    let p = req.body.MaBenhNhan;
    let q = 3;

    const bcrypt = require("bcrypt");
    var salt = bcrypt.genSaltSync(10);
    var pass_mahoa = bcrypt.hashSync(p, salt);


    let user_info = { TenDangNhap: u, MatKhau: pass_mahoa, Quyen: q };
    let sql = 'INSERT INTO nguoidung SET ?';
    db.query(sql, user_info);
    res.redirect('/benhnhan')
  });
})

//Thêm bác sĩ
app.get('/thembacsi', (req, res) => {
  res.render('thembacsi', { un: req.session.username })
})
app.post('/thembacsi', (req, res) => {
  console.log(req.body);
  db.query("insert into bacsi SET ? ", req.body, function (err, data) {
    if (err) throw err;
    let u = req.body.MaBacSi;
    let p = req.body.MaBacSi;
    let q = 2;

    const bcrypt = require("bcrypt");
    var salt = bcrypt.genSaltSync(10);
    var pass_mahoa = bcrypt.hashSync(p, salt);


    let user_info = { TenDangNhap: u, MatKhau: pass_mahoa, Quyen: q };
    let sql = 'INSERT INTO nguoidung SET ?';
    db.query(sql, user_info);
    res.redirect('/bacsi')
  });
})

//Bác Sĩ
app.get('/bacsi', (req, res) => {
  let sql = `SELECT * FROM bacsi`;

  db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
    if (err) throw err;
    res.render('bacsi', { listbacsi: data, un: req.session.username }); //nạp view và truyền dữ liệu cho view
  });
})

//Tim kiếm bs
// app.get('/timkiembacsi', (req, res) => {
//   let sql = `SELECT * FROM bacsi`;

//   db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
//     if (err) throw err;
//     let text = req.query.text;
//     let data = sql.filter(function(item) {
//       return item.text === text;
//     }) ;
//     res.render('bacsi', {sql: data }); //nạp view và truyền dữ liệu cho view
//   });
// })

//Xem bác sĩ
app.get('/xembacsi', async (req, res) => {
  var mabacsi = req.query['mabacsi'];
  let sql = `SELECT * FROM bacsi WHERE MaBacSi='` + mabacsi + `'`;
  console.log(sql);
  db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
    if (err) throw err;
    console.log(data[0].NgaySinh.getFullYear());
    var yyyy = data[0].NgaySinh.getFullYear();
    var dd = data[0].NgaySinh.getDate();
    var mm = data[0].NgaySinh.getMonth() + 1;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;
    console.log(data);
    console.log(data[0]);
    res.render('xembacsi', { bacsi: data[0], un: req.session.username, sinh: formattedToday }); //nạp view và truyền dữ liệu cho view
  });

})

//Sửa bác sĩ
app.get('/suabacsi', async (req, res) => {
  var mabacsi = req.query['mabacsi'];
  let sql = `SELECT * FROM bacsi WHERE MaBacSi='` + mabacsi + `'`;
  console.log(sql);

  db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
    if (err) throw err;
    console.log(data[0].NgaySinh.getFullYear());
    var yyyy = data[0].NgaySinh.getFullYear();
    var dd = data[0].NgaySinh.getDate();
    var mm = data[0].NgaySinh.getMonth() + 1;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = yyyy + "-" + mm + "-" + dd;
    console.log(formattedToday);
    res.render('suabacsi', { bacsi: data[0], un: req.session.username, sinh: formattedToday }); //nạp view và truyền dữ liệu cho view
  });

})

app.post('/suabacsi', (req, res) => {
  //console.log(req.body.MaBacSi);
  var mabacsi = req.body.MaBacSi;
  db.query("update bacsi SET ? where MaBacSi=?", [req.body, mabacsi], function (err, data) {
    if (err) throw err;
  });
  res.redirect('/bacsi');
})

//Xóa bác sĩ
app.get('/xoabacsi', async (req, res) => {
  var mabacsi = req.query['mabacsi'];
  let sql = `DELETE FROM bacsi WHERE MaBacSi='` + mabacsi + `'`;
  console.log(sql);
  db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
    if (err) throw err

    res.redirect('/bacsi')
  });

})

//Bản đồ
// app.get("/bando", (req, res) => {
//   let sql = 'SELECT Lat, Long FROM vitri_benhnhan WHERE vitri_benhnhan.Id_BenhNhan=benhnhan.MaBenhNhan';
//   db.query(sql, function (err, data) {
//       if(err) throw err;

//       res.render('bando', { listvitri: data, un: req.session.username })
//   });
// });

//Người dùng
app.get('/nguoidung', (req, res) => {
  let sql = `SELECT * FROM nguoidung`;

  db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
    if (err) throw err;
    res.render('nguoidung', { listnguoidung: data, un: req.session.username }); //nạp view và truyền dữ liệu cho view
  });
})

//Thêm người dùng
app.get('/themnguoidung', (req, res) => {
  res.render('themnguoidung', { un: req.session.username })
})
app.post('/themnguoidung', (req, res) => {
  let u = req.body.username;
  let p = req.body.password;
  let q = req.body.quyen;

  const bcrypt = require("bcrypt");
  var salt = bcrypt.genSaltSync(10);
  var pass_mahoa = bcrypt.hashSync(p, salt);


  let user_info = { TenDangNhap: u, MatKhau: pass_mahoa, Quyen: q };
  let sql = 'INSERT INTO nguoidung SET ?';
  db.query(sql, user_info);
  res.redirect("/nguoidung");
})

//Bệnh án
app.get('/benhan', (req, res) => {
  let sql = `SELECT * FROM benhan, benhnhan WHERE benhan.Id_BenhNhan=benhnhan.MaBenhNhan`;

  db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
    if (err) throw err;
    // const ngaynhapvien = data[0].NgayNhapVien.toISOString();
    // const ngaytao = format(data[0].NgayTao, 'YYYY-MM-DD');
    res.render('benhan', { listbenhan: data, un: req.session.username }); //nạp view và truyền dữ liệu cho view
  });
})

//Thêm bệnh án
app.get('/thembenhan', (req, res) => {
  res.render('thembenhan', { un: req.session.username })
})

app.post('/thembenhan', (req, res) => {
  let id = req.body.Id;
  let mbn = req.body.Id_BenhNhan;
  let dd = req.body.DuongDan;
  let tbv = req.body.TenBenhVien;
  let nnv = req.body.NgayNhapVien;


  let benhan_info = { Id: id, Id_BenhNhan: mbn, DuongDan: dd, TenBenhVien: tbv, NgayNhapViien: nnv };
  let sql = 'INSERT INTO benhan SET ?';
  db.query(sql, benhan_info);
  res.redirect("/benhan");
})

//Xóa bệnh án
app.get('/xoabenhan', async (req, res) => {
  var id = req.query['id'];
  let sql = `DELETE FROM benhan WHERE Id='` + id + `'`;
  console.log(sql);
  db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
    if (err) throw err

    res.redirect('/benhan')
  });

})

//Sửa bệnh án
app.get('/suabenhan', async (req, res) => {
  var id = req.query['id'];
  var id_benhnhan = req.query['id_benhnhan'];
  let sql = `SELECT * FROM benhan WHERE Id='` + id + `'`;

  db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
    if (err) throw err;

    res.render('suabenhan', { benhan: data[0], un: req.session.username }); //nạp view và truyền dữ liệu cho view
  });

})

app.post('/suabenhan', (req, res) => {
  var id = req.body.Id;
  var id_benhnhan = req.body.Id_BenhNhan;
  db.query("update benhan SET Id_BenhNhan= ? where Id=?", [id_benhnhan, id], function (err, data) {
    if (err) throw err;
  });
  res.redirect('/benhan');
})


//Lịch khám
app.get('/lichkham', (req, res) => {
  let sql = `SELECT * 
  FROM lichkham
  INNER JOIN benhnhan ON lichkham.Id_BenhNhan = benhnhan.MaBenhNhan
  INNER JOIN bacsi ON lichkham.Id_BacSi = bacsi.MaBacSi`;

  db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
    if (err) throw err;
    res.render('lichkham', { listlichkham: data, un: req.session.username }); //nạp view và truyền dữ liệu cho view
  });
})

//Thêm lịch khám
app.get('/themlichkham', (req, res) => {
  res.render('themlichkham', { un: req.session.username })
})
app.post('/themlichkham', (req, res) => {
  let id = req.body.Id;
  let idbn = req.body.Id_BenhNhan;
  let idbs = req.body.Id_BacSi;
  let nh = req.body.NgayHen;
  let tt = req.body.TrangThai;


  let lichkham_info = { Id: id, Id_BenhNhan: idbn, Id_BacSi: idbs, NgayHen: nh, TrangThai: tt };
  let sql = 'INSERT INTO lichkham SET ?';
  db.query(sql, lichkham_info);
  res.redirect("/lichkham");
})

//Xóa lịch khám
app.get('/xoalichkham', async (req, res) => {
  var id = req.query['id'];
  let sql = `DELETE FROM lichkham WHERE Id='` + id + `'`;
  console.log(sql);
  db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
    if (err) throw err

    res.redirect('/lichkham')
  });

})


//Phân công
app.get('/phancong', (req, res) => {
  let sql = `SELECT * FROM bacsi, benhnhan WHERE benhnhan.MaBacSi=bacsi.MaBacSi`;

  db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
    if (err) throw err;
    res.render('phancong', { listphancong: data, un: req.session.username }); //nạp view và truyền dữ liệu cho view
  });
})

//Sửa phân công
app.get('/suaphancong', async (req, res) => {
  var mabenhnhan = req.query['mabenhnhan'];
  var mabacsi = req.query['mabacsi'];
  let sql = `SELECT * FROM bacsi`;
  console.log(sql);

  db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
    if (err) throw err;

    res.render('suaphancong', { listbacsi: data, mabenhnhan: mabenhnhan, mabacsi: mabacsi, un: req.session.username }); //nạp view và truyền dữ liệu cho view
  });

})

app.post('/suaphancong', (req, res) => {
  //console.log(req.body.MaBacSi);
  var mabenhnhan = req.body.MaBenhNhan;
  var mabacsi = req.body.MaBacSi;
  db.query("update benhnhan SET MaBacSi= ? where MaBenhNhan=?", [mabacsi, mabenhnhan], function (err, data) {
    if (err) throw err;
  });
  res.redirect('/phancong');
})

//Bệnh Nhân
app.get('/benhnhan', (req, res) => {
  let sql = `SELECT * FROM benhnhan`;

  db.query(sql, async function (err, databenhnhan) { // biến data chứa kết quả truy vấn
    if (err) throw err;
    listNhiptim = [];
    listSpo2 = [];
    listTThu = [];
    listTTruong = [];
    listTinhtrang = [];
    for (let [index, benhnhan] of databenhnhan.entries()) {
      console.log('Bệnh nhân: ' + benhnhan.ReToken);
      let accessToken;
      var mabenhnhan = benhnhan.MaBenhNhan;
      var retoken = benhnhan.ReToken;
      let Nhiptim = 0;
      let HATamThu = 0;
      let HATamTruong = 0;
      let SpO2 = 0;
      let tuoi = 0;
      let tinhtrang = 'Bình thường';

      const today = Date.now();
      const last = Math.floor(today - 3000000);
      //console.log('trừ: '+Math.floor(today-300000));

      console.log(retoken);
      try {
        const result = await axios({
          method: "POST",
          "Content-Type": "application/json",
          url: `https://www.googleapis.com/oauth2/v4/token`,
          data: {
            grant_type: 'refresh_token',
            client_id: '537084105089-6i6rdnetaejkt9a0gltgu13k6gjjq2ol.apps.googleusercontent.com',
            client_secret: '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',
            refresh_token: retoken
          },
        });
        //console.log(result);
        accessToken = result.data.access_token
        console.log(accessToken);
      } catch (e) {
        console.log(e);
      }




      let BpmArray = [];
      try {
        const result = await axios({
          method: "POST",
          headers: {
            authorization: "Bearer " + accessToken
          },
          "Content-Type": "application/json",
          url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
          data: {
            aggregateBy: [{
              dataTypeName:
                "com.google.heart_rate.bpm",
            }],
            bucketByTime: { durationMillis: 300000 },
            startTimeMillis: last,
            endTimeMillis: today
          },
        });
        //console.log(result);
        BpmArray = result.data.bucket;
      } catch (e) {
        //console.log(e);
      }

      var tg;

      console.log('-------------Nhịp tim: ');
      try {
        for (const dataSet of BpmArray) {
          console.log(dataSet);
          for (const points of dataSet.dataset) {
            console.log(points);
            for (const sumary of points.point) {
              console.log(sumary.startTimeNanos);

              for (const value of sumary.value) {
                console.log(value.fpVal);
                Nhiptim = value.fpVal;
                continue;
              }
            }
          }
        }
      } catch (e) {
        console.log(e);
      }


      console.log("---------Huyết Áp---------------");

      let nHA;
      let HuyetApArray = [];
      try {
        const result = await axios({
          method: "POST",
          headers: {
            authorization: "Bearer " + accessToken
          },
          "Content-Type": "application/json",
          url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
          data: {
            aggregateBy: [{
              dataTypeName:
                "com.google.blood_pressure",
            }],
            bucketByTime: { durationMillis: 300000 },
            startTimeMillis: last,
            endTimeMillis: today
          },
        });
        //console.log(result);
        HuyetApArray = result.data.bucket;
      } catch (e) {
        //console.log(e);
      }

      try {
        for (const dataSet of HuyetApArray) {
          console.log(dataSet);
          for (const points of dataSet.dataset) {
            console.log(points);
            nHA = 0;
            for (const values of points.point) {
              console.log(values);
              for (const fpVal of values.value) {
                console.log(fpVal);
                if (nHA == 0)
                  HATamThu = fpVal.fpVal;
                if (nHA == 3)
                  HATamTruong = fpVal.fpVal
                console.log(nHA);
                console.log("Huyết áp hiện tại: " + HATamThu + " - " + HATamTruong);
                nHA++;
              }

            }
          }
        }
      } catch (e) {
        console.log(e);
      }

      console.log("---------SPO2---------------");
      let SPO2Array = [];
      try {
        const result = await axios({
          method: "POST",
          headers: {
            authorization: "Bearer " + accessToken
          },
          "Content-Type": "application/json",
          url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
          data: {
            aggregateBy: [{
              dataTypeName:
                "com.google.oxygen_saturation",
            }],
            bucketByTime: { durationMillis: 300000 },
            startTimeMillis: last,
            endTimeMillis: today
          },
        });
        //console.log(result);
        SPO2Array = result.data.bucket;
      } catch (e) {
        //console.log(e);
      }

      try {
        for (const dataSet of SPO2Array) {
          console.log(dataSet);
          for (const points of dataSet.dataset) {
            console.log(points);
            for (const values of points.point) {
              console.log("giá trị: ");
              console.log(values);
              for (const fpVal of values.value) {
                console.log(fpVal);
                if (fpVal.fpVal > 0)
                  SpO2 = fpVal.fpVal;
                continue;
              }

            }
          }
        }
      } catch (e) {
        console.log(e);
      }

      var yyyy = benhnhan.NgaySinh.getFullYear();
      const currentYear = new Date().getFullYear()
      tuoi = currentYear - yyyy;


      listNhiptim[index] = Nhiptim;
      listTThu[index] = HATamThu;
      listTTruong[index] = HATamTruong;
      listSpo2[index] = SpO2;
      //listTinhtrang[index]=tinhtrang;

      var spawn = require('child_process').spawn;

      var process = spawn('python', [
        './process.py',
        tuoi,
        benhnhan.CanNang,
        Nhiptim,
        SpO2,
        HATamTruong,
        HATamThu
      ]);
      process.stdout.on('data', function (data) {

        if (data < 1.0 && data > 0.5)
          listTinhtrang[index] = 'Bình thường';
        else
          listTinhtrang[index] = 'Bất thường';
        //console.log('Tình trạng: '+tinhtrang)

      });
      await new Promise((resolve) => {
        process.on('close', resolve)
      })
    }
    res.render('benhnhan', { listbenhnhan: databenhnhan, un: req.session.username, listNhiptim: listNhiptim, listTThu: listTThu, listTTruong: listTTruong, listSpo2: listSpo2, listTinhtrang: listTinhtrang }); //nạp view và truyền dữ liệu cho view
  });
})

//Xem thông tin bệnh nhân
app.get('/xem', async (req, res) => {
  let accessToken;
  var mabenhnhan = req.query['mabenhnhan'];
  console.log(mabenhnhan);
  var retoken = req.query['retoken'];
  let Nhiptim = 0;
  let HATamThu = 0;
  let HATamTruong = 0;
  let SpO2 = 0;
  let tuoi = 0;
  let tinhtrang;
  let sql = `SELECT * FROM benhnhan, vitri_benhnhan WHERE MaBenhNhan='` + mabenhnhan + `' and benhnhan.MaBenhNhan = vitri_benhnhan.Id_BenhNhan` ;
  console.log(sql);
  db.query(sql, async function (err, databenhnhan) { // biến data chứa kết quả truy vấn
    if (err) throw err;

    const today = Date.now();
    const last = Math.floor(today - 3000000);
    //console.log('trừ: '+Math.floor(today-300000));

    console.log(retoken);
    try {
      const result = await axios({
        method: "POST",
        "Content-Type": "application/json",
        url: `https://www.googleapis.com/oauth2/v4/token`,
        data: {
          grant_type: 'refresh_token',
          client_id: '537084105089-6i6rdnetaejkt9a0gltgu13k6gjjq2ol.apps.googleusercontent.com',
          client_secret: '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',
          refresh_token: retoken
        },
      });
      //console.log(result);
      accessToken = result.data.access_token
      console.log(accessToken);
    } catch (e) {
      console.log(e);
    }




    let BpmArray = [];
    try {
      const result = await axios({
        method: "POST",
        headers: {
          authorization: "Bearer " + accessToken
        },
        "Content-Type": "application/json",
        url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
        data: {
          aggregateBy: [{
            dataTypeName:
              "com.google.heart_rate.bpm",
          }],
          bucketByTime: { durationMillis: 300000 },
          startTimeMillis: last,
          endTimeMillis: today
        },
      });
      //console.log(result);
      BpmArray = result.data.bucket;
    } catch (e) {
      console.log(e);
    }

    var tg;

    console.log('-------------Nhịp tim: ');
    try {
      for (const dataSet of BpmArray) {
        console.log(dataSet);
        for (const points of dataSet.dataset) {
          console.log(points);
          for (const sumary of points.point) {
            console.log(sumary.startTimeNanos);

            for (const value of sumary.value) {
              console.log(value.fpVal);
              Nhiptim = value.fpVal;
              continue;
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
    }


    console.log("---------Huyết Áp---------------");

    let nHA;
    let HuyetApArray = [];
    try {
      const result = await axios({
        method: "POST",
        headers: {
          authorization: "Bearer " + accessToken
        },
        "Content-Type": "application/json",
        url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
        data: {
          aggregateBy: [{
            dataTypeName:
              "com.google.blood_pressure",
          }],
          bucketByTime: { durationMillis: 300000 },
          startTimeMillis: last,
          endTimeMillis: today
        },
      });
      //console.log(result);
      HuyetApArray = result.data.bucket;
    } catch (e) {
      console.log(e);
    }

    try {
      for (const dataSet of HuyetApArray) {
        console.log(dataSet);
        for (const points of dataSet.dataset) {
          console.log(points);
          nHA = 0;
          for (const values of points.point) {
            console.log(values);
            for (const fpVal of values.value) {
              console.log(fpVal);
              if (nHA == 0)
                HATamThu = fpVal.fpVal;
              if (nHA == 3)
                HATamTruong = fpVal.fpVal
              console.log(nHA);
              console.log("Huyết áp hiện tại: " + HATamThu + " - " + HATamTruong);
              nHA++;
            }

          }
        }
      }
    } catch (e) {
      console.log(e);
    }

    console.log("---------SPO2---------------");
    let SPO2Array = [];
    try {
      const result = await axios({
        method: "POST",
        headers: {
          authorization: "Bearer " + accessToken
        },
        "Content-Type": "application/json",
        url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
        data: {
          aggregateBy: [{
            dataTypeName:
              "com.google.oxygen_saturation",
          }],
          bucketByTime: { durationMillis: 300000 },
          startTimeMillis: last,
          endTimeMillis: today
        },
      });
      //console.log(result);
      SPO2Array = result.data.bucket;
    } catch (e) {
      console.log(e);
    }

    try {
      for (const dataSet of SPO2Array) {
        console.log(dataSet);
        for (const points of dataSet.dataset) {
          console.log(points);
          for (const values of points.point) {
            console.log("giá trị: ");
            console.log(values);
            for (const fpVal of values.value) {
              console.log(fpVal);
              if (fpVal.fpVal > 0)
                SpO2 = fpVal.fpVal;
              continue;
            }

          }
        }
      }
    } catch (e) {
      console.log(e);
    }

    var yyyy = databenhnhan[0].NgaySinh.getFullYear();
    var dd = databenhnhan[0].NgaySinh.getDate();
    var mm = databenhnhan[0].NgaySinh.getMonth() + 1;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const currentYear = new Date().getFullYear()
    tuoi = currentYear - yyyy;
    const formattedToday = dd + "/" + mm + "/" + yyyy;

    //Biểu đồ nhịp tim
    //var dt = formatDate(today);
    let time = today;
    const d = new Date(time);
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    let d2 = new Date(year, month, day).getTime();
    console.log("Ngày tháng: " + d2);

    let bdnhiptim = [];
    let i = 0;
    let BdBpmArray = [];
    try {
      const result = await axios({
        method: "POST",
        headers: {
          authorization: "Bearer " + accessToken
        },
        "Content-Type": "application/json",
        url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
        data: {
          aggregateBy: [{
            dataTypeName:
              "com.google.heart_rate.bpm",
          }],
          bucketByTime: { durationMillis: 7200000 },
          startTimeMillis: d2,
          endTimeMillis: today
        },
      });
      //console.log(result);
      BdBpmArray = result.data.bucket;
    } catch (e) {
      console.log(e);
    }

    var tg;

    console.log('-------------Nhịp tim: ');
    try {
      for (const dataSet of BdBpmArray) {
        console.log(dataSet);
        for (const points of dataSet.dataset) {
          console.log(points);
          bdnhiptim[i] = NaN;
          console.log("stt: " + i);
          for (const sumary of points.point) {
            console.log(sumary.startTimeNanos);

            for (const value of sumary.value) {
              console.log(value.fpVal);
              bdnhiptim[i] = value.fpVal;
              break;
            }
          }

          i++;
        }
      }
    } catch (e) {
      console.log(e);
    }
    var dulieu = [[tuoi, databenhnhan[0].CanNang, Nhiptim, SpO2, HATamTruong, HATamThu]];
    console.log(dulieu);
    var spawn = require('child_process').spawn;

    var process = spawn('python', [
      './process.py',
      tuoi,
      databenhnhan[0].CanNang,
      Nhiptim,
      SpO2,
      HATamTruong,
      HATamThu
    ]);
    process.stdout.on('data', function (data) {

      if (data < 1.0 && data > 0.5)
        tinhtrang = 'Bình thường';
      else
        tinhtrang = 'Bất thường';
      console.log('Tình trạng: ' + tinhtrang)

    });
    await new Promise((resolve) => {
      process.on('close', resolve)
    })

    res.render('xem', { sinh: formattedToday, benhnhan: databenhnhan[0], un: req.session.username, Nhiptim: Nhiptim, HATamThu: HATamThu, HATamTruong: HATamTruong, SpO2: SpO2, bdnhiptim: bdnhiptim, tinhtrang: tinhtrang });


  });

})

//Sửa bệnh nhân
app.get('/suabenhnhan', async (req, res) => {
  var mabenhnhan = req.query['mabenhnhan'];
  let sql = `SELECT * FROM benhnhan WHERE MaBenhNhan='` + mabenhnhan + `'`;
  console.log(sql);

  db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
    if (err) throw err;
    console.log(data[0].NgaySinh.getFullYear());
    var yyyy = data[0].NgaySinh.getFullYear();
    var dd = data[0].NgaySinh.getDate();
    var mm = data[0].NgaySinh.getMonth() + 1;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = yyyy + "-" + mm + "-" + dd;
    console.log(formattedToday);
    res.render('suabenhnhan', { benhnhan: data[0], un: req.session.username, sinh: formattedToday }); //nạp view và truyền dữ liệu cho view
  });

})

app.post('/suabenhnhan', (req, res) => {
  //console.log(req.body.MaBacSi);
  var mabenhnhan = req.body.MaBenhNhan;
  db.query("update benhnhan SET ? where MaBenhNhan=?", [req.body, mabenhnhan], function (err, data) {
    if (err) throw err;
  });
  res.redirect('/benhnhan');
})

//Xóa bệnh nhân
app.get('/xoabenhnhan', async (req, res) => {
  var mabenhnhan = req.query['mabenhnhan'];
  let sql = `DELETE FROM nguoidung WHERE TenDangNhap='` + mabenhnhan + `'`;
  console.log(sql);
  db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
    if (err) throw err
    let sql = `DELETE FROM benhnhan WHERE MaBenhNhan='` + mabenhnhan + `'`;
    console.log(sql);
    db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
      if (err) throw err

      res.redirect('/benhnhan')
    });
  });

})
//Thay 2 mã này
//880746625226-lo79g5qte2msburap0eq2h1cmftf84t5.apps.googleusercontent.com
//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
//Bằng 2 mã này
//537084105089-6i6rdnetaejkt9a0gltgu13k6gjjq2ol.apps.googleusercontent.com
//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
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

//Trang chủ
app.get("/", (req, res) => {
  if (req.session.daDangNhap) {
    if (req.session.quyen == 1)
      res.render('index', { un: req.session.username })
    else if (req.session.quyen == 2)
      res.redirect('/benhnhan_bacsi')
    else
      res.redirect('/hosobenhnhan')
  }
  else
    res.redirect('/dangnhap')
});

//Hồ sơ bệnh nhân
app.get('/hosobenhnhan', (req, res) => {
  let mabenhnhan = req.session.username;
  var retoken;
  console.log("----------------------------")
  let Nhiptim = 0;
  let HATamThu = 0;
  let HATamTruong = 0;
  let SpO2 = 0;
  let tuoi = 0;
  let tinhtrang = 'Bình thường';
  let sql = `SELECT * FROM benhnhan WHERE MaBenhNhan='` + mabenhnhan + `'`;
  console.log(sql);
  db.query(sql, async function (err, databenhnhan) { // biến data chứa kết quả truy vấn
    if (err) throw err;

    retoken = databenhnhan[0].ReToken;

    const today = Date.now();
    const last = Math.floor(today - 3000000);
    //console.log('trừ: '+Math.floor(today-300000));

    console.log(retoken);
    try {
      const result = await axios({
        method: "POST",
        "Content-Type": "application/json",
        url: `https://www.googleapis.com/oauth2/v4/token`,
        data: {
          grant_type: 'refresh_token',
          client_id: '537084105089-6i6rdnetaejkt9a0gltgu13k6gjjq2ol.apps.googleusercontent.com',
          client_secret: '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',
          refresh_token: retoken
        },
      });
      //console.log(result);
      accessToken = result.data.access_token
      console.log(accessToken);
    } catch (e) {
      console.log(e);
    }




    let BpmArray = [];
    try {
      const result = await axios({
        method: "POST",
        headers: {
          authorization: "Bearer " + accessToken
        },
        "Content-Type": "application/json",
        url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
        data: {
          aggregateBy: [{
            dataTypeName:
              "com.google.heart_rate.bpm",
          }],
          bucketByTime: { durationMillis: 300000 },
          startTimeMillis: last,
          endTimeMillis: today
        },
      });
      //console.log(result);
      BpmArray = result.data.bucket;
    } catch (e) {
      console.log(e);
    }

    var tg;

    console.log('-------------Nhịp tim: ');
    try {
      for (const dataSet of BpmArray) {
        console.log(dataSet);
        for (const points of dataSet.dataset) {
          console.log(points);
          for (const sumary of points.point) {
            console.log(sumary.startTimeNanos);

            for (const value of sumary.value) {
              console.log(value.fpVal);
              Nhiptim = value.fpVal;
              break;
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
    }


    console.log("---------Huyết Áp---------------");

    let nHA;
    let HuyetApArray = [];
    try {
      const result = await axios({
        method: "POST",
        headers: {
          authorization: "Bearer " + accessToken
        },
        "Content-Type": "application/json",
        url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
        data: {
          aggregateBy: [{
            dataTypeName:
              "com.google.blood_pressure",
          }],
          bucketByTime: { durationMillis: 300000 },
          startTimeMillis: last,
          endTimeMillis: today
        },
      });
      //console.log(result);
      HuyetApArray = result.data.bucket;
    } catch (e) {
      console.log(e);
    }

    try {
      for (const dataSet of HuyetApArray) {
        console.log(dataSet);
        for (const points of dataSet.dataset) {
          console.log(points);
          nHA = 0;
          for (const values of points.point) {
            console.log(values);
            for (const fpVal of values.value) {
              console.log(fpVal);
              if (nHA == 0)
                HATamThu = fpVal.fpVal;
              if (nHA == 3)
                HATamTruong = fpVal.fpVal
              console.log(nHA);
              console.log("Huyết áp hiện tại: " + HATamThu + " - " + HATamTruong);
              nHA++;
            }

          }
        }
      }
    } catch (e) {
      console.log(e);
    }

    console.log("---------SPO2---------------");
    let SPO2Array = [];
    try {
      const result = await axios({
        method: "POST",
        headers: {
          authorization: "Bearer " + accessToken
        },
        "Content-Type": "application/json",
        url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
        data: {
          aggregateBy: [{
            dataTypeName:
              "com.google.oxygen_saturation",
          }],
          bucketByTime: { durationMillis: 300000 },
          startTimeMillis: last,
          endTimeMillis: today
        },
      });
      //console.log(result);
      SPO2Array = result.data.bucket;
    } catch (e) {
      console.log(e);
    }

    try {
      for (const dataSet of SPO2Array) {
        console.log(dataSet);
        for (const points of dataSet.dataset) {
          console.log(points);
          for (const values of points.point) {
            console.log("giá trị: ");
            console.log(values);
            for (const fpVal of values.value) {
              console.log(fpVal);
              if (fpVal.fpVal > 0)
                SpO2 = fpVal.fpVal;
              continue;
            }

          }
        }
      }
    } catch (e) {
      console.log(e);
    }

    var yyyy = databenhnhan[0].NgaySinh.getFullYear();
    var dd = databenhnhan[0].NgaySinh.getDate();
    var mm = databenhnhan[0].NgaySinh.getMonth() + 1;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const currentYear = new Date().getFullYear()
    tuoi = currentYear - yyyy;

    const formattedToday = dd + "/" + mm + "/" + yyyy;
    var dulieu = [[tuoi, databenhnhan[0].CanNang, Nhiptim, SpO2, HATamTruong, HATamThu]];
    console.log(dulieu);
    var spawn = require('child_process').spawn;

    var process = spawn('python', [
      './process.py',
      tuoi,
      databenhnhan[0].CanNang,
      Nhiptim,
      SpO2,
      HATamTruong,
      HATamThu
    ]);
    process.stdout.on('data', function (data) {

      if (data < 1.0 && data > 0.5)
        tinhtrang = 'Bình thường';
      else
        tinhtrang = 'Bất thường';
      console.log('Tình trạng: ' + tinhtrang)

    });
    await new Promise((resolve) => {
      process.on('close', resolve)
    })


    res.render('hosobenhnhan', { sinh: formattedToday, benhnhan: databenhnhan[0], un: req.session.username, Nhiptim: Nhiptim, HATamThu: HATamThu, HATamTruong: HATamTruong, SpO2: SpO2, tinhtrang: tinhtrang }); //nạp view và truyền dữ liệu cho view
  });
})

//Hỏi đáp bệnh nhân
app.get('/hoidap_benhnhan', (req, res) => {
  res.render('hoidap_benhnhan', { un: req.session.username })
})
app.post('/hoidap_benhnhan', (req, res) => {
  let u = req.body.Id_BenhNhan;
  let n = req.body.NoiDung;
  var today = new Date();
  var d = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  let user_info = { Id_BenhNhan: u, NoiDung: n, NgayDang: d, TinhTrang: "0" };
  let sql = 'INSERT INTO hoidap_benhnhan SET ?';
  db.query(sql, user_info);
  res.redirect("/hosobenhnhan");
})

//Danh sách bệnh nhân của bác sĩ
app.get('/benhnhan_bacsi', (req, res) => {
  let mabacsi = req.session.username;
  let sql = `SELECT MaBenhNhan, TenBenhNhan, ReToken, CanNang, benhnhan.NgaySinh FROM benhnhan, bacsi WHERE benhnhan.MaBacSi='` + mabacsi + `' AND benhnhan.MaBacSi=bacsi.MaBacSi`;

  db.query(sql, async function (err, databenhnhan) { // biến data chứa kết quả truy vấn
    if (err) throw err;


    listNhiptim = [];
    listSpo2 = [];
    listTThu = [];
    listTTruong = [];
    listTinhtrang = [];
    for (let [index, benhnhan] of databenhnhan.entries()) {
      console.log('Bệnh nhân: ' + benhnhan.ReToken);
      let accessToken;
      var mabenhnhan = benhnhan.MaBenhNhan;
      var retoken = benhnhan.ReToken;
      let Nhiptim = 0;
      let HATamThu = 0;
      let HATamTruong = 0;
      let SpO2 = 0;
      let tuoi = 0;
      let tinhtrang = 'Bình thường';

      const today = Date.now();
      const last = Math.floor(today - 3000000);
      //console.log('trừ: '+Math.floor(today-300000));

      console.log(retoken);
      try {
        const result = await axios({
          method: "POST",
          "Content-Type": "application/json",
          url: `https://www.googleapis.com/oauth2/v4/token`,
          data: {
            grant_type: 'refresh_token',
            client_id: '537084105089-6i6rdnetaejkt9a0gltgu13k6gjjq2ol.apps.googleusercontent.com',
            client_secret: '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',
            refresh_token: retoken
          },
        });
        //console.log(result);
        accessToken = result.data.access_token
        console.log(accessToken);
      } catch (e) {
        console.log(e);
      }




      let BpmArray = [];
      try {
        const result = await axios({
          method: "POST",
          headers: {
            authorization: "Bearer " + accessToken
          },
          "Content-Type": "application/json",
          url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
          data: {
            aggregateBy: [{
              dataTypeName:
                "com.google.heart_rate.bpm",
            }],
            bucketByTime: { durationMillis: 300000 },
            startTimeMillis: last,
            endTimeMillis: today
          },
        });
        //console.log(result);
        BpmArray = result.data.bucket;
      } catch (e) {
        //console.log(e);
      }

      var tg;

      console.log('-------------Nhịp tim: ');
      try {
        for (const dataSet of BpmArray) {
          console.log(dataSet);
          for (const points of dataSet.dataset) {
            console.log(points);
            for (const sumary of points.point) {
              console.log(sumary.startTimeNanos);

              for (const value of sumary.value) {
                console.log(value.fpVal);
                Nhiptim = value.fpVal;
                continue;
              }
            }
          }
        }
      } catch (e) {
        console.log(e);
      }


      console.log("---------Huyết Áp---------------");

      let nHA;
      let HuyetApArray = [];
      try {
        const result = await axios({
          method: "POST",
          headers: {
            authorization: "Bearer " + accessToken
          },
          "Content-Type": "application/json",
          url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
          data: {
            aggregateBy: [{
              dataTypeName:
                "com.google.blood_pressure",
            }],
            bucketByTime: { durationMillis: 300000 },
            startTimeMillis: last,
            endTimeMillis: today
          },
        });
        //console.log(result);
        HuyetApArray = result.data.bucket;
      } catch (e) {
        //console.log(e);
      }

      try {
        for (const dataSet of HuyetApArray) {
          console.log(dataSet);
          for (const points of dataSet.dataset) {
            console.log(points);
            nHA = 0;
            for (const values of points.point) {
              console.log(values);
              for (const fpVal of values.value) {
                console.log(fpVal);
                if (nHA == 0)
                  HATamThu = fpVal.fpVal;
                if (nHA == 3)
                  HATamTruong = fpVal.fpVal
                console.log(nHA);
                console.log("Huyết áp hiện tại: " + HATamThu + " - " + HATamTruong);
                nHA++;
              }

            }
          }
        }
      } catch (e) {
        console.log(e);
      }

      console.log("---------SPO2---------------");
      let SPO2Array = [];
      try {
        const result = await axios({
          method: "POST",
          headers: {
            authorization: "Bearer " + accessToken
          },
          "Content-Type": "application/json",
          url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
          data: {
            aggregateBy: [{
              dataTypeName:
                "com.google.oxygen_saturation",
            }],
            bucketByTime: { durationMillis: 300000 },
            startTimeMillis: last,
            endTimeMillis: today
          },
        });
        //console.log(result);
        SPO2Array = result.data.bucket;
      } catch (e) {
        //console.log(e);
      }

      try {
        for (const dataSet of SPO2Array) {
          console.log(dataSet);
          for (const points of dataSet.dataset) {
            console.log(points);
            for (const values of points.point) {
              console.log("giá trị: ");
              console.log(values);
              for (const fpVal of values.value) {
                console.log(fpVal);
                if (fpVal.fpVal > 0)
                  SpO2 = fpVal.fpVal;
                continue;
              }

            }
          }
        }
      } catch (e) {
        console.log(e);
      }

      var yyyy = benhnhan.NgaySinh.getFullYear();
      const currentYear = new Date().getFullYear()
      tuoi = currentYear - yyyy;


      listNhiptim[index] = Nhiptim;
      listTThu[index] = HATamThu;
      listTTruong[index] = HATamTruong;
      listSpo2[index] = SpO2;
      //listTinhtrang[index]=tinhtrang;
      var dulieu = [[tuoi, benhnhan.CanNang, Nhiptim, SpO2, HATamTruong, HATamThu]];
      console.log(dulieu);
      var spawn = require('child_process').spawn;

      var process = spawn('python', [
        './process.py',
        tuoi,
        benhnhan.CanNang,
        Nhiptim,
        SpO2,
        HATamTruong,
        HATamThu
      ]);
      process.stdout.on('data', function (data) {

        if (data < 1.0 && data > 0.5)
          listTinhtrang[index] = 'Bình thường';
        else
          listTinhtrang[index] = 'Bất thường';
        //console.log('Tình trạng: '+tinhtrang)

      });
      await new Promise((resolve) => {
        process.on('close', resolve)
      })
    }
    res.render('benhnhan_bacsi', { listbenhnhan: databenhnhan, un: req.session.username, listNhiptim: listNhiptim, listTThu: listTThu, listTTruong: listTTruong, listSpo2: listSpo2, listTinhtrang: listTinhtrang });
    console.log(databenhnhan);
  });
})

//xem bệnh nhân - bác sĩ
app.get('/xembenhnhanbacsi', async (req, res) => {
  let accessToken;
  var mabenhnhan = req.query['mabenhnhan'];
  console.log(mabenhnhan);
  var retoken = req.query['retoken'];
  let Nhiptim = 0;
  let HATamThu = 0;
  let HATamTruong = 0;
  let SpO2 = 0;
  let tuoi = 0;
  let tinhtrang;
  let sql = `SELECT * FROM benhnhan WHERE MaBenhNhan='` + mabenhnhan + `'`;
  console.log(sql);
  db.query(sql, async function (err, databenhnhan) { // biến data chứa kết quả truy vấn
    if (err) throw err;

    const today = Date.now();
    const last = Math.floor(today - 3000000);
    //console.log('trừ: '+Math.floor(today-300000));

    console.log(retoken);
    try {
      const result = await axios({
        method: "POST",
        "Content-Type": "application/json",
        url: `https://www.googleapis.com/oauth2/v4/token`,
        data: {
          grant_type: 'refresh_token',
          client_id: '537084105089-6i6rdnetaejkt9a0gltgu13k6gjjq2ol.apps.googleusercontent.com',
          client_secret: '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',
          refresh_token: retoken
        },
      });
      //console.log(result);
      accessToken = result.data.access_token
      console.log(accessToken);
    } catch (e) {
      console.log(e);
    }




    let BpmArray = [];
    try {
      const result = await axios({
        method: "POST",
        headers: {
          authorization: "Bearer " + accessToken
        },
        "Content-Type": "application/json",
        url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
        data: {
          aggregateBy: [{
            dataTypeName:
              "com.google.heart_rate.bpm",
          }],
          bucketByTime: { durationMillis: 300000 },
          startTimeMillis: last,
          endTimeMillis: today
        },
      });
      //console.log(result);
      BpmArray = result.data.bucket;
    } catch (e) {
      console.log(e);
    }

    var tg;

    console.log('-------------Nhịp tim: ');
    try {
      for (const dataSet of BpmArray) {
        console.log(dataSet);
        for (const points of dataSet.dataset) {
          console.log(points);
          for (const sumary of points.point) {
            console.log(sumary.startTimeNanos);

            for (const value of sumary.value) {
              console.log(value.fpVal);
              Nhiptim = value.fpVal;
              continue;
            }
          }
        }
      }
    } catch (e) {
      console.log(e);
    }


    console.log("---------Huyết Áp---------------");

    let nHA;
    let HuyetApArray = [];
    try {
      const result = await axios({
        method: "POST",
        headers: {
          authorization: "Bearer " + accessToken
        },
        "Content-Type": "application/json",
        url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
        data: {
          aggregateBy: [{
            dataTypeName:
              "com.google.blood_pressure",
          }],
          bucketByTime: { durationMillis: 300000 },
          startTimeMillis: last,
          endTimeMillis: today
        },
      });
      //console.log(result);
      HuyetApArray = result.data.bucket;
    } catch (e) {
      console.log(e);
    }

    try {
      for (const dataSet of HuyetApArray) {
        console.log(dataSet);
        for (const points of dataSet.dataset) {
          console.log(points);
          nHA = 0;
          for (const values of points.point) {
            console.log(values);
            for (const fpVal of values.value) {
              console.log(fpVal);
              if (nHA == 0)
                HATamThu = fpVal.fpVal;
              if (nHA == 3)
                HATamTruong = fpVal.fpVal
              console.log(nHA);
              console.log("Huyết áp hiện tại: " + HATamThu + " - " + HATamTruong);
              nHA++;
            }

          }
        }
      }
    } catch (e) {
      console.log(e);
    }

    console.log("---------SPO2---------------");
    let SPO2Array = [];
    try {
      const result = await axios({
        method: "POST",
        headers: {
          authorization: "Bearer " + accessToken
        },
        "Content-Type": "application/json",
        url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
        data: {
          aggregateBy: [{
            dataTypeName:
              "com.google.oxygen_saturation",
          }],
          bucketByTime: { durationMillis: 300000 },
          startTimeMillis: last,
          endTimeMillis: today
        },
      });
      //console.log(result);
      SPO2Array = result.data.bucket;
    } catch (e) {
      console.log(e);
    }

    try {
      for (const dataSet of SPO2Array) {
        console.log(dataSet);
        for (const points of dataSet.dataset) {
          console.log(points);
          for (const values of points.point) {
            console.log("giá trị: ");
            console.log(values);
            for (const fpVal of values.value) {
              console.log(fpVal);
              if (fpVal.fpVal > 0)
                SpO2 = fpVal.fpVal;
              continue;
            }

          }
        }
      }
    } catch (e) {
      console.log(e);
    }

    var yyyy = databenhnhan[0].NgaySinh.getFullYear();
    var dd = databenhnhan[0].NgaySinh.getDate();
    var mm = databenhnhan[0].NgaySinh.getMonth() + 1;
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const currentYear = new Date().getFullYear()
    tuoi = currentYear - yyyy;
    const formattedToday = dd + "/" + mm + "/" + yyyy;

    //Biểu đồ nhịp tim
    //var dt = formatDate(today);
    let time = today;
    const d = new Date(time);
    let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    let d2 = new Date(year, month, day).getTime();
    console.log("Ngày tháng: " + d2);

    let bdnhiptim = [];
    let i = 0;
    let BdBpmArray = [];
    try {
      const result = await axios({
        method: "POST",
        headers: {
          authorization: "Bearer " + accessToken
        },
        "Content-Type": "application/json",
        url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
        data: {
          aggregateBy: [{
            dataTypeName:
              "com.google.heart_rate.bpm",
          }],
          bucketByTime: { durationMillis: 7200000 },
          startTimeMillis: d2,
          endTimeMillis: today
        },
      });
      //console.log(result);
      BdBpmArray = result.data.bucket;
    } catch (e) {
      console.log(e);
    }

    var tg;

    console.log('-------------Nhịp tim: ');
    try {
      for (const dataSet of BdBpmArray) {
        console.log(dataSet);
        for (const points of dataSet.dataset) {
          console.log(points);
          bdnhiptim[i] = NaN;
          console.log("stt: " + i);
          for (const sumary of points.point) {
            console.log(sumary.startTimeNanos);

            for (const value of sumary.value) {
              console.log(value.fpVal);
              bdnhiptim[i] = value.fpVal;
              break;
            }
          }

          i++;
        }
      }
    } catch (e) {
      console.log(e);
    }
    var dulieu = [[tuoi, databenhnhan[0].CanNang, Nhiptim, SpO2, HATamTruong, HATamThu]];
    console.log(dulieu);
    var spawn = require('child_process').spawn;

    var process = spawn('python', [
      './process.py',
      tuoi,
      databenhnhan[0].CanNang,
      Nhiptim,
      SpO2,
      HATamTruong,
      HATamThu
    ]);
    process.stdout.on('data', function (data) {

      if (data < 1.0 && data > 0.5)
        tinhtrang = 'Bình thường';
      else
        tinhtrang = 'Bất thường';
      console.log('Tình trạng: ' + tinhtrang)

    });
    await new Promise((resolve) => {
      process.on('close', resolve)
    })

    res.render('xembenhnhanbacsi', { sinh: formattedToday, benhnhan: databenhnhan[0], un: req.session.username, Nhiptim: Nhiptim, HATamThu: HATamThu, HATamTruong: HATamTruong, SpO2: SpO2, bdnhiptim: bdnhiptim, tinhtrang: tinhtrang });


  });

})


app.get('/hoidap_bacsi', (req, res) => {
  let mabacsi = req.session.username;
  let sql = `SELECT * FROM hoidap_benhnhan, benhnhan WHERE hoidap_benhnhan.Id_BenhNhan=benhnhan.MaBenhNhan AND hoidap_benhnhan.TinhTrang=0 AND benhnhan.MaBacSi='` + mabacsi + `'`;

  db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
    if (err) throw err;
    res.render('hoidap_bacsi', { listhoi: data, un: req.session.username }); //nạp view và truyền dữ liệu cho view
  });
})

//Phản hồi
app.get('/phanhoi', (req, res) => {
  //let id_hoi = req.query['id_hoi'];
  //console.log('Nội dung: '+req.query['noidung'])
  res.render('phanhoi', { un: req.session.username, id_hoi: req.query['id_hoi'], noidung: req.query['noidung'] })
})
app.post('/phanhoi', (req, res) => {
  let i = req.body.ID_hoi;
  let n = req.body.NoiDung;

  let user_info = { ID_hoi: i, NoiDung: n };
  let sql = 'INSERT INTO phanhoi SET ?';
  db.query(sql, user_info);
  db.query("update hoidap_benhnhan SET TinhTrang='1' where Id=?", [i], function (err, data) {
    if (err) throw err;
    res.redirect("/hoidap_bacsi");
  });

})

//Xem phản hồi
app.get('/xemphanhoi', (req, res) => {
  let mabenhnhan = req.session.username;
  console.log(mabenhnhan);

  let sql = `SELECT hoidap_benhnhan.NoiDung AS cauhoi, phanhoi.NoiDung AS phanhoi FROM hoidap_benhnhan, phanhoi WHERE hoidap_benhnhan.Id_BenhNhan='` + mabenhnhan + `' AND hoidap_benhnhan.Id=phanhoi.ID_hoi AND hoidap_benhnhan.TinhTrang='1'`;

  db.query(sql, function (err, data) { // biến data chứa kết quả truy vấn
    if (err) throw err;
    res.render('xemphanhoi', { listhoidap: data, un: req.session.username }); //nạp view và truyền dữ liệu cho view
  });
})

app.get("/getURLTing", (req, res) => {
  const oauth2Client = new google.auth.OAuth2(
    "537084105089-6i6rdnetaejkt9a0gltgu13k6gjjq2ol.apps.googleusercontent.com",
    "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",
    "http://localhost:1234/steps"
  );

  const scopes = [
    'https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.blood_pressure.read https://www.googleapis.com/auth/fitness.oxygen_saturation.read profile email openid'
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    state: JSON.stringify({
      callbackUrl: req.body.callbackUrl,
      userID: req.body.userid
    })
  });

  request(url, (err, response, body) => {
    //console.log("error: ", err);
    //console.log("statusCode: ", response && response.statusCode);
    //res.send({ url });
    res.statusCode = 302;
    res.setHeader("Location", url);
    res.end();
  });
});

app.get("/steps", async (req, res) => {
  const queryURL = new urlParse(req.url);
  const code = queryParse.parse(queryURL.query).code;
  const oauth2Client = new google.auth.OAuth2(
    "537084105089-6i6rdnetaejkt9a0gltgu13k6gjjq2ol.apps.googleusercontent.com",
    "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",
    "http://localhost:1234/steps"
  );

  const tokens = await oauth2Client.getToken(code);
  console.log(tokens.tokens.refresh_token);

  let sql = `SELECT * FROM bacsi`;
  console.log(sql);
  db.query(sql, function (err, data) {
    if (err) throw err;
    res.render('thembenhnhan', { retoken: tokens.tokens.refresh_token, un: req.session.username, listbacsi: data });
  });

});

//Đăng nhập
app.get('/dangnhap', function (req, res) {
  res.render("dangnhap.ejs");
});
//Xử lý đăng nhập
app.post('/dangnhap', function (req, res) {
  let u = req.body.username;
  console.log(u);
  let p = req.body.password;
  console.log(p);
  let sql = 'SELECT * FROM nguoidung WHERE TenDangNhap = ?';
  db.query(sql, [u], (err, rows) => {
    if (rows.length <= 0) {
      console.log("Not OK");
      res.redirect("/dangnhap");
      return;
    }
    let user = rows[0];
    let pass_fromdb = user.MatKhau;
    const bcrypt = require("bcrypt");
    var kq = bcrypt.compareSync(p, pass_fromdb);
    if (kq) {
      console.log("OK");
      var sess = req.session;  //initialize session variable
      sess.daDangNhap = true;
      sess.username = user.TenDangNhap;
      sess.quyen = user.Quyen
      res.redirect("/");
    }
    else {
      console.log("Not OK");
      res.redirect("/dangnhap");
    }
  });
});

//Thoát
app.get('/thoat', function (req, res) {
  req.session.destroy();
  res.redirect("/dangnhap");
});

//Chạy kiểm tra tình trạng bệnh nhân
setInterval(async () => {
  let sql = `SELECT * FROM benhnhan`;

  db.query(sql, async function (err, databenhnhan) { // biến data chứa kết quả truy vấn
    if (err) throw err;
    listNhiptim = [];
    listSpo2 = [];
    listTThu = [];
    listTTruong = [];
    listTinhtrang = [];
    for (let [index, benhnhan] of databenhnhan.entries()) {
      console.log('Bệnh nhân: ' + benhnhan.ReToken);
      let accessToken;
      var mabenhnhan = benhnhan.MaBenhNhan;
      var retoken = benhnhan.ReToken;
      let Nhiptim = 0;
      let HATamThu = 0;
      let HATamTruong = 0;
      let SpO2 = 0;
      let tuoi = 0;
      let tinhtrang = 'Bình thường';

      const today = Date.now();
      const last = Math.floor(today - 3000000);
      //console.log('trừ: '+Math.floor(today-300000));

      console.log(retoken);
      try {
        const result = await axios({
          method: "POST",
          "Content-Type": "application/json",
          url: `https://www.googleapis.com/oauth2/v4/token`,
          data: {
            grant_type: 'refresh_token',
            client_id: '537084105089-6i6rdnetaejkt9a0gltgu13k6gjjq2ol.apps.googleusercontent.com',
            client_secret: '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',
            refresh_token: retoken
          },
        });
        //console.log(result);
        accessToken = result.data.access_token
        console.log(accessToken);
      } catch (e) {
        console.log(e);
      }




      let BpmArray = [];
      try {
        const result = await axios({
          method: "POST",
          headers: {
            authorization: "Bearer " + accessToken
          },
          "Content-Type": "application/json",
          url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
          data: {
            aggregateBy: [{
              dataTypeName:
                "com.google.heart_rate.bpm",
            }],
            bucketByTime: { durationMillis: 300000 },
            startTimeMillis: last,
            endTimeMillis: today
          },
        });
        //console.log(result);
        BpmArray = result.data.bucket;
      } catch (e) {
        //console.log(e);
      }

      var tg;

      console.log('-------------Nhịp tim: ');
      try {
        for (const dataSet of BpmArray) {
          console.log(dataSet);
          for (const points of dataSet.dataset) {
            console.log(points);
            for (const sumary of points.point) {
              console.log(sumary.startTimeNanos);

              for (const value of sumary.value) {
                console.log(value.fpVal);
                Nhiptim = value.fpVal;
                continue;
              }
            }
          }
        }
      } catch (e) {
        console.log(e);
      }


      console.log("---------Huyết Áp---------------");

      let nHA;
      let HuyetApArray = [];
      try {
        const result = await axios({
          method: "POST",
          headers: {
            authorization: "Bearer " + accessToken
          },
          "Content-Type": "application/json",
          url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
          data: {
            aggregateBy: [{
              dataTypeName:
                "com.google.blood_pressure",
            }],
            bucketByTime: { durationMillis: 300000 },
            startTimeMillis: last,
            endTimeMillis: today
          },
        });
        //console.log(result);
        HuyetApArray = result.data.bucket;
      } catch (e) {
        //console.log(e);
      }

      try {
        for (const dataSet of HuyetApArray) {
          console.log(dataSet);
          for (const points of dataSet.dataset) {
            console.log(points);
            nHA = 0;
            for (const values of points.point) {
              console.log(values);
              for (const fpVal of values.value) {
                console.log(fpVal);
                if (nHA == 0)
                  HATamThu = fpVal.fpVal;
                if (nHA == 3)
                  HATamTruong = fpVal.fpVal
                console.log(nHA);
                console.log("Huyết áp hiện tại: " + HATamThu + " - " + HATamTruong);
                nHA++;
              }

            }
          }
        }
      } catch (e) {
        console.log(e);
      }

      console.log("---------SPO2---------------");
      let SPO2Array = [];
      try {
        const result = await axios({
          method: "POST",
          headers: {
            authorization: "Bearer " + accessToken
          },
          "Content-Type": "application/json",
          url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
          data: {
            aggregateBy: [{
              dataTypeName:
                "com.google.oxygen_saturation",
            }],
            bucketByTime: { durationMillis: 300000 },
            startTimeMillis: last,
            endTimeMillis: today
          },
        });
        //console.log(result);
        SPO2Array = result.data.bucket;
      } catch (e) {
        //console.log(e);
      }

      try {
        for (const dataSet of SPO2Array) {
          console.log(dataSet);
          for (const points of dataSet.dataset) {
            console.log(points);
            for (const values of points.point) {
              console.log("giá trị: ");
              console.log(values);
              for (const fpVal of values.value) {
                console.log(fpVal);
                if (fpVal.fpVal > 0)
                  SpO2 = fpVal.fpVal;
                continue;
              }

            }
          }
        }
      } catch (e) {
        console.log(e);
      }

      var yyyy = benhnhan.NgaySinh.getFullYear();
      const currentYear = new Date().getFullYear()
      tuoi = currentYear - yyyy;


      var spawn = require('child_process').spawn;

      var process = spawn('python', [
        './process.py',
        tuoi,
        benhnhan.CanNang,
        Nhiptim,
        SpO2,
        HATamTruong,
        HATamThu
      ]);
      process.stdout.on('data', function (data) {

        if (data < 1.0 && data > 0.5) {

          console.log("Bình thường");
        }
        else {

          let sql = `SELECT * FROM bacsi WHERE MaBacSi='` + benhnhan.MaBacSi + `'`;
          console.log(sql);
          db.query(sql, function (err, databs) { // biến data chứa kết quả truy vấn
            if (err) throw err;
            //Gửi mail cảnh báo
            console.log(databs[0].Mail);
            var transporter = nodemailer.createTransport({ // config mail server
              service: 'Gmail',
              auth: {
                user: 'youremail@gmail.com',
                pass: 'yourpassword'
              }
            });
            var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
              from: 'yourpassword',
              to: databs[0].Mail,
              subject: 'Cảnh báo',
              text: 'Bệnh nhân ' + benhnhan.MaBenhNhan + ' có tình trạng bất thường',

            }
            transporter.sendMail(mainOptions, function (err, info) {
              if (err) {
                console.log(err);

              } else {
                console.log('Message sent: ' + info.response);

              }
            });

          });
        }



      });
      await new Promise((resolve) => {
        process.on('close', resolve)
      })
    }

  });

}, 300000);

app.listen(port, () => console.log('GOOGLE FIT IS LISTENNING'));