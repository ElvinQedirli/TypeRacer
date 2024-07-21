document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.querySelector("#loading-screen");
    const gameScreen = document.querySelector("#game-screen");
    const textTypeSelect = document.querySelector("#text-type-select");
    const customText = document.querySelector("#custom-text");
    const startButton = document.querySelector("#start-button");
    const typingTest = document.querySelector("#typing-test");
    const testText = document.querySelector("#test-text");
    const userInput = document.querySelector("#user-input");
    const timer = document.querySelector("#timer");
    const timeLeft = document.querySelector("#time-left");
    const resultsScreen = document.querySelector("#results-screen");
    const results = document.querySelector("#results");
    const restartButton = document.querySelector("#restart-button");

    const sampleTexts = {
        simple: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore dolore cumque voluptatibus nemo minima quis nihil repellendus incidunt atque.",
        medium: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit officiis saepe, ipsam dolores soluta odio quaerat veniam? Saepe, dignissimos? Fuga accusamus vel et unde quas molestiae doloribus odio explicabo tenetur?",
        good: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque neque laudantium explicabo autem illum rerum vero praesentium, recusandae voluptatem perferendis, iusto, tempore maiores sint odio repellendus minima distinctio qui! Sed.Numquam vero iure in error, quam assumenda blanditiis.",
        hard: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque neque laudantium explicabo autem illum rerum vero praesentium, recusandae voluptatem perferendis, iusto, tempore maiores sint odio repellendus minima distinctio qui! Sed.Numquam vero iure in error, quam assumenda blanditiis, laudantium odit pariatur obcaecati eos animi totam dolor.",
        veryHard: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque neque laudantium explicabo autem illum rerum vero praesentium, recusandae voluptatem perferendis, iusto, tempore maiores sint odio repellendus minima distinctio qui! Sed.Numquam vero iure in error, quam assumenda blanditiis, laudantium odit pariatur obcaecati eos animi totam dolor, harum repellendus fugit exercitationem aspernatur? Excepturi atque iure aperiam quia ducimus, voluptas repellendus? Non?"
    };

    setTimeout(() => {
        loadingScreen.style.display = "none";
        gameScreen.style.display = "block";
    }, 3000);

    textTypeSelect.addEventListener("change", function() {
        if (this.value === "custom") {
            customText.style.display = "block";
        } else {
            customText.style.display = "none";
        }
    });

    startButton.addEventListener("click", function() {
        const selectedTime = parseInt(document.getElementById("time-select").value);
        const selectedTextType = textTypeSelect.value;

        let textToType;
        if (selectedTextType === "custom") {
            textToType = customText.value;
        } else {
            textToType = sampleTexts[selectedTextType];
        }

        if (!textToType) {
            alert("Mətn uyğun deyil. Xahiş olunur mətni dəyişdirin.");
            return;
        }

        gameScreen.style.display = "none";
        typingTest.style.display = "block";
        testText.innerHTML = textToType;
        userInput.value = "";
        userInput.focus();

        let timeRemaining = selectedTime;
        let startTime = new Date().getTime();
        timeLeft.textContent = `${timeRemaining} saniyə`;

        const countdown = setInterval(() => {
            timeRemaining--;
            timeLeft.textContent = `${timeRemaining} saniyə`;

            if (timeRemaining <= 0) {
                clearInterval(countdown);
                showResults(textToType, userInput.value, selectedTime);
            }
        }, 1000);

        userInput.addEventListener("input", function() {
            checkInput(textToType);
            if (userInput.value === textToType) {
                clearInterval(countdown);
                showResults(textToType, userInput.value, selectedTime, new Date().getTime() - startTime);
            }
        });

        function checkInput(text) {
            const words = text.split(" ");
            const inputWords = userInput.value.split(" ");
            const formattedText = words.map((word, index) => {
                if (inputWords[index] === word) {
                    return `<span class="correct">${word}</span>`;
                } else {
                    return word;
                }
            }).join(" ");
            testText.innerHTML = formattedText;
        }

        function showResults(originalText, userText, totalTime, timeTaken) {
            const originalWords = originalText.split(" ");
            const userWords = userText.split(" ");
            const correctWords = userWords.filter((word, index) => word === originalWords[index]).length;
            const accuracy = (correctWords / originalWords.length) * 100;
            const timeTakenInSeconds = timeTaken ? (timeTaken / 1000).toFixed(2) : totalTime;

            typingTest.style.display = "none";
            resultsScreen.style.display = "block";
            results.innerHTML = `
                <p><i class="fa-solid fa-hourglass-end"></i>  Toplam Müddət: ${totalTime} saniyə</p>
                <p><i class="fa-solid fa-hourglass-end"></i>  Tamamlama Müddəti: ${timeTakenInSeconds} saniyə</p>
                <p><i class="fa-solid fa-check"></i> Doğru Sözlər: ${correctWords}</p>
                <p><i class="fa-solid fa-percent"></i> Doğruluq Faizi: ${accuracy.toFixed(2)}%</p>
            `;
        }

        restartButton.addEventListener("click", function() {
            resultsScreen.style.display = "none";
            gameScreen.style.display = "block";
        });
    });
});
