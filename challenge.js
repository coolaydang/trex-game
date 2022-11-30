
var marks = [30,90,45,55];

function marks_average()
{
  var sum = 0; 
    for(var i = 0; i<marks.length; i= i+1)
      {
        //sum = sum + marks[i];
        if (marks[i] >= 45){
          console.log(marks[i]);
        }
      }
  var average_marks =sum/marks.length;
  //console.log(average_marks);
}

function setup() {
  createCanvas(400, 400);
  marks_average();
}

function draw() {
  background(150);
}