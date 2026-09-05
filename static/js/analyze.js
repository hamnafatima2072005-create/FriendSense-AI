// ============================================================
//   FriendSense AI — Complete AI Agent System
//   Developer: Hamna Fatima — BCS-F23-M06
// ============================================================

const questions = [
    { question: "Does your friend help you?", yes: "How often does your friend help you?", sometimes: "Does your friend support you emotionally?", no: "Does your friend ignore your problems?" },
    { question: "How often does your friend help you?", yes: "Does your friend motivate you?", sometimes: "Does your friend listen to you carefully?", no: "Does your friend get angry quickly?" },
    { question: "Does your friend support you emotionally?", yes: "Can you trust your friend with secrets?", sometimes: "Does your friend understand your feelings?", no: "Does your friend create negativity?" },
    { question: "Does your friend ignore your problems?", yes: "Does your friend lie to you?", sometimes: "Does your friend respect your opinions?", no: "Does your friend spend quality time with you?" },
    { question: "Does your friend motivate you?", yes: "Does your friend celebrate your success?", sometimes: "Does your friend encourage your goals?", no: "Does your friend become jealous?" },
    { question: "Does your friend listen to you carefully?", yes: "Does your friend understand your emotions?", sometimes: "Does your friend care about your problems?", no: "Does your friend interrupt you often?" },
    { question: "Can you trust your friend with secrets?", yes: "Do you feel safe with your friend?", sometimes: "Does your friend respect privacy?", no: "Has your friend broken trust before?" },
    { question: "Does your friend create negativity?", yes: "Does your friendship stress you?", sometimes: "Does your friend overreact?", no: "Does your friend make you happy?" },
    { question: "Does your friend lie to you?", yes: "Do lies hurt your friendship?", sometimes: "Does your friend apologize honestly?", no: "Does your friend communicate clearly?" },
    { question: "Does your friend spend quality time with you?", yes: "Do you enjoy spending time together?", sometimes: "Does your friend stay busy often?", no: "Do you feel emotionally distant?" },
    { question: "Does your friend celebrate your success?", yes: "Does your friend feel proud of you?", sometimes: "Does your friend compare themselves with you?", no: "Does jealousy exist in your friendship?" },
    { question: "Does your friend understand your emotions?", yes: "Do you feel emotionally connected?", sometimes: "Does your friend comfort you?", no: "Do misunderstandings happen often?" },
    { question: "Do you feel safe with your friend?", yes: "Would you keep this friendship forever?", sometimes: "Does your friend respect boundaries?", no: "Do you feel emotionally exhausted?" },
    { question: "Does your friendship stress you?", yes: "Do fights happen frequently?", sometimes: "Does your friend confuse you emotionally?", no: "Does your friend calm your stress?" },
    { question: "Do you enjoy spending time together?", yes: "Do you feel happy after meeting your friend?", sometimes: "Do awkward moments happen often?", no: "Do you feel bored around your friend?" },
    { question: "Would you keep this friendship forever?", yes: "Aww! Your friendship looks beautiful!", sometimes: "Your friendship has mixed emotions.", no: "This friendship may be unhealthy." }
];

const negativeQuestions = [
    "Does your friend get angry quickly?",
    "Does your friend create negativity?",
    "Does your friend lie to you?",
    "Does your friend become jealous?",
    "Does jealousy exist in your friendship?",
    "Do misunderstandings happen often?",
    "Do fights happen frequently?",
    "Do you feel emotionally exhausted?",
    "Do you feel bored around your friend?",
    "Does your friend interrupt you often?",
    "Has your friend broken trust before?",
    "Does your friend ignore your problems?",
    "Does your friendship stress you?"
];

let currentQuestion = 0;
let score           = 0;
let trustScore      = 0;
let toxicityScore   = 0;
let emotionalScore  = 0;
let userSummary = [];
let mlPrediction = "Analyzing...";

const questionEl    = document.getElementById("question");
const questionCount = document.getElementById("questionCount");
const progressFill  = document.getElementById("progressFill");
const robotChat     = document.getElementById("robotChat");
const robot         = document.getElementById("robot");


