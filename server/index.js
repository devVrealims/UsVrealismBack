const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const https = require('https');
const fs = require('fs');
const path = require('path');
app.use(cors());
app.use(bodyParser.json());
const certPath = '/etc/letsencrypt/live/node.vrealism.com';


const db = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: "M01ses8o8o",
  database: "users",
});

//*********************************************************** //
/////////////////SEPARATOR//////////////////////////////////////
//*********************************************************** //






//Query oroiginada de la seccion soliictar credito formulario //

//*********************************************************** //
/////////////////SEPARATOR//////////////////////////////////////
//*********************************************************** //

//Consulta del login que trae el id del cliente//
app.post("/entry", (req, res) => {
  const user = req.body.user;
  const sqlSelect = "SELECT * from user WHERE username = ? ";
  db.query(sqlSelect, user, (err, result) => {
    res.send(result);
  });
});
//Consulta del login que trae el id del cliente//

//*********************************************************** //
/////////////////SEPARATOR//////////////////////////////////////
//*********************************************************** //
//Consulta del login que trae el id del cliente//
app.post("/entryLogin", (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    const sqlSelect = "SELECT * from user WHERE username = ? AND password = ? ";
    db.query(sqlSelect, [user,password] ,(err, result) => {
        res.send(result);
    });
});
//Consulta del login que trae el id del cliente//

//*********************************************************** //
/////////////////SEPARATOR//////////////////////////////////////
//*********************************************************** //

//Consulta del login que trae toda la info de la tabla client relacionada con el cliente //
app.post("/api/bringclient", (req, res) => {
  const user = req.body.client;
  const sqlSelect = "SELECT * from client WHERE cli_id = ? ";
  db.query(sqlSelect, user, (err, result) => {
    res.send(result);
  });
});
//Consulta del login que trae toda la info de la tabla client relacionada con el cliente //

//*********************************************************** //
/////////////////SEPARATOR//////////////////////////////////////
//*********************************************************** //

//Consulta del home que trae varias consultas , para el dashboard total projects, active projects, files assigned, pending invoices//

app.post("/api/getactiveprojects", (req, res) => {
    const clientide = req.body.clientide;
    const statuscome = "Working";
    //const sqlCount = "SELECT count(*) FROM project WHERE client_cli_id = ? ";
    const sqlquery = "SELECT COUNT(client_cli_id) AS id_count FROM project WHERE client_cli_id = ? AND proj_status = ?";
    db.query(sqlquery,[clientide, statuscome],(err, rows) => {
        res.send(rows);
        //console.log(rows);
    })
});

app.post("/api/dashboard/getallprojects", (req, res) => {
    const clientide = req.body.clientide;
    const sqlCount = "SELECT Count(client_cli_id) AS ide_count FROM project WHERE client_cli_id = ? ";
    db.query(sqlCount,clientide, (err, rows) => {
        res.send(rows);
        //console.log(rows);
    })
});

app.post("/api/dashboard/getallinvoices", (req, res) => {
    const clientide = req.body.clientide;
    const statuscome = "Pending";
    //const sqlCount = "SELECT count(*) FROM project WHERE client_cli_id = ? ";
    const sqlquery = "SELECT COUNT(id_client) AS id_count FROM invoice WHERE id_client = ? AND inv_status = ?";
    db.query(sqlquery, [clientide, statuscome], (err, rows) => {
        res.send(rows);
        //console.log(rows);
    })
});

app.post("/api/dashboard/getallprojectsfiles", (req, res) => {
    const clientide = req.body.clientide;
    const sqlCount = "SELECT Count(project_client_cli_id) AS ide_count FROM project_files WHERE project_client_cli_id = ? ";
    db.query(sqlCount, clientide, (err, rows) => {
        res.send(rows);
        //console.log(rows);
    })
});

//Consulta del home que trae varias consultas , para el dashboard total projects, active projects, files assigned, pending invoices//



//Consulta del home que trae la compa�ia por el id del cliente //
app.post("/api/getcompanybyclient", (req, res) => {
  const id = req.body.user;
  const sqlSelect = "SELECT Company_com_id from user WHERE id = ? ";
  db.query(sqlSelect, id, (err, result) => {
    res.send(result);
  });
});
//Consulta del home que trae la compa�ia por el id del cliente //

//*********************************************************** //
/////////////////SEPARATOR//////////////////////////////////////
//*********************************************************** //

//Consulta del home que trae el nombre de la compa�ia por su id//
app.post("/api/getnamecompanybyid", (req, res) => {
  const id = req.body.company;
  const sqlSelect = "SELECT com_name from company WHERE com_id = ? ";
  db.query(sqlSelect, id, (err, result) => {
    res.send(result);
  });
});
//Consulta del home que trae el nombre de la compa�ia por su id//

