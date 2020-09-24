import moment from 'moment';

export default class ClassTracker {
  constructor() {
    this.allAddedClasses = {};
    this.classLimit = 0;
    this.allAddedClassesByWeek = {};
  }

  setClassLimit(studentType){
    if (studentType ==='bbt'){
      this.classLimit = 3;
    } else {
      this.classLimit = 2;
    }
  }

  updateClasses(classes){
    let date = Object.keys(classes)[0];
    let isValid = this.validateClassesAdded(classes);
    if (isValid){
      this.allAddedClasses[date] = classes[date];
      return this.allAddedClasses;
    } else {
      throw Error("Too many classes added for the week");
    }
  }

  validateClassesAdded(classes) {
    let date = Object.keys(classes)[0];
    console.log("ALL ADDED CLASSES BY WEEK: " + JSON.stringify(this.allAddedClassesByWeek));

    let dateObject1 = moment();
  
    let firstDayOfMonth = () => {
      let dateObject = dateObject1.dateObject;
      let firstDay = moment(dateObject).startOf('month').format('d');
      return parseInt(firstDay);
    }
  
    let parsedDate = parseInt(date.split('-')[1]);
    //TODO: fix the math here
    let week = Math.floor((parsedDate + firstDayOfMonth()+1)/7) + 1;
    // temp.push(classes[date]);
    if (!Object.keys(this.allAddedClassesByWeek).includes(week.toString())){
      this.allAddedClassesByWeek[week.toString()] = classes;
    } else {
      let temp = this.allAddedClassesByWeek[week.toString()];
      temp[date] = classes[date];

      console.log("TEMP: " + JSON.stringify(temp));

      let count = 0;
      Object.keys(temp).forEach((date)=> {
        count = count + temp[date].length;
      });

      if (count > this.classLimit) {
        return false;
      } else {
        this.allAddedClassesByWeek[week.toString()].date = classes[date];
      }
    }
    return classes;
  }

  getTotalClasses(){
    let total = []

    Object.keys(this.allAddedClasses).forEach((date) => {
      this.allAddedClasses[date].forEach((record) => {
        total.push(record);
      });
    });

    return total;
  }
}

