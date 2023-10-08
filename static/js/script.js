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

// 웹캠 영상 활성화 모습
// 이미지 업로드 처리
// document.getElementById('preview2').addEventListener('click', function () {
//     document.getElementById('fileInput').click();
// });

// document.getElementById('fileInput').addEventListener('change', function (event) {
//     const file = event.target.files[0];
//     if (file) {
//         const img = document.getElementById('preview2');
//         const reader = new FileReader();
//
//         reader.onload = function (e) {
//             img.src = e.target.result;
//         };
//
//         reader.readAsDataURL(file);
//     }
// });
