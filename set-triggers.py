from pymongo import MongoClient
import requests
import json
from dotenv import load_dotenv
import os

load_dotenv()

def main():
  client = MongoClient(os.environ["MONGO_URL"])
  db = client["myFirstDatabase"]
  col_exams = db["exams"]
  exams = col_exams.find()

  headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Basic YWlyZmxvdzphaXJmbG93'
  }

  for exam in exams:
    url = os.environ['URL'] + '/api/v1/dags/Deepface/dagRuns'
    data = json.dumps({
      "dag_run_id": str(exam.get('_id')),
      "logical_date": str((exam.get('start')).isoformat())+'Z',
    })
    
    response = requests.request("POST", url, headers=headers, data=data)
    
    print(response.text)
  
main()