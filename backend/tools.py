import requests
from duckduckgo_search import DDGS
import ast
import operator as op

# SAFE CALCULATOR (no eval)
operators = {
    ast.Add: op.add,
    ast.Sub: op.sub,
    ast.Mult: op.mul,
    ast.Div: op.truediv,
    ast.Pow: op.pow,
}

def safe_eval(expr):
    def eval_(node):
        if isinstance(node, ast.Num):
            return node.n
        elif isinstance(node, ast.BinOp):
            return operators[type(node.op)](eval_(node.left), eval_(node.right))
        else:
            raise TypeError("Unsupported expression")
    return eval_(ast.parse(expr, mode='eval').body)

def calculator(expression: str):
    try:
        return str(safe_eval(expression))
    except Exception as e:
        return f"Error: {e}"


def search(query: str):
    try:
        with DDGS() as ddgs:
            results = list(ddgs.text(query, max_results=3))
        return "\n".join([r["body"] for r in results])
    except Exception as e:
        return f"Search error: {e}"


def get_weather(city: str):
    try:
        data = requests.get(f"https://wttr.in/{city}?format=j1").json()
        current = data["current_condition"][0]
        return f"{city}: {current['temp_C']}°C, {current['weatherDesc'][0]['value']}"
    except:
        return "Weather fetch failed"


def unit_converter(value, from_unit, to_unit):
    conversions = {
        ("km", "miles"): 0.621371,
        ("miles", "km"): 1.60934,
    }
    key = (from_unit.lower(), to_unit.lower())
    if key not in conversions:
        return "Unsupported conversion"
    return str(value * conversions[key])


# ⚠️ DISABLED CODE EXECUTION (for safety)
def code_executor(code: str):
    return "Code execution disabled for security"