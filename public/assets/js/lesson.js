var lessonData = document.querySelector("#lesson-module");
var topic = lessonData.dataset.topic;
var lesson = lessonData.dataset.lesson;

var lessonPath = topic + "." + lesson;

function updateTime() {
  $.post("/update_lesson_time", {lessonPath: lessonPath}, function(data, status) {
    // Just update the last seen time
    // TODO - add proper error handling here
  });
};

function setSavedNote() {
  $.get("/lesson_data", function(data, status) {
    document.getElementById('lessonNotes').value = data[0]["lesson_modules"][topic][lesson].notes;
  })
}

function updateNotes() {
  var notes = document.getElementById("lessonNotes").value;
  $.post("/update_lesson_notes", {lessonPath: lessonPath, notes: notes}, function(data, status) {
  });
}

function setLessonStatus() {
  $.get("/lesson_data", function(data, status) {
    if(status) {
      if(data[0]["lesson_modules"][topic][lesson].status) {
        document.getElementById("lessonStatus").textContent="Complete!";
      } else {
        document.getElementById("lessonStatus").textContent="Incomplete!";
      }
    }
  });
}

function updateLessonStatus(status) {
  $.post("/update_lesson_status", {lessonPath: lessonPath, status: status}, function(data, status) {
    setLessonStatus()
  });
}

if(document.getElementById("lessonStatus")) {
  updateTime();
  setLessonStatus();
  setSavedNote();
}
