from flask import Flask, render_template, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC

app = Flask(__name__)

# =========================
# LOAD DATASET + TRAIN MODEL
# =========================

df = pd.read_csv("ultimate_dataset.csv")

X = df["text"]
y = df["label"]

vectorizer = TfidfVectorizer(stop_words="english")
X_vectorized = vectorizer.fit_transform(X)

model = LinearSVC()
model.fit(X_vectorized, y)

# =========================
# ROUTES
# =========================

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/analyze")
def analyze():
    return render_template("analyze.html")


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    text = data.get("text", "")

    user_vector = vectorizer.transform([text])
    prediction = model.predict(user_vector)[0]

    # =========================
    # CLEAN LABELS FOR UI
    # =========================
    if prediction == "normal":
        prediction = "Balanced Friendship"

    elif prediction in ["negative", "anger", "sadness", "fear"]:
        prediction = "Toxic / Negative Behavior"

    elif prediction == "positive":
        prediction = "Healthy Positive Behavior"

    return jsonify({
        "prediction": prediction
    })


if __name__ == "__main__":
    app.run(debug=True)