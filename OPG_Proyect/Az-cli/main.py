AZURE_TENANT_ID  =  'd21cbb56-a2f5-4cec-895a-c145f0e35a31'
AZURE_CLIENT_ID  =  'e6aef0e7-c02d-49bc-bae5-a06601eb9534'
AZURE_CLIENT_SECRET  =  't-O8Q~IfWHrhPrBs8ocG0OD86Nvh_maSLBFkhbms'
AZURE_SUBSCRIPTION_ID  =  '39f567a5-9f8e-4123-818d-60ee65928be4'

from  azure.identity  import  ClientSecretCredential
from  azure.mgmt.resource  import  ResourceManagementClient
from azure.mgmt.storage import StorageManagementClient
from azure.mgmt.storage.models import  (StorageAccountCreateParameters,StorageAccountUpdateParameters,Sku,SkuName,Kind)

subscription_id  =  AZURE_SUBSCRIPTION_ID  # your Azure Subscription Id
credentials  =  ClientSecretCredential(tenant_id=AZURE_TENANT_ID,client_id=AZURE_CLIENT_ID,client_secret=AZURE_CLIENT_SECRET)

# This Function is necesary if we don't have the resource group and the storage account
def get_all_storages(credentials, subscription_id):
    resource_client  =  ResourceManagementClient(credentials,  subscription_id)
    resourcelist=resource_client.resource_groups.list()
    accounts = []
    for  item  in  resourcelist:
        for  item1  in  resource_client.resources.list_by_resource_group(item.name):
            if(item1.type=='Microsoft.Storage/storageAccounts'):
                #get_storage_keys(credentials, subscription_id, item.name, item1.name)
                accounts.append([item.name,item1.name])
    return accounts

#We pass the resource group, and the storage account to get the KEY to authenticate
def get_storage_keys(credentials, subscription_id, resource_group, storage_account):
    storage_client  = StorageManagementClient(credentials,  subscription_id)
    storage_keys  =  storage_client.storage_accounts.list_keys(resource_group,  storage_account)
    storage_keys  =  {v.key_name:  v.value for  v  in  storage_keys.keys}
    print("Resource group: "+resource_group+ " Storage Account: "+ storage_account)
    print(('Key 1: {}'.format(storage_keys['key1'])))
    print(('Key 2: {}'.format(storage_keys['key2'])))

get_all_storages(credentials, subscription_id)

#credential = ClientSecretCredential("d21cbb56-a2f5-4cec-895a-c145f0e35a31", "9f293210-ca01-4063-bb18-cea2681233c4", "bcZ8Q~tTMvCe9Ca7vOuQEXG5x7cg-Xf1Ea4xIdar")

#client = ResourceManagementClient(
#    credential=credential,
#    subscription_id="39f567a5-9f8e-4123-818d-60ee65928be4"
#)

#blob_service_client = BlobServiceClient(
#        account_url="https://beancounterstorage.blob.core.windows.net",
#        credential=credential)

#container_list = blob_service_client.list_containers()
#containers = []
#for container in container_list:
#    containers.append(container.name)

#print(vars(blob_service_client))