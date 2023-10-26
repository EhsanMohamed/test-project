const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const path = require('path');
const multer = require('multer');

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.static('public'));




const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db" //"project1"
});

//image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }


})

const upload = multer({
    storage: storage
})

/////////////////////////////////
//login ang signup and logout
app.post("/login", (req, res) => {
    const sql = "SELECT * FROM user WHERE `email`=? AND `password`=? ";


    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            return res.json({ login: "Error" });
        }
        if (data.length > 0) {
            const name = data[0].name;
            const email = data[0].email;
            const img = data[0].img;
            const id = data[0].ID;

            const time = logTime();


            const token = jwt.sign({ name, email, img, id }, "jwtSecretKey", { expiresIn: "1d" });
            const sql = "UPDATE user SET `active` = ? ,`login_Time` = ? WHERE `email` = ?";
            db.query(sql, ["on", time, req.body.email], (err, data) => {

                return res.json({ login: "success", token, data });
            })

        }

        else { return res.json({ login: "failed" }) }
    })


})

app.post("/googlelogin", (req, res) => {
    const sql = "SELECT * FROM user WHERE `email`=? ";


    db.query(sql, [req.body.email], (err, data) => {
        if (err) {
            return res.json({ login: "Error" });
        }
        if (data.length > 0) {
            const name = data[0].name;
            const email = data[0].email;
            const img = data[0].img;
            const id = data[0].ID;

            const time = logTime();


            const token = jwt.sign({ name, email, img, id }, "jwtSecretKey", { expiresIn: "1d" });
            const sql = "UPDATE user SET `active` = ? ,`login_Time` = ? WHERE `email` = ?";
            db.query(sql, ["on", time, req.body.email], (err, data) => {

                return res.json({ login: "success", token, data });
            })

        }

        else { return res.json({ login: "failed" }) }
    })


})

app.post("/googlesignup", (req, res) => {

    const sql = "INSERT INTO user (name,email,img,active,login_Time) VALUES (?)";
    let name = req.body.name;
    let email = req.body.email;
    let img = req.body.img;


    const values = [
        req.body.name,
        req.body.email,
        req.body.img,
        "on",
        logTime()
    ]

    db.query(sql, [values], (err, data) => {
        if (err) {
            return console.log(err);
        } else {
            const token = jwt.sign({ name, email, img }, "jwtSecretKey", { expiresIn: "1d" });
            return res.json({ login: "success", token, data });
        }
    })

})


app.post("/signup", (req, res) => {

    const sql = "INSERT INTO user (name,email,password) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]


    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(" Error ")
        }
        return res.json(data);
    })
})


app.put("/logout", (req, res) => {
    const email = req.body.email;
    const sql = "UPDATE user SET `active` = ? ,`logout_Time` = ?  WHERE `email` = ?";
    db.query(sql, ["off", logTime(), email], (err, data) => {

        if (err) return res.json(" Error ");
        return res.json("success");

    })

})
////////////////////////
//login time
function logTime() {
    var d = new Date();
    let time = d.toLocaleDateString() + "    " + d.toLocaleTimeString();
    return time;
}

//token
const verifyuser = (req, res, next) => {
    const token = req.headers["a"];
    if (!token) {
        return res.json({ Error: "not auth" });
    } else {
        jwt.verify(token, "jwtSecretKey", (err, decoded) => {
            if (err) {
                return res.json({ Error: "TOKEN NOT ok" })
            } else {
                req.name = decoded.name;
                req.email = decoded.email;
                req.img = decoded.img;
                req.id = decoded.id;

                next();
            }
        })
    }
}

app.get('/', verifyuser, (req, res) => {
    return res.json({
        login: "success", name: req.name,
        email: req.email, img: req.img, id: req.id
    });
})

//get all employee
app.get("/home", (req, res) => {
    const sql = "SELECT * FROM employes_data";
    db.query(sql, (error, data) => {
        if (error) return res.json("Error");
        return res.json(data);
    })
})

