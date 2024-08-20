
document.addEventListener('DOMContentLoaded', () => {
    let counter = document.getElementById('counter');
    let minusButton = document.getElementById('minus');
    let plusButton = document.getElementById('plus');
    let heartButton = document.getElementById('heart');
    let pauseButton = document.getElementById('pause');
    let likesList = document.querySelector('.likes');
    let commentForm = document.getElementById('comment-form');
    let commentInput = document.getElementById('comment-input');
    let commentsList = document.getElementById('list');

    let intervalId = null;
    let paused = false;
    let count = 0;
    let likes = {};


// Starting Counter
    const startCounter = () => {
        intervalId = setInterval(() => {
            if (!paused) {
                count++;
                counter.textContent = count;
            }
        }, 1000);
    };

// Updating Counter
    const updateCounter = (value) => {
        count += value;
        counter.textContent = count;
    };

// Event listener: Plus Button
    plusButton.addEventListener('click', () => {
        updateCounter(1);
    });

// Event listener: Minus Button
    minusButton.addEventListener('click', () => {
        updateCounter(-1);
    });

// Event listener: Heart Button
    heartButton.addEventListener('click', () => {
        if (!likes[count]) {
            likes[count] = 1;
        } else {
            likes[count]++;
        }

        let likeItem = document.querySelector(`li[data-num="${count}"]`);

        if (likeItem) {
            likeItem.textContent = `${count} has been liked ${likes[count]} times`;
        } else {
            let li = document.createElement('li');
            li.setAttribute('data-num', count);
            li.textContent = `${count} has been liked 1 time`;
            likesList.appendChild(li);
        }
    });

// Event listener: Pause Button
    pauseButton.addEventListener('click', () => {
        paused = !paused;
        if (paused) {
            clearInterval(intervalId);
            pauseButton.textContent = 'resume';
            minusButton.disabled = true;
            plusButton.disabled = true;
            heartButton.disabled = true;
        } else {
            startCounter();
            pauseButton.textContent = 'pause';
            minusButton.disabled = false;
            plusButton.disabled = false;
            heartButton.disabled = false;
        }
    });

// Event listener: Comment Form Submission
   commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let comment = commentInput.value;
        if (comment.trim() !== '') {
            let p = document.createElement('p');
            p.textContent = comment;
            commentsList.appendChild(p);
            commentInput.value = '';
        }
    });

// Start counter when page loads
    startCounter();
});
