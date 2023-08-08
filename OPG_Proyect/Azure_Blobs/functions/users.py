import classes.definition as cls

def user_status_validation(cur, user):
    try:
        cur.execute("SELECT status from public.users where guid='"+user+"' AND status=true;")
        status = cur.fetchone()[0]
        return status
    except:
        return False

def rol_validation(cur, user, enterprise):
    status = user_status_validation(cur, user)
    if status == True:
        cur.execute("SELECT rol from public.roles where guid_user='"+user+"' AND guid_enterprise='"+enterprise+"';")
        rol = cur.fetchone()[0]
        return rol
    else: 
        return "Disable"

def user_list_all(cur):
    cur.execute('SELECT * from public.users;')
    return {"User": user, "Users": cur.fetchall(), "Enterprise": enterprise}

def user_list_my(cur, user):
    cur.execute("SELECT guid_enterprise, rol from public.roles where guid_user='"+user+"';")
    oe = cur.fetchall()
    cur.execute("SELECT email, name, surname, status from public.users where guid='"+user+"';")
    info = cur.fetchone()
    return {"User": user, "Information": info, "Enterprises": oe}

def create_user(cur, email, scope, guid):
    cur.execute("SELECT email from public.users where email='"+email+"'")
    validation = cur.fetchone()
    try: 
        if validation[0]:
            return {"Message": "User already exist"}
    except:
        if scope == "remote":
            if guid is None:
                return {"Error": "You are missing parameters to continue"}
            else:
                cur.execute("INSERT INTO public.users(guid, email, status) values ('"+guid+"', '"+email+"', true)");
                return {"Message": "Success"}
        elif scope == "local":
                cur.execute("select COUNT(guid) from public.users;")
                guid = "cl" + str(int(cur.fetchone()[0]) + 1) + "-" + email.split("@")[0]
                cur.execute("INSERT INTO public.users(guid, email, status) values ('"+guid+"', '"+email+"', true)");
                return {"Message": "Success"}
        else:
            return {"Message": "Ambit wrong"}
        
def disable_user(cur, user, enterprise, guid):
    if user == guid:
        cur.execute("UPDATE public.users SET status = false where guid='"+user+"'")
        success = cur.rowcount
        if(success == 1):
            return {"Message": "Your user has been disabled success"}
        else:
            return {"Message": "Your user hasn't disable"}
    else:
        try:
            rol = rol_validation(cur, user, enterprise)
            if rol != "Disable":
                if (rol != "Admin" and enterprise != "en1-BI") or (rol !="owner" and enterprise != "en1-BI"):
                    return {"Access": "Denied, you have no access."}
                else:
                    cur.execute("Select * from public.users where guid='"+guid+"'")
                    exist = cur.fetchone()
                    try:
                        if exist:
                            cur.execute("UPDATE public.users SET status = false where guid='"+guid+"'")
                            success = cur.rowcount
                            if(success == 1):
                                return {"Message": "The user has been disabled success"}
                            else:
                                return {"Message": "The user hasn't disable"}
                        else:
                            return {"Message": "The user that you're trying to disable doesn't exist"}    
                    except:
                        return {"Message": "The user that you're trying to disable doesn't exist"}
            else:
                return {"Message" : "The user is disable, please verify the status with an administrator"}
        except:
            return {"Message": "Something goes wrong please contact with the technical support"}

def search_user(cur, guid):
    try:
        cur.execute("SELECT email, name, surname, status FROM public.users where guid='"+guid+"'")
        res = cur.fetchone()
        if res[3] == True:
            return {"User searched": res}
        else:
            return {"User searched": "Is Disabled"}
    except:
        return {"Message": "Error user don't exist or it's wrong"}
    
def update_user(cur, user, args):
    try:
        cur.execute("SELECT guid from public.users where guid='"+user+"'")
        validation = cur.fetchone()
        if validation:
            args = args.split(";")
            query = "UPDATE public.users SET "
            helper = ""
            j = 0
            for i in args:
                if(i != ""):
                    helper = helper + i.split(":")[0] + "='" + i.split(":")[1] + "'"
                if(j < (len(args)-2) ):
                    helper = helper + ", "
                    j=j+1
                
            query = query+helper+" where guid='"+user+"'"
            cur.execute(query)
            resp = cur.rowcount
            if resp == 1:
                return {"Message": "The user has been updated"}
        else:
            return {"Message": "The user that you're trying to update doesn't exist"}
    except:
        return {"Message":"Error the user can't be updated please contact the Administrator"}

def delete_user(cur, user, enterprise, guid):
    try: 
        rol = rol_validation(cur, user, enterprise)
        if rol != "Disable":
            if (rol != "Admin" and enterprise != "en1-BI") or (rol !="owner" and enterprise != "en1-BI"):
                    return {"Access": "Denied, you have no access."}
            else:
                if guid:
                    cur.execute("DELETE FROM public.users WHERE guid='"+guid+"'")
                    statement = cur.rowcount
                    if statement == 1:
                        cur.execute("DELETE FROM public.roles WHERE guid_user='"+guid+"'")
                        return {"Message": "The user has been deleted"}
                    else:
                        return {"Message": "Something goes wrong please contact with the technical support"}
                else: 
                    return {"Message": "It can't be execute because you need to specify the user to delete."}
        else:
            return {"Message" : "The user is disable, please verify the status with an administrator"}
    except:
        return {"Message": "What are you trying to do?, we are going to report this situation to an administrator"}