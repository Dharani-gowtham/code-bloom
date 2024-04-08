from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
from pymongo import MongoClient
from bson.json_util import dumps

app = Flask(__name__)
CORS(app)

client = MongoClient()
db_name = client['code-editor']
collection_questions = db_name['questions']
collection_users = db_name['users']

@app.route("/python-question")
def python_questions():
    questions = collection_questions.find()
    data = dumps(list(questions))
    return data

@app.route('/python', methods=['POST'])
def run_python():
    data = request.get_json()
    print(data['code'])
    code = data['code']
    process = subprocess.Popen(['python', '-c', code], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    output, error = process.communicate()
    if error:
        response = jsonify({"success": False, "message": error})
        return response
    else:
        response = jsonify({"success": True, "message": "Success", "output": output})
        return response
    
@app.route('/python-submit', methods=['POST'])
def submit_python():
    data = request.get_json()
    if data and 'code' in data and 'questionId' in data:
        try:
            # Execute the code and capture the output
            code = data['code']
            question_id = data['questionId']
            # Update the user's code for the selected question
            collection_questions.update_one(
                {"_id": question_id},
                {"$set": {"userCode": code}}
            )
            process = subprocess.Popen(['python', '-c', code], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            output, error = process.communicate()
            if error:
                response = jsonify({"success": False, "message": error})
                return response
            else:
                response = jsonify({"success": True, "message": "Success", "output": output})
                return response
        except Exception as e:
            response = jsonify({"success": False, "message": str(e)})
            return response
    else:
        response = jsonify({"success": False, "message": "No code or question ID provided"})
        return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1001, debug=True)