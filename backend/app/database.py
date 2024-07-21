from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import  declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os


# load_dotenv()
SQLALCHEMY_DATABASE_URL = "postgresql://TaskDB_owner:ENipdUQroR81@ep-proud-boat-a1fftpc0.ap-southeast-1.aws.neon.tech/TaskDB?sslmode=require"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()