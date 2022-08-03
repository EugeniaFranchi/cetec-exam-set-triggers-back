from pymongo import MongoClient
import requests
import json
from dotenv import load_dotenv
from datetime import timedelta
import os



load_dotenv()

def main():
  client = MongoClient(os.environ["MONGO_URL"])
  db = client["myFirstDatabase"]
  col_exams = db["exams"]
  url = os.environ['URL'] + '/api/v1/dags/Deepface/dagRuns'
  
  headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Basic YWlyZmxvdzphaXJmbG93',
  }

  exams = col_exams.find()
  for exam in exams:
    trigger_date = exam['start'] + timedelta(minutes=exam['startMinutesMargin'])
    data = json.dumps({
      "dag_run_id": str(exam.get('_id')),
      "logical_date": str(trigger_date.isoformat())+'Z',
    })
    
    response = requests.request("POST", url, headers=headers, data=data)
    
main()