//add employee
app.post('/add', upload.single('img'), (req, res) => {

    const sql = "INSERT INTO employes_data (FirstName,LastName,Salary,user_ID,employes_department_id,add_by,img) VALUES (?)";

    const values = [
        req.body.FirstName,
        req.body.LastName,
        req.body.Salary,
        req.body.id,
        req.body.department,
        req.body.email,
        'http://localhost:700/img/' + req.file.filename

    ]


    db.query(sql, [values], (err, data) => {
        if (err) {
            return console.log(err);
            //res.json(" Error ")
        }
        else {
            return res.json(data);
        }

    })


})

//update
app.put('/update/:id', upload.single('img'), (req, res) => {
    let id = req.params.id;
    let email = req.body.email;
    let oldFirstName = req.body.oldFirstName;
    let oldLastName = req.body.oldLastName;
    let oldSalary = req.body.oldSalary;
    let time = logTime();

    const sql = "UPDATE employes_data SET `FirstName`= ? ,`LastName`= ? ,`Salary`= ?  WHERE `ID` = ?";
    const lastsql = "INSERT INTO employes_olddata (FirstName,LastName,Salary,edit_by,time,employes_data_ID) VALUES (?)";

    const values = [
        oldFirstName,
        oldLastName,
        oldSalary,
        email,
        time,
        id
    ]


    if (req.file != null) {
        const sql = "UPDATE employes_data SET `FirstName`= ? ,`LastName`= ? ,`Salary`= ? ,`img`= ? WHERE `ID` = ?";

        if (oldFirstName != req.body.FirstName ||
            oldLastName != req.body.LastName || oldSalary != req.body.Salary) {
            let img = 'http://localhost:700/img/' + req.file.filename;

            db.query(sql, [req.body.FirstName, req.body.LastName, req.body.Salary,
                img, id], (err, data) => {
                    db.query(lastsql, [values], (err, result) => {
                        if (err) return res.json(" Error ");
                        return res.json(data);
                    })
                })
        }

    }
    else {

        db.query(sql, [req.body.FirstName, req.body.LastName,
        req.body.Salary, id], (err, data) => {
            db.query(lastsql, [values], (err, result) => {
                if (err) return res.json(" Error ");
                return res.json(data);
            })
        })


    }
})

//more information
app.get('/more/:id', (req, res) => {

    const sql = 'SELECT * FROM employes_data WHERE `ID` = ? ';
    const lastsql = "SELECT * FROM employes_olddata WHERE `employes_data_ID` = ?";

    const id = req.params.id;

    db.query(sql, [id], (err, data) => {

        db.query(lastsql, [id], (err, data1) => {
            const sql = 'SELECT name FROM employes_department WHERE `ID` = ? ';

            let i=data[0].employes_department_id;
            
            db.query(sql, [i], (err, data2) =>{

            if (err) return res.json(" Error ");
            return res.json({ data, data1,data2 });})

        })
    })
})

//delete employee
app.delete('/home/:id', (req, res) => {




    const sql = "DELETE FROM employes_olddata WHERE `employes_data_ID` = ? ";
    const newsql = "DELETE FROM employes_data WHERE `ID` = ? ";

    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        db.query(newsql, [id], (err, data) => {
            if (err) return res.json(" Error ");
            return res.json(data);
        })



    })
})


////////////////////////////////
//forgot password
app.put('/forgot-password', (req, res) => {

    let email = req.body.email;
    let otp = req.body.Otp;





    const sql = "SELECT * FROM user WHERE `email`=? ";

    db.query(sql, [email], (err, data) => {
        if (data.length > 0) {
            const token = jwt.sign({ email }, "jwtSecretKey", { expiresIn: "1h" });
            const sql = "UPDATE user SET `otp`= ?  WHERE `email` = ?";
            db.query(sql, [otp, email], (err, data) => {

                sendEmail(otp, email);

                setTimeout(() => {
                    if (check()) {
                        return res.json({ status: "success", token, data });

                    }
                    else {
                        return res.json({ status: "internet error" });
                    }
                }, 3000)




            })
        }
        else { return res.json({ status: "failed" }) }
    })


})

var c;

