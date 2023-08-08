from fastapi import FastAPI
import classes.definition as cls
import functions.blobs as blobs
import functions.users as users
from typing import Optional,Union
import DBs.conn as con

app = FastAPI()

@app.get("/users/")
async def list_all_users():
    return users.user_list_all(con.conn.cursor())

@app.get("/users/my_user")
async def display_user(user: str):
    return users.user_list_my(con.conn.cursor(), user)

@app.put("/users/my_user")
async def update_user(user: str, args: str):
    msg = users.update_user(con.conn.cursor(), user, args)
    con.conn.commit()
    return msg

@app.delete("/users/my_user")
async def delete_user(guid: str):
    msg = users.delete_user(con.conn.cursor(), guid)
    con.conn.commit()
    return msg

@app.put("/users/status")
async def change_user_status(user:str, status: bool):
    msg = users.change_user_status(con.conn.cursor(), user, status)
    con.conn.commit()
    return msg


@app.post("/users/new")
async def create_user(email:str, scope:str, guid:str|None=None):
    msg = users.create_user(con.conn.cursor(), email, scope, guid)
    con.conn.commit()
    return msg   

@app.get("/users/look")
def read_item(guid:str):
    return users.search_user(con.conn.cursor(), guid)


#Listar documentos un documento en especifico: 

#parametros que necesitamos 
# 1) contenedor
# 2) rol
# 3) URL
# 4) Accion a realizar
# 5) documento a buscar (Parametro opcional)

#@app.get("/containers/{container}_{rol}_{url}_{action}")
#async def read_item(container: str, rol: str, url: str, action: str, doc: Union[str, None] = None):
#    if action == "search":
#        return blobs.list_spec_blobs([container, rol, url, doc])
#    if action == "list":
#        return blobs.list_blobs([container, rol, url, doc])
    #return {"container": container, "Rol": rol, "url": url,"q": q}

