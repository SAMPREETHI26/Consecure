FROM python:3.10-slim

WORKDIR /app

COPY Backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY Backend/ ./

# Make script executable
RUN chmod +x start.sh

# Use script as entrypoint (exec form preferred)
CMD ["./start.sh"]