// ============================================================
//   CHAT BUBBLE — Simple direct set, no typewriter
// ============================================================

function setChat(text) {
    robotChat.textContent = text;
}


// ============================================================
//   ROBOT EXPRESSIONS
// ============================================================

function happyRobot() {
    robot.className = "robot happy";
    setChat("Aww that is so sweet!");
}

function sadRobot() {
    robot.className = "robot sad";
    setChat("That feels sad...");
}

function thinkingRobot() {
    robot.className = "robot thinking";
    setChat("Hmmm let me think...");
}


// ============================================================
//   SUB-AGENT 1 — TOXICITY DETECTOR
// ============================================================

function toxicityDetectorAgent(toxicityScore) {
    if (toxicityScore >= 60) {
        return { level: "High Toxicity", value: 10, message: "High toxic patterns detected in this friendship.", color: "#ef4444" };
    } else if (toxicityScore >= 30) {
        return { level: "Moderate Toxicity", value: 50, message: "Some toxic patterns exist — monitor carefully.", color: "#f59e0b" };
    } else {
        return { level: "Low Toxicity", value: 100, message: "Very low toxicity — this friendship feels safe.", color: "#10b981" };
    }
}


// ============================================================
//   SUB-AGENT 2 — TRUST ANALYZER
// ============================================================

function trustAnalyzerAgent(trustScore) {
    if (trustScore >= 60) {
        return { level: "High Trust", value: 100, message: "Strong trust foundation detected.", color: "#8b5cf6" };
    } else if (trustScore >= 30) {
        return { level: "Medium Trust", value: 50, message: "Moderate trust — some areas need improvement.", color: "#f59e0b" };
    } else {
        return { level: "Low Trust", value: 10, message: "Trust is weak — better communication is needed.", color: "#ef4444" };
    }
}


// ============================================================
//   SUB-AGENT 3 — EMOTION DETECTOR
// ============================================================

function emotionDetectorAgent(emotionalScore) {
    if (emotionalScore >= 60) {
        return { level: "Strong Emotional Support", value: 100, message: "Deep emotional connection detected.", color: "#ec4899", dominantEmotion: "Joy" };
    } else if (emotionalScore >= 30) {
        return { level: "Average Emotional Support", value: 50, message: "Emotional support exists but can be stronger.", color: "#f59e0b", dominantEmotion: "Neutral" };
    } else {
        return { level: "Weak Emotional Support", value: 10, message: "Low emotional support — friendship may feel draining.", color: "#ef4444", dominantEmotion: "Sadness" };
    }
}
async function getMLPrediction() {

    let summaryText = userSummary.join(" ");

    try {
        let response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: summaryText
            })
        });

        let data = await response.json();
        mlPrediction = data.prediction;

    } catch (error) {
        console.log("ML Error:", error);
        mlPrediction = "unknown";
    }
}


// ============================================================
//   DECISION LAYER
// ============================================================

function decisionLayer(toxicAgent, trustAgent, emoAgent) {

    let finalScore = Math.round(
        (trustAgent.value * 0.40) +
        (toxicAgent.value * 0.35) +
        (emoAgent.value   * 0.25)
    );

    finalScore = Math.max(0, Math.min(100, finalScore));

    let category, emoji, bg, robotMsg, color;

    if (finalScore >= 80) {
        category = "Amazing Friendship!";
        emoji    = "🎉";
        bg       = "linear-gradient(135deg,#ffe4f1,#f3e8ff)";
        robotMsg = "Best friendship ever!";
        color    = "#10b981";
    } else if (finalScore >= 60) {
        category = "Healthy Friendship!";
        emoji    = "💖";
        bg       = "linear-gradient(135deg,#fff1f8,#f5e9ff)";
        robotMsg = "This friendship feels lovely!";
        color    = "#8b5cf6";
    } else if (finalScore >= 40) {
        category = "Mixed Friendship";
        emoji    = "💭";
        bg       = "linear-gradient(135deg,#fff7ed,#fef3c7)";
        robotMsg = "Some things feel confusing...";
        color    = "#f59e0b";
    } else {
        category = "Toxic Friendship Detected";
        emoji    = "💔";
        bg       = "linear-gradient(135deg,#ffe4e6,#fecdd3)";
        robotMsg = "Please protect your emotions.";
        color    = "#ef4444";
    }

    return { finalScore, category, emoji, bg, robotMsg, color };
}


