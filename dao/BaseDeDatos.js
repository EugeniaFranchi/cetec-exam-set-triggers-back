var exam = require("../models/exam.js");

class BaseDeDatos {

    constructor(){
        this.examModel = exam;
    }

    async get_exams() {
        const exam_structures = this.examModel.find({});
        return exam_structures;
    }
}

module.exports = BaseDeDatos;
