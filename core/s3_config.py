import environ
import boto3
import time
import threading

env = environ.Env()

class UplaodThread(threading.Thread):
    
    def __init__(self,body,key):
        self.body = body
        self.key = key
        threading.Thread.__init__(self)

    def run(self):
        try:
            logo_key = str(round(time.time()*100))+self.key
            object = s3.Object('vyaparify-files',logo_key)
            object.put(ACL="public-read",Body=self.body,Key=logo_key)
            return logo_key
        except Exception as e:
            print(e)

s3 = boto3.resource(
    service_name='s3',
    region_name=env('AWS_BUCKET_REGION'),
    aws_access_key_id=env('AWS_ACCESS_KEY'),
    aws_secret_access_key=env('AWS_SECRET_KEY')
)

# def s3_upload(body,key):
#     return UplaodThread(body,key).start()

def s3_upload(body,key):
    logo_key = str(round(time.time()*100))+key
    object = s3.Object('vyaparify-files',logo_key)
    object.put(ACL="public-read",Body=body,Key=logo_key)
    return logo_key

def s3_download():
    pass

def s3_fetch(key):
    return s3.Bucket('vyaparify-files').Object(key).get()