// ============================================================
//   REPORT GENERATOR
// ============================================================

function reportGenerator(decision, toxicAgent, trustAgent, emoAgent) {

    const simpleAdvice = {
        "Amazing Friendship!": {
            what: "Your friendship is truly beautiful and strong! Your friend genuinely cares about you, supports you in tough times, and celebrates your happiness. This kind of friendship is rare and precious.",
            how:  "Keep doing what you are doing! Spend quality time together, appreciate each other, and always communicate openly. A little gratitude goes a long way.",
            tip:  "Never take this friendship for granted. Check in regularly, celebrate small moments, and always be there for each other."
        },
        "Healthy Friendship!": {
            what: "Your friendship is healthy and caring! There is good trust and emotional support between you two. Small misunderstandings may happen, but the bond is still strong and meaningful.",
            how:  "Focus on open communication — talk honestly when something bothers you. Make time for each other regularly and show appreciation through small gestures.",
            tip:  "Every friendship has rough patches. The key is to talk things out instead of keeping feelings inside. Keep growing together!"
        },
        "Mixed Friendship": {
            what: "Your friendship has both positive and negative moments. Sometimes it feels warm and supportive, and other times it feels confusing or draining. This friendship needs attention.",
            how:  "Start by having an honest conversation with your friend about how you feel. Set clear boundaries about what is acceptable and what is not.",
            tip:  "A true friend will listen when you share your feelings. If your concerns are repeatedly ignored, it may be time to reconsider this friendship."
        },
        "Toxic Friendship Detected": {
            what: "This friendship shows signs of being emotionally unhealthy. There may be negativity, jealousy, broken trust, or lack of support. A friendship should never make you feel stressed or exhausted.",
            how:  "Gently create some distance and focus on your own emotional well-being first. Talk to a trusted family member, teacher, or counselor about how you feel.",
            tip:  "Remember — it is okay to outgrow friendships. Protecting your peace and mental health is not selfish. Surround yourself with people who truly value you."
        }
    };

    const advice = simpleAdvice[decision.category] || simpleAdvice["Mixed Friendship"];

    return `
        <div class="result-hero">
            <div class="result-emoji">${decision.emoji}</div>
            <div class="result-category" style="color:${decision.color}">${decision.category}</div>
            <div class="result-score">Friendship Score: <span style="color:${decision.color}">${decision.finalScore} / 100</span></div>
            <div class="score-bar-wrap">
                <div class="score-bar-fill" style="width:${decision.finalScore}%;background:${decision.color}"></div>
            </div>
        </div>

        <div class="simple-card">
            <div class="simple-block">
                <div class="simple-icon">💬</div>
                <div>
                    <div class="simple-label">What This Means</div>
                    <div class="simple-text">${advice.what}</div>
                </div>
            </div>
            <div class="simple-block">
                <div class="simple-icon">🛠️</div>
                <div>
                    <div class="simple-label">How To Improve</div>
                    <div class="simple-text">${advice.how}</div>
                </div>
            </div>
            <div class="simple-block">
                <div class="simple-icon">💡</div>
                <div>
                    <div class="simple-label">Friendly Tip</div>
                    <div class="simple-text">${advice.tip}</div>
                </div>
            </div>
        </div>

        <div class="agent-section-title">🤖 AI Agent Analysis Report</div>

        <div class="agent-cards">
            <div class="agent-card" style="border-left:4px solid ${toxicAgent.color}">
                <div class="agent-name">Sub-Agent 1 — Toxicity Detector</div>
                <div class="agent-level" style="color:${toxicAgent.color}">${toxicAgent.level}</div>
                <div class="agent-msg">${toxicAgent.message}</div>
            </div>
            <div class="agent-card" style="border-left:4px solid ${trustAgent.color}">
                <div class="agent-name">Sub-Agent 2 — Trust Analyzer</div>
                <div class="agent-level" style="color:${trustAgent.color}">${trustAgent.level}</div>
                <div class="agent-msg">${trustAgent.message}</div>
            </div>
            <div class="agent-card" style="border-left:4px solid ${emoAgent.color}">
                <div class="agent-name">Sub-Agent 3 — Emotion Detector</div>
                <div class="agent-level" style="color:${emoAgent.color}">${emoAgent.level}</div>
                <div class="agent-msg">${emoAgent.message} Dominant Emotion: <strong>${emoAgent.dominantEmotion}</strong></div>
            </div>
            <div class="agent-card" style="border-left:4px solid #06b6d4">
    <div class="agent-name">ML Model Prediction</div>
    <div class="agent-level" style="color:#06b6d4">
        ${mlPrediction}
    </div>
    <div class="agent-msg">
        Trained machine learning model analyzed your answers.
    </div>
</div>
            <div class="agent-card decision-card">
                <div class="agent-name" style="color:rgba(255,255,255,0.75)">Decision Layer — Final Output</div>
                <div class="agent-level" style="color:#fff;font-size:20px">Combined Score: ${decision.finalScore} / 100</div>
                <div class="agent-msg" style="color:rgba(255,255,255,0.75)">All 3 agents combined autonomously to generate this result.</div>
            </div>
        </div>

        <button onclick="location.reload()" class="restart-btn">Analyze Again</button>
    `;
}


