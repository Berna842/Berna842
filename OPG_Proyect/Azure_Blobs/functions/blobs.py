from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient

#List all blobs

def list_blobs(args):
    account_url = "https://"+args[2]+".blob.core.windows.net/"
    blob_service_client = BlobServiceClient(account_url, credential="vdeCIeTXdo4vKh5X7AD/W/BKqzzPwDDfC7YfwDzGIt9PPVOmu1AbvAgW341NpJtSoSkrUiZ1Qre8+AStRAV9tw==")
    container_list = blob_service_client.list_containers()
    containers = []
    for container in container_list:
        containers.append(container.name)
    blobs = []
    blob_list = blob_service_client.get_container_client(args[0]).list_blobs()
    for blob in blob_list:
        blobs.append(blob.name)
    return {"containers": containers, "container to access": args[0], "Rol accessing": args[1], "blobs": blobs}


#Apartir de aquí es lo del blob

def list_spec_blobs(args):
    account_url = "https://"+args[2]+".blob.core.windows.net/"
    blob_service_client = BlobServiceClient(account_url, credential="vdeCIeTXdo4vKh5X7AD/W/BKqzzPwDDfC7YfwDzGIt9PPVOmu1AbvAgW341NpJtSoSkrUiZ1Qre8+AStRAV9tw==")
    container_list = blob_service_client.list_containers()
    containers = []
    for container in container_list:
        containers.append(container.name)
    blobs = []
    blob_list = blob_service_client.get_container_client(args[0]).list_blobs()
    for blob in blob_list:
        if args[3] == blob.name.split("/")[len(blob.name.split("/"))-1]:
            blobs.append(blob.name)
    if blobs == []:
        blobs.append("File not found")
    return {"containers": containers, "container to access": args[0], "Rol accessing": args[1],"blobs": blobs,"Searched doc": args[3]}

#account_url = "https://beancloud.blob.core.windows.net/"

# Create the BlobServiceClient object
#blob_service_client = BlobServiceClient(account_url, credential="95oaPiiBpItovDBS7rGsipuPOqqDZligDSzS4YWjIWJb51NjiuWVc94tmo8WftRxVH29Jdk8bG+P+ASti1YXGw==")

# Con el siguiente codigo podemos listar todos los contenedores
#container_list = blob_service_client.list_containers()
#print("Lista de contenedores:")
#for container in container_list:
#    print("\t" + container.name)


# Nos posiconamos en el contenedor deseado
#blob_list = blob_service_client.get_container_client("beanc").list_blobs()
#print("Lista de Blobs dentro del contenedor beanc:")
#for blob in blob_list:
#    print("\t" + blob.name)

# Creamos un directorio local para almacenar la información del blob
#local_path = "./data"
#os.mkdir(local_path)

# Creamos un archivo en el directorio de información local para cargar y descargar
#local_file_name = "test_file.txt"
#upload_file_path = os.path.join(local_path, local_file_name)

# Escribimos información en el archivo
#file = open(file=upload_file_path, mode='w')
#file.write("Hello, World!")
#file.close()

# Creamos el cliente del blob usando el nombre del archivo local como el nombre del blob
#blob_client = blob_service_client.get_blob_client(container="beanc", blob=local_file_name)

#print("\nCargando al Almacenamiento de blobs en Azure:\n\t" + local_file_name)

# Cargamos el archivo creado
#with open(file=upload_file_path, mode="rb") as data:
#    blob_client.upload_blob(data)

# Nos posiconamos en el contenedor deseado
#blob_list = blob_service_client.get_container_client("beanc").list_blobs()
#print("Lista de Blobs dentro del contenedor beanc:")
#for blob in blob_list:
#    print("\t" + blob.name)

# Descarga de blobs

#download_file_path = os.path.join(local_path, str.replace(local_file_name ,'.txt', str(datetime.date())))
#container_client = blob_service_client.get_container_client(container= "beanc") 
#print("\nDownloading blob to \n\t" + download_file_path)

#with open(file=download_file_path, mode="wb") as download_file:
# download_file.write(container_client.download_blob(blob.name).readall())