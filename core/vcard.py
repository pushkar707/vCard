import pybase64
import requests

def make_vcard(
        image,
        prefix,
        first_name,
        last_name,
        job_title,
        business_name,
        business_description,
        phone,
        business_address,
        email,
        website,
        linkedin,
        facebook,
        github,
        instagram,
        twitter):
    address_formatted = ';'.join([p.strip() for p in business_address.split(',')])
    str_image = pybase64.b64encode_as_string(requests.get(image).content)
    return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        f'N:{last_name};{first_name}',
        f'FN:{prefix} {first_name} {last_name}',
        f'Title:{job_title}',
        f'ORG:{business_name}',
        f'NOTE;CHARSET=UTF-8:{business_description}',
        f'URL;TYPE=Website:{website}',
        f'URL;TYPE=Linkedin:{linkedin}',
        f'URL;TYPE=Facebook:{facebook}',
        f'URL;TYPE=Github:{github}',
        f'URL;TYPE=Instagram:{instagram}',
        f'URL;TYPE=Twitter:{twitter}',
        f'EMAIL;PREF;INTERNET:{email}',
        f'TEL;WORK;VOICE:{phone}',
        f'ADR;WORK;PREF:;;{address_formatted}',
        f'PHOTO;ENCODING=b:{str_image}',
        # f'REV:1',
        'END:VCARD'
    ]

def write_vcard(f, vcard):
    with open(f, 'w') as f:
        f.writelines([l + '\n' for l in vcard])