//*********************************************************** //
/////////////////SEPARATOR//////////////////////////////////////
//*********************************************************** //
//Consulta del home que trae todos los proyectos al admin//
app.post("/api/getallproject", (req, res) => {
  const id = req.body.user;
  const sqlSelect = "SELECT * from project";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});
//Consulta del home que trae todos los proyectos al admin//

//*********************************************************** //
/////////////////SEPARATOR//////////////////////////////////////
//*********************************************************** //

//Consulta del home que trae proyectos con el id del cliente//
app.post("/api/get", (req, res) => {
  const id = req.body.user;
  const sqlSelect = "SELECT * from project WHERE client_cli_id = ? ";
  db.query(sqlSelect, id, (err, result) => {
    res.send(result);
  });
});
//Consulta del home que trae proyectos con el id del cliente//

//*********************************************************** //
/////////////////SEPARATOR//////////////////////////////////////
//*********************************************************** //

// Consulta del modal que trae nombre de cliente de la tabla user por el id del cliente //
app.post("/api/clientnamebyid", (req, res) => {
  const idclient = req.body.clientid;
  const sqlSelect = "SELECT cli_name from client WHERE cli_id = ?";
  db.query(sqlSelect, idclient, (err, result) => {
    res.send(result);
  });
});
// Consulta del modal que trae nombre de cliente de la tabla user por el id del cliente //

//*********************************************************** //
/////////////////SEPARATOR//////////////////////////////////////
//*********************************************************** //

//Consulta del modal que devuelve toda la tabla el project por id de projecto//
app.post("/api/getprojbyid", (req, res) => {
  const idproject = req.body.idproj;
  const sqlSelect = "SELECT * from project WHERE proj_id = ?";
  db.query(sqlSelect, idproject, (err, result) => {
    res.send(result);
  });
});
//Consulta del modal que devuelve toda la tabla el project por id de projecto//

//*********************************************************** //
/////////////////SEPARATOR//////////////////////////////////////
//*********************************************************** //
//Consulta del modal que devuelve toda la tabla project_files por id de projecto//
app.post("/api/getprojfilesbyid", (req, res) => {
  const idproject = req.body.idproj;
  const sqlSelect = "SELECT * from project_files WHERE project_proj_id = ?";
  db.query(sqlSelect, idproject, (err, result) => {
    res.send(result);
  });
});
//Consulta del modal que devuelve toda la tabla project_files por id de projecto//

//*********************************************************** //
/////////////////SEPARATOR//////////////////////////////////////
//*********************************************************** //

//consulta de crearproyecto que trae los clientes por compa�ia//
app.post("/bringClient", (req, res) => {
  const company = req.body.company;
  const sqlSelect =
    "SELECT * from client WHERE  Company_com_id = ? AND (role='surveyor' OR role='architec')";
  db.query(sqlSelect, company, (err, result) => {
    res.send(result);
  });
});
//consulta de crearproyecto que trae los clientes por compa�ia//

//*********************************************************** //
/////////////////SEPARATOR//////////////////////////////////////
//*********************************************************** //

//Consulta de crearproyecto que trae las compa�ias //
app.get("/api/companies", (req, res) => {
  const sqlselect = "SELECT * from company";
  db.query(sqlselect, (err, result) => {
    res.send(result);
  });
});
//Consulta de crearproyecto que trae las compa�ias //

//*********************************************************** //
/////////////////SEPARATOR//////////////////////////////////////
//*********************************************************** //

//Consulta del MOdal.js que trae los servicios por id de projecto//
app.post("/api/getservbyid", (req, res) => {
  const idproject = req.body.idproj;
  const sqlSelect =
    "SELECT services_serv_id from project_services WHERE project_proj_id = ?";
  db.query(sqlSelect, idproject, (err, result) => {
    res.send(result);
  });
});
//Consulta del MOdal.js que trae los servicios por id de projecto//

//*********************************************************** //
/////////////////SEPARATOR//////////////////////////////////////
//*********************************************************** //

//Consulta del Modal.js que trae la tabla de servicios//
app.get("/api/servicestable", (req, res) => {
  const sqlselect = "SELECT * from services";
  db.query(sqlselect, (err, result) => {
    res.send(result);
  });
});
//Consulta del Modal.js que trae la tabla de servicios//

//*********************************************************** //
/////////////////SEPARATOR//////////////////////////////////////
//*********************************************************** //

