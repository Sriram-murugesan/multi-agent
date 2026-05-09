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

unary_operators = {
    ast.UAdd: op.pos,
    ast.USub: op.neg,
}

def safe_eval(expr):
    def eval_(node):
        if isinstance(node, ast.Constant):
            if isinstance(node.value, (int, float)):
                return node.value
            raise TypeError("Unsupported constant")
        elif isinstance(node, ast.Num):
            return node.n
        elif isinstance(node, ast.UnaryOp) and type(node.op) in unary_operators:
            return unary_operators[type(node.op)](eval_(node.operand))
        elif isinstance(node, ast.BinOp):
            if type(node.op) not in operators:
                raise TypeError("Unsupported binary operator")
            return operators[type(node.op)](eval_(node.left), eval_(node.right))
        else:
            raise TypeError("Unsupported expression")

    tree = ast.parse(expr, mode='eval')
    return eval_(tree.body)

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
        data = requests.get(f"https://wttr.in/{city}?format=j1", timeout=8).json()
        current = data["current_condition"][0]
        return f"{city}: {current['temp_C']}°C, {current['weatherDesc'][0]['value']}"
    except Exception as e:
        return f"Weather fetch failed: {e}"
