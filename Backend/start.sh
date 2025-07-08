#!/bin/bash

python setup_db.py
python ingestion.py
exec python run.py
