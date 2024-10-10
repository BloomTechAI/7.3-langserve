FROM python:3.11-slim AS base

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY in_class_examples ./in_class_examples

FROM base AS jupyter
RUN pip install jupyter
