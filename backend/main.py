from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
from mrp1_logic import calculate_mrp1
from mrp2_logic import calculate_mrp2

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "https://mrp-backend-550i.onrender.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class MRP1Input(BaseModel):
    mps: Dict[str, Dict[str, int]]
    bom: Dict[str, Dict[str, int]]
    inventory: Dict[str, int]
    safety_stock: Dict[str, int] = {}  

class MRP2Input(BaseModel):
    mps: Dict[str, Dict[str, int]]
    bom: Dict[str, Dict[str, int]]
    inventory: Dict[str, int]
    capacity: Dict[str, int]
    safety_stock: Dict[str, int] = {} 


@app.post("/calculate-mrp")
def calculate_mrp(data: MRP1Input):
    return calculate_mrp1(data)

@app.post("/calculate-mrp-ii")
def calculate_mrp_ii(data: MRP2Input):
    return calculate_mrp2(data)
