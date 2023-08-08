from typing import Optional,Union
from pydantic import BaseModel, Field

class ResponseModel(BaseModel):
    code: int = Field(title="200")
    message: str = Field(title="succes")