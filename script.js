/**
 * Declares functions to allow user interaction with the Ask Your Questions site.
 * Author: Joseph Nielson
 * Date: June 15, 2020
*/

//Variable
var userQuestionsAndAnswersText = "none"; //The text that will be downloaded in the file

//Runs when document is ready
$(document).ready(function() {
    
    //Populates user questions and text boxes when user selects file (listener for select file button)
    $("#user_questions").change( function() {
        
        //References the file
        //const userQuestionsFile = this.files[0];
        
        //If the user selects a file
        //if (userQuestionsFile) {
            
            //Sets up input stream from file
            var reader = new FileReader();
            
            reader.onload = function() {
                var questionsReadFromUserFile = this.result;
                //var testVar = this.result;
                //$("#user_questions_and_answer_boxes").append("<span>Test" + textVar + "</span>"); //Test
                document.getElementById('user_questions_from_file').innerText = questionsReadFromUserFile; //Test
                //$("#test_printing").innerText = questionsReadFromUserFile; //Test
                //$("#test_printing").text(this.result); 
                
            }
            
            reader.readAsText(this.files[0]);
            
            //Creates HTML string with the user's questions and text boxes for answers
            var questionText = "<span>Test" + questionsReadFromUserFile + "</span>";
            
            //Appends the HTML string to the div element on the page 
            
            $("#user_questions_and_answer_boxes").append(questionText);
        
        //}//End if file    
        //If no file selected
        //else {
            
            //$("#user_questions_and_answer_boxes").append(text);
        //}
    });//End user upload questions file button listener
    
    //Defines download function
    function download(filenameToDownload, textToDownload) {
        
        //Creates HTML <a> element with download attribute
        var downloadElement = document.createElement('a');
        
        //Implements data URL (see https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server 
        //and https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
        downloadElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textToDownload)); //Encodes text in data URL
        downloadElement.setAttribute('download', filenameToDownload);
        
        //Hides the download element, adds it to the page, clicks the element, then removes the element
        downloadElement.style.display = 'none'; //I am not using jQuery yet; I am learning first.
        document.body.appendChild(downloadElement);
        
        downloadElement.click(); //Simulates a click
        
        document.body.removeChild(downloadElement); //Removes element
        
    }
    
    //Downloads user questions (and answers when complete) when download button is clicked
    $("#download_button").click( function() {
        
        //Name of file
        var filenameToDownload = "MyQuestionsAndAnswers.txt";
        
        //Populates the string that will be the text of the data URL
        userQuestionsAndAnswersText = "My Questions\n\n" + document.getElementById("user_questions_from_file").innerText + "\n\n\n";
        //FIXM: Check newlines
        userQuestionsAndAnswersText += "My Answers\n\n" + document.getElementById("user_answer_box").value;
        
        download(filenameToDownload, userQuestionsAndAnswersText); //Downlaods file
        
    });//End download button
    
}); //End ready