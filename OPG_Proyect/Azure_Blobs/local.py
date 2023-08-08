from fastapi import FastAPI
import classes.definition as cls
import functions.blobs as blobs
import functions.users as users
from typing import Optional,Union
import DBs.conn as con

app = FastAPI()

@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/users/")
async def list_all_users(user: str, enterprise: str):
    return users.user_list_all(con.conn.cursor(), user, enterprise)

@app.get("/users/my_user")
async def display_user(user: str):
    return users.user_list_my(con.conn.cursor(), user)

@app.put("/users/my_user")
async def update_user(user: str, args: str):
    msg = users.update_user(con.conn.cursor(), user, args)
    con.conn.commit()
    return msg

@app.delete("/users/my_user")
async def delete_user(user: str, enterprise: str, guid):
    msg = users.delete_user(con.conn.cursor(), user, enterprise, guid)
    con.conn.commit()
    return msg

@app.put("/users/disable")
async def disable_user(user:str, enterprise:str, args:str):
    msg = users.disable_user(con.conn.cursor(), user, enterprise, args)
    con.conn.commit()
    return msg

@app.post("/users/new")
async def create_user(user:cls.user, enterprise:str, scope:str, args:str):
    msg = users.create_user(con.conn.cursor(), user, enterprise, scope, args)
    con.conn.commit()
    return msg   

@app.get("/users/{user}_{action}_{enterprise}")
def read_item(user: str, action: str, enterprise: str, guid: Union[str, None] = None):    
    if action == "search":
        return users.search_user(con.conn.cursor(), guid)


#Listar documentos un documento en especifico: 

#parametros que necesitamos 
# 1) contenedor
# 2) rol
# 3) URL
# 4) Accion a realizar
# 5) documento a buscar (Parametro opcional)

@app.get("/containers/{container}_{rol}_{url}_{action}")
async def read_item(container: str, rol: str, url: str, action: str, doc: Union[str, None] = None):
    if action == "search":
        return blobs.list_spec_blobs([container, rol, url, doc])
    if action == "list":
        return blobs.list_blobs([container, rol, url, doc])
    #return {"container": container, "Rol": rol, "url": url,"q": q}

