import qrcode
import logging
from flask import Flask, render_template, request
from flask_cors import CORS

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
CORS(app)

def generate_qrcode(data):
    """
    QR코드를 생성하는 함수
    :param data: QR코드로 변환할 문자열
    :return: QR코드 이미지
    """
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill='black', back_color='white')
    return img


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/blend', methods=['POST'])
def blend():
    app.logger.info('This is an info message')
    """
    이미지 두 장을 받아서 AI 모델을 이용해서 합친후 출력
    :return:
    """

    image1 = request.files['image1']
    image2 = request.files['image2']

    app.logger.info(image1.content_type)
    app.logger.info(image2.content_type)

    # ai 로직 구현

    # return render_template('blend.html', image=image)
    return "hello"

if __name__ == '__main__':
    app.run()
