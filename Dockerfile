FROM python:3

RUN pip3 install websockets

ENV PORT=7890

EXPOSE 7890

COPY . /agent

WORKDIR /agent

CMD ["python", "main.py"]