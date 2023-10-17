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
    qr.addata(data)
    qr.make(fit=True)
    img = qr.make_image(fill='black', back_color='white')
    return img


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/test', methods=['POST'])
def test():
    app.logger.info('This is an info message')
    img1 = request.form.get('preview1')
    img2 = request.form.get('preview2')

    app.logger.info("테스트 중 입니다")

    # 이미지 2개 받아서 합성
    # ouput img
    # result html에 여러장의 사진을 보내야함(10장)
    return render_template('result.html', result_image1=img1, result_image2=img2)


if __name__ == '__main__':
    app.run(debug=True, port=80)
