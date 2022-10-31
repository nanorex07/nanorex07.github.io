(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function () {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
            resize();
        });
    });
    let mailbtn = document.querySelector(".submit-btn").addEventListener("click", () => {
        let subject = document.querySelector("#ip-subject");
        let msg = document.querySelector("#ip-msg");
        document.location = "mailto:jainnamah@gmail.com" + "?subject=" + subject + "&body=" + msg;
    });

    let data = [
        {
            "name": "Path Finding Python",
            "image": "./img/pathfind.jpeg",
            "github": "https://github.com/nanorex07/path-finding-python",
            "youtube": "#",
            "link": "https://github.com/nanorex07/path-finding-python"
        },
        {
            "name": "PyNeat",
            "image": "https://raw.githubusercontent.com/nanorex07/PyNeat/main/py_neat.gif",
            "github": "https://github.com/nanorex07/PyNeat",
            "youtube": "#",
            "link": "https://github.com/nanorex07/PyNeat"
        },
        {
            "name": "Denarii - Expense Tracker",
            "image": "https://raw.githubusercontent.com/nanorex07/Denarii/main/assets/5gj6Xa1gwu.gif",
            "github": "https://github.com/nanorex07/Denarii",
            "youtube": "#",
            "link": "https://github.com/nanorex07/Denarii"
        },
        {
            "name": "MNIST Classifier",
            "image": "./img/mnist.gif",
            "github": "https://github.com/nanorex07/mnist-classifier",
            "youtube": "https://www.youtube.com/watch?v=xHxHKfick8M",
            "link": "https://github.com/nanorex07/mnist-classifier"
        },
        {
            "name": "Contest Lister CLI",
            "image": "./img/contestlister.png",
            "github": "https://github.com/nanorex07/Contest-Lister-CLI",
            "youtube": "#",
            "link": "https://github.com/nanorex07/Contest-Lister-CLI"
        },
        {
            "name": "Random Chat App",
            "image": "./img/randomchat.png",
            "github": "https://github.com/nanorex07/random-chat-app",
            "youtube": "#",
            "link": "https://randomchats.herokuapp.com/"
        },
        {
            "name": "URL Shortner",
            "image": "./img/cutshort.png",
            "github": "https://github.com/nanorex07/cutshort",
            "youtube": "#",
            "link": "https://cutshort.onrender.com/"
        },
    ]
    let div = document.querySelector(".firstproject")
    data.forEach((val) => {
        let comp = `
            <div class="portfolio-item">
            <div class="image">
                <img src=${val["image"]} alt="">
            </div>
            <div class="hover-items">
                <h3>${val["name"]}</h3>
                <div class="icons">
                    <a href=${val["github"]} class="icon">
                        <i class="fab fa-github"></i>
                    </a>
                    <a href=${val["link"]} class="icon">
                        <i class="fas fa-link"></i>
                    </a>
                    <a href=${val["youtube"]} class="icon">
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
            </div>
            </div>
        `
        div.insertAdjacentHTML("afterend", comp);
    })


})();

