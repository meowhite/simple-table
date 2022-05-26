FROM python:3.7-slim

COPY ./build /app/build

CMD [ "python", "-m", "http.server", "9000", "--directory", "/app/build" ]