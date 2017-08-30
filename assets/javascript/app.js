$(document).ready(function(){

	//Global variables
	var timeLeft = 5; //time for first question
	var countDown = $(".countDown"); //target HTML used to display time
	var currentQuestion = $(".question"); //target HTML to display current question
	var correct = 0; //count correct answers
	var inCorrect = 0; //count incorrect answers
	var questionNumber = 0; //count questions asked

	//Store questions as an array of objects
	var myQuestions = [
		{
			question: "The answer is a?",
			answers: [
				"a: Something",
				"b: Something",
				"c: Something",
				"d: Something"
			],
			correct: "a"
		},
		{
			question: "The answer is b?",
			answers: [
				"a: Something",
				"b: Something",
				"c: Something",
				"d: Something"
			],
			correct: "b"
		},
		{
			question: "The answer is c?",
			answers: [
				"a: Something",
				"b: Something",
				"c: Something",
				"d: Something"
			],
			correct: "c"
		},
		];
	//call the timeOut function every 1 second
	var interval = setInterval(timeOut, 1000);
	//display time left on page
	countDown.html("Time Remaining: "+timeLeft+" seconds");
	//use setTimeout to call populate questions so synched better with timeout call above
	setTimeout(populateQuestions, 1000);

//click handler for buttons
$(document).on("click", "button", checkCorrect);

//
function checkCorrect() {
	console.log($(this).attr("data").charAt(0));
	console.log(myQuestions[questionNumber].correct);
	if($(this).attr("data").charAt(0) === myQuestions[questionNumber].correct) {
		correct++;
		console.log("Correct!!!");
		pause();
	}
	else if (questionNumber === myQuestions.length){
		pause();
	}
	else {
		inCorrect++;
		console.log("The correct answer is "+myQuestions[questionNumber].correct);
		pause();
		}
}

	function pause() {
		$(document).off("click", "button");
		clearInterval(interval);
		// $(document).off("click", "button");
		setTimeout(reset, 3000);
	}

	function reset() {
		clearInterval(interval);
		questionNumber++;
		timeLeft = 5;
		interval = setInterval(timeOut, 1000);
		countDown.html("Time Remaining: "+timeLeft+" seconds");
		

		if(questionNumber <= myQuestions.length-1){
			setTimeout(populateQuestions, 1000);

			$(document).on("click", "button", checkCorrect);
		}
		else {
			clearTimeout(interval);
			console.log("Quiz complete");
			countDown.html("Quiz Finished");
		}
	}

	function timeOut() {
		if (timeLeft === 0 && questionNumber < myQuestions.length-1) {
			countDown.html("Time Remaining: "+timeLeft+" seconds");
			console.log("Ran out of time");
			inCorrect++;
			pause();
			
		} 
		else if
			(timeLeft === 0 && questionNumber === myQuestions.length-1){
				countDown.html("Time Remaining: "+timeLeft+" seconds");
				console.log("End of the quiz.")
				countDown.html("Quiz Finished");
				clearTimeout(interval);
				$(document).off("click", "button");
		} 
		else {
			countDown.html("Time Remaining: "+timeLeft+" seconds");
			timeLeft--;
		}
	}

	function populateQuestions() {

		currentQuestion.text(myQuestions[questionNumber].question);

		for(i=0; i<4; i++){
			$(".button"+i).attr("data", myQuestions[questionNumber].answers[i]);
			$(".button"+i).text(myQuestions[questionNumber].answers[i]);
			// console.log($(".button"+i).attr("data").charAt(0));
		}
	}

});


