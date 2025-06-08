from urllib.parse import quote
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

username = os.getenv("ORACLE_USERNAME")
password = os.getenv("ORACLE_PASSWORD")
host = os.getenv("ORACLE_HOST")
port = os.getenv("ORACLE_PORT")
service = os.getenv("ORACLE_SERVICE")

# URL-encode the password
encoded_password = quote(password)

# Construct the connection string dynamically
DATABASE_URL = f"oracle+oracledb://{username}:{encoded_password}@{host}:{port}/?service_name={service}"

engine = create_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
