require('./config/database.js');
var axios = require('axios');
var BaseDeDatos = require("./dao/BaseDeDatos.js");
let baseDeDatos = new BaseDeDatos();
var dotenv = require("dotenv");
var path = require('path');

dotenv.config({path:'./.env'});

const set_triggers = async () => {
  const exams = await baseDeDatos.get_exams()
  var config = { 
    'Content-Type': 'application/json', 
    'Accept': 'application/json', 
    'Authorization': 'Basic YWlyZmxvdzphaXJmbG93',
    'auth': {
      'username': process.env.AUTH_USERNAME,
      'password': process.env.AUTH_PASSWORD
    }
  };

  exams.forEach(function(exam) {
    var data = {
      "dag_run_id": exam._id,
      "logical_date": exam.start,
    };

    axios
    .post(process.env.URL + '/api/v1/dags/Deepface/dagRuns', data, config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      // Caso en que ya tiene un trigger para ese logical date.
      if(error.response.status === 409 && error.response.data.detail.includes('DAGRun logical date')){
        return
      }
      console.log(error.response.data);
    });
  })
}

set_triggers();

module.exports = set_triggers;
