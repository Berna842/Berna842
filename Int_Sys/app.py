import requests
from requests_html import HTMLSession
from bs4 import BeautifulSoup

resp = requests.get('https://app.integratec.com/360/intelamexico-mx/diagnostic/evaluation.aspx?id=0&eventoID=3')

soup = BeautifulSoup(resp.content, "html.parser")
forms = soup.find_all("form")

session = HTMLSession()
session.keep_alive = False


print(forms)