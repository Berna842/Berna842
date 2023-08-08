import psycopg2

conn = psycopg2.connect(
    host="localhost",
    port="5432",
    database="BI_App",
    user="postgres",
    password="H0stD1m3")