//Consulta de inserccion de projecto//
app.post("/create", (req, res) => {

  const homeaddress = req.body.homeaddress;
  const homeownername = req.body.homeownername;
  const homeownerphone = req.body.homeownerphone;
  const homeownermail = req.body.homeownermail;
  const projectownername = req.body.companyrequest;
  const projectdescription = req.body.projectdescription;
  const projstatus = "Created";
  const projcode = "1234";
  const projfilesnomenclature = req.body.projectownername.slice(0, 5);
  const currentdate = req.body.currentdate;
  const dateassigned = req.body.jobday;
  const datedelivered = "";
  const clientid = req.body.projectownername;
  const housesqft = req.body.housesqft;
  const checkboxes = req.body.checkboxes;
  const surveyor = "";
  const architect = "";
  const sethour = req.body.timeday;
  const sql = "INSERT INTO project (proj_id,proj_address,home_owner_name,home_owner_phone,home_owner_email,proj_houseOwnerName,proj_description,proj_status,proj_code,proj_filesNomenclature,proj_dateCreated,proj_dateAssigned,proj_dateDelivered,client_cli_id,squarefeet,surveyor,	architec,sethour) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  db.query(sql,
    [
      "",
      homeaddress,
      homeownername,
      homeownerphone,
      homeownermail,
      projectownername,
      projectdescription,
      projstatus,
      projcode,
      projfilesnomenclature,
      currentdate,
      dateassigned,
      datedelivered,
      clientid,
      housesqft,
      surveyor,
      architect,
      sethour,
    ],
      (err, result) => {
          if (err) throw err;
          res.send(result);
      checkboxes.forEach((element) => {
        if (element.checked === true) {
          const insert =
            "INSERT into project_services(projserv_description,	project_proj_id,project_client_cli_id,services_serv_id) VALUES(?,?,?,?)";

          db.query(
            insert,
            [element.item, result.insertId, clientid, element.id],
            (err, results) => {
              if (err) throw err;
              console.log("inserted element", element.item);
              //res.send(results);
            }
          );
        }
      });
      //inserccion projectfiles
    }
  );
});
//Consulta de inserccion de projecto//

