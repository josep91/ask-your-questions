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
        const userQuestionsFile = this.files[0];
        
        //If the user selects a file
        if (userQuestionsFile) {
            
            //Sets up input stream from file
            var reader = new FileReader();
            
            //To read the file (see https://www.geeksforgeeks.org/how-to-read-a-local-text-file-using-javascript/)
            reader.onload = function() {
                
                var questionsReadFromUserFile = this.result;
                
                document.getElementById('user_questions_from_file').innerText = questionsReadFromUserFile; //Populates user questions
            };
            
            //Tells FileReader to read the file as text
            reader.readAsText(this.files[0]);
        
        }//End if file    
        //If no file selected
        else {
            //Do nothing
        }
    });//End user upload questions file button listener
    
    //Defines download function
    function download(filenameToDownload, textToDownload) {
        
        //Creates HTML <a> element with download attribute
        var downloadElement = document.createElement('a');
        
        //Implements data URL (see https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server 
        //and https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs)
        downloadElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textToDownload)); //Encodes text in data URL
        downloadElement.setAttribute('download', filenameToDownload);
        
        //Hides the download element
        downloadElement.style.display = 'none'; //I am not using jQuery yet; I am learning first.
        
        //Adds to the page
        document.body.appendChild(downloadElement);
        
        //Simulates a click
        downloadElement.click(); 
        
        //Removes element
        document.body.removeChild(downloadElement); 
        
    }//End download function
    
    //Downloads user questions (and answers when complete) when download button is clicked
    $("#download_button").click( function() {
        
        //Name of file
        var filenameToDownload = "MyQuestionsAndAnswers.txt";
        
        //Populates the string that will be the text of the data URL
        userQuestionsAndAnswersText = "My Questions\n\n" + document.getElementById("user_questions_from_file").innerText + "\n\n\n";
        //FIXM: Check newlines
        userQuestionsAndAnswersText += "My Answers\n\n" + document.getElementById("user_answer_box").value;
        
        //Downlaods file
        download(filenameToDownload, userQuestionsAndAnswersText); 
        
    });//End download button
    
}); //End ready
