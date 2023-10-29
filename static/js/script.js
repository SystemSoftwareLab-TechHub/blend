function previewImg1(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview1').src = e.target.result;
            document.getElementsByName('preview1')[0].value = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        document.getElementById('preview1').src = "";
    }
}

function previewImg2(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('preview2').src = e.target.result;
            document.getElementsByName('preview2')[0].value = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        document.getElementById('preview2').src = "";
    }
}

function takeWebcam1() {
    const displayArea = document.querySelector('.display-area');
    displayArea.style.display = 'block';
    const video = document.getElementById('video');

    navigator.mediaDevices.getUserMedia({video: true})
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function (error) {
            console.error('웹캠에 액세스할 수 없습니다:', error);
        });

    // display가 먼저 나타난 후 confirm 창이 뜨게끔(실제 작동 시 display와 confirm이 같이 보여진다고 생각하면 편함)
    setTimeout(function () {
        if (confirm("촬영하시려면 확인 버튼 클릭")) {
            captureImage1();
            capturedImage1 = true;
        } else {
            var input = document.getElementsByName("image1")[0];
            input.addEventListener("change", function () {
                var selectedFile = input.files[0];
                if (selectedFile) {
                    previewImg1(input);
                }
            });
            input.click();
        }
    }, 100); // 100 밀리초(0.1초) 후에 confirm 대화 상자를 표시
}

function takeWebcam2() {
    const displayArea = document.querySelector('.display-area');
    displayArea.style.display = 'block';
    const video = document.getElementById('video');

    navigator.mediaDevices.getUserMedia({video: true})
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function (error) {
            console.error('웹캠에 액세스할 수 없습니다:', error);
        });

    // display가 먼저 나타난 후 confirm 창이 뜨게끔(실제 작동 시 display와 confirm이 같이 보여진다고 생각하면 편함)
    setTimeout(function () {
        if (confirm("촬영하시려면 확인 버튼 클릭")) {
            captureImage2();
            capturedImage2 = true;
        } else {
            var input = document.getElementsByName("image2")[0];
            input.addEventListener("change", function () {
                var selectedFile = input.files[0];
                if (selectedFile) {
                    previewImg1(input);
                }
            });
            input.click();
        }
    }, 100); // 100 밀리초(0.1초) 후에 confirm 대화 상자를 표시
}


// 웹캠으로 사진 촬영
function captureImage1() {
    const displayArea = document.querySelector('.display-area');
    navigator.mediaDevices.getUserMedia({video: true})
        .then(function (stream) {
            const video = document.createElement('video');
            // 해당 코드가 웹캠 사진 찍은 후 페이지에 video에 보이는 화면을 남기는 원인(일단 추측)
            // document.body.appendChild(video);
            video.srcObject = stream;
            video.play();

            video.addEventListener('canplay', function () {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

                const img = document.getElementById('preview1');
                img.src = canvas.toDataURL('image/png', 0.8); // 이미지 포맷 및 품질 조절


                // 웹캠 스트림 종료
                stream.getTracks().forEach(track => track.stop());

                // 촬영 완료 메시지 표시
                alert('촬영 완료 XD');
                displayArea.style.display = 'none';
            });
        })
        .catch(function (error) {
            console.error('웹캠에 액세스할 수 없습니다:', error);
        });
}

function captureImage2() {
    const displayArea = document.querySelector('.display-area');
    navigator.mediaDevices.getUserMedia({video: true})
        .then(function (stream) {
            const video = document.createElement('video');
            // 해당 코드가 웹캠 사진 찍은 후 페이지에 video에 보이는 화면을 남기는 원인(일단 추측)
            // document.body.appendChild(video);
            video.srcObject = stream;
            video.play();

            video.addEventListener('canplay', function () {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

                const img = document.getElementById('preview2');
                img.src = canvas.toDataURL('image/png', 0.8); // 이미지 포맷 및 품질 조절

                // 웹캠 스트림 종료
                stream.getTracks().forEach(track => track.stop());

                // 촬영 완료 메시지 표시
                alert('촬영 완료 XD');
                displayArea.style.display = 'none';
            });
        })
        .catch(function (error) {
            console.error('웹캠에 액세스할 수 없습니다:', error);
        });
}

// 배경 하트 matrix rain 애니메이션 구현
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters =
            "♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥";
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = "";
        this.canvasHeight = canvasHeight;
    }

    draw(context) {
        this.text = this.characters.charAt(
            Math.floor(Math.random() * this.characters.length)
        );
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
        console.log(this.symbols);
    }

    #initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }

    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 15;
const nextFrame = 1000 / fps;
let timer = 0;

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "deeppink";
        ctx.font = effect.fontSize + "px monospace";
        effect.symbols.forEach((symbol) => symbol.draw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height);
});

requestAnimationFrame(animate);


// webcam으로 찍은 이미지 저장
function downloadImages() {
    // 두 개의 이미지 데이터 URL 및 파일 이름 가져오기
    const dataURL1 = document.getElementById('preview1').src;
    const filename1 = 'webcam_image_1.png';

    const dataURL2 = document.getElementById('preview2').src;
    const filename2 = 'webcam_image_2.png';

    // 이미지 다운로드 함수 호출
    downloadImage(dataURL1, filename1);
    downloadImage(dataURL2, filename2);
}

function downloadImage(dataURL, filename) {
            const a = document.createElement('a');
            a.href = dataURL;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }