FROM python:3

COPY requirements.txt .

RUN pip install -r requirements.txt

WORKDIR /WSapp

ENV PORT=7890

EXPOSE 7890

COPY ./app ./app

CMD ["python", "app/main.py"]