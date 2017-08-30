$(document).ready(function(){

	//Global variables
	var timeLeft = 20; //time for first question
	var countDown = $(".countDown"); //target HTML used to display time
	var currentQuestion = $(".question"); //target HTML to display current question
	var correct = 0; //count correct answers
	var inCorrect = 0; //count incorrect answers
	var questionNumber = 0; //count questions asked

	//Store questions as an array of objects
	var myQuestions = [
		{
			question: '"We are shaped by our thoughts; we become what we think. When the mind is pure, joy follows like a shadow that never leaves."',
			answers: [
				"a: Socrates",
				"b: Buddha",
				"c: Confucius",
				"d: Yoda"
			],
			correct: "b"
		},
		{
			question: '"From the deepest desires often come the deadliest hate."',
			answers: [
				"a: Socrates",
				"b: Buddha",
				"c: Confucius",
				"d: Yoda"
			],
			correct: "a"
		},
		{
			question: '"It is easy to hate and it is difficult to love. This is how the whole scheme of things works."',
			answers: [
				"a: Socrates",
				"b: Buddha",
				"c: Confucius",
				"d: Yoda"
			],
			correct: "c"
		},
		{
			question: '"Fear leads to anger, anger leads to hate, hate leads to suffering."',
			answers: [
				"a: Socrates",
				"b: Buddha",
				"c: Confucius",
				"d: Yoda"
			],
			correct: "d"
		}
		];
	//call the timeOut function every 1 second
	var interval = setInterval(timeOut, 1000);
	//display time left on page
	countDown.html("Time Remaining: "+timeLeft+" seconds");
	//use setTimeout to call populate questions so synched better with timeout call above
	setTimeout(populateQuestions, 1000);

	//click handler for buttons
	$(document).on("click", "button", checkCorrect);

	//on click of button check for correct or incorrect answer, itterate counter and display results
	function checkCorrect() {
		console.log($(this).attr("data").charAt(0));
		console.log(myQuestions[questionNumber].correct);
		if($(this).attr("data").charAt(0) === myQuestions[questionNumber].correct) {
			correct++;
			$(".questionResult").html("<h3>You are wise.</h3>");
			$(".questionResult").append("<h3>"+myQuestions[questionNumber].correct+": is the correct answer.</h3>");
			// $(".questionResult").html("<h3>You are wise. "+myQuestions[questionNumber].correct+": is the correct answer.</h3>");
			console.log("Correct!!!");
			pause();
		}
		else if (questionNumber === myQuestions.length){
			pause();
		}
		else {
			inCorrect++;
			$(".questionResult").html("<h3>That is incorrect.</h3>");
			$(".questionResult").append("<h3>"+myQuestions[questionNumber].correct+": is the correct answer.</h3>");
			console.log("The correct answer is "+myQuestions[questionNumber].correct);
			pause();
		}
	}
	//called when ending a question to wait for 3 seconds and disable the click handler
	function pause() {
		$(document).off("click", "button");
		clearInterval(interval);
		// $(document).off("click", "button");
		setTimeout(reset, 5000);
	}
	//called to reset the timer and load next question to the page
	function reset() {
		clearInterval(interval);
		questionNumber++;
		timeLeft = 20;
		interval = setInterval(timeOut, 1000);
		countDown.html("Time Remaining: "+timeLeft+" seconds");
		$(".questionResult").empty();
		$("button").blur();
		
		//if more questions to ask then load next question and turn click handler back on
		if(questionNumber <= myQuestions.length-1){
			setTimeout(populateQuestions, 1000);
			// populateQuestions(); use this to have timer reset and question happen at same time. First second still two seconds long though
			$(document).on("click", "button", checkCorrect);
		}
		//otherwise end of quiz
		else {
			clearTimeout(interval);
			console.log("Quiz complete");
			countDown.html("Quiz Finished");
			currentQuestion.empty();
			$(".buttons").empty();
			$(".questionResult").html("<h3>Correct answers = "+correct+"</h3>");
			$(".questionResult").append("<h3>Wrong answers = "+inCorrect+"</h3>");
		}
	}
	//runs every second to check if timer finished
	function timeOut() {
		//check if ran out of time and questions are left to ask
		if (timeLeft === 0 && questionNumber < myQuestions.length-1) {
			countDown.html("Time Remaining: "+timeLeft+" seconds");
			console.log("Ran out of time");
			$(".questionResult").html("<h3>Contemplation is good but that was too long. </h3>");
			$(".questionResult").append("<h3>"+myQuestions[questionNumber].correct+": is the correct answer.</h3>");
			inCorrect++;
			pause();	
		}
		//check if ran out of time on last question
		else if
			(timeLeft === 0 && questionNumber === myQuestions.length-1){
				countDown.html("Time Remaining: "+timeLeft+" seconds");
				console.log("Ran out of time last question");
				$(".questionResult").html("<h3>Contemplation is good but that was too long. </h3>");
				$(".questionResult").append("<h3>"+myQuestions[questionNumber].correct+": is the correct answer.</h3>");
				inCorrect++
				pause();
		}
		//otherwise update the html and decrement the timeLeft varaible
		else {
			countDown.html("Time Remaining: "+timeLeft+" seconds");
			timeLeft--;
		}
	}
	//access myQuestions array of objects to populate next question to HTML
	function populateQuestions() {
		currentQuestion.text(myQuestions[questionNumber].question);
		for(i=0; i<4; i++){
			$(".button"+i).attr("data", myQuestions[questionNumber].answers[i]);
			$(".button"+i).text(myQuestions[questionNumber].answers[i]);
			// console.log($(".button"+i).attr("data").charAt(0));
		}
	}

});


