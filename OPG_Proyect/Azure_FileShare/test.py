from azure.storage.fileshare import ShareDirectoryClient

connection_string = "DefaultEndpointsProtocol=https;AccountName=beancloud;AccountKey=95oaPiiBpItovDBS7rGsipuPOqqDZligDSzS4YWjIWJb51NjiuWVc94tmo8WftRxVH29Jdk8bG+P+ASti1YXGw==;EndpointSuffix=core.windows.net"
parent_dir = ShareDirectoryClient.from_connection_string(conn_str=connection_string, share_name="beanc", directory_path="")
my_list = list(parent_dir.list_directories_and_files())

for directorio in my_list:
    print(directorio)
    