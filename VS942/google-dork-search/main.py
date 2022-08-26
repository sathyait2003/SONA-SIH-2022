from flask import Flask, render_template, request    
from flask_session import Session
from flask_wtf import FlaskForm
from wtforms import FileField, SubmitField
from werkzeug.utils import secure_filename
from dork import search_keys
from bert import bert_sim
import os
from wtforms.validators import InputRequired
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from simProg import similarity_fun
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'
app.config['UPLOAD_FOLDER'] = ''

class UploadFileForm(FlaskForm):
    file = FileField("File", validators=[InputRequired()])
    submit = SubmitField("Upload File")

@app.route('/')
def index():
    return render_template('fieldwork.html')

@app.route('/', methods=['POST'])
def getValue():
    title_text = request.form['title']
    user = search_keys(title_text)
    abs_text = request.form['title2']
    user2 = bert_sim(abs_text)
    if user2>50:
        return render_template('dorkResult.html',user=user, user2 = user2, result="Risk of Plagiarism detected!")
    else:
        return render_template('dorkResult.html',user=user, user2 = user2, result="You can go ahead and upload your Document")
    
@app.route('/home', methods=['GET',"POST"])
def home():
    form = UploadFileForm()
    if form.validate_on_submit():
        file = form.file.data # First grab the file
        
        file.save(os.path.join(os.path.abspath(os.path.dirname(__file__)),app.config['UPLOAD_FOLDER'],secure_filename(file.filename))) # Then save the file

        return render_template('tfi.html', form=form)
    return render_template('tfi.html', form=form)

@app.route('/detection')
def detection():
    data = similarity_fun()
    return render_template("detection.html", data = data)

@app.route('/detectionAdmin')
def detectionAdmin():
    data = similarity_fun()
    return render_template("detectionAdmin.html", data = data)

@app.route('/final_up_pg')
def final_up_pg():
    return render_template("final_upload_to_dbms.html")

if __name__ == '__main__':
    app.run(debug=True)