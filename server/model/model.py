from pydantic import BaseModel

class EmployeeDetail(BaseModel):
    app_name: str
    start_time: str
    end_time: str
    duration: str