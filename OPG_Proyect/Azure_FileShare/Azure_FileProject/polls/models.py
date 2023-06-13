from django.db import models
from azure.storage.fileshare import ShareServiceClient
from azure.storage.fileshare import ShareDirectoryClient

# Create your models here.

class ListDirectories(models.Model):
    def list_recursive(self, directory_client,directory_name):
        sub_client = directory_client.get_subdirectory_client(directory_name)
        myfiles = sub_client.list_directories_and_files()
        for file in myfiles:
            print(file.get('name'))
            if file.get('is_directory'):
                self.list_recursive(sub_client,file.get('name'))

    def lista_directorios(self):
        connection_string = "DefaultEndpointsProtocol=https;AccountName=beancloud;AccountKey=95oaPiiBpItovDBS7rGsipuPOqqDZligDSzS4YWjIWJb51NjiuWVc94tmo8WftRxVH29Jdk8bG+P+ASti1YXGw==;EndpointSuffix=core.windows.net"
        service = ShareServiceClient.from_connection_string(conn_str=connection_string)
        share_client = service.get_share_client("beanc")
        parent_dir = share_client.get_directory_client("")
        my_list = parent_dir.list_directories_and_files()
        for file in my_list:
            print(file.get('name'))
            if file.get('is_directory'):
                self.list_recursive(self, parent_dir,file.get('name'))
        return my_list
