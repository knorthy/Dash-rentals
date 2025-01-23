from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

# Route for the Chevi page
@app.route('/chevi')
def chevi():
    return render_template('chevi.html')

# Route for the Nissan page
@app.route('/nissan')
def nissan():
    return render_template('nissan.html')

@app.route("/index")
def booking():
    return render_template("booking.html")

@app.route("/method")
def method():
    return render_template("method.html")

@app.route("/confirm")
def confirm():
    return render_template("confirm.html")

@app.route("/states")
def states():
    return render_template("states.html") 

if __name__ in "__main__":
    app.run(debug=True)