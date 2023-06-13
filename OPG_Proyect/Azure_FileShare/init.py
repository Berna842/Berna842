from azure.storage.fileshare import ShareDirectoryClient

connection_string = "DefaultEndpointsProtocol=https;AccountName=beancloud;AccountKey=95oaPiiBpItovDBS7rGsipuPOqqDZligDSzS4YWjIWJb51NjiuWVc94tmo8WftRxVH29Jdk8bG+P+ASti1YXGw==;EndpointSuffix=core.windows.net"
parent_dir = ShareDirectoryClient.from_connection_string(conn_str=connection_string, share_name="beanc", directory_path="")
my_list = list(parent_dir.list_directories_and_files())

def recursividad(nombre_directorio):
    helper = ShareDirectoryClient.from_connection_string(conn_str=connection_string, share_name="beanc", directory_path=nombre_directorio)
    helper2 = list(helper.list_directories_and_files())
    for subdir1 in helper2:
        if(subdir1.is_directory == True):
            print("Subdirectorio de " + nombre_directorio + ": " + subdir1.name)
            recursividad(nombre_directorio+"\\"+subdir1.name)
        elif(subdir1.is_directory == False):
                print("Archivo del directorio "+ nombre_directorio +": " + subdir1.name)

for directorio in my_list:
    print("Directorio principal: " + directorio.name)
    if(directorio.is_directory == True):
        recursividad(directorio.name)
    elif(directorio.is_directory == False):
        print("Archivo del directorio "+ parent_dir.share_name +": " + directorio.name)
    



###########################################################################################################

#async def list_files_and_directories(share_name, directory_path=''):
#    connection_string = "DefaultEndpointsProtocol=https;AccountName=beancloud;AccountKey=95oaPiiBpItovDBS7rGsipuPOqqDZligDSzS4YWjIWJb51NjiuWVc94tmo8WftRxVH29Jdk8bG+P+ASti1YXGw==;EndpointSuffix=core.windows.net"

    # Conectarse al servicio de almacenamiento de archivos
#    service_client = ShareServiceClient.from_connection_string(connection_string)

    # Obtener el cliente del recurso compartido
#    share_client = service_client.get_share_client(share_name)

    # Obtener el cliente del directorio raíz
#    directory_client = share_client.get_directory_client(directory_path)

    # Listar los archivos y directorios en el directorio actual
#    async for item in directory_client.list_directories_and_files():
#        if isinstance(item, ShareFileClient):
#            print("Archivo:", item.path_name)
#        elif isinstance(item, ShareDirectoryClient):
#            print("Directorio:", item.path_name)
            # Recursivamente listar los archivos y directorios en los subdirectorios
#            await list_files_and_directories(share_name, item.path_name)

# Nombre del recurso compartido en Azure
#share_name = "beanc2"
# Ruta del directorio raíz, si está vacío se listarán todos los archivos y directorios del recurso compartido
#directory_path = ""

#async def main():
#    async with aiohttp.ClientSession() as session:
#        await list_files_and_directories(share_name, directory_path)

#loop = asyncio.get_event_loop()
#loop.run_until_complete(main())