// ============================================================
//   NEXT QUESTION
// ============================================================

function nextQuestion(answer) {

    let currentQ   = questions[currentQuestion].question;
    if (answer === "yes") {
    userSummary.push("Yes: " + currentQ);
}
else if (answer === "sometimes") {
    userSummary.push("Sometimes: " + currentQ);
}
else {
    userSummary.push("No: " + currentQ);
}
    let isNegative = negativeQuestions.includes(currentQ);

    // Score + robot reaction
    if (isNegative) {
        if (answer === "yes") {
            score -= 10; toxicityScore += 12; sadRobot();
        } else if (answer === "sometimes") {
            score += 2; emotionalScore += 3; thinkingRobot();
        } else {
            score += 10; trustScore += 8; happyRobot();
        }
    } else {
        if (answer === "yes") {
            score += 10; trustScore += 10; emotionalScore += 8; happyRobot();
        } else if (answer === "sometimes") {
            score += 5; emotionalScore += 5; thinkingRobot();
        } else {
            score -= 5; toxicityScore += 8; sadRobot();
        }
    }

    // Move to next question
    currentQuestion++;

    // End of questions
    if (currentQuestion >= questions.length) {
        setTimeout(function() { finalResult(); }, 800);
        return;
    }

    // Update progress
    let progress = ((currentQuestion + 1) / 16) * 100;
    progressFill.style.width = progress + "%";
    questionCount.innerHTML  = "Question " + (currentQuestion + 1) + " / 16";

    // Question animation
    questionEl.style.opacity = "0";
    setTimeout(function() {
        questionEl.innerHTML     = questions[currentQuestion].question;
        questionEl.style.opacity = "1";
    }, 300);
}


// ============================================================
//   FINAL RESULT
// ============================================================

async function finalResult(){
    await getMLPrediction();

    var toxicAgent = toxicityDetectorAgent(toxicityScore);
    var trustAgent = trustAnalyzerAgent(trustScore);
    var emoAgent   = emotionDetectorAgent(emotionalScore);
    var decision   = decisionLayer(toxicAgent, trustAgent, emoAgent);

    robot.className = decision.finalScore >= 60 ? "robot happy" : "robot sad";
    setChat(decision.robotMsg);

    document.body.style.background = decision.bg;

    document.querySelector(".question-card").innerHTML =
        reportGenerator(decision, toxicAgent, trustAgent, emoAgent);

    document.querySelector(".question-section").scrollTop = 0;
}