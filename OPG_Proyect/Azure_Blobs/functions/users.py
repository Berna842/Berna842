import classes.definition as cls
from fastapi import status

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

def user_list_all(cur, response):
    try:
        cur.execute('SELECT * from users;')
        return {"Users": cur.fetchall()}
    except:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
        return {"Message": "Service error"}

def user_list_my(cur, user, response):
    try:
        cur.execute("SELECT guid_enterprise, rol from roles where guid_user='"+user+"';")
        oe = cur.fetchall()
        if oe != []:
            cur.execute("SELECT email, name, surname, status from users where guid='"+user+"';")
            info = cur.fetchone()
            return {"User": user, "Information": info, "Enterprises": oe}
        else:
            response.status_code = status.HTTP_400_BAD_REQUEST
    except:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
        return {"Message": "Service error"}

def create_user(cur, email, scope, guid, response):
    cur.execute("SELECT email from public.users where email='"+email+"'")
    validation = cur.fetchone()
    try: 
        if validation[0]:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {"Message": "User already exist"}
    except:
        if scope == "remote":
            if guid is None:
                response.status_code = status.HTTP_412_PRECONDITION_FAILED
                return {"Message": "You are missing parameters to continue"}
            else:
                try:
                    cur.execute("INSERT INTO public.users(guid, email, status) values ('"+guid+"', '"+email+"', true)");
                    return {"Message": "Success"}
                except:
                    response.stats_code = status.HTTP_500_INTERNAL_SERVER_ERROR
                    return {"Message": "Service Error"}
        elif scope == "local":
                try:
                    cur.execute("select COUNT(guid) from public.users;")
                    guid = "cl" + str(int(cur.fetchone()[0]) + 1) + "-" + email.split("@")[0]
                    cur.execute("INSERT INTO public.users(guid, email, status) values ('"+guid+"', '"+email+"', true)");
                    return {"Message": "Success"}
                except:
                    response.stats_code = status.HTTP_500_INTERNAL_SERVER_ERROR
                    return {"Message": "Service Error"}
        else:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {"Message": "Scope wrong"}
        
def change_user_status(cur, user, stats, response):
    try:
        cur.execute("UPDATE users SET status = "+str(stats).capitalize() +" where guid='"+user+"'")
        success = cur.rowcount
        if(success == 1):
            return {"Message": "The status change to "+str(stats)}
        else:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {"Message": "Your user hasn't disable"}
    except:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {"Message": "Service Error"}

def search_user(cur, guid, response):
    try:
        cur.execute("SELECT email, name, surname, status FROM users where guid='"+guid+"'")
        res = cur.fetchone()
        if res[3] == True:
            return {"User searched": res}
        else:
            response.status_code = status.HTTP_401_UNAUTHORIZED
            return {"User": "Is Disabled"}
    except:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {"Message": "Error user don't exist or it's wrong"}
    
def update_user(cur, user, args, response):
    try:
        cur.execute("SELECT guid from users where guid='"+user+"'")
        validation = cur.fetchone()
        if validation:
            try:
                args = args.split(";")
            except:
                response.status_code = status.HTTP_400_BAD_REQUEST
                return {"Message":"The parameters must been build it as 'property:value;property:value;'"}
            query = "UPDATE users SET "
            helper = ""
            j = 0
            for i in args:
                if(i != ""):
                    try:
                        helper = helper + i.split(":")[0] + "='" + i.split(":")[1] + "'"
                        if(j < (len(args)-2) ):
                            helper = helper + ", "
                            j=j+1
                    except:
                        response.status_code = status.HTTP_400_BAD_REQUEST
                        return {"Message":"The parameters must been build it as 'property:value;property:value;'"} 
            query = query+helper+" where guid='"+user+"'"
            cur.execute(query)
            resp = cur.rowcount
            if resp == 1:
                return {"Message": "The user has been updated"}
        else:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {"Message": "The user that you're trying to update doesn't exist"}
    except:
        response.status_code = status.HTTP_503_SERVICE_UNAVAILABLE
        return {"Message":"Error the user can't be updated please contact the Administrator"}

def delete_user(cur, guid, response):
    try:
        cur.execute("DELETE FROM users WHERE guid='"+guid+"'")
        statement = cur.rowcount
        if statement == 1:
            cur.execute("DELETE FROM roles WHERE guid_user='"+guid+"'")
            return {"Message": "The user has been deleted"}
        else:
            response.status_code = status.HTTP_400_BAD_REQUEST
            return {"Message": "The user can't be deleted, the guid provide it is wrong"}
    except:
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {"Message": "Service Error"}