function sendEmail(otp, email) {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ehsanmohammed98@gmail.com',
            pass: 'clvm hpof oxei leud'
        }
    });

    var mailOptions = {
        from: 'ehsanmohammed98@gmail.com',
        to: email,
        subject: 'Reset Password Link',
        text: `your code is ${otp}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            c = false;
        } else {
            c = true;
        }
    })

}

function check() {
    return c;
}

app.put('/verify', (req, res) => {
    let email = req.body.email;
    let otp = req.body.Otp;
    const sql = "SELECT otp FROM user WHERE `email`=? ";


    db.query(sql, [email], (err, data) => {


        if (err) { return res.json({ status: "Error" }); }

        if (data.length > 0) {
            const o = data[0].otp;
            if (o == otp) {
                return res.json({ status: "success" });
            } else {
                return res.json({ status: "dont" });
            }
        }


    })

})

app.put('/reset-password', (req, res) => {
    let password = req.body.password;
    let email = req.body.email;


    const sql = "SELECT * FROM user WHERE `email`=? ";

    db.query(sql, [email], (err, data) => {
        if (err) {
            return res.json({ status: "Error" });
        }
        if (data.length > 0) {
            const sql = "UPDATE user SET `password`= ?  WHERE `email` = ?";
            db.query(sql, [password, email], (err, data) => {
                return res.json({ status: "success" });
            })
        }
        else { return res.json({ status: "failed" }) }
    })



})
/////////////////////////////

//dashboard
app.get('/adminCount', (req, res) => {
    const sql = "Select count(id) as admin from user";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in runnig query" });
        return res.json(result);
    })
})

app.get('/employeeCount', (req, res) => {
    const sql = "Select count(id) as employee from employes_data";
    db.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in runnig query" });
        return res.json(result);
    })
})


app.get("/admin", (req, res) => {
    const sql = "SELECT * FROM user";
    db.query(sql, (error, data) => {
        if (error) return res.json("Error");
        return res.json(data);
    })

})

//Department

app.post('/department', (req, res) => {

    const sql = "INSERT INTO employes_department (name,user_ID) VALUES (?)";

    const values = [
        req.body.department,
        req.body.id
    ]


    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json(" Error ")
        }
        else {
            return res.json({ status: "success" })
        }

    })


})

app.get('/department', (req, res) => {

    const sql = "select * from employes_department ";

    db.query(sql, (err, data) => {
        if (err) {
            return res.json(" Error ")
        }
        else {
            return res.json(data)
        }

    })


})

app.delete('/department/:id', (req, res) => {
    const sql = "DELETE FROM employes_department WHERE `ID` = ? ";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) return console.log(err);
        //res.json(" Error ");
        return res.json(data);
    })

})

//Edit user info
app.put("/user", (req, res) => {

    const sql = "UPDATE user SET `name`= ?   WHERE `email` = ?";
    let email = req.body.email;
    let name = req.body.name;
    let oldname = req.body.oldname;


    if (name === oldname || name === '') {

        return res.json({ status: "fell" });
    } else {
        db.query(sql, [name, email], (error, data) => {
            return res.json({ status: "success" });
        })
    }


})


app.put('/userPh', upload.single('img'), (req, res) => {
    let email = req.body.email;

    if (req.file != null) {
        const sql = "UPDATE user SET `img`= ? WHERE `email` = ?";
        let img = 'http://localhost:700/img/' + req.file.filename;
        db.query(sql, [img, email], (err, data) => {
            if (err) return res.json(" Error ");
            return res.json(data);
        })
    }

})


app.put('/log', (req, res) => {

    const sql = 'SELECT name,img  FROM user WHERE `email` = ? ';

    let email = req.body.email;

    db.query(sql, [email], (err, data) => {
        if (err) return res.json(" Error ");
        return res.json(data);
    })

})

app.post('/search', (req, res) => {
    const inserts = req.body.value;
    var sql = 'SELECT `FirstName` FROM employes_data WHERE `FirstName` LIKE   ? '  ;

    db.query(sql,[inserts+'%'] , (err, data) => {
        if (err) return res.json(" Error ");
    
        return res.json(data);
    })

})

app.listen(700, () => {
    console.log("listening");

})