//*********************************************************** //
/////////////////SEPARATOR//////////////////////////////////////
//*********************************************************** //
//Reinsert services from modal edit//
app.post("/reinsertservices", (req, res) => {
  const idproj = req.body.idproj;
  const clientid = req.body.cliente;
  const checked = req.body.checked;
  const tag = req.body.tag;
  const servid = req.body.servid;
  if (checked === false) {
    const insertService =
      "INSERT into project_services(projserv_description,project_proj_id,project_client_cli_id,services_serv_id) VALUES(?,?,?,?)";
    db.query(insertService, [tag, idproj, clientid, servid], (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  } else {
    const deleteService =
      "DELETE from project_services WHERE project_proj_id = ?  AND  services_serv_id = ? ";
    db.query(deleteService, [idproj, servid], (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  }
});

//Reinsert services from modal edit//

//*********************************************************** //
/////////////////SEPARATOR//////////////////////////////////////
//*********************************************************** //

//Consulta de inserccion de links en project_files segun tipo de link y projid//
app.post("/projectfiles", (req, res) => {
  const linktype = req.body.linktype;
  const link = req.body.link;
  const idproj = req.body.idproj;
  const clientcliid = req.body.clientcliid;
  const description = req.body.description;
  const insertProjFile =
    "INSERT into project_files(projfile_id,projfile_linkType,projfile_link,projfile_description,project_proj_id,project_client_cli_id) VALUES(?,?,?,?,?,?)";
  db.query(
    insertProjFile,
    ["", linktype, link, description, idproj, clientcliid],
    (err, results) => {
      if (err) throw err;
      //console.log("inserted element");
      //res.send(results);
      //console.log(results)
      const sqlSelect = "SELECT * from project_files WHERE project_proj_id = ?";
      db.query(sqlSelect, idproj, (err, result) => {
        res.send(result);
      });
    }
  );
});
//Consulta de inserccion de links en project_files segun tipo de link y projid//

//Consulta de eliminacion de link en project_files con el projfile_id//
app.post("/delete/links", (req, res) => {
  const linkid = req.body.linkid;
  const idproj = req.body.idproj;
  const deleteProjFile = "DELETE from project_files WHERE projfile_id = ?";
  db.query(deleteProjFile, [linkid], (err, results) => {
    if (err) throw err;
    const sqlSelect = "SELECT * from project_files WHERE project_proj_id = ?";
    db.query(sqlSelect, idproj, (err, result) => {
      res.send(result);
    });
  });
});
//Consulta de eliminacion de link en project_files con el projfile_id//

//Consulta del Home para eliminar el proyecto en pagina principal icono x //
app.post("/delete/home/project", (req, res) => {
    const idproj = req.body.projectid;
    const clientid = req.body.clientid;
    const deleteProj = "DELETE from project WHERE proj_id = ?";
    db.query(deleteProj, [idproj], (err, results) => {
        if (err) throw err;
        if (clientid === 1) {
            const sqlSelect = "SELECT * from project";
            db.query(sqlSelect, (err, result) => {
                res.send(result);
            });
        } else {
            const sqlSelect = "SELECT * from project WHERE client_cli_id = ?";
            db.query(sqlSelect, clientid, (err, result) => {
                res.send(result);
            });
        }
    });
});
//Consulta del Home para eliminar el proyecto en pagina principal icono x //



//Consulta de actualizacion de estado de proyecto en tabla project desde el modal //
app.post("/update/status", (req, res) => {
  const status = req.body.currentstatus;
  const idproj = req.body.idproj;
  const updatestatus = "UPDATE project SET proj_status = ? WHERE proj_id = ? ";
  db.query(updatestatus, [status, idproj], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
//Consulta de actualizacion de estado de proyecto en tabla project desde el modal //

//Consulta de creacion e inserccion de cliente nuevo independiente tabla clients , viene de createproject //

//Consulta de creacion e inserccion de cliente nuevo independiente tabla clients , viene de createproject //

//chat insert sms from clien and projid//
app.post("/chat/sms", (req, res) => {
  const sms = req.body.note;
  const idproj = req.body.idproj;
  const clientid = req.body.currentclient;
  const insertsms =
    "INSERT into chat(id,id_client,id_proj,sms) VALUES(?,?,?,?)";
  db.query(insertsms, ["", clientid, idproj, sms], (err, results) => {
    if (err) throw err;
    const sqlSelect = "SELECT * from chat WHERE id_proj = ?";
    db.query(sqlSelect, [idproj], (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
});
//chat insert sms from clien and projid//

//Api getsms from chat by projid //
app.post("/api/getsms", (req, res) => {
  const idproj = req.body.idproj;
  const getsms = "SELECT * from chat WHERE id_proj = ?";
  db.query(getsms, [idproj], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
//Api getsms from chat by projid //

//Api getvrnotes from modal by projid //
app.post("/api/getvrnotes", (req, res) => {
  const idproj = req.body.idproj;
  const getvrnote = "SELECT * from vnotes WHERE id_proj = ?";
  db.query(getvrnote, [idproj], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
//Api getvrnotes from modal by projid //

//chat insert vrnotes from clien and projid//
app.post("/chat/vrnotes", (req, res) => {
  const sms = req.body.vrnotes;
  const idproj = req.body.idproj;
  const clientid = req.body.currentclient;
  const insertsms =
    "INSERT into vnotes(id,id_client,id_proj,sms) VALUES(?,?,?,?)";
  db.query(insertsms, ["", clientid, idproj, sms], (err, results) => {
    if (err) throw err;
    const sqlSelect = "SELECT * from vnotes WHERE id_proj = ?";
    db.query(sqlSelect, [idproj], (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
});
//chat insert vrnotes from clien and projid//

//Consulta del Modal.js que trae el invoice//
app.post("/api/getinvoice", (req, res) => {
  const idproj = req.body.idproj;
  const sqlselect = "SELECT * from invoice WHERE  id_project = ?";
  db.query(sqlselect, [idproj], (err, result) => {
    res.send(result);
  });
});
//Consulta del Modal.js que trae el invoice//

//Consulta del Modal.js que trae los surveyors//
app.get("/api/surveyors", (req, res) => {
  const sqlselect =
    "SELECT * from client WHERE  type = 'surveyor' AND role = 'surveyor'";
  db.query(sqlselect, (err, result) => {
    res.send(result);
  });
});
//Consulta del Modal.js que trae los surveyors//

//Consulta del Modal.js que trae los architecs//
app.get("/api/architecs", (req, res) => {
  const sqlselect =
    "SELECT * from client WHERE  type = 'architec' AND role = 'architec'";
  db.query(sqlselect, (err, result) => {
    res.send(result);
  });
});
//Consulta del Modal.js que trae los architecs//

//Consulta de actualizacion de surveyor desde el modal//
app.post("/updatesurveyor", (req, res) => {
  const idproj = req.body.idproj;
  const updatesurveyor = req.body.updatesurveyor;
  const updatesurve = "UPDATE project SET surveyor = ? WHERE proj_id = ? ";
  db.query(updatesurve, [updatesurveyor, idproj], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
//Consulta de actualizacion de surveyor desde el modal//

//Consulta de actualizacion de architec desde el modal//
app.post("/updatearchitec", (req, res) => {
  const idproj = req.body.idproj;
  const updatearchitec = req.body.updatearchitec;
  const updatesurve = "UPDATE project SET architec = ? WHERE proj_id = ? ";
  db.query(updatesurve, [updatearchitec, idproj], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
//Consulta de actualizacion de architec desde el modal//

//Update field in project table multiquery sqft //
app.post("/update/project/sqft", (req, res) => {
  const idproj = req.body.idproj;
  const fieldvalue = req.body.fieldvalue;
  const updateproject = "UPDATE project SET squarefeet = ? WHERE proj_id = ? ";
  db.query(updateproject, [fieldvalue, idproj], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
//Update field in project table multiquery sqft //

//Update field in project table multiquery jobday //
app.post("/update/project/jobday", (req, res) => {
  const idproj = req.body.idproj;
  const fieldvalue = req.body.fieldvalue;
  const updateproject =
    "UPDATE project SET proj_dateAssigned = ? WHERE proj_id = ? ";
  db.query(updateproject, [fieldvalue, idproj], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
//Update field in project table multiquery jobday//

//Update field in project table multiquery sethour //
app.post("/update/project/sethour", (req, res) => {
  const idproj = req.body.idproj;
  const fieldvalue = req.body.fieldvalue;
  const updateproject = "UPDATE project SET sethour = ? WHERE proj_id = ? ";
  db.query(updateproject, [fieldvalue, idproj], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
//Update field in project table multiquery sethour//

//Update field in project table multiquery address //
app.post("/update/project/setaddress", (req, res) => {
  const idproj = req.body.idproj;
  const fieldvalue = req.body.fieldvalue;
  const updateproject =
    "UPDATE project SET proj_address  = ? WHERE proj_id = ? ";
  db.query(updateproject, [fieldvalue, idproj], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
//Update field in project table multiquery address//

//Update field in project table multiquery address //
app.post("/update/project/sethomeowner", (req, res) => {
  const idproj = req.body.idproj;
  const fieldvalue = req.body.fieldvalue;
  const updateproject =
    "UPDATE project SET home_owner_name  = ? WHERE proj_id = ? ";
  db.query(updateproject, [fieldvalue, idproj], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
//Update field in project table multiquery address//

//Update field in project table multiquery homeownerphone //
app.post("/update/project/sethomeownerphone", (req, res) => {
  const idproj = req.body.idproj;
  const fieldvalue = req.body.fieldvalue;
  const updateproject =
    "UPDATE project SET home_owner_phone  = ? WHERE proj_id = ? ";
  db.query(updateproject, [fieldvalue, idproj], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
//Update field in project table multiquery homeownerphone//

//Update field in project table multiquery homeownermail //
app.post("/update/project/sethomeownermail", (req, res) => {
  const idproj = req.body.idproj;
  const fieldvalue = req.body.fieldvalue;
  const updateproject =
    "UPDATE project SET home_owner_email  = ? WHERE proj_id = ? ";
  db.query(updateproject, [fieldvalue, idproj], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
//Update field in project table multiquery homeownermail//

//Update field in project table multiquery homeownermail //
app.post("/update/project/contractor", (req, res) => {
  const idproj = req.body.idproj;
  const fieldvalue = req.body.fieldvalue;
  const updateproject =
    "UPDATE project SET client_cli_id  = ? WHERE proj_id = ? ";
  db.query(updateproject, [fieldvalue, idproj], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
//Update field in project table multiquery homeownermail//

//Insert Invoice id link and status//
app.post("/invoice", (req, res) => {
  const idproj = req.body.idproj;
  const clientcliid = req.body.clientcliid;
  const waveappid = req.body.waveappid;
  const waveapplink = req.body.waveapplink;
  const waveappstatus = req.body.waveappstatus;
  const insertinvoice =
    "INSERT into invoice(id,id_project,id_client,num_invoice,linkapp,inv_status) VALUES(?,?,?,?,?,?)";
  db.query(
    insertinvoice,
    ["", idproj, clientcliid, waveappid, waveapplink, waveappstatus],
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});
//Insert Invoice id link and status//


//app.listen(5000, () => {
  // console.log("listen on 5000");
//});




https.createServer({
    key: fs.readFileSync(`${certPath}/privkey.pem`),
    cert: fs.readFileSync(`${certPath}/fullchain.pem`)
},app).listen(5000);



